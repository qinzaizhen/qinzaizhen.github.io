---
title: dependencies与dependencyManagement的区别
date: 2017-04-19 18:12:29
tags: maven
---
#### dependencyManagement 的使用场景
在多模块项目中，子项目可能会需要引入同样的依赖，更改版本时需要维护多套设置，这时将依赖申明到父模块的`dependencyManagement`元素中，维护共同的版本，子模块在使用时就可以省略掉版本号。
#### dependencies
这个元素就是用来申明依赖的。会传递给子模块。

#### dependencies与dependencyManagement的区别
后者只申明项目中会用到的依赖，不会引入依赖。前者是实际引入依赖的元素，会传递给子项目。
子项目在引入时使用不同的版本就可以覆盖`dependencyManagement`的配置。