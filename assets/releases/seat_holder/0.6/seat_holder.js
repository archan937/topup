if (typeof(SeatHolder) == "undefined") {

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
// * SeatHolder 0.6 (Uncompressed)
// * The modest Javascript placeholder (used in http://gettopup.com)
// *
// * This library requires jQuery (http://jquery.com)
// *
// * (c) 2010 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, SeatHolder is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2010-01-12 07:16:43 +0100 (Tue, 12 January 2010) $
// *

SeatHolder = (function() {
  var hintClass = "sh_hint", hideClass = "sh_hide";
  
  var injectCode = function() {
    var style = "<style>" + 
                  "." + hintClass + " { color: " + SeatHolder.hintColor +" !important } " +
                  "." + hideClass + " { display: none !important }" +
                "</style>";

		jQuery(style).prependTo("head");
  };
  var bind = function() {
	  var hintedElements = [];
	  
	  jQuery.each(jQuery(SeatHolder.selector), function(i, element) {
	    element = jQuery(element);
	    var seatholder = element.attr("seatholder");

	    if (seatholder == null) {
	      return;
	    }

      if (seatholder.match(/^&/)) {
        onBlur(null, element);
      } else {
        hintedElements.push(element);
      }
        
      element.focus(onFocus)
             .blur(onBlur);
	  });
	  
	  jQuery.each(hintedElements, function(i, element) {
	    element = jQuery(element);
	    element.attr("id", element.attr("id") || "hinted_element_" + i);
	    
	    var hintElement = jQuery("#" + element.attr("hint_element"));

	    if (hintElement.length == 0) {
	      hintElement = jQuery("<input/>")
	                    .attr("id", "hint_element_" + i)
	                    .attr("type", element.attr("type"))
	                    .attr("readonly", true)
	                    .attr("hinted_element", element.attr("id"))
                      .focus(onHintFocus);
	      
        jQuery.each(["class", "size"], function(index, attribute) {
          switch(attribute) {
            case "class":
              hintElement.attr(attribute, element.attr(attribute).replace(hideClass, "")); break;
            default:
              hintElement.attr(attribute, element.attr(attribute));
          }          
        });
	      
        hintElement.addClass(hintClass);
	      element.attr("hint_element", hintElement.attr("id"))
	             .before(hintElement);
      }
      
      hintElement.val(element.attr("seatholder"));
      onBlur(null, element);
    });
  };
  
  var onHintFocus = function(event) {
    var hintElement = jQuery(event.target).addClass(hideClass);
    
  	jQuery(document.getElementById(hintElement.attr("hinted_element")))
          .attr("disabled", false)
          .removeClass(hideClass)
          .focus();
  };
  var onFocus = function(event) {
  	var element = jQuery(event.target);
    var seatholder = element.attr("seatholder");
    
    if (element.val() == seatholder.replace(/^&/, "")) {
  		element.val("");
  	}
  	
  	var input = element.get(0);
    	
    if (input.createTextRange) {
      var oRange = input.createTextRange();
      oRange.moveStart("character", 0);
      oRange.moveEnd("character", element.val().length);
      oRange.select();
    } else if (input.setSelectionRange) {
      input.setSelectionRange(0, element.val().length);
    }
  };
  var onBlur = function(event, element) {
    if (element == null) {
  	  element = jQuery(event.target);
  	}
    var seatholder = element.attr("seatholder");
    if ((element.val().length > 0 && element.val() != seatholder.replace(/^&/, ""))) {
      jQuery("#" + element.attr("hint_element")).addClass(hideClass);
      return;
    }
    
  	if (seatholder.match(/^&/)) {
  		element.val(seatholder.replace(/^&/, ""));
    } else {
      element.attr("disabled", true)
             .addClass(hideClass);
	    jQuery("#" + element.attr("hint_element")).removeClass(hideClass);
  	}
  };
  
	return {
	  version: "0.6",
		selector: "[seatholder]",
		hintColor: "#AAA",
		init: function() {
			jQuery(document).ready(function() {
				injectCode();
        bind();
      });
	  },
		rebind: function() {
		  bind();
	  }
  };
}());

(function () {
  var missing_libs = [];
  
  if (typeof(jQuery) == "undefined") {
    missing_libs.push("core");
  }
  
  if (missing_libs.length == 0) {
    SeatHolder.init();
  } else {
    var src = scriptElement.getAttribute("src").replace(/(development\/)?seat_holder(\-min)?\.js.*$/, "jquery/" + missing_libs.join(".") + ".js");
    document.write('<script src="' + src + '" type="text/javascript" ' + 
                           'onload="SeatHolder.init()" onreadystatechange="SeatHolder.init()">' +
                   '</script>');
  }
}());

}
