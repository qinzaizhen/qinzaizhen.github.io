---
title: 在controller 参数中使用枚举
date: 2018-11-11 16:47:49
tags:
---

我们通常将一些固定的值定义为枚举类型, 这样就可以限制别人在接口中不能随便传参数,只能是其中的几个.

但是作为框架的设计者, 这样定义之后,框架的使用者想要扩展的话非学不方便, 因为枚举类型默认就继承`Enum` 类型,无法再继承其他的类. 因此我们考虑将枚举类实现一个接口,同时,使用时也是用这个接口来定义变量类型.


定义枚举接口:

```java
public interface IEnum<T> extends Serializable {
    
    /**
     * @return 
     */
    default Object getValue() {
        return name();
    }

    /**
     * @return 默认就是枚举值的name
     */
    String name();
}
```

再定义一个子接口来表示某一类枚举值:

```java

public interface FormFiledType extends IEnum {
    enum Type implements FormFiledType {

        VARCHAR, DATE, NUMBER, INT;

        @Override
        public String getValue() {
            return name().toLowerCase();
        }
    }
}
```

`FormFiledType`是一个接口类型, `Type`枚举实现这个接口, 在类中使用接口.

```java
private FormFiledType type;
```

但这样存在问题:

1. controller接收时,传的json数据如何转换成正确的枚举值
2. mybatis 如何解析这个枚举值.

由于传的是枚举的值, 需要将这个值转换成对应的枚举类型,那么我们需要:

1. 目标变量的接口类型
2. 根据这个类型获取到所有实现这个接口的枚举类
3. 遍历所有的枚举类,看看是否跟这个值匹配

Spring MVC 默认使用Jackson来将json数据转换成java对象. 