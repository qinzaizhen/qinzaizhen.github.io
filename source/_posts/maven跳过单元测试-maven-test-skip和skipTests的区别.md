---
title: maven跳过单元测试
date: 2017-04-26 16:38:45
tags: [maven, test]
---

有两种方式可以跳过单元测试
- 通过添加jvm参数的方式
- 在项目的pom文件中配置插件

###### 通过jvm参数
1. -DskipTests：不执行测试用例，但是会编绎test下的class，copy资源文件。
2. -Dmaven.test.skip=true：不编绎，不执行，不copy。


###### 配置插件
1. 不执行test的配置

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>2.20</version>
    <configuration>
        <skipTests>true</skipTests><!--两种配置经试验效果一样-->
        <!--<skip>true</skip>-->
    </configuration>
</plugin>
```

2. 不编绎test的配置

```xml
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.6.1</version>
    <configuration>
        <source>1.7</source>
        <target>1.7</target>
        <skip>true</skip>
    </configuration>
</plugin>

```
在编绎插件里面配置`skip`就可以了，`surefire` 插件不配置一样可以达到目的。
但是会copy资源文件。
```xml
<plugin>
    <artifactId>maven-resources-plugin</artifactId>
    <configuration>
        <skip>true</skip>
    </configuration>
</plugin>
```
但是我们加上这个配置之后，不copy资源文件了。

---
**综上对比，我们可以猜测，加上jvm 变量之后会影响响所有相关的插件，插件会从变量中取出相应的值。**