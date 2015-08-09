var app = angular.module('exampleApp', []);

app.controller('ExampleController', ['$scope', function($scope) {
  $scope.someText = 'original text';
}]);
