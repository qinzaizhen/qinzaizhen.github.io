---
title: Spring Boot 九 - “How-to” 指南
date: 2017-10-18 21:39:45
tags: [Spring Boot, How to]
---

本节提供了一些常见的“如何做...”类型的问题的答案，这些问题在使用Spring Boot时经常出现。 这绝对不是详尽的列表，但它确实涵盖了很多。

如果你有一个我们没在这里介绍的特定问题，你可能需要访问 [stackoverflow.com](http://stackoverflow.com/tags/spring-boot) 来查看是否有其他人已经提供了答案; 这也是提出新问题的好地方（请使用`spring-boot`标签）。

我们也很乐意扩展这一节;如果你想添加一个“操作指南”，你可以向我们发送一个[pull request](https://github.com/spring-projects/spring-boot/tree/master)。

## Spring Boot 应用
### 创建自己的FailureAnalyzer
[FailureAnalyzer``](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/diagnostics/FailureAnalyzer.html)是在启动时拦截异常的好方法，并将其转换为可读的消息，将其封装到[`FailureAnalysis`](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/diagnostics/FailureAnalysis.html)中。Spring Boot为应用程序上下文相关的异常、jsr-303验证等提供了这样的分析器。实际上，也很容易创建自己的分析器。

`AbstractFailureAnalyzer`是`FailureAnalyzer`的一个方便的扩展，它检查异常中指定的异常类型的存在。你可以从它扩展，以便你的实现只有在实际存在时才有机会处理异常。如果出于某种原因，你无法处理异常，则返回`null`以给另一个实现一个处理异常的机会。

`FailureAnalyzer`的实现可以注册到`META-INF/spring.factories`，例如：`ProjectConstraintViolationFailureAnalyzer`: 
```
org.springframework.boot.diagnostics.FailureAnalyzer=\
com.example.ProjectConstraintViolationFailureAnalyzer
```

### 排除自动配置故障
Spring Boot 自动配置尽可能做“正确的事情”，但是有时候失败了并且很难告知为何失败。

在任何 Spring Boot `ApplicationContext`中有一个非常有用的`ConditionEvaluationReport`。如果启用了`DEBUG`日志输出，你将看到它。如果你使用`spring-boot-actuator`，也有一个`autoconfig`端点，该端点以JSON的格式呈现报表。使用它来调试应用程序，并查看Spring Boot 在运行时添加了哪些特性(没有哪些特性)。

可以通过查看源代码和Javadoc来回答更多的问题。下面是一些经验法则:
- 查找名为`*AutoConfiguration`的类，并读取它们的源代码，特别是`@Conditional*`，以找出它们启用和何时启用的功能。添加`-debug`到命令行或系统属性`-Ddebug`，这样可以在控制台上打印应用程序中所做的所有自动配置决策的日志。在运行的Actuator 应用程序中，可以查看`autoconfig`端点(`/application/autoconfig`或类似的JMX的端点)获取相同的信息。
- 寻找`@ConfigurationProperties`(例如[`ServerProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/ServerProperties.java))类，并从那里读取可用的外部配置选项。`@ConfigurationProperties`有一个`name`属性，它充当外部属性的前缀，因此`ServerProperties`有`prefix="server"`，其配置属性是`server.port`, `server.address`等。在一个运行的 Actuator 应用程序中，可以查看`configprops`端点。
- 查找`Binder`的`bind`方法的用法，来以一种轻松的方式从`Environment`中明确地拉出配置值。它经常被用作前缀。
- 查找直接绑定到`Environment`的`@Value`注解。
- 查找`@ConditionalOnExpression`注释，它在SpEL表达式中有开关的功能，通常使用从`Environment`中解析的占位符来进行计算。

### 在开始之前自定义Environment或ApplicationContext
`SpringApplication`拥有 `ApplicationListeners`和`ApplicationContextInitializers`，用于定制上下文或环境。Spring Boot 从`META-INF/spring.factories`加载了许多这样的内部使用的自定义。有不止一种方法可以注册额外的:
- 在运行之前，通过在`SpringApplication`上以编程的方式调用`addListeners`和`addInitializers`方法。
- 通过设置`context.initializer.classes`或`context.listener.classes`来声明。
- 通过添加`META-INF/spring.factories`来声明并打包成一个jar文件，所有应用程序都将其作为一个库使用。

`SpringApplication`向监听器发送一些特殊的`ApplicationEvents`(有些甚至在创建上下文之前)，然后注册`ApplicationContext`所发布的事件的监听器。请参阅“Spring Boot特性”小节中的“[应用程序事件和监听器](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-application-events-and-listeners)”部分以获得完整的列表。

也可以在使用`EnvironmentPostProcessor`刷新应用程序上下文之前自定义`Environment`。每个实现都应该在`META-INF/spring.factories`中注册:
```
org.springframework.boot.env.EnvironmentPostProcessor=com.example.YourEnvironmentPostProcessor
```
该实现可以加载任意文件并将其添加到`Environment`中。例如，下面这个例子从类路径加载一个YAML配置文件:
```java
public class EnvironmentPostProcessorExample implements EnvironmentPostProcessor {

	private final YamlPropertySourceLoader loader = new YamlPropertySourceLoader();

	@Override
	public void postProcessEnvironment(ConfigurableEnvironment environment,
			SpringApplication application) {
		Resource path = new ClassPathResource("com/example/myapp/config.yml");
		PropertySource<?> propertySource = loadYaml(path);
		environment.getPropertySources().addLast(propertySource);
	}

	private PropertySource<?> loadYaml(Resource path) {
		if (!path.exists()) {
			throw new IllegalArgumentException("Resource " + path + " does not exist");
		}
		try {
			return this.loader.load("custom-resource", path, null);
		}
		catch (IOException ex) {
			throw new IllegalStateException(
					"Failed to load yaml configuration from " + path, ex);
		}
	}

}
```

> 在默认情况下，`Environment`已经准备好了所有常见的Spring Boot 加载的属性。因此，可以从环境中获取文件的位置。这个例子在列表的末尾添加了`custom-resource`属性源，因此在其他任何位置中定义的键都是有优先级的。自定义的实现可以明确地定义其他顺序。

> 虽然在你的`@SpringBootApplication`上使用`@PropertySource`似乎很方便，而且很容易在`Environment`中加载自定义资源，但是我们并不推荐它，因为Spring Boot 会在`ApplicationContext`刷新之前准备好`Environment`。通过`@PropertySource`定义的任何key 都将被加载得太晚以至于不会对自动配置产生任何影响。

### 构建ApplicationContext层次结构（添加父或上下文）
你可以使用`ApplicationBuilder`类来创建父/子`ApplicationContext`层次结构。参见“Spring Boot 功能”部分的“[流式构建器API](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-fluent-builder-api)”部分，了解更多信息。
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
