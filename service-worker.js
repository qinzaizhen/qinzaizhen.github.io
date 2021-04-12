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

var precacheConfig = [["/404.html","0f122b5f20b8bb2a5453d4d4ef02a90e"],["/about/index.html","d15f65dccfc5aa39454ad62f67bb6f2b"],["/categories/index.html","7d7b2bc5b34ff6cbe07ec87e89c38ae7"],["/contact/index.html","af7917c10029d719eb87f7126ad9c7a3"],["/css/index.css","a78ae8ed177db60c648e5fb179ddec08"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/index.html","14f837df4914d4b38b9ba9ed4ee97bd3"],["/js/main.js","5641b1a6b817df7d81f465c27ed538d9"],["/js/search/algolia.js","533d980c0d50a0d0d7fe34c41a3e2100"],["/js/search/local-search.js","acb62dcdf7e90930da3f6bf07349fc21"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","4cfc631de0e5f6ff12b2833cac848f27"],["/link/index.html","4049a2755dfe8de70a5380c17fdf2625"],["/login/index.html","8b74e6debefcdea23972b93329997f68"],["/page/2/index.html","9c41a001e201a9849c10c9a0ec158493"],["/page/3/index.html","27be5e5fd5f98fe72f5f6760de83da1d"],["/page/4/index.html","fcffe664cd17f1b3ba568c1725e4060c"],["/page/5/index.html","e5f984cbd3e110d30b05eb72a5028a36"],["/page/6/index.html","2d4a9b0087049e0fb7f3d1c663c6be12"],["/page/7/index.html","e73ee42bf9004332d0fc1381f958c0f6"],["/page/8/index.html","dcc0d10422fa599bab4bb538973a396e"],["/post/14/index.html","db5bd91ecac34675e4b2945ddd37fea0"],["/post/14f5/index.html","71e91cff4e2519f60678730d7912c1b1"],["/post/154c/index.html","5b99e52b812eaf62b9c9cb85aec410be"],["/post/172b/index.html","dc9e95df3d19205110201949028a77de"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","78881306b2f2a68ab3c9fabf156b9ba6"],["/post/1df8/index.html","7876fdb4078dac01d9b6cef7e02e4dc8"],["/post/2011/index.html","face34cd11a41e64c0ed31a513f38e3a"],["/post/25a6/index.html","87248594dc3dd7f47fca8df99227ec93"],["/post/2746/index.html","de6ee05e965642cfa857787ee9d72ded"],["/post/2958/index.html","7bec09d3344c8578a97abccabdbf43d6"],["/post/29b6/index.html","bee13b827c2cc5e7b2c2296dfc63fbd3"],["/post/29bc/index.html","1613c5d106c11d231ef55c5e61cd2f3c"],["/post/35c5/index.html","b64df9267d30d0217a0c032354d233b2"],["/post/361c/index.html","e74a85e99efc46e4f2ec6a56b92968a4"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","7a2fe40fe5355b93455ca2087654a28d"],["/post/3eee/index.html","366daaf0ab5983caacfb9093b0c53791"],["/post/4085/index.html","8682bc40537e562c09aa1587456a390f"],["/post/4406/index.html","7becda55e1c0865f74a1731fe952284f"],["/post/45af/index.html","75ae173d941773b804193d21464d7fee"],["/post/4819/index.html","34ce2a9076d452401d13cc2831c6f751"],["/post/482/index.html","03a3a63cee013e88bbbb037a39932f11"],["/post/4b65/index.html","871216a99329a44f385d7c016edd0823"],["/post/4c63/index.html","ab6b00595ca5b1964d4f2b39980c37e7"],["/post/4e8e/index.html","fe3be122d88665e053cac030e05ec0d3"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","a4dc7753a91f87e6070f31bbbcfebffa"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","b270a4c78df1ddd490508a3be2321fa9"],["/post/5123/index.html","b318e375596ecd784276a3ecab74fe80"],["/post/53da/index.html","a2df3f2428ecae7b9c38543679d35022"],["/post/56c9/index.html","763de9b9097a6a5f76975fdf6a3e133d"],["/post/5e2/index.html","e56edd9365a833c26acd2dbb31505b34"],["/post/60cf/index.html","e2dcb8233b2d49d2b1ac2f1eaf25d5e4"],["/post/647e/index.html","d59e6278245bee3fbbce3e14d9b79dba"],["/post/64fe/index.html","b1f35441b707d271929702abc4b0a59c"],["/post/6749/index.html","8585d77b2d595ff4b5ea49a521c97f14"],["/post/6917/index.html","e497da772715b527484a52afb910fb67"],["/post/6b4e/index.html","4f384d28522841a1a086f998a0e2b34b"],["/post/71fe/index.html","0926f84bcc982378bb1b0cd9b2d8b28d"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","05a2ea1d47dd8bfc51901e0cc2b16309"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","06de4a54a96dbe38f76c9253e25a1e13"],["/post/743/index.html","328a1c5882e840486ff2ad796f9935cb"],["/post/7521/index.html","e6f5f0de4920dea056bb1e85feecb18b"],["/post/75b6/index.html","ce8ec87a54918135122781c26a68622b"],["/post/794f/index.html","edee5dde6e6f729f1c8f4c1490b48259"],["/post/821c/index.html","06732c3bb4f6ca4d3aa2fedb7185ce1b"],["/post/8b63/index.html","6767e8c9aca06983dc0ad1efa638446c"],["/post/977d/index.html","f04116191ac0bd3a3a3b811564d037a8"],["/post/9a42/index.html","66f787bcb37c23d645e3bd73a53ea060"],["/post/9bbe/index.html","fea90f78102a5aa5406a2dbf8fe34ac3"],["/post/9dc2/index.html","f79f6264afb1a5fbb01afd3f87f7eda9"],["/post/9fb/index.html","b91ee1f2970562b59d6aa1aaa9c3902a"],["/post/a15d/index.html","047f1280d9bdeada55f5c563d3c86cf1"],["/post/a7d9/index.html","e378ca7833239ee6285bafbe8a6a4317"],["/post/a9cd/index.html","0f46e806e538f4ab16bf4aae79605450"],["/post/b2e0/index.html","272f6e037d15ecdaf398b20b2c31d219"],["/post/b3b1/index.html","6f7d9f8c083df4ba88a540e821e8ccf3"],["/post/b5b5/index.html","50adb7b2681b9bd5f9e08e18489ab06f"],["/post/b6a/index.html","dac715cac6d5ff49da7b9f96fc1c1246"],["/post/beda/index.html","c8713dd547530fa9276cad9a10cabce4"],["/post/bee5/index.html","e2650c1bb9dea1f9a91092191b0f4d5f"],["/post/c1b3/index.html","d49d6f030f5db2b893b899fd3f811381"],["/post/c4c9/index.html","e7a6bf49bc7a41e13e9658d017473f4d"],["/post/c5d6/index.html","0e92ec990dab169cf41aa885d813f87b"],["/post/ca2e/index.html","8aba29da57ecf3f01b14f1ff2cef813c"],["/post/cc21/index.html","62087fdad79723574ebb26ff4b947eea"],["/post/d1f6/index.html","6d997ab0ee971b04ae341549c16d5cf2"],["/post/d419/index.html","c9b9d2439ece8c946aaa7edf0213d10b"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","719ff6734d2279b2efaa1ac93a21624a"],["/post/dbef/index.html","02011c3bb9f13274efed73730751ac88"],["/post/dc62/index.html","9c1b5f1254df8bea034f773ec787d738"],["/post/e1f9/index.html","acd97ae1edb56be64ce27f50f6b48f81"],["/post/e2d8/index.html","9aa43a2df949c2ee27360df9411a3a53"],["/post/e377/index.html","b4877468605e996387bc4c3164598509"],["/post/e88/index.html","803070a4e92d44b12930ad8867381cbc"],["/post/ec4d/index.html","6468ea1ee4d1a13f7d02dc04c6ea80d7"],["/post/f34a/index.html","a7932997763f3fc8949ca0ee4fa93af0"],["/post/f5fa/index.html","7ebcb5507b51ab33278a02a1d7986343"],["/post/f93d/index.html","861231c347862f87544f0b8cfca19931"],["/post/fba8/index.html","27e2481b87d019f4d41ba5cc638ef6b6"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","024df6b4fdb58350cf57ed76a1c97531"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","b5cf24a832a51ab4ce679305bb68d522"],["/projects/index.html","4909a7c5fdf24c123fff4864297927c0"],["/tags/AIO/index.html","c5bb59ab73eab32df89cc05325f87f6a"],["/tags/ApplicationContext/index.html","b39202d397deb1ce2985ed84666d5a65"],["/tags/BIO/index.html","07f9717fc6d81b85045998e89f760a96"],["/tags/Bean/index.html","5348d13694693d420f3eda0a76114dfe"],["/tags/BeanFactory/index.html","29f478f0f49e835b999a13745e5c4495"],["/tags/BeanWrapper/index.html","2244e9482d5b5e03c66294ce4d54727b"],["/tags/CLI/index.html","1e020d28b14db90d6f915f72827e7f86"],["/tags/CompletableFuture/index.html","ba89f6b8dfb1edca9ff315e34da8e7b1"],["/tags/ConversionService/index.html","31634511df4cd0589a0f42e06083cb4b"],["/tags/Converter/index.html","48fe827cc855b2d2cd0c0d8a53c4544c"],["/tags/EndpointId/index.html","25a97967f71f487eac19bfc90e163384"],["/tags/FactoryBean/index.html","617578a3a2dd6147351dbc4ff4b1e049"],["/tags/Formatter/index.html","1f0356e07063c33f9781011653ca2e8e"],["/tags/How-to/index.html","cda44b7e8d277398983654e8351cc7b7"],["/tags/IO/index.html","0d709d756248ff13ca168ca905b71bc0"],["/tags/Idea/index.html","5db29f10fadcdffd80844462316f10a0"],["/tags/JUnit/index.html","db5c85cc3653152d04f5110160e4d8f0"],["/tags/Java8/index.html","65b519663ceafcac5e0d1375c515681e"],["/tags/MvcEndpointUtil/index.html","8fd3c19d4efe7a692b4e447861c74cf0"],["/tags/NIO/index.html","e57895c841c6b675dea475519e1c068b"],["/tags/NamespaceHandler/index.html","bd1322392a1c217f00edc3a7e2322abb"],["/tags/ObjectFactory/index.html","bf3437de8e009e138c40b4cb1b48c3ba"],["/tags/ObjectProvider/index.html","631086ee4b2ccb56afc25f9e7f6f0717"],["/tags/Resource/index.html","757b3dc2d9c5094d3df75edfc45b1715"],["/tags/Scope/index.html","bd689398583244e4392e1f151b960985"],["/tags/Spring-AOP/index.html","f42dac632ad42eab66342a96b0f1271d"],["/tags/Spring-Boot-CLI/index.html","820a886d1312fb5f01d29b81dcda0ac3"],["/tags/Spring-Boot/index.html","85d18d30e0faa061fdf1f5ec4d08632a"],["/tags/Spring-Boot/page/2/index.html","57acec31b3bfd141afc8e5d8e80b271b"],["/tags/Spring/index.html","a2eaf085eaea56191bea12bbd2732a71"],["/tags/Stream/index.html","e8f71e95243800c1a229d668827b6530"],["/tags/activiti/index.html","568aeae2ac28d0ea9b8bf21992c9a18d"],["/tags/alter-user/index.html","cc1cc74faa2c9a9b28197719b408d958"],["/tags/angularjs/index.html","d7472160a5bb061f15e505c8f8d73d3b"],["/tags/attr/index.html","e65d4a8473b8813e7f004b07a59c309a"],["/tags/build-tool-plugin/index.html","d7db73f49fe35825448940e25c915daf"],["/tags/check/index.html","49956ed8750a414ae4261b629cc0ffaa"],["/tags/class/index.html","98ccd2d7420f660bcaf748eb1c490de7"],["/tags/cron/index.html","7720fd18d474216ce3dd0e3e4328250d"],["/tags/csv/index.html","1072c27981c399a9f2e70bb8d8015ae7"],["/tags/dubbo/index.html","e5fd9541c58be17aec5cfb23d883bd8d"],["/tags/encodeURI/index.html","1b479f3bfe890c0d4b54d6ab75b9556b"],["/tags/encodeURIComponent/index.html","144f4acf364c37f7178c90aa8552bfb4"],["/tags/feign/index.html","7264bb3d63ba22fbd4850f48beda5e4d"],["/tags/hexo/index.html","e548c40d2b474f953f0f15b4fc7b2697"],["/tags/httpclient4/index.html","71d03aac35e3ec980c86e05503292455"],["/tags/index.html","86445ece99bd33ff7d7b35107b6f91ef"],["/tags/java/index.html","79213c688149b693428e6677ba02f6a7"],["/tags/jpa/index.html","f07c203864732bd0458643dbf5880669"],["/tags/jquery/index.html","28e9b20a1baec60a93d64b6faf50f045"],["/tags/jrebel/index.html","d81befcf3dde38fa21e0a571de72d5ce"],["/tags/maven/index.html","3379f0322f8a414bcadfc86d0e3255b2"],["/tags/my-jpa/index.html","9d9d745ca38694a66f6e816c30afb095"],["/tags/mysql/index.html","d4a38b8734bb084391a1d1aebaa80202"],["/tags/opencsv/index.html","c43ed5621648d6baf11d1e793fac45bb"],["/tags/prop/index.html","ebf2f9bd8045501d207c5cbbf3449376"],["/tags/quartz/index.html","cd540e2770fe81a1d973ebd4b6d7963f"],["/tags/restfull/index.html","25ecb6503f8bf7a3ccf2c80af8bdf926"],["/tags/schemaZip/index.html","9e2ea12791b2abe7325af69a6b401829"],["/tags/spring-cloud/index.html","2ff2c829c975648ca598981f3b7e63e2"],["/tags/table/index.html","ec3f206e7d14ea52599da5d1892f437f"],["/tags/test/index.html","8fde71db20f49e049882abeed296ec89"],["/tags/vm/index.html","e27b2ef67a152c7fecde77a275727af1"],["/tags/乱码/index.html","5810d47553d5e3dd55e1386f170ac63d"],["/tags/云/index.html","5066d533ff7436209c5b7411b7adc266"],["/tags/依赖/index.html","c55da9c0fa7304d3ea5c1081de70fb25"],["/tags/初始化/index.html","4c3c23a5063a96740c1051da8d628b18"],["/tags/吃货，媳妇儿/index.html","9ef5e6cb0570f43b4a13f89c132ed86f"],["/tags/同步/index.html","7d83fc5d87a1c5b23e920066f59addee"],["/tags/启动检查/index.html","1f923291351a4a8b1acf8b4c405cfcef"],["/tags/命名空间/index.html","373f85d0e6dfc17e0163c6eccb1457a6"],["/tags/媳妇儿/index.html","fa2b9cbe3f64b5353dd5ba622a71add7"],["/tags/媳妇儿，梦/index.html","85233a3314f4da7770f0d72d7877009a"],["/tags/学习/index.html","485538705be6d14d82d76508d00ef781"],["/tags/工作记录/index.html","df9e709e58816818d33f0089815d8013"],["/tags/年会/index.html","678f47fa3d8224aa12fa51ba98522f76"],["/tags/异常/index.html","bfa0c859ad4a607d3b66e3acf98ef0be"],["/tags/异步/index.html","fc38f4d1e84a4f376a238cea96bd5214"],["/tags/方法/index.html","3343d4244e63f2a7a29445f4e25cd2da"],["/tags/样式/index.html","63122ab747be9af03659de1d5bea63cc"],["/tags/桥接/index.html","908803140089ec993800ea6553ae25bb"],["/tags/梦/index.html","d66d3ed91385330ddf8268bd21d0f6db"],["/tags/梦，媳妇儿/index.html","e5bacd0b4dad2f98cb4b47d24d3cc1a7"],["/tags/母亲节/index.html","1a188abea2895ccd22760be097a8c814"],["/tags/注册/index.html","64bde34ca07af1cfc842f7d61cf7f756"],["/tags/源码/index.html","e42a5a09083804e816fa32783e4009c9"],["/tags/特性/index.html","10e9a547389ba7baa3e8cf8e439c2c46"],["/tags/生产/index.html","1b93521d3276ed6fbdd4570c70293ada"],["/tags/直连提供者/index.html","331c9f8fe7b44523891d2e1d3fde6f38"],["/tags/硬盘/index.html","63c9b49bea6bb3253d87630a518e9c58"],["/tags/类型转换/index.html","625fa9661be2bba69a2e65a65d8ee25e"],["/tags/编码/index.html","46f01ee60dede98a614c53c5ecaec1a1"],["/tags/自定义/index.html","233b8837c7e195708368ab3648040b13"],["/tags/解析/index.html","58e010626b057f13b6616901ab047aa4"],["/tags/订阅/index.html","d85d5fb577d5a890955ac6d809b6cece"],["/tags/负载均衡/index.html","60211f2231d9579934e5833eb8a4390c"],["/tags/部署/index.html","db1a05182cc3955da225e4567288ec81"],["/tags/配置/index.html","056ce74700f82f7c8a72e298f95d6857"],["/tags/错误/index.html","cf1ab6c208282d6446bfccafd1550cc4"],["/tags/错误记录/index.html","2ca32fc8ae86e499cb94cc8497c4dedc"],["/tags/阻塞/index.html","79b1244623bbcbc342c843b4f77fdbdd"],["/tags/附录/index.html","8466bacd86cb0d9643630eab63145583"],["/tags/集群/index.html","213c7dc4535bdf5e82bbaab900b49c42"],["/tags/非阻塞/index.html","cc6ebb2ef335fd4ae163b56e716bf7dc"],["/tags/面试/index.html","15928a53e1ae8f62280ca0a61816ec40"],["/tags/项目结构/index.html","2154cb87802f4100269aececf38935d4"],["/tags/默认方法/index.html","b066229e86e86de2f82c75f872b56c8d"]];
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




