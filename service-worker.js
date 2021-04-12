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

var precacheConfig = [["/404.html","e558083309fb6d640da13e713e5893fc"],["/about/index.html","210bce0ea21546d7f3e45a114486c837"],["/categories/index.html","ce9d0439f240adf7a901675c32460b31"],["/contact/index.html","6ae07cabbc1c7ad9b0248e93b2edcf82"],["/css/index.css","a78ae8ed177db60c648e5fb179ddec08"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/index.html","357dda291ab6001d2e41b0eeb4f410e1"],["/js/main.js","5641b1a6b817df7d81f465c27ed538d9"],["/js/search/algolia.js","533d980c0d50a0d0d7fe34c41a3e2100"],["/js/search/local-search.js","acb62dcdf7e90930da3f6bf07349fc21"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","4cfc631de0e5f6ff12b2833cac848f27"],["/link/index.html","9c2be84519cf66a3661eaeb49113d51d"],["/login/index.html","ea61f801e377dc597e6d19068f48bcf1"],["/page/2/index.html","80c27a2e79a41a11d9045e0aaea7b429"],["/page/3/index.html","404da35a0cf9532b46dd3f6c3821acad"],["/page/4/index.html","4835eea3a2b15bd0eb71b99e3b2e8602"],["/page/5/index.html","f246c08a58797412f414e8cfa9dea33c"],["/page/6/index.html","c5b5e349614eed3d34f842c4115b7f0a"],["/page/7/index.html","94a0a75a6f4f3240ab71f99f597571a8"],["/page/8/index.html","e3614c5bcb13fd52d74c9e0b7135fb78"],["/post/14/index.html","7c86fe9829ded5944b78fccb23757b45"],["/post/14f5/index.html","60aefb65bdc98bb7e9c4f6448bf19e66"],["/post/154c/index.html","b86485161df135d981d813cd2d6f29b8"],["/post/172b/index.html","f0e80a7fd1a83b794367b2b4a0e6b457"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","c362918095221628b784b12e66d1e991"],["/post/1df8/index.html","665209ba54cbcfa28eeb2d83fb22e9e9"],["/post/2011/index.html","f9c53990f9e2fed72b62d3b0dbe7ce26"],["/post/25a6/index.html","3d1c8b35843f666d87f6c8faeff33f59"],["/post/2746/index.html","ec7bb4f94638c88263b1a05177093ccc"],["/post/2958/index.html","0984617df6211636f30db3490a096ec1"],["/post/29b6/index.html","b5b89410951a94d01d566ad30aa3afec"],["/post/29bc/index.html","f64cfdda19c4955a9582f2a9e2354a97"],["/post/35c5/index.html","90919ce90cd7efbd8fbbadf21781c888"],["/post/361c/index.html","4906ecf07bb2a6ae1bc222a6392bffc8"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","be803d243e6357b8eeee2c5767a68e2d"],["/post/3eee/index.html","9da86c124c80edeef08f927b731850b6"],["/post/4085/index.html","d8fdadc7ec630dbfa9e7c07428835155"],["/post/4406/index.html","1da56012da786a74dbee153cf14b6aeb"],["/post/45af/index.html","67891443235ab37ae4dd8abee21d4625"],["/post/4819/index.html","936ea856b2a3688568f3a768458d6ef3"],["/post/482/index.html","a7383abc6614549b0b588f5ebf88e611"],["/post/4b65/index.html","8408621c970629044675114bf92d6aa8"],["/post/4c63/index.html","d28d8df78fceb4aa2ac38106f2866daa"],["/post/4e8e/index.html","5a57dbce8f3618f5c49407f5ec6bee4c"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","fedb6758007310adde22f5bef1a6a60d"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","2b290d56d669acf6ef4130e8231f019c"],["/post/5123/index.html","34c425eb6aec0a1a49cfcdf21233e06a"],["/post/53da/index.html","d3a9a89d3bb1327daebb366c2445fda7"],["/post/56c9/index.html","5237e8bf8d66344b5be2b83cf1ee1f5e"],["/post/5e2/index.html","a683a33338fff4ed89b144301277f0d7"],["/post/60cf/index.html","9f5a67984a987069b6c8b5c756280936"],["/post/647e/index.html","34331bee83dbbde249acf4f1579afb61"],["/post/64fe/index.html","510a9f9e6efcf16d8158f2e3b77849f8"],["/post/6749/index.html","22ba90b9686885cd3eef34a3f48b610f"],["/post/6917/index.html","112b2ac18265f09db501b922b89adccb"],["/post/6b4e/index.html","801e706d3caf02a5f57ed8b283b91027"],["/post/71fe/index.html","875ab1dee74b9f0bbc3522e59fb4bcd4"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","0135f64e106734f33cf1235f46a59a25"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","73c3d7e4cf97c36b764a299233b0003b"],["/post/743/index.html","c6263539a7afd78400eacf0ea4afc9e1"],["/post/7521/index.html","944ecaf234bb477144bfe48ef063309d"],["/post/75b6/index.html","91960731f6a73e644cd61bd5e65548c6"],["/post/794f/index.html","b6571af9caf66a8f610f2a5ac00c1efa"],["/post/821c/index.html","23603929c836313508d9887c5f3ef69f"],["/post/8b63/index.html","b7cd37a3a7a810a2aa28b70d57e0b818"],["/post/977d/index.html","da4a0e4c413452e8139f8c1ae946e84d"],["/post/9a42/index.html","6a7f92581ef5a1b18022792ff2033814"],["/post/9bbe/index.html","72d3b4f493da758ae681eb8a28506bef"],["/post/9dc2/index.html","2bfe60a61aee1749036cc8dc11631a5c"],["/post/9fb/index.html","da9a2c1768c2e39277e46eabca2e9cb0"],["/post/a15d/index.html","5b7fb2b8964dca3801f9f2f94603bed7"],["/post/a7d9/index.html","d346689fcafc7d6df4da854e5b96b1d1"],["/post/a9cd/index.html","c704c9efcd4cd6d308be86c2fdd98aef"],["/post/b2e0/index.html","81cbb32447590faaa97cc4b026152b93"],["/post/b3b1/index.html","8ace15db49454594a810753e55a68ed9"],["/post/b5b5/index.html","dc0c346e5aaa2a07dc762317f674696d"],["/post/b6a/index.html","5e51c77d2c72b89745d8268f0f4d0448"],["/post/beda/index.html","0435f3c4c93db2f034ee198abadce5c6"],["/post/bee5/index.html","2f6cd64cde32529ad2527c0248758dd2"],["/post/c1b3/index.html","c82eb32f40c0d90c99801ae68b4ec8cc"],["/post/c4c9/index.html","0db9ac3d5095109e6bf16d3532af2d95"],["/post/c5d6/index.html","24b3943b04242632b6ba15375e4cae57"],["/post/ca2e/index.html","df639f4dd856a6d5389b50977ebefbaa"],["/post/cc21/index.html","bf84547dbe70cd976c115ed11e819e93"],["/post/d1f6/index.html","6d9dd86f9a11f8494eee64a83b1d5d8d"],["/post/d419/index.html","7d9e94635ff357e448ea1455563a4854"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","81ff1c7e4fd5edb3a757c16e8128f979"],["/post/dbef/index.html","31a9f09f96a5b8b71e46855eeb43b1a1"],["/post/dc62/index.html","a8c7d65db89aeddb2cc0152d04011c62"],["/post/e1f9/index.html","219d74b9c09cedd1643655241280611b"],["/post/e2d8/index.html","8f41f65449d07cd8bab13762bb92aead"],["/post/e377/index.html","9c6345ae6ce1645d8ca871b3b290e658"],["/post/e88/index.html","7502cc21306c7183174cd6e51ef03fcf"],["/post/ec4d/index.html","e8e84cbca671479fffaac5327718c2bd"],["/post/f34a/index.html","0474b6386e416a1bbe3785e514e140a7"],["/post/f5fa/index.html","76d6cab75e3794c79116cee1da8ef908"],["/post/f93d/index.html","7f643eef404f588e411c59a11cfae4f4"],["/post/fba8/index.html","8f7175ebe45c76516cd89248a6f58fcd"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","b0d86d71ad457a766fd6aa2ea96acd57"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","617b539d3b85315582b0994882e1064f"],["/projects/index.html","f24d8c3da8d4fa034f4c93db64f58280"],["/tags/AIO/index.html","bd048085cb3f0d560c2705f0ae002738"],["/tags/ApplicationContext/index.html","1a635ba7d811372e97f1d27b84933060"],["/tags/BIO/index.html","e8fbc5f86ccc7341565a1a2be5588d8e"],["/tags/Bean/index.html","1c57ba9a8480f52ccf71cfc30cb2c728"],["/tags/BeanFactory/index.html","2a933b684ec06971081fe0a30e188963"],["/tags/BeanWrapper/index.html","fdfc06c618f7a30b6a898468665a5cc3"],["/tags/CLI/index.html","b92969e6f66eaf8be23e80531a425eb3"],["/tags/CompletableFuture/index.html","25553dd7502a3361f660efd72ca8dcd1"],["/tags/ConversionService/index.html","2db74f62c9e8b0f56c4f23136c1cb191"],["/tags/Converter/index.html","a1b5be470d46c2df407aebcb34f50e74"],["/tags/EndpointId/index.html","162a1a449d1c4fd94c2026ee9df609b7"],["/tags/FactoryBean/index.html","ff671c8594ad870a82c35b05302f1b4d"],["/tags/Formatter/index.html","9238056e3e640dc9eec37845f0224bae"],["/tags/How-to/index.html","ee1fc2dce614916ae2991b76aa97f350"],["/tags/IO/index.html","5bf63bdb1a6b791516a9892283700170"],["/tags/Idea/index.html","ea07f35756ca8478f412b2aa72fed949"],["/tags/JUnit/index.html","a3d35e2ac3e76aec332eae6b2cbb9d15"],["/tags/Java8/index.html","6af0f66b6503756d4bed6f90338463e6"],["/tags/MvcEndpointUtil/index.html","803d5a9bcdf4c503da1f5438e070f051"],["/tags/NIO/index.html","b18c8a54ff06bce8c1becd43ca251fc4"],["/tags/NamespaceHandler/index.html","fc3a0119c2cb7fcbc5af892f5039df1c"],["/tags/ObjectFactory/index.html","1528443ff44573e11cbe6fc0ada125b5"],["/tags/ObjectProvider/index.html","a188ecf56b9a08e791be340237d1b55b"],["/tags/Resource/index.html","307f6cc6b93d52b403e19d363f89a087"],["/tags/Scope/index.html","0c94235484bad801e8805a14f57a807c"],["/tags/Spring-AOP/index.html","9667739c89bef817078c4c652d3fe074"],["/tags/Spring-Boot-CLI/index.html","926e24d504f069f2a50e5953c9613d55"],["/tags/Spring-Boot/index.html","c4959ab081a2263ee248e66f42c4d91d"],["/tags/Spring-Boot/page/2/index.html","60bd2b9f18ced205878feba6154033ad"],["/tags/Spring/index.html","f3adf1feb5716366e2f9ce024239343c"],["/tags/Stream/index.html","b6914ba7b446ce8e14507cc38cccb841"],["/tags/activiti/index.html","b9a62aa65c0af539829a82f641513d38"],["/tags/alter-user/index.html","9df79239160e56d3ac4a3f71e37abe2f"],["/tags/angularjs/index.html","768cca72a3750f3e5592da0cd48a380b"],["/tags/attr/index.html","01c5cd98758ff9643b846bba41ebecf3"],["/tags/build-tool-plugin/index.html","5bd15220350225b53cf25ac4794298eb"],["/tags/check/index.html","bf6c2f8130cf4513b56621b82460046c"],["/tags/class/index.html","dca7d6b781b521c55d9476b157afb8b3"],["/tags/cron/index.html","13828f29e5ec78b672ab2d3dc864eab3"],["/tags/csv/index.html","2353e8195a2aefb5ac111ecf01d8c044"],["/tags/dubbo/index.html","b4f571154f5f3b28cb110abae14eb41b"],["/tags/encodeURI/index.html","8b8149eed62ea58926883182a7876fdb"],["/tags/encodeURIComponent/index.html","715d74a5ae93c327c44b9c9c006bd944"],["/tags/feign/index.html","5ab3f02e78718ee0e760d3806bb0a4d6"],["/tags/hexo/index.html","085b768c4b95eac73e7485da561b78be"],["/tags/httpclient4/index.html","c9cbbabee1695c77346cc76dd2bd19f2"],["/tags/index.html","6e9c6c5b0fbc54b5d386f08417b4d1b9"],["/tags/java/index.html","6c74ab8cc33714f9b77b460b0b16a8e3"],["/tags/jpa/index.html","83e9146d336bffac34cc30d15d9a57ff"],["/tags/jquery/index.html","faef0bec09d580643bbc8b84e7b94455"],["/tags/jrebel/index.html","d10707a2892e788144e405999483152b"],["/tags/maven/index.html","9dba9e71d80d4c1cb61af419fa38afe6"],["/tags/my-jpa/index.html","4d93219a0451545bc2f56024c8c96f55"],["/tags/mysql/index.html","196b6d9a1bdc50410c8e9d99d9c0bea6"],["/tags/opencsv/index.html","aebfb5cd04e981b1a4b540c55f9e5288"],["/tags/prop/index.html","1f21409df55a35fef4d436d7bf148e8a"],["/tags/quartz/index.html","cf0a797f1e699ed66698ffe568ead01f"],["/tags/restfull/index.html","623f8031e0a99c3d47cd4c6248fa15df"],["/tags/schemaZip/index.html","25debd07d6fc8491ff23eebac214783d"],["/tags/spring-cloud/index.html","13caa25d43bda7e32968f631d90a169d"],["/tags/table/index.html","a2376c5e1bab77fe69d53bcbea5f918c"],["/tags/test/index.html","314303e978133238ac0462f24b3fdee3"],["/tags/vm/index.html","b0fddab57ac8b45609a4deb646d151a4"],["/tags/乱码/index.html","4e4515819f22950acd1e4915a5658ad6"],["/tags/云/index.html","57fd86bd55adba898041e142858519ba"],["/tags/依赖/index.html","0b45e5c7e92d2a20f0023421f6277450"],["/tags/初始化/index.html","974879ed6197742e1c22b55f986b9dd0"],["/tags/吃货，媳妇儿/index.html","2e75b3512ddab7fa4f5aae960689c54e"],["/tags/同步/index.html","428aa464b700ff383b90aefb47c8efe3"],["/tags/启动检查/index.html","a5522b8e8de68a54e48d875326f6be72"],["/tags/命名空间/index.html","993739bf58786d58f0d7eee6dc2cba05"],["/tags/媳妇儿/index.html","35bea5c1c6d98ff1930a53c026d09898"],["/tags/媳妇儿，梦/index.html","eebeb4db87692999e27f796b46de04cb"],["/tags/学习/index.html","a45c1155274e83dd66785d0101169e7e"],["/tags/工作记录/index.html","3581e442ef974717641af7f6d10c9427"],["/tags/年会/index.html","456bdc268c1a89b9561a463006694a58"],["/tags/异常/index.html","9a50a3c8349f29802224b148c0443c13"],["/tags/异步/index.html","598ee39cd94408c959c7f4c2f8840b15"],["/tags/方法/index.html","e6811a43b8e1fc67af4112285df18a73"],["/tags/样式/index.html","861bdd3cb22eb24b3afddcedebbd1d1d"],["/tags/桥接/index.html","6dacc85fa6e7431e91c983ab46ce6d4c"],["/tags/梦/index.html","5bfa11b83383cdb8e534be9f3338c094"],["/tags/梦，媳妇儿/index.html","9f571bff97e0b3f2297855f1affd2d25"],["/tags/母亲节/index.html","36687662ae0c42448d471c94921bb403"],["/tags/注册/index.html","512d2ff86e008eacd04ff7797c364a04"],["/tags/源码/index.html","a38d8f57391b3c1e26b01e3f16762477"],["/tags/特性/index.html","4fa0473e1d88a147b6eb475c5c13e6aa"],["/tags/生产/index.html","6296f290f4fe4170fb29b649fc7a85d8"],["/tags/直连提供者/index.html","cb56fb56037fd21e32f94e7ce05c3757"],["/tags/硬盘/index.html","2759fdcf8227f0044b9bd82be6ed653f"],["/tags/类型转换/index.html","a72c39dc66c233ba310c6661dc6f4107"],["/tags/编码/index.html","f1a9159214346e834253a2ec8dfd71da"],["/tags/自定义/index.html","3d711aacf0be06497c214dcb48adfb26"],["/tags/解析/index.html","7159d67a2527c2f5a4687120895de292"],["/tags/订阅/index.html","f8c463c3f3706db89492a44bc904ffd2"],["/tags/负载均衡/index.html","535d762e18257ed92b35d5d4adfe0e32"],["/tags/部署/index.html","25b1cf1d8b54ef99699035ae251d8706"],["/tags/配置/index.html","f37acab88b8ce01ddcecd8f672a4a449"],["/tags/错误/index.html","999e4263f71bc7822b352e7cf4f2bfc7"],["/tags/错误记录/index.html","b43010398ff8ddf505688a052c9e6941"],["/tags/阻塞/index.html","b942620c82234e8d2419baf3998b54d9"],["/tags/附录/index.html","24d8a9d0832f6033c682481b65228aff"],["/tags/集群/index.html","acf10ce1c929aa72216b77009343757e"],["/tags/非阻塞/index.html","29644993c570c825e7787f2d3aca2adc"],["/tags/面试/index.html","75ee30f3584086fd6cfaeccacb3c0f5f"],["/tags/项目结构/index.html","272eb3b5203e3c0a80e6593977aa90ed"],["/tags/默认方法/index.html","2ef887313c7e399e53c07420f95662a5"]];
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




