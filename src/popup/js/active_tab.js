var activeTab = (function() {
  var port = null;

  function openPort(callback) {
    if( port !== null ) {
      callback(port);
      return;
    }

    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      port = chrome.tabs.connect(tabs[0].id);
      callback(port);
    });
  }

  function postMessage(message) {
    openPort(function(port) {
      port.postMessage(message);
    });
  }

  return {
    openPort: openPort,
    postMessage: postMessage
  };
})();
