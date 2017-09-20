---
title: Spring Boot 五-Spring Boot执行器 - 生产就绪特性
date: 2017-09-13 21:10:39
tags: [Spring Boot, 生产]
---

Spring Boot包括一些额外的功能，可帮助你在应用程序推送到生产时监视和管理它。你可以选择使用HTTP端点或JMX来管理和监视应用程序。审计，健康和指标收集可以自动应用于你的应用程序。

HTTP执行器端点仅适用于基于Spring MVC的应用程序。特别是，也不适用于Jersey除非你[启用Spring MVC](#howto-use-actuator-with-jersey)。

## 启用生产就绪功能
[`spring-boot-actuator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator)模块提供了所有Spring Boot的生产就绪特性。启用这些特性的最简单的方法是添加`spring-boot-starter-actuator` "Starter"。

> Actuator 的定义  
>
> Actuator 是制造术语，指的是用于移动或控制某物的机械装置。 Actuator 可以从小的变化产生大量的运动。

要将 actuator 添加到基于Maven的项目中，添加以下“Starter”依赖项:
```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```
对于Gradle，使用下面的声明：
```
dependencies {
    compile("org.springframework.boot:spring-boot-starter-actuator")
}
```

## 端点
Actuator 端点允许你监视和与应用程序进行交互。Spring　Boot包含许多内置端点，你还可以添加自己的端点。例如，`health`端点提供基本的应用程序健康信息。

端点公开的方式将取决于你选择的技术类型。大多数应用程序选择HTTP监视，其中端点带有`/application` 的前缀的ID被映射到一个URL。例如，默认情况下，`health `端点将被映射到`/application/health`。

有下面一些跟其他技术无关的可用的端点：

ID|描述|敏感默认值
--|--|--
`actuator`|为其他端点提供一个基于多媒体的“发现页面”。需要在类路径上存在Spring HATEOAS。|true
`auditevents`|为当前应用程序暴露审计事件信息|true
`autoconfig`|显示一个自动配置报告，显示所有自动配置的候选者，以及为什么"是"或"不是"它们被应用的原因。|true
`beans`|显示应用程序中所有Spring bean的完整列表。|true
`configprops`|显示所有`@ConfigurationProperties`的整理列表。|true
`dump`|执行线程转储。|true
`env`|暴露Spring的`ConfigurableEnvironment`中的属性。|true
`flyway`|显示任何已应用的数据库迁移的路径。|true
`health`|显示应用程序的健康信息(当应用程序安全时，通过未经身份验证的连接时显示一个简单的“状态”或经过身份验证时显示完整消息细节)。|false
`info`|显示任意的应用程序信息。|false
`loggers`|在应用程序中显示和修改日志记录器的配置。|true
`liquibase`|显示已应用的任何Liquibase 数据库迁移。|true
`metrics`|显示当前应用程序的“度量”信息。|true
`mappings`|显示所有`@RequestMapping`路径的排序列表。|true
`shutdown`|允许应用程序优雅地关闭(默认情况下不启用)。|true
`trace`|显示跟踪信息(默认情况下是最后100个HTTP请求)。|true

如果你使用的是Spring MVC，那么还可以使用以下附加的端点:

ID|描述|敏感默认值
--|--|--
`docs`|显示文档，包括Actuator 的端点的示例请求和响应。要求`spring-boot-actuator-docs`在类路径中。|false
`heapdump`|返回一个GZip压缩的`hprof`堆转储文件。|true
`jolokia`|通过HTTP公开JMX bean（当classpath中存在Jolokia ）|true
`logfile`|返回logfile的内容(如果已经设置了`logging.file`或`logging.path`属性)。支持使用HTTP `Range`头来检索日志文件内容的一部分。|true

> 根据端点的暴露方式，`sensitive`属性可以用作安全提示。 例如，敏感端点在通过HTTP访问时将需要用户名/密码（或者如果Web安全性未启用，则简单禁用）。

### 自定义端点
端点可以使用Spring属性进行定制。如果`enabled`了端点，就可以更改，如果它被认为是`sensitive `，甚至是它的id也可以改变。例如，有`application.properties`改变`bean`端点的敏感性和id，也可以启用`shutdown`。
```
endpoints.beans.id=springbeans
endpoints.beans.sensitive=false
endpoints.shutdown.enabled=true
```

> 前缀“`endpoints`+`.`+`name`“用于惟一地标识正在配置的端点。

默认情况下，除了`shutdown`之外的所有端点都启用了。如果你更喜欢指定启用某个端点，那么你可以使用`endpoints.enabled`属性。例如，以下将禁用除`info`之外的*所有*端点:
```
endpoints.enabled=false
endpoints.info.enabled=true
```
同样，你还可以选择全局设置所有端点的“敏感”标志。 默认情况下，敏感标志取决于端点类型（参见上表）。 例如，要将*所有*端点标记为敏感，除了`info`：
```
endpoints.sensitive=true
endpoints.info.sensitive=false
```

### Actuator MVC端点的多媒体
如果`endpoints.hypermedia.enabled`设置为`true`，并且[Spring HATEOAS](http://projects.spring.io/spring-hateoas)位于类路径上（例如，通过`spring-boot-starter-hateoas`或者如果你使用的是[Spring Data REST](http://projects.spring.io/spring-data-rest)），那么来自Actuator 的HTTP端点将通过多媒体链接进行增强，并添加了一个“发现页面”，其中包含所有端点的链接。

默认情况下，“发现页”可用于`/application`。 它被实现为端点，允许使用属性来配置其路径（`endpoints.actuator.path`）以及是否启用（`endpoints.actuator.enabled`）。

当配置了自定义管理上下文路径时，“发现页面”将自动从`/application`移动到管理上下文的根目录。 例如，如果管理上下文路径是`/management` ，则发现页面将出现在`/management`。

如果[HAL浏览器](https://github.com/mikekelly/hal-browser)通过其webjar（`org.webjars:hal-browser`）或通过`spring-data-rest-hal-browser`存在于类路径上，那么也会提供以“HAL浏览器”形式的HTML“发现页面”。

### 跨域支持
跨原始资源共享（CORS）是一种W3C规范，允许你以灵活的方式指定什么样的跨域请求被授权。Actuator的MVC端点可以配置为支持这种情况。

默认情况下禁用CORS支持，只有在设置`endpoints.cors.allowed-origins`属性后才能启用。 下面的配置允许来自`example.com`域的`GET`和`POST`调用：
```
endpoints.cors.allowed-origins=http://example.com
endpoints.cors.allowed-methods=GET,POST
```

> 查看[`EndpointCorsProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/autoconfigure/EndpointCorsProperties.java)以获取完整的选项列表。

### 添加自定义端点
如果添加一个类型为`Endpoint`的`@Bean`，那么它将自动通过JMX和HTTP（如果有可用的服务器）暴露出来。 通过创建一个类型为`MvcEndpoint`的bean，可以进一步定制HTTP端点。 你的`MvcEndpoint`不是`@Controller`，但它可以使用`@RequestMapping`（和`@Managed*`）来公开资源。

> 如果你正在将其作为库功能，请考虑将`@ManagementContextConfiguration`注解的配置类使用key `org.springframework.boot.actuate.autoconfigure.ManagementContextConfiguration`添加到`/META-INF/spring.factories`文件中。如果你这样做，则如果你的用户要求单独的管理端口或地址，端点将移动到所有其他MVC端点的子上下文。 如果要将静态资源（例如）添加到管理端点，则以这种方式声明的配置可以是一个`WebConfigurerAdapter`。

### 健康信息
健康信息可用于检查正在运行的应用程序的状态。 如果生产系统出现故障，通常会使用监控软件来警告某人。 `health`端点公开的默认信息取决于它的访问方式。对于安全应用程序中的未认证连接，将返回简单的“状态”消息，并且对于已认证的连接，还会显示其他详细信息（请参阅[第50.7节“HTTP健康端点格式和访问限制”](#production-ready-health-access-restrictions)的HTTP详细信息）。

健康信息是从你的`ApplicationContext`中定义的所有[`HealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/HealthIndicator.java) bean收集的。 Spring Boot包括一些自动配置的`HealthIndicators`，你也可以自己编写。默认情况下，最终的系统状态由`HealthAggregator`导出，它根据有序的状态列表对来自每个`HealthIndicator`的状态进行排序。排序列表中的第一个状态用作总体运行状态。 如果没有`HealthIndicator`返回`HealthAggregator`已知的状态，则使用`UNKNOWN`状态。

### HealthIndicators 安全性
`HealthIndicators`返回的信息本质上往往有些敏感。 例如，你可能不想将数据库服务器的详细信息公开。因此，默认情况下，通过未经身份验证的HTTP连接仅暴露健康状况。 如果你很乐意一直暴露完整的健康信息，你可以设置`endpoints.health.sensitive`为`false`。

健康响应也被缓存，以防止“拒绝服务”攻击。如果要更改1000毫秒的默认缓存期，请使用`endpoints.health.time-to-live`属性。

#### HealthIndicators 自动配置
以下`HealthIndicator`在适当时由Spring Boot自动配置：

名称|描述
--|--
[`CassandraHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/CassandraHealthIndicator.java)|检查Cassandra数据库是否已经启动。
[`DiskSpaceHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/DiskSpaceHealthIndicator.java)|检查低磁盘空间。
[`DataSourceHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/DataSourceHealthIndicator.java)|检查与是否可以获取数据源的连接。
[`ElasticsearchHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/ElasticsearchHealthIndicator.java)|检查Elasticsearch 集群是否已经启动。
[`JmsHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/JmsHealthIndicator.java)|检查JMS代理是否已启动。
[`MailHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/MailHealthIndicator.java)|检查邮件服务器是否已启动。
[`MongoHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/MongoHealthIndicator.java)|检查Mongo数据库是否已经启动。
[`RabbitHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/RabbitHealthIndicator.java)|检查Rabbit 服务器是否已经启动。
[`RedisHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/RedisHealthIndicator.java)|检查一个Redis服务器是否已经启动。
[`SolrHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/SolrHealthIndicator.java)|检查Solr服务器是否已经启动。

> 可以使用`management.health.defaults.enabled`属性来禁用它们。

#### 编写自定义HealthIndicator
要提供自定义的健康信息，你可以注册实现[`HealthIndicator` ](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/HealthIndicator.java)接口的Spring bean。你需要提供一个`health（）`方法的实现并返回一个`Health`响应。 `Health`响应应包括状态，并且可以选择性地包括要显示的其他细节。
```java
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class MyHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        int errorCode = check(); // perform some specific health check
        if (errorCode != 0) {
            return Health.down().withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

}
```

> 给定`HealthIndicator`的标识符是没有`HealthIndicator`后缀（如果存在）的bean的名称。 在上面的示例中，健康信息将出现在名为`my`的条目中。

除了Spring Boot预定义`Status`类型之外，`Health`还可以返回表示新的系统状态的自定义`Status`。在这种情况下，还需要提供[`HealthAggregator`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/HealthAggregator.java)接口的自定义实现，或者必须使用`management.health.status.order`配置属性配置默认实现。

例如，假设在一个`HealthIndicator`实现中使用了带有代码`FATAL`的新`Status`。 要配置严重性顺序，请将以下内容添加到应用程序属性中：
```
management.health.status.order=FATAL, DOWN, OUT_OF_SERVICE, UNKNOWN, UP
```

响应中的HTTP状态码反映了整体运行状况（例如`UP`映射到200，`OUT_OF_SERVICE`或`DOWN`到503）。如果你通过HTTP访问健康端点，你可能还需要注册`HealthMvcEndpoint`的自定义状态映射。例如，下面的配置映射`FATAL`到`HttpStatus.SERVICE_UNAVAILABLE`：
```
endpoints.health.mapping.FATAL=503
```

内置状态的默认状态映射有：

状态|映射
--|--
DOWN|SERVICE_UNAVAILABLE (503)
OUT_OF_SERVICE|SERVICE_UNAVAILABLE (503)
UP|默认情况下没有映射，所以http状态是200
UNKNOWN|默认情况下没有映射，所以http状态是200

### 应用程序信息
应用程序信息显示从`ApplicationContext`中定义的所有[`InfoContributor`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/InfoContributor.java) bean收集的各种信息。Spring Boot包括一些自动配置的`InfoContributors`，你也可以自己编写。

#### InfoContributors 自动配置
以下`InfoContributors`在适当时由Spring Boot自动配置：

名称|描述
--|--
[`EnvironmentInfoContributor`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/EnvironmentInfoContributor.java)|在`info` key下显示`Environment`中的任何 key。
[`GitInfoContributor`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/GitInfoContributor.java)|如果`git.properties`文件可用，则显示git信息。
[`BuildInfoContributor`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/BuildInfoContributor.java)|如果`META-INF / build-info.properties`文件可用，则显示构建信息。

> 可以使用`management.info.defaults.enabled`属性来禁用它们。

#### 自定义应用程序info的信息
你可以通过设置`info.*`Spring属性定制`info`端点公开的数据。`info` key 下的所有`Environment`属性将被自动暴露出来。例如，你可以将以下内容添加到您的`application.properties`中：
```
info.app.encoding=UTF-8
info.app.java.source=1.8
info.app.java.target=1.8
```
你可以在构建时扩展信息属性，而不是硬编码这些值。
假设你正在使用Maven，你可以如下重写上述示例：
```
info.app.encoding=@project.build.sourceEncoding@
info.app.java.source=@java.version@
info.app.java.target=@java.version@
```

#### Git 提交信息
`info`端点的另一个有用功能是能够在项目构建时发布有关`git`源代码仓库状态的信息。如果`GitProperties` bean可用，`git.branch`，`git.commit.id`和`git.commit.time`属性将会暴露出来。
> 如果类路径的根目录下存在`git.properties`文件，则会自动配置`GitProperties` bean。 有关详细信息，请参阅[生成git信息](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-git-info)。

如果你想要显示完整的git信息(即`git.properties`的完整内容)，请使用`management.info.git.mode`属性:
```
management.info.git.mode=full
```

#### 构建信息
如果`BuildProperties` bean可用，则`info`端点还可以发布有关构建的信息。 如果类路径中有`META-INF/build-info.properties`文件，则会显示构建信息。

> Maven和Gradle插件都可以生成该文件，查看[生成的构建信息](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-build-info)以获取更多信息。

#### 编写自定义 InfoContributors
为了提供定制的应用程序信息，你可以注册实现[`InfoContributor`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/InfoContributor.java)接口的Spring bean。

下面的例子提供了一个具有单一值的`example`条目:
```java
import java.util.Collections;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

@Component
public class ExampleInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("example",
                Collections.singletonMap("key", "value"));
    }

}
```
如果你点击了`info`端点，你将看到一个包含以下附加条目的响应:
```
{
    "example": {
        "key" : "value"
    }
}
```

## HTTP上的监视和管理
如果你正在开发Spring MVC 应用程序，那么Spring Boot Actuator将自动配置所有启用的端点，并通过HTTP暴露出来。默认的约定是使用端点的`id`加上`/application`的前缀作为URL路径。例如，`health`被暴露为`/application/health`。

### 访问敏感的端点
默认情况下，所有敏感的HTTP端点都是安全的，只有具有`ACTUATOR`角色的用户才可以访问它们。使用标准的`HttpServletRequest.isUserInRole`方法实现安全性。

> 如果你想要与`ACTUATOR`不同的内容，请使用`management.security.roles`属性。

如果你使用了防火墙，则可能希望在不需要身份验证的情况下访问所有actuator 端点。你可以使用`management.security.enabled`属性来改变这一点：
```
management.security.enabled=false
```

> 默认情况下，actuator 端点暴露在同一端口上，该端口用于常规的HTTP服务。 如果更改`manage.security.enabled`属性，请小心不要意外暴露敏感信息。

如果你公开部署应用程序，则可能需要添加“Spring Security”来处理用户身份验证。当添加“Spring Security”时，默认情况下将使用用户名`user`和生成的密码（应用程序启动时在控制台上打印）的“基本”身份验证方式。

> 生成的密码在应用程序启动时会被记录下来。 可以搜索“Using default security password”。

你可以使用Spring属性更改用户名和密码，并更改访问端点所需的安全角色。例如你可以在`application.properties`中设置以下属性：
```
security.user.name=admin
security.user.password=secret
management.security.roles=SUPERUSER
```

如果你的应用程序具有自定义的安全配置，并且希望所有actuator 端点都可以在不进行身份验证的情况下访问，则需要在安全配置中显式地进行配置。与此同时，你需要更改`management.security.enabled`属性为`false`。

如果你的自定义安全配置来保护你的 actuator       端点，你还需要确保经过身份验证的用户具有`management.security.roles`下指定的角色。

> 如果没有将基本健康信息暴露给未经身份验证的用户的使用场景，并且已使用自定义安全性保护actuator 端点，则可以将`management.security.enabled`设置为`false`。 这将通知Spring Boot跳过其他角色检查。

### 定制管理端点路径
有时，定制管理端点的前缀是很有用的。 例如，你的应用程序可能已经将`/application` 用于另一目的。 你可以使用`management.context-path`属性更改管理端点的前缀：
```
management.context-path=/manage
```
以上的`application.properties`示例会将端点从`/application/{id}`更改为`/ manage/{id}`（例如`/manage/info`）。

你还可以更改端点的“路径”（`endpoints.{name}.path`），然后更改MVC端点的默认资源路径。没有验证这些值（所以你可以使用任何在URL路径中合法的内容）。 例如，要`/health`端点的位置更改为`/ping/me`，你可以设置`endpoints.health.path=/ping/me`。

> 即使端点路径是单独配置的，它仍然相对于`management.context-path`路径。

> 如果你提供了自定义的MvcEndpoint，请记住要包含可设置的`path`属性，如果希望你的代码像标准MVC端点一样运行，则将其默认设置为`/{id}`。 （学习`HealthMvcEndpoint`的代码，看看该如何做。）如果你的自定义端点是一个`Endpoint`（而不是一个`MvcEndpoint`），那么Spring Boot会管理你的路径。

### 自定义管理服务器端口
在基于云的部署情况下，使用默认HTTP端口暴露出管理端点是明智选择。但是，如果你的应用程序在自己的数据中心内运行，则可能更倾向于使用不同的HTTP端口暴露端点。

`management.port`属性可用于更改HTTP端口。
```
management.port=8081
```
由于你的管理端口通常受防火墙保护，并且不会暴露给公众，因此即使你的主应用程序是安全的，也可能不需要管理端点的安全性。在这种情况下，你可能使用了Spring Security，你可以这样禁用管理安全性：
```
management.security.enabled=false
```
(如果你没有使用Spring  Security，则不需要以这种方式明确禁用管理安全性，甚至可能会中断应用程序。)

### 配置管理专用SSL
当配置了使用自定义端口时，管理服务器也可以使用各种`management.ssl.*`属性配置自己的SSL。 例如，这允许管理服务器使用HTTP，而主应用程序使用HTTPS：
```
server.port=8443
server.ssl.enabled=true
server.ssl.key-store=classpath:store.jks
server.ssl.key-password=secret
management.port=8080
management.ssl.enabled=false
```
或者，主服务器和管理服务器都可以使用SSL，但使用不同的key store：
```
server.port=8443
server.ssl.enabled=true
server.ssl.key-store=classpath:main.jks
server.ssl.key-password=secret
management.port=8080
management.ssl.enabled=true
management.ssl.key-store=classpath:management.jks
management.ssl.key-password=secret
```

### 定制管理服务器地址
你可以通过设置`management.address`属性来自定义管理端点可用的地址。 如果你只想在内部或面向操作系统的网络上侦听，或只监听`localhost`的连接，这将非常有用。

> 如果端口与主服务器端口不同，则只能侦听不同的地址。

以下是一个不允许远程管理连接的`application.properties`示例：
```
management.port=8081
management.address=127.0.0.1
```

### 禁用HTTP端点
如果不想通过HTTP暴露端点，可以将管理端口设置为`-1`：
```
management.port=-1
```

### HTTP健康端点格式和访问限制
健康端点公开的信息取决于是否是匿名访问，以及封闭应用程序是否安全。默认情况下，当在安全应用程序中匿名访问时，有关服务器运行状况的任何详细信息都将被隐藏，并且端点将简单地显示服务器是否已启动或关闭。此外，可配置响应缓存的时间段，以防止端点被拒绝服务攻击。`endpoints.health.time-to-live`属性用于配置缓存周期（以毫秒为单位）。它默认为1000，也就是1秒。

下面的示例汇总了HTTP响应（默认为匿名请求）：
```
$ curl -i localhost:8080/health
HTTP/1.1 200
X-Application-Context: application
Content-Type: application/vnd.spring-boot.actuator.v2+json;charset=UTF-8
Content-Length: 15

{"status":"UP"}
```
下面的示例汇总了状态为“DOWN”的HTTP响应(请注意503状态码):
```
$ curl -i localhost:8080/health
HTTP/1.1 503
X-Application-Context: application
Content-Type: application/vnd.spring-boot.actuator.v2+json;charset=UTF-8
Content-Length: 17

{"status":"DOWN"}
```
详细的HTTP响应示例:
```
$ curl -i localhost:8080/health
HTTP/1.1 200 OK
X-Application-Context: application
Content-Type: application/vnd.spring-boot.actuator.v2+json;charset=UTF-8
Content-Length: 221

{
  "status" : "UP",
  "diskSpace" : {
    "status" : "UP",
    "total" : 63251804160,
    "free" : 31316164608,
    "threshold" : 10485760
  },
  "db" : {
    "status" : "UP",
    "database" : "H2",
    "hello" : 1
  }
}
```
可以加强上述限制，从而仅允许经认证的用户在安全应用中完全访问健康端点。为此，请将`endpoints.health.sensitive`设置为`true`。以下是属性行为的总结（`sensitive `标志的默认值为“false”，以粗体表示）：

`management.security.enabled`|`endpoints.health.sensitive`|未授权|授权（正确的角色）
--|--|--|--
false|* |完整的内容|完整的内容
true|*false*| 只有状态|完整的内容
true|true|无内容|完整的内容

## 使用JMX监视和管理
Java管理扩展（JMX）提供了监视和管理应用程序的标准机制。 默认情况下，Spring Boot将在`org.springframework.boot`域下将管理端点公开为JMX MBean。
### 自定义MBean的名字
MBean的名称通常是从端点的`id`生成的。 例如，`health`端点暴露为`org.springframework.boot/Endpoint/healthEndpoint`。

如果你的应用程序包含多个Spring `ApplicationContext`，你可能会发现名称冲突。要解决此问题，你可以将`endpoints.jmx.unique-names`属性设置为`true`，这样MBean名称始终是唯一的。

你还可以自定义端点暴露的JMX域。 这里有一个`application.properties`的例子:
```
endpoints.jmx.domain=myapp
endpoints.jmx.unique-names=true
```

### 禁用JMX端点
如果你不想通过JMX公开端点，你可以将`endpoints.jmx.enabled`属性设置为`false`：
```
endpoints.jmx.enabled=false
```

### 基于HTTP对JMX使用 Jolokia
#### 定制Jolokia
#### 禁用Jolokia
## 日志记录
Spring Boot Actuator包括在运行时查看和配置应用程序日志级别的功能。 你可以查看整个列表或单个记录器的配置，该配置由显式配置的日志记录级别以及日志记录框架给出的有效日志记录级别组成。这些级别可以是：
- `TRACE`
- `DEBUG`
- `INFO`
- `WARN`
- `ERROR`
- `FATAL`
- `OFF`
- `null`
`null`表示没有明确的配置

### 配置日志记录器
为了配置给定的记录器，您将部分实体`POST`到该资源的URI:
```
{
    "configuredLevel": "DEBUG"
}
```
> 你还可以传递一个`null` `configuredLevel` 来“重置”记录器的特定级别（并使用默认配置）。

## 指标
Spring Boot Actuator包括带有“计量”和“计数器”支持的度量服务。“计量”记录单个值; “计数器”记录增量（增量或减量）。Spring Boot Actuator还提供了一个[`PublicMetrics`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/endpoint/PublicMetrics.java)接口，你可以通过这两种机制之一来实现无法记录的指标。以[`SystemPublicMetrics`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/endpoint/SystemPublicMetrics.java)为例。

所有HTTP请求的指标都会自动记录下来，因此如果你点击了`metrics`端点，你应该会看到类似于以下的响应：
```
{
    "counter.status.200.root": 20,
    "counter.status.200.metrics": 3,
    "counter.status.200.star-star": 5,
    "counter.status.401.root": 4,
    "gauge.response.star-star": 6,
    "gauge.response.root": 2,
    "gauge.response.metrics": 3,
    "classes": 5808,
    "classes.loaded": 5808,
    "classes.unloaded": 0,
    "heap": 3728384,
    "heap.committed": 986624,
    "heap.init": 262144,
    "heap.used": 52765,
    "nonheap": 0,
    "nonheap.committed": 77568,
    "nonheap.init": 2496,
    "nonheap.used": 75826,
    "mem": 986624,
    "mem.free": 933858,
    "processors": 8,
    "threads": 15,
    "threads.daemon": 11,
    "threads.peak": 15,
    "threads.totalStarted": 42,
    "uptime": 494836,
    "instance.uptime": 489782,
    "datasource.primary.active": 5,
    "datasource.primary.usage": 0.25
}
```
在这里，我们可以看到基本的`memory`，`heap`，`class loading`，`processor`和`thread pool`信息以及一些HTTP指标。在这个例子中，`root`（'/'）和`/metrics` URL分别返回`HTTP 200`响应`20`和`3`次。同样看来，`root`URL返回`HTTP 401`（未经授权）`4`次。 双星号(`star-star`)是由Spring MVC与`/**`(通常是静态资源)匹配的请求而来的。

`gauge`显示请求的最后响应时间。所以最后一个`root`的请求需要`2ms`，最后一个`/metrics`需要3ms。

> 在这个例子中，我们实际上是通过使用`/metrics` URL 访问端点，这就解释了为什么`metrics`出现在响应中。

### 系统指标
Spring Boot会显示以下系统指标：
- 系统总内存（KB）(`mem`)
- 可用内存量（KB）（`mem.free`）
- 处理器的数量（`processors`）
- 系统正常运行时间（毫秒）（`uptime`）
- 应用程序上下文的正常运行时间（毫秒）（`instance.uptime`）
- 系统平均负载（`systemload.average`）
- 堆信息（KB）（`heap`, `heap.committed`, `heap.init`, `heap.used`）
- 线程信息（`threads`, `thread.peak`, `thread.daemon`）
- 类加载信息（`classes`, `classes.loaded`, `classes.unloaded`）
- 垃圾收集信息（`gc.xxx.count`, `gc.xxx.time`）


### 数据源指标
为应用程序中定义的每个受支持的数据源暴露下面的指标:
- 活动连接数（`datasource.xxx.active`）
- 当前连接池的使用情况（`datasource.xxx.usage`）

所有数据源指标都共享`datasource.`前缀。这个前缀对每个数据源都有进一步的限定:
- 如果数据源是主数据源（即现有唯一可用数据源或标记为`@Primary`的数据源），则前缀为`datasource.primary`。
- 如果数据源bean 名称以`DataSource`结尾，则前缀是没有`DataSource`的bean的名称（即`batchDataSource`的`datasource.batch`）。
- 在所有其他情况下，使用bean的名称。

可以通过使用定制版本的`DataSourcePublicMetrics`注册一个bean来覆盖部分或全部默认值。默认情况下，Spring Boot为所有支持的数据源提供元数据; 如果你最喜欢的数据源不支持开箱即用，你可以添加额外的`DataSourcePoolMetadataProvider` bean。 有关示例，请参阅`DataSourcePoolMetadataProvidersConfiguration`。

### 缓存指标
为应用程序中定义的每个受支持的缓存暴露下面的指标:
- 当前缓存的大小（`cache.xxx.size`）
- 命中率（`cache.xxx.hit.ratio`）
- 失效率（`cache.xxx.miss.ratio`）

> 缓存提供者不会以一致的方式暴露命中/失效率。虽然有些公开了一个*聚合*值（即自上次统计数据被清除以来的命中率），但是其他人暴露了*时间*值（即最后一秒的命中率）。 查看你的缓存提供者文档以了解更多详细信息。

如果两个不同的缓存管理器碰巧定义相同的缓存，那么缓存的名称将由`CacheManager` bean的名称预先确定。

可以通过注册一个自定义的`CachePublicMetrics` bean 来覆盖部分或全部的默认值。默认情况下，Spring Boot 提供了EhCache、Hazelcast、Infinispan、JCache和Caffeine的缓存统计数据。如果不支持你最喜欢的缓存库，则可以添加额外的`CacheStatisticsProvider` bean。请参见CacheStatisticsAutoConfiguration`的示例。

### Tomcat session指标
如果你使用Tomcat作为嵌入式servlet容器，会自动暴露会话指标。 `httpsessions.active`和`httpsessions.max` key提供活动和最大会话的数量。

### 记录自己的指标
要记录你自己的指标，可以向你的bean中注入一个`CounterService`和/或`GaugeService`。`CounterService`暴露`increment`、`decrement`和`reset`方法;`GaugeService`提供了一个`submit`方法。

下面是一个简单的例子，它计算了一个方法被调用的次数:
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.metrics.CounterService;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    private final CounterService counterService;

    @Autowired
    public MyService(CounterService counterService) {
        this.counterService = counterService;
    }

    public void exampleMethod() {
        this.counterService.increment("services.system.myservice.invoked");
    }

}
```
> 你可以使用任何字符串作为一个指标名，但是你应该遵循所选择的store/graphing技术的指导。[Matt Aimonetti的博客上](http://matt.aimonetti.net/posts/2013/06/26/practical-guide-to-graphite-monitoring/)有一些关于`Graphite`的好指导。

### 添加自己公开的指标
要添加每次调用指标端点时计算的额外指标，只需注册额外的`PublicMetrics`实现bean。默认情况下，所有这些bean都是由端点收集的。你可以通过定义自己的`MetricsEndpoint`来更改。

### 指标输出，导出和聚合
Spring Boot 提供了一些称为`Exporter`的标记接口的实现，可用于将内存缓冲区中的指标读数复制到可以分析和显示的位置。事实上,如果你提供实现`MetricWriter`接口(或用于简单使用情况的`GaugeWriter`)并使用`@ExportMetricWriter`标记的`@Bean`,那么它将自动连接到一个`Exporter`和每5秒更新一次指标(通过`spring.metrics.export.delay-millis`配置)。此外，你定义和标记为`@ExportMetricReader`的任何一个`MetricReader`的值由缺省导出器导出。

> 如果在你的应用程序中启用调度(`@EnableScheduling`)并且在自己的计划任务开始时运行集成测试时，这个特性将是一个问题。你可以通过设置`spring.metrics.export.enabled`为`false`来禁用此行为。

默认导出器是一个`MetricCopyExporter`，它尝试通过不复制自上次调用以来没有更改的值来优化自身（可以使用`spring.metrics.export.send-latest`关闭优化）。还要注意，Dropwizard `MetricRegistry` 不支持时间戳，因此如果你使用Dropwizard指标（所有指标将在每个刻度上复制），则优化将不可用。

导出触发器(`delay-millis`, `includes`, `excludes` 和`send-latest`)的默认值可以通过`spring.metrics.export.*`设置。特定`MetricWriters`的值可以通过`spring.metrics.export.triggers.<name>.*`，其中`<name>`是一个bean的名称（或匹配bean名称的模式）。

> 如果你关闭默认的`MetricRepository`(例如使用Dropwizard指标)，那么将会禁用自动导出指标。你可以重获相同的功能，即声明一个属于你自己的`MetricReader`类型，并声明它为`@ExportMetricReader`。 

#### 示例：导出到Redis
如果你提供一个类型为`RedisMetricRepository`的`@Bean`，并将其标记为`ExportMetricWriter`，则会将指标导出到Redis缓存以进行聚合。`RedisMetricRepository`有两个重要的参：`prefix`和`key`（传入其构造函数）。最好使用应用程序实例唯一的前缀（例如，使用随机值，也可以使用应用程序的逻辑名称使其可以与同一应用程序的其他实例相关联）。“key”用于保存所有指标名称的全局索引，因此它应该是“全局”惟一的，无论对你的系统意味着什么(例如，如果有不同的键，相同系统的两个实例可以共享一个Redis缓存)。

例如：
```java
@Bean
@ExportMetricWriter
MetricWriter metricWriter(MetricExportProperties export) {
    return new RedisMetricRepository(connectionFactory,
        export.getRedis().getPrefix(), export.getRedis().getKey());
}
```

*application.properties*
```
spring.metrics.export.redis.prefix= metrics.mysystem.${spring.application.name:application}.${random.value:0000}
spring.metrics.export.redis.key=keys.metrics.mysystem
```
前缀是使用应用名称和id结尾构造的，因此可以很容易地使用它来标识具有相同逻辑名称的一组进程。

> 设置`key`和`prefix`是很重要的。key 用于所有仓库操作，并且可以由多个仓库共享。如果多个存储库共享一个key (比如在需要聚合的情况下)，那么通常有一个只读的“master”仓库，它有一个简短但可识别的前缀(比如“metrics.mysystem”)，以及许多只写前缀的仓库，这些前缀都是从主前缀开始的(比如上面例子中的`metrics.mysystem.*`)。从这样的“主”仓库中读取所有键是很有效的，但是使用较长的前缀(例如，使用一个写库)来读取一个子集的效率是很低的。

> 上面的例子使用了`MetricExportProperties`来注入和提取key和prefix。这是由Spring Boot提供的，配置有合理的缺省值。没有什么可以阻止你使用你自己的值，只要它们遵循建议。

#### 示例：导出到Open TSDB
#### 示例：导出到Statsd
#### 示例：导出到JMX
如果你提供一个使用`@ExportMetricWriter`的`JmxMetricWriter`类型的`@Bean`，则将指标导出为本地服务器的MBean（`MBeanExporter`由Spring Boot JMX自动配置提供，只要它已打开）。然后可以使用任何连接JMX的工具（例如JConsole或JVisualVM）来检查，绘制图表，提醒等等。

例如：
```java
@Bean
@ExportMetricWriter
MetricWriter metricWriter(MBeanExporter exporter) {
    return new JmxMetricWriter(exporter);
}
```
每个指标都导出为单独的MBean。`ObjectNamingStrategy`给出了`ObjectNames`的格式，可以将其注入到`JmxMetricWriter`中(缺省情况下，可以将指标名和前两个周期分隔的部分分隔开，从而使指标可以在JVisualVM或JConsole中分组)。

### 从多个来源聚合指标
你可以使用`AggregateMetricReader`来合并来自不同物理源的指标。相同逻辑指标的源只需要用一个周期分隔的前缀来发布它们，并且reader将聚合(通过截断指标名称，并删除前缀)它们。counter 会相加，并且其他的（即gauge）将取其最新值。

如果多个应用程序实例从中央(例如Redis)仓库获取并显示结果时，这将是非常有用的。特别推荐结合`MetricReaderPublicMetrics`连接“/metrics”端点的结果。

例如：
```java
@Autowired
private MetricExportProperties export;

@Bean
public PublicMetrics metricsAggregate() {
    return new MetricReaderPublicMetrics(aggregatesMetricReader());
}

private MetricReader globalMetricsForAggregation() {
    return new RedisMetricRepository(this.connectionFactory,
        this.export.getRedis().getAggregatePrefix(), this.export.getRedis().getKey());
}

private MetricReader aggregatesMetricReader() {
    AggregateMetricReader repository = new AggregateMetricReader(
        globalMetricsForAggregation());
    return repository;
}
```

> 上面的例子中使用了`MetricExportProperties`来注入和提取key 和prefix 。这是通过Spring Boot提供的，并且默认设置是合理的。他们在`MetricExportAutoConfiguration`中进行设置。

> 上面的`@MetricReaders`不是`@Beans`，也没有标记`@ExportMetricReader`，因为他们只是收集和分析来自其他仓库的数据，并且不希望导出他们的值。

### Dropwizard指标
当你声明对`io.dropwizard.metrics:metrics-core`的依赖时，将创建一个默认的`MetricRegistry` Spring bean;如果需要定制，还可以注册自己的`@Bean` 实例。
用户[Dropwizard “指标” 库](https://dropwizard.github.io/metrics/)的用户会发现Spring  Boot 指标自动发布到`com.codahale.metrics.MetricRegistry`。来自`MetricRegistry `的指标也会通过`/metrics`端点自动暴露出来。

当使用Dropwizard指标时，默认的`CounterService`和`GaugeService`将被替换为`DropwizardMetricServices`，它是`MetricRegistry`的包装器（因此你可以`@Autowired`其中一个服务并正常使用它）。你还可以通过使用适当的类型(例如`timer.*`，针对gauge的`histogram.*`，针对counter的`meter.*`）预先确定你的指标名称来创建“特殊”的Dropwizard 指标。

### 消息通道集成
如果存在一个名为`metricsChannel`的`MessageChannel` bean，那么将创建一个将指标写入该通道的`MetricWriter`。发送到该通道的每个消息都将包含一个[`Delta`](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/actuate/metrics/writer/Delta.html)或[`Metric`](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/actuate/metrics/Metric.html)有效负载，并有一个`metricName`头。writer自动地连接到一个导出器(对于所有的writer)，所以所有的指标都将出现在通道上，并且订阅者可以采取额外的分析或操作(由你来提供所需要的通道和订阅者)。

## 审计
Spring Boot Actuator具有灵活的审计框架，一旦使用了Spring  Security（默认情况下是“认证成功”，“失败”和“拒绝访问”异常），就会发布事件。这对于做报告来说非常有用，也可以实现身份验证失败时的锁定策略。要自定义发布的安全事件，你可以提供自己的`AbstractAuthenticationAuditListener`和`AbstractAuthorizationAuditListener`的实现。

你还可以选择为你自己的业务事件使用审计服务。要这样做可以将现有`AuditEventRepository`注入自己的组件然后直接使用,或者你以简单地通过Spring `ApplicationEventPublisher`(使用`ApplicationEventPublisherAware`)发布`AuditApplicationEvent`。

## 追踪
为所有HTTP请求自动启用跟踪。你可以查看`trace`端点并获得关于最后100个请求的基本信息:
```
[{
    "timestamp": 1394343677415,
    "info": {
        "method": "GET",
        "path": "/trace",
        "headers": {
            "request": {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Connection": "keep-alive",
                "Accept-Encoding": "gzip, deflate",
                "User-Agent": "Mozilla/5.0 Gecko/Firefox",
                "Accept-Language": "en-US,en;q=0.5",
                "Cookie": "_ga=GA1.1.827067509.1390890128; ..."
                "Authorization": "Basic ...",
                "Host": "localhost:8080"
            },
            "response": {
                "Strict-Transport-Security": "max-age=31536000 ; includeSubDomains",
                "X-Application-Context": "application:8080",
                "Content-Type": "application/json;charset=UTF-8",
                "status": "200"
            }
        }
    }
},{
    "timestamp": 1394343684465,
    ...
}]
```
以下是默认情况下的跟踪:

名称|描述
--|--
Request Headers|request头
Response Headers|response头
Cookies|request头中的`Cookie`和response头中的`Set-Cookie`
Errors|错误属性（若有的话）
消耗的时间|请求服务的毫秒时间

### 自定义追踪
如果需要跟踪其他事件，可以将`TraceRepository`注入到Spring bean中。`add`方法接受一个单一的`Map`，该`Map`将转换为JSON并被记录下来。

默认情况下，将使用一个`InMemoryTraceRepository`来存储最后的100个事件。如果需要扩展容量，你可以定义自己的`InMemoryTraceRepository` bean实例。如果需要，还可以创建自己的`TraceRepository`实现。

## 进程监控
在Spring Boot Actuator 中，你可以找到几个类用来创建对进程监控有用的文件:
- `ApplicationPidFileWriter`创建一个包含应用程序PID的文件(默认情况下在应用程序目录中, 文件名称`application.pid`)。
- `EmbeddedServerPortFileWriter`创建一个文件(或多个文件)包含嵌入式服务器的端口(默认情况下在应用程序目录,文件名为`application.port`)。

这些writer在默认情况下不会被激活，但是你可以用下面的方法来启用它们。

### 扩展配置
在`META-INF/spring.factories`文件可以激活写`PID`文件的监听器。例如:
```
org.springframework.context.ApplicationListener=\
org.springframework.boot.system.ApplicationPidFileWriter,\
org.springframework.boot.actuate.system.EmbeddedServerPortFileWriter
```

### 编程方式
你也可以通过调用`SpringApplication.addListeners(…)`方法并传入适当的`Writer`对象的方式来激活一个监听器。该方法还允许你通过`Writer`的构造函数来定制文件名和路径。

### 禁用扩展的Cloud Foundry actuator 支持

### Cloud Foundry自签署证书
### 自定义安全配置
## 延伸阅读
如果你想要探索本章中讨论的一些概念，你可以看看actuator   [示例程序](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples)。你也可能想要了解一些图形化工具，比如[Graphite](http://graphite.wikidot.com/)。

否则，你可以继续阅读有关“[部署选项](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#deployment)”的信息，或者提前深入了解一些有关Spring Boot的[构建工具插件](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#build-tool-plugins)的信息。 