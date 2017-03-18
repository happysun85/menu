var car = JSON.parse(localStorage.car);
var source = JSON.parse(localStorage.source);
var app = angular.module('myApp', []);
app.controller('detail', function($scope) {
  //标题
  $scope.title = source[car.index].dishes[car.typeIndex].shooseSrc;
  //已选菜
  $scope.select = 0;
  //可选
  $scope.max = 0;
  //共计
  $scope.count;
  //遍历菜单
  $scope.albums;

  if (car.list && findArray(car.list, car.active) == -1) {
    $scope.select = 0;
  } else {
    $scope.select = car.list[findArray(car.list, car.active)][car.active].length;
  }

  var max = source[car.index].dishes[car.typeIndex].max;

  $scope.max = max;
  $scope.count = source[car.index].dishes[car.typeIndex].list.length;
  $scope.albums = source[car.index].dishes[car.typeIndex].list;

  $scope.highLight = function(src) {
    var i = findArray(car.list, car.active);
    if (car.list && i != -1) {

      for (var n = 0; n < car.list[i][car.active].length; n++) {
        if (car.list[i][car.active] && src == car.list[i][car.active][n].img) {
          return true;
        }
      }
    }
    return false;
  };

  //点菜
  $scope.selected = function(index, obj) {
    var cur = $('.list li').eq(index);

    if ($(cur).find('.checked').length > 0) {
      //删除菜品
      $(cur).find('.checked').removeClass('checked');
      if ($scope.select > 0) {
        $scope.select--;
      }
    } else {
      //添加至购物车
      if($scope.select<$scope.max){
        $(cur).find('div').addClass('checked');
        if ($scope.select < max) {
          $scope.select++;
        }
      }
    }
  };

  //confrim 确认 提交订单
  $scope.confrim = function() {
    addToLocalStorage();
    window.location.href = 'intro.html';
  };
  $scope.back = function() {
    window.location.href = 'intro.html';
  }
});
function addToLocalStorage() {
  var active = car.active;
  var arr = [];
  var check = $('.list li').find('.checked').parent('li');
  for (var i = 0; i < check.length; i++) {
    arr.push(source[car.index].dishes[car.typeIndex].list[$(check[i]).attr('index')]);
  }

  var obj = {};
  obj[car.active] = arr;

  if (findArray(car.list, car.active) > -1) {
    car.list[findArray(car.list, car.active)][car.active] = arr;
  } else {
    car.list.push(obj);
  }
  updateLocalStorage_car();
  /*if (car.list.length > 0) {
   for (var i = 0; i < car.list.length; i++) {
   for (var k in car.list[i]) {
   if (k == car.active) {
   car.list[i] = obj;
   break;
   }
   }
   }
   } else {
   car.list.push(obj);
   }
   updateLocalStorage_car();*/
}

/**
 * 通过菜类 如：“热菜” 获得当前对象数据
 * @param title
 * @returns {number}
 */
Array.prototype.getAlbums = function(title) {
  var _this = this;
  var number = 0;
  for (var i in _this[title]) {
    if (_this[title].hasOwnProperty(i)) {
      number++;
    }
  }
  return number;
};
function addAlbum(data) {
  if (findArray(car.list, car.active) > -1) {
    car.list[findArray(car.list, car.active)][car.active].push(data);
  } else {
    var obj = {};
    obj[car.active] = [];
    obj[car.active].push(data);
    car.list.push(obj);
  }
  updateLocalStorage_car();
}
function delAlbum(title) {
  var index = findArray(car.list, car.active);
  for (var i = 0; i < car.list[index][car.active].length; i++) {
    var cur = car.list[index][car.active][i];
    if (cur.title == title) {
      car.list[index][car.active].splice(i, 1);
      updateLocalStorage_car();
      return;
    }
  }

}
function objectCount(obj) {
  var num = 0;
  for (var i in obj) {
    num++;
  }
  return num;
}

function findArray(array, str) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][str]) {
      return i;
    }
  }
  return -1;
}

/**
 * 更新数据car
 */
function updateLocalStorage_car() {
  localStorage.car = JSON.stringify(car);
}

$(document).ready(function() {
  $('.list > li').css('position', 'relative').each(function() {
    TweenMax.from($(this), 1, {delay: Math.random() * .2, css: {left: Math.random() * 200 - 100, top: Math.random() * 200 - 100, opacity: 0}, ease: Back.easeOut});
  });
});
