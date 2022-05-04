---
title: Spring AOP 调用同一个对象的方法
date: 2020-12-05 22:55:47
tags: [Spring,AOP]
---

经过前面的学习，我们了解了Spring AOP的执行过程。
这里想提醒注意一个小问题，我们在对象的方法中调用该对象的另外一个方法会出现什么现象呢？

# 现象

1. 定义对象方法

   ```java
   public class BusinessService implements IBusinessService{
       @Override
       public String sayHello(){
           System.out.println("hello");
           System.out.println("i want to say again");
           this.sayAgain();
           return "hello";
       }
   
       @Override
       public String sayAgain() {
           System.out.println("again");
           return "again";
       }
   }
   ```

在`sayHello` 方法中调用了该对象的`sayAgain`方法。

2. 配置aop

   ```xml
   <bean id="businessService" class="cn.sexycode.spring.study.chapter5.BusinessService"/>
   <bean id="logAspect" class="cn.sexycode.spring.study.chapter5.LogAspect"/>
   <bean class="cn.sexycode.spring.study.chapter5.BusinessBeforeAdvice"/>
   <aop:config>
       <aop:aspect id="log" ref="logAspect">
           <aop:before method="log" pointcut="execution(* cn.sexycode.spring.study.chapter5.BusinessService.*(..))"/>
       </aop:aspect>
   </aop:config>
   ```

在`BusinessService`的每个方法调用前打印`log`。

3. 执行结果

   ```java
   public static void main(String[] args) {
       ApplicationContext applicationContext = new ClassPathXmlApplicationContext("sameobject.xml");
       applicationContext.getBean(IBusinessService.class).sayHello();
   }
   ```

```
log
hello
i want to say again
again
```

并没有想我们想象的那样在每个方法中打印`log`。

原因在前面的文章中提到过，将执行到目标对象的方法`sayHello`时，这个时直接调用`sayAgain`方法时，跟代理对象没有关系了，所以是不会生效的。我们要弄清楚方法调用之所以能被拦截，就是因为我们调用的是代理对象的方法，而不是目标对象的方法。这跟子类重写父类的方法容易混淆，当我们重写之后，调用的是子类的方法。

# 解决方法

想要解决这个问题也很简单，思路就是在方法内部调用代理对象的方法就可以了。

1. 暴露代理对象
2. 将方法放到其他对象

## 暴露代理对象

Spring 给我们提供了一个工具类`org.springframework.aop.framework.AopContext#currentProxy`可以获取当前调用的代理对象。**但是需要我们暴露出代理对象，如：`<aop:aspectj-autoproxy expose-proxy="true">`**

## 将两个方法拆分到不同的对象中

这个很好理解，拆分出去后调用的是两个代理对象的方法，也就可以被拦截。