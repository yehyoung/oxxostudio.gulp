<!-- @@master  = ../../_layout.html-->

<!-- @@block  =  jsBottom-->

<include src="../../_articles-js.html"></include>

<!-- @@close-->

<!-- @@block  =  css-->

<include src="../../_articles-css.html"></include>

<!-- @@close-->

<!-- @@block  =  articles-social-->

<include src="../../_articles-social.html"></include>

<!-- @@close-->

<!-- @@block  =  articles-footer-->

<include src="../../_articles.html"></include>

<!-- @@close-->

<!-- @@block  =  meta-->

<meta property="article:published_time" content="2015-01-03T23:55:00+01:00">

<meta name="keywords" content="mac dock,dock,css,jquery,html5">

<meta name="description" content="2015 年的第一篇文章，寫的是我自己在 2012 年的舊作！？隨著這幾年自己技術的提升，總算是運用了一些 HTML5 的技術，來讓當年做的這組 Mac Docker 效果更加完善，這裡將這個效果的製作方式分享給大家。">

<meta itemprop="name" content="Mac Dock 實作 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201501/20150103_1_01b.jpg">

<meta itemprop="description" content="2015 年的第一篇文章，寫的是我自己在 2012 年的舊作！？隨著這幾年自己技術的提升，總算是運用了一些 HTML5 的技術，來讓當年做的這組 Mac Docker 效果更加完善，這裡將這個效果的製作方式分享給大家。">

<meta property="og:title" content="Mac Dock 實作 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201501/mac-dock.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201501/20150103_1_01b.jpg">

<meta property="og:description" content="2015 年的第一篇文章，寫的是我自己在 2012 年的舊作！？隨著這幾年自己技術的提升，總算是運用了一些 HTML5 的技術，來讓當年做的這組 Mac Docker 效果更加完善，這裡將這個效果的製作方式分享給大家。">

<title>Mac Dock 實作  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##Mac Dock 實作  <span class="article-date" tag="web">JAN 3, 2015</span>

<img src="/img/articles/201501/20150103_1_01.gif" class="preview-img">

2015 年的第一篇文章，寫的是我自己在 2012 年的舊作！？隨著這幾年自己技術的提升，總算是運用了一些 HTML5 的技術，來讓當年做的這組 Mac Docker 效果更加完善，這裡將這個效果的製作方式分享給大家，歡迎和期待各路高手和大大能給予一些建議指教。( 完成範例：[mac-dock-demo.html](/demo/201501/mac-dock-demo.html) )
Mac Dock 的效果其實不難做，說穿了只用了一點點 CSS3 的 transition 與 transform ，HTML5 的 data-attribute，以及 jQuery 的 animate 而已，真正難的地方在於計算各個 icon 的大小和位置，當初光是想這個演算法就花了整整三天，最後出來只要五行就搞定了，可以參考下圖這個計算草稿：

![Mac Docker 實作](/img/articles/201501/20150103_1_02.jpg)

看不懂沒關係，來看一下程式碼的組成，首先看一下 HTML，外圍用一個 div 包著一個清單，清單的`li`都有一個`text`的 HTML5 data attribute，這裡的目的是讓 CSS3 的偽元素`::before`直接讀取，就可以在完全不用 JS 的情況下載入文字。

	<div id='mouse_area'>
	    <ul id='mac_button'>
	      <li text='blogger'><img src='mac_img/01.png' /></li>
	      <li text='DVD'><img src='mac_img/02.png' /></li>
	      <li text='Firefox'><img src='mac_img/03.png' /></li>
	      <li text='Chrome'><img src='mac_img/04.png' /></li>
	      <li text='Information'><img src='mac_img/05.png' /></li>
	      <li text='IE'><img src='mac_img/06.png' /></li>
	      <li text='Youtube'><img src='mac_img/07.png' /></li>
	      <li text='Media'><img src='mac_img/08.png' /></li>
	      <li text='Printer'><img src='mac_img/09.png' /></li>
	      <li text='Skype'><img src='mac_img/10.png' /></li>
	      <li text='Note'><img src='mac_img/11.png' /></li>
	      <li text='Tools'><img src='mac_img/12.png' /></li>
	      <li text='Yahoo'><img src='mac_img/13.png' /></li>
	    </ul>
	</div>

