var main = function() {
  if( disableNgInspectWatchers ) {
    disableNgInspectWatchers();
  }

  $('#iw_inspect_watchers_js_off').remove();
};

var script = document.createElement('script');
script.id = 'iw_inspect_watchers_js_off';
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
