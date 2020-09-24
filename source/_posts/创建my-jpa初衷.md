---
title: 创建my-jpa初衷
tags:
  - my-jpa
  - jpa
abbrlink: b6a
date: 2019-01-07 20:07:00
---

现在项目中大多数都用Mybatis来做持久化框架，虽然mybatis很灵活，能够定制sql，但是在基础的curd功能上，还是很繁琐，每次都需要创建xml文件，添加相应的sql。也有一些第三方框架如mybatis-plus等，对mybatis做了增强，提供了基础的curd，以及其他的高级功能。但是需要在我们的源代码上加入一些框架里的注解，侵入性大。如果需要更换为hibernate，则代码更改起来非常麻烦，而且这些注解在jpa中都已经定义好了。因此在想如果让mybatis-plus支持jpa的注解就可以了，最开始也只打算做到这一步。但是无意中看到了spring-data-jpa，发现spring对jpa提供了更好的支持，比如通过方法名来转换成查询条件。因此在想干脆用mybatis来实现一个jpa，一来是使用标准的注解，二来是保持mybatis的灵活性。由此便有了`my-jpa`项目。

my-jpa项目需要达到的目标：
1. 支持jpa的大部分注解。
2. 支持mybatis的sql定制。
3. 集成`spring-data-jpa`。