var main = function(angular, document) {
  if( !angular ) {
    console.log("[Ng Inspect Watchers] It seems that this page uses Angular, but I can't find the `window.angular` JavaScript object. Extension not activated.");
  }
  else {
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
        var angularElement = angular.element(element);

        // Elements can be .ng-scope, .ng-isolate-scope, or both. I think if it is both,
        //  then isolateScope() will have the $$watchers
        if (angularElement.hasClass('ng-scope')) {
          watchers += watchersOn(angularElement.scope());
        }

        if (angularElement.hasClass('ng-isolate-scope')) {
          watchers += watchersOn(angularElement.isolateScope());
        }

        angular.forEach(angularElement.children(), function(childElement) {
            watchers += countWatchers(childElement);
        });

        return watchers;
      };


      var angularTargetElements = angular.element(targetElements || document);

      var watchers = 0;
      angular.forEach(angularTargetElements, function(element) {
        watchers += countWatchers(element);
      });

      console.log('[Ng Inspect Watchers] Element contains ' + watchers + ' watchers.');

      return watchers;
    };

    var watcherCountClassName = "iw-ng-watcher-count";
    var watcherHighlightClassName = "iw-ng-scope-highlight";
    var watcherCountTemplate = "<div class='" + watcherCountClassName + "'>{watcherCount}</div>";

    var removeAnyWatcherHighlighting = function() {
      angular.element(document.querySelector('.' + watcherHighlightClassName)).removeClass(watcherHighlightClassName);
      angular.element(document.querySelector('.' + watcherCountClassName)).remove();
    };

    var closestParentWithAScope = function(element) {
      var parent = angular.element(element);

      while( parent && !(parent.hasClass('ng-scope') || parent.hasClass('ng-isolate-scope')) ) {
        parent = parent.parent();
      }

      return parent;
    };

    var findScopeParentThen = function(element, workForScopeParent) {
      var scopeParent = closestParentWithAScope(element);

      workForScopeParent(scopeParent);
    };

    var highlight = function(element) {
      element.addClass(watcherHighlightClassName);
    };

    var insertWatcherCountInto = function(element) {
      var watcherCount = ngWatchCount(element);

      element.append(watcherCountTemplate.replace('{watcherCount}', watcherCount));
    };

    var showWatchers = function(event) {
      removeAnyWatcherHighlighting();

      findScopeParentThen(event.target, function(scopeParent) {
        highlight(scopeParent);
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
  }
};

var script = document.createElement('script');
script.id = 'iw_inspect_watchers_js_on';
script.appendChild(document.createTextNode('var disableNgInspectWatchers = null;'));
script.appendChild(document.createTextNode('('+ main +')(window.angular, document);'));

document.body.appendChild(script);
