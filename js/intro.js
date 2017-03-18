var source = JSON.parse(localStorage.source);
var car = JSON.parse(localStorage.car);
var app = angular.module('myApp', []);
app.controller('titleSrc', function($scope) {
  $scope.titleSrc = source[car.index].titleSrc;
  $scope.albumIntroduce = source[car.index].introduceSrc;
  $scope.select = 0;
  $scope.albums = source[car.index].dishes;
  $scope.detail = function(str, index) {
    car.active = str;
    car.typeIndex = index;
    localStorage.car = JSON.stringify(car);
    window.location.href = 'detail.html';

  };
  if (car.list && findArray(car.list, car.active) == -1) {
    $scope.select = '';
  } else {
    $scope.select = 'show'
  }

  $scope.back = function() {
    window.location.href = 'home.html';
  };
  $scope.confirm = function() {
    window.location.href = 'cart.html';
  }
});

function findArray(array, str) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][str]) {
      return i;
    }
  }
  return -1;
}
