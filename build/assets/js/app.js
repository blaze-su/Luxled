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
    slider();
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

});

$(window).resize(function() {
    slider();
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
});

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
        $(this).on('mouseup', function() {
            $(this).unbind('mousemove');
            setTimeout(function() {
                el.unbind('click');
            }, 1);
        });
        elB.on('mouseleave', function() {
            el.unbind('mousemove');
        });
    });
};

var slider = function() {
    var slideBox = $('.slider__slideItems');
    var slide = $('.slider__slide');
    var sliderNavBtn = $('.slider__slideNavigationItem');
    var sliderLength = sliderNavBtn.length - 1;
    var _width = slideBox.width();

    sliderNavBtn.on('click', function() {
        $('.slider__slideNavigationItem--active').removeClass('slider__slideNavigationItem--active');
        $(this).addClass('slider__slideNavigationItem--active');
        var _i = $(this).index();
        var shift = _width * _i;
        slideBox.animate({ scrollLeft: shift });
    });

    slide.on('mousedown', function(e) {
        $(this).unbind('mouseup');
        $(this).unbind('mouseleave');
        e.preventDefault();
        var curEl = $(this).index();
        var x = e.pageX - $(this).offset().left;
        var elWidth = slide.width();
        var maxOffset = elWidth / 4;
        var currOffset = 0;
        $(this).on('mousemove', function(e) {
            var xx = e.pageX - $(this).offset().left;
            if (xx < x) {
                var curTr = slideBox.scrollLeft() + (x - xx);
                slideBox.scrollLeft(curTr);
            }
            if (xx > x) {
                var curTr = slideBox.scrollLeft() - (xx - x);
                slideBox.scrollLeft(curTr);
            }
        });
        $(this).on('mouseup', function() {
            $(this).unbind('mousemove');
            $(this).unbind('mouseleave');
            currOffset = $(this).offset().left - 20;
            if (maxOffset < Math.abs(currOffset)) {
                if (currOffset < 0) {
                    sliderNavBtn.eq(curEl + 1).trigger('click');
                } else {
                    sliderNavBtn.eq(curEl - 1).trigger('click');
                }
            } else {
                sliderNavBtn.eq(curEl).trigger('click');
            }
        });
        $(this).on('mouseleave', function() {
            $(this).unbind('mousemove');
            $(this).unbind('mouseup');
            currOffset = $(this).offset().left - 20;
            if (maxOffset < Math.abs(currOffset)) {
                if (currOffset < 0) {
                    sliderNavBtn.eq(curEl + 1).trigger('click');
                } else {
                    sliderNavBtn.eq(curEl - 1).trigger('click');
                }
            } else {
                sliderNavBtn.eq(curEl).trigger('click');
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjtcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAkKCcubWFpbkNvbnRlbnQnKS5jc3MoJ21pbi1oZWlnaHQnLCAoJCh3aW5kb3cpLm91dGVySGVpZ2h0KCkgLSAkKFwiLmZvb3RlclwiKS5vdXRlckhlaWdodCgpKSAtICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgY2F0YWxvZ0ZpbHRlcnMoKTtcclxuICAgIGhlYWRlck1lbnVJdGVtSG92ZXIoKTtcclxuICAgIGNhdGFsb2dDaGVja0JveCgpO1xyXG4gICAgY2F0YWxvZ0FjY29yZGlvbigpO1xyXG4gICAgY2F0YWxvZ1NvcnRpbmcoKTtcclxuICAgIHByb2R1Y3RQaG90b0dhbGVyeSgpO1xyXG4gICAgcHJvZHVjdE1vcmVUYWJsZUNvbHVtbkNvbG9yKCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYigpO1xyXG4gICAgb3JkZXJGb3JtKCk7XHJcbiAgICBzbGlkZXIoKTtcclxuICAgIGZvb3Rlck1lbnUoKTtcclxuICAgICQoJ2ltZycpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5oZWFkZXJfX2NhdGFsb2dJdGVtJyksICQoJy5oZWFkZXJfX2NhdGFsb2cnKSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5wb3J0Zm9saW9fX2l0ZW0nKSwgJCgnLnBvcnRmb2xpb19faXRlbUJveCcpKTtcclxuXHJcbiAgICBtZWRpYUNlbnRlcig1LCAkKCcud2h5V2VfX2JlbGllZicpLCAkKCcud2h5V2VfX2JlbGllZnMnKSwgJCgnLnRvdGFsV2lkdGgnKSk7XHJcbiAgICBtZWRpYUNlbnRlcigzLCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoNCwgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCcpKTtcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDw9IDEwMjMpIHtcclxuICAgICAgICBtZWRpYUNlbnRlcig4LCAkKCcuZm9vdGVyX19wYXltZW50TGluaycpLCAkKCcuZm9vdGVyX19wYXltZW50TGlua3MnKSk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICBzbGlkZXIoKTtcclxuICAgIG1lZGlhQ2VudGVyKDUsICQoJy53aHlXZV9fYmVsaWVmJyksICQoJy53aHlXZV9fYmVsaWVmcycpLCAkKCcudG90YWxXaWR0aCcpKTtcclxuICAgIG1lZGlhQ2VudGVyKDMsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24nKSk7XHJcbiAgICBtZWRpYUNlbnRlcig0LCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uLS1mdWxsJykpO1xyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gMTAyMykge1xyXG4gICAgICAgIG1lZGlhQ2VudGVyKDgsICQoJy5mb290ZXJfX3BheW1lbnRMaW5rJyksICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpKTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgbWVkaWFDZW50ZXIgPSBmdW5jdGlvbihjb3VudCwgZWxlbSwgYm94LCBib3hDb250cm9sU2l6ZSkge1xyXG4gICAgdmFyIHNpemU7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAoY291bnQgKyAxKTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJveENvbnRyb2xTaXplKSB7XHJcbiAgICAgICAgICAgIHNpemUgPSBib3hDb250cm9sU2l6ZS53aWR0aCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNpemUgPSBib3gud2lkdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNpemUgPCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgaFNjcm9sbCA9IGZ1bmN0aW9uKGVsLCBlbEIpIHtcclxuICAgIGVsLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciB4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAkKHRoaXMpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHh4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAgICAgaWYgKHh4IDwgeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1clRyID0gZWxCLnNjcm9sbExlZnQoKSArICh4IC0geHgpO1xyXG4gICAgICAgICAgICAgICAgZWxCLnNjcm9sbExlZnQoY3VyVHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4eCA+IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IGVsQi5zY3JvbGxMZWZ0KCkgLSAoeHggLSB4KTtcclxuICAgICAgICAgICAgICAgIGVsQi5zY3JvbGxMZWZ0KGN1clRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcykub24oJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS51bmJpbmQoJ21vdXNlbW92ZScpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZWwudW5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZWwudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHNsaWRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNsaWRlQm94ID0gJCgnLnNsaWRlcl9fc2xpZGVJdGVtcycpO1xyXG4gICAgdmFyIHNsaWRlID0gJCgnLnNsaWRlcl9fc2xpZGUnKTtcclxuICAgIHZhciBzbGlkZXJOYXZCdG4gPSAkKCcuc2xpZGVyX19zbGlkZU5hdmlnYXRpb25JdGVtJyk7XHJcbiAgICB2YXIgc2xpZGVyTGVuZ3RoID0gc2xpZGVyTmF2QnRuLmxlbmd0aCAtIDE7XHJcbiAgICB2YXIgX3dpZHRoID0gc2xpZGVCb3gud2lkdGgoKTtcclxuXHJcbiAgICBzbGlkZXJOYXZCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnNsaWRlcl9fc2xpZGVOYXZpZ2F0aW9uSXRlbS0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9fc2xpZGVOYXZpZ2F0aW9uSXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2xpZGVyX19zbGlkZU5hdmlnYXRpb25JdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICB2YXIgX2kgPSAkKHRoaXMpLmluZGV4KCk7XHJcbiAgICAgICAgdmFyIHNoaWZ0ID0gX3dpZHRoICogX2k7XHJcbiAgICAgICAgc2xpZGVCb3guYW5pbWF0ZSh7IHNjcm9sbExlZnQ6IHNoaWZ0IH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2xpZGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnVuYmluZCgnbW91c2V1cCcpO1xyXG4gICAgICAgICQodGhpcykudW5iaW5kKCdtb3VzZWxlYXZlJyk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBjdXJFbCA9ICQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICB2YXIgeCA9IGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgdmFyIGVsV2lkdGggPSBzbGlkZS53aWR0aCgpO1xyXG4gICAgICAgIHZhciBtYXhPZmZzZXQgPSBlbFdpZHRoIC8gNDtcclxuICAgICAgICB2YXIgY3Vyck9mZnNldCA9IDA7XHJcbiAgICAgICAgJCh0aGlzKS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgeHggPSBlLnBhZ2VYIC0gJCh0aGlzKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICAgICBpZiAoeHggPCB4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyVHIgPSBzbGlkZUJveC5zY3JvbGxMZWZ0KCkgKyAoeCAtIHh4KTtcclxuICAgICAgICAgICAgICAgIHNsaWRlQm94LnNjcm9sbExlZnQoY3VyVHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4eCA+IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IHNsaWRlQm94LnNjcm9sbExlZnQoKSAtICh4eCAtIHgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVCb3guc2Nyb2xsTGVmdChjdXJUcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoaXMpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS51bmJpbmQoJ21vdXNlbGVhdmUnKTtcclxuICAgICAgICAgICAgY3Vyck9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkubGVmdCAtIDIwO1xyXG4gICAgICAgICAgICBpZiAobWF4T2Zmc2V0IDwgTWF0aC5hYnMoY3Vyck9mZnNldCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyT2Zmc2V0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlck5hdkJ0bi5lcShjdXJFbCArIDEpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlck5hdkJ0bi5lcShjdXJFbCAtIDEpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJOYXZCdG4uZXEoY3VyRWwpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoaXMpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS51bmJpbmQoJ21vdXNldXAnKTtcclxuICAgICAgICAgICAgY3Vyck9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkubGVmdCAtIDIwO1xyXG4gICAgICAgICAgICBpZiAobWF4T2Zmc2V0IDwgTWF0aC5hYnMoY3Vyck9mZnNldCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyT2Zmc2V0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlck5hdkJ0bi5lcShjdXJFbCArIDEpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlck5hdkJ0bi5lcShjdXJFbCAtIDEpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJOYXZCdG4uZXEoY3VyRWwpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHByb2R1Y3RQaG90b0dhbGVyeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZpcnN0U3JjID0gJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXInKS5lcSgwKS5hdHRyKCdzcmMnKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBmaXJzdFNyYyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UnKS5lcSgwKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIG5lZWRTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBuZWVkU3JjKTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWJsZUNvbHVtbkNvbG9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcm93cyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlUm93Jyk7XHJcbiAgICB2YXIgZmlyc3RDb2xvciA9ICcjZjRmNGY0JztcclxuICAgIHZhciBzZWNvbmRDb2xvciA9ICcjZmZmZmZmJztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJvd3MuZXEoaSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzZWNvbmRDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIHByb2R1Y3RNb3JlVGFiID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFicyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb1RhYicpO1xyXG4gICAgdmFyIGxpbmtzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmsnKTtcclxuXHJcbiAgICBsaW5rcy5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJylcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKTtcclxuICAgICAgICB2YXIgcGF0aCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgIHRhYnMuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGFicy5lcShpbmRleCkuYXR0cignaWQnKSA9PT0gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGFicy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGFicy5lcSgwKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIHZhciB0YWJJZDAgPSB0YWJzLmVxKDApLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmsnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGxpbmtzLmVxKGluZGV4KS5hdHRyKCdocmVmJykgPT09IHRhYklkMCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQ2hlY2tCb3ggPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zSXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpID09IHRydWUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dBY2NvcmRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5hY2NvcmRpb25JY29uJykudG9nZ2xlQ2xhc3MoJ2FjY29yZGlvbkljb24tLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtTGlzdCcpLnRvZ2dsZUNsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ1NvcnRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19zb3J0aW5nVGl0bGVCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5hY2NvcmRpb25JY29uJykudG9nZ2xlQ2xhc3MoJ2FjY29yZGlvbkljb24tLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdjYXRhbG9nX19zb3J0aW5nTGlzdC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBvcmRlckZvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwaG9uZSA9ICQoJy5vcmRlcnNfX2Zvcm0nKS5maW5kKCdpbnB1dFtuYW1lPVwicGhvbmVcIl0nKTtcclxuICAgIHBob25lLm1hc2soXCIrNyg5OTkpIDk5OS05OS05OVwiKTtcclxuXHJcbiAgICB2YXIgZm9ybSA9ICQoJy5vcmRlcnNfX2Zvcm0nKTtcclxuICAgIHZhciB0aXRsZUVycm9yID0gJCgnLm9yZGVyc19fZm9ybUVycm9yVGl0bGUnKTtcclxuICAgIHZhciB2aXNpb25UaXRsZUVycm9yID0gdGl0bGVFcnJvci5jc3MoJ2Rpc3BsYXknKTtcclxuXHJcbiAgICBpZiAodmlzaW9uVGl0bGVFcnJvciA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgIGZvcm0uY3NzKCdtYXJnaW4tdG9wJywgJzU1cHgnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5wdXRSZXF1aXJlID0gJCgnLm9yZGVyc19fZm9ybUl0ZW0tLXJlcXVpcmUgPiBpbnB1dCcpO1xyXG5cclxufTtcclxuXHJcbnZhciBoZWFkZXJNZW51SXRlbUhvdmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAkKCdib2R5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYgKCQoJy5oZWFkZXJfX21lbnVMaXN0JykuaGFzQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWZ1bGwnKSkge1xyXG4gICAgLy8gICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsJyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSk7XHJcbiAgICAkKCcuaGVhZGVyX19jYXRhbG9nQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5oZWFkZXJfX2NhdGFsb2dCdG5UZXh0JykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5oYXNDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIHRvcDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9ICgtNTAgKiBpbmRleCkgKyA0OTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fc3ViTWVudScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICd0b3AnOiB0b3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fbWVudUl0ZW1BZnRlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19zdWJNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dGaWx0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuZmlsdGVyc0J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25zJykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgZm9vdGVyTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmZvb3Rlcl9fbWVudVRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGkgPSAkKCcuZm9vdGVyX19tZW51LS1hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgIHZhciBqID0gJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykuaW5kZXgoKTtcclxuICAgICAgICBpZiAoaiA9PT0gaSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS50b2dnbGVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuZm9vdGVyX19tZW51LS1hY3RpdmUnKS5yZW1vdmVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykudG9nZ2xlQ2xhc3MoJ2Zvb3Rlcl9fbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
