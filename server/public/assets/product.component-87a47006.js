import{r as g,_ as U,a as $,b as F,c as B,d as H,g as J,e as M,f as W,h as D,j as x}from"./index-3ec254b6.js";function K(){if(console&&console.warn){for(var n,e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];typeof t[0]=="string"&&(t[0]="react-i18next:: ".concat(t[0])),(n=console).warn.apply(n,t)}}var k={};function j(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];typeof e[0]=="string"&&k[e[0]]||(typeof e[0]=="string"&&(k[e[0]]=new Date),K.apply(void 0,e))}function E(n,e,t){n.loadNamespaces(e,function(){if(n.isInitialized)t();else{var a=function s(){setTimeout(function(){n.off("initialized",s)},0),t()};n.on("initialized",a)}})}function Y(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=e.languages[0],s=e.options?e.options.fallbackLng:!1,f=e.languages[e.languages.length-1];if(a.toLowerCase()==="cimode")return!0;var r=function(i,o){var m=e.services.backendConnector.state["".concat(i,"|").concat(o)];return m===-1||m===2};return t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&e.services.backendConnector.backend&&e.isLanguageChangingTo&&!r(e.isLanguageChangingTo,n)?!1:!!(e.hasResourceBundle(a,n)||!e.services.backendConnector.backend||e.options.resources&&!e.options.partialBundledLanguages||r(a,n)&&(!s||r(f,n)))}function q(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!e.languages||!e.languages.length)return j("i18n.languages were undefined or empty",e.languages),!0;var a=e.options.ignoreJSONStructure!==void 0;return a?e.hasLoadedNamespace(n,{precheck:function(f,r){if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&f.services.backendConnector.backend&&f.isLanguageChangingTo&&!r(f.isLanguageChangingTo,n))return!1}}):Y(n,e,t)}var G=g.createContext(),Q=function(){function n(){$(this,n),this.usedNamespaces={}}return U(n,[{key:"addUsedNamespaces",value:function(t){var a=this;t.forEach(function(s){a.usedNamespaces[s]||(a.usedNamespaces[s]=!0)})}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),n}();function X(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var a,s,f,r,p=[],i=!0,o=!1;try{if(f=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;i=!1}else for(;!(i=(a=f.call(t)).done)&&(p.push(a.value),p.length!==e);i=!0);}catch(m){o=!0,s=m}finally{try{if(!i&&t.return!=null&&(r=t.return(),Object(r)!==r))return}finally{if(o)throw s}}return p}}function Z(n,e){return F(n)||X(n,e)||B(n,e)||H()}function A(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(n,s).enumerable})),t.push.apply(t,a)}return t}function C(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?A(Object(t),!0).forEach(function(a){M(n,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):A(Object(t)).forEach(function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(t,a))})}return n}var V=function(e,t){var a=g.useRef();return g.useEffect(function(){a.current=t?a.current:e},[e,t]),a.current};function R(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=e.i18n,a=g.useContext(G)||{},s=a.i18n,f=a.defaultNS,r=t||s||W();if(r&&!r.reportNamespaces&&(r.reportNamespaces=new Q),!r){j("You will need to pass in an i18next instance by using initReactI18next");var p=function(d,c){return typeof c=="string"?c:c&&D(c)==="object"&&typeof c.defaultValue=="string"?c.defaultValue:Array.isArray(d)?d[d.length-1]:d},i=[p,{},!1];return i.t=p,i.i18n={},i.ready=!1,i}r.options.react&&r.options.react.wait!==void 0&&j("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var o=C(C(C({},J()),r.options.react),e),m=o.useSuspense,O=o.keyPrefix,u=n||f||r.options&&r.options.defaultNS;u=typeof u=="string"?[u]:u||["translation"],r.reportNamespaces.addUsedNamespaces&&r.reportNamespaces.addUsedNamespaces(u);var v=(r.isInitialized||r.initializedStoreOnce)&&u.every(function(l){return q(l,r,o)});function b(){return r.getFixedT(null,o.nsMode==="fallback"?u:u[0],O)}var z=g.useState(b),P=Z(z,2),I=P[0],N=P[1],w=u.join(),L=V(w),h=g.useRef(!0);g.useEffect(function(){var l=o.bindI18n,d=o.bindI18nStore;h.current=!0,!v&&!m&&E(r,u,function(){h.current&&N(b)}),v&&L&&L!==w&&h.current&&N(b);function c(){h.current&&N(b)}return l&&r&&r.on(l,c),d&&r&&r.store.on(d,c),function(){h.current=!1,l&&r&&l.split(" ").forEach(function(S){return r.off(S,c)}),d&&r&&d.split(" ").forEach(function(S){return r.store.off(S,c)})}},[r,w]);var T=g.useRef(!0);g.useEffect(function(){h.current&&!T.current&&N(b),T.current=!1},[r,O]);var y=[I,r,v];if(y.t=I,y.i18n=r,y.ready=v,v||!v&&!m)return y;throw new Promise(function(l){E(r,u,function(){l()})})}const ee=()=>{const[n,e]=R("product"),[t]=R("products"),a=()=>{const s=e.language==="ar"?"en":"ar";e.changeLanguage(s),localStorage.language=s};return x.jsxs("div",{dir:e.language==="ar"?"rtl":"ltr",children:[x.jsx("button",{className:"rtl:bg-red-500 ltr:bg-blue-500",onClick:a,children:e.language==="ar"?"en":"ar"}),x.jsx("p",{children:`${t("title")} 
        ${n("title")} 
        ${n("desc.name")} 
        ${n("desc.price")} 
        ${n("msg",{msgCtr:2})}`})]})};export{ee as default};