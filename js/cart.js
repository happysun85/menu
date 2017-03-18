var car = JSON.parse(localStorage.car);
var source = JSON.parse(localStorage.source);
var app = angular.module('myApp', []);
app.controller('cart', function($scope) {
  $scope.titleSrc = source[car.index].titleSrc;

  $scope.albums = car.list;

  $scope.delete = function(type, title) {
    for (var i = 0; i < car.list.length; i++) {
      for (var n in car.list[i][type]) {
        if (car.list[i][type][n].title == title) {
          car.list[i][type].splice(n, 1);
        }
      }
    }
    clearEmptyArr(car.list);
    updateLocalStorage_car();
  };
  $scope.price = source[car.index].price;

  refreshCount();

  $scope.back = function() {
    window.location.href = 'intro.html';
  };
  $scope.print = function() {
    beforePrint();
    window.print();
    afterPrint()
  };

  function clearEmptyArr(array) {
    for (var i = 0; i < array.length; i++) {
      for (var o in array[i]) {
        if (array[i][o].length == 0) {
          array.splice(i, 1);
          break;
        }
      }
    }
    refreshCount();
    updateLocalStorage_car();
  }

  function refreshCount() {
    if (car.list.length == 0) {
      window.location.href = 'home.html';
    }
    var html = '本菜单含';
    var arr = [];
    var number = 0;
    for (var i = 0; i < car.list.length; i++) {
      for (var item in car.list[i]) {
        if (item == '$$hashKey') {
          continue;
        }
        arr.push(item + '\t' + car.list[i][item].length + '\t道');
        number += car.list[i][item].length;
      }
    }
    html = arr.join('，') + '，共计\t' + number + '\t道';
    $scope.count = html;
  }
});
/**
 * 更新数据car
 */
function updateLocalStorage_car() {
  localStorage.car = JSON.stringify(car);
}
function beforePrint()
{
     $('.delete').hide();
}
//打印之后将隐藏掉的信息再显示出来
function afterPrint()
{
  $('.delete').show();
}
