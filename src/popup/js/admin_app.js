var adminApp = (function($) {
  var body = function() { return $('body'); };

  var noAngularMessage = function() { return $('#no_angular'); };
  var noScopeClassesMessage = function() { return $('#no_scope_classes'); };
  var mainContent = function() { return $('#content'); };

  var statusElement = function() { return $('#status'); };
  var onButton = function() { return $('#on_button'); };
  var offButton = function() { return $('#off_button'); };

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

  function renderAngularErrorMessages(angularDetected, error) {
    if( angularDetected ) {
      noAngularMessage().hide();
      noScopeClassesMessage().hide();
    }
    else {
      if( error.toUpperCase() == 'NO_ANGULAR' ) {
        noAngularMessage().show();
        noScopeClassesMessage().hide();
      }
      else if( error.toUpperCase() == 'NO_SCOPE_CLASSES' ) {
        noAngularMessage().hide();
        noScopeClassesMessage().show();
      }
    }
  }

  function renderMainContent(angularDetected) {
    if( angularDetected ) {
      mainContent().show();
    }
    else {
      mainContent().hide();
    }
  }

  function render(on) {
    renderStatus(on);
    renderButtons(on);
    body().show();
  }

  function renderInitialState(angularDetected, error) {
    renderAngularErrorMessages(angularDetected, error);
    renderMainContent(angularDetected);
    body().show();
  }

  return {
    onButton: onButton,
    offButton: offButton,
    render: render,
    renderInitialState: renderInitialState
  };
})($);
