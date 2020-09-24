---
title: 自定义Scope
tags:
  - Scope
abbrlink: fe03
date: 2019-11-27 17:41:46
---

# Bean 的生命周期

所谓生命周期，即是Bean何时创建，何时生存，何时销毁。也即Bean 存在的范围。更直白点儿就是Bean的作用范围，有点儿*变量*的意味。

Spring 内置了`singleton`、`prototype`两种`Scope`，Bean 默认为`singleton`，在Spring IOC 容器中，只会创建一个，并将其缓存起来。

`prototype`作用域部署的bean，每一次请求（将其注入到另一个bean中，或者以程序的方式调用容器的`getBean()`方法）都会产生一个新的bean实例，相当与一个new的操作。对于`prototype`作用域的bean，有一点非常重要，那就是Spring不能对一个`prototype `bean的整个生命周期负责，容器在初始化、配置、装饰或者是装配完一个`prototype`实例后，将它交给客户端，随后就对该`prototype`实例不闻不问了。不管何种作用域，容器都会调用所有对象的初始化生命周期回调方法，而对`prototype`而言，任何配置好的析构回调方法都将不会被调用(`destory-method`不会被调用)，因为在注册为`DisposableBean`时将`prototype`排除在外。 清除`prototype`作用域的对象并释放任何`prototype` bean所持有的昂贵资源，都是客户端代码的职责。让Spring 容器释放被`singleton`作用域 bean 占用资源的一种可行方式是，通过使用 bean的后置处理器，该处理器持有要被清除的bean的引用。

针对Web环境，Spring又增加了`session`、`request`、`global session`三种专用于Web应用程序上下文的`Scope`。

## `Scope`接口

有时候我们还需要特殊的作用域，这时我们就可以实现该接口来达到我们的目的。上面提到的web环境中的三种也是基于此接口来实现的。

此接口是`ConfigurableBeanFactory`使用的策略接口，表示用于保存bean实例的作用范围。可以用来扩展`BeanFactory`的标准作用域`singleton`和`prototype`实现自定义作用域。

虽然该 SPI 接口主要用于扩展web环境中的Bean 作用范围，它也是完全通用的：提供了从任何底层存储机制(如HTTP会话或自定义会话机制)获取和设置对象的能力。传递到该类的`get`和`remove`方法中的名称将标识当前作用域中的目标对象。

`Scope`实现类应该是线程安全的。如果需要的话，一个`Scope`实例可以供多个bean工厂同时使用(除非显式地希望知道所包含的bean工厂)，并且任意数量的线程可以从任意数量的工厂并发地访问该作用域。

### 方法

1. Object get(String name, ObjectFactory<?> objectFactory)：从此`Scope`返回具有给定名称的对象，如果没有找到，则通过`ObjectFactory#getObject()`创建。

   这是`Scope`的核心操作，也是惟一绝对必需的操作。

2. Object remove(String name)：从`Scope`中删除该名称的对象。如果没有找到对象，则返回`null`；否则返回已删除的对象。

   注意：实现类还应该删除指定对象已注册的销毁回调(如果有的话)。**实际执行回调并销毁移除的对象是调用者的责任**。

   注意：这是一个可选操作。如果实现类不支持显式删除对象，则可能引发`UnsupportedOperationException`。

3. void registerDestructionCallback(String name, Runnable callback)：注册一个回调函数，在范围内指定对象被销毁时执行(或者在整个范围被销毁时，如果该范围没有销毁单个对象，而只是全部终止)。

   注意:这是一个可选操作。此方法将仅对具有实际销毁配置的作用域bean调用(dispose - bean、destroy-method、DestructionAwareBeanPostProcessor)。实现类应该尽量在适当的时候执行给定的回调。如果底层运行时环境根本不支持这样的回调，则必须忽略回调并记录相应的警告。

   请注意，“销毁”指的是作为`Scope`自身生命周期的一部分的对象的自动销毁，而不是指应用程序显式删除的单个作用域对象。如果一个作用域对象通过`remove(String)`方法被删除，那么任何已注册的销毁回调也应该被删除，假设被删除的对象将被重用或手动销毁。

4. Object resolveContextualObject(String key)：解析给定键的上下文对象(如果有的话)。如果此Scope支持多个上下文对象，则将每个对象与一个键值相关联，并返回与提供的*键*参数相对应的对象。否则，约定将返回*null*。例如: `request`对应的`HttpServletRequest`对象。

   此方法提供了通过key来获取对象的功能。在Spring中有一个应用的地方，在自定义Scope的bean中通过`@Value`注解注入属性时，会通过此方法解析出对应的属性。

