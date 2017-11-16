;
$(document).ready(function() {
  catalogFilterCollWidth();
  iosSetting();
  catalogFilters();
  headerMenuItemHover();
  catalogCheckBox();
  catalogAccordion();
  catalogSorting();
  productMoreTableRowColor();
  catalogTableHeadHeight();
  catalogOptionsTab(2);
  orderForm();
  footerMenu();
  $('img').on('mousedown', function(e) { e.preventDefault(); });
  hScroll($('.header__catalogItem'), $('.header__catalog'));
  hScroll($('.portfolio__item'), $('.portfolio__itemBox'));

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

$(window).resize(function() {
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
  catalogFilterCollWidth(true);
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
    $('.catalog__optionFindProductBox').removeClass('catalog__optionFindProductBox--active');
  });
  $('.noUi-base').on('click', function() {
    var top = $(this).offset().top - $('.catalog__option').offset().top;
    $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
  });
  $('input.catalog__optionsMaxVal').on('keypress', function() {
    var currPrise = $(this).val();
    $('input.catalog__optionsMaxVal').on('focusout', function() {
      if (currPrise !== $(this).val()) {
        var top = $(this).offset().top - $('.catalog__option').offset().top;
        $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
      }
      $(this).unbind('focusout');
    });
  });
  $('input.catalog__optionsMinVal').on('keypress', function() {
    var currPrise = $(this).val();
    $('input.catalog__optionsMinVal').on('focusout', function() {
      if (currPrise !== $(this).val()) {
        var top = $(this).offset().top - $('.catalog__option').offset().top;
        $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
      }
      $(this).unbind('focusout');
    });
  });
  $('.noUi-handle').on('mousedown', function() {
    $('.catalog__optionFindProductBox--active').removeClass('catalog__optionFindProductBox--active');
    var _this = $(this);
    $(this).on('mousemove', function() {
      $(document).on('mouseup', function() {
        var top = _this.offset().top - $('.catalog__option').offset().top;
        $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
        $('.noUi-handle').unbind('mousemove');
        $(this).unbind('mouseup');
      });
    });
  });
};

var catalogOptionRange = function(id, start, end, array, currMin, currMax) {
  var min = start;
  var max = end;
  var slider = document.getElementsByClassName(id)[0];
  var minField = slider.getElementsByClassName('catalog__optionsMinVal')[0];
  var maxField = slider.getElementsByClassName('catalog__optionsMaxVal')[0];
  var snapValues = [minField, maxField];
  var range = {},
    start = [],
    snap = false;



  if (array.length !== 0) {
    snap = true;
    var rangeStep = 100 / (array.length - 1);
    for (var i = 0; i < array.length; i++) {
      if (i == 0) {
        range['min'] = array[i];
      }
      if (i == array.length - 1) {
        range['max'] = array[i];
      }
      if (i !== 0 && i !== array.length - 1) {
        range['' + (i * rangeStep) + '%'] = array[i];
      }
    }
  } else {
    range['min'] = min;
    range['max'] = max;
  }
  if (currMin && currMax) {
    start[0] = currMin;
    start[1] = currMax;
  } else {
    start[0] = min;
    start[1] = max;
  }
  noUiSlider.create(slider, {
    start: start,
    snap: snap,
    connect: true,
    range: range
  });
  slider.noUiSlider.on('update', function(values, handle) {
    snapValues[handle].value = values[handle];
  });
  minField.addEventListener('change', function() {
    slider.noUiSlider.set([this.value, null]);
  });
  maxField.addEventListener('change', function() {
    slider.noUiSlider.set([null, this.value]);
  });
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

var productMoreTableRowColor = function() {
  var rows = $('.productMore__characteristicsTableRow');
  var coll = $('.productMore__characteristicsTableColl');
  var firstColor = '#f4f4f4';
  var secondColor = '#ffffff';
  var transparent = 'transparent';
  if ($(window).outerWidth() >= 1144 || ($(window).outerWidth() >= 600 && $(window).outerWidth() <= 1023)) {
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
      rows.eq(i).find('.productMore__characteristicsTableColl').eq(0).css('background-color', firstColor);
      rows.eq(i).find('.productMore__characteristicsTableColl').eq(1).css('background-color', secondColor);
    }
  }
};

var catalogOptionsTab = function(start) {
  var start = start - 1;
  var tabs = $('.catalog__optionsItemModelsBox');
  var links = $('.catalog__optionsItemModelLink');
  links.on('click', function(e) {
    e.preventDefault();
    $('.catalog__optionsItemModelLink--active').removeClass('catalog__optionsItemModelLink--active');
    $(this).addClass('catalog__optionsItemModelLink--active');
    var path = $(this).attr('href');
    tabs.each(function(index) {
      if (tabs.eq(index).attr('id') === path) {
        tabs.css('display', 'none');
        $(this).css('display', 'flex');
      }
    });
  });

  tabs.eq(start).css('display', 'flex');
  var tabId0 = tabs.eq(start).attr('id');

  links.each(function(index) {
    if (links.eq(index).attr('href') === tabId0) {
      $('.catalog__optionsItemModelLink--active').removeClass('catalog__optionsItemModelLink--active');
      $(this).addClass('catalog__optionsItemModelLink--active');
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
    $('.catalog__sortingItem').on('click', function() {
      $('.catalog__sortingTitleBox').find('.accordionIcon').removeClass('accordionIcon--active');
      $('.catalog__sortingList--active').removeClass('catalog__sortingList--active');
    });
  });
  if ($('.catalog__sortingList').hasClass('catalog__sortingList')) {
    $('.catalog__sortingList').on("mouseleave", function() {
      $('.catalog__sortingTitleBox').find('.accordionIcon').removeClass('accordionIcon--active');
      $('.catalog__sortingList--active').removeClass('catalog__sortingList--active');
    });
  }

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
  var needTopLenght,
    list = $('.header__menuList'),
    activeList = $('.header__menuList--active');

  var _close = function() {
    list.removeClass('header__menuList--full header__menuList--active');
  };

  $('.header__catalogBtn').on('click', function() {
    if ($('.header__catalogBtnText').css('display') === 'none') {
      list.toggleClass('header__menuList--full');
    } else {
      list.toggleClass('header__menuList--active');
    }
    if (list.hasClass('header__menuList--full')) {
      needTopLenght = $('.header__menuList--full').offset().top + $('.header__menuList--full').height();
    }
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > needTopLenght) {
      _close();
    }
  });

  list.on('mouseleave', function() {
    if ($(this).hasClass('header__menuList--active')) {
      _close();
    }
  });

  $('.header__menuItem').on('mouseover', function() {
    if (list.hasClass('header__menuList--active')) {
      $(this).find('.header__menuItemAfter').css('display', 'block');
      var index = $(this).index(),
        subItem = $(this).find('.header__subMenuItem').length;
      var top;
      if (index != 0) {
        if (subItem > (index - 1)) {
          top = (-50 * index) + 49;
        } else {
          if (index != $(this).length) {
            top = (-50 * (index - (index - subItem))) + 48;
          } else {
            top = (-50 * (index - (index - subItem))) + 49;
          }
        }
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

var catalogFilterCollWidth = function(resize) {
  var w = $('.catalog__option').width();
  $('.catalog__optionsItemList--coll4 .catalog__optionsItem').each(function() {
    if ($('.catalog__options').hasClass('catalog__options--active') || $(window).outerWidth() > 926) {
      if (!$(this).hasClass('catalog__optionsItem--slider')) {
        if (resize) {
          if ($(this).css('min-width') != '25%') {
            $(this).css('min-width', '25%');
          }
        }
        var _w = $(this).outerWidth();
        if (_w > w / 4) $(this).css('min-width', '50%').appendTo($(this).closest('.catalog__optionsItemList'));
        if (_w > (w / 4 * 2)) $(this).css('min-width', '75%').appendTo($(this).closest('.catalog__optionsItemList'));
      }
    }
  });
  $('.catalog__optionsItemList--coll3 .catalog__optionsItem').each(function() {
    if ($('.catalog__options').hasClass('catalog__options--active') || $(window).outerWidth() > 926) {
      if (!$(this).hasClass('catalog__optionsItem--slider')) {
        if (resize) {
          if ($(this).css('min-width') != '33%') {
            $(this).css('min-width', '33%');
          }
        }
        var _w = $(this).outerWidth();
        if (_w > w / 3) $(this).css('min-width', '66%').appendTo($(this).closest('.catalog__optionsItemList'));
      }
    }
  });
};

var catalogFilters = function() {
  $('.filtersBtn').on('click', function() {
    $('.catalog__options').toggleClass('catalog__options--active');
    catalogFilterCollWidth();
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
    var bW = $('body').outerWidth(),
      picBox = $('.productMore__galeryPictureMainBox');
    if (bW <= 680) {
      picBox.height(bW * 0.65);
    }
  }
};