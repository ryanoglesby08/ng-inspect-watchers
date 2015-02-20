var main = function() {
  var ngWatchCount = function (targetElements) {
    var targetElements = angular.element(targetElements || document);

    var countWatchers = function(element) {
      var watchers = 0;
      var scope = null;

      var element = angular.element(element);

      if (element.is('.ng-scope')) {
        scope = element.scope();
      }
      // I believe scopes and isolate scopes are meant to be mutually exclusive
      else if (element.is('.ng-isolate-scope')) {
        scope = element.isolateScope();
      }

      if (scope && scope.$$watchers) {
        watchers += scope.$$watchers.length;
      }

      angular.forEach(element.children(), function(childElement) {
          watchers += countWatchers(childElement);
      });

      return watchers;
    };

    var watchers = 0;
    angular.forEach(targetElements, function(element) {
      watchers += countWatchers(element);
    })

    console.log(['Watcher count', targetElements, watchers]);
    return watchers;
  }

  ngWatchCount();

  var watcherCountClassName = "iw-ng-scope-count";
  var watcherHighlightClassName = "iw-ng-scope-highlight";
  var watcherCountTemplate = "<div class='" + watcherCountClassName + "'>{watcherCount}</div>";

  function removeAnyWatcherHighlighting() {
    $('.' + watcherHighlightClassName).removeClass(watcherHighlightClassName);
    $('.' + watcherCountClassName).remove();
  }

  function findScopeParentThen(element, workForScopeParent) {
    // TODO: Need to account for .isolate-scope too
    var scopeParent = $(element).closest('.ng-scope');
    workForScopeParent(scopeParent);
  }

  function highlight(element) {
    element.addClass(watcherHighlightClassName);
  }

  function insertWatcherCountInto(element) {
    var watcherCount = ngWatchCount(element);

    element.append(watcherCountTemplate.replace('{watcherCount}', watcherCount))
  }

  var showWatchers = function(event) {
    removeAnyWatcherHighlighting();

    findScopeParentThen(this, function(scopeParent) {
      highlight(scopeParent)
      insertWatcherCountInto(scopeParent);
    });

    event.stopPropagation();
  };

  var hideWatchers = function(event) {
    removeAnyWatcherHighlighting();

    event.stopPropagation();
  };

  disableNgInspectWatchers = function() {
    console.log("Turning off showWatchers");
    $(document).off('mouseover', '*', showWatchers);

    console.log("Turning off hideWatchers");
    $(document).off('mouseout', '*', hideWatchers);

    $('#iw_inspect_watchers_js_on').remove();
  };


  $(document).on('mouseover', '*', showWatchers)
             .on('mouseout', '*', hideWatchers);
};

var script = document.createElement('script');
script.id = 'iw_inspect_watchers_js_on';
script.appendChild(document.createTextNode('var disableNgInspectWatchers = null;'));
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
