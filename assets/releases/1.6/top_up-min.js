if(typeof(TopUp)=="undefined"){var scriptElement=(function deriveScriptElement(){var c="tu_dummy_script";document.write('<script id="'+c+'"><\/script>');var b=document.getElementById(c);var a=b.previousSibling;b.parentNode.removeChild(b);return a}());var scriptHost=(function deriveScriptHost(){var a=scriptElement.getAttribute("src");return a.match(/^\w+\:\/\//)?a.match(/^\w+\:\/\/[^\/]*\//)[0]:""}());TopUp=(function(){var l=false,g=null,c=[],x=false,u=null,q=null,C=null,P=null;var k={layout:"dashboard",effect:"transform",resizable:1},O={};var i=function(){jQuery.extend({keys:function(U){var T=[];for(var S in U){if(U.hasOwnProperty(S)){T.push(S)}}return T},ie:jQuery.browser.msie,ie6:jQuery.browser.msie&&parseInt(jQuery.browser.version,10)==6,ie7:jQuery.browser.msie&&parseInt(jQuery.browser.version,10)>=7,ff2:jQuery.browser.mozilla&&parseFloat(jQuery.browser.version)<1.9});jQuery.fn.extend({id:function(){if(!this.is("[id]")){var T="";var S=0;do{T="element_"+S++}while(jQuery("#"+T).length);jQuery(this).attr("id",T)}return jQuery(this).attr("id")},bubbleDetect:function(S,V){var T=null;var U=this;jQuery.each(S.split(V||","),function(X,Y){var W=jQuery.trim(Y);if(jQuery(W).index(U)!=-1){T={element:jQuery(U),selector:W}}});return T||(U.parent()[0]?jQuery(U.parent()[0]).bubbleDetect(S,V):null)},center:function(){var S={top:parseInt((jQuery(window).height()-this.outerHeight())/2,10)+jQuery(window).scrollTop(),left:parseInt((jQuery(window).width()-this.outerWidth())/2,10)+jQuery(window).scrollLeft(),position:"absolute"};this.css(S);return this},lockDimensions:function(){this.css({width:this.outerWidth(),height:this.outerHeight()});return this},unlockDimensions:function(){this.css({width:"auto",height:"auto"});return this},centerWrap:function(T){var V={width:this.outerWidth(),height:this.outerHeight()},X={width:0,height:0},U=0;U=T.outerWidth()-V.width;if(X.width<U){X.width=U}U=T.outerHeight()-V.height;if(X.height<U){X.height=U}var W=this.offset();var S={top:W.top-(X.height===0?0:parseInt(X.height/2,10)),left:W.left-(X.width===0?0:parseInt(X.width/2,10)),width:this.width()+X.width,height:this.height()+X.height};if(u.x){S.left=u.x-parseInt((S.width-T.outerWidth())/2,10)}if(u.y){S.top=u.y-parseInt((S.height-T.outerHeight())/2,10)}jQuery("#tu_center_wrapper").css(S);jQuery("#tu_centered_content").append(this);this.css({top:"auto",left:"auto",width:"auto",height:"auto",display:"inline-block",position:"relative"});if(jQuery.ff2){this.css({display:"table"})}if(jQuery.ie){this.css({display:"inline"})}jQuery("#tu_center_wrapper").show();return this},removeCenterWrap:function(){var S=jQuery("#tu_center_wrapper").offset();var T={width:jQuery("#tu_center_wrapper").outerWidth()-this.outerWidth(),height:jQuery("#tu_center_wrapper").outerHeight()-this.outerHeight()};this.css({top:S.top+parseInt(T.height/2,10),left:S.left+parseInt(T.width/2,10),position:"absolute"}).appendTo("body");jQuery("#tu_center_wrapper").hide();return this},draggable:function(T){var S=this;this.mousedown(function(U){if(T&&T.only&&!jQuery(U.target).is(T.only)){return}U.preventDefault();var W=S.offset();var V={top:U.pageY-W.top,left:U.pageX-W.left};jQuery("body").addClass("te_dragging");jQuery("*").bind("mousemove.draggable",function(X){S.css({top:X.pageY-V.top,left:X.pageX-V.left})})});jQuery("#top_up").mouseup(function(U){jQuery("body").removeClass("te_dragging");jQuery("*").unbind("mousemove.draggable")})}})};var w=function(){var T=TopUp.host+TopUp.images_path;var V='<style type="text/css" media="screen"> .te_overflow { overflow: hidden !important; } .te_dragging { cursor: move !important; } #tu_overlay, .te_top_up { top: 0px; left: 0px; } #tu_overlay { width: 100%; height: 100%; position: fixed; z-index: 999; } #temp_up { top: -9999px; z-index: -1; } .te_transparent { opacity: 0; } .te_shaded { opacity: .65; background: black; } .te_scrollable { overflow: auto; } .te_top_up { position: absolute; z-index: 1000; } .te_top_up a, .te_top_up a:hover { border: 0px; } .te_top_up .ui-resizable-se { position: absolute !important; background-color: transparent !important; border: 0px !important; } .te_wrapper { position: relative; } .te_title { width: 100%; color: white; font-family: "Lucida Grande", "Arial"; font-size: 11px; position: absolute; text-align: center; z-index: 1001; } .te_frame, #tu_center_wrapper { border-collapse: collapse; } .te_frame tr, .te_frame td { margin: 0px; padding: 0px; } .te_frame .te_left, .te_frame .te_middle, .te_frame .te_right { padding: 0px; } .te_controls { position: absolute; z-index: 1001; } .te_close_link, .te_previous_link, .te_next_link { cursor: pointer; } .te_close_link { position: absolute; z-index: 1002; } .te_previous_link, .te_next_link { display: block; float: left; } #tu_center_wrapper { position: absolute; z-index: 1000; } #tu_loader { width: 100%; height: 100%; position: absolute; background: url('+T+"loader.gif) no-repeat 50% 50%; z-index: 1003; } #top_up .te_dashboard .ui-resizable-se { width: 10px !important; height: 10px !important; bottom: 12px !important; right: 10px !important; background-image: url("+T+"dashboard/sprite.png) !important; background-position: 0px 0px !important; } .te_dashboard .te_title { top: -9px; font-weight: bold; } .te_dashboard .te_corner, .te_dashboard .te_rib { background-image: url("+T+"dashboard/sprite.png); } .te_dashboard .te_top, .te_dashboard .te_bottom { height: 20px; } .te_dashboard .te_left_filler { width: 20px; } .te_dashboard .te_right_filler { width: 19px; } .te_dashboard .te_middle .te_middle { background: url("+T+"dashboard/middle.png); } .te_dashboard .te_top .te_left { background-position: -17px -29px; } .te_dashboard .te_top .te_middle { background-position: 0px -71px; } .te_dashboard .te_top .te_right { background-position: -33px -29px; } .te_dashboard .te_middle .te_left { background-position: -17px -232px; } .te_dashboard .te_middle .te_right { background-position: -33px -232px; } .te_dashboard .te_bottom .te_left { background-position: -17px -47px; } .te_dashboard .te_bottom .te_middle { background-position: -17px -89px; } .te_dashboard .te_bottom .te_right { background-position: -33px -47px; } .te_dashboard .te_content { margin: -11px -12px -11px -13px; } .te_dashboard .te_controls { left: 50%; width: 63px; height: 29px; margin-left: -33px; padding-left: 5px; bottom: 35px; background-image: url("+T+"dashboard/sprite.png); background-position: 0px -178px; } .te_dashboard .te_previous_link, .te_dashboard .te_next_link { width: 31px; height: 29px; background-image: url("+T+"dashboard/sprite.png); } .te_dashboard .te_previous_link { background-position: 66px -113px; } .te_dashboard .te_next_link { background-position: 30px -113px; } .te_dashboard .te_previous_link:hover { background-position: 66px -142px; } .te_dashboard .te_next_link:hover { background-position: 30px -142px; } .te_dashboard .te_close_link { width: 28px; height: 26px; top: -1px; right: -6px; background-image: url("+T+"dashboard/sprite.png); background-position: -20px 0px; } #top_up .te_quicklook .ui-resizable-se { width: 10px !important; height: 10px !important; bottom: 12px !important; right: 9px !important; background-image: url("+T+"quicklook/sprite.png) !important; background-position: -75px -181px !important; } .te_quicklook .te_title { top: 6px; } .te_quicklook .te_corner, .te_quicklook .te_rib { background-image: url("+T+"quicklook/sprite.png); } .te_quicklook .te_top { height: 24px; } .te_quicklook .te_bottom { height: 56px; } .te_quicklook .te_left_filler, .te_quicklook .te_right_filler { width: 12px; } .te_quicklook .te_middle .te_middle { background: url("+T+"quicklook/middle.png); } .te_quicklook .te_top .te_left { background-position: 0px 0px; } .te_quicklook .te_top .te_middle { background-position: 0px -30px; } .te_quicklook .te_top .te_right { background-position: 12px 0px; } .te_quicklook .te_middle .te_left { background-position: 0px -181px; } .te_quicklook .te_middle .te_right { background-position: 12px -181px; } .te_quicklook .te_bottom .te_left { background-position: 0px -122px; } .te_quicklook .te_bottom .te_middle { background-position: 0px -61px; } .te_quicklook .te_bottom .te_right { background-position: 12px -122px; } .te_quicklook .te_content { margin: 0px -7px; } .te_quicklook .te_controls { left: 50%; width: 66px; margin-left: -33px; bottom: 18px; } .te_quicklook .te_previous_link, .te_quicklook .te_next_link { width: 31px; height: 29px; margin: 0px 1px; background-image: url("+T+"quicklook/sprite.png); } .te_quicklook .te_previous_link { background-position: 89px -195px; } .te_quicklook .te_next_link { background-position: 52px -195px; } .te_quicklook .te_previous_link:hover { background-position: 89px -226px; } .te_quicklook .te_next_link:hover { background-position: 52px -226px; } .te_quicklook .te_close_link { width: 13px; height: 13px; top: 7px; left: 9px; background-image: url("+T+"quicklook/sprite.png); background-position: -24px -181px; } </style>";var X='<style type="text/css" media="screen"> .te_dashboard .te_content { margin-bottom: -14px; } </style>';var S='<style type="text/css" media="screen"> .te_dashboard .te_content { margin-bottom: -13px; } .te_dashboard .te_controls { width: 65px; padding-left: 3px; } .te_dashboard .te_top .te_left, .te_dashboard .te_top .te_middle, .te_dashboard .te_top .te_right, .te_dashboard .te_middle .te_left, .te_dashboard .te_middle .te_right, .te_dashboard .te_bottom .te_left, .te_dashboard .te_bottom .te_middle, .te_dashboard .te_bottom .te_right, .te_dashboard .te_controls, .te_dashboard .te_previous_link, .te_dashboard .te_next_link, .te_dashboard .te_close_link { background-image: none; } .te_dashboard .te_top .te_left { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/top_left.png" , sizingMethod="crop" ); } .te_dashboard .te_top .te_middle { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/top_middle.png" , sizingMethod="scale"); } .te_dashboard .te_top .te_right { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/top_right.png" , sizingMethod="crop" ); } .te_dashboard .te_middle .te_left { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/middle_left.png" , sizingMethod="scale"); } .te_dashboard .te_middle .te_middle { filter: alpha(opacity = 75); background: black; } .te_dashboard .te_middle .te_right { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/middle_right.png" , sizingMethod="scale"); } .te_dashboard .te_bottom .te_left { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/bottom_left.png" , sizingMethod="crop" ); } .te_dashboard .te_bottom .te_middle { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/bottom_middle.png", sizingMethod="scale"); } .te_dashboard .te_bottom .te_right { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/bottom_right.png" , sizingMethod="crop" ); } .te_dashboard .te_controls { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/controls.png" , sizingMethod="crop" ); } .te_dashboard .te_previous_link { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/previous.png" , sizingMethod="crop" ); } .te_dashboard .te_next_link { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/next.png" , sizingMethod="crop" ); } .te_dashboard .te_close_link { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'dashboard/close_link.png" , sizingMethod="crop" ); } .te_quicklook .te_bottom { height: 55px; } .te_quicklook .te_controls { width: 67px; } .te_quicklook .te_top .te_left, .te_quicklook .te_top .te_middle, .te_quicklook .te_top .te_right, .te_quicklook .te_middle .te_left, .te_quicklook .te_middle .te_right, .te_quicklook .te_bottom .te_left, .te_quicklook .te_bottom .te_middle, .te_quicklook .te_bottom .te_right, .te_quicklook .te_previous_link, .te_quicklook .te_next_link, .te_quicklook .te_close_link { background-image: none; } .te_quicklook .te_top .te_left { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/top_left.png" , sizingMethod="crop" ); } .te_quicklook .te_top .te_middle { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/top_middle.png" , sizingMethod="scale"); } .te_quicklook .te_top .te_right { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/top_right.png" , sizingMethod="crop" ); } .te_quicklook .te_middle .te_left { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/middle_left.png" , sizingMethod="scale"); } .te_quicklook .te_middle .te_middle { filter: alpha(opacity = 70); background: black; } .te_quicklook .te_middle .te_right { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/middle_right.png" , sizingMethod="scale"); } .te_quicklook .te_bottom .te_left { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/bottom_left.png" , sizingMethod="crop" ); } .te_quicklook .te_bottom .te_middle { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/bottom_middle.png", sizingMethod="scale"); } .te_quicklook .te_bottom .te_right { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/bottom_right.png" , sizingMethod="crop" ); } .te_quicklook .te_previous_link { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/previous.png" , sizingMethod="crop" ); } .te_quicklook .te_next_link { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/next.png" , sizingMethod="crop" ); } .te_quicklook .te_close_link { filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+T+'quicklook/close_link.png" , sizingMethod="crop" ); } </style>';var W='<style type="text/css" media="screen"> #tu_overlay { top: expression((ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"); left: expression((ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"); position: absolute; } .te_transparent { filter: alpha(opacity = 0); } .te_shaded { filter: alpha(opacity = 65); } .te_content { position: relative; zoom: 1; } </style>';var U='<div id="tu_overlay" onclick="TopUp.overlayClose()" style="display: none"></div><div id="top_up" class="te_top_up" style="display: none"><div class="te_wrapper"><div class="te_title"></div><table class="te_frame"><tr class="te_top"><td class="te_left te_corner"><div class="te_left_filler"></div></td><td class="te_middle te_rib"></td><td class="te_right te_corner"><div class="te_right_filler"></div></td></tr><tr class="te_middle"><td class="te_left te_rib"></td><td class="te_middle"><div class="te_content"><!-- Content --></div></td><td class="te_right te_rib"></td></tr><tr class="te_bottom"><td class="te_left te_corner"></td><td class="te_middle te_rib"></td><td class="te_right te_corner"></td></tr></table><div class="te_controls" style="display: none"><a class="te_previous_link" onclick="TopUp.previous()"></a><a class="te_next_link" onclick="TopUp.next()"></a></div><a class="te_close_link" onclick="TopUp.close()" style="display: none"></a></div></div><div id="temp_up" class="te_top_up te_transparent"><div class="te_wrapper"><div class="te_title"></div><table class="te_frame"><tr class="te_top"><td class="te_left te_corner"><div class="te_left_filler"></div></td><td class="te_middle te_rib"></td><td class="te_right te_corner"><div class="te_right_filler"></div></td></tr><tr class="te_middle"><td class="te_left te_rib"></td><td class="te_middle"><div class="te_content"><!-- Content --></div></td><td class="te_right te_rib"></td></tr><tr class="te_bottom"><td class="te_left te_corner"></td><td class="te_middle te_rib"></td><td class="te_right te_corner"></td></tr></table><div class="te_controls" style="display: none"><a class="te_previous_link" onclick="TopUp.previous()"></a><a class="te_next_link" onclick="TopUp.next()"></a></div><a class="te_close_link" onclick="TopUp.close()" style="display: none"></a></div></div><table id="tu_center_wrapper" style="display: none"><tr valign="middle"><td id="tu_centered_content" align="center"><!-- Top ups --></td></tr></table><div id="tu_loader" style="display: none"></div>';if(!jQuery("head").length){jQuery(document.body).before("<head></head>")}jQuery(V).prependTo("head");if(jQuery.ie7){jQuery(X).insertAfter("head > style:first")}if(jQuery.ie6){jQuery(S).insertAfter("head > style:first")}if(jQuery.ie){jQuery(W).insertAfter("head > style:first")}jQuery(U).appendTo("body")};var f=function(){var S=["[class*=x]"];jQuery.each(["db","ql","image","html","dom","iframe","ajax","script"],function(T,U){S.push("[class*=_"+U+"]")});g=jQuery.merge([".top_up","[toptions]","[class^=tu_]:"+S.join(",")],jQuery.keys(O)).join();jQuery(g).bind("click",B);jQuery(document).bind("keypress",o)};var b=function(S){return jQuery.ie7?1:S};var B=function(S){TopUp.displayTopUp(jQuery(S.target));return false};var o=function(S){if(jQuery("#top_up").is(":hidden")){return}switch(S.keyCode){case 27:TopUp.close();break;case 37:TopUp.previous();break;case 39:TopUp.next();break}};var r=function(T,U){var S=jQuery.extend({},{topUp:"#"+T.element.id(),preset:T.selector});jQuery.each(T.element.attr("class").split(/\s/),function(V,W){if(W.match(/^tu_/)){jQuery.each(W.replace(/^tu_/,"").split("_"),function(X,Y){switch(Y){case"db":case"ql":S.layout={db:"dashboard",ql:"quicklook"}[Y];break;case"image":case"html":case"dom":case"iframe":case"ajax":case"script":S.type=Y;break;default:if(Y.match(/\dx\d/)){S.width=Y.split("x")[0];S.height=Y.split("x")[1]}}})}});if(T.element.is("[toptions]")){jQuery.each(T.element.attr("toptions").split(","),function(W,X){var V=X.split("=");S[jQuery.trim(V[0])]=jQuery.trim(V[1])})}if(S.noGroup&&parseInt(S.noGroup,10)==1){S.group=null}if(U){S=jQuery.extend(S,U)}return S};var E=function(T,V,U){var S=jQuery.extend({},k);if(V){if(O[V.preset]){S=jQuery.extend(S,O[V.preset])}S=jQuery.extend(S,V)}if(U){S.reference=S.reference?jQuery(S.reference):T;if(!S.type){S.type=d(T)}if(j(S)){S.resizable=0}u=jQuery.extend({},S)}return S};var d=function(S){if(S.toLowerCase().match(/\.(gif|jpg|jpeg|png)$/)){return"image"}if(S.toLowerCase().match(/\.(swf)$/)){return"flash"}if(S.toLowerCase().match(/\.(flv)$/)){return"flashvideo"}if(S.toLowerCase().match(/\.(aif|aiff|aac|au|bmp|gsm|mov|mid|midi|mpg|mpeg|m4a|m4v|mp4|psd|qt|qtif|qif|qti|snd|tif|tiff|wav|3g2|3gp|wbmp)$/)){return"quicktime"}if(S.toLowerCase().match(/\.(ra|ram|rm|rpm|rv|smi|smil)$/)){return"realplayer"}if(S.toLowerCase().match(/\.(asf|avi|wma|wmv)$/)){return"windowsmedia"}return"ajax"};var j=function(S){return jQuery.inArray((S||u).type,["flash","flashvideo","quicktime","realplayer","windowsmedia"])!=-1};var a=function(){if(u.group){if(q&&q.name==u.group){return}q={name:u.group,items:jQuery([])};jQuery.each(jQuery(g),function(T,U){if(!jQuery(U).is("[tu_group]")){jQuery(U).attr("tu_group",E(null,r(jQuery(U).bubbleDetect(g))).group)}if(jQuery(U).attr("tu_group")==q.name){q.items=q.items.add(U)}});var S=jQuery.map(q.items,function(U,T){return"#"+jQuery(U).id()});C=u.topUp?jQuery.inArray(u.topUp,S):-1}else{q=null}};var L=function(S){if(q===null){return}C=C+S;if(C<0){C=q.items.length-1}if(C>q.items.length-1){C=0}TopUp.displayTopUp(q.items[C])};var Q=function(){jQuery("#top_up .te_frame").resizable("destroy");jQuery("#top_up .te_title").fadeOut(b(200));if(!(q&&q.items.length>1)){jQuery("#top_up .te_controls").fadeOut(b(200))}jQuery(".te_wrapper").attr("class","te_wrapper te_"+u.layout);jQuery(".te_frame,.te_content").unlockDimensions();if(parseInt(u.shaded,10)==1){jQuery("#tu_overlay").addClass("te_shaded")}else{jQuery("#tu_overlay").removeClass("te_shaded")}if((parseInt(u.modal,10)==1)||(parseInt(u.shaded,10)==1)||(parseInt(u.overlayClose,10)==1)){jQuery("#tu_overlay").show()}else{jQuery("#tu_overlay").hide()}};var z=function(){e();switch(u.type){case"image":u.content=new Image();jQuery(u.content).load(function(){u.content=jQuery(this);K()}).attr("src",u.reference);break;case"flash":I();break;case"flashvideo":H();break;case"quicktime":p();break;case"realplayer":y();break;case"windowsmedia":t();break;case"iframe":u.content=jQuery('<iframe src="'+u.reference+'" frameborder="0" border="0"></iframe>');break;case"html":case"dom":u.content=jQuery(u.reference);break;case"ajax":case"script":u.content=null;jQuery.ajax({url:u.reference,type:(parseInt(u.post,10)==1)?"POST":"GET",cache:false,async:false,data:u.parameters,dataType:(u.type=="ajax")?"html":"script",success:K})}if(jQuery.inArray(u.type,["html","dom","iframe"])!=-1){K()}};var I=function(){var S=jQuery("<object></object>").attr({width:u.width,height:u.height,classid:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",codebase:"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",style:"display: none"});S.append(jQuery("<param></param>").attr({name:"src",value:u.reference}));S.append(jQuery("<embed></embed>").attr({src:u.reference,width:u.width,height:u.height,type:"application/x-shockwave-flash",pluginspage:"http://get.adobe.com/flashplayer/"}));u.content=jQuery("<div></div>").attr({width:u.width,height:u.height});u.content.append(S);K()};var H=function(){var S=jQuery("<object></object>").attr({width:u.width,height:u.height,classid:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",codebase:"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",style:"display: none"});S.append(jQuery("<param></param>").attr({name:"movie",value:TopUp.host+"/players/flvplayer.swf"}));S.append(jQuery("<param></param>").attr({name:"flashvars",value:"file="+u.reference+"&autostart=true"}));S.append(jQuery("<embed></embed>").attr({src:TopUp.host+"/players/flvplayer.swf",width:u.width,height:u.height,flashvars:"file="+u.reference+"&autostart=true",type:"application/x-shockwave-flash",pluginspage:"http://get.adobe.com/flashplayer/"}));u.content=jQuery("<div></div>").attr({width:u.width,height:u.height});u.content.append(S);K()};var p=function(){var S=jQuery("<object></object>").attr({width:u.width,height:u.height,classid:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",codebase:"http://www.apple.com/qtactivex/qtplugin.cab",style:"display: none"});S.append(jQuery("<param></param>").attr({name:"src",value:u.reference}));S.append(jQuery("<param></param>").attr({name:"scale",value:"aspect"}));S.append(jQuery("<param></param>").attr({name:"bgcolor",value:"black"}));S.append(jQuery("<param></param>").attr({name:"showlogo",value:"false"}));S.append(jQuery("<param></param>").attr({name:"autoplay",value:"true"}));S.append(jQuery("<embed></embed>").attr({src:u.reference,width:u.width,height:u.height,scale:"aspect",bgcolor:"black",showlogo:"false",autoplay:"true",type:"video/quicktime",pluginspage:"http://www.apple.com/quicktime/download/"}));u.content=jQuery("<div></div>").attr({width:u.width,height:u.height,style:"background: black"});u.content.append(S);K()};var y=function(){var S=jQuery("<object></object>").attr({width:u.width,height:u.height,classid:"clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA",style:"display: none"});S.append(jQuery("<param></param>").attr({name:"src",value:u.reference}));S.append(jQuery("<param></param>").attr({name:"controls",value:"imagewindow"}));S.append(jQuery("<param></param>").attr({name:"console",value:"one"}));S.append(jQuery("<param></param>").attr({name:"autostart",value:"true"}));S.append(jQuery("<embed></embed>").attr({src:u.reference,width:u.width,height:u.height,controls:"imagewindow",console:"one",autostart:"true",nojava:"true",type:"audio/x-pn-realaudio-plugin",pluginspage:"http://www.real.com/freeplayer/?rppr=rnwk"}));u.content=jQuery("<div></div>").attr({width:u.width,height:u.height});u.content.append(S);K()};var t=function(){p()};var K=function(S){n();if(S){u.content=jQuery(S)}switch(u.type){case"image":case"iframe":u.resize=u.content;jQuery(".te_content").removeClass("te_scrollable");break;default:u.resize=jQuery("#temp_up .te_content");jQuery(".te_content").addClass("te_scrollable")}if(jQuery("#top_up").is(":hidden")){F()}else{v()}};var e=function(){var S=jQuery("#top_up");if(jQuery("#top_up").is(":hidden")){S=jQuery(u.topUp);if(!S.length){S=jQuery(document)}else{if(S.children().length>0){S=jQuery(S.children()[0])}}}try{var T={top:S.offset().top,left:S.offset().left,width:S.outerWidth(),height:S.outerHeight()}}catch(U){var T={top:jQuery(window).scrollTop(),left:jQuery(window).scrollLeft(),width:parseInt(jQuery(window).width()/2),height:parseInt(jQuery(window).height()/2)}}jQuery("#tu_loader").css(T).show()};var n=function(){jQuery("#tu_loader").hide()};var F=function(){h();G();R("top_up");jQuery("#top_up").center();if(u.x){jQuery("#top_up").css({left:u.x})}if(u.y){jQuery("#top_up").css({top:u.y})}switch(u.effect){case"appear":case"fade":jQuery("#top_up").fadeIn(b(300),m);break;case"switch":case"clip":jQuery("#top_up").show("clip",{direction:"vertical"},500,m);break;default:var T=jQuery(u.topUp);if(T.children().length>0){T=jQuery(T.children()[0])}var S=jQuery("#top_up").find(".te_content");var U=u.topUp?jQuery.extend({width:T.outerWidth(),height:T.outerHeight()},T.offset()):{top:parseInt(jQuery(window).height()/2)-parseInt(S.height()/2)+jQuery(window).scrollTop(),left:parseInt(jQuery(window).width()/2)-parseInt(S.width()/2)+jQuery(window).scrollLeft(),width:10,height:10};A("from",U,m)}};var v=function(T){var S=jQuery("#top_up .te_content").lockDimensions().wrapInner("<div></div>").children();S.fadeOut(b(250),function(){R("temp_up");S.remove();if(T){T.apply([],[jQuery("#top_up .te_content").id()])}else{M();h()}G();jQuery("#top_up").centerWrap(jQuery("#temp_up"));var U={width:jQuery("#temp_up .te_content").outerWidth(),height:jQuery("#temp_up .te_content").outerHeight()};jQuery("#top_up .te_content").animate(U,400,function(){R("top_up");jQuery("#top_up").removeCenterWrap();m()})})};var h=function(){u.content.appendTo("#temp_up .te_content")};var R=function(T){var S=T=="top_up"?"temp_up":"top_up";jQuery("#"+S+" .te_content").children().appendTo("#"+T+" .te_content");if(T=="top_up"){jQuery("#top_up .te_content").css({width:jQuery("#temp_up .te_content").css("width"),height:jQuery("#temp_up .te_content").css("height")})}};var M=function(){jQuery(".te_content").children().remove()};var A=function(Z,T,ac){var ab=jQuery("#top_up");var X=ab.find(".te_content");if(Z=="from"){ab.addClass("te_transparent").show()}var Y=ab.offset();var U=X.offset();var V={width:ab.width()-X.width(),height:ab.height()-X.height()};T.top-=U.top-Y.top;T.left-=U.left-Y.left;var aa={top:ab.css("top"),left:ab.css("left"),width:ab.outerWidth(),height:ab.outerHeight()};var S={to:Z=="from"?aa:T,duration:500};if(Z=="from"){S.to.width-=V.width;S.to.height-=V.height}var W=function(){var ad=Z=="to"?function(){ab.fadeOut(b(250),ac).removeClass("te_overflow")}:function(){ac.apply();ab.removeClass("te_overflow")};ab.animate({top:S.to.top,left:S.to.left},S.duration);u.content.animate({width:S.to.width,height:S.to.height},S.duration,ad)};if(Z=="from"){ab.css({top:T.top,left:T.left});u.content.css({width:T.width,height:T.height});jQuery(".te_top_up,.te_content").unlockDimensions();ab.hide().addClass("te_overflow").removeClass("te_transparent").fadeIn(b(300),W)}else{W.apply()}};var m=function(){var T=b(500);if(parseInt(u.resizable,10)==1){var S={stop:function(){jQuery("#top_up .te_frame").css({width:"auto",height:"auto"})},handles:"se",minWidth:200,minHeight:75,alsoResize:"#"+u.resize.id(),aspectRatio:u.type=="image"};jQuery("#top_up .te_frame").resizable(S)}if(jQuery.ie6){jQuery("#top_up .te_title").css("width",jQuery("#top_up").width())}jQuery("#top_up .te_title").html(u.title||"").fadeIn(T);if(q&&q.items.length>1&&jQuery("#top_up .te_controls").is(":hidden")){if(jQuery.ie6){jQuery("#top_up .te_controls").show()}else{jQuery("#top_up .te_controls").fadeIn(T)}}if(jQuery("#top_up .te_close_link").is(":hidden")){if(jQuery.ie6){jQuery("#top_up .te_close_link").show()}else{jQuery("#top_up .te_close_link").fadeIn(T)}}N();jQuery(".te_top_up,.te_content").unlockDimensions();if(j()){u.content.find("object").show()}if(u.ondisplay){u.ondisplay.apply(this,[jQuery("#top_up .te_content"),P])}x=false};var G=function(T){var S=T?null:s;if(!T){u.resize.unlockDimensions();if(jQuery.inArray(u.type,["image","iframe"])!=-1){jQuery("#temp_up .te_content").unlockDimensions()}T={};if(u.width){T.width=parseInt(u.width,10)}if(u.height){T.height=parseInt(u.height,10)}if(jQuery.ie6){jQuery("#top_up .te_title").css("width",jQuery("#temp_up").outerWidth())}}u.resize.css(T);if(S){S.apply()}};var s=function(){if(jQuery("#temp_up").outerHeight()<=jQuery(window).height()-4){return}var S=jQuery("#temp_up").outerHeight()-jQuery("#temp_up .te_content").height(),T={height:jQuery(window).height()-4-S};if(u.type=="image"){T.width=parseInt(u.content.width()*(T.height/u.content.height()),10)}G(T)};var N=function(){var U=jQuery("#top_up").offset();var T={width:jQuery("#top_up").outerWidth(),height:jQuery("#top_up").outerHeight()};var S={};if(U.top-jQuery(window).scrollTop()<2){S.top=jQuery(window).scrollTop()+2}else{if(U.top+T.height-jQuery(window).scrollTop()>jQuery(window).height()-2){S.top=jQuery(window).scrollTop()+jQuery(window).height()-T.height-2}}if(U.left-jQuery(window).scrollLeft()<2){S.left=jQuery(window).scrollLeft()+2}else{if(U.left+T.width-jQuery(window).scrollLeft()>jQuery(window).width()-2){S.left=jQuery(window).scrollLeft()+jQuery(window).width()-T.width-24}}if(jQuery.keys(S).length>0){jQuery("#top_up").animate(S,300)}};var J=function(U){var T=b(250);var S=function(){D(U)};jQuery("#top_up .te_title").fadeOut(T);jQuery("#top_up .te_controls").fadeOut(T);if(j()){u.content.find("object").hide()}if(jQuery.ie){jQuery("#top_up .te_close_link").hide();S.apply()}else{jQuery("#top_up .te_close_link").fadeOut(T,S)}};var D=function(W){var V=function(){if(W){W.apply(this,[jQuery("#top_up .te_content"),P])}if(u.onclose){u.onclose.apply(this,[jQuery("#top_up .te_content"),P])}M();R("temp_up")};switch(u.effect){case"appear":case"fade":jQuery("#top_up").fadeOut(b(300),V);break;case"switch":case"clip":jQuery("#top_up").hide("clip",{direction:"vertical"},400,V);break;default:var T=jQuery(u.topUp);if(T.children().length>0){T=jQuery(T.children()[0])}var S=jQuery("#top_up").find(".te_content");var U=u.topUp?jQuery.extend({width:T.outerWidth(),height:T.outerHeight()},T.offset()):{top:parseInt(jQuery(window).height()/2)+jQuery(window).scrollTop(),left:parseInt(jQuery(window).width()/2)+jQuery(window).scrollLeft(),width:10,height:10};A("to",U,V)}jQuery("#tu_overlay").hide()};return{host:scriptHost,images_path:"images/top_up/",data:P,init:function(){if(l){return false}try{jQuery(document).ready(function(){i();w();f();jQuery("#top_up").draggable({only:".te_title,.te_top *,.te_bottom *"});jQuery.each(c,function(T,U){U.apply()})});jQuery(window).unload(function(){jQuery("*").unbind();jQuery("#top_up .te_frame").resizable("destroy")});l=true}catch(S){}},defaultPreset:function(S){k=jQuery.extend(k,S)},addPresets:function(S){O=jQuery.extend(O,S)},ready:function(S){c.push(S)},rebind:function(){f()},displayTopUp:function(T,V){var U=jQuery(T).bubbleDetect(g);var S=r(U,jQuery.extend(V||{},{trigger:"#"+jQuery(T).id()}));TopUp.display(U.element.attr("href"),S)},display:function(S,T){if(x){return false}try{x=true;P={};E(S,T,true);a();Q();z()}catch(U){x=false;alert("Sorry, but the following error occured:\n\n"+U)}},update:function(S){if(jQuery("#top_up").is(":hidden")){return}u.type="html";u.resize=jQuery("#temp_up .te_content");jQuery(".te_content").addClass("te_scrollable");v(S||function(){})},previous:function(){L(-1)},next:function(){L(1)},overlayClose:function(){if(parseInt(u.overlayClose,10)==1){TopUp.close()}},close:function(S){if(jQuery("#top_up").is(":visible")){J(S)}}}}());(function(){if(typeof(jQuery)=="undefined"){var a=scriptElement.getAttribute("src").replace(/top_up(\-min)?\.js.*$/,"jquery.js");document.write('<script src="'+a+'" type="text/javascript" onload="TopUp.init()" onreadystatechange="TopUp.init()"><\/script>')}else{TopUp.init()}}())};