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

var precacheConfig = [["/404.html","4d6acf997bbd98661a776849c1d6674a"],["/about/index.html","bfbe4daeba6def06bc9000bc80a81edf"],["/categories/index.html","1582d1dbddfd66db6b10185aebc431af"],["/contact/index.html","294d5de80f47ca487ea783e09a5f23ba"],["/css/index.css","c99d86d0f99b6dd9f7c350566d381fbd"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/image/avatar.webp","4e09f949bf507c9af49f601a081b2fb1"],["/image/pwa/128.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/144.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/192.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/256.png","3ebb9fc0fdc1565e7f054925a379d728"],["/image/pwa/512.png","3ebb9fc0fdc1565e7f054925a379d728"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","5fb715ffe0d4b1689fc1c8eb7e7187af"],["/js/main.js","c2d6628801fd2dc0ea1739901cf5d99b"],["/js/search/algolia.js","af567f93a5504310fe16fe368a4ee89e"],["/js/search/local-search.js","149fcc60c1de0a818e111978d01cbd87"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","24971090b8b1bd5d3f538d414e270fd3"],["/link/index.html","200cb1be64625d56e8a8866753f05324"],["/login/index.html","8ab06366a81e2960066afc6d5698c054"],["/page/2/index.html","3efe11c8645841496f0a6e2157480c81"],["/page/3/index.html","6c9c0d44125f2d0104b122b8552094d1"],["/page/4/index.html","54e51c3fd9c87be92b3100c5896c0ba2"],["/page/5/index.html","29a689634229ac363d8cf85ba9099f8b"],["/page/6/index.html","866b286a5d044d5295c9455610447967"],["/page/7/index.html","fd3a9d4a7847458b091a6057a52ddc9c"],["/page/8/index.html","2609ab444944debbdceca668ba8cc8bd"],["/page/9/index.html","dd8bba4995d58bf716c228a3036e6380"],["/post/14/index.html","73be57522239a45e85d07343907da539"],["/post/14f5/index.html","d64a0fbbe02d68e72044ce727d424a98"],["/post/154c/index.html","b449936bcd7907a970586bf8f9b3e2cc"],["/post/172b/index.html","0292c219060901f8a14adb90b41485cb"],["/post/172b/resource类关系图.png","0f5269b4a61c94a814bb6e3db40f7d84"],["/post/172b/resource结构.png","f293dd86c2dff80218f0580501640972"],["/post/1b4b/index.html","adc8b145d0a187201ca654b9a4f984a3"],["/post/1df8/index.html","0d6a6bc80f8677bab22f99f1e542b93b"],["/post/2011/index.html","cb5c59d794fca2a0acb5f60978500884"],["/post/25a6/index.html","4964866cef7aa42844a66c32bb47c0e7"],["/post/2746/index.html","8cf00b188e7da80cbead082e724fe749"],["/post/2958/index.html","70bee12a89f798e884f752c4dfbcdeea"],["/post/29b6/index.html","27dfe2bf1f3f2474e716eec0da1de57b"],["/post/29bc/index.html","e3ee1d71830e5645dbec82dce74ebbcb"],["/post/35c5/index.html","b74e088ce4fa9bf92833baf48fb18164"],["/post/361c/index.html","1bebb85e27001e248218e47838e15d43"],["/post/39fc/AbstractAutoProxyCreator创建代理对象流程图.png","6466a8257c34dfd96297793e336c9dfc"],["/post/39fc/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/39fc/index.html","25dc07da93450779ac46430f46789479"],["/post/3eee/index.html","9f8e000d1e9dc674afc416e2017843d7"],["/post/4085/index.html","2b01e5c6ac0fcea1c09a05a44ab24cee"],["/post/4406/index.html","91c75ea3278f516a56d2f26855908f65"],["/post/45af/index.html","1f3caaf8ee5a6d8133d05207cb0c63e9"],["/post/4819/index.html","81737f4df4ad06fe72c5c2b9f07b45c5"],["/post/482/index.html","9fc3365efbd4dc2f31861d2e81f2dce2"],["/post/4b65/index.html","4c2d0ef15a1cdc64aab9ae0e93813bcd"],["/post/4c63/index.html","f24c701283f6e1dc22f4d874e8ff1c32"],["/post/4e8e/index.html","5542ee804a0fed7e3ef524339c71ee34"],["/post/504e/BeanWrapper类结构.png","51e8d68db87207db10941ec712864cb0"],["/post/504e/ConversionService结构.png","5122667f31f0366f4a5f772ec6c07378"],["/post/504e/Formatter结构.png","8a71f79e58868b8413c2c58a07442960"],["/post/504e/index.html","633eb838eea150cf43c78c043cd8bfd2"],["/post/504e/查找converter.png","ca5cdb0d09bd9bdc7e44f846e847526d"],["/post/50f9/index.html","f291d1a5392508bca5f4167b05596085"],["/post/5123/index.html","46f03ec898368d161f3e57f542fef989"],["/post/53da/index.html","796eb0deb2016a073205ece3adda6f8f"],["/post/56c9/index.html","7e4db767d8b740f9b8ebed3dacd2eeb6"],["/post/5e2/index.html","355a1ba0387de5a30a28b11d6619d8d5"],["/post/60cf/index.html","9c6b5311054bf512768b98cca80b44a0"],["/post/647e/index.html","790b2d7cd8c051294696704afefedde9"],["/post/64fe/index.html","8e9e80c829719a2b47c3bb357b70cf87"],["/post/6749/index.html","fb4aaab9e124e49954384a2266bccebd"],["/post/6917/index.html","517d933e139db761494c9dfef39dd57f"],["/post/6b4e/index.html","bdad1d89bc491afab3c34f8ba74a3548"],["/post/71fe/index.html","c438f007f77175a3b12850538b61c581"],["/post/72a3/Bean实例化过程.png","36102a43397de369796124d3aaa51106"],["/post/72a3/Bean实例化过程中组件作用范围.png","f0d549058e56e5d114f437ece4729523"],["/post/72a3/index.html","af75fb217f39a284cb3d0bb5dcb13cd3"],["/post/736b/1555552207458.png","dc6addd4ec8c7997ddd36e1a958459e1"],["/post/736b/1555552387442.png","458d94bf7197e439ec18d2a52ab0295e"],["/post/736b/1557729188468.png","f72a751d47151e409298199c18bdad98"],["/post/736b/index.html","0c6f9e3efddba22e8c90c05114ba8ff6"],["/post/743/index.html","f12b23e439ab98058b0a219f0b1815a6"],["/post/7521/index.html","e3f79f3ae853a00d520b50ac7ab8dae0"],["/post/75b6/index.html","6e9acd33e687a18052bd2828707f82ee"],["/post/794f/index.html","3acb9473e1ff085016093e36a7b70d4e"],["/post/821c/index.html","5dc1ac028eb31d1b9e87021c7993a40d"],["/post/8b63/index.html","041662618e11db7beede55a6f680cd08"],["/post/977d/index.html","fb4f08e540d4cf86cb80649528ae2d46"],["/post/9a42/index.html","688abb8a4217cb00212d0b01377ade42"],["/post/9bbe/index.html","b8c06b58a0340337069c591311f6ecfe"],["/post/9dc2/index.html","80044d2e6e95e315467421eb5e7b752d"],["/post/9fa5/index.html","28eeb6a2538354d3dc753d342284ac20"],["/post/9fb/index.html","0a5acae7de66dd7f54ff749b9b0a4888"],["/post/a15d/index.html","02e6f8cdb57671d693256817703c222a"],["/post/a7d9/index.html","319a498f1b562ea0b4a59eceb0a6f0b2"],["/post/a9cd/index.html","8511dd350e296d7062bf39dc35c1a02a"],["/post/b2e0/index.html","95e34d4cda5952bea31b6007e61c42b1"],["/post/b3b1/index.html","d28fb939952e4229ac61fa256e74767a"],["/post/b5b5/index.html","ca6c82445e90f8677ac2baefef625c7e"],["/post/b6a/index.html","ae392f9c930cc744458eeec918a2c6ac"],["/post/beda/index.html","63760d0ee2cbe5c388bff4e0b8c9faed"],["/post/bee5/index.html","060ce4f727c6dcb3b8288072d0bad883"],["/post/c1b3/index.html","0c5d38e5b6f5da0a2ea5822e9a7bc22c"],["/post/c4c9/index.html","20f183697a2a6de092699442d22aef48"],["/post/c5d6/index.html","3671a913de3347097c74c034ebdc8d88"],["/post/ca2e/index.html","6a08ec7cbc00878d9a208ad2cda5bc84"],["/post/cc21/index.html","9ae36aaeb31522deefa7fc09fe8d5e52"],["/post/d1f6/index.html","afa362791c935755e4cbe23564a10f19"],["/post/d419/index.html","1e14c489d175fc42e958f1985e1924e6"],["/post/dac1/59e2e5d2.png","4e05684d3415e028033e95e02d3d1854"],["/post/dac1/990d4ca9.png","d551c6d0d88d568c9908fb6725b308e2"],["/post/dac1/index.html","edb3e79130e0b460ee65296a208c526a"],["/post/dbef/index.html","d623cc237d2a1b9aaca8989dce21ec2a"],["/post/dc62/index.html","781bd4fd3b831c2c325d492884eddeb0"],["/post/e1f9/index.html","73e735346f5319af57a9533d557a35bd"],["/post/e2d8/index.html","48003e86915810c83a2605bc718babc3"],["/post/e377/index.html","c41be7524ddd6ee7f8b78a51c74195bb"],["/post/e88/index.html","1a97afcf5857a57a7194b02a39f75310"],["/post/ec4d/index.html","311d47ed05bf3e28b200c5423df2de12"],["/post/f34a/index.html","b6476d00c68071ccbfe165503462a736"],["/post/f5fa/index.html","80a05037f43325bc8b3f4c93365517a5"],["/post/f93d/index.html","cc29e8adf177d1b851d4982396b39343"],["/post/fba8/index.html","c034534306abb5c2b64d333b112f60f0"],["/post/fc6f/ProxyFactoryBean.png","d6dd1d09a65e71b17b190255f2fa138e"],["/post/fc6f/ProxyFactoryBean创建代理对象流程.png","a79a073b22417e75791a8e7c5f781321"],["/post/fc6f/index.html","75fae0780dfa2a8d63696e7d322c62a8"],["/post/fc6f/代理调用过程.png","cbae91f4d3265f9c66fbcb727678677f"],["/post/fe03/index.html","06a3256d42940e0ecd2418f937690cc4"],["/projects/index.html","c3a1851056a0055566c7df0669aa401e"],["/tags/AIO/index.html","e4ed0242374f085bbf72834d8767f567"],["/tags/AOP/index.html","8a79a1507c8fdede323087141586e8eb"],["/tags/ApplicationContext/index.html","92292a1861e358aea33d2c1b520ed893"],["/tags/BIO/index.html","3225863dec6ae949c2cec1b017f10f2d"],["/tags/Bean/index.html","b632fa096a1d9aa2e0f07a7d74b5be9b"],["/tags/BeanFactory/index.html","0cd34857b0239ae7062f078a98f9361e"],["/tags/BeanWrapper/index.html","329af8585371f3bb251e031d747272ba"],["/tags/CLI/index.html","a6064ea719ad867074af284d6204b1a0"],["/tags/CompletableFuture/index.html","fb1cd0912c4c9fa78e701e80629cbc60"],["/tags/ConversionService/index.html","a2a2e56ea79317c2c11a57fcc99d9c6a"],["/tags/Converter/index.html","3f656857a43928273cc369813928936b"],["/tags/EndpointId/index.html","6201a8925995d56701347211849584d1"],["/tags/FactoryBean/index.html","a52339a15079e03f71d367375df77603"],["/tags/Formatter/index.html","27a460103f3fe45748f5b7d98834a0e1"],["/tags/How-to/index.html","f1e89ad7200d04ae63270ebc1473fd68"],["/tags/IDEA/index.html","9dd7e9be0144bcad1a253ead31e489de"],["/tags/IO/index.html","357be376b6f9de5ede8a3108c03504ac"],["/tags/JUnit/index.html","734fc1988d79108569a9aafc98f96058"],["/tags/Java8/index.html","e9e6005ef2ea88ef1db55533bc944d33"],["/tags/MvcEndpointUtil/index.html","79bfcb4ac8f9567cc28bfb7b8e834814"],["/tags/NIO/index.html","9730aac62da773ccc326d1b17b2181b8"],["/tags/NamespaceHandler/index.html","ca5c9dd611ab5ba0d7fa4b8ea65c43d7"],["/tags/ObjectFactory/index.html","b90749bc93d89178528c0ca8eef7693f"],["/tags/ObjectProvider/index.html","365d6319356d8c0f11ee3454a57d38e1"],["/tags/Resource/index.html","3be5ed704fbdd3a91f65472767e642e9"],["/tags/Scope/index.html","5afd8e3b8d64d2f9801474bd6a4d8198"],["/tags/Spring-AOP/index.html","b71eaa181eb504e805e4d2289ac3ca71"],["/tags/Spring-Boot-CLI/index.html","4c78c1b0c5d7ba5ba1923a77f239845f"],["/tags/Spring-Boot/index.html","6fdfe4d1cdbfdeb6e02899dc21ca030e"],["/tags/Spring-Boot/page/2/index.html","47b5334ef4bbf13b03edf737c6c54d68"],["/tags/Spring/index.html","59420d360368bc233e2618cb614b182b"],["/tags/Stream/index.html","97f62ab6ca1566673a65648b3089bf24"],["/tags/activiti/index.html","853e4f9f25ea41bd859279d395cec375"],["/tags/alter-user/index.html","f2bcbcc27bd6ba5518e0f71d8402d04d"],["/tags/angularjs/index.html","92374955972a7da48dd795e715de023c"],["/tags/attr/index.html","42c6f77c1c1300e06ea98babb64ff9f9"],["/tags/build-tool-plugin/index.html","41e4a0621365220d668471b9849554ac"],["/tags/check/index.html","f3809d76687f0dd4fdc9f115c81e43a0"],["/tags/class/index.html","520b667f8a2873a9ef986498e4401db4"],["/tags/cron/index.html","90db1420faac739a3cebf5c0d04c6298"],["/tags/csv/index.html","7a7d7263ca8416fd771bf0ed37672b7d"],["/tags/dubbo/index.html","ca187b8d75fa53b69289733c1c7bc292"],["/tags/encodeURI/index.html","45da69bf170e41799f1b9b2e39b75c07"],["/tags/encodeURIComponent/index.html","bfe0e2cd4fe9d9b371523b7c51326bb9"],["/tags/feign/index.html","1ae4c3360c5c9dadbca3677e90500b43"],["/tags/hexo/index.html","6978edee554d626d566de8637332dd0e"],["/tags/httpclient4/index.html","fb63894b174c9b533844aab66564d258"],["/tags/index.html","eb787cc666220c1325f57f4ff7433648"],["/tags/java/index.html","7e27ba1a59acecddfcfa576b0769af45"],["/tags/jpa/index.html","de58c5ab0f7d3ab9b30fd2f86e155f93"],["/tags/jquery/index.html","7e40879e25598d369f0559e8b82c9051"],["/tags/jrebel/index.html","516ad2dd47f89dab62e58969ccd2f9a1"],["/tags/maven/index.html","772a3dfba106d073a140a7c43f113409"],["/tags/my-jpa/index.html","90b75016915fa7e0c298f591c718fe84"],["/tags/mysql/index.html","3ac5ab393e5b285e4814dbe264fd4312"],["/tags/opencsv/index.html","062828a80d4e3969858c24b1cc15727b"],["/tags/prop/index.html","aa27f24b229bf665b5d9827d6819dbd1"],["/tags/quartz/index.html","78ca3bbc587b7f36a00429fd629fdaf7"],["/tags/restfull/index.html","9fb9fac67841f40f8de77a9477dc7d3d"],["/tags/schemaZip/index.html","36898f1df6c6ae0394fdf33a2b6d2b08"],["/tags/spring-cloud/index.html","9e9081475dad0e951bc51eab1c82c435"],["/tags/table/index.html","6be6bf35a01da49c64e4ebe5151d0b52"],["/tags/test/index.html","dac3d5aad35a1cc0d65b03627920bb3f"],["/tags/vm/index.html","83140633284b233517c78ea06f4a9ed8"],["/tags/乱码/index.html","01c6eeaabf72944d5927d2e54900e148"],["/tags/云/index.html","1a5cb5feb389e5b02d6711b92a75646e"],["/tags/依赖/index.html","e2e21f57f5f5fe015ca179f389736f0c"],["/tags/初始化/index.html","0072d0decab8e3fca718c24765c88a9b"],["/tags/吃货，媳妇儿/index.html","7e3a2046f7119aedccdc634b848b1508"],["/tags/同步/index.html","aac3d4d85de3df08eb7e9951643e64e7"],["/tags/启动检查/index.html","b26647bcf14e48b00a9969c43180ec45"],["/tags/命名空间/index.html","6202d1e5bf153b1f283dc3d8a5e5a547"],["/tags/媳妇儿/index.html","6b3b829821afe609fc736e67691a693d"],["/tags/媳妇儿，梦/index.html","0650632bdee720d12b6cb82ca64c2e78"],["/tags/学习/index.html","21de3a11709f1aeeeb3d801a702fa27f"],["/tags/工作记录/index.html","26c3ae261f979060352ede1399d99bee"],["/tags/年会/index.html","4fe2bd69ff481c21aba74b7732a6ffbb"],["/tags/异常/index.html","3e5900fcf18fc335d32216e828be06d4"],["/tags/异步/index.html","bed056d5a599820552e5374343b6f48b"],["/tags/方法/index.html","409c360274ac91162267712a9a1a1055"],["/tags/样式/index.html","40d921d0cd2018f6691eca232287b062"],["/tags/桥接/index.html","47f01be6677588431452181631d4da64"],["/tags/梦/index.html","78910bda51040d12aea8896e625bf975"],["/tags/梦，媳妇儿/index.html","5a95745b63b3c020e2ab861363f6c2a6"],["/tags/母亲节/index.html","06fba5feef36c72eb7e40c51ed406b3b"],["/tags/注册/index.html","118c254cbcae7c932867e19aa1075e09"],["/tags/源码/index.html","5993b786bb768031f83d022f60968686"],["/tags/特性/index.html","7bf6db5283d6257517fa7688a4ed9f27"],["/tags/生产/index.html","32c9196819dff7d51e19d620b120fe1f"],["/tags/直连提供者/index.html","dcf0d7e869f539f89fdacaf7a89c4cc0"],["/tags/硬盘/index.html","d86a2253f7cd913cb4c25788088a165e"],["/tags/类型转换/index.html","db583e84c46b19ff1ff1dbb44a532123"],["/tags/编码/index.html","9e9517f74afe4537156fd37fbd31b466"],["/tags/自定义/index.html","f25ab0267db6f12677a07013a326a753"],["/tags/解析/index.html","70efceb9f1ffb426dd62c0e197feb594"],["/tags/订阅/index.html","3e822a4806e921dff0550eeb0ad7cbdd"],["/tags/负载均衡/index.html","cf17ebdd7bf1878325d96db5064e1bb0"],["/tags/部署/index.html","959c2ffc9fa9ca2591547880ed05e275"],["/tags/配置/index.html","35138d1a6a9c000197f9efea713a3fda"],["/tags/错误/index.html","63c0853a6ef39107b96b3f9cc16300d0"],["/tags/错误记录/index.html","3d42b93dca601567eb39d2f5b1fc93d5"],["/tags/阻塞/index.html","ee383fff2233a626d8579b17e49ba72a"],["/tags/附录/index.html","aa09c8a9fb53c69d8e7d072edb5f7532"],["/tags/集群/index.html","64c0d431cdd6897ff11ac26782b347e1"],["/tags/非阻塞/index.html","2c00982237fbcb1cdf65b5cd79b8bf60"],["/tags/面试/index.html","3234bf986c9bdc3e4bcb6275a2286af9"],["/tags/项目结构/index.html","3308e293dd37daa09e96763345173b6d"],["/tags/默认方法/index.html","d9a7c5c75e7bcbb614a8dc8aed1f0e77"]];
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




