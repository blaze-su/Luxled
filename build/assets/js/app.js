$(document).ready(function(){catalogFilterCollWidth(),iosSetting(),catalogFilters(),headerMenuItemHover(),catalogCheckBox(),catalogAccordion(),catalogSorting(),productMoreTableRowColor(),catalogTableHeadHeight(),catalogOptionsTab(2),orderForm(),footerMenu(),$("img").on("mousedown",function(t){t.preventDefault()}),hScroll($(".header__catalogItem"),$(".header__catalog")),hScroll($(".portfolio__item"),$(".portfolio__itemBox")),mediaCenter(5,$(".whyWe__belief"),$(".whyWe__beliefs"),$(".totalWidth")),$(window).outerWidth()<=926?mediaCenter(3,$(".catalog__item"),$(".catalog__items--laptop"),$(".catalog__mainSection")):$(".catalog__items--laptop").css("max-width","100%"),mediaCenter(4,$(".catalog__item"),$(".catalog__mainSection--full > .catalog__items--laptop"),$(".catalog__mainSection--full")),$(window).outerWidth()<=1023&&mediaCenter(8,$(".footer__paymentLink"),$(".footer__paymentLinks"));new Swiper(".swiper2",{pagination:".swiper-pagination",paginationClickable:!0,paginationElement:"li"});catalogFilterBox()}),$(window).resize(function(){mediaCenter(5,$(".whyWe__belief"),$(".whyWe__beliefs"),$(".totalWidth")),$(window).outerWidth()<=926?mediaCenter(3,$(".catalog__item"),$(".catalog__items--laptop"),$(".catalog__mainSection")):$(".catalog__items--laptop").css("max-width","100%"),mediaCenter(4,$(".catalog__item"),$(".catalog__mainSection--full > .catalog__items--laptop"),$(".catalog__mainSection--full")),$(window).outerWidth()<=1023&&mediaCenter(8,$(".footer__paymentLink"),$(".footer__paymentLinks")),productMoreTableRowColor(),catalogTableHeadHeight(),iosSetting(),catalogFilterCollWidth(!0)});var catalogTableHeadHeight=function(){for(var t=$(".catalog__itemTableHead"),o=t.eq(0).height(),e=0;e<t.length;e++)o<t.eq(e).height()&&(o=t.eq(e).height());for(e=0;e<t.length;e++)t.eq(e).height(o)},catalogFilterBox=function(){$(".catalog__optionsItem").on("click",function(){if(!$(this).hasClass("catalog__optionsItem--slider")){var t=$(this).offset().top-$(".catalog__optionItems").offset().top;$(".catalog__optionFindProductBox").addClass("catalog__optionFindProductBox--active").css("top",t)}}),$(".catalog__optionsTitleBox").on("click",function(){$(this).children(".accordionIcon").hasClass("accordionIcon--active")||$(".catalog__optionFindProductBox").removeClass("catalog__optionFindProductBox--active")})},catalogOptionRange=function(t,o,e,a,i){var n=o,s=e,l=$("."+t),c=l.prev().find(".catalog__optionsMinVal"),r=l.prev().find(".catalog__optionsMaxVal"),_=function(){c.keydown(function(){$(this).keyup(function(){parseInt($(this).val())>parseInt(r.val())?l.slider("option","values",[r.val(),r.val()]):l.slider("option","values",[$(this).val(),r.val()])}),$(this).blur(function(){parseInt(c.val())>parseInt(r.val())&&(l.slider("option","values",[r.val(),r.val()]),c.val(r.val())),""==c.val()&&c.val(o)})})},d=function(){r.keydown(function(){$(this).keyup(function(){parseInt(c.val())>parseInt($(this).val())?l.slider("option","values",[c.val(),c.val()]):l.slider("option","values",[c.val(),$(this).val()])}),$(this).blur(function(){parseInt(r.val())<parseInt(c.val())&&(l.slider("option","values",[c.val(),c.val()]),r.val(c.val())),""==r.val()&&r.val(e)})})};a&&i?(c.val(a),r.val(i),l.slider({range:!0,min:n,max:s,values:[a,i],stop:function(t,o){c.val(l.slider("values",0)),r.val(l.slider("values",1))},slide:function(t,o){c.val(l.slider("values",0)),r.val(l.slider("values",1))}}),_(),d()):(c.val(n),r.val(s),l.slider({range:!0,min:n,max:s,values:[n,s],stop:function(t,o){c.val(l.slider("values",0)),r.val(l.slider("values",1))},slide:function(t,o){c.val(l.slider("values",0)),r.val(l.slider("values",1))}}),_(),d())},mediaCenter=function(t,o,e,a){var i;if(o.length<t)for(n=1;n<=o.length+1;n++){if(i=a?a.width():e.width(),n==o.length+1){1==n?e.css("max-width",o.outerWidth(!0)*n):e.css("max-width",o.outerWidth(!0)*(n-1));break}if(i<o.outerWidth(!0)*n){1==n?e.css("max-width",o.outerWidth(!0)*n):e.css("max-width",o.outerWidth(!0)*(n-1));break}}else for(var n=1;n<=t+1;n++)if((i=a?a.width():e.width())<o.outerWidth(!0)*n){1==n?e.css("max-width",o.outerWidth(!0)*n):e.css("max-width",o.outerWidth(!0)*(n-1));break}},hScroll=function(t,o){t.on("mousedown",function(e){e.preventDefault();var a=e.pageX-$(this).offset().left;$(this).on("mousemove",function(t){$(this).on("click",function(t){t.preventDefault()});var e=t.pageX-$(this).offset().left;if(e<a){i=o.scrollLeft()+(a-e);o.scrollLeft(i)}if(e>a){var i=o.scrollLeft()-(e-a);o.scrollLeft(i)}}),o.on("mouseup",function(){t.unbind("mousemove"),setTimeout(function(){t.unbind("click")},1)}),o.on("mouseleave",function(){t.unbind("mousemove")})})},productMoreTableRowColor=function(){var t=$(".productMore__characteristicsTableRow"),o=$(".productMore__characteristicsTableColl");if($(window).outerWidth()>=1144||$(window).outerWidth()>=600&&$(window).outerWidth()<=1023){o.css("background-color","transparent");for(e=0;e<t.length;e++)e%2==0?t.eq(e).css("background-color","#f4f4f4"):t.eq(e).css("background-color","#ffffff")}else{t.css("background-color","transparent");for(var e=0;e<t.length;e++)0===e?t.eq(e).find(".productMore__characteristicsTableColl").css("background-color","#ffffff"):(t.eq(e).find(".productMore__characteristicsTableColl").eq(0).css("background-color","#f4f4f4"),t.eq(e).find(".productMore__characteristicsTableColl").eq(1).css("background-color","#ffffff"))}},catalogOptionsTab=function(t){var t=t-1,o=$(".catalog__optionsItemModelsBox"),e=$(".catalog__optionsItemModelLink");e.on("click",function(t){t.preventDefault(),$(".catalog__optionsItemModelLink--active").removeClass("catalog__optionsItemModelLink--active"),$(this).addClass("catalog__optionsItemModelLink--active");var e=$(this).attr("href");o.each(function(t){o.eq(t).attr("id")===e&&(o.css("display","none"),$(this).css("display","flex"))})}),o.eq(t).css("display","flex");var a=o.eq(t).attr("id");e.each(function(t){e.eq(t).attr("href")===a&&($(".catalog__optionsItemModelLink--active").removeClass("catalog__optionsItemModelLink--active"),$(this).addClass("catalog__optionsItemModelLink--active"))})},catalogCheckBox=function(){$(".catalog__optionsItem").on("click",function(){1==$(this).find("input").prop("checked")?$(this).addClass("catalog__optionsItem--checked"):$(this).removeClass("catalog__optionsItem--checked")})},catalogAccordion=function(){$(".catalog__optionsTitleBox").on("click",function(){$(this).find(".accordionIcon").toggleClass("accordionIcon--active"),$(this).next(".catalog__optionsItemList").toggleClass("catalog__optionsItemList--active")})},catalogSorting=function(){$(".catalog__sortingTitleBox").on("click",function(){$(this).find(".accordionIcon").toggleClass("accordionIcon--active"),$(this).next().toggleClass("catalog__sortingList--active"),$(".catalog__sortingItem").on("click",function(){$(".catalog__sortingTitleBox").find(".accordionIcon").removeClass("accordionIcon--active"),$(".catalog__sortingList--active").removeClass("catalog__sortingList--active")})}),$(".catalog__sortingList").hasClass("catalog__sortingList")&&$(".catalog__sortingList").on("mouseleave",function(){$(".catalog__sortingTitleBox").find(".accordionIcon").removeClass("accordionIcon--active"),$(".catalog__sortingList--active").removeClass("catalog__sortingList--active")})},orderForm=function(){$(".orders__form").find('input[name="phone"]').mask("+7(999) 999-99-99");var t=$(".orders__form");"block"===$(".orders__formErrorTitle").css("display")&&t.css("margin-top","55px");$(".orders__formItem--require > input")},headerMenuItemHover=function(){var t,o=$(".header__menuList"),e=($(".header__menuList--active"),function(){o.removeClass("header__menuList--full header__menuList--active")});$(".header__catalogBtn").on("click",function(){"none"===$(".header__catalogBtnText").css("display")?o.toggleClass("header__menuList--full"):o.toggleClass("header__menuList--active"),o.hasClass("header__menuList--full")&&(t=$(".header__menuList--full").offset().top+$(".header__menuList--full").height())}),$(window).scroll(function(){$(window).scrollTop()>t&&e()}),o.on("mouseleave",function(){$(this).hasClass("header__menuList--active")&&e()}),$(".header__menuItem").on("mouseover",function(){if(o.hasClass("header__menuList--active")){$(this).find(".header__menuItemAfter").css("display","block");var t,e=$(this).index(),a=$(this).find(".header__subMenuItem").length;t=0!=e?a>e-1?-50*e+49:e!=$(this).length?-50*(e-(e-a))+48:-50*(e-(e-a))+49:-1,$(this).find(".header__subMenu").css({display:"flex",top:t})}}),$(".header__menuItem").on("mouseout",function(){$(this).find(".header__menuItemAfter").css("display","none"),$(this).find(".header__subMenu").css("display","none")})},catalogFilterCollWidth=function(t){var o=$(".catalog__option").width();$(".catalog__optionsItemList--coll4 .catalog__optionsItem").each(function(){if(($(".catalog__options").hasClass("catalog__options--active")||$(window).outerWidth()>926)&&!$(this).hasClass("catalog__optionsItem--slider")){t&&"25%"!=$(this).css("min-width")&&$(this).css("min-width","25%");var e=$(this).outerWidth();e>o/4&&$(this).css("min-width","50%").appendTo($(this).closest(".catalog__optionsItemList")),e>o/4*2&&$(this).css("min-width","75%").appendTo($(this).closest(".catalog__optionsItemList"))}}),$(".catalog__optionsItemList--coll3 .catalog__optionsItem").each(function(){($(".catalog__options").hasClass("catalog__options--active")||$(window).outerWidth()>926)&&($(this).hasClass("catalog__optionsItem--slider")||(t&&"33%"!=$(this).css("min-width")&&$(this).css("min-width","33%"),$(this).outerWidth()>o/3&&$(this).css("min-width","66%").appendTo($(this).closest(".catalog__optionsItemList"))))})},catalogFilters=function(){$(".filtersBtn").on("click",function(){$(".catalog__options").toggleClass("catalog__options--active"),catalogFilterCollWidth()})},footerMenu=function(){$(".footer__menuTitle").on("click",function(){var t=$(".footer__menu--active").index();$(this).closest(".footer__menu").index()===t?$(this).closest(".footer__menu").toggleClass("footer__menu--active"):($(".footer__menu--active").removeClass("footer__menu--active"),$(this).closest(".footer__menu").toggleClass("footer__menu--active"))})},iosSetting=function(){if($("html").hasClass("ios")){var t=$("body").outerWidth(),o=$(".productMore__galeryPictureMainBox");t<=680&&o.height(.65*t)}};