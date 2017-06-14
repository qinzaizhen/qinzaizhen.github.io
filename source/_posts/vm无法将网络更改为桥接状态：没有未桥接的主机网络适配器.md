---
title: vm无法将网络更改为桥接状态：没有未桥接的主机网络适配器
date: 2017-06-14 15:10:36
tags: [vm, 桥接]
---
使用`桥接模式`，虚拟机与物理机是在一个网段，可以互相ping 通。`NAT`模式下主机无法ping通虚拟机。
在更改为桥接模式时出现以下错误
> **设备vmnet0上的网桥没有运行**

解决办法如下：
> vm 的编辑菜单下“虚拟网络编辑器”

![image](http://ooll8xqpq.bkt.clouddn.com/net.png)

我出现的情况是VMnet0不存在，这个时候点击`还原默认设置`，让vm重新生成虚拟网卡。

另：
点击网卡更改为`桥接模式`时出现`无法将网络更改为桥接状态：没有未桥接的主机网络适配器`，也可以点击`还原默认设置`。

如果恢复默认后还是不行，试一下下面的方案（未测试）:
1. 打开物理网卡的属性窗口检查是否安装并选中了“VMWare Bridge protocol”。
2. 若没有，点击：安装—服务—从磁盘安装(C:Program FilesVMWare Workstationnetbridge.inf)，选中对话框的“VMware Bridge Protocol”完成安装。若该服务未出现，可能是VMWare软件安装不正确，需要重装。
3. 打开Virtual Network Editor，查看桥接绑定物理卡是否成功。若否，须启动vmnet bridging 驱动，打开命令行窗口，输入：net start vmnetbridge；或者重启计算机自启动该驱动。