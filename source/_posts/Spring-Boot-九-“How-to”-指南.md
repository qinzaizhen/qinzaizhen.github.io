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
下面的Spring Boot starters 为我们带来了一个默认的容器：
- `spring-boot-starter-web`和`spring-boot-starter-tomcat`一起带来了tomcat，
但可以使用`spring-boot-starter-jetty` 和 `spring-boot-starter-undertow`替代。
- `spring-boot-starter-webflux`和`spring-boot-starter-reactor-netty`带来了Reactor Netty，但是可以使用`spring-boot-starter-tomcat, spring-boot-starter-jetty` 和 `spring-boot-starter-undertow`替代。

> 许多starter 只支持Spring MVC,因此它们传递地带来了`spring-boot-starter-web`。

如果你选择使用不同的HTTP服务器，你需要排除那些依赖并且引入你选择的。Spring Boot为HTTP 服务器提供了独立的starter来使这个过程尽可能简单。

下面是一个Maven 的例子：
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
	<exclusions>
		<!-- Exclude the Tomcat dependency -->
		<exclusion>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-tomcat</artifactId>
		</exclusion>
	</exclusions>
</dependency>
<!-- Use Jetty instead -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

Gradle:
```
configurations {
	// exclude Reactor Netty
	compile.exclude module: 'spring-boot-starter-reactor-netty'
}

dependencies {
	compile 'org.springframework.boot:spring-boot-starter-webflux'
	// Use Undertow instead
	compile 'org.springframework.boot:spring-boot-starter-undertow'
	// ...
}
```

> 使用`WebClient`需要`spring-boot-starter-reactor-netty`,因此如果你需要使用其他的HTTP服务器，你需要排除它。

### 配置Jetty
一般可以按照[“发现内置外部属性”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-discover-build-in-options-for-external-properties)对`@ConfigurationProperties`(`ServerProperties`是主要的一个)的建议,但也看看`ServletWebServerFactoryCustomizer`。Jetty api非常丰富,所以一旦你可以访问`JettyServletWebServerFactory`你可以以多种方式修改它。或者是添加自己的`JettyServletWebServerFactory`。

### 添加Servlet, Filter 或 Listener
有两种方法可以添加`Servlet`、`Filter`、`ServletContextListener`和其他受Servlet规范支持的`Listener`。你可以为它们提供Spring bean，也可以启用Servlet组件扫描。

#### 使用Spring Bean添加Servlet，Filter和Listener
要添加Servlet、Filter或Servlet`*Listener`，可以为其提供一个`@Bean`定义。当你想要注入配置或依赖项时，这可能非常有用。但是，你必须非常小心，它们不会引起太多其他bean的热切初始化，因为它们必须在应用程序生命周期的早期就被安装在容器中(例如，让它们依赖于你的`DataSource`或JPA配置不是一个好主意)。你可以通过在第一次使用时懒加载而不是初始化时来解决这些限制。

对于`Filters`和`Servlet`，你还可以通过添加`FilterRegistrationBean`或`ServletRegistrationBean`来添加映射和初始化参数而不是使用底层组件。

> 如果在过滤器注册中没有指定`dispatcherType`，它将匹配`FORWARD`，`INCLUDE`和`REQUEST`。 如果已启用异步，则它也将匹配`ASYNC`。
如果要迁移`web.xml`中没有`dispatcher`元素的过滤器，则需要自行指定`dispatcherType`：
>    ```
>    @Bean
>    public  FilterRegistrationBean myFilterRegistration() {
>    	FilterRegistrationBean registration = new FilterRegistrationBean();
>    	registration.setDispatcherTypes(DispatcherType.REQUEST);
>    	....
>    	return registration;
>    }
>    ```

##### 禁止注册Servlet 或 Filter
如上所述，任何`Servlet`或`Filter` bean将自动注册到servlet容器。 要禁用特定的`Filter`或`Servlet` bean的注册，请为其创建一个注册 bean并将其标记为禁用。例如：
```java
@Bean
public FilterRegistrationBean registration(MyFilter filter) {
	FilterRegistrationBean registration = new FilterRegistrationBean(filter);
	registration.setEnabled(false);
	return registration;
}
```
#### 使用类路径扫描添加Servlet，Filter和Listener
`@WebServlet`、`@WebFilter`和`@WebListener`注解类可以自动注册一个嵌入的servlet容器，通过使用`@ServletComponentScan`注解`@Configuration`类，并指定包含你想要注册的组件的包(s)。默认情况下，`@ServletComponentScan`将从带注解的类的包中进行扫描。

### 修改HTTP端口
在独立应用程序中，主HTTP端口默认为`8080`，但可以使用`server.port`（例如在`application.properties`或系统属性中）进行设置。 由于`Environment`值的松散绑定，你还可以使用`SERVER_PORT`（例如作为OS环境变量）。

要完全关闭HTTP端点，但仍然创建`WebApplicationContext`，请使用`server.port = -1`（这对于测试有时很有用）。

