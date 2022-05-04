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

var precacheConfig = [["/404.html","1f00f15649ed80ab0bb47a71f6943260"],["/about/index.html","412e0c16a90c76b4328ab212cd001aae"],["/categories/index.html","261106dc1af81a2891857ea37bcbc8cf"],["/contact/index.html","c63b493c219053539b5023e20ab0aeb0"],["/css/index.css","e0c6c0a92ee872ce3514997dde81f7b9"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/index.html","86962fe137169191972d5cfbf929502a"],["/js/main.js","4898030387012f8af71563ef8353433a"],["/js/search/algolia.js","c9af02da2fc1f7d634843f61536369d1"],["/js/search/local-search.js","c33665b06edc70004a016ba9db4205b4"],["/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["/js/third-party/canvas-nest.js","6bebed368a1bbcb630dd146cefb103b7"],["/js/third-party/canvas-ribbon.js","4ca518354a167db9fe0869c0982ff215"],["/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["/js/third-party/fireworks.js","64d1e1837ad1a585888f5d1e16c71f77"],["/js/third-party/piao.js","5c8c9ff4bb9bed49e333387a54eae9be"],["/js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["/js/utils.js","f91ea1a86a5c45e344a24fb437642f36"],["/link/index.html","5d6f8725cfc8ebe4fe642c3dc0ff8e50"],["/login/index.html","2be9bbe41aef144442a868a8b21934bf"],["/page/2/index.html","5b064b4ffb4021ff7e44d33226dd8a08"],["/page/3/index.html","f6561039c65ac94f518578b405d80f37"],["/page/4/index.html","0e0ef5a0cb3fc1383b0cd059acba01d6"],["/page/5/index.html","f143277f3cb2c2540fc4f1624a353cf9"],["/page/6/index.html","9853b3226b2f1fbe1f8a40e673be68f9"],["/page/7/index.html","9cfbe54a0baa124c340287c96ea0cce2"],["/page/8/index.html","7d2a3c97026079b027a6b263ffb15f63"],["/page/9/index.html","6b4b6f1c5f2b4a87930e4d6e2ce127d2"],["/post/14/index.html","36b5306a13f2ff6c7aa9139d4889b0f6"],["/post/14f5/index.html","eefa9da0d96af34510abd875a8e82027"],["/post/154c/index.html","bd665d38824626a32c492635495c32f0"],["/post/172b/index.html","f40e8f15d3bd4e4df4e46a33857e52b9"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","6534ba84c4991a77eef560992ee1a77f"],["/post/1df8/index.html","02a371b3182dd7da442d658e1d83d353"],["/post/2011/index.html","c4d3b792c7731d8d74ddd294b3f6403d"],["/post/25a6/index.html","9037fe7ee6ed245b2c7b7627e334badc"],["/post/2746/index.html","9c3b969648d6534ec0ee5518402248bb"],["/post/2958/index.html","20f2dabc8aa8a4df276d0a66d7ea780d"],["/post/29b6/index.html","488e655a8f892d035eefbd533ab90825"],["/post/29bc/index.html","3de8dbf660c76d7066f45bed548485ae"],["/post/35c5/index.html","2cf2d6da773e9bf3b46d0b16c12db32c"],["/post/361c/index.html","5865a940837eb78ef8eb277b5c2d5c5d"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","0ef4b328ef2d3bfafabf8f61bd75c7b8"],["/post/3eee/index.html","f36db85b7808929398eb81caa3170fd2"],["/post/4085/index.html","a1bbb947d77663431c46a2bfd6b7ed40"],["/post/4406/index.html","88a9d851dee0d4fca4ab70393151b57f"],["/post/45af/index.html","21d28ebcfc4e1016ab360b9c93d51450"],["/post/4819/index.html","81e76f4c87781ee912bc61c37a876a10"],["/post/482/index.html","458b58deacf93239996b36c4f6e40011"],["/post/4b65/index.html","5733cd3df698321f1ad3aed125a56fca"],["/post/4c63/index.html","c19f218232d655ade5689d9a627c7ca6"],["/post/4e8e/index.html","ea9ae70a9d2e5111a07a5344486ae069"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","3b0c098e46e141cfe659607984e53cab"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","ae6fd567d0977cb8b6706d8b6f1d9a95"],["/post/5123/index.html","d05a7fc28ce599af0294d08d45f51a44"],["/post/53da/index.html","b0f4b52299b74d186b6462d7c7a70b93"],["/post/56c9/index.html","f54d98e85c652d5e0a7e9f8043597cd8"],["/post/5e2/index.html","3be1941435a75ac45cd85444a8d075bb"],["/post/60cf/index.html","a9787ab9be94a1cf0dc2c49d1be8fa1d"],["/post/647e/index.html","b493bf0434d61fb21ae5e927d261b10f"],["/post/64fe/index.html","d42eb354e9a3ac77e088e6f722ae7d95"],["/post/6749/index.html","210bf884862ad4b577594c627d99c45f"],["/post/6917/index.html","89b3f320e9b01ec5c8f18a4fe5fe15dd"],["/post/6b4e/index.html","3ed7557505f4c9a02ba4b460dcacb3ac"],["/post/71fe/index.html","305ac67bb4927b2c6a1e460fcd30b665"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","f4dd9848bc103cda2243aeef4d054612"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","5c6673efc8259e8cbc6ed1922f80f40a"],["/post/743/index.html","1e198b115d34dddd413dbfa85fc69d94"],["/post/7521/index.html","dece82482973c536dbd18fc0397a35d1"],["/post/75b6/index.html","3165c5163bb662cddc766b8ca29b0ab0"],["/post/794f/index.html","d6d0a80d6ae8e07287495c409cfb866b"],["/post/821c/index.html","1cc00ace2b36dcdbf6ca3beff9364017"],["/post/8b63/index.html","16fc3aebf4f7bf8a77640d995d5ee573"],["/post/977d/index.html","782dfd0d8de64173b7dacdb0212d756c"],["/post/9a42/index.html","d1507d405088da935260a91c7b4861c0"],["/post/9bbe/index.html","7b0d15fabc2537c97e0b296e8cb0b95d"],["/post/9dc2/index.html","8c995d1e92a898fc9c3348b820dfb68a"],["/post/9fb/index.html","d6c3a279bdd164d590a4b3e0f3630513"],["/post/a15d/index.html","a08b8d176ec1b91f3c45712429faa93e"],["/post/a7d9/index.html","a9a41030e87dc6f1f3b8344188ce94aa"],["/post/a9cd/index.html","ad75a645d51cb91eedbae4cab9f81521"],["/post/b2e0/index.html","2be7495cfe596ec0ac93226e31dab6eb"],["/post/b3b1/index.html","86e969b525ead8513212170e0d13040a"],["/post/b5b5/index.html","9cffcce32bac00a73e727fd48ee768ed"],["/post/b6a/index.html","8386aacc040edfb5eef9950f37f973de"],["/post/beda/index.html","842a1f7f94831da9a59cdcf67975a74a"],["/post/bee5/index.html","d4c472b790c02bbc0fee9b8f4731fbd4"],["/post/c1b3/index.html","656b1f25af3eed533e31f3bb7edbcf5c"],["/post/c4c9/index.html","df534b66f41d4e8f5b5878af0e07659c"],["/post/c5d6/index.html","8ada50ce67540a4873423a3343970cf1"],["/post/ca2e/index.html","1671df43dc7f218bee3bddb4588af705"],["/post/cc21/index.html","fb9592349f4405b188df569c4170858d"],["/post/d1f6/index.html","ab4d6e59251af50e524288de2368a813"],["/post/d419/index.html","6229e5ee19d90609571023c7b3fb7599"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","e3e76517ed6fc4fca1f8afa72afd59d1"],["/post/dbef/index.html","d5954a53e34c416cf2b054f7cc2f7e08"],["/post/dc62/index.html","80152bbf18f7fb5adc5b42af993ef691"],["/post/e1f9/index.html","df6972e6c20307816a23797c9c8e1aa4"],["/post/e2d8/index.html","502b2b7c7ca92b91543aac3f53bb935e"],["/post/e377/index.html","8afb44826b485b56411ea5c3fb1757de"],["/post/e88/index.html","eb9480e421bdbe72e608be5b43780e0a"],["/post/ec4d/index.html","97a34f156eb3df67fb833cf7b35cd44c"],["/post/f34a/index.html","82810e1425b7b3c8fbb551941b57681e"],["/post/f5fa/index.html","66a15a2479b1fa29d752c5b688bcc78b"],["/post/f93d/index.html","fa9f054b14b5cfd5eae74ab76e210665"],["/post/fba8/index.html","331ca7644ea81bd9ec0d2092d18b6985"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","cafed607fa57d00e8370d90cae56d1ca"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","6f91820cd3d856d4309846a478220526"],["/post/undefined/index.html","f89b4c4610dd891ad25fa2a1fe30c9e2"],["/projects/index.html","561e696b81bf03b0944384e56105e49f"],["/tags/AIO/index.html","4214060e52c31f205786fe92716f28a6"],["/tags/AOP/index.html","6620cc0ee561b543a3d4b8c8f823c5ad"],["/tags/ApplicationContext/index.html","d54fea13da0c0e34555fc274f3778f49"],["/tags/BIO/index.html","14f3898ee50aad539200deda7485a447"],["/tags/Bean/index.html","e975a246f04e9a3bea6a9b0d8b83a1c8"],["/tags/BeanFactory/index.html","283f6f375467b068352956cfdbfa0198"],["/tags/BeanWrapper/index.html","05f5653f1bd5d57f086671e2338a2dec"],["/tags/CLI/index.html","916f031b3f103de5a3ce007a6379699c"],["/tags/CompletableFuture/index.html","0cf67253015fb65c1775643362462ac6"],["/tags/ConversionService/index.html","755b87b1471a5fa60fffdb686b3fd96b"],["/tags/Converter/index.html","686a3a0dc72dddfaa934a23f5631c3fd"],["/tags/EndpointId/index.html","3de78fe32095c3138d01c59b45a81fc5"],["/tags/FactoryBean/index.html","914665b6e78ba4530aacfaa37c33821b"],["/tags/Formatter/index.html","7661eee98ce794ef8d678e431b6fced2"],["/tags/How-to/index.html","021222167176356c404769f6ae735a61"],["/tags/IO/index.html","3654aba86e514cf3e670f11a43553a73"],["/tags/Idea/index.html","0a5a70c45b1089dfba0b146e1a6f56aa"],["/tags/JUnit/index.html","8678f70628b75182aa2fdb1bd16f1440"],["/tags/Java8/index.html","8380431349f695c757272f4d81243534"],["/tags/MvcEndpointUtil/index.html","110b308374d351e95a72eb50110defb2"],["/tags/NIO/index.html","8a988cf41e2f693c5fbb4c8b07d9503e"],["/tags/NamespaceHandler/index.html","164e2773141693dcfb3304d7fefee5b0"],["/tags/ObjectFactory/index.html","d1d3e5f030a3426bb8614b80e4f3f931"],["/tags/ObjectProvider/index.html","eb4d354cbed2c964608fc73593125b7c"],["/tags/Resource/index.html","00e855760b48c9941a3ecff2d59fb938"],["/tags/Scope/index.html","ff3e0b2f3b932a92cce35411400e0569"],["/tags/Spring-AOP/index.html","56f79d635fce936394a5c8dc286ddec4"],["/tags/Spring-Boot-CLI/index.html","7c6629aa5a96b2cf3ffec985d2a5237b"],["/tags/Spring-Boot/index.html","64e90451f30379a78d8be400c01bb1db"],["/tags/Spring-Boot/page/2/index.html","0ef010952ff1be1a48b4c9a426f1b1d1"],["/tags/Spring/index.html","adce4261e51f3b3b78b8291268689cb8"],["/tags/Stream/index.html","cdb126c7a374c9f719be88940454a740"],["/tags/activiti/index.html","60b849782bd9f5dbc3e1affbd915fdb6"],["/tags/alter-user/index.html","d3f70b1dfa2c4d9ae654dea665d51d5f"],["/tags/angularjs/index.html","4590dd6c6216d1e064ddc5fc0db19870"],["/tags/attr/index.html","e3597bfb2395079d081b9faa19f485ac"],["/tags/build-tool-plugin/index.html","8685295e694ffc2a9f49129dd83b6635"],["/tags/check/index.html","73fdc4370e59677eaebd368d9e54742c"],["/tags/class/index.html","ca783f36291fd2507731464268cb7bef"],["/tags/cron/index.html","d34af192d070619faf5548c6aa2c0f2f"],["/tags/csv/index.html","7ae41d14689d8cff179298c45c08a957"],["/tags/dubbo/index.html","cb05397b8ce6add2b080cfbe624c8d81"],["/tags/encodeURI/index.html","3f113e8cac3ea4d3a33df1936e6ecdf3"],["/tags/encodeURIComponent/index.html","2741bf4974d0db937f95fd4d3d3d0940"],["/tags/feign/index.html","b555eb573fec118162764f1a89353089"],["/tags/hexo/index.html","a73950761e8e6d6ae401f479b93cc44a"],["/tags/httpclient4/index.html","52b4bb4e313178bfb47e40ea474725ec"],["/tags/index.html","2827ead493526ae0d3eb22dccbafbbf8"],["/tags/java/index.html","aca70f2a3dca6a3aeeff482ec31b21d6"],["/tags/jpa/index.html","23ee8b3ea362741b1127eb92f4872bb8"],["/tags/jquery/index.html","1b2ff1fd3f36893cd3c3287b48ddc22c"],["/tags/jrebel/index.html","5a8432a11315a0bbd20124a491a1a3a4"],["/tags/maven/index.html","644fa25d64e743b70dd98f06dac5101e"],["/tags/my-jpa/index.html","ada0a3c3023d610ad3f12531e0646288"],["/tags/mysql/index.html","a93329d4ab44258c31739cbe37dba6d4"],["/tags/opencsv/index.html","db7034b41bdaa32c81c21fe512a327ee"],["/tags/prop/index.html","bc46818203c403349362d21bb0236704"],["/tags/quartz/index.html","5679957fe3a7979be2b67503ab293957"],["/tags/restfull/index.html","410bc3f1bdda71b3ba43f0f28de2f2fb"],["/tags/schemaZip/index.html","095d89fa7f00d48a56afdf69579e5664"],["/tags/spring-cloud/index.html","eb2cebf50b49536466848242b02f794e"],["/tags/table/index.html","9eecce7ade8f3e6b03382a8424d0f1c9"],["/tags/test/index.html","a2572894a27425abd8da1072b86ede6a"],["/tags/vm/index.html","5679ba8b043985e8f620d16dd8f3e263"],["/tags/乱码/index.html","1ea4726c7f973fd7376bdc035fb411f5"],["/tags/云/index.html","2756023339027978294551a8c01d5845"],["/tags/依赖/index.html","06ab281d0af253c70b68a3e06d670c5b"],["/tags/初始化/index.html","eb77c6284d4d1f6616a450445c02db31"],["/tags/吃货，媳妇儿/index.html","6b1884663033c8a3b81139867f62a384"],["/tags/同步/index.html","f1210496d286b02925051b0438c05678"],["/tags/启动检查/index.html","068eadc010a8860f1ea4ec1725cd5ff6"],["/tags/命名空间/index.html","e5fde1fdd9e0d91dd75aeb463af3db4e"],["/tags/媳妇儿/index.html","6a84868f41a511271cd9a43a6d8e50b8"],["/tags/媳妇儿，梦/index.html","76b05419be540c537d7f5c8d92d58fd8"],["/tags/学习/index.html","c3b601b3c572ad04256ff793a2c6aff2"],["/tags/工作记录/index.html","6bdd3138726a73c93304a06a143cdac0"],["/tags/年会/index.html","d9f60af7fae4a7d88bdba9b22dde287a"],["/tags/异常/index.html","eb4314d9644ac79881b4c0b2a50595d4"],["/tags/异步/index.html","4ac437f95d42a1ce338c24fd56f801f6"],["/tags/方法/index.html","ae484b6dbcb93dc59a6ad9011da41f37"],["/tags/样式/index.html","a4a841c242c18254a7415d430876337f"],["/tags/桥接/index.html","24d93fe51899b73dd89c9e35f80f4b44"],["/tags/梦/index.html","7f58d8cfe5cb43b55c57b995c00c550e"],["/tags/梦，媳妇儿/index.html","00e312eb9274983a2fd091197d0548a5"],["/tags/母亲节/index.html","c85b8d7fcea8c422fad15a943ab0f32f"],["/tags/注册/index.html","1f155f766281e938a58d99f8955c025f"],["/tags/源码/index.html","9e0dfcb173af3c194c5532c8048e2584"],["/tags/特性/index.html","bfcd500346ea5fd4120acb87f1b3a632"],["/tags/生产/index.html","0ee257b9dc76b6d2592bc18dcfb2de82"],["/tags/直连提供者/index.html","1416e1b034bed7ec7b10cca0689d3126"],["/tags/硬盘/index.html","6bc3f127475c2bd96ad9d6497d7c9599"],["/tags/类型转换/index.html","4ed58f8ab11f82709d37b17500cdd2b6"],["/tags/编码/index.html","622bdf918170bf526c439cf5906dbc2c"],["/tags/自定义/index.html","a528286d48253054a28117d07112de91"],["/tags/解析/index.html","9b39b6c46659852923bf5f42fe4a7bc8"],["/tags/订阅/index.html","67988b6f8d6e45c790fa986fa647c981"],["/tags/负载均衡/index.html","8d624fe20d79e81068b77ada20641cdb"],["/tags/部署/index.html","bbe5babec80d394944ca1b4e25a74d3c"],["/tags/配置/index.html","0be45ffeacad9644f9b9dc75fc019d8c"],["/tags/错误/index.html","e9acd7b398af66fd5469f6f8fbd1a051"],["/tags/错误记录/index.html","a6aa64bbe84fa431e52960941d860dda"],["/tags/阻塞/index.html","573f236631a112c2f6d0312511a3e611"],["/tags/附录/index.html","a1550d29a44a0ed1f7b8a2d54c5588ac"],["/tags/集群/index.html","ec01c5df7e621a390c045e6c65d0bfcc"],["/tags/非阻塞/index.html","6617f97929b0029fe2d7894fe2d482e8"],["/tags/面试/index.html","2813897a05210442057e2021e88203ed"],["/tags/项目结构/index.html","a97e3174f0794e694b210d7e710febde"],["/tags/默认方法/index.html","d92f41cb61b017b9816191c33fe1b121"]];
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




