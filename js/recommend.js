var car = JSON.parse(localStorage.car);
var source = JSON.parse(localStorage.source);
var app = angular.module('myApp', []);
app.controller('cart', function($scope) {
  $scope.titleSrc = source[car.index].titleSrc;
  $scope.cooker = source[car.index].cooker[car.cookerClick];
  $scope.printBg = source[car.index].print_bg;
  $scope.back = function() {
    window.location.href = 'intro.html';
  };
  $scope.print = function() {
    window.print();
    /* if (width > height) {
     $('#cart').removeClass('height2300');
     } else {
     $('#cart').removeClass('height1900');
     }*/
  };
  (function() {

  }())
});
/**
 * 更新数据car
 */
function updateLocalStorage_car() {
  localStorage.car = JSON.stringify(car);
}

$(document).ready(function() {
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    var scrollHiehgt = document.body.scrollHeight;
    if (width > height) {
      //横屏幕
      if (scrollHiehgt < 1024) {
        $('#cart').css({'height': '1024px'});
      } else {
        var num = parseInt(scrollHiehgt / height) + 1;
        $('#cart').css('height', 768 * num);
      }
    } else {
      //竖屏
      if (scrollHiehgt <= 960) {

        $('#cart').css({'height': '960px'});
      } else {
        var num = parseInt(scrollHiehgt / height) + 1;
        $('#cart').css('height', 960 * num);

      }
    }
  $(window).bind('orientationchange', function(e) {
    window.location=window.location;
  });

})