<br/>
接著看一下 CSS，這裡大多都只是基本的 CSS，比較需要注意的是`::before`這一段，意思是讓每個 li 都有一個偽元素`::before`，而其內容`content`會自動讀取對應 li 的 text，也就是`attr(text)`，如此一來，每個 li 的 text 文字都會自動放到`::before`裏頭囉！此外，最後面多增加了一個具有 id 的 style 區塊，因為`::before`這種偽元素，並不是 HTML 的標準元素，也因此 jquery 無法控制這些偽元素，當我想讓偽元素寬度是動態的，就必須要額外將 style 寫入，所以多增加一組 style 讓 jquery 把樣式加進去。

	<style>
	  #mouse_area {
	    position: absolute;
	    z-index: 99;
	  }
	  ul,li {
	    padding: 0;
	    margin: 0;
	    list-style: none;
	  }
	  #mac_button {
	    margin: 0 auto;
	    display:table;
	  }
	  #mac_button li {
	    display: inline-block;
	    position: relative;
	    padding: 0 2px;
	  }
	  #mac_button li img {
	    width: 100%;
	    height: 100%;
	  }
	  #mac_button li::before {
	    content: attr(text);  /* 讀取text */
	    position: absolute;
	    height: 20px;
	    top: -25px;
	    opacity: 0;
	    text-align: center;
	    font-weight: bold;
	    font-family: "arial";
	    font-size:12px;
	    -webkit-transform: scale(.6);
	    -moz-transform: scale(.6);
	    transform: scale(.6);
	    -webkit-transition: .2s;
	    -moz-transition: .2s;
	    transition: .2s;
	  }
	  #mac_button li:hover::before {
	    left: 0;
	    opacity: 1;
	    -webkit-transform: scale(1);
	    -moz-transform: scale(1);
	    transform: scale(1);
	  }
	</style>
	<style id="before-class"></style>  <!-- 額外加入樣式 --

<br/>
看完了 HTML 與 CSS，就來進入重點的 jquery code，一開始的這一段，用來定義 icon 的大小，以及整組 icon 的位置，順便把常用的選擇器宣告起來。

    var limin = 30,  //icon縮小時候的寬度
    	limax = 64,  //icon放大時候的寬度
    	areax = 50, //整組 icon 的位置
    	areay = 100,
    	diff = limax - limin;
    var $icon =  $('#mac_button li');

<br/>
接著根據不同的 icon 大小，把偽元素的大小和位置也給定位好。

    $('#before-class').html(
    		'#mac_button li::before{width:'+(limax+4)+'px;left:'+((limin-(limax+4)*0.6)/2)+'px}'
    	);  //修改::before樣式，利用 ::before 來產生說明文字

<br/>
定義每個 icon 的大小，還有整個按鈕群的大小，為什麼要定義整個按鈕群的大小呢？目的是為了讓按鈕群置中，如此一來才不會發生當按鈕變大的時候，最右邊的按鈕會凸出去縮進來的窘境，以及未來在整個畫面的編排上，也比較容易定位。

    $icon.css({
      'width': limin + 'px',  
      'height': limin + 'px'
    });  //定義每個icon的大小

    $('#mouse_area').css({
      'width': $icon.length * limin + 4 * limax + 'px',  
      'top': areay + 'px',
      'left': areax + 'px'
    });  //定義左右滑鼠區域，目的為了讓 icon 群置中

<br/>
這裡我用了一個簡單的變數來判斷滑鼠是否還在按鈕群裏頭，目的是要讓滑鼠第一次滑上去的時候，icon 會有放大的動畫效果，而不是蹦一下的變大

    var a = 0;  //判斷滑鼠是否還在icon群裏頭的簡單參數

