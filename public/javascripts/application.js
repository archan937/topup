// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

TopUp.addPresets({
	"#images a": {
		fixed: 0,
		group: "images",
		layout: "quicklook",
		modal: 0,
		title: "Example"
	},
	".shaded": {
		shaded: 1
  },
	"demo": {
		resizable: 0
  }
});

TopUp.ready(function() {
  PlaceHolderian.init();
});