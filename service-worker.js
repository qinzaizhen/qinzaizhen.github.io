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

var precacheConfig = [["/404.html","a4ab0d1a498371655005c5d52b42653d"],["/about/index.html","d14ce641589105e07725664030e888b6"],["/categories/index.html","d678456a52c9f54c70230cb2a36d63fe"],["/contact/index.html","9685b703d21610da54bc7b952f1fad6d"],["/css/index.css","0c14add5625a6c25d356ae26ab071d0a"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/avatar.webp","4e09f949bf507c9af49f601a081b2fb1"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","9c5db14f057a02f81437050254cf6366"],["/js/main.js","5a6ecf34399a1729b115064d2f283227"],["/js/search/algolia.js","786b8da5325888c55c04e6b6687bf9f5"],["/js/search/local-search.js","1ec55c21e97cc170ee4dadaf96b44806"],["/js/tw_cn.js","bc064917c366036544975274bb20a01d"],["/js/utils.js","0dccc99f6a5b70b9ccfbf58d2c6eec5b"],["/link/index.html","4d240a2a37f0350f08142f81f61b1826"],["/login/index.html","a2f6fa1ea64c197e52878fac540f08dd"],["/page/2/index.html","5ef15c78099013f4156b496a6e3623b4"],["/page/3/index.html","2da3bf90c4b465a9a69cb798e0226213"],["/page/4/index.html","4a014c0540a1ef672231243120fa7438"],["/page/5/index.html","0cfe0bfa13f7eb1951d92c0cd1c00622"],["/page/6/index.html","d44bc1d858b6e7092fec3e603bcab312"],["/page/7/index.html","13ac7d00187b2fdcba042687e5175f14"],["/page/8/index.html","756e891f18e4c1e4c97975b262ebac17"],["/page/9/index.html","ae6e85ecb88683cda42934ac3f121dd1"],["/post/14/index.html","e289169516ff13fe7d3efa3b0d8760a4"],["/post/14f5/index.html","d7c0884ef1093fc82c93b7f9e12245cd"],["/post/154c/index.html","2d75b2e671379a73068ea27b7bb49a4d"],["/post/172b/index.html","11f498a04c78f09fc63737c160736fce"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","22cc6fec0281aa81eaa9877a79d8ada9"],["/post/1df8/index.html","3dd567fd2f5e105bd916f402c987083a"],["/post/2011/index.html","2dbd3c53c5e914d4a15a74c7427547b9"],["/post/25a6/index.html","ca81ee50d58bdc332c77379157c129dd"],["/post/2746/index.html","8b18ec007db230f570ec7a26e4e529af"],["/post/2958/index.html","b151cf885c6e3ad230a51735bf6784d3"],["/post/29b6/index.html","b258bfc61b0abf9c349ea229dcc8e918"],["/post/29bc/index.html","1003a044b221a4a25d1d2817a262c24b"],["/post/35c5/index.html","4432da1c1a47b0a8d72c39922cbf049f"],["/post/361c/index.html","a7c35ca81dbf83dc58c10d875770dad7"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","9b3b177a4f0dc8e6613a73015ff0c1f0"],["/post/3eee/index.html","c1f0695b7b8321c53a4666c1f3513520"],["/post/4085/index.html","5fd8c48f4c26250cf03f7682bd5011a0"],["/post/4406/index.html","426e691c00b41e3610be86c6aee07ea0"],["/post/45af/index.html","b09bcc71c57bcc8dbc5be621a711f79c"],["/post/4819/index.html","177305e1abfe1262d603d8e2150cf54b"],["/post/482/index.html","9aae2a96286662ff0fca9afd9fa930a3"],["/post/4b65/index.html","916014335428bd43f09bb79187c6b8d3"],["/post/4c63/index.html","c929314ace5961bd643dab7cef8f005e"],["/post/4e8e/index.html","c946e84452acc8fc905f02c0cc62c664"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","d06ba3ae1117ce20fc02452795c5cf11"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","062c6ec49ec815353aab36ff865b0215"],["/post/5123/index.html","2371f1350bce721c821504b2aa08520f"],["/post/53da/index.html","941abc04b70a3ecd02b239ffa4797acb"],["/post/5441/index.html","d318d98375db47c050c805d4f1a8afb4"],["/post/56c9/index.html","bcd36fd28215979edbff011f12bc003a"],["/post/5e2/index.html","5d2e92943150ae68b5284208429d6bbb"],["/post/60cf/index.html","b8f6081b27cbb5856e28cac743f703f6"],["/post/647e/index.html","2f738f4087743fce7ab30b03cd0b6bc0"],["/post/64fe/index.html","4efa7ba6db0b275de714e4a1e1f004e1"],["/post/6749/index.html","1d045c933a450a29e9c4fd78da9fc181"],["/post/6917/index.html","9991e66b0d96e6842f76d5ae64271550"],["/post/6b4e/index.html","5531302d8de9b9b39a05ed5a08816551"],["/post/71fe/index.html","c89e6601310b6971735013e2bd694a4e"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","3893c6f568de24deadd830209f708f28"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","a2095ba1323726475ac082f15c797141"],["/post/743/index.html","c32fa20e4b020eec97f8cd2554e7b3c6"],["/post/7521/index.html","5d8beeb5c4d042ff25c36c760799f496"],["/post/75b6/index.html","67ea7968046993dd7dc2abc21afa0739"],["/post/794f/index.html","79e9f0c349b923d602c7f472b5daea00"],["/post/821c/index.html","e0253323d29ab6dec41800265921048b"],["/post/8b63/index.html","768a132a7cd9c75e0c5485c9c6ff0ee2"],["/post/977d/index.html","ebc43aa2b13722c278d24367c848929c"],["/post/9a42/index.html","e576ed2c3ffb6898df79a03518e529ee"],["/post/9bbe/index.html","e3badbfe4817eb71a17f562032d6cb7e"],["/post/9dc2/index.html","6bbdedfac97a0b16fdd250eee61d7fd3"],["/post/9fa5/index.html","d73ca00f087080e55d298859ba025fbe"],["/post/9fb/index.html","fc49f524a255c0e4e14046b7bb81a762"],["/post/a15d/index.html","f8eb99448d9b4e64bee420d5d3f01cc3"],["/post/a7d9/index.html","9b9363080f3f0a88ef5ce5568211f926"],["/post/a9cd/index.html","35d7ce3d76db71f57baacfffbe9a1ea1"],["/post/b2e0/index.html","ffb9bb99513fe97624122973c4bfc78f"],["/post/b3b1/index.html","251540bd87da2ad2dd71025799c80c3f"],["/post/b5b5/index.html","2c95303b918060a0cf31f666dce576b1"],["/post/b6a/index.html","a7a9ab1e0a3d19c9d5dc77d6bf599dac"],["/post/beda/index.html","8314168fb84f6383a33be365b0e632e9"],["/post/bee5/index.html","138d228b68b1113b46c83316f1bfcc19"],["/post/c1b3/index.html","bc9495c6fdef1652154cf1821770de94"],["/post/c4c9/index.html","df9f920a9de3c43ae6a29406231eb337"],["/post/c5d6/index.html","06a3c313b6e1de2ddd7149dc5074aaec"],["/post/ca2e/index.html","b77be0983c25eae5f4e36db521584dd5"],["/post/cc21/index.html","8f1b20e2105349791758dab603360a59"],["/post/d1f6/index.html","27ca036e69cbe95623f03a12cd414f37"],["/post/d419/index.html","18e862cd11e32d929fa09cc119665cf5"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","7481cde90cf0ffdcc29383a459ec0f63"],["/post/dbef/index.html","5aa154ca458ba88a08cd6acfc29ba5cd"],["/post/dc62/index.html","ebc24553f2cd5c9d9e5fd8ad7bda6aeb"],["/post/e1f9/index.html","2db1a36fe5179810aa7041a9dc56bdc2"],["/post/e2d8/index.html","e2062f78fb0308389765da42991ef5ec"],["/post/e377/index.html","1eccf92f21bdb5f7f75676b2103f73ab"],["/post/e88/index.html","44999fe9be4e0ab7fa032f95cef3fa5b"],["/post/ec4d/index.html","e519f7cff4a1c2f9df165bda9b054025"],["/post/f34a/index.html","bc5ea20ec49818d4864e39cb4732e3dd"],["/post/f507/index.html","9e4a1be9563572b98042f80260e65e3f"],["/post/f5fa/index.html","1954eca102578ba4b4f51fa572a67d1f"],["/post/f93d/index.html","1135e793acebc04fa73a7a2857229b26"],["/post/fba8/index.html","5ac18f8290a33cf92afeba684e6e7988"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","2a7743086cc17a3a57349a9627fce8db"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","7704c48e85eb02a0c57454ed8fe650e7"],["/projects/index.html","a3fe4002664f868117630184cd4c6542"],["/tags/AIO/index.html","2ff680dd05a9e8b36b0dc34122d82d7e"],["/tags/AOP/index.html","08f39bce92506bc8ce32e753a4cf4830"],["/tags/ApplicationContext/index.html","ed7a6fd4f9fc4ae1101003be32b7e44f"],["/tags/BIO/index.html","92d7eeb99ff71c8b0ade375f19fa5fac"],["/tags/Bean/index.html","157e24326130e0126957eb889125d25c"],["/tags/BeanFactory/index.html","15eefadff6084e41e62a11a513508ef9"],["/tags/BeanWrapper/index.html","75d5dc1b0bbb98d56c8d6f9d93e51ba8"],["/tags/CLI/index.html","b9062a86d7c6e59a8a3456e0eefbfb0f"],["/tags/CompletableFuture/index.html","edaf05f536c7f8e475cfe5efecd91f5c"],["/tags/ConversionService/index.html","ba6972f79e349546023499cdd02da822"],["/tags/Converter/index.html","81eb10bd9653fa7dda6e8507cf206438"],["/tags/EndpointId/index.html","6a86a5edc912713cbc6236d569af92f0"],["/tags/FactoryBean/index.html","2de29be7d7e1222666c6b2a76aa79be9"],["/tags/Formatter/index.html","2d54576933fa8c3c1eb12c12ffefd2c2"],["/tags/How-to/index.html","708cde1a6acb0d2f1b90347044287e62"],["/tags/IO/index.html","fec9b65f5bc0b4d28fadf476c316fd26"],["/tags/Idea/index.html","11f32baa790704e753ed7bd291dbb2dd"],["/tags/JUnit/index.html","d6f1fe4b2dfedf38b286b79257e9c5fa"],["/tags/Java8/index.html","7ee7f80393220128aea0a823d4a9ce44"],["/tags/MvcEndpointUtil/index.html","fd9ea2b6e8e46e11a330f8ebf0a1b814"],["/tags/NIO/index.html","a32a62e93c259352b700f3786cb62ad9"],["/tags/NamespaceHandler/index.html","8c71bd81fd43089012ea2ecbcc23d18f"],["/tags/ObjectFactory/index.html","598de476d30145fcba404eeabc67dbb8"],["/tags/ObjectProvider/index.html","bf211cf46fdb94358a74024d8ae644f4"],["/tags/Resource/index.html","8edac72a30031b404375b889e692d1c7"],["/tags/Scope/index.html","e235383ccca404e75505e24bed01527d"],["/tags/Spring-AOP/index.html","7c31c3d6527d428bf9397b329ea4ff89"],["/tags/Spring-Boot-CLI/index.html","820cfd0244be4b3dd844c224505d7748"],["/tags/Spring-Boot/index.html","882b96f0356df4d0842393e9063520c6"],["/tags/Spring-Boot/page/2/index.html","c647cd797923e2720382a31112fd0e22"],["/tags/Spring/index.html","0b18d86528789331ae54e3ad9ba02c25"],["/tags/Stream/index.html","7f543c55f7efe29299455f39e5819880"],["/tags/activiti/index.html","027b959054139c555b010420272e2f1a"],["/tags/alter-user/index.html","00b02e767972433c9c29f432b4904b91"],["/tags/angularjs/index.html","0eb8248022e8366ed566b6a5e3d987de"],["/tags/attr/index.html","f9c89d219cdc11e49f4e9079a557cec6"],["/tags/build-tool-plugin/index.html","6e856a26e5c4c924397e33883752868d"],["/tags/check/index.html","21cabc23fc3c81a429a7e80e4764928c"],["/tags/class/index.html","191db15432ea791eee198f84e9d631a0"],["/tags/cron/index.html","3285116faee3eed2299201735b1999b2"],["/tags/csv/index.html","f5b9ddf53f33607fc61b30f6b545a4aa"],["/tags/dubbo/index.html","7ac325038df1057bd3bc4da22279cfdf"],["/tags/encodeURI/index.html","76fe1425081f40d36e0bf103ec23cb10"],["/tags/encodeURIComponent/index.html","2f7bedfae5280a5c1b00657499976a78"],["/tags/feign/index.html","f8cb3dcbcfe41101e3cdf36d4b9688cb"],["/tags/hexo/index.html","007a87efa2b1968d7406867a65a5a816"],["/tags/httpclient4/index.html","dd8fb833ee013dd8121252b21fe6d236"],["/tags/index.html","fd8807c99aa5d23666d6d8f3e326d13d"],["/tags/java/index.html","2f82624ff7480a7f90c64df320ad4cb3"],["/tags/jpa/index.html","c9f6aef5470ef20dd61bf3549015b793"],["/tags/jquery/index.html","fcfe415725f209a2af5fb1f9b1232339"],["/tags/jrebel/index.html","074ce87978be1d681b29ff03801ab18d"],["/tags/maven/index.html","753bf4378df040e0f3a3f1a10c485805"],["/tags/my-jpa/index.html","ef07bac4ebffdf4b9d5a0cb454433e34"],["/tags/mysql/index.html","82144f884c5ac6f9fd784c3a6f4f60c7"],["/tags/opencsv/index.html","2eadc3f3a9acd2b82e6d633bd5acca19"],["/tags/prop/index.html","e56bea0bd1c519677b285bae62b79e25"],["/tags/quartz/index.html","1e4341a949545004acf20edca7581f8d"],["/tags/restfull/index.html","1d36a0c94ef8ebc21728473c230cf9dd"],["/tags/schemaZip/index.html","73f2ce20e7aea23aa1c50a55a11e5acb"],["/tags/spring-cloud/index.html","2b5d1a4fb548b0f838aeccd042da07d7"],["/tags/table/index.html","a85dd17097bc5f11629eee889c2189d7"],["/tags/test/index.html","558e019c7e3b195ba7f2379bf68a0631"],["/tags/vm/index.html","b618cb1ed0ec4032f48611a3a1f33901"],["/tags/乱码/index.html","df446a088db953c2f829d809aef51dc0"],["/tags/云/index.html","7e056c2830ca0ac7d588704caff48cbd"],["/tags/依赖/index.html","ab590b42876fd560255f97c827b8898c"],["/tags/初始化/index.html","38900149981e81e0f2f1e191e7137767"],["/tags/吃货，媳妇儿/index.html","faeb2b1fd9cdebb491aaf02dbb34b6fa"],["/tags/同步/index.html","adbfaee3c22e39eb99a56e4a0febfc16"],["/tags/启动检查/index.html","5e8dce9988a08805c776d9a969311dc4"],["/tags/命名空间/index.html","97dbf7951b1f5e95ff83561423d49024"],["/tags/媳妇儿/index.html","1ac0ab8c45705228bd8b5190737381bf"],["/tags/媳妇儿，梦/index.html","e3e36f8191794af0455c9dd9c2bb8071"],["/tags/学习/index.html","99897be8bdb049815992a5349baa36bf"],["/tags/工作记录/index.html","86f76f53dedc1cb54473ebaedc6bff5f"],["/tags/年会/index.html","29cf88e451a9e04288c148f91c6b77f1"],["/tags/异常/index.html","e6235050b3bb8b1594daa720b6f650ff"],["/tags/异步/index.html","caa3fa3a841b14b816d24f305d5bb9b9"],["/tags/方法/index.html","fdc11530c878deb53d3eda41573b432c"],["/tags/样式/index.html","6e4074bf179a9e6d4f3b8be14eba4012"],["/tags/桥接/index.html","fb7310ee18ef7097ea04f5723c6ee8bf"],["/tags/梦/index.html","f495b7abf43454cc5293403b323366d5"],["/tags/梦，媳妇儿/index.html","4fd3d9e64e29f84975c90d0e1ee5a454"],["/tags/母亲节/index.html","66323d50264eeb74aa8c1f4caa93101d"],["/tags/注册/index.html","f7300d2091649ee928b3aae6db70160d"],["/tags/源码/index.html","8d19ee6b618e0e18df0265a891a4bac2"],["/tags/特性/index.html","4e0399d8d1849fc980449f43f9375f69"],["/tags/生产/index.html","3bb9fa51097e5c1f64a18809bd825827"],["/tags/直连提供者/index.html","5bfc894e7b8246130998ad1288eea4c2"],["/tags/硬盘/index.html","b471a3517cacdb7e52f98e4f45e4f2a1"],["/tags/类型转换/index.html","1394d26a9e4118f1a866805565f98c2c"],["/tags/编码/index.html","a55f8a3a771b3dc379689054e97e45ce"],["/tags/自定义/index.html","25fb604d8680ef787f47f47f10dd2947"],["/tags/解析/index.html","2dd2a7372718757e7228faa0a629e7e2"],["/tags/订阅/index.html","f5f6e97e9601b373a00f18763b9f6b4c"],["/tags/负载均衡/index.html","e715edc6ea5e9051a0940212e55fa51d"],["/tags/部署/index.html","66a921a1ecc8fa5df67a4606a4225311"],["/tags/配置/index.html","4f77cc721303a89bb966ba73918c1a32"],["/tags/错误/index.html","6788b03229e6046a07053db8509888de"],["/tags/错误记录/index.html","dc5124961c292068b54d8d210ba589d6"],["/tags/阻塞/index.html","4293848c74a6d8c6e262d9b053c6d94e"],["/tags/附录/index.html","dd8d8e28dc2f32834cc8410a5ee813dc"],["/tags/集群/index.html","36017fa941c15aa4eab4f331e6eefbb5"],["/tags/非阻塞/index.html","7466ef42fb6ca5359324c22d7617d9e8"],["/tags/面试/index.html","1059deb87a45414f75f5ef205f34a737"],["/tags/项目结构/index.html","5b63bbce551ad1f0b7c2b92c40defbdd"],["/tags/默认方法/index.html","1da6c9d28f9cab2f8cebfac1a89c89fc"]];
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




