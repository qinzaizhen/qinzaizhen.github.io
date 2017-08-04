---
title: dubbo学习1- 配置
date: 2017-08-03 22:58:47
tags: [dubbo,配置]
---
### XML配置
dubbo通过spring的xml文件进行配置，可以方便地与spring进行集成。
#### 示例
下面是一个简单的provider端配置示例：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://code.alibabatech.com/schema/dubbo        http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
    <!--应用名称，用于区分服务-->
    <dubbo:application name="hello-app"/>
    <!--定义一个协议，以及使用的端口号-->
    <dubbo:protocol name="dubbo" port="20880"/>
    <!--定义注册中心-->
    <dubbo:registry address="zookeeper://localhost:2181"/>
    <!--定义一个服务-->
    <dubbo:service interface="life.qzz.dubbodemo.api.DemoService" ref="demoService"/>
    <!--spring的bean，服务会引用到它作为具体的实现-->
    <bean id="demoService" class="life.qzz.dubbodemo.api.impl.DemoServiceImpl"/>
</beans>
```

consumer端配置示例：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://code.alibabatech.com/schema/dubbo        http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
    <dubbo:application name="hello-app"/>
    <dubbo:registry address="zookeeper://localhost:2181"/>
    <!--引用的服务-->
    <dubbo:reference id="demoService" interface="life.qzz.dubbodemo.api.DemoService"/>
</beans>
```

在对dubbo进行扩展时，可以通过`<dubbo:parameter>`标签来设置自定义参数，同时也支持spring的`p`标签。如：
```xml
<dubbo:protocol name="jms">
    <dubbo:parameter key="queue" value="http://localhost/queue" />
</dubbo:protocol>
```
或：
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans.xsd        http://code.alibabatech.com/schema/dubbo        http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
 
    <dubbo:protocol name="jms" p:queue="http://localhost/queue" />
</beans>

```
#### 配置关系图

![image](http://ooll8xqpq.bkt.clouddn.com/dubbo_config_relation.png)
- <dubbo:service/> 服务配置，用于暴露一个服务，定义服务的元数据，一个服务可以用多种协议暴露，也可以注册到多个注册中心。
- <dubbo:reference/> 引用配置，用于创建一个远程服务代理，一个引用可以指向多个注册中心。
- <dubbo:protocol/> 协议配置，用于定义暴露服务的协议。协议由提供方定义，消费方被动接受。
- <dubbo:application/> 应用配置，用于配置当前应用信息。
- <dubbo:module/> 模块配置，用于配置当前模块信息，可选。
- <dubbo:registry/> 注册中心配置，用于配置连接注册中心相关配置。
- <dubbo:monitor/> 监控中心配置，用于配置监控中心相关配置，可选。
- <dubbo:provider/> 提供方缺省配置，当ProtocolConfig和ServiceConfig某属性没有配置时，使用此缺省值，可选。
- <dubbo:consumer/> 消费方缺省配置，当ReferenceConfig某属性没有配置时，使用此缺省值，可选。
- <dubbo:method/> 方法配置，为ServiceConfig和ReferenceConfig指定方法级别的配置信息。
- <dubbo:argument/> 用于指定方法参数配置。

#### 配置优先级

![image](http://ooll8xqpq.bkt.clouddn.com/dubbo-config-override.jpg)
- 上图中以timeout为值，显示了配置的查找顺序，其他retires，loadbalance，actives等类似。
1. 方法级优先，接口级次之，全局配置再次之。
2. 如果级别一样，则消费方优先，提供方再次之。
- 服务提供者的配置，通过URL由注册中心传递给服务消费者。
- 建议由服务提供者设置超时时间，因为一个方法要执行多久，提供方很清楚，如果一个服务消费者同时引用多个提供者，则无需关心超时时间。
- 理论上ReferenceConfig的非标识配置，在ConsumerConfig，ServiceConfig，ProviderConfig均可缺省配置（比如：只需要配置id和interface）。

**上面的优先级查找顺序只针对提供者和消费者都是dubbo实现的，比如如果消费者是浏览器，提供者用的是rest协议，那么这种优先级关系应该不存在。**

[demo地址](https://github.com/qzzsunly/dubbodemo/tree/master/demo1)

### 属性配置
- 如果公共配置很简单，需要多个Spring容器共享配置，可以使用dubbo.properties作为缺省配置。
- Dubbo会自动加载classpath根目录下的dubbo.properties，可以通过JVM启动参数`-Ddubbo.properties.file=xxx.properties
改变缺省配置位置。
**如果classpath根目录下存在多个dubbo.properties文件，比如多个jar包中有dubbo.properties，Dubbo会任意加载，这容易导致混乱，所以最好只用一个dubbo.properties文件。**

