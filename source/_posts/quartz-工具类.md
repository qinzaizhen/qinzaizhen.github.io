---
title: quartz 工具类
tags:
  - quartz
abbrlink: '482'
date: 2017-04-25 09:39:47
---

利用quartz实现动态创建任务，主要涉及的类有`Job`,`JobDetail`,`CronScheduleBuilder`,`CronTrigger`,`Scheduler`.
- Job:接口，对应到具体要做的事情。通常是业务代码实现。
- JobDetail:接口，封装了`Job`相关的信息，比如key,description,jobDataMap等。`JobDataMap`用来传递数据到job中。
- CronScheduleBuilder:表达式任务的builder。
- CronTrigger:支持表达式的trigger。


##### ScheduleJob
为了动态添加，我们自己也封装了一下job相关的信息，包括名称，分组，表达式以及要执行的java方法。
```java

    // 任务id 
    private String jobId;
    // 任务名称 
    private String jobName;
    //任务分组 
    private String jobGroup;
    // 任务状态 0禁用 1启用 2删除
    private String jobStatus;
    // 任务运行时间表达式 
    private String cronExpression;
    // 任务描述 
    private String description;
```

数据来源可以是配置在数据库中，通过查询来构造`ScheduleJob`信息；测试的时候可以直接new一个`ScheduleJob`对象。

##### QuartzStatefulJobFactory
实现一个Job,去调用我们自己的业务类。这种方式可以使用我们的job无需实现任务quartz的接口，从而实现解耦。
```java
@DisallowConcurrentExecution//避免并发执行同一个job
public class QuartzStatefulJobFactory implements Job{
    public static final String JOB_NAME_SEPARATOR = ".";
    private static Logger logger = LoggerFactory.getLogger(QuartzStatefulJobFactory.class);
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        logger.debug("任务开始运行");
        ScheduleJob scheduleJob = (ScheduleJob)context.getMergedJobDataMap().get("scheduleJob");//在这里将我们封装的job取出来。
        logger.debug("任务名称 = [" + scheduleJob.getJobName() + "]");
        String classPath = scheduleJob.getClassPath();
        if (StringUtils.isBlank(classPath)){
            logger.warn("任务类为空，忽略");
            return;
        }
        String className = classPath;
        String methodName = "execute";
        if (StringUtils.endsWith(classPath,"()")){//括号结尾的方法调用。比如 xxx.Object.test()
            int lastNameIndex = StringUtils.lastIndexOf(classPath,JOB_NAME_SEPARATOR);
            className = StringUtils.substring(classPath,0,lastNameIndex);
            methodName = StringUtils.substring(classPath,lastNameIndex + 1, StringUtils.indexOf(classPath, "()"));
        }
        try {
            Class jobClass =  ClassUtils.forName(className,ClassUtils.getDefaultClassLoader());
           /* ProxyFactoryBean proxy = new ProxyFactoryBean();
            proxy.setTargetClass(jobClass);
            Object target = proxy.getObject();*/
           Object target = jobClass.newInstance();
            Method method = ReflectionUtils.findMethod(jobClass,methodName);
            ReflectionUtils.invokeMethod(method,target);//调用业务方法
        } catch (Exception e) {
            logger.error("未找到所描述的类",e);
            throw new JobExecutionException(e);
        }
    }
}
```

##### QuartzManager
提供一个静态方法来添加job
```java
public class QuartzManager {

    /**
     * 添加一个定时任务
     *
     * @param sched  调度器
     *
     * @param job 任务
     */
    public static void addJob(Scheduler sched, ScheduleJob job, JobListener listener) {
        try {
            JobDetail jobDetail = JobBuilder.newJob( QuartzStatefulJobFactory.class)
                    .withIdentity(job.getJobName(),job.getJobGroup()).withDescription(job.getDescription()).build();// 任务名，任务组，任务执行类
            jobDetail.getJobDataMap().put("scheduleJob", job);
            //表达式调度构建器
            CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(job.getCronExpression());
            CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(job.getJobName(), job.getJobGroup()).withSchedule(scheduleBuilder).build();

            sched.getListenerManager().addJobListener(listener);//添加任务监听器
            sched.scheduleJob(jobDetail,trigger);
        } catch (Exception e) {
            throw new JobScheduleException(e);
        }
    }
}
```

`Quartz` 也提供了一些诸如一天的某点、重复这样简单的表达式，如`CronScheduleBuilder` 的dailyAtHourAndMinute方法，`DailyTimeIntervalScheduleBuilder`,`SimpleScheduleBuilder`。

