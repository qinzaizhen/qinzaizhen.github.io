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
并非所有Spring 应用程序都必须是web应用程序(或web服务)。如果你想要在`main`方法中执行一些代码，但是也要启动一个Spring应用程序来设置要使用的基础组件，那么使用Spring Boot的`SpringSpringApplication`特性这事就很容易了。一个`SpringApplication`根据它是否需要一个web应用程序来更改它的`ApplicationContext`类。你可以做的第一件事就是将servlet API依赖从类路径中去除。如果你不能这样做(例如，你从相同的代码库运行两个应用程序)，那么你可以在你的`SpringApplication`实例上显式地调用`setWebEnvironment(false)`方法，或者设置`applicationContextClass`属性(通过Java API或外部属性)。你希望作为业务逻辑运行的应用程序代码可以作为`CommandLineRunner`实现，并作为一个`@Bean`定义注入上下文中。
## 属性和配置
### 在构建时自动展开属性
你可以使用现有的构建配置自动地扩展它们，而不是在你的项目的构建配置中硬编码指定的一些属性。这在Maven和Gradle中都是可能的。

#### 使用Maven自动展开属性
你可以使用资源过滤来自动展开Maven项目中的属性。如果你使用了`spring-boot-starter-parent`，那么你可以通过`@..@`占位符访问Maven项目属性。例如：
```
app.encoding=@project.build.sourceEncoding@
app.java.version=@java.version@
```

> 只有生产配置才能通过这种方式过滤（比如`src/test/resources`中不会过滤）。

