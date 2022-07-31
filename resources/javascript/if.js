const ifjs = {
    config: {
        highlightKeyCodes: [16, 40], // LeftShift, DownArrow
        highlightStyleId: "highlights"
      },
      keyDown: () => {
        console.log('key down');
      },
      keyUp: () => {
        console.log('key up');
      },
      clearHyperlinks: () => {
        console.log('clear hyperlinks');
      },
}