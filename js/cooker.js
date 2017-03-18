var source = JSON.parse(localStorage.source);
var car = JSON.parse(localStorage.car);
var app = angular.module('myApp', []);
app.controller('titleSrc', function($scope) {
  $scope.titleSrc = source[car.index].titleSrc;

  $scope.cooker = source[car.index].cooker[car.cookerClick];
  $scope.back = function() {
    window.location.href = 'intro.html';
  };
  $scope.confirm = function() {
    window.location.href = 'recommend.html';
  }
});
