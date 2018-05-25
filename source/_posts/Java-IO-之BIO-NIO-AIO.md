---
title: 'Java IO 之BIO,NIO,AIO'
date: 2018-03-28 11:04:25
tags: [IO,BIO,NIO,AIO]
---
# Java IO概要
Java 的核心库java.io提供了全面的IO接口。包括：文件读写、标准设备输入输出等。JAVA中IO是以流为基础进行输入输出的，所有数据被串行化写入输出流，或者从输入流中读入。

JAVA IO主要包括三个部分：
1. 流式部分 - IO的核心部分
2. 非流式部分 - 主要包含一些辅助流式部分的类，如：`File`、`RandomAccessFile`和 `FileDescriptor`等类
3. 其他类 - 文件读取部分与安全相关的类，如：`SerializablePermission`类，以及与本地操作系统相关的文件系统的类，如：`FileSystem`类、`Win32FileSystem`和`WinNtFileSystem`类。

## Java IO中常用的类
1. `File`: 对文件或目录的抽象，封装了描述信息和常用操作，如创建文件，修改文件名，删除文件，生成新目录，判断文件所在路径等。
2. `InputStream`：抽象类，基于字节的输入操作，是所有输入流的父类。
3. `OutputStream`: 抽象类，基于字节的输出操作，是所有输出流的父类。
4. `Reader`: 抽象类，基于字符的输入操作。
5. `Writer`: 抽象类，基于字符的输出操作。
6. `RandomAccessFile`: 随机文件操作，是一个独立的类，直接继承自Object，功能丰富，可以从文件的位置进行存取操作。

