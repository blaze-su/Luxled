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