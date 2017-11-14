---
title: Spring Boot 十 - 附录
date: 2017-11-09 15:15:26
tags: [Spring Boot , 附录]
---

## 附录 A. 常用应用属性
可以在`application.properties`/`application.yml`文件中指定各种属性，或者作为命令行开关。 本节提供了常用Spring Boot属性的列表以及对使用它们的基础类的引用。

> 属性可以来自你的类路径上的其他jar文件，所以你不应该认为这是一个详尽的列表。 定义自己的属性也是完全合法的。

> 此示例文件仅作为指导。 **不要**将整个内容复制/粘贴到应用程序中; 而只选择你需要的属性。

```properties
# ===================================================================
# COMMON SPRING BOOT PROPERTIES
#
# This sample file is provided as a guideline. Do NOT copy it in its
# entirety to your own application.               ^^^
# ===================================================================


# ----------------------------------------
# CORE PROPERTIES
# ----------------------------------------

# BANNER
banner.charset=UTF-8 # Banner file encoding.
banner.location=classpath:banner.txt # Banner file location.
banner.image.location=classpath:banner.gif # Banner image file location (jpg/png can also be used).
banner.image.width= # Width of the banner image in chars (default 76)
banner.image.height= # Height of the banner image in chars (default based on image height)
banner.image.margin= # Left hand image margin in chars (default 2)
banner.image.invert= # If images should be inverted for dark terminal themes (default false)

# LOGGING
logging.config= # Location of the logging configuration file. For instance `classpath:logback.xml` for Logback
logging.exception-conversion-word=%wEx # Conversion word used when logging exceptions.
logging.file= # Log file name. For instance `myapp.log`
logging.level.*= # Log levels severity mapping. For instance `logging.level.org.springframework=DEBUG`
logging.path= # Location of the log file. For instance `/var/log`
logging.pattern.console= # Appender pattern for output to the console. Only supported with the default logback setup.
logging.pattern.file= # Appender pattern for output to the file. Only supported with the default logback setup.
logging.pattern.level= # Appender pattern for log level (default %5p). Only supported with the default logback setup.
logging.register-shutdown-hook=false # Register a shutdown hook for the logging system when it is initialized.

# AOP
spring.aop.auto=true # Add @EnableAspectJAutoProxy.
spring.aop.proxy-target-class=true # Whether subclass-based (CGLIB) proxies are to be created (true) as opposed to standard Java interface-based proxies (false).

# IDENTITY (ContextIdApplicationContextInitializer)
spring.application.index= # Application index.
spring.application.name= # Application name.

# ADMIN (SpringApplicationAdminJmxAutoConfiguration)
spring.application.admin.enabled=false # Enable admin features for the application.
spring.application.admin.jmx-name=org.springframework.boot:type=Admin,name=SpringApplication # JMX name of the application admin MBean.

# AUTO-CONFIGURATION
spring.autoconfigure.exclude= # Auto-configuration classes to exclude.

# SPRING CORE
spring.beaninfo.ignore=true # Skip search of BeanInfo classes.

# SPRING CACHE (CacheProperties)
spring.cache.cache-names= # Comma-separated list of cache names to create if supported by the underlying cache manager.
spring.cache.caffeine.spec= # The spec to use to create caches. Check CaffeineSpec for more details on the spec format.
spring.cache.couchbase.expiration=0 # Entry expiration in milliseconds. By default the entries never expire.
spring.cache.ehcache.config= # The location of the configuration file to use to initialize EhCache.
spring.cache.infinispan.config= # The location of the configuration file to use to initialize Infinispan.
spring.cache.jcache.config= # The location of the configuration file to use to initialize the cache manager.
spring.cache.jcache.provider= # Fully qualified name of the CachingProvider implementation to use to retrieve the JSR-107 compliant cache manager. Only needed if more than one JSR-107 implementation is available on the classpath.
spring.cache.type= # Cache type, auto-detected according to the environment by default.

# SPRING CONFIG - using environment property only (ConfigFileApplicationListener)
spring.config.location= # Config file locations.
spring.config.name=application # Config file name.

# HAZELCAST (HazelcastProperties)
spring.hazelcast.config= # The location of the configuration file to use to initialize Hazelcast.

# PROJECT INFORMATION (ProjectInfoProperties)
spring.info.build.location=classpath:META-INF/build-info.properties # Location of the generated build-info.properties file.
spring.info.git.location=classpath:git.properties # Location of the generated git.properties file.

# JMX
spring.jmx.default-domain= # JMX domain name.
spring.jmx.enabled=true # Expose management beans to the JMX domain.
spring.jmx.server=mbeanServer # MBeanServer bean name.

# Email (MailProperties)
spring.mail.default-encoding=UTF-8 # Default MimeMessage encoding.
spring.mail.host= # SMTP server host. For instance `smtp.example.com`
spring.mail.jndi-name= # Session JNDI name. When set, takes precedence to others mail settings.
spring.mail.password= # Login password of the SMTP server.
spring.mail.port= # SMTP server port.
spring.mail.properties.*= # Additional JavaMail session properties.
spring.mail.protocol=smtp # Protocol used by the SMTP server.
spring.mail.test-connection=false # Test that the mail server is available on startup.
spring.mail.username= # Login user of the SMTP server.

# APPLICATION SETTINGS (SpringApplication)
spring.main.banner-mode=console # Mode used to display the banner when the application runs.
spring.main.sources= # Sources (class name, package name or XML resource location) to include in the ApplicationContext.
spring.main.web-application-type= # Flag to explicitly request a specific type of web application. Auto-detected based on the classpath if not set.

# FILE ENCODING (FileEncodingApplicationListener)
spring.mandatory-file-encoding= # Expected character encoding the application must use.

# INTERNATIONALIZATION (MessageSourceAutoConfiguration)
spring.messages.always-use-message-format=false # Set whether to always apply the MessageFormat rules, parsing even messages without arguments.
spring.messages.basename=messages # Comma-separated list of basenames, each following the ResourceBundle convention.
spring.messages.cache-seconds=-1 # Loaded resource bundle files cache expiration, in seconds. When set to -1, bundles are cached forever.
spring.messages.encoding=UTF-8 # Message bundles encoding.
spring.messages.fallback-to-system-locale=true # Set whether to fall back to the system Locale if no files for a specific Locale have been found.
spring.messages.use-code-as-default-message=false # Set whether to use the message code as default message instead of throwing a "NoSuchMessageException". Recommended during development only.

# OUTPUT
spring.output.ansi.enabled=detect # Configure the ANSI output.

# PID FILE (ApplicationPidFileWriter)
spring.pid.fail-on-write-error= # Fail if ApplicationPidFileWriter is used but it cannot write the PID file.
spring.pid.file= # Location of the PID file to write (if ApplicationPidFileWriter is used).

# PROFILES
spring.profiles.active= # Comma-separated list (or list if using YAML) of active profiles.
spring.profiles.include= # Unconditionally activate the specified comma separated profiles (or list of profiles if using YAML).

# QUARTZ SCHEDULER (QuartzProperties)
spring.quartz.job-store-type=memory # Quartz job store type.
spring.quartz.properties.*= # Additional Quartz Scheduler properties.
spring.quartz.jdbc.initialize-schema=embedded # Database schema initialization mode.
spring.quartz.jdbc.schema=classpath:org/quartz/impl/jdbcjobstore/tables_@@platform@@.sql # Path to the SQL file to use to initialize the database schema.

# Reactor
spring.reactor.stacktrace-mode.enabled=false # Set whether Reactor should collect stacktrace information at runtime.

# SENDGRID (SendGridAutoConfiguration)
spring.sendgrid.api-key= # SendGrid API key.
spring.sendgrid.proxy.host= # SendGrid proxy host.
spring.sendgrid.proxy.port= # SendGrid proxy port.


# ----------------------------------------
# WEB PROPERTIES
# ----------------------------------------

# EMBEDDED SERVER CONFIGURATION (ServerProperties)
server.address= # Network address to which the server should bind to.
server.compression.enabled=false # If response compression is enabled.
server.compression.excluded-user-agents= # List of user-agents to exclude from compression.
server.compression.mime-types=text/html,text/xml,text/plain,text/css,text/javascript,application/javascript # Comma-separated list of MIME types that should be compressed.
server.compression.min-response-size=2048 # Minimum response size that is required for compression to be performed.
server.connection-timeout= # Time in milliseconds that connectors will wait for another HTTP request before closing the connection. When not set, the connector's container-specific default will be used. Use a value of -1 to indicate no (i.e. infinite) timeout.
server.display-name=application # Display name of the application.
server.max-http-header-size=0 # Maximum size in bytes of the HTTP message header.
server.error.include-exception=false # Include the "exception" attribute.
server.error.include-stacktrace=never # When to include a "stacktrace" attribute.
server.error.path=/error # Path of the error controller.
server.error.whitelabel.enabled=true # Enable the default error page displayed in browsers in case of a server error.
server.jetty.acceptors= # Number of acceptor threads to use.
server.jetty.accesslog.append=false # Append to log.
server.jetty.accesslog.date-format=dd/MMM/yyyy:HH:mm:ss Z # Timestamp format of the request log.
server.jetty.accesslog.enabled=false # Enable access log.
server.jetty.accesslog.extended-format=false # Enable extended NCSA format.
server.jetty.accesslog.file-date-format= # Date format to place in log file name.
server.jetty.accesslog.filename= # Log filename. If not specified, logs will be redirected to "System.err".
server.jetty.accesslog.locale= # Locale of the request log.
server.jetty.accesslog.log-cookies=false # Enable logging of the request cookies.
server.jetty.accesslog.log-latency=false # Enable logging of request processing time.
server.jetty.accesslog.log-server=false # Enable logging of the request hostname.
server.jetty.accesslog.retention-period=31 # Number of days before rotated log files are deleted.
server.jetty.accesslog.time-zone=GMT # Timezone of the request log.
server.jetty.max-http-post-size=0 # Maximum size in bytes of the HTTP post or put content.
server.jetty.selectors= # Number of selector threads to use.
server.port=8080 # Server HTTP port.
server.server-header= # Value to use for the Server response header (no header is sent if empty)
server.use-forward-headers= # If X-Forwarded-* headers should be applied to the HttpRequest.
server.servlet.context-parameters.*= # Servlet context init parameters
   server.servlet.context-path= # Context path of the application.
   server.servlet.jsp.class-name=org.apache.jasper.servlet.JspServlet # The class name of the JSP servlet.
server.servlet.jsp.init-parameters.*= # Init parameters used to configure the JSP servlet
server.servlet.jsp.registered=true # Whether or not the JSP servlet is registered
   server.servlet.path=/ # Path of the main dispatcher servlet.
server.session.cookie.comment= # Comment for the session cookie.
server.session.cookie.domain= # Domain for the session cookie.
server.session.cookie.http-only= # "HttpOnly" flag for the session cookie.
server.session.cookie.max-age= # Maximum age of the session cookie in seconds.
server.session.cookie.name= # Session cookie name.
server.session.cookie.path= # Path of the session cookie.
server.session.cookie.secure= # "Secure" flag for the session cookie.
server.session.persistent=false # Persist session data between restarts.
server.session.store-dir= # Directory used to store session data.
server.session.timeout= # Session timeout in seconds.
server.session.tracking-modes= # Session tracking modes (one or more of the following: "cookie", "url", "ssl").
server.ssl.ciphers= # Supported SSL ciphers.
server.ssl.client-auth= # Whether client authentication is wanted ("want") or needed ("need"). Requires a trust store.
server.ssl.enabled= # Enable SSL support.
server.ssl.enabled-protocols= # Enabled SSL protocols.
server.ssl.key-alias= # Alias that identifies the key in the key store.
server.ssl.key-password= # Password used to access the key in the key store.
server.ssl.key-store= # Path to the key store that holds the SSL certificate (typically a jks file).
server.ssl.key-store-password= # Password used to access the key store.
server.ssl.key-store-provider= # Provider for the key store.
server.ssl.key-store-type= # Type of the key store.
server.ssl.protocol=TLS # SSL protocol to use.
server.ssl.trust-store= # Trust store that holds SSL certificates.
server.ssl.trust-store-password= # Password used to access the trust store.
server.ssl.trust-store-provider= # Provider for the trust store.
server.ssl.trust-store-type= # Type of the trust store.
server.tomcat.accept-count= # Maximum queue length for incoming connection requests when all possible request processing threads are in use.
server.tomcat.accesslog.buffered=true # Buffer output such that it is only flushed periodically.
server.tomcat.accesslog.directory=logs # Directory in which log files are created. Can be relative to the tomcat base dir or absolute.
server.tomcat.accesslog.enabled=false # Enable access log.
server.tomcat.accesslog.file-date-format=.yyyy-MM-dd # Date format to place in log file name.
server.tomcat.accesslog.pattern=common # Format pattern for access logs.
server.tomcat.accesslog.prefix=access_log # Log file name prefix.
server.tomcat.accesslog.rename-on-rotate=false # Defer inclusion of the date stamp in the file name until rotate time.
server.tomcat.accesslog.request-attributes-enabled=false # Set request attributes for IP address, Hostname, protocol and port used for the request.
server.tomcat.accesslog.rotate=true # Enable access log rotation.
server.tomcat.accesslog.suffix=.log # Log file name suffix.
server.tomcat.additional-tld-skip-patterns= # Comma-separated list of additional patterns that match jars to ignore for TLD scanning.
server.tomcat.background-processor-delay=30 # Delay in seconds between the invocation of backgroundProcess methods.
server.tomcat.basedir= # Tomcat base directory. If not specified a temporary directory will be used.
server.tomcat.internal-proxies=10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\
		192\\.168\\.\\d{1,3}\\.\\d{1,3}|\\
		169\\.254\\.\\d{1,3}\\.\\d{1,3}|\\
		127\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\
		172\\.1[6-9]{1}\\.\\d{1,3}\\.\\d{1,3}|\\
		172\\.2[0-9]{1}\\.\\d{1,3}\\.\\d{1,3}|\\
		172\\.3[0-1]{1}\\.\\d{1,3}\\.\\d{1,3} # regular expression matching trusted IP addresses.
server.tomcat.max-connections= # Maximum number of connections that the server will accept and process at any given time.
server.tomcat.max-http-header-size=0 # Maximum size in bytes of the HTTP message header.
server.tomcat.max-http-post-size=0 # Maximum size in bytes of the HTTP post content.
server.tomcat.max-threads=0 # Maximum amount of worker threads.
server.tomcat.min-spare-threads=0 # Minimum amount of worker threads.
server.tomcat.port-header=X-Forwarded-Port # Name of the HTTP header used to override the original port value.
server.tomcat.protocol-header= # Header that holds the incoming protocol, usually named "X-Forwarded-Proto".
server.tomcat.protocol-header-https-value=https # Value of the protocol header that indicates that the incoming request uses SSL.
server.tomcat.redirect-context-root= # Whether requests to the context root should be redirected by appending a / to the path.
server.tomcat.remote-ip-header= # Name of the http header from which the remote ip is extracted. For instance `X-FORWARDED-FOR`
server.tomcat.uri-encoding=UTF-8 # Character encoding to use to decode the URI.
server.undertow.accesslog.dir= # Undertow access log directory.
server.undertow.accesslog.enabled=false # Enable access log.
server.undertow.accesslog.pattern=common # Format pattern for access logs.
server.undertow.accesslog.prefix=access_log. # Log file name prefix.
server.undertow.accesslog.rotate=true # Enable access log rotation.
server.undertow.accesslog.suffix=log # Log file name suffix.
server.undertow.buffer-size= # Size of each buffer in bytes.
server.undertow.direct-buffers= # Allocate buffers outside the Java heap.
server.undertow.io-threads= # Number of I/O threads to create for the worker.
server.undertow.eager-filter-init=true # Whether servlet filters should be initialized on startup.
server.undertow.max-http-post-size=0 # Maximum size in bytes of the HTTP post content.
server.undertow.worker-threads= # Number of worker threads.

# FREEMARKER (FreeMarkerAutoConfiguration)
spring.freemarker.allow-request-override=false # Set whether HttpServletRequest attributes are allowed to override (hide) controller generated model attributes of the same name.
spring.freemarker.allow-session-override=false # Set whether HttpSession attributes are allowed to override (hide) controller generated model attributes of the same name.
spring.freemarker.cache=false # Enable template caching.
spring.freemarker.charset=UTF-8 # Template encoding.
spring.freemarker.check-template-location=true # Check that the templates location exists.
spring.freemarker.content-type=text/html # Content-Type value.
spring.freemarker.enabled=true # Enable MVC view resolution for this technology.
spring.freemarker.expose-request-attributes=false # Set whether all request attributes should be added to the model prior to merging with the template.
spring.freemarker.expose-session-attributes=false # Set whether all HttpSession attributes should be added to the model prior to merging with the template.
spring.freemarker.expose-spring-macro-helpers=true # Set whether to expose a RequestContext for use by Spring's macro library, under the name "springMacroRequestContext".
spring.freemarker.prefer-file-system-access=true # Prefer file system access for template loading. File system access enables hot detection of template changes.
spring.freemarker.prefix= # Prefix that gets prepended to view names when building a URL.
spring.freemarker.request-context-attribute= # Name of the RequestContext attribute for all views.
spring.freemarker.settings.*= # Well-known FreeMarker keys which will be passed to FreeMarker's Configuration.
spring.freemarker.suffix=.ftl # Suffix that gets appended to view names when building a URL.
spring.freemarker.template-loader-path=classpath:/templates/ # Comma-separated list of template paths.
spring.freemarker.view-names= # White list of view names that can be resolved.

# GROOVY TEMPLATES (GroovyTemplateAutoConfiguration)
spring.groovy.template.allow-request-override=false # Set whether HttpServletRequest attributes are allowed to override (hide) controller generated model attributes of the same name.
spring.groovy.template.allow-session-override=false # Set whether HttpSession attributes are allowed to override (hide) controller generated model attributes of the same name.
spring.groovy.template.cache= # Enable template caching.
spring.groovy.template.charset=UTF-8 # Template encoding.
spring.groovy.template.check-template-location=true # Check that the templates location exists.
spring.groovy.template.configuration.*= # See GroovyMarkupConfigurer
spring.groovy.template.content-type=test/html # Content-Type value.
spring.groovy.template.enabled=true # Enable MVC view resolution for this technology.
spring.groovy.template.expose-request-attributes=false # Set whether all request attributes should be added to the model prior to merging with the template.
spring.groovy.template.expose-session-attributes=false # Set whether all HttpSession attributes should be added to the model prior to merging with the template.
spring.groovy.template.expose-spring-macro-helpers=true # Set whether to expose a RequestContext for use by Spring's macro library, under the name "springMacroRequestContext".
spring.groovy.template.prefix= # Prefix that gets prepended to view names when building a URL.
spring.groovy.template.request-context-attribute= # Name of the RequestContext attribute for all views.
spring.groovy.template.resource-loader-path=classpath:/templates/ # Template path.
spring.groovy.template.suffix=.tpl # Suffix that gets appended to view names when building a URL.
spring.groovy.template.view-names= # White list of view names that can be resolved.

# SPRING HATEOAS (HateoasProperties)
spring.hateoas.use-hal-as-default-json-media-type=true # Specify if application/hal+json responses should be sent to requests that accept application/json.

# HTTP message conversion
spring.http.converters.preferred-json-mapper= # Preferred JSON mapper to use for HTTP message conversion, auto-detected according to the environment by default.

# HTTP encoding (HttpEncodingProperties)
spring.http.encoding.charset=UTF-8 # Charset of HTTP requests and responses. Added to the "Content-Type" header if not set explicitly.
spring.http.encoding.enabled=true # Enable http encoding support.
spring.http.encoding.force= # Force the encoding to the configured charset on HTTP requests and responses.
spring.http.encoding.force-request= # Force the encoding to the configured charset on HTTP requests. Defaults to true when "force" has not been specified.
spring.http.encoding.force-response= # Force the encoding to the configured charset on HTTP responses.
spring.http.encoding.mapping= # Locale to Encoding mapping.

# MULTIPART (MultipartProperties)
spring.servlet.multipart.enabled=true # Enable support of multipart uploads.
spring.servlet.multipart.file-size-threshold=0 # Threshold after which files will be written to disk. Values can use the suffixes "MB" or "KB" to indicate megabytes or kilobytes respectively.
spring.servlet.multipart.location= # Intermediate location of uploaded files.
spring.servlet.multipart.max-file-size=1MB # Max file size. Values can use the suffixes "MB" or "KB" to indicate megabytes or kilobytes respectively.
spring.servlet.multipart.max-request-size=10MB # Max request size. Values can use the suffixes "MB" or "KB" to indicate megabytes or kilobytes respectively.
spring.servlet.multipart.resolve-lazily=false # Whether to resolve the multipart request lazily at the time of file or parameter access.

# JACKSON (JacksonProperties)
spring.jackson.date-format= # Date format string or a fully-qualified date format class name. For instance `yyyy-MM-dd HH:mm:ss`.
spring.jackson.default-property-inclusion= # Controls the inclusion of properties during serialization.
spring.jackson.deserialization.*= # Jackson on/off features that affect the way Java objects are deserialized.
spring.jackson.generator.*= # Jackson on/off features for generators.
spring.jackson.joda-date-time-format= # Joda date time format string. If not configured, "date-format" will be used as a fallback if it is configured with a format string.
spring.jackson.locale= # Locale used for formatting.
spring.jackson.mapper.*= # Jackson general purpose on/off features.
spring.jackson.parser.*= # Jackson on/off features for parsers.
spring.jackson.property-naming-strategy= # One of the constants on Jackson's PropertyNamingStrategy. Can also be a fully-qualified class name of a PropertyNamingStrategy subclass.
spring.jackson.serialization.*= # Jackson on/off features that affect the way Java objects are serialized.
spring.jackson.time-zone= # Time zone used when formatting dates. For instance `America/Los_Angeles`

# JERSEY (JerseyProperties)
spring.jersey.application-path= # Path that serves as the base URI for the application. Overrides the value of "@ApplicationPath" if specified.
spring.jersey.filter.order=0 # Jersey filter chain order.
spring.jersey.init.*= # Init parameters to pass to Jersey via the servlet or filter.
spring.jersey.servlet.load-on-startup=-1 # Load on startup priority of the Jersey servlet.
spring.jersey.type=servlet # Jersey integration type.

   # SPRING LDAP (LdapProperties)
   spring.ldap.urls= # LDAP URLs of the server.
   spring.ldap.base= # Base suffix from which all operations should originate.
   spring.ldap.username= # Login user of the server.
   spring.ldap.password= # Login password of the server.
   spring.ldap.base-environment.*= # LDAP specification settings.

   # EMBEDDED LDAP (EmbeddedLdapProperties)
   spring.ldap.embedded.base-dn= # The base DN
   spring.ldap.embedded.credential.username= # Embedded LDAP username.
   spring.ldap.embedded.credential.password= # Embedded LDAP password.
   spring.ldap.embedded.ldif=classpath:schema.ldif # Schema (LDIF) script resource reference.
   spring.ldap.embedded.port= # Embedded LDAP port.
   spring.ldap.embedded.validation.enabled=true # Enable LDAP schema validation.
   spring.ldap.embedded.validation.schema= # Path to the custom schema.

# SPRING MOBILE DEVICE VIEWS (DeviceDelegatingViewResolverAutoConfiguration)
spring.mobile.devicedelegatingviewresolver.enable-fallback=false # Enable support for fallback resolution.
spring.mobile.devicedelegatingviewresolver.enabled=false # Enable device view resolver.
spring.mobile.devicedelegatingviewresolver.mobile-prefix=mobile/ # Prefix that gets prepended to view names for mobile devices.
spring.mobile.devicedelegatingviewresolver.mobile-suffix= # Suffix that gets appended to view names for mobile devices.
spring.mobile.devicedelegatingviewresolver.normal-prefix= # Prefix that gets prepended to view names for normal devices.
spring.mobile.devicedelegatingviewresolver.normal-suffix= # Suffix that gets appended to view names for normal devices.
spring.mobile.devicedelegatingviewresolver.tablet-prefix=tablet/ # Prefix that gets prepended to view names for tablet devices.
spring.mobile.devicedelegatingviewresolver.tablet-suffix= # Suffix that gets appended to view names for tablet devices.

# SPRING MOBILE SITE PREFERENCE (SitePreferenceAutoConfiguration)
spring.mobile.sitepreference.enabled=true # Enable SitePreferenceHandler.

# MUSTACHE TEMPLATES (MustacheAutoConfiguration)
spring.mustache.allow-request-override= # Set whether HttpServletRequest attributes are allowed to override (hide) controller generated model attributes of the same name.
spring.mustache.allow-session-override= # Set whether HttpSession attributes are allowed to override (hide) controller generated model attributes of the same name.
spring.mustache.cache= # Enable template caching.
spring.mustache.charset= # Template encoding.
spring.mustache.check-template-location= # Check that the templates location exists.
spring.mustache.content-type= # Content-Type value.
spring.mustache.enabled= # Enable MVC view resolution for this technology.
spring.mustache.expose-request-attributes= # Set whether all request attributes should be added to the model prior to merging with the template.
spring.mustache.expose-session-attributes= # Set whether all HttpSession attributes should be added to the model prior to merging with the template.
spring.mustache.expose-spring-macro-helpers= # Set whether to expose a RequestContext for use by Spring's macro library, under the name "springMacroRequestContext".
spring.mustache.prefix=classpath:/templates/ # Prefix to apply to template names.
spring.mustache.request-context-attribute= # Name of the RequestContext attribute for all views.
spring.mustache.suffix=.mustache # Suffix to apply to template names.
spring.mustache.view-names= # White list of view names that can be resolved.

# SPRING MVC (WebMvcProperties)
spring.mvc.async.request-timeout= # Amount of time (in milliseconds) before asynchronous request handling times out.
spring.mvc.date-format= # Date format to use. For instance `dd/MM/yyyy`.
spring.mvc.dispatch-trace-request=false # Dispatch TRACE requests to the FrameworkServlet doService method.
spring.mvc.dispatch-options-request=true # Dispatch OPTIONS requests to the FrameworkServlet doService method.
spring.mvc.favicon.enabled=true # Enable resolution of favicon.ico.
spring.mvc.formcontent.putfilter.enabled=true # Enable Spring's HttpPutFormContentFilter.
spring.mvc.ignore-default-model-on-redirect=true # If the content of the "default" model should be ignored during redirect scenarios.
spring.mvc.locale= # Locale to use. By default, this locale is overridden by the "Accept-Language" header.
spring.mvc.locale-resolver=accept-header # Define how the locale should be resolved.
spring.mvc.log-resolved-exception=false # Enable warn logging of exceptions resolved by a "HandlerExceptionResolver".
spring.mvc.media-types.*= # Maps file extensions to media types for content negotiation.
spring.mvc.message-codes-resolver-format= # Formatting strategy for message codes. For instance `PREFIX_ERROR_CODE`.
spring.mvc.servlet.load-on-startup=-1 # Load on startup priority of the Spring Web Services servlet.
spring.mvc.static-path-pattern=/** # Path pattern used for static resources.
spring.mvc.throw-exception-if-no-handler-found=false # If a "NoHandlerFoundException" should be thrown if no Handler was found to process a request.
spring.mvc.view.prefix= # Spring MVC view prefix.
spring.mvc.view.suffix= # Spring MVC view suffix.

# SPRING RESOURCES HANDLING (ResourceProperties)
spring.resources.add-mappings=true # Enable default resource handling.
spring.resources.cache-period= # Cache period for the resources served by the resource handler, in seconds.
spring.resources.chain.cache=true # Enable caching in the Resource chain.
spring.resources.chain.enabled= # Enable the Spring Resource Handling chain. Disabled by default unless at least one strategy has been enabled.
spring.resources.chain.gzipped=false # Enable resolution of already gzipped resources.
spring.resources.chain.html-application-cache=false # Enable HTML5 application cache manifest rewriting.
spring.resources.chain.strategy.content.enabled=false # Enable the content Version Strategy.
spring.resources.chain.strategy.content.paths=/** # Comma-separated list of patterns to apply to the Version Strategy.
spring.resources.chain.strategy.fixed.enabled=false # Enable the fixed Version Strategy.
spring.resources.chain.strategy.fixed.paths=/** # Comma-separated list of patterns to apply to the Version Strategy.
spring.resources.chain.strategy.fixed.version= # Version string to use for the Version Strategy.
spring.resources.static-locations=classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/ # Locations of static resources.

# SPRING SESSION (SessionProperties)
spring.session.store-type= # Session store type.
spring.session.servlet.filter-order=-2147483598 # Session repository filter order.
spring.session.servlet.filter-dispatcher-types=ASYNC,ERROR,REQUEST # Session repository filter dispatcher types.

# SPRING SESSION HAZELCAST (HazelcastSessionProperties)
spring.session.hazelcast.flush-mode=on-save # Sessions flush mode.
spring.session.hazelcast.map-name=spring:session:sessions # Name of the map used to store sessions.

# SPRING SESSION JDBC (JdbcSessionProperties)
spring.session.jdbc.initialize-schema=embedded # Database schema initialization mode.
spring.session.jdbc.schema=classpath:org/springframework/session/jdbc/schema-@@platform@@.sql # Path to the SQL file to use to initialize the database schema.
spring.session.jdbc.table-name=SPRING_SESSION # Name of database table used to store sessions.

# SPRING SESSION MONGODB (MongoSessionProperties)
spring.session.mongodb.collection-name=sessions # Collection name used to store sessions.

# SPRING SESSION REDIS (RedisSessionProperties)
spring.session.redis.flush-mode=on-save # Sessions flush mode.
spring.session.redis.namespace= # Namespace for keys used to store sessions.

# SPRING SOCIAL (SocialWebAutoConfiguration)
spring.social.auto-connection-views=false # Enable the connection status view for supported providers.

# SPRING SOCIAL FACEBOOK (FacebookAutoConfiguration)
spring.social.facebook.app-id= # your application's Facebook App ID
spring.social.facebook.app-secret= # your application's Facebook App Secret

# SPRING SOCIAL LINKEDIN (LinkedInAutoConfiguration)
spring.social.linkedin.app-id= # your application's LinkedIn App ID
spring.social.linkedin.app-secret= # your application's LinkedIn App Secret

# SPRING SOCIAL TWITTER (TwitterAutoConfiguration)
spring.social.twitter.app-id= # your application's Twitter App ID
spring.social.twitter.app-secret= # your application's Twitter App Secret

# THYMELEAF (ThymeleafAutoConfiguration)
spring.thymeleaf.cache=true # Enable template caching.
spring.thymeleaf.check-template=true # Check that the template exists before rendering it.
spring.thymeleaf.check-template-location=true # Check that the templates location exists.
spring.thymeleaf.enabled=true # Enable Thymeleaf view resolution for Web frameworks.
spring.thymeleaf.encoding=UTF-8 # Template files encoding.
spring.thymeleaf.excluded-view-names= # Comma-separated list of view names that should be excluded from resolution.
spring.thymeleaf.mode=HTML5 # Template mode to be applied to templates. See also StandardTemplateModeHandlers.
spring.thymeleaf.prefix=classpath:/templates/ # Prefix that gets prepended to view names when building a URL.
spring.thymeleaf.reactive.max-chunk-size= # Maximum size of data buffers used for writing to the response, in bytes.
spring.thymeleaf.reactive.media-types= # Media types supported by the view technology.
spring.thymeleaf.servlet.content-type=text/html # Content-Type value written to HTTP responses.
spring.thymeleaf.suffix=.html # Suffix that gets appended to view names when building a URL.
spring.thymeleaf.template-resolver-order= # Order of the template resolver in the chain.
spring.thymeleaf.view-names= # Comma-separated list of view names that can be resolved.

# SPRING WEB FLUX (WebFluxProperties)
spring.webflux.static-path-pattern=/** # Path pattern used for static resources.

# SPRING WEB SERVICES (WebServicesProperties)
spring.webservices.path=/services # Path that serves as the base URI for the services.
spring.webservices.servlet.init= # Servlet init parameters to pass to Spring Web Services.
spring.webservices.servlet.load-on-startup=-1 # Load on startup priority of the Spring Web Services servlet.
spring.webservices.wsdl-locations= # Comma-separated list of locations of WSDLs and accompanying XSDs to be exposed as beans.



# ----------------------------------------
# SECURITY PROPERTIES
# ----------------------------------------
# SECURITY (SecurityProperties)
spring.security.filter.order=0 # Security filter chain order.
spring.security.filter.dispatcher-types=ASYNC,ERROR,REQUEST # Security filter chain dispatcher types.

# SECURITY OAUTH2 CLIENT (OAuth2ClientProperties)
spring.security.oauth2.client.provider.*= # OAuth provider details.
spring.security.oauth2.client.registration.*= # OAuth client registrations.

# ----------------------------------------
# DATA PROPERTIES
# ----------------------------------------

# FLYWAY (FlywayProperties)
spring.flyway.allow-mixed-migrations= #
spring.flyway.baseline-description= #
spring.flyway.baseline-on-migrate= #
spring.flyway.baseline-version=1 # version to start migration
spring.flyway.check-location=false # Check that migration scripts location exists.
spring.flyway.clean-disabled= #
spring.flyway.clean-on-validation-error= #
spring.flyway.enabled=true # Enable flyway.
spring.flyway.encoding= #
spring.flyway.group= #
spring.flyway.ignore-failed-future-migration= #
spring.flyway.ignore-future-migrations= #
spring.flyway.ignore-missing-migrations= #
spring.flyway.init-sqls= # SQL statements to execute to initialize a connection immediately after obtaining it.
spring.flyway.installed-by= #
spring.flyway.locations=classpath:db/migration # locations of migrations scripts
spring.flyway.mixed= #
spring.flyway.out-of-order= #
spring.flyway.password= # JDBC password if you want Flyway to create its own DataSource
spring.flyway.placeholder-prefix= #
spring.flyway.placeholder-replacement= #
spring.flyway.placeholder-suffix= #
spring.flyway.placeholders.*= #
spring.flyway.repeatable-sql-migration-prefix= #
spring.flyway.schemas= # schemas to update
spring.flyway.skip-default-callbacks= #
spring.flyway.skip-default-resolvers= #
spring.flyway.sql-migration-prefix=V #
spring.flyway.sql-migration-separator= #
spring.flyway.sql-migration-suffix=.sql #
spring.flyway.table= #
spring.flyway.target= #
spring.flyway.url= # JDBC url of the database to migrate. If not set, the primary configured data source is used.
spring.flyway.user= # Login user of the database to migrate.
spring.flyway.validate-on-migrate= #

# LIQUIBASE (LiquibaseProperties)
spring.liquibase.change-log=classpath:/db/changelog/db.changelog-master.yaml # Change log configuration path.
spring.liquibase.check-change-log-location=true # Check the change log location exists.
spring.liquibase.contexts= # Comma-separated list of runtime contexts to use.
spring.liquibase.default-schema= # Default database schema.
spring.liquibase.drop-first=false # Drop the database schema first.
spring.liquibase.enabled=true # Enable liquibase support.
spring.liquibase.labels= # Comma-separated list of runtime labels to use.
spring.liquibase.parameters.*= # Change log parameters.
spring.liquibase.password= # Login password of the database to migrate.
spring.liquibase.rollback-file= # File to which rollback SQL will be written when an update is performed.
spring.liquibase.url= # JDBC url of the database to migrate. If not set, the primary configured data source is used.
spring.liquibase.user= # Login user of the database to migrate.

# COUCHBASE (CouchbaseProperties)
spring.couchbase.bootstrap-hosts= # Couchbase nodes (host or IP address) to bootstrap from.
spring.couchbase.bucket.name=default # Name of the bucket to connect to.
spring.couchbase.bucket.password=  # Password of the bucket.
spring.couchbase.env.endpoints.key-value=1 # Number of sockets per node against the Key/value service.
spring.couchbase.env.endpoints.query=1 # Number of sockets per node against the Query (N1QL) service.
spring.couchbase.env.endpoints.view=1 # Number of sockets per node against the view service.
spring.couchbase.env.ssl.enabled= # Enable SSL support. Enabled automatically if a "keyStore" is provided unless specified otherwise.
spring.couchbase.env.ssl.key-store= # Path to the JVM key store that holds the certificates.
spring.couchbase.env.ssl.key-store-password= # Password used to access the key store.
spring.couchbase.env.timeouts.connect=5000 # Bucket connections timeout in milliseconds.
spring.couchbase.env.timeouts.key-value=2500 # Blocking operations performed on a specific key timeout in milliseconds.
spring.couchbase.env.timeouts.query=7500 # N1QL query operations timeout in milliseconds.
spring.couchbase.env.timeouts.socket-connect=1000 # Socket connect connections timeout in milliseconds.
spring.couchbase.env.timeouts.view=7500 # Regular and geospatial view operations timeout in milliseconds.

# DAO (PersistenceExceptionTranslationAutoConfiguration)
spring.dao.exceptiontranslation.enabled=true # Enable the PersistenceExceptionTranslationPostProcessor.

# CASSANDRA (CassandraProperties)
spring.data.cassandra.cluster-name= # Name of the Cassandra cluster.
spring.data.cassandra.compression=none # Compression supported by the Cassandra binary protocol.
spring.data.cassandra.connect-timeout-millis= # Socket option: connection time out.
spring.data.cassandra.consistency-level= # Queries consistency level.
spring.data.cassandra.contact-points=localhost # Comma-separated list of cluster node addresses.
spring.data.cassandra.fetch-size= # Queries default fetch size.
spring.data.cassandra.keyspace-name= # Keyspace name to use.
spring.data.cassandra.load-balancing-policy= # Class name of the load balancing policy.
spring.data.cassandra.port= # Port of the Cassandra server.
spring.data.cassandra.password= # Login password of the server.
spring.data.cassandra.pool.heartbeat-interval=30 # Heartbeat interval (in seconds) after which a message is sent on an idle connection to make sure it's still alive.
spring.data.cassandra.pool.idle-timeout=120 # Idle timeout (in seconds) before an idle connection is removed.
spring.data.cassandra.pool.max-queue-size=256 # Maximum number of requests that get enqueued if no connection is available.
spring.data.cassandra.pool.pool-timeout=5000 # Pool timeout (in milliseconds) when trying to acquire a connection from a host's pool.
spring.data.cassandra.reactive-repositories.enabled=true # Enable Cassandra reactive repositories.
spring.data.cassandra.read-timeout-millis= # Socket option: read time out.
spring.data.cassandra.reconnection-policy= # Reconnection policy class.
spring.data.cassandra.repositories.enabled= # Enable Cassandra repositories.
spring.data.cassandra.retry-policy= # Class name of the retry policy.
spring.data.cassandra.serial-consistency-level= # Queries serial consistency level.
spring.data.cassandra.schema-action=none # Schema action to take at startup.
spring.data.cassandra.ssl=false # Enable SSL support.
spring.data.cassandra.username= # Login user of the server.

# DATA COUCHBASE (CouchbaseDataProperties)
spring.data.couchbase.auto-index=false # Automatically create views and indexes.
spring.data.couchbase.consistency=read-your-own-writes # Consistency to apply by default on generated queries.
spring.data.couchbase.repositories.enabled=true # Enable Couchbase repositories.

# ELASTICSEARCH (ElasticsearchProperties)
spring.data.elasticsearch.cluster-name=elasticsearch # Elasticsearch cluster name.
spring.data.elasticsearch.cluster-nodes= # Comma-separated list of cluster node addresses.
spring.data.elasticsearch.properties.*= # Additional properties used to configure the client.
spring.data.elasticsearch.repositories.enabled=true # Enable Elasticsearch repositories.

# DATA LDAP
spring.data.ldap.repositories.enabled=true # Enable LDAP repositories.

# MONGODB (MongoProperties)
spring.data.mongodb.authentication-database= # Authentication database name.
spring.data.mongodb.database=test # Database name.
spring.data.mongodb.field-naming-strategy= # Fully qualified name of the FieldNamingStrategy to use.
spring.data.mongodb.grid-fs-database= # GridFS database name.
spring.data.mongodb.host=localhost # Mongo server host. Cannot be set with uri.
spring.data.mongodb.password= # Login password of the mongo server. Cannot be set with uri.
spring.data.mongodb.port=27017 # Mongo server port. Cannot be set with uri.
spring.data.mongodb.reactive-repositories.enabled=true # Enable Mongo reactive repositories.
spring.data.mongodb.repositories.enabled=true # Enable Mongo repositories.
spring.data.mongodb.uri=mongodb://localhost/test # Mongo database URI. Cannot be set with host, port and credentials.
spring.data.mongodb.username= # Login user of the mongo server. Cannot be set with uri.

# DATA REDIS
spring.data.redis.repositories.enabled=true # Enable Redis repositories.

# NEO4J (Neo4jProperties)
spring.data.neo4j.auto-index=none # Auto index mode.
spring.data.neo4j.embedded.enabled=true # Enable embedded mode if the embedded driver is available.
spring.data.neo4j.open-in-view=false # Register OpenSessionInViewInterceptor. Binds a Neo4j Session to the thread for the entire processing of the request.
spring.data.neo4j.password= # Login password of the server.
spring.data.neo4j.repositories.enabled=true # Enable Neo4j repositories.
spring.data.neo4j.uri= # URI used by the driver. Auto-detected by default.
spring.data.neo4j.username= # Login user of the server.

# DATA REST (RepositoryRestProperties)
spring.data.rest.base-path= # Base path to be used by Spring Data REST to expose repository resources.
spring.data.rest.default-page-size= # Default size of pages.
spring.data.rest.detection-strategy=default # Strategy to use to determine which repositories get exposed.
spring.data.rest.enable-enum-translation= # Enable enum value translation via the Spring Data REST default resource bundle.
spring.data.rest.limit-param-name= # Name of the URL query string parameter that indicates how many results to return at once.
spring.data.rest.max-page-size= # Maximum size of pages.
spring.data.rest.page-param-name= # Name of the URL query string parameter that indicates what page to return.
spring.data.rest.return-body-on-create= # Return a response body after creating an entity.
spring.data.rest.return-body-on-update= # Return a response body after updating an entity.
spring.data.rest.sort-param-name= # Name of the URL query string parameter that indicates what direction to sort results.

# SOLR (SolrProperties)
spring.data.solr.host=http://127.0.0.1:8983/solr # Solr host. Ignored if "zk-host" is set.
spring.data.solr.repositories.enabled=true # Enable Solr repositories.
spring.data.solr.zk-host= # ZooKeeper host address in the form HOST:PORT.

# DATA WEB (SpringDataWebProperties)
spring.data.web.pageable.default-page-size=20 # Default page size.
spring.data.web.pageable.page-parameter=page # Page index parameter name.
spring.data.web.pageable.size-parameter=size # Page size parameter name.
spring.data.web.sort.sort-parameter=sort # Sort parameter name.

# DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.continue-on-error=false # Do not stop if an error occurs while initializing the database.
spring.datasource.data= # Data (DML) script resource references.
spring.datasource.data-username= # User of the database to execute DML scripts (if different).
spring.datasource.data-password= # Password of the database to execute DML scripts (if different).
spring.datasource.dbcp2.*= # Commons DBCP2 specific settings
spring.datasource.driver-class-name= # Fully qualified name of the JDBC driver. Auto-detected based on the URL by default.
spring.datasource.generate-unique-name=false # Generate a random datasource name.
spring.datasource.hikari.*= # Hikari specific settings
spring.datasource.initialize=true # Populate the database using 'data.sql'.
spring.datasource.jmx-enabled=false # Enable JMX support (if provided by the underlying pool).
spring.datasource.jndi-name= # JNDI location of the datasource. Class, url, username & password are ignored when set.
spring.datasource.name=testdb # Name of the datasource.
spring.datasource.password= # Login password of the database.
spring.datasource.platform=all # Platform to use in the DDL or DML scripts (e.g. schema-${platform}.sql or data-${platform}.sql).
spring.datasource.schema= # Schema (DDL) script resource references.
spring.datasource.schema-username= # User of the database to execute DDL scripts (if different).
spring.datasource.schema-password= # Password of the database to execute DDL scripts (if different).
spring.datasource.separator=; # Statement separator in SQL initialization scripts.
spring.datasource.sql-script-encoding= # SQL scripts encoding.
spring.datasource.tomcat.*= # Tomcat datasource specific settings
spring.datasource.type= # Fully qualified name of the connection pool implementation to use. By default, it is auto-detected from the classpath.
spring.datasource.url= # JDBC url of the database.
spring.datasource.username= # Login user of the database.
spring.datasource.xa.data-source-class-name= # XA datasource fully qualified name.
   spring.datasource.xa.properties= # Properties to pass to the XA data source.

# JEST (Elasticsearch HTTP client) (JestProperties)
spring.elasticsearch.jest.connection-timeout=3000 # Connection timeout in milliseconds.
spring.elasticsearch.jest.multi-threaded=true # Enable connection requests from multiple execution threads.
spring.elasticsearch.jest.password= # Login password.
spring.elasticsearch.jest.proxy.host= # Proxy host the HTTP client should use.
spring.elasticsearch.jest.proxy.port= # Proxy port the HTTP client should use.
spring.elasticsearch.jest.read-timeout=3000 # Read timeout in milliseconds.
spring.elasticsearch.jest.uris=http://localhost:9200 # Comma-separated list of the Elasticsearch instances to use.
spring.elasticsearch.jest.username= # Login user.

# H2 Web Console (H2ConsoleProperties)
spring.h2.console.enabled=false # Enable the console.
spring.h2.console.path=/h2-console # Path at which the console will be available.
spring.h2.console.settings.trace=false # Enable trace output.
spring.h2.console.settings.web-allow-others=false # Enable remote access.

# InfluxDB (InfluxDbProperties)
spring.influx.password= # Login password.
spring.influx.url= # Url of the InfluxDB instance to connect to.
spring.influx.user= # Login user.

# JOOQ (JooqAutoConfiguration)
spring.jooq.sql-dialect= # Sql dialect to use, auto-detected by default.

# JDBC (JdbcProperties)
spring.jdbc.template.fetch-size=-1 # Number of rows that should be fetched from the database when more rows are needed.
spring.jdbc.template.max-rows=-1 # Maximum number of rows.
spring.jdbc.template.query-timeout=-1 # Query timeout in seconds.

# JPA (JpaBaseConfiguration, HibernateJpaAutoConfiguration)
spring.data.jpa.repositories.enabled=true # Enable JPA repositories.
spring.jpa.database= # Target database to operate on, auto-detected by default. Can be alternatively set using the "databasePlatform" property.
spring.jpa.database-platform= # Name of the target database to operate on, auto-detected by default. Can be alternatively set using the "Database" enum.
spring.jpa.generate-ddl=false # Initialize the schema on startup.
spring.jpa.hibernate.ddl-auto= # DDL mode. This is actually a shortcut for the "hibernate.hbm2ddl.auto" property. Default to "create-drop" when using an embedded database and no schema manager was detected, "none" otherwise.
spring.jpa.hibernate.naming.implicit-strategy= # Hibernate 5 implicit naming strategy fully qualified name.
spring.jpa.hibernate.naming.physical-strategy= # Hibernate 5 physical naming strategy fully qualified name.
spring.jpa.hibernate.use-new-id-generator-mappings= # Use Hibernate's newer IdentifierGenerator for AUTO, TABLE and SEQUENCE.
spring.jpa.open-in-view=true # Register OpenEntityManagerInViewInterceptor. Binds a JPA EntityManager to the thread for the entire processing of the request.
spring.jpa.properties.*= # Additional native properties to set on the JPA provider.
spring.jpa.show-sql=false # Enable logging of SQL statements.

# JTA (JtaAutoConfiguration)
spring.jta.enabled=true # Enable JTA support.
spring.jta.log-dir= # Transaction logs directory.
spring.jta.transaction-manager-id= # Transaction manager unique identifier.

# ATOMIKOS (AtomikosProperties)
spring.jta.atomikos.connectionfactory.borrow-connection-timeout=30 # Timeout, in seconds, for borrowing connections from the pool.
spring.jta.atomikos.connectionfactory.ignore-session-transacted-flag=true # Whether or not to ignore the transacted flag when creating session.
spring.jta.atomikos.connectionfactory.local-transaction-mode=false # Whether or not local transactions are desired.
spring.jta.atomikos.connectionfactory.maintenance-interval=60 # The time, in seconds, between runs of the pool's maintenance thread.
spring.jta.atomikos.connectionfactory.max-idle-time=60 # The time, in seconds, after which connections are cleaned up from the pool.
spring.jta.atomikos.connectionfactory.max-lifetime=0 # The time, in seconds, that a connection can be pooled for before being destroyed. 0 denotes no limit.
spring.jta.atomikos.connectionfactory.max-pool-size=1 # The maximum size of the pool.
spring.jta.atomikos.connectionfactory.min-pool-size=1 # The minimum size of the pool.
spring.jta.atomikos.connectionfactory.reap-timeout=0 # The reap timeout, in seconds, for borrowed connections. 0 denotes no limit.
spring.jta.atomikos.connectionfactory.unique-resource-name=jmsConnectionFactory # The unique name used to identify the resource during recovery.
spring.jta.atomikos.datasource.borrow-connection-timeout=30 # Timeout, in seconds, for borrowing connections from the pool.
spring.jta.atomikos.datasource.default-isolation-level= # Default isolation level of connections provided by the pool.
spring.jta.atomikos.datasource.login-timeout= # Timeout, in seconds, for establishing a database connection.
spring.jta.atomikos.datasource.maintenance-interval=60 # The time, in seconds, between runs of the pool's maintenance thread.
spring.jta.atomikos.datasource.max-idle-time=60 # The time, in seconds, after which connections are cleaned up from the pool.
spring.jta.atomikos.datasource.max-lifetime=0 # The time, in seconds, that a connection can be pooled for before being destroyed. 0 denotes no limit.
spring.jta.atomikos.datasource.max-pool-size=1 # The maximum size of the pool.
spring.jta.atomikos.datasource.min-pool-size=1 # The minimum size of the pool.
spring.jta.atomikos.datasource.reap-timeout=0 # The reap timeout, in seconds, for borrowed connections. 0 denotes no limit.
spring.jta.atomikos.datasource.test-query= # SQL query or statement used to validate a connection before returning it.
spring.jta.atomikos.datasource.unique-resource-name=dataSource # The unique name used to identify the resource during recovery.
spring.jta.atomikos.properties.allow-sub-transactions=true # Specify if sub-transactions are allowed.
spring.jta.atomikos.properties.checkpoint-interval=500 # Interval between checkpoints.
spring.jta.atomikos.properties.default-jta-timeout=10000 # Default timeout for JTA transactions.
spring.jta.atomikos.properties.enable-logging=true # Enable disk logging.
spring.jta.atomikos.properties.force-shutdown-on-vm-exit=false # Specify if a VM shutdown should trigger forced shutdown of the transaction core.
spring.jta.atomikos.properties.log-base-dir= # Directory in which the log files should be stored.
spring.jta.atomikos.properties.log-base-name=tmlog # Transactions log file base name.
spring.jta.atomikos.properties.max-actives=50 # Maximum number of active transactions.
spring.jta.atomikos.properties.max-timeout=300000 # Maximum timeout (in milliseconds) that can be allowed for transactions.
spring.jta.atomikos.properties.recovery.delay=10000 # Delay between two recovery scans.
spring.jta.atomikos.properties.recovery.forget-orphaned-log-entries-delay=86400000 # Delay after which recovery can cleanup pending ('orphaned') log entries.
spring.jta.atomikos.properties.recovery.max-retries=5 # Number of retry attempts to commit the transaction before throwing an exception.
spring.jta.atomikos.properties.recovery.retry-interval=10000 # Delay between retry attempts.
spring.jta.atomikos.properties.serial-jta-transactions=true # Specify if sub-transactions should be joined when possible.
spring.jta.atomikos.properties.service= # Transaction manager implementation that should be started.
spring.jta.atomikos.properties.threaded-two-phase-commit=false # Use different (and concurrent) threads for two-phase commit on the participating resources.
spring.jta.atomikos.properties.transaction-manager-unique-name= # Transaction manager's unique name.

# BITRONIX
spring.jta.bitronix.connectionfactory.acquire-increment=1 # Number of connections to create when growing the pool.
spring.jta.bitronix.connectionfactory.acquisition-interval=1 # Time, in seconds, to wait before trying to acquire a connection again after an invalid connection was acquired.
spring.jta.bitronix.connectionfactory.acquisition-timeout=30 # Timeout, in seconds, for acquiring connections from the pool.
spring.jta.bitronix.connectionfactory.allow-local-transactions=true # Whether or not the transaction manager should allow mixing XA and non-XA transactions.
spring.jta.bitronix.connectionfactory.apply-transaction-timeout=false # Whether or not the transaction timeout should be set on the XAResource when it is enlisted.
spring.jta.bitronix.connectionfactory.automatic-enlisting-enabled=true # Whether or not resources should be enlisted and delisted automatically.
spring.jta.bitronix.connectionfactory.cache-producers-consumers=true # Whether or not produces and consumers should be cached.
spring.jta.bitronix.connectionfactory.defer-connection-release=true # Whether or not the provider can run many transactions on the same connection and supports transaction interleaving.
spring.jta.bitronix.connectionfactory.ignore-recovery-failures=false # Whether or not recovery failures should be ignored.
spring.jta.bitronix.connectionfactory.max-idle-time=60 # The time, in seconds, after which connections are cleaned up from the pool.
spring.jta.bitronix.connectionfactory.max-pool-size=10 # The maximum size of the pool. 0 denotes no limit.
spring.jta.bitronix.connectionfactory.min-pool-size=0 # The minimum size of the pool.
spring.jta.bitronix.connectionfactory.password= # The password to use to connect to the JMS provider.
spring.jta.bitronix.connectionfactory.share-transaction-connections=false #  Whether or not connections in the ACCESSIBLE state can be shared within the context of a transaction.
spring.jta.bitronix.connectionfactory.test-connections=true # Whether or not connections should be tested when acquired from the pool.
spring.jta.bitronix.connectionfactory.two-pc-ordering-position=1 # The position that this resource should take during two-phase commit (always first is Integer.MIN_VALUE, always last is Integer.MAX_VALUE).
spring.jta.bitronix.connectionfactory.unique-name=jmsConnectionFactory # The unique name used to identify the resource during recovery.
spring.jta.bitronix.connectionfactory.use-tm-join=true Whether or not TMJOIN should be used when starting XAResources.
spring.jta.bitronix.connectionfactory.user= # The user to use to connect to the JMS provider.
spring.jta.bitronix.datasource.acquire-increment=1 # Number of connections to create when growing the pool.
spring.jta.bitronix.datasource.acquisition-interval=1 # Time, in seconds, to wait before trying to acquire a connection again after an invalid connection was acquired.
spring.jta.bitronix.datasource.acquisition-timeout=30 # Timeout, in seconds, for acquiring connections from the pool.
spring.jta.bitronix.datasource.allow-local-transactions=true # Whether or not the transaction manager should allow mixing XA and non-XA transactions.
spring.jta.bitronix.datasource.apply-transaction-timeout=false # Whether or not the transaction timeout should be set on the XAResource when it is enlisted.
spring.jta.bitronix.datasource.automatic-enlisting-enabled=true # Whether or not resources should be enlisted and delisted automatically.
spring.jta.bitronix.datasource.cursor-holdability= # The default cursor holdability for connections.
spring.jta.bitronix.datasource.defer-connection-release=true # Whether or not the database can run many transactions on the same connection and supports transaction interleaving.
spring.jta.bitronix.datasource.enable-jdbc4-connection-test= # Whether or not Connection.isValid() is called when acquiring a connection from the pool.
spring.jta.bitronix.datasource.ignore-recovery-failures=false # Whether or not recovery failures should be ignored.
spring.jta.bitronix.datasource.isolation-level= # The default isolation level for connections.
spring.jta.bitronix.datasource.local-auto-commit= # The default auto-commit mode for local transactions.
spring.jta.bitronix.datasource.login-timeout= # Timeout, in seconds, for establishing a database connection.
spring.jta.bitronix.datasource.max-idle-time=60 # The time, in seconds, after which connections are cleaned up from the pool.
spring.jta.bitronix.datasource.max-pool-size=10 # The maximum size of the pool. 0 denotes no limit.
spring.jta.bitronix.datasource.min-pool-size=0 # The minimum size of the pool.
spring.jta.bitronix.datasource.prepared-statement-cache-size=0 # The target size of the prepared statement cache. 0 disables the cache.
spring.jta.bitronix.datasource.share-transaction-connections=false #  Whether or not connections in the ACCESSIBLE state can be shared within the context of a transaction.
spring.jta.bitronix.datasource.test-query= # SQL query or statement used to validate a connection before returning it.
spring.jta.bitronix.datasource.two-pc-ordering-position=1 # The position that this resource should take during two-phase commit (always first is Integer.MIN_VALUE, always last is Integer.MAX_VALUE).
spring.jta.bitronix.datasource.unique-name=dataSource # The unique name used to identify the resource during recovery.
spring.jta.bitronix.datasource.use-tm-join=true Whether or not TMJOIN should be used when starting XAResources.
spring.jta.bitronix.properties.allow-multiple-lrc=false # Allow multiple LRC resources to be enlisted into the same transaction.
spring.jta.bitronix.properties.asynchronous2-pc=false # Enable asynchronously execution of two phase commit.
spring.jta.bitronix.properties.background-recovery-interval-seconds=60 # Interval in seconds at which to run the recovery process in the background.
spring.jta.bitronix.properties.current-node-only-recovery=true # Recover only the current node.
spring.jta.bitronix.properties.debug-zero-resource-transaction=false # Log the creation and commit call stacks of transactions executed without a single enlisted resource.
spring.jta.bitronix.properties.default-transaction-timeout=60 # Default transaction timeout in seconds.
spring.jta.bitronix.properties.disable-jmx=false # Enable JMX support.
spring.jta.bitronix.properties.exception-analyzer= # Set the fully qualified name of the exception analyzer implementation to use.
spring.jta.bitronix.properties.filter-log-status=false # Enable filtering of logs so that only mandatory logs are written.
spring.jta.bitronix.properties.force-batching-enabled=true #  Set if disk forces are batched.
spring.jta.bitronix.properties.forced-write-enabled=true # Set if logs are forced to disk.
spring.jta.bitronix.properties.graceful-shutdown-interval=60 # Maximum amount of seconds the TM will wait for transactions to get done before aborting them at shutdown time.
spring.jta.bitronix.properties.jndi-transaction-synchronization-registry-name= # JNDI name of the TransactionSynchronizationRegistry.
spring.jta.bitronix.properties.jndi-user-transaction-name= # JNDI name of the UserTransaction.
spring.jta.bitronix.properties.journal=disk # Name of the journal. Can be 'disk', 'null' or a class name.
spring.jta.bitronix.properties.log-part1-filename=btm1.tlog # Name of the first fragment of the journal.
spring.jta.bitronix.properties.log-part2-filename=btm2.tlog # Name of the second fragment of the journal.
spring.jta.bitronix.properties.max-log-size-in-mb=2 # Maximum size in megabytes of the journal fragments.
spring.jta.bitronix.properties.resource-configuration-filename= # ResourceLoader configuration file name.
spring.jta.bitronix.properties.server-id= # ASCII ID that must uniquely identify this TM instance. Default to the machine's IP address.
spring.jta.bitronix.properties.skip-corrupted-logs=false # Skip corrupted transactions log entries.
spring.jta.bitronix.properties.warn-about-zero-resource-transaction=true # Log a warning for transactions executed without a single enlisted resource.

# NARAYANA (NarayanaProperties)
spring.jta.narayana.default-timeout=60 # Transaction timeout in seconds.
spring.jta.narayana.expiry-scanners=com.arjuna.ats.internal.arjuna.recovery.ExpiredTransactionStatusManagerScanner # Comma-separated list of expiry scanners.
spring.jta.narayana.log-dir= # Transaction object store directory.
spring.jta.narayana.one-phase-commit=true # Enable one phase commit optimisation.
spring.jta.narayana.periodic-recovery-period=120 # Interval in which periodic recovery scans are performed in seconds.
spring.jta.narayana.recovery-backoff-period=10 # Back off period between first and second phases of the recovery scan in seconds.
spring.jta.narayana.recovery-db-pass= # Database password to be used by recovery manager.
spring.jta.narayana.recovery-db-user= # Database username to be used by recovery manager.
spring.jta.narayana.recovery-jms-pass= # JMS password to be used by recovery manager.
spring.jta.narayana.recovery-jms-user= # JMS username to be used by recovery manager.
spring.jta.narayana.recovery-modules= # Comma-separated list of recovery modules.
spring.jta.narayana.transaction-manager-id=1 # Unique transaction manager id.
spring.jta.narayana.xa-resource-orphan-filters= # Comma-separated list of orphan filters.

# EMBEDDED MONGODB (EmbeddedMongoProperties)
spring.mongodb.embedded.features=SYNC_DELAY # Comma-separated list of features to enable.
spring.mongodb.embedded.storage.database-dir= # Directory used for data storage.
spring.mongodb.embedded.storage.oplog-size= # Maximum size of the oplog in megabytes.
spring.mongodb.embedded.storage.repl-set-name= # Name of the replica set.
spring.mongodb.embedded.version=2.6.10 # Version of Mongo to use.

# REDIS (RedisProperties)
spring.redis.cluster.max-redirects= # Maximum number of redirects to follow when executing commands across the cluster.
spring.redis.cluster.nodes= # Comma-separated list of "host:port" pairs to bootstrap from.
spring.redis.database=0 # Database index used by the connection factory.
spring.redis.url= # Connection URL, will override host, port and password (user will be ignored), e.g. redis://user:password@example.com:6379
spring.redis.host=localhost # Redis server host.
spring.redis.jedis.pool.max-active=8 # Max number of connections that can be allocated by the pool at a given time. Use a negative value for no limit.
spring.redis.jedis.pool.max-idle=8 # Max number of "idle" connections in the pool. Use a negative value to indicate an unlimited number of idle connections.
spring.redis.jedis.pool.max-wait=-1 # Maximum amount of time (in milliseconds) a connection allocation should block before throwing an exception when the pool is exhausted. Use a negative value to block indefinitely.
spring.redis.jedis.pool.min-idle=0 # Target for the minimum number of idle connections to maintain in the pool. This setting only has an effect if it is positive.
spring.redis.lettuce.pool.max-active=8 # Max number of connections that can be allocated by the pool at a given time. Use a negative value for no limit.
spring.redis.lettuce.pool.max-idle=8 # Max number of "idle" connections in the pool. Use a negative value to indicate an unlimited number of idle connections.
spring.redis.lettuce.pool.max-wait=-1 # Maximum amount of time (in milliseconds) a connection allocation should block before throwing an exception when the pool is exhausted. Use a negative value to block indefinitely.
spring.redis.lettuce.pool.min-idle=0 # Target for the minimum number of idle connections to maintain in the pool. This setting only has an effect if it is positive.
spring.redis.lettuce.shutdown-timeout=100 # Shutdown timeout in milliseconds.
spring.redis.password= # Login password of the redis server.
spring.redis.port=6379 # Redis server port.
spring.redis.sentinel.master= # Name of Redis server.
spring.redis.sentinel.nodes= # Comma-separated list of host:port pairs.
spring.redis.ssl=false # Enable SSL support.
spring.redis.timeout=0 # Connection timeout in milliseconds.

# TRANSACTION (TransactionProperties)
spring.transaction.default-timeout= # Default transaction timeout in seconds.
spring.transaction.rollback-on-commit-failure= # Perform the rollback on commit failures.



# ----------------------------------------
# INTEGRATION PROPERTIES
# ----------------------------------------

# ACTIVEMQ (ActiveMQProperties)
spring.activemq.broker-url= # URL of the ActiveMQ broker. Auto-generated by default.
spring.activemq.close-timeout=15000 # Time to wait, in milliseconds, before considering a close complete.
spring.activemq.in-memory=true # Specify if the default broker URL should be in memory. Ignored if an explicit broker has been specified.
spring.activemq.non-blocking-redelivery=false # Do not stop message delivery before re-delivering messages from a rolled back transaction. This implies that message order will not be preserved when this is enabled.
spring.activemq.password= # Login password of the broker.
spring.activemq.send-timeout=0 # Time to wait, in milliseconds, on Message sends for a response. Set it to 0 to indicate to wait forever.
spring.activemq.user= # Login user of the broker.
spring.activemq.packages.trust-all= # Trust all packages.
spring.activemq.packages.trusted= # Comma-separated list of specific packages to trust (when not trusting all packages).
spring.activemq.pool.block-if-full=true # Block when a connection is requested and the pool is full. Set it to false to throw a "JMSException" instead.
spring.activemq.pool.block-if-full-timeout=-1 # Blocking period, in milliseconds, before throwing an exception if the pool is still full.
spring.activemq.pool.create-connection-on-startup=true # Create a connection on startup. Can be used to warm-up the pool on startup.
spring.activemq.pool.enabled=false # Whether a PooledConnectionFactory should be created instead of a regular ConnectionFactory.
spring.activemq.pool.expiry-timeout=0 # Connection expiration timeout in milliseconds.
spring.activemq.pool.idle-timeout=30000 # Connection idle timeout in milliseconds.
spring.activemq.pool.max-connections=1 # Maximum number of pooled connections.
spring.activemq.pool.maximum-active-session-per-connection=500 # Maximum number of active sessions per connection.
spring.activemq.pool.reconnect-on-exception=true # Reset the connection when a "JMSException" occurs.
spring.activemq.pool.time-between-expiration-check=-1 # Time to sleep, in milliseconds, between runs of the idle connection eviction thread. When negative, no idle connection eviction thread runs.
spring.activemq.pool.use-anonymous-producers=true # Use only one anonymous "MessageProducer" instance. Set it to false to create one "MessageProducer" every time one is required.

# ARTEMIS (ArtemisProperties)
spring.artemis.embedded.cluster-password= # Cluster password. Randomly generated on startup by default.
spring.artemis.embedded.data-directory= # Journal file directory. Not necessary if persistence is turned off.
spring.artemis.embedded.enabled=true # Enable embedded mode if the Artemis server APIs are available.
spring.artemis.embedded.persistent=false # Enable persistent store.
spring.artemis.embedded.queues= # Comma-separated list of queues to create on startup.
spring.artemis.embedded.server-id= # Server id. By default, an auto-incremented counter is used.
spring.artemis.embedded.topics= # Comma-separated list of topics to create on startup.
spring.artemis.host=localhost # Artemis broker host.
spring.artemis.mode= # Artemis deployment mode, auto-detected by default.
spring.artemis.password= # Login password of the broker.
spring.artemis.port=61616 # Artemis broker port.
spring.artemis.user= # Login user of the broker.

# SPRING BATCH (BatchProperties)
spring.batch.initialize-schema=embedded # Database schema initialization mode.
spring.batch.job.enabled=true # Execute all Spring Batch jobs in the context on startup.
spring.batch.job.names= # Comma-separated list of job names to execute on startup (For instance `job1,job2`). By default, all Jobs found in the context are executed.
spring.batch.schema=classpath:org/springframework/batch/core/schema-@@platform@@.sql # Path to the SQL file to use to initialize the database schema.
spring.batch.table-prefix= # Table prefix for all the batch meta-data tables.

# SPRING INTEGRATION (IntegrationProperties)
spring.integration.jdbc.initialize-schema=embedded # Database schema initialization mode.
spring.integration.jdbc.schema=classpath:org/springframework/integration/jdbc/schema-@@platform@@.sql # Path to the SQL file to use to initialize the database schema.

# JMS (JmsProperties)
spring.jms.jndi-name= # Connection factory JNDI name. When set, takes precedence to others connection factory auto-configurations.
spring.jms.listener.acknowledge-mode= # Acknowledge mode of the container. By default, the listener is transacted with automatic acknowledgment.
spring.jms.listener.auto-startup=true # Start the container automatically on startup.
spring.jms.listener.concurrency= # Minimum number of concurrent consumers.
spring.jms.listener.max-concurrency= # Maximum number of concurrent consumers.
spring.jms.pub-sub-domain=false # Specify if the default destination type is topic.
spring.jms.template.default-destination= # Default destination to use on send/receive operations that do not have a destination parameter.
spring.jms.template.delivery-delay= # Delivery delay to use for send calls in milliseconds.
spring.jms.template.delivery-mode= # Delivery mode. Enable QoS when set.
spring.jms.template.priority= # Priority of a message when sending. Enable QoS when set.
spring.jms.template.qos-enabled= # Enable explicit QoS when sending a message.
spring.jms.template.receive-timeout= # Timeout to use for receive calls in milliseconds.
spring.jms.template.time-to-live= # Time-to-live of a message when sending in milliseconds. Enable QoS when set.

# APACHE KAFKA (KafkaProperties)
spring.kafka.admin.client-id= # Id to pass to the server when making requests; used for server-side logging.
spring.kafka.admin.fail-fast=false # Fail fast if the broker is not available on startup.
spring.kafka.admin.properties.*= # Additional admin-specific properties used to configure the client.
spring.kafka.admin.ssl.key-password= # Password of the private key in the key store file.
spring.kafka.admin.ssl.keystore-location= # Location of the key store file.
spring.kafka.admin.ssl.keystore-password= # Store password for the key store file.
spring.kafka.admin.ssl.truststore-location= # Location of the trust store file.
spring.kafka.admin.ssl.truststore-password= # Store password for the trust store file.
spring.kafka.bootstrap-servers= # Comma-delimited list of host:port pairs to use for establishing the initial connection to the Kafka cluster.
spring.kafka.client-id= # Id to pass to the server when making requests; used for server-side logging.
spring.kafka.consumer.auto-commit-interval= # Frequency in milliseconds that the consumer offsets are auto-committed to Kafka if 'enable.auto.commit' true.
spring.kafka.consumer.auto-offset-reset= # What to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server.
spring.kafka.consumer.bootstrap-servers= # Comma-delimited list of host:port pairs to use for establishing the initial connection to the Kafka cluster.
spring.kafka.consumer.client-id= # Id to pass to the server when making requests; used for server-side logging.
spring.kafka.consumer.enable-auto-commit= # If true the consumer's offset will be periodically committed in the background.
spring.kafka.consumer.fetch-max-wait= # Maximum amount of time in milliseconds the server will block before answering the fetch request if there isn't sufficient data to immediately satisfy the requirement given by "fetch.min.bytes".
spring.kafka.consumer.fetch-min-size= # Minimum amount of data the server should return for a fetch request in bytes.
spring.kafka.consumer.group-id= # Unique string that identifies the consumer group this consumer belongs to.
spring.kafka.consumer.heartbeat-interval= # Expected time in milliseconds between heartbeats to the consumer coordinator.
spring.kafka.consumer.key-deserializer= # Deserializer class for keys.
spring.kafka.consumer.max-poll-records= # Maximum number of records returned in a single call to poll().
spring.kafka.consumer.properties.*= # Additional consumer-specific properties used to configure the client.
spring.kafka.consumer.ssl.key-password= # Password of the private key in the key store file.
spring.kafka.consumer.ssl.keystore-location= # Location of the key store file.
spring.kafka.consumer.ssl.keystore-password= # Store password for the key store file.
spring.kafka.consumer.ssl.truststore-location= # Location of the trust store file.
spring.kafka.consumer.ssl.truststore-password= # Store password for the trust store file.
spring.kafka.consumer.value-deserializer= # Deserializer class for values.
spring.kafka.jaas.control-flag=required # Control flag for login configuration.
spring.kafka.jaas.enabled= # Enable JAAS configuration.
spring.kafka.jaas.login-module=com.sun.security.auth.module.Krb5LoginModule # Login module.
spring.kafka.jaas.options= # Additional JAAS options.
spring.kafka.listener.ack-count= # Number of records between offset commits when ackMode is "COUNT" or "COUNT_TIME".
spring.kafka.listener.ack-mode= # Listener AckMode; see the spring-kafka documentation.
spring.kafka.listener.ack-time= # Time in milliseconds between offset commits when ackMode is "TIME" or "COUNT_TIME".
spring.kafka.listener.concurrency= # Number of threads to run in the listener containers.
spring.kafka.listener.poll-timeout= # Timeout in milliseconds to use when polling the consumer.
spring.kafka.listener.type=single # Listener type.
spring.kafka.producer.acks= # Number of acknowledgments the producer requires the leader to have received before considering a request complete.
spring.kafka.producer.batch-size= # Number of records to batch before sending.
spring.kafka.producer.bootstrap-servers= # Comma-delimited list of host:port pairs to use for establishing the initial connection to the Kafka cluster.
spring.kafka.producer.buffer-memory= # Total bytes of memory the producer can use to buffer records waiting to be sent to the server.
spring.kafka.producer.client-id= # Id to pass to the server when making requests; used for server-side logging.
spring.kafka.producer.compression-type= # Compression type for all data generated by the producer.
spring.kafka.producer.key-serializer= # Serializer class for keys.
spring.kafka.producer.properties.*= # Additional producer-specific properties used to configure the client.
spring.kafka.producer.retries= # When greater than zero, enables retrying of failed sends.
spring.kafka.producer.ssl.key-password= # Password of the private key in the key store file.
spring.kafka.producer.ssl.keystore-location= # Location of the key store file.
spring.kafka.producer.ssl.keystore-password= # Store password for the key store file.
spring.kafka.producer.ssl.truststore-location= # Location of the trust store file.
spring.kafka.producer.ssl.truststore-password= # Store password for the trust store file.
spring.kafka.producer.value-serializer= # Serializer class for values.
spring.kafka.properties.*= # Additional properties, common to producers and consumers, used to configure the client.
spring.kafka.ssl.key-password= # Password of the private key in the key store file.
spring.kafka.ssl.keystore-location= # Location of the key store file.
spring.kafka.ssl.keystore-password= # Store password for the key store file.
spring.kafka.ssl.truststore-location= # Location of the trust store file.
spring.kafka.ssl.truststore-password= # Store password for the trust store file.
spring.kafka.template.default-topic= # Default topic to which messages will be sent.

# RABBIT (RabbitProperties)
spring.rabbitmq.addresses= # Comma-separated list of addresses to which the client should connect.
spring.rabbitmq.cache.channel.checkout-timeout= # Number of milliseconds to wait to obtain a channel if the cache size has been reached.
spring.rabbitmq.cache.channel.size= # Number of channels to retain in the cache.
spring.rabbitmq.cache.connection.mode=channel # Connection factory cache mode.
spring.rabbitmq.cache.connection.size= # Number of connections to cache.
spring.rabbitmq.connection-timeout= # Connection timeout, in milliseconds; zero for infinite.
spring.rabbitmq.dynamic=true # Create an AmqpAdmin bean.
spring.rabbitmq.host=localhost # RabbitMQ host.
spring.rabbitmq.listener.direct.acknowledge-mode= # Acknowledge mode of container.
spring.rabbitmq.listener.direct.auto-startup=true # Start the container automatically on startup.
spring.rabbitmq.listener.direct.consumers-per-queue= # Number of consumers per queue.
spring.rabbitmq.listener.direct.default-requeue-rejected= # Whether rejected deliveries are requeued by default; default true.
spring.rabbitmq.listener.direct.idle-event-interval= # How often idle container events should be published in milliseconds.
spring.rabbitmq.listener.direct.prefetch= # Number of messages to be handled in a single request. It should be greater than or equal to the transaction size (if used).
spring.rabbitmq.listener.direct.retry.enabled=false # Whether or not publishing retries are enabled.
   spring.rabbitmq.listener.direct.retry.initial-interval=1000 # Interval between the first and second attempt to publish or deliver a message.
   spring.rabbitmq.listener.direct.retry.max-attempts=3 # Maximum number of attempts to publish or deliver a message.
   spring.rabbitmq.listener.direct.retry.max-interval=10000 # Maximum interval between attempts.
   spring.rabbitmq.listener.direct.retry.multiplier=1 # A multiplier to apply to the previous retry interval.
   spring.rabbitmq.listener.direct.retry.stateless=true # Whether or not retries are stateless or stateful.
spring.rabbitmq.listener.simple.acknowledge-mode= # Acknowledge mode of container.
spring.rabbitmq.listener.simple.auto-startup=true # Start the container automatically on startup.
spring.rabbitmq.listener.simple.concurrency= # Minimum number of listener invoker threads.
spring.rabbitmq.listener.simple.default-requeue-rejected= # Whether or not to requeue delivery failures.
spring.rabbitmq.listener.simple.idle-event-interval= # How often idle container events should be published in milliseconds.
spring.rabbitmq.listener.simple.max-concurrency= # Maximum number of listener invoker.
spring.rabbitmq.listener.simple.prefetch= # Number of messages to be handled in a single request. It should be greater than or equal to the transaction size (if used).
spring.rabbitmq.listener.simple.retry.enabled=false # Whether or not publishing retries are enabled.
spring.rabbitmq.listener.simple.retry.initial-interval=1000 # Interval between the first and second attempt to deliver a message.
spring.rabbitmq.listener.simple.retry.max-attempts=3 # Maximum number of attempts to deliver a message.
spring.rabbitmq.listener.simple.retry.max-interval=10000 # Maximum interval between attempts.
spring.rabbitmq.listener.simple.retry.multiplier=1.0 # A multiplier to apply to the previous delivery retry interval.
spring.rabbitmq.listener.simple.retry.stateless=true # Whether or not retry is stateless or stateful.
spring.rabbitmq.listener.simple.transaction-size= # Number of messages to be processed in a transaction; number of messages between acks. For best results it should be less than or equal to the prefetch count.
spring.rabbitmq.listener.type=simple # Listener container type.
spring.rabbitmq.password= # Login to authenticate against the broker.
spring.rabbitmq.port=5672 # RabbitMQ port.
spring.rabbitmq.publisher-confirms=false # Enable publisher confirms.
spring.rabbitmq.publisher-returns=false # Enable publisher returns.
spring.rabbitmq.requested-heartbeat= # Requested heartbeat timeout, in seconds; zero for none.
spring.rabbitmq.ssl.enabled=false # Enable SSL support.
spring.rabbitmq.ssl.key-store= # Path to the key store that holds the SSL certificate.
spring.rabbitmq.ssl.key-store-password= # Password used to access the key store.
spring.rabbitmq.ssl.key-store-type=PKCS12 # Key store type.
spring.rabbitmq.ssl.trust-store= # Trust store that holds SSL certificates.
spring.rabbitmq.ssl.trust-store-password= # Password used to access the trust store.
spring.rabbitmq.ssl.trust-store-type=JKS # Trust store type.
spring.rabbitmq.ssl.algorithm= # SSL algorithm to use. By default configure by the rabbit client library.
spring.rabbitmq.template.mandatory=false # Enable mandatory messages.
spring.rabbitmq.template.receive-timeout=0 # Timeout for `receive()` methods.
spring.rabbitmq.template.reply-timeout=5000 # Timeout for `sendAndReceive()` methods.
spring.rabbitmq.template.retry.enabled=false # Set to true to enable retries in the `RabbitTemplate`.
spring.rabbitmq.template.retry.initial-interval=1000 # Interval between the first and second attempt to publish a message.
spring.rabbitmq.template.retry.max-attempts=3 # Maximum number of attempts to publish a message.
spring.rabbitmq.template.retry.max-interval=10000 # Maximum number of attempts to publish a message.
spring.rabbitmq.template.retry.multiplier=1.0 # A multiplier to apply to the previous publishing retry interval.
spring.rabbitmq.username= # Login user to authenticate to the broker.
spring.rabbitmq.virtual-host= # Virtual host to use when connecting to the broker.


# ----------------------------------------
# ACTUATOR PROPERTIES
# ----------------------------------------

# AUDIT EVENTS ENDPOINT (AuditEventsEndpoint)
endpoints.auditevents.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.auditevents.enabled= # Enable the auditevents endpoint.
endpoints.auditevents.jmx.enabled= # Expose the auditevents endpoint as a JMX MBean.
endpoints.auditevents.web.enabled= # Expose the auditevents endpoint as a Web endpoint.

# AUTO-CONFIGURATION REPORT ENDPOINT (AutoConfigurationReportEndpoint)
endpoints.autoconfig.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.autoconfig.enabled= # Enable the autoconfig endpoint.
endpoints.autoconfig.jmx.enabled= # Expose the autoconfig endpoint as a JMX MBean.
endpoints.autoconfig.web.enabled= # Expose the autoconfig endpoint as a Web endpoint.

# BEANS ENDPOINT (BeansEndpoint)
endpoints.beans.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.beans.enabled= # Enable the beans endpoint.
endpoints.beans.jmx.enabled= # Expose the beans endpoint as a JMX MBean.
endpoints.beans.web.enabled= # Expose the beans endpoint as a Web endpoint.

# CONFIGURATION PROPERTIES REPORT ENDPOINT (ConfigurationPropertiesReportEndpoint)
endpoints.configprops.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.configprops.enabled= # Enable the configprops endpoint.
endpoints.configprops.jmx.enabled= # Expose the configprops endpoint as a JMX MBean.
endpoints.configprops.keys-to-sanitize=password,secret,key,token,.*credentials.*,vcap_services # Keys that should be sanitized. Keys can be simple strings that the property ends with or regular expressions.
endpoints.configprops.web.enabled= # Expose the configprops endpoint as a Web endpoint.

# ENDPOINT DEFAULT SETTINGS
endpoints.default.enabled=true # Enable all endpoints by default.
endpoints.default.jmx.enabled=true # Enable all endpoints as JMX MBeans by default.
endpoints.default.web.enabled=false # Enable all endpoints as Web endpoints by default.

# ENVIRONMENT ENDPOINT  (EnvironmentEndpoint)
endpoints.env.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.env.enabled= # Enable the env endpoint.
endpoints.env.jmx.enabled= # Expose the env endpoint as a JMX MBean.
endpoints.env.keys-to-sanitize=password,secret,key,token,.*credentials.*,vcap_services # Keys that should be sanitized. Keys can be simple strings that the property ends with or regular expressions.
endpoints.env.web.enabled= # Expose the env endpoint as a Web endpoint.

# FLYWAY ENDPOINT (FlywayEndpoint)
endpoints.flyway.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.flyway.enabled= # Enable the flyway endpoint.
endpoints.flyway.jmx.enabled= # Expose the flyway endpoint as a JMX MBean.
endpoints.flyway.web.enabled= # Expose the flyway endpoint as a Web endpoint.

# HEALTH ENDPOINT (HealthEndpoint)
endpoints.health.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.health.enabled= # Enable the health endpoint.
endpoints.health.jmx.enabled= # Expose the health endpoint as a JMX MBean.
endpoints.health.web.enabled= # Expose the health endpoint as a Web endpoint.

# HEAP DUMP ENDPOINT (HeapDumpWebEndpoint)
endpoints.heapdump.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.heapdump.enabled= # Enable the heapdump endpoint.
endpoints.heapdump.web.enabled= # Expose the heapdump endpoint as a Web endpoint.

# INFO ENDPOINT (InfoEndpoint)
endpoints.info.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.info.enabled=true # Enable the info endpoint.
endpoints.info.jmx.enabled=true # Expose the info endpoint as a JMX MBean.
endpoints.info.web.enabled=true # Expose the info endpoint as a Web endpoint.

# LIQUIBASE ENDPOINT (LiquibaseEndpoint)
endpoints.liquibase.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.liquibase.enabled= # Enable the liquibase endpoint.
endpoints.liquibase.jmx.enabled= # Expose the liquibase endpoint as a JMX MBean.
endpoints.liquibase.web.enabled= # Expose the liquibase endpoint as a Web endpoint.

# LOG FILE ENDPOINT (LogFileWebEndpoint)
endpoints.logfile.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.logfile.enabled= # Enable the logfile endpoint.
endpoints.logfile.external-file= # External Logfile to be accessed. Can be used if the logfile is written by output redirect and not by the logging system itself.
endpoints.logfile.web.enabled= # Expose the logfile endpoint as a Web endpoint.

# LOGGERS ENDPOINT (LoggersEndpoint)
endpoints.loggers.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.loggers.enabled= # Enable the loggers endpoint.
endpoints.loggers.jmx.enabled= # Expose the loggers endpoint as a JMX MBean.
endpoints.loggers.web.enabled= # Expose the loggers endpoint as a Web endpoint.

# REQUEST MAPPING ENDPOINT  (RequestMappingEndpoint)
endpoints.mappings.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.mappings.enabled= # Enable the mappings endpoint.
endpoints.mappings.jmx.enabled= # Expose the mappings endpoint as a JMX MBean.
endpoints.mappings.web.enabled= # Expose the mappings endpoint as a Web endpoint.

# METRICS ENDPOINT (MetricsEndpoint)
endpoints.metrics.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.metrics.enabled= # Enable the metrics endpoint.
endpoints.metrics.jmx.enabled= # Expose the metrics endpoint as a JMX MBean.
endpoints.metrics.web.enabled= # Expose the metrics endpoint as a Web endpoint.

# PROMETHEUS ENDPOINT (PrometheusScrapeEndpoint)
endpoints.prometheus.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.prometheus.enabled= # Enable the metrics endpoint.
endpoints.prometheus.web.enabled= # Expose the metrics endpoint as a Web endpoint.

# SESSIONS ENDPOINT (SessionsEndpoint)
endpoints.sessions.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.sessions.enabled= # Enable the sessions endpoint.
endpoints.sessions.jmx.enabled= # Expose the sessions endpoint as a JMX MBean.
endpoints.sessions.web.enabled= # Expose the sessions endpoint as a Web endpoint.

# SHUTDOWN ENDPOINT (ShutdownEndpoint)
endpoints.shutdown.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.shutdown.enabled=false # Enable the shutdown endpoint.
endpoints.shutdown.jmx.enabled=false # Expose the shutdown endpoint as a JMX MBean.
endpoints.shutdown.web.enabled=false # Expose the shutdown endpoint as a Web endpoint.

# STATUS ENDPOINT (StatusEndpoint)
endpoints.status.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.status.enabled=true # Enable the status endpoint.
endpoints.status.jmx.enabled=true # Expose the status endpoint as a JMX MBean.
endpoints.status.web.enabled=true # Expose the status endpoint as a Web endpoint.

# THREAD DUMP ENDPOINT (ThreadDumpEndpoint)
endpoints.threaddump.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.threaddump.enabled= # Enable the threaddump endpoint.
endpoints.threaddump.jmx.enabled= # Expose the threaddump endpoint as a JMX MBean.
endpoints.threaddump.web.enabled= # Expose the threaddump endpoint as a Web endpoint.

# TRACE ENDPOINT (TraceEndpoint)
endpoints.trace.cache.time-to-live=0 # Maximum time in milliseconds that a response can be cached.
endpoints.trace.enabled= # Enable the trace endpoint.
endpoints.trace.jmx.enabled= # Expose the trace endpoint as a JMX MBean.
endpoints.trace.web.enabled= # Expose the trace endpoint as a Web endpoint.

# MANAGEMENT HTTP SERVER (ManagementServerProperties)
management.add-application-context-header=false # Add the "X-Application-Context" HTTP header in each response.
management.address= # Network address that the management endpoints should bind to.
management.context-path= # Management endpoint context-path. For instance `/actuator`
management.port= # Management endpoint HTTP port. Uses the same port as the application by default. Configure a different port to use management-specific SSL.
management.ssl.ciphers= # Supported SSL ciphers. Requires a custom management.port.
management.ssl.client-auth= # Whether client authentication is wanted ("want") or needed ("need"). Requires a trust store. Requires a custom management.port.
management.ssl.enabled= # Enable SSL support. Requires a custom management.port.
management.ssl.enabled-protocols= # Enabled SSL protocols. Requires a custom management.port.
management.ssl.key-alias= # Alias that identifies the key in the key store. Requires a custom management.port.
management.ssl.key-password= # Password used to access the key in the key store. Requires a custom management.port.
management.ssl.key-store= # Path to the key store that holds the SSL certificate (typically a jks file). Requires a custom management.port.
management.ssl.key-store-password= # Password used to access the key store. Requires a custom management.port.
management.ssl.key-store-provider= # Provider for the key store. Requires a custom management.port.
management.ssl.key-store-type= # Type of the key store. Requires a custom management.port.
management.ssl.protocol=TLS # SSL protocol to use. Requires a custom management.port.
management.ssl.trust-store= # Trust store that holds SSL certificates. Requires a custom management.port.
management.ssl.trust-store-password= # Password used to access the trust store. Requires a custom management.port.
management.ssl.trust-store-provider= # Provider for the trust store. Requires a custom management.port.
management.ssl.trust-store-type= # Type of the trust store. Requires a custom management.port.

# CLOUDFOUNDRY
management.cloudfoundry.enabled=true # Enable extended Cloud Foundry actuator endpoints.
   management.cloudfoundry.skip-ssl-validation=false # Skip SSL verification for Cloud Foundry actuator endpoint security calls.

# ENDPOINTS CORS CONFIGURATION (CorsEndpointProperties)
management.endpoints.cors.allow-credentials= # Set whether credentials are supported. When not set, credentials are not supported.
management.endpoints.cors.allowed-headers= # Comma-separated list of headers to allow in a request. '*' allows all headers.
management.endpoints.cors.allowed-methods= # Comma-separated list of methods to allow. '*' allows all methods. When not set, defaults to GET.
management.endpoints.cors.allowed-origins= # Comma-separated list of origins to allow. '*' allows all origins. When not set, CORS support is disabled.
management.endpoints.cors.exposed-headers= # Comma-separated list of headers to include in a response.
management.endpoints.cors.max-age=1800 # How long, in seconds, the response from a pre-flight request can be cached by clients.

# ENDPOINTS JMX CONFIGURATION (JmxEndpointExporterProperties)
management.endpoints.jmx.domain=org.springframework.boot # Endpoints JMX domain name. Fallback to 'spring.jmx.default-domain' if set.
management.endpoints.jmx.static-names=false # Additional static properties to append to all ObjectNames of MBeans representing Endpoints.
management.endpoints.jmx.unique-names=false # Ensure that ObjectNames are modified in case of conflict.

# HEALTH INDICATORS
management.health.db.enabled=true # Enable database health check.
management.health.cassandra.enabled=true # Enable cassandra health check.
management.health.couchbase.enabled=true # Enable couchbase health check.
management.health.defaults.enabled=true # Enable default health indicators.
management.health.diskspace.enabled=true # Enable disk space health check.
management.health.diskspace.path= # Path used to compute the available disk space.
management.health.diskspace.threshold=0 # Minimum disk space that should be available, in bytes.
management.health.elasticsearch.enabled=true # Enable elasticsearch health check.
management.health.elasticsearch.indices= # Comma-separated index names.
management.health.elasticsearch.response-timeout=100 # The time, in milliseconds, to wait for a response from the cluster.
management.health.jms.enabled=true # Enable JMS health check.
management.health.ldap.enabled=true # Enable LDAP health check.
management.health.mail.enabled=true # Enable Mail health check.
management.health.mongo.enabled=true # Enable MongoDB health check.
management.health.neo4j.enabled=true # Enable Neo4j health check.
management.health.rabbit.enabled=true # Enable RabbitMQ health check.
management.health.redis.enabled=true # Enable Redis health check.
management.health.solr.enabled=true # Enable Solr health check.
management.health.status.http-mapping= # Mapping of health statuses to HTTP status codes. By default, registered health statuses map to sensible defaults (i.e. UP maps to 200).
management.health.status.order=DOWN, OUT_OF_SERVICE, UP, UNKNOWN # Comma-separated list of health statuses in order of severity.

# INFO CONTRIBUTORS (InfoContributorProperties)
management.info.build.enabled=true # Enable build info.
management.info.defaults.enabled=true # Enable default info contributors.
management.info.env.enabled=true # Enable environment info.
management.info.git.enabled=true # Enable git info.
management.info.git.mode=simple # Mode to use to expose git information.

# JOLOKIA (JolokiaProperties)
management.jolokia.config.*= # Jolokia settings. See the Jolokia manual for details.
management.jolokia.enabled=false # Enable Jolokia.
management.jolokia.path=/jolokia # Path at which Jolokia will be available.

# TRACING (TraceProperties)
management.trace.filter.enabled=true # Enable the trace servlet filter.
management.trace.include=request-headers,response-headers,cookies,errors # Items to be included in the trace.

# METRICS
spring.metrics.atlas.enabled=true # Whether not exporting of metrics to Atlas is enabled.
spring.metrics.ganglia.enabled=true # Whether not exporting of metrics to Ganglia is enabled.
spring.metrics.graphite.enabled=true # Whether not exporting of metrics to Graphite is enabled.
spring.metrics.influx.enabled=true # Whether not exporting of metrics to InfluxDB is enabled.
spring.metrics.jmx.enabled=true # Whether not exporting of metrics to JMX is enabled.
spring.metrics.prometheus.enabled=true # Whether not exporting of metrics to Prometheus is enabled.
spring.metrics.simple.enabled=true # Whether not exporting of metrics to a simple in-memory store is enabled.
spring.metrics.use-global-registry=true # Whether or not auto-configured MeterRegistry implementations should be bound to the global static registry on Metrics
spring.metrics.web.client.record-request-percentiles=false # Whether or not instrumented requests record percentiles histogram buckets by default.
spring.metrics.web.client.requests-metric-name=http.client.requests # Name of the metric for sent requests.
spring.metrics.web.server.auto-time-requests=true Whether or not requests handled by Spring MVC or WebFlux should be automatically timed.
spring.metrics.web.server.record-request-percentiles=false # Whether or not instrumented requests record percentiles histogram buckets by default.
spring.metrics.web.server.requests-metric-name=http.server.requests # Name of the metric for received requests.



# ----------------------------------------
# DEVTOOLS PROPERTIES
# ----------------------------------------

# DEVTOOLS (DevToolsProperties)
spring.devtools.livereload.enabled=true # Enable a livereload.com compatible server.
spring.devtools.livereload.port=35729 # Server port.
spring.devtools.restart.additional-exclude= # Additional patterns that should be excluded from triggering a full restart.
spring.devtools.restart.additional-paths= # Additional paths to watch for changes.
spring.devtools.restart.enabled=true # Enable automatic restart.
spring.devtools.restart.exclude=META-INF/maven/**,META-INF/resources/**,resources/**,static/**,public/**,templates/**,**/*Test.class,**/*Tests.class,git.properties # Patterns that should be excluded from triggering a full restart.
spring.devtools.restart.poll-interval=1000 # Amount of time (in milliseconds) to wait between polling for classpath changes.
spring.devtools.restart.quiet-period=400 # Amount of quiet time (in milliseconds) required without any classpath changes before a restart is triggered.
spring.devtools.restart.trigger-file= # Name of a specific file that when changed will trigger the restart check. If not specified any classpath file change will trigger the restart.

# REMOTE DEVTOOLS (RemoteDevToolsProperties)
spring.devtools.remote.context-path=/.~~spring-boot!~ # Context path used to handle the remote connection.
spring.devtools.remote.proxy.host= # The host of the proxy to use to connect to the remote application.
spring.devtools.remote.proxy.port= # The port of the proxy to use to connect to the remote application.
spring.devtools.remote.restart.enabled=true # Enable remote restart.
spring.devtools.remote.secret= # A shared secret required to establish a connection (required to enable remote support).
spring.devtools.remote.secret-header-name=X-AUTH-TOKEN # HTTP header used to transfer the shared secret.


# ----------------------------------------
# TESTING PROPERTIES
# ----------------------------------------

spring.test.database.replace=any # Type of existing DataSource to replace.
spring.test.mockmvc.print=default # MVC Print option.
```

