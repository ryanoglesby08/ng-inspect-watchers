$(document).on('click', '#iw_inspect_watchers_on', function() {
  chrome.tabs.executeScript(null, {file: "iw_inspect_watchers_on.js"});
});

$(document).on('click', '#iw_inspect_watchers_off', function() {
  chrome.tabs.executeScript(null, {file: "iw_inspect_watchers_off.js"});
});
