
::==============================================================================
:: Script Windows para compilar relatos interactivos programados con Inform 6.
:: Herramientas utilizadas:
::
::  <>  inform6: Compilador Inform 6.
::------------------------------------------------------------------------------

@ECHO OFF
SET inform_compiler=.\inform6.exe

SET inform_path=.\libs

::------------------------------------------------------------------------------

IF "%1"=="" (
    SET /P gameFile="Introduce el nombre del archivo (sin la extension): "
) ELSE (
    SET gameFile=%1
)

IF NOT EXIST "%gameFile%.inf" (
    ECHO El archivo '%gameFile%.inf' no existe.
    ECHO.
    EXIT 1
)

ECHO =============================================
ECHO COMPILANDO PARA GLULX...
ECHO ---------------------------------------------
ECHO.
%inform_compiler% +include_path=%inform_path% -G %gameFile%.inf %gameFile%.ulx
ECHO.

EXIT 0