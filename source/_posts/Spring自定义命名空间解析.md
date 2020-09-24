---
title: Spring自定义命名空间解析
tags:
  - 自定义
  - 命名空间
  - NamespaceHandler
abbrlink: 75b6
date: 2019-05-13 14:35:52
---

# 自定义命名空间解析

当我们想要扩展Spring 的配置时，可以定义我们自己的标签，然后解析成 bean定义，注册到Spring 容器中。这时需要用到 `NamespaceHandler`。Spring 框架中除了beans顶级标签外，其他的顶级标签都是自定义命名空间中的标签。如，`p`、 `c`、`util`命名空间。

## `NamespaceHandler` 命名空间解析器

Spring 框架中`mvc`、`context`、`tx` 等功能都是通过扩展这个接口来实现的。这个接口负责将标签解析成bean 定义对象。该接口提供了`parse` 和`decorate` 方法。`parse`方法用来将顶级标签解析成`BeanDefinition`对象。`decorate` 方法负责对`parse`出来的`BeanDefinition`进行进一步处理，需要解析的可以是元素属性和标签。 可以返回原来的`BeanDefinition`，或者返回一个新的`BeanDefinition`。

为了解析的方便，Spring 提供了一个抽象类`NamespaceHandlerSupport`，封装了一些基础功能，并提供了两个新的接口(`BeanDefinitionParser`和`BeanDefinitionDecorator`)方便扩展。并提供了`registerBeanDefinitionDecorator`、`registerBeanDefinitionParser`、`registerBeanDefinitionDecoratorForAttribute`三个方法分别注册`BeanDefinitionParser`和`BeanDefinitionDecorator`实现类，内部用map来维护标签名或者属性名到`BeanDefinitionParser`和`BeanDefinitionDecorator`的映射关系，解析时用名称(无命名空间前缀)来查找。

## Spring提供的`NamespaceHandler`

Spring 提供了一些 `NamespaceHandler`来实现自身功能。下面详细了解一下。

### `SimplePropertyNamespaceHandler` 简单属性解析器

解析的命名空间为 `http://www.springframework.org/schema/p`。它将特定属性直接映射到bean属性。需要注意的重要一点是，`NamespaceHandler`无法预知所有可能的属性名。该实现类直接实现了`NamespaceHandler`。

下面是使用`NamespaceHandler`的一个例子: 

```xml
<bean id = "rob" class = "..TestBean" p:name="Rob" p:spouse-ref="sally"/>
```

这里的`p:name`直接对应于类`TestBean`上的`name`属性。`p:spouse-ref`属性对应于`spouse`属性，将`value `所对应的bean注入到该属性中。

`parse`方法直接记录日志信息，并返回 `null`。因为它只支持对属性进行解析。

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
		parserContext.getReaderContext().error(
				"Class [" + getClass().getName() + "] does not support custom elements.", element);
		return null;
	}
```

`decorate`将元素属性表示的属性设置到对应的对象属性中。每个属性都会调用一次这个方法。拿上文提到的例子来解释一下下面代码的逻辑。

```java
public BeanDefinitionHolder decorate(Node node, BeanDefinitionHolder definition, ParserContext parserContext) {
   if (node instanceof Attr) {
       //只处理标签属性
      Attr attr = (Attr) node;
       //获取到属性名称，例子中为 name
      String propertyName = parserContext.getDelegate().getLocalName(attr);
       //获取到属性值 例子中为 Rob
      String propertyValue = attr.getValue();
       //从当前bean定义取出属性值集合
      MutablePropertyValues pvs = definition.getBeanDefinition().getPropertyValues();
       //如果已经解析出了该属性，则记录一下错误日志。这里是因为我们可以用标签 <property> 来声明属性, p 标签实际上是一种简化形式。两种声明方式只能用一种来声明同一个属性
      if (pvs.contains(propertyName)) {
         parserContext.getReaderContext().error("Property '" + propertyName + "' is already defined using " +
               "both <property> and inline syntax. Only one approach may be used per property.", attr);
      }
       // 如果属性名以 _ref 结尾，则表示该属性值引用一个 bean ,_ref 前面是 bean 名称
      if (propertyName.endsWith(REF_SUFFIX)) {
         propertyName = propertyName.substring(0, propertyName.length() - REF_SUFFIX.length());
         // 将标签属性名转换成属性名，小写，破折号形式转成驼峰形式，值转换成 RuntimeBeanReference，这个对象会在运行时转成具体的bean
          pvs.add(Conventions.attributeNameToPropertyName(propertyName), new RuntimeBeanReference(propertyValue));
      }
      else {
          //字面值直接添加进去就行了
         pvs.add(Conventions.attributeNameToPropertyName(propertyName), propertyValue);
      }
   }
   return definition;
}
```

**小结：用这个自定义属性来替换`<property>`使用起来更方便。**

### `SimpleConstructorNamespaceHandler` 简单构造函数解析器

将自定义属性映射到构造函数参数。解析的命名空间地址为`http://www.springframework.org/schema/c`。需要注意该解析器无法预知所有的参数。

下面看一个简单例子：

```xml
<bean id="author" class="..TestBean" c:name="Enescu" c:work-ref="compositions"/>
```

将`name`映射到`TestBean`的构造函数`name`参数，值为`Enescu`，而`work`参数引用了`compositions` bean。

下面看一下源代码：

