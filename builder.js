const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

/*
 * Node script to compile interactive fiction written with Inform 6.
 * 
 * It includes a preprocessing phase that allows authors to add several tags to 
 * object descriptions. These tags will be replaced by functions to manipulate 
 * the style of texts, create conditional statements, list objects contained by 
 * other objects, create hyperlinks and more.
 * 
 * 
 * @author J. Francisco Martín <jfm.lisaso@gmx.com>
 * @version 1.0
 * @released 2022/07/28
 */

const getFiles = async (root) => {
    const dirents = await fs.readdirSync(root, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(root, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
};

const preprocessFile = async (inputFile, outputFile) => {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile, { flags: 'a' });

    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
    });

    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input file as a single line break.

    for await (const line of rl) {
        let result = line;
    
        // Caracteres '[' y ']':
        result = result.replace(/\\\[/g, '", (char) 91, "');
        result = result.replace(/\\\]/g, '", (char) 93, "');
    
        // Etiquetas para estilo fuerte: **texto**
        result = result.replace(/(?<!\\)\*{2}([^\*\n]+)(?<!\\)\*{2}/g, '", (strong) "$1", "');
        // Etiquetas para el estilo enfatizado: *texto*
        result = result.replace(/(?<!\\)\*([^\*\n]+)(?<!\\)\*/g, '", (emph) "$1", "');
        // Etiquetas para el estilo código: `texto`
        result = result.replace(/(?<!\\)\`([^`\n]+)(?<!\\)\`/g, '", (monospaced) "$1", "');
    
        // Abre secuencia condicional si 'object' es plural: [plural:object]
        result = result.replace(/\[\s*plural:\s*(.+?)\s*\]/g, '";\nif (IsPluralNoun($1)) {\nprint "');
        // Abre secuencia condicional genérica: [if:condition]
        result = result.replace(/\[\s*if:\s*(.+?)\s*\]/g, '";\nif ($1) {\nprint "');
        // Secuencia condicional: [else]
        result = result.replace(/\[\s*else\s*\]/g, '";\n} else {\nprint "');
        // Final de la secuencia condicional: [fi]
        result = result.replace(/\[\s*fi\s*\]/g, '";\n}\nprint "');
    
        // Nombre corto del objeto junto al artículo determinado adecuado:
        // [el/la/los/las objeto]
        result = result.replace(/\[\s*(el|la|los|las)\s+(.+?)\s*\]/g, '", (the) $2, "');
        // [El/La/Los/Las objeto]
        result = result.replace(/\[\s*(El|La|Los|Las)\s+(.+?)\s*\]/g, '", (The) $2, "');
        // [al/a la/a los/a las objeto]
        result = result.replace(/\[\s*(al|a\s+la|a\s+los|a\s+las)\s+(.+?)\s*\]/g, '", (al) $2, "');
        // [Al/A la/A los/A las objeto]
        result = result.replace(/\[\s*(Al|A\s+la|A\s+los|A\s+las)\s+(.+?)\s*\]/g, '", (_Al) $2, "');
        // [del/de la/de los/de las objeto]
        result = result.replace(/\[\s*(del|de\s+la|de\s+los|de\s+las)\s+(.+?)\s*\]/g, '", (del) $2, "');
        // [Del/De la/De los/De las objeto]
        result = result.replace(/\[\s*(Del|De\s+la|De\s+los|De\s+las)\s+(.+?)\s*\]/g, '", (_Del) $2, "');
    
        // Nombre corto del objeto junto al artículo indeterminado adecuado:
        // [un/una/unos/unas objeto]
        result = result.replace(/\[\s*(un|una|unos|unas)\s+(.+?)\s*\]/g, '", (a) $2, "');
        // [Un/Una/Unos/Unas objeto]
        result = result.replace(/\[\s*(Un|Una|Unos|Unas)\s+(.+?)\s*\]/g, '", (A) $2, "');
    
        // Terminación de número adecuada: [n obj]
        result = result.replace(/\[\s*n\s+(.+?)\s*\]/g, '", (n) $1, "');
        // Terminación de género adeuada: [o/a obj]
        result = result.replace(/\[\s*(o|a)\s+(.+?)\s*\]/g, '", (o) $2, "');
    
        // Lista de objetos contenidos por otro objeto:
        // [lista de objetos en/sobre obj<códigos de listado>]
        result = result.replace(/\[\s*lista\s+de\s+objetos\s+(en|sobre)\s+(.+?)\s*\<\s*(.+?)\s*\>\s*\]/g, '";\nWriteListFrom(child($2), $3);\nprint "');
        // [lista de objetos en/sobre obj]
        result = result.replace(/\[\s*lista\s+de\s+objetos\s+(en|sobre)\s+(.+?)\s*\]/g, '";\nWriteListFrom(child($2), ENGLISH_BIT + CONCEAL_BIT);\nprint "');

        // Hipervínculo asociado a un objeto, con texto alternativo:
        // [obj](texto:código_estilo)
        result = result.replace(/(?<!\\)\[([^\[\]]+)(?<!\\)\](?<!\\)\(([^\(\)\:]+)(?<!\\)\:\s*([^\(\)\:\s]+)(?<!\\)\)/g, '";\nPRT__($1, "$2", $3);\nprint "');
        // [obj](texto)
        result = result.replace(/(?<!\\)\[([^\[\]]+)(?<!\\)\](?<!\\)\(([^\(\)\:]+)(?<!\\)\)/g, '";\nPRT__($1, "$2");\nprint "');
    
        // Hipervínculo asociado a un texto:
        // [](texto:código_estilo)
        result = result.replace(/(?<!\\)\[(?<!\\)\](?<!\\)\(([^\(\)\:]+)(?<!\\)\:\s*([^\(\)\:\s]+)(?<!\\)\)/g, '";\nPRT__("$1", "$1", $2);\nprint "');
        // [](texto)
        result = result.replace(/(?<!\\)\[(?<!\\)\](?<!\\)\(([^\(\)\:]+)(?<!\\)(?<!\\)\)/g, '";\nPRT__("$1", "$1");\nprint "');
    
        // Imprime el nombre corto del objeto:
        result = result.replace(/\[\s*(.+?)\s*\]/g, '", (name) $1, "');

        writeStream.write(`\n${result}`);
    }

    writeStream.end();
};

const preprocessor = async (options = { clear: false }) => {
    try {
        const processedFiles = [];
        const files = await getFiles(path.join(__dirname, 'src'));
        for (const file of files) {
            const parsedFile = path.parse(file);
            if (parsedFile.ext === '.xinf') {
                const sourceXinf = 
                    path.join(parsedFile.dir, parsedFile.base);
                const sourceInf = 
                    path.join(parsedFile.dir, `${parsedFile.name}.inf`);

                // Removes .inf files:
                if (fs.existsSync(sourceInf)) {
                    await fs.unlinkSync(sourceInf);
                    if (options.clear) {
                        processedFiles.push(`'${sourceInf}'`);
                    }
                }

                // Proprocess .xinf files:
                if (!options.clear) {
                    await preprocessFile(sourceXinf, sourceInf);
                    processedFiles.push(`'${sourceXinf}'`);
                }
            }
        }

        processedFiles.unshift(options.clear
            ? `Cleared ${processedFiles.length} files.`
            : `Processed ${processedFiles.length} files.`
        );
        return processedFiles.join('\n');
    } catch (error) {
        throw new Error('Tried to delete a file that does not exist.');
    }
};

//

const main = async() => {
    const args = process.argv.slice(2);
    const compiler = args[0];
    const gameFile = args[1];

    const informPath = 'src/,src/libs/DaGWindows,src/libs/Extensions,src/libs/Inform6/library611,src/libs/INFSP6,src/libs/Vorple6';
    
    try {
        console.log('\x1b[36m%s\x1b[0m', 'XINF preprocessor...');
        const preprocessorResult = await preprocessor();
        console.log(preprocessorResult);
        console.log();

        console.log('\x1b[36m%s\x1b[0m', 'Glulx compilation...');        
        const gameFileName = function (completePath) {
            const completePathArray = completePath.split('/');
            return completePathArray[completePathArray.length - 1];
        }(gameFile);

        const { stdout } = await exec([
            compiler,
            `+include_path=${informPath}`,
            '-G',
            `${gameFile}.inf`,
            `${gameFileName}.ulx`
        ].join(' '));
        console.log(stdout);

        console.log('\x1b[36m%s\x1b[0m', 'Clear...');
        const clearResult = await preprocessor({ clear: true });
        console.log(clearResult);
        console.log();
        
        process.exit(0);
    } catch (error) {
        console.error('\x1b[31m%s: \x1b[90m%s\x1b[0m', 'Error', error.cmd);
        console.trace();
        if (Boolean(error.stderr)) {
            console.error(error.stderr);
        }
        if (Boolean(error.stdout)) {
            console.error(error.stdout);
        }
        process.exit(0);
    }
};

main();
