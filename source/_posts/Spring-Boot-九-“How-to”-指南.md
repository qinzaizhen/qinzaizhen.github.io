---
title: Spring Boot 九 - “How-to” 指南
date: 2017-10-18 21:39:45
tags: [Spring Boot]
---

## Spring Boot 应用
本节提供了一些常见的“如何做...”类型的问题的答案，这些问题在使用Spring Boot时经常出现。 这绝对不是详尽的列表，但它确实涵盖了很多。

如果你有一个我们没在这里介绍的特定问题，你可能需要访问 [stackoverflow.com](http://stackoverflow.com/tags/spring-boot) 来查看是否有其他人已经提供了答案; 这也是提出新问题的好地方（请使用`spring-boot`标签）。
### 创建自己的FailureAnalyzer
### 排除自动配置故障
### 在开始之前自定义Environment或ApplicationContext
### 构建ApplicationContext层次结构（添加父或上下文）
### 创建非web应用
## 属性和配置
### 在构建时自动扩展属性
#### 使用Maven自动扩展属性
#### 使用Gradle自动扩展属性
### 外部化SpringApplication的配置
### 更改应用程序的外部属性的位置
### 使用'short'命令行参数
### 使用YAML外部属性
### 设置激活的Spring配置文件
### 根据环境改变配置
### 发现外部属性的内置选项
## 嵌入式Web服务器
### 使用其它Web服务器
### 配置Jetty
### 添加Servlet, Filter 或 Listener
#### 使用类路径扫描添加Servlet，Filter和Listener
### 修改HTTP端口
### 使用随机未分配的HTTP端口
### 在运行时发现HTTP端口
### 配置SSL
### 配置访问日志
### 使用前端代理服务器
#### 自定义Tomcat的代理配置
### 配置Tomcat
### 启用Tomcat多Connector功能
### 使用 Tomcat的 LegacyCookieProcessor
### 配置Undertow
### 启用 Undertow 多Listener功能
### 使用@ServerEndpoint创建WebSocket端点
### 启用HTTP响应压缩
## Spring MVC
### 编写JSON REST 服务
### 编写XML REST 服务
### 自定义Jackson ObjectMapper
### 自定义@ResponseBody渲染
### 处理文件上传
### 关闭Spring MVC DispatcherServlet
### 关闭默认MVC配置
### 自定义ViewResolver
## HTTP 客户端
### 配置RestTemplate使用代理
## 日志
### 配置Logback进行日志记录
#### 配置logback只以文件输出
### 配置Log4j进行日志记录
#### 使用YAML或JSON来配置Log4j 2
## 数据访问
### 配置自定义数据源
### 配置两个数据源
### 使用Spring Data仓库
### 从Spring配置中分离@Entity定义
### 配置JPA属性
### 配置Hibernate命名策略
### 使用自定义EntityManagerFactory
### 使用两个实体管理器
### 使用传统的persistence.xml
### 使用Spring Data JPA和Mongo仓库
### 暴露Spring数据仓库为REST端点
### 配置JPA使用的组件
## 数据库初始化
### 使用JPA初始化数据库
### 使用Hibernate初始化数据库
### 初始化数据库
### 初始化一个Spring Batch数据库
### 使用更高级别的数据库迁移工具
#### 启动时执行Flyway数据库迁移
#### 启动时执行Liquibase数据库迁移
## 消息
### 禁用事务的JMS会话
## 批处理应用
### 启动时执行Spring Batch作业
## Actuator
### 更改actuator端点的HTTP端口或地址
### 自定义“whitelabel”错误页面
### Actuator 和 Jersey
## Security
### 关闭Spring Boot 安全配置
### 更改AuthenticationManager并添加用户帐户
### 在代理服务器后启用HTTPS
## 热加载
### 刷新静态内容
### 不重启容器刷新模板
#### Thymeleaf 模板
#### FreeMarker 模板
#### Groovy 模板
### 快速重启
### 不重启容器重新加载Java类
## 构建
### 生成构建信息
### 生成git信息
### 自定义依赖版本
### 使用Maven创建可执行jar
### 使用Spring Boot应用程序作为依赖
### 当可执行的jar运行时，提取特定的库
### 使用exclusions 创建不可执行的JAR
### 远程调试Maven启动的Spring Boot应用程序
### 用Ant构建可执行存档时不使用spring-boot-antlib 
## 传统部署方式
### 创建可部署的war文件
### 为老版本servlet容器创建可部署war文件
### 将现有应用转换为Spring Boot应用
### 部署WAR到WebLogic
### 在老版本容器(Servlet 2.5)中部署WAR
### 使用Jedis 代替Lettuce
