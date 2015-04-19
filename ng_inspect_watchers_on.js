var main = function(angular, document) {
  var ngWatchCount = function (targetElements) {
    // ngWatchCount has been adopted from bahmutov (https://github.com/bahmutov/code-snippets/blob/master/ng-count-watchers.js)
    //  with help from Patrick Caldwell (https://github.com/tncbbthositg). Thanks!

    var watchersOn = function(scope) {
      if (scope && scope.$$watchers) {
        return scope.$$watchers.length;
      }

      return 0;
    };

    var countWatchers = function(element) {
      var watchers = 0;
      var element = angular.element(element);

      // Elements can be .ng-scope, .ng-isolate-scope, or both. I think if it is both,
      //  then isolateScope() will have the $$watchers
      if (element.hasClass('ng-scope')) {
        watchers += watchersOn(element.scope());
      }

      if (element.hasClass('ng-isolate-scope')) {
        watchers += watchersOn(element.isolateScope());
      }

      angular.forEach(element.children(), function(childElement) {
          watchers += countWatchers(childElement);
      });

      return watchers;
    };


    var targetElements = angular.element(targetElements || document);

    var watchers = 0;
    angular.forEach(targetElements, function(element) {
      watchers += countWatchers(element);
    });

    console.log('[Ng Inspect Watchers] Element contains ' + watchers + ' watchers.');

    return watchers;
  };

  var watcherCountClassName = "iw-ng-watcher-count";
  var watcherHighlightClassName = "iw-ng-scope-highlight";
  var watcherCountTemplate = "<div class='" + watcherCountClassName + "'>{watcherCount}</div>";

  function removeAnyWatcherHighlighting() {
    angular.element(document.querySelector('.' + watcherHighlightClassName)).removeClass(watcherHighlightClassName);
    angular.element(document.querySelector('.' + watcherCountClassName)).remove();
  }

  function closestParentWithAScope(element) {
    var parent = angular.element(element);

    while( parent && !(parent.hasClass('ng-scope') || parent.hasClass('ng-isolate-scope')) ) {
      parent = parent.parent();
    }

    return parent;
  }

  function findScopeParentThen(element, workForScopeParent) {
    var scopeParent = closestParentWithAScope(element);

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

    findScopeParentThen(event.target, function(scopeParent) {
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
  angular.element(document).off('mouseover', showWatchers)
                           .off('mouseout', hideWatchers);

    document.body.removeChild(document.getElementById('iw_inspect_watchers_js_on'));
  };


  angular.element(document).on('mouseover', showWatchers)
                           .on('mouseout', hideWatchers);
};

var script = document.createElement('script');
script.id = 'iw_inspect_watchers_js_on';
script.appendChild(document.createTextNode('var disableNgInspectWatchers = null;'));
script.appendChild(document.createTextNode('('+ main +')(angular, document);'));

document.body.appendChild(script);
