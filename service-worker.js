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

var precacheConfig = [["/404.html","6bd831eae08ea6a7ef2903ad80923daa"],["/about/index.html","949abb7c2392fa5d6a16eb699de072d2"],["/categories/index.html","7161d23f81b1e9e08c97cd00781a9a99"],["/contact/index.html","9f02b50294065d19be82d412ba3980b5"],["/css/index.css","c99d86d0f99b6dd9f7c350566d381fbd"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/avatar.webp","4e09f949bf507c9af49f601a081b2fb1"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","42f50675aab39a8fc2471a6b52f79318"],["/js/main.js","c2d6628801fd2dc0ea1739901cf5d99b"],["/js/search/algolia.js","af567f93a5504310fe16fe368a4ee89e"],["/js/search/local-search.js","149fcc60c1de0a818e111978d01cbd87"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","24971090b8b1bd5d3f538d414e270fd3"],["/link/index.html","aba56fa9647b90680265f30276b4b607"],["/login/index.html","7f564326d520fe0122df007a563a6f68"],["/page/2/index.html","f2c33aa6fc2a5f50adaa0e21286a2add"],["/page/3/index.html","6b0ee70bf0d84be0b8476230ad8c813d"],["/page/4/index.html","d6432053dd4a92a80c2a902216c2a6b9"],["/page/5/index.html","8e5e7ec2e7a91045bcdb9f2ed2e289f8"],["/page/6/index.html","29076ad76746e799e1d8ad408e5443af"],["/page/7/index.html","a646a49f711e067b8146ac573d4aed90"],["/page/8/index.html","85dd6951e067721986783b6dc404567b"],["/page/9/index.html","251cd9e760b7211dec2ae08be2af4577"],["/post/14/index.html","45d38205415972c9c44abee0e144b29d"],["/post/14f5/index.html","1cd82782fdbd882ade7f1a60f43a2bb2"],["/post/154c/index.html","d310ca4c5fbe61ad0242c35000840c37"],["/post/172b/index.html","1dacfc9de6099c247cf8911e39a22d92"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","e5dd63c48fcc7284489bd5fc942b6c8e"],["/post/1df8/index.html","dc9369380b846a2ce8ad54696a236658"],["/post/2011/index.html","fdfe01f79f573b29fc6b3f27f2b0ff43"],["/post/25a6/index.html","0fdaf192ab7c82b3800cfc87e73d4a88"],["/post/2746/index.html","e6aead57441b64007b9d6813e0a6646b"],["/post/2958/index.html","5a286e0e06d012fbf3d57f564da10bae"],["/post/29b6/index.html","104cf2d5ed677c0307d5326b9f5ceb83"],["/post/29bc/index.html","9ff1934b21c79107f4f43853566a93d9"],["/post/35c5/index.html","adf05ba4fff4c33265cba7c3c4918d03"],["/post/361c/index.html","db6a84f3fc4a77fefa3f7b8617653ed8"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","e54bf05892fa9747c5e64d469383da94"],["/post/3eee/index.html","f2a5e5dd8889214b36e0fba3355ca05c"],["/post/4085/index.html","49d3d089ad8968fbe6ca0741b252e708"],["/post/4406/index.html","313547836635969a83fd393cb636bb26"],["/post/45af/index.html","7c125469df83eedc239059c037a14ca9"],["/post/4819/index.html","f14c106b8595d1e2b804ed51fd62e9c9"],["/post/482/index.html","8f51cdb41739f8dba7950fcf2e5b3d5f"],["/post/4b65/index.html","9b1580d89c14098c2d7c31585e6be6d2"],["/post/4c63/index.html","f47641d53ab3c97d81ae1b4948000bb5"],["/post/4e8e/index.html","d42136023268a7c9b2771e7e808059ff"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","2ad35a662fa98bd030c03a6d2c5ff2fa"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","f6db617b48b30424e0e1bb00cc590d2a"],["/post/5123/index.html","c8f0f48dfb5cba4b676f948ae4eab853"],["/post/53da/index.html","f77cd46bd82d509b1717538d4f641a73"],["/post/56c9/index.html","674dbfe69a956c3e662b394abfd8edfc"],["/post/5e2/index.html","ce96fe7ec9f326302995eceacb0ec747"],["/post/60cf/index.html","9c96181fc8ea93f1a771ae078167e9d5"],["/post/647e/index.html","749383bfd6b84873c1d0d1ba438260b1"],["/post/64fe/index.html","c0bf90532db88e28ff7855798a79ccb8"],["/post/6749/index.html","fd3307f4f337fb4d9a2334aa1b36ccb4"],["/post/6917/index.html","f003c9561e910abebac6717084e9addc"],["/post/6b4e/index.html","1492789db78a8800e584d5a3216ed310"],["/post/71fe/index.html","654d3150b024fdef0426b1f7cf2c5ed0"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","d85b261f22747bd36b6c1b0dc194b534"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","afa8b2cc8b96d1ac5724cba46fc4c5e2"],["/post/743/index.html","2aa7b1ed0567ac2af20e3342607522ae"],["/post/7521/index.html","cf323d8c8b67d1bca0aaaf2b320ff390"],["/post/75b6/index.html","5d415e44fa7da32cede72bbb67a4fb03"],["/post/794f/index.html","d83697e93aad27b8a8c43440b195d91d"],["/post/821c/index.html","f0753b8f6f988516bf472b0a87d99c21"],["/post/8b63/index.html","7485888a0bc00b1f7b1934f49f586c3a"],["/post/977d/index.html","ba40e6d6be5d8d587d907d620af9f825"],["/post/9a42/index.html","0af7c52c8a2476c791f47c6f34e9366f"],["/post/9bbe/index.html","cdcbe1def53b90744f57052a460b6c22"],["/post/9dc2/index.html","6450ed4b1cb38e352f20f84761d17d5b"],["/post/9fa5/index.html","0ab4cb099fd173da83d4670f3e44d33b"],["/post/9fb/index.html","589085be2a2961f8d7fc6d3b3c4b0dc0"],["/post/a15d/index.html","a76b6738304787105637cba20c7648b2"],["/post/a7d9/index.html","e3c9b7bde4f9f9cec73e5a089eb70f8b"],["/post/a9cd/index.html","d5208cf11d08e8d4e4dd7d301fbc265e"],["/post/b2e0/index.html","6db977faab27ad50196fa06d1146bffa"],["/post/b3b1/index.html","7aa68ca63c558864f673e61e0d8d654d"],["/post/b5b5/index.html","00e048537d942fbfbc66d92327a61ea9"],["/post/b6a/index.html","423c2a4c0e0ccb22b5bbddb7b7be285b"],["/post/beda/index.html","b360c74cefcbf073c36b9aa6679ea712"],["/post/bee5/index.html","c82bd6c0a1370d67722f4153b467fe9b"],["/post/c1b3/index.html","cfe5613eb212b746048e58786ad3975a"],["/post/c4c9/index.html","2007284ee5f039c4b0e8525140322f18"],["/post/c5d6/index.html","6803da3054fe83f72897f2934ec51e47"],["/post/ca2e/index.html","b1406ba35350757bbff0b2b05a8abc50"],["/post/cc21/index.html","6eaa9d8283d1cdb84ae4550860bc56df"],["/post/d1f6/index.html","9f100e155171e63af919851b47d26575"],["/post/d419/index.html","14f91237a39abd65333219b7082ceb7e"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","afbb3e83bb922bb063af2120dd9ffba2"],["/post/dbef/index.html","809efd7bc6d223cad4799ab33f0d1ac6"],["/post/dc62/index.html","e830b8aea0cdeb374ce270d6796420ef"],["/post/e1f9/index.html","44fd4cdc1e5273e1db4b4e23a4bf286e"],["/post/e2d8/index.html","98e72e2f9d2aaec87f5cdcddb530f8da"],["/post/e377/index.html","eab31a3194c67570ec80d9813c9ec2d2"],["/post/e88/index.html","664e538788e0c828d6161f96ac4b3f76"],["/post/ec4d/index.html","d817adae3e3931e860b83342a4ac9c2f"],["/post/f34a/index.html","9253462370ccd8d0c30456d3ab41c1b0"],["/post/f5fa/index.html","16f557297a46f401b01a63064ba4cbc1"],["/post/f93d/index.html","3d376252848587efe67f0bed5650ebaa"],["/post/fba8/index.html","6d1f317bb04a0f238cd8b028664023e3"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","4264f0916288f29702f10a9df089f1a7"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","1081e7f7f2060fe799c9077e6ac58364"],["/projects/index.html","844a655bcf81c1a06005bff831a42831"],["/tags/AIO/index.html","18ef06dfd84605bf509e2e5e9e129951"],["/tags/AOP/index.html","dd365b673af41e2eb38bb6b29f6614e7"],["/tags/ApplicationContext/index.html","a09670809a5aad8d9314e84960a49351"],["/tags/BIO/index.html","4f4c819219f5a20ca8042c9ee6aba23a"],["/tags/Bean/index.html","ee6c6c33a7bf89f302286de1eeca718a"],["/tags/BeanFactory/index.html","90eb33fa8f7518cbf7810597d6efeb06"],["/tags/BeanWrapper/index.html","a0802e088b468f2551eecb939a0744aa"],["/tags/CLI/index.html","b1e75c7fc65337ae7ffbaf3c21c58d1a"],["/tags/CompletableFuture/index.html","e70b810e22c5c8901330e5049e816dfd"],["/tags/ConversionService/index.html","9f8a6d4832f710a8d5ab37a8e8a827aa"],["/tags/Converter/index.html","48268bd7487595e23273f36f845fb3bf"],["/tags/EndpointId/index.html","d38d81c87027e30d443feea280cffff7"],["/tags/FactoryBean/index.html","a176cf87274f86250d622670fe9e0664"],["/tags/Formatter/index.html","7f89151fbe53032a1e9014f4ab0f77e1"],["/tags/How-to/index.html","341763abde67f6d8e0b4f728d486a091"],["/tags/IO/index.html","3e33def54400b8452cf7f3ae9de90b1a"],["/tags/Idea/index.html","1fc43b0a4e26c6b4aba4abe1e4fe6007"],["/tags/JUnit/index.html","e76ad83bc393908dd6b348ed2b79282a"],["/tags/Java8/index.html","438883c695e48bea391a8ef262d25cfd"],["/tags/MvcEndpointUtil/index.html","2361f214cc1f0325143bd0a0f82ef2df"],["/tags/NIO/index.html","5236283e66bd2dac6679cc4ea66f52f7"],["/tags/NamespaceHandler/index.html","a269d2929f2517c2b515be6232f06cf3"],["/tags/ObjectFactory/index.html","959f2fcf2db71da05ba897b06cacb6cd"],["/tags/ObjectProvider/index.html","58dd9cb4b1a1e9b7a910870103216a70"],["/tags/Resource/index.html","38d7a05e99001c448c32a65cac9981d0"],["/tags/Scope/index.html","60b549b7d798e6f7b41934e0c3f3b0c6"],["/tags/Spring-AOP/index.html","129fed138673bd8ace72e7696ec2fe3f"],["/tags/Spring-Boot-CLI/index.html","ec8108a0a2e416a8535c48a91b8dcce1"],["/tags/Spring-Boot/index.html","a0b865b146f01cc4acfa51364a54284f"],["/tags/Spring-Boot/page/2/index.html","e8bf708096885aac2f2db157ebf96edd"],["/tags/Spring/index.html","ba0c297c807cf153d02a60fa55c83ed6"],["/tags/Stream/index.html","23e4c1fe45fb196e3b089deb25f1009b"],["/tags/activiti/index.html","7fe44c92294c2b737c27e3744c88c37e"],["/tags/alter-user/index.html","a7420e5750b2b2e0a6b2dd95771c79b8"],["/tags/angularjs/index.html","e625cb58a118db1fe8eb5ed8d79ad633"],["/tags/attr/index.html","b3559245a4767d9f35cdf4b77141ea09"],["/tags/build-tool-plugin/index.html","f0d62146b00be59dd7adc7c5560de909"],["/tags/check/index.html","f32eccdff475da2fb6c51c3ba6b2db05"],["/tags/class/index.html","8305db878666c75c2a52996c469cd905"],["/tags/cron/index.html","3012752e475191efd861766f895922c8"],["/tags/csv/index.html","89ac058d6f854249ab86ec9b941feb19"],["/tags/dubbo/index.html","19b5e3c30502181a432c2aba30d83590"],["/tags/encodeURI/index.html","9375dd867dee9ab85426a8a30143fb61"],["/tags/encodeURIComponent/index.html","4cc6e4b3e975a0b44ce4b8c3c4fabb8b"],["/tags/feign/index.html","e9f6f4c46b6477d6c94f7c29ac4e8ed8"],["/tags/hexo/index.html","9be03ea310faf35d218d4e2c8f52cdbe"],["/tags/httpclient4/index.html","2e15987be5f0bd2f768643db879915c7"],["/tags/index.html","4bb26c8a5d8801ec3845b518888ebb90"],["/tags/java/index.html","fa833f3e077c8e1656459fe741ff67dc"],["/tags/jpa/index.html","94c9810f8c32bb3ed088f9f185ac0799"],["/tags/jquery/index.html","afd3ac305edfbf18e4908d3f2d05bde2"],["/tags/jrebel/index.html","3ec40eec3beafc47086ac8736356e64b"],["/tags/maven/index.html","6fa8535162612fa04960c381ffa633a8"],["/tags/my-jpa/index.html","317b893466682297740d0a53d349e180"],["/tags/mysql/index.html","5a53a9a34eecf3bb4f624a8ed3c00f0c"],["/tags/opencsv/index.html","6051e0c14bde450ac2977fc0b7a891ff"],["/tags/prop/index.html","43607d48619c9f262184cd337a83ca13"],["/tags/quartz/index.html","484e4bbe72bf707187d3ffa61d837be4"],["/tags/restfull/index.html","f7868195b3cb10db9cf962bdb2c2e5b0"],["/tags/schemaZip/index.html","c01b5c33e34f9538887f171f6341f006"],["/tags/spring-cloud/index.html","1a370659a799e1763ff14ae98a8750a4"],["/tags/table/index.html","8ce9f82b68afb50814081d2240b3afd5"],["/tags/test/index.html","7838c22c60193f1557a15f9e67e3b01c"],["/tags/vm/index.html","a53807165a6dfb1f423abca631b5f5d8"],["/tags/乱码/index.html","8800cb59efb6393417642e0b402078ac"],["/tags/云/index.html","106c5784a535690e69256d98263e876f"],["/tags/依赖/index.html","10b6e1bf63dc9b719981710dd2da64d8"],["/tags/初始化/index.html","e9406db27d75a8c6e4d8ddbc0a5eb8e7"],["/tags/吃货，媳妇儿/index.html","5ed2aebc27bcde3d5e0a6347bdc22d67"],["/tags/同步/index.html","32adf596ddfd8c5cd324566c5ccca94e"],["/tags/启动检查/index.html","2747f633cb0ca72e67748eff546db945"],["/tags/命名空间/index.html","00c1c5a8e73b00d04099453cf11519be"],["/tags/媳妇儿/index.html","e2ca8c67028ea7120b24923a0bd3b210"],["/tags/媳妇儿，梦/index.html","18fac73fe9747c18d635f01d50011b4a"],["/tags/学习/index.html","732299ebf38970d04c01fd9b71a135dc"],["/tags/工作记录/index.html","55b73d0238f4c9f96bab2b7cee56928c"],["/tags/年会/index.html","73a66f758eb77995756f8acfce5ac330"],["/tags/异常/index.html","c009f0073d3fb7767eceedc478595782"],["/tags/异步/index.html","ef78e5384003ef58a72a2db758be0619"],["/tags/方法/index.html","cdc7d397b1c1d27ed419c988bb495ca6"],["/tags/样式/index.html","4efc8bc57dd0242431efb04d3b9ad5af"],["/tags/桥接/index.html","c4966f024ed1b92b36dd0b554c16f81b"],["/tags/梦/index.html","4385b286c05841436e67c36bd94ec21d"],["/tags/梦，媳妇儿/index.html","b2601088c2ba2770f52ab3ae271ab386"],["/tags/母亲节/index.html","a6e5bedd9672391738648e7140f9266a"],["/tags/注册/index.html","3e7902860086f3bd5a0539b783cb7a59"],["/tags/源码/index.html","6cff109ee3d96cd27b74df3769a420fc"],["/tags/特性/index.html","292d034954e08c68df1690910e997c0f"],["/tags/生产/index.html","b417fde6285dfe750a5f013ace383dfa"],["/tags/直连提供者/index.html","b78b96428f6c4e47d85006514c368a56"],["/tags/硬盘/index.html","d00d52abcd3a834ed0848262ba22765e"],["/tags/类型转换/index.html","b8e68726ead0a1845eb240e186256008"],["/tags/编码/index.html","e4d4f5716ff4fa16e08c14b699ad8a53"],["/tags/自定义/index.html","f8eba8e72db390ab819905a5d69d7523"],["/tags/解析/index.html","51d52f8e5dfde5bdafa51100eb29d236"],["/tags/订阅/index.html","bb6b04e9e4881c61cbdf47eb81c780f6"],["/tags/负载均衡/index.html","3ced663d46680d1594d418ec1d035b07"],["/tags/部署/index.html","60f573c92e2865ae60a0369e7d08474d"],["/tags/配置/index.html","ff444b5b4b4992cb3d9da3b5e99a9c5b"],["/tags/错误/index.html","2bca1a6af49292a2112c012762a427b5"],["/tags/错误记录/index.html","b4015ba411f537aed77944f064a3621e"],["/tags/阻塞/index.html","5addf0eea5c6ba05a1bad7db93a50273"],["/tags/附录/index.html","049f3cfd5c69c46557d4f4560953dd1f"],["/tags/集群/index.html","c9f6f4784edf8a9900cbc4fa7cd13acb"],["/tags/非阻塞/index.html","973087f4b300806647b6452a345b3df2"],["/tags/面试/index.html","7568af2d67a21a41e58cfbf4ad19685c"],["/tags/项目结构/index.html","565ec34dc144c1423db8ac18b141351c"],["/tags/默认方法/index.html","0ab34e0e1ec5471c9d794d58c9ab0627"]];
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




