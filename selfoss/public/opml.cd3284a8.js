!function(){var e=document.querySelector("form"),n=document.querySelector(".message-container"),t=document.querySelector("input[type=submit]");function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function a(e){return(null!=e?e:[]).map(r).join("<br>")}e.addEventListener("submit",(function(o){o.preventDefault();var s=t.value;t.disabled=!0,t.value="Importing…",n.innerHTML="";var c=new Request(e.action,{method:"POST",body:new FormData(e)});fetch(c).then((function(e){return e.json().then((function(t){var o=t.messages;200===e.status?n.innerHTML='<p class="msg success">'.concat(a(o),' You might want to <a href="update">update now</a> or <a href="./">view your feeds</a>.</p>'):202===e.status?n.innerHTML='<p class="msg error">The following feeds could not be imported:<br>'.concat(a(o),"</p>"):400===e.status?n.innerHTML='<p class="msg error">There was a problem importing your OPML file:<br>'.concat(a(o),"</p>"):n.innerHTML='<p class="msg error">Unexpected happened. <details><pre>'.concat(r(JSON.stringify(o)),"</pre></details></p>")}))})).catch((function(e){n.innerHTML='<p class="msg error">Unexpected happened. <details><pre>'.concat(r(JSON.stringify(e)),"</pre></details></p>")})).finally((function(){t.disabled=!1,t.value=s}))}))}();
//# sourceMappingURL=opml.cd3284a8.js.map