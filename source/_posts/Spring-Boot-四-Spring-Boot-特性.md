---
title: Spring Boot 四-Spring Boot 特性
date: 2017-08-15 21:13:56
tags: [Spring Boot,特性]
---
### SpringApplication
#### 启动失败
#### 自定义Banner
#### 自定义SpringApplication
#### 流式builder API
```java
new SpringApplicationBuilder()
        .sources(Parent.class)
        .child(Application.class)
        .bannerMode(Banner.Mode.OFF)
        .run(args);
```
**Web 组件必须在子上下文中，并且父子上下文将使用相同的环境变量`Environment`**

#### 事件和监听器
#### Web 环境
#### 访问应用参数
#### 使用ApplicationRunner，CommandLineRunner
#### 应用退出
#### 管理员功能
### 详细配置
Spring Boot 允许具体化配置，因此我们的应用可以在不同的环境中运行。可以使用properties文件，YAML文件，环境变量和命令行参数来具体化配置。属性值可以通过`@Value`注解直接注入到bean中，通过Spring环境变量`Environment`来访问或者通过`@ConfigurationProperties`注解绑定到结构化对象中。

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
#### 配置随机值
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

#### 访问控制台参数
`SpringApplication`默认会将控制台选项参数（以`--`开头，如：`--server.port=9000`）转换为一个属性并且将它添加到Spring的环境变量中去。上面提到过控制台参数的优先级比其他的属性源高。 
如果不想添加控制台属性添加到Spring环境变量中，可以通过`SpringApplication.setAddCommandLineProperties(false)`来禁用这个功能。
#### 应用属性文件
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

#### Profile-specific属性
除`application.properties`文件之外，还可以定义`application-{profile}.properties`格式的特定profile的属性。当没有指定profile时，`Environment`会使用一些默认的profiles（默认为`[default]`）,比如没有明确指定profile时，将会加载`application-default.properties`。

特定profile的属性和标准的`application.properties`一样从相同的位置加载进来，同时特定profile会覆盖非特定profile的文件，不管这个特定profile的文件是不是在jar包中。

如果指定了多个profile，最后一个将会生效。例如：通过`spring.profiles.active`属性来指定的profile在那些通过`SpringApplication`API 配置的profile后面被添加进来，因此会获取优先权。

> 如果在`spring.config.location`设置的任何文件中的特定profile文件将不会生效。如果`spring.profiles.active`指定的profile名称和`spring.config.location`中的profile名称一样，是会生效的，不一样的话则不会生效。
比如：`spring.profiles.active=dev`，则`java -jar myapp.jar --spring.config.location=application-dev.properties`会生效，但是`java -jar myapp.jar --spring.config.location=application-pro.properties`则不会生效。
如果想让它生效，可以在`spring.config.location`中使用目录（实验结果如上）。

#### 属性文件中的Placeholders 
`application.properties`文件中的值可以用`Environment`中存在的值过滤，因此可以引用之前定义过的值（比如：系统属性）。
```properties
app.name=MyApp
app.description=${app.name} is a Spring Boot application
```

> 可以使用这个特性来对一些存在的Spring Boot属性定义短变量。[具体查看](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-use-short-command-line-arguments)。

#### YAML 代替属性文件
YAML是JSON的一个超集，也是一个非常方便设置分层配置数据的格式。当在classpath中发现了[Snake YAML](http://www.snakeyaml.org/)包时，`SpringApplication`类会自动支持YAML作为属性的一种可选方案。

> 如果使用spring-boot-starter，Snake YAML会自动加载进来。

##### 加载YAML
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

##### 将YMAL作为属性暴露到Spring 环境中
`YamlPropertySourceLoader`类可以用来暴露YAML，将它作为Spring `Environment`的一个`PropertySource`。你可以使用熟悉的`@Value`注解来访问YAML属性。

##### 多个profile 的YAML文件
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
##### YAML 缺陷
YAML文件无法通过`@PropertySource`注解加载。如果想通过这种方式加载，需要使用properties文件。
##### 合并YAML列表
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
#### 类型安全的配置属性
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

##### 第三方配置
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
##### 不严格绑定
##### 属性转换
##### @ConfigurationProperties 校验
##### @ConfigurationProperties 与 @Value对比
`@Value`是核心容器的一个功能，不提供`@ConfigurationProperties `类似的类型安全的功能。下面的表格总结了两个注解支持的功能。
功能|@ConfigurationProperties|@Value
--|--|--
不严格绑定|支持|不支持
元数据支持|支持|不支持
SpEL 表达式|不支持|支持
如果为自己的组件定义了一些配置键值，建议将他们放在一个POJO对象中，并且用`@ConfigurationProperties`注解。同时要注意由于`@Value`不支持不严格绑定，因此当需要提供环境变量的值时最好不用`@Value`。

最后，虽然可以用`@Value`编写`SpEL`表达式，但这些表达式不会从应用程序属性文件中处理。
