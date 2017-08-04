---
title: dubbo学习5-restfull接口
date: 2017-08-04 22:23:25
tags: [dubbo, restfull]
---
#### 使用jax-rs和dubbo来搭建restfull接口
##### 需要用到的框架：
- jax-rs
- dubbo
- resteasy-client
- org.mortbay.jetty(因为dubbo支持的jetty版本比较老)

##### 完整的pom文件：
```xml
<dependencies>
    <dependency>
        <groupId>org.jboss.resteasy</groupId>
        <artifactId>jaxrs-api</artifactId>
        <version>3.0.12.Final</version>
    </dependency>
    <dependency>
        <groupId>org.jboss.resteasy</groupId>
        <artifactId>resteasy-client</artifactId>
        <version>3.1.4.Final</version>
    </dependency>
    <!--<dependency>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-server</artifactId>
        <version>9.4.0.M1</version>
    </dependency>
    <dependency>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-webapp-logging</artifactId>
        <version>9.0.0</version>
    </dependency>-->
    <dependency>
        <groupId>org.mortbay.jetty</groupId>
        <artifactId>jetty</artifactId>
        <version>6.1.26</version>
    </dependency>

    <dependency>
        <groupId>javax.validation</groupId>
        <artifactId>validation-api</artifactId>
        <version>1.1.0.Final</version>
    </dependency>
    <!--<dependency>
        <groupId>io.netty</groupId>
        <artifactId>netty-all</artifactId>
        <version>4.1.13.Final</version>
    </dependency>-->
    <dependency>
        <groupId>life.qzz</groupId>
        <artifactId>demo5.api</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```

###### provider: 
```java
@Path("demo")
public class DemoServiceImpl implements DemoService {
    private static Logger logger = LoggerFactory.getLogger(DemoServiceImpl.class);

    @Path("hello")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String sayHello(String name) {
        logger.debug("服务调用开始");
        return "{\"message\": \"hello\"}";
    }
}
```

###### dubbo的配置：
dubbo.properties
```properties
dubbo.application.name=helloapp
dubbo.registry.address = zookeeper://localhost:2181
dubbo.protocol.name=rest
dubbo.protocol.port = 20880
```
**在dubbo.properties中指定协议为`rest`不起作用，需要在xml中指定。**

```xml
<!-- 需要在这里指定协议,默认的server为jetty-->
<dubbo:protocol name="rest" port="20880"/>
<dubbo:service interface="life.qzz.dubbodemo.api.DemoService" ref="demoService"/>
<bean id="demoService" class="life.qzz.dubbodemo.api.impl.DemoServiceImpl"/>
```

使用postman发起请求：`http://localhost:20880/demo/hello`，返回结果为：

```json
{"message": "hello"}
```
这里简单地返回了一个字符串，如果要像spring mvc一样自动将返回对象序列化，得自己实现，会报下面的异常。
```java
org.jboss.resteasy.core.NoMessageBodyWriterFoundFailure: Could not find MessageBodyWriter for response object of type: life.qzz.dubbodemo.api.User of media type: application/json
```

如要使用jackson来序列化Json，加入以下依赖：
```xml
<dependency>
    <groupId>org.jboss.resteasy</groupId>
    <artifactId>resteasy-jackson-provider</artifactId>
    <version>3.1.4.Final</version>
</dependency>
```


