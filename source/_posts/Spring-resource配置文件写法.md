---
title: Spring resource配置文件写法
date: 2018-06-15 18:34:38
tags:[Spring, Resource]
---
为了管理方便，通常将Spring 的配置文件拆成多个，但也带来了复杂性的问题，不晓得它是如何加载的。


解析xml `import`元素主要是`org.springframework.beans.factory.xml.DefaultBeanDefinitionDocumentReader#importBeanDefinitionResource()`方法为入口，看一下这个方法的代码：
```java
String location = ele.getAttribute(RESOURCE_ATTRIBUTE);
		
		try {
		
		    //判断是不是绝对路径
		    //CLASSPATH_ALL_URL_PREFIX  -->   classpath*:
		    //(resourceLocation != null &&
				(resourceLocation.startsWith(ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX) ||
						ResourceUtils.isUrl(resourceLocation)));
			absoluteLocation = ResourcePatternUtils.isUrl(location) || ResourceUtils.toURI(location).isAbsolute();
		}
	

		// Absolute or relative?
		if (absoluteLocation) {
			int importCount = getReaderContext().getReader().loadBeanDefinitions(location, actualResources);
	
		}
		else {
			// No URL -> considering resource location as relative to the current file.
			
				Resource relativeResource = getReaderContext().getResource().createRelative(location);
				if (relativeResource.exists()) {
					importCount = getReaderContext().getReader().loadBeanDefinitions(relativeResource);
					actualResources.add(relativeResource);
				}
				else {
					String baseLocation = getReaderContext().getResource().getURL().toString();
					importCount = getReaderContext().getReader().loadBeanDefinitions(
							StringUtils.applyRelativePath(baseLocation, location), actualResources);
				}
				
		}
		
```
在配置文件中引入其他文件，为了方便，本文件名为`application.xml`，通常有以下几种写法：
1. 直接写文件名
```xml
<import resource="beans.xml"/>
```

这种情况下表示的是相对路径，`getReaderContext().getResource()`代表的是当前配置文件`application.xml`，它是通过`classpath`加载的，`Resource.createRelative(location)`创建的资源类也是`classpath`的，里面封装了`classloader`，可以从Jar包里面加载对应的配置文件。这种解析方式也适用于`beans.xml`还引入了`<import resource="imports.xml"/>`的情形，创建的相对资源都是通过`classloader`去加载的。

2. classpath:beans.xml
        这种方式代表绝对路径，最终由`org.springframework.core.io.support.PathMatchingResourcePatternResolver#getResources`方法处理

    ```java
    @Override
	public Resource[] getResources(String locationPattern) throws IOException {
		Assert.notNull(locationPattern, "Location pattern must not be null");
		//如果是classpath*:形式的
		if (locationPattern.startsWith(CLASSPATH_ALL_URL_PREFIX)) {
		    //classpath*
			// a class path resource (multiple resources for same name possible)
			if (getPathMatcher().isPattern(locationPattern.substring(CLASSPATH_ALL_URL_PREFIX.length()))) {
				// a class path resource pattern
				return findPathMatchingResources(locationPattern);
			}
			else {
				// all class path resources with the given name
				return findAllClassPathResources(locationPattern.substring(CLASSPATH_ALL_URL_PREFIX.length()));
			}
		}
		else {
			// Generally only look for a pattern after a prefix here,
			// and on Tomcat only after the "*/" separator for its "war:" protocol.
			int prefixEnd = (locationPattern.startsWith("war:") ? locationPattern.indexOf("*/") + 1 :
					locationPattern.indexOf(":") + 1);
			if (getPathMatcher().isPattern(locationPattern.substring(prefixEnd))) {
			    //匹配模式
				// a file pattern
				return findPathMatchingResources(locationPattern);
			}
			else {
				// a single resource with the given name
				//加载指定名称的文件
				return new Resource[] {getResourceLoader().getResource(locationPattern)};
			}
		}
	}
	```
	
	因为文件名中不含表达式，则通过`org.springframework.core.io.DefaultResourceLoader#getResource`方法在`classpath`中加载指定的文件
	```
	@Override
	public Resource getResource(String location) {
		Assert.notNull(location, "Location must not be null");

		for (ProtocolResolver protocolResolver : this.protocolResolvers) {
			Resource resource = protocolResolver.resolve(location, this);
			if (resource != null) {
				return resource;
			}
		}

		if (location.startsWith("/")) {
			return getResourceByPath(location);
		}
		else if (location.startsWith(CLASSPATH_URL_PREFIX)) {
		//classpath:开头， 通过classpath加载
			return new ClassPathResource(location.substring(CLASSPATH_URL_PREFIX.length()), getClassLoader());
		}
		else {
			try {
				// Try to parse the location as a URL...
				URL url = new URL(location);
				return new UrlResource(url);
			}
			catch (MalformedURLException ex) {
				// No URL -> resolve as resource path.
				return getResourceByPath(location);
			}
		}
	}
	```
