---
title: Idea 创建 Spring boot应用
tags:
  - Idea
  - Spring Boot
abbrlink: 361c
date: 2017-04-22 23:23:29
---
Idea 号称开发JAVA 最智能的工具，下面就利用它来创建一个`Spring Boot` 应用。
#### 创建项目
1. 选择 `Create New Project`  
![step1](http://ooll8xqpq.bkt.clouddn.com/springboot_step1.png)

2. 利用Spring Initializr来初始化`Spring` 相关的框架
网络状况好的情况下利用这个工具可以可视化地选择使用的框架，勾选即可。选择所安装的Jdk ，没有的话就`New`一个。
![step2](http://ooll8xqpq.bkt.clouddn.com/springboot_step2.png)
3. 配置一些项目的基本信息
![step3](http://ooll8xqpq.bkt.clouddn.com/springboot_step3.png)
这里创建`maven` 项目（`type` 选择第一个，会生成完整的`maven`项目），输入`groudId`，`artifactId`，然后选择下一步。
4. 选择需要用到的框架  
- 左侧是功能的分类
- 中间是具体的功能
- 右侧是选中后的功能，点`x`可以取消
- 下部是相关的文档，可以打开在线文档
- 左上侧可以进行搜索  
完成之后点击下一步
![step4](http://ooll8xqpq.bkt.clouddn.com/springboot_step5.png)

5. 补充项目保存的目录，以及项目名称
![step5](http://ooll8xqpq.bkt.clouddn.com/springboot_step6.png)
6. 确认之后创建项目。
一番等待之后就会创建好整个项目，idea会生成maven相关的目录结构，会创建好一个`run/debug`，这取决于网速。创建好之后就可以点击运行了。