`parse` 方法不支持解析标签

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
   parserContext.getReaderContext().error(
         "Class [" + getClass().getName() + "] does not support custom elements.", element);
   return null;
}
```

`decorate` 方法， 每个参数都会调用一次这个方法：

```java
public BeanDefinitionHolder decorate(Node node, BeanDefinitionHolder definition, ParserContext parserContext) {
   if (node instanceof Attr) {
       //只解析标签属性
      Attr attr = (Attr) node;
       //获取参数名,上例中为 name
      String argName = StringUtils.trimWhitespace(parserContext.getDelegate().getLocalName(attr));
       // 获取参数值, Enescu
      String argValue = StringUtils.trimWhitespace(attr.getValue());

      ConstructorArgumentValues cvs = definition.getBeanDefinition().getConstructorArgumentValues();
      boolean ref = false;

      // handle -ref arguments
      if (argName.endsWith(REF_SUFFIX)) {
          //如果参数名以 -ref 结尾，获取到真正的参数名，work-ref 则为 work
         ref = true;
         argName = argName.substring(0, argName.length() - REF_SUFFIX.length());
      }

       // 如果是 引用， 则创建 RuntimeBeanReference，运行时动态解析为实际bean 
      ValueHolder valueHolder = new ValueHolder(ref ? new RuntimeBeanReference(argValue) : argValue);
      valueHolder.setSource(parserContext.getReaderContext().extractSource(attr));

      // handle "escaped"/"_" arguments
      if (argName.startsWith(DELIMITER_PREFIX)) {
         // 如果参数名以 _ 开头
         String arg = argName.substring(1).trim();

         // fast default check
         if (!StringUtils.hasText(arg)) {
             // 如果参数名为空，那么添加常规参数值
            cvs.addGenericArgumentValue(valueHolder);
         }
         // assume an index otherwise
         else {
             //解析通过构造函数参数下标来指定的参数
            int index = -1;
            try {
               index = Integer.parseInt(arg);
                //如果不是下标，则记录一下错误
            }
            catch (NumberFormatException ex) {
               parserContext.getReaderContext().error(
                     "Constructor argument '" + argName + "' specifies an invalid integer", attr);
            }
            if (index < 0) {
                // 下标小于0记录错误
               parserContext.getReaderContext().error(
                     "Constructor argument '" + argName + "' specifies a negative index", attr);
            }

            if (cvs.hasIndexedArgumentValue(index)) {
                //已经通过<constructor-arg>标签定义了
               parserContext.getReaderContext().error(
                     "Constructor argument '" + argName + "' with index "+ index+" already defined using <constructor-arg>." +
                     " Only one approach may be used per argument.", attr);
            }
			// 到这里则解析成功，添加进到ConstructorArgumentValues中去
            cvs.addIndexedArgumentValue(index, valueHolder);
         }
      }
      // no escaping -> ctr name
      else {
          // 不是下标形式，则直接转换参数名
         String name = Conventions.attributeNameToPropertyName(argName);
         if (containsArgWithName(name, cvs)) {
             //检查是否已经定义过
            parserContext.getReaderContext().error(
                  "Constructor argument '" + argName + "' already defined using <constructor-arg>." +
                  " Only one approach may be used per argument.", attr);
         }
         valueHolder.setName(Conventions.attributeNameToPropertyName(argName));
         cvs.addGenericArgumentValue(valueHolder);
      }
   }
   return definition;
}
```

#### 小结：配置构造函数的方式

1. 使用`<constructor-arg>`标签，可以使用名称来定义，也可以使用下标。

2. 在`<bean>`标签中使用`c:`自定义属性, 属性名有两种方式：

   1. 下标形式`_0` 
   2. 构造函数参数名形式`c:name="value"`

   如果参数值需要引用bean，那么需要在属性名后加上`_ref`表示引用。

两种方式对比：

| 方式                    | 名称                                     | 下标                                  |
| ----------------------- | ---------------------------------------- | ------------------------------------- |
| `<constructor-arg>`标签 | name=“name” value=“value” (ref=“beanid”) | index=“0” value=“value”(ref=“beanid”) |
| `c:`属性                | c: name=“value”(c:name_ref=“beanid”)     | c:\_0=“value” (c:_0_ref=“beanid”)     |
|                         |                                          |                                       |



### `NamespaceHandlerSupport` 命名空间解析器支持类

实现自定义`NamespaceHandler`的支持类。各个节点的解析和装饰分别通过`BeanDefinitionParser`和`BeanDefinitionDecorator`策略接口完成。提供`registerBeanDefinitionParser`和`registerBeanDefinitionDecorator`方法，用于注册`BeanDefinitionParser`或`BeanDefinitionDecorator`来处理特定元素。

#### `BeanDefinitionParser` 

`DefaultBeanDefinitionDocumentReader`用于处理自定义顶级标签的接口。实现类可以根据需要自由地将自定义标签中的元数据转换成任意多的bean定义。

##### `AbstractBeanDefinitionParser` 类

`BeanDefinitionParser`实现类，该类提供了许多方便的方法和模板方法，子类必须重写这些方法才能提供实际的解析逻辑。

当你想将任意复杂的XML解析为一个或多个bean定义时，请使用这个`BeanDefinitionParser`实现。如果只是想将一些XML解析为一个bean定义，那么可以考虑该类更简单的扩展类，即 `AbstractSingleBeanDefinitionParser` 和 `AbstractSimpleBeanDefinitionParser`。

###### `parse` 方法

`parse` 方法是该解析器的入口，定义了整个解析的流程以及子类可以扩展的方法。

```java
public final BeanDefinition parse(Element element, ParserContext parserContext) {
    //解析出 BeanDefinition， parseInternal 方法是一个抽象方法，子类需要实现
   AbstractBeanDefinition definition = parseInternal(element, parserContext);
   if (definition != null && !parserContext.isNested()) {
       // 不是嵌套定义
      try {
          //解析出 bean id， 该方法是 protected级别，子类可以重写
         String id = resolveId(element, definition, parserContext);
         if (!StringUtils.hasText(id)) {
            parserContext.getReaderContext().error(
                  "Id is required for element '" + parserContext.getDelegate().getLocalName(element)
                        + "' when used as a top-level tag", element);
         }
         String[] aliases = null;
         if (shouldParseNameAsAliases()) {
             //是否需要将名字解析成 别名，默认为 true, 名称可以用逗号指定多个，那么分隔出来之后作为别名
            String name = element.getAttribute(NAME_ATTRIBUTE);
            if (StringUtils.hasLength(name)) {
               aliases = StringUtils.trimArrayElements(StringUtils.commaDelimitedListToStringArray(name));
            }
         }
         BeanDefinitionHolder holder = new BeanDefinitionHolder(definition, id, aliases);
          //注册bean 定义
         registerBeanDefinition(holder, parserContext.getRegistry());
         if (shouldFireEvents()) {
             //发布事件
            BeanComponentDefinition componentDefinition = new BeanComponentDefinition(holder);
            postProcessComponentDefinition(componentDefinition);
             //嵌套bean 定义不发布事件
            parserContext.registerComponent(componentDefinition);
         }
      }
      catch (BeanDefinitionStoreException ex) {
         String msg = ex.getMessage();
         parserContext.getReaderContext().error((msg != null ? msg : ex.toString()), element);
         return null;
      }
   }
   return definition;
}
```

###### 小结

解析流程：

1. 调用`parseInternal` 方法将 xml 解析成`BeanDefinition`，该方法由子类去实现

2. 调用`resolveId`方法得到bean 定义id，可以由子类重写

3. 别名解析

4. 注册bean 定义

5. 发布事件，实现`ReaderEventListener` 进行监听

   

##### `AbstractSingleBeanDefinitionParser` 类

只需要解析和定义一个bean定义的`BeanDefinitionParser`实现基类，继承自`AbstractBeanDefinitionParser`类，实现`parseInternal`方法，近一步细化解析逻辑。

只需要从任意复杂的XML元素创建单个bean定义时，可以扩展这个解析器类。当你想从一个相对简单的自定义XML元素创建一个bean定义时，可以考虑扩展`AbstractSimpleBeanDefinitionParser`类。

生成的bean定义将自动注册到`org.springframework.beans.factory.support.BeanDefinitionRegistry`。只需要将自定义XML元素解析为一个bean定义就可以了。

###### `parseInternal`方法

```java
//创建builder
BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition();
String parentName = getParentName(element);
if (parentName != null) {
    //是否有父定义，默认为空，表示顶层 定义 
   builder.getRawBeanDefinition().setParentName(parentName);
}
//返回与元素对应的bean class
//注意，对于应用程序层的类，通常最好重写getBeanClassName，以避免直接依赖于bean实现类。BeanDefinitionParser及其NamespaceHandler可以在IDE插件中使用，即使应用程序类不在插件的类路径中。
Class<?> beanClass = getBeanClass(element);
if (beanClass != null) {
   builder.getRawBeanDefinition().setBeanClass(beanClass);
}
else {
    //没有设置 beanClass,则通过beanClassName去获取对应的bean
   String beanClassName = getBeanClassName(element);
   if (beanClassName != null) {
      builder.getRawBeanDefinition().setBeanClassName(beanClassName);
   }
}
builder.getRawBeanDefinition().setSource(parserContext.extractSource(element));
BeanDefinition containingBd = parserContext.getContainingBeanDefinition();
if (containingBd != null) {
    //内部bean 定义从父级bean定义中获取scope
   // Inner bean definition must receive same scope as containing bean.
   builder.setScope(containingBd.getScope());
}
if (parserContext.isDefaultLazyInit()) {
   // Default-lazy-init applies to custom bean definitions as well.
   builder.setLazyInit(true);
}
//留给子类去重写的方法，将xml标签属性等映射为bean 定义
doParse(element, parserContext, builder);
return builder.getBeanDefinition();
```

###### 小结

解析流程：

1. 创建builder

2. 设置父级定义名称

3. 设置要转换成bean类，通过`getBeanClass`方法或者`getBeanClassName`

4. 根据父级bean定义设置scope

5. 设置lazyInit属性

6. 调用`doParse`方法将xml对应的相关属性设置到builder中

7. 获取`BeanDefinition`

   对于只需要将xml映射为bean这样简单的解析情形，可以继承这个类实现`doParse`方法，将xml的属性设置到`BeanDefinitionBuilder`中即可。

### `ContextNamespaceHandler`上下文命名空间解析器

继承自`NamespaceHandlerSupport`类，在`init`方法中注册了`context`命名空间下的标签解析类。用来解析命名空间地址`http://www.springframework.org/schema/context`。

