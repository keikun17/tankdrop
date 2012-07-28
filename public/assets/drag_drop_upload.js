/*
 * Bootstrap Image Gallery 2.8
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
/*jslint nomen: true, regexp: true */
/*global define, window, document, jQuery */
(function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery","load-image","bootstrap"],e):e(window.jQuery,window.loadImage)})(function(e,t){"use strict";e.extend(e.fn.modal.defaults,{delegate:document,selector:null,filter:"*",index:0,href:null,preloadRange:2,offsetWidth:100,offsetHeight:200,canvas:!1,slideshow:0,imageClickDivision:.5});var n=e.fn.modal.Constructor.prototype.show,r=e.fn.modal.Constructor.prototype.hide;e.extend(e.fn.modal.Constructor.prototype,{initLinks:function(){var t=this,n=this.options,r=n.selector||"a[data-target="+n.target+"]";this.$links=e(n.delegate).find(r).filter(n.filter).each(function(e){t.getUrl(this)===n.href&&(n.index=e)}),this.$links[n.index]||(n.index=0)},getUrl:function(t){return t.href||e(t).data("href")},startSlideShow:function(){var e=this;this.options.slideshow&&(this._slideShow=window.setTimeout(function(){e.next()},this.options.slideshow))},stopSlideShow:function(){window.clearTimeout(this._slideShow)},toggleSlideShow:function(){var e=this.$element.find(".modal-slideshow");this.options.slideshow?(this.options.slideshow=0,this.stopSlideShow()):(this.options.slideshow=e.data("slideshow")||5e3,this.startSlideShow()),e.find("i").toggleClass("icon-play icon-pause")},preloadImages:function(){var t=this.options,n=t.index+t.preloadRange+1,r,i;for(i=t.index-t.preloadRange;i<n;i+=1)r=this.$links[i],r&&i!==t.index&&e("<img>").prop("src",this.getUrl(r))},loadImage:function(){var e=this,n=this.$element,r=this.options.index,i=this.getUrl(this.$links[r]),s;this.abortLoad(),this.stopSlideShow(),n.trigger("beforeLoad"),this._loadingTimeout=window.setTimeout(function(){n.addClass("modal-loading")},100),s=n.find(".modal-image").children().removeClass("in"),window.setTimeout(function(){s.remove()},3e3),n.find(".modal-title").text(this.$links[r].title),n.find(".modal-download").prop("href",i),this._loadingImage=t(i,function(t){e.img=t,window.clearTimeout(e._loadingTimeout),n.removeClass("modal-loading"),n.trigger("load"),e.showImage(t),e.startSlideShow()},this._loadImageOptions),this.preloadImages()},showImage:function(t){var n=this.$element,r=e.support.transition&&n.hasClass("fade"),i=r?n.animate:n.css,s=n.find(".modal-image"),o,u;s.css({width:t.width,height:t.height}),n.find(".modal-title").css({width:Math.max(t.width,380)}),e(window).width()>480&&(r&&(o=n.clone().hide().appendTo(document.body)),i.call(n.stop(),{"margin-top":-((o||n).outerHeight()/2),"margin-left":-((o||n).outerWidth()/2)}),o&&o.remove()),s.append(t),u=t.offsetWidth,n.trigger("display"),r?n.is(":visible")?e(t).on(e.support.transition.end,function(r){r.target===t&&(e(t).off(e.support.transition.end),n.trigger("displayed"))}).addClass("in"):(e(t).addClass("in"),n.one("shown",function(){n.trigger("displayed")})):(e(t).addClass("in"),n.trigger("displayed"))},abortLoad:function(){this._loadingImage&&(this._loadingImage.onload=this._loadingImage.onerror=null),window.clearTimeout(this._loadingTimeout)},prev:function(){var e=this.options;e.index-=1,e.index<0&&(e.index=this.$links.length-1),this.loadImage()},next:function(){var e=this.options;e.index+=1,e.index>this.$links.length-1&&(e.index=0),this.loadImage()},keyHandler:function(e){switch(e.which){case 37:case 38:e.preventDefault(),this.prev();break;case 39:case 40:e.preventDefault(),this.next()}},wheelHandler:function(e){e.preventDefault(),e=e.originalEvent,this._wheelCounter=this._wheelCounter||0,this._wheelCounter+=e.wheelDelta||e.detail||0;if(e.wheelDelta&&this._wheelCounter>=120||!e.wheelDelta&&this._wheelCounter<0)this.prev(),this._wheelCounter=0;else if(e.wheelDelta&&this._wheelCounter<=-120||!e.wheelDelta&&this._wheelCounter>0)this.next(),this._wheelCounter=0},initGalleryEvents:function(){var t=this,n=this.$element;n.find(".modal-image").on("click.modal-gallery",function(n){var r=e(this);t.$links.length===1?t.hide():(n.pageX-r.offset().left)/r.width()<t.options.imageClickDivision?t.prev(n):t.next(n)}),n.find(".modal-prev").on("click.modal-gallery",function(e){t.prev(e)}),n.find(".modal-next").on("click.modal-gallery",function(e){t.next(e)}),n.find(".modal-slideshow").on("click.modal-gallery",function(e){t.toggleSlideShow(e)}),e(document).on("keydown.modal-gallery",function(e){t.keyHandler(e)}).on("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery",function(e){t.wheelHandler(e)})},destroyGalleryEvents:function(){var t=this.$element;this.abortLoad(),this.stopSlideShow(),t.find(".modal-image, .modal-prev, .modal-next, .modal-slideshow").off("click.modal-gallery"),e(document).off("keydown.modal-gallery").off("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery")},show:function(){if(!this.isShown&&this.$element.hasClass("modal-gallery")){var t=this.$element,r=this.options,i=e(window).width(),s=e(window).height();t.hasClass("modal-fullscreen")?(this._loadImageOptions={maxWidth:i,maxHeight:s,canvas:r.canvas},t.hasClass("modal-fullscreen-stretch")&&(this._loadImageOptions.minWidth=i,this._loadImageOptions.minHeight=s)):this._loadImageOptions={maxWidth:i-r.offsetWidth,maxHeight:s-r.offsetHeight,canvas:r.canvas},i>480&&t.css({"margin-top":-(t.outerHeight()/2),"margin-left":-(t.outerWidth()/2)}),this.initGalleryEvents(),this.initLinks(),this.$links.length&&(t.find(".modal-slideshow, .modal-prev, .modal-next").toggle(this.$links.length!==1),t.toggleClass("modal-single",this.$links.length===1),this.loadImage())}n.apply(this,arguments)},hide:function(){this.isShown&&this.$element.hasClass("modal-gallery")&&(this.options.delegate=document,this.options.href=null,this.destroyGalleryEvents()),r.apply(this,arguments)}}),e(function(){e(document.body).on("click.modal-gallery.data-api",'[data-toggle="modal-gallery"]',function(t){var n=e(this),r=n.data(),i=e(r.target),s=i.data("modal"),o;s||(r=e.extend(i.data(),r)),r.selector||(r.selector="a[rel=gallery]"),o=e(t.target).closest(r.selector),o.length&&i.length&&(t.preventDefault(),r.href=o.prop("href")||o.data("href"),r.delegate=o[0]!==this?this:document,s&&e.extend(s.options,r),i.modal(r))})})}),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery","load-image","canvas-to-blob","./jquery.fileupload"],e):e(window.jQuery,window.loadImage)}(function(e,t){"use strict";e.widget("blueimpFP.fileupload",e.blueimp.fileupload,{options:{process:[],add:function(t,n){e(this).fileupload("process",n).done(function(){n.submit()})}},processActions:{load:function(n,r){var i=this,s=n.files[n.index],o=e.Deferred();return window.HTMLCanvasElement&&window.HTMLCanvasElement.prototype.toBlob&&(e.type(r.maxFileSize)!=="number"||s.size<r.maxFileSize)&&(!r.fileTypes||r.fileTypes.test(s.type))?t(s,function(e){n.canvas=e,o.resolveWith(i,[n])},{canvas:!0}):o.rejectWith(i,[n]),o.promise()},resize:function(e,n){if(e.canvas){var r=t.scale(e.canvas,n);if(r.width!==e.canvas.width||r.height!==e.canvas.height)e.canvas=r,e.processed=!0}return e},save:function(t,n){if(!t.canvas||!t.processed)return t;var r=this,i=t.files[t.index],s=i.name,o=e.Deferred(),u=function(e){e.name||(i.type===e.type?e.name=i.name:i.name&&(e.name=i.name.replace(/\..+$/,"."+e.type.substr(6)))),t.files[t.index]=e,o.resolveWith(r,[t])};return t.canvas.mozGetAsFile?u(t.canvas.mozGetAsFile(/^image\/(jpeg|png)$/.test(i.type)&&s||(s&&s.replace(/\..+$/,"")||"blob")+".png",i.type)):t.canvas.toBlob(u,i.type),o.promise()}},_processFile:function(t,n,r){var i=this,s=e.Deferred().resolveWith(i,[{files:t,index:n}]),o=s.promise();return i._processing+=1,e.each(r.process,function(e,t){o=o.pipe(function(e){return i.processActions[t.action].call(this,e,t)})}),o.always(function(){i._processing-=1,i._processing===0&&i.element.removeClass("fileupload-processing")}),i._processing===1&&i.element.addClass("fileupload-processing"),o},process:function(t){var n=this,r=e.extend({},this.options,t);return r.process&&r.process.length&&this._isXHRUpload(r)&&e.each(t.files,function(i,s){n._processingQueue=n._processingQueue.pipe(function(){var s=e.Deferred();return n._processFile(t.files,i,r).always(function(){s.resolveWith(n)}),s.promise()})}),this._processingQueue},_create:function(){e.blueimp.fileupload.prototype._create.call(this),this._processing=0,this._processingQueue=e.Deferred().resolveWith(this).promise()}})}),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery","tmpl","load-image","./jquery.fileupload-fp"],e):e(window.jQuery,window.tmpl,window.loadImage)}(function(e,t,n){"use strict";var r=(e.blueimpFP||e.blueimp).fileupload;e.widget("blueimpUI.fileupload",r,{options:{autoUpload:!1,maxNumberOfFiles:undefined,maxFileSize:undefined,minFileSize:undefined,acceptFileTypes:/.+$/i,previewSourceFileTypes:/^image\/(gif|jpeg|png)$/,previewSourceMaxFileSize:5e6,previewMaxWidth:80,previewMaxHeight:80,previewAsCanvas:!0,uploadTemplateId:"template-upload",downloadTemplateId:"template-download",filesContainer:undefined,prependFiles:!0,dataType:"json",add:function(t,n){var r=e(this).data("fileupload"),i=r.options,s=n.files;e(this).fileupload("process",n).done(function(){r._adjustMaxNumberOfFiles(-s.length),n.isAdjusted=!0,n.files.valid=n.isValidated=r._validate(s),n.context=r._renderUpload(s).data("data",n),i.filesContainer[i.prependFiles?"prepend":"append"](n.context),r._renderPreviews(s,n.context),r._forceReflow(n.context),r._transition(n.context).done(function(){r._trigger("added",t,n)!==!1&&(i.autoUpload||n.autoUpload)&&n.autoUpload!==!1&&n.isValidated&&n.submit()})})},send:function(t,n){var r=e(this).data("fileupload");if(!n.isValidated){n.isAdjusted||r._adjustMaxNumberOfFiles(-n.files.length);if(!r._validate(n.files))return!1}return n.context&&n.dataType&&n.dataType.substr(0,6)==="iframe"&&n.context.find(".progress").addClass(!e.support.transition&&"progress-animated").attr("aria-valuenow",100).find(".bar").css("width","100%"),r._trigger("sent",t,n)},done:function(t,n){var r=e(this).data("fileupload"),i;n.context?n.context.each(function(s){var o=e.isArray(n.result)&&n.result[s]||{error:"emptyResult"};o.error&&r._adjustMaxNumberOfFiles(1),r._transition(e(this)).done(function(){var s=e(this);i=r._renderDownload([o]).css("height",s.height()).replaceAll(s),r._forceReflow(i),r._transition(i).done(function(){n.context=e(this),r._trigger("completed",t,n)})})}):(i=r._renderDownload(n.result).appendTo(r.options.filesContainer),r._forceReflow(i),r._transition(i).done(function(){n.context=e(this),r._trigger("completed",t,n)}))},fail:function(t,n){var r=e(this).data("fileupload"),i;r._adjustMaxNumberOfFiles(n.files.length),n.context?n.context.each(function(s){if(n.errorThrown!=="abort"){var o=n.files[s];o.error=o.error||n.errorThrown||!0,r._transition(e(this)).done(function(){var s=e(this);i=r._renderDownload([o]).replaceAll(s),r._forceReflow(i),r._transition(i).done(function(){n.context=e(this),r._trigger("failed",t,n)})})}else r._transition(e(this)).done(function(){e(this).remove(),r._trigger("failed",t,n)})}):n.errorThrown!=="abort"?(r._adjustMaxNumberOfFiles(-n.files.length),n.context=r._renderUpload(n.files).appendTo(r.options.filesContainer).data("data",n),r._forceReflow(n.context),r._transition(n.context).done(function(){n.context=e(this),r._trigger("failed",t,n)})):r._trigger("failed",t,n)},progress:function(e,t){if(t.context){var n=parseInt(t.loaded/t.total*100,10);t.context.find(".progress").attr("aria-valuenow",n).find(".bar").css("width",n+"%")}},progressall:function(t,n){var r=e(this),i=parseInt(n.loaded/n.total*100,10),s=r.find(".fileupload-progress"),o=s.find(".progress-extended");o.length&&o.html(r.data("fileupload")._renderExtendedProgress(n)),s.find(".progress").attr("aria-valuenow",i).find(".bar").css("width",i+"%")},start:function(t){var n=e(this).data("fileupload");n._transition(e(this).find(".fileupload-progress")).done(function(){n._trigger("started",t)})},stop:function(t){var n=e(this).data("fileupload");n._transition(e(this).find(".fileupload-progress")).done(function(){e(this).find(".progress").attr("aria-valuenow","0").find(".bar").css("width","0%"),e(this).find(".progress-extended").html("&nbsp;"),n._trigger("stopped",t)})},destroy:function(t,n){var r=e(this).data("fileupload");n.url&&(e.ajax(n),r._adjustMaxNumberOfFiles(1)),r._transition(n.context).done(function(){e(this).remove(),r._trigger("destroyed",t,n)})}},_enableDragToDesktop:function(){var t=e(this),n=t.prop("href"),r=t.prop("download"),i="application/octet-stream";t.bind("dragstart",function(e){try{e.originalEvent.dataTransfer.setData("DownloadURL",[i,r,n].join(":"))}catch(t){}})},_adjustMaxNumberOfFiles:function(e){typeof this.options.maxNumberOfFiles=="number"&&(this.options.maxNumberOfFiles+=e,this.options.maxNumberOfFiles<1?this._disableFileInputButton():this._enableFileInputButton())},_formatFileSize:function(e){return typeof e!="number"?"":e>=1e9?(e/1e9).toFixed(2)+" GB":e>=1e6?(e/1e6).toFixed(2)+" MB":(e/1e3).toFixed(2)+" KB"},_formatBitrate:function(e){return typeof e!="number"?"":e>=1e9?(e/1e9).toFixed(2)+" Gbit/s":e>=1e6?(e/1e6).toFixed(2)+" Mbit/s":e>=1e3?(e/1e3).toFixed(2)+" kbit/s":e+" bit/s"},_formatTime:function(e){var t=new Date(e*1e3),n=parseInt(e/86400,10);return n=n?n+"d ":"",n+("0"+t.getUTCHours()).slice(-2)+":"+("0"+t.getUTCMinutes()).slice(-2)+":"+("0"+t.getUTCSeconds()).slice(-2)},_formatPercentage:function(e){return(e*100).toFixed(2)+" %"},_renderExtendedProgress:function(e){return this._formatBitrate(e.bitrate)+" | "+this._formatTime((e.total-e.loaded)*8/e.bitrate)+" | "+this._formatPercentage(e.loaded/e.total)+" | "+this._formatFileSize(e.loaded)+" / "+this._formatFileSize(e.total)},_hasError:function(e){return e.error?e.error:this.options.maxNumberOfFiles<0?"maxNumberOfFiles":!this.options.acceptFileTypes.test(e.type)&&!this.options.acceptFileTypes.test(e.name)?"acceptFileTypes":this.options.maxFileSize&&e.size>this.options.maxFileSize?"maxFileSize":typeof e.size=="number"&&e.size<this.options.minFileSize?"minFileSize":null},_validate:function(t){var n=this,r=!!t.length;return e.each(t,function(e,t){t.error=n._hasError(t),t.error&&(r=!1)}),r},_renderTemplate:function(t,n){if(!t)return e();var r=t({files:n,formatFileSize:this._formatFileSize,options:this.options});return r instanceof e?r:e(this.options.templatesContainer).html(r).children()},_renderPreview:function(t,r){var i=this,s=this.options,o=e.Deferred();return(n&&n(t,function(t){r.append(t),i._forceReflow(r),i._transition(r).done(function(){o.resolveWith(r)}),e.contains(document.body,r[0])||o.resolveWith(r)},{maxWidth:s.previewMaxWidth,maxHeight:s.previewMaxHeight,canvas:s.previewAsCanvas})||o.resolveWith(r))&&o},_renderPreviews:function(t,n){var r=this,i=this.options;return n.find(".preview span").each(function(n,s){var o=t[n];i.previewSourceFileTypes.test(o.type)&&(e.type(i.previewSourceMaxFileSize)!=="number"||o.size<i.previewSourceMaxFileSize)&&(r._processingQueue=r._processingQueue.pipe(function(){var t=e.Deferred();return r._renderPreview(o,e(s)).done(function(){t.resolveWith(r)}),t.promise()}))}),this._processingQueue},_renderUpload:function(e){return this._renderTemplate(this.options.uploadTemplate,e)},_renderDownload:function(e){return this._renderTemplate(this.options.downloadTemplate,e).find("a[download]").each(this._enableDragToDesktop).end()},_startHandler:function(t){t.preventDefault();var n=e(this),r=n.closest(".template-upload"),i=r.data("data");i&&i.submit&&!i.jqXHR&&i.submit()&&n.prop("disabled",!0)},_cancelHandler:function(t){t.preventDefault();var n=e(this).closest(".template-upload"),r=n.data("data")||{};r.jqXHR?r.jqXHR.abort():(r.errorThrown="abort",t.data.fileupload._trigger("fail",t,r))},_deleteHandler:function(t){t.preventDefault();var n=e(this);t.data.fileupload._trigger("destroy",t,{context:n.closest(".template-download"),url:n.attr("data-url"),type:n.attr("data-type")||"DELETE",dataType:t.data.fileupload.options.dataType})},_forceReflow:function(t){return e.support.transition&&t.length&&t[0].offsetWidth},_transition:function(t){var n=e.Deferred();return e.support.transition&&t.hasClass("fade")?t.bind(e.support.transition.end,function(r){r.target===t[0]&&(t.unbind(e.support.transition.end),n.resolveWith(t))}).toggleClass("in"):(t.toggleClass("in"),n.resolveWith(t)),n},_initButtonBarEventHandlers:function(){var t=this.element.find(".fileupload-buttonbar"),n=this.options.filesContainer,r=this.options.namespace;t.find(".start").bind("click."+r,function(e){e.preventDefault(),n.find(".start button").click()}),t.find(".cancel").bind("click."+r,function(e){e.preventDefault(),n.find(".cancel button").click()}),t.find(".delete").bind("click."+r,function(e){e.preventDefault(),n.find(".delete input:checked").siblings("button").click(),t.find(".toggle").prop("checked",!1)}),t.find(".toggle").bind("change."+r,function(t){n.find(".delete input").prop("checked",e(this).is(":checked"))})},_destroyButtonBarEventHandlers:function(){this.element.find(".fileupload-buttonbar button").unbind("click."+this.options.namespace),this.element.find(".fileupload-buttonbar .toggle").unbind("change."+this.options.namespace)},_initEventHandlers:function(){r.prototype._initEventHandlers.call(this);var e={fileupload:this};this.options.filesContainer.delegate(".start button","click."+this.options.namespace,e,this._startHandler).delegate(".cancel button","click."+this.options.namespace,e,this._cancelHandler).delegate(".delete button","click."+this.options.namespace,e,this._deleteHandler),this._initButtonBarEventHandlers()},_destroyEventHandlers:function(){var e=this.options;this._destroyButtonBarEventHandlers(),e.filesContainer.undelegate(".start button","click."+e.namespace).undelegate(".cancel button","click."+e.namespace).undelegate(".delete button","click."+e.namespace),r.prototype._destroyEventHandlers.call(this)},_enableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!1).parent().removeClass("disabled")},_disableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!0).parent().addClass("disabled")},_initTemplates:function(){var e=this.options;e.templatesContainer=document.createElement(e.filesContainer.prop("nodeName")),t&&(e.uploadTemplateId&&(e.uploadTemplate=t(e.uploadTemplateId)),e.downloadTemplateId&&(e.downloadTemplate=t(e.downloadTemplateId)))},_initFilesContainer:function(){var t=this.options;t.filesContainer===undefined?t.filesContainer=this.element.find(".files"):t.filesContainer instanceof e||(t.filesContainer=e(t.filesContainer))},_initSpecialOptions:function(){r.prototype._initSpecialOptions.call(this),this._initFilesContainer(),this._initTemplates()},_create:function(){r.prototype._create.call(this),this._refreshOptionsList.push("filesContainer","uploadTemplateId","downloadTemplateId"),e.blueimpFP||(this._processingQueue=e.Deferred().resolveWith(this).promise(),this.process=function(){return this._processingQueue})},enable:function(){r.prototype.enable.call(this),this.element.find("input, button").prop("disabled",!1),this._enableFileInputButton()},disable:function(){this.element.find("input, button").prop("disabled",!0),this._disableFileInputButton(),r.prototype.disable.call(this)}})}),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery","jquery.ui.widget"],e):e(window.jQuery)}(function(e){"use strict";e.support.xhrFileUpload=!!window.XMLHttpRequestUpload&&!!window.FileReader,e.support.xhrFormDataFileUpload=!!window.FormData,e.widget("blueimp.fileupload",{options:{namespace:undefined,dropZone:e(document),fileInput:undefined,replaceFileInput:!0,paramName:undefined,singleFileUploads:!0,limitMultiFileUploads:undefined,sequentialUploads:!1,limitConcurrentUploads:undefined,forceIframeTransport:!1,redirect:undefined,redirectParamName:undefined,postMessage:undefined,multipart:!0,maxChunkSize:undefined,uploadedBytes:undefined,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,formData:function(e){return e.serializeArray()},add:function(e,t){t.submit()},processData:!1,contentType:!1,cache:!1},_refreshOptionsList:["namespace","dropZone","fileInput","multipart","forceIframeTransport"],_BitrateTimer:function(){this.timestamp=+(new Date),this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,n){var r=e-this.timestamp;if(!this.bitrate||!n||r>n)this.bitrate=(t-this.loaded)*(1e3/r)*8,this.loaded=t,this.timestamp=e;return this.bitrate}},_isXHRUpload:function(t){return!t.forceIframeTransport&&(!t.multipart&&e.support.xhrFileUpload||e.support.xhrFormDataFileUpload)},_getFormData:function(t){var n;return typeof t.formData=="function"?t.formData(t.form):e.isArray(t.formData)?t.formData:t.formData?(n=[],e.each(t.formData,function(e,t){n.push({name:e,value:t})}),n):[]},_getTotal:function(t){var n=0;return e.each(t,function(e,t){n+=t.size||1}),n},_onProgress:function(e,t){if(e.lengthComputable){var n=+(new Date),r,i;if(t._time&&t.progressInterval&&n-t._time<t.progressInterval&&e.loaded!==e.total)return;t._time=n,r=t.total||this._getTotal(t.files),i=parseInt(e.loaded/e.total*(t.chunkSize||r),10)+(t.uploadedBytes||0),this._loaded+=i-(t.loaded||t.uploadedBytes||0),t.lengthComputable=!0,t.loaded=i,t.total=r,t.bitrate=t._bitrateTimer.getBitrate(n,i,t.bitrateInterval),this._trigger("progress",e,t),this._trigger("progressall",e,{lengthComputable:!0,loaded:this._loaded,total:this._total,bitrate:this._bitrateTimer.getBitrate(n,this._loaded,t.bitrateInterval)})}},_initProgressListener:function(t){var n=this,r=t.xhr?t.xhr():e.ajaxSettings.xhr();r.upload&&(e(r.upload).bind("progress",function(e){var r=e.originalEvent;e.lengthComputable=r.lengthComputable,e.loaded=r.loaded,e.total=r.total,n._onProgress(e,t)}),t.xhr=function(){return r})},_initXHRData:function(t){var n,r=t.files[0],i=t.multipart||!e.support.xhrFileUpload,s=t.paramName[0];if(!i||t.blob)t.headers=e.extend(t.headers,{"X-File-Name":r.name,"X-File-Type":r.type,"X-File-Size":r.size}),t.blob?i||(t.contentType="application/octet-stream",t.data=t.blob):(t.contentType=r.type,t.data=r);i&&e.support.xhrFormDataFileUpload&&(t.postMessage?(n=this._getFormData(t),t.blob?n.push({name:s,value:t.blob}):e.each(t.files,function(e,r){n.push({name:t.paramName[e]||s,value:r})})):(t.formData instanceof FormData?n=t.formData:(n=new FormData,e.each(this._getFormData(t),function(e,t){n.append(t.name,t.value)})),t.blob?n.append(s,t.blob,r.name):e.each(t.files,function(e,r){r instanceof Blob&&n.append(t.paramName[e]||s,r,r.name)})),t.data=n),t.blob=null},_initIframeSettings:function(t){t.dataType="iframe "+(t.dataType||""),t.formData=this._getFormData(t),t.redirect&&e("<a></a>").prop("href",t.url).prop("host")!==location.host&&t.formData.push({name:t.redirectParamName||"redirect",value:t.redirect})},_initDataSettings:function(e){this._isXHRUpload(e)?(this._chunkedUpload(e,!0)||(e.data||this._initXHRData(e),this._initProgressListener(e)),e.postMessage&&(e.dataType="postmessage "+(e.dataType||""))):this._initIframeSettings(e,"iframe")},_getParamName:function(t){var n=e(t.fileInput),r=t.paramName;return r?e.isArray(r)||(r=[r]):(r=[],n.each(function(){var t=e(this),n=t.prop("name")||"files[]",i=(t.prop("files")||[1]).length;while(i)r.push(n),i-=1}),r.length||(r=[n.prop("name")||"files[]"])),r},_initFormSettings:function(t){if(!t.form||!t.form.length)t.form=e(t.fileInput.prop("form"));t.paramName=this._getParamName(t),t.url||(t.url=t.form.prop("action")||location.href),t.type=(t.type||t.form.prop("method")||"").toUpperCase(),t.type!=="POST"&&t.type!=="PUT"&&(t.type="POST")},_getAJAXSettings:function(t){var n=e.extend({},this.options,t);return this._initFormSettings(n),this._initDataSettings(n),n},_enhancePromise:function(e){return e.success=e.done,e.error=e.fail,e.complete=e.always,e},_getXHRPromise:function(t,n,r){var i=e.Deferred(),s=i.promise();return n=n||this.options.context||s,t===!0?i.resolveWith(n,r):t===!1&&i.rejectWith(n,r),s.abort=i.promise,this._enhancePromise(s)},_chunkedUpload:function(t,n){var r=this,i=t.files[0],s=i.size,o=t.uploadedBytes=t.uploadedBytes||0,u=t.maxChunkSize||s,a=i.webkitSlice||i.mozSlice||i.slice,f,l,c,h;return!(this._isXHRUpload(t)&&a&&(o||u<s))||t.data?!1:n?!0:o>=s?(i.error="uploadedBytes",this._getXHRPromise(!1,t.context,[null,"error",i.error])):(l=Math.ceil((s-o)/u),f=function(n){return n?f(n-=1).pipe(function(){var s=e.extend({},t);return s.blob=a.call(i,o+n*u,o+(n+1)*u),s.chunkSize=s.blob.size,r._initXHRData(s),r._initProgressListener(s),c=(e.ajax(s)||r._getXHRPromise(!1,s.context)).done(function(){s.loaded||r._onProgress(e.Event("progress",{lengthComputable:!0,loaded:s.chunkSize,total:s.chunkSize}),s),t.uploadedBytes=s.uploadedBytes+=s.chunkSize}),c}):r._getXHRPromise(!0,t.context)},h=f(l),h.abort=function(){return c.abort()},this._enhancePromise(h))},_beforeSend:function(e,t){this._active===0&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer),this._active+=1,this._loaded+=t.uploadedBytes||0,this._total+=this._getTotal(t.files)},_onDone:function(t,n,r,i){this._isXHRUpload(i)||this._onProgress(e.Event("progress",{lengthComputable:!0,loaded:1,total:1}),i),i.result=t,i.textStatus=n,i.jqXHR=r,this._trigger("done",null,i)},_onFail:function(e,t,n,r){r.jqXHR=e,r.textStatus=t,r.errorThrown=n,this._trigger("fail",null,r),r.recalculateProgress&&(this._loaded-=r.loaded||r.uploadedBytes||0,this._total-=r.total||this._getTotal(r.files))},_onAlways:function(e,t,n,r){this._active-=1,r.textStatus=t,n&&n.always?(r.jqXHR=n,r.result=e):(r.jqXHR=e,r.errorThrown=n),this._trigger("always",null,r),this._active===0&&(this._trigger("stop"),this._loaded=this._total=0,this._bitrateTimer=null)},_onSend:function(t,n){var r=this,i,s,o,u=r._getAJAXSettings(n),a=function(n,s){return r._sending+=1,u._bitrateTimer=new r._BitrateTimer,i=i||(n!==!1&&r._trigger("send",t,u)!==!1&&(r._chunkedUpload(u)||e.ajax(u))||r._getXHRPromise(!1,u.context,s)).done(function(e,t,n){r._onDone(e,t,n,u)}).fail(function(e,t,n){r._onFail(e,t,n,u)}).always(function(e,t,n){r._sending-=1,r._onAlways(e,t,n,u);if(u.limitConcurrentUploads&&u.limitConcurrentUploads>r._sending){var i=r._slots.shift();while(i){if(!i.isRejected()){i.resolve();break}i=r._slots.shift()}}}),i};return this._beforeSend(t,u),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(s=e.Deferred(),this._slots.push(s),o=s.pipe(a)):o=this._sequence=this._sequence.pipe(a,a),o.abort=function(){var e=[undefined,"abort","abort"];return i?i.abort():(s&&s.rejectWith(e),a(!1,e))},this._enhancePromise(o)):a()},_onAdd:function(t,n){var r=this,i=!0,s=e.extend({},this.options,n),o=s.limitMultiFileUploads,u=this._getParamName(s),a,f,l,c;if(!s.singleFileUploads&&!o||!this._isXHRUpload(s))l=[n.files],a=[u];else if(!s.singleFileUploads&&o){l=[],a=[];for(c=0;c<n.files.length;c+=o)l.push(n.files.slice(c,c+o)),f=u.slice(c,c+o),f.length||(f=u),a.push(f)}else a=u;return n.originalFiles=n.files,e.each(l||n.files,function(s,o){var u=e.extend({},n);return u.files=l?o:[o],u.paramName=a[s],u.submit=function(){return u.jqXHR=this.jqXHR=r._trigger("submit",t,this)!==!1&&r._onSend(t,this),this.jqXHR},i=r._trigger("add",t,u)}),i},_normalizeFile:function(e,t){t.name===undefined&&t.size===undefined&&(t.name=t.fileName,t.size=t.fileSize)},_replaceFileInput:function(t){var n=t.clone(!0);e("<form></form>").append(n)[0].reset(),t.after(n).detach(),e.cleanData(t.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(e,r){return r===t[0]?n[0]:r}),t[0]===this.element[0]&&(this.element=n)},_getFileInputFiles:function(t){t=e(t);var n=e.each(e.makeArray(t.prop("files")),this._normalizeFile),r;if(!n.length){r=t.prop("value");if(!r)return[];n=[{name:r.replace(/^.*\\/,"")}]}return n},_onChange:function(t){var n=t.data.fileupload,r={fileInput:e(t.target),form:e(t.target.form)};r.files=n._getFileInputFiles(r.fileInput),n.options.replaceFileInput&&n._replaceFileInput(r.fileInput);if(n._trigger("change",t,r)===!1||n._onAdd(t,r)===!1)return!1},_onPaste:function(t){var n=t.data.fileupload,r=t.originalEvent.clipboardData,i=r&&r.items||[],s={files:[]};e.each(i,function(e,t){var n=t.getAsFile&&t.getAsFile();n&&s.files.push(n)});if(n._trigger("paste",t,s)===!1||n._onAdd(t,s)===!1)return!1},_onDrop:function(t){var n=t.data.fileupload,r=t.dataTransfer=t.originalEvent.dataTransfer,i={files:e.each(e.makeArray(r&&r.files),n._normalizeFile)};if(n._trigger("drop",t,i)===!1||n._onAdd(t,i)===!1)return!1;t.preventDefault()},_onDragOver:function(e){var t=e.data.fileupload,n=e.dataTransfer=e.originalEvent.dataTransfer;if(t._trigger("dragover",e)===!1)return!1;n&&(n.dropEffect="copy"),e.preventDefault()},_initEventHandlers:function(){var e=this.options.namespace;this._isXHRUpload(this.options)&&this.options.dropZone.bind("dragover."+e,{fileupload:this},this._onDragOver).bind("drop."+e,{fileupload:this},this._onDrop).bind("paste."+e,{fileupload:this},this._onPaste),this.options.fileInput.bind("change."+e,{fileupload:this},this._onChange)},_destroyEventHandlers:function(){var e=this.options.namespace;this.options.dropZone.unbind("dragover."+e,this._onDragOver).unbind("drop."+e,this._onDrop).unbind("paste."+e,this._onPaste),this.options.fileInput.unbind("change."+e,this._onChange)},_setOption:function(t,n){var r=e.inArray(t,this._refreshOptionsList)!==-1;r&&this._destroyEventHandlers(),e.Widget.prototype._setOption.call(this,t,n),r&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var t=this.options;t.fileInput===undefined?t.fileInput=this.element.is("input:file")?this.element:this.element.find("input:file"):t.fileInput instanceof e||(t.fileInput=e(t.fileInput)),t.dropZone instanceof e||(t.dropZone=e(t.dropZone))},_create:function(){var t=this.options;e.extend(t,e(this.element[0].cloneNode(!1)).data()),t.namespace=t.namespace||this.widgetName,this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=this._loaded=this._total=0,this._initEventHandlers()},destroy:function(){this._destroyEventHandlers(),e.Widget.prototype.destroy.call(this)},enable:function(){e.Widget.prototype.enable.call(this),this._initEventHandlers()},disable:function(){this._destroyEventHandlers(),e.Widget.prototype.disable.call(this)},add:function(t){if(!t||this.options.disabled)return;t.fileInput&&!t.files?t.files=this._getFileInputFiles(t.fileInput):t.files=e.each(e.makeArray(t.files),this._normalizeFile),this._onAdd(null,t)},send:function(t){if(t&&!this.options.disabled){t.fileInput&&!t.files?t.files=this._getFileInputFiles(t.fileInput):t.files=e.each(e.makeArray(t.files),this._normalizeFile);if(t.files.length)return this._onSend(null,t)}return this._getXHRPromise(!1,t&&t.context)}})}),function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):e(window.jQuery)}(function(e){"use strict";var t=0;e.ajaxTransport("iframe",function(n){if(n.async&&(n.type==="POST"||n.type==="GET")){var r,i;return{send:function(s,o){r=e('<form style="display:none;"></form>'),i=e('<iframe src="javascript:false;" name="iframe-transport-'+(t+=1)+'"></iframe>').bind("load",function(){var t,s=e.isArray(n.paramName)?n.paramName:[n.paramName];i.unbind("load").bind("load",function(){var t;try{t=i.contents();if(!t.length||!t[0].firstChild)throw new Error}catch(n){t=undefined}o(200,"success",{iframe:t}),e('<iframe src="javascript:false;"></iframe>').appendTo(r),r.remove()}),r.prop("target",i.prop("name")).prop("action",n.url).prop("method",n.type),n.formData&&e.each(n.formData,function(t,n){e('<input type="hidden"/>').prop("name",n.name).val(n.value).appendTo(r)}),n.fileInput&&n.fileInput.length&&n.type==="POST"&&(t=n.fileInput.clone(),n.fileInput.after(function(e){return t[e]}),n.paramName&&n.fileInput.each(function(t){e(this).prop("name",s[t]||n.paramName)}),r.append(n.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data")),r.submit(),t&&t.length&&n.fileInput.each(function(n,r){var i=e(t[n]);e(r).prop("name",i.prop("name")),i.replaceWith(r)})}),r.append(i).appendTo(document.body)},abort:function(){i&&i.unbind("load").prop("src","javascript".concat(":false;")),r&&r.remove()}}}}),e.ajaxSetup({converters:{"iframe text":function(t){return e(t[0].body).text()},"iframe json":function(t){return e.parseJSON(e(t[0].body).text())},"iframe html":function(t){return e(t[0].body).html()},"iframe script":function(t){return e.globalEval(e(t[0].body).text())}}})}),function(e){"use strict";var t=function(e,n,r){var i=document.createElement("img"),s,o;return i.onerror=n,i.onload=function(){o&&!r.noRevoke&&t.revokeObjectURL
(o),n(t.scale(i,r))},window.Blob&&e instanceof Blob||window.File&&e instanceof File?s=o=t.createObjectURL(e):s=e,s?(i.src=s,i):t.readFile(e,function(e){i.src=e})},n=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;t.scale=function(e,t){t=t||{};var n=document.createElement("canvas"),r=e.width,i=e.height,s=Math.max((t.minWidth||r)/r,(t.minHeight||i)/i);return s>1&&(r=parseInt(r*s,10),i=parseInt(i*s,10)),s=Math.min((t.maxWidth||r)/r,(t.maxHeight||i)/i),s<1&&(r=parseInt(r*s,10),i=parseInt(i*s,10)),e.getContext||t.canvas&&n.getContext?(n.width=r,n.height=i,n.getContext("2d").drawImage(e,0,0,r,i),n):(e.width=r,e.height=i,e)},t.createObjectURL=function(e){return n?n.createObjectURL(e):!1},t.revokeObjectURL=function(e){return n?n.revokeObjectURL(e):!1},t.readFile=function(e,t){if(window.FileReader&&FileReader.prototype.readAsDataURL){var n=new FileReader;return n.onload=function(e){t(e.target.result)},n.readAsDataURL(e),n}return!1},typeof define!="undefined"&&define.amd?define(function(){return t}):e.loadImage=t}(this),function(e){"use strict";var t=function(e,n){var r=/[^\w\-\.:]/.test(e)?new Function(t.arg+",tmpl","var _e=tmpl.encode"+t.helper+",_s='"+e.replace(t.regexp,t.func)+"';return _s;"):t.cache[e]=t.cache[e]||t(t.load(e));return n?r(n,t):function(e){return r(e,t)}};t.cache={},t.load=function(e){return document.getElementById(e).innerHTML},t.regexp=/([\s'\\])(?![^%]*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,t.func=function(e,t,n,r,i,s){if(t)return{"\n":"\\n","\r":"\\r","	":"\\t"," ":" "}[e]||"\\"+e;if(n)return n==="="?"'+_e("+r+")+'":"'+("+r+"||'')+'";if(i)return"';";if(s)return"_s+='"},t.encReg=/[<>&"'\x00]/g,t.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"},t.encode=function(e){return String(e||"").replace(t.encReg,function(e){return t.encMap[e]||""})},t.arg="o",t.helper=",print=function(s,e){_s+=e&&(s||'')||_e(s);},include=function(s,d){_s+=tmpl(s,d);}",typeof define=="function"&&define.amd?define(function(){return t}):e.tmpl=t}(this);