$(function() {
  var j, tag = $('.article-date').attr('tag');
  var $window = $(window);
  var $document = $(document);
  var $content = $('.content');
  var windowWidth, contentWidth;
  var nowUrl = location.href;
  var urlParts,fileName;

  urlParts = nowUrl.split('/');
  fileName = urlParts.pop();

  $('pre').addClass('prettyprint');
  $('.preview-img').unwrap('p');
  $('.tag').addClass('tag-' + tag);
  $('.md a').attr('target','_blank');

  _showTag('tag-'+tag,fileName);
  _socialPosition();
  _socialClick(nowUrl);  

  $window.resize(_socialPosition);

  function _socialPosition() {
    if($window.width() > 1000){
      windowWidth = $window.width();
      contantWidth = $content.width();
      var dx = windowWidth / 2 + contantWidth / 2 + 10;
      var dx1 = windowWidth / 2 + contantWidth / 2 + 15;
      var dx2 = windowWidth / 2 - contantWidth / 2 - 45;
      $('.social-icon').css({
        'left': dx + 'px'
      });
      $('.arrow-left').css({
        'left': dx2 + 'px'
      }).attr('target','_top');
      $('.arrow-right').css({
        'left': dx1 + 'px'
      }).attr('target','_top');
      $window.scroll(function() {
        if ($window.scrollTop() > 150) {
          $('.social-icon, .arrow-left, .arrow-right').not('animated').fadeIn(300);
        } else {
          $('.social-icon, .arrow-left, .arrow-right').not('animated').fadeOut(300);
        }
      });
    }else{
      $('.social-icon, .arrow-left, .arrow-right').hide();
    }
  }

  function _socialClick(pageURL) {
    $('.icon-home').on('click', function() {
      window.open('/index.html', '_self');
    });
    $('.icon-list').on('click', function() {
      window.open('/list.html', '_self');
    });
    $('.icon-facebook').on('click', function() {
      window.open('http://www.facebook.com/share.php?u=' + pageURL, '_blank');
      _trackGA('share_to_facebook');
    });
    $('.icon-google').on('click', function() {
      window.open('https://plus.google.com/share?url=' + pageURL, '_blank');
      _trackGA('share_to_google');
    });
    $('.icon-twitter').on('click', function() {
      window.open('http://twitter.com/home/?status=' + pageURL, '_blank');
      _trackGA('share_to_twitter');
    });
    $('.goto-top').on('click', function() {
      $("html,body").animate({
        "scrollTop": "0"
      }, 750);
      _trackGA('goto_top');
    });
    $('.previous-next').on('click', function() {
      _trackGA('previous-next');
    });
    $('.content a').on('click', function() {
      var aUrl = $(this).attr('href');
      _trackGA('link-to:'+aUrl);
    });
    $('.arrow-left, .arrow-right').on('click', function() {
      _trackGA('arrow-previous-next');
    });
  }

  function _showTag(tagName,fileName) {
    $.getJSON('/json/pageList.json', function(data) {
      dataLength = data.length;
      var classify = [];
      var classifyNum = 0;
      var i, maxNum,nowNum;
      for (i = 0; i < dataLength; i++) {
        if (data[i].tag == tagName) {
          classify[classifyNum] = data[i];
          classifyNum = classifyNum + 1;
        }
        if (data[i].site.indexOf(fileName) != -1){
          nowNum = i;
        }
      }
      var randomNumA = [];
      if (classifyNum <= 5) {
        console.log(classifyNum);
        for (j = 0; j < classifyNum; j++) {
          $('#other-articles').append(
            '<a href="' + classify[j].site + '">' +
            '<div>' +
            '<img src="' + classify[j].img + '">' +
            '<h4>' + classify[j].title + '</h4>' +
            '</div>' +
            '</a>'
          );
        }
      } else {
        for (j = classifyNum; j >= (classifyNum - 4); j--) {
          var k = Math.floor(j * Math.random(j));
          randomNumA[j - 5] = classify.splice(k, 1);
          $('#other-articles').append(
            '<a href="' + randomNumA[j - 5][0].site + '">' +
            '<div>' +
            '<img src="' + randomNumA[j - 5][0].img + '">' +
            '<h4>' + randomNumA[j - 5][0].title + '</h4>' +
            '</div>' +
            '</a>'
          );
        }
      }
      if (nowNum==0){
        $('.next-article h4').html('沒有下一篇文章了呦~');
        $('.previous-article h4').html(
            '<a href='+data[nowNum+1].site+'>'+data[nowNum+1].title+'</a>'
          );
        $('.arrow-right').css({'top':'-100px'});
        $('.arrow-left').attr('href',data[nowNum+1].site).attr('title',data[nowNum+1].title);
      }
      else if (nowNum==(dataLength-1)){
        $('.previous-article h4').html('沒有前一篇文章了呦~');
        $('.next-article h4').html(
            '<a href='+data[nowNum-1].site+'>'+data[nowNum-1].title+'</a>'
          );
        $('.arrow-left').css({'top':'-100px'});
        $('.arrow-right').attr('href',data[nowNum-1].site).attr('title',data[nowNum-1].title);
      }
      else{
        $('.previous-article h4').html(
            '<a href='+data[nowNum+1].site+'>'+data[nowNum+1].title+'</a>'
          );
        $('.arrow-left').attr('href',data[nowNum+1].site).attr('title',data[nowNum+1].title);
        $('.next-article h4').html(
            '<a href='+data[nowNum-1].site+'>'+data[nowNum-1].title+'</a>'
          );
        $('.arrow-right').attr('href',data[nowNum-1].site).attr('title',data[nowNum-1].title);
      }
    });
  }

  function _trackGA(peopleEvent) {
    ga('send', 'event', peopleEvent, peopleEvent);
  }
});