#### `context`命名空间下的自定义标签

`init`方法为每个标签都注册了一个解析类


|   标签   |  解析类    |
| ---- | ---- |
| `property-placeholder` | `org.springframework.context.config.PropertyPlaceholderBeanDefinitionParser` |
| `property-override` | `org.springframework.context.config.PropertyOverrideBeanDefinitionParser` |
| `annotation-config` | `org.springframework.context.annotation.AnnotationConfigBeanDefinitionParser` |
| `component-scan` | `org.springframework.context.annotation.ComponentScanBeanDefinitionParser` |
| `load-time-weaver` | `org.springframework.context.config.LoadTimeWeaverBeanDefinitionParser` |
| `spring-configured` | `org.springframework.context.config.SpringConfiguredBeanDefinitionParser` |
| `mbean-export` | `org.springframework.context.config.MBeanExportBeanDefinitionParser` |
| `mbean-server` | `org.springframework.context.config.MBeanServerBeanDefinitionParser` |

##### `property-placeholder`标签解析

`org.springframework.context.config.PropertyPlaceholderBeanDefinitionParser` 类用来解析该标签。继承自`AbstractPropertyLoadingBeanDefinitionParser`， 该类又继承自`AbstractSingleBeanDefinitionParser`，因此只返回单个`BeanDefinition`。

