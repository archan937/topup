try { SeatHolder } catch(e) {

// *
// * GetAttributes (Minified)
// *
// * (c) 2009 Michael Manning (actingthemaggot.com) 
// *

if (jQuery.getAttributes === undefined)
  jQuery.getAttributes = function(F,C){var F=((typeof F==="string")?jQuery(F)[0]:F[0]),D=0,F=F.attributes,B=F.length,E=["abort","blur","change","click","dblclick","error","focus","keydown","keypress","keyup","load","mousedown","mousemove","mouseout","mouseover","mouseup","reset","resize","select","submit","unload"],A={};for(D;D<B;D++){if(C||!C&&jQuery.inArray(F[D].nodeName.replace(/^on/,""),E)==-1){A[F[D].nodeName]=F[D].nodeValue}}return A};

// *
// * SeatHolder 0.3.1 (Uncompressed)
// * The modest Javascript placeholder (used in http://gettopup.com)
// *
// * This library requires jQuery (http://jquery.com)
// *
// * (c) 2009 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, SeatHolder is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2009-03-08 21:19:11 +0100 (Sun, 08 March 2009) $
// *

SeatHolder = function() {
  var styleId = "sh_style", hintClass = "sh_hint", hideClass = "sh_hide";
  
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

	    if (seatholder == null)
	      return;

      if (seatholder.match(/^&/))
        hintedElements.push(element);
      else
        onBlur(null, element);
        
      element.focus(onFocus)
             .blur(onBlur);
	  });
	  
	  jQuery.each(hintedElements, function(i, element) {
	    element = jQuery(element);
	    var hintElement = jQuery("#" + element.attr("hint_element"));

	    if (hintElement.length == 0) {
	      hintElement = jQuery("<input/>")
	                    .attr("id", "hint_element_" + i)
	                    .attr("type", element.attr("type"))
	                    .attr("readonly", true)
	                    .attr("hinted_element", element.attr("id") || "hinted_element_" + i)
                      .addClass(hintClass)
                      .focus(onHintFocus);
	      
        jQuery.each(jQuery.getAttributes(element), function(attribute) {
          switch(attribute) {
            case "id": case "name": case "seatholder": case "disabled":
              break;
            case "class":
              hintElement.attr(attribute, element.attr(attribute).replace(hideClass, "")); break;
            default:
              hintElement.attr(attribute, element.attr(attribute));
          }          
        });
	      
	      element.attr("hint_element", hintElement.attr("id"))
	             .before(hintElement);
      }
      
      hintElement.val(element.attr("seatholder").replace(/^&/, ""));
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
    
    if (element.val() == seatholder.replace(/^&/, ""))
  		element.val("");
  	
  	var input = element.get(0);
    	
    if (input.createTextRange) {
      var oRange = input.createTextRange();
      oRange.moveStart("character", 0);
      oRange.moveEnd("character", element.val().length);
      oRange.select();
    } else if (input.setSelectionRange)
      input.setSelectionRange(0, element.val().length);
  };
  var onBlur = function(event, element) {
    if (element == null)
  	  element = jQuery(event.target);
    var seatholder = element.attr("seatholder");
    
    if (element.val().length > 0 && element.val() != seatholder.replace(/^&/, ""))
      return;
    
  	if (seatholder.match(/^&/)) {
      element.attr("disabled", true)
             .addClass(hideClass);
	    jQuery("#" + element.attr("hint_element")).removeClass(hideClass);
    } else
  		element.val(seatholder.replace(/^&/, ""));
  };
  
	return {
		selector: "input,textarea",
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
  }
}();
SeatHolder.init();

}