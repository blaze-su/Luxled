;
$(document).ready(function() {
    // $('.mainContent').css('min-height', ($(window).outerHeight() - $(".footer").outerHeight()) - $(".header").outerHeight());
    catalogFilters();
    headerMenuItemHover();
    catalogCheckBox();
    catalogAccordion();
    catalogSorting();
    productPhotoGalery();
    productMoreTableColumnColor();
    productMoreTab();
    orderForm();
    footerMenu();
    $('img').on('mousedown', function(e) { e.preventDefault(); });
    hScroll($('.header__catalogItem'), $('.header__catalog'));
    hScroll($('.portfolio__item'), $('.portfolio__itemBox'));

    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    var mySwiper = new Swiper('.swiper2', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationElement: 'li'
    });
    // catalogFilterBox();
});

$(window).resize(function() {
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
});

// var catalogFilterBox = function() {
//     $('.catalog__optionsItem').on('click', function() {
//         var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
//         $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
//     });
// };

var mediaCenter = function(count, elem, box, boxControlSize) {
    var size;
    for (var i = 1; i <= (count + 1); i++) {
        if (boxControlSize) {
            size = boxControlSize.width();
        } else {
            size = box.width();
        }
        if (size < elem.outerWidth(true) * i) {
            if (i == 1) {
                box.css('max-width', elem.outerWidth(true) * i);
            } else {
                box.css('max-width', elem.outerWidth(true) * (i - 1));
            }
            break
        }
    }
};

var hScroll = function(el, elB) {
    el.on('mousedown', function(e) {
        e.preventDefault();
        var x = e.pageX - $(this).offset().left;
        $(this).on('mousemove', function(e) {
            $(this).on('click', function(e) {
                e.preventDefault();
            });
            var xx = e.pageX - $(this).offset().left;
            if (xx < x) {
                var curTr = elB.scrollLeft() + (x - xx);
                elB.scrollLeft(curTr);
            }
            if (xx > x) {
                var curTr = elB.scrollLeft() - (xx - x);
                elB.scrollLeft(curTr);
            }
        });
        elB.on('mouseup', function() {
            el.unbind('mousemove');
            setTimeout(function() {
                el.unbind('click');
            }, 1);
        });
        elB.on('mouseleave', function() {
            el.unbind('mousemove');
        });
    });
};

var productPhotoGalery = function() {
    var firstSrc = $('.productMore__galeryPictureOther').eq(0).attr('src');
    $('.productMore__galeryPictureMain').attr('src', firstSrc);
    $('.productMore__galeryPictureOtherCase').eq(0).addClass('productMore__galeryPictureOtherCase--active');
    $('.productMore__galeryPictureOther').on('click', function() {

        var needSrc = $(this).attr('src');
        $('.productMore__galeryPictureMain').attr('src', needSrc);

        $('.productMore__galeryPictureOtherCase--active').removeClass('productMore__galeryPictureOtherCase--active');

        $(this).closest('.productMore__galeryPictureOtherCase').addClass('productMore__galeryPictureOtherCase--active');

    });
};

var productMoreTableColumnColor = function() {
    var rows = $('.productMore__infoCharacteristicsTableRow');
    var firstColor = '#f4f4f4';
    var secondColor = '#ffffff';
    for (var i = 0; i < rows.length; i++) {
        if (i % 2 == 0) {
            rows.eq(i).css('background-color', firstColor);
        } else {
            rows.eq(i).css('background-color', secondColor);
        }
    }
};

var productMoreTab = function() {
    var tabs = $('.productMore__infoTab');
    var links = $('.productMore__infoMenuLink');

    links.on('click', function(e) {
        e.preventDefault();
        $('.productMore__infoMenuLink--active').removeClass('productMore__infoMenuLink--active')
        $(this).addClass('productMore__infoMenuLink--active');
        var path = $(this).attr('href');
        tabs.each(function(index) {
            if (tabs.eq(index).attr('id') === path) {
                tabs.css('display', 'none');
                $(this).css('display', 'block');
            }
        });
    });

    tabs.eq(0).css('display', 'block');
    var tabId0 = tabs.eq(0).attr('id');

    $('.productMore__infoMenuLink').each(function(index) {
        if (links.eq(index).attr('href') === tabId0) {
            $(this).addClass('productMore__infoMenuLink--active');
        }
    });
};

var catalogCheckBox = function() {
    $('.catalog__optionsItem').on('click', function() {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('catalog__optionsItem--checked');
        } else {
            $(this).removeClass('catalog__optionsItem--checked');
        }
    });
};

var catalogAccordion = function() {
    $('.catalog__option').on('click', function() {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).find('.catalog__optionsItemList').toggleClass('catalog__optionsItemList--active');
    });
};

var catalogSorting = function() {
    $('.catalog__sortingTitleBox').on('click', function() {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).next().toggleClass('catalog__sortingList--active');
    });
};

var orderForm = function() {
    var phone = $('.orders__form').find('input[name="phone"]');
    phone.mask("+7(999) 999-99-99");

    var form = $('.orders__form');
    var titleError = $('.orders__formErrorTitle');
    var visionTitleError = titleError.css('display');

    if (visionTitleError === 'block') {
        form.css('margin-top', '55px');
    }

    var inputRequire = $('.orders__formItem--require > input');

};

var headerMenuItemHover = function() {
    // $('body').on('click', function() {
    //     if ($('.header__menuList').hasClass('header__menuList--full')) {
    //         $('.header__menuList').removeClass('header__menuList--full');
    //     }
    // });
    $('.header__catalogBtn').on('click', function() {
        if ($('.header__catalogBtnText').css('display') === 'none') {
            $('.header__menuList').toggleClass('header__menuList--full');
        } else {
            $('.header__menuList').toggleClass('header__menuList--active');
        }
    });
    $('.header__menuItem').on('mouseover', function() {
        if ($('.header__menuList').hasClass('header__menuList--active')) {
            $(this).find('.header__menuItemAfter').css('display', 'block');
            var index = $(this).index();
            var top;
            if (index != 0) {
                top = (-50 * index) + 49;
            } else {
                top = -1;
            }
            $(this).find('.header__subMenu').css({
                'display': 'flex',
                'top': top
            });
        }
    });
    $('.header__menuItem').on('mouseout', function() {
        $(this).find('.header__menuItemAfter').css('display', 'none');
        $(this).find('.header__subMenu').css('display', 'none');
    });
};

var catalogFilters = function() {
    $('.filtersBtn').on('click', function() {
        $('.catalog__options').toggleClass('catalog__options--active');
    });
};

