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

var precacheConfig = [["/404.html","cc6050a4553bd1e61d648f3f82c8894f"],["/about/index.html","230eb3b6a9b22ee26cb27f74593658e9"],["/categories/index.html","bbb1724e40822a5e9d55ac3c5ced5925"],["/contact/index.html","053573302d436021587eb3d533632689"],["/css/index.css","c99d86d0f99b6dd9f7c350566d381fbd"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/avatar.webp","4e09f949bf507c9af49f601a081b2fb1"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","28b9870c2e529fc775a7bb48e27c238f"],["/js/main.js","c2d6628801fd2dc0ea1739901cf5d99b"],["/js/search/algolia.js","af567f93a5504310fe16fe368a4ee89e"],["/js/search/local-search.js","149fcc60c1de0a818e111978d01cbd87"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","24971090b8b1bd5d3f538d414e270fd3"],["/link/index.html","33aaa3c75e591e59c0d2fcf29e95ddda"],["/login/index.html","bea0864f76fe52195627aff7e88b6524"],["/page/2/index.html","8e6004bcebf08390842ee6d5cb58bb1c"],["/page/3/index.html","9b643a0e6708b483940194a7e78963fd"],["/page/4/index.html","a6626ef615a11e4f4010c58ff3b19bef"],["/page/5/index.html","893f25ed13b9ecbaad5cb039c17c3eaa"],["/page/6/index.html","c8ed5fc1ef96b6717d87ec5d770c3c6f"],["/page/7/index.html","c1e1b4155b2627e4562e8d66466a959f"],["/page/8/index.html","a290bc21d170decff31009973b1dbdf2"],["/page/9/index.html","fc36b2a17ce207232de5a49b42974600"],["/post/14/index.html","26ae0a1a2de8cb50eba8f348f472c3fc"],["/post/14f5/index.html","19f1e9777a920b2dba3389283de4c384"],["/post/154c/index.html","e2ef00e5b6ce52bc369fcb62df91cbcc"],["/post/172b/index.html","9e78a0028c0796a280bb95160027a44f"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","dc8544ec96ca20131516166d6826ab64"],["/post/1df8/index.html","b033bb39278aec0130fddde7d38ec4f5"],["/post/2011/index.html","665e3256afb730e44ba347af0286135c"],["/post/25a6/index.html","cfe3e4c7013cbee22801201c6c6d7508"],["/post/2746/index.html","bb036106fc8169ba93608f226e06f201"],["/post/2958/index.html","59931f0a5b1325f1d728a55b2b704c2f"],["/post/29b6/index.html","238055cc7c3853f492e77c2c7da62cf4"],["/post/29bc/index.html","c48755c2856fbc74a8e8eb49d1e2a8be"],["/post/35c5/index.html","6d5395c26f06cc0f08c7af4c194c16cc"],["/post/361c/index.html","0b973d0a51f8867b1fe33790cc5e5676"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","f20ea0a1167c7b104fc667e1d2d4b1e1"],["/post/3eee/index.html","d63ec72f13c98f8bdc7c22f544d0a7ca"],["/post/4085/index.html","d5a65bce4dfcbffcb2e4014a890337a4"],["/post/4406/index.html","d715ebb7750879ea81187b6625e088ee"],["/post/45af/index.html","b012d04b76224b67b4f1eacf508d48c9"],["/post/4819/index.html","e63270d764fff58f7587df876157c69c"],["/post/482/index.html","2117a8fde010cf0ed63be105312917dd"],["/post/4b65/index.html","2d29e4901b02c73b7bab4ab5e690d9cc"],["/post/4c63/index.html","54a02ad076b5697d548c38fab0355d39"],["/post/4e8e/index.html","c6ff1a16d431538c57d7a5a613f05fae"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","8a606508e38019a0a0ae967d6f32c3a6"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","b9ee233bb3a6e2ee1391ab50a05d7818"],["/post/5123/index.html","98a0d552bacde3663798be8e47aaae81"],["/post/53da/index.html","22625ffcb62b7b14d4ff05c216de3a9d"],["/post/56c9/index.html","5d7f1df3b48a684b02d3000f623b8b1c"],["/post/5e2/index.html","16084f297de112ccfb435823ffb4e226"],["/post/60cf/index.html","7ac4ea50667645ca4a1b9fbe5f1732af"],["/post/647e/index.html","92e8a746139277d1a1024e0a8abd1adc"],["/post/64fe/index.html","229cdbe0fbf3bff8a6f0a9946fafff09"],["/post/6749/index.html","e90607f6b39b1fa4efec38cb5fe471d5"],["/post/6917/index.html","a83d9a4c61f400ba977292dbe1ec7dec"],["/post/6b4e/index.html","826c966166b7be1ba2fedaa448ab68c5"],["/post/71fe/index.html","f3c52c1d03e3e678f449b95b45556e9a"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","aa8613e228f38f7156170c6ac3cd100d"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","f5b437c34cc350a89c4be8b529bd6412"],["/post/743/index.html","8bad71a575672ea82469f3226fa3508c"],["/post/7521/index.html","a27fb8af96276c38a4422b5d4eb79eb0"],["/post/75b6/index.html","421ec00e687006391fc8257b5e9d961b"],["/post/794f/index.html","6017fe654ab6ad5144ee2b72ed330dcb"],["/post/821c/index.html","ef516a8167eb0cb829ee6655c852d4a0"],["/post/8b63/index.html","dd95b8d9f75cfa9f35220d048640f347"],["/post/977d/index.html","c9bf43660f12dde0dc7f9654ac32e256"],["/post/9a42/index.html","ffee4ee480bc5a7af63854bb5d013708"],["/post/9bbe/index.html","8f7f4f0f8b54bb5375f2fdcd806ca4aa"],["/post/9dc2/index.html","218d4309b21049c2e8fef04329265f99"],["/post/9fa5/index.html","431cbe236ed8ce13c90c0019fc9b7d4d"],["/post/9fb/index.html","2fc32c234114667b2033d837e8f3a9e2"],["/post/a15d/index.html","17359133610a72106cd55161f528616b"],["/post/a7d9/index.html","d3379bf37ba0f29ccb50400bc7110414"],["/post/a9cd/index.html","f39739ba2c1b116a688ee4df69730c64"],["/post/b2e0/index.html","893844ad7d76c79264a49c3c47b02405"],["/post/b3b1/index.html","ca433a55f1ef65c05b60080ca5f51efa"],["/post/b5b5/index.html","89511b983388d2bac9fd9ca130362076"],["/post/b6a/index.html","4be5958f5b0df55d4a65cde850410d90"],["/post/beda/index.html","f970731176042ed233062474586cd884"],["/post/bee5/index.html","5a2be9bd155710dfb2c1e833faea53f5"],["/post/c1b3/index.html","8b8c1175933cb5fdcd964b5c8703e88e"],["/post/c4c9/index.html","859e2eeece2185258c1f45c2e011fc06"],["/post/c5d6/index.html","e1ebf83a27195a53fa22e61f264c93e5"],["/post/ca2e/index.html","a2355369ed1043f5269160594777a461"],["/post/cc21/index.html","6a12fd5a29a0d1d1bf23ce98a982af7c"],["/post/d1f6/index.html","88596b5600781c912168c8bddf22329c"],["/post/d419/index.html","f6dcbfcc7909018322a2dada5b4535a9"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","f9889e0acdb55569fe869b4b75ae5dce"],["/post/dbef/index.html","9499e7b601f6d1194d95221ebc7ebaa1"],["/post/dc62/index.html","adeac808378a1cf0425b39421e1160ca"],["/post/e1f9/index.html","db0a6e35771e6caaa63feedece9f62bd"],["/post/e2d8/index.html","db7279732300250ee28d9e56d7521172"],["/post/e377/index.html","90071f0d27308f062420748511f70f2e"],["/post/e88/index.html","e60c65477067746e3ab9a66ae91a03d1"],["/post/ec4d/index.html","b155fd4c87195bb9a7c9255d25ae4af8"],["/post/f34a/index.html","92e402181225d87a4f9b3319702bbfb2"],["/post/f5fa/index.html","4529c7a822b78e83dffc6eee5b4110d7"],["/post/f93d/index.html","4844184f0425c9d4cba9fda28fdee0f0"],["/post/fba8/index.html","0048a3d3b62a2088d113f2c2e4e75b21"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","405000f97f06e17d8eea99a650e567d1"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","8eaab0ac4226f6831a92212d0f36c1d3"],["/projects/index.html","3603c1d260ef07a5b0eda7b05ffdcc11"],["/tags/AIO/index.html","0f9d1a3613a8f1b0d18e442426870dff"],["/tags/AOP/index.html","83e974bc86231c2b4ac3fa6db93e6e86"],["/tags/ApplicationContext/index.html","efbf2bbe232cd7e9592640c56ab34072"],["/tags/BIO/index.html","e257676fcb1596042791ba1bdebb627d"],["/tags/Bean/index.html","b4d75ea52211044444d3bfd2a819a232"],["/tags/BeanFactory/index.html","b5e77c3a1bd0dba60efee2b9bfb3ef95"],["/tags/BeanWrapper/index.html","cac2f9319a796d425fc91709385cf01b"],["/tags/CLI/index.html","83350a03d3bcf573f6dd397f8e60d9d0"],["/tags/CompletableFuture/index.html","8e55a5247025396071e0c4d48ea7f121"],["/tags/ConversionService/index.html","fa1d20c0bf579a39b2c0b31885191da6"],["/tags/Converter/index.html","e4a13c24b66d414b19994e16d633c97d"],["/tags/EndpointId/index.html","56a87722fec6cd8bf0f72046cab838f4"],["/tags/FactoryBean/index.html","6bacd0b0536faa6f3d72f60ac4184ec9"],["/tags/Formatter/index.html","01df9cdf436c0d5627bfd4721f90cb19"],["/tags/How-to/index.html","5ee16f1ef644bed52b4933aa23a816ee"],["/tags/IO/index.html","f26f5911e1d423d09f293ab2a19fc157"],["/tags/Idea/index.html","a17d39a1ca20120e99755ee15fd73296"],["/tags/JUnit/index.html","41f3eb33789c357750aa6a4a0777faf3"],["/tags/Java8/index.html","53b6c7406239602f19b9c323161717ed"],["/tags/MvcEndpointUtil/index.html","51c33ec0d00c82da613bd02c1a372305"],["/tags/NIO/index.html","771f1c1b5aadf963e9575c015a39b723"],["/tags/NamespaceHandler/index.html","39014f6e3f7308f3e1833117c1ccdf21"],["/tags/ObjectFactory/index.html","4b401fbc3ba70121fc0cb00f8650d24a"],["/tags/ObjectProvider/index.html","bd375443022da9d5ae52c07f51fcb146"],["/tags/Resource/index.html","b1c19e114c1981457d98038bf933fff2"],["/tags/Scope/index.html","ef9fe8403e057d9301f96c3222db1635"],["/tags/Spring-AOP/index.html","5b822a1ae6986f8f3d6afd9bb3c1c474"],["/tags/Spring-Boot-CLI/index.html","2f504e9132e56d0fda8aad842e9f3053"],["/tags/Spring-Boot/index.html","22ac983d4633544d5be6e5026fa84a73"],["/tags/Spring-Boot/page/2/index.html","abffa62ce9f867be11ecd6f617615084"],["/tags/Spring/index.html","30f819c4ab842e70ef996327e73a76af"],["/tags/Stream/index.html","d94861c555f6d1382b4e408d6b61205a"],["/tags/activiti/index.html","d87daf35b9b5d5ebaa4f255b77a5c02c"],["/tags/alter-user/index.html","e9abad49180d4cf210ab322c0144bc61"],["/tags/angularjs/index.html","e52bebc2d2d468d71b06da268e07240e"],["/tags/attr/index.html","5483a095917c216d3a07b79e86bde599"],["/tags/build-tool-plugin/index.html","b3934d3ffb5d0e45f8723d1f3be5f943"],["/tags/check/index.html","e0eff4363983c8a606c963af10d1dfbc"],["/tags/class/index.html","c66bc433786dda1433879830ee7e187f"],["/tags/cron/index.html","55a352f2ff1f7374b7b05812e7e296c8"],["/tags/csv/index.html","f612c116c5f3e82cb796683a24c81677"],["/tags/dubbo/index.html","4d002fde9c575fda707c1d08fe68f488"],["/tags/encodeURI/index.html","06b6c208e85f093acfe0e5fc83931ecb"],["/tags/encodeURIComponent/index.html","7d631d625ac74a212ee796f9fff7e2f2"],["/tags/feign/index.html","38c76ca93c86709ac89ee8e444b8ed92"],["/tags/hexo/index.html","6bdcf7e90d6e97556b103efd651c0af6"],["/tags/httpclient4/index.html","01af8bdf1c252e153c1e02e3630c00d3"],["/tags/index.html","214bcb6765a223886adaa11ae6abc753"],["/tags/java/index.html","fdf261c1d75891e12f39f4ab8c785031"],["/tags/jpa/index.html","854aca2cde0604ceea6645a547cb2835"],["/tags/jquery/index.html","492dfe87a7b6bba9d31a12e3d77415a7"],["/tags/jrebel/index.html","7e900fb4075d3ef12585021b523b5858"],["/tags/maven/index.html","ad87d48c6dfc14ed49dcd610e1540def"],["/tags/my-jpa/index.html","35800a615f115efe1707dcefe6275f7f"],["/tags/mysql/index.html","6b10f7a451d044b9bc5f4185a404d4f3"],["/tags/opencsv/index.html","aa3195685516fcfb5c63a88578e5b328"],["/tags/prop/index.html","46ad89e036a3a61f11eafe789c215f93"],["/tags/quartz/index.html","f8ce2fb781e517b5a94b3428176b037a"],["/tags/restfull/index.html","a0fe9203b40ca8d2d5702328486da599"],["/tags/schemaZip/index.html","3ac11e69871f44c5ecccb8ce20744094"],["/tags/spring-cloud/index.html","209e6293c057b4dce38af782112b3132"],["/tags/table/index.html","96345f2c88a97c57992f1bbd672f37c1"],["/tags/test/index.html","b8975d6f0db1ea2d3ec824835dc6ceda"],["/tags/vm/index.html","7355d14aaa9490225c55bb32077b1ce0"],["/tags/乱码/index.html","48dab1803168884d1de97005b8190cc9"],["/tags/云/index.html","14522bd969e1db884c6e86691a56b2a4"],["/tags/依赖/index.html","9fd9ee4b5fb72fc1e695ac2e3609b0ef"],["/tags/初始化/index.html","afbed6073603fdf9e45ddb695719ba95"],["/tags/吃货，媳妇儿/index.html","ab42b01209396305dda1703da093c94e"],["/tags/同步/index.html","7920bfd997fc63a801b62bed2f3f5a48"],["/tags/启动检查/index.html","5e4d66de17dd892e5c367eeb8a3314b4"],["/tags/命名空间/index.html","4e9514f53bb4793b8bbae39c2a2ecc5b"],["/tags/媳妇儿/index.html","85b320075fba9c2f33d2898e82396ee2"],["/tags/媳妇儿，梦/index.html","531c9c1ecc086d6d478e3a68b16b0e05"],["/tags/学习/index.html","49cd68b7a363ff7ee66a35424d689cf8"],["/tags/工作记录/index.html","ab3fdd79ba125d2ec1ddbe086f32bbbe"],["/tags/年会/index.html","fd08f3c31bf0a9e066b7bdb31765f848"],["/tags/异常/index.html","6c50d64558820e35b0cf2351364d636b"],["/tags/异步/index.html","63006be408374c217bcd7d71341eaad2"],["/tags/方法/index.html","3770850bc4dbf377aefe5137a868f9f0"],["/tags/样式/index.html","0a03617e860235a56b7d4cd3202e8fb6"],["/tags/桥接/index.html","1b32bcf4a30ed46283ef4d7cdd038a4b"],["/tags/梦/index.html","69336c4b70d2d787a8c7bc4bddc070b2"],["/tags/梦，媳妇儿/index.html","a74c4c6b67d7d32b0eb8e76c09396de0"],["/tags/母亲节/index.html","260b11022c0a6c7a0baa2c1d6f11e1f8"],["/tags/注册/index.html","05bf2c254d23e0c82f2e82e09560e7e9"],["/tags/源码/index.html","c568ebfa57df1d2146d79178c8664a60"],["/tags/特性/index.html","0efedf4b4aef2462d7bd01449a7bfebc"],["/tags/生产/index.html","bb47ca79418b0c232356274beb7e2ab1"],["/tags/直连提供者/index.html","32ce63f0ef00d6e73859d08ecf7ed2e2"],["/tags/硬盘/index.html","0722a1f2cb3f2d21c215ceddb6e2e94a"],["/tags/类型转换/index.html","4b1a115534c9d605dac5ccd2b43cd104"],["/tags/编码/index.html","2b594edb512ffc2d65f06043ac3a250d"],["/tags/自定义/index.html","a7f41b124a46171f5abe5632b3b37829"],["/tags/解析/index.html","ea988b0d233503bef1dc0f14f200883a"],["/tags/订阅/index.html","f80ffc64a4d852e1c1d1453c9192f990"],["/tags/负载均衡/index.html","baa625d7c1f5333af0692963de4b655c"],["/tags/部署/index.html","d71703e77d5da73acc9ca802c9886f15"],["/tags/配置/index.html","616716b0a8eee06e6cd2f443c082ff0f"],["/tags/错误/index.html","dc9d4db0e264b7f97241094272cd4f29"],["/tags/错误记录/index.html","f5f27754a463c5f992ee6d4633f4af86"],["/tags/阻塞/index.html","bc7ab5e99f8273d4038955f9c4d7e32e"],["/tags/附录/index.html","5ac369004d0da69cbdee79a1125bf884"],["/tags/集群/index.html","8a586f035b7c2dc068bf596dcc295e88"],["/tags/非阻塞/index.html","1bd83de2072693ef4691cc563817351f"],["/tags/面试/index.html","c8130aad602fe17257d0f712f5b55ada"],["/tags/项目结构/index.html","09212eadb78753684f17de8557cd2295"],["/tags/默认方法/index.html","0670d46a6cb26f5c19972f0bb5ab9eb9"]];
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




