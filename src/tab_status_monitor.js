var tabStatusMonitor = (function() {
  var tabStatuses = {};

  function on(tab) {
    return tabStatuses[tab.id];
  }

  function toggle(tab) {
    tabStatuses[tab.id] = !tabStatuses[tab.id];
  }

  return {
    on: on,
    toggle: toggle
  };
})();