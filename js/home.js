var source = null;
var car = {
  index: null,
  active: '',
  list: [],
  typeIndex: 0
};
var app = angular.module('myApp', []);
app.controller('album', function($scope, $http) {
  $http.get("data.json")
      .success(function(response) {
        $scope.count = 1;
        $scope.titles = response.album;
        source = response.album;
        $scope.select = function(obj) {
          car.index = obj;
          try {
            localStorage.car = JSON.stringify(car);
           localStorage.source = JSON.stringify(source);
            window.location.href = 'intro.html';
          } catch (e) {
              alert("您处于无痕浏览，无法正常使用");
          }
        };

      })
      .error(function(e) {
        console.log('读取json出错')
      });

  $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
    $('#album > div').css('position', 'relative').each(function() {
        TweenMax.from($(this), 1, {delay: Math.random() * .2, css: {left: Math.random() * 200 - 100, top: Math.random() * 200 - 100, opacity: 0}, ease: Back.easeOut});
      });
  });
});
app.directive('onFinishRenderFilters', function ($timeout) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
              if (scope.$last === true) {
                  $timeout(function() {
                      scope.$emit('ngRepeatFinished');
                  });
              }
          }
      };
  });

