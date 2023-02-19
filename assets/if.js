const LEFT_SHIFT_KEY_CODE = 16;
const DOWN_ARROW_KEY_CODE = 40;

const ifjs = {
  config: {
    highlightKeyCodes: [LEFT_SHIFT_KEY_CODE, DOWN_ARROW_KEY_CODE],
    highlightStyleId: "highlights"
  },
  keyDown: (event) => {
    if (event.isComposing || event.keyCode === 229 || event.repeat) {
      return;
    }
    if (ifjs.config.highlightKeyCodes.includes(event.keyCode)) {
      document.getElementById(ifjs.config.highlightStyleId).disabled = true;
    }
  },
  keyUp: (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (ifjs.config.highlightKeyCodes.includes(event.keyCode)) {
      document.getElementById(ifjs.config.highlightStyleId).disabled = false;
    }
  },
  clearHyperlinks: () => {
    console.log('clear hyperlinks');
  },
};

document.onkeydown = function (event) { ifjs.keyDown(event); };
document.onkeyup = function (event) { ifjs.keyUp(event); };
