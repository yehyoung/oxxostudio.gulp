$(function() {
  var $window = $(window);
  var imgWidth, imgHeight, imgWidthMargin, imgHeightMargin,
    dataLength, urlPages, pageNum, pageTag,
    timer;
  var nowUrl = location.href;
  var urlParts1 = nowUrl.split("?");
  var urlParts2 = nowUrl.split("/");
  var siteUrl = urlParts2[0] + '//' + urlParts2[2] + '/';
  var stopTimer = 0;
  var d;

  if (urlParts1[1]) {
    urlPages = urlParts1[1].split("=");
    pageTag = urlPages[0];
    pageNum = Number(urlPages[1]);
    if (pageNum) {
      if (urlPages[0] == '') {
        _showAll(pageNum);
      } else {
        _showTag(pageTag, pageNum);
      }
    } else {
      _showTag(pageTag, 1);
    }
  } else {
    _showAll(1);
  }

  function _articles() {
    $.getJSON('/json/articles.json', function(data) {
      d = data;
      _h4Content();
    });
  }


  function _showAll(nowPageNum) {
    $.getJSON('/json/pageList.json', function(data) {
      var maxNum;
      dataLength = data.length;
      dataLength < 6 ? maxNum = dataLength : maxNum = 6;
      var i = -1;
      _renderContent((i + nowPageNum) * 6);

      function _renderContent(Num) {
        var j, k;
        k = Num + maxNum;
        if (k >= dataLength) {
          k = dataLength;
        }
        // k < dataLength ? '' : k = dataLength;
        for (j = Num; j < k; j++) {
          var imgUrl;
          if (!data[j].img) {
            imgUrl = '/img' + data[j].site.replace('.html', '-s.jpg');
          } else {
            imgUrl = data[j].img;
          }
          $('#content-grid>ul').append(
            '<li>' +
            '<i class="' + data[j].tag + '"></i>' +
            '<h2>' + data[j].title + '</h2>' +
            '<h3><i class="icon-date"></i>' + data[j].date + '</h3>' +
            '<h3><i class="icon-author"></i>OXXO.STUDIO</h3>' +
            '<a href="' + data[j].site + '" title="' + data[j].title + '">' +
            '<div class="content-img">' +
            '<span></span>' +
            '<img src="' + imgUrl + '">' +
            '</div>' +
            '</a>' +
            '<div class="content-grid-line"></div>' +
            '<h4 content="' + data[j].site + '"></h4>' +
            '<a href="' + data[j].site + '"><div class="read-more">Read more</div></a>' +
            '</li>'
          );
        }
      }
      _articles();
      _pageNum(dataLength, nowPageNum);
      _allPages();
    });
  }

  function _showTag(tagName, nowPageNum) {
    $.getJSON('/json/pageList.json', function(data) {
      var maxNum;
      dataLength = data.length;
      var classify = [];
      var classifyNum = 0;
      var i, maxNum;
      for (i = 0; i < dataLength; i++) {
        if (data[i].tag == tagName) {
          classify[classifyNum] = data[i];
          classifyNum = classifyNum + 1;
        }
      }
      classifyNum < 6 ? maxNum = classifyNum : maxNum = 6;
      var j = -1;
      _renderContent((j + nowPageNum) * 6);

      function _renderContent(Num) {
        var p, q;
        q = Num + maxNum;
        if (q >= classifyNum) {
          q = classifyNum;
        }
        // q < classifyNum ? '' : q = classifyNum;
        for (p = Num; p < q; p++) {
          var imgUrl;
          if (classify[p].img) {
            imgUrl = classify[p].img;
          } else {
            imgUrl = '/img' + classify[p].site.replace('.html', '-s.jpg');
          }
          $('#content-grid>ul').append(
            '<li>' +
            '<i class="' + classify[p].tag + '"></i>' +
            '<h2>' + classify[p].title + '</h2>' +
            '<h3><i class="icon-date"></i>' + classify[p].date + '</h3>' +
            '<h3><i class="icon-author"></i>OXXO.STUDIO</h3>' +
            '<a href="' + classify[p].site + '">' +
            '<div class="content-img">' +
            '<span></span>' +
            '<img src="' + imgUrl + '">' +
            '</div>' +
            '</a>' +
            '<div class="content-grid-line"></div>' +
            '<h4 content="' + classify[p].site + '"></h4>' +
            '<a href="' + classify[p].site + '"><div class="read-more">Read more</div></a>' +
            '</li>'
          );
        }
      }
      _h4Content();
      _pageNum(classifyNum, nowPageNum);
      _classifyPages();
    });
  }

  function _pageNum(articleNum, nowPageNum) {
    var j, k;
    j = Math.ceil(articleNum / 6);
    for (k = 1; k <= j; k++) {
      $('#page-num').append(
        '<div>' + k + '</div>'
      );
    }
    $('#page-num div').hide();
    if ((nowPageNum - 3) >= 0) {
      $('#page-num div').eq(nowPageNum - 3).show();
    }
    if ((nowPageNum - 2) >= 0) {
      $('#page-num div').eq(nowPageNum - 2).show();
    }
    $('#page-num div').eq(nowPageNum - 1).show();
    $('#page-num div').eq(nowPageNum).show();
    $('#page-num div').eq(nowPageNum + 1).show();
    $('#page-num div').eq(nowPageNum + 2).show();
    $('#page-num div').eq(nowPageNum + 3).show();

    $('#page-num div').eq(nowPageNum - 1).css({
      'background': '#888',
      'color': '#fff'
    });
  }

  function _allPages() {
    $('#page-num div').on('click', function() {
      var divIndex = $(this).index() + 1;
      if (divIndex == 1) {
        window.open(siteUrl, '_self');
      } else {
        window.open(siteUrl + 'index.html?=' + divIndex, '_self');
      }
    });
  }

  function _classifyPages() {
    $('#page-num div').on('click', function() {
      var divIndex = $(this).index() + 1;
      if (divIndex == 1) {
        window.open(siteUrl + 'index.html?' + pageTag, '_self');
      } else {
        window.open(siteUrl + 'index.html?' + pageTag + '=' + divIndex, '_self');
      }
    });
  }

  function _h4Content() {
    $('#content-grid>ul').find('h4').each(function() {
      var $h4 = $(this);
      var h4url = $h4.attr('content');
      var arr = h4url.split('/');
      var arrUrl = '/' + arr[arr.length - 2] + '/' + arr[arr.length - 1];
      for (var i in d) {
        for (var j in d[i]) {
          if (arrUrl == ('/' + i + '/' + j + '.html')) {
            var c = d[i][j].body;
            $h4.html(c);
            $h4.html($h4.text());
          }
        }
      }
    });
  }

});
