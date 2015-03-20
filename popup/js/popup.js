$(function() {
  activeTab.openPort(function(port) {
    port.onMessage.addListener(function(message) {
      if( message.action == 'detectAngular' ) {
        adminApp.renderInitialState(message.angular, message.error);
        return;
      }

      adminApp.render(message.on);
    });

    port.postMessage({action: 'detectAngular'});
    port.postMessage({action: 'getStatus'});
  });

  adminApp.onButton().click(function() {
    activeTab.postMessage({action: 'updateStatus', on: true});

    chrome.tabs.executeScript(null, {file: "ng_inspect_watchers_on.js"});
  });

  adminApp.offButton().click(function() {
    activeTab.postMessage({action: 'updateStatus', on: false});

    chrome.tabs.executeScript(null, {file: "ng_inspect_watchers_off.js"});
  });
});
