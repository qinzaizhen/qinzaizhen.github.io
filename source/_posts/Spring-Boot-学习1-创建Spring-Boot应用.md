---
title: Spring Boot 学习1-创建Spring Boot应用
date: 2017-11-18 17:48:00
tags: [Spring Boot]
---
如果使用Maven, 确保先安装好[Maven](http://maven.apache.org/)再继续。

### 创建POM文件
在这里有两种方式：
1. 继承Spring Boot parent的pom。
2. 不继承。

#### 继承Spring Boot pom
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.example</groupId>
	<artifactId>myproject</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.0.0.BUILD-SNAPSHOT</version>
	</parent>

	<!-- Additional lines to be added here... -->

	<!-- (保用正式版的时候不需要下面的配置) -->
	<repositories>
		<repository>
			<id>spring-snapshots</id>
			<url>http://repo.spring.io/snapshot</url>
			<snapshots><enabled>true</enabled></snapshots>
		</repository>
		<repository>
			<id>spring-milestones</id>
			<url>http://repo.spring.io/milestone</url>
		</repository>
	</repositories>
	<pluginRepositories>
		<pluginRepository>
			<id>spring-snapshots</id>
			<url>http://repo.spring.io/snapshot</url>
		</pluginRepository>
		<pluginRepository>
			<id>spring-milestones</id>
			<url>http://repo.spring.io/milestone</url>
		</pluginRepository>
	</pluginRepositories>
</project>
```
此种方式会约定Spring Boot 依赖的版本，它最终继承自`spring-boot-dependencies`模块，此模块规定了各种依赖的版本号，我们只需要引入groupId 和artifactId就可以了。而且还引入了一些maven的插件，可以让我们用maven的方式`mvn spring-boot:run `来启动我们的应用。当然如果你用了强大的IDEA,直接可以像普通的应用程序一样启动。

#### 不继承Spring Boot parent
因为实际开发过程中我们可能会有自己的parent，要开发的功能只是项目中一个模块，这时候就没法使用spring boot parent。这时只需要将spring boot dependencies引入到我们的项目中来就可以了。
```
<dependencyManagement>
		<dependencies>
		<dependency>
			<!-- Import dependency management from Spring Boot -->
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-dependencies</artifactId>
			<version>2.0.0.BUILD-SNAPSHOT</version>
			<type>pom</type>
	        <scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
```
然后我们还是可以在我们的项目中声明groupdId和artifactId来引入依赖。如果需要使用spring boot 的maven插件来启动，则需要手动引入.
```
<plugins>
    <plugin>
        <!--使用boot的maven插件来方便运行boot应用-->
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
</plugins>
```
### 添加依赖
上面也提到了，如果你继承了spring boot parent，或者引入了spring boot dependencies模块，那么spring boot 就帮你管理了常用的依赖，你可以在引入的时候省略掉版本号。使用这种方式的好处是，spring boot已经帮你考虑了兼容性的问题。

另外，spring boot 引入了starter的概念。其实就是帮你将相关的依赖整理在一起，你只需要依赖这个starter就可以引入所需要的所有依赖。另外就是starter会帮你做一些自动配置，这个后面会讲到。例如我们要开发web项目，只需要引入`spring-boot-starter-web`依赖就可以了。
```
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
		<!--版本号已经省略-->
	</dependency>
</dependencies>
```
我们可以看一下引入了哪些依赖
```
mvn dependency:tree

[INFO] life.qzz:springboot.demo1:jar:1.0-SNAPSHOT
[INFO] \- org.springframework.boot:spring-boot-starter-web:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    +- org.springframework.boot:spring-boot-starter:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    |  +- org.springframework.boot:spring-boot:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    |  +- org.springframework.boot:spring-boot-autoconfigure:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    |  +- org.springframework.boot:spring-boot-starter-logging:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    |  |  +- ch.qos.logback:logback-classic:jar:1.2.3:compile
[INFO]    |  |  |  +- ch.qos.logback:logback-core:jar:1.2.3:compile
[INFO]    |  |  |  \- org.slf4j:slf4j-api:jar:1.7.25:compile
[INFO]    |  |  +- org.apache.logging.log4j:log4j-to-slf4j:jar:2.9.1:compile
[INFO]    |  |  |  \- org.apache.logging.log4j:log4j-api:jar:2.9.1:compile
[INFO]    |  |  +- org.slf4j:jul-to-slf4j:jar:1.7.25:compile
[INFO]    |  |  \- org.slf4j:log4j-over-slf4j:jar:1.7.25:compile
[INFO]    |  +- javax.annotation:javax.annotation-api:jar:1.3.1:compile
[INFO]    |  +- org.springframework:spring-core:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]    |  |  \- org.springframework:spring-jcl:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]    |  \- org.yaml:snakeyaml:jar:1.19:runtime
[INFO]    +- org.springframework.boot:spring-boot-starter-json:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    |  +- com.fasterxml.jackson.core:jackson-databind:jar:2.9.2:compile
[INFO]    |  |  +- com.fasterxml.jackson.core:jackson-annotations:jar:2.9.0:compile
[INFO]    |  |  \- com.fasterxml.jackson.core:jackson-core:jar:2.9.2:compile
[INFO]    |  +- com.fasterxml.jackson.datatype:jackson-datatype-jdk8:jar:2.9.2:compile
[INFO]    |  +- com.fasterxml.jackson.datatype:jackson-datatype-jsr310:jar:2.9.2:compile
[INFO]    |  +- com.fasterxml.jackson.module:jackson-module-parameter-names:jar:2.9.2:compile
[INFO]    |  \- com.fasterxml.jackson.module:jackson-module-kotlin:jar:2.9.2:compile
[INFO]    +- org.springframework.boot:spring-boot-starter-tomcat:jar:2.0.0.BUILD-SNAPSHOT:compile
[INFO]    |  +- org.apache.tomcat.embed:tomcat-embed-core:jar:8.5.23:compile
[INFO]    |  |  \- org.apache.tomcat:tomcat-annotations-api:jar:8.5.23:compile
[INFO]    |  +- org.apache.tomcat.embed:tomcat-embed-el:jar:8.5.23:compile
[INFO]    |  \- org.apache.tomcat.embed:tomcat-embed-websocket:jar:8.5.23:compile
[INFO]    +- org.hibernate.validator:hibernate-validator:jar:6.0.4.Final:compile
[INFO]    |  +- javax.validation:validation-api:jar:2.0.0.Final:compile
[INFO]    |  +- org.jboss.logging:jboss-logging:jar:3.3.1.Final:compile
[INFO]    |  \- com.fasterxml:classmate:jar:1.3.4:compile
[INFO]    +- org.springframework:spring-web:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]    |  \- org.springframework:spring-beans:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]    \- org.springframework:spring-webmvc:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]       +- org.springframework:spring-aop:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]       +- org.springframework:spring-context:jar:5.0.2.BUILD-SNAPSHOT:compile
[INFO]       \- org.springframework:spring-expression:jar:5.0.2.BUILD-SNAPSHOT:compile
```
主要是spring web, tomcat等web相关的jar。可以看出来这种方式会相比我们之前的开发方式方便快捷许多。spring boot 提供了一系列的starter，当然如果这些还不能满足你的话，完全可以开发自己的starter，只需要遵循spring boot提供的命名规范就可以了。后面会讲到如何开发starter。

### 编写代码
在src/main/java目录中新建一个简单的类
```
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableAutoConfiguration
public class Example {