#### 映射规则
属性文件的key值与xml的配置存在一定的映射关系。
1. 将XML配置的标签名，加上属性名，再用点`.`进行分隔，多个属性拆成多行书写。比如：
- dubbo.application.name=hello 等价于<dubbo:application name="hello"/>
- dubbo.registry.address=zookeeper://localhost:2181 等价于<dubbo:registry address="zookeeper://localhost:2181"/>
2. 如果XML有多行同名标签配置，可以用id进行区分，如果没有id号将对所有同名标签生效。比如：
- dubbo.protocol.rmi.port=1099 等价于<dubbo:protocol id="rmi" name="rmi" port="1099"/>(协议的id没配时，缺省使用协议名作为id)
- dubbo.registry.china.address = zookeeper://localhost:2181 等价于 <dubbo:registry id ="china" address="zookeeper://localhost:2181"/>

#### 典型配置
```properties
dubbo.application.name=hello
dubbo.application.owner=qzz
dubbo.registry.address=zookeeper://localhost:2181
```

#### 覆盖策略

![image](http://ooll8xqpq.bkt.clouddn.com/dubbo-properties-override.jpg)
- JVM启动参数优先，这样可以在部署和启动的时候进行参数重写，比如在启动的时候改变协议的端口号。
- XML次之，如果在XML中有配置，则dubbo.properties中的相应配置项会失效。
- Properties最后，相当于缺省值，只有XML和启动参数都有没有对应的配置项时，dubbo.properties中的相应配置项才会生效，通常用于共享公共配置，比如应用名。


### API配置

API配置的使用范围用来做OpenAPI，ESB，Test，Mock等系统集成，普通服务的提供方和消费方，宜采用其他配置方式。API的属性与配置项一一对应，如：ApplicationConfig.setName("hello")对应<dubbo:application name="hello"/>。
#### 服务提供者
```java
package life.qzz.dubbodemo.api.impl;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ProtocolConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.config.ServiceConfig;
import life.qzz.dubbodemo.api.DemoService;

import java.io.IOException;

public class App {
    public static void main(String[] args) throws IOException {
        /*ApplicationContext context = new ClassPathXmlApplicationContext("provider.xml");
        System.in.read();*/

        DemoService demoService = new DemoServiceImpl();
       //应用配置
        ApplicationConfig applicationConfig = new ApplicationConfig("hello");

        //注册中心配置
        RegistryConfig registryConfig = new RegistryConfig("zookeeper://localhost:2181");

        //协议配置
        ProtocolConfig protocolConfig = new ProtocolConfig("dubbo",20880);

        //服务配置
        ServiceConfig<DemoService> serviceConfig = new ServiceConfig<>();
        serviceConfig.setInterface(DemoService.class);
        serviceConfig.setRef(demoService);
        serviceConfig.setProtocol(protocolConfig);
        serviceConfig.setRegistry(registryConfig);
        serviceConfig.setApplication(applicationConfig);
        serviceConfig.export();
        System.in.read();
    }
}
```

#### 服务消费者
```java
package life.qzz;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import life.qzz.dubbodemo.api.DemoService;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
       /* System.out.println( "Hello World!" );
        new ClassPathXmlApplicationContext("consumer.xml").getBean(DemoController.class).sayHello("qzzz");*/

        //应用配置
        ApplicationConfig applicationConfig = new ApplicationConfig("hello");

        //注册中心配置
        RegistryConfig registryConfig = new RegistryConfig("zookeeper://localhost:2181");


        //引用配置
        ReferenceConfig<DemoService> r = new ReferenceConfig<>();
        r.setInterface(DemoService.class);
        r.setRegistry(registryConfig);
        r.setApplication(applicationConfig);
        DemoService service = r.get();//注意：此代理对象内部封装了所有通讯细节，对象较重，请缓存复用
        System.out.println( service.sayHello("qzz"));
    }
}

```

#### 特殊场景
##### 方法级配置
```java
// 方法级配置
List<MethodConfig> methods = new ArrayList<MethodConfig>();
MethodConfig method = new MethodConfig();
method.setName("sayHello");
method.setTimeout(10000);
method.setRetries(0);
methods.add(method);

// 引用远程服务
ReferenceConfig<DemoService> reference = new ReferenceConfig<DemoService>(); // 此实例很重，封装了与注册中心的连接以及与提供者的连接，请自行缓存，否则可能造成内存和连接泄漏

reference.setMethods(methods); // 设置方法级配置
```

##### 点对点直连
```java
ReferenceConfig<DemoService> reference = new ReferenceConfig<DemoService>(); // 此实例很重，封装了与注册中心的连接以及与提供者的连接，请自行缓存，否则可能造成内存和连接泄漏
// 如果点对点直连，可以用reference.setUrl()指定目标地址，设置url后将绕过注册中心，
// 其中，协议对应provider.setProtocol()的值，端口对应provider.setPort()的值，
// 路径对应service.setPath()的值，如果未设置path，缺省path为接口名
reference.setUrl("dubbo://localhost:20880/com.xxx.XxxService"); 
```

官方文档上说`ServiceConfig`，`ReferenceConfig`为重对象，内部封装了与注册中心的连接，以及与服务提供者的连接，需要缓存，否则会造成内存和连接泄露。这里有点儿疑问：
1. 需要暴露多个服务的时候需要new 多个ServiceConfig实例，每个实例中者封装了与注册中心的连接。这个应该没毛病，每个服务可以使用不一样的注册中心。个人觉得`ApplicationConfig`,`RegistryConfig`,`ProtocolConfig`这些实例应该单独实例化之后，再设置到`ServiceConfig`，`ReferenceConfig`中去比较好吧，因为`ApplicationConfig`这些只需要初始化一次之后，可以在多个`ServiceConfig`和`ReferenceConfig`中引用，不需要在每个`ServiceConfig`，`ReferenceConfig`配置的过程中初始化。
2. 在什么样的情况下需要获取这些实例？一般服务暴露出去之后这个实例也就用不上了吧？在做系统集成的时候如果需要管理这些Service的话，应该是需要拿到这些配置对象的。

[demo地址](https://github.com/qzzsunly/dubbodemo/blob/master/demo0)

### 注解配置
dubbo 2.2.1以上版本开始支持注解配置。
#### 服务提供方注解
```java

import com.alibaba.dubbo.config.annotation.Service;
import life.qzz.dubbodemo.api.DemoService;

//暴露服务
@Service(version = "1.0")
public class DemoServiceImpl implements DemoService{
    public String sayHello(String name) {
        return "hello :" + name;
    }
}

```
配置：

```xml
<dubbo:application name="hello-app"/>
<dubbo:protocol name="dubbo" port="20880"/>
<dubbo:registry address="zookeeper://localhost:2181"/>
<!-- 扫描注解包路径，多个包用逗号分隔，不填pacakge表示扫描当前ApplicationContext中所有的类 -->
<dubbo:annotation package="life.qzz.dubbodemo"/>
```

#### 服务消费方注解
```java
@Component
public class DemoController {
    @Reference(version = "1.0")//引用服务
    private DemoService demoService;
    public void sayHello(String name){
        System.out.println(demoService.sayHello(name));
    }
}
```

配置：

```xml
<dubbo:application name="hello-app"/>
<dubbo:registry address="zookeeper://localhost:2181"/>
<!-- 扫描注解包路径，多个包用逗号分隔，不填pacakge表示扫描当前ApplicationContext中所有的类 -->
<dubbo:annotation package="life.qzz.dubbodemo"/>
```

也可以使用spring的component-scan：

```xml
<dubbo:annotation />
<context:component-scan base-package="life.qzz.dubbodemo">
    <context:include-filter type="annotation" expression="com.alibaba.dubbo.config.annotation.Service" />
</context:component-scan>
```

[demo地址](https://github.com/qzzsunly/dubbodemo/tree/master/demo2)