`AbstractPropertyLoadingBeanDefinitionParser`的`doParse`方法：

```java
protected void doParse(Element element, ParserContext parserContext, BeanDefinitionBuilder builder) {
   String location = element.getAttribute("location");
   if (StringUtils.hasLength(location)) {
      location = parserContext.getReaderContext().getEnvironment().resolvePlaceholders(location);
      String[] locations = StringUtils.commaDelimitedListToStringArray(location);
      builder.addPropertyValue("locations", locations);
   }

   String propertiesRef = element.getAttribute("properties-ref");
   if (StringUtils.hasLength(propertiesRef)) {
      builder.addPropertyReference("properties", propertiesRef);
   }

   String fileEncoding = element.getAttribute("file-encoding");
   if (StringUtils.hasLength(fileEncoding)) {
      builder.addPropertyValue("fileEncoding", fileEncoding);
   }

   String order = element.getAttribute("order");
   if (StringUtils.hasLength(order)) {
      builder.addPropertyValue("order", Integer.valueOf(order));
   }

   builder.addPropertyValue("ignoreResourceNotFound",
         Boolean.valueOf(element.getAttribute("ignore-resource-not-found")));

   builder.addPropertyValue("localOverride",
         Boolean.valueOf(element.getAttribute("local-override")));

   builder.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);
}
```

可以看出只是简单的将xml标签的属性取出并设置到builder中。

再看看`PropertyPlaceholderBeanDefinitionParser`的`doParse`方法：

```java
protected void doParse(Element element, ParserContext parserContext, BeanDefinitionBuilder builder) {
   super.doParse(element, parserContext, builder);

   builder.addPropertyValue("ignoreUnresolvablePlaceholders",
         Boolean.valueOf(element.getAttribute("ignore-unresolvable")));

   String systemPropertiesModeName = element.getAttribute(SYSTEM_PROPERTIES_MODE_ATTRIBUTE);
   if (StringUtils.hasLength(systemPropertiesModeName) &&
         !systemPropertiesModeName.equals(SYSTEM_PROPERTIES_MODE_DEFAULT)) {
       // system-properties-mode 不是 ENVIRONMENT
      builder.addPropertyValue("systemPropertiesModeName", "SYSTEM_PROPERTIES_MODE_" + systemPropertiesModeName);
   }

   if (element.hasAttribute("value-separator")) {
      builder.addPropertyValue("valueSeparator", element.getAttribute("value-separator"));
   }
   if (element.hasAttribute("trim-values")) {
      builder.addPropertyValue("trimValues", element.getAttribute("trim-values"));
   }
   if (element.hasAttribute("null-value")) {
      builder.addPropertyValue("nullValue", element.getAttribute("null-value"));
   }
}
```



返回的bean ：

```java
protected Class<?> getBeanClass(Element element) {
   // As of Spring 3.1, the default value of system-properties-mode has changed from
   // 'FALLBACK' to 'ENVIRONMENT'. This latter value indicates that resolution of
   // placeholders against system properties is a function of the Environment and
   // its current set of PropertySources.
   if (SYSTEM_PROPERTIES_MODE_DEFAULT.equals(element.getAttribute(SYSTEM_PROPERTIES_MODE_ATTRIBUTE))) {
       //3.1 开始 system-properties-mode 默认值为 ENVIRONMENT, 
      return PropertySourcesPlaceholderConfigurer.class;
   }

   // The user has explicitly specified a value for system-properties-mode: revert to
   // PropertyPlaceholderConfigurer to ensure backward compatibility with 3.0 and earlier.
    //3.0以前用这个
   return PropertyPlaceholderConfigurer.class;
}
```

###### 小结

从`property-placeholder`标签中解析出的属性：

| xml属性                   | bean 属性                      |
| ------------------------- | ------------------------------ |
| location                  | locations                      |
| properties-ref            | properties                     |
| file-encoding             | fileEncoding                   |
| order                     | order                          |
| ignore-resource-not-found | ignoreResourceNotFound         |
| local-override            | localOverride                  |
| ignore-unresolvable       | ignoreUnresolvablePlaceholders |
| system-properties-mode    | systemPropertiesModeName       |
| value-separator           | valueSeparator                 |
| trim-values               | trimValues                     |
| null-value                | nullValue                      |

##### `property-override`标签解析

`org.springframework.context.config.PropertyOverrideBeanDefinitionParser`类用来解析该标签，与`property-placeholder`标签类似，该类也继承自`AbstractPropertyLoadingBeanDefinitionParser`，与`property-placeholder`标签有一些共有的属性。

`doParse`方法：

```java
@Override
protected void doParse(Element element, ParserContext parserContext, BeanDefinitionBuilder builder) {
   super.doParse(element, parserContext, builder);

   builder.addPropertyValue("ignoreInvalidKeys",
         Boolean.valueOf(element.getAttribute("ignore-unresolvable")));

}
```

