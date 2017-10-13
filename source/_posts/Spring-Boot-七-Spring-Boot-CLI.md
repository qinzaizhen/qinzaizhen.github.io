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

> 许多Spring注解将在不使用`import`语句的情况下工作。 尝试运行应用程序以查看在添加导入之前失败的内容。

#### 自动的main方法
#### 自定义依赖管理
### 具有多个源文件的应用
### 打包应用
### 初始化新项目
### 使用嵌入式脚本
### 添加CLI扩展
## 使用Groovey beans DSL 开发应用
## 使用settings.xml配置CLI
## 延伸阅读