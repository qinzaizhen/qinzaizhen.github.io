---
title: opencsv读取csv文件
date: 2017-06-01 14:16:36
tags: [csv ,opencsv]
---

最近的工作中需要读取到csv文件，其实csv文件就是一种纯文本文件，数据之间通过`,`隔开，可以使用io包中的Reader来读取，读取一行之后就按`,`分隔就能得到数据。
opencsv也使用到了Reader来读取csv文件，内部做了封装可以读取所有行。
```java
List<String[]> datas = csvReader.readAll();
```
list的元素是每行的元素，是一个字符串数组。

maven依赖
```xml
<dependency>
    <groupId>com.opencsv</groupId>
    <artifactId>opencsv</artifactId>
    <version>3.9</version>
</dependency>
```
