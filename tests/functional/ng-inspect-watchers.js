define(function (require) {
  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');

  registerSuite({
    name: 'Functional Tests',

    scope_highlighting: function() {
      var self = this;

      return self.remote
        .get(require.toUrl('sample-app/index.html'))

        .findById('someText')
          .then(function(element) {
              self.remote.moveMouseTo(element);
          })
          .end()

        .findById('sampleController')
          .getAttribute('class')
          .then(function(className) {
            expect(className).to.include('iw-ng-scope-highlight');
          })
          .end()

        .findByCssSelector('#sampleController .iw-ng-watcher-count')
          .getVisibleText()
          .then(function(text) {
            expect(text).to.equal('2');
          });
    }
  });
});
