---
title: Spring Boot 六 - 部署Spring Boot应用
date: 2017-10-09 18:16:54
tags:
---

在部署应用时，Spring Boot 灵活的打包选项提供了大量的选择。你可以轻松地将Spring Boot 应用部署到各种云平台、容器镜像(例如Docker)或虚拟/真实机器上。

本节将介绍一些更常见的部署场景。
## 部署到云上
Spring Boot的可执行jar对于大多数流行的云PaaS(平台即服务)提供者都是直接可用的。这些提供者往往要求你“自带容器”;它们管理应用程序进程程(不是专门针对Java应用程序的)，因此它们需要一些中间层，以使应用程序适应云的运行过程的概念。

两家受欢迎的云服务提供商，Heroku和Cloud Foundry，采用了一种“buildpack”的方式。buildpack将你部署的代码封装在*启动应用程序*所需的任何东西中:它可能是一个JDK和对`java`的调用，它可能是一个嵌入式web服务器，或者它可能是一个成熟的应用程序服务器。buildpack是可插拔的，但理想情况下，你应该能够尽可能少地定制它。这减少了不受你控制的功能的占用。它最小化了开发和生产环境之间的差异。

理想情况下，你的应用程序，就像一个Spring Boot 的可执行jar一样，拥有它需要在其中运行的所有东西。

