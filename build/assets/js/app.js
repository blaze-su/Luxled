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
});

var slider = function() {

};

var productPhotoGalery = function() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaGVhZGVyTWVudUl0ZW1Ib3ZlcigpO1xyXG4gICAgY2F0YWxvZ0NoZWNrQm94KCk7XHJcbiAgICBjYXRhbG9nQWNjb3JkaW9uKCk7XHJcbiAgICBjYXRhbG9nU29ydGluZygpO1xyXG4gICAgcHJvZHVjdFBob3RvR2FsZXJ5KCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYmxlQ29sdW1uQ29sb3IoKTtcclxuICAgIHByb2R1Y3RNb3JlVGFiKCk7XHJcbiAgICBvcmRlckZvcm0oKTtcclxufSk7XHJcblxyXG52YXIgc2xpZGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG59O1xyXG5cclxudmFyIHByb2R1Y3RQaG90b0dhbGVyeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlJykuZXEoMCkuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBuZWVkU3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVNYWluJykuYXR0cignc3JjJywgbmVlZFNyYyk7XHJcblxyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UnKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHByb2R1Y3RNb3JlVGFibGVDb2x1bW5Db2xvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJvd3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZVJvdycpO1xyXG4gICAgdmFyIGZpcnN0Q29sb3IgPSAnI2Y0ZjRmNCc7XHJcbiAgICB2YXIgc2Vjb25kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICByb3dzLmVxKGkpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGZpcnN0Q29sb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvd3MuZXEoaSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vjb25kQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciBwcm9kdWN0TW9yZVRhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhYnMgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9UYWInKTtcclxuICAgIHZhciBsaW5rcyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rJyk7XHJcblxyXG4gICAgbGlua3Mub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpXHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB0YWJzLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRhYnMuZXEoaW5kZXgpLmF0dHIoJ2lkJykgPT09IHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHRhYnMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYnMuZXEoMCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICB2YXIgdGFiSWQwID0gdGFicy5lcSgwKS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgIGlmIChsaW5rcy5lcShpbmRleCkuYXR0cignaHJlZicpID09PSB0YWJJZDApIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0NoZWNrQm94ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQWNjb3JkaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nX19vcHRpb25zSXRlbUxpc3QnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dTb3J0aW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fc29ydGluZ1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fc29ydGluZ0xpc3QtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgb3JkZXJGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGhvbmUgPSAkKCcub3JkZXJzX19mb3JtJykuZmluZCgnaW5wdXRbbmFtZT1cInBob25lXCJdJyk7XHJcbiAgICBwaG9uZS5tYXNrKFwiKzcoOTk5KSA5OTktOTktOTlcIik7XHJcblxyXG4gICAgdmFyIGZvcm0gPSAkKCcub3JkZXJzX19mb3JtJyk7XHJcbiAgICB2YXIgdGl0bGVFcnJvciA9ICQoJy5vcmRlcnNfX2Zvcm1FcnJvclRpdGxlJyk7XHJcbiAgICB2YXIgdmlzaW9uVGl0bGVFcnJvciA9IHRpdGxlRXJyb3IuY3NzKCdkaXNwbGF5Jyk7XHJcblxyXG4gICAgaWYgKHZpc2lvblRpdGxlRXJyb3IgPT09ICdibG9jaycpIHtcclxuICAgICAgICBmb3JtLmNzcygnbWFyZ2luLXRvcCcsICc1NXB4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlucHV0UmVxdWlyZSA9ICQoJy5vcmRlcnNfX2Zvcm1JdGVtLS1yZXF1aXJlID4gaW5wdXQnKTtcclxuXHJcbn07XHJcblxyXG52YXIgaGVhZGVyTWVudUl0ZW1Ib3ZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmhlYWRlcl9fY2F0YWxvZ0J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmhlYWRlcl9fbWVudUl0ZW0nKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19tZW51SXRlbUFmdGVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xyXG4gICAgICAgIHZhciB0b3A7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IDApIHtcclxuICAgICAgICAgICAgdG9wID0gKC01MCAqIGluZGV4KSArIDQ5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvcCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX3N1Yk1lbnUnKS5jc3Moe1xyXG4gICAgICAgICAgICAnZGlzcGxheSc6ICdmbGV4JyxcclxuICAgICAgICAgICAgJ3RvcCc6IHRvcFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKCcuaGVhZGVyX19tZW51SXRlbScpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fbWVudUl0ZW1BZnRlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuaGVhZGVyX19zdWJNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH0pO1xyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
