---
title: Spring Boot 七 - Spring Boot CLI
date: 2017-10-13 19:17:04
tags: [Spring Boot,Spring Boot CLI,CLI]
---

Spring Boot CLI是一个命令行工具，可以使用Spring来快速开发。它允许你运行Groovy脚本，这意味着你具有熟悉的类似Java的语法，没有太多的样板代码。您还可以引导新项目或为其编写自己的命令。

## 安装CLI
可以手动安装Spring Boot CLI; 如果你是OSX用户可以使用SDKMAN！（SDK Manager）或使用Homebrew或MacPorts。有关全面的安装说明，请参见“入门”部分中的[第10.2节“安装弹簧启动CLI”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#getting-started-installing-the-cli)。

## 使用CLI
一旦你安装了CLI，你可以通过输入`spring`来运行它。 如果没有使用任何参数运行`spring`，将显示一个简单的帮助屏幕：
```
$ spring
usage: spring [--help] [--version]
       <command> [<args>]

Available commands are:

  run [options] <files> [--] [args]
    Run a spring groovy script

  ... more command help is shown here
```
你可以使用`help`来获取有关任何支持的命令的更多详细信息。 例如：
```
$ spring help run
spring run - Run a spring groovy script

usage: spring run [options] <files> [--] [args]

Option                     Description
------                     -----------
--autoconfigure [Boolean]  Add autoconfigure compiler
                             transformations (default: true)
--classpath, -cp           Additional classpath entries
-e, --edit                 Open the file with the default system
                             editor
--no-guess-dependencies    Do not attempt to guess dependencies
--no-guess-imports         Do not attempt to guess imports
-q, --quiet                Quiet logging
-v, --verbose              Verbose logging of dependency
                             resolution
--watch                    Watch the specified file for changes
```
`version`命令提供了一个快速的方法来检查你正在使用哪个版本的Spring Boot。
```
$ spring version
Spring CLI v2.0.0.BUILD-SNAPSHOT
```
### 使用CLI运行应用
你可以使用`run`命令编译和运行Groovy源代码。 Spring Boot CLI是完全独立的，因此你不需要任何额外安装Groovy。

下面是一个使用Groovy编写的“hello world” Web应用程序示例：
**hello.proovy**:
```groovy
@RestController
class WebApplication {

    @RequestMapping("/")
    String home() {
        "Hello World!"
    }

}
```
编译并运行应用程序输入：
```
$ spring run hello.groovy
```
要将命令行参数传递给应用程序，你需要使用 `--`将它们与“spring”命令参数分开，例如:
```
$ spring run hello.groovy -- --server.port=9000
```
要设置JVM命令行参数，你可以使用`JAVA_OPTS`环境变量，例如:
```
$ JAVA_OPTS=-Xmx1024m spring run hello.groovy
```
#### 推断的“抓取” 依赖
标准Groovy包括一个@Grab注释，允许你声明第三方依赖库。这种有用的技术允许Groovy以与Maven或Gradle相同的方式下载jar，但不需要使用构建工具。

Spring Boot进一步扩展了这种技术，并将尝试根据你的代码推导出“抓取”哪些库。例如，由于上面的`WebApplication`代码使用`@RestController`注解，“Tomcat”和“Spring MVC”将会被抓取。

以下项目被用作“抓取提示”：

项目| 抓取对象
--|--
`JdbcTemplate`, `NamedParameterJdbcTemplate`, `DataSource` | JDBC 应用.
`@EnableJms`|JMS 应用.
`@EnableCaching`|Caching 抽象.
`@Test`|JUnit.
`@EnableRabbit`|RabbitMQ.
`@EnableReactor`|Project Reactor.
extends `Specification`|Spock 测试.
`@EnableBatchProcessing`|Spring Batch.
`@MessageEndpoint` `@EnableIntegrationPatterns`|Spring Integration.
`@EnableDeviceResolver`|Spring Mobile.
`@Controller` `@RestController` `@EnableWebMvc`|Spring MVC + Embedded Tomcat.
`@EnableWebSecurity`|Spring Security.
`@EnableTransactionManagement`|Spring Transaction Management.

> 请参阅Spring Boot CLI 源代码中[`CompilerAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-cli/src/main/java/org/springframework/boot/cli/compiler/CompilerAutoConfiguration.java)的子类，以准确了解自定义是如何应用的。

#### 推断的“抓取” 坐标
Spring Boot通过允许你指定不带group或version的依赖关系来扩展Groovy的标准`@Grab`支持，例如`@Grab（'freemarker'）`。 这将参考Spring Boot 的默认依赖关系元数据来推断该artifact的group和version。请注意，默认元数据与你正在使用的CLI版本相关联 - 仅当你迁移到新版本的CLI时才会更改，让你控制依赖关系的版本何时更改。可在[附录](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#appendix-dependency-versions)中找到显示默认元数据中包含的依赖关系及其版本的表格。

#### 默认导入语句
为了减少Groovy代码的大小，将自动包含多个`import`语句。 请注意上述示例如何引用`@Component`，`@RestController`和`@RequestMapping`，而不需要使用完全限定名称或`import`语句。

> 许多Spring注解将在不使用`import`语句的情况下工作。尝试运行应用程序以查看在添加导入之前失败的内容。

#### 自动的main方法
不是相当于Java应用，在你的`Groovy`脚本中你不需要包含一个`public static void main(String[] args)`方法。在你的编绎后的代码之上会自动创建一个`SpringApplication`,它们充当了`source`。

#### 自定义依赖管理
默认情况下，CLI在解析`@Grab`依赖关系时使用在`spring-boot-dependencies`中声明的依赖关系管理。可以使用`@DependencyManagementBom`注解来配置附加依赖关系管理，这将覆盖默认依赖关系管理。 注解的值应指定一个或多个Maven BOM的坐标（`groupId：artifactId：version`）。

例如，以下声明：
```
@DependencyManagementBom("com.example.custom-bom:1.0.0")
```
将在Maven仓库中`com/example/custom-versions/1.0.0/`下获取`custom-bom-1.0.0.pom`。

当指定了多个BOM时，它们按照它们被声明的顺序应用。 例如：
```
@DependencyManagementBom(["com.example.custom-bom:1.0.0",
        "com.example.another-bom:1.0.0"])
```
表示`another-bom`中的依赖关系管理将覆盖`custom-bom`中的依赖关系管理。

你可以在可以使用`@Grab`的任何地方使用`@DependencyManagementBom`，但是为了确保依赖关系管理的顺序一致，你最多只能在应用程序中使用`@DependencyManagementBom`。 一个有用的依赖关系源（即Spring Boot的依赖关系管理的超集）就是[Spring IO Platform](http://platform.spring.io/)。`@DependencyManagementBom（ 'io.spring.platform:platform-bom:1.1.2.RELEASE'）`。

### 具有多个源文件的应用
你可以使用所有接受文件输入命令的“shell globbing”。 这允许你轻松地使用单个目录中的多个文件，例如
```
$ spring run *.groovy
```

### 打包应用
你可以使用`jar`命令将应用程序打包成一个独立的可执行jar文件。 例如：
```
$ spring jar my-app.jar *.groovy
```
生成的jar将包含通过编译应用程序和所有应用程序的依赖关系生成的类，以便可以使用`java -jar`来运行。jar文件还将包含应用程序类路径中的内容。 你可以使用`--include`和`--exclude`（两者都以逗号分隔，并且两者接受值“+”和“ - ”的前缀来表示它们应该从默认值中删除）来添加显式路径。默认包含
```
public/**, resources/**, static/**, templates/**, META-INF/**, *
```
默认排除
```
.*, repository/**, build/**, target/**, **/*.jar, **/*.groovy
```
有关更多信息，请参阅`spring help jar`的输出信息。

### 初始化新项目
`init`命令允许你使用[start.spring.io](https://start.spring.io/)创建一个新的项目，而不需要离开shell。 例如：
```
$ spring init --dependencies=web,data-jpa my-project
Using service at https://start.spring.io
Project extracted to '/Users/developer/example/my-project'
```
这将使用`spring-boot-starter-web`和`spring-boot-starter-data-jpa`创建一个基于Maven的项目的`my-project`目录。你可以使用`--list`标志列出这个服务的功能。
```
$ spring init --list
=======================================
Capabilities of https://start.spring.io
=======================================

Available dependencies:
-----------------------
actuator - Actuator: Production ready features to help you monitor and manage your application
...
web - Web: Support for full-stack web development, including Tomcat and spring-webmvc
websocket - Websocket: Support for WebSocket development
ws - WS: Support for Spring Web Services

Available project types:
------------------------
gradle-build -  Gradle Config [format:build, build:gradle]
gradle-project -  Gradle Project [format:project, build:gradle]
maven-build -  Maven POM [format:build, build:maven]
maven-project -  Maven Project [format:project, build:maven] (default)

...
```
`init`命令支持许多选项，请查看`help`输出信息以了解更多详细信息。例如，以下命令使用Java 8和`war`包创建一个gradle项目：
```
$ spring init --build=gradle --java-version=1.8 --dependencies=websocket --packaging=war sample-app.zip
Using service at https://start.spring.io
Content saved to 'sample-app.zip'
```

### 使用嵌入式脚本
Spring Boot包括BASH和zsh shell的命令行完成（提示功能）脚本。 如果你不使用任何一个shell（也许你是Windows用户），则可以使用`shell`命令启动集成的shell。
```
$ spring shell
Spring Boot (v2.0.0.BUILD-SNAPSHOT)
Hit TAB to complete. Type \'help' and hit RETURN for help, and \'exit' to quit.
```
在嵌入式shell中可以直接运行其他命令：
```
$ version
Spring CLI v2.0.0.BUILD-SNAPSHOT
```
嵌入式shell支持ANSI颜色输出以及`tab`完成。如果需要运行本地命令，可以使用`!`前缀。 输入`ctrl-c`将退出嵌入式shell。

### 添加CLI扩展
你可以使用`install`命令为CLI添加扩展。该命令在一组或多组`group:artifact:version`格式中提取组件坐标。 例如：
```
$ spring install com.example:spring-boot-cli-extension:1.0.0.RELEASE
```
除了安装由你提供的坐标识别的组件之外，还将安装所有组件的依赖项。

要卸载依赖关系，请使用`uninstall`命令。与`install`命令一样，它在一组或多组`group:artifact:version`格式中提取组件坐标。 例如：
```
$ spring uninstall com.example:spring-boot-cli-extension:1.0.0.RELEASE
```
它将卸载由你提供的坐标及其依赖关系识别的组件。

要卸载所有其他依赖关系，你可以使用`--all`选项。 例如：
```
$ spring uninstall --all
```

## 使用Groovey beans DSL 开发应用
Spring Framework 4.0原生支持`Bean {}`“DSL”（借鉴于Grails），你可以在你的Groovy应用程序脚本中嵌入使用相同的格式的bean定义。 这有时是包含外部功能（如声明中间件）的好方法。 例如：
```
@Configuration
class Application implements CommandLineRunner {

    @Autowired
    SharedService service

    @Override
    void run(String... args) {
        println service.message
    }

}

import my.company.SharedService

beans {
    service(SharedService) {
        message = "Hello World"
    }
}
```
你可以将类声明与`beans {}`混合在同一个文件中，只要它们保持在顶层，或者你可以将bean DSL放在单独的文件中。

## 使用settings.xml配置CLI
Spring Boot CLI使用Aether（Maven的依赖关系解析引擎）来解析依赖关系。CLI使用`~/.m2/settings.xml`中的Maven配置来配置Aether。 以下配置设置由CLI使用：
- Offline
- Mirrors
- Servers
- Proxies
- Profiles
    - Activation
    - Repositories
- Active profiles

有关更多信息，请参阅[Maven的设置文档](https://maven.apache.org/settings.html)。

## 延伸阅读
GitHub仓库中有一些[示例groovy脚本](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-cli/samples)，你可以使用它来尝试Spring Boot CLI。 整个[源代码](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-cli/src/main/java/org/springframework/boot/cli)中也有大量的Javadoc。

如果你发现你达到CLI工具的极限，你可能需要考虑将应用程序转换为完整的Gradle或Maven构建的“groovy项目”。 下一节将介绍可以用于Gradle或Maven的Spring Boot的[Build工具插件](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#build-tool-plugins)。