5. String getConversationId()：返回当前底层范围的会话ID(如果有的话)。

   会话ID的确切含义取决于底层存储机制。对于`session`范围的对象，会话ID通常等于(或源自)session ID。

   注意:这不是必须的。如果底层存储机制没有明显的ID时，则可以在此方法的实现中返回`null`。

## 自定义Scope

在`AbstractBeanFactory`的`doGetBean`方法中，会判断是否是自定义`Scope`，并调用`get`方法。在我们的自定义Scope的get方法中，需要根据我们的场景来返回bean。比如我们要实现线程级别共享的bean，则需要判断当前线程是否存在，不存在就调用`ObjectFactory`的`getObject`方法创建bean，否则就返回存在的对象。`ObjectFactory`负责去创建bean，这个创建的过程跟其他的`Scope`一致，`Scope`要做的就是控制何时创建就OK了。

同时，我们还必须**确保实现是线程安全的，**因为Scope可以同时由多个bean工厂使用。

```java
String scopeName = mbd.getScope();
final Scope scope = this.scopes.get(scopeName);
if (scope == null) {
    throw new IllegalStateException("No Scope registered for scope name '" + scopeName + "'");
}
try {
    Object scopedInstance = scope.get(beanName, () -> {
        beforePrototypeCreation(beanName);
        try {
            return createBean(beanName, mbd, args);
        }
        finally {
            afterPrototypeCreation(beanName);
        }
    });
    bean = getObjectForBeanInstance(scopedInstance, name, beanName, mbd);
}
catch (IllegalStateException ex) {
    throw new BeanCreationException(beanName,
                                    "Scope '" + scopeName + "' is not active for the current thread; consider " +
                                    "defining a scoped proxy for this bean if you intend to refer to it from a singleton",
                                    ex);
}
```



下面就以线程级别共享的Bean来创建自定义`ThreadScope`。

### 自定义Scope类：`ThreadScope`

#### 实现Scope接口

实现自定义Scope，我们需要实现`Scope`接口。

```java
public class ThreadScope implements Scope {
    ...
}
```

#### 管理Scope中的对象和回调

实现自定义`Scope`类时要考虑的第一件事是如何存储和管理作用域对象和销毁回调。

在此例中，使用`ThreadLocal`来保存对象。

```java
/**
* 用于保存线程变量
*/
private ThreadLocal<Map<String, Object>> objectThreadLocal = new ThreadLocal<>();
private ThreadLocal<Map<String, Runnable>> callbackThreadLocal = new ThreadLocal<>();
```



#### 实现`get`方法

当Spring 容器遇到我们定义的`Scope`时，会从`Scope`中获取bean。因此我们需要实现`get`方法，当要获取的对象不在当前`Scope`中时，我们需要创建该对象并返回。

在这个例子中，则是判断当前线程中是否有该对象。

```java
Map<String, Object> map = Optional.ofNullable(objectThreadLocal.get()).orElse(new HashMap<>());
Object o = Optional.ofNullable(map.get(name)).orElse(objectFactory.getObject());
map.put(name,o);
objectThreadLocal.set(map);
return o;
```

在`Scope`接口定义的五个方法中，**仅`get`方法才需要具有**所描述行为**的完整实现**。其他四个方法是可选的，如果它们不需要或不支持功能，则可能引发*UnsupportedOperationException*。

#### 注册销毁回调

我们还需要`registerDestructionCallback`方法。此方法提供了一个回调，当命名对象被销毁或者`Scope`本身被销毁时执行此回调。

```java
public void registerDestructionCallback(String name, Runnable callback) {
    callbackThreadLocal.get().put(name, callback);
}
```

#### 从Scope中删除对象

接下来实现`remove`方法，该方法从Scope中删除命名对象，并删除其注册的销毁回调，并返回删除的对象：

```java
Map<String, Object> map = objectThreadLocal.get();
Object o = map.remove(name);
callbackThreadLocal.get().remove(name);
return o;
```

请注意，Spring 并不会帮我们调用remove和执行回调方法，**实际执行回调并销毁移除的对象是调用者的责任**，因为Spring也不知道何时该remove掉对象。

#### 获取会话ID

现在实现`getConversationId`方法。如果Scope支持会话ID的概念，则可以在此处将其返回。否则，约定将返回*null*：

此例中不需要会话ID，直接返回`null`。

#### 解析上下文对象

最后实现`resolveContextualObject`方法。如果范围支持多个上下文对象，则将每个对象与一个键值相关联，并返回与提供的*键*相对应的对象。否则，约定将返回*null*。此例中不需要。

#### 注册自定义`Scope`

为了使Spring容器知道这个新作用域，可以**通过`ConfigurableBeanFactory`实例上的`registerScope`方法对其进行注册**。让我们看一下该方法的定义：

