;
$(document).ready(function() {
    headerMenuItemHover();
    catalogCheckBox();
    catalogAccordion();
    catalogSorting();
    productPhotoGalery();
    productMoreTableColumnColor();
    productMoreTab();
    orderForm();
    slider();
    $('img').on('mousedown', function(e) {
        e.preventDefault();
    });
    hScroll($('.header__catalogItem'), $('.header__catalog'));
});

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
    $('.header__catalogBtn').on('click', function() {
        $(this).next().toggleClass('header__menuList--active');
    });
    $('.header__menuItem').on('mouseover', function() {
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
    });
    $('.header__menuItem').on('mouseout', function() {
        $(this).find('.header__menuItemAfter').css('display', 'none');
        $(this).find('.header__subMenu').css('display', 'none');
    });
};