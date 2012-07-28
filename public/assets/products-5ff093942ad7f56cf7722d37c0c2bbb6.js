(function(e){"use strict";var t=e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype,n=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder,r=n&&e.atob&&e.ArrayBuffer&&e.Uint8Array&&function(e){var t,r,i,s,o,u;e.split(",")[0].indexOf("base64")>=0?t=atob(e.split(",")[1]):t=decodeURIComponent(e.split(",")[1]),r=new ArrayBuffer(t.length),i=new Uint8Array(r);for(s=0;s<t.length;s+=1)i[s]=t.charCodeAt(s);return o=new n,o.append(r),u=e.split(",")[0].split(":")[1].split(";")[0],o.getBlob(u)};e.HTMLCanvasElement&&!t.toBlob&&(t.mozGetAsFile?t.toBlob=function(e,t){e(this.mozGetAsFile("blob",t))}:t.toDataURL&&r&&(t.toBlob=function(e,t){e(r(this.toDataURL(t)))})),typeof define!="undefined"&&define.amd?define(function(){return r}):e.dataURLtoBlob=r})(this),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):e(window.jQuery)}(function(e){"use strict";var t=0,n=["accepts","cache","contents","contentType","crossDomain","data","dataType","headers","ifModified","mimeType","password","processData","timeout","traditional","type","url","username"],r=function(e){return e};e.ajaxSetup({converters:{"postmessage text":r,"postmessage json":r,"postmessage html":r}}),e.ajaxTransport("postmessage",function(r){if(r.postMessage&&window.postMessage){var i,s=e("<a>").prop("href",r.postMessage)[0],o=s.protocol+"//"+s.host,u=r.xhr().upload;return{send:function(s,a){var f={id:"postmessage-transport-"+(t+=1)},l="message."+f.id;i=e('<iframe style="display:none;" src="'+r.postMessage+'" name="'+f.id+'"></iframe>').bind("load",function(){e.each(n,function(e,t){f[t]=r[t]}),f.dataType=f.dataType.replace("postmessage ",""),e(window).bind(l,function(t){t=t.originalEvent;var n=t.data,r;t.origin===o&&n.id===f.id&&(n.type==="progress"?(r=document.createEvent("Event"),r.initEvent(n.type,!1,!0),e.extend(r,n),u.dispatchEvent(r)):(a(n.status,n.statusText,{postmessage:n.result},n.headers),i.remove(),e(window).unbind(l)))}),i[0].contentWindow.postMessage(f,o)}).appendTo(document.body)},abort:function(){i&&i.remove()}}}})}),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):e(window.jQuery)}(function(e){"use strict";window.XDomainRequest&&!e.support.cors&&e.ajaxTransport(function(t){if(t.crossDomain&&t.async){t.timeout&&(t.xdrTimeout=t.timeout,delete t.timeout);var n;return{send:function(r,i){function o(t,r,s,o){n.onload=n.onerror=n.ontimeout=e.noop,n=null,i(t,r,s,o)}n=new XDomainRequest,t.type==="DELETE"?(t.url=t.url+(/\?/.test(t.url)?"&":"?")+"_method=DELETE",t.type="POST"):t.type==="PUT"&&(t.url=t.url+(/\?/.test(t.url)?"&":"?")+"_method=PUT",t.type="POST"),n.open(t.type,t.url),n.onload=function(){o(200,"OK",{text:n.responseText},"Content-Type: "+n.contentType)},n.onerror=function(){o(404,"Not Found")},t.xdrTimeout&&(n.ontimeout=function(){o(0,"timeout")},n.timeout=t.xdrTimeout),n.send(t.hasContent&&t.data||null)},abort:function(){n&&(n.onerror=e.noop(),n.abort())}}}})}),window.locale={fileupload:{errors:{maxFileSize:"File is too big",minFileSize:"File is too small",acceptFileTypes:"Filetype not allowed",maxNumberOfFiles:"Max number of files exceeded",uploadedBytes:"Uploaded bytes exceed file size",emptyResult:"Empty file upload result"},error:"Error",start:"Start",cancel:"Cancel",destroy:"Delete"}},$(function(){"use strict";$("#fileupload").fileupload(),$("#fileupload").fileupload("option","redirect",window.location.href.replace(/\/[^\/]*$/,"/cors/result.html?%s")),window.location.hostname==="blueimp.github.com"?($("#fileupload").fileupload("option",{url:"//jquery-file-upload.appspot.com/",maxFileSize:5e6,acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i,process:[{action:"load",fileTypes:/^image\/(gif|jpeg|png)$/,maxFileSize:2e7},{action:"resize",maxWidth:1440,maxHeight:900},{action:"save"}]}),$.support.cors&&$.ajax({url:"//jquery-file-upload.appspot.com/",type:"HEAD"}).fail(function(){$('<span class="alert alert-error"/>').text("Upload server currently unavailable - "+new Date).appendTo("#fileupload")})):$("#fileupload").each(function(){var e=this;$.getJSON(this.action,function(t){t&&t.length&&$(e).fileupload("option","done").call(e,null,{result:t})})})}),function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)}(function(e,t){if(e.cleanData){var n=e.cleanData;e.cleanData=function(t){for(var r=0,i;(i=t[r])!=null;r++)try{e(i).triggerHandler("remove")}catch(s){}n(t)}}else{var r=e.fn.remove;e.fn.remove=function(t,n){return this.each(function(){return n||(!t||e.filter(t,[this]).length)&&e("*",this).add([this]).each(function(){try{e(this).triggerHandler("remove")}catch(t){}}),r.call(e(this),t,n)})}}e.widget=function(t,n,r){var i=t.split(".")[0],s;t=t.split(".")[1],s=i+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][s]=function(n){return!!e.data(n,t)},e[i]=e[i]||{},e[i][t]=function(e,t){arguments.length&&this._createWidget(e,t)};var o=new n;o.options=e.extend(!0,{},o.options),e[i][t].prototype=e.extend(!0,o,{namespace:i,widgetName:t,widgetEventPrefix:e[i][t].prototype.widgetEventPrefix||t,widgetBaseClass:s},r),e.widget.bridge(t,e[i][t])},e.widget.bridge=function(n,r){e.fn[n]=function(i){var s=typeof i=="string",o=Array.prototype.slice.call(arguments,1),u=this;return i=!s&&o.length?e.extend.apply(null,[!0,i].concat(o)):i,s&&i.charAt(0)==="_"?u:(s?this.each(function(){var r=e.data(this,n),s=r&&e.isFunction(r[i])?r[i].apply(r,o):r;if(s!==r&&s!==t)return u=s,!1}):this.each(function(){var t=e.data(this,n);t?t.option(i||{})._init():e.data(this,n,new r(i,this))}),u)}},e.Widget=function(e,t){arguments.length&&this._createWidget(e,t)},e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(t,n){e.data(n,this.widgetName,this),this.element=e(n),this.options=e.extend(!0,{},this.options,this._getCreateOptions(),t);var r=this;this.element.bind("remove."+this.widgetName,function(){r.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(n,r){var i=n;if(arguments.length===0)return e.extend({},this.options);if(typeof n=="string"){if(r===t)return this.options[n];i={},i[n]=r}return this._setOptions(i),this},_setOptions:function(t){var n=this;return e.each(t,function(e,t){n._setOption(e,t)}),this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&this.widget()[t?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",t),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.call(this.element[0],n,r)===!1||n.isDefaultPrevented())}}});