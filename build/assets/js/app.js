;
$(document).ready(function() {
    catalogCheckBox();
    catalogAccordion();
    catalogSorting();
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIGNhdGFsb2dDaGVja0JveCgpO1xyXG4gICAgY2F0YWxvZ0FjY29yZGlvbigpO1xyXG4gICAgY2F0YWxvZ1NvcnRpbmcoKTtcclxufSk7XHJcblxyXG52YXIgY2F0YWxvZ0NoZWNrQm94ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc0l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2NhdGFsb2dfX29wdGlvbnNJdGVtLS1jaGVja2VkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQWNjb3JkaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5jYXRhbG9nX19vcHRpb25zSXRlbUxpc3QnKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW1MaXN0LS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dTb3J0aW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZ19fc29ydGluZ1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuYWNjb3JkaW9uSWNvbicpLnRvZ2dsZUNsYXNzKCdhY2NvcmRpb25JY29uLS1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLm5leHQoKS50b2dnbGVDbGFzcygnY2F0YWxvZ19fc29ydGluZ0xpc3QtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
