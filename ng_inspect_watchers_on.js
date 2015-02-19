var main = function() {
  var ngWatchCount = function (targetElements) {
    targetElements = angular.element(targetElements || document);

    var countWatchers = function(element) {
      var watchers = 0;
      var scope = null;

      element = angular.element(element);

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
    }

    var watchers = 0;
    angular.forEach(targetElements, function(element) {
      watchers += countWatchers(element);
    })

    console.log(['Watcher count', targetElements, watchers]);
    return watchers;
  }

  ngWatchCount();

  var scopeCountContainer = "<div class='iw-ng-scope-count'></div>";

  var scopeCountContainerClassName = "iw-ng-scope-count";
  var scopeHighlightClassName = "iw-ng-scope-highlight";

  showWatchers = function(event) {
    $("." + scopeHighlightClassName).removeClass(scopeHighlightClassName);
    $("." + scopeCountContainerClassName).remove();

    var watchCount = ngWatchCount(this);

    // TODO: Need to account for .isolate-scope too
    var scopeParent = $(this).closest('.ng-scope');
    scopeParent.addClass(scopeHighlightClassName);

    scopeParent.append(scopeCountContainer);
    $("." + scopeCountContainerClassName).html(watchCount);

    event.stopPropagation();
  };
  hideWatchers = function(event) {
    $("." + scopeCountContainerClassName).remove();

    // TODO: Need to account for .isolate-scope too
    var scopeParent = $(this).closest('.ng-scope');
    scopeParent.removeClass(scopeHighlightClassName);

    event.stopPropagation();
  };

  $(document).on("mouseover", "*", showWatchers);
  $(document).on("mouseout", "*", hideWatchers);
};

var script = document.createElement('script');
script.id = "iw_inspect_watchers_js_on";
script.appendChild(document.createTextNode('var showWatchers = null; var hideWatchers = null;'));
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
