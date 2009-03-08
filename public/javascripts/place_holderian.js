try { PlaceHolderian } catch(e) {

// *
// * PlaceHolderian 0.2 (Uncompressed)
// * Always saving a seat for you (used in http://gettopup.com)
// *
// * (c) 2009 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, PlaceHolderian is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2009-03-07 20:13:49 +0100 (Sat, 07 March 2009) $
// *

PlaceHolderian = function() {
  var styleId = "ph_style", hintClass = "ph_hint";
  
  var bind = function() {
	  if (!addStyleElement())
	    return;
	  
    for (var i = 0; i < PlaceHolderian.observedTags.length; i++) {
      var elements = document.getElementsByTagName(PlaceHolderian.observedTags[i]);
      for (var j = 0; j < elements.length; j++) {
    		var element = elements[j];
		    var placeholder = element.getAttribute("placeholder");
		    
    		if (placeholder != null) {
          // if (placeholder.match(/^&/))
          //   element.setAttribute("ph_name", element.getAttribute("name"));
    		  
    			setValueOnBlur(element, placeholder);
				
          // TODO: make this Prototype independent
    			Event.observe(element, "focus", doOnFocus);
    			Event.observe(element, "blur", doOnBlur);
    		}
    	}
  	}
  };
  var addStyleElement = function() {
    var head = document.getElementsByTagName("head")[0];
    
    if (head == null)
      alert("Please add the HEAD element in your page!");
    else {
      var style = document.getElementById(styleId);
    
      if (style == null) {  
        style = document.createElement("style");
        style.id = styleId;
        head.appendChild(style);
      }
      
      style.innerHTML = "." + hintClass + " { color: " + PlaceHolderian.hintColor +" !important }";
    }
  	
  	return head != null;
  };
  
  var doOnFocus = function(event) {
    // TODO: make this Prototype independent
  	var element = Event.element(event);
  	
  	setValueOnFocus(element, element.getAttribute("placeholder"));
  };
  var doOnBlur = function(event) {
    // TODO: make this Prototype independent
  	var element = Event.element(event);
  	
  	setValueOnBlur(element, element.getAttribute("placeholder"));
  };

  var setValueOnFocus = function(element, placeholder) {
    removeHintClass(element);
  	if (element.value == placeholder.replace(/^&/, ""))
  		element.value = "";
  	
	  if (placeholder.match(/^&/))
      // TODO: The name attribute doesn't change doing this, but leave it for now.
      // element.setAttribute("name", element.getAttribute("ph_name"));
	  
  	if (element.createTextRange) {
  		var oRange = element.createTextRange();
  		oRange.moveStart("character", 0);
  		oRange.moveEnd("character", element.value.length);
  		oRange.select();
  	} else if (element.setSelectionRange)
  		element.setSelectionRange(0, element.value.length);
  };
  var setValueOnBlur = function(element, placeholder) {
  	if (element.value.length > 0 && element.value != placeholder.replace(/^&/, ""))
  		removeHintClass(element);
  	else {
  	  if (placeholder.match(/^&/)) {
  		  addHintClass(element);
        // TODO: The name attribute doesn't change doing this, but leave it for now.
        // element.setAttribute("name", "ph_dummy[]");
  		}
  		element.value = placeholder.replace(/^&/, "");
  	}
  };
  
  var addHintClass = function(element) {
    // TODO: make this Prototype independent
    element.addClassName(hintClass);
  };
  var removeHintClass = function(element) {
    // TODO: make this Prototype independent
    element.removeClassName(hintClass);
  };

	return {
		observedTags: ["input", "textarea"],
		hintColor: "#AAA",
		init: function() {
      bind();
	  },
		rebind: function() {
		  bind();
	  }
  }
}();
// PlaceHolderian.init();

}