```java
void registerScope(String scopeName, Scope scope);
```

第一个参数`scopeName`用于指定唯一标识，第二个参数`scope`指定具体的实例。

要拿到`ConfigurableBeanFactory`我们可以实现`BeanFactoryPostProcessor`:

```java
public class ThreadScopeBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
 
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        beanFactory.registerScope(ThreadScope.SCOPE_NAME,new ThreadScope());
    }
}
```

将此*ThreadScopeBeanFactoryPostProcessor* 注册到Spring容器中:

```java
context.addBeanFactoryPostProcessor(new ThreadScopeBeanFactoryPostProcessor());
```

Spring 为我们提供了一个更方便的类：`org.springframework.beans.factory.config.CustomScopeConfigurer`。

该类也实现了`BeanFactoryPostProcessor`接口，增加了两个方法：`setScopes(Map<String, Object> scopes)`和`addScope(String scopeName, Scope scope)`，可以更方便注册`Scope`。

同样也通过`context.addBeanFactoryPostProcessor()`方法将`CustomScopeConfigurer`注册到容器中。

*这里手动注册的原因是可以更清楚的知道是如何使用这个`BeanFactoryPostProcessor`，在平时使用的过程中，只需要在xml中配置，或者使用注解`@Bean`配置即可*。

#### 使用自定义`Scope`

现在已经注册了自定义`Scope`，可以将其应用于我们的任何bean，通过使用`@Scope注解并指定我们的自定义Scope名称。

##### 定义Bean

让我们创建一个简单的*ScopeBean*类，稍后我们将声明这种类型的`ThreadScope`的bean

```java
public class ScopeBean {
}
```

请注意，我们没有在此类上使用类级别的`@Component`和`@Scope`批注。

##### 注册Bean

注册Bean有很多种方式：xml，`@Bean`注解。这里展示另一种方式：实现`BeanDefinitionRegistryPostProcessor`接口。该接口继承自`BeanFactoryPostProcessor`，在该接口的基础上添加了`postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry)`方法，用来注册Bean。当你不想写配置文件或者配置类的时候，用编程的方式来注册Bean，也不愧是一种有效的方式。

从这里我们也看到`BeanFactoryPostProcessor`接口是我们想要扩展Spring时的突破口。

```java
public class ScopeBeanDefinitionRegistryPostProcessor implements BeanDefinitionRegistryPostProcessor {
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition(ScopeBean.class);
        builder.setScope(ThreadScope.SCOPE_NAME);
        registry.registerBeanDefinition("scopeBean", builder.getBeanDefinition());
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
    }
}
```

在上面的代码中手动设置Scope为`ThreadScope`。

#### 测试自定义`Scope`

让我们编写一个测试类，通过加载*ApplicationContext*，并检索我们的`ThreadScope`的bean ：

```java
ConfigurableApplicationContext context = new ClassPathXmlApplicationContext();
CustomScopeConfigurer customScopeConfigurer = new CustomScopeConfigurer();
customScopeConfigurer.addScope(ThreadScope.SCOPE_NAME, new ThreadScope());
//只通过一种方式来注册scope
//context.addBeanFactoryPostProcessor(customScopeConfigurer);
context.addBeanFactoryPostProcessor(new ThreadScopeBeanFactoryPostProcessor());
//注册Bean
context.addBeanFactoryPostProcessor(new ScopeBeanDefinitionRegistryPostProcessor());
context.refresh();
System.out.println("同一线程：" + Thread.currentThread().getName() +":" + context.getBean(ScopeBean.class));
System.out.println("同一线程：" + Thread.currentThread().getName() +":" + context.getBean(ScopeBean.class));
new Thread(() -> {
    System.out.println("不同线程：" + Thread.currentThread().getName() +":" + context.getBean(ScopeBean.class));
}).start();
new Thread(() -> {
    System.out.println("不同线程：" + Thread.currentThread().getName() +":" + context.getBean(ScopeBean.class));
}).start();
```

分别打印在同一个线程和不同线程中获取的Bean：

```
同一线程：main:cn.sexycode.spring.study.chapter4.ScopeBean@e70f13a
同一线程：main:cn.sexycode.spring.study.chapter4.ScopeBean@e70f13a
不同线程：Thread-1:cn.sexycode.spring.study.chapter4.ScopeBean@c4c29bf
不同线程：Thread-0:cn.sexycode.spring.study.chapter4.ScopeBean@3b41834c
```

从结果中可以看出，在同一线程中获取的Bean 是同一个，不同线程中获取的Bean不同。

## 结论

在本文中，我们了解了`Scope`是什么，以及如何在Spring中定义，注册和使用自定义`Scope`。