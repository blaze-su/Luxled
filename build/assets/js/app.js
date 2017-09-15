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

var iosSetting = function() {
    if ($('html').hasClass('ios')) {
        // product galery
        var bW = $('body').outerWidth(),
            picBox = $('.productMore__galeryPictureMainBox');
        if (bW <= 680) {
            picBox.height(bW * 0.65);
        }
        // footer
        var el = $('.footer__paymentLink'),
            elWidth = el.outerWidth(),
            elHeight = el.height(),
            elLength = $('.footer__paymentLink').length - 1,
            container = $('.footer__paymentLinks'),
            containerWidth = container.outerWidth();
        if (elWidth * elLength > containerWidth) {
            var n = Math.floor(containerWidth / (elWidth * elLength)),
                needHeight = (Math.floor(elLength / n) + 1) * elHeight;

            container.height(needHeight);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIGlvc1NldHRpbmcoKTtcclxuICAgIGNhdGFsb2dGaWx0ZXJzKCk7XHJcbiAgICBoZWFkZXJNZW51SXRlbUhvdmVyKCk7XHJcbiAgICBjYXRhbG9nQ2hlY2tCb3goKTtcclxuICAgIGNhdGFsb2dBY2NvcmRpb24oKTtcclxuICAgIGNhdGFsb2dTb3J0aW5nKCk7XHJcbiAgICBwcm9kdWN0UGhvdG9HYWxlcnkoKTtcclxuICAgIHByb2R1Y3RNb3JlVGFibGVSb3dDb2xvcigpO1xyXG4gICAgcHJvZHVjdE1vcmVUYWIoKTtcclxuICAgIG9yZGVyRm9ybSgpO1xyXG4gICAgZm9vdGVyTWVudSgpO1xyXG4gICAgJCgnaW1nJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9KTtcclxuICAgIGhTY3JvbGwoJCgnLmhlYWRlcl9fY2F0YWxvZ0l0ZW0nKSwgJCgnLmhlYWRlcl9fY2F0YWxvZycpKTtcclxuICAgIGhTY3JvbGwoJCgnLnBvcnRmb2xpb19faXRlbScpLCAkKCcucG9ydGZvbGlvX19pdGVtQm94JykpO1xyXG4gICAgaFNjcm9sbCgkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UgJyksICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQm94JykpO1xyXG5cclxuICAgIG1lZGlhQ2VudGVyKDUsICQoJy53aHlXZV9fYmVsaWVmJyksICQoJy53aHlXZV9fYmVsaWVmcycpLCAkKCcudG90YWxXaWR0aCcpKTtcclxuICAgIG1lZGlhQ2VudGVyKDMsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24nKSk7XHJcbiAgICBtZWRpYUNlbnRlcig0LCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uLS1mdWxsJykpO1xyXG5cclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDw9IDEwMjMpIHtcclxuICAgICAgICBtZWRpYUNlbnRlcig4LCAkKCcuZm9vdGVyX19wYXltZW50TGluaycpLCAkKCcuZm9vdGVyX19wYXltZW50TGlua3MnKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyMicsIHtcclxuICAgICAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICBwYWdpbmF0aW9uQ2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIHBhZ2luYXRpb25FbGVtZW50OiAnbGknXHJcbiAgICB9KTtcclxuICAgIGNhdGFsb2dGaWx0ZXJCb3goKTtcclxufSk7XHJcblxyXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgbWVkaWFDZW50ZXIoNSwgJCgnLndoeVdlX19iZWxpZWYnKSwgJCgnLndoeVdlX19iZWxpZWZzJyksICQoJy50b3RhbFdpZHRoJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoMywgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbicpKTtcclxuICAgIG1lZGlhQ2VudGVyKDQsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24tLWZ1bGwnKSk7XHJcbiAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA8PSAxMDIzKSB7XHJcbiAgICAgICAgbWVkaWFDZW50ZXIoOCwgJCgnLmZvb3Rlcl9fcGF5bWVudExpbmsnKSwgJCgnLmZvb3Rlcl9fcGF5bWVudExpbmtzJykpO1xyXG4gICAgfVxyXG4gICAgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yKCk7XHJcbiAgICBpb3NTZXR0aW5nKCk7XHJcbn0pO1xyXG5cclxudmFyIGNhdGFsb2dGaWx0ZXJCb3ggPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zSXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLXNsaWRlcicpKSB7XHJcbiAgICAgICAgICAgIHZhciB0b3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtICQoJy5jYXRhbG9nX19vcHRpb25JdGVtcycpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2dfX29wdGlvbkZpbmRQcm9kdWN0Qm94JykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbkZpbmRQcm9kdWN0Qm94LS1hY3RpdmUnKS5jc3MoJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEoJCh0aGlzKS5jaGlsZHJlbignLmFjY29yZGlvbkljb24nKS5oYXNDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveCcpLnJlbW92ZUNsYXNzKCdjYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ09wdGlvblJhbmdlID0gZnVuY3Rpb24oaWQsIHN0YXJ0LCBlbmQsIGN1cnJNaW4sIGN1cnJNYXgpIHtcclxuICAgIHZhciBtaW4gPSBzdGFydDtcclxuICAgIHZhciBtYXggPSBlbmQ7XHJcbiAgICB2YXIgZWwgPSAkKCcuJyArIGlkKTtcclxuICAgIHZhciBtaW5GaWVsZCA9IGVsLnByZXYoKS5maW5kKCcuY2F0YWxvZ19fb3B0aW9uc01pblZhbCcpO1xyXG4gICAgdmFyIG1heEZpZWxkID0gZWwucHJldigpLmZpbmQoJy5jYXRhbG9nX19vcHRpb25zTWF4VmFsJyk7XHJcblxyXG4gICAgdmFyIG1pbkZpZWxkRnVuYyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1pbkZpZWxkLmtleWRvd24oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykua2V5dXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoJCh0aGlzKS52YWwoKSkgPiBwYXJzZUludChtYXhGaWVsZC52YWwoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgW21heEZpZWxkLnZhbCgpLCBtYXhGaWVsZC52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5zbGlkZXIoXCJvcHRpb25cIiwgXCJ2YWx1ZXNcIiwgWyQodGhpcykudmFsKCksIG1heEZpZWxkLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmJsdXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQobWluRmllbGQudmFsKCkpID4gcGFyc2VJbnQobWF4RmllbGQudmFsKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttYXhGaWVsZC52YWwoKSwgbWF4RmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgICAgICBtaW5GaWVsZC52YWwobWF4RmllbGQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pbkZpZWxkLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluRmllbGQudmFsKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBtYXhGaWVsZEZ1bmMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYXhGaWVsZC5rZXlkb3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmtleXVwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1pbkZpZWxkLnZhbCgpKSA+IHBhcnNlSW50KCQodGhpcykudmFsKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttaW5GaWVsZC52YWwoKSwgbWluRmllbGQudmFsKCldKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2xpZGVyKFwib3B0aW9uXCIsIFwidmFsdWVzXCIsIFttaW5GaWVsZC52YWwoKSwgJCh0aGlzKS52YWwoKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh0aGlzKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1heEZpZWxkLnZhbCgpKSA8IHBhcnNlSW50KG1pbkZpZWxkLnZhbCgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnNsaWRlcihcIm9wdGlvblwiLCBcInZhbHVlc1wiLCBbbWluRmllbGQudmFsKCksIG1pbkZpZWxkLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKG1pbkZpZWxkLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtYXhGaWVsZC52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEZpZWxkLnZhbChlbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGN1cnJNaW4gJiYgY3Vyck1heCkge1xyXG4gICAgICAgIG1pbkZpZWxkLnZhbChjdXJyTWluKTtcclxuICAgICAgICBtYXhGaWVsZC52YWwoY3Vyck1heCk7XHJcbiAgICAgICAgZWwuc2xpZGVyKHtcclxuICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluLFxyXG4gICAgICAgICAgICBtYXg6IG1heCxcclxuICAgICAgICAgICAgdmFsdWVzOiBbY3Vyck1pbiwgY3Vyck1heF0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1pbkZpZWxkRnVuYygpO1xyXG4gICAgICAgIG1heEZpZWxkRnVuYygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtaW5GaWVsZC52YWwobWluKTtcclxuICAgICAgICBtYXhGaWVsZC52YWwobWF4KTtcclxuICAgICAgICBlbC5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICB2YWx1ZXM6IFttaW4sIG1heF0sXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKGVsLnNsaWRlcihcInZhbHVlc1wiLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwoZWwuc2xpZGVyKFwidmFsdWVzXCIsIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1pbkZpZWxkRnVuYygpO1xyXG4gICAgICAgIG1heEZpZWxkRnVuYygpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIG1lZGlhQ2VudGVyID0gZnVuY3Rpb24oY291bnQsIGVsZW0sIGJveCwgYm94Q29udHJvbFNpemUpIHtcclxuICAgIHZhciBzaXplO1xyXG4gICAgaWYgKGVsZW0ubGVuZ3RoIDwgY291bnQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBlbGVtLmxlbmd0aCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYm94Q29udHJvbFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3hDb250cm9sU2l6ZS53aWR0aCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveC53aWR0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09IGVsZW0ubGVuZ3RoICsgMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNpemUgPCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIChpIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gY291bnQgKyAxOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJveENvbnRyb2xTaXplKSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94Q29udHJvbFNpemUud2lkdGgoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3gud2lkdGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGhTY3JvbGwgPSBmdW5jdGlvbihlbCwgZWxCKSB7XHJcbiAgICBlbC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgeCA9IGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgJCh0aGlzKS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB4eCA9IGUucGFnZVggLSAkKHRoaXMpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgICAgIGlmICh4eCA8IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IGVsQi5zY3JvbGxMZWZ0KCkgKyAoeCAtIHh4KTtcclxuICAgICAgICAgICAgICAgIGVsQi5zY3JvbGxMZWZ0KGN1clRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeHggPiB4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyVHIgPSBlbEIuc2Nyb2xsTGVmdCgpIC0gKHh4IC0geCk7XHJcbiAgICAgICAgICAgICAgICBlbEIuc2Nyb2xsTGVmdChjdXJUcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZWwudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGVsLnVuYmluZCgnY2xpY2snKTtcclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxCLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsLnVuYmluZCgnbW91c2Vtb3ZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBwcm9kdWN0UGhvdG9HYWxlcnkgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBmaXJzdFNyYyA9ICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyJykuZXEoMCkuYXR0cignc3JjJyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluJykuYXR0cignc3JjJywgZmlyc3RTcmMpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlJykuZXEoMCkuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBuZWVkU3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluJykuYXR0cignc3JjJywgbmVlZFNyYyk7XHJcblxyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UnKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHByb2R1Y3RNb3JlVGFibGVSb3dDb2xvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJvd3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZVJvdycpO1xyXG4gICAgdmFyIGZpcnN0Q29sb3IgPSAnI2Y0ZjRmNCc7XHJcbiAgICB2YXIgc2Vjb25kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICB2YXIgdHJhbnNwYXJlbnQgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPj0gNjAwKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGZpcnN0Q29sb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzZWNvbmRDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvd3MuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgdHJhbnNwYXJlbnQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5maW5kKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuZXEoMCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vjb25kQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5maW5kKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKS5lcSgxKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciBwcm9kdWN0TW9yZVRhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhYnMgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9UYWInKTtcclxuICAgIHZhciBsaW5rcyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rJyk7XHJcblxyXG4gICAgbGlua3Mub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB0YWJzLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRhYnMuZXEoaW5kZXgpLmF0dHIoJ2lkJykgPT09IHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHRhYnMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYnMuZXEoMCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICB2YXIgdGFiSWQwID0gdGFicy5lcSgwKS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIGlmIChsaW5rcy5lcShpbmRleCkuYXR0cignaHJlZicpID09PSB0YWJJZDApIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0NoZWNrQm94ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQWNjb3JkaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoJy5jYXRhbG9nX19vcHRpb25zSXRlbUxpc3QnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dTb3J0aW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fc29ydGluZ1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fc29ydGluZ0xpc3QtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgb3JkZXJGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGhvbmUgPSAkKCcub3JkZXJzX19mb3JtJykuZmluZCgnaW5wdXRbbmFtZT1cInBob25lXCJdJyk7XHJcbiAgICBwaG9uZS5tYXNrKFwiKzcoOTk5KSA5OTktOTktOTlcIik7XHJcblxyXG4gICAgdmFyIGZvcm0gPSAkKCcub3JkZXJzX19mb3JtJyk7XHJcbiAgICB2YXIgdGl0bGVFcnJvciA9ICQoJy5vcmRlcnNfX2Zvcm1FcnJvclRpdGxlJyk7XHJcbiAgICB2YXIgdmlzaW9uVGl0bGVFcnJvciA9IHRpdGxlRXJyb3IuY3NzKCdkaXNwbGF5Jyk7XHJcblxyXG4gICAgaWYgKHZpc2lvblRpdGxlRXJyb3IgPT09ICdibG9jaycpIHtcclxuICAgICAgICBmb3JtLmNzcygnbWFyZ2luLXRvcCcsICc1NXB4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlucHV0UmVxdWlyZSA9ICQoJy5vcmRlcnNfX2Zvcm1JdGVtLS1yZXF1aXJlID4gaW5wdXQnKTtcclxuXHJcbn07XHJcbnZhciBoZWFkZXJNZW51SXRlbUhvdmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmVlZFRvcExlbmdodDtcclxuICAgICQoJy5oZWFkZXJfX2NhdGFsb2dCdG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fY2F0YWxvZ0J0blRleHQnKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX21lbnVMaXN0JykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWZ1bGwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCQoJy5oZWFkZXJfX21lbnVMaXN0JykuaGFzQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb3BMZW5naHQgPSAkKCcuaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykub2Zmc2V0KCkudG9wICsgJCgnLmhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpLmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gbmVlZFRvcExlbmdodCkge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsIGhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5oZWFkZXJfX21lbnVJdGVtJykub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19tZW51TGlzdCcpLmhhc0NsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX21lbnVJdGVtQWZ0ZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xyXG4gICAgICAgICAgICB2YXIgdG9wO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gKC01MCAqIGluZGV4KSArIDQ5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19zdWJNZW51JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IHRvcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJy5oZWFkZXJfX21lbnVJdGVtJykub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX3N1Yk1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0ZpbHRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5maWx0ZXJzQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmNhdGFsb2dfX29wdGlvbnMnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9ucy0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBmb290ZXJNZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuZm9vdGVyX19tZW51VGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaSA9ICQoJy5mb290ZXJfX21lbnUtLWFjdGl2ZScpLmluZGV4KCk7XHJcbiAgICAgICAgdmFyIGogPSAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS5pbmRleCgpO1xyXG4gICAgICAgIGlmIChqID09PSBpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fbWVudScpLnRvZ2dsZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXJfX21lbnUtLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS50b2dnbGVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgaW9zU2V0dGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCQoJ2h0bWwnKS5oYXNDbGFzcygnaW9zJykpIHtcclxuICAgICAgICAvLyBwcm9kdWN0IGdhbGVyeVxyXG4gICAgICAgIHZhciBiVyA9ICQoJ2JvZHknKS5vdXRlcldpZHRoKCksXHJcbiAgICAgICAgICAgIHBpY0JveCA9ICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW5Cb3gnKTtcclxuICAgICAgICBpZiAoYlcgPD0gNjgwKSB7XHJcbiAgICAgICAgICAgIHBpY0JveC5oZWlnaHQoYlcgKiAwLjY1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9vdGVyXHJcbiAgICAgICAgdmFyIGVsID0gJCgnLmZvb3Rlcl9fcGF5bWVudExpbmsnKSxcclxuICAgICAgICAgICAgZWxXaWR0aCA9IGVsLm91dGVyV2lkdGgoKSxcclxuICAgICAgICAgICAgZWxIZWlnaHQgPSBlbC5oZWlnaHQoKSxcclxuICAgICAgICAgICAgZWxMZW5ndGggPSAkKCcuZm9vdGVyX19wYXltZW50TGluaycpLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9ICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpLFxyXG4gICAgICAgICAgICBjb250YWluZXJXaWR0aCA9IGNvbnRhaW5lci5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgaWYgKGVsV2lkdGggKiBlbExlbmd0aCA+IGNvbnRhaW5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gTWF0aC5mbG9vcihjb250YWluZXJXaWR0aCAvIChlbFdpZHRoICogZWxMZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgIG5lZWRIZWlnaHQgPSAoTWF0aC5mbG9vcihlbExlbmd0aCAvIG4pICsgMSkgKiBlbEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5oZWlnaHQobmVlZEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