`getBeanClass`方法：

```java
protected Class<?> getBeanClass(Element element) {
   return PropertyOverrideConfigurer.class;
}
```

###### 小结

从`property-override`标签中解析出的属性：

| xml属性                   | bean 属性              |
| ------------------------- | ---------------------- |
| location                  | locations              |
| properties-ref            | properties             |
| file-encoding             | fileEncoding           |
| order                     | order                  |
| ignore-resource-not-found | ignoreResourceNotFound |
| local-override            | localOverride          |
| ignore-unresolvable       | ignoreInvalidKeys      |

##### `annotation-config`标签解析

`org.springframework.context.annotation.AnnotationConfigBeanDefinitionParser`用来解析该标签。该类直接实现了`BeanDefinitionParser`接口。

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
   Object source = parserContext.extractSource(element);

   // Obtain bean definitions for all relevant BeanPostProcessors.
    // 获取所有相关 BeanPostProcessor 的bean定义。
    // 注册 ConfigurationClassPostProcessor，AutowiredAnnotationBeanPostProcessor
    // CommonAnnotationBeanPostProcessor, EventListenerMethodProcessor
   Set<BeanDefinitionHolder> processorDefinitions =
         AnnotationConfigUtils.registerAnnotationConfigProcessors(parserContext.getRegistry(), source);

   // Register component for the surrounding <context:annotation-config> element.
    // 注册 <context:annotation-config> 标签代表的组件
   CompositeComponentDefinition compDefinition = new CompositeComponentDefinition(element.getTagName(), source);
    //将该组件入栈，处理嵌套bean定义。
    //入栈代表当前组件是上层组件，后面注册的是其内部组件
   parserContext.pushContainingComponent(compDefinition);

   // Nest the concrete beans in the surrounding component.
    //将上面注册的 BeanDefinitionHolder 作为组件的内部bean定义
   for (BeanDefinitionHolder processorDefinition : processorDefinitions) {
      parserContext.registerComponent(new BeanComponentDefinition(processorDefinition));
   }

   // Finally register the composite component.
    // 最后注册该组合组件，发布事件
   parserContext.popAndRegisterContainingComponent();

    //该解析器本身不返回bean 定义，只是注册其他相关的bean定义
   return null;
}
```

从上面的代码中可以看到，该解析器注册了几个`BeanPostProcessor`， 用来处理注解配置，这里先不展开，后面再具体看一下这几个类的作用。其实整个解析器关键的代码只有这一句:

> AnnotationConfigUtils.registerAnnotationConfigProcessors(parserContext.getRegistry(), source);

后面的代码用来保证整个解析链的完整性，需要发布解析完成的事件。

##### `component-scan`标签解析

`org.springframework.context.annotation.ComponentScanBeanDefinitionParser` 类用来解析该标签。该类直接实现了`BeanDefinitionParser`接口。

###### `parse`方法

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
    //获取root 包名
   String basePackage = element.getAttribute(BASE_PACKAGE_ATTRIBUTE);
    //解析出完整的包名，配置的包名是可以写占位符的
   basePackage = parserContext.getReaderContext().getEnvironment().resolvePlaceholders(basePackage);
    //将包名进行分隔，,; 	可以配置多个包
   String[] basePackages = StringUtils.tokenizeToStringArray(basePackage,
         ConfigurableApplicationContext.CONFIG_LOCATION_DELIMITERS);

   // Actually scan for bean definitions and register them.
    // 配置 ClassPathBeanDefinitionScanner，主要包括 bean定义属性默认值，资源类型（**/*.class），
    //BeanNameGenerator，默认筛选注解类型(@Component), 以及筛选类型过滤器<include-filter>,<exclude-filter>
   ClassPathBeanDefinitionScanner scanner = configureScanner(parserContext, element);
    // 开始扫描所有bean定义
   Set<BeanDefinitionHolder> beanDefinitions = scanner.doScan(basePackages);
   // 注册组件， 这个解析器也调用了 AnnotationConfigUtils.registerAnnotationConfigProcessors(readerContext.getRegistry(), source);方法注册BeanPostProcessor
    registerComponents(parserContext.getReaderContext(), beanDefinitions, element);

   return null;
}
```

###### 小结

该解析器主要是配置一个`ClassPathBeanDefinitionScanner`，然后调用其`doScan`方法，默认扫描`@Component`注解的类，并且可以配置过滤器调整扫描范围。解析出来的扫描路径以`classpath*:`开头，因此可以扫描到jar里面的注解。

##### `load-time-weaver`标签解析

`org.springframework.context.config.LoadTimeWeaverBeanDefinitionParser`标签用来解析该标签。继承自`org.springframework.beans.factory.xml.AbstractSingleBeanDefinitionParser`，返回一个bean定义。

`getBeanClassName`方法：

```java
protected String getBeanClassName(Element element) {
   if (element.hasAttribute(WEAVER_CLASS_ATTRIBUTE)) {
      return element.getAttribute(WEAVER_CLASS_ATTRIBUTE);
   }
    //默认返回 org.springframework.context.weaving.DefaultContextLoadTimeWeaver
   return DEFAULT_LOAD_TIME_WEAVER_CLASS_NAME;
}
```

`doParse`方法：

