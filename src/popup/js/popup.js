$(function() {
  activeTab.openPort(function(port) {
    port.onMessage.addListener(function(message) {
      if( message.action == 'initialize' ) {
        adminApp.renderInitialState(message.angular, message.error);
      }

      adminApp.render(message.on);
    });

    port.postMessage({action: 'initialize'});
  });

  adminApp.onButton().click(function() {
    activeTab.postMessage({action: 'updateStatus', on: true});

    chrome.tabs.executeScript(null, {file: "src/ng_inspect_watchers_on.js"});
  });

  adminApp.offButton().click(function() {
    activeTab.postMessage({action: 'updateStatus', on: false});

    chrome.tabs.executeScript(null, {file: "src/ng_inspect_watchers_off.js"});
  });
});
