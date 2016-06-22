var app = angular.module('sampleApp', []);

app.controller('SampleController', ['$scope', function($scope) {
  $scope.someText = 'original text';
}]);
