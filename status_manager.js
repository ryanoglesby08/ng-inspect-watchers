var ngInspectWatchers = (function() {
  var _on = false;

  function on() { return _on; }
  function updateStatus(on) { _on = on; }

  return {
    on: on,
    updateStatus: updateStatus
  };
})();

chrome.runtime.onConnect.addListener(function(port) {
  function replyTo(message, body) {
    body.action = message.action;
    port.postMessage(body);
  }

  port.onMessage.addListener(function(message) {
    if( message.action == 'getStatus' ) {
      replyTo(message, {on: ngInspectWatchers.on()});
      return;
    }

    if( message.action == 'updateStatus' ) {
      ngInspectWatchers.updateStatus(message.on);
      replyTo(message, {on: ngInspectWatchers.on()});
      return;
    }

    if( message.action == 'detectAngular') {
      if( document.querySelector('[ng-app], [ng-controller], [ng-model]') ) {
        replyTo(message, {angular: true});
      }
      else {
        replyTo(message, {angular: false});
      }
      return;
    }
  });
});
