---
title: Spring AOP基本用法2
date: 2020-09-23 10:25:58
tags: Spring, AOP
---

# Spring AOP 用法二

在上一篇中讲到通过xml配置`ProxyFactoryBean`来创建代理对象，在这一篇中看看通过编程的方式配置`ProxyFactory`。该类继承自`ProxyCreatorSupport`（之前提到过该类提供了一些创建代理对象的基础方法），提供了配置目标对象，代理接口和通知的功能。

## 基本用法

```java
DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
XmlBeanDefinitionReader xmlBeanDefinitionReader = new XmlBeanDefinitionReader(beanFactory);
xmlBeanDefinitionReader.loadBeanDefinitions("AopXmlSimpleConfig.xml");
// 获取需求代理的目标对象
IBusinessService bean = beanFactory.getBean("businessService", IBusinessService.class);
// 获取需要增强的通知
Advice userBeforeAdvice = beanFactory.getBean("userBeforeAdvice", Advice.class);
// 将目标对象传入构造函数，创建代理工厂
ProxyFactory proxyFactory = new ProxyFactory(bean);
//添加我们的通知
proxyFactory.addAdvice(userBeforeAdvice);
// 最终获取到代理对象
IBusinessService proxy = (IBusinessService) proxyFactory.getProxy();
//调用代理对象的方法
proxy.sayAgain();
```

通过以上代码，我们创建出了最终的代理对象。大致步骤如下：

1. 通过构造函数，传入目标对象，创建代理工厂对象
2. 添加通知
3. 获取代理对象
4. 调用代理对象的方法

执行结果：

```
Before method advice
again
```

打印结果也说明了我们的代理对象正常工作，先执行了前置通知，再调用了目标对象的方法。

最重要的获取代理对象的方法都是在父类中完成的，与`ProxyFactoryBean`类似，该类只是提供了另外一种配置的方式。

## 构造函数

构造函数是这个类使用比较频繁的方法。可以通过目标对象，代理接口，以及通知来使用构造函数。

### `ProxyFactory(Object target)`

通过此方法将根据目标对象创建`ProxyFactory`对象，并且会代理目标对象所有的接口。

```java
public ProxyFactory(Object target) {
  setTarget(target);
  setInterfaces(ClassUtils.getAllInterfaces(target));
}
```



### `ProxyFactory(Class<?>... proxyInterfaces)`

传入代理接口数组构造`ProxyFactory`对象，这种情况下只设置了代理接口，则必须手动设置通知，否则在创建代理的过程中无法通过校验。

目前创建的Jdk动态代理和cglib代理都判断了通知和目标对象不能同时为空。

Jdk代理：

```java
public JdkDynamicAopProxy(AdvisedSupport config) throws AopConfigException {
  Assert.notNull(config, "AdvisedSupport must not be null");
  if (config.getAdvisors().length == 0 && config.getTargetSource() == AdvisedSupport.EMPTY_TARGET_SOURCE) {
    throw new AopConfigException("No advisors and no TargetSource specified");
  }
  this.advised = config;
}
```

cglib代理：

```java
public CglibAopProxy(AdvisedSupport config) throws AopConfigException {
  Assert.notNull(config, "AdvisedSupport must not be null");
  if (config.getAdvisors().length == 0 && config.getTargetSource() == AdvisedSupport.EMPTY_TARGET_SOURCE) {
    throw new AopConfigException("No advisors and no TargetSource specified");
  }
  this.advised = config;
  this.advisedDispatcher = new AdvisedDispatcher(this.advised);
}
```

如果设置了拦截器，由于在最终调用目标对象方法时，没有判断目标对象是否为空，所以会报空指针异常。

### `ProxyFactory(Class<?> proxyInterface, Interceptor interceptor)`

此方法同时设置代理接口和拦截器。由于没有目标对象，也会出现上面的空指针异常情况。针对只有一个拦截器的情况下，此方法创建代理对象比较方法。

### `ProxyFactory(Class<?> proxyInterface, TargetSource targetSource)`

此方法根据代理接口和`TargetSource`创建`ProxyFactory`对象。

## `getProxy`方法

通过此方法将会获取最终的代理对象。

通过构造函数创建`ProxyFactory`对象后，还需要根据实际情况设置目标对象、代理接口以及通知，然后再调用`getProxy`方法获取代理对象。

### `Object getProxy()`无参方法

根据`ProxyFactory`的设置创建代理对象。可以重复调用此方法，如果添加或删除接口，添加或者删除拦截器，效果会有所不同。由于多次调用使用的是同一个`ProxyFactory`对象，只是配置不同，在调用代理对象的方法时，会影响到代理对象的执行过程。

此方法使用默认类加载器来创建代理，一般是线程上下文类加载器。

### `Object getProxy(ClassLoader classLoader)`

跟上面的方法类似，只是使用指定的类加载器。

### `static <T> T getProxy(Class<T> proxyInterface, Interceptor interceptor)`

此方法是静态方法，根据指定的代理接口和拦截器创建代理。内部使用`ProxyFactory(Class<?> proxyInterface, Interceptor interceptor)`方法创建`ProxyFactory`对象之后再调用无参`getProxy()`方法。

### ` static <T> T getProxy(Class<T> proxyInterface, TargetSource targetSource) `

此静态方法为指定的`TargetSource`创建代理，该代理会实现指定的接口。方法内部使用`new ProxyFactory(proxyInterface, targetSource)`方法创建`ProxyFactory`对象之后再调用无参`getProxy()`方法。

### `static Object getProxy(TargetSource targetSource)`

该静态方法为指定的`TargetSource`创建一个代理，扩展`TargetSource`的目标类。由于没有指定接口，所以方法内部会设置`proxyTargetClass`为`true`，通过cglib来创建目标对象的子类。

以下代码用来判断是否用jdk代理还是cglib来生成代理。

```java
if (config.isOptimize() || config.isProxyTargetClass() || hasNoUserSuppliedProxyInterfaces(config)) {
  Class<?> targetClass = config.getTargetClass();
  if (targetClass == null) {
    throw new AopConfigException("TargetSource cannot determine target class: " +
                                 "Either an interface or a target is required for proxy creation.");
  }
  if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
    return new JdkDynamicAopProxy(config);
  }
  return new ObjenesisCglibAopProxy(config);
}
else {
  return new JdkDynamicAopProxy(config);
}
```



