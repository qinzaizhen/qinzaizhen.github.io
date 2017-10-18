---
title: 编绎Spring Boot源码
date: 2017-10-16 15:32:39
tags: [Spring Boot ,源码]
---

1. 在spring-boot 根目录执行`./mvnw clean install -DskipTests ` 
2. cd 到`spring-boot-projects`目录，执行`../mvnw clean install -pl spring-boot-tools/spring-boot-maven-plugin -Pdefault,full -DskipTests`
3. `../mvnw clean prepare-package -pl spring-boot-docs -Pdefault,full -DskipTests` 生成文档，在`spring-boot-docs/target/contents/reference`目录

**`-DskipTests` 跳过单元测试，不然各种莫名其妙的错误。**

**不用mvnw包装器也是可以的，用自己安装的mvn来执行**