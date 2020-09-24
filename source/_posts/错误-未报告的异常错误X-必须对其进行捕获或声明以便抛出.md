---
title: '错误: 未报告的异常错误X; 必须对其进行捕获或声明以便抛出'
tags:
  - 异常
abbrlink: e88
date: 2019-06-03 17:49:05
---

今天在jdk8环境中碰到一个诡异的异常：
> 错误: 未报告的异常错误X; 必须对其进行捕获或声明以便抛出

jdk8方便是方便，但是有点儿不好排查问题。看提示应该是有个方法抛出了异常，只能按方法去排查了。最后在`java.util.Optional#orElseThrow`方法中找到了疑似代码。
`java.util.Optional#orElseThrow`:

```java
 public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
    if (value != null) {
        return value;
    } else {
        throw exceptionSupplier.get();
    }
}

```

方法参数为异常产生器，X是`Throwable`的子类。

我的原始写法是:

```java
.orElseThrow(() -> {throw new MaterialException("");})
```

本地`jdk1.8_111`版本可以正常编绎，但是在服务器`jdk1.8_152`、`jdk1.8_65`上编绎出现上述异常。
尝试换了几种写法

```java
.orElseThrow(() -> {return new MaterialException("");})
.orElseThrow(MaterialException::new})

```

按说上面几种写法语法上是差不多的，都出现异常。

最后在[stackoverflow](https://stackoverflow.com/questions/25523375/java8-lambdas-and-exceptions)上找到了一些信息。这应该是jdk的一个bug，解决方案是在加上异常限定。

```java
.<MaterialException>orElseThrow(() -> {return new MaterialException("");})
```

IDEA会提示此限定是不必要的。*其他版本未做测试。* 希望后期这个bug能修复。