---
title: jQuery prop与attr的区别
date: 2018-04-25 16:35:34
tags: [jquery,prop,attr]
---

### 问题
今天在操作`checkbox`的时候，想让它选中，用了下面的写法：
```
$("#id1").attr("checked",true);
```
结果并没有选中。查看了一下dom，发现多了一个属性`checked="checked"`，看似是应该选中才对，然而并没有啥用。
```
<input id="id1" type="checkbox" value="1" checked="checked">
```
网上也发现我不少朋友遇到这问题，换用`prop`方法试了一下，结果选中了。dom为：
```
<input id="id1" type="checkbox" value="1" offval="0">
```
有点儿奇怪。

### `attr()`方法
获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。
- e.attr( attributeName )
- e.attr( attributeName, value )
- e.attr( attributes )
- e.attr( attributeName, function(index, attr) )

### `prop()` 方法
获取匹配的元素集中第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。 - e.prop( propertyName )
- e.prop( propertyName, value )
- e.prop( properties )
- e.prop( propertyName, function(index, oldPropertyValue) )


看出区别了吗，没错，是参数有区别，`attr()`传入的是`attributeName`，而`prop()`传入的是`propertyName`。现在我们的问题转移了，我们需要研究的是`attributeName`和`propertyName`之间的区别了。

### `Attributes` vs. `Properties`
在这里，我们可以将`attribute`理解为`特性`，`property`理解为为`属性`从而来区分俩者的差异。

如果把DOM元素看成是一个普通的Object对象，这个对象在其定义时就具有一些属性（property），比如把`checkbox`当做一个对象：
```
var checkbox = {
    checked: false
    attributes: [],
    ...
} 
```
实际情况：
```
accept: ""
accessKey: ""
align: ""
alt: ""
attributes:NamedNodeMap {0: id, 1: type, 2: value, 3: offval, 4: checked, id: id, type: type, value: value, offval: offval, checked: checked, …}
checked: false
...
```

attributes:
```
0:id
  baseURI:"http://localhost:8080/x5/bims/material/materialNode/materialNodeEdit?productId=DDKD_NJY_OTH&productName=%25E5%25A4%25A7%25E9%2581%2593%25E5%25BF%25AB%25E8%25B4%25B7%25EF%25BC%2588%25E8%2587%25AA%25E8%2590%25A5%25E7%2589%2588%25EF%25BC%2589"
  childNodes:NodeList []
  firstChild:null
  isConnected:false
  lastChild:null
  localName:"id"
  name:"id"
  namespaceURI:null
  nextSibling:null
  nodeName:"id"
  ...
```
现在，我们一目了然了，`attribute`是一个特性节点，每个DOM元素都有一个对应的`attributes`属性来存放所有的`attribute`节点，它是一个类数组的容器。`attributes`的每个数字索引以键值对(`name="value"`)的形式存放了一个`attribute`节点。而`property`就是一个属性，是一个以键值对(`name="value"`)的形式存放在Object中的属性。
回到一开始的问题，复选框的状态改变只会修改`checked`属性(`property`)，换句话说，要想选中`checkbox`，只能修改`checked`属性(`property`)。因此，用jQuery请使用`prop()`方法。

### jquery中attr和prop的区别介绍

在高版本的jQuery引入`prop`方法后，什么时候该用`prop`？什么时候用`attr`？它们两个之间有什么区别？这些问题就出现了。
关于它们两个的区别，网上的答案很多。这里谈谈我的心得，我的心得很简单：

1. 对于HTML元素本身就带有的**固有**属性，在处理时，使用`prop`方法。
2. 对于HTML元素我们自己**自定义**的DOM属性，在处理时，使用`attr`方法。

上面的描述也许有点模糊，举几个例子就知道了。 
```
<a href="http://www.baidu.com" target="_self" class="btn">百度</a>
```
这个例子里`<a>`元素的DOM属性有`href`、`target`和`class`，这些属性就是`<a>`元素本身就带有的属性，也是W3C标准里就包含有这几个属性，或者说在IDE里能够智能提示出的属性，这些就叫做固有属性。处理这些属性时，建议使用prop方法。
```
<a href="#" id="link1" action="delete">删除</a> 
```
这个例子里`<a>`元素的DOM属性有`href`、`id`和`action`，很明显，前两个是固有属性，而后面一个`action`属性是我们自己**自定义**上去的，`<a>`元素本身是没有这个属性的。这种就是自定义的DOM属性。处理这些属性时，建议使用`attr`方法。使用`prop`方法取值和设置属性值时，都会返回`undefined`值。

再举一个例子：
```
<input id="chk1" type="checkbox" />是否可见<input id="chk2" type="checkbox" checked="checked" />是否可见
```

像`checkbox`，`radio`和`select`这样的元素，选中属性对应`checked`和`selected`，这些也属于固有属性，因此需要使用prop方法去操作才能获得正确的结果。

```
$("#chk1").prop("checked") == false
$("#chk2").prop("checked") == true
```
如果上面使用attr方法，则会出现：
```
$("#chk1").attr("checked") == undefined
$("#chk2").attr("checked") == "checked"
```

### 总结
#### `prop()`函数的结果:
1.如果有相应的属性，返回指定属性值。
2.如果没有相应的属性，返回值是空字符串。
#### `attr()`函数的结果:
1.如果有相应的属性，返回指定属性值。
2.如果没有相应的属性，返回值是undefined。

对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。
对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。