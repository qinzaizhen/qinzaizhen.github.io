---
title: 使用httpclient 4.3发送post请求
tags:
  - java
  - httpclient4
abbrlink: a7d9
date: 2017-04-18 13:55:00
---

###  单一类型的参数

示例：
```java
    
    HttpPost httpPost = new HttpPost("http://www.baidu.com");
    httpPost.setHeader("Accept-Language", "zh-cn,zh;q=0.5");
    httpPost.setHeader("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.7");
    httpPost.setHeader("Connection", "keep-alive");
    httpPost.addHeader("Content-type", "application/json; charset=utf-8");
    httpPost.setHeader("Accept", "application/json");
    httpPost.setEntity(new StringEntity(jsonParam, APPLICATION_JSON));
    System.out.println(EntityUtils.toString(HttpClients.createDefault().execute(httpPost).getEntity()));//打印响应结果
```


大致步骤：
1. 构造HttpPost实例，参数是请求地址
2. 添加一些基本的head，比如字符集之类的
3. 添加参数

HttpClient 框架将请求参数封装在`HttpEntity` 接口中, 常用的有`StringEntity`、`UrlEncodedFormEntity`、`FileEntity`、`InputStreamEntity`等。

##### StringEntity
可以用来构造字符串类型的参数。内部使用了一个数组来保存数据。
比如构造一个表单`application/x-www-form-urlencoded`："a=1&b=2"。当然`UrlEncodedFormEntity`进一步做了封装，用来构造表单。再如发送json格式的参数，需要将json转成String。

##### UrlEncodedFormEntity
继承自`StringEntity`。对`StringEntity` 做了进一步的封装，构造函数中使用集合来作为参数，避免了参数的拼接，并且设置了`Content-Type=application/x-www-form-urlencoded`.

##### FileEntity
将文件作为参数发送到服务端。
构造函数中使用一个file来接收本地文件。


##### InputStreamEntity
将流作为参数发送到服务端。可以是文件流，以及byte array 等其他形式的流，只要服务端能解析即可。


### 多种类型的参数
如果你的参数中既有文件，又有普通的字符参数，上述方式就无法满足了。
这个时候需要使用`MultipartFormEntity`,但是无法直接使用，需要用到`MultipartEntityBuilder`来构建。  

示例：
```java
    MultipartEntityBuilder multiEntity = MultipartEntityBuilder.create();
    URLConnection imgConn = new URL("http://www.baidu.com/test.jpg").openConnection();
    multiEntity.addPart("image", new InputStreamBody(imgConn.getInputStream(),"image"));
    multiEntity.addPart("face_image_type",new StringBody("raw_image", ContentType.TEXT_PLAIN));//默认字符集不是utf-8，需要注意
    multiEntity.addPart("idcard_name",new StringBody(idCardName, ContentType.parse("text/plain;charset=UTF-8")));
    httpPost.setEntity(multiEntity.build());//调用build方法
    HttpResponse httpResponse = HttpClients.createDefault().execute(httpPost);
```

我这里添加了一个流参数用来上传文件，一个字符串参数。有时候我们上传的文件是来自网络的，那就需要使用流了。如果是使用本地文件，则可以使用`FileBody`。