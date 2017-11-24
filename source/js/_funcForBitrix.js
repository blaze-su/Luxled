var catalogOptionRange = function(id, start, end, array, currMin, currMax) {
  var min = start;
  var max = end;
  var slider = document.getElementsByClassName(id)[0];
  var minField = slider.getElementsByClassName('catalog__optionsMinVal')[0];
  var maxField = slider.getElementsByClassName('catalog__optionsMaxVal')[0];
  var findBox = document.getElementsByClassName('catalog__optionFindProductBox')[0];
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
  slider.noUiSlider.on('set', function() {
    var top = slider.offsetTop - document.getElementsByClassName('catalog__option')[0].offsetTop;
    findBox.style.top = top + 'px';
    catalogFilterAjax();
  });
};

var catalogFilterBox = function() {
  $('.catalog__optionsTitleBox').on('click', function() {
    $('.catalog__optionFindProductBox--active').removeClass('catalog__optionFindProductBox--active');
  });
  $('.catalog__optionsItem').on('click', function() {
    if (!$(this).hasClass('catalog__optionsItem--slider')) {
      var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
      $('.catalog__optionFindProductBox').css('top', top);
      catalogFilterAjax();
    }
  });
};

var catalogFilterAjax = function() {
  var data = $('#filterForm').serialize();
  $.ajax({ // инициaлизируeм ajax зaпрoс
    type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
    url: '/ajax/filter.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
    data: data, // дaнныe для oтпрaвки
    success: function(data) { // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
      console.log(data);
      $('#resultFilter').html(data).addClass('catalog__optionFindProductBox--active');
    }
  });
};

window.onload = function() {
  catalogFilterBox();
}