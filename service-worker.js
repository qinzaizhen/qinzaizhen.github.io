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

var precacheConfig = [["/404.html","19404b197bd6e462e4cf19af8d51439a"],["/about/index.html","23e61c1280db94b6e3fba75a0a986f6d"],["/categories/index.html","a23b3e9ed6504ef2d54e92ff0d069eed"],["/contact/index.html","aebe135ad02c917c2a88de96465c10c8"],["/css/index.css","c99d86d0f99b6dd9f7c350566d381fbd"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/avatar.webp","4e09f949bf507c9af49f601a081b2fb1"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","05efd114001bae414441f0cb48b6c8d7"],["/js/main.js","c2d6628801fd2dc0ea1739901cf5d99b"],["/js/search/algolia.js","af567f93a5504310fe16fe368a4ee89e"],["/js/search/local-search.js","149fcc60c1de0a818e111978d01cbd87"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","24971090b8b1bd5d3f538d414e270fd3"],["/link/index.html","144c5db579d6cce7a5975193c94f15fa"],["/login/index.html","2be37ed7f4ebf59cd1fceaa1bb519f21"],["/page/2/index.html","3c9ccde730a5a517a68850796299df0e"],["/page/3/index.html","229b75d8a714262a25c1f7bfe9451dbf"],["/page/4/index.html","bac93253328d28f469066261c58af15d"],["/page/5/index.html","d83f705af7101f5d46cc4cb3171a3335"],["/page/6/index.html","3c500e94032ad80526a58ad810f1ff7b"],["/page/7/index.html","3afeede66f0d5716753a860442478322"],["/page/8/index.html","446914c3bc97a0936975402ed6723f4c"],["/page/9/index.html","07d35181e11ba6135bc494ca5b641f4e"],["/post/14/index.html","4604405f14a12acfb79cbc991642f0bb"],["/post/14f5/index.html","49a672ec6e3bc9ee2b197df90afcc25e"],["/post/154c/index.html","23d4a0b75027b1513b021a4e3460a813"],["/post/172b/index.html","10ed68f7e9ac90851ecec59f63d660ca"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","95a4e62b9b3f94594630dd1f0dce5efb"],["/post/1df8/index.html","420ea484b084985d601a9c79e2f459a8"],["/post/2011/index.html","a7c619aa60dc8ca44fb6730b2b9a8ad8"],["/post/25a6/index.html","d4b4bcbde95541371efdc964ccde5e97"],["/post/2746/index.html","175b1ea38c02f1386850c7b452322e8c"],["/post/2958/index.html","918dfd2cd31d86c3ff83c7507ef8c56f"],["/post/29b6/index.html","0459af55261e1e6484d31c2290a91e34"],["/post/29bc/index.html","f1ac77c3343fcf35f01ea92ef2f72782"],["/post/35c5/index.html","fa8bed468e07968e70420d32c9512889"],["/post/361c/index.html","fd54cdd6a3696d9bb11f19edfb81b96a"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","50db88084ea35e83c156fd37acbc6a93"],["/post/3eee/index.html","8a5e776ab25f142ac828c0ab359fcb84"],["/post/4085/index.html","23b05da58e17ec862d1acdd860c0ae59"],["/post/4406/index.html","bc0525d770fd3920b8955f05d8e6f4e8"],["/post/45af/index.html","96f2bf7d6b42a7ea1751280029f066bd"],["/post/4819/index.html","e27485a8ad7c7661c6e4dce4987bfb37"],["/post/482/index.html","da9f3f4336eaa53c444e0e2e3f0c5e36"],["/post/4b65/index.html","bcc03a3ad1b230302eb16e44b866bc44"],["/post/4c63/index.html","db4caa451262beaf1efb1e1cc96a2854"],["/post/4e8e/index.html","90496dfb35514c30c0dbb73f97c7c98f"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","75c7249c8ff81c3e0e5f5990c1e21414"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","c1299333bd08a86d96075d6c335ca22b"],["/post/5123/index.html","5663d4f2df0450da7bf5e5625a12274c"],["/post/53da/index.html","de1da7c7c9b461e6c63243b073cad041"],["/post/5441/index.html","8ad5be0a7d2f2c5d6854ea7bb3004abb"],["/post/56c9/index.html","ec004be05f3211e10e4040a57bb926b2"],["/post/5e2/index.html","fc405582e75108ffec1c44c7a8d0c0ab"],["/post/60cf/index.html","9ce5ee16b0d2fd5e0c6dede4a51e8601"],["/post/647e/index.html","bacb894d0e7014b8f6b453487573d440"],["/post/64fe/index.html","618254cebf480ef8ce9dfdc9b32611ac"],["/post/6749/index.html","fda2efcd58814ce4ea8932014cad1aa0"],["/post/6917/index.html","a2ffbe9994eee45d639fc4b07bc1bfd6"],["/post/6b4e/index.html","1421c12591508668a17bd98c59e61521"],["/post/71fe/index.html","3702bd8308c3a01547daa786b055343c"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","faacd67b33c12ad3cd587062935e457f"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","34a221eb8c03509d990f17092ee7f6cd"],["/post/743/index.html","bf80fa4699e2de286a4318a6ea88e752"],["/post/7521/index.html","9a308c7345c20c8b11420277047d1461"],["/post/75b6/index.html","46bc0e789f225ab072065c4f6310d221"],["/post/794f/index.html","efdc45841b5a2fd06f7e472aac7cec82"],["/post/821c/index.html","f33e3ea6201d49ce7c61581799166514"],["/post/8b63/index.html","65b7d4e82504b02bd9b244b0abb1ebce"],["/post/977d/index.html","53abc6b05aaf0ec883e76e0ea18c244c"],["/post/9a42/index.html","e6de2c3b6407c1fc4f318ffe35110d94"],["/post/9bbe/index.html","5378ed7b890942abdb0bc4c4d5d1452d"],["/post/9dc2/index.html","14190b0a5ca75d2344806bc2f86e3a5c"],["/post/9fa5/index.html","66abf99da65296d163da2f33f46c1b49"],["/post/9fb/index.html","525e85038b1b2864fa1d4b15861326fd"],["/post/a15d/index.html","113a9d4dc375f6c531a1cb0069bc5f82"],["/post/a7d9/index.html","b3f591648586b511297858b4d749cbbf"],["/post/a9cd/index.html","d84d11e422eb1547ec7e4888020dae0b"],["/post/b2e0/index.html","d5a37d9a9b96e203b8e242d256229c57"],["/post/b3b1/index.html","cfa6d4eb2cffcf49f08c2b73435812ce"],["/post/b5b5/index.html","a9d4e91a8b62e4804c70debf4e0d3f1a"],["/post/b6a/index.html","b624225c8ab9eba5f34c20d2f534376d"],["/post/beda/index.html","7578fba5b8b0128818de1d1ebc4bae54"],["/post/bee5/index.html","1764d244c215c2d2831e38df32c84199"],["/post/c1b3/index.html","f48049b724ada80cfd45a2169857f5e0"],["/post/c4c9/index.html","69f86493d3419f4e4076f37e8bb86f1e"],["/post/c5d6/index.html","3f9002ce4bf4aab330c19078552095d8"],["/post/ca2e/index.html","74d6dcc8d0548d91b3e82a87d6137a42"],["/post/cc21/index.html","0367871b03b41ba8ebf2ba5367624add"],["/post/d1f6/index.html","3c56868bf89107326a8ce352ed98f129"],["/post/d419/index.html","c157f855a88aadb03da73ab6f5f396fa"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","15d4240a757211eaba71eab7bdaaad02"],["/post/dbef/index.html","1cc0c7141b7651c4bc2baa6b3582409a"],["/post/dc62/index.html","7ce612f6884a2db31975c774226f287c"],["/post/e1f9/index.html","40d54a04b213ec93f2f4a991544a8808"],["/post/e2d8/index.html","4b3575fdeb8162bfc0a44fad10fea412"],["/post/e377/index.html","068925efb17509f686ea5ed039534062"],["/post/e88/index.html","860ec127faba3cf429182fbee9029fa9"],["/post/ec4d/index.html","e6567bc23246e8b18b0ad56c63cd21db"],["/post/f34a/index.html","3d466299c795306312f2fdc6ceceba1a"],["/post/f507/index.html","b5a6253ce3777633bc9bd8ff3ed4fed4"],["/post/f5fa/index.html","34b62a63ea8cc3da500a3cf9e0158e64"],["/post/f93d/index.html","df71a507902e68beec772fd896d15d6c"],["/post/fba8/index.html","7ff71e1039f3d925fc61139336531857"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","b154e078714b5a65c0e9bfac96f653f2"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","8e348431bc23b504866207e5263e6c59"],["/projects/index.html","f1eca01523f8497ed722603d301d1b01"],["/tags/AIO/index.html","70e09f73f287437a804715f9c8e3e5ae"],["/tags/AOP/index.html","af43a9bad47d58e98a4a464283ae9bb2"],["/tags/ApplicationContext/index.html","28a8aa5ab476697ad16b0c215eb40606"],["/tags/BIO/index.html","0dd739dc33f564e2b3cf81a954249cbe"],["/tags/Bean/index.html","0363466bf0d6a4bc100c7b33f7316271"],["/tags/BeanFactory/index.html","4a3ad1966f8d15dfab67b43b39dfdf9d"],["/tags/BeanWrapper/index.html","fd99c9072605a5cf874fe8c7e8429065"],["/tags/CLI/index.html","34b1db75dd379314a507973793288097"],["/tags/CompletableFuture/index.html","1bb7a39436a24f5ff8b582637677377a"],["/tags/ConversionService/index.html","b3ffb55142ba2a7cb0e31792fb8fba62"],["/tags/Converter/index.html","1a47fa171e1502524ae23f3c4cd59f59"],["/tags/EndpointId/index.html","517e6c91cc9776f5f0d574557cc3d720"],["/tags/FactoryBean/index.html","e2a5495efdc5c8a3e1b2f51f4a8aef38"],["/tags/Formatter/index.html","2fbbdd73e3ff5d163bc425d7b0397665"],["/tags/How-to/index.html","af6ec31388071f360413a519cf52ea04"],["/tags/IO/index.html","357058a5be18a211bc01d3fb45e7426e"],["/tags/Idea/index.html","2580c0dc183f4c56f44c95cb6ed2e409"],["/tags/JUnit/index.html","1c7067425c6e652f3a9da41bdd0bea22"],["/tags/Java8/index.html","11574188ffa2654c240e4b5317428ea9"],["/tags/MvcEndpointUtil/index.html","2df3fea57755180d8f7b64cdba385b99"],["/tags/NIO/index.html","1d3f1835d60e99cb470ae8f5e8a426ec"],["/tags/NamespaceHandler/index.html","1346bcc4da5004b950e1d01add803a00"],["/tags/ObjectFactory/index.html","11a9ec1846f220884cd7829bccb91c2a"],["/tags/ObjectProvider/index.html","4f8c4439f9f3af520ae6c6ca749938f0"],["/tags/Resource/index.html","ba2db453ea798f0ad8a56772fcdc3b85"],["/tags/Scope/index.html","e1eb2fec82761e5c5ac76cde7ccb6ad1"],["/tags/Spring-AOP/index.html","d79e74dab5d78ea63aa3b3e81ea9c6f7"],["/tags/Spring-Boot-CLI/index.html","6cd756bcc38af61be92c2ce9ce5a1cc9"],["/tags/Spring-Boot/index.html","dc53a9bf864c709ac8a12c1dca41e109"],["/tags/Spring-Boot/page/2/index.html","4de0796974a724735f9c4ec419b41b88"],["/tags/Spring/index.html","bbbdfef3a7f0dfe92450108f55fcdd75"],["/tags/Stream/index.html","aa9c6cbf2fb37117403471af9fa2876b"],["/tags/activiti/index.html","a00d5c2c3e4198f6bc17278323c05310"],["/tags/alter-user/index.html","d2a7a805224b931557247bdd69704e71"],["/tags/angularjs/index.html","f6ff8fadc55e2054451fe8ca54457af4"],["/tags/attr/index.html","dbad0210d615b6d90cf9eaf283942942"],["/tags/build-tool-plugin/index.html","d084eb04ccb8f5cec12da7c6d0880350"],["/tags/check/index.html","3ffa2e9995af3d31e03be61ee83d4ee3"],["/tags/class/index.html","9c5476eebd42b06d20aa94ddc9b4d64f"],["/tags/cron/index.html","ebdfa83f652a3c0511db805ff3969f85"],["/tags/csv/index.html","fbaf391cd487bad5b50c514ae00f34bb"],["/tags/dubbo/index.html","9c77e2b26d1a42d56468e75c091de096"],["/tags/encodeURI/index.html","e35895b981b940755a907a07305f3b80"],["/tags/encodeURIComponent/index.html","9437ed38131e580ed287146e70a1c849"],["/tags/feign/index.html","0e83f1e758e89ec2e285b239705ef99e"],["/tags/hexo/index.html","ad21c2aeb949a39d4b5fb1d51a3c8238"],["/tags/httpclient4/index.html","1716620e7d28c2c7217a142f3592a545"],["/tags/index.html","f0979efa8e4c3fa083e2259ecb832dc9"],["/tags/java/index.html","5015ba35390bd38bba2ec44202af6d14"],["/tags/jpa/index.html","880d11aed01f6122fd27d413ca2ad7e3"],["/tags/jquery/index.html","d89bbd575ae936f23265ba285682f34a"],["/tags/jrebel/index.html","857d5b9e97c328a23e5033fb305d1581"],["/tags/maven/index.html","c3fe8f42791e786ab3d2aceb9edcdf55"],["/tags/my-jpa/index.html","ac84c3733ed14a9a014ef61fe82b819c"],["/tags/mysql/index.html","14983f33bc5f56cbe505fb300ccb2efc"],["/tags/opencsv/index.html","a0f8713af48e01831fabea5dbc2dbf62"],["/tags/prop/index.html","b0cd92cc4c4029aa6611525362eb8dcb"],["/tags/quartz/index.html","92d4017e8545f0ee67717c1c08ae79ac"],["/tags/restfull/index.html","e75b073120e6addac4f5f713f5ba37bb"],["/tags/schemaZip/index.html","10236c01faa258c29837fd1491541817"],["/tags/spring-cloud/index.html","0bd031d95ad1d6273f637ab3f24cf09c"],["/tags/table/index.html","fca81a9cea20d8174848e5898b291eea"],["/tags/test/index.html","5cbcac28d74ce2dd06f4611a8dfceea1"],["/tags/vm/index.html","b321d10421bed7c603b85a31f6f4b52c"],["/tags/乱码/index.html","bf47149607abab0ba2e7c2e41308f57c"],["/tags/云/index.html","217be2fa842908d04c49ac1c8ca42afd"],["/tags/依赖/index.html","4f5b4e77cdce0aead6a407576dbf3cb4"],["/tags/初始化/index.html","fc92a579f6b91d731050db48e9dcc1c6"],["/tags/吃货，媳妇儿/index.html","8f76a96ec660fd0ab10fbb0a40c60956"],["/tags/同步/index.html","dc35306d0fd973de3af1f88228704d86"],["/tags/启动检查/index.html","4dbd9e3a10b2fb5b7ec80b211ad03149"],["/tags/命名空间/index.html","db14cbfe8475855940252bfd8ad97a64"],["/tags/媳妇儿/index.html","71dc7f0e2f37315b9b23e49711c17c8d"],["/tags/媳妇儿，梦/index.html","aef9432f8d1b6a2fecee2670e2368005"],["/tags/学习/index.html","adaea8e26c9453b63e6a3f202e7e78c5"],["/tags/工作记录/index.html","bed994765ed1c3056591bcfaf4f4b0d3"],["/tags/年会/index.html","c52c868849a94a32d123b301fe68426f"],["/tags/异常/index.html","e2832ed27c5d32919d9104f52d0f5c6e"],["/tags/异步/index.html","820f38300ac55a26501d851c0e488b4c"],["/tags/方法/index.html","5d98ae7a7a6e47ac09b6a2dffb356273"],["/tags/样式/index.html","12ee57f20da2e4d9c0b2bb0cd5d214a2"],["/tags/桥接/index.html","4b642157eeb170c3274702e7b0150abf"],["/tags/梦/index.html","82c8e811fba4a4bc3d2c9dfa21e22d16"],["/tags/梦，媳妇儿/index.html","835f8030a9f39ec50326f2debfb418aa"],["/tags/母亲节/index.html","aa58ec18fbc0b947307d38d0b5b44550"],["/tags/注册/index.html","124a8c26f0187a055fcdbe572e2f2c18"],["/tags/源码/index.html","4da1eef4df910f0d86e2d07312e9dba5"],["/tags/特性/index.html","81c4cd192ae8a36aca0cbee26e0ae4ec"],["/tags/生产/index.html","8d9f658ab376a81298bc71694ca25261"],["/tags/直连提供者/index.html","240b8f8884caa28f9801f5137967bf3b"],["/tags/硬盘/index.html","776eebe3a2e4d389b0cd40b67c649533"],["/tags/类型转换/index.html","bfb9df889a7c3999b74e2f361786a6b0"],["/tags/编码/index.html","758e29291861d6aca359494f4848a5ba"],["/tags/自定义/index.html","5e417187d39b3d90285c5010d1f7ab62"],["/tags/解析/index.html","fc81d3473e614f04fd32ad6783f111d0"],["/tags/订阅/index.html","cf24be2f79c43be24845f197a2e30233"],["/tags/负载均衡/index.html","d2fe1c276ce7395dbe4aa0c1f98ad77b"],["/tags/部署/index.html","0bf7e2e82799a597d8847bc3c056b465"],["/tags/配置/index.html","b85984bdcada704a3cef1ca7a2ea0a22"],["/tags/错误/index.html","ffe971d0d68e342473ced377df3e9fd6"],["/tags/错误记录/index.html","84e37729764a0e38cfb7fc95b2625093"],["/tags/阻塞/index.html","2f29be6b919f5c938cc1f0f837eb7760"],["/tags/附录/index.html","496fba6a25dfd8e3f29fe60b87842c32"],["/tags/集群/index.html","c1823142b225f24ea36fc5484ea32502"],["/tags/非阻塞/index.html","1b51ecfbf84f8ef9e0a2fde80f4b3655"],["/tags/面试/index.html","27c35f10de2f5c123e0f3e350e2ed956"],["/tags/项目结构/index.html","605c211a21212c54b07f26d63889aae3"],["/tags/默认方法/index.html","b13051e01e45cc36e9d5ee1931ed9a34"]];
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




