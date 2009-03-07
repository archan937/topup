try { PlaceHolderian } catch(e) {

// *
// * PlaceHolderian 0.1 (Uncompressed)
// * Always saving a seat for you (used in http://gettopup.com)
// *
// * (c) 2009 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, PlaceHolderian is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2009-03-07 13:17:04 +0100 (Sat, 07 March 2009) $
// *

PlaceHolderian = function() {
  var observeTags = function(tagName) {
    var elements = document.getElementsByTagName(tagName);
    for (var i = 0; i < elements.length; i++) {
  		var element = elements[i];
		
  		if (Element.hasAttribute(element, "placeholder")) {
  			var placeholder = Element.readAttribute(element, "placeholder");			
  			setValueOnBlur(element, placeholder);
				
  			Event.observe(element, "focus", doOnFocus);
  			Event.observe(element, "blur", doOnBlur);
  		}
  	}
  };
  
  var doOnFocus = function(event) {
  	var element = Event.element(event);
  	setValueOnFocus(element, Element.readAttribute(element, "placeholder"));
  };
  var doOnBlur = function(event) {
  	var element = Event.element(event);
  	setValueOnBlur(element, Element.readAttribute(element, "placeholder"));
  };

  var setValueOnFocus = function(element, text) {
  	element.style.color = PlaceHolderian.focusColor;

  	if (element.value == text)
  		element.value = "";
	
  	if (element.createTextRange) {
  		var oRange = element.createTextRange();
  		oRange.moveStart("character", 0);
  		oRange.moveEnd("character", element.value.length);
  		oRange.select();
  	} else if (element.setSelectionRange) {
  		element.setSelectionRange(0, element.value.length);
  	}
  };
  var setValueOnBlur = function(element, text) {
  	if (element.value.length > 0 && element.value != text)
  		element.style.color = PlaceHolderian.focusColor;
  	else {
  		element.style.color = PlaceHolderian.blurColor;
  		element.value = text;
  	}
  };

	return {
		focusColor: "black",
		blurColor: "#AAA",
		init: function() {
	    observeTags("input");
	    observeTags("textarea");
	  }
  }
}();
// PlaceHolderian.init();

}