```java
protected void doParse(Element element, ParserContext parserContext, BeanDefinitionBuilder builder) {
   builder.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);

   if (isAspectJWeavingEnabled(element.getAttribute(ASPECTJ_WEAVING_ATTRIBUTE), parserContext)) {
       //是否启用aspectj
      if (!parserContext.getRegistry().containsBeanDefinition(ASPECTJ_WEAVING_ENABLER_BEAN_NAME)) {
          //如果还没注册 org.springframework.context.config.internalAspectJWeavingEnabler 就注册
         RootBeanDefinition def = new RootBeanDefinition(ASPECTJ_WEAVING_ENABLER_CLASS_NAME);
         parserContext.registerBeanComponent(
               new BeanComponentDefinition(def, ASPECTJ_WEAVING_ENABLER_BEAN_NAME));
      }

      if (isBeanConfigurerAspectEnabled(parserContext.getReaderContext().getBeanClassLoader())) {
          //如果引入了 org.springframework.beans.factory.aspectj.AnnotationBeanConfigurerAspect 类则调用
          //SpringConfiguredBeanDefinitionParser来解析标签
         new SpringConfiguredBeanDefinitionParser().parse(element, parserContext);
      }
   }
```

##### `spring-configured`标签解析

该标签由`org.springframework.context.config.SpringConfiguredBeanDefinitionParser`来解析。

`parse`方法：

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {  if(!parserContext.getRegistry().containsBeanDefinition(BEAN_CONFIGURER_ASPECT_BEAN_NAME)) {
   //如果没注册 org.springframework.context.config.internalBeanConfigurerAspect
      RootBeanDefinition def = new RootBeanDefinition();
      // org.springframework.beans.factory.aspectj.AnnotationBeanConfigurerAspect
      def.setBeanClassName(BEAN_CONFIGURER_ASPECT_CLASS_NAME);
      def.setFactoryMethodName("aspectOf");
      def.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);
      def.setSource(parserContext.extractSource(element));
      parserContext.registerBeanComponent(new BeanComponentDefinition(def, BEAN_CONFIGURER_ASPECT_BEAN_NAME));
   }
   return null;
}
```

### `AopNamespaceHandler` Aop 命名空间解析器

用于`aop`命名空间的`NamespaceHandler`。继承自`NamespaceHandlerSupport`,注册以下`BeanDefinitionParser`:

| 标签                | 解析类                                 |
| ------------------- | -------------------------------------- |
| `config`            | `ConfigBeanDefinitionParser`           |
| `aspectj-autoproxy` | `AspectJAutoProxyBeanDefinitionParser` |

注册`BeanDefinitionDecorator`:

| 属性           | 解析类                               |
| -------------- | ------------------------------------ |
| `scoped-proxy` | `ScopedProxyBeanDefinitionDecorator` |

为`<aop:config>`标签提供一个`BeanDefinitionParser`。`config`标签可以包含嵌套的`pointcut`、`advisor`和`aspect`标签。

`pointcut`标签允许使用简单的语法创建命名的`AspectJExpressionPointcut` bean:

```xml
<aop:pointcut id="getNameCalls" expression="execution(* *..ITestBean.getName(..))"/>
```

使用`advisor`标签，可以配置`org.springframework.aop.Advisor`并自动将其应用于`org.springframework.beans.factory.BeanFactory`中所有相关bean。`advisor`标签支持内联和引用`pointcut`:

```xml
<aop:advisor id="getAgeAdvisor"
             pointcut="execution(* *..ITestBean.getAge(..))"
             advice-ref="getAgeCounter"/>

<aop:advisor id="getNameAdvisor"
             pointcut-ref="getNameCalls"
             advice-ref="getNameCounter"/>
```

#### `<aop:config>`标签解析

`org.springframework.aop.config.ConfigBeanDefinitionParser`类用来解析该标签。实现了`BeanDefinitionParser` 接口

##### `parse`方法：

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
   CompositeComponentDefinition compositeDef =
         new CompositeComponentDefinition(element.getTagName(), parserContext.extractSource(element));
    //标识当前组件是容器组件
   parserContext.pushContainingComponent(compositeDef);

    //注册 AspectJAwareAdvisorAutoProxyCreator
   configureAutoProxyCreator(parserContext, element);

    //解析子标签 pointcut advisor aspect
   List<Element> childElts = DomUtils.getChildElements(element);
   for (Element elt: childElts) {
      String localName = parserContext.getDelegate().getLocalName(elt);
      if (POINTCUT.equals(localName)) {
         parsePointcut(elt, parserContext);
      }
      else if (ADVISOR.equals(localName)) {
         parseAdvisor(elt, parserContext);
      }
      else if (ASPECT.equals(localName)) {
         parseAspect(elt, parserContext);
      }
   }

    //出栈并注册当前容器组件，容器组件会发布事件
   parserContext.popAndRegisterContainingComponent();
   return null;
}
```

##### `parsePointcut `方法解析切入点

```java
private AbstractBeanDefinition parsePointcut(Element pointcutElement, ParserContext parserContext) {
    // id
   String id = pointcutElement.getAttribute(ID);
    // 表达式
   String expression = pointcutElement.getAttribute(EXPRESSION);

   AbstractBeanDefinition pointcutDefinition = null;

   try {
       // 将当前元素入栈
      this.parseState.push(new PointcutEntry(id));
       // 创建切入点对应的bean定义，bean类型为 AspectJExpressionPointcut
      pointcutDefinition = createPointcutDefinition(expression);
      pointcutDefinition.setSource(parserContext.extractSource(pointcutElement));

      String pointcutBeanName = id;
       // 注册当前bean定义
      if (StringUtils.hasText(pointcutBeanName)) {
         parserContext.getRegistry().registerBeanDefinition(pointcutBeanName, pointcutDefinition);
      }
      else {
         pointcutBeanName = parserContext.getReaderContext().registerWithGeneratedName(pointcutDefinition);
      }

       // 将切入点组件加入到 config标签容器组件中，作为其内部组件
      parserContext.registerComponent(
            new PointcutComponentDefinition(pointcutBeanName, pointcutDefinition, expression));
   }
   finally {
       // 解析完当前切入点元素，出栈
      this.parseState.pop();
   }

   return pointcutDefinition;
}
```

