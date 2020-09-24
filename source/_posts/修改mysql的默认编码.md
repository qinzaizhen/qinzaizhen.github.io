---
title: 修改mysql的默认编码
tags:
  - mysql
  - 编码
abbrlink: 25a6
date: 2017-06-05 15:35:28
---
```shell
vi /etc/my.cnf
```

```
[mysqld]
character_set_server = utf8
[mysql]
default-character-set = utf8
```

mysql: 使用mysql命令时所需要的配置
mysqld: 数据库服务器需要的配置