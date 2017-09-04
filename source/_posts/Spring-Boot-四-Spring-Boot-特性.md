---
title: Spring Boot 四-Spring Boot 特性
date: 2017-08-15 21:13:56
tags: [Spring Boot,特性]
---
## SpringApplication
### 启动失败
### 自定义Banner
### 自定义SpringApplication
### 流式builder API
```java
new SpringApplicationBuilder()
        .sources(Parent.class)
        .child(Application.class)
        .bannerMode(Banner.Mode.OFF)
        .run(args);
```
**Web 组件必须在子上下文中，并且父子上下文将使用相同的环境变量`Environment`**

### 事件和监听器
### Web 环境
### 访问应用参数
### 使用ApplicationRunner，CommandLineRunner
### 应用退出
### 管理员功能
## 扩展配置
Spring Boot 允许扩展配置，因此我们的应用可以在不同的环境中运行。可以使用properties文件，YAML文件，环境变量和命令行参数来扩展配置。属性值可以通过`@Value`注解直接注入到bean中，通过Spring环境变量`Environment`来访问或者通过`@ConfigurationProperties`注解绑定到结构化对象中。

Spring Boot用特定的`PropertySource`顺序来对属性值进行覆盖。顺序如下：
1. 当开发者工具启用时，开发者工具全局设置（`${home}/.spring-boot-devtools.properties`,windows用户在`C:\Users\qinzaizhen\`目录中，`qinzaizhen`为用户名）
2. 测试用例中`@TestPropertySource`注解添加进来的属性
3. `@SpringBootTest#properties`添加的属性
4. 命令行参数
5. `SPRING_APPLICATION_JSON`添加的参数（环境变量或系统属性中嵌入的json）
6. `ServletConfig`初始化参数
7. `ServletContext`初始化参数
8. `java:comp/env` JNDI属性
9. Java系统属性`System.getProperties()`
10. 操作系统环境变量
11. `random.*`形式的`RandomValuePropertySource`
12. jar包外的`application-{profile}.properties`和YAML文件
13. jar包中的`application-{profile}.properties`和YAML文件
14. jar包外的`application.properties`和YAML文件
15. jar包中的`application.properties`和YAML文件
16. `@Configuration`类上`@PropertySource`注解指定的文件
17. 通过`SpringApplication.setDefaultProperties`指定的默认属性

例如下面的一个类，需要注入`name`的值：
```java
import org.springframework.stereotype.*
import org.springframework.beans.factory.annotation.*

@Component
public class MyBean {

    @Value("${name}")
    private String name;

    // ...

}
```
在程序的classpath中可以用`application.properties`文件提供`name`的默认值。当在新环境中运行时，jar包外的`application.properties`可以覆盖`name`的值;在一次性的测试中，可以通过在控制台中指定个一个`name`的值（如：`java -jar app.jar --name="Spring"`）。

`SPRING_APPLICATION_JSON`可以在控制台输入之后变成一个环境变量，比如在Unix shell中：
```shell
$ SPRING_APPLICATION_JSON='{"foo":{"bar":"spam"}}' java -jar myapp.jar
```
在这个例子中，Spring的`Environment`中将会是`foo.bar=spam`。也可以通过设置一个系统属性`$ java -Dspring.application.json='{"foo":"bar"}' -jar myapp.jar`，或者是控制台参数
> $ java -jar myapp.jar --spring.application.json='{"foo":"bar"}' 未成功，找不到这个属性，而且会导致上面的`SPRING_APPLICATION_JSON`环境变量失效

或者通过JNDI变量：`java:comp/env/spring.application.json`。

比如环境变量的方式：

先设置环境变量，然后再运行
```shell
E:\springboot-demo\demo4\target>set SPRING_APPLICATION_JSON={"developer.name":"a
aaaaaaaaaa"}

E:\springboot-demo\demo4\target>java -jar springboot.demo4-1.0-SNAPSHOT.jar
```

控制台打印出：
```
2017-08-08 21:46:24.783 DEBUG 44644 --- [           main] l.q.springboot.demo.domain.AppListener   : 属性值(此处中文有乱码)： aaaaaaaaaaa
```
### 配置随机值
`RandomValuePropertySource`用来注入随机值非常方便（比如注入到秘钥或测试用例中）。可以产生int,long,uuid和字符串。比如：
```
my.secret=${random.value}
my.number=${random.int}
my.bignumber=${random.long}
my.uuid=${random.uuid}
my.number.less.than.ten=${random.int(10)}
my.number.in.range=${random.int[1024,65536]}
```
`random.int*`格式是`OPEN value (,max) CLOSE`，这里的`OPEN,CLOSE`可以是任何的字符，`value,max`是整数。如果`max`有值，那么`value`就是最小值，而`max`就是最大值（不包括`max`）。**`OPEN`,`CLOSE`可以是任何字符，但是如果是上面一样作为属性值，不可使用`{`,`}`。可以是`my.number.in.range=${random.int[1024,65536)}`，意义是一样的。如果是`my.number.in.range=${random.int[1024,65536}}`，那么传到`RandomValuePropertySource`中的表达式为`random.int[1024,65536`，这样在算范围的时候就成了`1024,6553`**。

### 访问控制台参数
`SpringApplication`默认会将控制台选项参数（以`--`开头，如：`--server.port=9000`）转换为一个属性并且将它添加到Spring的环境变量中去。上面提到过控制台参数的优先级比其他的属性源高。 
如果不想添加控制台属性添加到Spring环境变量中，可以通过`SpringApplication.setAddCommandLineProperties(false)`来禁用这个功能。
### 应用属性文件
`SpringApplication`会按照以下顺序加载`application.properties`文件，并且将它他们添加到Spring环境变量中。
1. 当前目录的`/config`子目录
2. 当前目录
3. classpath下`/config`包
4. classpath根目录

如果不想用`application.properties`作为配置文件名，可以通过配置`spring.config.name`环境变量来更改。还可以明确通过`spring.config.location`环境变量指定配置文件的位置（多个目录或者文件路径用`,`隔开）。
```
java -jar myproject.jar --spring.config.name=myproject
```
或者：
```
java -jar myproject.jar --spring.config.location=classpath:/default.properties,classpath:/override.properties
```
> `spring.config.name`和`spring.config.location`在很早的时候用来决定哪些文件需要加载，因此它们必须得在环境变量中声明（常见的是操作系统的环境变量，系统属性或者控制台参数）。

如果`spring.config.location`包含目录（相对文件来说），需要以`/`结尾（并且在开始加载之前，会拼接`spring.config.name`指定的名称，包括特定profile的文件名）。`spring.config.location`中指定的文件还是跟原来一样，不支持特定profile变体，并且会被任何的特定profile属性覆盖。

配置文件是按照反方向的顺序查找的。配置文件的位置默认是`classpath:/,classpath:/config/,file:./,file:./config/`。查找的顺序是反的：
1. `file:./config/`：jar包所在目录创建`config`目录和`application.properties`
2. `file:./`：jar目录中创建`application.properties`
3. `classpath:/config/`：resources目录中创建`config`目录和`application.properties`
4. `classpath:/`：resources根目录创建`application.properties`


> 测试`file:./config/，file:./`这两个时，先打包成jar包，然后再在jar包同目录下创建`config`目录，里面新建`application.properties`文件，同理在jar包同目录下新建`application.properties`文件，两种情况分别测试。跟`@SpringBootApplication`注解的类放在同目录是无法测试这类情况的。
如：
```
myapp.jar
/config/application.properties
```
结果：
```
2017-08-12 10:37:45.677  INFO 17459 --- [           main] s.c.a.AnnotationConfigApplicationContext : Refreshing org.springframework.context.annotation.AnnotationConfigApplicationContext@18ef96: startup date [Sat Aug 12 10:37:45 CST 2017]; root of context hierarchy
属性值：current directory /config
```

当使用自定义位置时，会添加到默认位置中。自定义位置会在默认位置之前查找。例如，如果自定义位置是`classpath:/custom-config/,file:./custom-config/`，那么查找的顺序是：
1. `file:./custom-config/`: 在jar包目录创建对应的目录和文件（成功）
2. `classpath:/custom-config/` ：在resources目录创建对应的目录和文件（未成功）
3. `file:./config/`
4. `file:./`
5. `classpath:/config/`
6. `classpath:/`

这种查找顺序允许你在某个文件中指定一些默认值，然后有在其他文件中有选择性地覆盖这些值。你可以在其中一个默认位置的`application.properties`（或者其他通过`spring.config.name`指定的名称）文件中指定默认值。这些默认值可以在运行的时候被其他任一自定义位置的不同文件覆盖。

> 如果使用环境变量而不是系统属性，大多数操作系统禁止点分隔的名称，但是可以使用下划线来代替（如：`STRING_CONFIG_NAME`代替`spring.config.name` (windows下测试有效)）。

**设置环境变量`STRING_CONFIG_LOCATION`和`spring.config.location`无效。**

如果在容器中运行，JDNI属性(在`java:comp/env`中的)或者servlet上下文初始化参数可以代替环境变量或系统属性。

### Profile-specific属性
除`application.properties`文件之外，还可以定义`application-{profile}.properties`格式的特定profile的属性。当没有指定profile时，`Environment`会使用一些默认的profiles（默认为`[default]`）,比如没有明确指定profile时，将会加载`application-default.properties`。

特定profile的属性和标准的`application.properties`一样从相同的位置加载进来，同时特定profile会覆盖非特定profile的文件，不管这个特定profile的文件是不是在jar包中。

如果指定了多个profile，最后一个将会生效。例如：通过`spring.profiles.active`属性来指定的profile在那些通过`SpringApplication`API 配置的profile后面被添加进来，因此会获取优先权。

> 如果在`spring.config.location`设置的任何文件中的特定profile文件将不会生效。如果`spring.profiles.active`指定的profile名称和`spring.config.location`中的profile名称一样，是会生效的，不一样的话则不会生效。
比如：`spring.profiles.active=dev`，则`java -jar myapp.jar --spring.config.location=application-dev.properties`会生效，但是`java -jar myapp.jar --spring.config.location=application-pro.properties`则不会生效。
如果想让它生效，可以在`spring.config.location`中使用目录（实验结果如上）。

### 属性文件中的Placeholders 
`application.properties`文件中的值可以用`Environment`中存在的值过滤，因此可以引用之前定义过的值（比如：系统属性）。
```properties
app.name=MyApp
app.description=${app.name} is a Spring Boot application
```

> 可以使用这个特性来对一些存在的Spring Boot属性定义短变量。[具体查看](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-use-short-command-line-arguments)。

