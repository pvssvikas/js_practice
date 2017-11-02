function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function roomTabContent(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\\views\\room-tabContentTemplate.pug":"div(id = roomName class = \"tab-pane fade\") \r\n  .col-md-2.col-sm-2.col-xs-2\r\n    button(class = \"btn btn-secondary buttonSize\"  value  = roomName onclick=\"myFunction(this.value)\" )  \r\n      a(class = \"textSize\" value = \"\") +\r\n"};
;var locals_for_with = (locals || {});(function (roomName) {;pug_debug_line = 1;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"tab-pane fade\""+pug_attr("id", roomName, true, false)) + "\u003E";
;pug_debug_line = 1;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + " ";
;pug_debug_line = 2;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-2 col-sm-2 col-xs-2\"\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"btn btn-secondary buttonSize\""+pug_attr("value", roomName, true, false)+" onclick=\"myFunction(this.value)\"") + "\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + " ";
;pug_debug_line = 4;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "\u003Ca class=\"textSize\" value=\"\"\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\\views\\room-tabContentTemplate.pug";
pug_html = pug_html + "+\u003C\u002Fa\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"roomName" in locals_for_with?locals_for_with.roomName:typeof roomName!=="undefined"?roomName:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}