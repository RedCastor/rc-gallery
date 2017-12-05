!function(e,t,n){"use strict";"object"==typeof exports?module.exports=n():"function"==typeof define&&define.amd?define([],n):e.JSONPretty=n()}(window,angular,function(){"use strict";var e=function(e,t,n,o,r){var i=t||"";return n&&(i=i+"<span class=json-key>"+n.replace(/[": ]/g,"")+"</span>: "),o&&(i=i+('"'==o[0]?"<span class=json-string>":"<span class=json-value>")+o+"</span>"),i+(r||"")},t=angular.module("angular-json-pretty",[]);return t.directive("jsonPretty",[function(){return{restrict:"A",scope:{data:"="},link:function(t,n){t.$watch("data",function(t){t&&n.html(function(t){var n=t;try{return"string"==typeof t&&(n=JSON.parse(t)),JSON.stringify(n,null,3).replace(/&/g,"&amp;").replace(/\\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm,e)}catch(e){return"invalid JSON"}}(t))},!0)}}}]),t}),function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("whatInput",[],t):"object"==typeof exports?exports.whatInput=t():e.whatInput=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){"use strict";e.exports=function(){var e="initial",t=null,n=document.documentElement,o=["input","select","textarea"],r=[],i=[16,17,18,91,93],u={keydown:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},a=[],s=!1,c=!1,d={x:null,y:null},p={2:"touch",3:"touch",4:"mouse"},f=!1;try{var l=Object.defineProperty({},"passive",{get:function(){f=!0}});window.addEventListener("test",null,l)}catch(e){}var v=function(){window.PointerEvent?(n.addEventListener("pointerdown",m),n.addEventListener("pointermove",w)):window.MSPointerEvent?(n.addEventListener("MSPointerDown",m),n.addEventListener("MSPointerMove",w)):(n.addEventListener("mousedown",m),n.addEventListener("mousemove",w),"ontouchstart"in window&&(n.addEventListener("touchstart",h),n.addEventListener("touchend",h))),n.addEventListener(E(),w,!!f&&{passive:!0}),n.addEventListener("keydown",m)},m=function(n){if(!s){var r=n.which,a=u[n.type];if("pointer"===a&&(a=g(n)),e!==a||t!==a){var c=document.activeElement,d=!1;c&&c.nodeName&&-1===o.indexOf(c.nodeName.toLowerCase())&&(d=!0),("touch"===a||"mouse"===a||"keyboard"===a&&r&&d&&-1===i.indexOf(r))&&(e=t=a,y())}}},y=function(){n.setAttribute("data-whatinput",e),n.setAttribute("data-whatintent",e),-1===a.indexOf(e)&&(a.push(e),n.className+=" whatinput-types-"+e),x("input")},w=function(e){if(d.x!==e.screenX||d.y!==e.screenY?(c=!1,d.x=e.screenX,d.y=e.screenY):c=!0,!s&&!c){var o=u[e.type];"pointer"===o&&(o=g(e)),t!==o&&(t=o,n.setAttribute("data-whatintent",t),x("intent"))}},h=function(e){"touchstart"===e.type?(s=!1,m(e)):s=!0},x=function(e){for(var n=0,o=r.length;n<o;n++)r[n].type===e&&r[n].function.call(void 0,t)},g=function(e){return"number"==typeof e.pointerType?p[e.pointerType]:"pen"===e.pointerType?"touch":e.pointerType},E=function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"};return"addEventListener"in window&&Array.prototype.indexOf&&(u[E()]="mouse",v(),y()),{ask:function(n){return"loose"===n?t:e},types:function(){return a},ignoreKeys:function(e){i=e},onChange:function(e,t){r.push({function:e,type:t})}}}()}])});
//# sourceMappingURL=main.js.map