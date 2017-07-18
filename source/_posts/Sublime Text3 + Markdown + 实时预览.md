---
title: Sublime Text3 + Markdown + 实时预览
date: 2017-07-17 19:33:52
tags:
---

安装准备：

找到菜单栏：`Preferences` → `Package Control` → `Package Control:Install Package`；
没有找到`Package Control`，那么点击`Package Control` 安装吧，安装完重启Sublime。
安装过程：

需要两款插件：`Markdown Editing` + `MarkdownLivePreview`；  
在`Package Control` → `Install Package`中输入两款插件的名字，找到相应插件，点击即可自动完成安装，安装完重启Sublime；
简单设置：`Preferences` → `Package Settings` → `MarkdownLivePreview` → Setting，打开后将左边default的设置代码复制到右边User栏，找到`markdown_live_preview_on_open`: false,把false改为`true`，保存。  
使用方法：
使用Sublime新建一个文件，右下角选择编辑方式为“Markdown”，将其保存为.md文件，选择保存位置并单击确定，此时自动弹出Markdown文本编辑框（左）和预览框（右），然后就开始愉快地编辑吧。

**注意**

若保存.md文件时无法保存到当前文件夹，可安装AdvancedNewFile插件，方法与前面两款插件相同，并且进行设置，同样将default的设置代码复制到User，找到"default_root": "project_folder",，把project_folder改为current，保存。
