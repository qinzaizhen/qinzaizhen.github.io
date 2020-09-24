---
title: mac环境feign访问服务出现超时
tags:
  - spring cloud
  - feign
abbrlink: 794f
date: 2017-12-12 09:20:44
---

配置文件中注册服务时的地址都是用的`localhost`,但是eureka显示的都是用的主机名称，导致会出现访问超时的情况。将主机名称和配置文件里面的域名匹配之后就可以了。修改主机名称可以在
1. `系统设置`->`共享`。
2. `scutil --set HostName qin.local`
里面修改