var adminApp = (function($) {
  var statusElement = function() { return $('#ng_inspect_watchers_status') };
  var onButton = function() { return $('#ng_inspect_watchers_on') };
  var offButton = function() { return $('#ng_inspect_watchers_off') };

  function statusText(on) {
    return on ? 'On' : 'Off';
  }

  function renderStatus(on) {
    statusElement().text(statusText(on));
  }

  function renderButtons(on) {
    if( on ) {
      onButton().hide();
      offButton().show();
    }
    else {
      onButton().show();
      offButton().hide();
    }

  }

  function render(on) {
    renderStatus(on);
    renderButtons(on);
  }

  return {
    render: render
  }
})($);

var port = chrome.extension.connect({name: 'Ng Inspect Watchers'});
port.onMessage.addListener(function(message) {
  adminApp.render(message.on);
});

port.postMessage({action: 'getStatus'});

$(document).on('click', '#ng_inspect_watchers_on', function() {
  port.postMessage({action: 'updateStatus', on: true});
  chrome.tabs.executeScript(null, {file: "ng_inspect_watchers_on.js"});
});

$(document).on('click', '#ng_inspect_watchers_off', function() {
  port.postMessage({action: 'updateStatus', on: false});
  chrome.tabs.executeScript(null, {file: "ng_inspect_watchers_off.js"});
});
