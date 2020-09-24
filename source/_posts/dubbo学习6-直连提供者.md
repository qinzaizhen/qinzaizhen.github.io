---
title: dubbo学习6-直连提供者
tags:
  - dubbo
  - 直连提供者
abbrlink: e377
date: 2017-08-04 22:58:46
---

在开发及测试环境下，经常需要绕过注册中心，只测试指定服务提供者，这时候可能需要点对点直连。在点对点直连方式下，将以服务接口为单位，忽略注册中心的提供者列表，A接口配置点对点，不影响B接口从注册中心获取列表。
### 三种实现方式
#### Reference Config
如果是线上需求需要点对点，可以在xml和dubbo.properties文件中通过url属性指定提供者，这将绕过注册中心，如有多个地址用分号隔开。
```xml
<dubbo:reference interface="life.qzz.dubbodemo.api.DemoService" id="demoService" url="dubbo://localhost:20880" />
```
#### 启动参数
在JVM启动参数中加入`-D`参数映射服务地址，如：
```shell
java -Dlife.qzz.dubbodemo.api.DemoService=dubbo://localhost:20880
```
key为服务名，value为服务提供者url，此配置优先级最高。
**为了避免复杂化线上环境，不要在线上使用这个功能，只应在测试环境使用（暂时还无法理解）**

#### 文件映射
如果服务较多，也可以用文件映射，如：
```shell
java -Ddubbo.resolve.file=dubbo-resolve.properties
```
dubbo-resolve.properties文件中配置服务映射：
```
life.qzz.dubbodemo.api.DemoService=dubbo://localhost:20880
```
此配置优先级高于<dubbo:reference/>中的配置，2.0以上的版本会自动加载${user.home}/dubbo-resolve.properties文件，不需要配置。

优先级关系：

![image](http://ooll8xqpq.bkt.clouddn.com/dubbo-directly.jpg)

**为了避免复杂化线上环境，不要在线上使用这个功能，只应在测试阶段使用。**