;
$(document).ready(function() {
    // $('.mainContent').css('min-height', ($(window).outerHeight() - $(".footer").outerHeight()) - $(".header").outerHeight());
    catalogFilters();
    headerMenuItemHover();
    catalogCheckBox();
    catalogAccordion();
    catalogSorting();
    productPhotoGalery();
    productMoreTableRowColor();
    productMoreTab();
    orderForm();
    footerMenu();
    $('img').on('mousedown', function(e) { e.preventDefault(); });
    hScroll($('.header__catalogItem'), $('.header__catalog'));
    hScroll($('.portfolio__item'), $('.portfolio__itemBox'));
    hScroll($('.productMore__galeryPictureOtherCase '), $('.productMore__galeryPictureOtherBox'));

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
    catalogFilterBox();
    catalogOptionRange(0, 500, 100, 200);
});

$(window).resize(function() {
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    productMoreTableRowColor();
});

var catalogFilterBox = function() {
    $('.catalog__optionsItem').on('click', function() {
        var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
        $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
    });
    $('.catalog__optionsTitleBox').on('click', function() {
        if (!($(this).children('.accordionIcon').hasClass('accordionIcon--active'))) {
            $('.catalog__optionFindProductBox').removeClass('catalog__optionFindProductBox--active');
        }
    });
};

var catalogOptionRange = function(start, end, currMin, currMax) {
    var min = start;
    var max = end;
    var minField = $('.catalog__optionsMinVal');
    var maxField = $('.catalog__optionsMaxVal');

    // var blurFunc = function(minV, maxV) {
    //     maxField.blur(function(minV, maxV) {
    //         currVal = parseInt($(this).val());
    //         $("#slider-range").slider({
    //             range: true,
    //             min: min,
    //             max: max,
    //             values: [minV, currVal],
    //             slide: function(event, ui) {
    //                 minField.val(ui.values[0]);
    //                 maxField.val(ui.values[1]);
    //             }
    //         });
    //     });

    //     minField.blur(function(minV, maxV) {
    //         currVal = parseInt($(this).val());
    //         $("#slider-range").slider({
    //             range: true,
    //             min: min,
    //             max: max,
    //             values: [currVal, maxV],
    //             slide: function(event, ui) {
    //                 minField.val(ui.values[0]);
    //                 maxField.val(ui.values[1]);
    //             }
    //         });
    //     });
    // };

    if (currMin && currMax) {
        minField.val(currMin);
        maxField.val(currMax);
        $("#slider-range").slider({
            range: true,
            min: min,
            max: max,
            values: [currMin, currMax],
            slide: function(event, ui) {
                minField.val(ui.values[0]);
                maxField.val(ui.values[1]);
            }
        });
        // blurFunc(currMin, currMax);
    } else {
        minField.val(min);
        maxField.val(max);
        $("#slider-range").slider({
            range: true,
            min: min,
            max: max,
            values: [min, max],
            slide: function(event, ui) {
                minField.val(ui.values[0]);
                maxField.val(ui.values[1]);
            }
        });
        // blurFunc(min, max);
    }
};

var mediaCenter = function(count, elem, box, boxControlSize) {
    var size;
    if (elem.length < count) {
        for (var i = 1; i <= elem.length + 1; i++) {
            if (boxControlSize) {
                size = boxControlSize.width();
            } else {
                size = box.width();
            }
            if (i == elem.length + 1) {
                if (i == 1) {
                    box.css('max-width', elem.outerWidth(true) * i);
                } else {
                    box.css('max-width', elem.outerWidth(true) * (i - 1));
                }
                break
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
    } else {
        for (var i = 1; i <= count + 1; i++) {
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

var productMoreTableRowColor = function() {
    var rows = $('.productMore__infoCharacteristicsTableRow');
    var firstColor = '#f4f4f4';
    var secondColor = '#ffffff';
    var transparent = 'transparent';
    if ($(window).outerWidth() >= 600) {
        for (var i = 0; i < rows.length; i++) {
            if (i % 2 == 0) {
                rows.eq(i).css('background-color', firstColor);
            } else {
                rows.eq(i).css('background-color', secondColor);
            }
        }
    } else {
        rows.css('background-color', transparent);
        for (var i = 0; i < rows.length; i++) {
            if (i === 0) {
                rows.eq(i).find('.productMore__infoCharacteristicsTableColl').css('background-color', firstColor);
            } else {
                rows.eq(i).find('.productMore__infoCharacteristicsTableColl').eq(0).css('background-color', secondColor);
                rows.eq(i).find('.productMore__infoCharacteristicsTableColl').eq(1).css('background-color', firstColor);
            }
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
    $('.catalog__optionsTitleBox').on('click', function() {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).next('.catalog__optionsItemList').toggleClass('catalog__optionsItemList--active');
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
    var needTopLenght;
    $('.header__catalogBtn').on('click', function() {
        if ($('.header__catalogBtnText').css('display') === 'none') {
            $('.header__menuList').toggleClass('header__menuList--full');
        } else {
            $('.header__menuList').toggleClass('header__menuList--active');
        }
        if ($('.header__menuList').hasClass('header__menuList--active')) {
            needTopLenght = $('.header__menuList--active').offset().top + $('.header__menuList--active').height();
        }
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > needTopLenght) {
            $('.header__menuList').removeClass('header__menuList--full header__menuList--active');
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