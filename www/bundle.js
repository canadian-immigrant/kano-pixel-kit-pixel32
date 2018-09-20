!function(){var t={};function n(e){if(!(this instanceof n))return new n(e);"number"==typeof e&&(e={max:e}),e||(e={}),this.cache={},this.head=this.tail=null,this.length=0,this.max=e.max||1e3,this.maxAge=e.maxAge||0}t=n,Object.defineProperty(n.prototype,"keys",{get:function(){return Object.keys(this.cache)}}),n.prototype.clear=function(){this.cache={},this.head=this.tail=null,this.length=0},n.prototype.remove=function(e){if("string"!=typeof e&&(e=""+e),this.cache.hasOwnProperty(e)){var t=this.cache[e];return delete this.cache[e],this._unlink(e,t.prev,t.next),t.value}},n.prototype._unlink=function(e,t,n){this.length--,0===this.length?this.head=this.tail=null:this.head===e?(this.head=t,this.cache[this.head].next=null):this.tail===e?(this.tail=n,this.cache[this.tail].prev=null):(this.cache[t].next=n,this.cache[n].prev=t)},n.prototype.peek=function(e){if(this.cache.hasOwnProperty(e)){var t=this.cache[e];if(this._checkAge(e,t))return t.value}},n.prototype.set=function(e,t){var n;if("string"!=typeof e&&(e=""+e),this.cache.hasOwnProperty(e)){if((n=this.cache[e]).value=t,this.maxAge&&(n.modified=Date.now()),e===this.head)return t;this._unlink(e,n.prev,n.next)}else n={value:t,modified:0,next:null,prev:null},this.maxAge&&(n.modified=Date.now()),this.cache[e]=n,this.length===this.max&&this.evict();return this.length++,n.next=null,n.prev=this.head,this.head&&(this.cache[this.head].next=e),this.head=e,this.tail||(this.tail=e),t},n.prototype._checkAge=function(e,t){return!(this.maxAge&&Date.now()-t.modified>this.maxAge&&(this.remove(e),1))},n.prototype.get=function(e){if("string"!=typeof e&&(e=""+e),this.cache.hasOwnProperty(e)){var t=this.cache[e];if(this._checkAge(e,t))return this.head!==e&&(e===this.tail?(this.tail=t.next,this.cache[this.tail].prev=null):this.cache[t.prev].next=t.next,this.cache[t.next].prev=t.prev,this.cache[this.head].next=e,t.prev=this.head,t.next=null,this.head=e),t.value}},n.prototype.evict=function(){this.tail&&this.remove(this.tail)};var o={};function i(e,n,o){this.cache="number"==typeof o?new t(o):o||new t(100),this.state=e,this.emit=n}function r(e){return new(e.bind.apply(e,arguments))}"function"==typeof Symbol&&Symbol.iterator,o=i,i.prototype.render=function(e,t){var n=this.cache.get(t);if(!n){for(var o=[],i=2,a=arguments.length;i<a;i++)o.push(arguments[i]);o.unshift(e,t,this.state,this.emit),n=r.apply(r,o),this.cache.set(t,n)}return n},"function"==typeof Symbol&&Symbol.iterator;var a,s=function(e){var t=document.readyState;if("complete"===t||"interactive"===t)return setTimeout(e,0);document.addEventListener("DOMContentLoaded",function(){e()})};"function"==typeof Symbol&&Symbol.iterator;var c="undefined"!=typeof window;function l(e){this.hasWindow=e,this.hasIdle=this.hasWindow&&window.requestIdleCallback,this.method=this.hasIdle?window.requestIdleCallback.bind(window):this.setTimeout,this.scheduled=!1,this.queue=[]}l.prototype.push=function(e){this.queue.push(e),this.schedule()},l.prototype.schedule=function(){if(!this.scheduled){this.scheduled=!0;var e=this;this.method(function(t){for(;e.queue.length&&t.timeRemaining()>0;)e.queue.shift()(t);e.scheduled=!1,e.queue.length&&e.schedule()})}},l.prototype.setTimeout=function(e){setTimeout(e,0,{timeRemaining:function(){return 1}})},a=function(){var e;return c?(window._nanoScheduler||(window._nanoScheduler=new l(!0)),e=window._nanoScheduler):e=new l,e},"function"==typeof Symbol&&Symbol.iterator;var u,d=a();h.disabled=!0;try{u=window.performance,h.disabled="true"===window.localStorage.DISABLE_NANOTIMING||!u.mark}catch(e){}function h(e){if(h.disabled)return p;var t=(1e4*u.now()).toFixed()%Number.MAX_SAFE_INTEGER,n="start-"+t+"-"+e;function o(o){var i="end-"+t+"-"+e;u.mark(i),d.push(function(){var r=null;try{var a=e+" ["+t+"]";u.measure(a,n,i),u.clearMarks(n),u.clearMarks(i)}catch(e){r=e}o&&o(r,e)})}return u.mark(n),o.uuid=t,o}function p(e){e&&d.push(function(){e(new Error("nanotiming: performance API unavailable"))})}var f=h,m=function(e,t,n){var o,i=e.length;if(!(t>=i||0===n)){var r=i-(n=t+n>i?i-t:n);for(o=t;o<r;++o)e[o]=e[o+n];e.length=r}},v={};function y(e){if(!(this instanceof y))return new y(e);this._name=e||"nanobus",this._starListeners=[],this._listeners={}}"function"==typeof Symbol&&Symbol.iterator,v=y,y.prototype.emit=function(e){for(var t=[],n=1,o=arguments.length;n<o;n++)t.push(arguments[n]);var i=f(this._name+"('"+e+"')"),r=this._listeners[e];return r&&r.length>0&&this._emit(this._listeners[e],t),this._starListeners.length>0&&this._emit(this._starListeners,e,t,i.uuid),i(),this},y.prototype.on=y.prototype.addListener=function(e,t){return"*"===e?this._starListeners.push(t):(this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t)),this},y.prototype.prependListener=function(e,t){return"*"===e?this._starListeners.unshift(t):(this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].unshift(t)),this},y.prototype.once=function(e,t){var n=this;return this.on(e,function o(){t.apply(n,arguments),n.removeListener(e,o)}),this},y.prototype.prependOnceListener=function(e,t){var n=this;return this.prependListener(e,function o(){t.apply(n,arguments),n.removeListener(e,o)}),this},y.prototype.removeListener=function(e,t){return"*"===e?(this._starListeners=this._starListeners.slice(),n(this._starListeners,t)):(void 0!==this._listeners[e]&&(this._listeners[e]=this._listeners[e].slice()),n(this._listeners[e],t));function n(e,t){if(e){var n=e.indexOf(t);return-1!==n?(m(e,n,1),!0):void 0}}},y.prototype.removeAllListeners=function(e){return e?"*"===e?this._starListeners=[]:this._listeners[e]=[]:(this._starListeners=[],this._listeners={}),this},y.prototype.listeners=function(e){var t="*"!==e?this._listeners[e]:this._starListeners,n=[];if(t)for(var o=t.length,i=0;i<o;i++)n.push(t[i]);return n},y.prototype._emit=function(e,t,n,o){if(void 0!==e&&0!==e.length){void 0===n&&(n=t,t=null),t&&(n=void 0!==o?[t].concat(n,o):[t].concat(n));for(var i=e.length,r=0;r<i;r++){var a=e[r];a.apply(a,n)}}},"function"==typeof Symbol&&Symbol.iterator;var b=/(noopener|noreferrer) (noopener|noreferrer)/,w=/^[\w-_]+:/,g=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onmouseenter","onmouseleave","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"],_=g.length;function A(e,t,n){e[n]!==t[n]&&(t[n]=e[n],e[n]?t.setAttribute(n,""):t.removeAttribute(n))}var S=function(e,t){var n=e.nodeType,o=e.nodeName;1===n&&function(e,t){for(var n=t.attributes,o=e.attributes,i=null,r=null,a=null,s=null,c=o.length-1;c>=0;--c)a=(s=o[c]).name,i=s.namespaceURI,r=s.value,i?(a=s.localName||a,t.getAttributeNS(i,a)!==r&&t.setAttributeNS(i,a,r)):t.hasAttribute(a)?t.getAttribute(a)!==r&&("null"===r||"undefined"===r?t.removeAttribute(a):t.setAttribute(a,r)):t.setAttribute(a,r);for(var l=n.length-1;l>=0;--l)!1!==(s=n[l]).specified&&(a=s.name,(i=s.namespaceURI)?(a=s.localName||a,e.hasAttributeNS(i,a)||t.removeAttributeNS(i,a)):e.hasAttributeNS(null,a)||t.removeAttribute(a))}(e,t),3!==n&&8!==n||t.nodeValue!==e.nodeValue&&(t.nodeValue=e.nodeValue),"INPUT"===o?function(e,t){var n=e.value,o=t.value;A(e,t,"checked"),A(e,t,"disabled"),n!==o&&(t.setAttribute("value",n),t.value=n),"null"===n&&(t.value="",t.removeAttribute("value")),e.hasAttributeNS(null,"value")?"range"===t.type&&(t.value=n):t.removeAttribute("value")}(e,t):"OPTION"===o?function(e,t){A(e,t,"selected")}(e,t):"TEXTAREA"===o&&function(e,t){var n=e.value;if(n!==t.value&&(t.value=n),t.firstChild&&t.firstChild.nodeValue!==n){if(""===n&&t.firstChild.nodeValue===t.placeholder)return;t.firstChild.nodeValue=n}}(e,t),function(e,t){for(var n=0;n<_;n++){var o=g[n];e[o]?t[o]=e[o]:t[o]&&(t[o]=void 0)}}(e,t)};"function"==typeof Symbol&&Symbol.iterator;var E=3;function N(e,t){return e.id?e.id===t.id:e.isSameNode?e.isSameNode(t):e.tagName===t.tagName&&e.type===E&&e.nodeValue===t.nodeValue}var T=function(e,t){return function e(t,n){return n?t?t.isSameNode&&t.isSameNode(n)?n:t.tagName!==n.tagName?t:(S(t,n),function(t,n){for(var o,i,r,a,s=0,c=0;o=n.childNodes[c],i=t.childNodes[c-s],o||i;c++)if(i)if(o)if(N(i,o))(r=e(i,o))!==o&&(n.replaceChild(r,o),s++);else{a=null;for(var l=c;l<n.childNodes.length;l++)if(N(n.childNodes[l],i)){a=n.childNodes[l];break}a?((r=e(i,a))!==a&&s++,n.insertBefore(r,o)):i.id||o.id?(n.insertBefore(i,o),s++):(r=e(i,o))!==o&&(n.replaceChild(r,o),s++)}else n.appendChild(i),s++;else n.removeChild(o),c--}(t,n),n):null:t}(t,e)};"function"==typeof Symbol&&Symbol.iterator;var k=/([^?=&]+)(=([^&]*))?/g;"function"==typeof Symbol&&Symbol.iterator;var O=function(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var o in n)x.call(n,o)&&(e[o]=n[o])}return e},x=Object.prototype.hasOwnProperty,L=function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)C.call(n,o)&&(e[o]=n[o])}return e},C=Object.prototype.hasOwnProperty,I={};function P(){if(!(this instanceof P))return new P;this.trie={nodes:{}}}"function"==typeof Symbol&&Symbol.iterator,I=P,P.prototype.create=function(e){var t=e.replace(/^\//,"").split("/");return function e(n,o){var i=t.hasOwnProperty(n)&&t[n];if(!1===i)return o;var r=null;return/^:|^\*/.test(i)?(o.nodes.hasOwnProperty("$$")?r=o.nodes.$$:(r={nodes:{}},o.nodes.$$=r),"*"===i[0]&&(o.wildcard=!0),o.name=i.replace(/^:|^\*/,"")):o.nodes.hasOwnProperty(i)?r=o.nodes[i]:(r={nodes:{}},o.nodes[i]=r),e(n+1,r)}(0,this.trie)},P.prototype.match=function(e){var t=e.replace(/^\//,"").split("/"),n={},o=function e(o,i){if(void 0!==i){var r=t[o];if(void 0===r)return i;if(i.nodes.hasOwnProperty(r))return e(o+1,i.nodes[r]);if(i.name){try{n[i.name]=decodeURIComponent(r)}catch(t){return e(o,void 0)}return e(o+1,i.nodes.$$)}if(i.wildcard){try{n.wildcard=decodeURIComponent(t.slice(o).join("/"))}catch(t){return e(o,void 0)}return i.nodes.$$}return e(o+1)}}(0,this.trie);if(o)return(o=O(o)).params=n,o},P.prototype.mount=function(e,t){var n=e.replace(/^\//,"").split("/"),o=null,i=null;if(1===n.length)i=n[0],o=this.create(i);else{var r=n.join("/");i=n[0],o=this.create(r)}L(o.nodes,t.nodes),t.name&&(o.name=t.name),o.nodes[""]&&(Object.keys(o.nodes[""]).forEach(function(e){"nodes"!==e&&(o[e]=o.nodes[""][e])}),L(o.nodes,o.nodes[""].nodes),delete o.nodes[""].nodes)},"function"==typeof Symbol&&Symbol.iterator;var R=function e(t){if(!(this instanceof e))return new e(t);var n=(t||"").replace(/^\//,""),o=I();return i._trie=o,i.on=function(e,t){var n=t._wayfarer&&t._trie?t:function(){return t.apply(this,Array.prototype.slice.call(arguments))};(e=e||"/",n.route=e,n._wayfarer&&n._trie)?o.mount(e,n._trie.trie):o.create(e).cb=n;return i},i.emit=i,i.match=r,i._wayfarer=!0,i;function i(e){var t=r(e),n=new Array(arguments.length);n[0]=t.params;for(var o=1;o<n.length;o++)n[o]=arguments[o];return t.cb.apply(t.cb,n)}function r(e){var t=o.match(e);if(t&&t.cb)return new a(t);var i=o.match(n);if(i&&i.cb)return new a(i);throw new Error("route '"+e+"' did not match")}function a(e){this.cb=e.cb,this.route=e.cb.route,this.params=e.params}},D={},V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q=/file:\/\//.test("object"===("undefined"==typeof window?"undefined":V(window))&&window.location&&window.location.origin),M=new RegExp("^(file://|/)(.*.html?/?)?"),$=new RegExp("^(http(s)?(://))?(www.)?[a-zA-Z0-9-_.]+(:[0-9]{1,5})?(/{1})?"),j=new RegExp("#"),U=new RegExp("[?].*$");function Y(e){if(!(this instanceof Y))return new Y(e);e=e||{},this.router=R(e.default||"/404")}function H(e,t){return e=t?e.replace(M,""):e.replace($,""),decodeURI(e.replace(U,"").replace(j,"/"))}D=Y,Y.prototype.on=function(e,t){e=e.replace(/^[#\/]/,""),this.router.on(e,t)},Y.prototype.emit=function(e){return e=H(e,q),this.router.emit(e)},Y.prototype.match=function(e){return e=H(e,q),this.router.match(e)};var K=function(e,t){if(e)try{var n=document.querySelector(e);n&&n.scrollIntoView(t)}catch(e){}},G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},J=z,W={};function z(e){if(!(this instanceof z))return new z(e);e=e||{};var t=this;this._events={DOMCONTENTLOADED:"DOMContentLoaded",DOMTITLECHANGE:"DOMTitleChange",REPLACESTATE:"replaceState",PUSHSTATE:"pushState",NAVIGATE:"navigate",POPSTATE:"popState",RENDER:"render"},this._historyEnabled=void 0===e.history||e.history,this._hrefEnabled=void 0===e.href||e.href,this._hashEnabled=void 0===e.hash||e.hash,this._hasWindow="undefined"!=typeof window,this._cache=e.cache,this._loaded=!1,this._stores=[],this._tree=null;var n={events:this._events,components:{}};this._hasWindow?(this.state=window.initialState?O(window.initialState,n):n,delete window.initialState):this.state=n,this.router=D({curry:!0}),this.emitter=v("choo.emit"),this.emit=this.emitter.emit.bind(this.emitter),this._hasWindow&&(this.state.title=document.title),this.emitter.prependListener(this._events.DOMTITLECHANGE,function(e){t.state.title=e,t._hasWindow&&(document.title=e)})}z.prototype.route=function(e,t){this.router.on(e,t)},z.prototype.use=function(e){var t=this;this._stores.push(function(n){var o="choo.use";o=e.storeName?o+"("+e.storeName+")":o;var i=f(o);e(n,t.emitter,t),i()})},z.prototype.start=function(){var e,t,n=this;return this._historyEnabled&&(this.emitter.prependListener(this._events.NAVIGATE,function(){n._matchRoute(),n._loaded&&(n.emitter.emit(n._events.RENDER),setTimeout(K.bind(null,window.location.hash),0))}),this.emitter.prependListener(this._events.POPSTATE,function(){n.emitter.emit(n._events.NAVIGATE)}),this.emitter.prependListener(this._events.PUSHSTATE,function(e){window.history.pushState(W,null,e),n.emitter.emit(n._events.NAVIGATE)}),this.emitter.prependListener(this._events.REPLACESTATE,function(e){window.history.replaceState(W,null,e),n.emitter.emit(n._events.NAVIGATE)}),window.onpopstate=function(){n.emitter.emit(n._events.POPSTATE)},n._hrefEnabled&&(e=function(e){var t=e.href,o=e.hash;t!==window.location.href?n.emitter.emit(n._events.PUSHSTATE,t):!this._hashEnabled&&o&&K(o)},t=t||window.document,window.addEventListener("click",function(n){if(!(n.button&&0!==n.button||n.ctrlKey||n.metaKey||n.altKey||n.shiftKey||n.defaultPrevented)){var o=function e(n){if(n&&n!==t)return"a"!==n.localName||void 0===n.href?e(n.parentNode):n}(n.target);o&&(window.location.protocol!==o.protocol||window.location.hostname!==o.hostname||window.location.port!==o.port||o.hasAttribute("data-nanohref-ignore")||o.hasAttribute("download")||"_blank"===o.getAttribute("target")&&b.test(o.getAttribute("rel"))||w.test(o.getAttribute("href"))||(n.preventDefault(),e(o)))}}))),this._setCache(this.state),this._stores.forEach(function(e){e(n.state)}),this._matchRoute(),this._tree=this._prerender(this.state),this.emitter.prependListener(n._events.RENDER,function(e,t){t||(t=window.requestAnimationFrame);var n=!1,o=null;return function(){null!==o||n||(n=!0,t(function(){n=!1;for(var t=o.length,i=new Array(t),r=0;r<t;r++)i[r]=o[r];e.apply(e,i),o=null})),o=arguments}}(function(){var e=f("choo.render"),t=n._prerender(n.state),o=f("choo.morph");T(n._tree,t),o(),e()})),s(function(){n.emitter.emit(n._events.DOMCONTENTLOADED),n._loaded=!0}),this._tree},z.prototype.mount=function(e){if("object"!==("undefined"==typeof window?"undefined":G(window)))return this.selector=e,this;var t=this;s(function(){var n=f("choo.render"),o=t.start();t._tree="string"==typeof e?document.querySelector(e):e;var i=f("choo.morph");T(t._tree,o),i(),n()})},z.prototype.toString=function(e,t){this.state=O(this.state,t||{});var n=this;this._setCache(this.state),this._stores.forEach(function(e){e(n.state)}),this._matchRoute(e);var o=this._prerender(this.state);return"string"==typeof o.outerHTML?o.outerHTML:o.toString()},z.prototype._matchRoute=function(e){var t,n;e?(t=e.replace(/\?.+$/,"").replace(/\/$/,""),this._hashEnabled||(t=t.replace(/#.+$/,"")),n=e):(t=window.location.pathname.replace(/\/$/,""),this._hashEnabled&&(t+=window.location.hash.replace(/^#/,"/")),n=window.location.search);var o,i=this.router.match(t);return this._handler=i.cb,this.state.href=t,this.state.query=(o={},n.replace(/^.*\?/,"").replace(k,function(e,t,n,i){o[decodeURIComponent(t)]=decodeURIComponent(i)}),o),this.state.route=i.route,this.state.params=i.params,this.state},z.prototype._prerender=function(e){var t=f("choo.prerender('"+e.route+"')"),n=this._handler(e,this.emit);return t(),n},z.prototype._setCache=function(e){var t=new o(e,this.emitter.emit.bind(this.emitter),this._cache);function n(e,n){for(var o=[],i=0,r=arguments.length;i<r;i++)o.push(arguments[i]);return t.render.apply(t,o)}e.cache=n,n.toJSON=function(){return null}},Array.prototype.includes=function(e){return-1!==this.indexOf(e)},String.prototype.characterize=function(e){for(var t=this.split(""),n=0;n<this.length;n++)e(t[n])};var F=["False","None","True","and","as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","nonlocal","not","or","pass","raise","return","try","while","with","yield"],X=["abs","dict","help","min","setattr","all","dir","hex","next","slice","any","divmod","id","object","sorted","ascii","enumerate","input","oct","staticmethod","bin","eval","int","open","str","bool","exec","isinstance","ord","sum","bytearray","filter","issubclass","pow","super","bytes","float","iter","print","tuple","callable","format","len","property","type","chr","frozenset","list","range","vars","classmethod","getattr","locals","repr","zip","compile","globals","map","reversed","_import_","complex","hasattr","max","round","delattr","hash","memoryview","set"];function B(e,t){e.send(JSON.stringify({messageType:"requestAction",data:{exec:t}}))}var Z=/\n[\s]+$/,Q=/^\n[\s]+/,ee=/[\s]+$/,te=/^[\s]+/,ne=/[\n\s]+/g,oe=["a","abbr","b","bdi","bdo","br","cite","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","amp","small","span","strong","sub","sup","time","u","var","wbr"],ie=["code","pre","textarea"],re=function e(t,n){if(Array.isArray(n))for(var o,i,r=t.nodeName.toLowerCase(),a=!1,s=0,c=n.length;s<c;s++){var l=n[s];if(Array.isArray(l))e(t,l);else{("number"==typeof l||"boolean"==typeof l||"function"==typeof l||l instanceof Date||l instanceof RegExp)&&(l=l.toString());var u=t.childNodes[t.childNodes.length-1];if("string"==typeof l)a=!0,u&&"#text"===u.nodeName?u.nodeValue+=l:(l=document.createTextNode(l),t.appendChild(l),u=l),s===c-1&&(a=!1,-1===oe.indexOf(r)&&-1===ie.indexOf(r)?""===(o=u.nodeValue.replace(Q,"").replace(ee,"").replace(Z,"").replace(ne," "))?t.removeChild(u):u.nodeValue=o:-1===ie.indexOf(r)&&(i=0===s?"":" ",o=u.nodeValue.replace(Q,i).replace(te," ").replace(ee,"").replace(Z,"").replace(ne," "),u.nodeValue=o));else if(l&&l.nodeType){a&&(a=!1,-1===oe.indexOf(r)&&-1===ie.indexOf(r)?""===(o=u.nodeValue.replace(Q,"").replace(Z,"").replace(ne," "))?t.removeChild(u):u.nodeValue=o:-1===ie.indexOf(r)&&(o=u.nodeValue.replace(te," ").replace(Q,"").replace(Z,"").replace(ne," "),u.nodeValue=o));var d=l.nodeName;d&&(r=d.toLowerCase()),t.appendChild(l)}}}},ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},se=function e(t,n,o){if("object"!==(void 0===n?"undefined":ae(n)))n&&("className"===n&&(n="class"),"htmlFor"===n&&(n="for"),"on"===n.slice(0,2)?t[n]=o:(!0===o&&(o=n),t.setAttribute(n,o)));else for(var i in n)n.hasOwnProperty(i)&&e(t,i,n[i])},ce=J();ce.use(function(e,t){e.router={active:"console"},t.on("switch-views",function(){switch(e.router.active){case"console":e.router.active="editors",t.emit("highlight");break;case"editors":e.router.active="console"}t.emit("render")})}),ce.use(function(t,n){t.connection={ip:null,ws:null,interval:0};try{var o=localStorage.getItem("ip");o&&(t.connection.ip=o)}catch(e){console.log(e)}n.on("connect",function(o){if(n.emit("println"),o||(o=t.connection.ip),o||(o=location.host),o){t.connection.ip=o;try{localStorage.setItem("ip",o)}catch(t){console.log(e)}n.emit("println","Connecting to Pixel Kit on ip: "+o),n.emit("disable-console");var i=50;t.connection.interval=setInterval(function(){n.emit("print","."),(i-=1)<0&&(clearInterval(t.connection.interval),n.emit("connected"))},500),function(e){return new Promise(function(t,n){try{var o=new WebSocket("ws://"+e);o.onopen=function(e){t(o)},o.onerror=function(e){n(e)}}catch(e){n(e)}})}(t.connection.ip).then(function(e){n.emit("connected",e)}).catch(function(e){n.emit("connected")})}else n.emit("print","You must provide an ip to connect"),n.emit("new-line")}),n.on("connected",function(e){clearInterval(t.connection.interval),e?(t.connection.ws=e,t.connection.ws.onmessage=function(e){try{var t=JSON.parse(e.data);switch(t.messageType){case"event":case"listdir":case"load_file_content":case"create_file":case"remove_file":n.emit("event",t)}}catch(e){console.log(e)}}):t.ws=!1,n.emit("boot")}),n.on("event",function(e){if(e.data.log){n.emit("println");try{n.emit("print",JSON.stringify(e.data.log))}catch(t){n.emit("print",e.data.log)}}e.data.listdir&&(n.emit("println"),n.emit("print",e.data.listdir.list.join("\n"))),e.data.load_file_content&&(console.log(e.data.load_file_content),n.emit("load-code",e.data.load_file_content.content.join("")),n.emit("save")),(e.data.code_executed||e.data.listdir||e.data.load_file_content||e.data.create_file||e.data.remove_file)&&(n.emit("new-line"),n.emit("enable-console"))}),n.on("run",function(){n.emit("disable-console"),t.connection.ws?B(t.connection.ws,t.codeeditor.code):(n.emit("println"),n.emit("print","You must be connected to run code"),n.emit("new-line"),n.emit("enable-console"))}),n.on("eval",function(e){n.emit("disable-console"),e?t.connection.ws?B(t.connection.ws,e):(n.emit("println"),n.emit("print","You must be connected to evaluate code"),n.emit("new-line"),n.emit("enable-console")):(n.emit("new-line"),n.emit("enable-console"))}),n.on("reset",function(){if(t.connection.ws){n.emit("disable-console"),n.emit("println"),n.emit("println","Reseting Pixel Kit. This can take a while..."),o=t.connection.ws,data={exec:"import machine;machine.reset()"},o.send(JSON.stringify({messageType:"requestAction",data:data}));var e=setInterval(function(){n.emit("print",".")},500);setTimeout(function(){clearInterval(e),n.emit("connect")},1e4)}else n.emit("println"),n.emit("print","You must be connected to reset"),n.emit("new-line"),n.emit("enable-console");var o}),n.on("listdir",function(){var e;t.connection.ws?(n.emit("disable-console"),e=e||"",t.connection.ws.send(JSON.stringify({messageType:"requestAction",data:{listdir:e}}))):(n.emit("println"),n.emit("print","You must be connected to list files"),n.emit("new-line"),n.emit("enable-console"))}),n.on("load-file-content",function(e){var o;t.connection.ws?(n.emit("disable-console"),e?(o=e,t.connection.ws.send(JSON.stringify({messageType:"requestAction",data:{load_file_content:o}}))):(n.emit("println"),n.emit("print","You must provide a filename"),n.emit("new-line"),n.emit("enable-console"))):(n.emit("println"),n.emit("print","You must be connected to load files"),n.emit("new-line"),n.emit("enable-console"))}),n.on("create-file",function(e){var o,i,r;t.connection.ws?(n.emit("disable-console"),e?(o=t.connection.ws,i=e,r=t.codeeditor.code,o.send(JSON.stringify({messageType:"requestAction",data:{create_file:{path:i,content:r}}}))):(n.emit("println"),n.emit("print","You must provide a filename"),n.emit("new-line"),n.emit("enable-console"))):(n.emit("println"),n.emit("print","You must be connected to save files"),n.emit("new-line"),n.emit("enable-console"))}),n.on("remove-file",function(e){var o;t.connection.ws?(n.emit("disable-console"),e?(o=e,t.connection.ws.send(JSON.stringify({messageType:"requestAction",data:{remove_file:o}}))):(n.emit("println"),n.emit("print","You must provide a filename"),n.emit("new-line"),n.emit("enable-console"))):(n.emit("println"),n.emit("print","You must be connected to load files"),n.emit("new-line"),n.emit("enable-console"))})}),ce.use(function(e,t){e.console={out:"",readOnly:!0},t.on("disable-console",function(){e.console.readOnly=!0,t.emit("render")}),t.on("enable-console",function(){e.console.readOnly=!1,t.emit("render")}),t.on("scroll-console",function(){var e=document.querySelector("#console-input");e.scrollTop=e.scrollHeight}),t.on("print",function(n){e.console.out+=n,t.emit("render"),t.emit("scroll-console")}),t.on("println",function(n){n=n||"",e.console.out+=n+"\n",t.emit("render"),t.emit("scroll-console")}),t.on("new-line",function(e){t.emit("print","\n> ")}),t.on("backspace",function(n){e.console.out=e.console.out.substr(0,e.console.out.length-1),t.emit("render")}),t.on("clear",function(n){e.console.out="",t.emit("render")}),t.on("evaluate",function(e){var n=e.split(" ");switch(n[0]){case"help":"plx"==n[1]?(window.open("index.html#help"),t.emit("new-line")):(t.emit("print","\n############################################\n#        PIXEL32 REAL TINY COMPUTER        #\n############################################\n\nOh, hey! Welcome to the PIXEL32 COMMAND LINE\n\nPress <ESC> to switch between COMMAND LINE\nand CODE EDITOR.\n\nCommands available:\n\nhelp plx\n  Send help, please...\n\nconnect\n  Does what is says\n\nclear\n  Clean up your screen (use with caution).\n\nreset\n  Soft reset your RPK. Needs to be\n  connected.\n\nrun\n  Execute the code from editor. Needs to be\n  connected.\n\nls\n  List the files on your board. Needs to be\n  connected.\n\nload filename.py\n  Load content from a file to CODE EDITOR.\n  Needs to be connected.\n\nsave filename.py\n  Save the content from CODE EDITOR to file.\n  Needs to be connected.\n\nremove filename.py\n  Remove file from board. Needs to be\n  connected\n\nOnce you are connected, everything else than\nthe commands above will be interpreted as\nMicroPython.\n\nTo print values on screen, use the function\nlog(). It works like this:\n\n> log('hello world')\n[\"hello world\"]\n\n"),t.emit("new-line"));break;case"connect":t.emit("connect",n[1]);break;case"run":t.emit("run");break;case"reset":t.emit("reset");break;case"clear":t.emit("clear"),t.emit("print","> ");break;case"ls":t.emit("listdir");break;case"load":t.emit("load-file-content",n[1]);break;case"save":t.emit("create-file",n[1]);break;case"remove":t.emit("remove-file",n[1]);break;default:t.emit("eval",e)}}),t.on("boot",function(){t.emit("clear"),t.emit("print","PIXEL32 REAL TINY COMPUTER\nhttps://kano.me\n\n"+(e.connection.ws?"Connected to "+e.connection.ip:"Not connected")+"\n\nhello! type help for help\n\n> "),t.emit("enable-console")})}),ce.use(function(e,t){function n(){var t;e.codeeditor.highlighted=((t=document.createElement("pre")).setAttribute("id","highlight-area"),t.setAttribute("class","textarea"),t)}codeeditor={code:"",highlighted:""},e.codeeditor=codeeditor,n(),setTimeout(function(){try{var e=localStorage.getItem("code");t.emit("load-code",e)}catch(e){console.log(e)}},1),t.on("load-code",function(n){e.codeeditor.code=n,t.emit("highlight")}),t.on("input",function(n){e.codeeditor.code=n.target.value,t.emit("save"),t.emit("highlight")}),t.on("scroll-editor",function(e){var t=document.querySelector("#textarea-input");document.querySelector("#highlight-area").scrollTop=t.scrollTop}),t.on("tab",function(n){var o=n.target.selectionStart,i=n.target.value;i=[i.substr(0,o),"  ",i.substr(o)].join(""),e.codeeditor.code=i,t.emit("save"),t.emit("highlight")}),t.on("save",function(){try{localStorage.setItem("code",e.codeeditor.code)}catch(e){console.log(e)}}),t.on("highlight",function(){var o=function(e){var t=[],n="",o=null,i=function(){o={type:"space",value:" "},n=""},r=function(){n&&(F.includes(n)?t.push({type:"keyword",value:n}):X.includes(n)?t.push({type:"function",value:n}):""!==n&&(isNaN(n)?t.push({type:"default",value:n}):t.push({type:"number",value:n})),n="")};(e=e||"").characterize(function(e){switch(" "!==e&&o&&"space"===o.type&&(t.push(o),n="",o=null),e){case" ":F.includes(n)?(t.push({type:"keyword",value:n}),i()):X.includes(n)?(t.push({type:"function",value:n}),i()):""!==n?(isNaN(n)?t.push({type:"default",value:n}):t.push({type:"number",value:n}),i()):o?o.value+=" ":i();break;case'"':case"'":o?"string"===o.type?o.value[0]===e?(o.value+=e,t.push(o),o=null):o.value+=e:"comment"===o.type&&(o.value+=e):(n&&(t.push({type:"default",value:n}),n=""),o={type:"string",value:e});break;case"=":case"+":case"-":case"*":case"/":case"%":case"&":case"|":case">":case"<":case"!":o?o.value+=e:(r(),t.push({type:"operator",value:e}));break;case"#":o?o.value+=e:(r(),o={type:"comment",value:e});break;case":":o?o.value+=e:(r(),t.push({type:"colon",value:e}));break;case"(":o?o.value+=e:(r(),t.push({type:"left-parentheses",value:e}));break;case")":o?o.value+=e:(r(),t.push({type:"right-parentheses",value:e}));break;case"[":o?o.value+=e:(r(),t.push({type:"left-bracket",value:e}));break;case"]":o?o.value+=e:(r(),t.push({type:"right-bracket",value:e}));break;case",":o?o.value+=e:(r(),t.push({type:"comma",value:e}));break;case"\n":if(o)switch(o.type){case"string":case"comment":t.push(o),o=null}else r(),n="";t.push({type:"newline",value:"\n"});break;case";":o?o.value+=e:(r(),t.push({type:"semicolon",value:e}));break;default:o?o.value+=e:n+=e}}),r(),o&&t.push(o);for(var a=!1,s=t.length,c=0;c<s;c++){var l=t[c];if("keyword"!==l.type||"def"!==l.value&&"class"!==l.value)if("default"===l.type&&a)l.type="argument";else if("left-parentheses"===l.type){var u;(u=t[c-1])&&"function-name"===u.type&&(a=!0)}else"right-parentheses"===l.type&&(a=!1);else(u=t[c+2])&&"default"===u.type&&(u.type="function-name")}return t}(e.codeeditor.code);n();for(var i=0;i<o.length;i++){var r=o[i],a=document.createElement("span");a.className="highlight-"+r.type,a.innerText=r.value,e.codeeditor.highlighted.appendChild(a)}var s=e.codeeditor.code.split("\n");if(""===s[s.length-1]){var c=document.createElement("br");e.codeeditor.highlighted.appendChild(c)}t.emit("render"),t.emit("scroll-editor")}),t.on("dragging",function(e){document.body.style.opacity=e?.5:1}),t.on("dragover",function(e){t.emit("dragging",!0)}),t.on("dragleave",function(e){t.emit("dragging",!1)}),t.on("dragdrop",function(e){t.emit("dragging",!1);var n=new FileReader;n.onload=function(){t.emit("load-code",n.result),t.emit("save")},n.readAsText(e)})}),ce.route("/",function(e,t){return function(){var e=document.createElement("body");e.onkeydown=arguments[7];var t=document.createElement("div");t.setAttribute("id","container");var n=document.createElement("div");n.setAttribute("id","console"),se(n,arguments[1],arguments[0]),re(n,["\n                ",arguments[2],"\n            "]);var o=document.createElement("div");return o.setAttribute("id","editors"),se(o,arguments[4],arguments[3]),re(o,["\n                ",arguments[5],"\n                ",arguments[6],"\n            "]),re(t,["\n            ",n,"\n            ",o,"\n        "]),re(e,["\n        ",t,"\n    "]),e}("console"===e.router.active?"active":"","console"===e.router.active?"active":"",function(e,t){return function(){var e=document.createElement("textarea");return e.setAttribute("id","console-input"),e.onkeydown=arguments[0],se(e,arguments[2],arguments[1]),e.setAttribute("class","textarea"),re(e,[arguments[3]]),e}(function(n){if(n.preventDefault(),n.altKey||n.ctrlKey||n.metaKey||n.repeat||e.console.readOnly)return!1;var o=e.console.out.split("\n").slice(-1)[0];switch(n.key.toLowerCase()){case"enter":t("evaluate",o.substr(2));break;case"backspace":"> "!=o&&t("backspace");break;case"escape":case"shift":case"tab":case"arrowup":case"arrowdown":case"arrowleft":case"arrowright":break;default:t("print",n.key)}return n.target.scrollTo(0,n.target.scrollHeight),!1},e.console.readonly?"readonly":"",e.console.readOnly?"readonly":"",e.console.out)}(e,t),"editors"===e.router.active?"active":"","editors"===e.router.active?"active":"",function(){var e=document.createElement("div");e.setAttribute("id","toolbar");var t=document.createElement("div");t.setAttribute("class","menu");var n=document.createElement("div");n.setAttribute("active","active"),n.setAttribute("class","item code-editor");var o=document.createElement("button");re(o,["\ud83d\udcdd"]);var i=document.createElement("div");i.setAttribute("class","label"),re(i,["CODE EDITOR"]),re(n,["\n                ",o,"\n                ",i,"\n            "]);var r=document.createElement("div");r.setAttribute("class","item sprite-editor");var a=document.createElement("button");a.setAttribute("data-name","sprite-editor"),re(a,["\ud83d\udc7b"]);var s=document.createElement("div");return s.setAttribute("class","label"),re(s,["SPRITE EDITOR"]),re(r,["\n                ",a,"\n                ",s,"\n            "]),re(t,["\n            ",n,"\n            ",r,"\n        "]),re(e,["\n        ",t,"\n    "]),e}(),function(e,t){return function(){var e=document.createElement("div");e.setAttribute("id","content-box"),e.setAttribute("class","textarea");var t=document.createElement("textarea");return t.setAttribute("id","textarea-input"),t.setAttribute("wrap","soft"),t.setAttribute("spellcheck","false"),t.ondragover=arguments[0],t.ondragleave=arguments[1],t.ondrop=arguments[2],t.oninput=arguments[3],t.onscroll=arguments[4],t.onkeydown=arguments[5],re(t,[arguments[6]]),re(e,["\n        ",t,"\n            ",arguments[7],"\n    "]),e}(function(e){e.stopPropagation(),e.preventDefault(),t("dragging",!0)},function(e){e.stopPropagation(),e.preventDefault(),t("dragging",!1)},function(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files.length&&t("dragdrop",e.dataTransfer.files[0])},function(e){t("input",e)},function(e){t("scroll-editor",e)},function(e){switch(e.keyCode){case 9:e.preventDefault(),t("tab",e)}},e.codeeditor.code,e.codeeditor.highlighted)}(e,t),function(e){switch(e.key.toLowerCase()){case"escape":t("switch-views")}})}),ce.route("/help",function(e,t){return n=re,o=document.createElement("body"),n(i=document.createElement("h1"),["HELP"]),n(o,["\n        ",i,"\n    "]),o;var n,o,i}),ce.mount("body"),setTimeout(function(){ce.emit("boot")},1)}();
//# sourceMappingURL=bundle.js.map