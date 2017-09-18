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
});

$(window).resize(function() {
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    productMoreTableRowColor();
    iosSetting();
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaW9zU2V0dGluZygpO1xyXG4gICAgY2F0YWxvZ0ZpbHRlcnMoKTtcclxuICAgIGhlYWRlck1lbnVJdGVtSG92ZXIoKTtcclxuICAgIGNhdGFsb2dDaGVja0JveCgpO1xyXG4gICAgY2F0YWxvZ0FjY29yZGlvbigpO1xyXG4gICAgY2F0YWxvZ1NvcnRpbmcoKTtcclxuICAgIHByb2R1Y3RQaG90b0dhbGVyeSgpO1xyXG4gICAgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yKCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYigpO1xyXG4gICAgb3JkZXJGb3JtKCk7XHJcbiAgICBmb290ZXJNZW51KCk7XHJcbiAgICAkKCdpbWcnKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0pO1xyXG4gICAgaFNjcm9sbCgkKCcuaGVhZGVyX19jYXRhbG9nSXRlbScpLCAkKCcuaGVhZGVyX19jYXRhbG9nJykpO1xyXG4gICAgaFNjcm9sbCgkKCcucG9ydGZvbGlvX19pdGVtJyksICQoJy5wb3J0Zm9saW9fX2l0ZW1Cb3gnKSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZSAnKSwgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJCb3gnKSk7XHJcblxyXG4gICAgbWVkaWFDZW50ZXIoNSwgJCgnLndoeVdlX19iZWxpZWYnKSwgJCgnLndoeVdlX19iZWxpZWZzJyksICQoJy50b3RhbFdpZHRoJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoMywgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbicpKTtcclxuICAgIG1lZGlhQ2VudGVyKDQsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24tLWZ1bGwnKSk7XHJcblxyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gMTAyMykge1xyXG4gICAgICAgIG1lZGlhQ2VudGVyKDgsICQoJy5mb290ZXJfX3BheW1lbnRMaW5rJyksICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpKTtcclxuICAgIH1cclxuICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXIyJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIHBhZ2luYXRpb25DbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQ6ICdsaSdcclxuICAgIH0pO1xyXG4gICAgY2F0YWxvZ0ZpbHRlckJveCgpO1xyXG59KTtcclxuXHJcbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICBtZWRpYUNlbnRlcig1LCAkKCcud2h5V2VfX2JlbGllZicpLCAkKCcud2h5V2VfX2JlbGllZnMnKSwgJCgnLnRvdGFsV2lkdGgnKSk7XHJcbiAgICBtZWRpYUNlbnRlcigzLCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoNCwgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCcpKTtcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDw9IDEwMjMpIHtcclxuICAgICAgICBtZWRpYUNlbnRlcig4LCAkKCcuZm9vdGVyX19wYXltZW50TGluaycpLCAkKCcuZm9vdGVyX19wYXltZW50TGlua3MnKSk7XHJcbiAgICB9XHJcbiAgICBwcm9kdWN0TW9yZVRhYmxlUm93Q29sb3IoKTtcclxuICAgIGlvc1NldHRpbmcoKTtcclxufSk7XHJcblxyXG52YXIgY2F0YWxvZ0ZpbHRlckJveCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tc2xpZGVyJykpIHtcclxuICAgICAgICAgICAgdmFyIHRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gJCgnLmNhdGFsb2dfX29wdGlvbkl0ZW1zJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAkKCcuY2F0YWxvZ19fb3B0aW9uRmluZFByb2R1Y3RCb3gnKS5hZGRDbGFzcygnY2F0YWxvZ19fb3B0aW9uRmluZFByb2R1Y3RCb3gtLWFjdGl2ZScpLmNzcygndG9wJywgdG9wKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zVGl0bGVCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoISgkKHRoaXMpLmNoaWxkcmVuKCcuYWNjb3JkaW9uSWNvbicpLmhhc0NsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKSkpIHtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2dfX29wdGlvbkZpbmRQcm9kdWN0Qm94JykucmVtb3ZlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbkZpbmRQcm9kdWN0Qm94LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nT3B0aW9uUmFuZ2UgPSBmdW5jdGlvbihpZCwgc3RhcnQsIGVuZCwgY3Vyck1pbiwgY3Vyck1heCkge1xyXG4gICAgdmFyIG1pbiA9IHN0YXJ0O1xyXG4gICAgdmFyIG1heCA9IGVuZDtcclxuICAgIHZhciBlbCA9ICQoJy4nICsgaWQpO1xyXG4gICAgdmFyIG1pbkZpZWxkID0gZWwucHJldigpLmZpbmQoJy5jYXRhbG9nX19vcHRpb25zTWluVmFsJyk7XHJcbiAgICB2YXIgbWF4RmllbGQgPSBlbC5wcmV2KCkuZmluZCgnLmNhdGFsb2dfX29wdGlvbnNNYXhWYWwnKTtcclxuXHJcbiAgICB2YXIgbWluRmllbGRGdW5jID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbWluRmllbGQua2V5ZG93bihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5rZXl1cChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCgkKHRoaXMpLnZhbCgpKSA+IHBhcnNlSW50KG1heEZpZWxkLnZhbCgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnNsaWRlcihcIm9wdGlvblwiLCBcInZhbHVlc1wiLCBbbWF4RmllbGQudmFsKCksIG1heEZpZWxkLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnNsaWRlcihcIm9wdGlvblwiLCBcInZhbHVlc1wiLCBbJCh0aGlzKS52YWwoKSwgbWF4RmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQodGhpcykuYmx1cihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChtaW5GaWVsZC52YWwoKSkgPiBwYXJzZUludChtYXhGaWVsZC52YWwoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21heEZpZWxkLnZhbCgpLCBtYXhGaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbkZpZWxkLnZhbChtYXhGaWVsZC52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWluRmllbGQudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG1heEZpZWxkRnVuYyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1heEZpZWxkLmtleWRvd24oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykua2V5dXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQobWluRmllbGQudmFsKCkpID4gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21pbkZpZWxkLnZhbCgpLCBtaW5GaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21pbkZpZWxkLnZhbCgpLCAkKHRoaXMpLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmJsdXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQobWF4RmllbGQudmFsKCkpIDwgcGFyc2VJbnQobWluRmllbGQudmFsKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttaW5GaWVsZC52YWwoKSwgbWluRmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwobWluRmllbGQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heEZpZWxkLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKGVuZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoY3Vyck1pbiAmJiBjdXJyTWF4KSB7XHJcbiAgICAgICAgbWluRmllbGQudmFsKGN1cnJNaW4pO1xyXG4gICAgICAgIG1heEZpZWxkLnZhbChjdXJyTWF4KTtcclxuICAgICAgICBlbC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICB2YWx1ZXM6IFtjdXJyTWluLCBjdXJyTWF4XSxcclxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDApKTtcclxuICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDApKTtcclxuICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWluRmllbGRGdW5jKCk7XHJcbiAgICAgICAgbWF4RmllbGRGdW5jKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbkZpZWxkLnZhbChtaW4pO1xyXG4gICAgICAgIG1heEZpZWxkLnZhbChtYXgpO1xyXG4gICAgICAgIGVsLnNsaWRlcih7XHJcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46IG1pbixcclxuICAgICAgICAgICAgbWF4OiBtYXgsXHJcbiAgICAgICAgICAgIHZhbHVlczogW21pbiwgbWF4XSxcclxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDApKTtcclxuICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDApKTtcclxuICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbC5zbGlkZXIoXCJ2YWx1ZXNcIiwgMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWluRmllbGRGdW5jKCk7XHJcbiAgICAgICAgbWF4RmllbGRGdW5jKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgbWVkaWFDZW50ZXIgPSBmdW5jdGlvbihjb3VudCwgZWxlbSwgYm94LCBib3hDb250cm9sU2l6ZSkge1xyXG4gICAgdmFyIHNpemU7XHJcbiAgICBpZiAoZWxlbS5sZW5ndGggPCBjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGVsZW0ubGVuZ3RoICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChib3hDb250cm9sU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveENvbnRyb2xTaXplLndpZHRoKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94LndpZHRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT0gZWxlbS5sZW5ndGggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIChpIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBjb3VudCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYm94Q29udHJvbFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3hDb250cm9sU2l6ZS53aWR0aCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveC53aWR0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaXplIDwgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgaFNjcm9sbCA9IGZ1bmN0aW9uKGVsLCBlbEIpIHtcclxuICAgIGVsLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciB4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAkKHRoaXMpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHh4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAgICAgaWYgKHh4IDwgeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1clRyID0gZWxCLnNjcm9sbExlZnQoKSArICh4IC0geHgpO1xyXG4gICAgICAgICAgICAgICAgZWxCLnNjcm9sbExlZnQoY3VyVHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4eCA+IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IGVsQi5zY3JvbGxMZWZ0KCkgLSAoeHggLSB4KTtcclxuICAgICAgICAgICAgICAgIGVsQi5zY3JvbGxMZWZ0KGN1clRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsQi5vbignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBlbC51bmJpbmQoJ21vdXNlbW92ZScpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZWwudW5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZWwudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHByb2R1Y3RQaG90b0dhbGVyeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZpcnN0U3JjID0gJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXInKS5lcSgwKS5hdHRyKCdzcmMnKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBmaXJzdFNyYyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UnKS5lcSgwKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIG5lZWRTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBuZWVkU3JjKTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcm93cyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlUm93Jyk7XHJcbiAgICB2YXIgY29sbCA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlQ29sbCcpO1xyXG4gICAgdmFyIGZpcnN0Q29sb3IgPSAnI2Y0ZjRmNCc7XHJcbiAgICB2YXIgc2Vjb25kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICB2YXIgdHJhbnNwYXJlbnQgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPj0gNjAwKSB7XHJcbiAgICAgICAgY29sbC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCB0cmFuc3BhcmVudCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGZpcnN0Q29sb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzZWNvbmRDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvd3MuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgdHJhbnNwYXJlbnQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5maW5kKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuZXEoMCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vjb25kQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5maW5kKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKS5lcSgxKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciBwcm9kdWN0TW9yZVRhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhYnMgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9UYWInKTtcclxuICAgIHZhciBsaW5rcyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rJyk7XHJcblxyXG4gICAgbGlua3Mub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB0YWJzLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRhYnMuZXEoaW5kZXgpLmF0dHIoJ2lkJykgPT09IHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHRhYnMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYnMuZXEoMCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICB2YXIgdGFiSWQwID0gdGFicy5lcSgwKS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIGlmIChsaW5rcy5lcShpbmRleCkuYXR0cignaHJlZicpID09PSB0YWJJZDApIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0NoZWNrQm94ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQWNjb3JkaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoJy5jYXRhbG9nX19vcHRpb25zSXRlbUxpc3QnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dTb3J0aW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fc29ydGluZ1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fc29ydGluZ0xpc3QtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgb3JkZXJGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGhvbmUgPSAkKCcub3JkZXJzX19mb3JtJykuZmluZCgnaW5wdXRbbmFtZT1cInBob25lXCJdJyk7XHJcbiAgICBwaG9uZS5tYXNrKFwiKzcoOTk5KSA5OTktOTktOTlcIik7XHJcblxyXG4gICAgdmFyIGZvcm0gPSAkKCcub3JkZXJzX19mb3JtJyk7XHJcbiAgICB2YXIgdGl0bGVFcnJvciA9ICQoJy5vcmRlcnNfX2Zvcm1FcnJvclRpdGxlJyk7XHJcbiAgICB2YXIgdmlzaW9uVGl0bGVFcnJvciA9IHRpdGxlRXJyb3IuY3NzKCdkaXNwbGF5Jyk7XHJcblxyXG4gICAgaWYgKHZpc2lvblRpdGxlRXJyb3IgPT09ICdibG9jaycpIHtcclxuICAgICAgICBmb3JtLmNzcygnbWFyZ2luLXRvcCcsICc1NXB4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlucHV0UmVxdWlyZSA9ICQoJy5vcmRlcnNfX2Zvcm1JdGVtLS1yZXF1aXJlID4gaW5wdXQnKTtcclxuXHJcbn07XHJcbnZhciBoZWFkZXJNZW51SXRlbUhvdmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmVlZFRvcExlbmdodDtcclxuICAgICQoJy5oZWFkZXJfX2NhdGFsb2dCdG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fY2F0YWxvZ0J0blRleHQnKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX21lbnVMaXN0JykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWZ1bGwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCQoJy5oZWFkZXJfX21lbnVMaXN0JykuaGFzQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb3BMZW5naHQgPSAkKCcuaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykub2Zmc2V0KCkudG9wICsgJCgnLmhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpLmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gbmVlZFRvcExlbmdodCkge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsIGhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5oZWFkZXJfX21lbnVJdGVtJykub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19tZW51TGlzdCcpLmhhc0NsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX21lbnVJdGVtQWZ0ZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xyXG4gICAgICAgICAgICB2YXIgdG9wO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gKC01MCAqIGluZGV4KSArIDQ5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19zdWJNZW51JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IHRvcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJy5oZWFkZXJfX21lbnVJdGVtJykub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX3N1Yk1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0ZpbHRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5maWx0ZXJzQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmNhdGFsb2dfX29wdGlvbnMnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9ucy0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBmb290ZXJNZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuZm9vdGVyX19tZW51VGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaSA9ICQoJy5mb290ZXJfX21lbnUtLWFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgdmFyIGogPSAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS5pbmRleCgpO1xyXG4gICAgICAgIGlmIChqID09PSBpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fbWVudScpLnRvZ2dsZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXJfX21lbnUtLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS50b2dnbGVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgaW9zU2V0dGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCQoJ2h0bWwnKS5oYXNDbGFzcygnaW9zJykpIHtcclxuICAgICAgICAvLyBwcm9kdWN0IGdhbGVyeVxyXG4gICAgICAgIHZhciBiVyA9ICQoJ2JvZHknKS5vdXRlcldpZHRoKCksXHJcbiAgICAgICAgICAgIHBpY0JveCA9ICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW5Cb3gnKTtcclxuICAgICAgICBpZiAoYlcgPD0gNjgwKSB7XHJcbiAgICAgICAgICAgIHBpY0JveC5oZWlnaHQoYlcgKiAwLjY1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
