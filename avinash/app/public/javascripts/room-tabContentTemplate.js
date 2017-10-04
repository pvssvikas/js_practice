function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function roomTabContent(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\\views\\room-tabContentTemplate.pug":"div(id = roomName class = \"tab-pane fade\") \r\n    .col-md-2.col-sm-4.col-xs-4\r\n        button(type='submit' class = \"btn btn-outline-secondary addButton\") \r\n            p.addButtonFont #{title}\r\n    "};
;var locals_for_with = (locals || {});(function (roomName, title) {;pug_debug_line = 1;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"tab-pane fade\""+pug_attr("id", roomName, true, false)) + "\u003E";
;pug_debug_line = 1;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + " ";
;pug_debug_line = 2;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-2 col-sm-4 col-xs-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn-outline-secondary addButton\" type=\"submit\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + " ";
;pug_debug_line = 4;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cp class=\"addButtonFont\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"roomName" in locals_for_with?locals_for_with.roomName:typeof roomName!=="undefined"?roomName:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}