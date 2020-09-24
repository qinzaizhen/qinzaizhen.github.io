---
title: vm添加新的硬盘
tags:
  - vm
  - 硬盘
abbrlink: '5e2'
date: 2017-06-14 11:17:16
---
启动虚拟机，进入打开终端，输入：fdisk –l 然后就可以看到已经发现了新的硬盘，大小为：2147MB。
然后输入：fdisk/dev/sdb 给新硬盘分区输入n ，进行分区，让我们选择1-4，那我们可以选择1
然后就一直回车。
当出现：Command (m for help):后再输入W ，存盘退出fdisk模式，完成后，我们对新硬盘进行格式化，输入Mkfs –t ext3 /dev/sdb出现Proceed anyway？（y，n）时，这时输入“Y”回车。    
格式化完成后，我们要做的就是对新硬盘设定挂载点,可以新建目录，例如：mkdir /newdisk然后把新硬盘挂载到这个位置：mount /dev/sdb /newdisk 挂载好了，查看一下：df 
12
还没有结束，我们要让系统重启后会自动挂载新硬盘，编辑：vi /etc/fstab 按Insert键插入一行：/dev/sdb /newdisk ext3 defaults 0 0 ，输入完毕后Esc :wq保存退出，新硬盘也就添加完毕了。