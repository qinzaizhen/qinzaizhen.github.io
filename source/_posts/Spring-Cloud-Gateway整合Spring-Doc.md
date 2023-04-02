---
title: Spring Cloud Gateway整合Spring Doc
abbrlink: '5441'
date: 2023-04-02 20:49:15
tags:
---

# Spring Cloud Gateway整合Spring Doc

最近在新项目使用到了Spring Doc，支持open api 3.

## 依赖引入

使用Spring Doc 1.6.14版本。

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-ui</artifactId>
</dependency>
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-webflux-ui</artifactId>
</dependency>
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-common</artifactId>
</dependency>
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-webmvc-core</artifactId>
</dependency>
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-javadoc</artifactId>
</dependency>
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-springdoc-ui</artifactId>
    <version>3.0.3</version>
</dependency>
```



同时想在网关项目中整合所有的服务api文档。各个服务使用nacos注册，网关读取到注册的服务路由，并初始化swagger的访问路径。

```java
@Bean("swaggerRouteRefreshListener")
public ApplicationListener<RefreshRoutesEvent> routeRefreshListener(RouteDefinitionLocator locator){
    return new ApplicationListener<RefreshRoutesEvent>() {
        @Override
        public void onApplicationEvent(RefreshRoutesEvent event) {
            routeDefinitionLocator.getRouteDefinitions().collectList().subscribe(definitions -> {

                definitions.forEach(routeDefinition -> {
                    //注册的服务id都是特定前缀的 ReactiveCompositeDiscoveryClient_
                    String group = routeDefinition.getId().replace(DISCOVERY_CLIENT_ID_PRE, "").toLowerCase();
                    AbstractSwaggerUiConfigProperties.SwaggerUrl swaggerUrl = new AbstractSwaggerUiConfigProperties.SwaggerUrl(
                        group,
                        routeDefinition.getUri().toString().replace("lb://", "").toLowerCase() + "/v3/api-docs",
                        //displayName 是添加进nacos的自定义元数据，设置成中文，方便识别
                        routeDefinition.getMetadata().getOrDefault("displayName", "").toString()
                    );
                    Set<AbstractSwaggerUiConfigProperties.SwaggerUrl> urls = swaggerUiConfigProperties.getUrls();
                    if (urls == null) {
                        urls = new LinkedHashSet<>();
                        swaggerUiConfigProperties.setUrls(urls);
                    }
					//可以判断一下是不是已经加过了。
                    urls.add(swaggerUrl);

                });
            });
        }
    };
}
```

## 

## 处理knife4j

如果使用knife4j作为页面展示，需要处理一下basePath。在openapi3里面貌似没有这个元素了。仅针对knife4j处理。

创建一个gateway filter，在返回值中加上basePath。

```java
public class SwaggerGlobalFilter implements GlobalFilter, Ordered {
    public Mono filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().toString();
        String host = request.getLocalAddress().getHostString();
        int port = request.getLocalAddress().getPort();
        if (!path.endsWith("/v3/api-docs")) {
            return chain.filter(exchange);
        }
        String[] pathArray = path.split("/");
        String basePath = pathArray[1];
        ServerHttpResponse originalResponse = exchange.getResponse();

        ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(originalResponse) {
            @Override
            public Mono<Void> writeWith(Publisher<? extends DataBuffer> body) {
                if (super.getStatusCode().equals(HttpStatus.OK) && body instanceof Flux) {
                    Flux<? extends DataBuffer> fluxBody = Flux.from(body);
                    return super.writeWith(fluxBody.buffer().map(dataBuffers -> {
                        List<String> list = new ArrayList<>();
                        dataBuffers.forEach(dataBuffer -> {
                            byte[] content = new byte[dataBuffer.readableByteCount()];
                            dataBuffer.read(content);
                            DataBufferUtils.release(dataBuffer);
                            list.add(new String(content, Charset.forName("UTF-8")));
                        });
                        String s = this.listToString(list);
                        JSONObject jsonObject = JSONUtil.parseObj(s);

                        jsonObject.put("host", host + ":" + port);
                        jsonObject.put("basePath", basePath);
                        s = jsonObject.toString();
                        //设置更新后的header请求头长度
                        int length = s.getBytes().length;
                        HttpHeaders headers = originalResponse.getHeaders();
                        headers.setContentLength(length);
                        return bufferFactory().wrap(s.getBytes(Charset.forName("UTF-8")));
                    }));
                }
                return super.writeWith(body);
            }

            @Override
            public HttpHeaders getHeaders() {
                //获取父类原始ServerHttpResponse的header请求头信息，这是代理Delegate类型
                HttpHeaders httpHeaders = super.getHeaders();
                httpHeaders.set(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8");
                return httpHeaders;
            }

            private String listToString(List<String> list) {
                StringBuilder stringBuilder = new StringBuilder();
                for (String s : list) {
                    stringBuilder.append(s);
                }
                return stringBuilder.toString();
            }
        };

        // replace response with decorator
        return chain.filter(exchange.mutate().response(decoratedResponse).build());
    }

    public int getOrder() {
        return -2;
    }
}
```

## 附：Nacos添加自定义meta数据

```java
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties
@ConditionalOnClass({ NacosDiscoveryProperties.class})
public class NacosConfigDocAutoConfiguration {

   @Autowired(required = false)
   private NacosDiscoveryProperties properties;

   @Value("${spring.application.displayName:${spring.application.name}}")
   private String displayName;

   @PostConstruct
   public void init() throws Exception {
      properties.getMetadata().put("displayName", displayName);
      properties.init();
   }

}
```