if (typeof(TopUp) == "undefined") {

var scriptElement = (function deriveScriptElement() {
	var id = "tu_dummy_script";
	document.write('<script id="' + id + '"></script>');

	var dummyScript = document.getElementById(id);
	var element = dummyScript.previousSibling;

	dummyScript.parentNode.removeChild(dummyScript);
	return element;
}());
var scriptHost = (function deriveScriptHost() {
  var src = scriptElement.getAttribute("src");
	return src.match(/^\w+\:\/\//) ? src.match(/^\w+\:\/\/[^\/]*\//)[0] : "";
}());

// *
// * TopUp {version} (Uncompressed)
// * The #1 Javascript Pop Up (http://gettopup.com)
// *
// * This library requires jQuery (http://jquery.com)
// *
// * (c) {year} Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, TopUp is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: {date} $
// *

TopUp = (function() {
	var initialized = false, selector = null, on_ready = [], displaying = false, options = null, group = null, index = null, selector_content = {};
	var default_preset = {
		layout: "dashboard",
		effect: "transform",
		resizable: 1
	}, presets = {};
	
	var extendjQuery = function() {
		jQuery.extend({
			keys: function(hash) {
				var keys = [];
				for (var key in hash) {
				  if (hash.hasOwnProperty(key)) {
					  keys.push(key);
				  }
				}
				return keys;
			},
			ie:  jQuery.browser.msie,
			ie6: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) == 6,
			ie7: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) == 7,
			ff2: jQuery.browser.mozilla && parseFloat(jQuery.browser.version) < 1.9
		});
		jQuery.fn.extend({
			id: function() {
				if (!this.is("[id]")) {
					var id = "";
					var counter = 0;
	    			do {id = "element_" + counter++;} while (jQuery("#" + id).length);
					jQuery(this).attr("id", id);
				}
				return jQuery(this).attr("id");
			},
			bubbleDetect: function(selector, separator) {
				var detected = null;
				var element = this;
				jQuery.each(selector.split(separator || ","), function(i, e) {
					var selector = jQuery.trim(e);
					if (jQuery(selector).index(element) != -1) {
						detected = {element: jQuery(element), selector: selector};
					}
				});
				return detected || (element.parent()[0] ? jQuery(element.parent()[0]).bubbleDetect(selector, separator) : null);
			},
			center: function() {
			  var css = {top: parseInt((jQuery(window).height() - this.outerHeight()) / 2, 10) + jQuery(window).scrollTop(),
	  		   			   left: parseInt((jQuery(window).width() - this.outerWidth()) / 2, 10) + jQuery(window).scrollLeft(),
	  		   			   position: "absolute"};
			  
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
				var current = {width: this.outerWidth(), height: this.outerHeight()}, delta = {width: 0, height: 0}, diff = 0;
					
        diff = compare.outerWidth() - current.width;
        if (delta.width < diff) {
          delta.width = diff;
        }
        diff = compare.outerHeight() - current.height;
        if (delta.height < diff) {
          delta.height = diff;
        }
				
				var offset = this.offset();
				jQuery("#tu_center_wrapper").css({
                													 top: offset.top - (delta.height === 0 ? 0 : parseInt(delta.height / 2, 10)), 
                													 left: offset.left - (delta.width === 0 ? 0 : parseInt(delta.width / 2, 10)),
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
				
        if (jQuery.ff2) {
          this.css({display: "table"});
        }
        if (jQuery.ie) {
          this.css({display: "inline"});
        }
				
				jQuery("#tu_center_wrapper").show();
				
				return this;
			},
			removeCenterWrap: function() {
				var position = jQuery("#tu_center_wrapper").offset();
				var delta = {width: jQuery("#tu_center_wrapper").outerWidth() - this.outerWidth(), height: jQuery("#tu_center_wrapper").outerHeight() - this.outerHeight()};

				this.css({top: position.top + parseInt(delta.height / 2, 10), left: position.left + parseInt(delta.width / 2, 10), position: "absolute"}).appendTo("body");
				jQuery("#tu_center_wrapper").hide();

				return this;
			},
			draggable: function(opts) {
			  var element = this;
			  
        this.mousedown(function(event) {
          if (opts && opts.only && !jQuery(event.target).is(opts.only)) {
			      return;
			    }
          
          event.preventDefault();

          var offset = element.offset();
          var diff = {top: event.pageY - offset.top, left: event.pageX - offset.left};
          
          jQuery("body").addClass("tu_dragging");
          jQuery("*").bind("mousemove.draggable", function(event) {
            element.css({top: event.pageY - diff.top, left: event.pageX - diff.left});
          });
        });

        jQuery("#top_up").mouseup(function(event) {
          jQuery("body").removeClass("tu_dragging");
          jQuery("*").unbind("mousemove.draggable");
        });
      }
		});
	};
	var injectCode = function() {
		var images_url = TopUp.host + TopUp.images_path;
		
		var style = '<div></div>';
		var ie7fix = '<div></div>';
		var ie6fix = '<div></div>';
		var iefix = '<div></div>';
		var html = '<div></div>';

		jQuery(style).prependTo("head");
			
		if (jQuery.ie7) {
			jQuery(ie7fix).insertAfter("head > style:first");
		}
		if (jQuery.ie6) {
			jQuery(ie6fix).insertAfter("head > style:first");
		}
		if (jQuery.ie) {
			jQuery(iefix).insertAfter("head > style:first");
		}
	
	  jQuery(html).appendTo("body");
	};
	var bind = function() {
		var coptions = ["[class*=x]"];
		jQuery.each(["db", "ql", "image", "html", "dom", "iframe", "ajax", "script"], function(i, coption) {
      coptions.push("[class*=_" + coption + "]");
    });
    
		selector = jQuery.merge([".top_up", "[toptions]", "[class^=tu_]:" + coptions.join(",")], jQuery.keys(presets)).join();
		
		jQuery(selector).bind("click", topUpClick);
		jQuery(document).bind("keypress", documentKeyPress);
	};
  var fadeDuration = function(duration) {
    return jQuery.ie7 ? 1 : duration;
  };

	var topUpClick = function(event) {
		TopUp.displayTopUp(jQuery(event.target));
		return false;
	};
	var documentKeyPress = function(event) {
    if (jQuery("#top_up").is(":hidden")) {
		  return;
		}
		
		switch(event.keyCode) {
      case 27:
		    TopUp.close(); break;
		  case 37:
        TopUp.previous(); break;
		  case 39:
        TopUp.next(); break;
    }
	};
	
	var deriveTopUpOptions = function(topUp, opts) {
	  var toptions = jQuery.extend({}, {topUp: "#" + topUp.element.id(), preset: topUp.selector});
	  
    jQuery.each(topUp.element.attr("class").split(/\s/), function(i, c) {
      if (c.match(/^tu_/)) {
        jQuery.each(c.replace(/^tu_/, "").split("_"), function(j, coption) {
          switch(coption) {
            case "db": case "ql":
      		    toptions["layout"] = {"db": "dashboard", "ql": "quicklook"}[coption]; break;
      		  case "image": case "html": case "dom": case "iframe": case "ajax": case "script":
              toptions["type"] = coption; break;
            default:
              if (coption.match(/\dx\d/)) {
                toptions["width"]  = coption.split("x")[0];
                toptions["height"] = coption.split("x")[1];
              }
          } 
        });
      }
    });
    
	  if (topUp.element.is("[toptions]")) {
			jQuery.each(topUp.element.attr("toptions").split(","), function(i, option) {
				var key_value = option.split("=");
				toptions[jQuery.trim(key_value[0])] = jQuery.trim(key_value[1]);
			});
		}
		
		if (toptions.noGroup && parseInt(toptions.noGroup, 10) == 1) {
		  toptions.group = null;
		}
  		
  	if (opts) {
  	  toptions = jQuery.extend(toptions, opts);
  	}
    
    return toptions;
	};
	var deriveOptions = function(reference, opts, store) {
		var result = jQuery.extend({}, default_preset);
		
		if (opts) {
		  if (presets[opts.preset]) {
			  result = jQuery.extend(result, presets[opts.preset]);
			}
			result = jQuery.extend(result, opts);
		}
		
		if (store) {
  		result.reference = result.reference ? jQuery(result.reference) : reference;
      if (!result.type) {
        result.type = result.reference.toLowerCase().match(/\.(bmp|gif|jpg|jpeg|png|tif|wbmp)$/) ? "image" : "ajax";
      }
    
			options = jQuery.extend({}, result);
		}
		
		return result;
	};
	
	var deriveGroup = function() {
		if (options.group) {
		
			if (group && group.name == options.group) {
				return;
			}
		
			group = {name: options.group, items: jQuery([])};
			jQuery.each(jQuery(selector), function(i, e) {
	      if (!jQuery(e).is("[tu_group]")) {
  			  jQuery(e).attr("tu_group", deriveOptions(null, deriveTopUpOptions(jQuery(e).bubbleDetect(selector))).group);
  			}

				if (jQuery(e).attr("tu_group") == group.name) {
					group.items = group.items.add(e);
				}
			});
			
			var ids = jQuery.map(group.items, function(e, i){
      						return "#" + jQuery(e).id();
    						});
			index = options.topUp ? jQuery.inArray(options.topUp, ids) : -1;
			
		} else {
			group = null;
		}
	};
	var navigateInGroup = function(step) {
	  if (group === null) {
	    return;
	  }
	  
		index = index + step;

		if (index < 0) {
			index = group.items.length - 1;
		}
		if (index > group.items.length - 1) {
			index = 0;
		}

		TopUp.displayTopUp(group.items[index]);
	};
  
	var prepare = function() {
		jQuery("#top_up .tu_frame").resizable("destroy");
		
		jQuery("#top_up .tu_title").fadeOut(fadeDuration(200));
		if (!(group && group.items.length > 1)) {
		  jQuery("#top_up .tu_controls").fadeOut(fadeDuration(200));
		}
		
		jQuery(".tu_wrapper").attr("class", "tu_wrapper tu_" + options.layout);
    jQuery(".tu_frame,.tu_content").unlockDimensions();
	  
		if (parseInt(options.shaded, 10) == 1) {
			jQuery("#tu_overlay").addClass("tu_shaded");
		} else {
			jQuery("#tu_overlay").removeClass("tu_shaded");
		}
	
		if ((parseInt(options.modal, 10) == 1) || (parseInt(options.shaded, 10) == 1) || (parseInt(options.overlayClose, 10) == 1)) {
			jQuery("#tu_overlay").show();
		} else {
			jQuery("#tu_overlay").hide();
		}
	};	
	var loadContent = function() {
    // jQuery(".tu_selector_content").removeClass("tu_selector_content");
	  showLoader();
	  
		switch(options.type) {
			case "image":
        options.content = new Image();
        jQuery(options.content).load(function() {
                                  options.content = jQuery(this);
                                  onContentReady();
                                })
                               .attr("src", options.reference);
				break;
      // case "selector":
      //  options.content = jQuery(options.reference).filter(function() {
      //    var collect = selector_content[jQuery(this).id()] ? true : jQuery(this).parents("#top_up,#temp_up").length == 0;
      //    return collect;
      //  }); break;
			case "html": case "dom":
				options.content = jQuery(options.reference); break;
			case "iframe":
				options.content = jQuery('<iframe src="' + options.reference + '" frameborder="0" border="0"></iframe>'); break;
			case "ajax": case "script":
			  options.content = null;
			  jQuery.ajax({url: options.reference, 
			               type: (parseInt(options.post, 10) == 1) ? "POST" : "GET", 
			               cache: false, 
			               async: false, 
			               data: options.parameters, 
			               dataType: (options.type == "ajax") ? "html" : "script", 
			               success: onContentReady});
		}
		
    // if (options.type == "selector") {
    //   jQuery.each(options.content.addClass("tu_selector_content"), function(i, e) {
    //     e = jQuery(e);
    //     if (!selector_content[e.id()]) {
    //       selector_content[e.id()] = {element: e, hidden: e.is(":hidden"), parent: e.parent()};
    //     }
    //   });
    // }
		
    if (jQuery.inArray(options.type, ["selector", "html", "dom", "iframe"]) != -1) {
		  onContentReady();
		}
	};
	var onContentReady = function(html) {
	  hideLoader();
	  
	  if (html) {
	    options.content = jQuery(html);
	  }
	  
	  switch(options.type) {
	    case "image": case "iframe":
			  options.resize = options.content;
			  jQuery(".tu_content").removeClass("tu_scrollable");
			  break;
			default:
	      options.resize = jQuery("#temp_up .tu_content");
			  jQuery(".tu_content").addClass("tu_scrollable");
	  }
    
		if (jQuery("#top_up").is(":hidden")) {
		  show();
		} else {
		  replace();
		}
	};
	var showLoader = function() {
	  var origin = jQuery("#top_up");
	  
	  if (jQuery("#top_up").is(":hidden")) {
	    origin = jQuery(options.topUp);
  	  if (!origin.length) {
  	    origin = jQuery(document);
  	  } else if (origin.children().length > 0) {
  	    origin = jQuery(origin.children()[0]);
  	  }
	  }
	  
		try {
  	  var dimensions = {top: origin.offset().top, 
                        left: origin.offset().left, 
                        width: origin.outerWidth(), 
                        height: origin.outerHeight()};
    } catch(e) {
  	  var dimensions = {top: jQuery(window).scrollTop(), 
                        left: jQuery(window).scrollLeft(), 
                        width: parseInt(jQuery(window).width() / 2), 
                        height: parseInt(jQuery(window).height() / 2)};
    }

	  jQuery("#tu_loader").css(dimensions).show();
	};
	var hideLoader = function() {
    jQuery("#tu_loader").hide();
  };
  
	var	show = function() {
	  setContent();
	  setDimensions();
	  
	  moveContent("top_up");
		jQuery("#top_up").center();
		
		switch(options.effect) {
      case "fade":
        jQuery("#top_up").fadeIn(fadeDuration(300), afterDisplay); break;
			case "clip":
			  jQuery("#top_up").show("clip", {direction: "vertical"}, 500, afterDisplay); break;
			default:
			  var origin = jQuery(options.topUp);
			  if (origin.children().length > 0) {
			    origin = jQuery(origin.children()[0]);
			  }
			  var tuContent = jQuery("#top_up").find(".tu_content");
			  var dimensions = options.topUp ? 
                           jQuery.extend({width: origin.outerWidth(), height: origin.outerHeight()}, origin.offset()) : 
			                     {top: parseInt(jQuery(window).height() / 2) - parseInt(tuContent.height() / 2) + jQuery(window).scrollTop(), 
			                      left: parseInt(jQuery(window).width() / 2) - parseInt(tuContent.width() / 2) + jQuery(window).scrollLeft(), 
			                      width: 10, 
			                      height: 10};

        transform("from", dimensions, afterDisplay);
		}
	};
	var replace = function(callback) {
		var wrapper = jQuery("#top_up .tu_content").lockDimensions().wrapInner("<div></div>").children();
		
	  wrapper.fadeOut(fadeDuration(250), function() {
      moveContent("temp_up");
      wrapper.remove();
      
	    if (callback) {
			  callback.apply([], [jQuery("#top_up .tu_content").id()]);
      } else {
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
    
    if (to == "top_up") {
      jQuery("#top_up .tu_content").css({width: jQuery("#temp_up .tu_content").css("width"), 
                                         height: jQuery("#temp_up .tu_content").css("height")});
    }
	};
	var clearContent = function() {
    jQuery.each(selector_content, function(i, c) {
      if (!c.element.hasClass("tu_selector_content")) {
        if (c.hidden) {
          c.element.hide();
        }
        c.parent.append(c.element);
        delete selector_content[c.element.id()];
      }
    });
    
    jQuery(".tu_content").children(":not(.tu_selector_content)").remove();
	};
  
  var transform = function(direction, dimensions, callback) {
	  var topUp     = jQuery("#top_up");
	  var tuContent = topUp.find(".tu_content");
	  
	  if (direction == "from") {
      topUp.addClass("tu_transparent")
           .show();
    }
	  
	  var topUpOffset     = topUp.offset();
	  var tuContentOffset = tuContent.offset();
	  var tuContentDiff   = {width:  topUp.width()  - tuContent.width(), 
	                         height: topUp.height() - tuContent.height()};
	  
    dimensions.top    -= tuContentOffset.top  - topUpOffset.top;
    dimensions.left   -= tuContentOffset.left - topUpOffset.left;
	  
	  var origin    = {top: topUp.css("top"), left: topUp.css("left"), width: topUp.outerWidth(), height: topUp.outerHeight()};
	  var opts      = {to: direction == "from" ? origin : dimensions, duration: 500};
	  
	  if (direction == "from") {
	    opts.to.width  -= tuContentDiff.width;
	    opts.to.height -= tuContentDiff.height;
	  }

	  var animation = function() {
	    var onReady = direction == "to" ?
                      function() {
                        topUp.fadeOut(fadeDuration(250), callback)
                             .removeClass("tu_overflow");
                      } :
                      function() {
                        callback.apply();
                        topUp.removeClass("tu_overflow");
                      };

	    topUp          .animate({top: opts.to.top, left: opts.to.left}, opts.duration);
	    options.content.animate({width:  opts.to.width, 
	                             height: opts.to.height}, opts.duration, onReady);
	  };
	  
    if (direction == "from") {
      topUp          .css({top:   dimensions.top,   left:   dimensions.left});
      options.content.css({width: dimensions.width, height: dimensions.height});

      topUp.hide()
           .addClass("tu_overflow")
           .removeClass("tu_transparent")
           .fadeIn(fadeDuration(300), animation);
    } else {
      animation.apply();
    }
  };
	var afterDisplay = function() {
    var duration = fadeDuration(500);
		
		if (parseInt(options.resizable, 10) == 1) {
		  var opts = {stop: function(){ jQuery("#top_up .tu_frame").css({width: "auto", height: "auto"}); }, 
		              handles: "se", 
		              minWidth: 200, minHeight: 75, 
		              alsoResize: "#" + options.resize.id(), 
		              aspectRatio: options.type == "image"};
	    jQuery("#top_up .tu_frame").resizable(opts);
		}
		
		if (jQuery.ie6) {
      jQuery("#top_up .tu_title").css("width", jQuery("#top_up").width());
    }
		jQuery("#top_up .tu_title").html(options.title || "")
		                           .fadeIn(duration);
		
		if (group && group.items.length > 1 && jQuery("#top_up .tu_controls").is(":hidden")) {
      if (jQuery.ie6) {
        jQuery("#top_up .tu_controls").show();
      } else {
		    jQuery("#top_up .tu_controls").fadeIn(duration);
		  }
		}
		
    if (jQuery("#top_up .tu_close_link").is(":hidden")) {
      if (jQuery.ie6) {
        jQuery("#top_up .tu_close_link").show();
      } else {
        jQuery("#top_up .tu_close_link").fadeIn(duration);
      }
    }
		
		checkPosition();
		
		displaying = false;
	};

	var setDimensions = function(dimensions) {
	  var func = dimensions ? null : checkHeight;
	  
	  if (!dimensions) {
	    options.resize.unlockDimensions();
	    if (jQuery.inArray(options.type, ["image", "iframe"]) != -1) {
	      jQuery("#temp_up .tu_content").unlockDimensions();
	    }
	    
	    dimensions = {};
	    if (options.width) {
	      dimensions.width = parseInt(options.width, 10);
	    }
	    if (options.height) {
	      dimensions.height = parseInt(options.height, 10);
	    }
	    if (jQuery.ie6) {
	      jQuery("#top_up .tu_title").css("width", jQuery("#temp_up").outerWidth());
	    }
	  }
	  
	  options.resize.css(dimensions);
	  
	  if (func) {
	    func.apply();
	  }
	};
	var checkHeight = function() {
	  if (jQuery("#temp_up").outerHeight() <= jQuery(window).height() - 4) {
	    return;
	  }
	  
	  var extraHeight = jQuery("#temp_up").outerHeight() - jQuery("#temp_up .tu_content").height(),
	      dimensions = {height: jQuery(window).height() - 4 - extraHeight};
	  
	  if (options.type == "image") {
		  dimensions.width = parseInt(options.content.width() * (dimensions.height / options.content.height()), 10);
		}
	  
	  setDimensions(dimensions);
	};
  var checkPosition = function() {
    var offset     = jQuery("#top_up").offset();
    var dimensions = {width: jQuery("#top_up").outerWidth(), height: jQuery("#top_up").outerHeight()};
    var position   = {};
    
    if (offset.top - jQuery(window).scrollTop() < 2) {
      position.top = jQuery(window).scrollTop() + 2;
    } else if (offset.top + dimensions.height - jQuery(window).scrollTop() > jQuery(window).height() - 2) {
      position.top = jQuery(window).scrollTop() + jQuery(window).height() - dimensions.height - 2;
    }
      
    if (offset.left - jQuery(window).scrollLeft() < 2) {
      position.left = jQuery(window).scrollLeft() + 2;
    } else if (offset.left + dimensions.width - jQuery(window).scrollLeft() > jQuery(window).width() - 2) {
      position.left = jQuery(window).scrollLeft() + jQuery(window).width() - dimensions.width - 24;
    }

    if (jQuery.keys(position).length > 0) {
      jQuery("#top_up").animate(position, 300);
    }
  };
	
	var hide = function(callback) {
	  var duration = fadeDuration(250);
	  var onReady = function() {
	    animateHide(callback);
	  };
	  
		jQuery("#top_up .tu_title")     .fadeOut(duration);
    jQuery("#top_up .tu_controls")  .fadeOut(duration);
    if (jQuery.ie) {
		  jQuery("#top_up .tu_close_link").hide();
		  onReady.apply();
    } else {
		  jQuery("#top_up .tu_close_link").fadeOut(duration, onReady);
		}
	};
	var animateHide = function(callback) {
	  var afterHide = function() {
	    if (callback) {
	      callback.apply();
	    }
      // jQuery(".tu_selector_content").removeClass("tu_selector_content");
	    
	    clearContent();
      moveContent("temp_up");
	  };
	  
    switch(options.effect) {
      case "fade":
        jQuery("#top_up").fadeOut(fadeDuration(300), afterHide); break;
      case "clip":
        jQuery("#top_up").hide("clip", {direction: "vertical"}, 400, afterHide); break;
      default:
			  var origin = jQuery(options.topUp);
			  if (origin.children().length > 0) {
			    origin = jQuery(origin.children()[0]);
			  }
			  var tuContent = jQuery("#top_up").find(".tu_content");
			  var dimensions = options.topUp ? 
                           jQuery.extend({width: origin.outerWidth(), height: origin.outerHeight()}, origin.offset()) : 
			                     {top: parseInt(jQuery(window).height() / 2) + jQuery(window).scrollTop(), 
			                      left: parseInt(jQuery(window).width() / 2) + jQuery(window).scrollLeft(), 
			                      width: 10, 
			                      height: 10};
			                     
			  transform("to", dimensions, afterHide);
    }
		
		jQuery("#tu_overlay").hide();
	};
	
	return {
		host: scriptHost,
		images_path: "images/top_up/",
		init: function() {
			if (initialized) {
				return false;
			}
			
			try {
  			jQuery(document).ready(function() {
          extendjQuery();
          injectCode();
          bind();
        
          jQuery("#top_up").draggable({only: ".tu_title,.tu_top *,.tu_bottom *"});
          jQuery.each(on_ready, function(i, func) {
            func.apply();
          });
  			});
			
        jQuery(window).unload(function() {
          jQuery("*").unbind();
  		    jQuery("#top_up .tu_frame").resizable("destroy");
        });
        
  			initialized = true;
      } catch(e) {}
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
		  var topUp = jQuery(element).bubbleDetect(selector);
		  var toptions = deriveTopUpOptions(topUp, jQuery.extend(opts || {}, {trigger: "#" + jQuery(element).id()}));
  		TopUp.display(topUp.element.attr("href"), toptions);
	  },
		display: function(reference, opts) {
			if (displaying) {
				return false;
			}

			try {
  			displaying = true;
  			deriveOptions(reference, opts, true);
        deriveGroup();
      
  			prepare();
  			loadContent();
			} catch(e) {
			  displaying = false;
        alert("Sorry, but the following error occured:\n\n" + e);
			}
		},
		update: function(func) {
      if (jQuery("#top_up").is(":hidden")) {
        return;
      }
      
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
		  if (parseInt(options.overlayClose, 10) == 1) {
		    TopUp.close();
		  }
		},
		close: function(callback) {
      if (jQuery("#top_up").is(":visible")) {
		    hide(callback);
		  }
		}
	};
}());

(function () {
  if (typeof(jQuery) == "undefined") {
    var src = scriptElement.getAttribute("src").replace(/top_up(\-min)?\.js.*$/, "jquery.js");
    document.write('<script src="' + src + '" type="text/javascript" ' + 
                           'onload="TopUp.init()" onreadystatechange="TopUp.init()">' +
                   '</script>');
  } else {
    TopUp.init();
  }
}());

}