##### `parseAdvisor` 解析`advisor`标签

```java
private void parseAdvisor(Element advisorElement, ParserContext parserContext) {
    // 创建对应的bean定义，bean类型为 DefaultBeanFactoryPointcutAdvisor, advice-ref 属性需要引用一个实现了org.aopalliance.aop.Advice 接口的bean
   AbstractBeanDefinition advisorDef = createAdvisorBeanDefinition(advisorElement, parserContext);
   String id = advisorElement.getAttribute(ID);

   try {
      this.parseState.push(new AdvisorEntry(id));
      String advisorBeanName = id;
       //注册当前bean定义
      if (StringUtils.hasText(advisorBeanName)) {
         parserContext.getRegistry().registerBeanDefinition(advisorBeanName, advisorDef);
      }
      else {
         advisorBeanName = parserContext.getReaderContext().registerWithGeneratedName(advisorDef);
      }

       //解析pointcut
      Object pointcut = parsePointcutProperty(advisorElement, parserContext);
       //如果是pointcut bean定义，其实就是expression
      if (pointcut instanceof BeanDefinition) {
         advisorDef.getPropertyValues().add(POINTCUT, pointcut);
         parserContext.registerComponent(
               new AdvisorComponentDefinition(advisorBeanName, advisorDef, (BeanDefinition) pointcut));
      }
      else if (pointcut instanceof String) {
         advisorDef.getPropertyValues().add(POINTCUT, new RuntimeBeanReference((String) pointcut));
         parserContext.registerComponent(
               new AdvisorComponentDefinition(advisorBeanName, advisorDef));
      }
   }
   finally {
      this.parseState.pop();
   }
}
```

##### `parseAspect` 解析切面

```java
private void parseAspect(Element aspectElement, ParserContext parserContext) {
   String aspectId = aspectElement.getAttribute(ID);
    //切面bean
   String aspectName = aspectElement.getAttribute(REF);

   try {
      this.parseState.push(new AspectEntry(aspectId, aspectName));
      List<BeanDefinition> beanDefinitions = new ArrayList<>();
      List<BeanReference> beanReferences = new ArrayList<>();

       //解析declare-parents 子标签， 对应的bean为 DeclareParentsAdvisor
      List<Element> declareParents = DomUtils.getChildElementsByTagName(aspectElement, DECLARE_PARENTS);
      for (int i = METHOD_INDEX; i < declareParents.size(); i++) {
         Element declareParentsElement = declareParents.get(i);
         beanDefinitions.add(parseDeclareParents(declareParentsElement, parserContext));
      }

      // We have to parse "advice" and all the advice kinds in one loop, to get the
      // ordering semantics right.
       // 必须得在一个循环中解析出所有的advice，保证其顺序
      NodeList nodeList = aspectElement.getChildNodes();
      boolean adviceFoundAlready = false;
      for (int i = 0; i < nodeList.getLength(); i++) {
         Node node = nodeList.item(i);
         if (isAdviceNode(node, parserContext)) {
             // 通知类型 before，after，after-returning，after-throwing，around
            if (!adviceFoundAlready) {
               adviceFoundAlready = true;
               if (!StringUtils.hasText(aspectName)) {
                  parserContext.getReaderContext().error(
                        "<aspect> tag needs aspect bean reference via 'ref' attribute when declaring advices.",
                        aspectElement, this.parseState.snapshot());
                  return;
               }
               beanReferences.add(new RuntimeBeanReference(aspectName));
            }
             // 为每个 advice创建 AspectJPointcutAdvisor
            AbstractBeanDefinition advisorDefinition = parseAdvice(
                  aspectName, i, aspectElement, (Element) node, parserContext, beanDefinitions, beanReferences);
            beanDefinitions.add(advisorDefinition);
         }
      }

      AspectComponentDefinition aspectComponentDefinition = createAspectComponentDefinition(
            aspectElement, aspectId, beanDefinitions, beanReferences, parserContext);
      parserContext.pushContainingComponent(aspectComponentDefinition);

      List<Element> pointcuts = DomUtils.getChildElementsByTagName(aspectElement, POINTCUT);
       //解析切入点，跟单独定义在外面的切入点一样解析
      for (Element pointcutElement : pointcuts) {
         parsePointcut(pointcutElement, parserContext);
      }

      parserContext.popAndRegisterContainingComponent();
   }
   finally {
      this.parseState.pop();
   }
}
```

##### 小结

注册的`BeanDefinition`如下：

| 标签                                                   | BeanDefinition                        |
| ------------------------------------------------------ | ------------------------------------- |
| config                                                 | `AspectJAwareAdvisorAutoProxyCreator` |
| pointcut                                               | AspectJExpressionPointcut             |
| advisor                                                | DefaultBeanFactoryPointcutAdvisor     |
| before，after，after-returning，after-throwing，around | AspectJPointcutAdvisor                |
| declare-parents                                        | DeclareParentsAdvisor                 |

#### `<aop:aspectj-autoproxy>`标签解析