var footerMenu = function() {
    $('.footer__menuTitle').on('click', function() {
        var i = $('.footer__menu--active').index();
        var j = $(this).closest('.footer__menu').index();
        if (j === i) {
            $(this).closest('.footer__menu').toggleClass('footer__menu--active');
        } else {
            $('.footer__menu--active').removeClass('footer__menu--active');
            $(this).closest('.footer__menu').toggleClass('footer__menu--active');
        }

    });
};

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
! function() {
    "use strict";
    var e, a = function(t, s) {
        function r(e) { return Math.floor(e) }

        function i() {
            var e = x.params.autoplay,
                a = x.slides.eq(x.activeIndex);
            a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || x.params.autoplay), x.autoplayTimeoutId = setTimeout(function() { x.params.loop ? (x.fixLoop(), x._slideNext(), x.emit("onAutoplay", x)) : x.isEnd ? s.autoplayStopOnLast ? x.stopAutoplay() : (x._slideTo(0), x.emit("onAutoplay", x)) : (x._slideNext(), x.emit("onAutoplay", x)) }, e)
        }

        function n(a, t) {
            var s = e(a.target);
            if (!s.is(t))
                if ("string" == typeof t) s = s.parents(t);
                else if (t.nodeType) { var r; return s.parents().each(function(e, a) { a === t && (r = t) }), r ? t : void 0 }
            if (0 !== s.length) return s[0]
        }

        function o(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                s = new t(function(e) { e.forEach(function(e) { x.onResize(!0), x.emit("onObserverUpdate", x, e) }) });
            s.observe(e, { attributes: void 0 === a.attributes || a.attributes, childList: void 0 === a.childList || a.childList, characterData: void 0 === a.characterData || a.characterData }), x.observers.push(s)
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!x.params.allowSwipeToNext && (x.isHorizontal() && 39 === a || !x.isHorizontal() && 40 === a)) return !1;
            if (!x.params.allowSwipeToPrev && (x.isHorizontal() && 37 === a || !x.isHorizontal() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (x.container.parents("." + x.params.slideClass).length > 0 && 0 === x.container.parents("." + x.params.slideActiveClass).length) return;
                    var s = { left: window.pageXOffset, top: window.pageYOffset },
                        r = window.innerWidth,
                        i = window.innerHeight,
                        n = x.container.offset();
                    x.rtl && (n.left = n.left - x.container[0].scrollLeft);
                    for (var o = [
                            [n.left, n.top],
                            [n.left + x.width, n.top],
                            [n.left, n.top + x.height],
                            [n.left + x.width, n.top + x.height]
                        ], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= s.left && p[0] <= s.left + r && p[1] >= s.top && p[1] <= s.top + i && (t = !0)
                    }
                    if (!t) return
                }
                x.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !x.rtl || 37 === a && x.rtl) && x.slideNext(), (37 === a && !x.rtl || 39 === a && x.rtl) && x.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && x.slideNext(), 38 === a && x.slidePrev()), x.emit("onKeyPress", x, a)
            }
        }

        function p(e) {
            var a = 0,
                t = 0,
                s = 0,
                r = 0;
            return "detail" in e && (t = e.detail), "wheelDelta" in e && (t = -e.wheelDelta / 120), "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (a = t, t = 0), s = 10 * a, r = 10 * t, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || r) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, r *= 40) : (s *= 800, r *= 800)), s && !a && (a = s < 1 ? -1 : 1), r && !t && (t = r < 1 ? -1 : 1), { spinX: a, spinY: t, pixelX: s, pixelY: r }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = 0,
                t = x.rtl ? -1 : 1,
                s = p(e);
            if (x.params.mousewheelForceToAxis)
                if (x.isHorizontal()) {
                    if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
                    a = s.pixelX * t
                } else {
                    if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
                    a = s.pixelY
                }
            else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
            if (0 !== a) {
                if (x.params.mousewheelInvert && (a = -a), x.params.freeMode) {
                    var r = x.getWrapperTranslate() + a * x.params.mousewheelSensitivity,
                        i = x.isBeginning,
                        n = x.isEnd;
                    if (r >= x.minTranslate() && (r = x.minTranslate()), r <= x.maxTranslate() && (r = x.maxTranslate()), x.setWrapperTransition(0), x.setWrapperTranslate(r), x.updateProgress(), x.updateActiveIndex(), (!i && x.isBeginning || !n && x.isEnd) && x.updateClasses(), x.params.freeModeSticky ? (clearTimeout(x.mousewheel.timeout), x.mousewheel.timeout = setTimeout(function() { x.slideReset() }, 300)) : x.params.lazyLoading && x.lazy && x.lazy.load(), x.emit("onScroll", x, e), x.params.autoplay && x.params.autoplayDisableOnInteraction && x.stopAutoplay(), 0 === r || r === x.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - x.mousewheel.lastScrollTime > 60)
                        if (a < 0)
                            if (x.isEnd && !x.params.loop || x.animating) { if (x.params.mousewheelReleaseOnEdges) return !0 } else x.slideNext(), x.emit("onScroll", x, e);
                    else if (x.isBeginning && !x.params.loop || x.animating) { if (x.params.mousewheelReleaseOnEdges) return !0 } else x.slidePrev(), x.emit("onScroll", x, e);
                    x.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function m(a, t) {
            a = e(a);
            var s, r, i, n = x.rtl ? -1 : 1;
            s = a.attr("data-swiper-parallax") || "0", r = a.attr("data-swiper-parallax-x"), i = a.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : x.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", a.transform("translate3d(" + r + ", " + i + ",0px)")
        }

        function u(e) { return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e }
        if (!(this instanceof a)) return new a(t, s);
        var c = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, zoom: !1, zoomMax: 3, zoomMin: 1, zoomToggle: !0, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, mousewheelEventsTarged: "container", hashnav: !1, hashnavWatchState: !1, history: !1, replaceState: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, touchReleaseOnEdges: !1, uniqueNavElements: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", normalizeSlideIndex: !0, allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", passiveListeners: !0, containerModifierClass: "swiper-container-", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", paginationClickableClass: "swiper-pagination-clickable", paginationModifierClass: "swiper-pagination-", lazyLoadingClass: "swiper-lazy", lazyStatusLoadingClass: "swiper-lazy-loading", lazyStatusLoadedClass: "swiper-lazy-loaded", lazyPreloaderClass: "swiper-lazy-preloader", notificationClass: "swiper-notification", preloaderClass: "preloader", zoomContainerClass: "swiper-zoom-container", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
            g = s && s.virtualTranslate;
        s = s || {};
        var h = {};
        for (var v in s)
            if ("object" != typeof s[v] || null === s[v] || (s[v].nodeType || s[v] === window || s[v] === document || "undefined" != typeof Dom7 && s[v] instanceof Dom7 || "undefined" != typeof jQuery && s[v] instanceof jQuery)) h[v] = s[v];
            else { h[v] = {}; for (var f in s[v]) h[v][f] = s[v][f] }
        for (var w in c)
            if (void 0 === s[w]) s[w] = c[w];
            else if ("object" == typeof s[w])
            for (var y in c[w]) void 0 === s[w][y] && (s[w][y] = c[w][y]);
        var x = this;
        if (x.params = s, x.originalParams = h, x.classNames = [], void 0 !== e && "undefined" != typeof Dom7 && (e = Dom7), (void 0 !== e || (e = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (x.$ = e, x.currentBreakpoint = void 0, x.getActiveBreakpoint = function() {
                if (!x.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in x.params.breakpoints) x.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function(e, a) { return parseInt(e, 10) > parseInt(a, 10) });
                for (var s = 0; s < t.length; s++)(e = t[s]) >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, x.setBreakpoint = function() {
                var e = x.getActiveBreakpoint();
                if (e && x.currentBreakpoint !== e) {
                    var a = e in x.params.breakpoints ? x.params.breakpoints[e] : x.originalParams,
                        t = x.params.loop && a.slidesPerView !== x.params.slidesPerView;
                    for (var s in a) x.params[s] = a[s];
                    x.currentBreakpoint = e, t && x.destroyLoop && x.reLoop(!0)
                }
            }, x.params.breakpoints && x.setBreakpoint(), x.container = e(t), 0 !== x.container.length)) {
            if (x.container.length > 1) { var T = []; return x.container.each(function() { T.push(new a(this, s)) }), T }
            x.container[0].swiper = x, x.container.data("swiper", x), x.classNames.push(x.params.containerModifierClass + x.params.direction), x.params.freeMode && x.classNames.push(x.params.containerModifierClass + "free-mode"), x.support.flexbox || (x.classNames.push(x.params.containerModifierClass + "no-flexbox"), x.params.slidesPerColumn = 1), x.params.autoHeight && x.classNames.push(x.params.containerModifierClass + "autoheight"), (x.params.parallax || x.params.watchSlidesVisibility) && (x.params.watchSlidesProgress = !0), x.params.touchReleaseOnEdges && (x.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(x.params.effect) >= 0 && (x.support.transforms3d ? (x.params.watchSlidesProgress = !0, x.classNames.push(x.params.containerModifierClass + "3d")) : x.params.effect = "slide"), "slide" !== x.params.effect && x.classNames.push(x.params.containerModifierClass + x.params.effect), "cube" === x.params.effect && (x.params.resistanceRatio = 0, x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.centeredSlides = !1, x.params.spaceBetween = 0, x.params.virtualTranslate = !0), "fade" !== x.params.effect && "flip" !== x.params.effect || (x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.watchSlidesProgress = !0, x.params.spaceBetween = 0, void 0 === g && (x.params.virtualTranslate = !0)), x.params.grabCursor && x.support.touch && (x.params.grabCursor = !1), x.wrapper = x.container.children("." + x.params.wrapperClass), x.params.pagination && (x.paginationContainer = e(x.params.pagination), x.params.uniqueNavElements && "string" == typeof x.params.pagination && x.paginationContainer.length > 1 && 1 === x.container.find(x.params.pagination).length && (x.paginationContainer = x.container.find(x.params.pagination)), "bullets" === x.params.paginationType && x.params.paginationClickable ? x.paginationContainer.addClass(x.params.paginationModifierClass + "clickable") : x.params.paginationClickable = !1, x.paginationContainer.addClass(x.params.paginationModifierClass + x.params.paginationType)), (x.params.nextButton || x.params.prevButton) && (x.params.nextButton && (x.nextButton = e(x.params.nextButton), x.params.uniqueNavElements && "string" == typeof x.params.nextButton && x.nextButton.length > 1 && 1 === x.container.find(x.params.nextButton).length && (x.nextButton = x.container.find(x.params.nextButton))), x.params.prevButton && (x.prevButton = e(x.params.prevButton), x.params.uniqueNavElements && "string" == typeof x.params.prevButton && x.prevButton.length > 1 && 1 === x.container.find(x.params.prevButton).length && (x.prevButton = x.container.find(x.params.prevButton)))), x.isHorizontal = function() { return "horizontal" === x.params.direction }, x.rtl = x.isHorizontal() && ("rtl" === x.container[0].dir.toLowerCase() || "rtl" === x.container.css("direction")), x.rtl && x.classNames.push(x.params.containerModifierClass + "rtl"), x.rtl && (x.wrongRTL = "-webkit-box" === x.wrapper.css("display")), x.params.slidesPerColumn > 1 && x.classNames.push(x.params.containerModifierClass + "multirow"), x.device.android && x.classNames.push(x.params.containerModifierClass + "android"), x.container.addClass(x.classNames.join(" ")), x.translate = 0, x.progress = 0, x.velocity = 0, x.lockSwipeToNext = function() { x.params.allowSwipeToNext = !1, x.params.allowSwipeToPrev === !1 && x.params.grabCursor && x.unsetGrabCursor() }, x.lockSwipeToPrev = function() { x.params.allowSwipeToPrev = !1, x.params.allowSwipeToNext === !1 && x.params.grabCursor && x.unsetGrabCursor() }, x.lockSwipes = function() { x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !1, x.params.grabCursor && x.unsetGrabCursor() }, x.unlockSwipeToNext = function() { x.params.allowSwipeToNext = !0, x.params.allowSwipeToPrev === !0 && x.params.grabCursor && x.setGrabCursor() }, x.unlockSwipeToPrev = function() { x.params.allowSwipeToPrev = !0, x.params.allowSwipeToNext === !0 && x.params.grabCursor && x.setGrabCursor() }, x.unlockSwipes = function() { x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !0, x.params.grabCursor && x.setGrabCursor() }, x.setGrabCursor = function(e) { x.container[0].style.cursor = "move", x.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", x.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", x.container[0].style.cursor = e ? "grabbing" : "grab" }, x.unsetGrabCursor = function() { x.container[0].style.cursor = "" }, x.params.grabCursor && x.setGrabCursor(), x.imagesToLoad = [], x.imagesLoaded = 0, x.loadImage = function(e, a, t, s, r, i) {
                function n() { i && i() }
                var o;
                e.complete && r ? n() : a ? (o = new window.Image, o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n()
            }, x.preloadImages = function() {
                function e() { void 0 !== x && null !== x && x && (void 0 !== x.imagesLoaded && x.imagesLoaded++, x.imagesLoaded === x.imagesToLoad.length && (x.params.updateOnImagesReady && x.update(), x.emit("onImagesReady", x))) }
                x.imagesToLoad = x.container.find("img");
                for (var a = 0; a < x.imagesToLoad.length; a++) x.loadImage(x.imagesToLoad[a], x.imagesToLoad[a].currentSrc || x.imagesToLoad[a].getAttribute("src"), x.imagesToLoad[a].srcset || x.imagesToLoad[a].getAttribute("srcset"), x.imagesToLoad[a].sizes || x.imagesToLoad[a].getAttribute("sizes"), !0, e)
            }, x.autoplayTimeoutId = void 0, x.autoplaying = !1, x.autoplayPaused = !1, x.startAutoplay = function() { return void 0 === x.autoplayTimeoutId && (!!x.params.autoplay && (!x.autoplaying && (x.autoplaying = !0, x.emit("onAutoplayStart", x), void i()))) }, x.stopAutoplay = function(e) { x.autoplayTimeoutId && (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplaying = !1, x.autoplayTimeoutId = void 0, x.emit("onAutoplayStop", x)) }, x.pauseAutoplay = function(e) { x.autoplayPaused || (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplayPaused = !0, 0 === e ? (x.autoplayPaused = !1, i()) : x.wrapper.transitionEnd(function() { x && (x.autoplayPaused = !1, x.autoplaying ? i() : x.stopAutoplay()) })) }, x.minTranslate = function() { return -x.snapGrid[0] }, x.maxTranslate = function() { return -x.snapGrid[x.snapGrid.length - 1] }, x.updateAutoHeight = function() {
                var e, a = [],
                    t = 0;
                if ("auto" !== x.params.slidesPerView && x.params.slidesPerView > 1)
                    for (e = 0; e < Math.ceil(x.params.slidesPerView); e++) {
                        var s = x.activeIndex + e;
                        if (s > x.slides.length) break;
                        a.push(x.slides.eq(s)[0])
                    } else a.push(x.slides.eq(x.activeIndex)[0]);
                for (e = 0; e < a.length; e++)
                    if (void 0 !== a[e]) {
                        var r = a[e].offsetHeight;
                        t = r > t ? r : t
                    }
                t && x.wrapper.css("height", t + "px")
            }, x.updateContainerSize = function() {
                var e, a;
                e = void 0 !== x.params.width ? x.params.width : x.container[0].clientWidth, a = void 0 !== x.params.height ? x.params.height : x.container[0].clientHeight, 0 === e && x.isHorizontal() || 0 === a && !x.isHorizontal() || (e = e - parseInt(x.container.css("padding-left"), 10) - parseInt(x.container.css("padding-right"), 10), a = a - parseInt(x.container.css("padding-top"), 10) - parseInt(x.container.css("padding-bottom"), 10), x.width = e, x.height = a, x.size = x.isHorizontal() ? x.width : x.height)
            }, x.updateSlidesSize = function() {
                x.slides = x.wrapper.children("." + x.params.slideClass), x.snapGrid = [], x.slidesGrid = [], x.slidesSizesGrid = [];
                var e, a = x.params.spaceBetween,
                    t = -x.params.slidesOffsetBefore,
                    s = 0,
                    i = 0;
                if (void 0 !== x.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * x.size), x.virtualSize = -a, x.rtl ? x.slides.css({ marginLeft: "", marginTop: "" }) : x.slides.css({ marginRight: "", marginBottom: "" });
                    var n;
                    x.params.slidesPerColumn > 1 && (n = Math.floor(x.slides.length / x.params.slidesPerColumn) === x.slides.length / x.params.slidesPerColumn ? x.slides.length : Math.ceil(x.slides.length / x.params.slidesPerColumn) * x.params.slidesPerColumn, "auto" !== x.params.slidesPerView && "row" === x.params.slidesPerColumnFill && (n = Math.max(n, x.params.slidesPerView * x.params.slidesPerColumn)));
                    var o, l = x.params.slidesPerColumn,
                        p = n / l,
                        d = p - (x.params.slidesPerColumn * p - x.slides.length);
                    for (e = 0; e < x.slides.length; e++) { o = 0; var m = x.slides.eq(e); if (x.params.slidesPerColumn > 1) { var u, c, g; "column" === x.params.slidesPerColumnFill ? (c = Math.floor(e / l), g = e - c * l, (c > d || c === d && g === l - 1) && ++g >= l && (g = 0, c++), u = c + g * n / l, m.css({ "-webkit-box-ordinal-group": u, "-moz-box-ordinal-group": u, "-ms-flex-order": u, "-webkit-order": u, order: u })) : (g = Math.floor(e / p), c = e - g * p), m.css("margin-" + (x.isHorizontal() ? "top" : "left"), 0 !== g && x.params.spaceBetween && x.params.spaceBetween + "px").attr("data-swiper-column", c).attr("data-swiper-row", g) } "none" !== m.css("display") && ("auto" === x.params.slidesPerView ? (o = x.isHorizontal() ? m.outerWidth(!0) : m.outerHeight(!0), x.params.roundLengths && (o = r(o))) : (o = (x.size - (x.params.slidesPerView - 1) * a) / x.params.slidesPerView, x.params.roundLengths && (o = r(o)), x.isHorizontal() ? x.slides[e].style.width = o + "px" : x.slides[e].style.height = o + "px"), x.slides[e].swiperSlideSize = o, x.slidesSizesGrid.push(o), x.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === s && 0 !== e && (t = t - x.size / 2 - a), 0 === e && (t = t - x.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % x.params.slidesPerGroup == 0 && x.snapGrid.push(t), x.slidesGrid.push(t)) : (i % x.params.slidesPerGroup == 0 && x.snapGrid.push(t), x.slidesGrid.push(t), t = t + o + a), x.virtualSize += o + a, s = o, i++) }
                    x.virtualSize = Math.max(x.virtualSize, x.size) + x.params.slidesOffsetAfter;
                    var h;
                    if (x.rtl && x.wrongRTL && ("slide" === x.params.effect || "coverflow" === x.params.effect) && x.wrapper.css({ width: x.virtualSize + x.params.spaceBetween + "px" }), x.support.flexbox && !x.params.setWrapperSize || (x.isHorizontal() ? x.wrapper.css({ width: x.virtualSize + x.params.spaceBetween + "px" }) : x.wrapper.css({ height: x.virtualSize + x.params.spaceBetween + "px" })), x.params.slidesPerColumn > 1 && (x.virtualSize = (o + x.params.spaceBetween) * n, x.virtualSize = Math.ceil(x.virtualSize / x.params.slidesPerColumn) - x.params.spaceBetween, x.isHorizontal() ? x.wrapper.css({ width: x.virtualSize + x.params.spaceBetween + "px" }) : x.wrapper.css({ height: x.virtualSize + x.params.spaceBetween + "px" }), x.params.centeredSlides)) {
                        for (h = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] < x.virtualSize + x.snapGrid[0] && h.push(x.snapGrid[e]);
                        x.snapGrid = h
                    }
                    if (!x.params.centeredSlides) {
                        for (h = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] <= x.virtualSize - x.size && h.push(x.snapGrid[e]);
                        x.snapGrid = h, Math.floor(x.virtualSize - x.size) - Math.floor(x.snapGrid[x.snapGrid.length - 1]) > 1 && x.snapGrid.push(x.virtualSize - x.size)
                    }
                    0 === x.snapGrid.length && (x.snapGrid = [0]), 0 !== x.params.spaceBetween && (x.isHorizontal() ? x.rtl ? x.slides.css({ marginLeft: a + "px" }) : x.slides.css({ marginRight: a + "px" }) : x.slides.css({ marginBottom: a + "px" })), x.params.watchSlidesProgress && x.updateSlidesOffset()
                }
            }, x.updateSlidesOffset = function() { for (var e = 0; e < x.slides.length; e++) x.slides[e].swiperSlideOffset = x.isHorizontal() ? x.slides[e].offsetLeft : x.slides[e].offsetTop }, x.currentSlidesPerView = function() {
                var e, a, t = 1;
                if (x.params.centeredSlides) { var s, r = x.slides[x.activeIndex].swiperSlideSize; for (e = x.activeIndex + 1; e < x.slides.length; e++) x.slides[e] && !s && (r += x.slides[e].swiperSlideSize, t++, r > x.size && (s = !0)); for (a = x.activeIndex - 1; a >= 0; a--) x.slides[a] && !s && (r += x.slides[a].swiperSlideSize, t++, r > x.size && (s = !0)) } else
                    for (e = x.activeIndex + 1; e < x.slides.length; e++) x.slidesGrid[e] - x.slidesGrid[x.activeIndex] < x.size && t++;
                return t
            }, x.updateSlidesProgress = function(e) {
                if (void 0 === e && (e = x.translate || 0), 0 !== x.slides.length) {
                    void 0 === x.slides[0].swiperSlideOffset && x.updateSlidesOffset();
                    var a = -e;
                    x.rtl && (a = e), x.slides.removeClass(x.params.slideVisibleClass);
                    for (var t = 0; t < x.slides.length; t++) {
                        var s = x.slides[t],
                            r = (a + (x.params.centeredSlides ? x.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + x.params.spaceBetween);
                        if (x.params.watchSlidesVisibility) {
                            var i = -(a - s.swiperSlideOffset),
                                n = i + x.slidesSizesGrid[t];
                            (i >= 0 && i < x.size || n > 0 && n <= x.size || i <= 0 && n >= x.size) && x.slides.eq(t).addClass(x.params.slideVisibleClass)
                        }
                        s.progress = x.rtl ? -r : r
                    }
                }
            }, x.updateProgress = function(e) {
                void 0 === e && (e = x.translate || 0);
                var a = x.maxTranslate() - x.minTranslate(),
                    t = x.isBeginning,
                    s = x.isEnd;
                0 === a ? (x.progress = 0, x.isBeginning = x.isEnd = !0) : (x.progress = (e - x.minTranslate()) / a, x.isBeginning = x.progress <= 0, x.isEnd = x.progress >= 1), x.isBeginning && !t && x.emit("onReachBeginning", x), x.isEnd && !s && x.emit("onReachEnd", x), x.params.watchSlidesProgress && x.updateSlidesProgress(e), x.emit("onProgress", x, x.progress)
            }, x.updateActiveIndex = function() {
                var e, a, t, s = x.rtl ? x.translate : -x.translate;
                for (a = 0; a < x.slidesGrid.length; a++) void 0 !== x.slidesGrid[a + 1] ? s >= x.slidesGrid[a] && s < x.slidesGrid[a + 1] - (x.slidesGrid[a + 1] - x.slidesGrid[a]) / 2 ? e = a : s >= x.slidesGrid[a] && s < x.slidesGrid[a + 1] && (e = a + 1) : s >= x.slidesGrid[a] && (e = a);
                x.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), t = Math.floor(e / x.params.slidesPerGroup), t >= x.snapGrid.length && (t = x.snapGrid.length - 1), e !== x.activeIndex && (x.snapIndex = t, x.previousIndex = x.activeIndex, x.activeIndex = e, x.updateClasses(), x.updateRealIndex())
            }, x.updateRealIndex = function() { x.realIndex = parseInt(x.slides.eq(x.activeIndex).attr("data-swiper-slide-index") || x.activeIndex, 10) }, x.updateClasses = function() {
                x.slides.removeClass(x.params.slideActiveClass + " " + x.params.slideNextClass + " " + x.params.slidePrevClass + " " + x.params.slideDuplicateActiveClass + " " + x.params.slideDuplicateNextClass + " " + x.params.slideDuplicatePrevClass);
                var a = x.slides.eq(x.activeIndex);
                a.addClass(x.params.slideActiveClass), s.loop && (a.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass));
                var t = a.next("." + x.params.slideClass).addClass(x.params.slideNextClass);
                x.params.loop && 0 === t.length && (t = x.slides.eq(0), t.addClass(x.params.slideNextClass));
                var r = a.prev("." + x.params.slideClass).addClass(x.params.slidePrevClass);
                if (x.params.loop && 0 === r.length && (r = x.slides.eq(-1), r.addClass(x.params.slidePrevClass)), s.loop && (t.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass), r.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass)), x.paginationContainer && x.paginationContainer.length > 0) {
                    var i, n = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length;
                    if (x.params.loop ? (i = Math.ceil((x.activeIndex - x.loopedSlides) / x.params.slidesPerGroup), i > x.slides.length - 1 - 2 * x.loopedSlides && (i -= x.slides.length - 2 * x.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== x.params.paginationType && (i = n + i)) : i = void 0 !== x.snapIndex ? x.snapIndex : x.activeIndex || 0, "bullets" === x.params.paginationType && x.bullets && x.bullets.length > 0 && (x.bullets.removeClass(x.params.bulletActiveClass), x.paginationContainer.length > 1 ? x.bullets.each(function() { e(this).index() === i && e(this).addClass(x.params.bulletActiveClass) }) : x.bullets.eq(i).addClass(x.params.bulletActiveClass)), "fraction" === x.params.paginationType && (x.paginationContainer.find("." + x.params.paginationCurrentClass).text(i + 1), x.paginationContainer.find("." + x.params.paginationTotalClass).text(n)), "progress" === x.params.paginationType) {
                        var o = (i + 1) / n,
                            l = o,
                            p = 1;
                        x.isHorizontal() || (p = o, l = 1), x.paginationContainer.find("." + x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(x.params.speed)
                    }
                    "custom" === x.params.paginationType && x.params.paginationCustomRender && (x.paginationContainer.html(x.params.paginationCustomRender(x, i + 1, n)), x.emit("onPaginationRendered", x, x.paginationContainer[0]))
                }
                x.params.loop || (x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.isBeginning ? (x.prevButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.prevButton)) : (x.prevButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.prevButton))), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.isEnd ? (x.nextButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.nextButton)) : (x.nextButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.nextButton))))
            }, x.updatePagination = function() {
                if (x.params.pagination && x.paginationContainer && x.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === x.params.paginationType) {
                        for (var a = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length, t = 0; t < a; t++) e += x.params.paginationBulletRender ? x.params.paginationBulletRender(x, t, x.params.bulletClass) : "<" + x.params.paginationElement + ' class="' + x.params.bulletClass + '"></' + x.params.paginationElement + ">";
                        x.paginationContainer.html(e), x.bullets = x.paginationContainer.find("." + x.params.bulletClass), x.params.paginationClickable && x.params.a11y && x.a11y && x.a11y.initPagination()
                    }
                    "fraction" === x.params.paginationType && (e = x.params.paginationFractionRender ? x.params.paginationFractionRender(x, x.params.paginationCurrentClass, x.params.paginationTotalClass) : '<span class="' + x.params.paginationCurrentClass + '"></span> / <span class="' + x.params.paginationTotalClass + '"></span>', x.paginationContainer.html(e)), "progress" === x.params.paginationType && (e = x.params.paginationProgressRender ? x.params.paginationProgressRender(x, x.params.paginationProgressbarClass) : '<span class="' + x.params.paginationProgressbarClass + '"></span>', x.paginationContainer.html(e)), "custom" !== x.params.paginationType && x.emit("onPaginationRendered", x, x.paginationContainer[0])
                }
            }, x.update = function(e) {
                function a() {
                    x.rtl, x.translate;
                    t = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate()), x.setWrapperTranslate(t), x.updateActiveIndex(), x.updateClasses()
                }
                if (x) { x.updateContainerSize(), x.updateSlidesSize(), x.updateProgress(), x.updatePagination(), x.updateClasses(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(); var t; if (e) { x.controller && x.controller.spline && (x.controller.spline = void 0), x.params.freeMode ? (a(), x.params.autoHeight && x.updateAutoHeight()) : (("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0)) || a() } else x.params.autoHeight && x.updateAutoHeight() }
            }, x.onResize = function(e) {
                x.params.onBeforeResize && x.params.onBeforeResize(x), x.params.breakpoints && x.setBreakpoint();
                var a = x.params.allowSwipeToPrev,
                    t = x.params.allowSwipeToNext;
                x.params.allowSwipeToPrev = x.params.allowSwipeToNext = !0, x.updateContainerSize(), x.updateSlidesSize(), ("auto" === x.params.slidesPerView || x.params.freeMode || e) && x.updatePagination(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(), x.controller && x.controller.spline && (x.controller.spline = void 0);
                var s = !1;
                if (x.params.freeMode) {
                    var r = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate());
                    x.setWrapperTranslate(r), x.updateActiveIndex(), x.updateClasses(), x.params.autoHeight && x.updateAutoHeight()
                } else x.updateClasses(), s = ("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0);
                x.params.lazyLoading && !s && x.lazy && x.lazy.load(), x.params.allowSwipeToPrev = a, x.params.allowSwipeToNext = t, x.params.onAfterResize && x.params.onAfterResize(x)
            }, x.touchEventsDesktop = { start: "mousedown", move: "mousemove", end: "mouseup" }, window.navigator.pointerEnabled ? x.touchEventsDesktop = { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled && (x.touchEventsDesktop = { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }), x.touchEvents = { start: x.support.touch || !x.params.simulateTouch ? "touchstart" : x.touchEventsDesktop.start, move: x.support.touch || !x.params.simulateTouch ? "touchmove" : x.touchEventsDesktop.move, end: x.support.touch || !x.params.simulateTouch ? "touchend" : x.touchEventsDesktop.end }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === x.params.touchEventsTarget ? x.container : x.wrapper).addClass("swiper-wp8-" + x.params.direction), x.initEvents = function(e) {
                var a = e ? "off" : "on",
                    t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === x.params.touchEventsTarget ? x.container[0] : x.wrapper[0],
                    i = x.support.touch ? r : document,
                    n = !!x.params.nested;
                if (x.browser.ie) r[t](x.touchEvents.start, x.onTouchStart, !1), i[t](x.touchEvents.move, x.onTouchMove, n), i[t](x.touchEvents.end, x.onTouchEnd, !1);
                else {
                    if (x.support.touch) {
                        var o = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && { passive: !0, capture: !1 };
                        r[t](x.touchEvents.start, x.onTouchStart, o), r[t](x.touchEvents.move, x.onTouchMove, n), r[t](x.touchEvents.end, x.onTouchEnd, o)
                    }(s.simulateTouch && !x.device.ios && !x.device.android || s.simulateTouch && !x.support.touch && x.device.ios) && (r[t]("mousedown", x.onTouchStart, !1), document[t]("mousemove", x.onTouchMove, n), document[t]("mouseup", x.onTouchEnd, !1))
                }
                window[t]("resize", x.onResize), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.nextButton[a]("click", x.onClickNext), x.params.a11y && x.a11y && x.nextButton[a]("keydown", x.a11y.onEnterKey)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.prevButton[a]("click", x.onClickPrev), x.params.a11y && x.a11y && x.prevButton[a]("keydown", x.a11y.onEnterKey)), x.params.pagination && x.params.paginationClickable && (x.paginationContainer[a]("click", "." + x.params.bulletClass, x.onClickIndex), x.params.a11y && x.a11y && x.paginationContainer[a]("keydown", "." + x.params.bulletClass, x.a11y.onEnterKey)), (x.params.preventClicks || x.params.preventClicksPropagation) && r[t]("click", x.preventClicks, !0)
            }, x.attachEvents = function() { x.initEvents() }, x.detachEvents = function() { x.initEvents(!0) }, x.allowClick = !0, x.preventClicks = function(e) { x.allowClick || (x.params.preventClicks && e.preventDefault(), x.params.preventClicksPropagation && x.animating && (e.stopPropagation(), e.stopImmediatePropagation())) }, x.onClickNext = function(e) { e.preventDefault(), x.isEnd && !x.params.loop || x.slideNext() }, x.onClickPrev = function(e) { e.preventDefault(), x.isBeginning && !x.params.loop || x.slidePrev() }, x.onClickIndex = function(a) {
                a.preventDefault();
                var t = e(this).index() * x.params.slidesPerGroup;
                x.params.loop && (t += x.loopedSlides), x.slideTo(t)
            }, x.updateClickedSlide = function(a) {
                var t = n(a, "." + x.params.slideClass),
                    s = !1;
                if (t)
                    for (var r = 0; r < x.slides.length; r++) x.slides[r] === t && (s = !0);
                if (!t || !s) return x.clickedSlide = void 0, void(x.clickedIndex = void 0);
                if (x.clickedSlide = t, x.clickedIndex = e(t).index(), x.params.slideToClickedSlide && void 0 !== x.clickedIndex && x.clickedIndex !== x.activeIndex) {
                    var i, o = x.clickedIndex,
                        l = "auto" === x.params.slidesPerView ? x.currentSlidesPerView() : x.params.slidesPerView;
                    if (x.params.loop) {
                        if (x.animating) return;
                        i = parseInt(e(x.clickedSlide).attr("data-swiper-slide-index"), 10), x.params.centeredSlides ? o < x.loopedSlides - l / 2 || o > x.slides.length - x.loopedSlides + l / 2 ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() { x.slideTo(o) }, 0)) : x.slideTo(o) : o > x.slides.length - l ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() { x.slideTo(o) }, 0)) : x.slideTo(o)
                    } else x.slideTo(o)
                }
            };
            var b, C, S, z, M, P, E, I, k, D, L = "input, select, textarea, button, video",
                B = Date.now(),
                H = [];
            x.animating = !1, x.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };
            var G, X;
            x.onTouchStart = function(a) {
                if (a.originalEvent && (a = a.originalEvent), (G = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
                    if (x.params.noSwiping && n(a, "." + x.params.noSwipingClass)) return void(x.allowClick = !0);
                    if (!x.params.swipeHandler || n(a, x.params.swipeHandler)) {
                        var t = x.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                            s = x.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                        if (!(x.device.ios && x.params.iOSEdgeSwipeDetection && t <= x.params.iOSEdgeSwipeThreshold)) {
                            if (b = !0, C = !1, S = !0, M = void 0, X = void 0, x.touches.startX = t, x.touches.startY = s, z = Date.now(), x.allowClick = !0, x.updateContainerSize(), x.swipeDirection = void 0, x.params.threshold > 0 && (I = !1), "touchstart" !== a.type) {
                                var r = !0;
                                e(a.target).is(L) && (r = !1), document.activeElement && e(document.activeElement).is(L) && document.activeElement.blur(), r && a.preventDefault()
                            }
                            x.emit("onTouchStart", x, a)
                        }
                    }
                }
            }, x.onTouchMove = function(a) {
                if (a.originalEvent && (a = a.originalEvent), !G || "mousemove" !== a.type) {
                    if (a.preventedByNestedSwiper) return x.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void(x.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
                    if (x.params.onlyExternal) return x.allowClick = !1, void(b && (x.touches.startX = x.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, x.touches.startY = x.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, z = Date.now()));
                    if (G && x.params.touchReleaseOnEdges && !x.params.loop)
                        if (x.isHorizontal()) { if (x.touches.currentX < x.touches.startX && x.translate <= x.maxTranslate() || x.touches.currentX > x.touches.startX && x.translate >= x.minTranslate()) return } else if (x.touches.currentY < x.touches.startY && x.translate <= x.maxTranslate() || x.touches.currentY > x.touches.startY && x.translate >= x.minTranslate()) return;
                    if (G && document.activeElement && a.target === document.activeElement && e(a.target).is(L)) return C = !0, void(x.allowClick = !1);
                    if (S && x.emit("onTouchMove", x, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                        if (x.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, x.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === M) {
                            var t;
                            x.isHorizontal() && x.touches.currentY === x.touches.startY || !x.isHorizontal() && x.touches.currentX === x.touches.startX ? M = !1 : (t = 180 * Math.atan2(Math.abs(x.touches.currentY - x.touches.startY), Math.abs(x.touches.currentX - x.touches.startX)) / Math.PI, M = x.isHorizontal() ? t > x.params.touchAngle : 90 - t > x.params.touchAngle)
                        }
                        if (M && x.emit("onTouchMoveOpposite", x, a), void 0 === X && (x.touches.currentX === x.touches.startX && x.touches.currentY === x.touches.startY || (X = !0)), b) {
                            if (M) return void(b = !1);
                            if (X) {
                                x.allowClick = !1, x.emit("onSliderMove", x, a), a.preventDefault(), x.params.touchMoveStopPropagation && !x.params.nested && a.stopPropagation(), C || (s.loop && x.fixLoop(), E = x.getWrapperTranslate(), x.setWrapperTransition(0), x.animating && x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), x.params.autoplay && x.autoplaying && (x.params.autoplayDisableOnInteraction ? x.stopAutoplay() : x.pauseAutoplay()), D = !1, !x.params.grabCursor || x.params.allowSwipeToNext !== !0 && x.params.allowSwipeToPrev !== !0 || x.setGrabCursor(!0)), C = !0;
                                var r = x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY;
                                r *= x.params.touchRatio, x.rtl && (r = -r), x.swipeDirection = r > 0 ? "prev" : "next", P = r + E;
                                var i = !0;
                                if (r > 0 && P > x.minTranslate() ? (i = !1, x.params.resistance && (P = x.minTranslate() - 1 + Math.pow(-x.minTranslate() + E + r, x.params.resistanceRatio))) : r < 0 && P < x.maxTranslate() && (i = !1, x.params.resistance && (P = x.maxTranslate() + 1 - Math.pow(x.maxTranslate() - E - r, x.params.resistanceRatio))), i && (a.preventedByNestedSwiper = !0), !x.params.allowSwipeToNext && "next" === x.swipeDirection && P < E && (P = E), !x.params.allowSwipeToPrev && "prev" === x.swipeDirection && P > E && (P = E), x.params.threshold > 0) { if (!(Math.abs(r) > x.params.threshold || I)) return void(P = E); if (!I) return I = !0, x.touches.startX = x.touches.currentX, x.touches.startY = x.touches.currentY, P = E, void(x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY) }
                                x.params.followFinger && ((x.params.freeMode || x.params.watchSlidesProgress) && x.updateActiveIndex(), x.params.freeMode && (0 === H.length && H.push({ position: x.touches[x.isHorizontal() ? "startX" : "startY"], time: z }), H.push({ position: x.touches[x.isHorizontal() ? "currentX" : "currentY"], time: (new window.Date).getTime() })), x.updateProgress(P), x.setWrapperTranslate(P))
                            }
                        }
                    }
                }
            }, x.onTouchEnd = function(a) {
                if (a.originalEvent && (a = a.originalEvent), S && x.emit("onTouchEnd", x, a), S = !1, b) {
                    x.params.grabCursor && C && b && (x.params.allowSwipeToNext === !0 || x.params.allowSwipeToPrev === !0) && x.setGrabCursor(!1);
                    var t = Date.now(),
                        s = t - z;
                    if (x.allowClick && (x.updateClickedSlide(a), x.emit("onTap", x, a), s < 300 && t - B > 300 && (k && clearTimeout(k), k = setTimeout(function() { x && (x.params.paginationHide && x.paginationContainer.length > 0 && !e(a.target).hasClass(x.params.bulletClass) && x.paginationContainer.toggleClass(x.params.paginationHiddenClass), x.emit("onClick", x, a)) }, 300)), s < 300 && t - B < 300 && (k && clearTimeout(k), x.emit("onDoubleTap", x, a))), B = Date.now(), setTimeout(function() { x && (x.allowClick = !0) }, 0), !b || !C || !x.swipeDirection || 0 === x.touches.diff || P === E) return void(b = C = !1);
                    b = C = !1;
                    var r;
                    if (r = x.params.followFinger ? x.rtl ? x.translate : -x.translate : -P, x.params.freeMode) {
                        if (r < -x.minTranslate()) return void x.slideTo(x.activeIndex);
                        if (r > -x.maxTranslate()) return void(x.slides.length < x.snapGrid.length ? x.slideTo(x.snapGrid.length - 1) : x.slideTo(x.slides.length - 1));
                        if (x.params.freeModeMomentum) {
                            if (H.length > 1) {
                                var i = H.pop(),
                                    n = H.pop(),
                                    o = i.position - n.position,
                                    l = i.time - n.time;
                                x.velocity = o / l, x.velocity = x.velocity / 2, Math.abs(x.velocity) < x.params.freeModeMinimumVelocity && (x.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (x.velocity = 0)
                            } else x.velocity = 0;
                            x.velocity = x.velocity * x.params.freeModeMomentumVelocityRatio, H.length = 0;
                            var p = 1e3 * x.params.freeModeMomentumRatio,
                                d = x.velocity * p,
                                m = x.translate + d;
                            x.rtl && (m = -m);
                            var u, c = !1,
                                g = 20 * Math.abs(x.velocity) * x.params.freeModeMomentumBounceRatio;
                            if (m < x.maxTranslate()) x.params.freeModeMomentumBounce ? (m + x.maxTranslate() < -g && (m = x.maxTranslate() - g), u = x.maxTranslate(), c = !0, D = !0) : m = x.maxTranslate();
                            else if (m > x.minTranslate()) x.params.freeModeMomentumBounce ? (m - x.minTranslate() > g && (m = x.minTranslate() + g), u = x.minTranslate(), c = !0, D = !0) : m = x.minTranslate();
                            else if (x.params.freeModeSticky) {
                                var h, v = 0;
                                for (v = 0; v < x.snapGrid.length; v += 1)
                                    if (x.snapGrid[v] > -m) { h = v; break }
                                m = Math.abs(x.snapGrid[h] - m) < Math.abs(x.snapGrid[h - 1] - m) || "next" === x.swipeDirection ? x.snapGrid[h] : x.snapGrid[h - 1], x.rtl || (m = -m)
                            }
                            if (0 !== x.velocity) p = x.rtl ? Math.abs((-m - x.translate) / x.velocity) : Math.abs((m - x.translate) / x.velocity);
                            else if (x.params.freeModeSticky) return void x.slideReset();
                            x.params.freeModeMomentumBounce && c ? (x.updateProgress(u), x.setWrapperTransition(p), x.setWrapperTranslate(m), x.onTransitionStart(), x.animating = !0, x.wrapper.transitionEnd(function() { x && D && (x.emit("onMomentumBounce", x), x.setWrapperTransition(x.params.speed), x.setWrapperTranslate(u), x.wrapper.transitionEnd(function() { x && x.onTransitionEnd() })) })) : x.velocity ? (x.updateProgress(m), x.setWrapperTransition(p), x.setWrapperTranslate(m), x.onTransitionStart(), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() { x && x.onTransitionEnd() }))) : x.updateProgress(m), x.updateActiveIndex()
                        }
                        return void((!x.params.freeModeMomentum || s >= x.params.longSwipesMs) && (x.updateProgress(), x.updateActiveIndex()))
                    }
                    var f, w = 0,
                        y = x.slidesSizesGrid[0];
                    for (f = 0; f < x.slidesGrid.length; f += x.params.slidesPerGroup) void 0 !== x.slidesGrid[f + x.params.slidesPerGroup] ? r >= x.slidesGrid[f] && r < x.slidesGrid[f + x.params.slidesPerGroup] && (w = f, y = x.slidesGrid[f + x.params.slidesPerGroup] - x.slidesGrid[f]) : r >= x.slidesGrid[f] && (w = f, y = x.slidesGrid[x.slidesGrid.length - 1] - x.slidesGrid[x.slidesGrid.length - 2]);
                    var T = (r - x.slidesGrid[w]) / y;
                    if (s > x.params.longSwipesMs) { if (!x.params.longSwipes) return void x.slideTo(x.activeIndex); "next" === x.swipeDirection && (T >= x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w)), "prev" === x.swipeDirection && (T > 1 - x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w)) } else { if (!x.params.shortSwipes) return void x.slideTo(x.activeIndex); "next" === x.swipeDirection && x.slideTo(w + x.params.slidesPerGroup), "prev" === x.swipeDirection && x.slideTo(w) }
                }
            }, x._slideTo = function(e, a) { return x.slideTo(e, a, !0, !0) }, x.slideTo = function(e, a, t, s) {
                void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), x.snapIndex = Math.floor(e / x.params.slidesPerGroup), x.snapIndex >= x.snapGrid.length && (x.snapIndex = x.snapGrid.length - 1);
                var r = -x.snapGrid[x.snapIndex];
                if (x.params.autoplay && x.autoplaying && (s || !x.params.autoplayDisableOnInteraction ? x.pauseAutoplay(a) : x.stopAutoplay()), x.updateProgress(r), x.params.normalizeSlideIndex)
                    for (var i = 0; i < x.slidesGrid.length; i++) - Math.floor(100 * r) >= Math.floor(100 * x.slidesGrid[i]) && (e = i);
                return !(!x.params.allowSwipeToNext && r < x.translate && r < x.minTranslate()) && (!(!x.params.allowSwipeToPrev && r > x.translate && r > x.maxTranslate() && (x.activeIndex || 0) !== e) && (void 0 === a && (a = x.params.speed), x.previousIndex = x.activeIndex || 0, x.activeIndex = e, x.updateRealIndex(), x.rtl && -r === x.translate || !x.rtl && r === x.translate ? (x.params.autoHeight && x.updateAutoHeight(), x.updateClasses(), "slide" !== x.params.effect && x.setWrapperTranslate(r), !1) : (x.updateClasses(), x.onTransitionStart(t), 0 === a || x.browser.lteIE9 ? (x.setWrapperTranslate(r), x.setWrapperTransition(0), x.onTransitionEnd(t)) : (x.setWrapperTranslate(r), x.setWrapperTransition(a), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() { x && x.onTransitionEnd(t) }))), !0)))
            }, x.onTransitionStart = function(e) { void 0 === e && (e = !0), x.params.autoHeight && x.updateAutoHeight(), x.lazy && x.lazy.onTransitionStart(), e && (x.emit("onTransitionStart", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeStart", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextStart", x) : x.emit("onSlidePrevStart", x))) }, x.onTransitionEnd = function(e) { x.animating = !1, x.setWrapperTransition(0), void 0 === e && (e = !0), x.lazy && x.lazy.onTransitionEnd(), e && (x.emit("onTransitionEnd", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeEnd", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextEnd", x) : x.emit("onSlidePrevEnd", x))), x.params.history && x.history && x.history.setHistory(x.params.history, x.activeIndex), x.params.hashnav && x.hashnav && x.hashnav.setHash() }, x.slideNext = function(e, a, t) {
                if (x.params.loop) {
                    if (x.animating) return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex + x.params.slidesPerGroup, a, e, t)
                }
                return x.slideTo(x.activeIndex + x.params.slidesPerGroup, a, e, t)
            }, x._slideNext = function(e) { return x.slideNext(!0, e, !0) }, x.slidePrev = function(e, a, t) {
                if (x.params.loop) {
                    if (x.animating) return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex - 1, a, e, t)
                }
                return x.slideTo(x.activeIndex - 1, a, e, t)
            }, x._slidePrev = function(e) { return x.slidePrev(!0, e, !0) }, x.slideReset = function(e, a, t) { return x.slideTo(x.activeIndex, a, e) }, x.disableTouchControl = function() { return x.params.onlyExternal = !0, !0 }, x.enableTouchControl = function() { return x.params.onlyExternal = !1, !0 }, x.setWrapperTransition = function(e, a) { x.wrapper.transition(e), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTransition(e), x.params.parallax && x.parallax && x.parallax.setTransition(e), x.params.scrollbar && x.scrollbar && x.scrollbar.setTransition(e), x.params.control && x.controller && x.controller.setTransition(e, a), x.emit("onSetTransition", x, e) }, x.setWrapperTranslate = function(e, a, t) {
                var s = 0,
                    i = 0;
                x.isHorizontal() ? s = x.rtl ? -e : e : i = e, x.params.roundLengths && (s = r(s), i = r(i)), x.params.virtualTranslate || (x.support.transforms3d ? x.wrapper.transform("translate3d(" + s + "px, " + i + "px, 0px)") : x.wrapper.transform("translate(" + s + "px, " + i + "px)")), x.translate = x.isHorizontal() ? s : i;
                var n, o = x.maxTranslate() - x.minTranslate();
                n = 0 === o ? 0 : (e - x.minTranslate()) / o, n !== x.progress && x.updateProgress(e), a && x.updateActiveIndex(), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTranslate(x.translate), x.params.parallax && x.parallax && x.parallax.setTranslate(x.translate), x.params.scrollbar && x.scrollbar && x.scrollbar.setTranslate(x.translate), x.params.control && x.controller && x.controller.setTranslate(x.translate, t), x.emit("onSetTranslate", x, x.translate)
            }, x.getTranslate = function(e, a) { var t, s, r, i; return void 0 === a && (a = "x"), x.params.virtualTranslate ? x.rtl ? -x.translate : x.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = r.transform || r.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function(e) { return e.replace(",", ".") }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), x.rtl && s && (s = -s), s || 0) }, x.getWrapperTranslate = function(e) { return void 0 === e && (e = x.isHorizontal() ? "x" : "y"), x.getTranslate(x.wrapper[0], e) }, x.observers = [], x.initObservers = function() {
                if (x.params.observeParents)
                    for (var e = x.container.parents(), a = 0; a < e.length; a++) o(e[a]);
                o(x.container[0], { childList: !1 }), o(x.wrapper[0], { attributes: !1 })
            }, x.disconnectObservers = function() {
                for (var e = 0; e < x.observers.length; e++) x.observers[e].disconnect();
                x.observers = []
            }, x.createLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove();
                var a = x.wrapper.children("." + x.params.slideClass);
                "auto" !== x.params.slidesPerView || x.params.loopedSlides || (x.params.loopedSlides = a.length), x.loopedSlides = parseInt(x.params.loopedSlides || x.params.slidesPerView, 10), x.loopedSlides = x.loopedSlides + x.params.loopAdditionalSlides, x.loopedSlides > a.length && (x.loopedSlides = a.length);
                var t, s = [],
                    r = [];
                for (a.each(function(t, i) {
                        var n = e(this);
                        t < x.loopedSlides && r.push(i), t < a.length && t >= a.length - x.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t)
                    }), t = 0; t < r.length; t++) x.wrapper.append(e(r[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
                for (t = s.length - 1; t >= 0; t--) x.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass))
            }, x.destroyLoop = function() { x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove(), x.slides.removeAttr("data-swiper-slide-index") }, x.reLoop = function(e) {
                var a = x.activeIndex - x.loopedSlides;
                x.destroyLoop(), x.createLoop(), x.updateSlidesSize(), e && x.slideTo(a + x.loopedSlides, 0, !1)
            }, x.fixLoop = function() {
                var e;
                x.activeIndex < x.loopedSlides ? (e = x.slides.length - 3 * x.loopedSlides + x.activeIndex, e += x.loopedSlides, x.slideTo(e, 0, !1, !0)) : ("auto" === x.params.slidesPerView && x.activeIndex >= 2 * x.loopedSlides || x.activeIndex > x.slides.length - 2 * x.params.slidesPerView) && (e = -x.slides.length + x.activeIndex + x.loopedSlides, e += x.loopedSlides, x.slideTo(e, 0, !1, !0))
            }, x.appendSlide = function(e) {
                if (x.params.loop && x.destroyLoop(), "object" == typeof e && e.length)
                    for (var a = 0; a < e.length; a++) e[a] && x.wrapper.append(e[a]);
                else x.wrapper.append(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0)
            }, x.prependSlide = function(e) {
                x.params.loop && x.destroyLoop();
                var a = x.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var t = 0; t < e.length; t++) e[t] && x.wrapper.prepend(e[t]);
                    a = x.activeIndex + e.length
                } else x.wrapper.prepend(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.slideTo(a, 0, !1)
            }, x.removeSlide = function(e) {
                x.params.loop && (x.destroyLoop(), x.slides = x.wrapper.children("." + x.params.slideClass));
                var a, t = x.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var s = 0; s < e.length; s++) a = e[s], x.slides[a] && x.slides.eq(a).remove(), a < t && t--;
                    t = Math.max(t, 0)
                } else a = e, x.slides[a] && x.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.params.loop ? x.slideTo(t + x.loopedSlides, 0, !1) : x.slideTo(t, 0, !1)
            }, x.removeAllSlides = function() {
                for (var e = [], a = 0; a < x.slides.length; a++) e.push(a);
                x.removeSlide(e)
            }, x.effects = {
                fade: {
                    setTranslate: function() {
                        for (var e = 0; e < x.slides.length; e++) {
                            var a = x.slides.eq(e),
                                t = a[0].swiperSlideOffset,
                                s = -t;
                            x.params.virtualTranslate || (s -= x.translate);
                            var r = 0;
                            x.isHorizontal() || (r = s, s = 0);
                            var i = x.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                            a.css({ opacity: i }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                        }
                    },
                    setTransition: function(e) {
                        if (x.slides.transition(e), x.params.virtualTranslate && 0 !== e) {
                            var a = !1;
                            x.slides.transitionEnd(function() { if (!a && x) { a = !0, x.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) x.wrapper.trigger(e[t]) } })
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var a = 0; a < x.slides.length; a++) {
                            var t = x.slides.eq(a),
                                s = t[0].progress;
                            x.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                            var r = t[0].swiperSlideOffset,
                                i = -180 * s,
                                n = i,
                                o = 0,
                                l = -r,
                                p = 0;
                            if (x.isHorizontal() ? x.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + x.slides.length, x.params.flip.slideShadows) {
                                var d = x.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                    m = x.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === m.length && (m = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(m)), d.length && (d[0].style.opacity = Math.max(-s, 0)), m.length && (m[0].style.opacity = Math.max(s, 0))
                            }
                            t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                        }
                    },
                    setTransition: function(a) {
                        if (x.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), x.params.virtualTranslate && 0 !== a) {
                            var t = !1;
                            x.slides.eq(x.activeIndex).transitionEnd(function() { if (!t && x && e(this).hasClass(x.params.slideActiveClass)) { t = !0, x.animating = !1; for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < a.length; s++) x.wrapper.trigger(a[s]) } })
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var a, t = 0;
                        x.params.cube.shadow && (x.isHorizontal() ? (a = x.wrapper.find(".swiper-cube-shadow"), 0 === a.length && (a = e('<div class="swiper-cube-shadow"></div>'), x.wrapper.append(a)), a.css({ height: x.width + "px" })) : (a = x.container.find(".swiper-cube-shadow"), 0 === a.length && (a = e('<div class="swiper-cube-shadow"></div>'), x.container.append(a))));
                        for (var s = 0; s < x.slides.length; s++) {
                            var r = x.slides.eq(s),
                                i = 90 * s,
                                n = Math.floor(i / 360);
                            x.rtl && (i = -i, n = Math.floor(-i / 360));
                            var o = Math.max(Math.min(r[0].progress, 1), -1),
                                l = 0,
                                p = 0,
                                d = 0;
                            s % 4 == 0 ? (l = 4 * -n * x.size, d = 0) : (s - 1) % 4 == 0 ? (l = 0, d = 4 * -n * x.size) : (s - 2) % 4 == 0 ? (l = x.size + 4 * n * x.size, d = x.size) : (s - 3) % 4 == 0 && (l = -x.size, d = 3 * x.size + 4 * x.size * n), x.rtl && (l = -l), x.isHorizontal() || (p = l, l = 0);
                            var m = "rotateX(" + (x.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (x.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                            if (o <= 1 && o > -1 && (t = 90 * s + 90 * o, x.rtl && (t = 90 * -s - 90 * o)), r.transform(m), x.params.cube.slideShadows) {
                                var u = x.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                                    c = x.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), r.append(u)), 0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(c)), u.length && (u[0].style.opacity = Math.max(-o, 0)), c.length && (c[0].style.opacity = Math.max(o, 0))
                            }
                        }
                        if (x.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + x.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + x.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + x.size / 2 + "px", "transform-origin": "50% 50% -" + x.size / 2 + "px" }), x.params.cube.shadow)
                            if (x.isHorizontal()) a.transform("translate3d(0px, " + (x.width / 2 + x.params.cube.shadowOffset) + "px, " + -x.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + x.params.cube.shadowScale + ")");
                            else {
                                var g = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    h = 1.5 - (Math.sin(2 * g * Math.PI / 360) / 2 + Math.cos(2 * g * Math.PI / 360) / 2),
                                    v = x.params.cube.shadowScale,
                                    f = x.params.cube.shadowScale / h,
                                    w = x.params.cube.shadowOffset;
                                a.transform("scale3d(" + v + ", 1, " + f + ") translate3d(0px, " + (x.height / 2 + w) + "px, " + -x.height / 2 / f + "px) rotateX(-90deg)")
                            }
                        var y = x.isSafari || x.isUiWebView ? -x.size / 2 : 0;
                        x.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (x.isHorizontal() ? 0 : t) + "deg) rotateY(" + (x.isHorizontal() ? -t : 0) + "deg)")
                    },
                    setTransition: function(e) { x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), x.params.cube.shadow && !x.isHorizontal() && x.container.find(".swiper-cube-shadow").transition(e) }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var a = x.translate, t = x.isHorizontal() ? -a + x.width / 2 : -a + x.height / 2, s = x.isHorizontal() ? x.params.coverflow.rotate : -x.params.coverflow.rotate, r = x.params.coverflow.depth, i = 0, n = x.slides.length; i < n; i++) {
                            var o = x.slides.eq(i),
                                l = x.slidesSizesGrid[i],
                                p = o[0].swiperSlideOffset,
                                d = (t - p - l / 2) / l * x.params.coverflow.modifier,
                                m = x.isHorizontal() ? s * d : 0,
                                u = x.isHorizontal() ? 0 : s * d,
                                c = -r * Math.abs(d),
                                g = x.isHorizontal() ? 0 : x.params.coverflow.stretch * d,
                                h = x.isHorizontal() ? x.params.coverflow.stretch * d : 0;
                            Math.abs(h) < .001 && (h = 0), Math.abs(g) < .001 && (g = 0), Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0);
                            var v = "translate3d(" + h + "px," + g + "px," + c + "px)  rotateX(" + u + "deg) rotateY(" + m + "deg)";
                            if (o.transform(v), o[0].style.zIndex = 1 - Math.abs(Math.round(d)), x.params.coverflow.slideShadows) {
                                var f = x.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                    w = x.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                0 === f.length && (f = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), o.append(f)), 0 === w.length && (w = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), f.length && (f[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                            }
                        }
                        if (x.browser.ie) { x.wrapper[0].style.perspectiveOrigin = t + "px 50%" }
                    },
                    setTransition: function(e) { x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e) }
                }
            }, x.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(a, t) {
                    if (void 0 !== a && (void 0 === t && (t = !0), 0 !== x.slides.length)) {
                        var s = x.slides.eq(a),
                            r = s.find("." + x.params.lazyLoadingClass + ":not(." + x.params.lazyStatusLoadedClass + "):not(." + x.params.lazyStatusLoadingClass + ")");
                        !s.hasClass(x.params.lazyLoadingClass) || s.hasClass(x.params.lazyStatusLoadedClass) || s.hasClass(x.params.lazyStatusLoadingClass) || (r = r.add(s[0])), 0 !== r.length && r.each(function() {
                            var a = e(this);
                            a.addClass(x.params.lazyStatusLoadingClass);
                            var r = a.attr("data-background"),
                                i = a.attr("data-src"),
                                n = a.attr("data-srcset"),
                                o = a.attr("data-sizes");
                            x.loadImage(a[0], i || r, n, o, !1, function() {
                                if (void 0 !== x && null !== x && x) {
                                    if (r ? (a.css("background-image", 'url("' + r + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), o && (a.attr("sizes", o), a.removeAttr("data-sizes")), i && (a.attr("src", i), a.removeAttr("data-src"))), a.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass), s.find("." + x.params.lazyPreloaderClass + ", ." + x.params.preloaderClass).remove(), x.params.loop && t) {
                                        var e = s.attr("data-swiper-slide-index");
                                        if (s.hasClass(x.params.slideDuplicateClass)) {
                                            var l = x.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + x.params.slideDuplicateClass + ")");
                                            x.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var p = x.wrapper.children("." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            x.lazy.loadImageInSlide(p.index(), !1)
                                        }
                                    }
                                    x.emit("onLazyImageReady", x, s[0], a[0])
                                }
                            }), x.emit("onLazyImageLoad", x, s[0], a[0])
                        })
                    }
                },
                load: function() {
                    var a, t = x.params.slidesPerView;
                    if ("auto" === t && (t = 0), x.lazy.initialImageLoaded || (x.lazy.initialImageLoaded = !0), x.params.watchSlidesVisibility) x.wrapper.children("." + x.params.slideVisibleClass).each(function() { x.lazy.loadImageInSlide(e(this).index()) });
                    else if (t > 1)
                        for (a = x.activeIndex; a < x.activeIndex + t; a++) x.slides[a] && x.lazy.loadImageInSlide(a);
                    else x.lazy.loadImageInSlide(x.activeIndex);
                    if (x.params.lazyLoadingInPrevNext)
                        if (t > 1 || x.params.lazyLoadingInPrevNextAmount && x.params.lazyLoadingInPrevNextAmount > 1) {
                            var s = x.params.lazyLoadingInPrevNextAmount,
                                r = t,
                                i = Math.min(x.activeIndex + r + Math.max(s, r), x.slides.length),
                                n = Math.max(x.activeIndex - Math.max(r, s), 0);
                            for (a = x.activeIndex + t; a < i; a++) x.slides[a] && x.lazy.loadImageInSlide(a);
                            for (a = n; a < x.activeIndex; a++) x.slides[a] && x.lazy.loadImageInSlide(a)
                        } else {
                            var o = x.wrapper.children("." + x.params.slideNextClass);
                            o.length > 0 && x.lazy.loadImageInSlide(o.index());
                            var l = x.wrapper.children("." + x.params.slidePrevClass);
                            l.length > 0 && x.lazy.loadImageInSlide(l.index())
                        }
                },
                onTransitionStart: function() { x.params.lazyLoading && (x.params.lazyLoadingOnTransitionStart || !x.params.lazyLoadingOnTransitionStart && !x.lazy.initialImageLoaded) && x.lazy.load() },
                onTransitionEnd: function() { x.params.lazyLoading && !x.params.lazyLoadingOnTransitionStart && x.lazy.load() }
            }, x.scrollbar = {
                isTouched: !1,
                setDragPosition: function(e) {
                    var a = x.scrollbar,
                        t = x.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                        s = t - a.track.offset()[x.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                        r = -x.minTranslate() * a.moveDivider,
                        i = -x.maxTranslate() * a.moveDivider;
                    s < r ? s = r : s > i && (s = i), s = -s / a.moveDivider, x.updateProgress(s), x.setWrapperTranslate(s, !0)
                },
                dragStart: function(e) {
                    var a = x.scrollbar;
                    a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), x.params.scrollbarHide && a.track.css("opacity", 1), x.wrapper.transition(100), a.drag.transition(100), x.emit("onScrollbarDragStart", x)
                },
                dragMove: function(e) {
                    var a = x.scrollbar;
                    a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), x.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), x.emit("onScrollbarDragMove", x))
                },
                dragEnd: function(e) {
                    var a = x.scrollbar;
                    a.isTouched && (a.isTouched = !1, x.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() { a.track.css("opacity", 0), a.track.transition(400) }, 1e3)), x.emit("onScrollbarDragEnd", x), x.params.scrollbarSnapOnRelease && x.slideReset())
                },
                draggableEvents: function() { return x.params.simulateTouch !== !1 || x.support.touch ? x.touchEvents : x.touchEventsDesktop }(),
                enableDraggable: function() {
                    var a = x.scrollbar,
                        t = x.support.touch ? a.track : document;
                    e(a.track).on(a.draggableEvents.start, a.dragStart), e(t).on(a.draggableEvents.move, a.dragMove), e(t).on(a.draggableEvents.end, a.dragEnd)
                },
                disableDraggable: function() {
                    var a = x.scrollbar,
                        t = x.support.touch ? a.track : document;
                    e(a.track).off(a.draggableEvents.start, a.dragStart), e(t).off(a.draggableEvents.move, a.dragMove), e(t).off(a.draggableEvents.end, a.dragEnd)
                },
                set: function() {
                    if (x.params.scrollbar) {
                        var a = x.scrollbar;
                        a.track = e(x.params.scrollbar), x.params.uniqueNavElements && "string" == typeof x.params.scrollbar && a.track.length > 1 && 1 === x.container.find(x.params.scrollbar).length && (a.track = x.container.find(x.params.scrollbar)), a.drag = a.track.find(".swiper-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = x.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = x.size / x.virtualSize, a.moveDivider = a.divider * (a.trackSize / x.size), a.dragSize = a.trackSize * a.divider, x.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "", x.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function() {
                    if (x.params.scrollbar) {
                        var e, a = x.scrollbar,
                            t = (x.translate, a.dragSize);
                        e = (a.trackSize - a.dragSize) * x.progress, x.rtl && x.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), x.isHorizontal() ? (x.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (x.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), x.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() { a.track[0].style.opacity = 0, a.track.transition(400) }, 1e3))
                    }
                },
                setTransition: function(e) { x.params.scrollbar && x.scrollbar.drag.transition(e) }
            }, x.controller = {
                LinearSpline: function(e, a) {
                    var t = function() { var e, a, t; return function(s, r) { for (a = -1, e = s.length; e - a > 1;) s[t = e + a >> 1] <= r ? a = t : e = t; return e } }();
                    this.x = e, this.y = a, this.lastIndex = e.length - 1;
                    var s, r;
                    this.x.length;
                    this.interpolate = function(e) { return e ? (r = t(this.x, e), s = r - 1, (e - this.x[s]) * (this.y[r] - this.y[s]) / (this.x[r] - this.x[s]) + this.y[s]) : 0 }
                },
                getInterpolateFunction: function(e) { x.controller.spline || (x.controller.spline = x.params.loop ? new x.controller.LinearSpline(x.slidesGrid, e.slidesGrid) : new x.controller.LinearSpline(x.snapGrid, e.snapGrid)) },
                setTranslate: function(e, t) {
                    function s(a) { e = a.rtl && "horizontal" === a.params.direction ? -x.translate : x.translate, "slide" === x.params.controlBy && (x.controller.getInterpolateFunction(a), i = -x.controller.spline.interpolate(-e)), i && "container" !== x.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (x.maxTranslate() - x.minTranslate()), i = (e - x.minTranslate()) * r + a.minTranslate()), x.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, x), a.updateActiveIndex() }
                    var r, i, n = x.params.control;
                    if (Array.isArray(n))
                        for (var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && s(n[o]);
                    else n instanceof a && t !== n && s(n)
                },
                setTransition: function(e, t) {
                    function s(a) { a.setWrapperTransition(e, x), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() { i && (a.params.loop && "slide" === x.params.controlBy && a.fixLoop(), a.onTransitionEnd()) })) }
                    var r, i = x.params.control;
                    if (Array.isArray(i))
                        for (r = 0; r < i.length; r++) i[r] !== t && i[r] instanceof a && s(i[r]);
                    else i instanceof a && t !== i && s(i)
                }
            }, x.hashnav = {
                onHashCange: function(e, a) {
                    var t = document.location.hash.replace("#", "");
                    t !== x.slides.eq(x.activeIndex).attr("data-hash") && x.slideTo(x.wrapper.children("." + x.params.slideClass + '[data-hash="' + t + '"]').index())
                },
                attachEvents: function(a) {
                    var t = a ? "off" : "on";
                    e(window)[t]("hashchange", x.hashnav.onHashCange)
                },
                setHash: function() {
                    if (x.hashnav.initialized && x.params.hashnav)
                        if (x.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + x.slides.eq(x.activeIndex).attr("data-hash") || "");
                        else {
                            var e = x.slides.eq(x.activeIndex),
                                a = e.attr("data-hash") || e.attr("data-history");
                            document.location.hash = a || ""
                        }
                },
                init: function() {
                    if (x.params.hashnav && !x.params.history) {
                        x.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e)
                            for (var a = 0, t = x.slides.length; a < t; a++) {
                                var s = x.slides.eq(a),
                                    r = s.attr("data-hash") || s.attr("data-history");
                                if (r === e && !s.hasClass(x.params.slideDuplicateClass)) {
                                    var i = s.index();
                                    x.slideTo(i, 0, x.params.runCallbacksOnInit, !0)
                                }
                            }
                        x.params.hashnavWatchState && x.hashnav.attachEvents()
                    }
                },
                destroy: function() { x.params.hashnavWatchState && x.hashnav.attachEvents(!0) }
            }, x.history = {
                init: function() {
                    if (x.params.history) {
                        if (!window.history || !window.history.pushState) return x.params.history = !1, void(x.params.hashnav = !0);
                        x.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, x.params.runCallbacksOnInit), x.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                    }
                },
                setHistoryPopState: function() { x.history.paths = x.history.getPathValues(), x.history.scrollToSlide(x.params.speed, x.history.paths.value, !1) },
                getPathValues: function() {
                    var e = window.location.pathname.slice(1).split("/"),
                        a = e.length;
                    return { key: e[a - 2], value: e[a - 1] }
                },
                setHistory: function(e, a) {
                    if (x.history.initialized && x.params.history) {
                        var t = x.slides.eq(a),
                            s = this.slugify(t.attr("data-history"));
                        window.location.pathname.includes(e) || (s = e + "/" + s), x.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s)
                    }
                },
                slugify: function(e) { return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "") },
                scrollToSlide: function(e, a, t) {
                    if (a)
                        for (var s = 0, r = x.slides.length; s < r; s++) {
                            var i = x.slides.eq(s),
                                n = this.slugify(i.attr("data-history"));
                            if (n === a && !i.hasClass(x.params.slideDuplicateClass)) {
                                var o = i.index();
                                x.slideTo(o, e, t)
                            }
                        } else x.slideTo(0, e, t)
                }
            }, x.disableKeyboardControl = function() { x.params.keyboardControl = !1, e(document).off("keydown", l) }, x.enableKeyboardControl = function() { x.params.keyboardControl = !0, e(document).on("keydown", l) }, x.mousewheel = { event: !1, lastScrollTime: (new window.Date).getTime() }, x.params.mousewheelControl && (x.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = "onwheel" in document;
                if (!e) {
                    var a = document.createElement("div");
                    a.setAttribute("onwheel", "return;"), e = "function" == typeof a.onwheel
                }
                return !e && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e
            }() ? "wheel" : "mousewheel"), x.disableMousewheelControl = function() { if (!x.mousewheel.event) return !1; var a = x.container; return "container" !== x.params.mousewheelEventsTarged && (a = e(x.params.mousewheelEventsTarged)), a.off(x.mousewheel.event, d), x.params.mousewheelControl = !1, !0 }, x.enableMousewheelControl = function() { if (!x.mousewheel.event) return !1; var a = x.container; return "container" !== x.params.mousewheelEventsTarged && (a = e(x.params.mousewheelEventsTarged)), a.on(x.mousewheel.event, d), x.params.mousewheelControl = !0, !0 }, x.parallax = {
                setTranslate: function() {
                    x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() { m(this, x.progress) }), x.slides.each(function() {
                        var a = e(this);
                        a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() { m(this, Math.min(Math.max(a[0].progress, -1), 1)) })
                    })
                },
                setTransition: function(a) {
                    void 0 === a && (a = x.params.speed), x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = e(this),
                            s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || a;
                        0 === a && (s = 0), t.transition(s)
                    })
                }
            }, x.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: { slide: void 0, slideWidth: void 0, slideHeight: void 0, image: void 0, imageWrap: void 0, zoomMax: x.params.zoomMax },
                image: { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} },
                velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 },
                getDistanceBetweenTouches: function(e) {
                    if (e.targetTouches.length < 2) return 1;
                    var a = e.targetTouches[0].pageX,
                        t = e.targetTouches[0].pageY,
                        s = e.targetTouches[1].pageX,
                        r = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - t, 2))
                },
                onGestureStart: function(a) {
                    var t = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchstart" !== a.type || "touchstart" === a.type && a.targetTouches.length < 2) return;
                        t.gesture.scaleStart = t.getDistanceBetweenTouches(a)
                    }
                    if (!(t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = e(this), 0 === t.gesture.slide.length && (t.gesture.slide = x.slides.eq(x.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + x.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || x.params.zoomMax, 0 !== t.gesture.imageWrap.length))) return void(t.gesture.image = void 0);
                    t.gesture.image.transition(0), t.isScaling = !0
                },
                onGestureChange: function(e) {
                    var a = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                        a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
                    }
                    a.gesture.image && 0 !== a.gesture.image.length && (x.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < x.params.zoomMin && (a.scale = x.params.zoomMin + 1 - Math.pow(x.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                },
                onGestureEnd: function(e) { var a = x.zoom;!x.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), x.params.zoomMin), a.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0)) },
                onTouchStart: function(e, a) {
                    var t = e.zoom;
                    t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
                },
                onTouchMove: function(e) {
                    var a = x.zoom;
                    if (a.gesture.image && 0 !== a.gesture.image.length && (x.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                        a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = x.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = x.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), x.rtl && (a.image.startX = -a.image.startX), x.rtl && (a.image.startY = -a.image.startY));
                        var t = a.image.width * a.scale,
                            s = a.image.height * a.scale;
                        if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                            if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) { if (x.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void(a.image.isTouched = !1); if (!x.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void(a.image.isTouched = !1) }
                            e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function(e, a) {
                    var t = e.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length) {
                        if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
                        t.image.isTouched = !1, t.image.isMoved = !1;
                        var s = 300,
                            r = 300,
                            i = t.velocity.x * s,
                            n = t.image.currentX + i,
                            o = t.velocity.y * r,
                            l = t.image.currentY + o;
                        0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (r = Math.abs((l - t.image.currentY) / t.velocity.y));
                        var p = Math.max(s, r);
                        t.image.currentX = n, t.image.currentY = l;
                        var d = t.image.width * t.scale,
                            m = t.image.height * t.scale;
                        t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - m / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function(e) {
                    var a = e.zoom;
                    a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
                },
                toggleZoom: function(a, t) {
                    var s = a.zoom;
                    if (s.gesture.slide || (s.gesture.slide = a.clickedSlide ? e(a.clickedSlide) : a.slides.eq(a.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + a.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
                        var r, i, n, o, l, p, d, m, u, c, g, h, v, f, w, y, x, T;
                        void 0 === s.image.touchesStart.x && t ? (r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, i = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (r = s.image.touchesStart.x, i = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || a.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + x / 2 - r, p = o + T / 2 - i, u = s.gesture.image[0].offsetWidth, c = s.gesture.image[0].offsetHeight, g = u * s.scale, h = c * s.scale, v = Math.min(x / 2 - g / 2, 0), f = Math.min(T / 2 - h / 2, 0), w = -v, y = -f, d = l * s.scale, m = p * s.scale, d < v && (d = v), d > w && (d = w), m < f && (m = f), m > y && (m = y)) : (d = 0, m = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + m + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"))
                    }
                },
                attachEvents: function(a) {
                    var t = a ? "off" : "on";
                    if (x.params.zoom) {
                        var s = (x.slides, !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && { passive: !0, capture: !1 });
                        x.support.gestures ? (x.slides[t]("gesturestart", x.zoom.onGestureStart, s), x.slides[t]("gesturechange", x.zoom.onGestureChange, s), x.slides[t]("gestureend", x.zoom.onGestureEnd, s)) : "touchstart" === x.touchEvents.start && (x.slides[t](x.touchEvents.start, x.zoom.onGestureStart, s), x.slides[t](x.touchEvents.move, x.zoom.onGestureChange, s), x.slides[t](x.touchEvents.end, x.zoom.onGestureEnd, s)), x[t]("touchStart", x.zoom.onTouchStart), x.slides.each(function(a, s) { e(s).find("." + x.params.zoomContainerClass).length > 0 && e(s)[t](x.touchEvents.move, x.zoom.onTouchMove) }), x[t]("touchEnd", x.zoom.onTouchEnd), x[t]("transitionEnd", x.zoom.onTransitionEnd), x.params.zoomToggle && x.on("doubleTap", x.zoom.toggleZoom)
                    }
                },
                init: function() { x.zoom.attachEvents() },
                destroy: function() { x.zoom.attachEvents(!0) }
            }, x._plugins = [];
            for (var Y in x.plugins) {
                var A = x.plugins[Y](x, x.params[Y]);
                A && x._plugins.push(A)
            }
            return x.callPlugins = function(e) { for (var a = 0; a < x._plugins.length; a++) e in x._plugins[a] && x._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) }, x.emitterEventListeners = {}, x.emit = function(e) {
                x.params[e] && x.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (x.emitterEventListeners[e])
                    for (a = 0; a < x.emitterEventListeners[e].length; a++) x.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                x.callPlugins && x.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, x.on = function(e, a) { return e = u(e), x.emitterEventListeners[e] || (x.emitterEventListeners[e] = []), x.emitterEventListeners[e].push(a), x }, x.off = function(e, a) { var t; if (e = u(e), void 0 === a) return x.emitterEventListeners[e] = [], x; if (x.emitterEventListeners[e] && 0 !== x.emitterEventListeners[e].length) { for (t = 0; t < x.emitterEventListeners[e].length; t++) x.emitterEventListeners[e][t] === a && x.emitterEventListeners[e].splice(t, 1); return x } }, x.once = function(e, a) { e = u(e); var t = function() { a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), x.off(e, t) }; return x.on(e, t), x }, x.a11y = {
                makeFocusable: function(e) { return e.attr("tabIndex", "0"), e },
                addRole: function(e, a) { return e.attr("role", a), e },
                addLabel: function(e, a) { return e.attr("aria-label", a), e },
                disable: function(e) { return e.attr("aria-disabled", !0), e },
                enable: function(e) { return e.attr("aria-disabled", !1), e },
                onEnterKey: function(a) { 13 === a.keyCode && (e(a.target).is(x.params.nextButton) ? (x.onClickNext(a), x.isEnd ? x.a11y.notify(x.params.lastSlideMessage) : x.a11y.notify(x.params.nextSlideMessage)) : e(a.target).is(x.params.prevButton) && (x.onClickPrev(a), x.isBeginning ? x.a11y.notify(x.params.firstSlideMessage) : x.a11y.notify(x.params.prevSlideMessage)), e(a.target).is("." + x.params.bulletClass) && e(a.target)[0].click()) },
                liveRegion: e('<span class="' + x.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = x.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() { x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.a11y.makeFocusable(x.nextButton), x.a11y.addRole(x.nextButton, "button"), x.a11y.addLabel(x.nextButton, x.params.nextSlideMessage)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.a11y.makeFocusable(x.prevButton), x.a11y.addRole(x.prevButton, "button"), x.a11y.addLabel(x.prevButton, x.params.prevSlideMessage)), e(x.container).append(x.a11y.liveRegion) },
                initPagination: function() {
                    x.params.pagination && x.params.paginationClickable && x.bullets && x.bullets.length && x.bullets.each(function() {
                        var a = e(this);
                        x.a11y.makeFocusable(a), x.a11y.addRole(a, "button"), x.a11y.addLabel(a, x.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function() { x.a11y.liveRegion && x.a11y.liveRegion.length > 0 && x.a11y.liveRegion.remove() }
            }, x.init = function() { x.params.loop && x.createLoop(), x.updateContainerSize(), x.updateSlidesSize(), x.updatePagination(), x.params.scrollbar && x.scrollbar && (x.scrollbar.set(), x.params.scrollbarDraggable && x.scrollbar.enableDraggable()), "slide" !== x.params.effect && x.effects[x.params.effect] && (x.params.loop || x.updateProgress(), x.effects[x.params.effect].setTranslate()), x.params.loop ? x.slideTo(x.params.initialSlide + x.loopedSlides, 0, x.params.runCallbacksOnInit) : (x.slideTo(x.params.initialSlide, 0, x.params.runCallbacksOnInit), 0 === x.params.initialSlide && (x.parallax && x.params.parallax && x.parallax.setTranslate(), x.lazy && x.params.lazyLoading && (x.lazy.load(), x.lazy.initialImageLoaded = !0))), x.attachEvents(), x.params.observer && x.support.observer && x.initObservers(), x.params.preloadImages && !x.params.lazyLoading && x.preloadImages(), x.params.zoom && x.zoom && x.zoom.init(), x.params.autoplay && x.startAutoplay(), x.params.keyboardControl && x.enableKeyboardControl && x.enableKeyboardControl(), x.params.mousewheelControl && x.enableMousewheelControl && x.enableMousewheelControl(), x.params.hashnavReplaceState && (x.params.replaceState = x.params.hashnavReplaceState), x.params.history && x.history && x.history.init(), x.params.hashnav && x.hashnav && x.hashnav.init(), x.params.a11y && x.a11y && x.a11y.init(), x.emit("onInit", x) }, x.cleanupStyles = function() { x.container.removeClass(x.classNames.join(" ")).removeAttr("style"), x.wrapper.removeAttr("style"), x.slides && x.slides.length && x.slides.removeClass([x.params.slideVisibleClass, x.params.slideActiveClass, x.params.slideNextClass, x.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), x.paginationContainer && x.paginationContainer.length && x.paginationContainer.removeClass(x.params.paginationHiddenClass), x.bullets && x.bullets.length && x.bullets.removeClass(x.params.bulletActiveClass), x.params.prevButton && e(x.params.prevButton).removeClass(x.params.buttonDisabledClass), x.params.nextButton && e(x.params.nextButton).removeClass(x.params.buttonDisabledClass), x.params.scrollbar && x.scrollbar && (x.scrollbar.track && x.scrollbar.track.length && x.scrollbar.track.removeAttr("style"), x.scrollbar.drag && x.scrollbar.drag.length && x.scrollbar.drag.removeAttr("style")) }, x.destroy = function(e, a) { x.detachEvents(), x.stopAutoplay(), x.params.scrollbar && x.scrollbar && x.params.scrollbarDraggable && x.scrollbar.disableDraggable(), x.params.loop && x.destroyLoop(), a && x.cleanupStyles(), x.disconnectObservers(), x.params.zoom && x.zoom && x.zoom.destroy(), x.params.keyboardControl && x.disableKeyboardControl && x.disableKeyboardControl(), x.params.mousewheelControl && x.disableMousewheelControl && x.disableMousewheelControl(), x.params.a11y && x.a11y && x.a11y.destroy(), x.params.history && !x.params.replaceState && window.removeEventListener("popstate", x.history.setHistoryPopState), x.params.hashnav && x.hashnav && x.hashnav.destroy(), x.emit("onDestroy"), e !== !1 && (x = null) }, x.init(), x
        }
    };
    a.prototype = {
        isSafari: function() { var e = window.navigator.userAgent.toLowerCase(); return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0 }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function(e) { return "[object Array]" === Object.prototype.toString.apply(e) },
        browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1, lteIE9: function() { var e = document.createElement("div"); return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length }() },
        device: function() {
            var e = window.navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return { ios: t || r || s, android: a }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() { return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() { var e = document.createElement("div").style; return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() { return "MutationObserver" in window || "WebkitMutationObserver" in window }(),
            passiveListener: function() {
                var e = !1;
                try {
                    var a = Object.defineProperty({}, "passive", { get: function() { e = !0 } });
                    window.addEventListener("testPassiveListener", null, a)
                } catch (e) {}
                return e
            }(),
            gestures: function() { return "ongesturestart" in window }()
        },
        plugins: {}
    };
    for (var t = ["jQuery", "Zepto", "Dom7"], s = 0; s < t.length; s++) window[t[s]] && function(e) {
        e.fn.swiper = function(t) {
            var s;
            return e(this).each(function() {
                var e = new a(this, t);
                s || (s = e)
            }), s
        }
    }(window[t[s]]);
    var r;
    r = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this)
                for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
        }
        var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            r = this;
        if (e)
            for (t = 0; t < s.length; t++) r.on(s[t], a);
        return this
    }), "transform" in r.fn || (r.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    }), "outerWidth" in r.fn || (r.fn.outerWidth = function(e) { return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null })), window.Swiper = a
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() { "use strict"; return window.Swiper });
//# sourceMappingURL=maps/swiper.jquery.min.js.map