有关更多详细信息，请参阅“Spring Boot功能”部分中的[“定制嵌入式Servlet容器”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-customizing-embedded-containers)或[`ServerProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/ServerProperties.java)源代码。

### 使用随机未分配的HTTP端口
要扫描一个空闲端口（使用OS本机来防止冲突），请使用`server.port = 0`。
### 在运行时发现HTTP端口
你可以从日志输出中访问运行服务器的端口，也可以通过`ServletWebServerApplicationContext`的`EmbeddedWebServer`访问。最好的办法来获取和确保它已经初始化了，就是添加一个`ApplicationListener<ServletWebServerInitializedEvent>`类型的`@Bean`，并在容器发布的时候将其从容器中取出。

使用`@SpringBootTest（webEnvironment = WebEnvironment.RANDOM_PORT）`的测试用例也可以使用`@LocalServerPort`注解将实际的端口注入到字段中。例如：
```
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class MyWebIntegrationTests {

	@Autowired
	ServletWebServerApplicationContext server;

	@LocalServerPort
	int port;

	// ...

}
```

> `@LocalServerPort`是`@Value（“$ {local.server.port}”）`的元注解。不要试图在普通应用程序中注入端口。 正如我们刚刚看到的，只有在容器初始化后才会设置该值。 与测试相反，应用程序代码回调会被提前处理（即在值实际可用之前）。

### 配置SSL
可以通过设置各种`server.ssl.*`属性（通常在`application.properties`或`application.yml`中）声明性地配置SSL。例如：
```
server.port=8443
server.ssl.key-store=classpath:keystore.jks
server.ssl.key-store-password=secret
server.ssl.key-password=another-secret
```
请参阅[`Ssl`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/web/server/Ssl.java)了解所有支持的属性的详细信息。

使用类似上例的配置意味着应用程序将不再支持8080端口上的普通HTTP连接器。Spring Boot不支持通过`application.properties`配置HTTP和HTTPS两个连接器。如果你想有两个，那么你需要以编程方式配置其中之一。建议使用`application.properties`配置HTTPS，因为HTTP连接器以编程方式更容易配置。有关示例，请参阅[`spring-boot-sample-tomcat-multi-connectors`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-tomcat-multi-connectors)示例项目。

### 配置访问日志
可以通过各自的命名空间为Tomcat，Undertow和Jetty配置访问日志。

例如，以下以[自定义模式](https://tomcat.apache.org/tomcat-8.5-doc/config/valve.html#Access_Logging)配置Tomcat访问日志。
```
server.tomcat.basedir=my-tomcat
server.tomcat.accesslog.enabled=true
server.tomcat.accesslog.pattern=%t %a "%r" %s (%D ms)
```

> 日志的默认位置是相对于tomcat基本目录的`logs`目录，默认情况下该目录是临时目录，因此你可能需要修复Tomcat的基本目录或使用日志的绝对路径。在上面的示例中，日志将在相对于应用程序的工作目录的`my-tomcat/logs`目录中。

undertow 访问日志可以用类似的方式进行配置
```
server.undertow.accesslog.enabled=true
server.undertow.accesslog.pattern=%t %a "%r" %s (%D ms)
```
日志存储在相对于应用程序的工作目录的`logs`目录中。这可以通过`server.undertow.accesslog.directory`进行自定义。

最后，jetty的访问日志也可以这样配置：
```
server.jetty.accesslog.enabled=true
server.jetty.accesslog.filename=/var/log/jetty-access.log
```
默认情况下，日志将被重定向到`System.err`。 有关更多详细信息，请参阅[文档](https://www.eclipse.org/jetty/documentation/9.4.x/configuring-jetty-request-logs.html)。

### 使用前端代理服务器
你的应用程序可能需要发送`302`重定向或使用绝对链接呈现内容。在代理之后运行时，调用者需要链接到代理，而不是托管应用的机器的物理地址。通常情况下，这种情况是通过与代理的约定来处理的，代理将添加头来告诉后端如何构建到自己的链接。

如果代理添加了常规的`X-Forwarded-For`和`X-Forwarded-Proto`头（大部分是开箱即用的），只要在你的`application.properties`中设置`server.use-forward-headers`为`true`的,那么服务器就可以正确地呈现绝对链接。

> 如果你的应用程序正在Cloud Foundry 或 Heroku 中运行，那么`server.use-forward-headers`属性将默认为`true`（如果未指定）。 在所有其他情况下，它默认为`false`。

#### 自定义Tomcat的代理配置
如果你正在使用Tomcat，则可以另外配置用于携带“转发”信息的头的名称：
```
server.tomcat.remote-ip-header=x-your-remote-ip-header
server.tomcat.protocol-header=x-your-protocol-header
```
Tomcat也配置了一个默认的正则表达式来匹配要被信任的内部代理。默认情况下，`10/8`, `192.168/16`, `169.254/16` 和 `127/8`中的IP地址是可信的。你可以通过向`application.properties`添加条目来自定义阀的配置。例如：
```
server.tomcat.internal-proxies=192\\.168\\.\\d{1,3}\\.\\d{1,3}
```

> 只有在使用属性文件进行配置时才需要双反斜杠。如果你使用的是YAML，则单个反斜杠就足够了，并且与上面显示的相同的值将是`192\.168\.\d{1,3}\.\d{1,3}`。

> 你可以通过将`internal-proxies`设置为空来信任所有代理（但不要在生产中这样做）。

通过切换自动关闭（即设置 `server.use-forward-headers = false`）并在`TomcatServletWebServerFactory` bean中添加一个新的阀实例，可以完全控制Tomcat的`RemoteIpValve`配置。

### 配置Tomcat
通常，你可以按照[“发现外部属性的内置选项”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-discover-build-in-options-for-external-properties)中有关`@ConfigurationProperties`（`ServerProperties`是此处的主要内容）的建议，还可以查看`ServletWebServerFactoryCustomizer`和各种可以添加到Tomcat特定的`*Customizers`。 Tomcat的API相当丰富，所以一旦你可以访问`TomcatServletWebServerFactory`，你可以通过多种方式对其进行修改。或者是添加自己的`TomcatServletWebServerFactory`。

### 启用Tomcat多Connector功能
将`org.apache.catalina.connector.Connector`添加到`TomcatServletWebServerFactory`，该`TomcatServletWebServerFactory`可以允许多个连接器，例如， HTTP和HTTPS连接器：
```
@Bean
public ServletWebServerFactory servletContainer() {
	TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
	tomcat.addAdditionalTomcatConnectors(createSslConnector());
	return tomcat;
}

private Connector createSslConnector() {
	Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
	Http11NioProtocol protocol = (Http11NioProtocol) connector.getProtocolHandler();
	try {
		File keystore = new ClassPathResource("keystore").getFile();
		File truststore = new ClassPathResource("keystore").getFile();
		connector.setScheme("https");
		connector.setSecure(true);
		connector.setPort(8443);
		protocol.setSSLEnabled(true);
		protocol.setKeystoreFile(keystore.getAbsolutePath());
		protocol.setKeystorePass("changeit");
		protocol.setTruststoreFile(truststore.getAbsolutePath());
		protocol.setTruststorePass("changeit");
		protocol.setKeyAlias("apitester");
		return connector;
	}
	catch (IOException ex) {
		throw new IllegalStateException("can't access keystore: [" + "keystore"
				+ "] or truststore: [" + "keystore" + "]", ex);
	}
}
```

### 使用 Tomcat的 LegacyCookieProcessor
Spring Boot使用的嵌入式Tomcat不支持开箱即用的Cookie格式的“Version 0”，你可能会看到以下错误：
```
java.lang.IllegalArgumentException: An invalid character [32] was present in the Cookie value
```
如果可能的话，你应该考虑更新你的代码，只存储符合新Cookie规范的值。但是，如果你无法更改cookie的写入方式，则可以将Tomcat配置为使用`LegacyCookieProcessor`。 要切换到`LegacyCookieProcessor`，请使用添加`TomcatContextCustomizer`的`ServletWebServerFactoryCustomizer` bean：
```
@Bean
public WebServerFactoryCustomizer<TomcatServletWebServerFactory> cookieProcessorCustomizer() {
	return (serverFactory) -> serverFactory.addContextCustomizers(
			(context) -> context.setCookieProcessor(new LegacyCookieProcessor()));
}
```

### 配置Undertow
### 启用 Undertow 多Listener功能
### 使用@ServerEndpoint创建WebSocket端点
如果要在使用嵌入式容器的Spring Boot应用程序中使用`@ServerEndpoint`，则必须声明一个`ServerEndpointExporter ` `@Bean`：
```
@Bean
public ServerEndpointExporter serverEndpointExporter() {
	return new ServerEndpointExporter();
}
```
这个bean将用底层的WebSocket容器注册任何`ServerEndpoint`注解的bean。当部署到一个独立的servlet容器时，这个角色由servlet容器初始化器执行，而`ServerEndpointExporter` bean是不需要的。

### 启用HTTP响应压缩
Jetty,Tomcat和Undertow都支持HTTP响应压缩。可以通过`application.properties`启用：
```
server.compression.enabled=true
```
默认情况下，响应的长度必须至少达到2048个字节，以便进行压缩。可以使用`server.compression.min-response-size`属性进行配置。

默认情况下，只有当内容类型为以下内容时，响应才会被压缩:
- text/html
- text/xml
- text/plain
- text/css

可以使用`server.compression.mime-types`属性进行配置。

## Spring MVC
### 编写JSON REST 服务
在Spring Boot应用程序中，只要Jackson2位于类路径上, 任何Spring `@RestController`都应该在默认情况下呈现JSON响应。例如:
```
@RestController
public class MyController {

	@RequestMapping("/thing")
	public MyThing thing() {
			return new MyThing();
	}

}
```
只要`MyThing`可以由Jackson2(例如普通的POJO或Groovy对象)序列化，那么`localhost:8080/thing`将默认返回JSON。有时在浏览器中，你可能会看到XML响应，因为浏览器倾向于发送XML优先的accept头。

### 编写XML REST 服务
如果在类路径中有Jackson XML扩展(`jackson-dataformat-xml`)，它将被用于呈现XML响应，而与我们使用的JSON相同的示例也会起作用。要使用它，请在你的项目中添加以下依赖项:
```xml
<dependency>
	<groupId>com.fasterxml.jackson.dataformat</groupId>
	<artifactId>jackson-dataformat-xml</artifactId>
</dependency>
```
你可能还想添加对Woodstox的依赖。它比JDK提供的默认StAX实现快得多，而且还增加了美化的打印支持和改进的命名空间处理:
```xml
<dependency>
	<groupId>org.codehaus.woodstox</groupId>
	<artifactId>woodstox-core-asl</artifactId>
</dependency>
```
如果不能使用杰克逊的XML扩展，那么将使用JAXB(默认为JDK提供)，并附加要求将`MyThing`注解`@XmlRootElement`:
```java
@XmlRootElement
public class MyThing {
	private String name;
	// .. getters and setters
}
```
为了让服务器呈现XML而不是JSON，你可能需要发送一个`Accept:text/XML`头(或使用浏览器)。

### 自定义Jackson ObjectMapper
Spring MVC(客户端和服务器端)使用`HttpMessageConverters`在HTTP交互中协商内容转换。如果Jackson 在类路径中,你已经得到了`Jackson2ObjectMapperBuilder`提供的默认的转换器(s),这是自动配置的一个实例。

默认创建的`ObjectMapper`(或用于JacksonXML转换器的`XmlMapper`)实例具有以下自定义属性:
- `MapperFeature.DEFAULT_VIEW_INCLUSION`是禁用的
- `DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES`是禁用的

Spring Boot也有一些特性，可以使定制这个行为变得更加容易。

你可以使用环境配置`ObjectMapper`和`XmlMapper`实例。Jackson提供了一套广泛的简单的开关特性，可用于配置其处理的各个方面。这些特性是在Jackson的六个枚举中描述的，这些枚举映射到环境中的属性:

Jackson 枚举 | 环境属性
---|---
`com.fasterxml.jackson.databind.DeserializationFeature`|`spring.jackson.deserialization.<feature_name>=true|false`
`com.fasterxml.jackson.core.JsonGenerator.Feature`|`spring.jackson.generator.<feature_name>=true|false`
`com.fasterxml.jackson.databind.MapperFeature`|`spring.jackson.mapper.<feature_name>=true|false`
`com.fasterxml.jackson.core.JsonParser.Feature`|`spring.jackson.parser.<feature_name>=true|false`
`com.fasterxml.jackson.databind.SerializationFeature`|`spring.jackson.serialization.<feature_name>=true|false`
`com.fasterxml.jackson.annotation.JsonInclude.Include`|`spring.jackson.default-property-inclusion=always|non_null|non_absent|non_default|non_empty`

例如,设置`spring.jackson.serialization.indent_output = true`启用美化打印。注意，由于使用了[松散绑定](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/html/boot-features-external-config.html#boot-features-external-config-relaxed-binding)，`indent_output`的情况不必与对应的枚举常量相匹配，后者是`INDENT_OUTPUT`。

这种基于环境的配置应用于自动配置`Jackson2ObjectMapperBuilder` bean,并将适用于任何使用这个builder创建的mappers ,包括自动配置`ObjectMapper` bean。

上下文的`Jackson2ObjectMapperBuilder`可以由一个或多个`Jackson2ObjectMapperBuilderCustomizer` bean定制。这种定制的bean可以被排序，而Boot自己的定制器的顺序是0，允许在Boot的定制之前和之后进行额外的定制。

任何`com.fasterxml.jackson.databind.Module`类型的bean将自动注册自动配置的`Jackson2ObjectMapperBuilder`和应用于任何它创建的`ObjectMapper`实例。当向你的应用程序添加新特性时，这提供了一种用于定制模块的全局机制。

如果你想完全替换默认`ObjectMapper`,要么定义一个这种类型的`@ bean`并将其标记为`@Primary`,或者,如果你喜欢builder方式,可以定义一个`Jackson2ObjectMapperBuilder`  的`@Bean`。注意，在这两种情况下，这将禁用`ObjectMapper`的所有自动配置。

如果你提供任何`MappingJackson2HttpMessageConverter`类型的`@ Beans`然后他们将取代MVC的默认配置。另外，还提供了一种`HttpMessageConverters`类型的bean(如果使用默认的MVC配置的话，总是可用的)，它提供了一些有用的方法来访问默认的和用户增强的消息转换器。

请参阅[“定制`@ResponseBody`渲染”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/html/howto-spring-mvc.html#howto-customize-the-responsebody-rendering)部分和[`WebMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration.java)源代码以获得更多详细信息。

