---
title: dubbo学习4-集群容灾与负载均衡配置
date: 2017-07-27 21:38:39
tags: [dubbo, 集群, 负载均衡]
---

#### 集群配置
调用关系图：

![调用关系图](http://ooll8xqpq.bkt.clouddn.com/cluster.jpg)

- 这里的Invoker是Provider的一个可调用Service的抽象，Invoder封装了Provider的地址和Service接口信息。
- Direcotry代表多个Invoder，可以看成是List<Invoder>，但与List不同的是，它的值可能是动态变化的，比如注册中心推送变更。
- Cluster将Directory中的多个Invoder伪装成一个Invoder，对上层透明，伪装过程包含了容错逻辑，调用失败后，根据容错逻辑进行接下来的处理。
- Router负责从多个Invoder中按路由规则选出子集，比如读写分离，应用隔离等。
- LoadBalance负责从多个Invoder中选出具体的一个去进行调用，选的过程包含了负载均衡算法，调用失败后可能需要重选。

##### dubbo提供的容错模式
###### Failover Cluster 失败自动切换
- 当出现失败时，重试其他服务器（默认）
- 通常用于读操作，但重试会带来更长延迟
- 可通过`retries`来设置重试次数（不含第一次）

###### Failfast Cluster 快速失败
- 只发起一次调用，失败立即报错
- 通常用于非幂等性的操作，比如新增记录

###### Failsafe Cluster 失败安全
- 出现异常时直接忽略
- 通常用于写入审记日志等操作

###### Failback Cluster 失败自动恢复
- 后台记录失败请求，定时重发
- 通常用于消息通知操作

###### Forking Cluster 并行调用
- 并行调用多个服务器，只要一个成功即返回
- 通常用于实时性要求较高的读操作，但需要浪费更多服务资源
- 可以通过`forks` 来设置最大并行数

###### Broadcast Cluster 广播调用
- 广播调用所有提供者，逐个调用，任意一台报错则报错
- 通常用于通知所有提供者更新缓存或日志等本地资源信息

重试次数配置如：（failover模式生效）
```xml
<dubbo:service retries = "2"/>
```
或：
```xml
<dubbo:reference retries ="2"/>
```
或：
```xml
<dubbo:reference>
    <dubbo:method name ="sayHello" retries = "2"/>
</dubbo:reference>
```

集群模式配置如：
```xml
<dubbo:service cluster ="failsafe"/>
```

或：
```xml
<dubbo:reference cluster="failsafe"/>
```

##### 测试方法
提供了两个provider，代码基本一致，端口号不一样。为了能模拟失败的场景，设置了超时时间，并且在service的代码中加入了线程休眠。当进入service的方法中时，手动结束掉进程，观察consumer端的反应。

provider1：
```java
public class DemoServiceImpl implements DemoService {
    private static Logger logger = LoggerFactory.getLogger(DemoServiceImpl.class);
    public String sayHello(String name) {
        logger.debug("服务调用前");
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        logger.debug("服务调用开始");
        return "hello :" + name;
    }
}

dubbo.application.name=helloapp
dubbo.registry.address = zookeeper://localhost:2181
dubbo.protocol.name=dubbo
dubbo.protocol.port = 20880
```

provider2：
```java
public class DemoServiceImpl implements DemoService {
    private static Logger logger = LoggerFactory.getLogger(DemoServiceImpl.class);
    public String sayHello(String name) {
        logger.debug("调用Provider2的服务");
        logger.debug("休息20秒");
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "hello :" + name;
    }
}
dubbo.application.name=helloapp
dubbo.registry.address = zookeeper://localhost:2181
dubbo.protocol.name=dubbo
dubbo.protocol.port = 20881
```

consumer：
```xml
<dubbo:annotation package="life.qzz.dubbodemo"/>
<dubbo:reference interface="life.qzz.dubbodemo.api.DemoService" id="demoService" init="true" timeout="50000" retries="2"/>
```
```java
public void hello(String name) {
        logger.debug("服务返回结果：{}" , demoService.sayHello(name));

    }
```
###### 测试结果
1. failover
开始调用provider1，线程进行休眠，这时结束provider1的进程。
```
 [DubboServerHandler-10.96.2.111:20880-thread-5] DemoServiceImpl.sayHello(20) | 服务调用前
```

consumer出现了连接异常错误：
```java
Caused by: java.net.ConnectException: Connection refused: no further information: /10.96.2.111:20880
	at sun.nio.ch.SocketChannelImpl.checkConnect(Native Method)
	at sun.nio.ch.SocketChannelImpl.finishConnect(SocketChannelImpl.java:717)
	at org.jboss.netty.channel.socket.nio.NioClientBoss.connect(NioClientBoss.java:150)
	at org.jboss.netty.channel.socket.nio.NioClientBoss.processSelectedKeys(NioClientBoss.java:105)
	at org.jboss.netty.channel.socket.nio.NioClientBoss.process(NioClientBoss.java:79)
	at org.jboss.netty.channel.socket.nio.AbstractNioSelector.run(AbstractNioSelector.java:312)
	at org.jboss.netty.channel.socket.nio.NioClientBoss.run(NioClientBoss.java:42)
	... 3 more
```

但是consumer的方法还没结束，日志中打印了如下信息：
```java
com.alibaba.dubbo.rpc.cluster.support.FailoverClusterInvoker.doInvoke(FailoverClusterInvoker.java:79) WARN [main] FailoverClusterInvoker.doInvoke(79) |  [DUBBO] Although retry the method sayHello in the service life.qzz.dubbodemo.api.DemoService was successful by the provider 10.96.2.111:20881, but there have been failed providers [10.96.2.111:20880] (1/1) from the registry localhost:2181 on the consumer 10.96.2.111 using the dubbo version 2.8.4. 
```
provider1调用失败了，重新调用了provider2的方法。provider2打印出了日志，并且consumer也打印出了返回的信息。

consumer日志：
```java
life.qzz.dubbodemo.controller.DemoController.hello(DemoController.java:27) DEBUG [main] DemoController.hello(27) | 服务返回结果：hello :qzz
```

provider2日志：
```java
life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:20) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-2] DemoServiceImpl.sayHello(20) | 调用Provider2的服务
life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:21) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-2] DemoServiceImpl.sayHello(21) | 休息20秒
```

###### failsafe
provider的配置不用改，consumer的配置改为如下：
```xml
<dubbo:annotation package="life.qzz.dubbodemo"/>
<dubbo:reference interface="life.qzz.dubbodemo.api.DemoService" id="demoService" init="true" timeout="50000" cluster="failsafe"/>
```
超时之后出现错误，consumer打印出了null。
```java
com.alibaba.dubbo.rpc.cluster.support.FailsafeClusterInvoker.doInvoke(FailsafeClusterInvoker.java:50) ERROR [main] FailsafeClusterInvoker.doInvoke(50) |  [DUBBO] Failsafe ignore exception: Invoke remote method timeout.
life.qzz.dubbodemo.controller.DemoController.hello(DemoController.java:27) DEBUG [main] DemoController.hello(27) | 服务返回结果：null
```
并没有去调用另一个provider，我们的方法也没有抛出异常，也就是说错误没有在暴露给我们的方法。

###### failfast
出现了异常信息，consumer没有打印出日志，也就是说我们的方法出现了异常。
```java
Exception in thread "main" com.alibaba.dubbo.rpc.RpcException: Failfast invoke providers dubbo://10.96.2.111:20881/life.qzz.dubbodemo.api.DemoService?anyhost=true&application=helloapp&check=false&cluster=failfast&default.check=false&dubbo=2.8.4&generic=false&init=true&interface=life.qzz.dubbodemo.api.DemoService&methods=sayHello&pid=11248&side=consumer&timeout=50000&timestamp=1501137556130 RandomLoadBalance select from all providers [com.alibaba.dubbo.registry.integration.RegistryDirectory$InvokerDelegete@6950ed69, com.alibaba.dubbo.registry.integration.RegistryDirectory$InvokerDelegete@6dd7b5a3] for service life.qzz.dubbodemo.api.DemoService method sayHello on consumer 10.96.2.111 use dubbo version 2.8.4, but no luck to perform the invocation. Last error is: Invoke remote method timeout. method: sayHello, provider: dubbo://10.96.2.111:20881/life.qzz.dubbodemo.api.DemoService?anyhost=true&application=helloapp&check=false&cluster=failfast&default.check=false&dubbo=2.8.4&generic=false&init=true&interface=life.qzz.dubbodemo.api.DemoService&methods=sayHello&pid=11248&side=consumer&timeout=50000&timestamp=1501137556130, cause: Waiting server-side response timeout by scan timer. start time: 2017-07-27 14:39:17.073, end time: 2017-07-27 14:40:07.088, client elapsed: 25 ms, server elapsed: 49988 ms, timeout: 50000 ms, request: Request [id=0, version=2.0.0, twoway=true, event=false, broken=false, data=RpcInvocation [methodName=sayHello, parameterTypes=[class java.lang.String], arguments=[qzz], attachments={path=life.qzz.dubbodemo.api.DemoService, interface=life.qzz.dubbodemo.api.DemoService, version=0.0.0, timeout=50000}]], channel: 10.96.2.111:0 -> /10.96.2.111:20881
	at com.alibaba.dubbo.rpc.cluster.support.FailfastClusterInvoker.doInvoke(FailfastClusterInvoker.java:52)
	at com.alibaba.dubbo.rpc.cluster.support.AbstractClusterInvoker.invoke(AbstractClusterInvoker.java:227)
	at com.alibaba.dubbo.rpc.cluster.support.wrapper.MockClusterInvoker.invoke(MockClusterInvoker.java:72)
	at com.alibaba.dubbo.rpc.proxy.InvokerInvocationHandler.invoke(InvokerInvocationHandler.java:52)
	at com.alibaba.dubbo.common.bytecode.proxy0.sayHello(proxy0.java)
	at life.qzz.dubbodemo.controller.DemoController.hello(DemoController.java:27)
	at life.qzz.dubbodemo.Consumer.main(Consumer.java:20)
```

###### failback
虽然日志中打印出了等待重试，但是我没有在日志中发现具体的重试行为：
```java
com.alibaba.dubbo.rpc.cluster.support.FailbackClusterInvoker.doInvoke(FailbackClusterInvoker.java:104) ERROR [main] FailbackClusterInvoker.doInvoke(104) |  [DUBBO] Failback to invoke method sayHello, wait for retry in background. Ignored exception: Invoke remote method timeout.
```

在超时时间内将关掉的provider重新打开，直到consumer超时时，provider打印出了调用的信息，但是consumer打印出了null。
provider日志：
```java
2017-07-27 15:19:01 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:20) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-5] DemoServiceImpl.sayHello(20) | 调用Provider2的服务
2017-07-27 15:19:01 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:21) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-5] DemoServiceImpl.sayHello(21) | 休息20秒
```

consumer日志：
```java
2017-07-27 15:18:56 life.qzz.dubbodemo.controller.DemoController.hello(DemoController.java:27) DEBUG [main] DemoController.hello(27) | 服务返回结果：null
```
不晓得重试的机制是什么，超时的时候才重新发起请求么？

###### forking
consumer：
```xml
<dubbo:reference interface="life.qzz.dubbodemo.api.DemoService" id="demoService" init="true" timeout="60000" cluster="forking"/>
```
但是`forks`这个属性貌似不能加啊！！！

provider1：
```java
2017-07-27 15:36:09 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:20) DEBUG [DubboServerHandler-10.96.2.111:20880-thread-2] DemoServiceImpl.sayHello(20) | 服务调用前
2017-07-27 15:36:19 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:26) DEBUG [DubboServerHandler-10.96.2.111:20880-thread-2] DemoServiceImpl.sayHello(26) | 休息结束
2017-07-27 15:36:19 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:27) DEBUG [DubboServerHandler-10.96.2.111:20880-thread-2] DemoServiceImpl.sayHello(27) | 服务调用开始
```

provider2：
```java
2017-07-27 15:36:09 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:20) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-2] DemoServiceImpl.sayHello(20) | 调用Provider2的服务
2017-07-27 15:36:09 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:21) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-2] DemoServiceImpl.sayHello(21) | 休息20秒
2017-07-27 15:36:29 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:27) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-2] DemoServiceImpl.sayHello(27) | 休息结束
```

consumer：
```java
2017-07-27 15:36:19 life.qzz.dubbodemo.controller.DemoController.hello(DemoController.java:27) DEBUG [main] DemoController.hello(27) | 服务返回结果：hello :qzz
```

从时间先后顺序可以看到provider1返回之后consumer就得到了返回结果。

###### broadcast

provider1：
```java
2017-07-27 15:40:25 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:20) DEBUG [DubboServerHandler-10.96.2.111:20880-thread-6] DemoServiceImpl.sayHello(20) | 服务调用前
2017-07-27 15:40:35 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:26) DEBUG [DubboServerHandler-10.96.2.111:20880-thread-6] DemoServiceImpl.sayHello(26) | 休息结束
2017-07-27 15:40:35 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:27) DEBUG [DubboServerHandler-10.96.2.111:20880-thread-6] DemoServiceImpl.sayHello(27) | 服务调用开始
```

provider2：
```java
2017-07-27 15:40:35 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:20) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-6] DemoServiceImpl.sayHello(20) | 调用Provider2的服务
2017-07-27 15:40:35 life.qzz.dubbodemo.api.impl.DemoServiceImpl.sayHello(DemoServiceImpl.java:21) DEBUG [DubboServerHandler-10.96.2.111:20881-thread-6] DemoServiceImpl.sayHello(21) | 休息20秒
```

consumer：
```java
Exception in thread "main" com.alibaba.dubbo.rpc.RpcException: Invoke remote method timeout. method: sayHello, provider: dubbo://10.96.2.111:20881/life.qzz.dubbodemo.api.DemoService?anyhost=true&application=helloapp&check=false&cluster=broadcast&default.check=false&dubbo=2.8.4&generic=false&init=true&interface=life.qzz.dubbodemo.api.DemoService&methods=sayHello&pid=3028&side=consumer&timeout=60000&timestamp=1501141224739, cause: Waiting server-side response timeout. start time: 2017-07-27 15:40:35.559, end time: 2017-07-27 15:41:35.564, client elapsed: 0 ms, server elapsed: 60004 ms, timeout: 60000 ms, request: Request [id=1, version=2.0.0, twoway=true, event=false, broken=false, data=RpcInvocation [methodName=sayHello, parameterTypes=[class java.lang.String], arguments=[qzz], attachments={path=life.qzz.dubbodemo.api.DemoService, interface=life.qzz.dubbodemo.api.DemoService, version=0.0.0, timeout=60000}]], channel: 10.96.2.111:0 -> /10.96.2.111:20881
	at com.alibaba.dubbo.rpc.protocol.dubbo.DubboInvoker.doInvoke(DubboInvoker.java:99)
	at com.alibaba.dubbo.rpc.protocol.AbstractInvoker.invoke(AbstractInvoker.java:144)
	at com.alibaba.dubbo.monitor.support.MonitorFilter.invoke(MonitorFilter.java:75)
	at com.alibaba.dubbo.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.alibaba.dubbo.rpc.protocol.dubbo.filter.FutureFilter.invoke(FutureFilter.java:53)
	at com.alibaba.dubbo.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.alibaba.dubbo.rpc.filter.ConsumerContextFilter.invoke(ConsumerContextFilter.java:48)
	at com.alibaba.dubbo.rpc.protocol.ProtocolFilterWrapper$1.invoke(ProtocolFilterWrapper.java:91)
	at com.alibaba.dubbo.rpc.listener.ListenerInvokerWrapper.invoke(ListenerInvokerWrapper.java:74)
	at com.alibaba.dubbo.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:53)
	at com.alibaba.dubbo.rpc.cluster.support.BroadcastClusterInvoker.doInvoke(BroadcastClusterInvoker.java:51)
	at com.alibaba.dubbo.rpc.cluster.support.AbstractClusterInvoker.invoke(AbstractClusterInvoker.java:227)
	at com.alibaba.dubbo.rpc.cluster.support.wrapper.MockClusterInvoker.invoke(MockClusterInvoker.java:72)
	at com.alibaba.dubbo.rpc.proxy.InvokerInvocationHandler.invoke(InvokerInvocationHandler.java:52)
	at com.alibaba.dubbo.common.bytecode.proxy0.sayHello(proxy0.java)
	at life.qzz.dubbodemo.controller.DemoController.hello(DemoController.java:27)
	at life.qzz.dubbodemo.Consumer.main(Consumer.java:20)
```
provider1 在40:35秒结束，provider2开始执行，然后结束掉provider2的进程，consumer最终报错。
