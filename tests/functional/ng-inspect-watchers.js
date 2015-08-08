define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'Functional Tests',

    basic: function() {
      return this.remote
        .get(require.toUrl('example-app/index.html'))
        .findById('someText')
          .click()
          .type('test it')
          .end()
        .findByCssSelector('.iw-ng-watcher-count')
          .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, '2');
          // expect(text).toEqual('2')
        });
    }
  });
});
