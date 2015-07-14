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

<meta property="article:published_time" content="2014-12-02T23:55:00+01:00">

<meta name="keywords" content="css,loading,before,偽元素,click">

<meta name="description" content="為了避免點擊後一兩秒的載入時間空窗，就做個 loading 動畫來強化使用者體驗，單純使用 CSS 的漸層效果來達成，沒想到效果還滿好的，而且不需要額外增加 div 之類的元素，單純修改 CSS 和加上點擊事件就完成了。">

<meta itemprop="name" content="點擊後的 CSS 載入效果 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201412/20141202_1_01b.jpg">

<meta itemprop="description" content="為了避免點擊後一兩秒的載入時間空窗，就做個 loading 動畫來強化使用者體驗，單純使用 CSS 的漸層效果來達成，沒想到效果還滿好的，而且不需要額外增加 div 之類的元素，單純修改 CSS 和加上點擊事件就完成了。">

<meta property="og:title" content="點擊後的 CSS 載入效果 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201412/css-click-loading.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201412/20141202_1_01b.jpg">

<meta property="og:description" content="為了避免點擊後一兩秒的載入時間空窗，就做個 loading 動畫來強化使用者體驗，單純使用 CSS 的漸層效果來達成，沒想到效果還滿好的，而且不需要額外增加 div 之類的元素，單純修改 CSS 和加上點擊事件就完成了。">

<title>點擊後的 CSS 載入效果  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##點擊後的 CSS 載入效果  <span class="article-date" tag="css"><i></i>DEC 2, 2014</span>

由於自己公司產品裏頭，有個按鈕在點擊之後，會有一兩秒的等待時間 ( 寄認證信 )，因此為了避免點擊後一兩秒的載入時間空窗，就做個 loading 動畫來強化使用者體驗，原本想說直接用張 gif 來解決，但又想藉著這個機會練功，就使用了 CSS 的漸層效果來達成，沒想到效果還滿好的，而且不需要額外增加 div 之類的元素，單純修改 CSS 和加上點擊事件就完成了。

<br/>
先來看一下完成的效果。( 範例：[css-click-loading-demo.html](css-click-loading-demo.html) )

![點擊後的 CSS 載入效果](/img/articles/201412/20141202_1_06.gif)

<br/>
這個效果其實很容易，先來看一下原本的按鈕長相，就只是個 div 套用 CSS 而已。

HTML：

	<div class="btn">click me</div>

CSS：

	.btn{
	  position:relative;
	  width:200px;
	  height:30px;
	  line-height:30px;
	  text-align:center;
	  border-radius:3px;
	  background:#5ad;
	  color:#fff;
	  cursor:pointer;
	}

長相就會是這樣 ( 就只是很簡單的 CSS ) ：

![點擊後的 CSS 載入效果](/img/articles/201412/20141202_1_02.jpg)

<br/>
那麼要怎麼在上面蓋上動畫呢？這時候就要利用 CSS 的偽元素 ( 參考 [電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html) )，在上方蓋上一個`before`偽元素，把動畫放在這個偽元素內即可。

CSS：

	.btn::before{
	  content:"loading";
	  position:absolute;
	  width:200px;
	  height:30px;
	  line-height:30px;
	  text-align:center;
	  border-radius:3px;
	  z-index:2;          //底層預設基本上都是 1，設 2 就可覆蓋
	  top:0;
	  left:0;
	  color:#fff;
	  text-shadow:rgba(100,0,0,1) 0 0 3px;
	  background:#c00;
	}

套上 before 之後，就會發現原本的被覆蓋了。

![點擊後的 CSS 載入效果](/img/articles/201412/20141202_1_03.jpg)

<br/>
了解原理後，再來就是把 before 的背景改成動畫，這裡用到兩個 CSS3 的技巧，第一個是漸層色的背景，第二個是動畫，第一個漸層色比較複雜些，主要就是讓漸層以 45 度的方式填充，內容是兩種顏色互相搭配，但必須配合`background-size`，讓漸層能夠順利地接在一起，這邊通常是要調整最久的地方。

	  background:-webkit-linear-gradient(45deg,#fc0 0%,#fc0 20%,#fa0 20%, #fa0 45%,#fc0 45%,#fc0 70%,#fa0 70%, #fa0 95%,#fc0 95%,#fc0 100%);
	  background-size:30px 30px;
	  background-position:0 0;

從下圖可以看到，如果沒有一步步調整，出來的長相可能就會沒接好，調整完成的就會接得很順暢。

![點擊後的 CSS 載入效果](/img/articles/201412/20141202_1_04.jpg)

<br/>
完成之後就是要套用 CSS3 的動畫效果，讓`background-position`改變，背景就會自動變化了。

	-webkit-animation:click 1s infinite linear;	

	@-webkit-keyframes "click"{
	  0%{
	    background-position:0 0;
	  }
	  100%{
	    background-position:30px 0;
	  }
	}

![點擊後的 CSS 載入效果](/img/articles/201412/20141202_1_05.gif)

<br/>
到這邊其實完成了百分之八十了，最後一步就是要加上點擊的事件，這裡我的作法是先把剛剛的偽元素用`display:none`隱藏起來，接著新增一個 class 名為 click，當點擊按鈕的時候，按鈕就會套用 click 的 class，偽元素就會出現了，以下是完整的程式碼，不過有做了些簡化，以及讓點擊 2 秒之後，按鈕會恢復原樣。( 範例：[css-click-loading-demo.html](css-click-loading-demo.html) )

CSS：

	.btn,.btn::before{
	  width:200px;
	  height:30px;
	  line-height:30px;
	  text-align:center;
	  border-radius:3px;
	}
	.btn{
	  position:relative;
	  background:#5ad;
	  color:#fff;
	  cursor:pointer;
	}
	.btn::before{
	  content:"loading";
	  position:absolute;
	  display:none;
	  z-index:2;
	  top:0;
	  left:0;
	  color:#fff;
	  text-shadow:rgba(100,0,0,1) 0 0 3px;
	  background:-webkit-linear-gradient(45deg,#fc0 0%,#fc0 20%,#fa0 20%, #fa0 45%,#fc0 45%,#fc0 70%,#fa0 70%, #fa0 95%,#fc0 95%,#fc0 100%);
	  background-size:30px 30px;
	  background-position:0 0;
	   -webkit-animation:click 1s infinite linear;
	}
	.btn.click::before{
	  display:block;
	}
	@-webkit-keyframes "click"{
	  0%{
	    background-position:0 0;
	  }
	  100%{
	    background-position:30px 0;
	  }
	}

jquery：

	$(function(){
	  var timer;
	  $('.btn').on('click',function(){
	    $('.btn').addClass('click');
	    clearTimeout(timer);
	    timer = setTimeout(function(){
	      $('.btn').removeClass('click');
	    },2000);
	  });
	});

![點擊後的 CSS 載入效果](/img/articles/201412/20141202_1_06.gif)

<br/>
CSS 的偽元素其實超好用的，除了之前分享過的 [電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html)，這篇的效果也是一個利用偽元素達成的效果，不需要改變 HTML 結構，輕鬆完成的啦喔哈！

<!-- @@close-->

