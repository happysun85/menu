var source = JSON.parse(localStorage.source);
var car = JSON.parse(localStorage.car);
var app = angular.module('myApp', []);
app.controller('titleSrc', function($scope) {
  $scope.titleSrc = source[car.index].titleSrc;
  $scope.albumIntroduce = source[car.index].introduceSrc;
  $scope.select = 0;
  $scope.albums = source[car.index].dishes;
  $scope.checkItem = function(title, url1, url2) {
    var flag = false;
    for (var i = 0; i < car.list.length; i++) {
      for (var item in car.list[i]) {
        if (title == item) {
          flag = true;
          break;
        }
      }
    }
    if (flag) {
      return url2;
    } else {
      return url1;
    }
  };
  $scope.cooker = source[car.index].cooker;
  $scope.onCookerClick = function(index) {
    car.cookerClick=index;
    localStorage.car = JSON.stringify(car);
    window.location.href = 'cooker.html';
  };
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
$(document).ready(function() {
  $('.count > div').css('position', 'relative').each(function() {
    TweenMax.from($(this), 1, {delay: Math.random() * .2, css: {left: Math.random() * 200 - 100, top: Math.random() * 200 - 100, opacity: 0}, ease: Back.easeOut});
  });
});