在本节中，我们将看看在“入门”部分中[开发的简单应用程序](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#getting-started-first-application)在云中运行所需的功能。

### Cloud Foundry
如果没有指定其他buildpack ，则Cloud Foundry提供了默认的buildpack 。Cloud Foundry [Java buildpack](https://github.com/cloudfoundry/java-buildpack)为Spring应用程序提供了极好的支持，包括Spring Boot。你可以部署独立的可执行jar应用程序，以及传统的`.war`包应用程序。

构建应用程序（使用例如`mvn clean package`）并[安装`cf`命令行工具后](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html)，只需像下面这样使用`cf push`命令部署应用程序，将其中的路径替换为你自己编译好的`.jar`路径。在推送应用之前，一定要使用[你的`cf`命令行客户端登录](http://docs.cloudfoundry.org/devguide/installcf/whats-new-v6.html#login)。
```
$ cf push acloudyspringtime -p target/demo-0.0.1-SNAPSHOT.jar
```
有关更多选项，请参阅[`cf push`文档](http://docs.cloudfoundry.org/devguide/installcf/whats-new-v6.html#push)。 如果在同一目录中存在Cloud Foundry [`manifest.yml`](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html)文件，则会参考这个文件。

> 这里我们用`acloudyspringtime`代替你给cf的任何值，该值作为你的应用程序的名称。

此时，`cf`将开始上传你的应用程序:
```
Uploading acloudyspringtime... OK
Preparing to start acloudyspringtime... OK
-----> Downloaded app package (8.9M)
-----> Java Buildpack Version: v3.12 (offline) | https://github.com/cloudfoundry/java-buildpack.git#6f25b7e
-----> Downloading Open Jdk JRE 1.8.0_121 from https://java-buildpack.cloudfoundry.org/openjdk/trusty/x86_64/openjdk-1.8.0_121.tar.gz (found in cache)
       Expanding Open Jdk JRE to .java-buildpack/open_jdk_jre (1.6s)
-----> Downloading Open JDK Like Memory Calculator 2.0.2_RELEASE from https://java-buildpack.cloudfoundry.org/memory-calculator/trusty/x86_64/memory-calculator-2.0.2_RELEASE.tar.gz (found in cache)
       Memory Settings: -Xss349K -Xmx681574K -XX:MaxMetaspaceSize=104857K -Xms681574K -XX:MetaspaceSize=104857K
-----> Downloading Container Certificate Trust Store 1.0.0_RELEASE from https://java-buildpack.cloudfoundry.org/container-certificate-trust-store/container-certificate-trust-store-1.0.0_RELEASE.jar (found in cache)
       Adding certificates to .java-buildpack/container_certificate_trust_store/truststore.jks (0.6s)
-----> Downloading Spring Auto Reconfiguration 1.10.0_RELEASE from https://java-buildpack.cloudfoundry.org/auto-reconfiguration/auto-reconfiguration-1.10.0_RELEASE.jar (found in cache)
Checking status of app 'acloudyspringtime'...
  0 of 1 instances running (1 starting)
  ...
  0 of 1 instances running (1 starting)
  ...
  0 of 1 instances running (1 starting)
  ...
  1 of 1 instances running (1 running)

App started
```
祝贺你！应用现在已经运行了！

很容易验证已部署的应用的状态:
```
$ cf apps
Getting applications in ...
OK

name                 requested state   instances   memory   disk   urls
...
acloudyspringtime    started           1/1         512M     1G     acloudyspringtime.cfapps.io
...
```
一旦Cloud Foundry认为你的应用已经部署,你应该能够访问给定的URI,在这个例子中是`http://acloudyspringtime.cfapps.io/`。

#### 绑定到服务
默认情况下，关于运行应用程序和服务连接信息的元数据将作为环境变量(例如:`$VCAP_SERVICES`)暴露给应用程序。这个架构决策是由于Cloud Foundry的polyglot(任何语言和平台都可以作为buildpack支持)的特性;进程范围的环境变量是语言无关的。

环境变量并不总是适合最简单的API，所以Spring Boot 自动提取它们并将数据转化为可以通过Spring的`Environment`抽象来访问的属性。
```java
@Component
class MyBean implements EnvironmentAware {

    private String instanceId;

    @Override
    public void setEnvironment(Environment environment) {
        this.instanceId = environment.getProperty("vcap.application.instance_id");
    }

    // ...

}
```
所有的Cloud Foundry属性都是以`vcap`为前缀的。你可以使用vcap属性来访问应用程序信息(例如应用程序的公共URL)和服务信息(例如数据库凭据)。有关完整的详细信息，请参阅`CloudFoundryVcapEnvironmentPostProcessor` Javadoc。

> [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/)项目更适合配置DataSource等任务。 Spring Boot包括自动配置支持和`spring-boot-starter-cloud-connectors` starter。

### Heroku
### OpenShift
[OpenShift](https://www.openshift.com/)是RedHat public(和enterprise)PaaS解决方案。与Heroku一样，它通过运行由git提交的脚本运行，因此，只要Java运行时可用(这是你在OpenShift中可以要求的标准功能)，你可以用任何方式编写Spring Boot 应用程序的启动。要做到这一点，你可以在你的仓库的`.openshift/action_hooks`下使用[DIY Cartridge ](https://www.openshift.com/developers/do-it-yourself)和hook。

基本的模型是:
1. 确保Java和你的构建工具是远程安装的，例如使用`pre_build` hook(Java和Maven是默认安装的，而Gradle则不是)。
2. 使用`build` hook来构建你的jar(使用Maven 或Gradle )。
```
#!/bin/bash
cd $OPENSHIFT_REPO_DIR
mvn package -s .openshift/settings.xml -DskipTests=true
```
3. 添加一个调用`java-jar ...`的`start` hook
```
#!/bin/bash
cd $OPENSHIFT_REPO_DIR
nohup java -jar target/*.jar --server.port=${OPENSHIFT_DIY_PORT} --server.address=${OPENSHIFT_DIY_IP} &
```
4. 使用一个`stop` hook(因为start应该干净地返回???)。
```
#!/bin/bash
source $OPENSHIFT_CARTRIDGE_SDK_BASH
PID=$(ps -ef | grep java.*\.jar | grep -v grep | awk '{ print $2 }')
if [ -z "$PID" ]
then
    client_result "Application is already stopped"
else
    kill $PID
fi
```
5. 在`application.properties`中由平台提供的环境变量的服务绑定,例如:
```
spring.datasource.url= jdbc:mysql://${OPENSHIFT_MYSQL_DB_HOST}:${OPENSHIFT_MYSQL_DB_PORT}/${OPENSHIFT_APP_NAME}
spring.datasource.username= ${OPENSHIFT_MYSQL_DB_USERNAME}
spring.datasource.password= ${OPENSHIFT_MYSQL_DB_PASSWORD}
```
在他们的网站上有一个关于在OpenShift上运行Gradle的博客，让你使用gradle来运行你的应用。
### Amazon Web Services (AWS)

#### AWS Elastic Beanstalk
#### 总结
### Boxfuse and Amazon Web Services
### Google Cloud
Google Cloud有几个选项可以用来启动Spring Boot应用。最容易开始使用的可能是App Engine，但是你也可以找到在容器引擎的容器中运行Spring Boot，或者在虚拟机上使用计算引擎运行Spring Boot的方法。

要在App Engine中运行，你可以首先在UI中创建一个项目，它为你设置一个惟一的标识符和HTTP路由。将Java应用程序添加到项目中，然后将其清空，然后使用[Google Cloud SDK](https://cloud.google.com/sdk/downloads)将你的Spring Boot应用从命令行或CI构建中push到该项目。

App Engine需要你创建一个`app.yaml`文件来描述你的应用所需要的资源。通常你把它放在`src/min/appengine`，它看起来是这样的:
```
service: default

runtime: java
env: flex

runtime_config:
  jdk: openjdk8

handlers:
- url: /.*
  script: this field is required, but ignored

manual_scaling:
  instances: 1

health_check:
  enable_health_check: False

env_variables:
  ENCRYPT_KEY: your_encryption_key_here
```
例如，你可以使用Maven插件来部署该应用程序，只需将项目ID添加到构建配置中即可:
```
<plugin>
    <groupId>com.google.cloud.tools</groupId>
    <artifactId>appengine-maven-plugin</artifactId>
    <version>1.3.0</version>
    <configuration>
        <project>myproject</project>
    </configuration>
</plugin>
```
然后使用`mvn appengine:deploy`(如果你需要先进行身份验证，构建将失败)。

> Google App Engine Classic与Servlet 2.5 API绑定住了，因此你不能在没有修改的情况下部署Spring应用。请参阅本指南的[Servlet 2.5部分](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#howto-servlet-2-5)。

## 安装Spring Boot应用
除了使用`java -jar`运行Spring Boot应用程序外，还可以为Unix系统创建完整的可执行的应用程序。完整可执行的jar可以像任何其他可执行二进制文件一样执行，也可以使用[`init.d`或`systemd`](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#deployment-service)进行注册。这使得在常见的生产环境中安装和管理Spring Boot应用程序非常容易。

> 完全可执行的jar通过在文件的前面嵌入一个额外的脚本来工作。目前，有些工具不接受这种格式，因此你可能不总是能够使用这种技术。例如，`jar -xf`可能会在提取出jar或完全可执行的war时失败。如果你打算直接执行它，而不是用`java -jar`运行它，或者将它部署到servlet容器中，那么建议你仅使你的jar或者war是完全可执行的。

要使用Maven来创建一个“完全可执行”jar，请使用以下插件配置:
```
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <executable>true</executable>
    </configuration>
</plugin>
```
使用Gradle 的配置为：
```
springBoot {
    executable = true
}
```
然后，你可以通过键入`./my-application.jar`（其中`my-application`是你的artifact的名称）来运行应用程序。 包含jar的目录将被用作应用程序的工作目录。
### 支持的操作系统
默认的脚本支付大多数Linux分发版本并且已经在CentOS和Ubuntu上测试通过。其他的平台比如OS X和FreeBSD，需要 使用自定义的`embeddedLaunchScript`。

### Unix/Linux服务
Spring Boot应用可以方便地作为Unix/Linux服务，既可以使用`init.d`又可以使用`systemd`。
#### 安装为init.d服务(System V)
如果你配置了Spring Boot的Maven或者Gradle插件来生成[完全可执行的jar](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#deployment-install)，并且你没有使用自定义的`embeddedLaunchScript`，那么你的应用可以当作`init.d`服务来使用。简单地将jar链接到`init.d`以支持标准的`start`，`stop`，`restart`和`status`命令。
该脚本支持以下功能：
- 以拥有该jar文件的用户身份启动服务
- 使用`/var/run/<appname>/<appname>.pid`跟踪应用程序的PID
- 将控制台日志写入`/var/log/<appname>.log`

假设你有一个Spring Boot 应用程序安装在`/var/ myapp`中，安装Spring Boot 应用程序作为`init.d`服务只需创建一个符号链接：
```
$ sudo ln -s /var/myapp/myapp.jar /etc/init.d/myapp
```
一旦安装之后 ，你可以按照通常的方式启动和停止服务。例如，在基于Debian的系统上：
```
$ service myapp start
```

> 如果你的应用程序无法启动，请检查写入`/var/log/<appname>.log`的日志文件是否有错误。

你还可以将应用程序标记为使用标准操作系统工具自动启动。例如，在Debian上：
```
$ update-rc.d myapp defaults <priority>
```
###### 保护init.d服务
> 以下是关于如何保护作为init.d服务运行的Spring Boot应用程序的一组指导。 它并不是为了强化应用程序和运行环境而应该做的一切的详尽列表。

当以root身份执行时，在使用root来启动init.d服务的情况下，可执行脚本将默认以拥有该jar文件的用户身份运行应用程序。你不应该以`root`身份运行Spring Boot 应用程序，因此应用程序的jar文件不应该由root拥有。 相反，创建一个特定的用户来运行应用程序，并使用`chown`将其作为jar文件的所有者。 例如：
```
$ chown bootapp:bootapp your-app.jar
```
在这种情况下，可执行脚本默认将以`bootapp`用户运行应用程序。
> 为了减少应用程序的用户帐户遭到入侵的机会，你应该考虑防止其使用登录shell。例如，将帐户的shell设置为`/usr/sbin/nologin`。

你还应该采取措施来阻止修改应用程序的jar文件。首先，配置其权限，使其不能被写入，并且只能由其所有者读取或执行：
```
$ chmod 500 your-app.jar
```
其次，如果你的应用程序或运行它的帐户遭到破坏，你还应采取措施减少损失。如果攻击者确实获得访问权限，他们可以使jar文件可写，并更改其内容。防止这种情况的一种方法是使用`chattr`使其变得不可变：
```
$ sudo chattr +i your-app.jar
```
这将阻止任何用户（包括root）修改该jar。

如果root用于控制应用程序的服务，则使用一个用于自定义启动的[`.conf`文件](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#deployment-script-customization-conf-file)。root用户将会读取和验证`.conf`文件。它也应该保证相应的安全性。使用`chmod`使文件只能由所有者读取，并使用`chown`来使root作为其拥有者。
```
$ chmod 400 your-app.conf
$ sudo chown root:root your-app.conf
```

#### 安装为systemd 服务
Systemd是System V init系统的后继者，现在被许多现代Linux发行版使用。尽管你可以继续使用`systemd`的`init.d`脚本，但也可以使用`systemd` 'service' 脚本启动Spring Boot应用程序。

假设你在`/var/myapp`中安装了一个Spring Boot应用程序，要将Spring Boot应用程序安装为系统服务，请创建使用以下示例的名为`myapp.service`的脚本，并将其放在`/etc/systemd/system`目录中：
```shell
[Unit]
Description=myapp
After=syslog.target

[Service]
User=myapp
ExecStart=/var/myapp/myapp.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```
> 请记住更改应用程序的`Description`，`User`和`ExecStart`字段。

> 请注意，`ExecStart`字段不声明脚本操作命令，这意味着默认情况下使用`run`命令。

请注意，与运行`init.d`服务不同，运行应用程序，PID文件和控制台日志文件的用户由`systemd`本身管理，因此必须使用'service'脚本中的适当字段进行配置。 有关详细信息，请参阅[服务单元配置手册页](http://www.freedesktop.org/software/systemd/man/systemd.service.html)。

要标记应用程序在系统启动时自动启动，请使用以下命令：
```
$ systemctl enable myapp.service
```
请参考`man systemctl`了解更多详情。
#### 自定义启动脚本
### 微软Windows服务
## 延伸阅读
