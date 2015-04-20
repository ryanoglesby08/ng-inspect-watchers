var main = function() {
  if( disableNgInspectWatchers ) {
    disableNgInspectWatchers();
  }

  document.body.removeChild(document.getElementById('iw_inspect_watchers_js_off'));
};

var script = document.createElement('script');
script.id = 'iw_inspect_watchers_js_off';
script.appendChild(document.createTextNode('('+ main +')();'));

document.body.appendChild(script);
