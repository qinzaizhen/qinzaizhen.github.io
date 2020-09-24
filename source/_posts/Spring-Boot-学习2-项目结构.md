---
title: Spring Boot 学习2-项目结构
tags:
  - Spring Boot
  - 项目结构
abbrlink: fba8
date: 2017-11-22 11:54:33
---
# 避免使用“default”包
当默认包中的类中有`@ComponentScan`, `@EntityScan` , `@SpringBootApplication`注解时，Spring Boot容易引起特殊的问题。因为会读取每个jar包中的所有类。这样很明显会耗费更多的时间跟资源。

> 建议将域名反过来之后作为你的包名。

# 主类的位置
强烈建议将主类放在其他类之上，并放置在最上层的包中。`@EnableAutoConfiguration`注解通常是放在主类上的，而且它隐含地指出了组件扫描会以这个类所在的包为基础。比如，当你用了JPA的时候，将会使用`@EnableAutoConfiguration`注解的类的包来搜索`@Entity`实体。

在这个类上也可以添加`@ComponentScan`注解，不需要指定`basePackage`属性。如果你这个主类在最上层的话，可以在这个类上添加`@SpringBootApplication`注解。

关于`@SpringBootApplication`,`@EnableAutoConfiguration`,`@Configuration`,`@Configurable`的区别，以及背后了做了什么事情，后面有时间再写。

看下面典型的结构布局：
```
com
 +- example
     +- myapplication
         +- Application.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```

上面的例子中，`Application`就是我们的主类，可以在上面加上经典的`@Configuration`注解。在里面声明一个`main`作为我们Spring Boot 应用的入口。
例如：
```
package com.example.myapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
```
# 配置类
Spring Boot 倾向于Java代码方式的配置。尽管可以使用XML来配置Spring Boot应用，但是建议使用一个`@Configuration`类作为主要的配置源。通常定义了`main`方法的类作为主要的`@Configuration`类是比较好的方式。可以在这个配置类里面引入其他的配置，比如引入xml文件。

许多Spring 的配置例子里面都是用XML来配置，如果要改成java代码方式，可以搜一下`Enable*`开头的注解。

# 引入其他配置类
通常我们不需要将所有的`@Configuration`注解放在一个类上，为了划分模块，通常会写多个配置类。可以在我们的主配置类上添加`@Import`注解，引入其他的配置类。还可以在这个类上直接添加`@ComponentScan`注解，这个注解会将所有的Spring 组件都扫描进来，包括`@Configuration`注解的类。看一下`@Configuration`注解的文档：

> `@Configuration` is meta-annotated with `@Component`, therefore `@Configuration` classes are candidates for component scanning (typically using Spring XML's `<context:component-scan/>` element) and therefore may also take advantage of `@Autowired`/`@Inject` like any regular `@Component`. In particular, if a single constructor is present autowiring semantics will be applied transparently:
>    @Configuration
>    public class AppConfig {
>        private final SomeBean someBean;
>   
>        public AppConfig(SomeBean someBean) {
>            this.someBean = someBean;
>        }
>   
>        // @Bean definition using "SomeBean"
>   
>    }

大致意思是`@Configuration`注解使用了元注解`@Component`,因此`@Configuration`注解的类可以被组件扫描出来（经典的方式是使用Spring XML的`<context:component-scan/>`元素）而且也可以像其他组件一样使用`@Autowired`/`@Inject`的优势。如果这个类提供了一个单独的构造函数，那么自动注入将会透明地进行：
```
    @Configuration
    public class AppConfig {
        private final SomeBean someBean;
   
        public AppConfig(SomeBean someBean) {
           this.someBean = someBean;
        }
   
        // @Bean definition using "SomeBean"
   
    }
```

# 引入XML配置
如果仍然要使用XML配置，有些老项目改起来也挺麻烦，可以在主配置类上使用`@ImportResource`注解来引入XML配置文件。


