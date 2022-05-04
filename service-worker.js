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

var precacheConfig = [["/404.html","d49a171d3747f9b63c370a43d88780af"],["/about/index.html","39a3f9c4c11954af74e4f401fe11b053"],["/categories/index.html","242f99b16a70a9264c48617956bf9ef5"],["/contact/index.html","6a91f8417c193ba1be019e0c74d69409"],["/css/index.css","c99d86d0f99b6dd9f7c350566d381fbd"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/avatar.webp","4e09f949bf507c9af49f601a081b2fb1"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","8df186f57a9ff21b019c0b9b6cd4c01d"],["/js/main.js","c2d6628801fd2dc0ea1739901cf5d99b"],["/js/search/algolia.js","af567f93a5504310fe16fe368a4ee89e"],["/js/search/local-search.js","149fcc60c1de0a818e111978d01cbd87"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","24971090b8b1bd5d3f538d414e270fd3"],["/link/index.html","c15819b57935d1f7d59462e78780f59c"],["/login/index.html","8fa135b387baafbee7213c9d323f21bd"],["/page/2/index.html","85aafbafd2a09af011b7b6725a207208"],["/page/3/index.html","e42da83e6a06befecc594c4fb71cea8e"],["/page/4/index.html","c0691e5f0e6189bc9ccdc0411d1151fb"],["/page/5/index.html","8f2960bfd4154587ea7045c88395e9f8"],["/page/6/index.html","1fd83611795ca6580deeab7e9485ba31"],["/page/7/index.html","93e6f685b374654359383f694cfa66b7"],["/page/8/index.html","19e6c27d5d6568ba82be2377dc8b44ac"],["/page/9/index.html","ca3f28a05d17844e12330f1bb6d9928e"],["/post/14/index.html","73be57522239a45e85d07343907da539"],["/post/14f5/index.html","d64a0fbbe02d68e72044ce727d424a98"],["/post/154c/index.html","61814e21e1d59a09ef4f001d5ecbe6d9"],["/post/172b/index.html","0292c219060901f8a14adb90b41485cb"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","adc8b145d0a187201ca654b9a4f984a3"],["/post/1df8/index.html","0d6a6bc80f8677bab22f99f1e542b93b"],["/post/2011/index.html","cb5c59d794fca2a0acb5f60978500884"],["/post/25a6/index.html","4964866cef7aa42844a66c32bb47c0e7"],["/post/2746/index.html","8cf00b188e7da80cbead082e724fe749"],["/post/2958/index.html","70bee12a89f798e884f752c4dfbcdeea"],["/post/29b6/index.html","03ab270b76fdb8408aed349c9ef5a499"],["/post/29bc/index.html","23d9c2fbc343be6a3f1fdf830a1d0397"],["/post/35c5/index.html","b74e088ce4fa9bf92833baf48fb18164"],["/post/361c/index.html","3a6a15232ef630bba1efc9dee5b5dd5d"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","25dc07da93450779ac46430f46789479"],["/post/3eee/index.html","9f8e000d1e9dc674afc416e2017843d7"],["/post/4085/index.html","2b01e5c6ac0fcea1c09a05a44ab24cee"],["/post/4406/index.html","e79b300279605997811ec967e18820d7"],["/post/45af/index.html","1f3caaf8ee5a6d8133d05207cb0c63e9"],["/post/4819/index.html","81737f4df4ad06fe72c5c2b9f07b45c5"],["/post/482/index.html","9fc3365efbd4dc2f31861d2e81f2dce2"],["/post/4b65/index.html","4c2d0ef15a1cdc64aab9ae0e93813bcd"],["/post/4c63/index.html","f24c701283f6e1dc22f4d874e8ff1c32"],["/post/4e8e/index.html","5542ee804a0fed7e3ef524339c71ee34"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","633eb838eea150cf43c78c043cd8bfd2"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","f291d1a5392508bca5f4167b05596085"],["/post/5123/index.html","46f03ec898368d161f3e57f542fef989"],["/post/53da/index.html","796eb0deb2016a073205ece3adda6f8f"],["/post/56c9/index.html","7e4db767d8b740f9b8ebed3dacd2eeb6"],["/post/5e2/index.html","355a1ba0387de5a30a28b11d6619d8d5"],["/post/60cf/index.html","afeaad542bf448965e0337935680a820"],["/post/647e/index.html","790b2d7cd8c051294696704afefedde9"],["/post/64fe/index.html","b7efc4c9a2ed0fb92321d3d5c074bbaf"],["/post/6749/index.html","3ca395f69bfb633b8114d6b4967e8eb6"],["/post/6917/index.html","517d933e139db761494c9dfef39dd57f"],["/post/6b4e/index.html","c2a969926376d3d279c745e19d09ea28"],["/post/71fe/index.html","c438f007f77175a3b12850538b61c581"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","af75fb217f39a284cb3d0bb5dcb13cd3"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","0c6f9e3efddba22e8c90c05114ba8ff6"],["/post/743/index.html","f12b23e439ab98058b0a219f0b1815a6"],["/post/7521/index.html","e3f79f3ae853a00d520b50ac7ab8dae0"],["/post/75b6/index.html","6e9acd33e687a18052bd2828707f82ee"],["/post/794f/index.html","3acb9473e1ff085016093e36a7b70d4e"],["/post/821c/index.html","5dc1ac028eb31d1b9e87021c7993a40d"],["/post/8b63/index.html","041662618e11db7beede55a6f680cd08"],["/post/977d/index.html","1e6a23c31736c89bbd7190098dad1d8c"],["/post/9a42/index.html","688abb8a4217cb00212d0b01377ade42"],["/post/9bbe/index.html","b8c06b58a0340337069c591311f6ecfe"],["/post/9dc2/index.html","80044d2e6e95e315467421eb5e7b752d"],["/post/9fa5/index.html","28eeb6a2538354d3dc753d342284ac20"],["/post/9fb/index.html","0a5acae7de66dd7f54ff749b9b0a4888"],["/post/a15d/index.html","02e6f8cdb57671d693256817703c222a"],["/post/a7d9/index.html","319a498f1b562ea0b4a59eceb0a6f0b2"],["/post/a9cd/index.html","8511dd350e296d7062bf39dc35c1a02a"],["/post/b2e0/index.html","95e34d4cda5952bea31b6007e61c42b1"],["/post/b3b1/index.html","d28fb939952e4229ac61fa256e74767a"],["/post/b5b5/index.html","ca6c82445e90f8677ac2baefef625c7e"],["/post/b6a/index.html","ae392f9c930cc744458eeec918a2c6ac"],["/post/beda/index.html","14fb1767fa96471dc661a3291f5284e9"],["/post/bee5/index.html","060ce4f727c6dcb3b8288072d0bad883"],["/post/c1b3/index.html","528cbf4cad80291bc5606343fd2975ec"],["/post/c4c9/index.html","20f183697a2a6de092699442d22aef48"],["/post/c5d6/index.html","3671a913de3347097c74c034ebdc8d88"],["/post/ca2e/index.html","6a08ec7cbc00878d9a208ad2cda5bc84"],["/post/cc21/index.html","9ae36aaeb31522deefa7fc09fe8d5e52"],["/post/d1f6/index.html","2d085f6ee5d17ee2af65dda9c1c98a85"],["/post/d419/index.html","1e14c489d175fc42e958f1985e1924e6"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","edb3e79130e0b460ee65296a208c526a"],["/post/dbef/index.html","71854a3dee4805fc900590ebfa329428"],["/post/dc62/index.html","7b39c73a593aa41d0881f51f1ad3cfdf"],["/post/e1f9/index.html","73e735346f5319af57a9533d557a35bd"],["/post/e2d8/index.html","dba5e7b508ca63e9f58ab54ac294f3a6"],["/post/e377/index.html","de1262cbb4f12a05b60b4b174197fe3b"],["/post/e88/index.html","1a97afcf5857a57a7194b02a39f75310"],["/post/ec4d/index.html","311d47ed05bf3e28b200c5423df2de12"],["/post/f34a/index.html","b6476d00c68071ccbfe165503462a736"],["/post/f5fa/index.html","80a05037f43325bc8b3f4c93365517a5"],["/post/f93d/index.html","cc29e8adf177d1b851d4982396b39343"],["/post/fba8/index.html","cd478d9bdf296611ee1d49c17d50e25a"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","75fae0780dfa2a8d63696e7d322c62a8"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","06a3256d42940e0ecd2418f937690cc4"],["/projects/index.html","9f3e4950abdc49411adac5cf36e8172a"],["/tags/AIO/index.html","abf602210b2ecbee73c7fb0bc92bdca1"],["/tags/AOP/index.html","5cbcb81336c3103efe8b4ec59fbb03e2"],["/tags/ApplicationContext/index.html","b092b1be6632e430fff4d81bcad6c5e4"],["/tags/BIO/index.html","f8531a7aa2cfeeb0d483113800b62336"],["/tags/Bean/index.html","c6a274e0d5d0ce4be277a90d2d08055a"],["/tags/BeanFactory/index.html","55ddca589335678ed8d92dd7d83cc395"],["/tags/BeanWrapper/index.html","4c43f2fa6bf540f851dafa2f2c53d719"],["/tags/CLI/index.html","8e8d485c5c8ddd1dffdaff06f5204137"],["/tags/CompletableFuture/index.html","b07bebf653c7f5f9b1d6289a293906c1"],["/tags/ConversionService/index.html","72f43807b10f60ed83ed55efefb5e6be"],["/tags/Converter/index.html","ab8a178cada6473d5fb54fa62043e7c0"],["/tags/EndpointId/index.html","faa2b70f9ae2d4a4570f3679801029df"],["/tags/FactoryBean/index.html","7b65f6c9e0e7b8a86bf85a1d2eb18aea"],["/tags/Formatter/index.html","492477a963c98eecbb23a20408260cc1"],["/tags/How-to/index.html","c6e2b7452ce6ea896f97372b497d90d3"],["/tags/IO/index.html","1716bc22958ecf45f5af97bf418dbe38"],["/tags/Idea/index.html","6bb7c8cdde5099dc1f215d414ead1d45"],["/tags/JUnit/index.html","c67e6766099d42475553de6eb7d76a36"],["/tags/Java8/index.html","809704e73ff37894eabd0d0e8a4f3fe6"],["/tags/MvcEndpointUtil/index.html","4775b07158f2cf173d8058b16967ddbb"],["/tags/NIO/index.html","28d4c70510c972ebd0088d2993d32884"],["/tags/NamespaceHandler/index.html","6d51ebff31533511e6496cb92c186ff2"],["/tags/ObjectFactory/index.html","9d151f9dda07f34db0771d69f4d3f9f5"],["/tags/ObjectProvider/index.html","e5ba5975de665893e90fdfc3d4f229c1"],["/tags/Resource/index.html","42159d7a1b13b8ce2f6eefe403dcba50"],["/tags/Scope/index.html","370366cef6f1bfda4f2a131844e23922"],["/tags/Spring-AOP/index.html","a575915f4ee6749822f1b677d9af9e0d"],["/tags/Spring-Boot-CLI/index.html","6f46ac36d9872872183c74b78ecdb10c"],["/tags/Spring-Boot/index.html","0fa11a4a88c76d4648a261b9ef82ca9a"],["/tags/Spring-Boot/page/2/index.html","b09a7c4ef8a2b8d32267dfc046af13d8"],["/tags/Spring/index.html","c9b4eb6d3c34b31a9b4123a414ea497a"],["/tags/Stream/index.html","3a898a44e30e049058896d85934f3edc"],["/tags/activiti/index.html","3cfacfb8809a8abc342f46dd90c2d502"],["/tags/alter-user/index.html","df2f0b41382fa26fcf3f376bfc95f371"],["/tags/angularjs/index.html","f191c21c92783b2f2597805089c69121"],["/tags/attr/index.html","308ee0e6e9b7ef2aea39c5e31e807256"],["/tags/build-tool-plugin/index.html","4eb47a6a2b4d10d23c071ae59230b77f"],["/tags/check/index.html","c1cd0dabb5b415d498bf5461ad84b89d"],["/tags/class/index.html","4363d8eef3fec2e8f2fb6c2170005074"],["/tags/cron/index.html","05206d9e427f4c90832a5b54260c61bd"],["/tags/csv/index.html","f224cf82079e2fdc8c448a1a1bb44e2b"],["/tags/dubbo/index.html","d6c86619a672f81930929d950fa6504f"],["/tags/encodeURI/index.html","8e89343aba03ca8ded11ed756f2a60b6"],["/tags/encodeURIComponent/index.html","a86b0c1066ef479e220340f48c38946f"],["/tags/feign/index.html","61c8c2df8e525816f7737e304cc6a82d"],["/tags/hexo/index.html","502997f317351f6c340e7783c77bbd24"],["/tags/httpclient4/index.html","d6d60c657a8d1634164a7c4674d85259"],["/tags/index.html","64fb88c1a70735851bfca48438dc51d6"],["/tags/java/index.html","9b1bf24ab2827d1f2a19763fde1d3f2b"],["/tags/jpa/index.html","28746db7df8596d1591a184969363b12"],["/tags/jquery/index.html","ef911ab9f4d5b1cb700275195da15636"],["/tags/jrebel/index.html","97d7fb64cb1858ed0d7560a02d1fb918"],["/tags/maven/index.html","52bef7a5ad7df6a04171dd2b9d64e85e"],["/tags/my-jpa/index.html","6a7687b9bb1c510f34470385cf36f45d"],["/tags/mysql/index.html","3b3929450be489b0401b02091e8fb882"],["/tags/opencsv/index.html","38eaf26aa51678323946239ba28b2a1d"],["/tags/prop/index.html","a06551b72fb120cc71a1c0f188fe28a7"],["/tags/quartz/index.html","501f5aa8c164838892c2287ac3dd86bf"],["/tags/restfull/index.html","f8094fb138040891280d9abe02984df1"],["/tags/schemaZip/index.html","d769c9694c1d5d5c64dd12090f8b8870"],["/tags/spring-cloud/index.html","62d4e1622cbc2b5e1a59b6a844fcacb0"],["/tags/table/index.html","8ab64d824bed418877faf3b1a3e15246"],["/tags/test/index.html","3753c9ba472b7013f5f5fc62896f9573"],["/tags/vm/index.html","efc7f6e935bc082d05bfb89946635db1"],["/tags/乱码/index.html","b7e8d14d7de98850f9241b1e7923b1b7"],["/tags/云/index.html","eed9fba84a6aa4f0d44a118d49114305"],["/tags/依赖/index.html","e867fa443280fdc020f9bf0fbb088ff2"],["/tags/初始化/index.html","a84d2d7119082a3dcb0a2200649b1d7c"],["/tags/吃货，媳妇儿/index.html","6e71327016757269a7fa1908e344e792"],["/tags/同步/index.html","b1c561e9dc3136184f396bdd47aea54b"],["/tags/启动检查/index.html","b7aa1d0bd573383f5dc7df580554ee7e"],["/tags/命名空间/index.html","20f7034f1637ce14130d8bec3da2ec96"],["/tags/媳妇儿/index.html","4f14347ca5c49b20c53948fec1830999"],["/tags/媳妇儿，梦/index.html","c4e1c1e0e4dad687e47d0ea59299c6d5"],["/tags/学习/index.html","c5991d96f40cab047647203690c90eae"],["/tags/工作记录/index.html","bfea04580940640f9b60aed6e8f297fc"],["/tags/年会/index.html","cc205168405fda6a0ad0a28891fd1951"],["/tags/异常/index.html","7c630984bcc8d1e426ebaaf91c4dc9e4"],["/tags/异步/index.html","92e72ef72875ed1f8e6fcb0b7f2c2517"],["/tags/方法/index.html","ad9bc478c8d90d96d8d165dc7599c66f"],["/tags/样式/index.html","3b0d3b4c08f91d9c099412a582251392"],["/tags/桥接/index.html","8cdaaa727b3c13918f38a4fda490c2e4"],["/tags/梦/index.html","8a755cdd507c77f7f3cb7e95a1a4c316"],["/tags/梦，媳妇儿/index.html","3136bafd5617fc817f95f0df2708d442"],["/tags/母亲节/index.html","71b85bdc0b33c498c04ad41b342de6b1"],["/tags/注册/index.html","429caa6687dd8de4d0a12a015c43655d"],["/tags/源码/index.html","9fb4a4d86c25635c6f67dd0c3d34c38e"],["/tags/特性/index.html","fcf29b41bb00943554b545f85378cfd3"],["/tags/生产/index.html","0c21c178a283930af149c696203ef6bb"],["/tags/直连提供者/index.html","c2c5d67d96d010a72f04649e525ceb4b"],["/tags/硬盘/index.html","b073e4ac1881d538bffd652ca98beacb"],["/tags/类型转换/index.html","dafbd7259e5e9b2613f3874fd67b1aee"],["/tags/编码/index.html","66712a1475761a1ab4779a0813f9014b"],["/tags/自定义/index.html","868ed5ccf39950f5e019c29372857bd1"],["/tags/解析/index.html","b8f45b5fdc7ee2c8665ad0983e206547"],["/tags/订阅/index.html","b3ceb260ecc7ef8db90b05a7bffbe035"],["/tags/负载均衡/index.html","1b9baed3eb98937a51f60842566aaacc"],["/tags/部署/index.html","b77c557e601bba304bb6a6e38a0e30cb"],["/tags/配置/index.html","dc584680c4f2bfcecb2b0d2a106b1f39"],["/tags/错误/index.html","d4a2a3a369f83eb67c68a8808a83d69e"],["/tags/错误记录/index.html","9f3acf74d875ae8f1a0bd343c26515eb"],["/tags/阻塞/index.html","5e52d6ce730373c43ce1818f8d095daa"],["/tags/附录/index.html","c0529bdec8309778ee0ebac9438789a5"],["/tags/集群/index.html","41ee14a69d99ccb0c831a231f7a9e63f"],["/tags/非阻塞/index.html","8d6c31e28dd1e4ec426c40bf66415eb3"],["/tags/面试/index.html","52793c88b7bee457c34c7e47d90f5be2"],["/tags/项目结构/index.html","cd5451f5191d446e1466a2af660ce085"],["/tags/默认方法/index.html","920302a246d450cf69b2577deecce1ef"]];
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




