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
(function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery","load-image","bootstrap"],e):e(window.jQuery,window.loadImage)})(function(e,t){"use strict";e.extend(e.fn.modal.defaults,{delegate:document,selector:null,filter:"*",index:0,href:null,preloadRange:2,offsetWidth:100,offsetHeight:200,canvas:!1,slideshow:0,imageClickDivision:.5});var n=e.fn.modal.Constructor.prototype.show,r=e.fn.modal.Constructor.prototype.hide;e.extend(e.fn.modal.Constructor.prototype,{initLinks:function(){var t=this,n=this.options,r=n.selector||"a[data-target="+n.target+"]";this.$links=e(n.delegate).find(r).filter(n.filter).each(function(e){t.getUrl(this)===n.href&&(n.index=e)}),this.$links[n.index]||(n.index=0)},getUrl:function(t){return t.href||e(t).data("href")},startSlideShow:function(){var e=this;this.options.slideshow&&(this._slideShow=window.setTimeout(function(){e.next()},this.options.slideshow))},stopSlideShow:function(){window.clearTimeout(this._slideShow)},toggleSlideShow:function(){var e=this.$element.find(".modal-slideshow");this.options.slideshow?(this.options.slideshow=0,this.stopSlideShow()):(this.options.slideshow=e.data("slideshow")||5e3,this.startSlideShow()),e.find("i").toggleClass("icon-play icon-pause")},preloadImages:function(){var t=this.options,n=t.index+t.preloadRange+1,r,i;for(i=t.index-t.preloadRange;i<n;i+=1)r=this.$links[i],r&&i!==t.index&&e("<img>").prop("src",this.getUrl(r))},loadImage:function(){var e=this,n=this.$element,r=this.options.index,i=this.getUrl(this.$links[r]),s;this.abortLoad(),this.stopSlideShow(),n.trigger("beforeLoad"),this._loadingTimeout=window.setTimeout(function(){n.addClass("modal-loading")},100),s=n.find(".modal-image").children().removeClass("in"),window.setTimeout(function(){s.remove()},3e3),n.find(".modal-title").text(this.$links[r].title),n.find(".modal-download").prop("href",i),this._loadingImage=t(i,function(t){e.img=t,window.clearTimeout(e._loadingTimeout),n.removeClass("modal-loading"),n.trigger("load"),e.showImage(t),e.startSlideShow()},this._loadImageOptions),this.preloadImages()},showImage:function(t){var n=this.$element,r=e.support.transition&&n.hasClass("fade"),i=r?n.animate:n.css,s=n.find(".modal-image"),o,u;s.css({width:t.width,height:t.height}),n.find(".modal-title").css({width:Math.max(t.width,380)}),e(window).width()>480&&(r&&(o=n.clone().hide().appendTo(document.body)),i.call(n.stop(),{"margin-top":-((o||n).outerHeight()/2),"margin-left":-((o||n).outerWidth()/2)}),o&&o.remove()),s.append(t),u=t.offsetWidth,n.trigger("display"),r?n.is(":visible")?e(t).on(e.support.transition.end,function(r){r.target===t&&(e(t).off(e.support.transition.end),n.trigger("displayed"))}).addClass("in"):(e(t).addClass("in"),n.one("shown",function(){n.trigger("displayed")})):(e(t).addClass("in"),n.trigger("displayed"))},abortLoad:function(){this._loadingImage&&(this._loadingImage.onload=this._loadingImage.onerror=null),window.clearTimeout(this._loadingTimeout)},prev:function(){var e=this.options;e.index-=1,e.index<0&&(e.index=this.$links.length-1),this.loadImage()},next:function(){var e=this.options;e.index+=1,e.index>this.$links.length-1&&(e.index=0),this.loadImage()},keyHandler:function(e){switch(e.which){case 37:case 38:e.preventDefault(),this.prev();break;case 39:case 40:e.preventDefault(),this.next()}},wheelHandler:function(e){e.preventDefault(),e=e.originalEvent,this._wheelCounter=this._wheelCounter||0,this._wheelCounter+=e.wheelDelta||e.detail||0;if(e.wheelDelta&&this._wheelCounter>=120||!e.wheelDelta&&this._wheelCounter<0)this.prev(),this._wheelCounter=0;else if(e.wheelDelta&&this._wheelCounter<=-120||!e.wheelDelta&&this._wheelCounter>0)this.next(),this._wheelCounter=0},initGalleryEvents:function(){var t=this,n=this.$element;n.find(".modal-image").on("click.modal-gallery",function(n){var r=e(this);t.$links.length===1?t.hide():(n.pageX-r.offset().left)/r.width()<t.options.imageClickDivision?t.prev(n):t.next(n)}),n.find(".modal-prev").on("click.modal-gallery",function(e){t.prev(e)}),n.find(".modal-next").on("click.modal-gallery",function(e){t.next(e)}),n.find(".modal-slideshow").on("click.modal-gallery",function(e){t.toggleSlideShow(e)}),e(document).on("keydown.modal-gallery",function(e){t.keyHandler(e)}).on("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery",function(e){t.wheelHandler(e)})},destroyGalleryEvents:function(){var t=this.$element;this.abortLoad(),this.stopSlideShow(),t.find(".modal-image, .modal-prev, .modal-next, .modal-slideshow").off("click.modal-gallery"),e(document).off("keydown.modal-gallery").off("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery")},show:function(){if(!this.isShown&&this.$element.hasClass("modal-gallery")){var t=this.$element,r=this.options,i=e(window).width(),s=e(window).height();t.hasClass("modal-fullscreen")?(this._loadImageOptions={maxWidth:i,maxHeight:s,canvas:r.canvas},t.hasClass("modal-fullscreen-stretch")&&(this._loadImageOptions.minWidth=i,this._loadImageOptions.minHeight=s)):this._loadImageOptions={maxWidth:i-r.offsetWidth,maxHeight:s-r.offsetHeight,canvas:r.canvas},i>480&&t.css({"margin-top":-(t.outerHeight()/2),"margin-left":-(t.outerWidth()/2)}),this.initGalleryEvents(),this.initLinks(),this.$links.length&&(t.find(".modal-slideshow, .modal-prev, .modal-next").toggle(this.$links.length!==1),t.toggleClass("modal-single",this.$links.length===1),this.loadImage())}n.apply(this,arguments)},hide:function(){this.isShown&&this.$element.hasClass("modal-gallery")&&(this.options.delegate=document,this.options.href=null,this.destroyGalleryEvents()),r.apply(this,arguments)}}),e(function(){e(document.body).on("click.modal-gallery.data-api",'[data-toggle="modal-gallery"]',function(t){var n=e(this),r=n.data(),i=e(r.target),s=i.data("modal"),o;s||(r=e.extend(i.data(),r)),r.selector||(r.selector="a[rel=gallery]"),o=e(t.target).closest(r.selector),o.length&&i.length&&(t.preventDefault(),r.href=o.prop("href")||o.data("href"),r.delegate=o[0]!==this?this:document,s&&e.extend(s.options,r),i.modal(r))})})});