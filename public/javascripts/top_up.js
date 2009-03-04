try { TopUp } catch(e) {

function deriveHost() {
	var id = "tu_dummy_script";
	document.write('<script id="' + id + '"></script>');

	var dummy_script = document.getElementById(id);
	var src  = dummy_script.previousSibling.getAttribute("src");
	var host = src.match(/^\w+\:\/\//) ? src.match(/^\w+\:\/\/[^\/]*\//)[0] : "";

	dummy_script.parentNode.removeChild(dummy_script);
	return host;
}
var scriptHost = deriveHost();

// * {jQuery}

// *
// * TopUp {version} (Uncompressed)
// * The #1 Javascript Pop Up (http://gettopup.com)
// *
// * (c) {year} Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, TopUp is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: {date} $
// *

TopUp = function() {
	var initialized = false, selector = null, on_ready = [], displaying = false, options = null, group = null, index = null, selector_content = {};
	var default_preset = {
		layout: "dashboard",
		effect: "transform",
		modal: 0,
		fixed: 0,
		shaded: 0,
		resizable: 1
	}, presets = {};
	
	var extendjQuery = function() {
		jQuery.extend({
			typeOf: function(value) {
  			var s = typeof value;
				if (s === "object") {
					if (value) {
						if (typeof value.length === "number" && !(value.propertyIsEnumerable("length")) && typeof value.splice === "function")
							s = "array";
					} else
						s = "null";
				}
				return s;
			},
			keys: function(hash) {
				var keys = [];
				for (var key in hash)
					keys.push(key);
				return keys;
			},
			ie:  jQuery.browser.msie,
			ie6: jQuery.browser.msie && parseInt(jQuery.browser.version) == 6,
			ie7: jQuery.browser.msie && parseInt(jQuery.browser.version) == 7,
			ff2: jQuery.browser.mozilla && parseFloat(jQuery.browser.version) < 1.9
		});
		jQuery.fn.extend({
			id: function() {
				if (!this.is("[id]")) {
					var id = "";
					var counter = 0;
	    			do {id = "element_" + counter++} while (jQuery("#" + id).length);
					jQuery(this).attr("id", id);
				}
				return jQuery(this).attr("id");
			},
			bubbleDetect: function(selector, separator) {
				var detected = null;
				var element = this;
				jQuery.each(selector.split(separator || ","), function(i, e) {
					var selector = jQuery.trim(e);
					if (jQuery(selector).index(element) != -1)
						detected = {element: jQuery(element), selector: selector};
				});
				return detected || (element.parent()[0] ? jQuery(element.parent()[0]).bubbleDetect(selector, separator) : null);
			},
			center: function(only) {
			  var css = {top: parseInt((jQuery(window).height() - this.outerHeight()) / 2) + jQuery(window).scrollTop(),
	  		   			   left: parseInt((jQuery(window).width() - this.outerWidth()) / 2),
	  		   			   position: "absolute"};
			  
			  if (only && jQuery.inArray(only, "y") == -1)
			    delete css["top"];
			  if (only && jQuery.inArray(only, "x") == -1)
			    delete css["left"];
			  
				this.css(css);
				return this;
			},
			lockDimensions: function() {
				this.css({width: this.outerWidth(), height: this.outerHeight()});
				return this;
			},
			unlockDimensions: function() {
				this.css({width: "auto", height: "auto"});
				return this;
			},
			centerWrap: function(compare) {
        if (jQuery.typeOf(compare) != "array")
          compare = [compare];
				
				var current = {width: this.outerWidth(), height: this.outerHeight()}, delta = {width: 0, height: 0}, diff = 0;
        jQuery.each(compare, function(i, element) {
					
          diff = element.outerWidth() - current.width;
          if (delta.width < diff)
            delta.width = diff;
          diff = element.outerHeight() - current.height;
          if (delta.height < diff)
            delta.height = diff;
					
        });
				
				var offset = this.offset();
				jQuery("#tu_center_wrapper").css({
                													 top: offset.top - (delta.height == 0 ? 0 : parseInt(delta.height / 2)), 
                													 left: offset.left - (delta.width == 0 ? 0 : parseInt(delta.width / 2)),
                													 width: this.width() + delta.width, 
                													 height: this.height() + delta.height
                												 });
				
				jQuery("#tu_centered_content").append(this);
				
				this.css({
							top: "auto",
							left: "auto",
							width: "auto",
							height: "auto",
							display: "inline-block",
							position: "relative"
						 });
				if (jQuery.ff2)
					this.css({display: "table"});
				if (jQuery.ie)
					this.css({display: "inline"});
				
				jQuery("#tu_center_wrapper").show();
				
				return this;
			},
			removeCenterWrap: function() {
				var position = jQuery("#tu_center_wrapper").offset();
				var delta = {width: jQuery("#tu_center_wrapper").outerWidth() - this.outerWidth(), height: jQuery("#tu_center_wrapper").outerHeight() - this.outerHeight()};

				this.css({top: position.top + parseInt(delta.height / 2), left: position.left + parseInt(delta.width / 2), position: "absolute"}).appendTo("body");
				jQuery("#tu_center_wrapper").hide();

				return this;
			}
		});
	};
	var injectCode = function() {
		var images_url = TopUp.host + TopUp.images_path;
		
		var style = '<div></div>';
		var ff2fix = '<div></div>';
		var ie6fix = '<div></div>';
		var iefix = '<div></div>';
		var html = '<div></div>';

		jQuery(style).prependTo("head");
			
		if (jQuery.ff2)
			jQuery(ff2fix).insertAfter("head > style:first");
		if (jQuery.ie6)
			jQuery(ie6fix).insertAfter("head > style:first");
		if (jQuery.ie)
			jQuery(iefix).insertAfter("head > style:first");
	
	  jQuery(html).appendTo("body");
	};
	var bind = function() {
		var selectors = jQuery.keys(presets);
		selectors.unshift(".top_up,[toptions]");
		
		if ((selector = selectors.join()).length > 0)
			jQuery(selector).click(topUpClick);
		
		jQuery(document).keypress(keyPress);
	};
	var topUpClick = function(event) {
		TopUp.displayTopUp(jQuery(event.target));
		return false;
	};
	var keyPress = function(event) {
    if (jQuery("#top_up").is(":hidden"))
		  return;
		
		switch(event.keyCode) {
      case 27:
		    TopUp.close(); break;
		  case 37:
        TopUp.previous(); break;
		  case 39:
        TopUp.next(); break;
    }
	};
	
	var deriveTopUpOptions = function(top_up, opts) {
	  var toptions = jQuery.extend({}, {top_up: "#" + top_up.element.id(), preset: top_up.selector});
		  
	  if (top_up.element.is("[toptions]")) {
			jQuery.each(top_up.element.attr("toptions").split(","), function(i, option) {
				var key_value = option.split("=");
				toptions[jQuery.trim(key_value[0])] = jQuery.trim(key_value[1]);
			});
		}
		
		if (toptions.noGroup && parseInt(toptions.noGroup) == 1)
		  toptions.group = null;
  		
  	if (opts)
  	  toptions = jQuery.extend(toptions, opts);
    
    return toptions;
	};
	var deriveOptions = function(reference, opts, store) {
		var result = jQuery.extend({}, default_preset);
		
		if (opts) {
		  if (presets[opts.preset])
			  result = jQuery.extend(result, presets[opts.preset]);
			result = jQuery.extend(result, opts);
		}
		
		if (store) {
  		result.reference = result.reference ? eval(result.reference) : reference;
      if (!result.type)
        result.type = result.reference.toLowerCase().match(/\.(bmp|gif|jpg|jpeg|png|tif|wbmp)$/) ? "image" : "ajax";
    
			options = jQuery.extend({}, result);
		}
		
		return result;
	};
	
	var deriveGroup = function() {
		if (options.group) {
		
			if (group && group.name == options.group)
				return;
		
			group = {name: options.group, items: jQuery([])};
			jQuery.each(jQuery(selector), function(i, e) {
	      if (!jQuery(e).is("[tu_group]"))
  			  jQuery(e).attr("tu_group", deriveOptions(null, deriveTopUpOptions(jQuery(e).bubbleDetect(selector))).group);

				if (jQuery(e).attr("tu_group") == group.name)
					group.items = group.items.add(e);
			});
			
			var ids = jQuery.map(group.items, function(e, i){
      						return "#" + jQuery(e).id();
    						});
			index = options.top_up ? jQuery.inArray(options.top_up, ids) : -1;
			
		} else
			group = null;
	};
	var navigateInGroup = function(step) {
		index = index + step;

		if (index < 0)
			index = group.items.length - 1;
		if (index > group.items.length - 1)
			index = 0;

		TopUp.displayTopUp(group.items[index]);
	};
  
	var prepare = function() {
		jQuery(".tu_wrapper").attr("class", "tu_wrapper tu_" + options.layout);
		
		jQuery("#top_up .tu_frame").resizable("destroy");
    jQuery("#top_up .tu_frame,.tu_content").unlockDimensions();
		
		if (jQuery.ie6)
			jQuery("#top_up .tu_title,#top_up .tu_controls_wrapper").fadeOut(100);
	
		(parseInt(options.fixed) == 1) ?
			jQuery("#top_up").addClass("tu_fixed") :
			jQuery("#top_up").removeClass("tu_fixed");
	
		(parseInt(options.shaded) == 1) ?
			jQuery("#tu_overlay").addClass("tu_shaded") :
			jQuery("#tu_overlay").removeClass("tu_shaded");
	
		(parseInt(options.modal) == 1) || (parseInt(options.shaded) == 1) || (parseInt(options.overlayClose) == 1) ?
			jQuery("#tu_overlay").show() :
			jQuery("#tu_overlay").hide();
	};	
	var loadContent = function() {
	  jQuery(".tu_selector_content").removeClass("tu_selector_content");
	  showLoader();
	  
		switch(options.type) {
			case "image":
        options.content = new Image();
        jQuery(options.content).load(function(){ options.content = jQuery(this); onContentReady(); })
                               .attr("src", options.reference);
				break;
			case "selector":
				options.content = jQuery(options.reference).filter(function() {
				  var collect = selector_content[jQuery(this).id()] ? true : jQuery(this).parents("#top_up,#temp_up").length == 0;
				  return collect;
				}); break;
			case "html": case "dom":
				options.content = jQuery(options.reference); break;
			case "iframe":
				options.content = jQuery('<iframe src="' + options.reference + '" frameborder="0" border="0"></iframe>'); break;
			case "ajax":
			  jQuery.ajax({url: options.reference, cache: false, async: false, dataType: "html", success: onContentReady}); break;
			case "script":
			  options.content = null;
			  jQuery.ajax({url: options.reference, cache: false, async: false, dataType: "script", success: onContentReady});
			  break;
		}
		
		if (options.type == "selector") {
		  jQuery.each(options.content.addClass("tu_selector_content"), function(i, e) {
		    e = jQuery(e);
		    if (!selector_content[e.id()])
		      selector_content[e.id()] = {element: e, hidden: e.is(":hidden"), parent: e.parent()};
		  });
		}
		
    if (jQuery.inArray(options.type, ["selector", "html", "dom", "iframe"]) != -1)
		  onContentReady();
	};
	var showLoader = function() {
	  var origin = jQuery("#top_up");
	  
	  if (jQuery("#top_up").is(":hidden")) {
	    var origin = jQuery(options.top_up);
  	  if (!origin.length)
  	    origin = jQuery(document);
  	  else if (origin.children().length > 0)
  	    origin = jQuery(origin.children()[0]);
	  }
	  
	  jQuery("#tu_loader").css({top: origin.offset().top, 
	                            left: origin.offset().left, 
	                            width: origin.outerWidth(), 
	                            height: origin.outerHeight()}).show();
	};
	var onContentReady = function(html) {
    jQuery("#tu_loader").hide();
	  
	  if (html)
	    options.content = jQuery(html);
	  
	  switch(options.type) {
	    case "image": case "iframe":
			  options.resize = options.content;
			  jQuery(".tu_content").removeClass("tu_scrollable");
			  break;
			default:
	      options.resize = jQuery("#temp_up .tu_content");
			  jQuery(".tu_content").addClass("tu_scrollable");
	  }
    
		jQuery("#top_up").is(":hidden") ? show() : replace();
	};
  
	var	show = function() {
	  setContent();
	  setDimensions();
	  
	  moveContent("top_up");
		jQuery("#top_up").center();
		
		switch(options.effect) {
			case "transform":
			  var origin = jQuery(options.top_up);
			  if (origin.children().length > 0)
			    origin = jQuery(origin.children()[0]);
			  var dimensions = options.top_up ? 
                           jQuery.extend({width: origin.outerWidth(), height: origin.outerHeight()}, origin.offset()) : 
			                     {top: 0, left: 0, width: 10, height: 10};

        transform("from", dimensions, afterShow); break;
			case "clip":
			  jQuery("#top_up").show("clip", {direction: "vertical"}, 500, afterShow); break;
      default:
  			if (jQuery.ie7) {
  			  jQuery("#top_up").show();
  			  afterShow();
  			} else
  			  jQuery("#top_up").fadeIn(300, afterShow);
		}
	};
  var transform = function(direction, dimensions, callback) {
	  var topUp = jQuery("#top_up");
	  var frame = topUp.find(".tu_frame");
    
    if (direction == "from")
	    topUp.addClass("tu_transparent").show();
    
		var contentDiff = {width: topUp.outerWidth() - options.content.outerWidth(), height: topUp.outerHeight() - options.content.outerHeight()};
		var frameDiff   = {width: topUp.outerWidth() - frame.outerWidth(),           height: topUp.outerHeight() - frame.outerHeight()};
    
    var contentOffset = options.content.offset();
    var topUpOffset   = topUp.offset();
		dimensions.top    -= contentOffset.top - topUpOffset.top;
		dimensions.left   -= contentOffset.left - topUpOffset.left;
		dimensions.width  += contentDiff.width;
		dimensions.height += contentDiff.height;

	  var origin = {top: topUp.css("top"), left: topUp.css("left"), width: topUp.outerWidth(), height: topUp.outerHeight()};
	  var opts   = {duration: 400, to: direction == "from" ? origin : dimensions};
    var func = function() {
  	  topUp          .animate({top:   opts.to.top, left: opts.to.left}, opts.duration);
  	  options.content.animate({width: opts.to.width - contentDiff.width, height: opts.to.height - contentDiff.height}, opts.duration);
      frame          .animate({width: opts.to.width - frameDiff.width,   height: opts.to.height - frameDiff.height},   opts.duration, null, function() {
        direction == "to" ?
          topUp.fadeOut(250, callback) :
          callback.apply();
      });
    }
    
    if (direction == "from") {
	    topUp          .css({top:   dimensions.top, left: dimensions.left});
		  options.content.css({width: dimensions.width - contentDiff.width, height: dimensions.height - contentDiff.height});
		  frame          .css({width: dimensions.width - frameDiff.width,   height: dimensions.height - frameDiff.height});
      topUp.removeClass("tu_transparent").hide().fadeIn(jQuery.ie ? 0 : 300, func);
    } else
      func.apply();
  };
	var replace = function(callback) {
		var wrapper = jQuery("#top_up .tu_content").lockDimensions().wrapInner("<div></div>").children();
		
	  wrapper.fadeOut(250, function() {
      moveContent("temp_up");
      wrapper.remove();
      
	    if (callback)
			  callback.apply([], ["tu_content"]);
      else {
        clearContent();
	      setContent();
      }
      setDimensions();
      
	    jQuery("#top_up").centerWrap(jQuery("#temp_up"));
	    
	    var animation = {width: jQuery("#temp_up .tu_content").outerWidth(),
	                     height: jQuery("#temp_up .tu_content").outerHeight()};
	    jQuery("#top_up .tu_content").animate(animation, 400, function() {
	      moveContent("top_up");
        jQuery("#top_up").removeCenterWrap();
	      afterDisplay();
      });
    });
	};
  
  var setContent = function() {
    options.content.appendTo("#temp_up .tu_content");
  };
	var moveContent = function(to) {
	  var from = to == "top_up" ? "temp_up" : "top_up";
    jQuery("#" + from + " .tu_content").children().appendTo("#" + to + " .tu_content");
    
    if (to == "top_up")
      jQuery("#top_up .tu_content").css({width: jQuery("#temp_up .tu_content").css("width"), 
                                         height: jQuery("#temp_up .tu_content").css("height")});
	};
	var clearContent = function() {
    jQuery.each(selector_content, function(i, c) {
      if (!c.element.hasClass("tu_selector_content")) {
        if (c.hidden)
          c.element.hide();
        c.parent.append(c.element);
        delete selector_content[c.element.id()];
      }
    });
    
    jQuery(".tu_content").children(":not(.tu_selector_content)").remove();
	};
	
	var setDimensions = function(dimensions) {
	  var func = dimensions ? null : checkHeight;
	  
	  if (!dimensions) {
	    options.resize.unlockDimensions();
	    if (jQuery.inArray(options.type, ["image", "iframe"]) != -1)
	      jQuery("#temp_up .tu_content").unlockDimensions();
	    
	    dimensions = {};
	    if (options.width)
	      dimensions.width = parseInt(options.width);
	    if (options.height)
	      dimensions.height = parseInt(options.height);
	  }
	  
	  options.resize.css(dimensions);
	  
	  if (func)
	    func.apply();
	};
	var checkHeight = function() {
	  if (jQuery("#temp_up").outerHeight() <= jQuery(window).height() - 4)
	    return;
	  
	  var extra_height = jQuery("#temp_up").outerHeight() - jQuery("#temp_up .tu_content").height(),
	      dimensions = {height: jQuery(window).height() - 4 - extra_height};
	  
	  if (options.type == "image")
		  dimensions.width = parseInt(options.content.width() * (dimensions.height / options.content.height()));
	  
	  setDimensions(dimensions);
	};
  var checkPosition = function() {
    var offset     = jQuery("#top_up").offset();
    var dimensions = {width: jQuery("#top_up").outerWidth(), height: jQuery("#top_up").outerHeight()};
    var position   = {};
    
    if (offset.top - jQuery(window).scrollTop() < 2)
      position.top = jQuery(window).scrollTop() + 2;
    else if (offset.top + dimensions.height - jQuery(window).scrollTop() > jQuery(window).height() - 2)
      position.top = jQuery(window).scrollTop() + jQuery(window).height() - dimensions.height - 2;
      
    if (offset.left - jQuery(window).scrollLeft() < 2)
      position.left = jQuery(window).scrollLeft() + 2;
    else if (offset.left + dimensions.width - jQuery(window).scrollLeft() > jQuery(window).width() - 2)
      position.left = jQuery(window).scrollLeft() + jQuery(window).width() - dimensions.width - 24;

    if (jQuery.keys(position).length > 0)
      jQuery("#top_up").animate(position, 300);
  }
	
	var afterShow = function() {
		afterDisplay();
		
		jQuery("#top_up .tu_controls_wrapper").css("display", null);

		if (group && group.items.length > 1) {
			jQuery("#top_up .tu_previous_link").css("display", null);
			jQuery("#top_up .tu_next_link").css("display", null);
		} else {
			jQuery("#top_up .tu_previous_link").css("display", "none");
			jQuery("#top_up .tu_next_link").css("display", "none");
		}
		
    jQuery("#top_up .tu_title,#top_up .tu_close_link,#top_up .tu_controls_wrapper").fadeIn(jQuery.ie ? 0 : 200);
	};
	var afterDisplay = function() {
		if (jQuery.ie6) {
			jQuery("#top_up .tu_title").css({width: jQuery("#top_up").width()});
			jQuery("#top_up .tu_bottom_bar").css({width: jQuery("#top_up").width()});
			jQuery("#top_up .tu_controls_wrapper,#top_up .tu_title").fadeIn(100);
		}
		if (jQuery.ie) {
			jQuery("#top_up .tu_content").hide().show();
			options.content.scrollTop(0).scrollLeft(0);
		}
		
		jQuery("#top_up .tu_title").html(options.title);
		
		if (parseInt(options.resizable) == 1) {
		  var opts = {handles: "se", minWidth: 200, minHeight: 75, alsoResize: "#" + options.resize.id(), aspectRatio: options.type == "image"};
	    jQuery("#top_up .tu_frame").resizable(opts);
		}
		
		checkPosition();
		
		displaying = false;
	};
	
	var hide = function(callback) {
	  var duration = jQuery.ie ? 0 : 250;
	  var func = function() {
	    animateHide(callback)
	  };
	  
		jQuery("#top_up .tu_title").fadeOut(duration);
		jQuery("#top_up .tu_close_link").fadeOut(duration);
	  jQuery("#top_up .tu_controls_wrapper").fadeOut(duration, func);
	};
	var animateHide = function(callback) {
	  var afterHide = function() {
	    if (callback)
	      callback.apply();
	    jQuery(".tu_selector_content").removeClass("tu_selector_content");
	    
	    clearContent();
      moveContent("temp_up");
	  };
	  
    switch(options.effect) {
      case "transform":
			  var origin = jQuery(options.top_up);
			  if (origin.children().length > 0)
			    origin = jQuery(origin.children()[0]);
			  var dimensions = options.top_up ? 
                           jQuery.extend({width: origin.outerWidth(), height: origin.outerHeight()}, origin.offset()) : 
			                     {top: 0, left: 0, width: 10, height: 10};
			  transform("to", dimensions, afterHide); break;
      case "clip":
        jQuery("#top_up").hide("clip", {direction: "vertical"}, 400, afterHide); break;
      default:
        if (jQuery.ie7) {
          jQuery("#top_up").hide();
				  afterHide.apply();
        } else
          jQuery("#top_up").fadeOut(300, afterHide);
    }
		
		jQuery("#tu_overlay").hide();
	};
	
	return {
		host: scriptHost,
		images_path: "images/top_up/",
		init: function() {
			if (initialized)
				return false;
			initialized = true;
			
			jQuery(document).ready(function() {
				extendjQuery();
				injectCode();
				bind();
				
				jQuery("#top_up").draggable({cancel: ".tu_content,a"});
				jQuery.each(on_ready, function(i, func) {
					func.apply();
				});
			});
		},
		defaultPreset: function(set) {
		  default_preset = jQuery.extend(default_preset, set);
		},
		addPresets: function(sets) {
			presets = jQuery.extend(presets, sets);
		},
		ready: function(func) {
			on_ready.push(func);
		},
		rebind: function() {
			bind();
		},
		displayTopUp: function(element, opts) {
		  var top_up = jQuery(element).bubbleDetect(selector);
		  var toptions = deriveTopUpOptions(top_up, jQuery.extend(opts || {}, {trigger: "#" + jQuery(element).id()}));
  		TopUp.display(top_up.element.attr("href"), toptions);
	  },
		display: function(reference, opts) {
			if (displaying)
				return false;
			displaying = true;
			
			deriveOptions(reference, opts, true);
      deriveGroup();
      
			prepare();
			loadContent();
		},
		update: function(func) {
		  options.type = "html";
      options.resize = jQuery("#temp_up .tu_content");
		  jQuery(".tu_content").addClass("tu_scrollable");
		  
		  replace(func || function() {});
		},
		previous: function() {
			navigateInGroup(-1);
		},
		next: function() {
			navigateInGroup(1);
		},
		overlayClose: function() {
		  if (parseInt(options.overlayClose) == 1)
		    TopUp.close();
		},
		close: function(callback) {
      if (jQuery("#top_up").is(":visible"))
		    hide(callback);
		}
	}
}();
TopUp.init();

}