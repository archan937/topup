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
// * This library requires Prototype (http://prototypejs.org)
// *
// * (c) {year} Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, TopUp is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: {date} $
// *

TopUp = (function() {
	var initialized = false, on_ready = [], displaying = false, options = null, group = null, index = null, data = null, reservedDuration = 0.25;
	var observing = new Hash({
	  body     : true,
	  selector : null,
	  currently: []
	});
	var default_preset = new Hash({
    layout   : "dashboard",
    effect   : "transform",
    duration : 0.5,
    resizable: 1
	}), presets = new Hash();
  
  // TODO: http://www.shadowbox-js.com/index.html features
  // TODO: te_title shadow
  // TODO: optimize gettopup.com
  // TODO: release TopUp Prototype version
  // TODO: correct Lightbox Clones Matrix
  // TODO: complete examples
  // TODO: combine with fixes of Den and Chris
  // TODO: finetune the jquery (and prototype?) javascript include(s)
  // TODO: provide functionally stripped versions of TopUp? (e.g. /releases/latest/top_up-min.js, /releases/latest/top_up-all.js, /releases/latest/top_up-ql.js, /releases/latest/top_up-base.js)
  // TODO: make TopUp agnostic
  // TODO: enable comments deletion using link in mail
  
  var extendPrototype = function() {
    Prototype.Browser.IE6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5), 10) == 6;
    Prototype.Browser.IE7 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5), 10) == 7;
    Prototype.Browser.IE8 = Prototype.Browser.IE && !Prototype.Browser.IE6 && !Prototype.Browser.IE7;
    
    Element.addMethods({
      center: function(element) {
        element = $(element);
        var scrollOffsets = document.viewport.getScrollOffsets();
        return element.setStyle({
          top     : parseInt((document.viewport.getHeight() - element.getHeight()) / 2, 10) + scrollOffsets.top  + "px",
          left    : parseInt((document.viewport.getWidth()  - element.getWidth() ) / 2, 10) + scrollOffsets.left + "px",
          position: "absolute"
        });
      },
			lockDimensions: function(element) {
        element.setStyle({width: element.getWidth() + "px", height: element.getHeight() + "px"});
				return element;
			},
			unlockDimensions: function(element) {
				element.setStyle({width: "auto", height: "auto"});
				return element;
			},
			centerWrap: function(element, compare) {
				var current = {width: element.getWidth(), height: element.getHeight()}, delta = {width: 0, height: 0}, diff = 0;
					
        diff = compare.getWidth() - current.width;
        if (delta.width < diff) {
          delta.width = diff;
        }
        diff = compare.getHeight() - current.height;
        if (delta.height < diff) {
          delta.height = diff;
        }
				
				var offset = element.cumulativeOffset();
				var css = $H({
                    top: offset.top - (delta.height === 0 ? 0 : parseInt(delta.height / 2, 10)), 
                    left: offset.left - (delta.width === 0 ? 0 : parseInt(delta.width / 2, 10)),
                    width: element.getWidth() + delta.width, 
                    height: element.getHeight() + delta.height
                  });
        
        if (options.get("x")) {
          css.set("left", options.get("x") - parseInt((css.get("width")  - compare.getWidth())  / 2, 10));
        }
        if (options.get("y")) {
          css.set("top" , options.get("y") - parseInt((css.get("height") - compare.getHeight()) / 2, 10));
        }
        css.keys().each(function(k) { css.set(k, css.get(k) + "px") });
				
				$("tu_center_wrapper").setStyle(css.toObject());
        $("tu_centered_content").insert({bottom: element});
				
				element.setStyle({
    							top: "auto",
    							left: "auto",
    							width: "auto",
    							height: "auto",
                  display: "inline-block",
    							position: "relative"
    						});
				
        if (Prototype.Browser.FF2) {
          element.setStyle({display: "table"});
        }
        if (Prototype.Browser.IE6) {
          element.setStyle({display: "inline"});
        }
				
				$("tu_center_wrapper").show();
				
				return element;
			},
			removeCenterWrap: function(element) {
				var position = $("tu_center_wrapper").cumulativeOffset();
				var delta = {width: $("tu_center_wrapper").getWidth() - element.getWidth(), height: $("tu_center_wrapper").getHeight() - element.getHeight()};

        document.body.insert({bottom: element.setStyle({top : position.top  + parseInt(delta.height / 2, 10) + "px", 
                                                        left: position.left + parseInt(delta.width  / 2, 10) + "px", 
                                                        position: "absolute"})});
				$("tu_center_wrapper").hide();

				return element;
			}
    });
    
    Effect.SwitchOn = function(element) {
      element = $(element);
      var elementDimensions = element.getDimensions();
      return new Effect.Scale(
        element, 100, 
        Object.extend({
          duration       : 0.55, 
          scaleFromCenter: true,
          scaleX         : false, 
          scaleContent   : false, 
          scaleFrom      : 1,
          beforeSetup: function(effect) {
            effect.element.show().makePositioned().makeClipping();
          }
        }, arguments[1] || {})
      );
    };
  };
	var injectCode = function() {
		var images_url = TopUp.host + TopUp.images_path;
		
		var css = '<div></div>';
		var ie7fix = '<div></div>';
		var ie6fix = '<div></div>';
		var iefix = '<div></div>';
		var html = '<div></div>';
		
		if (css == '<div></div>') {
		  return; // This only occurs when running in development mode
		}
		
		var head = $$("head").first();
		if (!head) {
		  document.body.insert({before: (head = new Element("head"))});
		}
		head.insert({top: css});
		
		var style = $$("head style").first();
    if (Prototype.Browser.IE7) {
      style.insert({after: ie7fix});
    }
    if (Prototype.Browser.IE6) {
      style.insert({after: ie6fix});
    }
    if (Prototype.Browser.IE) {
      style.insert({after: iefix});
    }
		
    document.body.insert(html);
	};
	var bind = function() {
	  var body = $(document.body);
	  
	  var observe_body = observing.get("body");
	  var selector     = observing.get("selector");
	  
	  if (observe_body) {
	    body.observe("click", documentClick);
	    observing.get("currently").push("body");
	  }
	  if (selector) {
	    $$(selector).each(function(element) {
	      element.observe("click", documentClick);
	    });
	    observing.get("currently").push(selector);
	  }
	  
    body.observe("keydown", documentKeyDown);
	};
	
  var documentClick = function(event) {
    var top_up = deriveTopUp(event);
    if (top_up) {
      topUpClick(top_up, event);
    }
  };
	var documentKeyDown = function(event) {
    if ($("top_up").visible()) {
  		switch(event.keyCode) {
        case 27:
  		    TopUp.close(); break;
  		  case 37:
          TopUp.previous(); break;
  		  case 39:
          TopUp.next(); break;
      }
		}
	};
	var topUpClick = function(top_up, event) {
		TopUp.displayTopUp(top_up);
		event.stop();
	};

	var deriveTopUp = function(event) {
	  var element = event.element();
	  if (element.descendantOf("top_up")) {
	    return;
	  }
    return [element, element.up(), element.up(1)].detect(function(e) {
      return !!e &&
             (e.hasClassName("top_up") || 
              e.hasAttribute("toptions") || 
              e.classNames().any(function(c) { return c.match(/^tu_/) != null }) || 
              presets.keys().any(function(s) { return e.match(s) }));
    });
	};
	var deriveToptions = function(top_up, opts) {
	  var toptions = default_preset.merge({
	                   topUp:     top_up.identify(),
	                   reference: top_up.readAttribute("href")
	                 });
    
    presets.each(function(preset) {
      if (top_up.match(preset.first())) {
        toptions.update(preset.last());
      }
    });
	  
	  if (top_up.hasAttribute("toptions")) {
      top_up.readAttribute("toptions").split(",").each(function(option) {
        var key_value = option.split("=").invoke("strip");
        toptions.set(key_value[0], key_value[1]);
      });
	  }
	  
    var coptions = top_up.classNames().select(function(x) { return x.match(/^tu_/) });
    coptions.each(function(c) {
      c.sub(/^tu_/, "").split("_").each(function(coption) {
        if ($w("db ql").include(coption)) {
          var layoutRefs = {db: "dashboard", ql: "quicklook"};
          toptions.set("layout", layoutRefs[coption]);
        }
        if ($w("image html dom iframe ajax script").include(coption)) {
          toptions.set("type", coption);
        }
        if (coption.match(/[0123456789]+x[0123456789]+/)) {
          var dimensions = coption.split("x");
          toptions.set("width" , dimensions[0]);
          toptions.set("height", dimensions[1]);
        }
      });
    });
    
		if (parseInt(toptions.get("noGroup"), 10) == 1) {
		  toptions.unset("group");
    }
    
    toptions.update(opts || {});
    
	  return toptions;
	};
	var deriveOptions = function(reference, opts, store) {
	  var result = default_preset.clone();
	  
	  if (opts) {
		  if (presets.keys().include(opts.preset)) {
			  result.update(presets[opts.preset]);
			}
	    result.update(opts);
	  }
	  
		if (store) {
  		result.set("reference", reference);
      if (!result.keys().include("type")) {
        result.set("type", deriveType(reference));
      }
			options = result.clone();
		}
		
		return result;
	};
	var deriveType = function(reference) {
	  if (reference.toLowerCase().match(/\.(gif|jpg|jpeg|png)$/)) {
	    return "image";
	  }
	  if (reference.toLowerCase().match(/\.(swf)$/)) {
	    return "flash";
	  }
	  if (reference.toLowerCase().match(/\.(flv)$/)) {
	    return "flashvideo";
	  }
	  if (reference.toLowerCase().match(/\.(aif|aiff|aac|au|bmp|gsm|mov|mid|midi|mpg|mpeg|m4a|psd|qt|qtif|qif|qti|snd|tif|tiff|wav|3g2|3gp|wbmp)$/)) {
	    return "quicktime";
	  }
	  if (reference.toLowerCase().match(/\.(ra|ram|rm|rpm|rv|smi|smil)$/)) {
	    return "realplayer";
	  }
	  if (reference.toLowerCase().match(/\.(asf|avi|wma|wmv)$/)) {
	    return "windowsmedia";
	  }
	  return "ajax";
	};
  var movieContentDisplayed = function() {
    return $w("flash flashvideo quicktime realplayer windowsmedia").include(options.get("type"));
  };
	
  var prepare = function() {
    // TODO: resizable
    
    $("top_up").down(".te_title").fade({duration: reservedDuration});
		if (!(group && group.items.length > 1)) {
		  $("top_up").down(".te_controls").fade({duration: reservedDuration});
		}
		
    $$(".te_top_up").each(function(e) {
      e.down(".te_wrapper").writeAttribute("class", "te_wrapper te_" + options.get("layout"));
    });

		if (parseInt(options.get("shaded"), 10) == 1) {
			$("tu_overlay").addClassName("te_shaded");
		} else {
			$("tu_overlay").removeClassName("te_shaded");
		}
	
		if ($w("modal shaded overlayClose").any(function(o) { return parseInt(options.get(o), 10) == 1 })) {
			$("tu_overlay").show();
		} else {
			$("tu_overlay").hide();
		}
  };
  var loadContent = function() {
	  showLoader();
	  
    $("top_up").down(".te_title").update(options.get("title") || "");
	  
		switch(options.get("type")) {
		  case "image":
			  options.set("content", new Element("img", {src: options.get("reference")}));
		    if (!options.get("content").complete) {
          Event.observe(options.get("content"), "load", onContentReady);
        } else {
          onContentReady();
        }
				break;
      case "flash":
        loadFlashContent(); break;
      case "flashvideo":
        loadFlashVideoContent(); break;
      case "quicktime":
        loadQuickTimeContent(); break;
      case "realplayer":
        loadRealPlayerContent(); break;
      case "windowsmedia":
        loadWindowsMediaContent(); break;
			case "iframe":
        options.set("content", new Element("iframe", {src: options.get("reference"), frameborder: 0, border: 0}));
        onContentReady();
				break;
			case "html": case "dom":
			  options.set("content", new Element("div")[options.get("type") == "html" ? "update" : "appendChild"](options.get("reference")));
		    onContentReady();
        break;
			case "ajax": case "script":
			  options.set("content", null);
			  new Ajax.Request(options.get("reference"), {
                  			   method: (parseInt(options.get("post"), 10) == 1) ? "post" : "get",
                  			   asynchronous: false,
                  			   parameters: options.get("parameters"),
                  			   evalJS: (options.get("type") == "script"),
                  			   onSuccess: onContentReady
                  			 });
        break;
		}
  };
  var loadFlashContent = function() {
    var object = new Element("object", {width   : options.get("width"), 
                                        height  : options.get("height"),
                                        classid : "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
                                        codebase: "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
                                        style   : "display: none"});
                                        
    object.appendChild(new Element("param", {name: "src", value: options.get("reference")}));
    object.appendChild(new Element("embed", {src        : options.get("reference"), 
                                             width      : options.get("width"), 
                                             height     : options.get("height"),
                                             type       : "application/x-shockwave-flash",
                                             pluginspage: "http://get.adobe.com/flashplayer/"}));
    
    options.set("content", new Element("div", {width: options.get("width"), height: options.get("height")}));
    options.get("content").appendChild(object);
    onContentReady();
  };
  var loadFlashVideoContent = function() {
    var object = new Element("object", {width   : options.get("width"), 
                                        height  : options.get("height"),
                                        classid : "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
                                        codebase: "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
                                        style   : "display: none"});
                                        
    object.appendChild(new Element("param", {name: "movie"    , value: TopUp.host + "/flvplayer.swf"}));
    object.appendChild(new Element("param", {name: "flashvars", value: "file=" + options.get("reference") + "&autostart=true"}));
    object.appendChild(new Element("embed", {src        : TopUp.host + "/flvplayer.swf", 
                                             width      : options.get("width"), 
                                             height     : options.get("height"),
                                             flashvars  : "file=" + options.get("reference") + "&autostart=true",
                                             type       : "application/x-shockwave-flash",
                                             pluginspage: "http://get.adobe.com/flashplayer/"}));
    
    options.set("content", new Element("div", {width: options.get("width"), height: options.get("height")}));
    options.get("content").appendChild(object);
    onContentReady();
  };
  var loadQuickTimeContent = function() {
    var object = new Element("object", {width   : options.get("width"), 
                                        height  : options.get("height"),
                                        classid : "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
                                        codebase: "http://www.apple.com/qtactivex/qtplugin.cab",
                                        style   : "display: none"});
                                        
    object.appendChild(new Element("param", {name: "src"     , value: options.get("reference")}));
    object.appendChild(new Element("param", {name: "scale"   , value: "aspect"}));
    object.appendChild(new Element("param", {name: "bgcolor" , value: "black"}));
    object.appendChild(new Element("param", {name: "showlogo", value: "false"}));
    object.appendChild(new Element("param", {name: "autoplay", value: "true"}));
    object.appendChild(new Element("embed", {src        : options.get("reference"), 
                                             width      : options.get("width"), 
                                             height     : options.get("height"),
                                             scale      : "aspect", 
                                             bgcolor    : "black",
                                             showlogo   : "false", 
                                             autoplay   : "true",
                                             type       : "video/quicktime",
                                             pluginspage: "http://www.apple.com/quicktime/download/"}));
    
    options.set("content", new Element("div", {width: options.get("width"), height: options.get("height"), style: "background: black"}));
    options.get("content").appendChild(object);
    onContentReady();
  };
  var loadRealPlayerContent = function() {
    var object = new Element("object", {width  : options.get("width"), 
                                        height : options.get("height"),
                                        classid: "clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA",
                                        style  : "display: none"});
                                        
    object.appendChild(new Element("param", {name: "src"      , value: options.get("reference")}));
    object.appendChild(new Element("param", {name: "controls" , value: "imagewindow"}));
    object.appendChild(new Element("param", {name: "console"  , value: "one"}));
    object.appendChild(new Element("param", {name: "autostart", value: "true"}));
    object.appendChild(new Element("embed", {src        : options.get("reference"), 
                                             width      : options.get("width"), 
                                             height     : options.get("height"),
                                             controls   : "imagewindow",
                                             console    : "one",
                                             autostart  : "true",
                                             nojava     : "true",
                                             type       : "audio/x-pn-realaudio-plugin",
                                             pluginspage: "http://www.real.com/freeplayer/?rppr=rnwk"}));
    
    options.set("content", new Element("div", {width: options.get("width"), height: options.get("height")}));
    options.get("content").appendChild(object);
    onContentReady();
  };
  var loadWindowsMediaContent = function() {
    loadQuickTimeContent();
  };
  var onContentReady = function() {
    hideLoader();
    
    // TODO: resizable
    // 
    // if (html) {
    //   options.content = jQuery(html);
    // }
    // 
    // switch(options.get("type")) {
    //   case "image": case "iframe":
    //        options.resize = options.content;
    //        jQuery(".te_content").removeClass("te_scrollable");
    //        break;
    //      default:
    //     options.resize = jQuery("#temp_up .te_content");
    //        jQuery(".te_content").addClass("te_scrollable");
    // }
    
    if ($("top_up").visible()) {
      replace();
    } else {
		  show();
    }
  };
  
  var showLoader = function() {
    var top_up = $("top_up");
	  var origin = top_up.visible() ? top_up : $(options.get("topUp"));
	  
	  if (origin) {
	    if (origin.childElements().length > 0) {
  	    origin = $(origin.childElements()[0]);
  	  }
      var dimensions = $H(origin.getDimensions());
      var offsets    = origin.cumulativeOffset();
	  } else {
      var dimensions = $H(document.viewport.getDimensions());
      var offsets    = document.viewport.getScrollOffsets();
	  }
	  
    offsets.each(function(v, i) {
      dimensions.set($w("left top")[i], v);
    });
    
    dimensions.keys().each(function(k) { dimensions.set(k, dimensions.get(k) + "px") });
    $("tu_loader").setStyle(dimensions.toObject()).show();
	};
	var hideLoader = function() {
    $("tu_loader").hide();
  };
  
  var	show = function() {
    var afterFinish = function() {
      $("top_up").down(".te_title").appear({duration: reservedDuration});
      $("top_up").down(".te_close_link").appear({duration: reservedDuration});
		  if (options.get("group") && options.get("group").length > 1 && !$("top_up").down(".te_controls").visible()) {
		    $("top_up").down(".te_controls").appear({duration: reservedDuration});
	    }
      afterDisplay();
    };
    
    clearContent();
    setContent();
    setSizeAndPosition();
    moveContent("top_up");
    
    var effectDuration = options.get("duration") - reservedDuration;
    switch(options.get("effect")) {
      case "appear": case "fade":
        new Effect.Appear  ("top_up", {duration: effectDuration, afterFinish: afterFinish}); break;
      case "switch": case "clip":
        new Effect.SwitchOn("top_up", {duration: effectDuration, afterFinish: afterFinish}); break;
      default:
        transform(afterFinish); break;
    }
	};
	var replace = function(callback) {
	  var te_content    = $("top_up").down(".te_content").lockDimensions();
		var childElements = te_content.childElements();
		var wrapper       = new Element("div");
		
		te_content.insert({bottom: wrapper});
		childElements.each(function(child) {
		  wrapper.insert({bottom: child});
		});
		
		wrapper.fade({duration: reservedDuration, afterFinish: function() {
      moveContent("temp_up");
      wrapper.remove();
      
	    if (!callback) {
	      callback = function() {
          clearContent();
  	      setContent();
	      };
      }
      
		  callback.apply([], [$("top_up").down(".tu_content"), data]);
      setDimensions();
      $("top_up").centerWrap($("temp_up"));
	    
      te_content.morph({width : $("temp_up").down(".te_content").getWidth()  + "px",
                        height: $("temp_up").down(".te_content").getHeight() + "px"},
                       {duration: 0.4, 
                        afterFinish: function() {
                  	      moveContent("top_up");
                          $("top_up").removeCenterWrap();
                  	      afterDisplay();
                        }
      });
		}});
	};
  var hide = function(callback) {
    var afterFinish = function() {
		  $("tu_overlay").hide();
      afterHide();
      if (callback) {
			  callback.apply([], [$("top_up").down(".tu_content"), data]);
      }
    };
    
    // TODO: IE tweaks in hide()
    // 
    // jQuery("#top_up .tu_title")   .fadeOut(duration);
    //     jQuery("#top_up .tu_controls").fadeOut(duration);
    //     if (jQuery.ie) {
    //   jQuery("#top_up .tu_close_link").hide();
    //   onReady.apply();
    //     } else {
    //   jQuery("#top_up .tu_close_link").fadeOut(duration, onReady);
    // }
    
    $("top_up").down(".te_title")     .fade({duration: reservedDuration});
    $("top_up").down(".te_controls")  .fade({duration: reservedDuration});
    
		if (movieContentDisplayed()) {
      options.get("content").firstDescendant().hide();
	  }
    
    $("top_up").down(".te_close_link").fade({duration: reservedDuration, afterFinish: function() {
      var effectDuration = options.get("duration") - reservedDuration;
      switch(options.get("effect")) {
        case "appear": case "fade":
          new Effect.Fade     ("top_up", {duration: effectDuration, afterFinish: afterFinish}); break;
        case "switch": case "clip":
          new Effect.SwitchOff("top_up", {duration: effectDuration, afterFinish: afterFinish}); break;
        default:
          transform(afterFinish); break;
      }
    }});
  };
	
  var setContent = function() {
    $("temp_up").down(".te_content").appendChild(options.get("content"));
  };
	var moveContent = function(to) {
	  var from = (to == "top_up") ? "temp_up" : "top_up";
	  
	  var fromContainer = $(from).down(".te_content");
	  var toContainer   = $(to  ).down(".te_content");
    
    fromContainer.childElements().each(function(e) { toContainer.appendChild(e); });
	};
	var clearContent = function() {
    $("top_up").down(".te_content").childElements().invoke("remove");
	};
  var transform = function(callback) {
	  var topUp     = $("top_up");
	  var teContent = topUp.down(".te_content");
	  
	  if (options.get("topUp")) {
	    var topUpElement = $(options.get("topUp"));
	    var dimensions   = {top : topUpElement.cumulativeOffset().top,
	                        left: topUpElement.cumulativeOffset().left,
	                        width : topUpElement.getWidth(), 
	                        height: topUpElement.getHeight() - 4};
	  } else {
	    var dimensions = {top : parseInt(document.viewport.getDimensions().height / 2, 10) - parseInt(teContent.getHeight() / 2, 10) + document.viewport.getScrollOffsets().top, 
  	                    left: parseInt(document.viewport.getDimensions().width  / 2, 10) - parseInt(teContent.getWidth()  / 2, 10) + document.viewport.getScrollOffsets().left, 
  	                    width : 10, 
  	                    height: 10};
	  }
	  
	  if (displaying) {
      topUp.addClassName("te_transparent")
           .show();
	    if (!options.get("topUp")) {
        dimensions.top  -= parseInt(teContent.getHeight() / 2, 10);
        dimensions.left -= parseInt(teContent.getWidth()  / 2, 10);
      }
    }
	  
	  var topUpOffset     = topUp    .cumulativeOffset();
	  var teContentOffset = teContent.cumulativeOffset();
	  var teContentDiff   = {width:  topUp.getWidth()  - teContent.getWidth(), 
	                         height: topUp.getHeight() - teContent.getHeight()};
	  
    dimensions.top  -= teContentOffset.top  - topUpOffset.top;
    dimensions.left -= teContentOffset.left - topUpOffset.left;
	  
	  var origin = {top: parseInt(topUp.getStyle("top"), 10), left: parseInt(topUp.getStyle("left"), 10), width: topUp.getWidth(), height: topUp.getHeight()};
	  var opts   = {to : displaying ? origin : dimensions};
	  
	  if (displaying) {
	    opts.to.width  -= teContentDiff.width;
	    opts.to.height -= teContentDiff.height;
	  }
	  
	  var animation = function() {
	    var onReady = function() {
	                    displaying ?
                        callback.apply() :
                        topUp.fade({duration: reservedDuration, afterFinish: callback});
                      topUp.removeClassName("te_overflow");
                    };
      
      topUp                 .morph({top:   opts.to.top   + "px", left:   opts.to.left   + "px"}, {duration: reservedDuration});
      options.get("content").morph({width: opts.to.width + "px", height: opts.to.height + "px"}, {duration: reservedDuration, afterFinish: onReady});
	  };
	  
    if (displaying) {
      topUp                 .setStyle({top:   dimensions.top   + "px", left:   dimensions.left   + "px"});
      options.get("content").setStyle({width: dimensions.width + "px", height: dimensions.height + "px"});

      topUp.hide()
           .addClassName("te_overflow")
           .removeClassName("te_transparent")
           .appear({duration: reservedDuration, afterFinish: animation});
    } else {
      animation.apply();
    }
  };
  
	var setSizeAndPosition = function() {
	  setDimensions();
    setOffsets();
	};
	var setDimensions = function() {
    var viewportDimensions  = $H(document.viewport.getDimensions());
    var topUpDimensions     = $H($("top_up").getDimensions());
    var tuContentDimensions = $H($("top_up").down(".te_content").getDimensions());  
    var dimensions          = $H(options.get("content").getDimensions());

    var diffs = $w("width height").inject($H(), function(h, k) {
                  h.set(k, topUpDimensions.get(k) - tuContentDimensions.get(k));
                  return h;
                });
                
    options.each(function(o) {
      if ($w("width height").include(o.first())) {
        dimensions.set(o.first(), parseInt(o.last(), 10));
      }
    });
    
    var change = $w("width height").inject($H(), function(changed, k) {
                   var currentValue = dimensions.get(k);
                   var newValue     = deriveDimension(currentValue, viewportDimensions.get(k), diffs.get(k));
                   if (currentValue != newValue) {
                     options.get("type") == "image" ?
                       changed.set(k, {value: newValue, factor: newValue / currentValue}) :
                       dimensions.set(k, newValue);
                   }
                   return changed;
                 }).toArray().sortBy(function(c) {
                   return c.last().factor;
                 }).first();
    
    if (change) {
      var counterKey = {width: "height", height: "width"}[change.first()];
      dimensions.set(counterKey, parseInt(dimensions.get(counterKey) * change.last().factor, 10));
      dimensions.set(change.first(), change.last().value);
    }
    
    dimensions.keys().each(function(k) { dimensions.set(k, dimensions.get(k) + "px") });
	  options.get("content").setStyle(dimensions.toObject());
	};
	var deriveDimension = function(currentValue, maxValue, padding) {
	  return (currentValue + padding <= maxValue - 8 ? currentValue : maxValue - padding - 8);
	};
  var setOffsets = function(dimensions) {
    var dimensions = $H($("temp_up").getDimensions());
    
    // TODO: deriving offsets when TopUp already visible in setOffsets()
    // 
    // if ($("top_up").visible()) {
    //   
    // } else {
      var viewportDimensions = $H(document.viewport.getDimensions());
      var offsets            = document.viewport.getScrollOffsets().inject($H(), function(result, offset, index) {
                                 var key  = $w("width height")[index];
                                 result.set($w("left top")[index], offset + parseInt(viewportDimensions.get(key) / 2, 10) - parseInt(dimensions.get(key) / 2, 10));
                                 return result;
                               });
    // }
    
    if (options.get("x")) {
      offsets.set("left", options.get("x"));
    }
    if (options.get("y")) {
      offsets.set("top" , options.get("y"));
    }
    
    offsets.keys().each(function(k) { offsets.set(k, offsets.get(k) + "px") });
	  $("top_up").setStyle(offsets.toObject());
  };
  
  var afterDisplay = function() {
    // TODO: IE tweaks in afterDisplay()
    $$(".te_top_up,.te_content").invoke("unlockDimensions");
    
		if (movieContentDisplayed()) {
      options.get("content").firstDescendant().show();
	  }

    if (options.get("ondisplay")) {
      options.get("ondisplay").apply([], [$("top_up").down(".te_content"), data]);
    }
    
		displaying = false;
  };
  var afterHide = function() {
    if (options.get("onclose")) {
      options.get("onclose").apply([], [$("top_up").down(".te_content"), data]);
    }
  };
  
	var deriveGroup = function() {
		if (options.get("group")) {
		
			if (group && group.name == options.get("group")) {
				return;
			}
			group = {name: options.get("group"), items: new Array};
			
      $$(["[toptions]", presets.keys().join(",")].join(",")).each(function(e) {
        if (!e.readAttribute("tu_group")) {
          e.writeAttribute("tu_group", deriveToptions(e).get("group") || "");
        }
        if (e.readAttribute("tu_group") == group.name) {
          group.items.push(e.identify());
        }
      });
      
      index = group.items.indexOf(options.get("topUp"));
			
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

		TopUp.displayTopUp($(group.items[index]));
	};
  
	return {
		host: scriptHost,
		images_path: "images/top_up/",
		init: function() {
			if (initialized) {
				return false;
			}
			
			try {
  			document.observe("dom:loaded", function() {
          extendPrototype();
          injectCode();
          bind();
          
          // TODO: draggable
          // new Draggable("top_up", {handle: "te_title", starteffect: null, endeffect: null});
          on_ready.each(function(f) {
            f.apply();
          });
  			});
        
  			initialized = true;
      } catch(e) {}
		},
		defaultPreset: function(set) {
		  default_preset.update(set);
		},
		addPresets: function(sets) {
			presets.update(sets);
		},
		observe: function(selector, alsoRebind) {
		  observing.set("body"    , false);
		  observing.set("selector", selector);
		  if (alsoRebind) {
		    TopUp.rebind();
		  }
		},
		ready: function(func) {
      on_ready.push(func);
		},
		rebind: function() {
      // Normally not needed anymore due to use of event delegation (yay!)
      // But you might still need this when using custom observed elements (e.g. by calling TopUp.observe("#gallery"))
      
      $$(observing.get("currently")).invoke("stopObserving", "click", documentClick);
      observing.get("currently").clear();
      bind();
		},
		displayTopUp: function(top_up, opts) {
      var toptions = deriveToptions(top_up, opts);
      TopUp.display(toptions.unset("reference"), toptions);
	  },
		display: function(reference, opts) {
      if (displaying) {
        return false;
      }
      
      try {
        displaying = true;
        data = {};
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
      //       if (jQuery("#top_up").is(":hidden")) {
      //         return;
      //       }
      //       
      // options.type = "html";
      //       options.resize = jQuery("#temp_up .te_content");
      // jQuery(".te_content").addClass("te_scrollable");
      // 
      // replace(func || function() {});
		},
		previous: function() {
      navigateInGroup(-1);
		},
		next: function() {
      navigateInGroup(1);
		},
		overlayClose: function() {
      if (parseInt(options.getoverlayClose, 10) == 1) {
        TopUp.close();
      }
		},
		close: function(afterClose) {
      if ($("top_up").visible()) {
        hide(afterClose);
      }
		},
		onContentReady: onContentReady
	};
}());

TopUp.init();

}
