---
title: >-
  org.springframework.boot.actuate.endpoint.EndpointId cannot be cast to
  java.lang.String 异常处理
tags:
  - EndpointId
  - MvcEndpointUtil
  - 异常
  - jrebel
abbrlink: b2e0
date: 2018-12-28 11:57:26
---

用了`spring-boot-starter-actuator` 之后出现异常: `java.lang.ClassCastException:	org.springframework.boot.actuate.endpoint.EndpointId cannot be cast to java.lang.String`.
详细的异常如下：

```java
Failed to instantiate [org.springframework.boot.actuate.endpoint.web.ServletEndpointRegistrar]: Factory method 'servletEndpointRegistrar' threw exception; nested exception is java.lang.ClassCastException: org.springframework.boot.actuate.endpoint.EndpointId cannot be cast to java.lang.String
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:185) ~[spring-beans-5.1.3.RELEASE.jar:5.1.3.RELEASE]
	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:622) ~[spring-beans-5.1.3.RELEASE.jar:5.1.3.RELEASE]
	... 55 common frames omitted
Caused by: java.lang.ClassCastException: org.springframework.boot.actuate.endpoint.EndpointId cannot be cast to java.lang.String
	at org.springframework.boot.MvcEndpointUtil.filterCanonicalEndpoints(MvcEndpointUtil.java:102) ~[MvcEndpointUtil.class:2.1.1.RELEASE]
	at org.springframework.boot.MvcEndpointUtil.filterEndpoints(MvcEndpointUtil.java:73) ~[MvcEndpointUtil.class:2.1.1.RELEASE]
	at org.springframework.boot.actuate.endpoint.annotation.EndpointDiscoverer.discoverEndpoints(EndpointDiscoverer.java:125) ~[spring-boot-actuator-2.1.1.RELEASE.jar:2.1.1.RELEASE]
	at org.springframework.boot.actuate.endpoint.annotation.EndpointDiscoverer.getEndpoints(EndpointDiscoverer.java:119) ~[spring-boot-actuator-2.1.1.RELEASE.jar:2.1.1.RELEASE]
	at org.springframework.boot.actuate.autoconfigure.endpoint.web.ServletEndpointManagementContextConfiguration$WebMvcServletEndpointManagementContextConfiguration.servletEndpointRegistrar(ServletEndpointManagementContextConfiguration.java:76) ~[spring-boot-actuator-autoconfigure-2.1.1.RELEASE.jar:2.1.1.RELEASE]
	at org.springframework.boot.actuate.autoconfigure.endpoint.web.ServletEndpointManagementContextConfiguration$WebMvcServletEndpointManagementContextConfiguration$$EnhancerBySpringCGLIB$$1005825f.CGLIB$servletEndpointRegistrar$0(<generated>) ~[spring-boot-actuator-autoconfigure-2.1.1.RELEASE.jar:2.1.1.RELEASE]
	at org.springframework.boot.actuate.autoconfigure.endpoint.web.ServletEndpointManagementContextConfiguration$WebMvcServletEndpointManagementContextConfiguration$$EnhancerBySpringCGLIB$$1005825f$$FastClassBySpringCGLIB$$1c44d4f2.invoke(<generated>) ~[spring-boot-actuator-autoconfigure-2.1.1.RELEASE.jar:2.1.1.RELEASE]
	at org.springframework.cglib.proxy.MethodProxy.invokeSuper(MethodProxy.java:244) ~[spring-core-5.1.3.RELEASE.jar:5.1.3.RELEASE]
	at org.springframework.context.annotation.ConfigurationClassEnhancer$BeanMethodInterceptor.intercept(ConfigurationClassEnhancer.java:363) ~[spring-context-5.1.3.RELEASE.jar:5.1.3.RELEASE]
	at org.springframework.boot.actuate.autoconfigure.endpoint.web.ServletEndpointManagementContextConfiguration$WebMvcServletEndpointManagementContextConfiguration$$EnhancerBySpringCGLIB$$1005825f.servletEndpointRegistrar(<generated>) ~[spring-boot-actuator-autoconfigure-2.1.1.RELEASE.jar:2.1.1.RELEASE]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_111]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_111]
	at sun.reflect.DelegatingMethodAccessorImpl.__invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_111]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:45009) ~[na:1.8.0_111]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:45012) ~[na:1.8.0_111]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_111]
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:154) ~[spring-beans-5.1.3.RELEASE.jar:5.1.3.RELEASE]
	... 56 common frames omitted

```
很奇怪的异常，看EndpointId的代码也重写了`toString()`方法，更奇怪的是找不到`MvcEndpointUtil`的代码出处。困扰了好几天，关键是百度了好久也没到有用的信息，也在群里问了一下，没有人回复。今天用google搜了一下，本来也不太抱希望。最后无意中发现了一篇文章(异常处理)[http://www.codeleading.com/article/8276162799/]， 发现跟我碰到同一个问题，最后解决方法不显眼，但还是被我发现了。

**更新 IDEA Jreble 插件**

果断试了一下不用jrebel来启动，果然可以了。不晓得jrebel在这个过程中做了什么操作。 