---
title: The valid characters are defined in RFC 7230 and RFC 3986
date: 2017-07-26 11:16:27
tags: [encodeURIComponent, encodeURI]
---
今天在使用tomcat的过程中遇到了这个问题。表现为400错误以及空白页面。
```java
Error parsing HTTP request header
Note: further occurrences of HTTP header parsing errors will be logged at DEBUG level.
Java.lang.IllegalArgumentException: Invalid character found in the request target. The valid characters are defined in RFC 7230 and RFC 3986
at org.apache.coyote.http11.InternalInputBuffer.parseRequestLine(InternalInputBuffer.java:189)
at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1000)
at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:637)
at org.apache.tomcat.util.NET.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:318)
at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
at java.lang.Thread.run(Thread.java:745)
```

原因是新版本的tomcat规范了get请求url中参数，Url中只允许包含英文字母（a-zA-Z）、数字（0-9）、-_.~4个特殊字符以及所有保留字符。[原文第2章](https://tools.ietf.org/html/rfc3986)关于字符那部分有说明。  
保留字符：
```txt
reserved    = gen-delims / sub-delims
gen-delims  = ":" / "/" / "?" / "#" / "[" / "]" / "@"
sub-delims  = "!" / "$" / "&" / "'" / "(" / ")"
          / "*" / "+" / "," / ";" / "="
```
非保留字符（字母、数字，-_.~）：
```txt
unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
```
还有一些字符放在url中可能会引起解析的歧义（[此部分来源于](http://blog.csdn.net/laokaizzz/article/details/60752593)）：
- 空格Url在传输的过程，或者用户在排版的过程，或者文本处理程序在处理Url的过程，都有可能引入无关紧要的空格，或者将那些有意义的空格给去掉
- 引号以及<>引号和尖括号通常用于在普通文本中起到分隔Url的作用
- #通常用于表示书签或者锚点
- %百分号本身用作对不安全字符进行编码时使用的特殊字符，因此本身需要编码
- {}|\^[]`~某一些网关或者传输代理会篡改这些字符

当出现这些字符时就需要进行`urlencode`。在javascript中有两种encode的方法:
 -|encodeURI|encodeURIComponent
 --|--|--
 相同点| 不会对字母、数字、标点符号 - _ . ! ~ * ' ( )进行编码
 不同点|不会对URI中具有特殊含义的字符进行编码 `：;/?:@&=+$,#`，因为此方法将参数当成完整的URL，这些字符在URI中具有合法的意义，无需编码|除上面的不会编码之外，其他的字符都会编码  `：;/?:@&=+$,#`

因此如果在URI组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码，如：`http://localhost/redirect?url=http://localhost/index`, 这里的`url`参数的值就应该进行编码，需要用`encodeURIComponent`方法对`http://localhost/index`进行编码。

具体的使用例子([来源于w3c encodeURIComponent](http://www.w3school.com.cn/jsref/jsref_encodeURIComponent.asp)，[encodeuri](http://www.w3school.com.cn/jsref/jsref_encodeuri.asp))：

**encodeURI**
```javascript
<script type="text/javascript">

document.write(encodeURI("http://www.w3school.com.cn")+ "<br />")
document.write(encodeURI("http://www.w3school.com.cn/My first/"))
document.write(encodeURI(",/?:@&=+$#"))
</script>

```
输出：
```html
http://www.w3school.com.cn
http://www.w3school.com.cn/My%20first/
,/?:@&=+$#
```

**encodeURIComponent**
```javascript
<script type="text/javascript">

document.write(encodeURIComponent("http://www.w3school.com.cn"))
document.write("<br />")
document.write(encodeURIComponent("http://www.w3school.com.cn/p 1/"))
document.write("<br />")
document.write(encodeURIComponent(",/?:@&=+$#"))

</script>
```

输出:
```html
http%3A%2F%2Fwww.w3school.com.cn
http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F
%2C%2F%3F%3A%40%26%3D%2B%24%23
```
具体的判断在tomcat的`org.apache.tomcat.util.http.parser.HttpParser`中的`IS_NOT_REQUEST_TARGET`：
```java
/**
 * HTTP header value parser implementation. Parsing HTTP headers as per RFC2616
 * is not always as simple as it first appears. For headers that only use tokens
 * the simple approach will normally be sufficient. However, for the other
 * headers, while simple code meets 99.9% of cases, there are often some edge
 * cases that make things far more complicated.
 *
 * The purpose of this parser is to let the parser worry about the edge cases.
 * It provides tolerant (where safe to do so) parsing of HTTP header values
 * assuming that wrapped header lines have already been unwrapped. (The Tomcat
 * header processing code does the unwrapping.)
 *
 */
public class HttpParser {

    private static final StringManager sm = StringManager.getManager(HttpParser.class);

    private static final Log log = LogFactory.getLog(HttpParser.class);

    private static final int ARRAY_SIZE = 128;

    private static final boolean[] IS_CONTROL = new boolean[ARRAY_SIZE];
    private static final boolean[] IS_SEPARATOR = new boolean[ARRAY_SIZE];
    private static final boolean[] IS_TOKEN = new boolean[ARRAY_SIZE];
    private static final boolean[] IS_HEX = new boolean[ARRAY_SIZE];
    private static final boolean[] IS_NOT_REQUEST_TARGET = new boolean[ARRAY_SIZE];
    private static final boolean[] IS_HTTP_PROTOCOL = new boolean[ARRAY_SIZE];
    private static final boolean[] REQUEST_TARGET_ALLOW = new boolean[ARRAY_SIZE];

    static {
        String prop = System.getProperty("tomcat.util.http.parser.HttpParser.requestTargetAllow");
        if (prop != null) {
            for (int i = 0; i < prop.length(); i++) {
                char c = prop.charAt(i);
                if (c == '{' || c == '}' || c == '|') {
                    REQUEST_TARGET_ALLOW[c] = true;
                } else {
                    log.warn(sm.getString("httpparser.invalidRequestTargetCharacter",
                            Character.valueOf(c)));
                }
            }
        }

        for (int i = 0; i < ARRAY_SIZE; i++) {
            // Control> 0-31, 127
            if (i < 32 || i == 127) {
                IS_CONTROL[i] = true;
            }

            // Separator
            if (    i == '(' || i == ')' || i == '<' || i == '>'  || i == '@'  ||
                    i == ',' || i == ';' || i == ':' || i == '\\' || i == '\"' ||
                    i == '/' || i == '[' || i == ']' || i == '?'  || i == '='  ||
                    i == '{' || i == '}' || i == ' ' || i == '\t') {
                IS_SEPARATOR[i] = true;
            }

            // Token: Anything 0-127 that is not a control and not a separator
            if (!IS_CONTROL[i] && !IS_SEPARATOR[i] && i < 128) {
                IS_TOKEN[i] = true;
            }

            // Hex: 0-9, a-f, A-F
            if ((i >= '0' && i <='9') || (i >= 'a' && i <= 'f') || (i >= 'A' && i <= 'F')) {
                IS_HEX[i] = true;
            }

            // Not valid for request target.
            // Combination of multiple rules from RFC7230 and RFC 3986. Must be
            // ASCII, no controls plus a few additional characters excluded
            if (IS_CONTROL[i] || i > 127 ||
                    i == ' ' || i == '\"' || i == '#' || i == '<' || i == '>' || i == '\\' ||
                    i == '^' || i == '`'  || i == '{' || i == '|' || i == '}') {
                if (!REQUEST_TARGET_ALLOW[i]) {
                    IS_NOT_REQUEST_TARGET[i] = true;
                }
            }

            // Not valid for HTTP protocol
            // "HTTP/" DIGIT "." DIGIT
            if (i == 'H' || i == 'T' || i == 'P' || i == '/' || i == '.' || (i >= '0' && i <= '9')) {
                IS_HTTP_PROTOCOL[i] = true;
            }
        }
    }
}
```

换成tomcat`7.0.69`可以成功运行。
