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
- `InputStream`是所有的输入字节流的父类，是一个抽象类。
- `FileInputStream`： 是三种基本的介质流，它们分别从Byte数组、StringBuffer、和本地文件中读取数据。
- `ByteArrayInputStream`：
- `PipedInputStream`： 是从与其它线程共用的管道中读取数据。`PipedInputStream`的一个实例要和`PipedOutputStream`的一个实例共同使用，共同完成管道的读取写入操作。主要用于线程操作。
`ObjectInputStream` 和所有`FilterInputStream` 的子类都是装饰流（装饰器模式的主角）

###### InputStream中的三个基本的读方法
1. abstract int read(): 读取一个字节数据，并返回读到的数据，如果返回`-1`，表示读到了输入流的末尾。
2. int read(byte[] b): 将数据读入到字节数据，同时返回实际读取的字节数。如果返回`-1`，表示读到了输入流的末尾
3. int read(byte b[], int off, int len)： 将数据读入一个字节数组，同时返回实际读取的字节数。如果返回`-1`，表示读到了输入流的末尾。`off`指定在数据b中存放数据的起始偏移位置，`len`指定读取的最大字节数。

**流结束的判断：方法`read()`的返回值为`-1`时，`readLine()`的返回值为`null`时。**

###### 其他方法
1. long skip(long n): 在输入流中跳过n个字节，并返回实际跳过的字节数。
2. int available(): 返回在不发生阻塞的情况下，可读取的字节数。
3. void close(): 关闭输入流，释放和这个流相关的系统资源。
4. void mark(int readlimit): 在输入流的当前位置放置一个标记，如果读取的字节数多于`readlimit`设置的值，则流忽略这个标记。
5. void reset() ：返回到上一个标记。
6. boolean markSupported() ：测试当前流是否支持`mark`和`reset`方法。如果支持，返回`true`，否则返回`false`。


##### 输出字节流OutputStream：
- `OutputStream`是所有的输出字节流的父类，它是一个抽象类。
- `FileOutputStream`、`ByteArrayOutputStream`： 是两种基本的介质流，它们分别向本地文件和Byte数组中写入数据。
- `PipedOutputStream`：是向与其它线程共用的管道中写入数据。
- `ObjectOutputStream` 和所有`FilterOutputStream`的子类都是装饰流。

###### OutputStream中的三个基本的写方法
- abstract void write(int b): 往输出流中写入一个字节。 写入的是`b`的低8位，剩余的24位高位将会忽略。
- void write(byte[] b): 往输出流中写入数组b中的所有字节。
- void write(byte[] b, int off, int len): 往输出流中写入数组b中从偏移量`off`开始的`len`个字节的数据。

###### 其他方法
- void flush(): 刷新输出流，强制缓冲区中的字节被写出。
- void close(): 关闭输出流，释放和这个流相关的系统资源。

