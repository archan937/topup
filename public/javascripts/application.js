// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

TopUp.addPresets({
  "#images a": {
    fixed: 0,
    group: "images",
    layout: "quicklook",
    modal: 0,
    title: "Examples ({current} of {total})"
  },
  ".shaded": {
    shaded: 1
  },
  "demo": {
    resizable: 0
  }
});

function selectMethod(element) {
  var li = $(element).up("li");
  li.siblings().invoke("removeClassName", "selected");
  li.addClassName("selected");
  
  var content = $(element).up(".block").down(".content");
  content.childElements().invoke("removeClassName", "selected");
  content.childElements()[li.previousSiblings().length].addClassName("selected");
}