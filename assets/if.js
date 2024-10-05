const LEFT_SHIFT_KEY_CODE = 16;
const DOWN_ARROW_KEY_CODE = 40;

var ifjs = (function (controller) {
  const _config = {
    highlightKeyCodes: [LEFT_SHIFT_KEY_CODE, DOWN_ARROW_KEY_CODE],
    highlightStyleId: "highlights"
  };

  let historyLength = undefined;

  const _waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  };

  const clearHyperlinks = () => {
    Array.from(document.getElementsByClassName("white-letters"))
      .map((element) => element.className = "");
    Array.from(document.getElementsByClassName("red-letters"))
      .map((element) => element.className = "");

    let anchors = document.getElementsByTagName("A");
    let span;
    while (anchors.length > 0) {
      span = document.createElement("SPAN");
      span.innerHTML = anchors[0].innerHTML;
      anchors[0].parentNode.replaceChild(span, anchors[0]);
    }
  };

  const clearLastInput = async () => {
    clearHyperlinks();

    if (typeof historyLength === "number" && 
      historyLength !== haven.prompt.history.get().length) {
      haven.prompt.history.remove()
    }
    historyLength = undefined;

    const elements = Array.from(
      document.getElementsByClassName("lineinput last")
    );
    elements.forEach((element) => element.remove());
    const containerNode = await _waitForElm(
      "#press-intro-to-continue-container"
    );
    containerNode.remove();
  };

  const clearScreen = () => {
    const elements = Array.from(
      document.getElementsByClassName("turn")
    );
    elements.pop(); // we remove the last element (ie: the current turn)
    elements.forEach((element) => element.remove());    
  };

  const keyDown = (event) => {
    if (event.isComposing || event.keyCode === 229 || event.repeat) {
      return;
    }
    if (_config.highlightKeyCodes.includes(event.keyCode)) {
      document.getElementById(_config.highlightStyleId).disabled = true;
    }
  };

  const keyUp = (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (_config.highlightKeyCodes.includes(event.keyCode)) {
      document.getElementById(_config.highlightStyleId).disabled = false;
    }
  };

  const resetHighlights = async () => {
    keyUp({ keyCode: _config.highlightKeyCodes[0] });
  };

  const pressIntroToContinuePrompt = async () => {
    const containerNode = document.createElement("span");
    containerNode.id = "press-intro-to-continue-container";

    const textNode = document.createTextNode("Pulsa «Intro» para ")
    containerNode.appendChild(textNode);

    const continueWrapperNode = document.createElement("span");
    continueWrapperNode.className = "white-letters";
    const continueNode = document.createElement('a');
    continueNode.textContent = 'continuar';
    continueNode.setAttribute('title', 'Continuar');
    continueNode.className = "vorple-link vorple-commandlink";
    continueNode.setAttribute('href', '#');
    continueWrapperNode.appendChild(continueNode);
    containerNode.appendChild(continueWrapperNode);

    const promptNode = document.createTextNode(" >")
    containerNode.appendChild(promptNode);

    const prefixNode = await _waitForElm("#lineinput-prefix");
    prefixNode.parentNode.insertBefore(containerNode, prefixNode);
  };

  return {
    ...controller,
    clearHyperlinks,
    clearLastInput,
    clearScreen,
    keyDown,
    keyUp,
    pressIntroToContinuePrompt,
    resetHighlights,
    saveHistoryLength: () => {
      historyLength = haven.prompt.history.get().length;
    },
  };
}(ifjs || {}));

document.onkeydown = function (event) { ifjs.keyDown(event); };
document.onkeyup = function (event) { ifjs.keyUp(event); };