## 附录 B.配置元数据
Spring Boot jar附带元数据文件，提供所有支持的配置属性的详细信息。这些文件旨在允许IDE开发人员在用户使用`application.properties`或`application.yml`文件时提供上下文帮助和“代码补全”。

大部分元数据文件是在编译时自动生成的，处理所有用`@ConfigurationProperties`注解的项目。 但是，可以[手动编写部分元数据](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#configuration-metadata-additional-metadata)用于特殊情况或更高级的用法。
### B.1 元数据格式
配置元数据文件位于jar文件内部`META-INF / spring-configuration-metadata.json`中。它们使用简单的JSON格式，其中的项目分为“组”或“属性”，附加值提示归类为“提示”。
```json
{"groups": [
	{
		"name": "server",
		"type": "org.springframework.boot.autoconfigure.web.ServerProperties",
		"sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties"
	},
	{
		"name": "spring.jpa.hibernate",
		"type": "org.springframework.boot.autoconfigure.orm.jpa.JpaProperties$Hibernate",
		"sourceType": "org.springframework.boot.autoconfigure.orm.jpa.JpaProperties",
		"sourceMethod": "getHibernate()"
	}
	...
],"properties": [
	{
		"name": "server.port",
		"type": "java.lang.Integer",
		"sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties"
	},
	{
		"name": "server.servlet.path",
		"type": "java.lang.String",
		"sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties",
		"defaultValue": "/"
	},
	{
		  "name": "spring.jpa.hibernate.ddl-auto",
		  "type": "java.lang.String",
		  "description": "DDL mode. This is actually a shortcut for the \"hibernate.hbm2ddl.auto\" property.",
		  "sourceType": "org.springframework.boot.autoconfigure.orm.jpa.JpaProperties$Hibernate"
	}
	...
],"hints": [
	{
		"name": "spring.jpa.hibernate.ddl-auto",
		"values": [
			{
				"value": "none",
				"description": "Disable DDL handling."
			},
			{
				"value": "validate",
				"description": "Validate the schema, make no changes to the database."
			},
			{
				"value": "update",
				"description": "Update the schema if necessary."
			},
			{
				"value": "create",
				"description": "Create the schema and destroy previous data."
			},
			{
				"value": "create-drop",
				"description": "Create and then destroy the schema at the end of the session."
			}
		]
	}
]}
```
每个“属性”是用户用给定值指定的配置项目。例如，`server.port`和`server.servlet.path`可以在`application.properties`中指定，如下所示：
```
server.port=9090
server.servlet.path=/home
```
“组”是较高级别的项目，本身并不指定值，而是为属性提供上下文分组。 例如，`server.port`和`server.servlet.path`属性是`server`组的一部分。

> 并不要求每一个“属性”都有一个“组”，有些属性可能就存在于自己的right之中。

最后，“提示”是用于帮助用户配置给定属性的附加信息。当配置`spring.jpa.hibernate.ddl-auto`属性时，一个工具可以使用它来为`none`，`validate`，`update`，`create`和`create-drop`值提供一些自动完成的帮助。

#### B.1.1 组的属性
`groups`数组中的JSON对象可以包含以下属性：

名称|类型|目的
--|--|--
`name`|String|组的全名。 该属性是强制性的。
`type`|String|组的数据类型的类名称。例如，如果该组基于使用`@ConfigurationProperties`注解的类，则该属性将包含该类的完全限定名称。 如果它是基于`@Bean`方法，那将是该方法的返回类型。如果类型未知，则属性可以省略。
`description`|String|可以向用户显示的组的简短说明。如果没有可用的描述，可以省略。 建议描述是一个简短的段落，第一行提供一个简明的总结。描述的最后一行应以句点（`.`）结尾。
`sourceType`|String|贡献此组的源的类名称。例如，如果组基于`@ConfigurationProperties`注解的`@Bean`方法，则此属性将包含此方法的`@Configuration类的`完全限定名称。 如果源类型未知，则该属性可以省略。
`sourceMethod`|String|贡献该组的方法的全名（包括括号和参数类型）。例如，`@ConfigurationProperties`注释的`@Bean`方法的名称。如果源方法未知，可以省略。

#### B.1.2 Properties的属性
`properties`数组中的JSON对象可以包含以下属性：

名称|类型|目的
--|--|--
`name`|String|属性的全名。名称以小写的虚线形式（例如`server.servlet.path`）。 该属性是强制性的。
`type`|String|该属性的数据类型的完整签名。例如，`java.lang.String`，也是一个完整的泛型类型，比如`java.util.Map <java.util.String，acme.MyEnum>`。这个属性可以用来指导用户可以输入的值的类型。 为了一致性，基本类型使用它的包装对象来指定，即布尔类型变成`java.lang.Boolean`。 请注意，这个类可能是一个复杂的类型，当值被绑定时，它会从字符串转换而来。 如果类型未知，可以省略。
`description`|String|可以向用户显示的组的简短说明。如果没有可用的描述，可以省略。 建议描述是一个简短的段落，第一行提供一个简明的总结。描述的最后一行应以句点（`.`）结尾。
`sourceType`|String|贡献此属性的源的类名称。例如，如果属性来自使用`@ConfigurationProperties`注解的类，则此属性将包含该类的完全限定名称。如果源类型未知，可以省略。
`defaultValue`|Object|如果未指定属性，将使用默认值。如果属性的类型是一个数组，也可以是一个值的数组。 如果默认值未知，可以省略。
`deprecation`|Deprecation|指定该属性是否被弃用。如果该字段未被弃用，或者该信息未知，则可以省略。 请参阅下面的更多细节。

包含在每个属性元素的`deprecation`属性中的JSON对象可以包含以下属性：

名称|类型|目的
--|--|--
`level`|String|弃用级别可以是`warning`（默认）或`error`。当一个属性具有`warning`弃用级别时，它应该仍然被绑定在环境中。但是，如果它具有`error`弃用级别，则不再管理该属性，也不会被绑定。
`reason`|String|属性被弃用原因的简短描述。 如果没有原因可以省略。建议描述是一个简短的段落，第一行提供一个简明的总结。 描述的最后一行应以句点（`.`）结尾。
`replacement`|String|替换此弃用属性的属性的全名。如果没有这个属性的替换属性，可以省略。

> 在Spring Boot 1.3之前，可以使用一个废弃的布尔属性来代替`deprecation`元素。 这仍被支持，不应再使用。如果没有原因和替换属性，则应该设置一个空的`deprecation`对象。

也可以在代码中明确指定弃用，方法是将`@DeprecatedConfigurationProperty`注释添加到属性的getter方法中。例如，假设`app.foo.target`属性很混乱，并被重命名为`app.foo.name`
```java
@ConfigurationProperties("app.foo")
public class FooProperties {

	private String name;

	public String getName() { ... }

	public void setName(String name) { ... }

	@DeprecatedConfigurationProperty(replacement = "app.foo.name")
	@Deprecated
	public String getTarget() {
		return getName();
	}

	@Deprecated
	public void setTarget(String target) {
		setName(target);
	}
}
```

> 由于代码仍在处理属性，因此无法设置`level`，因为总是假设`warning`。

上面的代码确保不推荐使用的属性仍然有效（委托给后台的`name`属性）。 一旦`getTarget`和`setTarget`方法可以从公共API中删除，元数据中的自动弃用提示也将消失。 如果要保留提示，添加具有`error`弃用级别的手动元数据可确保用户仍被通知该属性，并且在提供`replacement`时特别有用。

#### B.1.3 提示属性
`hints`数组中的JSON对象可以包含以下属性：

名称|类型|目的
--|--|--
`name`|String|这个提示引用的属性的全名。名称以小写的虚线形式（例如`server.servlet.path`）。 如果该属性引用一个map（例如`system.contexts`），则该提示要么应用于map的*keys*（`system.context.keys`），要么应用于values（`system.context.values`）。 该属性是强制性的。
`values`|ValueHint[]|`ValueHint`对象定义的有效值列表（请参见下文）。 每个条目定义了这个值，并可能有描述信息。
`providers`|ValueProvider[]|由`ValueProvider`对象定义的提供者列表（见下文）。 每个条目定义提供者的名称及其参数（如果有的话）。

包含在每个`hint`元素的`values`属性中的JSON对象可以包含以下属性：

名称|类型|目的
--|--|--
`value`|Object|提示引用的元素的有效值。如果属性的类型是一个数组，也可以是一个值的数组。 该属性是强制性的。
`description`|String|可以向用户显示的值的简短说明。如果没有可用的描述，可以省略。 建议描述是一个简短的段落，第一行提供一个简明的总结。描述的最后一行应以句点（`.`）结尾。

包含在每个`hint`元素的`providers`属性中的JSON对象可以包含以下属性：
名称|类型|目的
--|--|--
`name`|String|提供者的名称，用于为提示引用的元素提供其他帮助。
`parameters`|JSON object|提供者支持的任何其他参数（有关更多详细信息，请参阅提供者的文档）。

#### B.1.4 重复的元数据项目
具有相同名称的“属性”和“组”对象在元数据文件内出现多次是完全可以接受的。例如，你可以将两个单独的类绑定到相同的前缀，每个类都可能提供重复的属性名称。 尽管这不常见，但是元数据的使用者应该注意确保他们支持这种情况。
### B.2 提供手动提示
为了改善用户体验并进一步帮助用户配置给定属性，可以提供以下元数据：

- 描述一个属性的取值的列表。
- 关联一个提供者将一个明确定义的语义附加到属性上，以便工具可以根据该项目的上下文发现取值的列表。

#### B.2.1 值提示
每个提示的`name`属性引用的是一个属性的`name`。在上面的例子中，我们为`spring.jpa.hibernate.ddl-auto`属性提供了5个值：`none`，`validate`，`update`，`create`和`create-drop`。 每个值也可以有一个描述。

如果你的属性是`Map`类型，则可以为键和值提供提示（但不能为map本身提供）。 必须使用特殊的`.keys`和`.values`后缀分别表示键和值。

让我们假设一个`foo.contexts`将魔术字符串映射到一个整数：
```java
@ConfigurationProperties("foo")
public class FooProperties {

	private Map<String,Integer> contexts;
	// getters and setters
}
```
魔术值是foo和bar。 为了为keys提供额外的内容帮助，你可以将以下内容添加到[模块的手动元数据](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#configuration-metadata-additional-metadata)中：
```json
{"hints": [
	{
		"name": "foo.contexts.keys",
		"values": [
			{
				"value": "foo"
			},
			{
				"value": "bar"
			}
		]
	}
]}
```
> 当然，你应该用`Enum`来代替这两个值。如果你的IDE支持，这是迄今为止最有效的自动完成方法。

#### B.2.2 值提供者
提供者是将语义附加到属性的有效方式。我们在下面的部分定义了官方提供者。但是请记住，你最喜欢的IDE可能会实现其中的一些，或者一个都没有。 它也可以提供它自己的。

> 由于这是一个新功能，IDE开发商将不得不加上这个新功能。

下表总结了支持的提供者列表：

名称|描述
--|--
`any`|允许提供任何额外的值。
`class-reference`|自动完成项目中可用的类。通常受到通过`target`参数指定的基类的约束。
`handle-as`|处理该属性，就好像它是通过强制的`target`参数定义的类型定义的一样。
`logger-name`|自动完成有效的日志记录器名称。通常当前项目中可用的包和类名称都可以自动完成。
`spring-bean-reference`|自动完成当前项目中的可用bean名称。通常受到通过`target`参数指定的基类的约束。
`spring-profile-name`|自动完成项目中可用的Spring profile名称。

> 对于给定的属性，只能有一个提供者处于活动状态，但是如果它们可以通过某种方式来管理属性，则可以指定多个提供者。确保首先放置最强大的提供者，因为IDE必须使用它可以处理的JSON部分中的第一个提供者。如果不支持给定属性的提供者，那么不会提供特别的内容帮助。

##### Any
*any*提供者允许提供任何额外的值。如果支持的话，则应该应用基于属性类型的常规值校验。

如果你有一个值列表，那么通常会使用这个提供者，并且任何额外的值仍将被视为有效的。

以下示例为`system.state`的自动完成提供了`on`和`off`值;其他的任何值也是允许的：
```json
{"hints": [
	{
		"name": "system.state",
		"values": [
			{
				"value": "on"
			},
			{
				"value": "off"
			}
		],
		"providers": [
			{
				"name": "any"
			}
		]
	}
]}
```
##### Class reference
**class-reference**提供者自动完成项目中可用的类。这个提供者支持下面这些参数：

参数|类型|默认值|描述
--|--|--|--
`target`|`String` (`Class`)|*none*|应该分配给所选值的类的完全限定名称。通常用于过滤非候选类。请注意，这些信息可以由类型本身通过暴露具有适当上限的类来提供。
`concrete`|`boolean`|true|指定是否只有具体的类被视为有效的候选者。

下面的元数据片段对应于标准的`server.servlet.jsp.class-name`属性，该属性定义了要使用的`JspServlet`类名称：
```json
{"hints": [
	{
		"name": "server.servlet.jsp.class-name",
		"providers": [
			{
				"name": "class-reference",
				"parameters": {
					"target": "javax.servlet.http.HttpServlet"
				}
			}
		]
	}
]}
```
##### Handle As
**handle-as**提供者允许你将属性的类型替换为更高级的类型。当属性具有`java.lang.String`类型时，通常会发生这种情况，因为你不希望配置类依赖可能不在类路径中的类。 这个提供者支持这些参数：

参数|类型|默认值|描述
--|--|--|--
`target`|String (Class)|*none*|要考虑的属性类型的完全限定名称。该参数是强制性的。

可以使用以下类型：
- 列出属性任何可能值的`java.lang.Enum`（尝试使用`Enum`类型定义属性，而不要求IDE自动完成值的进一步提示）。
- `java.nio.charset.Charset`：字符集/编码值的自动完成（例如`UTF-8`）
- `java.util.Locale`：自动完成语言环境（例如`en_US`）
- `org.springframework.util.MimeType`：内容类型的自动完成（例如`text/plain`）
- `org.springframework.core.io.Resource`：自动完成Spring的资源抽象来引用文件系统或类路径上的文件。（例如`classpath:/foo.properties`）

> 如果可以提供多个值，请使用`Collection`或*Array*类型告诉IDE。

下面的元数据片段对应于标准的`spring.liquibase.change-log`属性，该属性定义了要使用的更改日志的路径。它实际上是作为`org.springframework.core.io.Resource`在内部使用的，但是不能被公开，因为我们需要保留原来的String值来传递给Liquibase API。
```json
{"hints": [
	{
		"name": "spring.liquibase.change-log",
		"providers": [
			{
				"name": "handle-as",
				"parameters": {
					"target": "org.springframework.core.io.Resource"
				}
			}
		]
	}
]}
```
##### Logger name
**logger-name**提供者会自动完成有效的日志记录器名称。通常，当前项目中可用的包和类名称都可以自动完成。具体的框架可能会有额外的魔术日志记录器名称，也可以支持。

由于日志记录器名称可以是任意名称，实际上，此提供者应该允许任何值，但可以突出显示项目类路径中不可用的有效包和类名称。

下面的元数据片段对应于标准的`logging.level`属性，keys是*日志记录器名称*和values对应于标准日志级别或任何自定义级别：
```json
{"hints": [
	{
		"name": "logging.level.keys",
		"values": [
			{
				"value": "root",
				"description": "Root logger used to assign the default logging level."
			}
		],
		"providers": [
			{
				"name": "logger-name"
			}
		]
	},
	{
		"name": "logging.level.values",
		"values": [
			{
				"value": "trace"
			},
			{
				"value": "debug"
			},
			{
				"value": "info"
			},
			{
				"value": "warn"
			},
			{
				"value": "error"
			},
			{
				"value": "fatal"
			},
			{
				"value": "off"
			}

		],
		"providers": [
			{
				"name": "any"
			}
		]
	}
]}
```

##### Spring bean reference
**spring-bean-reference**提供者自动完成在当前项目的配置中定义的bean。这个提供者支持这些参数：

参数|类型|默认值|描述
--|--|--|--
`target`|String (Class)|*none*|应该可分配给候选者的bean类的完全限定名称。通常用于过滤非候选bean。

下面的元数据片段对应于定义要使用的`MBeanServer` bean名称的标准`spring.jmx.server`属性：
```json
{"hints": [
	{
		"name": "spring.jmx.server",
		"providers": [
			{
				"name": "spring-bean-reference",
				"parameters": {
					"target": "javax.management.MBeanServer"
				}
			}
		]
	}
]}
```
> 绑定器无法感知元数据，所以如果你提供了这个提示，你仍然需要使用`ApplicationContext`将bean的名字转换成实际的Bean引用。

##### Spring profile name
`spring-profile-name`提供者自动完成在当前项目的配置中定义的Spring profie。

下面的元数据片段对应于标准`spring.profiles.active`属性，该属性定义了要启用的Spring profile的名称：
```json
{"hints": [
	{
		"name": "spring.profiles.active",
		"providers": [
			{
				"name": "spring-profile-name"
			}
		]
	}
]}
```
### B.3 使用注解处理器生成你自己的元数据
你可以通过使用`spring-boot-configuration-processor`jar，轻松地从带有`@ConfigurationProperties`的项目中生成自己的配置元数据文件。这个jar包括一个Java注解处理器，它在你的项目编译时调用。要使用这个处理器，只需将`spring-boot-configuration-processor`作为一个可选的依赖项，例如，你可以在Maven中添加:
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-configuration-processor</artifactId>
	<optional>true</optional>
</dependency>
```
在Gradle中你可以使用[propdeps-plugin](https://github.com/spring-gradle-plugins/propdeps-plugin)，并指定:
```
dependencies {
	optional "org.springframework.boot:spring-boot-configuration-processor"
}
compileJava.dependsOn(processResources)
```
> 你需要向构建添加`compileJava.dependsOn(processResources)`，以确保在编译代码之前处理资源。没有这个指令，任何`additional-spring-configuration-metadata.json`文件都不会被处理。

处理器将会选择带有`@ConfigurationProperties`的类和方法。配置类中用于字段的Javadoc将用于填充`description`属性。

> 你应该只使用带有`@ConfigurationProperties`字段Javadoc的简单文本，因为它们在被添加到JSON之前不会被处理。

属性是通过标准的getter和setter方法而发现的，这些设置对于集合类型有特殊的处理(即使只有一个getter存在，也会被检测到)。注解处理器还支持使用`@Data`、`@Getter`和`@Setter` lombok注解。

> 如果你在项目中使用了AspectJ，则需要确保注解处理器只运行一次。有几种方法可以做到这一点:使用Maven时，你可以显式地配置`maven-apt-plugin`，并且只在这里添加注解处理器依赖。你还可以在`maven-compiler-plugin`配置AspectJ插件运行所有处理和禁用注解处理:
>```xml
><plugin>
>	<groupId>org.apache.maven.plugins</groupId>
>	<artifactId>maven-compiler-plugin</artifactId>
>	<configuration>
>		<proc>none</proc>
>	</configuration>
></plugin>
>```

#### B.3.1 内部属性
注解处理器会自动将内部类视为嵌套的属性。例如下面的类:
```java
@ConfigurationProperties(prefix="server")
public class ServerProperties {

	private String name;

	private Host host;

	// ... getter and setters

	private static class Host {

		private String ip;

		private int port;

		// ... getter and setters

	}

}
```
上面的代码将为`server.name`、`server.host.ip`、`server.host.port`属性生成元数据信息。你可以使用`@NestedConfigurationProperty`注解字段表明这个常规(non-inner)类应该被视为嵌套类。

> 这对集合和map没有影响，因为这些类型是自动识别的，并且为每个类型生成一个元数据属性。

#### B.3.2 添加额外的元数据
Spring Boot的配置文件处理非常灵活;而且通常情况下属性可能存在不绑定到`@ConfigurationProperties` bean的情况。你可能还需要调整现有key的某些属性。为了支持这种情况，并允许你提供自定义的“提示”，注解处理器将自动地将来自`META-INF/additional-spring-configuration-metadata.json`的项目合并到主元数据文件中。

如果你引用了自动检测到的属性，则会在指定时重写说明，默认值和弃用信息。如果在当前模块中没有识别手动属性声明，则将其添加为新的属性。

`additional-spring-configuration-metadata.json`文件的格式与常规的`spring-configuration-metadata.json`完全相同。额外的属性文件是可选的，如果你没有任何额外的属性，不要添加它。
## 附录 C. 自动配置类
以下是Spring Boot提供的所有自动配置类的列表，包含文档和源代码的链接。请记住在应用程序中查看autoconfig报告，了解哪些功能可以打开。（使用`--debug`或`-Ddebug`启动应用程序，或者在Actuator应用程序中使用`autoconfig`端点）。
### C.1 来自“spring-boot-autoconfigure”模块
以下自动配置类来自`spring-boot-autoconfigure`模块：

配置类|链接
--|--
[`ActiveMQAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jms/activemq/ActiveMQAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/jms/activemq/ActiveMQAutoConfiguration.html)
[`AopAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/aop/AopAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/aop/AopAutoConfiguration.html)
[`ArtemisAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jms/artemis/ArtemisAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/jms/artemis/ArtemisAutoConfiguration.html)
[`BatchAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/batch/BatchAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/batch/BatchAutoConfiguration.html)
[`CacheAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/cache/CacheAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/cache/CacheAutoConfiguration.html)
[`CassandraAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/cassandra/CassandraAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/cassandra/CassandraAutoConfiguration.html)
[CassandraDataAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/cassandra/CassandraDataAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/data/cassandra/CassandraDataAutoConfiguration.html)
[CassandraReactiveDataAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/cassandra/CassandraReactiveDataAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/data/cassandra/CassandraReactiveDataAutoConfiguration.html)
[CassandraReactiveRepositoriesAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/cassandra/CassandraReactiveRepositoriesAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/data/cassandra/CassandraReactiveRepositoriesAutoConfiguration.html)
[CassandraRepositoriesAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/cassandra/CassandraRepositoriesAutoConfiguration.java)[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/data/cassandra/CassandraRepositoriesAutoConfiguration.html)
[CloudAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/cloud/CloudAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/cloud/CloudAutoConfiguration.html)
[CodecsAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/http/codec/CodecsAutoConfiguration.java)[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/http/codec/CodecsAutoConfiguration.html)
[ConfigurationPropertiesAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/context/ConfigurationPropertiesAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/context/ConfigurationPropertiesAutoConfiguration.html)
[CouchbaseAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/couchbase/CouchbaseAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/couchbase/CouchbaseAutoConfiguration.html)
[CouchbaseDataAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/couchbase/CouchbaseDataAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/data/couchbase/CouchbaseDataAutoConfiguration.html)
[CouchbaseRepositoriesAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/data/couchbase/CouchbaseRepositoriesAutoConfiguration.java)[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/data/couchbase/CouchbaseRepositoriesAutoConfiguration.html)
[DataSourceAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/DataSourceAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/jdbc/DataSourceAutoConfiguration.html)
[DataSourceTransactionManagerAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/DataSourceTransactionManagerAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/jdbc/DataSourceTransactionManagerAutoConfiguration.html)
[DeviceDelegatingViewResolverAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/mobile/DeviceDelegatingViewResolverAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/mobile/DeviceDelegatingViewResolverAutoConfiguration.html)
[DeviceResolverAutoConfiguration](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/mobile/DeviceResolverAutoConfiguration.java)|[javadoc](http://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/api/org/springframework/boot/autoconfigure/mobile/DeviceResolverAutoConfiguration.html)

[更多查看](http://www.doczh.site/docs/spring-boot/spring-boot-docs/current/en/reference/htmlsingle/index.html#auto-configuration-classes-from-autoconfigure-module)
### C.2 来自“spring-boot-actuator-autoconfigure”模块
以下自动配置类来自`spring-boot-actuator-autoconfigure`模块：
## 附录 D. 测试自动配置注解
以下是各种`@...Test`注解的表格，可用于测试应用程序以及默认导入的自动配置：
## 附录 E. 可执行的jar格式
`Spring-Boot-loader`模块允许Spring Boot支持可执行的jar和war文件。如果你使用的是Maven或Gradle插件，会自动生成可执行jar，你通常不需要知道它们的工作细节。

如果你需要从不同的构建系统创建可执行的JAR，或者你只是对底层技术感兴趣，本节将提供一些背景知识。
### E.1 内部jar
Java不提供任何标准的方法来加载嵌套的jar文件（即jar文件本身包含在jar中）。 如果你想分发一个自包含的应用程序，可以从命令行运行而不需要解压，这可能会有问题。

为了解决这个问题，许多开发者使用“shaded”jar。shaded jar简单地把所有的类从所有的jar中包装成一个“超级jar”。shaded jar的问题在于，很难在应用程序中看到实际使用的库。如果在多个jar中使用相同的文件名（但是具有不同的内容），则有可能是有问题的。 Spring Boot采用了不同的方法，可以直接嵌入jar。
#### E.1.1 可执行的jar文件结构
Spring Boot Loader兼容的jar文件应该按照以下方式构建：
```
example.jar
 |
 +-META-INF
 |  +-MANIFEST.MF
 +-org
 |  +-springframework
 |     +-boot
 |        +-loader
 |           +-<spring boot loader classes>
 +-BOOT-INF
    +-classes
    |  +-mycompany
    |     +-project
    |        +-YourClasses.class
    +-lib
       +-dependency1.jar
       +-dependency2.jar
```
应用程序类应放置在嵌套的`BOOT-INF/classes`目录中。依赖应该放在一个嵌套的`BOOT-INF/lib`目录中。
#### E.1.2 可执行的war文件结构
Spring Boot Loader兼容的war文件应该按以下方式构建：
```
example.war
 |
 +-META-INF
 |  +-MANIFEST.MF
 +-org
 |  +-springframework
 |     +-boot
 |        +-loader
 |           +-<spring boot loader classes>
 +-WEB-INF
    +-classes
    |  +-com
    |     +-mycompany
    |        +-project
    |           +-YourClasses.class
    +-lib
    |  +-dependency1.jar
    |  +-dependency2.jar
    +-lib-provided
       +-servlet-api.jar
       +-dependency3.jar
```
依赖应放置在嵌套的`WEB-INF/lib`目录中。运行时所需的任何嵌入式，但在部署到传统Web容器时不需要的依赖，则应放在`WEB-INF/lib-provided`目录。
### E.2 Spring Boot的“JarFile”类
用于支持加载嵌套jar的核心类是`org.springframework.boot.loader.jar.JarFile`。 它允许你从标准的jar文件或嵌套的子jar数据中加载jar内容。第一次加载时，每个`JarEntry`的位置都会映射到外部jar的物理文件偏移量：
```
myapp.jar
+-------------------+-------------------------+
| /BOOT-INF/classes | /BOOT-INF/lib/mylib.jar |
|+-----------------+||+-----------+----------+|
||     A.class      |||  B.class  |  C.class ||
|+-----------------+||+-----------+----------+|
+-------------------+-------------------------+
 ^                    ^           ^
 0063                 3452        3980
 ```
 上面的例子显示了如何在`myapp.jar`的`0063`位置的`/BOOT-INF/classes`中找到`A.class`。嵌套jar中的`B.class`实际上可以在`myapp.jar`中`3452`位置找到，而`C.class`位于`3980`。
 
 有了这些信息，我们可以通过简单地寻找外部jar的适当部分来加载特定的嵌套条目。 我们不需要解压，也不需要把所有的录入数据读入内存。
 
#### E.2.1 与标准Java“JarFile”兼容
Spring Boot Loader努力与现有的代码和库保持兼容。`org.springframework.boot.loader.jar.JarFile`继承自`java.util.jar.JarFile`，应该首先考虑。`getURL()`方法将返回一个`URL`，该URL打开一个与`java.net.JarURLConnection`兼容的连接，并可以与Java的`URLClassLoader`一起使用。
### E.3 启动可执行文件
`org.springframework.boot.loader.Launcher`类是一个特殊的引导类，它被用作可执行jar的主入口点。它是jar文件中实际的`Main-Class`，它用于设置一个合适的`URLClassLoader`并最终调用你的`main()`方法。

有3个子类启动器(`JarLauncher`、`WarLauncher`和`PropertiesLauncher`)。它们的目的是加载来自内部的jar文件中的资源(`.class`文件等)或目录中的war文件(类路径上)。在`JarLauncher`和`WarLauncher`的情况下，内部的路径是固定的。`JarLauncher`在`BOOT-INF/lib/`中查找，而`WarLauncher`在`WEB-INF/lib`和`/和WEB-INF/lib-provided/`中查找，所以如果需要更多的话，只需在这些位置添加额外的jar文件。默认情况下，`PropertiesLauncher`在你的应用程序包`BOOT-INF/lib/`中查找文件，但是你可以通过设置一个环境变量`LOADER_PATH`或在`loader.properties`中设置`loader.path`属性来添加额外的位置(逗号分隔的目录，档案或档案中的目录的列表)。
#### E.3.1 启动程序清单
你需要指定一个适当的`Launcher`作为`META-INF/MANIFEST.MF`中的`Main-Class`属性。 应该在`Start-Class`属性中指定要启动的实际类（即，你编写的包含`main`方法的类）。

例如，以下是可执行jar文件的一个典型`MANIFEST.MF`：
```
Main-Class: org.springframework.boot.loader.JarLauncher
Start-Class: com.mycompany.project.MyApplication
```
对于war文件，这将是：
```
Main-Class: org.springframework.boot.loader.WarLauncher
Start-Class: com.mycompany.project.MyApplication
```

> 你不需要在清单文件中指定`Class-Path`项，类路径将从嵌套的jar文件中推导出来。

#### E.3.2 解压包
某些PaaS实现可能会选择在运行之前解压包文件。 例如，Cloud Foundry就是以这种方式运行的。你可以通过简单地启动适当的启动程序运行一个解压的包：
```
$ unzip -q myapp.jar
$ java org.springframework.boot.loader.JarLauncher
```

### E.4 PropertiesLauncher特性
`PropertiesLauncher`具有一些可以使用外部属性（系统属性，环境变量，清单条目或`loader.properties`）启用的特殊功能。

Key|目的
--|--
`loader.path`|逗号分隔的类路径，例如`lib,${HOME}/app/lib`。 前面的项目优先，就像`javac`命令行上的常规`-classpath`参数一样。
`loader.home`|用于解析`loader.path`中的相对路径。例如`loader.path=lib`然后`${loader.home}/lib`是一个类路径位置（以及该目录中的所有jar文件）。还用于查找`loader.properties`文件。例如`/opt/app`（默认为`${user.dir}`）。
`loader.args`|main方法的默认参数（空格分隔）
`loader.main`|要启动的主类的名称`com.app.Application`
`loader.config.name`|属性文件的名称，例如 `launcher`（默认为`loader`）。
`loader.config.location`|属性文件的路径，例如`classpath:loader.properties`（默认为`loader.properties`）。
`loader.system`|布尔标志，指示应将所有属性添加到系统属性（默认为`false`）

当指定为环境变量或清单项时，应使用以下名称：

Key|Manifest 项|环境变量
--|--|--
`loader.path`|`Loader-Path`|`LOADER_PATH`
`loader.home`|`Loader-Home`|`LOADER_HOME`
`loader.args`|`Loader-Args`|`LOADER_ARGS`
`loader.main`|`Start-Class`|`LOADER_MAIN`
`loader.config.location`|`Loader-Config-Location`|`LOADER_CONFIG_LOCATION`
`loader.system`|`Loader-System`|`LOADER_SYSTEM`

> 构建fat jar时，构建插件会自动将`Main-Class`属性移动到`Start-Class`。如果你正在使用它，请使用`Main-Class`属性指定要启动的类的名称，并省略`Start-Class`.

- 首先在`loader.home`中搜索`loader.properties`，然后在类路径的根目录中，然后在`classpath:/BOOT-INF/classes`中搜索。会使用找到的第一个目录中的文件。
- `loader.home` 只要`loader.config.location`没有指定, `loader.home` 只是一个额外的属性文件的目录位置（覆盖默认值）。
- `loader.path`可以包含目录（递归扫描jar和zip文件），归档路径，扫描jar文件（例如`dependencies.jar!/lib`）的归档文件中的目录，或者通配符（用于默认JVM行为）。归档路径可以相对于`loader.home`或文件系统中具有`jar:file:`前缀的任何位置。
- `loader.path`（如果为空）默认为`BOOT-INF/lib`（表示本地目录或从存档运行的嵌套目录）。正因为如此，在没有提供额外的配置时，`PropertiesLauncher`与`JarLauncher`的行为相同。
- `loader.path`不能用于配置`loader.properties`的位置（用于搜索后者的类路径是启动`PropertiesLauncher`时的JVM类路径）。
- 占位符替换是在使用前从系统和环境变量加上属性文件本身对所有值进行的。
- 属性的搜索顺序（在多个地方查找是有意义的）是环境变量，系统属性，`loader.properties`，展开的归档清单，归档清单。

### E.5 可执行的jar限制
在使用Spring Boot Loader打包的应用程序时，需要考虑许多限制。
#### E.5.1 Zip压缩
必须使用`ZipEntry.STORED`方法保存嵌套jar的`ZipEntry`。这是必需的，以便我们可以直接查找嵌套jar中的单个内容。嵌套的jar文件本身的内容仍然可以被压缩，外层jar中的任何其他条目也可以被压缩。
#### E.5.2 System ClassLoader
启动的应用程序应该在加载类时使用`Thread.getContextClassLoader()`（大多数库和框架默认会这样做）。尝试通过`ClassLoader.getSystemClassLoader()`加载嵌套的jar类将会失败。 请注意，`java.util.Logging`总是使用系统类加载器，因此你应该考虑使用不同的日志记录实现。
### E.6 单jar替代方案
如果上面的限制意味着你不能使用Spring Boot Loader，可以考虑下面的选择：
- [Maven Shade Plugin](http://maven.apache.org/plugins/maven-shade-plugin/)
- [JarClassLoader](http://www.jdotsoft.com/JarClassLoader.php)
- [OneJar](http://one-jar.sourceforge.net/)

## 附录 F. 依赖版本