	@RequestMapping("/")
	String home() {
		return "Hello World!";
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(Example.class, args);
	}

}
```
这个类中指定了我们的spring boot 的入口`main`函数，这个类就是下步中的main-class。
类上有`@EnableAutoConfiguration`注解，这个注解会告诉Spring Boot 自动该应用，具体做了哪些配置，以后再说。比如说我们添加了web的starter，那么Spring Boot 会认为我们在开发一个web应用，那么会创建一个web applicationContext。自动配置和starter没有完全的绑定有关系，如果把相关的依赖都单独加进来，而不使用starter, Spring Boot 也会尽量做好自动配置工作。另外两个注解`@RestController`和`@RequestMapping("/")`是Spring MVC的。

main方法里面调用`SpringApplication.run()`方法，将我们的主配置类传递给`SpringApplication`,还可以通过args参数将控制台参数传递进去。

### 运行我们的程序
Spring Boot 要求编绎环境为1.8以上，可以在maven pom中设置。
```
<properties>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <java.version>1.8</java.version>
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.target>${java.version}</maven.compiler.target>
</properties>
```
1. 使用maven 插件来运行`mvn spring-boot:run`。
2. 在IDEA中如果不能自动创建spring boot运行配置，可以手动创建。如图所示
![image](http://ooll8xqpq.bkt.clouddn.com/FA1A8449-B29F-4AE0-8449-BD2FA6F04FF5.png)

添加的时候选择spring boot, 主要是指定main class和module路径 。可以将应用添加到spring boot run dashboard中,方便我们管理 spring boot应用。dashboard 如图所示 ![image](http://ooll8xqpq.bkt.clouddn.com/4F5AE28E-3D9A-4D4D-8BE9-49E51706928F.png)
### 打包程序
可以将spring boot 应用打包为一个独立的jar，然后上传到服务器中运行。
```
mvn package

...
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ springboot.demo2 ---
[INFO] Building jar: /Volumes/DATA/code/springboot-demo/demo2/target/springboot.demo2-2.0.0.BUILD-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS

```

如果没有继承spring boot parent，那么需要自己配置一下spring boot maven 插件，不然无法打包成spring boot jar。
```
<build>
  ...
  <plugins>
    ...
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <version>2.0.0.BUILD-SNAPSHOT</version>
      <executions>
        <execution>
          <goals>
            <goal>repackage</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
    ...
  </plugins>
  ...
</build>
```

如果继承了spring boot parent，只需要引入spring boot maven plugin即可，不需要做如上配置。
```
<build>
  ...
  <plugins>
    ...
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
    ...
  </plugins>
  ...
</build>
```
运行的时候执行命令即可。
```
java -jar target/springboot.demo2-2.0.0.BUILD-SNAPSHOT.jar
```

