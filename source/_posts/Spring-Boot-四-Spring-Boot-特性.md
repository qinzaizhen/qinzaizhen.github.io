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

### 文件输出
### 日志级别
### 自定义日志配置
### Logback扩展
#### 特定Profile配置
#### 环境属性
## 开发web应用
### Spring Web MVC 框架
#### Spring MVC自动配置
#### HttpMessageConverter
#### 自定义JSON序列化和反序列化
#### MessageCodesResolver
#### 静态内容
#### 自定义Favicon
#### ConfigurableWebBindingInitializer
#### 模板引擎
#### 错误处理
#### Spring HATEOAS
#### CORS支持
### Spring WebFlux框架
#### Spring WebFlux自动配置
#### HttpMessageReaders 和 HttpMessageWriters HTTP编码
#### 静态内容
#### 模板引擎
### JAX-RS 和Jersey
### 嵌入式servlet容器支持
#### Servlet，Filter和listerner
#### Servlet上下文初始化
#### ServletWebServerApplicationContext
#### 自定义嵌入式servlet容器
#### JSP限制
## 安全
###  OAuth2
#### 授权服务器
#### 资源服务器
### User信息中的Token类型
### 自定义User信息 RestTemplate
#### Client
#### 单点登录
### Actuator 安全
## SQL数据库
### 定义数据源
#### 嵌入式数据库支持
#### 连接生产库
#### 连接JNDI数据库
### 使用JdbcTemplate
### JPA和Spring Data
#### 实体类
#### Spring Data JPA仓库
#### 创建和删除JPA数据库
#### 在View中打开EntityManager
### 使用H2的web控制台
#### 修改H2控制台的路径
#### 加密H2的控制台
### 使用jOOQ
#### 代码生成
#### 使用DSLContext
#### jOOQ SQL方言
#### 自定义jOOQ
## NoSQL
### 连接到Redis
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