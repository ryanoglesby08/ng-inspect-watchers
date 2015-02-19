var main = function() {
  if( showWatchers ) {
    console.log("Turning off showWatchers");
    $(document).off("mouseover", "*", showWatchers);
  }

  if( hideWatchers ) {
    console.log("Turning off hideWatchers");
    $(document).off("mouseout", "*", hideWatchers);
  }

  $("#iw_inspect_watchers_js_on").remove();
  $("#iw_inspect_watchers_js_off").remove();
};

var script = document.createElement('script');
script.id = "iw_inspect_watchers_js_off";
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
