---
title: Spring Boot 五-Spring Boot执行器 - 生产就绪特性
date: 2017-09-13 21:10:39
tags: [Spring Boot, 生产]
---

Spring Boot包括一些额外的功能，可帮助你在应用程序推送到生产时监视和管理它。你可以选择使用HTTP端点或JMX来管理和监视应用程序。审计，健康和指标收集可以自动应用于你的应用程序。

HTTP执行器端点仅适用于基于Spring MVC的应用程序。特别是，也不适用于Jersey除非你启用Spring MVC。