3. bean*.xml
    此方式也是相对路径的形式，只会在引入此配置文件(即`application.xml`)的目录中去查找符合此表达式的文件。

4. classpath:bean*.xml
    与第二种方式类似，会走模式查找方法`findPathMatchingResources(locationPattern)`。
    ```java
    protected Resource[] findPathMatchingResources(String locationPattern) throws IOException {
        //locationPattern  =  classpath:bean*.xml
        //rootDirPath = classpath:
		String rootDirPath = determineRootDir(locationPattern);
		//subPattern = bean*.xml
		String subPattern = locationPattern.substring(rootDirPath.length());
		//找到父目录对应的资源路径，此时classpath对应的目录，只有这一个
		Resource[] rootDirResources = getResources(rootDirPath);
		Set<Resource> result = new LinkedHashSet<Resource>(16);
		for (Resource rootDirResource : rootDirResources) {
			rootDirResource = resolveRootDirResource(rootDirResource);
			//rootDirURL = "/home/qzz/qinzaizhen/springstudy/min/target/classes/"
			URL rootDirURL = rootDirResource.getURL();
			if (equinoxResolveMethod != null) {
				if (rootDirURL.getProtocol().startsWith("bundle")) {
					rootDirURL = (URL) ReflectionUtils.invokeMethod(equinoxResolveMethod, null, rootDirURL);
					rootDirResource = new UrlResource(rootDirURL);
				}
			}
			if (rootDirURL.getProtocol().startsWith(ResourceUtils.URL_PROTOCOL_VFS)) {
				result.addAll(VfsResourceMatchingDelegate.findMatchingResources(rootDirURL, subPattern, getPathMatcher()));
			}
			else if (ResourceUtils.isJarURL(rootDirURL) || isJarResource(rootDirResource)) {
				result.addAll(doFindPathMatchingJarResources(rootDirResource, rootDirURL, subPattern));
			}
			else {
				result.addAll(doFindPathMatchingFileResources(rootDirResource, subPattern));
			}
		}
		if (logger.isDebugEnabled()) {
			logger.debug("Resolved location pattern [" + locationPattern + "] to resources " + result);
		}
		return result.toArray(new Resource[result.size()]);
	}
	```
	只有classpath对应的目录，只会在这个目录中去查找`bean*.xml`对应的文件。
	
5. classpath*:beans.xml
跟方式4的区别在于`findPathMatchingResources`方法中`Resource[] rootDirResources = getResources(rootDirPath);`会查找到当前所有资源classpath目录以及jar包等。

总结：

方式|是否加载其他jar包等|是否模式匹配|是否相对路径
---|---|---
直接写文件名`beans.xml`|是|否|相对路径
`classpath:beans.xml`|是|否|绝对路径
`bean*.xml`|否|是|相对路径
`classpath:bean*.xml`|否|是|相对路径
`classpath*:bean×.xml`|是|是|相对路径
