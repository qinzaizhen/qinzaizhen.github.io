---
title: Spring Boot 八- 构建工具插件
date: 2017-10-16 16:05:47
tags: [Spring Boot,build tool plugin]
---

Spring Boot提供Maven和Gradle的构建工具插件。插件提供了各种功能，包括可执行jar的打包。 本节提供有关这两个插件的更多详细信息，以及如果需要扩展不受支持的构建系统的一些帮助。 如果你刚刚开始，你可能需要先阅读[第三部分“使用Spring Boot”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#using-boot)一节中的[“第13章，构建系统”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#using-boot-build-systems)。
## Spring Boot Maven plugin
Spring Boot Maven插件在Maven中提供Spring Boot支持，允许你打包可执行的jar或war包并可以直接运行应用程序。要使用它，你必须使用Maven 3.2（或更高版本）。

> 有关完整的插件文档，请参阅Spring Boot Maven插件网站。

### 引入插件
要使用Spring Boot Maven Plugin，只需在`pom.xml`的`plugins`部分包含相应的XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!-- ... -->
    <build>
        <plugins>
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
        </plugins>
    </build>
</project>
```
此配置将重新打包在Maven生命周期的`package`阶段期间构建的jar或war。 以下示例展示了`target`目录中的重新打包的jar以及原始jar：
```
$ mvn package
$ ls target/*.jar
target/myproject-1.0.0.jar target/myproject-1.0.0.jar.original
```
如果你没有包含上述的`<execution />`配置，你可以自行运行该插件（但是仅当使用package目标时）。 例如：
```
$ mvn package spring-boot:repackage
$ ls target/*.jar
target/myproject-1.0.0.jar target/myproject-1.0.0.jar.original
```
如果你正在使用里程碑或快照版本，还需要添加适当的`pluginRepository`元素：
```xml
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
```

### 打包可执行jar的war文件
一旦你的pom.xml中包含了`spring-boot-maven-plugin`，它将自动尝试重写包，使其可以使用`spring-boot:repackage`目标来执行。你应该使用常规的`packaging`元素配置你的项目来构建jar或war（如适用）：
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- ... -->
    <packaging>jar</packaging>
    <!-- ... -->
</project>
```
你的现有包将在`package`阶段由Spring Boot增强。 你要启动的主类可以使用配置选项指定，也可以以常规方式向清单添加`Main-Class`属性。 如果你没有指定一个主类，那么插件将搜索一个带有`public static void main(String[] args)`方法的类。

要构建和运行项目artifact，可以输入以下内容：
```
$ mvn package
$ java -jar target/mymodule-0.0.1-SNAPSHOT.jar
```
要构建可执行并可部署到外部容器的war文件，你需要将嵌入式容器依赖项标记为“provided”，例如：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- ... -->
    <packaging>war</packaging>
    <!-- ... -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <!-- ... -->
    </dependencies>
</project>
```
> 有关如何创建可部署的war文件的更多详细信息，请参阅"[第86.1节"创建可部署的war文件"](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-create-a-deployable-war-file)"部分。

[插件信息页面](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/maven-plugin//)中提供了高级配置选项和示例。

## Spring Boot Gradle plugin
Spring Boot Gradle插件在Gradle中提供Spring Boot支持，允许你打包可执行的jar或war 包，运行Spring Boot应用程序并使用`spring-boot-dependencies`提供的依赖关系管理。 它需要Gradle 3.4级或更高版本。 请参阅插件的文档了解更多信息：
- Reference ([HTML](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/gradle-plugin//reference/html) and [PDF](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/gradle-plugin//reference/pdf/spring-boot-gradle-plugin-reference.pdf))
- [API](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/gradle-plugin//api)

## Spring Boot AntLib 模块

### Spring Boot Ant 任务
#### spring-boot:exejar
#### 示例
### spring-boot:findmainclass
#### 示例
## 其他构建系统支持
如果要使用除Maven，Gradle或Ant之外的构建工具，则可能需要开发自己的插件。 可执行的jar需要遵循特定格式，某些条目需要以未压缩的形式写入（有关详细信息，请参阅附录中的[*可执行jar格式*](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#executable-jar)部分）。

Spring Boot Maven和Gradle插件都使用`spring-boot-loader-tools`来实际生成jar。 如果需要，你也可以直接使用这个库。

### 重新打包
要重新打包现有的包，以便它成为一个独立的可执行包，请使用`org.springframework.boot.loader.tools.Repackager`。`Repackager`类接受一个引用现有jar或war包的构造函数参数。 使用两个可用的`repackage()`方法之一替换原始文件或写入新的目录。 在重新打包运行之前，也可以配置各种设置。
### 内部库
在重新打包时，可以使用`org.springframework.boot.loader.tools.Libraries`接口来引用依赖关系文件。我们不提供这里的库的任何具体实现，因为它们通常是构建系统特定的。

如果你的包已经包含库，你可以使用`Libraries.NONE`。

### 查询main 类
如果不使用`Repackager.setMainClass()`来指定主类，则重新打包程序将使用`ASM`读取类文件，并尝试找到拥有`public static void main（String [] args）`方法的合适的类。 如果找到多个候选者，则抛出异常。

### 重新打包实现示例
这是一个典型的重新打包例子：
```
Repackager repackager = new Repackager(sourceJarFile);
repackager.setBackupSource(false);
repackager.repackage(new Libraries() {
            @Override
            public void doWithLibraries(LibraryCallback callback) throws IOException {
                // Build system specific implementation, callback for each dependency
                // callback.library(new Library(nestedFile, LibraryScope.COMPILE));
            }
        });
```
## 延伸阅读
如果你对构建工具插件的工作原理感兴趣，可以在GitHub上查看[`spring-boot-tools`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-tools)模块。 [可执行jar格式](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#executable-jar)的更多技术细节在附录中有所描述。

如果你有特殊的构建问题，可以查看“[how-to](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto)”指南。