### YAML 代替属性文件
YAML是JSON的一个超集，也是一个非常方便设置分层配置数据的格式。当在classpath中发现了[Snake YAML](http://www.snakeyaml.org/)包时，`SpringApplication`类会自动支持YAML作为属性的一种可选方案。

> 如果使用spring-boot-starter，Snake YAML会自动加载进来。

#### 加载YAML
Spring Framework 提供了两个方便的类用来加载YAML文档。`YamlPropertiesFactoryBean`将会把YAML加载为`properties`，`YamlMapFactoryBean`将会加载为`Map`。

例如下面的YAML文档：
```yaml
environments:
    dev:
        url: http://dev.bar.com
        name: Developer Setup
    prod:
        url: http://foo.bar.com
        name: My Cool App
```
将会被转换成下面的属性：
```properties
environments.dev.url=http://dev.bar.com
environments.dev.name=Developer Setup
environments.prod.url=http://foo.bar.com
environments.prod.name=My Cool App
```
YAML中的list会表示成带`[index]`的key，比如这个YAML：
```yaml
my:
   servers:
       - dev.bar.com
       - foo.bar.com
```
将会被转换成：
```properties
my.servers[0]=dev.bar.com
my.servers[1]=foo.bar.com
```
使用Spring`DataBinder`工具（`@ConfigurationProperties`正好做这个事情）来绑定这样的属性需要在目标对象中定义`java.util.List`(或`Set`)属性并且需要提供一个setter方法或者通过一个可变的值实例化它，如下面的例子可以绑定上面的属性：
```java
@ConfigurationProperties
public class Config{
    private List<String> servers = new ArrayList<String>();
    
    public List<String> getServers() {
        return this.servers;
    }
}
```
> 当通过上面的方式配置list覆盖时要格外注意，它不会像预想的那样工作，。在上面的例子中，当`my.servers`在多个地方重复定义了，每个元素都是被覆盖的对象，而不是该list。为了确保有最高优先级的`@PropertySource`可以覆盖list，需要将它定义为一个单独的属性。
```yaml
my:
   servers: dev.bar.com,foo.bar.com
```
(未明白是什么场景)

#### 将YMAL作为属性暴露到Spring 环境中
`YamlPropertySourceLoader`类可以用来暴露YAML，将它作为Spring `Environment`的一个`PropertySource`。你可以使用熟悉的`@Value`注解来访问YAML属性。

#### 多个profile 的YAML文件
可以通过`spring.profiles` key 在一个YAML文档中指定多个特定profile。比如：
```yaml
server:
    address: 192.168.1.100
---
spring:
    profiles: development
server:
    address: 127.0.0.1
---
spring:
    profiles: production
server:
    address: 192.168.1.120
```
在上面的例子中，当profile `development`激活时`server.address`属性将是`127.0.0.1`。如果`development`和`production` profile未激活时，那么`server.address`的值将是`192.168.1.100`。

在应用上下文启动时，如果没有明显地指定profile时，那么默认的profile将会激活。所以在下面的YAML中我们为`security.user.password`设置了一个值，**仅在** "default" profile中可用。
```yaml
server:
  port: 8000
---
spring:
  profiles: default
security:
  user:
    password: weak
```
然而在下面这个例子中，password一直都有值，因为它不属于任何profile，并且在需要的时候必须得在其他的profile中显示地进行重设。
```yaml
server:
  port: 8000
security:
  user:
    password: weak
```
Spring profile设计的`spring.profiles`元素可以使用`!`字符来否定。如果在一个文档中否定和非否定的profile被指定，至少必须匹配一个非否定的pfofile，否定的profile可以不匹配。
#### YAML 缺陷
YAML文件无法通过`@PropertySource`注解加载。如果想通过这种方式加载，需要使用properties文件。
#### 合并YAML列表
在上面已经知道，YAML中的内容将会完全转换成properties。在profile中覆盖list时这个处理有可能与直觉背道而驰。例如，假设`MyPojo`对象有`name`和`description`两个属性，并且默认为`null`。从`FooProperties`对象中暴露出`MyPojo`的一个list。
```java
@ConfigurationProperties("foo")
public class FooProperties {

    private final List<MyPojo> list = new ArrayList<>();

    public List<MyPojo> getList() {
        return this.list;
    }

}
```
有以下配置：
```yaml
foo:
  list:
    - name: my name
      description: my description
---
spring:
  profiles: dev
foo:
  list:
    - name: my another name
```
如果`dev` profile没有激活，那么`FooProperties.list`将会包含一个`MyPojo`。然而当`dev` profile 激活时，这个`list`仍然只有一个实体（name 为“my another name” ，description 为 `null`）。这样配置不会为这个list增加第二个`MyPojo`，而且不会合并元素。

当在多个pfofile中声明一个集合时，将会使用最高优先级的那个（并且只有这一个）：
```yaml
foo:
  list:
    - name: my name
      description: my description
    - name: another name
      description: another description
---
spring:
  profiles: dev
foo:
  list:
     - name: my another name
```
在这个例子中，考虑到profile `dev`激活时，`FooProperties.list`将会包含*一*个`MyPojo`实体（name 为“my another name” 并且 description 为`null`）。
### 类型安全的配置属性
在使用`@value("${property}")`注解注入配置属性时，有可能会很麻烦，尤其是如果使用多个属性或者数据具有层次性时。Spring Boot 提供了一个可选的方法来处理属性，它允许强类型控制并且校验这些配置。
```java
package com.example;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("foo")
public class FooProperties {

    private boolean enabled;

    private InetAddress remoteAddress;

    private final Security security = new Security();

    public boolean isEnabled() { ... }

    public void setEnabled(boolean enabled) { ... }

    public InetAddress getRemoteAddress() { ... }

    public void setRemoteAddress(InetAddress remoteAddress) { ... }

    public Security getSecurity() { ... }

    public static class Security {

        private String username;

        private String password;

        private List<String> roles = new ArrayList<>(Collections.singleton("USER"));

        public String getUsername() { ... }

        public void setUsername(String username) { ... }

        public String getPassword() { ... }

        public void setPassword(String password) { ... }

        public List<String> getRoles() { ... }

        public void setRoles(List<String> roles) { ... }

    }
}
```
上面的POJO定义了下面的这些属性：
- `foo.enabled`，默认为`false`
- `foo.remote-address`，能够从`String`强转过来。
- `foo.security.username`，一个内部属性，名称由属性的名称决定。特别是返回类型完全不被使用而且可能是`SecurityProperties`
- `foo.security.password`
- `foo.security.roles`，`String`集合

> get和set方法通常是必须要有的，因为绑定是通过标准的Java Bean 内省包，就像在Spring MVC里一样。有一些情况下set方法可以省略：
> - Maps，只要他们初始化了，需要一个get方法不需要set方法，因为他们可以被binder修改。
> - Collections和arrays可以通过下标（尤其是和YAML一起时）或者使用单行逗号分隔的值（属性）。在后一种情况下，set方法必须要有。强烈建议一直添加set方法。如果实例化了一个集合，确保可以修改（如上例）
> - 如果内部POJO属性初始化了（如上面例子中的`Security`属性），不需要set方法。如果想要binder通过它的默认构造函数来实例化，需要提供set方法。
> 有人使用Lombok项目来自动生成get和set方法。确保Lombok没有为这些类型生成任何常规的构造方法，因为容器在实例化这种对象时会自动调用构造方法。

> 查看[`@Value`和`@ConfigurationProperties`之间的区别](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-external-config-vs-value)

还需要在`@EnableConfigurationProperties`注解中进行注册：
```java
@Configuration
@EnableConfigurationProperties(FooProperties.class)
public class MyConfiguration {
}
```
> 当`@ConfigurationProperties` bean 通过这种方式注册之后，这个bean会有一个方便的名称：`<prefix>-<fqn>`，这里的`<prefix>`是`@ConfigurationProperties`中定义的环境的key 前缀，`<fqn>`是这个bean的全名称。如果注解没有提供任何的前缀，将会使用这个bean的全名称。上面例子中的bean名称为`foo-com.exapmle.FooProperties`。

尽管上面的配置将会为`FooProperties`创建一个常规的bean，但是建议`@ConfigurationProperties`只处理跟环境相关的，特别是不从上下文中注册其他的bean。之前说过，`@EnableConfigurationProperties`注解也会自动地应用到项目中，因此任何现存的`@ConfigurationProperties`注解过的bean将会配置到环境中。可以简配上面的`MyConfiguration`通过确保`FooProperties`已经是一个bean。
```java
@Component
@ConfigurationProperties(prefix="foo")
public class FooProperties {

    // ... see above

}
```
这种配置方式特别适合`@SpringApplication`外面YAML配置：
```yml
# application.yml

foo:
    remote-address: 192.168.1.1
    security:
        username: foo
        roles:
          - USER
          - ADMIN

# additional configuration as required
```
要使用`@ConfigurationProperties`注解的bean，可以直接像其他bean一样将它们注入进来。
```java
@Service
public class MyService {

    private final FooProperties properties;

    @Autowired
    public MyService(FooProperties properties) {
        this.properties = properties;
    }

     //...

    @PostConstruct
    public void openConnection() {
        Server server = new Server(this.properties.getRemoteAddress());
        // ...
    }

}
```
> 使用`@ConfigurationProperties`还可以生成描述数据文件，这些文件可以被IDE用来自动提示。[详情查看](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#configuration-metadata)

#### 第三方配置
除了使用@configurationproperties来注解一个类，还可以在public的@bean方法上使用它。当你想绑定属性到那些不受控制的第三方组件时这将会非常有用。  
要在bean中使用`Environment`的属性，需要在bean注册的地方添加`@ConfigurationProperties`：
```java
@ConfigurationProperties(prefix = "bar")
@Bean
public BarComponent barComponent() {
    ...
}
```
任何以`bar`开头的属性都将会绑定到这个`BarComponent` bean 上，就像上面的`FooProperties`一样。
#### 松散绑定
Spring Boot使用一些松散的规则来绑定`Environment`属性到`@ConfigurationProperties` bean上，因此`Environment`属性名称和bean的属性名称没有必要完全匹配。这些有用的例子包括虚线（如：`context-path`绑定到`contextPath`）和大写（如：`PORT`绑定到`port`）环境属性。

例如下面给出的`@ConfigurationProperties`类：
```java
@ConfigurationProperties(prefix="person")
public class OwnerProperties {

    private String firstName;

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

}
```
下面所有的属性都可以使用：

属性名|解释
--|--
`person.firstName`|标准的驼峰形式
`person.first-name`|短横线隔开，在`.properties`和`.yml`文件中推荐使用这种形式
`person.first_name`|下划线符号，`.properties`和`.yml`文件中可选的一种形式
`PERSON_FIRSTNAME`|大写形式。推荐在系统环境变量中使用

> 注解的`prefix`值必须是短横线隔开的形式，如：小写并且以`-`分隔。这里如果只有`person`就没有必要隔开了。

<h6>松散绑定规则</h6>

属性来源|简单值|List值
--|--|--
Properties文件|驼峰形式，短横线隔开，下划线符号|用`[]`的标准list形式或者逗号隔开的值
YAML文件|驼峰形式，短横线隔开，下划线符号|标准的YAML list形式或者逗号隔开的值
环境变量|以下划线作为分隔符的大写形式。`_`不要在属性名中使用|下划线包围的数字形式。如：`MY_FOO_1_BAR = my.foo[1].bar`
系统属性|驼峰形式，短横线隔开，下划线符号|用`[]`的标准list形式或者逗号隔开的值

> 建议尽可能地用小写短横线格式来存储属性。如：`my.property-name=foo`
#### 属性转换
在属性绑定到`@configurationProperties` bean的过程中，Spring会尝试强制转换为正确的类型。如果需要自定义类型转换，可以提供一个`ConversionService` bean（bean的id为`conversionService`）或者自定义属性编辑器（通过一个`CustomEditorConfigurer` bean），或者是自定义`Converters`（通过`@ConfigurationPropertiesBinding`注解）。

> 由于`ConversionService`在应用的生命周期中使用的非常早，因此需要确保减少它的依赖。典型地，你需要的任何依赖可能在创建时间没有完全初始化。如果`ConversionService`在配置key强转的过程中不需要，并且仅仅依赖于`@ConfigurationPropertiesBinding`限制的自定义转换器，你有可能想对它重命名。
#### @ConfigurationProperties 校验
Spring Boot会尝试校验那些使用了Spring的`@Validated`注解的`@ConfigurationProperties`类。可以直接在配置类上使用JSR-303 `javax.validation`约束注解。只需要确保在classpath中有一个兼容的JSR-303实现，然后再在类属性上加上约束注解就可以了。

如：
```java
@ConfigurationProperties(prefix="foo")
@Validated
public class FooProperties {

    @NotNull
    private InetAddress remoteAddress;

    // ... getters and setters

}
```
为了校验内部属性，必须在属性上使用`Valid`注解来触发校验。例如，下面的`FooProperties`：
```java
@ConfigurationProperties(prefix="connection")
@Validated
public class FooProperties {

    @NotNull
    private InetAddress remoteAddress;

    @Valid
    private final Security security = new Security();

    // ... getters and setters

    public static class Security {

        @NotEmpty
        public String username;

        // ... getters and setters

    }

}
```
还可以通过创建一个bean定义为`configurationPropertiesValidator`的方式增加一个自定义Spring `Validator`。`@Bean`方法应该声明为`static`。配置属性校验器创建的时机在应用 的生命周期中非常早，因此将`@Bean`方法声明为static可以让这个bean的创建不需要实例化`@Configuration`。这避免了饥饿实例化引起的一些问题。 
> `spring-boot-actuator`模块包含了一个端点，暴露了所有的`@ConfigurationProperties` bean。在浏览器中访问`/configprops`或者使用相同的JSX端点。[详情查看](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#production-ready-endpoints)

#### @ConfigurationProperties 与 @Value对比
`@Value`是核心容器的一个功能，不提供`@ConfigurationProperties `类似的类型安全的功能。下面的表格总结了两个注解支持的功能。

功能|@ConfigurationProperties|@Value
--|--|--
不严格绑定|支持|不支持
元数据支持|支持|不支持
SpEL 表达式|不支持|支持

如果为自己的组件定义了一些配置键值，建议将他们放在一个POJO对象中，并且用`@ConfigurationProperties`注解。同时要注意由于`@Value`不支持松散绑定，因此当需要提供环境变量的值时最好不用`@Value`。

最后，虽然可以用`@Value`编写`SpEL`表达式，但这些从应用程序属性文件中的表达式不会处理。

## Profiles
Spring Profile提供了一种隔离部分应用配置的方式，同时使它只在某种确定的环境中可用。任何`@Component`或`@Configuration`可以标记`@Profile`注解来限制它们被加载。

```java
@Configuration
@Profile("production")
public class ProductionConfiguration {

    // ...

}
```
在Spring常规的方式中，可以使用`spring.profile.active` `Environment`属性来指定激活哪个profile。可以在任何常规方式中指定这个属性，比如可以在`application.properties`文件中指定：

```
spring.profiles.active=dev,hsqldb
```

或者在控制台指定：`--spring.profiles.active=dev,hsqldb`。

### 增加激活的profile
`spring.profiles.active`属性跟其他属性一样遵循相同的顺序规则，最高优先级的将会生效。意思是可以指定在`application.properties`文件中指定激活的profile，然后在控制台中替换掉它。

有时增加激活的profile而不是替换掉它们将会对特定profile属性非常有用。`spring.profiles.include`属性可以用来无条件地增加激活的profile。`SpringApplication`入口也拥胡一个API来设置附加的profile（如在那些通过`spring.profiles.active`属性设置的profile之上）：`setAdditionalProfiles()`方法。

例如：当一个应用通过`--spring.profiles.active=prod`开关来运行时，`proddb`和`prodmq` profile也会被激活：
```yaml
---
my.property: fromyamlfile
---
spring.profiles: prod
spring.profiles.include:
  - proddb
  - prodmq
```

> 记住一点：`spring.profiles`属性可以定义在YAML文档中，用来决定什么时候这个特殊的文档被包含在配置中。更多查看[ Change configuration depending on the environment](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-change-configuration-depending-on-the-environment)。

### 以编程方式设置profile
在应用启动之前可以通过调用`SpringApplication.setAdditionalProfiles()`方法以编程的方式来设置激活的profile。用Spring `ConfigurableEnvironment`接口也可以激活profile。

### 特定Profile配置文件
`application.properties`（或`application.yml`）和通过`@ConfigurationProperties`引用的文件中的特定profile变量都会被加载。详细查看[Section 24.4, “Profile-specific properties”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-external-config-profile-specific-properties)

## 日志
Spring Boot 内部使用 [Commons Log](http://commons.apache.org/logging)记录日志，但是放开了日志实现。为[Java Util Logging](http://docs.oracle.com/javase/7/docs/api/java/util/logging/package-summary.html)，[Log4J2](http://logging.apache.org/log4j/2.x/)和[Logback](http://logback.qos.ch/)提供了默认的配置。每个logger都预先配置了输出到控制台和选择输出到文件。

如果使用了"Starters"，默认会使用Logback来记录日志。还包括适当的Logback路由，以确保使用Java Util Logging、Commons Logging、Log4J或SLF4J的依赖库都能正常工作。

> Java 有很多日志框架可选。不要对上面的选择很困惑。一般不需要改变日志的依赖，并且Spring Boot 默认就会工作地很好。

### 日志格式
Spring Boot默认的日志输出格式类似下面这种：
```txt
2014-03-05 10:57:51.112  INFO 45469 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet Engine: Apache Tomcat/7.0.52
2014-03-05 10:57:51.253  INFO 45469 --- [ost-startStop-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2014-03-05 10:57:51.253  INFO 45469 --- [ost-startStop-1] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 1358 ms
2014-03-05 10:57:51.698  INFO 45469 --- [ost-startStop-1] o.s.b.c.e.ServletRegistrationBean        : Mapping servlet: 'dispatcherServlet' to [/]
2014-03-05 10:57:51.702  INFO 45469 --- [ost-startStop-1] o.s.b.c.embedded.FilterRegistrationBean  : Mapping filter: 'hiddenHttpMethodFilter' to: [/*]
```
输出了以下内容：

- 日期和时间：毫秒级精度，容易排序
- 日志级别-`ERROR`,`WARN`,`INFO`,`DEBUG`或`TRACE`
- 进程ID
- 用一个`---`分隔符来区分真正的日志内容起始
- 线程名称- 用方括号包裹起来（在控制台输出时有可能被截断）
- 日志记录器名称-这个通常是类名称（通常是短小的）
- 日志内容

> Logback 没有`FATAL`这个级别（映射到ERROR）。

### 控制台输出
默认地的日志配置会将日志打印到控制台。默认会记录`ERROR`,`WARN`和`INFO`级别的日志。可以在启动的时候通过`--debug`来开启"debug"模式。
```shell
$ java -jar myapp.jar --debug
```

> 也可以在`application.properties`文件指定`debug=true`。

当debug模式启用时，选择的核心日志记录器（嵌入式容器，Hibernate和Spring Boot）将会记录更多更多信息。启用debug模式并不会配置应用程序以`DEBUG`级别来记录所有消息。

可以选择通过`--trace`标记（或者`application.properties`文件中`trace=true`）来启用"trace"模式。这将为选择的核心日志记录器（嵌入式容器，Hibernate schema生成和整个的Spring框架）启用trace日志记录。

#### 彩色编码输出
如果终端支持ANSI，将会以彩色输出来帮助阅读。可以设置`spring.output.ansi.enabled`为一个受支持的值来覆盖自动探测。

使用`%clr`转换词来配置彩色编码。在它最简单的形式中，转换器将以日志级别来为输出涂色。比如：
```
%clr(%5p)
```

日志级别对应的颜色如下：

级别|颜色
--|--
`FATAL`|Red
`ERROR`|Red
`WARN`|Yellow
`INFO`|Green
`DEBUG`|Green
`TRACE`|Green

或者，可以指定应该使用的颜色或样式，以便将其作为转换的选项。例如，将文字的颜色变为黄色：
```
%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){yellow}
```
支持下面的颜色和样式：
- `blue`
- `cyan`
- `faint`
- `green`
- `magenta`
- `red`
- `yellow`

### 文件输出
Spring Boot 默认只会记录到控制台而不会记录到文件。如果还想记录到文件中需要设置`logging.file`或者`logging.path`属性值（例如在`application.properties`中）。

下面的表格指出了`logging.*`属性值是如何一起工作的：
日志属性

`logging.file`|`logging.path`|示例|描述
--|--|--
（无）|（无）| |只在控制台记录日志
指定文件|（无）|`my.log`|记录到指定的日志文件。名称可以是一个绝对路径或者相对于现在的目录的路径
（无）|指定目录|`/var/log`|记录日志到指定目录中`spring.log`文件中。名称可以是绝对路径或者是相对现在目录的路径

当日志文件达到10MB 时将会被自动切分，并且同控制台输出一样，默认会将`ERROR`,`WARN`和`INFO`级别的日志记录下来。

> 日志系统在应用的生命周期中初始化的时机比较早，因此不会发现通过`@propertySource`注解加载的文件中的这些日志属性。

> 日志属性与实际的日志实现相独立的。因此特定的配置属性（例如针对Logback的`logback.configurationFile`）不归Spring Boot管理。

### 日志级别
所有支持的日志系统都可以通过使用`logger.level.*=LEVEL`在Spring 环境（例如`application.properties`）中设置日志级别，这里的`LEVEL`是`TRACE`,`DEBUG`,`INFO`,`WARN`,`ERROR`,`FATAL`,`OFF`中其中之一。`root`记录器可以通过`logging.level.root`来配置。例如`application.properties`：

```properties
logging.level.root=WARN
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=ERROR
```

> Spring Boot默认会重新映射Thymeleaf `INFO`日志到`DEBUG`级别。这个有助于减少标准日志输出的干扰。想要知道如何在自己的配置中应用重新映射可以查看[`LevelRemappingAppender`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot/src/main/java/org/springframework/boot/logging/logback/LevelRemappingAppender.java)了解更多细节。

### 自定义日志配置
在classpath中加入适当的依赖包就可以激活不同的日志系统，并且root classpath中提供一个配置文件来进行深度自定义，或者在Spring的`Environment`中指定`logging.config`属性。

可以通过`org.springframework.boot.logging.LoggingSystem`系统属性来强制Spring Boot使用常规的日志系统。这个值应该是实现了`LoggingSystem`接口的类的全名称。也可以使用`none`值来完全禁用掉Spring Boot的日志配置。

> 由于日志系统在`ApplicationContext`创建之前实例化，不可能通过Spring `@Configuration`文件中的`@PropertySources`来控制日志系统。系统属性和常规的Spring Boot扩展配置文件可以正常工作。

根据日志系统的不同下面的配置文件将会被加载：

日志系统|自定义
--|--
Logback|`logback-spring.xml`,`logback-spring.groovy`,`logback.xml`或`logback.groovy`
Log4j2|`log4j2-spring.xml`或`log4j2.xml`
JDK(Java Util Logging)|`logging.properties`

> 建议尽可能使用`-spring`变体日志配置文件（比如`logback-spring.xml`）而不是`logback.xml`。如果使用标准的配置位置，Spring无法完全控制日志初始化。

> 这里有一些关于Java Util Logging 已知的类加载问题，当使用“可执行jar包” 的时候可能引起问题。建议尽可能避免使用它。

为了帮助自定义，下面是一些其他的从Spring `Environment`变量转换为系统属性的属性：

Spring Environment|系统属性|注释
--|--|--
`logging.exception-conversion-word`|`LOG_EXCEPTION_CONVERSION_WORD`|当出现异常时使用的转换词
`logging.file`|`LOG_FILE`|如果定义了会用在默认的日志配置中
`logging.path`|`LOG_PATH`|如果定义了会用在默认的日志配置中
`logging.pattern.console`|`CONSOLE_LOG_PATTERN`|用在控制台中的日志格式（stdout）。（只支持默认的logback设置）
`logging.pattern.file`|`FILE_LOG_PATTERN`|日志文件中的日志格式（如果`LOG_FILE`启用了）。（只支持默认的logback设置）
`logging.pattern.level`|`LOG_LEVEL_PATTERN`|渲染日志级别的格式（默认为`%5p`）。（只支持默认的logback设置）
`PID`|`PID`|当前进程的ID（如果可能，并且还没有被定义为操作系统环境变量）

所有支持的日志系统都可以在解析配置文件时参考系统属性。可以在`spring-boot.jar`的默认配置中找到例子。（类似的路径`spring-boot-2.0.0.BUILD-SNAPSHOT.jar\org\springframework\boot\logging\logback\defaults.xml`）

> 如果想在日志属性中使用placeholder，可以使用[Spring Boot 的语法](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-external-config-placeholders-in-properties)而不是底层框架的语法。尤其是使用Logback时，需要使用`:`作为属性名和默认值之间的分隔符，而不是`:-`。

> 可以通过覆盖`LOG_LEVEL_PATTERN`（或`logging.pattern.level`）来添加MDC和其他专门的内容到日志行中。例如如果使用`logging.pattern.level=user:%X{user} %5p`，然后如果user存在的话默认的日志格式将会包含一个MDC user 实体，例如：
```
2015-09-30 12:30:04.031 user:juergen INFO 22174 --- [  nio-8080-exec-0] demo.Controller
Handling authenticated request
```

### Logback扩展
Spring Boot包含许多对Logback的扩展，可以帮助高级配置。可以在`logback-spring.xml`文件中使用这些扩展。

> 不能在标准的`logback.xml`文件中使用扩展，因为它加载的时机太早。要么使用`logback-spring.xml`或者定义`logging.config`属性。

> 这些扩展不能与Logback的[配置扫描](http://logback.qos.ch/manual/configuration.html#autoScan)一起使用。如果尝试这么做，修改配置文件会引起下面的类似的问题：
```
ERROR in ch.qos.logback.core.joran.spi.Interpreter@4:71 - no applicable action for [springProperty], current ElementPath is [[configuration][springProperty]]
ERROR in ch.qos.logback.core.joran.spi.Interpreter@4:71 - no applicable action for [springProfile], current ElementPath is [[configuration][springProfile]]
```

#### 特定Profile配置
`<springProfile>`标签可以通过激活Spring profile来选择性地包含或排除配置块。Profile块在`<configuration>`元素中w任意位置都受支持。使用`name`属性来指定哪个profile 接受这个配置。通过逗号分隔的列表可以指定多个profile。

```xml
<springProfile name="staging">
    <!-- configuration to be enabled when the "staging" profile is active -->
</springProfile>

<springProfile name="dev, staging">
    <!-- configuration to be enabled when the "dev" or "staging" profiles are active -->
</springProfile>

<springProfile name="!production">
    <!-- configuration to be enabled when the "production" profile is not active -->
</springProfile>
```

#### 环境属性
`<pringProperty>`标签可以从Spring环境中获得属性，以便在Logback中使用。如果你想在logback的配置中访问`application.properties`文件中的值这个功能会非常有用。这个标签的工作方式和Logback的标准`<property>`标签类似，但不是指定一个直接的值，你指定了属性的来源（从`Environment`中）。如果需要将属性存储在`local`范围以外的地方，那么可以使用scope属性。如果需要一个后备值以防这个属性没有在`Environment`中指定，可以使用`defaultValue`属性。
```xml
<springProperty scope="context" name="fluentHost" source="myapp.fluentd.host"
        defaultValue="localhost"/>
<appender name="FLUENT" class="ch.qos.logback.more.appenders.DataFluentAppender">
    <remoteHost>${fluentHost}</remoteHost>
    ...
</appender>
```

> `source`值必须通过使用短横线形式（`my.property-name`）。但是添加到`Environment`中的属性值可以使用松散绑定的规则。

## 开发web应用
Spring Boot非常适合用来开发web应用。通过嵌入的Tomcat，Jetty，Undertow或者Netty，可以轻松地创建一个自包含的HTTP服务器。大多数web应用可以通过使用`spring-boot-starter-web`模块来建立和快速启动。也可以选择通过`spring-boot-starter-webflux`模块来创建响应式web应用。

如果还没有开发过Spring Boot web应用于，可以跟着[快速开始](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#getting-started-first-application)章节中的例子学习。

### Spring Web MVC 框架
Spring WEB MVC 框架（经常简称为'Spring MVC'）是一个富"model view controller" web框架。Spring MVC 让你创建特殊的`@Controller`和`@RestController` bean 来处理到来的HTTP请求。controller中的方法通过`@RequestMapping`注解映射到HTTP。

下面是一个典型的产生JSON数据的`@RestController`例子：
```java
@RestController
@RequestMapping(value="/users")
public class MyRestController {

    @RequestMapping(value="/{user}", method=RequestMethod.GET)
    public User getUser(@PathVariable Long user) {
        // ...
    }

    @RequestMapping(value="/{user}/customers", method=RequestMethod.GET)
    List<Customer> getUserCustomers(@PathVariable Long user) {
        // ...
    }

    @RequestMapping(value="/{user}", method=RequestMethod.DELETE)
    public User deleteUser(@PathVariable Long user) {
        // ...
    }

}

```

Spring MVC 是Spring Framework核心的一部分，[查看详情](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#mvc)。这里有一些关于[Spring MVC的指导](http://spring.io/guides)。

#### Spring MVC自动配置
Spring Boot为Spring MVC提供了自动配置功能，可以和大多数应用工作地很好。

Spring Boot自动配置在默认的基础上添加了以下功能：
- 包括`ContentNegotiatingViewResolver`和`BeanNameViewResoler` bean。
- 支持服务静态资源，包括支持WebJars。
- 自动注册`Converter`,`GenericConverter`,`Formatter` bean。
- `HttpMessageConverter`支持。
- 自动注册`MessageCodesResolver`。
- 静态`index.html`支持。
- 自定义`Favicon`支持。
- 自动使用`ConfigurableWebBindingInitializer` bean。

如果想要保持Spring Boot MVC的功能，并且只想要添加额外的MVC 配置（interceptor, formatter, view controller等等），可以添加自己的类型为`WebMvcConfigurer`的`@Configuration`类，但是**不要**加`@EnableWebMvc`。如果希望提供自定义的`RequestMappingHandlerMapping`，`RequestMappingHandlerAdapter`或者`ExceptionHandlerExceptionResolver`实例,可以声明一个`WebMvcRegistrationsAdapter`实例，并且提供这些组件。

如果想要完全控制Spring MVC，可以添加自己的`@Configuration`类，并以`@EnableWebMvc`注解。

#### HttpMessageConverter
Spring MVC 使用`HttpMessageConverter`接口来转换HTTP请求和响应。包括了一些合理的开箱即用的默认功能，例如Object可以自动转换为JSON（使用Jackson库）或者XML（如果可用的话使用Jackson XML扩展，否则使用JAXB）。String 默认使`用UTF-8`编码。

如果需要添加或者自定义converter可以使用Spring Boot 的`HttpMessageConverters`类：
```java
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.context.annotation.*;
import org.springframework.http.converter.*;

@Configuration
public class MyConfiguration {

    @Bean
    public HttpMessageConverters customConverters() {
        HttpMessageConverter<?> additional = ...
        HttpMessageConverter<?> another = ...
        return new HttpMessageConverters(additional, another);
    }

}
```
任何传递给context的`HttpMessageConverter` bean 都会添加到converter列表中。也可以通过这种方式覆盖缺省的converter。

#### 自定义JSON序列化和反序列化
如果使用Jackson来序列化和反序列化JSON数据，可能想要编写自己的`JsonSerializer`和`JsonDeserializer`类。自定义serializer通常通过一个模块注册到Jackson，但是Spring Boot提供了一替代的`@jsoncomponent`注解，它使直接注册Spring bean变得更加容易。

可以直接在`JsonSerializer`或者`JsonDeserializer`实现类上使用`@JsonComponent`。也可以在包含内部serializers/deserializers类的类上使用。例如：
```java
import java.io.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import org.springframework.boot.jackson.*;

@JsonComponent
public class Example {

    public static class Serializer extends JsonSerializer<SomeObject> {
        // ...
    }

    public static class Deserializer extends JsonDeserializer<SomeObject> {
        // ...
    }

}
```
`ApplicationContext`中所有的`@JsonComponent` bean都将会自动注册到Jackson，并且由于`@JsonComponent`由`@Component`元注解注解，常规的组件扫描规则也将适用于这些组件。

Spring Boot也提供了[`JsonObjectSerializer`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot/src/main/java/org/springframework/boot/jackson/JsonObjectSerializer.java)和[`JsonObjectDeserializer`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot/src/main/java/org/springframework/boot/jackson/JsonObjectDeserializer.java)基类，它们在序列化对象时为标准的Jackson版本提供了有用的替代方法。

#### MessageCodesResolver
Spring MVC有一个用于生成错误代码的策略，用于从绑定错误中呈现错误消息：`MessageCodesResolver`。如果设置了`spring.mvc.message-codes-resolver.format`属性`PREFIX_ERROR_CODE`或者`POSTFIX-ERROR_CODE`（可以查看`DefaultMessageCodesResolver.Format`枚举），Spring Boot会为你创建一个。

#### 静态内容
Spring Boot默认会在classpath中的`/static`(或`/public`或`/resources`或`/META-INF/resources`)目录提供静态服务，或者从`ServlectContext`的根目录。它使用Spring MVC中的`ResourceHttpRequestHandler`因此可以通过添加自己的`WebMvcConfigurer`并且重载`addResourceHandlers`方法来修改它的行为。

在独立的web应用程序中，也启用了来自容器的默认servlet，并充当备用服务器，如果Spring决定不处理它，则从`ServletContext`的根中提供内容。大多数情况下，这种情况不会发生（除非修改了默认的MVC配置）因为Spring会一直可以通过`DispatcherServlet`来处理请求。

resource默认映射到`/**`，但是可以通过`spring.mvc.static-path-pattern`来调整。例如重定向所有的resource到`/resources/**`可以向下面这样：
```
spring.mvc.static-path-pattern=/resources/**
```
也可以通过`spring.resources.static-locations`（通过一个目录列表替换掉默认值）来自定义静态resource位置。如果这么做默认的欢迎页面侦测将会切换到自定义的位置，因此如果启动时在定义的位置中有任意的`index.html`，它将会是应用的主页。

除了上面的标准静态resource位置之外，[Webjar内容](http://www.webjars.org/)是一个特殊的例子。任何`/webjars/**`路径的资源都将从jar文件中得到服务，如果它们被打包成webjar格式。

> 如果应用会被打包成jar，不要使用`src/main/webapp`目录。尽管这个目录是一个公用的标准，但是它仅仅是在打包成war的时候生效，并且在生成jar时它会被大多数构建工具默默地忽略掉。

Spring Boot 也支持Spring MVC提供的高级resource处理功能，允许使用诸如静态资源缓存破坏或使用Webjar的版本无关url。

要使用Webjar的版本无关url，添加`webjars-locator`依赖就可以了。然后申明Webjar，以jQuery举例，`“/webjars/jquery/dist/jquery.min.js”`会变成`“/webjars/jquery/x.y.z/dist/jquery.min.js”`，这里的`x.y.z`就是Webjar版本。

> 如果使用的是JBoss，需要声明`sebjars-locator-jboss-vfs`依赖代替`webjars-locator`，否则所有的Webjars会解析为`404`。

要使用缓存破坏，下面的配置将会为所有静态resource配置一个缓存破坏策略，有效地添加了一个hash值到URL中，例如`<link href="/css/spring-2a2d595e6ed9a0b24f027f2b63b134d6.css"/>`：
```
spring.resources.chain.strategy.content.enabled=true
spring.resources.chain.strategy.content.paths=/**
```

> 自动配置了在运行时对Thymeleaf和FreeMarker模板中的资源链接重新编写，这得益于`ResourceUrlEncodingFilter`。当使用JSP时应该手动声明这个filter。其他的模板引擎目前还不能自动支持，但是可以使用自定义模板宏/helper，以及使用[`ResourceUrlProvider`](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/javadoc-api/org/springframework/web/servlet/resource/ResourceUrlProvider.html)。

当动态加载resource时，如JavaScript模块加载器，重命名文件不是一个选项。这也是为什么其他的策略依旧支持并且可以相互组合。“fixed” 策略将会在URL中添加一个静态的版本号，无需修改文件名：
```
spring.resources.chain.strategy.content.enabled=true
spring.resources.chain.strategy.content.paths=/**
spring.resources.chain.strategy.fixed.enabled=true
spring.resources.chain.strategy.fixed.paths=/js/lib/
spring.resources.chain.strategy.fixed.version=v12
```
在上面的配置中，JavaScript加载位于`"/js/lib/"`的模块时将会使用"fixed" 版本策略`"/v12/js/lib/mymodule.js"`，然而其他的resource将仍然使用`<link href="/css/spring-2a2d595e6ed9a0b24f027f2b63b134d6.css"/>`。

可以查看[`ResourceProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/ResourceProperties.java)了解更多支持的选项

> 这个功能在这个专用的[博客](https://spring.io/blog/2014/07/24/spring-framework-4-1-handling-static-web-resources)和Spring Framework的[文档](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#mvc-config-static-resources)上有完整的说明。

#### 自定义Favicon
Spring Boot在配置的静态内容位置和classpath根目录（按此顺序）中查找`favicon.ico`。如果找到了，将自动作为应用的favicon。

#### ConfigurableWebBindingInitializer
Spring MVC使用`WebBindingInitializer`来为特殊请求初始化一个`WebDataBinder`。如果创建了自己的`ConfigurableWebBindingInitializer` `@Bean`，Spring Boot将自动配置Spring MVC使用它。

#### 模板引擎
跟REST服务一样，也可以使用Spring MVC来提供动态HTML内容。Spring MVC 支持一系列模板技术，包括Thymeleaf，FreeMarker和JSP。许多其他的模板引擎也发布了他们自己的Spring MVC集成方案。

Spring Boot包括针对以下模板引擎的自动配置功能：
- [FreeMarker](http://freemarker.org/docs/)
- [Groovy](http://docs.groovy-lang.org/docs/next/html/documentation/template-engines.html#_the_markuptemplateengine)
- [Thymeleaf](http://www.thymeleaf.org/)
- [Mustache](http://mustache.github.io/)

> 有可能的话应该尽量避免使用JSP ，在使用嵌入式servlet容器时有一些[已知的限制](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-jsp-limitations)。

当你在使用其中一种模板引擎并使用默认配置时，将会从`src/main/resources/templates`目录中自动发现模板。

> IntelliJ IDEA根据运行应用程序的方式不同classpath排序不一样。在IDE中通过main方法启动应用和使用Maven和Gradle或者打包的jar来运行会导致不同的顺序。这会导致Spring Boot在classpath中查找模板失败。如果你碰到了这个问题，可以在IDE中重新对classpath排序，将模块的class和resource放在首位。或者可以配置模板前缀来查找classpath中的每个模板目录：`classpath*:/templates/`。

#### 错误处理
Spring Boot提供了一个默认的`/error`映射，以一种合理的方式处理所有错误，并且作为一个全局的错误页面注册到servlet容器中。对于机器客户端，它将生成一个JSON响应，其中包括错误的详细信息、HTTP状态和异常消息。对于浏览器客户端有一个“whitelabel”错误视图，它以HTML格式（或者添加一个`View`解析到`error`来自定义）呈现相同的数据。要完全替换掉默认的行为，可以实现`ErrorController`然后注册一个这种类型的bean定义，或者只需添加类型ErrorAttributes的bean，就可以使用现有的机制，但可以替换内容。

> `BasicErrorController`可以用作自定义`ErrorController`的基类。当你需要添加一个handler来处理新的content type（默认专门处理`text/html`并为其他所有内容提供一个后路）时会非常有用。要达到这个目的只需要继承`BasicErrorController`然后添加一个拥有`produces`属性的`@RequestMapping`的公共方法，然后创建一个这个类型的bean。

也可以定义一个`@ControllerAdvice`为特定的controller或者异常类型返回自定义的JSON内容。
```java
@ControllerAdvice(basePackageClasses = FooController.class)
public class FooControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(YourException.class)
    @ResponseBody
    ResponseEntity<?> handleControllerException(HttpServletRequest request, Throwable ex) {
        HttpStatus status = getStatus(request);
        return new ResponseEntity<>(new CustomErrorType(status.value(), ex.getMessage()), status);
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }

}
```
在上面的例子中，如果一个与`FooController`在同一个包中的Controller抛出`YourException`，那么将使用一个CustomerErrorType  POJO的json，而不是ErrorAttributes。

##### 自定义错误页面
如果要为给定的状态码显示自定义的HTML错误页面，可以在`/error`文件夹中添加一个文件。错误页面可以是静态HTML（例如在何意静态resource目录下添加的文件）或使用模板。文件名应该是确定的状态码或者一系列。

例如，将`404`映射到一个静态文件，文件夹结构应该像下面这样：
```
src/
 +- main/
     +- java/
     |   + <source code>
     +- resources/
         +- public/
             +- error/
             |   +- 404.html
             +- <other public assets>
```
要映射所有`5xx`的错误，并且使用FreeMarker模板，目录应该是下面这样：
```
src/
 +- main/
     +- java/
     |   + <source code>
     +- resources/
         +- templates/
             +- error/
             |   +- 5xx.ftl
             +- <other templates>
```

更复杂的映射可以添加实现了`ErrorViewResolver`接口的bean。
```java
public class MyErrorViewResolver implements ErrorViewResolver {

    @Override
    public ModelAndView resolveErrorView(HttpServletRequest request,
            HttpStatus status, Map<String, Object> model) {
        // Use the request or status to optionally return a ModelAndView
        return ...
    }

}
```

也可以使用常规的Spring MVC特性比如[`@ExceptonHandler`](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#mvc-exceptionhandlers)方法和[`@ControllerAdvice`](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#mvc-ann-controller-advice)。`ErrorController`会处理任何未处理的异常。

##### 在Spring MVC之外映射错误页面
对那些没有使用Spring MVC的应用，可以使用`ErrorPageRegister`接口来直接注册`ErrorPages`。这个抽象概念直接与底层的嵌入式servlet容器一起工作即使没有Spring MVC `DispatcherServlet`。

```java
@Bean
public ErrorPageRegistrar errorPageRegistrar(){
    return new MyErrorPageRegistrar();
}

// ...

private static class MyErrorPageRegistrar implements ErrorPageRegistrar {

    @Override
    public void registerErrorPages(ErrorPageRegistry registry) {
        registry.addErrorPages(new ErrorPage(HttpStatus.BAD_REQUEST, "/400"));
    }

}
```

注意：如果注册的`ErrorPage`的路径被一个`Filter`处理而结束了（比如和一些非Spring的web框架一样，比如Jersey和Wicket），然后这个`Filter`必须得明确地注册为`ERROR` dispatcher。比如：
```java
@Bean
public FilterRegistrationBean myFilter() {
    FilterRegistrationBean registration = new FilterRegistrationBean();
    registration.setFilter(new MyFilter());
    ...
    registration.setDispatcherTypes(EnumSet.allOf(DispatcherType.class));
    return registration;
}
```

(默认`FilterRegistrationBean` 不包含`ERROR` dispatcher类型)。

##### WebSphere 应用服务器中错误处理
当部署到一个servlet容器时，Spring Boot使用它的错误页面过滤器来转发请求到适当的错误页面，并携带错误码。如果response还没有提交，这个请求只能转发到正确的错误页面。WebSphere 8.0或者以上版本默认会根据正确完成servlet的service方法来提交response。应该设置`com.ibm.ws.webcontainer.invokeFlushAfterService`为`false`来禁止这个行为。

#### Spring HATEOAS
如果正在开发的RESTful API 使用多媒体，Spring Boot 为Spring HATEOAS提供了自动配置，能够与大多数应用一起工作。自动配置替换了使用`@EnableHypermediaSupport`的必要性并且注册了一些bean使构建多媒体应用变得简单，这些bean包括一个`LinkDiscoverers`(为了应用端支持)和一个为了正确整理response到需要的表现形式而配置的`ObjectMapper`。这个`ObjectMapper`将基于`spring.jackson.*`属性或者可能存在的`Jackson2ObjectMapperBuilder` bean 进行自定义。

可以通过使用`@EnableHypermediaSupport`来控制Spring HATEOAS的配置。要注意的是这将会禁用上面提到的`ObjectMapper`自定义。

#### CORS支持
[跨域资源共享](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)是一被大多数浏览器实现的W3C标准，它允许你以一种灵活的方式来指定哪种类型的跨域请求是被授权的，代替使用一些不安全和不强大的方式比如IFRAME 和JSONP。

从4.2开始，Spring MVC[跨域支持](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#cors)开箱即用。在Spring Boot应用中与`@CrossOrigin`注解一起使用[controller方法CORS配置](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#controller-method-cors-configuration)不需要使用任何特定的配置。可以通过注册拥有一个自定义的`addCorsMappings(CorsRegistry)`的WebMvcConfigurer` bean 来定义[全局的CORS配置](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/web.html#global-cors-configuration)：
```java
@Configuration
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**");
            }
        };
    }
}
```

### Spring WebFlux框架
#### Spring WebFlux自动配置
#### HttpMessageReaders 和 HttpMessageWriters HTTP编码
#### 静态内容
#### 模板引擎
### JAX-RS 和Jersey
如果你更喜欢REST端点的jax-rs编程模型，可以使用一个可用的实现来代替Spring MVC。Jersey 1.x和 Apache CXF在将他们的`Servlet`和`Filter`作为`@Bean`注册到应用上下文中的情况下就已经工作的很好了。Jersey 2.x有一些本地Spring支持，所以我们也在Spring Boot 中通过一个starter 提供了自动配置支持。

开始开发Jersey 2.x只需要添加`spring-boot-starter-jersey`依赖然后写一个`ResourceConfig`类型的`@Bean`并在这里注册所有的端点就可以了：
```java
@Component
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(Endpoint.class);
    }

}
```
Jersey对扫描可执行档案的支持是相当有限的。例如在运行一个可执行的war包时它不能扫描`WEB-INF/classes`目录的包中发现的endpoint。为了避免这个限制，不应该使用`packages`方法并且endpoint应该像上面一样通过`register`方法单独注册。

也可以注册任意数量的实现`ResourceConfigCustomizer`接口的bean来进行更高级的自定义。

所有注册的endpoint都应该有`@Component`和HTTP resource注解（如`@GET`）,例如：
```java
@Component
@Path("/hello")
public class Endpoint {

    @GET
    public String message() {
        return "Hello";
    }

}
```
由于`Endpoint`是一个Spring `@Component`，因此它的生命周期由Spring来管理，并且你可以`@Autowired` 依赖并且通过`@Value`注入外部的配置。Jersey servlet默认会注册并映射到`/*`。可以通过添加`@ApplicationPath`到`ResourceConfig`修改这个映射。

Jersey默认将会作为`@ServletRegistrationBean`类型的`@Bean`中的一个Servlet，这个`@ServletRegistrationBean`名称为`jerseyServletRegistration`。默认情况下这个servlet会延迟初始化，但是你可以通过`spring.jersey.servlet.load-on-startup`来自定义。可以创建一个自己的相同名称的bean来禁用或者覆盖这个bean。也可以使用一个Filter通过设置`spring.jersey.type=filter`来代替这个Servlet（在这种情况下，要替换或覆盖的@Bean是`jerseyFilterRegistration`）。这个servlet有个`@Order`注解，可以通过`spring.jersey.filter.order`来设置。注册Servlet和Filter可以给定初始化参数，使用`spring.jersey.init.*`来指定一个属性map。

这里有一个[Jersey例子](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-jersey)可以看到如何设置。还有一个[Jersey 1.x 例子](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-jersey1)。注意在Jersey 1.x例子中spring-boot maven插件配置了不打包某些Jersey的jar，这样他们可以被JAX-RS的实现扫描到（因为这个例子要求在Filter注册中对它们进行扫描）。如果你有任何JAX-RS resource打包成了内部jar时，可能也需要这么做。

### 嵌入式servlet容器支持
Spring Boot 支持嵌入式Tomcat，Jetty，Undertow服务器。大多数开发者只需要使用对应的"Starter"来获取完整配置的实例。嵌入式服务器默认会在`8080`端口监听HTTP请求。

> 如果你选择在CentOS上使用Tomcat则要注意，默认情况下会使用一个临时目录来存储编绎的JSP和上传的文件等。当你的应用程序运行导致失败时，该目录有可能被`tmpwatch`删除。要避免这样你可能想要自定义`tmpwatch`配置，这样`tomcat.*`目录不会删除，或者配置`server.tomcat.basedir`这样的话嵌入式Tomcat会使用不同的目录。

#### Servlet，Filter和listerner
当使用嵌入式servlet容器时既可以使用Spring Bean又可以扫描Servlet组件来注册Servlet，Filter和来自servlet规范的所有listener（例如`HttpSessionListener`）。

#### Servlet上下文初始化
任何一个Spring bean的的`Servlet`，`Filter`或者Serlvet`*Listener`的实例都将在嵌入式容器中注册。如果想从`application.properties`中引用一个值，这将非常方便。

默认情况下如果context只包含一个Servlet，它将会映射到`/`。在有多个Servlet Bean的情况下，bean的名称将会作为path的前缀。Filter会映射到`/*`。如果基于约定的映射不足够灵活,可以使用`ServletRegistrationBean`,`FilterRegistrationBean`和`ServletListenerRegistrationBean`类来完全控制。

#### ServletWebServerApplicationContext
嵌入式servlet容器不会直接执行Servlet 3.0以上的`javax.servlet.ServletContainerInitializer`接口，或者是Spring的`org.springframework.web.WebApplicationInitializer`接口。这是一个刻意的设计，目的是为了减少在war中运行的第三方库会破坏Spring Boot应用程序的风险。

如果你需要在Spring Boot应用中执行servlet上下文初始化，需要注册一个实现了`org.springframework.boot.web.servlet.ServletContextInitializer`接口的bean。唯一的`onStartup`方法提供了访问`ServletContext`的能力，并且可以在必要的情况下轻松地用来作为已知`WebApplicationInitializer`的桥接器。

##### 扫描Servlet，Filter和lisenter
当使用嵌入式容器时，可以使用`@ServletComponentScan`来启用对注解了`@WebServlet`，`@WebFilter`和`@WebListener`类进行自动注册。

> `@ServletComponentScan`在独立容器中时没有效果，在这里将会使用容器的自有发现机制。

#### ServletWebServerApplicatonContext
Spring Boot为嵌入式容器支持使用了一个新的`ApplicationContext`类型。`ServletWebServerApplicationContext`是一个专门的`WebApplicationContext`类型，通过搜索一个单独的`ServletWebServerFactory` bean来引导自己。通常是一个`TomcatServletWebServerFactory`，`JettyServletWebServerFactory`或者是`UndertowServletWebServerFactory`将被自动配置。

> 通常不需要感知这些实现类。大多数应用会自动配置并且将为你创建合适的`ApplicationContext`和`ServletWebServerFactory`。

#### 自定义嵌入式servlet容器
可以通过使用Spring `Environment`属性来配置常见的servlet容器设置。通常你将在`application.properties`文件中定义这些属性。

常见的服务器设置包括：
- 网络设置：侦听HTTP请求的端口（`server.port`），接口地址绑定到`server.address`等等。
- Session设置：session是否执久化（`server.session.persistence`），session超时时间（`server.session.timeout`），session数据的位置（`server.session.store-dir`）和session-cookie配置（`server.session.cookie.*`）。
- 错误管理：错误页面的位置（`server.error.path`）等。
- [SSL](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-configure-ssl)
- [HTTP压缩](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#how-to-enable-http-response-compression)

Spring Boot尽可能多地暴露通用设置，但这并不总是可行的。对于那些情况下，专用的命名空间提供特定服务器的自定义（查看`server.tomcat`和`server.undertow`）。例如可以使用嵌入式servlet容器的特定功能配置[访问日志](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-configure-accesslogs)。

> 查看[`ServerProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/ServerProperties.java)类获取详细清单。

##### 编程式自定义
如果需要通过编程来自定义嵌入式servlet容器，可以注册一个实现了`WebServerFactoryCustomizer` 接口的Spring bean。`WebServerFactoryCustomizer`提供了访问`ConfigurableServletWebServerFactory`的方法，`ConfigurableServletWebServerFactory`包含了大量定制setter方法。在Tomcat，Jetty和Undertow中存在专门的变量。
```java
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

@Component
public class CustomizationBean implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Override
    public void customize(ConfigurableServletWebServerFactory server) {
        server.setPort(9000);
    }

}
```
##### 直接自定义ConfigurableServletWebServerFactory 
如果上面的自定义方式太局限，可以注册自己的`TomcatServletWebServerFactory`，`JettyServletWebServerFactory`，`UndertowServletWebServerFactory` bean。
```java
@Bean
public ConfigurableServletWebServerFactory webServerFactory() {
    TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
    factory.setPort(9000);
    factory.setSessionTimeout(10, TimeUnit.MINUTES);
    factory.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notfound.html"));
    return factory;
}
```
set方法提供了许多配置选项。如果你需要做一些更独特的事情，还提供了几个受保护的方法“钩子”。更多详情请查看源代码文档。

#### JSP限制
当使用嵌入式servlet容器（并且被打包成可执行包）运行Spring Boot应用时，对JSP的支持有一些限制。
- 对于Tomcat，如果使用war包，它就可以工作，即可执行的war将工作，并且也可以部署到一个标准容器(不限于，但包括Tomcat）。一个可执行的jar不能工作，因为在Tomcat中有一个硬编码的文件模式。
- 对于Jetty，如果使用war包，它就可以工作，即可执行的war将工作，并且也可以部署到一个标准容器。
- Undertow不支持JSP。
- 创建自定义的`error.jsp`页面不会覆盖默认的[错误处理](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-error-handling)视图，而是应该使用自定义错误页面。

这里有一个[JSP例子](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-web-jsp)可以看到如何设置。

## 安全
如果在classpath中发现了Spring Security，那么web应用所有的HTTP端点会默认使用"basic"认证。可以添加`@EnableGlobalMethodSecurity`来添加方法级别的安全。更多信息可以查看[Spring Security Reference](http://docs.spring.io/spring-security/site/docs/5.0.0.BUILD-SNAPSHOT/reference/htmlsingle#jc-method)。

默认的`AuthenticationManager`有一个单独的用户（“user” 用户名和随机密码，密码在应用程序启动时打印在INFO级别）
```
Using default security password: 78fa095d-3f4c-48b1-ad50-e24c31d5cf35
```

> 如果你调整了日志配置，确保`org.springframework.boot.autoconfigure.security`类型设置为`INFO`级别，否则默认密码不会打印。

可以通过提供`security.user.password`属性来修改密码。这个和其他有用的属性通过`SecurityProperties`（属性前缀为"security"）扩展。
###  OAuth2
#### 授权服务器
#### 资源服务器
### User信息中的Token类型
### 自定义User信息 RestTemplate
#### Client
#### 单点登录
### Actuator 安全
## SQL数据库
Spring Framework对SQL数据库提供了大量支持。从使用`JdbcTemplate`直接的JDBC访问到完全的“对象关系映射”技术如Hibernate。Spring Data提供了额外的功能级别，直接从接口创建`Repository`实现，并使用约定从方法名称生成查询。

### 配置数据源
Java的`javax.sql.DataSource`接口提供了与数据库连接工作的标准方法。传统上，数据源使用`URL`和一些凭证来建立数据库连接。

> 还可以查看[“如何操作”](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-configure-a-datasource)的部分，以获得更高级的示例，尤其是要对数据源的配置进行完全控制。

#### 嵌入式数据库支持
使用内存中嵌入式数据库开发应用程序通常很方便。明显地内存数据库不提供持久化；你需要当应用程序启动时填充数据库，并准备在应用程序结束时抛出数据。

> 这里有[如何初始化数据库](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-database-initialization)。

Spring Boot可以自动配置嵌入式[H2](http://www.h2database.com/)，[HSQL](http://hsqldb.org/)和[Derby](http://db.apache.org/derby/)数据库。不需要提供任何连接URL，只需要简单地包含想要使用的嵌入式数据库的构建依赖。

> 如果在测试用例中使用这个功能，你可能注意到了整个测试用命重用了相同的数据库，而不管使用了多少个应用上下文。如果你想确保每个上下文使用独立的嵌入式数据库，你应该设置`spring.datasource.generate-unique-name`为`true`。

例如典型的POM依赖是：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.hsqldb</groupId>
    <artifactId>hsqldb</artifactId>
    <scope>runtime</scope>
</dependency>
```
> 需要对spring jdbc的依赖，以便自动配置嵌入式数据库。在这个例子中它通过`spring-boot-starter-data-jpa`来传递这个依赖。

> 如果出于某种原因，你确实为嵌入式数据库配置了连接URL，那么应该注意确保数据库的自动关闭是禁用的。如果你正在使用H2，你应该使用`DB_CLOSE_ON_EXIT=FALSE`来禁用。如果使用HSQLDB，应该确保没有使用`shutdown=true`。禁用数据库的自动关闭功能可以让Spring Boot在数据库关闭时进行控制，从而确保在不再需要访问数据库时发生这种情况。

#### 连接生产库
还可以使用`DataSource`池自动配置生产数据库连接。下面是选择具体实现的算法：
- 我们更喜欢HikariCP因为它的性能和并发性，所以如果它可用，我们总是选择它。
- 否则如果Tomcat`DataSource`连接池可用，就会使用它。
- HikariCP 和Tomcat`DataSource`连接池都不可用并且 Commons DBCP2可用则使用它。

如果你使用`spring-boot-starter-jdbc`或者`spring-boot-starter-data-jpa` "starter" 则会自动依赖`HikariCP`。

> 可以通过设置`spring.datasource.type`属性来完全绕开这个算法并且指定连接池。如果你在Tomcat容器中运行你的应用程序，那么这一点尤为重要，因为默认提供了`tomcat-jdbc`。

> 可以手动配置额外的连接池。如果你定义了自己的`DataSource` bean，则不会发生自动配置。

`spring.datasource.*`中的扩展配置属性可以控制数据源配置。例如，你可以在`application.properties`中声明以下块：
```
spring.datasource.url=jdbc:mysql://localhost/test
spring.datasource.username=dbuser
spring.datasource.password=dbpass
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

> 你至少应该使用`spring.datasource.url`属性来指定url或者Sprig Boot 会尝试自动配置一个嵌入式数据库。

> 你通常不需要指定`driver-class-name`，因为对于大多数数据库Spring boot 可以从url中推断出来。

> 对于创建`DataSource`池，我们需要能够验证一个有效的`Driver`类是否可用，所以我们在做任何事情之前都要检查它。例如，如果你设了`spring.datasource.driver-class-name=com.mysql.jdbc`,那么这个类就必须是可加载的。

更多受支持的选项，请参见[`DataSourceProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/DataSourceProperties.java)。这些是标准的选项，不管实际是什么实现都可以工作。也可以通过它们各自的前缀（`spring.datasource.hikari.*`,`spring.datasource.tomcat.*`，和`spring.datasource.dbcp2.*`）微调特定实现设置。请参阅你正在使用的连接池实现的文档获取更多细节。

例如如果你正在使用[Tomcat连接池](http://tomcat.apache.org/tomcat-8.0-doc/jdbc-pool.html#Common_Attributes)，可以自定义许多额外的设置：
```
# Number of ms to wait before throwing an exception if no connection is available.
spring.datasource.tomcat.max-wait=10000

# Maximum number of active connections that can be allocated from this pool at the same time.
spring.datasource.tomcat.max-active=50

# Validate the connection before borrowing it from the pool.
spring.datasource.tomcat.test-on-borrow=true
```

#### 连接JNDI数据库
如果你正在将Spring Boot应用程序部署到应用程序服务器，那么你可能需要使用应用程序服务器的内置特性来配置和管理数据源，并使用JNDI访问它。

`spring.datasource.jndi-name`属性可以用作`spring.datasource.url`,`spring.datasource.username`和`spring.datasource.password`属性的另一种选择从特定的JNDI位置访问`DataSource`。例如下面`applicaion.properties`中的块展示了如何访问JBoss定义的`DataSource`：
```
spring.datasource.jndi-name=java:jboss/datasources/customers
```

### 使用JdbcTemplate
Spring 的`JdbcTemplate`和`NamedParameterJdbcTemplate`类是自动配置的并且可以直接`@Autowire`他们到你自己的bean中：
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MyBean(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ...

}

```
你可以通过`spring.jdbc.template.*`来自定义template的一些属性：
```
spring.jdbc.template.max-rows=500
```

> NamedParameterJdbcTemplate在背后重用相同的JdbcTemplate实例。如果定义了多个`JdbcTemplate`并且不存在主要的候选者，不会自动配置`NamedParameterJdbcTemplate`。

### JPA和Spring Data
Java Persistence API 是一种允许你映射对象到关系型数据的技术。`spring-boot-starter-data-jpa` POM提供了一种快速开始的方式。它提供了下面关键的依赖：
- Hibernate - 最流行的JPA实现之一
- Spring Data JPA - 使实现基于JPA的repositories变得容易
- Spring ORM - Spring Framework的核心ORM支持

> 在这里不涉及到太多JPA和Spring Data细节。可以访问[Accessing Data with JPA](http://spring.io/guides/gs/accessing-data-jpa/)指南和阅读[Spring Data JPA](http://spring.io/guides/gs/accessing-data-jpa/)和[Hibernate ](http://hibernate.org/orm/documentation/)文档。

#### 实体类
传统上，JPA “Entity”的类是在`persistence.xml`文件中指定的。在Spring Boot 中这个文件不是必需的，而是使用“Entity Scanning”。默认情况下在主配置类（某个注解了`@EnableAutoConfiguration` 或`@SpringBootApplication`的类）下面的所有包都会被搜索到。

任何注解了`@Entity`,`@Embeddable`或`@MappedSuperclass`的类都是被考虑的对象。一个典型的实体类应该是这样的：
```java
package com.example.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
public class City implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String state;

    // ... additional members, often include @OneToMany mappings

    protected City() {
        // no-args constructor required by JPA spec
        // this one is protected since it shouldn't be used directly
    }

    public City(String name, String state) {
        this.name = name;
        this.country = country;
    }

    public String getName() {
        return this.name;
    }

    public String getState() {
        return this.state;
    }

    // ... etc

}

```

> 可以使用`@EntityScan`注解来自定义扫描位置。更多查看[Section 78.4, “Separate @Entity definitions from Spring configuration” ](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-separate-entity-definitions-from-spring-configuration)

#### Spring Data JPA仓库
Spring Data JPA repository是你可以定义来访问数据的接口。JPA查询会从你的方法名自动创建查询。例如，`CityRepository`接口可能声明了`findAllByState(String state)`方法来根据给定状态查找所有的城市。

对于更复杂的查询你可以使用Spring Data的`Query`注解来注解你的方法。

Spring Data repository通常继承自`Repository`或者`CrudRepository`接口。如果使用自动配置，将会从包含主配置类（注解了`@EnableAutoConfiguration`或`@SpringBooApplication`的类）的包中往下查找repository。

这里有一个典型的Spring Data repository：
```java
package com.example.myapp.domain;

import org.springframework.data.domain.*;
import org.springframework.data.repository.*;

public interface CityRepository extends Repository<City, Long> {

    Page<City> findAll(Pageable pageable);

    City findByNameAndCountryAllIgnoringCase(String name, String country);

}
```

> 我们仅仅触及Spring Data JPA的表面。可以查看[文档](http://projects.spring.io/spring-data-jpa/)获取完整的细节。


#### 创建和删除JPA数据库
默认情况下，JPA数据库**只**在使用嵌入式数据库（H2,HSQL或Derby）时才会自动创建。你也可以使用`spring.jpa.*`属性明确地配置JPA`。例如可以在`application.properties`中添加下面的配置来创建和删除表。
```
spring.jpa.hibernate.ddl-auto=create-drop
```

> Hibernate自有内部属性名称是`hibernate.hbm2ddl.auto`（如果你能记住它更好）。你可以和其他Hibernate原生属性一样设置它，使用`spring.jpa.properties.*`（这个前缀在添加到entity manager之前被剥离出来）。例如：
```
spring.jpa.properties.hibernate.globally_quoted_identifiers=true
```
传给Hibernate entity manager的是`hiberbate.globally_quoted_identifiers`。

默认情况下DDL执行（或验证）推迟到`ApplicationContext`启动之后。还有一个`spring.jpa.generate-ddl`标志，但是在Hibernate autoconfig启用的情况下不会使用因为`ddl-auto`设置更细粒度。

#### 在View中打开EntityManager
如果正在运行一个web应用，Spring Boot默认会注册`OpenEntityManageerInViewInterceptor`来应用“Open EntityManager in View” 模式，例如来在web视图允许延迟加载。如果你不想要这种行为，你应用在`applicaiont.properties`中设置`spring.jpa.open-in-view`来`false`。

### 使用H2的web控制台
#### 修改H2控制台的路径
#### 加密H2的控制台
### 使用jOOQ
#### 代码生成
#### 使用DSLContext
#### jOOQ SQL方言
#### 自定义jOOQ
## NoSQL
Spring Data提供额外的项目来帮助你访问一些NoSQL技术，包括[MongoDB](http://projects.spring.io/spring-data-mongodb/)，[Neo4J](http://projects.spring.io/spring-data-neo4j/)，[Elasticsearch](https://github.com/spring-projects/spring-data-elasticsearch/)，[Solr](http://projects.spring.io/spring-data-solr/)，[Redis](http://projects.spring.io/spring-data-redis/)，[Gemfire](http://projects.spring.io/spring-data-gemfire/)，[Cassandra](http://projects.spring.io/spring-data-cassandra/)，[Couchbase](http://projects.spring.io/spring-data-couchbase/)和[LDAP](http://projects.spring.io/spring-data-ldap/)。Spring Boot 对Redis，MongoDB，Neo4j，Elastcisearch，Solr，Cassandra，Couchbase和LDAP提供了自动配置；你可以使用其他项目，但是你需要自己配置它们。

### Redis
Redis 是一个缓存，消息代理和功能丰富的键值存储。Spring Boot为[Jedis](https://github.com/xetorthio/jedis/) 和[Lettuce](https://github.com/mp911de/lettuce/) 客户端库提供基本的自动配置并由Spring Data Redis在它们之上提供抽象。

默认有一个`spring-boot-starter-data-redis` “Starter” 以方便的方式收集依赖并且默认使用 [Jedis](https://github.com/xetorthio/jedis/)。如果你正在构建一个响应式应用程序，那么`spring-stardata-data-redis-reactive` “Starter” 将会让你继续前进。

#### 连接到Redis
你可以像任何其他Spring Bean一样注入自动配置的`RedisConnectionFactory`，`StringRedisTemplate`或者`RedisTemplate` 实例。默认情况下这些实例会尝试使用`localhost:6379`来连接到Redis 服务器。
```java 
@Component
public class MyBean {

    private StringRedisTemplate template;

    @Autowired
    public MyBean(StringRedisTemplate template) {
        this.template = template;
    }

    // ...

}
```

> 你也可以注册任意数量的实现`JedisClientConfigurationBuilderCustomizer` 的bean 来实现更高级的定制。如果你正在使用Lettuce，可以使用`LettuceClientConfigurationBuilderCustomizer`。

如果你在任何自己的自动配置类型上加了`@Bean`，它会替代默认的（除了在RedisTemplate的情况下，排除是基于bean名称“redisTemplate”而不是其类型）。如果commons-pool2在classpath中，则默认情况下你将获得一个连接池工厂。

### MongoDB
#### 连接到MongoDB数据库
#### MongoTemplate
#### Spring Data MongoDB仓库
#### 嵌入式Mongo
### Neo4j
#### 连接到Neo4j数据库
#### 使用嵌入式模式
#### Neo4jSession
#### Spring Data Neo4j仓库
#### 仓库示例
### Gemfire
### Solr
#### 连接到Solr
#### Spring Data Solr仓库
### Elasticsearch
#### 使用Jest连接Elasticsearch 
#### 使用Spring Data连接Elasticsearch 
#### Spring Data Elasticsearch 仓库
### Cassandra
#### 连接到Cassandra
#### Spring Data Cassandra仓库
### Couchbase
#### 连接到Couchbase
#### Spring Data Couchbase仓库
### LDAP
#### 连接到LDAP服务器
#### Spring Data LDAP仓库
#### 嵌入式内存LDAP服务器
### InfluxDB
#### 连接到InfluxDB

## 缓存
Spring Framework为透明地向应用程序添加缓存提供了支持。在其核心，抽象层将缓存应用于方法，从而减少基于缓存中可用信息的执行数量。缓存逻辑是透明地应用的，不会对调用程序产生任何干扰。只要通过@Enablecaching注解启用了缓存支持，Spring Boot就会自动配置缓存基础结构。

> 查看Spring Framework文件[相关章节](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/integration.html#cache)获取更多信息。

简而言之，将缓存添加到服务的操作中就像向其方法添加相关注释一样简单:
```java
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Component;

@Component
public class MathService {

    @Cacheable("piDecimals")
    public int computePiDecimal(int i) {
        // ...
    }

}
```
此示例演示如何在可能代价高昂的操作中使用缓存。在调用`computePiDecimal`之前，抽象层会在`piDecimals`缓存中查找匹配参数`i`的实体。如果找到了，缓存中的内容会立即返回给调用方，并且不会调用这个方法。否则这个方法会被调用并且在返回值之前会更新缓存。

> 也可以明确地使用标准的JSR-107（JCache）注解（比如`@CacheResult`）。我们强烈建议你不要把它们混在一起。

如果没有添加具体的缓存库，Spring Boot将会自动配置一个简单的实现，它使用内存中的并发Map。当需要缓存时（如上面例子中的`piDecimals`），这个provider将为你即时创建它。简单的提供者并不推荐用于生产，但是对于入门并确保您了解这些特性是非常好的。当你已经决定要使用的缓存提供程序时，请一定要阅读它的文档，以确定如何配置你的应用程序使用的缓存。实际上，所有的提供者都要求你显式地配置应用程序中使用的每个缓存。有些提供了自定义spring.cache.cache-names属性定义的默认缓存的方法。

> 也可以透明地[更新](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/integration.html#cache-annotations-put)或从缓存中[删除](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/integration.html#cache-annotations-evict)数据。

> 如果你使用的缓存基础设施不是基于接口的，那么确保启用了`@EnableCaching`的`proxyTargetClass`属性。

### 支持的缓存实现
缓存抽象层没有提供实际的存储，依赖于`org.springframework.cache.Cache`和`org.springframework.cache.CacheManager`接口实现。

如果你没有定义`CacheManager`类型的或名为`cacheResolver`（查看`CachingConfigurer`）的`CacheResolver` bean，Spring Boot尝试加载下面的实现（按此顺序）：

- [Generic](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-generic)
- [JCache（JSR-107）](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-jcache)（EhCache 3，Hazelcast，Infinispan，etc）
- [EhCache 2.x](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-ehcache2)
- [Hazelcast](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-hazelcast)
- [Infinispan](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-infinispan)
- [Couchbase](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-couchbase)
- [Redis](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-redis)
- [Caffeine](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-caffeine)
- [Simple](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-simple)

> 也可以使用`spring.cache.type`属性强制使用缓存实现。如果您需要在某些环境中[完全禁用缓存](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-caching-provider-none)(例如测试)，那么可以使用该属性。

> 使用`spring-boot-starter-cache` “Starter”来快速添加基本的缓存依赖，这个starter引入了`spring-context-support`:如果是手动添加的依赖，为了使用JCache，EhCache 2.x或Guava支持，你必须得包含`spring-context-support`。

如果Spring Boot自动配置了`CacheManager`，可以通过暴露一个实现了`CacheManagerCustomizer`接口的bean在`CacheManager`完全初始化之前进一步优化它的配置。下面的代码设置了一个标志，表示null值应该被传递到底层的map。
```java
@Bean
public CacheManagerCustomizer<ConcurrentMapCacheManager> cacheManagerCustomizer() {
    return new CacheManagerCustomizer<ConcurrentMapCacheManager>() {
        @Override
        public void customize(ConcurrentMapCacheManager cacheManager) {
            cacheManager.setAllowNullValues(false);
        }
    };
}
```

> 在上面的例子中，预计会自动配置一个`ConcurrentMapCacheManager`。如果不是这种情况(你提供了自己的配置，或者是自动配置了不同的缓存实现)，则不会调用customizer了。你可以提供很多个customizer并且可以使用常规的`@Order`或者`Ordered`来排序。

#### 通用
如果上下文中定义了不止一个`org.springframework.cache.Cache` bean，则使用通用缓存。`CacheManager`包装所有创建的这个类型的bean。

#### JCache（JSR-107）
JCache是通过类路径中存在`javax.cache.spi.CachingProvider`来加载的，`spring-boot-starter-cache` "starter" 提供了`JCacheCacheManager`。有很多兼容的库并且Spring Boot 提供了对Ehcache 3、Hazelcast和Infinispan的依赖管理。还可以添加任何其他兼容的库。

有可能会出现有多个提供者的情况，在这种情况下必须明确指定提供者。即使JSR-107标准没有强制定义配置文件的位置，但是Spring Boot尽最大可能来适应具体实现。
```properties
# Only necessary if more than one provider is present
spring.cache.jcache.provider=com.acme.MyCachingProvider
spring.cache.jcache.config=classpath:acme.xml
```

> 由于缓存库有可能提供本地实现和JSR-107支持，Spring Boot将会优先选择JSR-107支持，因此如果你切换到不同的JSR-107实现，Spring Boot还是可以支持相同的功能。

> Spring Boot 对[Hazelcast有一个通用的实现](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#boot-features-hazelcast)。如果有一个单独的`HazelcastInstance`可用，它会自动地为`CacheManager`重用，除非指定`spring.cache.jcache.config`属性。

还有一些方式来自定义底层的`javax.cache.cacheManager`:
- 缓存可以在启动的时候通过`spring.cache.cache-names`属性来创建。如果定义了自已的`javax.cache.configuration.Configuration` bean ，将会用它来自定义它们。
- CacheManager引用调用`org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer` bean 来进行完全定制。

> 如果定义了一个标准的`javax.cache.CacheManager` bean，它会自动被抽象层期望的`org.springframework.cache.CacheManager`实现包装。不进行进一步的定制。

#### EhCache 2.x
如果在classpath的根目录上找到了`ehcache.xml`文件，那么将会使用EhCache 2.x。如果是EhCache 2.x，`spring-boot-starter-cache` "Starter"提供的`EhCacheCacheManager`和它提供的这个文件用来启动缓存管理器。也可以使用这种方式来提供可选的配置文件：
```
spring.cache.ehcache.config=classpath:config/another-config.xml
```

#### Hazelcast
#### Infinispan
#### Couchbase
#### Redis
如果Redis可用并且配置了，`RedisCacheManager`将会自动配置。还可以使用`spring.cache.cache-names`属性在启动时创建额外的缓存。

> 在缺省情况下，添加了一个key的前缀，以防止如果两个单独的缓存使用相同的密钥，Redis将会有重叠的key，并可能会返回无效值的情况。如果你创建了自己的`RedisCacheManager`，我们强烈建议保持开启这个设置。

#### Caffeine
#### Simple
如果没有发现其他的提供者，将会配置一个使用`ConcurrentHashMap`作为缓存存储的简单实现。如果应用没有提供缓存库，这将是默认配置。缓存默认是实时创建的，但是你可以使用`cache-names`属性限制可用的缓存列表。例如，如果你只想要`foo`和`bar`缓存：
```
spring.cache.cache-names=foo,bar
```
如果你这样做，你的应用程序使用一个未列出的缓存那么当需要缓存时，它会在运行时失败，但在启动时不会。如果你使用未声明的缓存，这与“真实”缓存提供者的行为方式类似。

#### None
当你的配置中出现了@EnableCache时，也可以预期适当的缓存配置。如果在某些环境中需要禁用缓存，那么强制缓存类型为`none`，以使用无操作实现:
```
spring.cache.type=none
```

## 消息
Spring Framework 提供了集成消息系统的扩展支持：从简单地使用JMS API `JmsTemplate` 到完整的接收异步消息的架构。Spring AMQP为“Advanced Message Queuing Protocol”提供了一个类似的特性集并且Spring Boot也为`RabbitTemplate`和RabbitMQ提供配置自动配置选项。在Spring WebSocket中还原生支持STOMP的消息传递，Spring Boot通过starter和少量的自动配置支持这一点。Spring Boot 也支持Apache Kafka。

### JMS
`javax.jms.ConnectionFactory`接口提供了创建与JMS代理进行交互的`javax.jms.Connection`的标准方法。尽管Spring需要一个`ConnectionFactory`来与JMS一起工作，但是你通常不需要直接使用它并且可以依赖更高层次的消息抽象层（查看[Spring Framework的文档](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/integration.html#jms)获取更多细节）。Spring Boot 也自动配置必要的组件来发送与接收消息。

#### ActiveMQ 
当Spring Boot在classpath中发现ActiveMQ时，也会配置一个`ConnectionFactory`。如果提供了代理，将启动一个嵌入式代理并且自动配置它（只要没有通过配置指定代理URL）。

> 如果你使用了`spring-boot-starter-activemq`，则提供连接或嵌入ActiveMQ实例的必要依赖项，以及与JMS集成的Spring基础设施。

ActiveMQ配置由`spring.activemq.*`中的外部配置属性控制。例如，你可以在`application.properties`中声明下面的语句：
```properties
spring.activemq.broker-url=tcp://192.168.1.210:9876
spring.activemq.user=admin
spring.activemq.password=secret
```
你还可以通过添加`org.apache.activemq:activemq-pool`的依赖来使用JMS资源池，并相应地配置`PooledConnectionFactory`：
```properties
spring.activemq.pool.enabled=true
spring.activemq.pool.max-connections=50
```

查看[`ActiveMQProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jms/activemq/ActiveMQProperties.java)获取更多地的支持属性。

默认情况下，如果不存在destination ，ActiveMQ会创建一个，因此，destination 是根据它们提供的名称来解析的。

#### Artemis 
如果Spring Boot 在classpath中发现了Artemis，则会自动配置`ConnectionFactory`。如果代理存在，则将自动启动并配置嵌入式代理(除非模式属性已显式设置)。支持的模式有:`embedded`（显式地指出需要使用嵌入式代理，并且在代理在类路径中不可用时导致错误）和`native`使用`netty`传输协议来连接代理。当配置后者时，Spring Boot 配置一个`ConnectionFactory`，使用默认设置连接到在本地机器上运行的代理。

> 如果你使用了`spring-boot-starter-artemis`，将会提供连接已经存在的Artemis实例的必要依赖，以及与JMS集成的Spring基础组件。添加`org.apache.activemq:artemis-jms-server`到你的应用中允许你使用`embedded`模式。

Artemis的配置是由在spring.artemis.*的外部配置属性控制的。例如，你可以在`application.properties`中声明以下代码：
```properties
spring.artemis.mode=native
spring.artemis.host=192.168.1.210
spring.artemis.port=9876
spring.artemis.user=admin
spring.artemis.password=secret
```

在嵌入代理时，你可以选择是否启用持久性，以及应该提供的destination列表。可以将它们指定为以逗号分隔的列表，以使用默认选项创建它们；或者你可以定义`org.apache.activemq.artemis.jms.server.config.JMSQueueConfiguration`或`org.apache.activemq.artemis.jms.server.config.TopicConfiguration`类型的bean(s)，分别用于高级队列和主题配置。

查看[`ArtemisProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jms/artemis/ArtemisProperties.java) 获取更多支持的属性。

任何JNDI查找都不涉及到，destination都是根据它们的名称来解析的，或者在"Artemis "的配置中使用“name”属性，或者通过配置提供的名称。

#### 使用JNDI ConnectionFactory
如果你在应用程序服务器中运行你的应用程序，Spring Boot将尝试使用JNDI来定位一个JMS `ConnectionFactory`。默认会检查`java:/JmsXA`和`java:/XAConnectionFactory`。你可以使用`spring.jms.jndi-name`属性来指定其他的位置：
```
spring.jms.jndi-name=java:/MyConnectionFactory
```

#### 发送消息
Spring的`JmsTemplate`是自动配置的并且你可以直接注入到你的bean中：
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    private final JmsTemplate jmsTemplate;

    @Autowired
    public MyBean(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    // ...

}
```
> `JmsMessagingTemplate`也可以以类似的方式注入。如果定义了`DestinationResolver`或`MessageConverter` bean，它们将自动关联到自动配置的`JmsTemplate`。

#### 接收消息
当JMS 基础组件存在时，任何bean都可以用 @JmsListener 注解来创建监听器端点。如果没有定义`JmsListenerContainerFactory` bean，会自动配置一个默认的。如果定义了`DestinationResolver`或`MessageConverter` bean，那么它们将自动与缺省工厂相关联。

默认的工厂默认是事务性的。如果你在一个`JtaTransactionManager`存在的基础结构中运行，那么默认情况下，它将与监听器容器相关联。如果不是的话，`sessionTransacted`标志将会启用。在后一种情况下，你可以将本地数据存储事务与传入消息的处理关联起来，方法是在listener方法(或其委托方法)上添加`@Transactional`。这将确保在本地事务完成后传入消息被确认。这还包括在相同JMS会话中执行的响应消息发送。

下面的组件在`someQueue`上创建了一个监听端点：
```java
@Component
public class MyBean {

    @JmsListener(destination = "someQueue")
    public void processMessage(String content) {
        // ...
    }

}
```

> 查看[`@EnableJms`文档](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/javadoc-api/org/springframework/jms/annotation/EnableJms.html)查看更多细节。

如果你需要创建更多的`JmsListenerContainerFactory`实例或者你想要覆盖默认的，Spring Boot提供了`DefaultJmsListenerContainerFactoryConfigurer`来实例化`DefaultJmsListenerContainerFactory`并且与自动配置的使用相同的设置。

例如，下面的内容展示了另一个使用特定`MessageConverter`的工厂:
```java
@Configuration
static class JmsConfiguration {

    @Bean
    public DefaultJmsListenerContainerFactory myFactory(
            DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory =
                new DefaultJmsListenerContainerFactory();
        configurer.configure(factory, connectionFactory());
        factory.setMessageConverter(myMessageConverter());
        return factory;
    }

}
```
然后可以在任何`@JmsListener`注解的方法中使用：
```java
@Component
public class MyBean {

    @JmsListener(destination = "someQueue", containerFactory="myFactory")
    public void processMessage(String content) {
        // ...
    }

}
```

### AMQP
高级消息队列协议(AMQP)是面向消息中间件的一种平台无关的、线级协议(?)。Spring AMQP 项目Spring的核心概念应用到基于AMQP的消息解决方案的开发。Spring Boot提供了多种便利，可以通过RabbitMQ与AMQP进行合作，包括`spring-boot-starter-amqp` “Starter”。

#### RabbitMQ 
RabbitMQ是一种基于AMQP协议的轻量级的、可靠的、可伸缩的、可移植的消息代理。Spring使用RabbitMQ来使用AMQP协议进行通信。
RabbitMQ配置由`spring.rabbitmq.*`中的外部配置属性控制。例如，可以在`application.properties`中声明以下代码：
```properties
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=secret
```
请参阅[`RabbitProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/amqp/RabbitProperties.java)获得更多受支持的选项。

> 查看[理解AMQP，RabbitMQ使用的协议](http://spring.io/blog/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq/)了解更多细节

#### 发送消息
Spring的 `AmqpTemplate` 和 `AmqpAdmin` 是自动配置的,你可以自动装配他们到自己的 bean：
```java
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    private final AmqpAdmin amqpAdmin;
    private final AmqpTemplate amqpTemplate;

    @Autowired
    public MyBean(AmqpAdmin amqpAdmin, AmqpTemplate amqpTemplate) {
        this.amqpAdmin = amqpAdmin;
        this.amqpTemplate = amqpTemplate;
    }

    // ...

}
```

> `RabbitMessagingTemplate`可以以类似的方式注入。如果定义了`MessageConverter`  bean，那么它将自动与自动配置的`AmqpTemplate`相关联。

任何`org.springframework.amqp.core.Queue`定义为bean的队列将在必要时自动用于在RabbitMQ实例上声明一个对应的队列。

你可以启用`AmqpTemplate`上的重试来重试操作，例如在丢失代理连接的事件中。默认情况下，重试是禁用的。

#### 接收消息
当Rabbit组件存在时，任何bean都可以用`@RabbitListener`注解来创建一个监听器端点。如果没有定义`RabbitListenerContainerFactory`,默认自动配置`SimpleRabbitListenerContainerFactory`,并且你可以使用`spring.rabbitmq.listener.type`属性切换到一个直接的容器。如果定义了`MessageConverter`或`MessageRecoverer` bean，那么它们将自动与缺省工厂相关联。

下面的组件在`someQueue`队列上创建一个监听器端点:
```java
@Component
public class MyBean {

    @RabbitListener(queues = "someQueue")
    public void processMessage(String content) {
        // ...
    }

}
```

> 请查看[`@EnableRabbit`的Javadoc](http://docs.spring.io/spring-amqp/docs/current/api/org/springframework/amqp/rabbit/annotation/EnableRabbit.html)以获得更多详细信息。

如果你需要创建多个`RabbitListenerContainerFactory`实例或者你想覆盖默认的,Spring Boot提供了`SimpleRabbitListenerContainerFactoryConfigurer`和`DirectRabbitListenerContainerFactoryConfigurer`,你可以用它来初始化一个`SimpleRabbitListenerContainerFactory`和`DirectRabbitListenerContainerFactory`,并且与自动配置的使用相同的设置。

> 不管选择哪种容器类型，这两个bean都是由自动配置公开的。

例如，下面的内容展示了另一个使用特定`MessageConverter`的工厂:
```java
@Configuration
static class RabbitConfiguration {

    @Bean
    public SimpleRabbitListenerContainerFactory myFactory(
            SimpleRabbitListenerContainerFactoryConfigurer configurer) {
        SimpleRabbitListenerContainerFactory factory =
                new SimpleRabbitListenerContainerFactory();
        configurer.configure(factory, connectionFactory);
        factory.setMessageConverter(myMessageConverter());
        return factory;
    }

}
```
然后你可以在任何 @RabbitListener 注解的方法中使用：
```java
@Component
public class MyBean {

    @RabbitListener(queues = "someQueue", containerFactory="myFactory")
    public void processMessage(String content) {
        // ...
    }

}
```

你可以启用重试来处理监听器抛出异常的情况。默认情况下使用`RejectAndDontRequeueRecoverer`但是你可以定义一个自己的`MessageRecoverer`。当重试耗尽时，消息将被拒绝，并且被丢弃或者如果代理配置了交换，则消息将路由到死信交换。默认情况下，重试是禁用的。

> **如果没启用重试，侦听器抛出异常，默认情况下，将为无限重试分发。你可以通过两种方式来修改该行为;将`defaultRequeueRejected`属性设置为`false`，并尝试零重新交付;或者,抛出`AmqpRejectAndDontRequeueException`表示该消息应该被拒绝。这是在启用重试并且达到了最大的交付尝试时所使用的机制**

### Apache Kafka
通过提供`spring-kafka`项目的自动配置来支持[`Apache Kafka`](http://kafka.apache.org/)。

Kafka 的配置由`spring.kafka.*`的外部配置属性控制。例如，你可以在`application.properties`中声明以下部分:
```properties
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=myGroup
```
更多受支持的选项，请参见[`KafkaProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/kafka/KafkaProperties.java)。

#### 发送消息
Spring的`KafkaTemplate`是自动配置的，你可以直接在你自己的bean中注入它们:
```java
@Component
public class MyBean {

	private final KafkaTemplate kafkaTemplate;

	@Autowired
	public MyBean(KafkaTemplate kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	// ...

}
```


#### 接收消息
当Apache Kafka基础组件存在时，任何bean都可以用@卡夫卡式的注解来创建一个监听器端点。如果没有定义`KafkaListenerContainerFactory`,会自动配置一个默认的，并且key定义在`spring.kafka.listener.*`中。

以下组件在`someTopic`主题上创建一个监听器端点：
```java
@Component
public class MyBean {

    @KafkaListener(topics = "someTopic")
    public void processMessage(String content) {
        // ...
    }

}
```

#### 额外的Kafka属性
自动配置支持的属性在[附录A，通用应用程序属性](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#common-application-properties)中可以查看。请注意，这些属性大部分(连字符或驼峰形式)都直接映射到Apache Kafka的点状属性，请参阅Apache Kafka文档以获得详细信息。

这些属性的前几项都适用于生产者和消费者，但如果希望使用不同的值，则可以在生产者或消费者级别指定。Apache Kafka指定了具有重要性的属性：HIGH，MEDIUM和LOW。Spring Boot自动配置支持所有HIGH重要性的属性，一些选择的MEDIUM和LOW，以及任何没有默认值的属性。

Kafka 所支持的属性中只有一个子集可以通过`KafkaProperties`类来获得。如果你希望配置没有直接支持的生产者或消费者的附加属性，请使用以下内容:
```
spring.kafka.properties.foo.bar=baz
spring.kafka.consumer.properties.fiz.buz=qux
# 这里应该是.吧？
spring,kafka.producer.properties.baz.qux=fiz 
```

这设置了普通的`foo.bar` Kafka 属性为`baz`(适用于生产者和消费者)，消费者`fiz.buz`属性为`qux`和生产者`baz.qux`属性为`fiz`。

> **以这种方式设置的属性将覆盖Spring Boot 显式支持的任何配置项。**

## 使用“RestTemplate” 调用REST 服务
如果需要在应用程序中调用远程REST服务，那么可以使用Spring Framework的`RestTemplate`类。由于`RestTemplate`实例通常需要在被使用之前进行定制，所以Spring Boot 不提供任何单独的自动配置的`RestTemplate` bean。但是，它可以自动配置一个`RestTemplateBuilder`，当需要时可以使用它创建`RestTemplate`实例。自动配置的`RestTemplateBuilder`将确保将合理的`HttpMessageConverters`应用于`RestTemplate`实例。

下面是一个典型的例子:
```java
@Service
public class MyService {

    private final RestTemplate restTemplate;

    public MyBean(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public Details someRestCall(String name) {
        return this.restTemplate.getForObject("/{name}/details", Details.class, name);
    }

}
```

> `RestTemplateBuilder`包含许多有用的方法，这些方法可用于快速配置`RestTemplate`。例如，要添加基本的身份验证支持，你可以使用`builder.basicAuthorization("user", "password").build()`。

### 定制RestTemplate
`RestTemplate`定制主要有三种方法，这取决于你希望定制的范围有多大。

要使任何定制的范围尽可能窄，只需插入自动配置的`RestTemplateBuilder`，然后根据需要调用它的方法就行了。每个方法调用都返回一个新的`RestTemplateBuilder`实例，因此定制只会影响该构建器的使用。为了在应用层面定制，可以使用额外的定制化定制一个`RestTemplateCustomizer` bean。所有这些bean都将自动注册到自动配置的`RestTemplateBuilder`中，并将应用于使用它构建的任何模板。

下面是一个定制化器的例子，它配置了除192.168.0.5之外的所有主机使用代理:
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
最后，最极端的(也是很少使用的)选择是创建你自己的`RestTemplateBuilder` bean。这将关闭`RestTemplateBuilder`的自动配置，并防止使用任何`RestTemplateCustomizer` bean。

## 使用“WebClient” 调用REST 服务
### 定制WebClient
## 校验
只要在类路径上发现JSR-303的实现(例如Hibernate validator)就会自动启用Bean校验1.1支持的方法校验特性。这允许在bean方法的参数和/或返回值上使用`javax.valication`约束注解。有这些注解的方法的目标类需要在类级别上用`@Validated`注解进行注解，因为内联约束注解需要搜索它们的方法。

例如，以下服务触发第一个参数的验证，确保它的大小在8到10之间：
```java
@Service
@Validated
public class MyBean {

    public Archive findByCodeAndAuthor(@Size(min = 8, max = 10) String code,
            Author author) {
        ...
    }

}
```

## 邮件发送
Spring框架为使用`JavaMailSender`接口发送电子邮件提供了一种简单的抽象，Spring Boot 为它提供了自动配置以及启动模块。

> 查看[参考文档](http://docs.spring.io/spring/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/integration.html#mail)以了解如何使用`JavaMailSender`的详细说明

如果spring.mail.host和相关的库(如spring-boot-starter-mail所定义的)可用，如果不存在，就会创建一个默认的JavaMailSender。sender可以通过`spring.mail`命名空间中的配置项进一步定制，查看[`MailProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/mail/MailProperties.java)以获得更多细节。

特别是，某些默认的超时值是无限的，你可能想要更改它，以避免被无响应的邮件服务器阻塞线程：
```
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=3000
spring.mail.properties.mail.smtp.writetimeout=5000
```

## JTA 分布式事务
Spring Boot通过使用Atomikos或Bitronix嵌入式事务管理器来支持跨多个XA资源的分布式JTA事务。在部署到合适的Java EE应用服务器时，JTA事务也得到了支持。当检测到JTA环境时，将使用Spring的`JtaTransactionManager`来管理事务。将对自动配置的JMS、数据源和JPA bean进行升级，以支持XA事务。你可以使用诸如`@Transactional`之类的标准Spring 方式来参与分布式事务。如果你在一个JTA环境中，并且仍然希望使用本地事务，那么你可以设置`spring.jta.enabled`属性设置为`false`来禁用JTA自动配置。

### 使用Atomikos 事务管理器
Atomikos是一个流行的开源事务管理器，可以嵌入到Spring Boot应用程序中。你可以使用`spring-boot-starter-jta-atomikos` Starter来获取适当的Atomikos库。Spring Boot将自动配置Atomikos，并确保将适当的`depends-on`设置应用到你的Spring bean上，以正确的启动和关闭顺序。

在缺省情况下，Atomikos事务日志将被写入到应用程序主目录(应用程序jar文件所在的目录)的`transaction-logs`目录中。你可以通过在`application.properties`文件中设置一个`spring.jta.log-dir`属性来定制这个目录。`spring.jta.atomikos.properties`开始的属性也可以用来定制于Atomikos `UserTransactionServiceImp`。请参阅[`AtomikosProperties` Javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/jta/atomikos/AtomikosProperties.html)以获得完整的详细信息。

> 为了确保多个事务管理器能够安全地协调相同的资源管理器，每个Atomikos实例必须配置一个惟一的ID，默认情况下，这个ID是Atomikos正在运行的机器的IP地址。为了确保产品的唯一性，你应该为应用程序的每个实例配置`spring.jta.transaction-manager-id`属性使用不同的值。

### 使用Bitronix 事务管理器
### 使用Narayana 事务管理器
### 使用Java EE管理的事务管理器
### 混合XA和非XA JMS连接
### 支持另一个嵌入式事务管理器
## Hazelcast
## Quartz Scheduler
Spring引导为使用Quartz调度器提供了几项便利，包括`spring-boot-starter-quartz` 'Starter'。如果可以使用Quartz，则将自动配置一个`Scheduler`(通过`SchedulerFactoryBean`抽象层)。

以下类型的bean将被自动获取并与`Scheduler`关联:
- `JobDetail`:定义了一个特定的Job。`JobDetail`实例可以通过`JobBuilder `API轻松构建。
- `Calendar`
- `Trigger`:定义特定job何时触发。

默认情况下，将使用一个内存中的`JobStore`。但是，如果你的应用程序中有`DataSource ` bean和配置了`spring.quartz.job-store-type`属性，则可以配置一个基于jdbc的存储:
```
spring.quartz.job-store-type=jdbc
```
当使用jdbc存储时,可以在启动时初始化相关表:
```
spring.quartz.jdbc.initialize-schema = true
```

> 默认情况下会检测到数据库，并使用Quartz库提供的标准脚本进行初始化。还可以使用`spring.quartz.jdbc.schema`属性提供自定义脚本。

Quartz调度器的配置可以使用Quartz 配置属性(参见`spring.quartz.properties.*`)和允许编程式定制`SchedulerFactoryBean`的`SchedulerFactoryBeanCustomizer` bean。

Job可以定义set方法来注入数据映射属性。常规bean也可以以类似的方式注入:
```java
public class SampleJob extends QuartzJobBean {

    private MyService myService;
    private String name;

    // Inject "MyService" bean
    public void setMyService(MyService myService) { ... }

    // Inject the "name" job data property
    public void setName(String name) { ... }

    @Override
    protected void executeInternal(JobExecutionContext context)
            throws JobExecutionException {
        ...
    }

}
```

## Spring Integration
Spring Boot为使用Spring Integration提供了一些方便，包括`spring-boot-starter-integration`'Starter'。Spring Integration为消息传递提供了抽象，还提供了HTTP、TCP等其他传输协议。如果你的类路径上有Spring Integration，它将通过`@EnableIntegration`注解进行初始化。

Spring Boot还将配置一些由附加的Spring Integration模块所触发的特性。如果“spring-integration-jmx”也在类路径上，消息处理统计信息将在JMX上发布。如果“spring-integration-jdbc”可用，则可以在启动时创建默认的数据库表:
```
spring.integration.jdbc.initializer.enabled=true
```
查看[`IntegrationAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/integration/IntegrationAutoConfiguration.java) 和[`IntegrationProperties`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/integration/IntegrationProperties.java)类了解更多的细节。

## Spring Session
Spring Boot为许多存储提供了Spring Session 自动配置:
- JDBC
- Redis
- Hazelcast
- HashMap

如果可以使用Spring Session ，那么你必须选择你希望使用的`StoreType`来存储会话。例如，使用JDBC作为后端存储，您可以将应用程序配置为如下:
```
spring.session.store-type=jdbc
```

> 你可以通过将`store-type`设置为`none`来禁用Spring Session。

每种存储都有特定的附加设置。例如，可以为jdbc存储定制表的名称:
```
spring.session.jdbc.table-name=SESSIONS
```

## JMX监视和管理
Java管理扩展(JMX)提供了一种监视和管理应用程序的标准机制。在默认情况下，Spring Boot将创建一个bean id为‘mbeanServer’的`MBeanServer`，并公开任何使用Spring JMX注解注解的bean(`@ManagedResource`、`@ManagedAttribute`、`@ManagedOperation`)。

有关更多详细信息，请参阅[`JmxAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jmx/JmxAutoConfiguration.java)类。