## 常用Java流类的类结构图
![image](http://ooll8xqpq.bkt.clouddn.com/IO%E6%B5%81.png)

## 流的概念和作用
 流：
 > 代表任何有能力产出数据的数据源对象或者是有能力接收数据的数据端对象 -- Thinking in Java

流的本质：数据传输，根据数据传输特性将流抽象为各种类，方便更直观的进行数据操作。
流的作用：为数据源和数据接收端建立一个输送通道。

Java将输入输出抽象为流，就好像水管，将两个容器连接起来。流是一组有顺序的，有起点和终点的字节集合，是对数据传输的总称或抽象。即数据在两设备间的传输称为流。

## Java IO所采用的模型:
Java的IO模型设计非常优秀，它使用`Decorator`模式，按功能划分。可以动态装配这些流，来获得想要的功能。如需要一个具有缓冲的文件输入流，则可以组合使用`FileInputStream`和`BufferedInputStream`。

## IO流的分类
- 根据处理数据类型的不同分为：字符流和字节流
- 根据数据流向不同分为：输入流和输出流
- 根据操作对象分为：
    1. 基本数据类型操作
    2. 对象序列化操作
    3. 转换
    4. 打印
    5. 文件操作
    6. 管道
    7. 数组操作
- 节点流和处理流：
    1. 节点流：直接与数据源相连，读入或读出。
    2. 处理流：与节点流一块使用，在节点流的基础上，再套接一层，套接在节点流上的就是处理流。

### 字符流和字节流
流序列中的数据既可以是未经加工的原始二进制数据，也可以是经一定编码处理后符合某种格式规定的特定数据。因此Java中的流分为两种：
1. 字节流：数据流中最小的数据单元是字节
2. 字符流：数据流中最小的数据单元是字符，Java的字符是Unicode编码的，一个字符占用两个字节。

字符流的由来：Java中字符是采用Unicode编码，一个字符是16位，即一个字符使用两个字节来表示。为了处理方便，Java中引入了处理字符的流。

#### 字节流
##### 输入字节流InputStream：
`FileInputStream`： 是三种基本的介质流，它们分别从Byte数组、StringBuffer、和本地文件中读取数据。
`ByteArrayInputStream`：
`PipedInputStream`： 是从与其它线程共用的管道中读取数据。`PipedInputStream`的一个实例要和`PipedOutputStream`的一个实例共同使用，共同完成管道的读取写入操作。主要用于线程操作。
`ObjectInputStream` 和所有`FilterInputStream` 的子类都是装饰流（装饰器模式的主角）

##### 输出字节流OutputStream：
`FileOutputStream`、`ByteArrayOutputStream`： 是两种基本的介质流，它们分别向本地文件和Byte数组中写入数据。
`PipedOutputStream`：是向与其它线程共用的管道中写入数据。
`ObjectOutputStream` 和所有`FilterOutputStream`的子类都是装饰流。

字节流的输入和输出对照图：
![字节流对比](http://ooll8xqpq.bkt.clouddn.com/%E5%AD%97%E8%8A%82%E6%B5%81%E5%AF%B9%E6%AF%94.jpg)


####  字符流
##### 字符输入流Reader
- `FileReader`：从文件中读取字符
- `PipedReader`：是从与其它线程共用的管道中读取数据
- `CharArrayReader` 、`StringReader` 是两种基本的介质流，它们分别将Char 数组、String中读取数据。
- `BufferedReader` 很明显就是一个装饰器，它和其子类负责装饰其它Reader 对象。
- `FilterReader` 是所有自定义具体装饰流的父类，其子类`PushbackReader` 对Reader 对象进行装饰，允许向缓存中填入字符之后重新读取。
- `InputStreamReader`： 是一个连接字节流和字符流的桥梁，它将字节流转变为字符流。`FileReader` 可以说是一个达到此功能、常用的工具类。Reader 中各个类的用途和使用方法基本和InputStream 中的类使用一致。后面会有Reader 与InputStream 的对应关系。

##### 字符输出流
- `FileWriter`: 向文件中写入字符
- `PipedWriter`:是向与其它线程共用的管道中写入数据
`CharArrayWriter`: CharArrayWriter、StringWriter 是两种基本的介质流，它们分别向Char 数组、String 中写入数据。
`BufferedWriter` 是一个装饰器，为Writer 提供缓冲功能。
`PrintWriter` 和`PrintStream` 极其类似，功能和使用也非常相似。
`OutputStreamWriter`： 是OutputStream 到Writer 转换的桥梁，它的子类FileWriter 其实就是一个实现此功能的具体类（具体可以研究一SourceCode）。功能和使用和OutputStream 极其类似，后面会有它们的对应图。

字符流的输入和输出对照图：
![字符流对比](http://ooll8xqpq.bkt.clouddn.com/%E5%AD%97%E7%AC%A6%E6%B5%81%E5%AF%B9%E6%AF%94.jpg)

##### 字符流和字节流的转换
有时候为了读取方便，需要进行字符流和字节流的转换操作，引此引入了转换流。转换流是字符流和字节流之间的桥梁，可以将读取到的字节数据经过指定编码转换成字符，也可以将读取到的字符数据经过解码转换成字节。

`InputStreamReader`:字符流转到字节流
```java
String fileName= "d:"+File.separator+"hello.txt";
File file=new File(fileName);
Writer out=new OutputStreamWriter(new FileOutputStream(file));
out.write("hello");
out.close();
```

`OutputStreamWriter`:字节流转到字符流
```java
String fileName= "d:"+File.separator+"hello.txt";
File file=new File(fileName);
Reader read=new InputStreamReader(new FileInputStream(file));
char[] b=new char[100];
int len=read.read(b);
System.out.println(new String(b,0,len));
read.close();
```

这两个流对象是字符体系中的成员，它们有转换作用，本身又是字符流，所以在构造的时候需要传入字节流对象进来。


### 输入流和输出流
根据数据的输入、输出方向的不同而将流分为输入流和输出流。

#### 输入流
程序从输入流读取数据。将源自外界键盘、文件、网络等的数据读入程序的通信通道。

#### 输出流
程序向输出流写入数据。将程序中的数据输出到外界（显示器、打印机、文件、网络等）的通信通道。

#### 特性
1. 先进先出，最先写入输出流的数据最先被输入流读取到。
2. 顺序存取，可以一个接一个地往流中写入一串字节，读出时也将按写入顺序读取一串字节 ，不能随机访问中间的数据。（**RandomAccessFile可以从文件的任意位置进行存取操作**）。
3. 只读或只写，每个流只能是输入流和输出流的一种，不能同时具备两个功能，输入流只进行读操作，对输出流只进行写操作。在一个数据传输通道中，如果既要写入数据，又要读取数据，则要分别提供两个流。

### 节点流和处理流
- 节点流：直接与数据源相连，读或写。
- 处理流：与节点流一块使用，在节点流的基础上，再套接一层，套接在节点流上的就是处理流。

为什么要有处理流？直接使用节点流，读写不方便，为了更快的读写，才有了处理流。

### 按数据源分类
![image](http://ooll8xqpq.bkt.clouddn.com/%E6%93%8D%E4%BD%9C%E5%AF%B9%E8%B1%A1%E5%AF%B9%E6%AF%94.jpg)

1. 对文件进行操作（节点流）：
- `FileInputStream`（字节输入流）
- `FileOutputStream`（字节输出流）
- `FileReader`（字符输入流）
- `FileWriter`（字符输出流）

2. 对管道进行操作（节点流）
- `PipedInputStream`（字节输入流）
- `PipedOutStream`（字节输出流）
- `PipedReader`（字符输入流）
- `PipedWriter`（字符输出流）

`PipedInputStream`的一个实例要和`PipedOutputStream`的一个实例共同使用，共同完成管道的读取写入操作。主要用于线程间的数据共享操作。

3. 字节/字符数组流（节点流）
- `ByteArrayInputStream`
- `ByteArrayOutputStream`
- `CharArrayReader`
- `CharArrayWriter`

在内存中开辟了一个字节或字符数组。如果需要临时的输出数据等可以用这几个流。

除了上述三种是节点流，其他都是处理流，需要跟节点流配合使用。

4. Buffered缓冲流（处理流）：
- `BufferedInputStream`
- `BufferedOutputStream`
- `BufferedReader`
- `BufferedWriter`

这些是带缓冲区的处理流，缓冲区的作用的主要目的是：避免每次和硬盘打交道，提高数据访问的效率。

5. 转换流（处理流）：
- `InputStreamReader`：把字节转换成字符；
- `OutputStreamWriter`：把字节转换成字符。

6. 基本类型数据流（处理流）：用于操作基本数据类型值。
- `DataInputStream`
- `DataOutputStream`

如果输出一个8字节的long类型或4个字节的float类型，那怎么办呢？可以一个字节一个字节输出，也可以把转换成字符串输出，但是这样转换费时间，若是直接输出该多好啊，因此这个数据流就解决了我们输出数据类型的困难。数据流可以直接输出float类型或long类型，提高了数据读写的效率。

7. 打印流（处理流）：
- `PrintStream`
- `PrintWriter`

一般是打印到控制台，可以控制打印的地方。

8. 对象流（处理流）：
- `ObjectInputStream`:对象反序列化
- `ObjectOutputStream`:对象序列化

把封装的对象直接输出，而不是一个个转换成字符串再输出。

9. 合并流（处理流）：
- `SequenceInputStream`：可以认为是一个工具类，将两个或者多个输入流当成一个输入流依次读取。

## Java IO流对象
### 输入字节流InputStream

1. `InputStream`是所有的输入字节流的父类，是一个抽象类。
### 输出字节流OutputStream
### 字符输入流Reader
### 字符输出流Writer
## 字符流的输入与输出的对应
## 字符流与字节流转换
## 字节流和字符流的区别
## File类
## RandomAccessFile类
## BIO编程
### 传统BIO通信模型图
### 传统BIO编程实例
## 伪异步I/O编程
### 伪异步I/O编程模型图
### 伪异步IO编程实例
# NIO编程
## 非常形象的实例
## 工作原理
## Java NIO和IO的主要区别
### 面向流与面向缓冲
### 阻塞与非阻塞IO
### NIO和IO如何影响应用程序的设计
## 通道 Channel
### Java NIO的通道与流区别
### Channel主要分类
### Channel的实现
#### FileChannel
##### 打开FileChannel
##### 从FileChannel读取数据
##### 向FileChannel写数据
##### 关闭FileChannel
##### FileChannel的position方法
##### FileChannel的size方法
##### FileChannel的truncate方法
##### FileChannel的force方法
##### transferFrom()
##### transferTo()
#### Channel简单实例
## 缓冲区 Buffer
### Buffer的基本用法
### Buffer的三个属性
### Buffer的类型
### Buffer的分配
### Buffer写数据
#### flip()方法
### Buffer中读取数据
#### rewind()方法
#### clear()与compact()方法
#### mark()与reset()方法
#### equals()
#### compareTo()方法
## 选择器（ Selector）
### Selector的创建
### Selector注册通道
### SelectionKey
### interest集合
### ready集合
### 附加对象
### 通过Selector选择通道
### selectedKeys()
### wakeUp()
### close()
## 分散（Scatter）/聚集（Gather）
### 分散/聚集的应用
## 通道实现
### 文件通道
### Socket管道
### Datagram 通道
## 管道（Pipe）
### 创建管道
### 向管道写数据
### 从管道读取数据
### 简单完整实例
# AIO编程
## NIO与AIO区别
- NIO是同步非阻塞的，AIO是异步非阻塞的
- 由于NIO的读写过程依然在应用线程里完成，所以对于那些读写过程时间长的，NIO就不太适合。而AIO的读写过程完成后才被通知，所以AIO能够胜任那些重量级，读写过程长的任务。