---
title: 备份hexo代码
date: 2017-04-18 17:22:07
tags: [hexo]
---

hexo git 只会将生成的页面提交到git中，为了保存hexo所做的修改以及文章的源文件，我们需要将hexo 和文章的源文件也保存到我们的git中。
1. 创建一个hexo 分支用来保存我们的hexo和源文件，并且设置成默认分支，因为我们主要管理此分支，设为默认比较方便。
![image](http://ooll8xqpq.bkt.clouddn.com/github_branch_settiongs.png)
创建之后选中，并点击`update`按钮。
2. 将仓库克隆下来，执行`npm install hexo`、`hexo init`、`npm install` 和 `npm install hexo-deployer-git`。 **注意：`hexo init`会删除目录中.git文件，因此先复制到别处，执行完`hexo init` 后再拷备回来。**
3. 修改博客根目录中的`_config.yml`。
![image](http://ooll8xqpq.bkt.clouddn.com/deploy.png)
指定分支为master，这个分支用来保存发布后的页面。因为github 仓库是个人账号类型的，得放在master分支上。
4. 执行完成之后就可以进行常规的git操作了，如`git add .`、`git commit` 、`git push`。