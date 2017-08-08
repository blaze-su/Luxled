;
$(document).ready(function() {
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

// в функции нет ещё активного состояния текущей картинки!
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgY2F0YWxvZ0NoZWNrQm94KCk7XHJcbiAgICBjYXRhbG9nQWNjb3JkaW9uKCk7XHJcbiAgICBjYXRhbG9nU29ydGluZygpO1xyXG4gICAgcHJvZHVjdFBob3RvR2FsZXJ5KCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYmxlQ29sdW1uQ29sb3IoKTtcclxuICAgIHByb2R1Y3RNb3JlVGFiKCk7XHJcbiAgICBvcmRlckZvcm0oKTtcclxufSk7XHJcblxyXG52YXIgc2xpZGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG59O1xyXG5cclxuLy8g0LIg0YTRg9C90LrRhtC40Lgg0L3QtdGCINC10YnRkSDQsNC60YLQuNCy0L3QvtCz0L4g0YHQvtGB0YLQvtGP0L3QuNGPINGC0LXQutGD0YnQtdC5INC60LDRgNGC0LjQvdC60LghXHJcbnZhciBwcm9kdWN0UGhvdG9HYWxlcnkgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmVxKDApLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbmVlZFNyYyA9ICQodGhpcykuYXR0cignc3JjJyk7XHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlTWFpbicpLmF0dHIoJ3NyYycsIG5lZWRTcmMpO1xyXG5cclxuICAgICAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlJykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBwcm9kdWN0TW9yZVRhYmxlQ29sdW1uQ29sb3IgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb3dzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvQ2hhcmFjdGVyaXN0aWNzVGFibGVSb3cnKTtcclxuICAgIHZhciBmaXJzdENvbG9yID0gJyNmNGY0ZjQnO1xyXG4gICAgdmFyIHNlY29uZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgJSAyID09IDApIHtcclxuICAgICAgICAgICAgcm93cy5lcShpKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBmaXJzdENvbG9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb3dzLmVxKGkpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlY29uZENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YWJzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvVGFiJyk7XHJcbiAgICB2YXIgbGlua3MgPSAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluaycpO1xyXG5cclxuICAgIGxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKVxyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpO1xyXG4gICAgICAgIHZhciBwYXRoID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgdGFicy5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0YWJzLmVxKGluZGV4KS5hdHRyKCdpZCcpID09PSBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJzLmVxKDApLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgdmFyIHRhYklkMCA9IHRhYnMuZXEoMCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2luZm9NZW51TGluaycpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICBpZiAobGlua3MuZXEoaW5kZXgpLmF0dHIoJ2hyZWYnKSA9PT0gdGFiSWQwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3Byb2R1Y3RNb3JlX19pbmZvTWVudUxpbmstLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dDaGVja0JveCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJykgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ0FjY29yZGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGlvbkljb24nKS50b2dnbGVDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0JykudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtTGlzdC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nU29ydGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX3NvcnRpbmdUaXRsZUJveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmFjY29yZGlvbkljb24nKS50b2dnbGVDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlQ2xhc3MoJ2NhdGFsb2dfX3NvcnRpbmdMaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIG9yZGVyRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBob25lID0gJCgnLm9yZGVyc19fZm9ybScpLmZpbmQoJ2lucHV0W25hbWU9XCJwaG9uZVwiXScpO1xyXG4gICAgcGhvbmUubWFzayhcIis3KDk5OSkgOTk5LTk5LTk5XCIpO1xyXG5cclxuICAgIHZhciBmb3JtID0gJCgnLm9yZGVyc19fZm9ybScpO1xyXG4gICAgdmFyIHRpdGxlRXJyb3IgPSAkKCcub3JkZXJzX19mb3JtRXJyb3JUaXRsZScpO1xyXG4gICAgdmFyIHZpc2lvblRpdGxlRXJyb3IgPSB0aXRsZUVycm9yLmNzcygnZGlzcGxheScpO1xyXG5cclxuICAgIGlmICh2aXNpb25UaXRsZUVycm9yID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgZm9ybS5jc3MoJ21hcmdpbi10b3AnLCAnNTVweCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbnB1dFJlcXVpcmUgPSAkKCcub3JkZXJzX19mb3JtSXRlbS0tcmVxdWlyZSA+IGlucHV0Jyk7XHJcblxyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
