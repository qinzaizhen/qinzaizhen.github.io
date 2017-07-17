---
title: angularjs 改变样式
date: 2017-07-17 17:33:28
tags: [angularjs, 样式, class]
---
#### angularjs 改变样式主要有三种方式
1. 直接使用变量绑定

```html
<style>
    .play{
        color:red;
    }
    .play2{
        font-size:25px;
    }
</style>
<div ng-app="myApp" ng-controller="myCtrl">
<p class="{{class}}">我的play样式</p>
</div>
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.class = 'play';
});
</script>
```

运行效果图
{% qnimg 变量绑定.png title:变量绑定 alt:变量绑定 'class:class1 class2' %}

**这种方式耦合性较高，将视图的变化放在了controller中**

2. 字符串数组形式

```html
<style>
    .play{
        color:red;
    }
    .play2{
        font-size:25px;
    }
</style>
<div ng-app="myApp" ng-controller="myCtrl">
<p ng-class="{true:'play',false:'play2'}[isplay]">我是字符串数组形式</p>
</div>
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.isplay=true;
});
</script>
```

运行效果图
{% qnimg 字符串数组形式.png title:字符串数组形式 alt:字符串数组形式 'class:class1 class2' %}

可以理解为
```javascript
var test={true: 'active', false: 'inactive'};
test[isActive];
```
也可以不用true和false来表示。
比如
```html
<p ng-class="{play:'play',notplay:'play2'}[isplay]">我是字符串数组形式</p>
$scope.isplay='play';
```
个人理解原理应该是一样的，也是判断是不是true吧。手动滑稽。
还有一种更简捷的写法是
```html
<p ng-class="{'play2':'play'}">我是字符串数组形式2</p>
```
前面的为true时的样式，后面为false时的样式
3. 第二种方式中两个样式是互斥的，如果需要组合不同的样式，就需要第三种了。

```html
<style>
    .play{
        color:red;
    }
    .play2{
        font-size:25px;
    }
</style>
<div ng-app="myApp" ng-controller="myCtrl">

<p ng-class="{'play':isplay,'play2':isplay2}">我是key-value形式</p>

</div>
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.isplay=true;
    $scope.isplay2 = true;
});
</script>
```
运行效果图
{% qnimg key-value形式.png title:key-value形式 alt:key-value形式 'class:class1 class2' %}
前面的是样式的class，后面为表达式，为true时激活些样式。当isplay和isplay2都为true，元素将获得两种样式。
**总结：** 
1. 如果是二选一的情况下用第二种，尤其是简写形式。
2. 复杂的样式用第三种。
