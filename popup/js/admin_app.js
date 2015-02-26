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
    onButton: onButton,
    offButton: offButton,
    render: render
  }
})($);