> 如果你启用了`addResources`标志，`spring-boot:run`可以将`src/main/resources`直接添加到classpath中(出去热加载的目的)。这将绕过资源过滤和这个功能。你可以使用`exec:java` goal或者自定义这个插件的配置，查看[插件使用页面](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/maven-plugin//usage.html)获取更多细节。

如果你没有使用starter parent，你需要在`pom.xml`(在`<build/>元素中`)加入以下代码：
```
<resources>
	<resource>
		<directory>src/main/resources</directory>
		<filtering>true</filtering>
	</resource>
</resources>
```
和(`<plugins/>`中)：
```
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-resources-plugin</artifactId>
	<version>2.7</version>
	<configuration>
		<delimiters>
			<delimiter>@</delimiter>
		</delimiters>
		<useDefaultDelimiters>false</useDefaultDelimiters>
	</configuration>
</plugin>
```

> 如果你在配置中使用了标准的Spring占位符(例如：`${foo}`)，`useDefaultDelimiters`属性非常重要。如果没有设置为`false`，这些也将会被展开。

#### 使用Gradle自动展开属性
你可以通过配置Java插件的`processResources`任务来自动展开Gradle项目的属性：
```
processResources {
	expand(project.properties)
}
```
然后你可以通过占位符引用Gradle项目属性，例如：
```
app.name=${name}
app.description=${description}
```

> Gradle的`expand`方法使用Groovy的`SimpleTemplateEngine`,它将转换`${...}`标志。`${..}`样式与Spring自己的属性占位符技术有冲突。为了一起使用Spring的属性占位符和自动展开，你需要转义`\${..}`Spring 的属性占位符。

### 外部化SpringApplication的配置
一个`SpringApplication`具有bean属性(主要是setter方法)，因此当你创建应用程序时你可以使用它的Java API来修改其行为。或者你可以使用`spring.main.*`中的属性对配置进行外部化。例如,在`application.properties`中你可以：
```
spring.main.web-environment=false
spring.main.banner-mode=off
```
然后Spring Boot banner 将不会在启动时打印出来，并且这个应用将不会是web应用。

> 上面的例子还演示了允许在属性名中使用下划线(_)和斜杠(-)是多么的灵活。

定义在外部配置的属性将会覆盖通过Java API指定的值，除了用来创建`ApplicationContext`的sources。让我们看下面的应用
```
new SpringApplicationBuilder()
	.bannerMode(Banner.Mode.OFF)
	.sources(demo.MyApp.class)
	.run(args);
```
使用了下面的配置：
```
spring.main.sources=com.acme.Config,com.acme.ExtraConfig
spring.main.banner-mode=console
```
实际的应用将会显示出banner（因为被配置覆盖了）并且·`ApplicationContext`使用3个source(以下面的顺序)：`demo.MyApp`, `com.acme.Config`, `com.acme.ExtraConfig`。

### 更改应用程序的外部属性的位置
默认情况下不同的source是以定义好的顺序（查看“Spring Boot特性”一节中[外部配置](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-external-config)了解确切的顺序）添加到Spring`Environment`的。

增强和修改这一功能的一个很好的方法是将@propertysource注解添加到你的应用程序sources。传递给`SpringApplication`静态方法，并使用`setSources()`添加的这些类将被检查是否有`PropertySources`，如果它们有，那么这些属性将被尽早添加到`Environment`中，以便在`ApplicationContext`生命周期的所有阶段中使用。以这种方式添加的属性比使用默认位置(如application.Properties)、系统属性、环境变量或命令行添加的任何属性优先级都要低。

你也可以提供系统属性（或环境变量）来改变这一行为：
- `spring.config.name` (`SPRING_CONFIG_NAME`),默认`application`为这个文件名的根。
- `spring.config.location` (`SPRING_CONFIG_LOCATION`) 是要加载的文件（例如classpath资源或URL）。为这个文档设置了一个单独的`Environment`属性并且它可以被系统属性，环境变量或者命令行参数覆盖。

无论你设置了什么环境变量，Spring Boot都会加载`application.properties`。如果使用了YAML那么以“.yml”结尾的文件默认也会被添加到列表中去。

Spring Boot 在`DEBUG`级别将会打印出加载的配置文件，并在`TRACE`级别打印出没有找到的备选文件。

查看[ConfigFileApplicationListener](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/context/config/ConfigFileApplicationListener.java)了解更多细节。

### 使用'短'命令行参数
有些人喜欢用（例如）`--port=9000`而不用`--server.port=9000`在命令行设置配置属性。你可以很容易地通过在`application.properties`中使用占位符来启用这个功能，例如：
```
server.port = ${port:8080}
```

> 如果你从`spring-boot-starter-parent`POM继承而来，`maven-resources-plugins`默认的过滤标记从`${*}`修改为`@`(例如`@maven.token@`代替`${maven.token}`)来避免与Spring风格的占位符冲突。如果你直接为`application.properties`启用了maven的过滤，你可能也需要修改默认的过滤符为其他的分隔符。

> 在这种特定情况下端口绑定可以在Heroku和Clound Foundry这样的PaaS环境中生效，因为这两个平台`PORT`环境变量是自动设置的，并且Spring 可以绑定到`Environment`属性的大写的同义词属性。

### 使用YAML外部属性
YAML是JSON的一个超集，并且方便以层次格式存储外部属性。例如：
```
spring:
	application:
		name: cruncher
	datasource:
		driverClassName: com.mysql.jdbc.Driver
		url: jdbc:mysql://localhost/test
server:
	port: 9000
```
创建一个名为`application.yml`的文件并放在classpath根目录，也需要将`snakeyaml`添加到依赖中(maven坐标为`org.yaml:snakeyaml`,如果你使用`spring-boot-starter`将会自动包含进来)。YAML文件将会解析为Java `Map<String,Object>`(就像一个JSON对象)，并且Spring Boot使这个map变扁平，这样它具有一层深度并且拥有句号分隔的key，有点儿像java中常常使用的`Properties`文件。

上面的YAML例子对应到`applicatoin.properties`文件：
```
spring.application.name=cruncher
spring.datasource.driverClassName=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost/test
server.port=9000
```
在“Spring Boot特性”一节中查看“[使用YAML代替Properties](http:www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-external-config-yaml)”了解更多细节。

### 设置激活的Spring profile
Spring `Environment` 有一个针对此的API，但是通常你应该设置一个系统属性(`spring.profiles.active`)或者一个OS环境变量(`SPRING_PROFILES_ACTIVE`)。例如通过一个`-D`参数（记住把它放在main 类或者jar包前）来启动你的应用：
```
$ java -jar -Dspring.profiles.active=production demo-0.0.1-SNAPSHOT.jar
```
在Spring Boot中你也可以在`application.properties`中设置激活的profile。例如：
```
spring.profiles.active=production
```
通过这种方式设置的值可以被系统属性或者环境变量设置替代，但是`SpringApplicationBuilder.profiles()`方法不会。因此后面的Java API 可以用来参数化profile而不改变默认的。

查看“Spring Boot特性”一节中[Profiles](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-profiles)了解更多细节。

### 根据环境改变配置
YAML文件实际上是一系列以`---`线分隔的文档，并且每个文档都被解析成独立的扁平map。

如果一个YAML文档包含了`spring.profiles` key, 那么这个profiles的值（逗号隔开的列表）将会传入Spring `Environment.acceptsProfiles()` 并且如果其中的任何profile激活了，那么这个文档将会包含到最终的合并结果中（否则不会）。

例如：
```
server:
	port: 9000
---

spring:
	profiles: development
server:
	port: 9001

---

spring:
	profiles: production
server:
	port: 0
```
在这个例子中，默认的端口号是9000，但是如果Spring "development" profile激活了，那么端口号会是9001，如果"production" 激活了，那么它将是0。

### 发现外部属性的内置选项
Spring Boot 在运行时从`application.properties`(或`.yml`)(和其他位置)绑定外部属性到应用程序中。在一个位置上没有(而且技术上不可能是)所有受支持的属性的详尽列表，因为属性可以来自类路径上的附加jar文件。

具有Actuator 功能的运行中的应用程序有一个`configprops`端点，它显示了通过`@ConfigurationProperties`可获得的所有绑定和可绑定属性。

附录包括一个[`application.properties`](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#common-application-properties)示例,包含了Spring Boot所支持的最常见属性的列表。最终的列表来自搜索`@ConfigurationProperties`和`@Value`注解，以及偶尔使用`Binder`的源代码。

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