### 自定义@ResponseBody渲染
Spring使用`HttpMessageConverters`来渲染`@ResponseBody`(或来自`@RestController`的响应)。只需在Spring Boot 上下文中添加这种类型的bean，就可以提供额外的转换器。如果添加的bean是默认包含的类型(例如`MappingJackson2HttpMessageConverter` JSON转换),那么它将取代默认值。提供了一种`HttpMessageConverters`类型的bean(如果使用默认的MVC配置的话，总是可用的)，它提供了一些有用的方法来访问默认的和用户增强的消息转换器(例如，如果你想手动将它们注入到一个定制的`RestTemplate`中)。

在正常使用MVC时,任何提供的`WebMvcConfigurer` bean通过重写`configureMessageConverters`方法也可以贡献转换器,但与正常MVC不一样的是,你只能供应你需要的额外的转换器(因为 Spring Boot 使用相同的机制提供它默认的)。最后,如果你选择通过提供自己的`@EnableWebMvc`配置退出Spring Boot默认的MVC配置,然后你可以完全控制,并使用`WebMvcConfigurationSupport` 到`getMessageConverters`来手动做任何事。

更多细节请参见[`WebMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration.java)源代码。

### 处理文件上传
Spring Boot包含Servlet 3 `javax.servlet.http.Part`API来支持上传文件。在默认情况下，Spring Boot配置Spring MVC，每个文件最大为1MB，在单个请求中最多可达到10MB的文件数据。你可以覆盖这些值，以及存储中间数据的位置(例如，存储到`/tmp`目录)，以及通过使用在`MultipartProperties`类中公开的属性将数据刷新到磁盘的阈值。如果你想指定文件是无限的,例如,设置`spring.servlet.multipart.max-file-size`属性为`-1`。

当你希望在Spring MVC控制器处理程序方法中作为`@RequestParam`注解的`MultipartFile`类型参数来接收multipart编码的文件数据时，multipart的支持是很有帮助的。

查看[`MultipartAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/MultipartAutoConfiguration.java)源代码获取更多的细节。

### 关闭Spring MVC DispatcherServlet
Spring Boot希望从应用程序的`/`提供所有内容。如果你更愿意将自己的servlet映射到该URL，你可以这样做，但是你可能会丢失一些其他的Boot MVC 特性。添加自己的servlet并将其映射到根资源只需声明一个`Servlet`类型的`@ Bean`并且给它特殊的bean名称-`dispatcherServlet`(如果你想关掉它,而不是取代它,你还可以创建一个不同类型同名称的bean)。

### 关闭默认MVC配置
对MVC配置进行完全控制的最简单方法是，提供你自己的`@Configuration`，并使用`@EnableWebMvc`注解。这将把所有MVC配置掌握在你的手中。

### 自定义ViewResolver
`ViewResolver`是Spring MVC的核心组件，将`@Controller`中的视图名转换为实际的`View`实现。请注意，`ViewResolvers`主要用于UI应用程序，而不是REST风格的服务(`View`不用于渲染`@ResponseBody`)。有许多`ViewResolver`的实现可供选择，而Spring本身并不建议你应该使用哪一个。另一方面，Spring Boot根据它在类路径和应用程序上下文中找到的内容，为你安装一个或两个。`DispatcherServlet`使用它在应用程序上下文中找到的所有解析器，依次尝试每一个解析器，直到得到一个结果，因此，如果你要添加自己的解析器，那么你必须了解该顺序，并在其中添加你的解析器。

`WebMvcAutoConfiguration`为您的上下文添加了以下`ViewResolvers`:

