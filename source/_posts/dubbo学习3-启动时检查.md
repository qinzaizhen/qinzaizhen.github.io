---
title: dubbo学习3-启动时检查
date: 2017-07-26 16:36:26
tags: [dubbo, 启动检查, check]
---

#### 启动时检查
dubbo默认启动时会检测所依赖的服务是否可用，不可用时将抛出异常，阻止spring 初始化完成，默认check=true。
如果你的Spring容器是懒加载的，或者通过API编程延迟引用服务，请关闭check，否则服务临时不可用时，会抛出异常，拿到null引用，如果check=false，总是会返回引用，当服务恢复时，能自动连上。
可以通过将`check`设置为`false`来关闭检查，比如测试时，有些服务不关心，或者出现了循环依赖，必须有一方先启动。

- 关闭某个服务启动时的检查（没有提供者时会报错）：
会出现以下异常：
```java
Caused by: java.lang.IllegalStateException: Failed to check the status of the service life.qzz.dubbodemo.api.DemoService. 
No provider available for the service life.qzz.dubbodemo.api.DemoService from the url 
zookeeper://localhost:2181/com.alibaba.dubbo.registry.RegistryService?application=helloapp
// &dubbo=2.8.4&interface=life.qzz.dubbodemo.api.DemoService&methods=sayHello&pid=9820&side=consumer&timestamp=1501054461459 
 to the consumer 10.96.2.111 use dubbo version 2.8.4
```
将此引用配置为`check=false`可以关闭检查
```xml
<dubbo:reference id="demoService" interface="life.qzz.dubbodemo.api.DemoService" check="false"/>
```

- 关闭所有服务启动时的检查（没有提供者时会报错）：
```xml
<dubbo:consumer check="false"/>
```
- 关闭注册中心启动时检查（注册订阅失败时报错）：
```xml
<dubbo:registry check="false"/>
```
连不上zk时会出异常，默认尝试3次后失败：
```java
Caused by: org.I0Itec.zkclient.exception.ZkTimeoutException: Unable to connect to zookeeper server within timeout: 5000
    at org.I0Itec.zkclient.ZkClient.connect(ZkClient.java:876)
    at org.I0Itec.zkclient.ZkClient.<init>(ZkClient.java:98)
    at org.I0Itec.zkclient.ZkClient.<init>(ZkClient.java:92)
    at org.I0Itec.zkclient.ZkClient.<init>(ZkClient.java:80)
```

可以在dubbo.properties配置文件中做一些默认设置：
```properties

dubbo.reference.life.qzz.dubbodemo.api.DemoService.check=false
dubbo.reference.check=false 官方文档上说“强制改变所有reference的check值，就算配置中有声明，也会被覆盖”，经测试xml和注解中配置会覆盖此项配置
dubbo.consumer.check=false 是设置check的缺省值，如果配置中有显式的声明，如：<dubbo:reference check="true"/>，不会受影响。比dubbo.reference.check优先级低
dubbo.registry.check=false  前面两个都是指订阅成功，但提供者列表是否为空是否报错，如果注册订阅失败时，也允许启动，需使用此选项，将在后台定时重试。此处定时重试暂款测试出来，不知如何测试
```
引用缺省是延迟初始化的，只有引用被注入到其它Bean，或被getBean()获取，才会初始化。
如果需要饥饿加载，即没有人引用也立即生成动态代理，可以配置：
```xml
<dubbo:reference id="demoService" interface="life.qzz.dubbodemo.api.DemoService" init="true" />
```

总结：
配置文件中的`dubbo.reference.check`，`dubbo.consumer.check`，`dubbo.registry.check`做一些默认的配置，在xml和注解中针对具体情况做特殊性的配置。


[demo地址](http://git.oschina.net/qzz/qinzaizhen/tree/master/dubbodemo/demo3)