字节流的输入和输出对照图：
![字节流对比](http://ooll8xqpq.bkt.clouddn.com/%E5%AD%97%E8%8A%82%E6%B5%81%E5%AF%B9%E6%AF%94.jpg)
图中蓝色的为主要的对应部分，红色的部分就是不对应部分。从上面的图中可以看出JavaIO中的字节流是极其对称的。下面看看几个不对称的几个类

1. `LineNumberInputStream` 主要完成从流中读取数据时，会得到相应的等号，到于什么时候分行、在哪里分行是由该类主动确定的，并不是原始流中有这样一个行号。在输出部分没有对应的部分，我们完全可以自己建立一个`LineNumberOutputStream`，在最初写入时会有一个基准的行号，以后每次遇到换行时会在下一行添加一个行号。(由于该类错误地认为这些字节完全代表的是字符，从1.1开始已经废弃了，使用`LineNumberReader`)
2. `PushbackInputStream`的功能是查看读取的字节，不满意就重新放入输入流再次读取。主要用在编译器的语法、记法分析部分。
3. `StringBufferInputStream` 已经被Deprecated。
4. `SequenceInputStream` 可以认为是一个工具类，将两个或者多个输入流当成一个输入流依次读取。
5. `PrintStream` 也可以认为是一个辅助工具。主要可以向其他输出流，或者FileInputStream写入数据，本身内部实现还是带缓冲的。`System.out`和`System.out`就是`PrintStream`的实例！

####  字符流
##### 字符输入流Reader
- `Reader`是所有的输入字符流的父类，它是一个抽象类。
- `FileReader`：从文件中读取字符
- `PipedReader`：是从与其它线程共用的管道中读取数据
- `CharArrayReader` 、`StringReader` 是两种基本的介质流，它们分别将Char 数组、String中读取数据。
- `BufferedReader` 很明显就是一个装饰器，它和其子类负责装饰其它Reader 对象。
- `FilterReader` 是所有自定义具体装饰流的父类，其子类`PushbackReader` 对Reader 对象进行装饰，允许向缓存中填入字符之后重新读取。
- `InputStreamReader`： 是一个连接字节流和字符流的桥梁，它将字节流转变为字符流。`FileReader` 可以说是一个达到此功能、常用的工具类。Reader 中各个类的用途和使用方法基本和InputStream 中的类使用一致。后面会有Reader 与InputStream 的对应关系。

###### 主要方法
- int read() throws IOException: 读取一个字符，返回值为读取的字符
- int read(char[] cbuf) throws IOException: 读取一组字符到数据cbuf[]中，返回值为实际读取的字符的数量
- abstract int read(char[] cbuf, int off, int len) throws IOException: 读取`len`个字符，从数组`cbuf[]`的下标`off`处开始存放，返回值为实际读取的字符数量，该方法必须由子类实现。

##### 字符输出流
- `Writer`是所有的输出字符流的父类，它是一个抽象类
- `FileWriter`: 向文件中写入字符
- `PipedWriter`:是向与其它线程共用的管道中写入数据
- `CharArrayWriter`: CharArrayWriter、StringWriter 是两种基本的介质流，它们分别向Char 数组、String 中写入数据。
- `BufferedWriter` 是一个装饰器，为Writer 提供缓冲功能。
- `PrintWriter` 和`PrintStream` 极其类似，功能和使用也非常相似。
- `OutputStreamWriter`： 是OutputStream 到Writer 转换的桥梁，它的子类FileWriter其实就是一个实现此功能的具体类（具体可以研究源代码）。功能和使用和OutputStream 极其类似，后面会有它们的对应图。

###### 主要方法：
- void wirte(int c) thrwos IOException: 将整型值`c`的低`16`位写入输出流
- void write(char cbuf[]) throws IOException: 将字符数组`cbuf[]` 写入输出流
- abstract void write(char cbuf[], int off, int len) throws IOException: 将字符数组`cbuf[]` 中的从索引为`off`的位置处开始的`len`个字符写入输出流
- void write(String str) thrwos IOException: 将字符串`str`中的字符写入输出流
- void write(String str, int off, int len) throws IOException: 将字符串`str`中从索引`off`开始处的`len`个字符写入输出流


字符流的输入和输出对照图：
![字符流对比](http://ooll8xqpq.bkt.clouddn.com/%E5%AD%97%E7%AC%A6%E6%B5%81%E5%AF%B9%E6%AF%94.jpg)

#### 字符流和字节流的转换
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


#### 字节流和字符流的区别
字节流没有缓冲区，是直接输出的，而字符流是输出到缓冲区的。因此在输出时，字节流不调用`close()`方法时，信息已经输出了，而字符流只有在调用`close()`方法关闭缓冲区时，信息才输出。要想字符流在未关闭时输出信息，则需要手动调用`flush()`方法。

流写单位不同：字节流以字节为单位，字符流以字符为单位，根据码表映射字符，一次可能读多个字节。

处理对象不同：字节流能处理所有类型的数据（如图片、avi等），而字符流只能处理字符类型的数据。

只要是处理纯文本数据，就优先考虑使用字符流。除此之外都使用字节流。

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


## File
File类是对文件系统中文件以及文件夹进行封装的对象，可以通过面向对象的思想来操作文件和文件夹。

File类保存文件或目录的各种元数据信息，包括文件名、文件长度、最后修改时间、是否可读、获取当前文件的路径名，判断指定文件是否存在、获得当前目录中的文件列表，创建、删除文件和目录等方法。 

以下是常用的操作函数

方法或常量|类型|描述
---|---|---
public static final String separator | 常量| 表示路径分隔符`\`(Windows)或`/`(Linux等)
public static final String pathSeparator | 常量| 表示路径分隔，`;`(Windows)或`:`(Linux等)
public boolean createNewFile() throws IOException | 普通|创建新文件
public boolean delete() | 普通| 删除文件
public String getParent()| 普通| 得到文件的上一级路径
public boolean isDirectory() | 普通|判断给定的路径是不是文件夹
public boolean isFile() | 普通| 判断给定的路径是不是文件
public String[] list() | 普通| 列出文件夹中的文件
public File[] listFiles() | 普通|列出文件夹中的所有文件
public boolean mkdir() | 普通| 创建新的文件夹
public boolean renameTo(File dest) | 普通|为文件重命名
public long length() | 普通|返回文件大小

## RandomAccessFile
该对象并不是流体系中的一员，其封装了字节流，同时还封装了一个缓冲区（字符数组），通过内部的指针来操作字符数组中的数据。 该对象特点：
1. 该对象只能操作文件，所以构造函数接收两种类型的参数：
    1. 字符串文件路径
    2. File对象
2. 该对象既可以对文件进行读操作，也能进行写操作，在进行对象实例化时可指定操作模式(`r`,`rw`)。

注意：
**该对象在实例化时，如果要操作的文件不存在，会自动创建；如果文件存在，写数据未指定位置，会从头开始写，即覆盖原有的内容。** 可以用于多线程下载或多个线程同时写数据到文件。

## System类对IO的支持
在System 类中提供了以下的几个常量：

名称|描述
---|---
public static final PrintStream out | 对应标准输出（默认为显示器）
public static final PrintStream err | 对应标准错误输出（默认为显示器）
public static final InputStream in | 对应标准输入（默认为键盘）

### 标准I/O重定向
在`System`类中提供了三个重定向标准输入/输出的方法 
- static void setErr(PrintStream err): 重定向“标准”错误输出流 
- static void setIn(InputStream in): 重定向“标准”输入流 
- static void setOut(PrintStream out): 重定向“标准”输出流

```java

// Demonstrates standard I/O redirection.

import java.io.*;

public class Redirecting {
    public static void main(String[] args)
            throws IOException {
        PrintStream console = System.out;
        BufferedInputStream in = new BufferedInputStream(
                new FileInputStream("Redirecting.java"));
        PrintStream out = new PrintStream(
                new BufferedOutputStream(
                        new FileOutputStream("test.txt")));

        System.setIn(in);
        System.setOut(out);
        System.setErr(out);
        BufferedReader br = new BufferedReader(
                new InputStreamReader(System.in));
        String s;
        while ((s = br.readLine()) != null){
            System.out.println(s);
        }
        out.close(); // Remember this!
        System.setOut(console);
    }
} 
```

## BIO编程
### 传统BIO通信模型图
传统的同步阻塞Socket通信模型开发中，ServerSocket负责绑定ip地址，启动监听端口;Socket负责发起连接操作。连接成功后，双方通过输入和输出流进行同步阻塞式通信。

采用BIO通信模型的服务端，通常由一个独立的Acceptor线程负责监听客户端的连接，它接收到客户端连接请求之后为每个客户端创建一个新的线程进行通信操作，客户端与服务端通过输入输出流来通信，处理完成后，线程销毁。

BIO通信模型
[BIO通信模型](http://ooll8xqpq.bkt.clouddn.com/bio%E9%80%9A%E4%BF%A1%E6%A8%A1%E5%9E%8B.png)
该模型最大的问题就是缺乏弹性伸缩能力，当客户端并发访问量增加后，服务端的线程个数和客户端连接数呈1：1的正比关系，Java中的线程也是比较宝贵的系统资源，线程数量快速膨胀后，系统的性能将急剧下降。

## 伪异步IO编程
我们可以使用线程池来管理服务端这些线程，实现1个或多个线程处理N个客户端的模型（但是底层还是使用的同步阻塞IO），通常被称为“伪异步IO模型”。

如果使用`java.util.concurrent.Executors#newCachedThreadPool()`线程池（不限制线程数量），其实除了能自动帮我们管理线程（复用），看起来也就像是`1：1`的客户端线程模型，而使用`java.util.concurrent.Executors#newFixedThreadPool(int)`可以有效控制线程的最大数量，保证了系统有限资源的控制，实现了`N:M`的伪异步IO模型。但是当发生大量并发请求时，超过最大数量的线程就只能等待，直到线程池中有空闲的线程可以使用。
### 伪异步IO编程模型图
### 伪异步IO编程实例
# NIO编程
Java NIO（New IO）是一个可以替代标准Java IO API（从Java 1.4开始）的新的API。
主要由以下几个核心部分组成：
- Channel
- Buffer
- Selector

## 工作原理
## Java NIO和IO的主要区别

IO | NIO
---|---
面向流| 面向Buffer
阻塞| 非阻塞
- | Selector

### 面向流与面向缓冲
NIO和IO之间第一个最大的区别是，IO是面向流的，NIO是面向缓冲区的

IO面向流意味着每次从流中读取一个或多个字节，直到读取所有字节，它们没有被缓存在任何地方。此外，它不能前后移动流中的数据。如果需要前后移动从流中读取的数据，需要先将它缓存到一个缓冲区。NIO的读取方式略有不同。数据读取到一个它稍后处理的缓冲区，需要时可在缓冲区中前后移动。这就增加了处理过程中的灵活性。但是，还需要检查是否该缓冲区中包含所有需要处理的数据，而且需要确保当更多的数据读入缓冲区时，不要覆盖缓冲区里沿未处理的数据。

### 阻塞与非阻塞IO
IO的各种流都是阻塞的。这意味着，当一个线程调用`read()`或`write()`时，该线程被阻塞，直到有一些数据被读取，或数据完全写入。该线程在此期间不能再干任何事情。NIO的非阻塞模式，使一个线程从某通道发送请求读取数据，但是它公能得到目前可用的数据，如果目前没有数据可用时，就什么都不会获取，而不是保持线程阻塞，所以在可以读取数据之前，该线程可以继续做其他的事情。非阻塞写也是如此，一个线程请求写入一些数据到某通道，但不需要等待它完全写入，这个线程同时可以去做其他的事情。

## 通道 Channel
Channel 是对数据的源头或数据目标点流径途径的抽象，在这个意义上和`Inputstream`和`OutputStream`类似。
### Java NIO的通道与流区别
- 既可以从通道中读取数据，又可以写数据到通道。但流的读写通常是单向的。
- 通道可以地读写。
- 通道中的数据总是要先读到一个`Buffer`，或者总是要从一个`Buffer`中写入。

**通道必须结合Buffer使用，不能直接向通道中读/写数据**

### Channel主要分类
广义来说通道可以被分为两类：File IO和Stream IO，也就是文件通道和套接字通道。具体细分为：
- `FileChannel` 从文件读写数据
- `SocketChannel`通过TCP读写网络数据
- `ServerSocketChannel`可以监听新进来的TCP连接，并对每个连接创建对应的`SocketChannel`
- `DatagramChannel` 通过UDP读写网络数据

#### FileChannel
从File中读取数据
##### 打开FileChannel
在使用`FileChannel`之前，必须先打开。但是不无法直接打开一个`FileChannel`, 需要通过使用`InputStream`、`OutputStream`或`RandomAccessFile`来获取一个`FileChannel`实例。下面通过`RandomAccessFile`打开`FileChannel`：
```java
RandomAccessFile file = new RandomAccessFile("c:/data.txt","rw");
FileChannel channel = file.getChannel();
```
##### 从FileChannel读取数据
有多个read()可以从FileChannel中读取数据。如：
```java
ByteBuffer buf = ByteBuffer.allocate(48);
int bytesRead = channel.read(buf);
```
首先，分配一个Buffer，从FileChannel中读取到的数据将被存放在Buffer中。

然后调用`FileChannel.read()`方法，该方法将数据从`FileChannel`读取到`Buffer`中。`read()`方法返回的`int`值表示了有多少字节被读到了`Bubber`中。如果返回`-1`，表示到了文件`末尾`。

##### 向FileChannel写数据
使用FileChannel.write()方法向FileChannel写数据，该方法的参数是一个Buffer。如：
```java
String data = "写入数据" + System.currentTimeMillis();
ByteBuffer buf = ByteBuffer.allocate(48);
buf.clear();
buf.put(data.getBytes());
buf.flip();
while(buf.hasRemaining()){
    channel.write(buf);
}
```
注意FileChannel.write()是在while循环中调用的，因为无法保证write()方法一次能向FileChannel写入所有字节，因此需要重复调用write()方法，直到Buffer中已经没有尚未写入通道的数据。

##### 关闭FileChannel
用完FileChannel后必须将其关闭：
```java
channel.close();
```

##### FileChannel的position方法
有时需要在`FileChannel`的某个特定位置进行数据的读写操作，可以通过调用`position()`方法获取`FileChannel`的当前位置。
也可以通过调用`position(long pos)`方法设置`FileChannel`的当前位置。

如：
```
long pos = channel.position();
channel.position(pos + 10);
```
如果将位置设置在文件结束符之后，然后试图从文件通道中读取数据，读方法将返回 `-1`  -- 文件结束标志。

如果向通道中写数据，文件将撑大到当前位置并写入数据。这可能导致“文件空洞”。
##### FileChannel的size方法
`FileChannel`实例的`size()`方法将返回该实例所关联文件的大小。如：
```java
long fileSize = channel.size();
```

##### FileChannel的truncate方法
可以使用`FileChannel.truncate(size)`方法截取一个文件。截取文件时，如果文件当前的长度大于给定长度，那么指定长度后的文件内容会被删除，如果给定的大小大于等于当前文件大小，则不会修改该文件。在任何一种情况下，如果这个通道的`position`大于给定的大小，然后它被设置为这个大小。如：
```
channel.truncate(1024); 
```
这个例子截取文件的前1024个字节。
##### FileChannel的force方法
`FileChannel.force()`方法将通道里尚未写入磁盘的数据强制写到磁盘上。出于性能方面的考虑，操作系统会将数据缓存在内存中，所以无法保证写入到`FileChannel`里的数据一定会即时写到磁盘上。要保证这一点，需要调用`force()`方法。

`force()`方法有一个boolean类型的参数，指明是否同时将文件元数据（权限信息等）写到磁盘上。

下面的例子同时将文件数据和元数据强制写到磁盘上：
```
channel.force(true);
```

##### transferFrom()
`FileChannel`的`transferFrom()`方法可以将数据从源通道传输到`FileChannel`中。下面是一个简单的例子：

```
RandomAccessFile accessFile = new RandomAccessFile("E:\\qinzaizhen\\javasedemo\\src\\io\\nio\\nio.txt","rw");
FileChannel channel = accessFile.getChannel();
RandomAccessFile toFile = new RandomAccessFile("E:\\qinzaizhen\\javasedemo\\src\\io\\nio\\niotofile.txt","rw");
FileChannel toChannel = toFile.getChannel();
toChannel.transferFrom(channel,0,10);
channel.close();
accessFile.close();
toChannel.close();
//源文件中有中文，写入到新文件中后乱码
```
`transferFrom` 方法的输入参数 `position` 表示从 `position` 处开始向目标文件写入数据，count 表示最多传输的字节数。如果源通道的剩余空间小于 count 个字节，则所传输的字节数要小于请求的字节数。如果给定的`position`大于文件的大小，则不会传输数据。此方法不会修改`position`。如果源通道有`position`，那么将会从源通道此位置开始读取，并且会根据读取的字节增加`position`。

此外要注意，在 `SoketChannel`的实现中，`SocketChannel`只会传输此刻准备好的数据（可能不足`count`字节）。因此，`SocketChannel` 可能不会将请求的所有数据(`count`个字节)全部传输到 `FileChannel`中。

##### transferTo()
`transferTo()`方法将数据从`FileChannel`传输到其他的`channel`中。下面是一个简单的例子：

是不是发现这个例子和前面那个例子特别相似？除了调用方法的FileChannel对象不一样外，其他的都一样。
```java
RandomAccessFile accessFile = new RandomAccessFile("E:\\qinzaizhen\\javasedemo\\src\\io\\nio\\nio.txt","rw");
FileChannel channel = accessFile.getChannel();
RandomAccessFile toFile = new RandomAccessFile("E:\\qinzaizhen\\javasedemo\\src\\io\\nio\\niotofile.txt","rw");
FileChannel toChannel = toFile.getChannel();
System.out.println(toChannel.position());
//        toChannel.transferFrom(channel,1,10);

channel.transferTo(2,10, toChannel);
System.out.println(toChannel.position());
System.out.println(channel.position());


channel.close();
accessFile.close();
toChannel.close();
//此方式不乱码
```
上面所说的关于`SocketChannel`的问题在`transferTo()`方法中同样存在。`SocketChannel`会一直传输数据直到目标`buffer`被填满。

## 缓冲区 Buffer
缓冲区本质上是一块可以写入数据，然后可以从中读取数据的内存。这块内存被包装成NIO Buffer对象，并提供了一组方法，用来访问这块内存。
### Buffer的基本用法
使用Buffer读写数据一般遵循以下四个步骤：
- 写入数据到Buffer 
- 从Buffer中读取数据
- 调用clear()方法或者compact()方法

当向buffer写入数据时，buffer会记录下写了多少数据。一旦要读取数据，需要通过flip()方法将Buffer从写模式切换到读模式。在读模式下，可以读取之前写入到buffer的所有数据。

一旦读完了所有的数据，就需要清空缓冲区，让它可以再次被写入。`clear()`方法会清空整个缓冲区，`ByteBuffer`的`compact()`方法只会清除已经读过的数据。任何未读的数据都被移到缓冲区的起始处，新写入的数据将放到缓冲区未读数据的后面。

### Buffer的三个属性
为了理解Buffer的工作原理，需要熟悉它的三个属性：
- `capacity`：作为一个内存块，Buffer有一个固定的大小值。你只能写`capacity`个`byte`、`long`、`char`等类型数据。
- `position`：当你写数据到`Buffer`中时，`position`表示当前的位置。初始的`position`值为`0`，当一个`byte`、`long`等数据写到Buffer后，`position`会向前移动到下一个可插入数据的`Buffer`单元。`position`最大可为`capacity - 1`。当`Buffer`切换到读模式时，`position`会被重置为`0`，当从`Buffer`的`position`处读取数据时，`position`向前移动到下一个可读的位置。
- `limit`：在写模式下，`Buffer`的`limit`表示你最多能往`Buffer`里写多少数据。`写模式`下，`limit` 等于`Buffer`的`capacity`。当切换到`读模式`时，`limit` 表示你最多能读到多少数据。因此，当切换`Buffer`到读模式时，`limit`会被设置成写模式下的`position`值。

![模型示意图](http://ooll8xqpq.bkt.clouddn.com/buffer%E5%B1%9E%E6%80%A7.png)

### Buffer的类型
NIO 有以下Buffer 类型：

- ByteBuffer
- MappedByteBuffer
- CharBuffer
- DoubleBuffer
- FloatBuffer
- IntBuffer
- LongBuffer
- ShortBuffer

### Buffer的分配
要想获取一个Buffer对象，首先要进行分配。每一个Buffer类都有一个`allocate`方法。下面是一个分配48字节`capacity`的`ByteBuffer`的例子。
```java
ByteBuffer buf = ByteBuffer.allocate(48);
```
下面是分配一个可存储1024个字符的CharBuffer：
```java
CharBuffer buf = CharBuffer.allocate(1024);
```

### Buffer写数据
写数据到`Buffer`有两种方式：
- 从`Channel`写到`Buffer`
- 通过`Buffer`的`put()`方法写到`Buffer`里

从`Channel`写到`Buffer`，如：
```java
int bytesRead = channel.read(buf);
```

通过`put`方法写到Buffer的例子：
```java
buf.put(128);
```
`put` 方法有很多个，允许你以不同的方式把数据写入到`Buffer`中。例如，写到一个指定的位置，或者把一个字节数据写入到`Buffer`。

#### flip()方法
`flip()`方法将`Buffer`从写模式切换到读模式。调用`flip()`方法会将`position`设为`0`，并将`limit`设置成之前`position`的值。

换句话说，`position`现在用于标记读的位置，`limit` 表示之前写进了多少个`byte`、`char`等  --- 现在能读多少个`byte` 、`char`等。
### Buffer中读取数据
从`Buffer`中读取数据有两种方式：
- 从`Buffer`读取数据到`Channel`
- 使用`get()`方法从`Buffer`中读取数据

从Buffer读取数据到Channel的例子：
```java
int bytesWritten = channel.write(buf);
```
使用get()方法从Buffer中读取数据的例子：
```java
byte b = buf.get();
```
`get`方法有很多版本，允许你以不同的方式从`Buffer`中读取数据。例如，从指定`position`读取，或者从`Buffer`中读取数据到字节数组。
#### rewind()方法
Buffer.rewind()将position设回0，所以你可以重读Buffer中的所有数据。limit 保持不变，仍然表示能从Buffer中读取多少个元素（byte、char等）
#### clear()与compact()方法
一旦读完`Buffer`中的数据，需要让`Buffer`准备好再次被写入。可以通过`clear()`或`compact()`方法来完成。

如果调用的是`clear()`方法，`position`将被设为`0`，`limit`被设置成`capacity`的值。换句话说，`Buffer`被清空了。

如果`Buffer`中有一些未读的数据，调用`clear()`方法，数据将“被遗忘”，意味着不再有任何标记会告诉你哪些数据被读过，哪些还没有。

如果`Buffer`中仍有未读的数据，且后续还需要这些数据，但是此时想要先写些数据，那么使用`compact()`方法。`compact()`方法将所有未读的数据拷贝到`Buffer`起始处，然后将`position`设置为最后一个未读元素的下一个位置。`limit`属性依然像`clear()`方法一样，设置成`capacity`。现在`Buffer`准备好写数据了，但不会覆盖未读的数据。

#### mark()与reset()方法
通过调用`Buffer.mark()`方法，可以标记`Buffer`中的一个特定`position`。之后可以通过调用`Buffer.reset()`方法恢复到这个`position`。例如：
```java
buffer.mark();  
//回退
buffer.reset();  
```
#### equals()
当满足下列条件时，表示两个`Buffer`相等：
- 有相同的类型（`byte`、`char`、`int`等）
- `Buffer`中剩余的`byte`、`char`等的个数相等
- `Buffer`中所有剩余的`byte`、`char`等都相同

equals只是比较Buffer剩余的部分中的元素。
#### compareTo()方法
`compareTo()方法比较两个Buffer的剩余元素（byte、char等），如果满足下列条件，则认为一个Buffer“小于”另一个Buffer：
- 第一个不相等的元素小于另外一个BUffer中对应的元素
- 所有元素都相等，但第一个Buffer比另一个先耗尽（第一个Buffer中的元素个数比另一个少）

## 选择器（ Selector）
Java NIO 引入了选择器的概念，选择器用于监听多个通道的事件（比如：连接打开，数据到达）。`Selector`提供选择已经就绪的任务的能力：`Selector`会不断旬注册在其上的`Channel`，如果某个`Channel`上面发读或写事件，这个`Channel`就处于就绪状态，会被`Selector`轮询出来，然后通过`SelectionKey`可以获取就结果`Channel`的集合，进行后续的IO操作。

一个`Selector`可以同时轮询多个`Channel`，因为JDK使用了`epoll()`代替传统的`select` 实现，所有没有最大连接句柄`1024/2048`的限制。所以只需要一个线程负责`Selector`的轮询，就可以接入成千上万的客户端。

要使用Selector，得向Selector注册Channel，然后调用它的select()方法。这个方法会一直阻塞到某个注册的通道有事件就绪。一旦这个方法返回，线程就可以处理这些事件，比如新连接进来，数据接收等。

### Selector的创建
通过调用Selector.open()方法创建一个Selector,例如：
```java
Selector selector = Selector.open();
```

### Selector注册通道
为了将`Channerl`和`Selector`配合使用，必须将Channel注册到selector上，通过SelectableChannel.register()方法实现，如下：
```java
channel.configureBlocking(false);
SelectionKey key = channel.register(selector, Selectionkey.OP_READ);
```
和Selector一起使用时，Channel必须处于非阻塞模式下。这意味着不能将FileChannel与Selector一起使用，因为FileChannel不能切换到非阻塞模式，而套接字通道都可以。

注意register()方法的第二个参数，这是一个“interest集合”,意思是在通过Selector监听Channel时对什么事件感兴趣。可以监听四种不同类型的事件：
- Connnect
- Accept
- Read
- Write

通道触发了一个事件意思是该事件已经就绪。所以，某个channel成功连接到另一个服务器称为“连接就绪”。一个server socket channel准备好接收就进入的连接称为“接收就绪”。一个有数据可读的通道可以说是“读就绪”。等待写数据的通道可以说是“写就绪”。
- SelectionKey.OP_CONNECT
- SelectionKey.OP_ACCEPT
- SelectionKey.OP_READ
- SelectionKey.OP_WRITE

如果你对不止一种事件感兴趣，那么可以用“位或”操作符将常量连接起来，例如：
```java
int interestSet = SelectionKey.OP_READ | SelectionKey.OP_WRITE;
```

### SelectionKey
当向`Selector`注册`Channel`时，`register()`方法会返回一个`SelectionKey`对象，这个对象包含了一些你感兴趣的属性：
- interest集合
- read集合
- Channel
- Selector
- 附加的对象（可选）

#### interest集合
`interest集合`是你所选择的感兴趣的事件集合。可以通过`SelectionKey`读写`interest集合`，例如：
```java
Selector selector = Selector.open();
SocketChannel channel = SocketChannel.open();
SelectionKey key = channel.register(selector, SelectionKey.OP_CONNECT);
int interestOps = key.interestOps();
boolean inAccept = (interestOps & SelectionKey.OP_ACCEPT) == SelectionKey.OP_ACCEPT;
boolean inConnect = (interestOps & SelectionKey.OP_CONNECT) == SelectionKey.OP_CONNECT;
boolean inRead = (interestOps & SelectionKey.OP_READ) == SelectionKey.OP_READ;
boolean inWrite= (interestOps & SelectionKey.OP_WRITE) == SelectionKey.OP_WRITE;
```

可以看到，用“位与”操作`interest集合`和给定的`SelectionKey`常量比较，可以确定某个确定的事件是否在`interest集合`中。
#### ready集合
ready集合是通道已经准备就绪的操作的集合。在一次选择之后，你会首先访问这个read集合。
```java
int readySet = selectionKey.readyOps();
```
可以用检测interest集合的方式来检测channel中什么事件或操作已经就绪。也可以使用以下四个方法，它们都会返回一个布尔类型：
```java
key.isAcceptable();
key.isConnectable();
key.isReadable();
key.isWritable();
```
#### 附加对象
可以将一个对象或者更多信息附着到SelectionKey上，这样就能方便的识别某个给定的通道。例如，可以与通道一起使用的Buffer，或是包含聚焦数据的某个对象。使用方法如下：
```java
key.attach(new HashMap<>());
Object obj = key.attachment();
```
还可以在用register()方法向Selector注册Channel的时候附加对象。如：
```java
SelectionKey key = channel.register(selector, SelectionKey.OP_READ, obj);
```
### 通过Selector选择通道
一旦向Selector注册了一个或多个通道，就可以调用几个重载的select()方法。这些方法返回你所感兴趣的事件（如连接、接受、读或写）已经准备就绪的那些通道。换句话说，如果你对“读就绪”的通道感兴趣，select()方法会返回读事件已经就绪的那些通道。

下面是`select()`方法：
- int select()
- int select(long timeout)
- int selectNow()

`select()`阻塞到至少有一个通道在你注册的事件上就绪了。

`select(long timeout)` 和`select()` 一样，除了最长会阻塞timeout毫秒（参数）。

`selectNow()` 不会阻塞，不管什么通道就绪就立刻返回（此方法执行非阻塞的选择操作。如果自从前一次选择操作后，没有通道变成可选择的，则此方法直接返回零）。

`select()`方法返回的`int`值表示有多少个通道已经就绪，也就是自上次调用`select()`方法有多少通道变成就绪状态。如果调用`select()`方法，因为有一个通道变成就绪状态，返回了`1`，若再次调用`select()`方法，如果另外一个通道就绪了，它会再次返回`1`。如果对第一个就绪的`channel`没有做任何操作，现在就有两个就绪的通道，但在每次`select()`方法调用之间，只有一个通道就绪了。

### selectedKeys()
一旦调用了`select()`方法，并且返回值表明有一个或更多个通道就绪了，然后可以通过调用`selector`的`selectedKeys()`方法，访问“已选择key集合（selected key set）”中的就绪通道。如下所示：
```java
Set selectedKeys = selector.selectedKeys();
```
当向`Selector`注册`Channel`时，`Channel.register()`方法会返回一个`SelectionKey`对象，这个对象代表了注册到该`Selector`的通道。可以通过`Selector`的`keys()`方法访问这些对象。

可以遍历这个已选择的Key 集合来访问就绪的通道。如下：
```java
Set selectedKeys = selector.selectedKeys();
Iterator keyIterator = selectedKeys.iterator();
while(keyIterator.hasNext()) {
    SelectionKey key = keyIterator.next();
    if(key.isAcceptable()) {
        // a connection was accepted by a ServerSocketChannel.
    } else if (key.isConnectable()) {
        // a connection was established with a remote server.
    } else if (key.isReadable()) {
        // a channel is ready for reading
    } else if (key.isWritable()) {
        // a channel is ready for writing
    }
    keyIterator.remove();
}
```
这个循环遍历已选择Key 集合的每个key，并检测各个键所对应的通道的就绪事件。

注意每次迭代末尾的 `keyIterator.remove()`调用。`Selector`不会自己从已选择Key集合中移除 `SelectionKey`实例。必须在处理完通道时自己移除。下次该通道变成就绪时，`Selector`会再次将其放入已选择键集中。

`SelectionKey.channel()` 方法返回的通道需要转型成你要处理的类型，如 `ServerSocketChannel` 或 `SocketChannel` 等。

### wakeUp()
某个线程调用select()方法后阻塞了，即使没有通道已经就绪，也有办法让其从select()方法返回。只要让他它线程在第一个线程调用select()方法的那个对象上调用Selector.wakeup()方法即可，阻塞在select()方法上的线程会立即返回。
### close()
用完 `Selector` 后调用其 `close()` 方法会关闭该`Selector`，且使注册到该`Selector`上的所有`SelectionKey`实例无效。通道本身并不会关闭。
## 分散（Scatter）/聚集（Gather）
分散（scatter）：从Channel中读取是指在读操作时将读取的数据写入多个buffer中。因此，Channel将从Channel中读取的数据“分散（scatter）”到多个Buffer中。
如：
```java
ByteBuffer header = ByteBuffer.allocate(128);  
ByteBuffer body   = ByteBuffer.allocate(1024);  
ByteBuffer[] bufferArray = { header, body };  
channel.read(bufferArray);  
```
注意`buffer`首先被插入到数组，然后再将数组作为`channel.read()`的输入参数。`read()`按照`buffer`在数组中的顺序将从`channel`中读取的数据写入到`buffer`，当一个`buffer`被写满后，`channel`紧接着向另一个`buffer`中写。

Scattering Reads在移动下一个`buffer`前，必须填满当前的`buffer`，这也意味着它不适用于动态消息。换句话说，如果存在消息头和消息体，消息头必须完成填充，Scattering Reads才能正常工作。

聚集（gatter）:在写操作时将多个`buffer`的数据写入同一个`Channel`，因此，`Channel`将多个`buffer`的数据“聚集（gather）”后发送到`Channel`。
```java
ByteBuffer header = ByteBuffer.allocate(128);  
ByteBuffer body   = ByteBuffer.allocate(1024);  
//write data into buffers  
ByteBuffer[] bufferArray = { header, body };  
channel.write(bufferArray);
```
`buffer`的一个数组被传递给了`write()`方法，如果一个buffer有一个128字节的容量，但是只包含了58个字节，只有58个字节可以从buffer中写到channel。

### 分散/聚集的应用
scatter / gather 经常用于需要将传输的数据分开处理的场合。例如，在编写一个使用消息对象的网络应用程序时，每一个消息被划分为固定长度的头部和固定长度的正文。可以创建一个刚好可以容纳头部的缓冲区和另一个刚好可以容纳正文的缓冲区。当将它们放入一个数组中并使用分散读取来向它们读入消息时，头部和正文将整齐地划分到这两个缓冲区中。

## 通道实现
### 文件通道
### Socket管道
Java NIO中的 `SocketChannel` 是一个连接到 TCP网络套接字的通道。可以通过以下2种方式创建 `SocketChannel`：
- 打开一个`SocketChannel`并连接到互联网上的某台服务器
- 一个新连接到达 `ServerSocketChannel` 时，会创建一个`SocketChannel`

#### 打开 SocketChannel

下面是`SocketChannel`的打开方式：
```java
SocketChannel socketChannel = SocketChannel.open();
socketChannel.connect(new InetSocketAddress("http://localhost",80));
```
#### 从 `SocketChannel` 读取数据

要从`SocketChannel`中读取数据，调用一个`read()`的方法之一。以下是例子：
```java
ByteBuffer buf = ByteBuffer.allocate(48);
int bytesRead = socketChannel.read(buf);
```
首先，分配一个`Buffer`。从`SocketChannel`读取到的数据将会放到这个`Buffer`中。

然后，调用`SocketChannel.read()`方法。该方法将数据从`SocketChannel `读到`Buffer`中。`read()`方法返回的`int`值表示读了多少字节进`Buffer`里。如果返回的是`-1`，表示已经读到了流的末尾（连接关闭了）。

#### 写入 SocketChannel

写数据到`SocketChannel`用的是`SocketChannel.write()`方法，该方法以一个`Buffer`作为参数。示例如下：
```java
String newData = "新数据" + System.currentTimeMillis();
ByteBuffer buf = ByteBuffer.allocate(48);
buf.clear();
buf.put(newData.getBytes());
buf.flip();
while(buf.hasRemaining()) {
    channel.write(buf);
}
```
注意`SocketChannel.write()`方法的调用是在一个`while`循环中的。`write()`方法无法保证能写多少字节到`SocketChannel`。所以，我们重复调用`write()`直到`Buffer`没有要写的字节为止。

#### 非阻塞模式

可以设置 `SocketChannel` 为`非阻塞`模式（`non-blocking` mode）.设置之后，就可以在异步模式下调用`connect()`, `read() `和`write()`了。

#### connect()

如果`SocketChannel`在`非阻塞`模式下，此时调用`connect()`，该方法可能在连接建立之前就返回了。为了确定连接是否建立，可以调用`finishConnect()`的方法。像这样：
```java
socketChannel.configureBlocking(false);
socketChannel.connect(new InetSocketAddress("http://localhost", 80));
while(! socketChannel.finishConnect() ){
    //wait, or do something else...
}
```
#### write()

非阻塞模式下，`write()`方法在尚未写出任何内容时可能就返回了。所以需要在循环中调用`write()`。前面已经有例子了，这里就不赘述了。

#### read()

非阻塞模式下,`read()`方法在尚未读取到任何数据时可能就返回了。所以需要关注它的`int`返回值，它会告诉你读取了多少字节。

#### 示例
服务端：
```java
public class NIOServer {
    private int port;

    public NIOServer(int port) {
        this.port = port;
    }

    void init() throws IOException {
        Selector selector = Selector.open();
        ServerSocketChannel channel = ServerSocketChannel.open();
        channel.bind(new InetSocketAddress(port));
        channel.configureBlocking(false);
        channel.register(selector, SelectionKey.OP_ACCEPT);
        while (true) {
            selector.select();

            Set<SelectionKey> selectionKeys = selector.selectedKeys();
            Iterator<SelectionKey> selectionKeyIterator = selectionKeys.iterator();
            while (selectionKeyIterator.hasNext()){
                SelectionKey key = selectionKeyIterator.next();
                //防止重复处理
                selectionKeyIterator.remove();
                if (key.isAcceptable()){
                    SocketChannel socketChannel = ((ServerSocketChannel) key.channel()).accept();
                    socketChannel.write(ByteBuffer.wrap("welcome to connect...".getBytes()));
                    socketChannel.configureBlocking(false);
                    socketChannel.register(selector, SelectionKey.OP_READ);
                }else if (key.isReadable()){
                    ByteBuffer buffer = ByteBuffer.allocate(64);
                    SocketChannel selectableChannel = (SocketChannel) key.channel();
                    selectableChannel.read(buffer);
                    System.out.println("read from client : " + new String(buffer.array()));
                    selectableChannel.write(ByteBuffer.wrap("i received your message.".getBytes()));
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        new NIOServer(9000).init();
    }
}
```
客户端：
```java
public class NIOClient {
    private String ip;
    private int port;

    public NIOClient(String ip, int port) {
        this.ip = ip;
        this.port = port;
    }

    public void init() throws IOException {
        Selector selector = Selector.open();
        SocketChannel channel = SocketChannel.open();
        channel.configureBlocking(false);
        channel.register(selector, SelectionKey.OP_CONNECT);
        channel.connect(new InetSocketAddress(ip, port));
        while (true){
            selector.select();
            Set<SelectionKey> keys = selector.selectedKeys();
            Iterator<SelectionKey> keyIterator = keys.iterator();
            while (keyIterator.hasNext()){
                SelectionKey selectionKey = keyIterator.next();
                //防止重复处理
                keyIterator.remove();
                if (selectionKey.isConnectable()){
                    SocketChannel socketChannel = (SocketChannel) selectionKey.channel();
                    //如果正在连接，则完成连接
                    if (socketChannel.isConnectionPending()) {
                        socketChannel.finishConnect();
                    }
                    socketChannel.write(ByteBuffer.wrap("test connecting".getBytes()));
                    socketChannel.configureBlocking(false);
                    socketChannel.register(selector, SelectionKey.OP_READ);
                }else if (selectionKey.isReadable()){
                    ByteBuffer buffer = ByteBuffer.allocate(48);
                    SocketChannel socketChannel = (SocketChannel) selectionKey.channel();
                    socketChannel.read(buffer);
                    System.out.println(new String(buffer.array()));
                }

            }
        }
    }

    public static void main(String[] args) throws IOException {
        new NIOClient("127.0.0.1", 9000).init();
    }
}
```
### Datagram 通道
Java NIO中的`DatagramChannel`是一个能收发UDP包的通道。因为UDP是无连接的网络协议，所以不能像其它通道那样读取和写入。它发送和接收的是数据包。
## 管道（Pipe）
Java NIO 管道是2个线程之间的单向数据连接。`Pipe`有一个`source`通道和一个`sink`通道。数据会被写到`sink`通道，从`source`通道读取。
### 创建管道
通过`Pipe.open()`方法打开管道。例如：
```java
Pipe pipe = Pipe.open(); 
```
### 向管道写数据
要向管道写数据，需要访问`sink`通道。像这样：
```java
Pipe.SinkChannel sinkChannel = pipe.sink(); 
```
通过调用`SinkChannel`的`write()`方法，将数据写入`SinkChannel`,像这样：
```java
String newData = "新数据" + System.currentTimeMillis();  
ByteBuffer buf = ByteBuffer.allocate(48);  
buf.clear();  
buf.put(newData.getBytes());  
buf.flip();  
while(buf.hasRemaining()) {  
   sinkChannel.write(buf);
} 
```
### 从管道读取数据
要读取管道的数据，需要访问`source`通道，像这样：
```java
Pipe.SourceChannel sourceChannel = pipe.source(); 
```
调用`source`通道的`read()`方法来读取数据，像这样：
```java
ByteBuffer buf = ByteBuffer.allocate(48);  
int bytesRead = inChannel.read(buf);  
```
read()方法返回的int值会告诉我们多少字节被读进了缓冲区。
### 简单完整实例
# AIO编程
## AIO的特点
- 读完了再通知我
- 不会加快IO，只是在读完后进行通知
- 使用回调函数，进行业务处理

AIO的相关代码：
```java
//AsynchronousServerSocketChannel类
server = AsynchronousServerSocketChannel.open().bind(new InetSocketAddress(PORT));
```

使用server上的`accept`方法
```java
public abstract <A> void accept(A attachment,CompletionHandler<AsynchronousSocketChannel,? super A> handler);
```

## 示例
Server:
```java
public class AIOServer {
    private int port ;

    public AIOServer(int port) {
        this.port = port;
    }

    void init() throws Exception {
        AsynchronousServerSocketChannel channel = AsynchronousServerSocketChannel.open();
        channel.bind(new InetSocketAddress(port));
        channel.accept(new HashMap<>(), new CompletionHandler<AsynchronousSocketChannel, HashMap<? extends Object, ? extends Object>>() {
            @Override
            public void completed(AsynchronousSocketChannel result, HashMap<?, ?> attachment) {
                result.write(ByteBuffer.wrap("welcome to connect...".getBytes()));
                ByteBuffer buffer = ByteBuffer.allocate(64);
                try {
                    result.read(buffer).get();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
                System.out.println("read from client : " + new String(buffer.array()));
            }

            @Override
            public void failed(Throwable exc, HashMap<?, ?> attachment) {
                System.out.println("connect fail" + exc.getMessage());
            }
        });

        Thread.sleep(100000);
    }

    public static void main(String[] args) throws Exception {
        new AIOServer(9000).init();
    }
}
```

Client:
```java
public class AIOClient {
    private String ip;
    private int port;

    public AIOClient(String ip, int port) {
        this.ip = ip;
        this.port = port;
    }

    public void init() throws Exception {

        AsynchronousSocketChannel channel = AsynchronousSocketChannel.open();
        channel.connect(new InetSocketAddress(ip, port), new HashMap<>(), new CompletionHandler<Void, HashMap<? extends Object, ? extends Object>>() {
            @Override
            public void completed(Void result, HashMap<?, ?> attachment) {
                channel.write(ByteBuffer.wrap("test connecting".getBytes()));
                ByteBuffer buffer = ByteBuffer.allocate(64);
                channel.read(buffer, "", new CompletionHandler<>() {
                    @Override
                    public void completed(Integer result, String attachment) {
                        if (result != -1) {
                            System.out.println("read from server : " + new String(buffer.array(),0, result));
                        }
                    }

                    @Override
                    public void failed(Throwable exc, String attachment) {

                    }
                });

            }

            @Override
            public void failed(Throwable exc, HashMap<?, ?> attachment) {
                System.out.println("connect fail" + exc.getMessage());
            }
        });

        Thread.sleep(10000);
    }

    public static void main(String[] args) throws Exception {
        new AIOClient("127.0.0.1", 9000).init();
    }
}
```
## NIO与AIO区别
- NIO是同步非阻塞的，AIO是异步非阻塞的
- 由于NIO的读写过程依然在应用线程里完成，所以对于那些读写过程时间长的，NIO就不太适合。而AIO的读写过程完成后才被通知，所以AIO能够胜任那些重量级，读写过程长的任务。
