;
$(document).ready(function() {
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
    orderForm();
    footerMenu();
    $('img').on('mousedown', function(e) { e.preventDefault(); });
    hScroll($('.header__catalogItem'), $('.header__catalog'));
    hScroll($('.portfolio__item'), $('.portfolio__itemBox'));
    hScroll($('.productMore__galeryPictureOtherCase '), $('.productMore__galeryPictureOtherBox'));

    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    // mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
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
});

$(window).resize(function() {
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    // mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    productMoreTableRowColor();
    catalogTableHeadHeight();
    iosSetting();
});

var catalogTableHeadHeight = function() {
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

var catalogFilterBox = function() {
    $('.catalog__optionsItem').on('click', function() {
        if (!$(this).hasClass('catalog__optionsItem--slider')) {
            var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
            $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
        }
    });
    $('.catalog__optionsTitleBox').on('click', function() {
        if (!($(this).children('.accordionIcon').hasClass('accordionIcon--active'))) {
            $('.catalog__optionFindProductBox').removeClass('catalog__optionFindProductBox--active');
        }
    });
};

var catalogOptionRange = function(id, start, end, currMin, currMax) {
    var min = start;
    var max = end;
    var el = $('.' + id);
    var minField = el.prev().find('.catalog__optionsMinVal');
    var maxField = el.prev().find('.catalog__optionsMaxVal');

    var minFieldFunc = function() {
        minField.keydown(function() {
            $(this).keyup(function() {
                if (parseInt($(this).val()) > parseInt(maxField.val())) {
                    el.slider("option", "values", [maxField.val(), maxField.val()]);
                } else {
                    el.slider("option", "values", [$(this).val(), maxField.val()]);
                }
            });
            $(this).blur(function() {
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

    var maxFieldFunc = function() {
        maxField.keydown(function() {
            $(this).keyup(function() {
                if (parseInt(minField.val()) > parseInt($(this).val())) {
                    el.slider("option", "values", [minField.val(), minField.val()]);
                } else {
                    el.slider("option", "values", [minField.val(), $(this).val()]);
                }
            });
            $(this).blur(function() {
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
            stop: function(event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            },
            slide: function(event, ui) {
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
            stop: function(event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            },
            slide: function(event, ui) {
                minField.val(el.slider("values", 0));
                maxField.val(el.slider("values", 1));
            }
        });
        minFieldFunc();
        maxFieldFunc();
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

var iosSetting = function() {
    if ($('html').hasClass('ios')) {
        // product galery
        var bW = $('body').outerWidth(),
            picBox = $('.productMore__galeryPictureMainBox');
        if (bW <= 680) {
            picBox.height(bW * 0.65);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaW9zU2V0dGluZygpO1xyXG4gICAgY2F0YWxvZ0ZpbHRlcnMoKTtcclxuICAgIGhlYWRlck1lbnVJdGVtSG92ZXIoKTtcclxuICAgIGNhdGFsb2dDaGVja0JveCgpO1xyXG4gICAgY2F0YWxvZ0FjY29yZGlvbigpO1xyXG4gICAgY2F0YWxvZ1NvcnRpbmcoKTtcclxuICAgIHByb2R1Y3RQaG90b0dhbGVyeSgpO1xyXG4gICAgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yKCk7XHJcbiAgICBjYXRhbG9nVGFibGVIZWFkSGVpZ2h0KCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYigpO1xyXG4gICAgb3JkZXJGb3JtKCk7XHJcbiAgICBmb290ZXJNZW51KCk7XHJcbiAgICAkKCdpbWcnKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0pO1xyXG4gICAgaFNjcm9sbCgkKCcuaGVhZGVyX19jYXRhbG9nSXRlbScpLCAkKCcuaGVhZGVyX19jYXRhbG9nJykpO1xyXG4gICAgaFNjcm9sbCgkKCcucG9ydGZvbGlvX19pdGVtJyksICQoJy5wb3J0Zm9saW9fX2l0ZW1Cb3gnKSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZSAnKSwgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJCb3gnKSk7XHJcblxyXG4gICAgbWVkaWFDZW50ZXIoNSwgJCgnLndoeVdlX19iZWxpZWYnKSwgJCgnLndoeVdlX19iZWxpZWZzJyksICQoJy50b3RhbFdpZHRoJykpO1xyXG4gICAgLy8gbWVkaWFDZW50ZXIoMywgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbicpKTtcclxuICAgIG1lZGlhQ2VudGVyKDQsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24tLWZ1bGwnKSk7XHJcblxyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gMTAyMykge1xyXG4gICAgICAgIG1lZGlhQ2VudGVyKDgsICQoJy5mb290ZXJfX3BheW1lbnRMaW5rJyksICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpKTtcclxuICAgIH1cclxuICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXIyJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIHBhZ2luYXRpb25DbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQ6ICdsaSdcclxuICAgIH0pO1xyXG4gICAgY2F0YWxvZ0ZpbHRlckJveCgpO1xyXG59KTtcclxuXHJcbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICBtZWRpYUNlbnRlcig1LCAkKCcud2h5V2VfX2JlbGllZicpLCAkKCcud2h5V2VfX2JlbGllZnMnKSwgJCgnLnRvdGFsV2lkdGgnKSk7XHJcbiAgICAvLyBtZWRpYUNlbnRlcigzLCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoNCwgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCcpKTtcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDw9IDEwMjMpIHtcclxuICAgICAgICBtZWRpYUNlbnRlcig4LCAkKCcuZm9vdGVyX19wYXltZW50TGluaycpLCAkKCcuZm9vdGVyX19wYXltZW50TGlua3MnKSk7XHJcbiAgICB9XHJcbiAgICBwcm9kdWN0TW9yZVRhYmxlUm93Q29sb3IoKTtcclxuICAgIGNhdGFsb2dUYWJsZUhlYWRIZWlnaHQoKTtcclxuICAgIGlvc1NldHRpbmcoKTtcclxufSk7XHJcblxyXG52YXIgY2F0YWxvZ1RhYmxlSGVhZEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhlYWQgPSAkKCcuY2F0YWxvZ19faXRlbVRhYmxlSGVhZCcpLFxyXG4gICAgICAgIG1heEggPSBoZWFkLmVxKDApLmhlaWdodCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWFkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKG1heEggPCBoZWFkLmVxKGkpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgIG1heEggPSBoZWFkLmVxKGkpLmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVhZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGhlYWQuZXEoaSkuaGVpZ2h0KG1heEgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGNhdGFsb2dGaWx0ZXJCb3ggPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zSXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLXNsaWRlcicpKSB7XHJcbiAgICAgICAgICAgIHZhciB0b3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtICQoJy5jYXRhbG9nX19vcHRpb25JdGVtcycpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2dfX29wdGlvbkZpbmRQcm9kdWN0Qm94JykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbkZpbmRQcm9kdWN0Qm94LS1hY3RpdmUnKS5jc3MoJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEoJCh0aGlzKS5jaGlsZHJlbignLmFjY29yZGlvbkljb24nKS5oYXNDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveCcpLnJlbW92ZUNsYXNzKCdjYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ09wdGlvblJhbmdlID0gZnVuY3Rpb24oaWQsIHN0YXJ0LCBlbmQsIGN1cnJNaW4sIGN1cnJNYXgpIHtcclxuICAgIHZhciBtaW4gPSBzdGFydDtcclxuICAgIHZhciBtYXggPSBlbmQ7XHJcbiAgICB2YXIgZWwgPSAkKCcuJyArIGlkKTtcclxuICAgIHZhciBtaW5GaWVsZCA9IGVsLnByZXYoKS5maW5kKCcuY2F0YWxvZ19fb3B0aW9uc01pblZhbCcpO1xyXG4gICAgdmFyIG1heEZpZWxkID0gZWwucHJldigpLmZpbmQoJy5jYXRhbG9nX19vcHRpb25zTWF4VmFsJyk7XHJcblxyXG4gICAgdmFyIG1pbkZpZWxkRnVuYyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1pbkZpZWxkLmtleWRvd24oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykua2V5dXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoJCh0aGlzKS52YWwoKSkgPiBwYXJzZUludChtYXhGaWVsZC52YWwoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21heEZpZWxkLnZhbCgpLCBtYXhGaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgWyQodGhpcykudmFsKCksIG1heEZpZWxkLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmJsdXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQobWluRmllbGQudmFsKCkpID4gcGFyc2VJbnQobWF4RmllbGQudmFsKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttYXhGaWVsZC52YWwoKSwgbWF4RmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwobWF4RmllbGQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pbkZpZWxkLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluRmllbGQudmFsKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBtYXhGaWVsZEZ1bmMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYXhGaWVsZC5rZXlkb3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmtleXVwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1pbkZpZWxkLnZhbCgpKSA+IHBhcnNlSW50KCQodGhpcykudmFsKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttaW5GaWVsZC52YWwoKSwgbWluRmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttaW5GaWVsZC52YWwoKSwgJCh0aGlzKS52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh0aGlzKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1heEZpZWxkLnZhbCgpKSA8IHBhcnNlSW50KG1pbkZpZWxkLnZhbCgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnNsaWRlcihcIm9wdGlvblwiLCBcInZhbHVlc1wiLCBbbWluRmllbGQudmFsKCksIG1pbkZpZWxkLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKG1pbkZpZWxkLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXhGaWVsZC52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGN1cnJNaW4gJiYgY3Vyck1heCkge1xyXG4gICAgICAgIG1pbkZpZWxkLnZhbChjdXJyTWluKTtcclxuICAgICAgICBtYXhGaWVsZC52YWwoY3Vyck1heCk7XHJcbiAgICAgICAgZWwuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluLFxyXG4gICAgICAgICAgICBtYXg6IG1heCxcclxuICAgICAgICAgICAgdmFsdWVzOiBbY3Vyck1pbiwgY3Vyck1heF0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1pbkZpZWxkRnVuYygpO1xyXG4gICAgICAgIG1heEZpZWxkRnVuYygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtaW5GaWVsZC52YWwobWluKTtcclxuICAgICAgICBtYXhGaWVsZC52YWwobWF4KTtcclxuICAgICAgICBlbC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICB2YWx1ZXM6IFttaW4sIG1heF0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1pbkZpZWxkRnVuYygpO1xyXG4gICAgICAgIG1heEZpZWxkRnVuYygpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIG1lZGlhQ2VudGVyID0gZnVuY3Rpb24oY291bnQsIGVsZW0sIGJveCwgYm94Q29udHJvbFNpemUpIHtcclxuICAgIHZhciBzaXplO1xyXG4gICAgaWYgKGVsZW0ubGVuZ3RoIDwgY291bnQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBlbGVtLmxlbmd0aCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYm94Q29udHJvbFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3hDb250cm9sU2l6ZS53aWR0aCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveC53aWR0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09IGVsZW0ubGVuZ3RoICsgMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNpemUgPCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIChpIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gY291bnQgKyAxOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJveENvbnRyb2xTaXplKSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94Q29udHJvbFNpemUud2lkdGgoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3gud2lkdGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGhTY3JvbGwgPSBmdW5jdGlvbihlbCwgZWxCKSB7XHJcbiAgICBlbC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgeCA9IGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgJCh0aGlzKS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB4eCA9IGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIGlmICh4eCA8IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IGVsQi5zY3JvbGxMZWZ0KCkgKyAoeCAtIHh4KTtcclxuICAgICAgICAgICAgICAgIGVsQi5zY3JvbGxMZWZ0KGN1clRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeHggPiB4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyVHIgPSBlbEIuc2Nyb2xsTGVmdCgpIC0gKHh4IC0geCk7XHJcbiAgICAgICAgICAgICAgICBlbEIuc2Nyb2xsTGVmdChjdXJUcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZWwudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGVsLnVuYmluZCgnY2xpY2snKTtcclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxCLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsLnVuYmluZCgnbW91c2Vtb3ZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBwcm9kdWN0UGhvdG9HYWxlcnkgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBmaXJzdFNyYyA9ICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyJykuZXEoMCkuYXR0cignc3JjJyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluJykuYXR0cignc3JjJywgZmlyc3RTcmMpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlJykuZXEoMCkuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBuZWVkU3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluJykuYXR0cignc3JjJywgbmVlZFNyYyk7XHJcblxyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UnKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHByb2R1Y3RNb3JlVGFibGVSb3dDb2xvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJvd3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZVJvdycpO1xyXG4gICAgdmFyIGNvbGwgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKTtcclxuICAgIHZhciBmaXJzdENvbG9yID0gJyNmNGY0ZjQnO1xyXG4gICAgdmFyIHNlY29uZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdmFyIHRyYW5zcGFyZW50ID0gJ3RyYW5zcGFyZW50JztcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpID49IDYwMCkge1xyXG4gICAgICAgIGNvbGwuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgdHJhbnNwYXJlbnQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vjb25kQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByb3dzLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHRyYW5zcGFyZW50KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmZpbmQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlQ29sbCcpLmVxKDApLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlY29uZENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuZXEoMSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YWJzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvVGFiJyk7XHJcbiAgICB2YXIgbGlua3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluaycpO1xyXG5cclxuICAgIGxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKVxyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpO1xyXG4gICAgICAgIHZhciBwYXRoID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgdGFicy5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0YWJzLmVxKGluZGV4KS5hdHRyKCdpZCcpID09PSBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJzLmVxKDApLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgdmFyIHRhYklkMCA9IHRhYnMuZXEoMCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluaycpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICBpZiAobGlua3MuZXEoaW5kZXgpLmF0dHIoJ2hyZWYnKSA9PT0gdGFiSWQwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dDaGVja0JveCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJykgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0FjY29yZGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNUaXRsZUJveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGlvbkljb24nKS50b2dnbGVDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0JykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtTGlzdC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nU29ydGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX3NvcnRpbmdUaXRsZUJveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGlvbkljb24nKS50b2dnbGVDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX3NvcnRpbmdMaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIG9yZGVyRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBob25lID0gJCgnLm9yZGVyc19fZm9ybScpLmZpbmQoJ2lucHV0W25hbWU9XCJwaG9uZVwiXScpO1xyXG4gICAgcGhvbmUubWFzayhcIis3KDk5OSkgOTk5LTk5LTk5XCIpO1xyXG5cclxuICAgIHZhciBmb3JtID0gJCgnLm9yZGVyc19fZm9ybScpO1xyXG4gICAgdmFyIHRpdGxlRXJyb3IgPSAkKCcub3JkZXJzX19mb3JtRXJyb3JUaXRsZScpO1xyXG4gICAgdmFyIHZpc2lvblRpdGxlRXJyb3IgPSB0aXRsZUVycm9yLmNzcygnZGlzcGxheScpO1xyXG5cclxuICAgIGlmICh2aXNpb25UaXRsZUVycm9yID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgZm9ybS5jc3MoJ21hcmdpbi10b3AnLCAnNTVweCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbnB1dFJlcXVpcmUgPSAkKCcub3JkZXJzX19mb3JtSXRlbS0tcmVxdWlyZSA+IGlucHV0Jyk7XHJcblxyXG59O1xyXG52YXIgaGVhZGVyTWVudUl0ZW1Ib3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5lZWRUb3BMZW5naHQ7XHJcbiAgICAkKCcuaGVhZGVyX19jYXRhbG9nQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5oZWFkZXJfX2NhdGFsb2dCdG5UZXh0JykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19tZW51TGlzdCcpLmhhc0NsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBuZWVkVG9wTGVuZ2h0ID0gJCgnLmhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpLm9mZnNldCgpLnRvcCArICQoJy5oZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKS5oZWlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IG5lZWRUb3BMZW5naHQpIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tZnVsbCBoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5oYXNDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIHRvcDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9ICgtNTAgKiBpbmRleCkgKyA0OTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fc3ViTWVudScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICd0b3AnOiB0b3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fbWVudUl0ZW1BZnRlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19zdWJNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dGaWx0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuZmlsdGVyc0J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25zJykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgZm9vdGVyTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmZvb3Rlcl9fbWVudVRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGkgPSAkKCcuZm9vdGVyX19tZW51LS1hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgIHZhciBqID0gJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykuaW5kZXgoKTtcclxuICAgICAgICBpZiAoaiA9PT0gaSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS50b2dnbGVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuZm9vdGVyX19tZW51LS1hY3RpdmUnKS5yZW1vdmVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykudG9nZ2xlQ2xhc3MoJ2Zvb3Rlcl9fbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGlvc1NldHRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICgkKCdodG1sJykuaGFzQ2xhc3MoJ2lvcycpKSB7XHJcbiAgICAgICAgLy8gcHJvZHVjdCBnYWxlcnlcclxuICAgICAgICB2YXIgYlcgPSAkKCdib2R5Jykub3V0ZXJXaWR0aCgpLFxyXG4gICAgICAgICAgICBwaWNCb3ggPSAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluQm94Jyk7XHJcbiAgICAgICAgaWYgKGJXIDw9IDY4MCkge1xyXG4gICAgICAgICAgICBwaWNCb3guaGVpZ2h0KGJXICogMC42NSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
