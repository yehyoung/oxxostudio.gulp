$(function() {
  var $window = $(window);
  var $article = $('article');
  var windowWidth, articleWidth;

  _toolPosition();
  _toolClick();

  $window.resize(_toolPosition);

  $window.scroll(function() {
    if ($window.scrollTop() > 150) {
      $('.tool-icon').not('animated').fadeIn(300);
    } else {
      $('.tool-icon').not('animated').fadeOut(300);
    }
  });

  function _toolPosition() {
    $window.width() > 1000 ? windowWidth = $window.width() : windowWidth = 1000;
    articleWidth = $article.width();
    var dx = windowWidth / 2 + articleWidth / 2 + 30;
    $('.tool-icon').css({
      'left': dx + 'px'
    });
  }

  function _toolClick() {
    $('.icon-home').on('click', function() {
      window.open('/index.html', '_self');
    });
    $('.goto-top').on('click', function() {
      $("html,body").animate({
        "scrollTop": "0"
      }, 750);
    });
  }
});
