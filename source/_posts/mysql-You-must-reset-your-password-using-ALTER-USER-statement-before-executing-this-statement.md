---
title: >-
  mysql - You must reset your password using ALTER USER statement before
  executing this statement
tags:
  - mysql
  - alter user
abbrlink: '7521'
date: 2018-08-28 10:54:00
---

新安装的mysql服务器，执行任何命令都报以下错误：
```
You must reset your password using ALTER USER statement before executing this statement.
```
意思是必须得先修改默认密码才能执行命令。
解决方法：

修改密码。直接使用`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';`报同样的错，使用`SET PASSWORD=PASSWORD('123456');` 这种方式报这个错误`You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'PASSWORD('123456')' at line 1
`。可以使用另外一种`alter user user() identified by "123456";`
