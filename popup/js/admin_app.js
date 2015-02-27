var adminApp = (function($) {
  var statusElement = function() { return $('#status') };
  var onButton = function() { return $('#on_button') };
  var offButton = function() { return $('#off_button') };

  function statusText(on) {
    return on ? 'on' : 'off';
  }

  function renderStatus(on) {
    var text = statusText(on);
    statusElement().text(text)
                   .toggleClass("green", text == "on")
                   .toggleClass("red", text == "off");
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
