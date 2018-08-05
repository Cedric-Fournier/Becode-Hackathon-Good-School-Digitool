chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('index.html', {
      id:"mainWin",
      frame: "none",
      innerBounds: {width: 800, height: 600}
  }, function(win) {
    win.contentWindow.launchData = launchData;
  });
});
