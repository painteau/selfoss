!function(){function t(t){return t&&t.__esModule?t.default:t}var e=[],r="";function n(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}e=["index.html","icon-128x128.0cd416ec.png","icon-32x32.3b40b320.png","favicon.3abc0f4e.ico","selfoss.webmanifest","logo_big.a41ce105.png","index.3653623a.css","bg.28cb9002.gif","logo.49d6af6a.png","nav-mobile-logo.a804c2a5.png","index.3f73fa7a.js","index.1ce7a371.js","opml.html","opml.cd3284a8.js","opml.1c191e1e.js","hashpassword.html","hashpassword.50f7404b.js","hashpassword.a7abc686.js"],r="e3d80e9d";var i={},a=function(t){"use strict";var e,r=function(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]},n=function(t,e,r,n){var o=e&&e.prototype instanceof i?e:i,a=Object.create(o.prototype),c=new p(n||[]);return a._invoke=f(t,r,c),a},o=function(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}},i=function(){},a=function(){},c=function(){},u=function(t){["next","throw","return"].forEach((function(e){r(t,e,(function(t){return this._invoke(e,t)}))}))},s=function(t,e){function r(n,i,a,c){var u=o(t[n],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&g.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var n;this._invoke=function(t,o){function i(){return new e((function(e,n){r(t,o,e,n)}))}return n=n?n.then(i,i):i()}},f=function(t,e,r){var n=E;return function(i,a){if(n===L)throw new Error("Generator is already running");if(n===H){if("throw"===i)throw a;return y()}for(r.method=i,r.arg=a;;){var c=r.delegate;if(c){var u=k(c,r);if(u){if(u===F)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===E)throw n=H,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=L;var s=o(t,e,r);if("normal"===s.type){if(n=r.done?H:x,s.arg===F)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=H,r.method="throw",r.arg=s.arg)}}},h=function(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)},l=function(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e},p=function(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(h,this),this.reset(!0)},d=function(t){if(t){var r=t[w];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(g.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:y}},y=function(){return{value:e,done:!0}},v=Object.prototype,g=v.hasOwnProperty,m="function"==typeof Symbol?Symbol:{},w=m.iterator||"@@iterator",b=m.asyncIterator||"@@asyncIterator",_=m.toStringTag||"@@toStringTag";try{r({},"")}catch(t){r=function(t,e,r){return t[e]=r}}t.wrap=n;var E="suspendedStart",x="suspendedYield",L="executing",H="completed",F={},S={};r(S,w,(function(){return this}));var R=Object.getPrototypeOf,j=R&&R(R(d([])));j&&j!==v&&g.call(j,w)&&(S=j);var A=c.prototype=i.prototype=Object.create(S);function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return F;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return F}var i=o(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,F;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,F):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,F)}return a.prototype=c,r(A,"constructor",c),r(c,"constructor",a),a.displayName=r(c,_,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===a||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,c):(t.__proto__=c,r(t,_,"GeneratorFunction")),t.prototype=Object.create(A),t},t.awrap=function(t){return{__await:t}},u(s.prototype),r(s.prototype,b,(function(){return this})),t.AsyncIterator=s,t.async=function(e,r,o,i,a){void 0===a&&(a=Promise);var c=new s(n(e,r,o,i),a);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},u(A),r(A,_,"Generator"),r(A,w,(function(){return this})),r(A,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=d,p.prototype={constructor:p,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(l),!t)for(var r in this)"t"===r.charAt(0)&&g.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){var r=function(r,o){return a.type="throw",a.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o};if(this.done)throw t;for(var n=this,o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=g.call(i,"catchLoc"),u=g.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&g.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,F):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),F},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),l(r),F}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;l(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:d(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),F}},t}(i);try{regeneratorRuntime=a}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=a:Function("r","regeneratorRuntime = r")(a)}function c(){return(c=o(t(i).mark((function n(){var o,a;return t(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,caches.open(r);case 2:return o=t.sent,a=e.filter((function(t){return!t.match(/^(hashpassword|opml)\b/)})).map((function(t){return"index.html"===t?"./":t})),t.next=6,o.addAll(a);case 6:case"end":return t.stop()}}),n)})))).apply(this,arguments)}function u(){return(u=o(t(i).mark((function e(){var n;return t(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,caches.keys();case 2:return n=t.sent,t.next=5,Promise.all(n.filter((function(t){return!(t===r||"userCss"===t||"userJs"===t)})).map((function(t){return caches.delete(t)})));case 5:case"end":return t.stop()}}),e)})))).apply(this,arguments)}self.addEventListener("install",(function(t){return t.waitUntil(function(){return c.apply(this,arguments)}())})),self.addEventListener("activate",(function(t){return t.waitUntil(function(){return u.apply(this,arguments)}())})),self.addEventListener("fetch",(function(t){"GET"===t.request.method&&"XMLHttpRequest"!==t.request.headers.get("X-Requested-With")&&t.respondWith(caches.match(t.request).then((function(e){return e||fetch(t.request)})).catch((function(){return caches.match("./")})))})),self.addEventListener("message",(function(t){if("skipWaiting"===t.data)return self.skipWaiting()}))}();
//# sourceMappingURL=selfoss-sw-offline.js.map