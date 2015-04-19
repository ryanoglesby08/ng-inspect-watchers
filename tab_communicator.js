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
    if( message.action == 'updateStatus' ) {
      ngInspectWatchers.updateStatus(message.on);
      replyTo(message, {on: ngInspectWatchers.on()});
      return;
    }

    if( message.action == 'initialize') {
      if( !document.querySelector('[ng-app], [ng-controller], [ng-model]') ) {
        console.log("[Ng Inspect Watchers] Error: NO_ANGULAR");
        replyTo(message, {angular: false, error: 'NO_ANGULAR'});
        return;
      }

      if( !document.querySelector('.ng-scope, .ng-isolate-scope') ) {
        console.log("[Ng Inspect Watchers] Error: NO_SCOPE_CLASSES");
        replyTo(message, {angular: false, error: 'NO_SCOPE_CLASSES'})
        return;
      }

      replyTo(message, {angular: true, on: ngInspectWatchers.on()});
    }
  });
});
