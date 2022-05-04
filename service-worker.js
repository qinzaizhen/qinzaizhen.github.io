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

var precacheConfig = [["/404.html","bf9293a37ae85ac0699c6ac034e8206d"],["/about/index.html","5b3bcf0b0655c9d440463dc397f4cd1f"],["/categories/index.html","6501f4b3b8bb1b2b2b07ba12d7e10edb"],["/contact/index.html","f1db30d2cf358e6ab20b6a6363d660cf"],["/css/index.css","e0c6c0a92ee872ce3514997dde81f7b9"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","d8093f784bfb25c6fd57993e7d9efcd5"],["/js/main.js","4898030387012f8af71563ef8353433a"],["/js/search/algolia.js","c9af02da2fc1f7d634843f61536369d1"],["/js/search/local-search.js","c33665b06edc70004a016ba9db4205b4"],["/js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["/js/utils.js","f91ea1a86a5c45e344a24fb437642f36"],["/link/index.html","52c7d319bdb3c30361e3a95ed5e98d15"],["/login/index.html","3027c5b7736d0591272662642469b4c7"],["/page/2/index.html","19d9d8b585cdbc0c6082bd4f0c282bbe"],["/page/3/index.html","a68e369a2be41b4c60921ee0ca82a6f0"],["/page/4/index.html","0c23de67e0118adc2fa7ebd0775c4c7a"],["/page/5/index.html","56250d6a12793b211788fbad4e9823c5"],["/page/6/index.html","17c1c2f1e4a36e85f694005078b06529"],["/page/7/index.html","e97be06c769349ffab8ddcab9bcb5f35"],["/page/8/index.html","a38560136725af7e13eb56e00ab58f7f"],["/page/9/index.html","b3c54ab885d00029e8c5ffb3e8c80eed"],["/post/14/index.html","9e83e4b384763fcb21706ecc17af4bbb"],["/post/14f5/index.html","c81121ca178a81be15be84c9302df510"],["/post/154c/index.html","d2001a0dd5dd4592f89e15d6197300a2"],["/post/172b/index.html","581eaf502c8881233eab9f4151153b9a"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","0ea76d9245b46823756a194886a2447d"],["/post/1df8/index.html","9c2e99c0a2115f49f53be38990c77639"],["/post/2011/index.html","c59b7be78867cca3caa6bcc004d0864e"],["/post/25a6/index.html","771f5ae18512c7ee7aaf1e7fb61c8794"],["/post/2746/index.html","4a0ec6932f546eb6a95e3f3eca71db70"],["/post/2958/index.html","63f089a15352893126460e54e13da7fe"],["/post/29b6/index.html","ed81b1ca5ea11c6ba2c3a24fa9b4781b"],["/post/29bc/index.html","72596a2d4e8bf87423b2917f30f54283"],["/post/35c5/index.html","c7a6dd0a06af75e2f0c487b60940df78"],["/post/361c/index.html","9ef3ddc3e81c5ef40ff257c17d9863bf"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","37549617a189cbc4f5d5d0b0af7ee08d"],["/post/3eee/index.html","feaba4023c7e3de2479af641bbc7bec6"],["/post/4085/index.html","e9910ae19f70f9591d70ead4a04cbb63"],["/post/4406/index.html","bd23d640e535391b4b9c7609b05cac99"],["/post/45af/index.html","0a45c1e734386a59f5427c24c382c56d"],["/post/4819/index.html","e41907cc34086ddc94c94ee3e4bb2ec0"],["/post/482/index.html","8ed40024dbcd748f0cd186ec0226652f"],["/post/4b65/index.html","050fed58a4265a59220a93ccdc4dd479"],["/post/4c63/index.html","edc87cb6311e83558b8a9dbaa212a97f"],["/post/4e8e/index.html","ee41f0bbe712373977f70a05cf94003b"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","7a68183aaf3b8cee185517b2586e0563"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","177f047ad6af5a4c432b8ca64f216c67"],["/post/5123/index.html","1a59619ffc7ce261b98493fcf6788996"],["/post/53da/index.html","29cd4481d6598de3f9f62475c4906aa3"],["/post/56c9/index.html","185aa502434a009d4bcfcfc9a322a945"],["/post/5e2/index.html","7d02e081dee80bfbee494f331b9ef730"],["/post/60cf/index.html","10d6551832914b68b9bcb38d33a9b819"],["/post/647e/index.html","669dad7e4e81b81401c8acfc1c7d0577"],["/post/64fe/index.html","037b16316646c2c64ded3c8bfac9aea5"],["/post/6749/index.html","9fa44fc029d1d3a8c518206426e459b9"],["/post/6917/index.html","085d721c00f72a8b163c1c5a4aada628"],["/post/6b4e/index.html","fcde81c3d345fd99ea74ad45bb4473af"],["/post/71fe/index.html","c302b19397747f5445db4445f235c75a"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","e7a095e9c01d0d48fca777dbb0ab7fe1"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","ffb8f563974b272ebb139300b9fc5be9"],["/post/743/index.html","20b270b045560354749366b42351e88b"],["/post/7521/index.html","2ea39b4e97038c99c333328995383e42"],["/post/75b6/index.html","75079e7d8c3e2a6be2beb110784e3175"],["/post/794f/index.html","d0850ff955ad6edc8789f7019b574959"],["/post/821c/index.html","9f279b57c14b31a51519479b49dfcc98"],["/post/8b63/index.html","cb2643a95909d32de99790f383df4e5f"],["/post/977d/index.html","cc110f89cdad2a8858a3de52660276f8"],["/post/9a42/index.html","dba09e66be01597e34ee151b744a66f3"],["/post/9bbe/index.html","8b9f414fb6fd4ce4d853f6012a188da5"],["/post/9dc2/index.html","6a7e121333d2f26f1d34736792096001"],["/post/9fb/index.html","0a5297f363914ac51a11fd8b7c93da07"],["/post/a15d/index.html","5adb6cc526aafbc9c958f82cfd043943"],["/post/a7d9/index.html","7df49a6d538af8ae4540934acb39cca8"],["/post/a9cd/index.html","39117e357a5c5ab4d30cd071e29a2790"],["/post/b2e0/index.html","cc312351516ed9527412becf6d8d9573"],["/post/b3b1/index.html","07bd42dbbdbb08e040069041a76e3dd5"],["/post/b5b5/index.html","a880203919beb41e889af54e326227b3"],["/post/b6a/index.html","36976b68d037440b5126cdbf26d42a1b"],["/post/beda/index.html","ecf6bba01e7111f27b2973d0535a1907"],["/post/bee5/index.html","93206a5cf53b9296a9de47a246fd367f"],["/post/c1b3/index.html","af96491fd93ef0eaef4167642b367ade"],["/post/c4c9/index.html","35a394f1a5ff6939b178c76e49cf3fa4"],["/post/c5d6/index.html","7661b6d3447587046fc447a5aba7b427"],["/post/ca2e/index.html","9018762cd6f1a171348264253f47d568"],["/post/cc21/index.html","657e056edc30df42c956dfe1ad339cb4"],["/post/d1f6/index.html","7f807ee29ea146e2f4578538889fb7ed"],["/post/d419/index.html","cb0a60b8c3f148eeaf6f7362c9272f78"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","fd8bb5ece635449473fcc92414aec759"],["/post/dbef/index.html","118c99b1ed3158af2e9048be66e3c2ff"],["/post/dc62/index.html","6ec7cb98bfdccc8fd42f82d6dd18f931"],["/post/e1f9/index.html","55774bb7ddab680aa9f592a45b6780c1"],["/post/e2d8/index.html","564664b9d7cf2d901bfe266d2ebd54ab"],["/post/e377/index.html","3e1a65bc22ac8474cb8c71e32b288328"],["/post/e88/index.html","d91495fbeaa7c5ce829ec69ac15aff6c"],["/post/ec4d/index.html","bf2b121c1e3d166361a75d19e15b9480"],["/post/f34a/index.html","cf29fe2404db13231ff5f0d787a57d8a"],["/post/f5fa/index.html","dd22da2a89eca43b9a5fb9b67d38c339"],["/post/f93d/index.html","f128daec5c86c08ac9d3fceb20498082"],["/post/fba8/index.html","fb7f4820674962ced559ed3514b77d8d"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","2abeabb170f5e2b749314f01f7c29767"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","1e3344b9e0609077d9874308b222ec51"],["/post/undefined/index.html","1243321b39e8850e84c6499d5a76cc39"],["/projects/index.html","35bf5be049245f416a20c19a69c07505"],["/tags/AIO/index.html","58d3e581cb46bc6323a2917abcbf4801"],["/tags/AOP/index.html","bdcb39add8811bf7925c863534a0fb39"],["/tags/ApplicationContext/index.html","1ec79fa50986d73ab0c02da318481ee5"],["/tags/BIO/index.html","343d9e546c2f59b468c27b16a2e148b9"],["/tags/Bean/index.html","1260b8158ad9304dd14e3c0dfa1d61e7"],["/tags/BeanFactory/index.html","d96e5534be3deee70711fde166aabe82"],["/tags/BeanWrapper/index.html","fa78d968b0b2e0958207b7bc29ef2946"],["/tags/CLI/index.html","8d5037bac381d593974b16a73eea55eb"],["/tags/CompletableFuture/index.html","d08f8c240a0f45fe3135aeb8fc9ae16a"],["/tags/ConversionService/index.html","099bff22405bfd63a3bcd8f954ab032e"],["/tags/Converter/index.html","32c18546f8a6f193446f9cef36238fae"],["/tags/EndpointId/index.html","a22f1744b04a3fa184385f08fbe471c9"],["/tags/FactoryBean/index.html","89c8d0ebdd7ca85e40f75298b97af50a"],["/tags/Formatter/index.html","0e4daaf8a65b3751bec4f21ec96cf0e6"],["/tags/How-to/index.html","a7c581879a9493fdbd0f1f66ba043ab7"],["/tags/IO/index.html","528d99e6137d99a2dd5480b8d92541b8"],["/tags/Idea/index.html","9ff06ac91060b7187ab3975129f3eea4"],["/tags/JUnit/index.html","78b0346af398afa6c1e18b5724228eee"],["/tags/Java8/index.html","8c36b9f337714bd17e346a0ec8d691c3"],["/tags/MvcEndpointUtil/index.html","ba46aa7731962c767303655bc1f8c25c"],["/tags/NIO/index.html","1b3660dbc51f7445e49d01ed8a1ad72e"],["/tags/NamespaceHandler/index.html","b76c9e3ead7f1d5bc56db8cec12a4126"],["/tags/ObjectFactory/index.html","453e066f19a61c085546bec98ab6dd5e"],["/tags/ObjectProvider/index.html","b66e7f050427556427e89c64b121fa78"],["/tags/Resource/index.html","9e4b2390b71339661d04592708a009dd"],["/tags/Scope/index.html","4c5192edc32675ac17c6f3c19b298f2c"],["/tags/Spring-AOP/index.html","6fe2c3fff2e62ef906171dfae8f08a46"],["/tags/Spring-Boot-CLI/index.html","aac5c20ea687b3c26b01ac588bd982dd"],["/tags/Spring-Boot/index.html","86724d255f7c561b7c7500d4a7ed96f2"],["/tags/Spring-Boot/page/2/index.html","561ffbca203e4a7366820976568b979e"],["/tags/Spring/index.html","01e147ee57979de5c1af8b22c729f350"],["/tags/Stream/index.html","27b03f6b8bf32e44873d70d4aab1967c"],["/tags/activiti/index.html","662762ee43e81e09ba9dfed450f34f0a"],["/tags/alter-user/index.html","0d43aef5721feb64134e1d8a703ca6f7"],["/tags/angularjs/index.html","10999c2706bfb9e26432944ff4d24041"],["/tags/attr/index.html","b907f01d89372d21ab2c5edd98bf574b"],["/tags/build-tool-plugin/index.html","97da9e8a6ff5e1a6eb0ec0a12fa7e7e5"],["/tags/check/index.html","33c1d44e1325ca776e2b7b21e5e90140"],["/tags/class/index.html","2c14ea6c2fc41fb92dee4e6eef879015"],["/tags/cron/index.html","c50de37b8550be42a4ca7214c5559754"],["/tags/csv/index.html","7ec9cbae9443e280ff43e03b287bd486"],["/tags/dubbo/index.html","c14070ddf5f16603492c01ac30762b1e"],["/tags/encodeURI/index.html","78c3c8fdae807e0e95c4ac364b69be0a"],["/tags/encodeURIComponent/index.html","f0e200965392ddbdb5ce56a722d69b67"],["/tags/feign/index.html","8bd64c9dc6a217932864d3cf881c3546"],["/tags/hexo/index.html","e83f8dcfc0e1763c3280c59b5b4956c0"],["/tags/httpclient4/index.html","cde7d1825c66c4492b53dd053041b8f0"],["/tags/index.html","5b76aaf7be12f9bcfeac1b20e020f5e4"],["/tags/java/index.html","d224af9ad1d62b28bce29f9df9b54a70"],["/tags/jpa/index.html","65c17e7ac8c54ddb0b4d650a967b5d98"],["/tags/jquery/index.html","8965cd901b683dd5edc5f5d518a1f65d"],["/tags/jrebel/index.html","1310c141cbfcfdcad91f28ce97b784d6"],["/tags/maven/index.html","bb47995e92461875afffb0a772bc2975"],["/tags/my-jpa/index.html","19f2f538e2b5984999b90180b2a2c891"],["/tags/mysql/index.html","f3800be6a8e5aed7ead0cd5de619b8e6"],["/tags/opencsv/index.html","631b0a4e5ea576bd898a43b7a4c76c95"],["/tags/prop/index.html","7d1704e2338f42e0e80e6e91f5d5c441"],["/tags/quartz/index.html","52d6e7223369e986c5404ecf65005d1a"],["/tags/restfull/index.html","867eb6c040e03ac767658d74a2b9478b"],["/tags/schemaZip/index.html","b05fcdd18816f4d5b798ce057c708cbb"],["/tags/spring-cloud/index.html","246f1196bbc8a4f5ef9252fd84838d4a"],["/tags/table/index.html","61802224cc33805b3313c6c95bbe4391"],["/tags/test/index.html","1f4fda3df76dd5cf1f2d7f95a3b4aab9"],["/tags/vm/index.html","8be64c1ba91aa0e0190ccbde687e2faf"],["/tags/乱码/index.html","1bd200bbb842fde48c589dcb8f9d2002"],["/tags/云/index.html","cfc6524e8daf96c5970942878be87545"],["/tags/依赖/index.html","29ae7e7796bcdb667cacb2dc9ef158b8"],["/tags/初始化/index.html","81b996b4fc6d4fdb45d1d3dbd1309720"],["/tags/吃货，媳妇儿/index.html","b2652299cce6418f9b6a2f614c4d5e05"],["/tags/同步/index.html","b5434c79c760ea1d5165c00069f0738c"],["/tags/启动检查/index.html","260ba13582653ed17c9f64092af95706"],["/tags/命名空间/index.html","3cc8412605f360def90433fcd06cffec"],["/tags/媳妇儿/index.html","377eaa964b1e962b71ce3da462c4852b"],["/tags/媳妇儿，梦/index.html","a55b49b9a15d95b2e939fa6cbb641dcc"],["/tags/学习/index.html","fd32c9082426db32dd2bef1786617cab"],["/tags/工作记录/index.html","c3b8a31152d66dc1b725108e33bb3aaa"],["/tags/年会/index.html","fdd6c634fba5fb83c99809e61cefd87c"],["/tags/异常/index.html","9b4d98fd5cfc7bfd9362d6c591521886"],["/tags/异步/index.html","45e4e524ef744fe46c1c415c82178638"],["/tags/方法/index.html","e5bbf135765bf3bec757d9f3c6fc468b"],["/tags/样式/index.html","9d3909a75871fbbea4968511cf536367"],["/tags/桥接/index.html","1e31607d2576ad63092bc1280962183a"],["/tags/梦/index.html","a52da4c147eed2f658ff5d4082ac6b39"],["/tags/梦，媳妇儿/index.html","e89ff88c4731b8bd2544b52f826a4dd5"],["/tags/母亲节/index.html","6ba83170acb26c88511070f2c74def0a"],["/tags/注册/index.html","beefab62e8039790e7c7b0d73221cb6c"],["/tags/源码/index.html","cd8579d99b4ef61e065b72ab54f334e0"],["/tags/特性/index.html","dbc01abd98969ce18683daa1b142e565"],["/tags/生产/index.html","293373ad18e92b248c9461a0077c7e69"],["/tags/直连提供者/index.html","d90444d9e7a5215db703b89450955bf9"],["/tags/硬盘/index.html","4e543ced92fdceb1874d2bb4fadf5555"],["/tags/类型转换/index.html","96f10c532206b55da3a0e62c47fd0631"],["/tags/编码/index.html","4f85755798a85c8bad9e005c5f8acec8"],["/tags/自定义/index.html","231168089a40ffebe96542f32ad6764c"],["/tags/解析/index.html","a0d7c7fd21ada45f0c753d7c5416824e"],["/tags/订阅/index.html","ba7963c46c2d96c2d40f0ed940d299a1"],["/tags/负载均衡/index.html","bec1c9e9cc21b8603369877e2199b8a4"],["/tags/部署/index.html","0a496918ff130862252b7f9a05a7ee7f"],["/tags/配置/index.html","055d8a2eb8cf1cb3c81162d725847704"],["/tags/错误/index.html","054c053ff22aacf47410edb70d845957"],["/tags/错误记录/index.html","37664a39d9b84415dd73c089870ed3bd"],["/tags/阻塞/index.html","7aea5939d97d36021d5b7cb6fe816ab3"],["/tags/附录/index.html","e536d45deb62cb300819cd98f40d00f0"],["/tags/集群/index.html","0502cfd6c0a6e51e7752bd9cdfcdf26c"],["/tags/非阻塞/index.html","f0e5631728940f2c45a3149faab1133e"],["/tags/面试/index.html","98d85eeacc94241ec7ac47ad69b0ae27"],["/tags/项目结构/index.html","a00d6ec450034d7a471e4aec292fdb3a"],["/tags/默认方法/index.html","f2427990f49f05d7d7fcaa9f0af8513b"]];
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