- 一个`InternalResourceViewResolver` bean，id 为“defaultViewResolver”。这一项定位了可以使用`DefaultServlet`来渲染的物理资源(例如，如果你使用的是静态资源和JSP页面)。它在视图名中应用一个前缀和一个后缀，然后在servlet上下文中查找带有该路径的物理资源(默认值都是空的，但是通过`spring.mvc.view.prefix`和`spring.mvc.view.suffix`可以访问外部配置)。可以通过提供相同类型的bean来覆盖它。
- 一个id为“BeanNameViewResolver”的`BeanNameViewResolver`。这是视图解析器链中的一个有用的成员，它将使用与正在解析的`View`相同的名称来获取任何bean。不应该重写或替换它。
- 一个id 为“viewResolver”的`ContentNegotiatingViewResolver` 实际上只有存在实际的`View`类型的bean时才会被添加。这是一个“主”解析器，委托给其他解析器，并试图找到一个匹配客户端发送的“Accept”HTTP头的匹配项。有一个[关于`ContentNegotiatingViewResolver`有用的博客](https://spring.io/blog/2013/06/03/content-negotiation-using-views),你可能更喜欢研究学习,可以查看源代码了解更多。你可以通过定义一个bean名为“viewResolver”关掉自动配置`ContentNegotiatingViewResolver`。
- 如果你用的是Thymeleaf，也会有一个id为“thymeleafViewResolver”的`ThymeleafViewResolver`。它通过使用前缀和后缀包围视图名来查找资源(`spring.thymeleaf.prefix`和`spring.thymeleaf.suffix`，默认分别为"classpath:/templates/"和".html"的)。可以通过提供相同名称的bean来覆盖它。
- 如果你使用FreeMarker，也会有一个id为“freeMarkerViewResolver”的`FreeMarkerViewResolver`。它在围绕视图名称的前缀和后缀(`spring.freemarker.prefix`和 `spring.freemarker.suffix`)的加载路径(`spring.freemarker.templateLoaderPath`,默认分别为“classpath:/templates/”和".tpl")中查找资源。可以通过提供相同名称的bean来覆盖它。
- 如果您使用的是Groovy模板(实际上，如果你的类路径上有Groovy模板)，那么也会有一个id为'groovyMarkupViewResolver'的`GroovyMarkupViewResolver`。它在围绕视图名称的前缀和后缀(`spring.groovy.template.prefix`和 `spring.groovy.template.suffix`)的加载路径(`spring.freemarker.templateLoaderPath`,默认分另为“classpath:/templates/”和".tpl")中查找资源。可以通过提供相同名称的bean来覆盖它。

查看[`WebMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration.java)、[`ThymeleafAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/thymeleaf/ThymeleafAutoConfiguration.java)，[`FreeMarkerAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/freemarker/FreeMarkerAutoConfiguration.java)，[`GroovyTemplateAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/groovy/template/GroovyTemplateAutoConfiguration.java)了解更多。

## HTTP 客户端
### 配置RestTemplate使用代理
正如[“RestTemplate定制”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/html/boot-features-resttemplate.html#boot-features-resttemplate-customization)中所描述的那样，`RestTemplateCustomizer`可以使用`RestTemplateBuilder`来构建一个定制的`RestTemplate`。这是创建配置使用代理的`RestTemplate`的推荐方法。

代理配置的具体细节取决于正在使用的底层客户端请求工厂。这里有一个例子配置`HttpComponentsClientRequestFactory`,包含了一个 `HttpClient`,除了`192.168.0.5`以外，它为其他的主机都使用一个代理。
```java
static class ProxyCustomizer implements RestTemplateCustomizer {

	@Override
	public void customize(RestTemplate restTemplate) {
		HttpHost proxy = new HttpHost("proxy.example.com");
		HttpClient httpClient = HttpClientBuilder.create()
				.setRoutePlanner(new DefaultProxyRoutePlanner(proxy) {

					@Override
					public HttpHost determineProxy(HttpHost target,
							HttpRequest request, HttpContext context)
									throws HttpException {
						if (target.getHostName().equals("192.168.0.5")) {
							return null;
						}
						return super.determineProxy(target, request, context);
					}

				}).build();
		restTemplate.setRequestFactory(
				new HttpComponentsClientHttpRequestFactory(httpClient));
	}

}
```
## 日志
除了Commons Logging API，Spring Boot没有强制的日志记录依赖，其中有许多实现可供选择。要使用[Logback](http://logback.qos.ch/)，你需要在引入它和`jcl-over-slf4j`(它实现了公共资源日志API)。最简单的方法是通过starter，这些启动器都依赖于`spring-boot-starter-logging`。对于一个web应用程序，你只需要`spring-boot-starter-web`，因为它依赖于日志starter。例如在Maven中：
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
Spring Boot有一个`LoggingSystem`抽象，它试图根据类路径的内容来配置日志记录。如果可以使用Logback，这是第一选择。

如果你需要对日志进行的惟一更改是设置不同记录器的级别，那么你可以在`application.properties`中使用"logging.level" 前缀来执行此操作,,如:
```
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=ERROR
```
你还可以使用“logg.file”设置文件的位置(除控制台之外)。

要更细粒度的设置日志系统，你需要使用由`LoggingSystem`支持的原生配置格式。默认情况下，Spring Boot从系统的默认位置获取原生配置(例如:Logback的`classpath:logback.xml`)，但是你可以使用"logging.config"属性设置配置文件的位置。
### 配置Logback进行日志记录
如果你放了一个`logback.xml`文件在类路径的根目录中，它将从那里获取(或者是`logback-spring.xml`以利用Boot 提供的模板特性)。Spring Boot提供了一个默认的基本配置，如果你只想设置级别，你可以包括它。例如：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
	<include resource="org/springframework/boot/logging/logback/base.xml"/>
	<logger name="org.springframework.web" level="DEBUG"/>
</configuration>
```

如果你看过spring-boot jar中的`base.xml`，你将看到它使用了一些有用的系统属性，`LoggingSystem`为你创建了这些属性。它们是:

- `${PID}`当前的进程ID。
- `${LOG_FILE}` 如果在Boot的外部配置中设置了`logging.file`。
- `${LOG_PATH}` 如果设置了`logging.path`(表示一个用于存放日志文件的目录)。
- `${LOG_EXCEPTION_CONVERSION_WORD}` 如果在Boot 的外部配置中设置了`logging.exception-conversion-word`。

Spring Boot还使用自定义的Logback转换器在控制台(但不是在日志文件中)提供了一些漂亮的ANSI颜色终端输出。查看默认的`base.xml`配置了解更多细节。

如果Groovy在类路径上，你应该也能够用`logback.groovy`来配置Logback(如果有的话，它将会被优先考虑)。

#### 配置logback只以文件输出
如果你想要禁用控制台日志记录，并且只将输出写入文件，那么你需要一个自定义的`logback-spring.xml`文件,它引入`file-appender.xml`而不引入`console-appender.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
	<include resource="org/springframework/boot/logging/logback/defaults.xml" />
	<property name="LOG_FILE" value="${LOG_FILE:-${LOG_PATH:-${LOG_TEMP:-${java.io.tmpdir:-/tmp}}/}spring.log}"/>
	<include resource="org/springframework/boot/logging/logback/file-appender.xml" />
	<root level="INFO">
		<appender-ref ref="FILE" />
	</root>
</configuration>
```
你还需要在`application.properties`中加入`logging.file`:
```
logging.file=myapplication.log
```
### 配置Log4j进行日志记录
如果在类路径上存在[Log4j 2](http://logging.apache.org/log4j/2.x)，Spring Boot 将支持Log4j 2进行日志配置。如果你正在使用starter来收集依赖关系，这意味着你必须排除Logback，然后将log4j 2包含在内。如果你没有使用starter，那么除了Log4j 2之外，你还需要提供`jcl-over-slf4j`(至少)。

最简单的方式可能是通过starter，尽管它需要配置一些不包含，例如在Maven中：
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter</artifactId>
	<exclusions>
		<exclusion>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-logging</artifactId>
		</exclusion>
	</exclusions>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```

> Log4j starter的使用聚集了对常见日志必要的依赖项(例如，包括Tomcat使用的`java.util.logging`但是配置使用Log4j 2进行日志记录）。请参阅Actuator Log4j 2的示例以获得更多细节，并在实际操作中查看。

#### 使用YAML或JSON来配置Log4j 2
除了默认的XML配置格式之外，Log4j 2还支持YAML和JSON配置文件。要配置Log4j 2以使用另一种配置文件格式，将适当的依赖项添加到类路径，并命名配置文件以匹配你所选择的文件格式:

格式|	依赖|	文件名
---|---|---
YAML|com.fasterxml.jackson.core:jackson-databind    com.fasterxml.jackson.dataformat:jackson-dataformat-yaml|log4j2.yaml log4j2.yml
JSON|com.fasterxml.jackson.core:jackson-databind|log4j2.json   log4j2.jsn

## 数据访问
### 配置自定义数据源
要配置你自己的`DataSource`，请在你的配置中定义该类型的`@Bean`。 Spring Boot会在需要的地方重复使用你的`DataSource`，包括数据库初始化。 如果你需要将某些设置外部化，则可以轻松地将`DataSource`绑定到环境（请参阅[第24.7.1节“第三方配置”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/html/boot-features-external-config.html#boot-features-external-config-3rd-party-configuration)）。
```java
@Bean
@ConfigurationProperties(prefix="app.datasource")
public DataSource dataSource() {
	return new FancyDataSource();
}
```
```
app.datasource.url=jdbc:h2:mem:mydb
app.datasource.username=sa
app.datasource.pool-size=30
```
假设你的`FancyDataSource`具有常规的JavaBean属性,包括url，用户名和池大小，那么在`DataSource`可用于其他组件之前，将自动绑定这些设置。 常规的[数据库初始化](http://www.docsh.site/docs/spring-boot/spring-boot-docs/current/en/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-spring-jdbc)也会发生（所以`spring.datasource.*`的相关子集仍然可以与你的自定义配置一起使用）。

如果你正在配置自定义的JNDI`DataSource`，则可以应用相同的原则：
```java
@Bean(destroyMethod="")
@ConfigurationProperties(prefix="app.datasource")
public DataSource dataSource() throws Exception {
	JndiDataSourceLookup dataSourceLookup = new JndiDataSourceLookup();
	return dataSourceLookup.getDataSource("java:comp/env/jdbc/YourDS");
}
```
Spring Boot还提供了一个实用的构造器类`DataSourceBuilder`，可用于创建其中一个标准数据源（如果它在类路径上）。构造器可以根据类路径上的可用内容来检测要使用的类。 它也会根据JDBC URL自动检测驱动程序。
```java
@Bean
@ConfigurationProperties("app.datasource")
public DataSource dataSource() {
	return DataSourceBuilder.create().build();
}
```
要使用该`DataSource`运行应用程序，所需要的只是连接信息; 还可以提供特定于池的设置，请检查将在运行时使用的具体实现以获取更多详细信息。
```
app.datasource.url=jdbc:mysql://localhost/test
app.datasource.username=dbuser
app.datasource.password=dbpass
app.datasource.pool-size=30
```
但有一个问题。 由于连接池的实际类型未公开，所以在你的自定义`DataSource`的元数据中不会生成任何键，并且你的IDE中没有自动提示功能（`DataSource`接口不公开任何属性）。 另外，如果你碰巧在类路径上有Hikari，这个基本的设置将不起作用，因为Hikari没有`url`属性（而是一个`jdbcUrl`属性）。 你将不得不重写你的配置：
```
app.datasource.jdbc-url=jdbc:mysql://localhost/test
app.datasource.username=dbuser
app.datasource.password=dbpass
app.datasource.maximum-pool-size=30
```
你可以通过强制连接池使用并返回一个专门的实现，而不是`DataSource`来解决这个问题。 你将无法在运行时更改实现，但选项列表将是显式的。
```java
@Bean
@ConfigurationProperties("app.datasource")
public HikariDataSource dataSource() {
	return DataSourceBuilder.create().type(HikariDataSource.class).build();
}
```
你甚至可以进一步利用`DataSourceProperties`为你做的事情，即如果没有提供一个合理的用户名和密码的URL,则提供一个默认的嵌入式数据库。 你可以很容易地从任何`DataSourceProperties`的状态初始化一个`DataSourceBuilder`，所以你可以注入Spring Boot自动创建的那个。 但是，这会将你的配置拆分为两个命名空间：url，用户名，密码，类型和驱动在`spring.datasource`上，其他的在自定义命名空间（`app.datasource`）上。为了避免这种情况，你可以在自定义命名空间上重新定义自定义的`DataSourceProperties`：
```java
@Bean
@Primary
@ConfigurationProperties("app.datasource")
public DataSourceProperties dataSourceProperties() {
	return new DataSourceProperties();
}

@Bean
@ConfigurationProperties("app.datasource")
public HikariDataSource dataSource(DataSourceProperties properties) {
	return properties.initializeDataSourceBuilder().type(HikariDataSource.class)
			.build();
}
```
除了选择了一个专用的连接池（在代码中）并且它的设置暴露在相同的命名空间，这个设置使你与默认情况下的Spring Boot配合。 由于`DataSourceProperties`为你处理`url`/`jdbcUrl`转义，因此可以像这样配置它：
```
app.datasource.url=jdbc:mysql://localhost/test
app.datasource.username=dbuser
app.datasource.password=dbpass
app.datasource.maximum-pool-size=30
```
> 由于你的自定义配置选择Hikari，`app.datasource.type`将不起作用。 在实践中，构造器将被初始化为设置的任何可能的值，然后被对`.type()`的调用覆盖。

更多详细信息请参见“Spring Boot功能”部分的[第29.1节“配置数据源”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/html/boot-features-sql.html#boot-features-configure-datasource)和[`DataSourceAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/DataSourceAutoConfiguration.java)类源代码。

### 配置两个数据源
如果你需要配置多个数据源，则可以应用上一节中所述的相同技巧。 但是，你必须标记一个`DataSource``@Primary`，因为各种自动配置都希望能够按类型获得一个。

如果您创建自己的`DataSource`，则自动配置将退出。在下面的示例中，我们提供了与在主数据源上自动配置提供的完全相同的功能集：
```java
@Bean
@Primary
@ConfigurationProperties("app.datasource.foo")
public DataSourceProperties fooDataSourceProperties() {
	return new DataSourceProperties();
}

@Bean
@Primary
@ConfigurationProperties("app.datasource.foo")
public DataSource fooDataSource() {
	return fooDataSourceProperties().initializeDataSourceBuilder().build();
}

@Bean
@ConfigurationProperties("app.datasource.bar")
public BasicDataSource barDataSource() {
	return DataSourceBuilder.create().type(BasicDataSource.class).build();
}
```

> 必须将`fooDataSourceProperties`标记为`@Primary`，以便数据库初始化程序功能使用你的副本（如果使用的话）。

这两个数据源也都是用于高级自定义的。 例如，你可以如下配置它们：
```
app.datasource.foo.type=com.zaxxer.hikari.HikariDataSource
app.datasource.foo.maximum-pool-size=30

app.datasource.bar.url=jdbc:mysql://localhost/test
app.datasource.bar.username=dbuser
app.datasource.bar.password=dbpass
app.datasource.bar.max-total=30
```
当然，你也可以将相同的概念应用于辅助`DataSource`：
```java
@Bean
@Primary
@ConfigurationProperties("app.datasource.foo")
public DataSourceProperties fooDataSourceProperties() {
	return new DataSourceProperties();
}

@Bean
@Primary
@ConfigurationProperties("app.datasource.foo")
public DataSource fooDataSource() {
	return fooDataSourceProperties().initializeDataSourceBuilder().build();
}

@Bean
@ConfigurationProperties("app.datasource.bar")
public DataSourceProperties barDataSourceProperties() {
	return new DataSourceProperties();
}

@Bean
@ConfigurationProperties("app.datasource.bar")
public DataSource barDataSource() {
	return barDataSourceProperties().initializeDataSourceBuilder().build();
}
```
最后的这个例子在自定义命名空间上配置了两个数据源，这与Spring Boot在自动配置中做了相同的逻辑。
### 使用Spring Data仓库
Spring Data可以为你创建各种风格的`@Repository`接口。只要这些`@Repositories`包含在`@EnableAutoConfiguration`类的相同包（或子包）中，Spring Boot将为你处理所有这些接口。

对于许多应用程序来说，你需要的所有东西是把正确的Spring Data依赖关系放到你的类路径中（JPA有一个`spring-boot-starter-data-jpa`和一个Mongodb的`spring-boot-starter-data-mongodb`），创建一些仓库接口来处理你的`@Entity`对象。 有两个示例[JPA示例](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-data-jpa)和[Mongodb示例](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-data-mongodb)。

Spring Boot尝试根据找到的`@EnableAutoConfiguration`来猜测`@Repository`定义的位置。 为了更好的控制，可以使用`@EnableJpaRepositories`注解（来自Spring Data JPA）。
### 从Spring配置中分离@Entity定义
Spring Boot尝试根据找到的`@EnableAutoConfiguration`来猜测你的`@Entity`定义的位置。 为了获得更多控制权，你可以使用`@EntityScan`注解，例如：
```java
@Configuration
@EnableAutoConfiguration
@EntityScan(basePackageClasses=City.class)
public class Application {

	//...

}
```

### 配置JPA属性
Spring Data JPA已经提供了一些与供应商无关的配置选项（例如用于SQL日志记录），Spring Boot公开了这些，还有一些作为hibernate的外部配置属性。 其中一些是根据上下文自动检测，所以你不应该设置它们。

`spring.jpa.hibernate.ddl-auto`是一个特殊情况，因为它具有不同的默认值，这取决于运行时的条件。 如果使用嵌入式数据库，并且没有像Liquibase或Flyway这样的schema管理器处理`DataSource`，那么它将默认使用`create-drop`。 在其他情况下，它默认为`none`。

使用的方言也是根据当前的`DataSource`自动检测的，但是如果你想明确地使用方言，你可以自己设置`spring.jpa.database`，并绕过启动时的检查。

> 指定一个`database`将导致定义良好的Hibernate方言的配置。一些数据库有不止一个`Dialect`，这有可能不适合你的需要。在这种情况下，你可以将`spring.jpa.database`设置为默认值，让Hibernate自己解决，或使用`spring.jpa.database-platform`属性设置方言。

最常见的选项是：
```
spring.jpa.hibernate.naming.physical-strategy=com.example.MyPhysicalNamingStrategy
spring.jpa.show-sql=true
```
另外，在创建本地`EntityManagerFactory`时，`spring.jpa.properties.*`中的所有属性都作为普通的JPA属性（去掉了前缀）传递。
### 配置Hibernate命名策略
Hibernate使用[两种不同的命名策略](http://docs.jboss.org/hibernate/orm/5.2/userguide/html_single/Hibernate_User_Guide.html#naming)来将名称从对象模型映射到相应的数据库名称。物理和隐式策略实现的完全限定类名称可分别使用`spring.jpa.hibernate.naming.physical-strategy`和`spring.jpa.hibernate.naming.implicit-strategy`属性进行配置。

Spring Boot默认使用`SpringPhysicalNamingStrategy`配置物理命名策略。这个实现提供了与Hibernate 4相同的表结构：所有的点都被下划线替换，而且驼峰也被下划线替换。 默认情况下，所有表名都以小写形式生成，但如果你的schema 需要，则可以覆盖该标志。

具体来说，`TelephoneNumber`实体将被映射到`telephone_number`表。

如果你更喜欢使用Hibernate 5的默认值，请设置以下属性：
```
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```
有关更多详细信息，请参阅[`HibernateJpaAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaAutoConfiguration.java)和[`JpaBaseConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/orm/jpa/JpaBaseConfiguration.java)。
### 使用自定义EntityManagerFactory
要完全控制`EntityManagerFactory`的配置，你需要添加一个名为“entityManagerFactory”的`@Bean`。 Spring Boot的自动配置基于该类型的bean的存在与否关闭其实体管理器。

### 使用两个实体管理器
即使默认的`EntityManagerFactory`工作正常，你也需要定义一个新的，否则该类型的第二个bean的存在将关闭默认的这个。 为了简化操作，你可以使用Spring Boot提供的方便的`EntityManagerBuilder`，或者如果你愿意，可以直接使用Spring ORM中的`LocalContainerEntityManagerFactoryBean`。
示例：
```java
// add two data sources configured as above

@Bean
public LocalContainerEntityManagerFactoryBean customerEntityManagerFactory(
		EntityManagerFactoryBuilder builder) {
	return builder
			.dataSource(customerDataSource())
			.packages(Customer.class)
			.persistenceUnit("customers")
			.build();
}

@Bean
public LocalContainerEntityManagerFactoryBean orderEntityManagerFactory(
		EntityManagerFactoryBuilder builder) {
	return builder
			.dataSource(orderDataSource())
			.packages(Order.class)
			.persistenceUnit("orders")
			.build();
}
```
上面的配置几乎可以自行完成。要完成整个过程，你还需要为两个`EntityManagers`配置`TransactionManagers`。 如果你把其中一个标记为@Primary，它可以被Spring Boot中默认的`JpaTransactionManager`支持，另一个必须明确地注入一个新的实例。 或者你也可以使用跨越两者的JTA事务管理器。

如果你使用Spring Data，则需要相应地配置`@EnableJpaRepositories`：
```java
@Configuration
@EnableJpaRepositories(basePackageClasses = Customer.class,
		entityManagerFactoryRef = "customerEntityManagerFactory")
public class CustomerConfiguration {
	...
}

@Configuration
@EnableJpaRepositories(basePackageClasses = Order.class,
		entityManagerFactoryRef = "orderEntityManagerFactory")
public class OrderConfiguration {
	...
}
```
### 使用传统的persistence.xml
Spring不需要使用XML来配置JPA提供程序，并且Spring Boot假定你想要利用该功能。如果你喜欢使用`persistence.xml`，那么你需要定义自己的`LocalEntityManagerFactoryBean`（id为'entityManagerFactory')类型的`@Bean`，并设置持久化单元名称。

有关默认设置，请参阅[`JpaBaseConfiguration`](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/orm/jpa/JpaBaseConfiguration.java)。

### 使用Spring Data JPA和Mongo仓库
Spring Data JPA和Spring Data Mongo可以自动为你创建`Repository`实现。 如果它们都出现在类路径中，那么可能需要做一些额外的配置来告诉Spring Boot你为哪一个（或两者）创建存储库。 最明显的方法是使用标准的Spring Data `@Enable*Repositories`，并告诉它你的`Repository`接口的位置（其中'*'是'Jpa'或'Mongo'或是两者）。

还有一些`spring.data.*.repositories.enabled`标志，你可以使用它们在外部配置中打开和关闭自动配置的存储库。例如，如果你想要关闭Mongo仓库并且仍然使用自动配置的`MongoTemplate`，这很有用。

其他自动配置的Spring Data  存储库类型（Elasticsearch，Solr）也存在同样的障碍和相同的功能。只需分别更改注解和标志的名称。
### 暴露Spring数据仓库为REST端点
Spring Data REST只要为应用程序启用了Spring MVC，就可以将`Repository`实现公开为REST端点。

Spring Boot公开了一些自定义`RepositoryRestConfiguration`的`spring.data.rest`命名空间的有用属性。如果你需要提供额外的定制，你应该使用`RepositoryRestConfigurer` bean。

> 如果你没有在你自定义的`RepositoryRestConfigurer`中指定任何顺序，它将在Spring Boot在内部使用的那个后运行。 如果你需要指定顺序，请确保它大于0。

### 配置JPA使用的组件
如果你想配置一个将被JPA使用的组件，那么你需要确保组件在JPA之前被初始化。 如果组件是自动配置的，Spring Boot将为你处理这个问题。例如，当Flyway自动配置时，Hibernate被配置为依赖于Flyway，这样后者有机会在Hibernate尝试使用它之前初始化数据库。

如果你自己配置组件，则可以使用`EntityManagerFactoryDependsOnPostProcessor`子类作为设置必需依赖项的便捷方式。例如，如果你使用Elasticsearch作为Hibernate Search的索引管理器，那么任何`EntityManagerFactory` bean都必须配置为依赖于`elasticsearchClient` bean：
```java
/**
 * {@link EntityManagerFactoryDependsOnPostProcessor} that ensures that
 * {@link EntityManagerFactory} beans depend on the {@code elasticsearchClient} bean.
 */
@Configuration
static class ElasticsearchJpaDependencyConfiguration
		extends EntityManagerFactoryDependsOnPostProcessor {

	ElasticsearchJpaDependencyConfiguration() {
		super("elasticsearchClient");
	}

}
```
## 数据库初始化
SQL数据库可以用不同的方式初始化，这取决于你选择的是什么技术。当然，只要数据库是一个独立的进程，你也可以手动完成。
### 使用JPA初始化数据库
JPA具有用于生成DDL的功能，可以将这些功能设置为在启动时运行。 这是通过两个外部属性来控制的：
- `spring.jpa.generate-ddl`（boolean）打开和关闭该功能，并且独立于供应商。
- `spring.jpa.hibernate.ddl-auto`（enum）是一个Hibernate特性，以更细粒度的方式控制该行为。

### 使用Hibernate初始化数据库
你可以显式设置`spring.jpa.hibernate.ddl-auto`，标准Hibernate属性值为`none`，`validate`，`update`，`create`，`create-drop`。 Spring Boot根据数据库是否为嵌入式的为你选择一个默认值：如果没有检测到schema管理器，则默认为`create-drop`，在其他所有情况下均设置为`none`。通过查看`Connection`类型来检测嵌入式数据库：`hsqldb`，`h2`和`derby`是嵌入式的，其余不是。从内存数据库切换到“真实”数据库时请小心，不要假定新平台中存在表和数据。 你必须显式设置`ddl-auto`，或使用其他机制来初始化数据库。

> 你可以通过启用`org.hibernate.SQL`日志记录器来输出schema创建的过程。如果启用调试模式，将自动完成。

另外，如果Hibernate从头开始创建schema（即，如果`ddl-auto`属性设置为`create`或`create-drop`），那么在启动时将执行类路径根目录中名为`import.sql`的文件。 这对于演示和测试是非常有用的。 这是一个Hibernate功能（与Spring无关）。

### 初始化数据库
Spring Boot可以自动创建`DataSource`的schema（DDL脚本）并对其进行初始化（DML脚本）：它分别从标准根类路径位置`schema.sql`和`data.sql`中加载SQL。 另外，Spring Boot将处理`schema-${platform}.sql`和`data-${platform}.sql`文件（如果存在），其中`platform`是`spring.datasource.platform`的值。这允许你在必要时切换到数据库特定的脚本，例如你可以选择将其设置为数据库的供应商名称（`hsqldb`，`h2`，`oracle`，`mysql`，`postgresql`等）。

Spring Boot默认启用Spring JDBC初始化程序的快速失败功能，所以如果脚本导致异常，应用程序将无法启动。 你可以使用`spring.datasource.continue-on-error`来调整它。

> 在基于JPA的应用程序中，可以选择让Hibernate创建schema或使用`schema.sql`，但不能两者同时使用。如果你选择了后者，请确保禁用`spring.jpa.hibernate.ddl-auto`。

你也可以通过将`spring.datasource.initialize`设置为`false`来禁用初始化。

### 初始化一个Spring Batch数据库
如果你使用的是Spring Batch，那么它将为大多数流行的数据库平台预先打包SQL初始化脚本。 Spring Boot可以检测你的数据库类型并在启动时执行这些脚本。如果你使用嵌入式数据库，则默认情况下会发生这种情况。你也可以为任何数据库类型启用这个功能：
```
spring.batch.initialize-schema=always
```
你也可以使用`spring.batch.initialize-schema = never`显式地关闭初始化功能。
### 使用更高级别的数据库迁移工具
Spring Boot支持两种更高级的迁移工具：[Flyway](http://flywaydb.org/)和[Liquibase](http://www.liquibase.org/)。

#### 启动时执行Flyway数据库迁移
要在启动时自动运行Flyway数据库迁移，请将`org.flywaydb:flyway-core`添加到类路径中。

迁移是以`V<VERSION>__<NAME>.sql`格式（带有`<VERSION>`下划线分隔的版本，例如'1'或'2_1'）的脚本。默认情况下，它们位于文件夹`classpath:db/migration`中，但是可以使用`spring.flyway.locations`修改它。你还可以添加特殊的`{vendor}`占位符来使用供应商特定的脚本。 假设：
```
spring.flyway.locations=db/migration/{vendor}
```
这个配置不是使用`db/migration`，而是根据数据库的类型（对于Mysql来说即`db/migration/mysql`）来设置使用的文件夹。可以在[`DatabaseDriver`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/jdbc/DatabaseDriver.java)中查看受支持的数据库列表。

另请参阅flyway-core的Flyway类以了解可用设置（如模式等）的详细信息。另外，Spring Boot在[`FlywayProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/flyway/FlywayProperties.java)中提供了一组属性，可用于禁用迁移或关闭位置检查。 Spring Boot将调用`Flyway.migrate（）`来执行数据库迁移。 如果你想要更多的控制，提供一个实现了[`FlywayMigrationStrategy`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/flyway/FlywayMigrationStrategy.java)的`@Bean`。

Flyway支持SQL和Java[回调](http://flywaydb.org/documentation/callbacks.html)。 要使用基于SQL的回调，请将回调脚本放在`classpath:db/migration`文件夹中。 要使用基于Java的回调，创建一个或多个实现了`FlywayCallback`的Bean，或者最好是继承`BaseFlywayCallback`。 任何这样的bean将自动注册到`Flyway`。 他们可以通过使用`@Order`或实现`Ordered`来指定顺序。

默认情况下，Flyway将在你的上下文中自动装配（`@Primary`）`DataSource`，并将其用于迁移。 如果你喜欢使用不同的`DataSource`，你可以创建一个`@Bean`标记为`@FlywayDataSource` - 如果你这样做，记得创建另一个数据源,如果你需要两个数据源记得把它标记为`@Primary`。 或者，你可以通过在外部属性中设置`spring.flyway.[url，user，password]`来使用Flyway的原生`DataSource`。

这里有一个[Flyway示例](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-flyway)，你可以看到如何设置这些东西。

你也可以使用Flyway为特定场景提供数据。例如，你可以将测试专用的迁移脚本放在`src/test/resources`中，并且只有在你的应用程序开始测试时才会运行它们。 如果你想更复杂一点，可以使用特定profile的配置来自定义`spring.flyway.locations`，以便某些迁移脚本只在特定profile激活时运行。 例如，在`application-dev.properties`中：
```
spring.flyway.locations=classpath:/db/migration,classpath:/dev/db/migration
```
使用该设置，`dev/db/migration`中的迁移脚本将仅在`dev` profile激活时运行。

#### 启动时执行Liquibase数据库迁移
要在启动时自动运行Liquibase数据库迁移，请将`org.liquibase:liquibase-core`添加到你的类路径中。

主要的更改日志默认从`db/changelog/db.changelog-master.yaml`中读取，但可以设置使用`spring.liquibase.change-log`。除了YAML，Liquibase还支持JSON，XML和SQL更改日志格式。

默认情况下，Liquibase会在你的上下文中自动装载（`@Primary`）`DataSource`，并用它来进行迁移。 如果你喜欢使用不同的`DataSource`，你可以创建一个`@Bean`标记为`@LiquibaseDataSource` - 如果你这样做的话，记得创建另一个数据源，如果你想要两个数据源，就把它标记为`@Primary`。 或者，你可以通过在外部属性中设置`spring.liquibase.[url，user，password]`来使用Liquibase的原生`DataSource`。

有关上下文，默认模式等可用设置的详细信息，请参阅[`LiquibaseProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/liquibase/LiquibaseProperties.java)。

有一个[Liquibase示例](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-liquibase)，你可以看到如何设置。
## 消息
### 禁用事务的JMS会话
如果你的JMS代理不支持事务会话，则必须完全禁用事务支持。如果你创建自己的`JmsListenerContainerFactory`，则无需执行任何操作，因为默认情况下不会进行事务处理。 如果你想使用`DefaultJmsListenerContainerFactoryConfigurer`来重用Spring Boot的默认设置，可以按如下所示禁用事务性会话：
```java
@Bean
public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(
		ConnectionFactory connectionFactory,
		DefaultJmsListenerContainerFactoryConfigurer configurer) {
	DefaultJmsListenerContainerFactory listenerFactory =
			new DefaultJmsListenerContainerFactory();
	configurer.configure(listenerFactory, connectionFactory);
	listenerFactory.setTransactionManager(null);
	listenerFactory.setSessionTransacted(false);
	return listenerFactory;
}
```
这里覆盖了默认的工厂，并且它应该被应用到你的应用程序定义的任何其他工厂（如果有的话）。
## 批处理应用
> 默认情况下，批处理应用程序需要一个`DataSource`来存储作业详细信息。如果你不要这么做，你需要实现`BatchConfigurer`，请参阅[`@EnableBatchProcessing`的Javadoc](http://docs.spring.io/spring-batch/apidocs/org/springframework/batch/core/configuration/annotation/EnableBatchProcessing.html)获取更多细节。

### 启动时执行Spring Batch作业
Spring Batch自动配置是通过在你的上下文中添加`@EnableBatchProcessing`（从Spring Batch）来实现的。

默认情况下，它会在启动时执行应用程序上下文中的**所有**`Jobs`（有关详细信息，请参阅[JobLauncherCommandLineRunner](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/batch/JobLauncherCommandLineRunner.java)）。 你可以通过指定`spring.batch.job.names`（逗号分隔的作业名称模式）来限制到特定作业或作业的范围。

如果应用程序上下文包含`JobRegistry`，则在注册信息中查找`spring.batch.job.names`中的作业，而不是从上下文自动装配。 这是一个常见的模式，其中有更复杂的系统，在这个系统中多个作业在子环境中定义并集中注册。

有关更多详细信息，请参阅[BatchAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/batch/BatchAutoConfiguration.java)和[@EnableBatchProcessing](https://github.com/spring-projects/spring-batch/blob/master/spring-batch-core/src/main/java/org/springframework/batch/core/configuration/annotation/EnableBatchProcessing.java)。
## Actuator
### 更改actuator端点的HTTP端口或地址
在独立应用程序中，Actuator HTTP端口默认与主HTTP端口相同。为了让应用程序在不同的端口上监听，可以设置外部属性`management.port`。要监听一个完全不同的网络地址（例如，如果你有一个用于管理的内部网络和一个用于外部用户应用的网络），你还可以将`management.address`设置为服务器能够绑定的有效IP地址。

有关更多详细信息，请参阅[`ManagementServerProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/autoconfigure/web/ManagementServerProperties.java)源代码以及“Production-ready功能”部分中的[第50.2节“自定义管理服务器端口”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#production-ready-customizing-management-server-port)。

### 自定义“whitelabel”错误页面
如果你遇到服务器错误（使用JSON和其他媒体类型的计算机客户端应该看到具有正确错误代码的合理响应），Spring Boot将安装一个“whitelabel”错误页面。

> 设置`server.error.whitelabel.enabled = false`将关闭默认错误页面并恢复为你正在使用的servlet容器的默认值。请注意，Spring Boot仍然会尝试解决错误视图，所以你可能会添加你自己的错误页面，而不是完全禁用它。

用你自己的覆盖错误页面取决于你正在使用的模板技术。例如，如果你使用的是Thymeleaf，则可以添加一个`error.html`模板，如果你使用的是FreeMarker，则可以添加一个`error.ftl`模板。一般来说，你需要的是一个用错误名称解析的`View`，和/或处理`/error`路径的`@Controller`。除非你替换了一些默认配置，否则你应该在你的`ApplicationContext`中找到一个`BeanNameViewResolver`，所以带有id`error`的`@Bean`将是一个简单的方法。查看[`ErrorMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/error/ErrorMvcAutoConfiguration.java)以获取更多详情。

有关如何在servlet容器中注册处理程序的详细信息，另请参阅[错误处理](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-error-handling)一节。
### Actuator 和 Jersey
Actuator HTTP端点仅适用于基于Spring MVC的应用程序。如果你想使用Jersey并仍然使用Actuator，则需要启用Spring MVC（例如，依赖于`spring-boot-starter-web`）。默认情况下，Jersey和Spring MVC调度程序servlet都映射到相同的路径（`/`）。你将需要更改其中一个的路径（通过为Spring MVC配置`server.servlet.path`或为Jersey配置`spring.jersey.application-path`）。 例如，如果将`server.servlet.path = / system`添加到`application.properties`中，则actuator HTTP端点将可以在`/ system`下使用。

## Security
### 关闭Spring Boot 安全配置
如果你在应用程序中的任何位置使用`@EnableWebSecurity`定义`@Configuration`，它将关闭Spring Boot中的默认Web应用程序安全设置（但保留Actuator的安全配置）。 要调整默认值，请尝试设置`security.*`（请参阅[`SecurityProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/security/SecurityProperties.java)以获取可用设置的详细信息）以及[Common应用程序属性](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#common-application-properties-security)的`SECURITY`部分。
### 更改AuthenticationManager并添加用户帐户
如果你提供了一个类型为`AuthenticationManager`的`@Bean`，那么将不会创建默认的，所以你可以使用Spring Security的全部功能（例如[各种认证选项](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#jc-authentication)）。

Spring Security还提供了一个方便的`AuthenticationManagerBuilder`，它可以用来构建一个带有通用选项的`AuthenticationManager`。在webapp中使用这种方法的推荐方法是将其注入`WebSecurityConfigurerAdapter`中的void方法，例如：
```java
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			auth.inMemoryAuthentication()
				.withUser("barry").password("password").roles("USER"); // ... etc.
	}

	// ... other stuff for application security

}
```
如果将其放在嵌套类或独立类中（即不会混入大量可能影响实例化顺序的其他`@Beans`），你将获得最佳结果。 [安全的Web示例](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-web-secure)是一个有用的模板。

如果遇到实例化问题（例如，对用户详细信息存储使用JDBC或JPA），将`AuthenticationManagerBuilder`回调提取到`GlobalAuthenticationConfigurerAdapter`中（在`init()`方法中，以便在其他地方需要身份验证管理器之前进行）有可能是值得。
```java
@Configuration
public class AuthenticationManagerConfiguration extends
		GlobalAuthenticationConfigurerAdapter {

	@Override
	public void init(AuthenticationManagerBuilder auth) {
		auth.inMemoryAuthentication() // ... etc.
	}

}
```

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
