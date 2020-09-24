---
title: windows 编绎spring-framework源代码遇到的问题
tags:
  - Spring
  - schemaZip
abbrlink: 53da
date: 2017-07-25 12:57:44
---
1. schemaZip 找不到问题
```java 
:spring-webmvc-portlet:sourcesJar UP-TO-DATE
:spring-webmvc-tiles2:javadoc SKIPPED
:spring-webmvc-tiles2:javadocJar SKIPPED
:spring-webmvc-tiles2:sourcesJar SKIPPED
:spring-websocket:javadoc UP-TO-DATE
:spring-websocket:javadocJar UP-TO-DATE
:spring-websocket:sourcesJar UP-TO-DATE
:schemaZip

FAILURE: Build failed with an exception.

* What went wrong:
Failed to capture snapshot of input files for task 'schemaZip' during up-to-date c
heck.  See stacktrace for details.
> java.io.FileNotFoundException: d:\...spring-framework-schema.zip
```
主要是因为在windows上路径分隔符不一样导致的。[stackoverflow给出了解决办法](https://stackoverflow.com/questions/34916981/build-spring-framework-source-code-encounter-an-error)   
将`spring-framework/gradle/docs.gradle`中的`schemaZip`任务修改为下面形式就可以了。

```gradle
task schemaZip(type: Zip) {
        group = "Distribution"
        baseName = "spring-framework"
        classifier = "schema"
        description = "Builds -${classifier} archive containing all " +
            "XSDs for deployment at http://springframework.org/schema."
        duplicatesStrategy 'exclude'
        moduleProjects.each { subproject ->
            def Properties schemas = new Properties();

            subproject.sourceSets.main.resources.find {
                it.path.endsWith("META-INF\\spring.schemas")
            }?.withInputStream { schemas.load(it) }

            for (def key : schemas.keySet()) {
                def shortName = key.replaceAll(/http.*schema.(.*).spring-.*/, '$1')
                assert shortName != key
                File xsdFile = subproject.sourceSets.main.resources.find {
                    it.path.endsWith(schemas.get(key).replaceAll('\\/','\\\\'))
                }
                assert xsdFile != null
                into (shortName) {
                    from xsdFile.path
                }
            }
        }
    }
```

2. 因为测试用例执行不过的问题
```shell
* What went wrong:
Execution failed for task ':spring-aop:compileTestJava'.
> Compilation failed; see the compiler error output for details.
```
网上有说加上 `-x test` 可以跳过测试，但是如果test代码有编绎错误的话好像还是会失败。
1. 加上 `--continue`参数失败之后继续
2. `-x compileTestJava` 直接跳过这个报错的任务。

最后想吐槽一下的是为啥测试用例编绎不过。