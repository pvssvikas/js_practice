function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)s=pug_classes(r[g]),s&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function roomTabPill(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\\views\\room-tabPillTemplate.pug":"li \r\n    a(data-toggle='pill' href=tabName class = roomName) #{roomName}"};
;var locals_for_with = (locals || {});(function (roomName, tabName) {;pug_debug_line = 1;pug_debug_filename = ".\\views\\room-tabPillTemplate.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 1;pug_debug_filename = ".\\views\\room-tabPillTemplate.pug";
pug_html = pug_html + " ";
;pug_debug_line = 2;pug_debug_filename = ".\\views\\room-tabPillTemplate.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([roomName], [true]), false, false)+" data-toggle=\"pill\""+pug_attr("href", tabName, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\\views\\room-tabPillTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = roomName) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";}.call(this,"roomName" in locals_for_with?locals_for_with.roomName:typeof roomName!=="undefined"?roomName:undefined,"tabName" in locals_for_with?locals_for_with.tabName:typeof tabName!=="undefined"?tabName:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}