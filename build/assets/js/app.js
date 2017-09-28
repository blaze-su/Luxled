;
$(document).ready(function () {
    iosSetting();
    catalogFilters();
    headerMenuItemHover();
    catalogCheckBox();
    catalogAccordion();
    catalogSorting();
    productPhotoGalery();
    productMoreTableRowColor();
    catalogTableHeadHeight();
    productMoreTab();
    catalogOptionsTab(2);
    orderForm();
    footerMenu();
    $('img').on('mousedown', function (e) { e.preventDefault(); });
    hScroll($('.header__catalogItem'), $('.header__catalog'));
    hScroll($('.portfolio__item'), $('.portfolio__itemBox'));
    hScroll($('.productMore__galeryPictureOtherCase '), $('.productMore__galeryPictureOtherBox'));

    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    if ($(window).outerWidth() <= 926) {
        mediaCenter(3, $('.catalog__item'), $('.catalog__items--laptop'), $('.catalog__mainSection'));
    } else {
        $('.catalog__items--laptop').css('max-width', '100%');
    }
    mediaCenter(4, $('.catalog__item'), $('.catalog__mainSection--full > .catalog__items--laptop'), $('.catalog__mainSection--full'));

    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    var mySwiper = new Swiper('.swiper2', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationElement: 'li'
    });
    catalogFilterBox();
});

