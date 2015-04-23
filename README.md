Ng Inspect Watchers
============================

A Chrome extension that lets the user inspect the number of Angular watchers that exist on any element of an Angular app.

_4/20/2015 Update! I just released v1.0.0 of the extension, which moves the extension from a Browser Action to a Page Action (icon appears in the address bar). A Page Action is more appropriate for this extension because the features only makes sense for a few web pages, those with AngularJS running._

## Usage:
Find it in the [Chrome WebStore](https://chrome.google.com/webstore/detail/angularjs-inspect-watcher/gdfcinoagafkodbnkjemaajfahnmfkhg).

Once installed, navigate to your Angular app and click the Page Action in the address bar to activate the extension. Then, hover your mouse over different sections of your Angular application to see the scopes and watchers highlighted in red. Click the Page Action again to deactivate.

## Motivation:
It is a well known fact that as the number of [watchers](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch) in an Angular app increases, the [digest cycle](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest) performance decreases. In Angular 1.3, anything over 2,000 watchers will dramatically effect performance. This extension can help you easily monitor the number of watchers you are adding.

## Troubleshooting

* **I don't see the Page Action! What do I do?** --> Ng Inspect Watchers can only be used on AngularJS apps that have [debug info enabled](https://docs.angularjs.org/guide/production#disabling-debug-data). If you navigate to any web page that is either not an AngularJS app, or does not have debug info enabled, you will not be able to use the extension. 

* **How do I enable debug info?** --> The extension relies on the presence of `.ng-scope` and `.ng-isolate-scope` CSS class names. If you have run `$compileProvider.debugInfoEnabled(false);` on your app, it won't work. To get the classes back, you can run `angular.reloadWithDebugInfo();` in the console and try again. See [https://docs.angularjs.org/guide/production#disabling-debug-data](https://docs.angularjs.org/guide/production#disabling-debug-data) for more info.
