var ngInspectWatchers = (function() {
  var _on = false;

  function on() { return _on; }
  function updateStatus(on) { _on = on; }

  return {
    on: on,
    updateStatus: updateStatus
  };
})();

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    if( message.action == 'updateStatus' ) {
      ngInspectWatchers.updateStatus(message.on);
    }

    port.postMessage({on: ngInspectWatchers.on()});
  });
});
