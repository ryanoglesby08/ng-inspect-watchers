(function() {
  var ngScopePrescenceRule = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        css: ['.ng-scope']
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  };

  var ngIsolateScopePrescenceRule = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        css: ['.ng-isolate-scope']
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  };

  chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([ngScopePrescenceRule, ngIsolateScopePrescenceRule]);
    });
  });


  chrome.pageAction.onClicked.addListener(function(tab) {
    if( tabStatusMonitor.on(tab) ) {
      chrome.tabs.executeScript(tab.id, {file: "src/ng_inspect_watchers_off.js"});
      chrome.pageAction.setIcon({
        tabId: tab.id, 
        path: {
          "19": "assets/icons/icon19-gray.png",
          "38": "assets/icons/icon38-gray.png"
        }
      });
      chrome.pageAction.setTitle({tabId: tab.id, title: "Click to activate Ng Inspect Watchers"});
    }
    else {
      chrome.tabs.executeScript(tab.id, {file: "src/ng_inspect_watchers_on.js"});
      chrome.pageAction.setIcon({
        tabId: tab.id, 
        path: {
          "19": "assets/icons/icon19.png",
          "38": "assets/icons/icon38.png"
        }
      });
      chrome.pageAction.setTitle({tabId: tab.id, title: "Ng Inspect Watchers is active"});
    }

    tabStatusMonitor.toggle(tab);
  });
})();