$(window).resize(function () {
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    if ($(window).outerWidth() <= 926) {
        mediaCenter(3, $('.catalog__item'), $('.catalog__items--laptop'), $('.catalog__mainSection'));
    } else {
        $('.catalog__items--laptop').css('max-width', '100%');
    }
    mediaCenter(4, $('.catalog__item'), $('.catalog__mainSection--full > .catalog__items--laptop'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    productMoreTableRowColor();
    catalogTableHeadHeight();
    iosSetting();
});

var catalogTableHeadHeight = function () {
    var head = $('.catalog__itemTableHead'),
        maxH = head.eq(0).height();
    for (var i = 0; i < head.length; i++) {
        if (maxH < head.eq(i).height()) {
            maxH = head.eq(i).height();
        }
    }
    for (var i = 0; i < head.length; i++) {
        head.eq(i).height(maxH);
    }
};

var catalogFilterBox = function () {
    $('.catalog__optionsItem').on('click', function () {
        if (!$(this).hasClass('catalog__optionsItem--slider')) {
            var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
            $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
        }
    });
    $('.catalog__optionsTitleBox').on('click', function () {
        if (!($(this).children('.accordionIcon').hasClass('accordionIcon--active'))) {
            $('.catalog__optionFindProductBox').removeClass('catalog__optionFindProductBox--active');
        }
    });
};

var catalogOptionRange = function (id, start, end, currMin, currMax) {
    var min = start;
    var max = end;
    var el = $('.' + id);
    var minField = el.prev().find('.catalog__optionsMinVal');
    var maxField = el.prev().find('.catalog__optionsMaxVal');

    var minFieldFunc = function () {
        minField.keydown(function () {
            $(this).keyup(function () {
                if (parseInt($(this).val()) > parseInt(maxField.val())) {
                    el.slider("option", "values", [maxField.val(), maxField.val()]);
                } else {
                    el.slider("option", "values", [$(this).val(), maxField.val()]);
                }
            });
            $(this).blur(function () {
                if (parseInt(minField.val()) > parseInt(maxField.val())) {
                    el.slider("option", "values", [maxField.val(), maxField.val()]);
                    minField.val(maxField.val());
                }
                if (minField.val() == '') {
                    minField.val(start);
                }
            });
        });
    };

    var maxFieldFunc = function () {
        maxField.keydown(function () {
            $(this).keyup(function () {
                if (parseInt(minField.val()) > parseInt($(this).val())) {
                    el.slider("option", "values", [minField.val(), minField.val()]);
                } else {
                    el.slider("option", "values", [minField.val(), $(this).val()]);
                }
            });
            $(this).blur(function () {
                if (parseInt(maxField.val()) < parseInt(minField.val())) {
                    el.slider("option", "values", [minField.val(), minField.val()]);
                    maxField.val(minField.val());
                }
                if (maxField.val() == '') {
                    maxField.val(end);
                }
            });
        });
    };

    if (currMin && currMax) {
        minField.val(currMin);
        maxField.val(currMax);
        el.slider({
            range: true,
            min: min,
            max: max,
            values: [currMin, currMax],
            stop: function (event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            },
            slide: function (event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            }
        });
        minFieldFunc();
        maxFieldFunc();
    } else {
        minField.val(min);
        maxField.val(max);
        el.slider({
            range: true,
            min: min,
            max: max,
            values: [min, max],
            stop: function (event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            },
            slide: function (event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            }
        });
        minFieldFunc();
        maxFieldFunc();
    }
};

var mediaCenter = function (count, elem, box, boxControlSize) {
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

var hScroll = function (el, elB) {
    el.on('mousedown', function (e) {
        e.preventDefault();
        var x = e.pageX - $(this).offset().left;
        $(this).on('mousemove', function (e) {
            $(this).on('click', function (e) {
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
        elB.on('mouseup', function () {
            el.unbind('mousemove');
            setTimeout(function () {
                el.unbind('click');
            }, 1);
        });
        elB.on('mouseleave', function () {
            el.unbind('mousemove');
        });
    });
};

var productPhotoGalery = function () {
    var firstSrc = $('.productMore__galeryPictureOther').eq(0).attr('src');
    $('.productMore__galeryPictureMain').attr('src', firstSrc);
    $('.productMore__galeryPictureOtherCase').eq(0).addClass('productMore__galeryPictureOtherCase--active');
    $('.productMore__galeryPictureOther').on('click', function () {

        var needSrc = $(this).attr('src');
        $('.productMore__galeryPictureMain').attr('src', needSrc);

        $('.productMore__galeryPictureOtherCase--active').removeClass('productMore__galeryPictureOtherCase--active');

        $(this).closest('.productMore__galeryPictureOtherCase').addClass('productMore__galeryPictureOtherCase--active');

    });
};

var productMoreTableRowColor = function () {
    var rows = $('.productMore__infoCharacteristicsTableRow');
    var coll = $('.productMore__infoCharacteristicsTableColl');
    var firstColor = '#f4f4f4';
    var secondColor = '#ffffff';
    var transparent = 'transparent';
    if ($(window).outerWidth() >= 600) {
        coll.css('background-color', transparent);
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

var productMoreTab = function () {
    var tabs = $('.productMore__infoTab');
    var links = $('.productMore__infoMenuLink');

    links.on('click', function (e) {
        e.preventDefault();
        $('.productMore__infoMenuLink--active').removeClass('productMore__infoMenuLink--active')
        $(this).addClass('productMore__infoMenuLink--active');
        var path = $(this).attr('href');
        tabs.each(function (index) {
            if (tabs.eq(index).attr('id') === path) {
                tabs.css('display', 'none');
                $(this).css('display', 'block');
            }
        });
    });

    tabs.eq(0).css('display', 'block');
    var tabId0 = tabs.eq(0).attr('id');

    links.each(function (index) {
        if (links.eq(index).attr('href') === tabId0) {
            $(this).addClass('productMore__infoMenuLink--active');
        }
    });
};

var catalogOptionsTab = function (start) {
    var start = start - 1;
    var tabs = $('.catalog__optionsItemModelsBox');
    var links = $('.catalog__optionsItemModelLink');
    links.on('click', function (e) {
        e.preventDefault();
        $('.catalog__optionsItemModelLink--active').removeClass('catalog__optionsItemModelLink--active');
        $(this).addClass('catalog__optionsItemModelLink--active');
        var path = $(this).attr('href');
        tabs.each(function (index) {
            if (tabs.eq(index).attr('id') === path) {
                tabs.css('display', 'none');
                $(this).css('display', 'flex');
            }
        });
    });

    tabs.eq(start).css('display', 'flex');
    var tabId0 = tabs.eq(start).attr('id');

    links.each(function (index) {
        if (links.eq(index).attr('href') === tabId0) {
            $('.catalog__optionsItemModelLink--active').removeClass('catalog__optionsItemModelLink--active')
            $(this).addClass('catalog__optionsItemModelLink--active');
        }
    });
};

var catalogCheckBox = function () {
    $('.catalog__optionsItem').on('click', function () {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('catalog__optionsItem--checked');
        } else {
            $(this).removeClass('catalog__optionsItem--checked');
        }
    });
};

var catalogAccordion = function () {
    $('.catalog__optionsTitleBox').on('click', function () {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).next('.catalog__optionsItemList').toggleClass('catalog__optionsItemList--active');
    });
};

var catalogSorting = function () {
    $('.catalog__sortingTitleBox').on('click', function () {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).next().toggleClass('catalog__sortingList--active');
    });
};

var orderForm = function () {
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
var headerMenuItemHover = function () {
    var needTopLenght;
    $('.header__catalogBtn').on('click', function () {
        if ($('.header__catalogBtnText').css('display') === 'none') {
            $('.header__menuList').toggleClass('header__menuList--full');
        } else {
            $('.header__menuList').toggleClass('header__menuList--active');
        }
        if ($('.header__menuList').hasClass('header__menuList--active')) {
            needTopLenght = $('.header__menuList--active').offset().top + $('.header__menuList--active').height();
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > needTopLenght) {
            $('.header__menuList').removeClass('header__menuList--full header__menuList--active');
        }
    });

    $('.header__menuItem').on('mouseover', function () {
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
    $('.header__menuItem').on('mouseout', function () {
        $(this).find('.header__menuItemAfter').css('display', 'none');
        $(this).find('.header__subMenu').css('display', 'none');
    });
};

var catalogFilters = function () {
    $('.filtersBtn').on('click', function () {
        $('.catalog__options').toggleClass('catalog__options--active');
    });
};

var footerMenu = function () {
    $('.footer__menuTitle').on('click', function () {
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

var iosSetting = function () {
    if ($('html').hasClass('ios')) {
        // product galery
        var bW = $('body').outerWidth(),
            picBox = $('.productMore__galeryPictureMainBox');
        if (bW <= 680) {
            picBox.height(bW * 0.65);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjtcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgaW9zU2V0dGluZygpO1xyXG4gICAgY2F0YWxvZ0ZpbHRlcnMoKTtcclxuICAgIGhlYWRlck1lbnVJdGVtSG92ZXIoKTtcclxuICAgIGNhdGFsb2dDaGVja0JveCgpO1xyXG4gICAgY2F0YWxvZ0FjY29yZGlvbigpO1xyXG4gICAgY2F0YWxvZ1NvcnRpbmcoKTtcclxuICAgIHByb2R1Y3RQaG90b0dhbGVyeSgpO1xyXG4gICAgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yKCk7XHJcbiAgICBjYXRhbG9nVGFibGVIZWFkSGVpZ2h0KCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYigpO1xyXG4gICAgY2F0YWxvZ09wdGlvbnNUYWIoMik7XHJcbiAgICBvcmRlckZvcm0oKTtcclxuICAgIGZvb3Rlck1lbnUoKTtcclxuICAgICQoJ2ltZycpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0pO1xyXG4gICAgaFNjcm9sbCgkKCcuaGVhZGVyX19jYXRhbG9nSXRlbScpLCAkKCcuaGVhZGVyX19jYXRhbG9nJykpO1xyXG4gICAgaFNjcm9sbCgkKCcucG9ydGZvbGlvX19pdGVtJyksICQoJy5wb3J0Zm9saW9fX2l0ZW1Cb3gnKSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZSAnKSwgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJCb3gnKSk7XHJcblxyXG4gICAgbWVkaWFDZW50ZXIoNSwgJCgnLndoeVdlX19iZWxpZWYnKSwgJCgnLndoeVdlX19iZWxpZWZzJyksICQoJy50b3RhbFdpZHRoJykpO1xyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gOTI2KSB7XHJcbiAgICAgICAgbWVkaWFDZW50ZXIoMywgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zLS1sYXB0b3AnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uJykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcuY2F0YWxvZ19faXRlbXMtLWxhcHRvcCcpLmNzcygnbWF4LXdpZHRoJywgJzEwMCUnKTtcclxuICAgIH1cclxuICAgIG1lZGlhQ2VudGVyKDQsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCA+IC5jYXRhbG9nX19pdGVtcy0tbGFwdG9wJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCcpKTtcclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA8PSAxMDIzKSB7XHJcbiAgICAgICAgbWVkaWFDZW50ZXIoOCwgJCgnLmZvb3Rlcl9fcGF5bWVudExpbmsnKSwgJCgnLmZvb3Rlcl9fcGF5bWVudExpbmtzJykpO1xyXG4gICAgfVxyXG4gICAgdmFyIG15U3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlcjInLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICBwYWdpbmF0aW9uRWxlbWVudDogJ2xpJ1xyXG4gICAgfSk7XHJcbiAgICBjYXRhbG9nRmlsdGVyQm94KCk7XHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICBtZWRpYUNlbnRlcig1LCAkKCcud2h5V2VfX2JlbGllZicpLCAkKCcud2h5V2VfX2JlbGllZnMnKSwgJCgnLnRvdGFsV2lkdGgnKSk7XHJcbiAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA8PSA5MjYpIHtcclxuICAgICAgICBtZWRpYUNlbnRlcigzLCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMtLWxhcHRvcCcpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24nKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19pdGVtcy0tbGFwdG9wJykuY3NzKCdtYXgtd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgfVxyXG4gICAgbWVkaWFDZW50ZXIoNCwgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uLS1mdWxsID4gLmNhdGFsb2dfX2l0ZW1zLS1sYXB0b3AnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uLS1mdWxsJykpO1xyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gMTAyMykge1xyXG4gICAgICAgIG1lZGlhQ2VudGVyKDgsICQoJy5mb290ZXJfX3BheW1lbnRMaW5rJyksICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpKTtcclxuICAgIH1cclxuICAgIHByb2R1Y3RNb3JlVGFibGVSb3dDb2xvcigpO1xyXG4gICAgY2F0YWxvZ1RhYmxlSGVhZEhlaWdodCgpO1xyXG4gICAgaW9zU2V0dGluZygpO1xyXG59KTtcclxuXHJcbnZhciBjYXRhbG9nVGFibGVIZWFkSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGhlYWQgPSAkKCcuY2F0YWxvZ19faXRlbVRhYmxlSGVhZCcpLFxyXG4gICAgICAgIG1heEggPSBoZWFkLmVxKDApLmhlaWdodCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWFkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG1heEggPCBoZWFkLmVxKGkpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgIG1heEggPSBoZWFkLmVxKGkpLmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVhZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGhlYWQuZXEoaSkuaGVpZ2h0KG1heEgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGNhdGFsb2dGaWx0ZXJCb3ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tc2xpZGVyJykpIHtcclxuICAgICAgICAgICAgdmFyIHRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gJCgnLmNhdGFsb2dfX29wdGlvbkl0ZW1zJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAkKCcuY2F0YWxvZ19fb3B0aW9uRmluZFByb2R1Y3RCb3gnKS5hZGRDbGFzcygnY2F0YWxvZ19fb3B0aW9uRmluZFByb2R1Y3RCb3gtLWFjdGl2ZScpLmNzcygndG9wJywgdG9wKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zVGl0bGVCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEoJCh0aGlzKS5jaGlsZHJlbignLmFjY29yZGlvbkljb24nKS5oYXNDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveCcpLnJlbW92ZUNsYXNzKCdjYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ09wdGlvblJhbmdlID0gZnVuY3Rpb24gKGlkLCBzdGFydCwgZW5kLCBjdXJyTWluLCBjdXJyTWF4KSB7XHJcbiAgICB2YXIgbWluID0gc3RhcnQ7XHJcbiAgICB2YXIgbWF4ID0gZW5kO1xyXG4gICAgdmFyIGVsID0gJCgnLicgKyBpZCk7XHJcbiAgICB2YXIgbWluRmllbGQgPSBlbC5wcmV2KCkuZmluZCgnLmNhdGFsb2dfX29wdGlvbnNNaW5WYWwnKTtcclxuICAgIHZhciBtYXhGaWVsZCA9IGVsLnByZXYoKS5maW5kKCcuY2F0YWxvZ19fb3B0aW9uc01heFZhbCcpO1xyXG5cclxuICAgIHZhciBtaW5GaWVsZEZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbWluRmllbGQua2V5ZG93bihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KCQodGhpcykudmFsKCkpID4gcGFyc2VJbnQobWF4RmllbGQudmFsKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttYXhGaWVsZC52YWwoKSwgbWF4RmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFskKHRoaXMpLnZhbCgpLCBtYXhGaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh0aGlzKS5ibHVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChtaW5GaWVsZC52YWwoKSkgPiBwYXJzZUludChtYXhGaWVsZC52YWwoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21heEZpZWxkLnZhbCgpLCBtYXhGaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbkZpZWxkLnZhbChtYXhGaWVsZC52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWluRmllbGQudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG1heEZpZWxkRnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtYXhGaWVsZC5rZXlkb3duKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQobWluRmllbGQudmFsKCkpID4gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21pbkZpZWxkLnZhbCgpLCBtaW5GaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21pbkZpZWxkLnZhbCgpLCAkKHRoaXMpLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmJsdXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1heEZpZWxkLnZhbCgpKSA8IHBhcnNlSW50KG1pbkZpZWxkLnZhbCgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnNsaWRlcihcIm9wdGlvblwiLCBcInZhbHVlc1wiLCBbbWluRmllbGQudmFsKCksIG1pbkZpZWxkLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKG1pbkZpZWxkLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXhGaWVsZC52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGN1cnJNaW4gJiYgY3Vyck1heCkge1xyXG4gICAgICAgIG1pbkZpZWxkLnZhbChjdXJyTWluKTtcclxuICAgICAgICBtYXhGaWVsZC52YWwoY3Vyck1heCk7XHJcbiAgICAgICAgZWwuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluLFxyXG4gICAgICAgICAgICBtYXg6IG1heCxcclxuICAgICAgICAgICAgdmFsdWVzOiBbY3Vyck1pbiwgY3Vyck1heF0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIG1pbkZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMCkpO1xyXG4gICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAxKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDApKTtcclxuICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWluRmllbGRGdW5jKCk7XHJcbiAgICAgICAgbWF4RmllbGRGdW5jKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbkZpZWxkLnZhbChtaW4pO1xyXG4gICAgICAgIG1heEZpZWxkLnZhbChtYXgpO1xyXG4gICAgICAgIGVsLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46IG1pbixcclxuICAgICAgICAgICAgbWF4OiBtYXgsXHJcbiAgICAgICAgICAgIHZhbHVlczogW21pbiwgbWF4XSxcclxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIG1pbkZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMCkpO1xyXG4gICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAxKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBtaW5GaWVsZEZ1bmMoKTtcclxuICAgICAgICBtYXhGaWVsZEZ1bmMoKTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBtZWRpYUNlbnRlciA9IGZ1bmN0aW9uIChjb3VudCwgZWxlbSwgYm94LCBib3hDb250cm9sU2l6ZSkge1xyXG4gICAgdmFyIHNpemU7XHJcbiAgICBpZiAoZWxlbS5sZW5ndGggPCBjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGVsZW0ubGVuZ3RoICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChib3hDb250cm9sU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveENvbnRyb2xTaXplLndpZHRoKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94LndpZHRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT0gZWxlbS5sZW5ndGggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIChpIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBjb3VudCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYm94Q29udHJvbFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3hDb250cm9sU2l6ZS53aWR0aCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveC53aWR0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaXplIDwgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgaFNjcm9sbCA9IGZ1bmN0aW9uIChlbCwgZWxCKSB7XHJcbiAgICBlbC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHggPSBlLnBhZ2VYIC0gJCh0aGlzKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICQodGhpcykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB4eCA9IGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIGlmICh4eCA8IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IGVsQi5zY3JvbGxMZWZ0KCkgKyAoeCAtIHh4KTtcclxuICAgICAgICAgICAgICAgIGVsQi5zY3JvbGxMZWZ0KGN1clRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeHggPiB4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyVHIgPSBlbEIuc2Nyb2xsTGVmdCgpIC0gKHh4IC0geCk7XHJcbiAgICAgICAgICAgICAgICBlbEIuc2Nyb2xsTGVmdChjdXJUcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGVsLnVuYmluZCgnbW91c2Vtb3ZlJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZWwudW5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGVsLnVuYmluZCgnbW91c2Vtb3ZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBwcm9kdWN0UGhvdG9HYWxlcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZmlyc3RTcmMgPSAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlcicpLmVxKDApLmF0dHIoJ3NyYycpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlTWFpbicpLmF0dHIoJ3NyYycsIGZpcnN0U3JjKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmVxKDApLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIG5lZWRTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBuZWVkU3JjKTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHJvd3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZVJvdycpO1xyXG4gICAgdmFyIGNvbGwgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKTtcclxuICAgIHZhciBmaXJzdENvbG9yID0gJyNmNGY0ZjQnO1xyXG4gICAgdmFyIHNlY29uZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdmFyIHRyYW5zcGFyZW50ID0gJ3RyYW5zcGFyZW50JztcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpID49IDYwMCkge1xyXG4gICAgICAgIGNvbGwuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgdHJhbnNwYXJlbnQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vjb25kQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByb3dzLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHRyYW5zcGFyZW50KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmZpbmQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlQ29sbCcpLmVxKDApLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlY29uZENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuZXEoMSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGFicyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb1RhYicpO1xyXG4gICAgdmFyIGxpbmtzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmsnKTtcclxuXHJcbiAgICBsaW5rcy5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB0YWJzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0YWJzLmVxKGluZGV4KS5hdHRyKCdpZCcpID09PSBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJzLmVxKDApLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgdmFyIHRhYklkMCA9IHRhYnMuZXEoMCkuYXR0cignaWQnKTtcclxuXHJcbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChsaW5rcy5lcShpbmRleCkuYXR0cignaHJlZicpID09PSB0YWJJZDApIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ09wdGlvbnNUYWIgPSBmdW5jdGlvbiAoc3RhcnQpIHtcclxuICAgIHZhciBzdGFydCA9IHN0YXJ0IC0gMTtcclxuICAgIHZhciB0YWJzID0gJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtTW9kZWxzQm94Jyk7XHJcbiAgICB2YXIgbGlua3MgPSAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW1Nb2RlbExpbmsnKTtcclxuICAgIGxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25zSXRlbU1vZGVsTGluay0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtTW9kZWxMaW5rLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbU1vZGVsTGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB0YWJzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0YWJzLmVxKGluZGV4KS5hdHRyKCdpZCcpID09PSBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYnMuZXEoc3RhcnQpLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICB2YXIgdGFiSWQwID0gdGFicy5lcShzdGFydCkuYXR0cignaWQnKTtcclxuXHJcbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChsaW5rcy5lcShpbmRleCkuYXR0cignaHJlZicpID09PSB0YWJJZDApIHtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtTW9kZWxMaW5rLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW1Nb2RlbExpbmstLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtTW9kZWxMaW5rLS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQ2hlY2tCb3ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJykgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0FjY29yZGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zVGl0bGVCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoJy5jYXRhbG9nX19vcHRpb25zSXRlbUxpc3QnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dTb3J0aW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX3NvcnRpbmdUaXRsZUJveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5hY2NvcmRpb25JY29uJykudG9nZ2xlQ2xhc3MoJ2FjY29yZGlvbkljb24tLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdjYXRhbG9nX19zb3J0aW5nTGlzdC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBvcmRlckZvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcGhvbmUgPSAkKCcub3JkZXJzX19mb3JtJykuZmluZCgnaW5wdXRbbmFtZT1cInBob25lXCJdJyk7XHJcbiAgICBwaG9uZS5tYXNrKFwiKzcoOTk5KSA5OTktOTktOTlcIik7XHJcblxyXG4gICAgdmFyIGZvcm0gPSAkKCcub3JkZXJzX19mb3JtJyk7XHJcbiAgICB2YXIgdGl0bGVFcnJvciA9ICQoJy5vcmRlcnNfX2Zvcm1FcnJvclRpdGxlJyk7XHJcbiAgICB2YXIgdmlzaW9uVGl0bGVFcnJvciA9IHRpdGxlRXJyb3IuY3NzKCdkaXNwbGF5Jyk7XHJcblxyXG4gICAgaWYgKHZpc2lvblRpdGxlRXJyb3IgPT09ICdibG9jaycpIHtcclxuICAgICAgICBmb3JtLmNzcygnbWFyZ2luLXRvcCcsICc1NXB4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlucHV0UmVxdWlyZSA9ICQoJy5vcmRlcnNfX2Zvcm1JdGVtLS1yZXF1aXJlID4gaW5wdXQnKTtcclxuXHJcbn07XHJcbnZhciBoZWFkZXJNZW51SXRlbUhvdmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG5lZWRUb3BMZW5naHQ7XHJcbiAgICAkKCcuaGVhZGVyX19jYXRhbG9nQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19jYXRhbG9nQnRuVGV4dCcpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tZnVsbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX21lbnVMaXN0JykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5oYXNDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgbmVlZFRvcExlbmdodCA9ICQoJy5oZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKS5vZmZzZXQoKS50b3AgKyAkKCcuaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gbmVlZFRvcExlbmdodCkge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsIGhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5oZWFkZXJfX21lbnVJdGVtJykub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5oYXNDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIHRvcDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9ICgtNTAgKiBpbmRleCkgKyA0OTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fc3ViTWVudScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICd0b3AnOiB0b3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX21lbnVJdGVtQWZ0ZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fc3ViTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nRmlsdGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5maWx0ZXJzQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25zJykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgZm9vdGVyTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5mb290ZXJfX21lbnVUaXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaSA9ICQoJy5mb290ZXJfX21lbnUtLWFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgdmFyIGogPSAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS5pbmRleCgpO1xyXG4gICAgICAgIGlmIChqID09PSBpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fbWVudScpLnRvZ2dsZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXJfX21lbnUtLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS50b2dnbGVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgaW9zU2V0dGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKCdodG1sJykuaGFzQ2xhc3MoJ2lvcycpKSB7XHJcbiAgICAgICAgLy8gcHJvZHVjdCBnYWxlcnlcclxuICAgICAgICB2YXIgYlcgPSAkKCdib2R5Jykub3V0ZXJXaWR0aCgpLFxyXG4gICAgICAgICAgICBwaWNCb3ggPSAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluQm94Jyk7XHJcbiAgICAgICAgaWYgKGJXIDw9IDY4MCkge1xyXG4gICAgICAgICAgICBwaWNCb3guaGVpZ2h0KGJXICogMC42NSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
