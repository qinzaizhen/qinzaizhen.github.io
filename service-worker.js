/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2017/04/18/使用httpclient-4-3发送post请求/index.html","770c9153091db11e32677433f2978b49"],["/2017/04/18/备份hexo代码/index.html","488bfe663d58e8187f1efcc973eff9d7"],["/2017/04/19/dependencies与dependencyManagement的区别/index.html","855293bcd01beadc7ffbf0390a7db432"],["/2017/04/22/Idea-创建-Spring-boot应用/index.html","d90956758508a8b0040794ef919910e7"],["/2017/04/25/quartz-工具类/index.html","4cce4bd362468d8f4227d7e58c03437e"],["/2017/04/26/maven跳过单元测试-maven-test-skip和skipTests的区别/index.html","1358df33058747696b42b9c724acd37f"],["/2017/04/26/quartz表达式/index.html","0627e3ac6c7e3d1d1071d71815fd2539"],["/2017/05/09/5-9日梦/index.html","c7359759c3df31cb793a860de7f88314"],["/2017/05/11/致阿姨的一段话/index.html","3090501d2a9a66072284a6cfe4cf2e7a"],["/2017/06/01/opencsv读取csv文件/index.html","e260fce5a91934ffaab4033cb413a198"],["/2017/06/05/5-26梦/index.html","b44ff301d040c7c4a1729e0c101faf6e"],["/2017/06/05/修改mysql的默认编码/index.html","cb85716f9e185e8673ebef2ef0cb7273"],["/2017/06/05/错误记录/index.html","e931b8c110f5fba6f5f80e79f6d4b836"],["/2017/06/07/6-6梦/index.html","eeb23548d72654be2808f5803c7c8543"],["/2017/06/07/6-7梦/index.html","1315a632ad51892828e36d80ec34cee7"],["/2017/06/07/6-7梦2/index.html","8e0453c80e3ef20bf6c2a26090f0c7a7"],["/2017/06/07/错误记录20170607/index.html","ca5012f4fca09824abd1834fc0cde193"],["/2017/06/09/6-8梦/index.html","51fc1fba389cf48f80ae4f765afe0db1"],["/2017/06/12/6-9梦/index.html","e358ed07f5b620f2992e723dce8d7c58"],["/2017/06/14/vm无法将网络更改为桥接状态：没有未桥接的主机网络适配器/index.html","4d2760799d0ce0600a1cd99b475bfe3e"],["/2017/06/14/vm添加新的硬盘/index.html","4be01359fd6e3a4becca6e5c6a74e878"],["/2017/06/16/6-16面试总结/index.html","172886ee9cc415a1034cf30c109ab380"],["/2017/06/22/6-20梦/index.html","6340ae1343e9efa16e9ab8b0cf70a37e"],["/2017/06/23/6-23面试总结/index.html","c3662faabbcb20a32968e8e934a71b0f"],["/2017/07/14/吃前吃后/index.html","c8f4fd55609317042e25db55205e7dff"],["/2017/07/17/Sublime Text3 + Markdown + 实时预览/index.html","e688759e20b656b7da2a750169fa3277"],["/2017/07/17/angularjs改变样式/index.html","514b9e7532e14b7af2c5a06c9b5b11d4"],["/2017/07/18/Intellij-激活网站/index.html","8dbf855441967e90b81281c5f7339d1f"],["/2017/07/25/windows-编绎spring-framework源代码遇到的问题/index.html","7407016cd5ce288dbe66b54f9be70722"],["/2017/07/26/The-valid-characters-are-defined-in-RFC-7230-and-RFC-3986/index.html","7fdfa93a69230f095a0820690432a114"],["/2017/07/26/dubbo学习3-启动时检查/index.html","c8700d9ef8e70bad62a1c47be8c669f4"],["/2017/07/27/dubbo学习4-集群容灾与负载均衡配置/index.html","6ea342c42a3d519c427f3f1a28c71d98"],["/2017/08/03/dubbo学习1-配置/index.html","b2d371bb5d8cfee550beb12fc8a9dc0b"],["/2017/08/04/dubbo学习5-restfull接口/index.html","7f30004e5cd1c380a106f72298baf74e"],["/2017/08/04/dubbo学习6-直连提供者/index.html","328a91bffc375d7d14eb4a7107534de6"],["/2017/08/05/dubbo学习7-只订阅服务不注册/index.html","c63adb3f88ea7b2f59732c158a8a1db8"],["/2017/08/15/Spring-Boot-四-Spring-Boot-特性/index.html","5caa090907ce551b83cebde1de35ca15"],["/2017/09/13/Spring-Boot-五-Spring-Boot执行器-生产就绪特性/index.html","471e09ba6124356309b285c8ee8c0bbe"],["/2017/10/09/Spring-Boot-六-部署Spring-Boot应用/index.html","cb0ab12f4270c6b78f600f7ffe041d06"],["/2017/10/13/Spring-Boot-七-Spring-Boot-CLI/index.html","ab3df9e4d59a5e6675575fdce99b41da"],["/2017/10/16/Spring-Boot-八-构建工具插件/index.html","5dc74e639e0e6050b75fdfd06ff4047a"],["/2017/10/16/编绎Spring-Boot源码/index.html","fddcc40a6d6bd35e40065f22ec85d54b"],["/2017/10/18/Spring-Boot-九-“How-to”-指南/index.html","9279c70b1471ff93d7130caa8b93e2cf"],["/2017/11/09/Spring-Boot-十-附录/index.html","fdc580c99cd9ec62191ce1a80dc426d3"],["/2017/11/18/Spring-Boot-学习1-创建Spring-Boot应用/index.html","afc8571f841975eb7b405ada26546c6d"],["/2017/11/22/Spring-Boot-学习2-项目结构/index.html","55e3f505a2b4c8eafa70dc27e970a3d2"],["/2017/11/23/Spring-Boot-学习3-自动配置/index.html","2a89e17f714fac7761dbd396882fba15"],["/2017/12/12/mac环境feign访问服务出现超时/index.html","7d0f4845420961ea51c036c1b1543fb1"],["/2017/12/18/控制台乱码/index.html","39ad8cd7802878c1912770c751a7e34a"],["/2017/12/21/学习方法/index.html","27b761b4fa3b6a600f16413a3590590b"],["/2018/03/28/Java-IO-之BIO-NIO-AIO/index.html","361493b364370890888d264a841f1350"],["/2018/04/03/四月三日语录/index.html","374811910c1af32b4419622a4d959357"],["/2018/04/11/IntelliJ-IDEA中创建测试用例/index.html","75a62925f1649144cf7d4e23c9d7e13d"],["/2018/04/25/jQuery-prop与attr的区别/index.html","0c857464d77e69ff03913215e27b832d"],["/2018/05/22/错误记录20180521/index.html","d951ead313648156423d715e75dad175"],["/2018/05/23/maven依赖总结/index.html","77fe3ddbc90ab496b317422d20d4f5f3"],["/2018/06/13/阻塞、非阻塞、同步、异步/index.html","c4ef6a301198536c06227c7f8525276b"],["/2018/06/15/Spring-resource配置文件写法/index.html","126ea0f562828bcff002421048a5018d"],["/2018/08/20/Java8-多默认方法解决冲突机制/index.html","ad66f625ded7886cb5f9f40644c50698"],["/2018/08/20/并行——使用流还是-CompletableFutures/index.html","a459718900abaf27799427612d83fb79"],["/2018/08/28/mysql-You-must-reset-your-password-using-ALTER-USER-statement-before-executing-this-statement/index.html","051adc8771bb04db8b6e8242de11cc06"],["/2018/09/10/activiti-表/index.html","7ce82f4b3c07a9f59d5d4dc967ce2830"],["/2018/10/27/Spring-MVC异常处理方式总结/index.html","a1da7febec66f760e996c206693f9fd4"],["/2018/11/11/在controller中使用枚举/index.html","215a9746438a1967dc576514d89d360c"],["/2018/12/28/org-springframework-boot-actuate-endpoint-EndpointId-cannot-be-cast-to-java-lang-String-异常处理/index.html","0121601be58b49f8c698503a52dd9db2"],["/2019/01/07/创建my-jpa初衷/index.html","726426c8d241baccb42dc159240885a7"],["/2019/01/15/年会/index.html","30b74c000390bc1ba187804077899235"],["/2019/03/18/Spring-常用接口/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/2019/03/18/Spring-常用接口/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/2019/03/18/Spring-常用接口/index.html","3d4108bdc27d29351d87cbd81d0af049"],["/2019/05/13/Spring-ApplicationContext初始化过程/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/2019/05/13/Spring-ApplicationContext初始化过程/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/2019/05/13/Spring-ApplicationContext初始化过程/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/2019/05/13/Spring-ApplicationContext初始化过程/index.html","cf7b93815a80d963e09ecb32cafb83cd"],["/2019/05/13/Spring-bean定义文件解析/index.html","9476a47c7374499ead941c7418d15fbb"],["/2019/05/13/Spring-bean定义文件解析/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/2019/05/13/Spring-bean定义文件解析/resource结构.png","f293dd86c2dff80218f0580501640972"],["/2019/05/13/Spring自定义命名空间解析/index.html","992d5b1d155db28132c607f7c042d158"],["/2019/06/03/错误-未报告的异常错误X-必须对其进行捕获或声明以便抛出/index.html","58120165e4786f9deadf733a68dea430"],["/2019/08/21/Bean初始化/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/2019/08/21/Bean初始化/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/2019/08/21/Bean初始化/index.html","34f191f844b4e5762e53cbc0b9d069f0"],["/2019/09/05/BeanWrapper/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/2019/09/05/BeanWrapper/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/2019/09/05/BeanWrapper/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/2019/09/05/BeanWrapper/index.html","b5c045d124af4e4e7e94c92e60c4e7f2"],["/2019/09/05/BeanWrapper/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/2019/09/26/ObjectFactory与BeanFactory的区别/index.html","f4f4bf9df963a52a19908375cd52aa6b"],["/2019/11/27/自定义Scope/index.html","56cb601f369be0c2e8bd5c7c40d95deb"],["/404.html","26f475daa9ee14942a3711f6fd34d39d"],["/about/index.html","06b4a6eb956fbf064bec2848f70f539d"],["/contact/index.html","863a1eb9c975e89ec99d5dbe95ec8f08"],["/css/index.css","e0c6c0a92ee872ce3514997dde81f7b9"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/index.html","85daab8807935be10c968a5564d2a9d1"],["/js/main.js","4898030387012f8af71563ef8353433a"],["/js/search/algolia.js","c9af02da2fc1f7d634843f61536369d1"],["/js/search/local-search.js","c33665b06edc70004a016ba9db4205b4"],["/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["/js/third-party/canvas-nest.js","6bebed368a1bbcb630dd146cefb103b7"],["/js/third-party/canvas-ribbon.js","4ca518354a167db9fe0869c0982ff215"],["/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["/js/third-party/fireworks.js","64d1e1837ad1a585888f5d1e16c71f77"],["/js/third-party/piao.js","5c8c9ff4bb9bed49e333387a54eae9be"],["/js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["/js/utils.js","f91ea1a86a5c45e344a24fb437642f36"],["/login/index.html","550ed79295e83816716474580da852b5"],["/page/2/index.html","57c4c0a2991630d8a3ed0ff60e056f29"],["/page/3/index.html","73a48fca95c8f789f6c380de7a33e973"],["/page/4/index.html","b97a735fa798b200c0ca9f4f7e9e8823"],["/page/5/index.html","4c0ef75cb151976b20b2b7ce2c45ebda"],["/page/6/index.html","f5c54593b70946fb659850430518220b"],["/page/7/index.html","a84b28823c96042392db31f58f04e0a1"],["/page/8/index.html","2f7842d45b2be83db27958eafdfcb547"],["/projects/index.html","9edc96e39acff8be28cb16108671b73f"],["/tags/AIO/index.html","61a8068bcdfb2ed16ea80b6c879766d4"],["/tags/ApplicationContext/index.html","7ad7dc85cd3662b2915e3bc75523e306"],["/tags/BIO/index.html","6c08db0decc7539bfda510de82e7ad7b"],["/tags/Bean/index.html","f4383e957e75c18e12c2bb45efbaaddb"],["/tags/BeanFactory/index.html","a9d8e888dfa1ed9f737590b565f96718"],["/tags/BeanWrapper/index.html","b8f7cc7cbfb4609ee3265632c5ec7c9e"],["/tags/CLI/index.html","64596eceb263811987ae7ebd32030e00"],["/tags/CompletableFuture/index.html","37c58f78dcc489f18d2a1546012353fe"],["/tags/ConversionService/index.html","846d70aac6efec5d8bea8a3295049852"],["/tags/Converter/index.html","75d1088b55369659bdb5c13f5448d73c"],["/tags/EndpointId/index.html","da50c4ee58b2e45be3d1e48dd8c62572"],["/tags/FactoryBean/index.html","8d5bd8ee5531483108c8610e7f71c0d1"],["/tags/Formatter/index.html","5cfc789b096284e34f05fe7c9fa29aec"],["/tags/How-to/index.html","2404fdb5a5c5c74faa00e7c9557025a3"],["/tags/IO/index.html","faa043928a4fa909ba43aeed708dd07a"],["/tags/Idea/index.html","3fb1ae531ccf8ebc8c70740e4b277f3b"],["/tags/JUnit/index.html","6f3a831ee1e531199e18e61420a7a4f2"],["/tags/Java8/index.html","b26e4e84ebf3c7b339455570a602129a"],["/tags/MvcEndpointUtil/index.html","f3d6bdb1f00f6bd5848a252d2d5f4287"],["/tags/NIO/index.html","5d6e6e0c4122e9f588e41480e6a910cb"],["/tags/NamespaceHandler/index.html","fdf4147998b6b2bcbbc5ea76bf1b1154"],["/tags/ObjectFactory/index.html","4ff0419c69e68df7f1493beb841d2728"],["/tags/ObjectProvider/index.html","2ed3b1ef2e076d4db75c16bb748ff169"],["/tags/Resource/index.html","b172abfb374ac5103009b3f325961ea4"],["/tags/Scope/index.html","6a96f46d041d3256fd5e733984bb70b8"],["/tags/Spring-Boot-CLI/index.html","ab5b173981357ea14aa3c927ebd18171"],["/tags/Spring-Boot/index.html","603409506bd3fa25138f1f2a474c3645"],["/tags/Spring-Boot/page/2/index.html","263fc44d2ee57fa03cb7d691f5b02802"],["/tags/Spring/index.html","d11540d4ee94eeedea553ba76bee930a"],["/tags/Stream/index.html","ebdce1f2ab6d30b993cadbe9df7f6159"],["/tags/activiti/index.html","defb56ce72008199b86eb4d556bb03c0"],["/tags/alter-user/index.html","bcbfc53327c550cc0cca07448836a7d8"],["/tags/angularjs/index.html","1b30a89899ace3ab1b81a359089095d1"],["/tags/attr/index.html","58c014838495db04e310a14e3b385d98"],["/tags/build-tool-plugin/index.html","61b8feb2ca034a3f2b7f5e76e45916ae"],["/tags/check/index.html","16e8938b253f13f89c338d5b759503b8"],["/tags/class/index.html","a4398efcbf7a2c9b92325a75ad83f605"],["/tags/cron/index.html","6b54c911c4fa75ca2ab13b6db9d223ec"],["/tags/csv/index.html","ed27044f14ee408544617e1289d8655a"],["/tags/dubbo/index.html","ff56717c1e5aa0e0927b482e819765a0"],["/tags/encodeURI/index.html","6e42af07092cacdb387bb504458e5d65"],["/tags/encodeURIComponent/index.html","519368ea6f929968e92d27797fbeff90"],["/tags/feign/index.html","f13c3bc981dd513a5b29c94d0c360aa1"],["/tags/hexo/index.html","dbf028323f355a24e4cd0536ae41f1aa"],["/tags/httpclient4/index.html","6049d76710b27de9aa1a0663953c545f"],["/tags/java/index.html","3d4a43e7cc7ddeffbdbc789939dad7a7"],["/tags/jpa/index.html","009f3783e3a420ac113b946834548400"],["/tags/jquery/index.html","c9464a50ca81c25531c224a574011899"],["/tags/jrebel/index.html","8f9ba6ac384dbbd6d9e9c96a6bad4a65"],["/tags/maven/index.html","bdf31e8fa12231c6928299a357c06391"],["/tags/my-jpa/index.html","699e1c941e96a5193ad4760816a60c5b"],["/tags/mysql/index.html","d73366575cde086e6ae4fadfdaa9937b"],["/tags/opencsv/index.html","11f9b0e33ee2ee02c556c024f3d3933d"],["/tags/prop/index.html","96f6042fc5a11eb2b02ee7e907fc1b5d"],["/tags/quartz/index.html","edc585cf7a7fc58eb9307e15316d7ca1"],["/tags/restfull/index.html","a596488618cb5fb6e21a3a251ebac133"],["/tags/schemaZip/index.html","df960fddb8b2df79201a57b0d2af43ef"],["/tags/spring-cloud/index.html","1fc03842b2a873664f5933f2b17a9863"],["/tags/table/index.html","5db2a3b070629e70402a94b3c9663c9e"],["/tags/test/index.html","8a341c34039e18acb90a0d1ec8040c1b"],["/tags/vm/index.html","13e7333092199358730563fce4ad912c"],["/tags/乱码/index.html","5ede4822c5d1f0752e9689cf127dccd2"],["/tags/云/index.html","080ddfa1009efbdfc5b1b8ad37096aed"],["/tags/依赖/index.html","e8a78aa3c0fecc3d68c520c9835b3319"],["/tags/初始化/index.html","833d0818504e4ce4ba1fa9f70ade63d4"],["/tags/吃货，媳妇儿/index.html","de7412ad1b04c53505c4ecf3ad93f5e8"],["/tags/同步/index.html","0c116c3cd6ddd6ec412c781466bddd6f"],["/tags/启动检查/index.html","f9646a693f4fe48677ad12810487d6f5"],["/tags/命名空间/index.html","63e3dc7ad3fe7cff1ad688fadb305a27"],["/tags/媳妇儿/index.html","dac34c657ca03f40be14362ef8a914b9"],["/tags/媳妇儿，梦/index.html","69451262fe0ed893bf64b664c68a06dc"],["/tags/学习/index.html","5a8182f05bf27eaa7b067351002e854b"],["/tags/工作记录/index.html","693d849aeb2c0dea5da13d3fe6a7a5c5"],["/tags/年会/index.html","ccfacb82845a967796d422be11ebe49b"],["/tags/异常/index.html","ac392ce230149dc008192ee77e7aa7b7"],["/tags/异步/index.html","56c7b876b2d77ae97befe2c82ddc47b9"],["/tags/方法/index.html","7cf1697e1de846abd6ddd7fd83454be1"],["/tags/样式/index.html","790c1e37d3b6b89f2bf73b3e8fd59648"],["/tags/桥接/index.html","cb3a9e0a0947b1f7fc0f48e58c865d18"],["/tags/梦/index.html","f8ea0fde2b10297bd5ce37af23e9d0da"],["/tags/梦，媳妇儿/index.html","cf7e05917ed1a0786dca19adcb7087aa"],["/tags/母亲节/index.html","aab1e877c8baad17ba556f567d17e0d0"],["/tags/注册/index.html","940f5ec03cfdda9c73f0e42fc3a6ae68"],["/tags/源码/index.html","da08fdf5c3eb3bdfc22eedd4903d2b44"],["/tags/特性/index.html","383bfe8492824f22ebe112ca95c3a568"],["/tags/生产/index.html","63163b1cbd14466fd5577e7c7fd29082"],["/tags/直连提供者/index.html","945c271c736bed0432ba4d41ed92d83b"],["/tags/硬盘/index.html","b757a554e59b611174839e17c66c5a16"],["/tags/类型转换/index.html","afbd23e3ca14e2936810b5db7cc22c29"],["/tags/编码/index.html","347158fda06a8b3bc6744ab2cfdbfb4c"],["/tags/自定义/index.html","d20a3ac2436b125e30f9775a8407a225"],["/tags/解析/index.html","12c0b04508f29fb516c4176bacaf1b87"],["/tags/订阅/index.html","7dafae4991dbbe1290b7b1e178f12be9"],["/tags/负载均衡/index.html","e98637f9bb0f47cdc6851de1d21ec22a"],["/tags/部署/index.html","c31cebdb49144499eb0ecb95c1e7e84d"],["/tags/配置/index.html","906a736bb3851c66b3721648dca82c0e"],["/tags/错误/index.html","f623d5023c98e1c5bb5b5d933e775831"],["/tags/错误记录/index.html","a2d9fef58a2b22c9e60811c475660fbf"],["/tags/阻塞/index.html","80faad83496ee7ae8a0f66b04a0c34da"],["/tags/附录/index.html","43da3883154dccd3d37cc4c374d66eae"],["/tags/集群/index.html","4508c1513c86028d699b4197f0b50685"],["/tags/非阻塞/index.html","0e1fd4ea3658e310968ff139d1cd5215"],["/tags/面试/index.html","18660602f5d63510b9a50e88f4238f4e"],["/tags/项目结构/index.html","f9cdaa011bccd976dc73d919e7f9c3d7"],["/tags/默认方法/index.html","dc5354de84400e34dc9c7dba6567e54f"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"http://qzztf.com"});