<br/>
接著進入重點程式，讓滑鼠滑上去的 icon 有個 class 名稱識別，這個 icon 的左右兩個 icon 也有 class 名稱識別，如此一來就可以動態設定它們的尺寸。

    $icon.hover(function(e) {
      $(this).addClass('lihover');        //讓滑鼠 hover 與其左右 li 都有 class
      $(this).next().addClass('linext');
      $(this).prev().addClass('liprev');
      $icon.not('.lihover,.linext,.liprev').css({
        'width': limin + 'px',
        'height': limin + 'px',
        'margin-top': '0'
      });  //讓沒有 class 的 icon 恢復最小長寬

<br/>
這是最關鍵的計算公式，原理其實就是當滑鼠在 icon 上頭 ( hover ) 的時候，把這個 icon 的中心點和滑鼠座標的差值，分別套用到左右兩個 icon 的尺寸裏頭，就可以做到這個效果。

      if (a == 0) {
        var licenterx = $('.lihover').offset().left + $('.lihover').width() * 0.5,  //hover icon 的中心位置
        		mousex = e.pageX,
        		x = mousex - licenterx,
        		x1 = x / (1 - (diff / limax)),
        		nextwidth = limin + diff / limax * (0.5 * limax + x1),  //左右 icon 的大小隨滑鼠位置不同而改變
        		prevwidth = limin + diff / limax * (0.5 * limax - x1),
        		mtNext = -0.5 * diff - diff / limax * x1,  //為了置底，margin-top 也必須改變
        		mtPrev = -0.5 * diff + diff / limax * x1;

        $('.linext').stop().animate({
          'width': nextwidth + 'px',
          'height': nextwidth + 'px',
          'margin-top': mtNext + 'px'
        }, 100);
        $('.liprev').stop().animate({
          'width': prevwidth + 'px',
          'height': prevwidth + 'px',
          'margin-top': mtPrev + 'px'
        }, 100);
        $('.lihover').stop().animate({
          'width': limax + 'px',
          'height': limax + 'px',
          'margin-top': -diff + 'px'
        }, 100, function(){
	        $('.lihover').on('mousemove', _mouseMove);  //動畫完成後再 callback，避免突然放大
        	a = 1;
        });
      } else {
        $('.lihover').on('mousemove', _mouseMove); //如果已經是 hover，就直接執行
      }

    }, function() {
      $icon.removeClass('lihover linext liprev').off('mousemove');
    });

<br/>
當滑鼠離開按鈕群的時候，所有按鈕恢復原狀。

    $('#mac_button').on('mouseleave', function() {
      a = 0;
      $('li').stop().animate({
        'width': limin + 'px',
        'height': limin + 'px',
        'margin-top': '0'
      }, 200);
    });

<br/>
最後這是剛剛 callback 的程式，是在滑鼠移動的時候，立馬計算左右 icon 的尺寸。

    function _mouseMove(e) {
      var licenterx2 = $('.lihover').offset().left + $('.lihover').width() * 0.5,
      		mousex2 = e.pageX,
      		x2 = mousex2 - licenterx2,
      		nextwidth2 = limin + diff / limax * (0.5 * limax + x2),
      		prevwidth2 = limin + diff / limax * (0.5 * limax - x2),
      		mtNext2 = -0.5 * diff - diff / limax * x2,
      		mtPrev2 = -0.5 * diff + diff / limax * x2;

      $('.lihover').css({
        'width': limax + 'px',
        'height': limax + 'px',
        'margin-top': -diff + 'px'
      });
      $('.linext').css({
        'width': nextwidth2 + 'px',
        'height': nextwidth2 + 'px',
        'margin-top': mtNext2 + 'px'
      });
      $('.liprev').css({
        'width': prevwidth2 + 'px',
        'height': prevwidth2 + 'px',
        'margin-top': mtPrev2 + 'px'
      });

      $icon.not('.lihover,.linext,.liprev').css({
        'width': limin + 'px',
        'height': limin + 'px',
        'margin-top': '0'
      });
    }

<br/>
以上，就是我這個效果的完整程式碼，不是很難，真正難的是要理解變大變小的原理，不過實際上 Mac Dock 好像也不是用這種方式，有興趣的可以參考美國專利局裏頭 Mac Dock 的專利說明：[http://www.google.com/patents/US7434177](http://www.google.com/patents/US7434177)。

( 完成範例：[mac-dock-demo.html](/demo/201501/mac-dock-demo.html) )

![Mac Docker 實作](/img/articles/201501/20150103_1_03.gif)

<!-- @@close-->

