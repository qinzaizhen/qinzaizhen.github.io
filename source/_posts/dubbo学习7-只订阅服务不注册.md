---
title: dubbo学习7-只订阅服务不注册
date: 2017-08-05 19:10:21
tags: [dubbo,订阅,注册]
---

在实际开发过程中，经常会共用一个注册中心，这时如果我们的服务还没有开发好，可能就会影响消费者不能正常运行。这个时候可以让这个开发者只订阅注册中心（因为有可能会需要调用其他的服务），但是不注册上去，消费者直接连接到这个开发中的提供者。
禁用注册配置：
```xml
<dubbo:registry address="zookeeper://localhost:2181" register="false" />
```
或：
```xml
<dubbo:registry address="zookeeper://localhost:2181?register=false" />
```

关系图：
![image](http://ooll8xqpq.bkt.clouddn.com/subscribe-only.jpg)