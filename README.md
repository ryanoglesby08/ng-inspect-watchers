Ng Inspect Watchers
============================

A Chrome extension that lets the user inspect the number of Angular watchers that exist on any element of an Angular app.

## Usage:
This Chrome extension is still under development and has not reached a 1.0 release yet. However, if you would like to play around with it (it works!) you can clone the repo and install it manually into Chrome. It's easy.
https://developer.chrome.com/extensions/getstarted#unpacked

Once installed, just use the Browser Action to turn it on, then hover your mouse over different sections of your Angular application to see the scopes and watchers highlighted in red.

### Error Codes
When launching the extension on a web page, you may notice some error messages. Check the console for the appropriate error code.

1. **NO_ANGULAR:** Ng Inspect Watchers can only be used with Angular applications. The extension tries to detect Angular apps by looking for ng-* HTML attributes. If it cannot find any in the current DOM, you will see this error.
2. **NO_SCOPE_CLASSES:** To determine which elements have scopes, and possibly watchers, the extension relies on `ng-scope` and `ng-isolate-scope` CSS classes that Angular places on DOM elements. Angular provides a way to turn this off/on programmatically if you are seeing this error. https://docs.angularjs.org/guide/production

## Motivation:
It is a well known fact that as the number of [watchers](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch) in an Angular app increases, the [digest cycle](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest) performance decreases. In Angular 1.3, anything over 2,000 watchers will dramatically effect performance. This extension can help you easily monitor the number of watchers you are adding.

## Debugging
The extension relies on the presence of `.ng-scope` and `.ng-isolate-scope` CSS class names. If you have run `$compileProvider.debugInfoEnabled(false);` on your app, it won't work. To get the classes back, you can run `angular.reloadWithDebugInfo();` in the console and try again.
<br/>
https://docs.angularjs.org/guide/production