`AspectJAutoProxyBeanDefinitionParser`类用来解析该标签，实现了`BeanDefinitionParser`接口。

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
//注册或增强 AnnotationAwareAspectJAutoProxyCreator类
   // 解析 proxy-target-class和 expose-proxy
    AopNamespaceUtils.registerAspectJAnnotationAutoProxyCreatorIfNecessary(parserContext, element);
   extendBeanDefinition(element, parserContext);
   return null;
}

private void extendBeanDefinition(Element element, ParserContext parserContext) {
   BeanDefinition beanDef =
         parserContext.getRegistry().getBeanDefinition(AopConfigUtils.AUTO_PROXY_CREATOR_BEAN_NAME);
   if (element.hasChildNodes()) {
       //解析 include 标签
      addIncludePatterns(element, parserContext, beanDef);
   }
}

private void addIncludePatterns(Element element, ParserContext parserContext, BeanDefinition beanDef) {
   ManagedList<TypedStringValue> includePatterns = new ManagedList<>();
   NodeList childNodes = element.getChildNodes();
   for (int i = 0; i < childNodes.getLength(); i++) {
      Node node = childNodes.item(i);
      if (node instanceof Element) {
         Element includeElement = (Element) node;
         TypedStringValue valueHolder = new TypedStringValue(includeElement.getAttribute("name"));
         valueHolder.setSource(parserContext.extractSource(includeElement));
         includePatterns.add(valueHolder);
      }
   }
   if (!includePatterns.isEmpty()) {
      includePatterns.setSource(parserContext.extractSource(element));
      beanDef.getPropertyValues().add("includePatterns", includePatterns);
   }
}
```

###### 小结

注册的`BeanDefinition`如下：

| 标签              | BeanDefinition                         |
| ----------------- | -------------------------------------- |
| aspectj-autoproxy | AnnotationAwareAspectJAutoProxyCreator |

### `MvcNamespaceHandler`解析MVC命名空间

该类`init`方法中注册了下面的解析器：

| annotation-driven          | AnnotationDrivenBeanDefinitionParser         |
| -------------------------- | -------------------------------------------- |
| default-servlet-handler    | DefaultServletHandlerBeanDefinitionParser    |
| interceptors               | InterceptorsBeanDefinitionParser             |
| resources                  | ResourcesBeanDefinitionParser                |
| view-controller            | ViewControllerBeanDefinitionParser           |
| redirect-view-controller   | ViewControllerBeanDefinitionParser           |
| status-controller          | ViewControllerBeanDefinitionParser           |
| view-resolvers             | ViewResolversBeanDefinitionParser            |
| tiles-configurer           | TilesConfigurerBeanDefinitionParser          |
| freemarker-configurer      | FreeMarkerConfigurerBeanDefinitionParser     |
| groovy-configurer          | GroovyMarkupConfigurerBeanDefinitionParser   |
| script-template-configurer | ScriptTemplateConfigurerBeanDefinitionParser |
| cors                       | CorsBeanDefinitionParser                     |

后面再专门写一篇讲MVC的。

## 自定义命名空间示例

自定义命名空间可以分为步：

1. 定义`NamespaceHandler`
2. 定义命名空间地址，创建`META-INF/spring.handlers`文件，注册`NamespaceHandler`
3. 如果`NamespaceHandler`继承自`NamespaceHandlerSupport`，则定义`BeanDefinitionParser`。用来解析具体的标签

### 自定义`NamespaceHandler`

为了方便，通常是继承`NamespaceHandlerSupport`。在`init`方法中注册标签解析器。

```java
public class MyNamespaceHandler extends NamespaceHandlerSupport {
    @Override
    public void init() {
        registerBeanDefinitionParser("start-up",new MyNamespaceStartUpBeanDefinitionParser());
    }
}
```

### 注册`NamespaceHandler`

在`META-INF`目录下创建`spring.handlers`文件，文件内容为：

```plain
http\://www.springframework.org/schema/my =cn.sexycode.spring.study.chapter3.MyNamespaceHandler
```

Spring 在会读到自定义命名空间时，从这个文件中解析对应的handler。`=` 前面为命名空间地址

### 实现`BeanDefinitionParser`

由于handler继承自`NamespaceHandlerSupport`，那么我们可以实现这个接口用来解析标签。Spring 为我们提供了一个抽象类，用来只返回一个bean 定义的时候使用。

```java
public class MyNamespaceStartUpBeanDefinitionParser extends AbstractSingleBeanDefinitionParser {

    @Override
    protected Class<?> getBeanClass(Element element) {
        // 这里我们注册的bean为 MyBeanPostProcessor, 换成我们实际想要注册的类，这里仅供演示
        return MyBeanPostProcessor.class;
    }

    @Override
    protected boolean shouldGenerateId() {
        //为我们生成id
        return true;
    }
}
```

### 使用示例

上述几步之后，我们就可以在例子中使用了。xml文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:my="http://www.springframework.org/schema/my"

       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <my:start-up/>
</beans>
```

因为我们没有定义dtd，导致无法通过校验。我们使用时可以设置为不校验。

```java
public class MyNamespaceHandlerDemo {
    public static void main(String[] args) {

    // 1. 初始化一个bean 工厂
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        // 2. 初始化XmlBeanDefinitionReader,负责从xml文件中读取bean定义
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory);
        //不校验dtd
        reader.setValidating(false);
        // 3. 加载bean 定义的入口方法
        reader.loadBeanDefinitions("MyNamespaceHandlerDemo.xml");
        System.out.println(factory.getBean(MyBeanPostProcessor.class));
    }
}
```

> cn.sexycode.spring.study.chapter3.MyBeanPostProcessor@78b1cc93

可以看到已经正确注册到容器中。