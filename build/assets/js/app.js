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
    // catalogFilterBox();
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
// var catalogFilterBox = function() {
//     $('.catalog__optionsItem').on('click', function() {
//         var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
//         $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
//     });
// };

$(function() {
    var min = 0;
    var max = 500;
    var minField = $('.catalog__optionsMinVal');
    var maxField = $('.catalog__optionsMaxVal');
    minField.text(min);
    maxField.text(max);
    $("#slider-range").slider({
        range: true,
        min: min,
        max: max,
        values: [min, max],
        slide: function(event, ui) {
            minField.text(ui.values[0]);
            maxField.text(ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vICQoJy5tYWluQ29udGVudCcpLmNzcygnbWluLWhlaWdodCcsICgkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAtICQoXCIuZm9vdGVyXCIpLm91dGVySGVpZ2h0KCkpIC0gJChcIi5oZWFkZXJcIikub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICBjYXRhbG9nRmlsdGVycygpO1xyXG4gICAgaGVhZGVyTWVudUl0ZW1Ib3ZlcigpO1xyXG4gICAgY2F0YWxvZ0NoZWNrQm94KCk7XHJcbiAgICBjYXRhbG9nQWNjb3JkaW9uKCk7XHJcbiAgICBjYXRhbG9nU29ydGluZygpO1xyXG4gICAgcHJvZHVjdFBob3RvR2FsZXJ5KCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYmxlUm93Q29sb3IoKTtcclxuICAgIHByb2R1Y3RNb3JlVGFiKCk7XHJcbiAgICBvcmRlckZvcm0oKTtcclxuICAgIGZvb3Rlck1lbnUoKTtcclxuICAgICQoJ2ltZycpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5oZWFkZXJfX2NhdGFsb2dJdGVtJyksICQoJy5oZWFkZXJfX2NhdGFsb2cnKSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5wb3J0Zm9saW9fX2l0ZW0nKSwgJCgnLnBvcnRmb2xpb19faXRlbUJveCcpKTtcclxuICAgIGhTY3JvbGwoJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlICcpLCAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckJveCcpKTtcclxuXHJcbiAgICBtZWRpYUNlbnRlcig1LCAkKCcud2h5V2VfX2JlbGllZicpLCAkKCcud2h5V2VfX2JlbGllZnMnKSwgJCgnLnRvdGFsV2lkdGgnKSk7XHJcbiAgICBtZWRpYUNlbnRlcigzLCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoNCwgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCcpKTtcclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA8PSAxMDIzKSB7XHJcbiAgICAgICAgbWVkaWFDZW50ZXIoOCwgJCgnLmZvb3Rlcl9fcGF5bWVudExpbmsnKSwgJCgnLmZvb3Rlcl9fcGF5bWVudExpbmtzJykpO1xyXG4gICAgfVxyXG4gICAgdmFyIG15U3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlcjInLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICBwYWdpbmF0aW9uRWxlbWVudDogJ2xpJ1xyXG4gICAgfSk7XHJcbiAgICAvLyBjYXRhbG9nRmlsdGVyQm94KCk7XHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgIG1lZGlhQ2VudGVyKDUsICQoJy53aHlXZV9fYmVsaWVmJyksICQoJy53aHlXZV9fYmVsaWVmcycpLCAkKCcudG90YWxXaWR0aCcpKTtcclxuICAgIG1lZGlhQ2VudGVyKDMsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24nKSk7XHJcbiAgICBtZWRpYUNlbnRlcig0LCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uLS1mdWxsJykpO1xyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gMTAyMykge1xyXG4gICAgICAgIG1lZGlhQ2VudGVyKDgsICQoJy5mb290ZXJfX3BheW1lbnRMaW5rJyksICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpKTtcclxuICAgIH1cclxuICAgIHByb2R1Y3RNb3JlVGFibGVSb3dDb2xvcigpO1xyXG59KTtcclxuLy8gdmFyIGNhdGFsb2dGaWx0ZXJCb3ggPSBmdW5jdGlvbigpIHtcclxuLy8gICAgICQoJy5jYXRhbG9nX19vcHRpb25zSXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgIHZhciB0b3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtICQoJy5jYXRhbG9nX19vcHRpb25JdGVtcycpLm9mZnNldCgpLnRvcDtcclxuLy8gICAgICAgICAkKCcuY2F0YWxvZ19fb3B0aW9uRmluZFByb2R1Y3RCb3gnKS5hZGRDbGFzcygnY2F0YWxvZ19fb3B0aW9uRmluZFByb2R1Y3RCb3gtLWFjdGl2ZScpLmNzcygndG9wJywgdG9wKTtcclxuLy8gICAgIH0pO1xyXG4vLyB9O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgIHZhciBtaW4gPSAwO1xyXG4gICAgdmFyIG1heCA9IDUwMDtcclxuICAgIHZhciBtaW5GaWVsZCA9ICQoJy5jYXRhbG9nX19vcHRpb25zTWluVmFsJyk7XHJcbiAgICB2YXIgbWF4RmllbGQgPSAkKCcuY2F0YWxvZ19fb3B0aW9uc01heFZhbCcpO1xyXG4gICAgbWluRmllbGQudGV4dChtaW4pO1xyXG4gICAgbWF4RmllbGQudGV4dChtYXgpO1xyXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKHtcclxuICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICBtaW46IG1pbixcclxuICAgICAgICBtYXg6IG1heCxcclxuICAgICAgICB2YWx1ZXM6IFttaW4sIG1heF0sXHJcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICBtaW5GaWVsZC50ZXh0KHVpLnZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgIG1heEZpZWxkLnRleHQodWkudmFsdWVzWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjYW1vdW50XCIpLnZhbChcIiRcIiArICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcihcInZhbHVlc1wiLCAwKSArXHJcbiAgICAgICAgXCIgLSAkXCIgKyAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoXCJ2YWx1ZXNcIiwgMSkpO1xyXG59KTtcclxuXHJcbnZhciBtZWRpYUNlbnRlciA9IGZ1bmN0aW9uKGNvdW50LCBlbGVtLCBib3gsIGJveENvbnRyb2xTaXplKSB7XHJcbiAgICB2YXIgc2l6ZTtcclxuICAgIGlmIChlbGVtLmxlbmd0aCA8IGNvdW50KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gZWxlbS5sZW5ndGggKyAxOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJveENvbnRyb2xTaXplKSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94Q29udHJvbFNpemUud2lkdGgoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3gud2lkdGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSBlbGVtLmxlbmd0aCArIDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaXplIDwgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGNvdW50ICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChib3hDb250cm9sU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveENvbnRyb2xTaXplLndpZHRoKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94LndpZHRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNpemUgPCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIChpIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciBoU2Nyb2xsID0gZnVuY3Rpb24oZWwsIGVsQikge1xyXG4gICAgZWwub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHggPSBlLnBhZ2VYIC0gJCh0aGlzKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICQodGhpcykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgeHggPSBlLnBhZ2VYIC0gJCh0aGlzKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICAgICBpZiAoeHggPCB4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyVHIgPSBlbEIuc2Nyb2xsTGVmdCgpICsgKHggLSB4eCk7XHJcbiAgICAgICAgICAgICAgICBlbEIuc2Nyb2xsTGVmdChjdXJUcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHh4ID4geCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1clRyID0gZWxCLnNjcm9sbExlZnQoKSAtICh4eCAtIHgpO1xyXG4gICAgICAgICAgICAgICAgZWxCLnNjcm9sbExlZnQoY3VyVHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxCLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsLnVuYmluZCgnbW91c2Vtb3ZlJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBlbC51bmJpbmQoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsQi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBlbC51bmJpbmQoJ21vdXNlbW92ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdFBob3RvR2FsZXJ5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZmlyc3RTcmMgPSAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlcicpLmVxKDApLmF0dHIoJ3NyYycpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlTWFpbicpLmF0dHIoJ3NyYycsIGZpcnN0U3JjKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmVxKDApLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbmVlZFNyYyA9ICQodGhpcykuYXR0cignc3JjJyk7XHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlTWFpbicpLmF0dHIoJ3NyYycsIG5lZWRTcmMpO1xyXG5cclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlJykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBwcm9kdWN0TW9yZVRhYmxlUm93Q29sb3IgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb3dzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVSb3cnKTtcclxuICAgIHZhciBmaXJzdENvbG9yID0gJyNmNGY0ZjQnO1xyXG4gICAgdmFyIHNlY29uZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdmFyIHRyYW5zcGFyZW50ID0gJ3RyYW5zcGFyZW50JztcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpID49IDYwMCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vjb25kQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByb3dzLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHRyYW5zcGFyZW50KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmZpbmQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlQ29sbCcpLmVxKDApLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlY29uZENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuZmluZCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVDb2xsJykuZXEoMSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YWJzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvVGFiJyk7XHJcbiAgICB2YXIgbGlua3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluaycpO1xyXG5cclxuICAgIGxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKVxyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpO1xyXG4gICAgICAgIHZhciBwYXRoID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgdGFicy5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0YWJzLmVxKGluZGV4KS5hdHRyKCdpZCcpID09PSBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJzLmVxKDApLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgdmFyIHRhYklkMCA9IHRhYnMuZXEoMCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluaycpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICBpZiAobGlua3MuZXEoaW5kZXgpLmF0dHIoJ2hyZWYnKSA9PT0gdGFiSWQwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dDaGVja0JveCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJykgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0FjY29yZGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNUaXRsZUJveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGlvbkljb24nKS50b2dnbGVDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0JykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtTGlzdC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nU29ydGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX3NvcnRpbmdUaXRsZUJveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGlvbkljb24nKS50b2dnbGVDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX3NvcnRpbmdMaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIG9yZGVyRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBob25lID0gJCgnLm9yZGVyc19fZm9ybScpLmZpbmQoJ2lucHV0W25hbWU9XCJwaG9uZVwiXScpO1xyXG4gICAgcGhvbmUubWFzayhcIis3KDk5OSkgOTk5LTk5LTk5XCIpO1xyXG5cclxuICAgIHZhciBmb3JtID0gJCgnLm9yZGVyc19fZm9ybScpO1xyXG4gICAgdmFyIHRpdGxlRXJyb3IgPSAkKCcub3JkZXJzX19mb3JtRXJyb3JUaXRsZScpO1xyXG4gICAgdmFyIHZpc2lvblRpdGxlRXJyb3IgPSB0aXRsZUVycm9yLmNzcygnZGlzcGxheScpO1xyXG5cclxuICAgIGlmICh2aXNpb25UaXRsZUVycm9yID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgZm9ybS5jc3MoJ21hcmdpbi10b3AnLCAnNTVweCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbnB1dFJlcXVpcmUgPSAkKCcub3JkZXJzX19mb3JtSXRlbS0tcmVxdWlyZSA+IGlucHV0Jyk7XHJcblxyXG59O1xyXG52YXIgaGVhZGVyTWVudUl0ZW1Ib3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5lZWRUb3BMZW5naHQ7XHJcbiAgICAkKCcuaGVhZGVyX19jYXRhbG9nQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5oZWFkZXJfX2NhdGFsb2dCdG5UZXh0JykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tZW51TGlzdCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1mdWxsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19tZW51TGlzdCcpLmhhc0NsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBuZWVkVG9wTGVuZ2h0ID0gJCgnLmhlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpLm9mZnNldCgpLnRvcCArICQoJy5oZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKS5oZWlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IG5lZWRUb3BMZW5naHQpIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tZnVsbCBoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5oYXNDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIHRvcDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9ICgtNTAgKiBpbmRleCkgKyA0OTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fc3ViTWVudScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICd0b3AnOiB0b3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fbWVudUl0ZW1BZnRlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19zdWJNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dGaWx0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuZmlsdGVyc0J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25zJykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgZm9vdGVyTWVudSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmZvb3Rlcl9fbWVudVRpdGxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGkgPSAkKCcuZm9vdGVyX19tZW51LS1hY3RpdmUnKS5pbmRleCgpO1xyXG4gICAgICAgIHZhciBqID0gJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykuaW5kZXgoKTtcclxuICAgICAgICBpZiAoaiA9PT0gaSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX21lbnUnKS50b2dnbGVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuZm9vdGVyX19tZW51LS1hY3RpdmUnKS5yZW1vdmVDbGFzcygnZm9vdGVyX19tZW51LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykudG9nZ2xlQ2xhc3MoJ2Zvb3Rlcl9fbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
