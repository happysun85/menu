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
        }
      })
      .error(function(e) {
        console.log('读取json出错')
      });
});
