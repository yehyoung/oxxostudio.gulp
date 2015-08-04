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

<meta property="article:published_time" content="2015-03-24T22:25:00+01:00">

<meta name="keywords" content="html5,css3,range,input,slider">

<meta name="description" content="今天來探討一下 HTML5 的 range 這個新的 input 類型，不過重點不是在 range 要如何使用，而是在如何去改變 range 的樣式，做出一個漂漂亮亮的滑動桿，這篇會介紹兩種修改 range 樣式的方法，一種是純 CSS，一種是用 jquery 搭配 CSS 來製作。">

<meta itemprop="name" content="改變 HTML5 range 樣式的兩種方法 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201503/20150324_1_01b.jpg">

<meta itemprop="description" content="今天來探討一下 HTML5 的 range 這個新的 input 類型，不過重點不是在 range 要如何使用，而是在如何去改變 range 的樣式，做出一個漂漂亮亮的滑動桿，這篇會介紹兩種修改 range 樣式的方法，一種是純 CSS，一種是用 jquery 搭配 CSS 來製作。">

<meta property="og:title" content="改變 HTML5 range 樣式的兩種方法 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201503/html5-input-range-style.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201503/20150324_1_01b.jpg">

<meta property="og:description" content="今天來探討一下 HTML5 的 range 這個新的 input 類型，不過重點不是在 range 要如何使用，而是在如何去改變 range 的樣式，做出一個漂漂亮亮的滑動桿，這篇會介紹兩種修改 range 樣式的方法，一種是純 CSS，一種是用 jquery 搭配 CSS 來製作。">

<title>改變 HTML5 range 樣式的兩種方法 - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##改變 HTML5 range 樣式的兩種方法  <span class="article-date" tag="css">MAR 24, 2015</span>

<img src="/img/articles/201503/20150324_1_01.jpg" class="preview-img">

今天來探討一下 HTML5 的 range 這個新的 input 類型，不過重點不是在 range 要如何使用，而是在如何去改變 range 的樣式，做出一個漂漂亮亮的滑動桿。

過去我們要製作美美的滑動桿 ( range slider )，不外乎就是用個 span 或 div ，搭配判斷滑鼠座標 ( pageX、pageY ) 與點擊事件來製作，就算是 HTML5 具有了 range 的 input 類型，預設的樣式只能滿足基本的需求，對於有一些要求視覺設計的網站來說，根本就毫無用武之地，只好自己手動自幹一個 range slider 來用了。

雖然這篇會介紹兩種修改 range 樣式的方法，但由於 HTML5 與 CSS3 在各個瀏覽器之間仍然沒有完全統一 ( 雖然去年十月好像就說標準制定完成了 )，所以要改變 range 的樣式，仍然必須使用到各家瀏覽器自己的特有寫法來調整，因此下列的範例，主要以 Chrome 為主，也會介紹 Firefox 的用法，至於 IE，能吃嗎？XD

首先要來寫一個 range 出來，min 是最小值，max 是最大值，step 是每隔間距，value 是預設數值：

 	<input type="range" min="0" max="100" step="1" value="50">

<br/>
如果沒有意外，看到的長相就會是下面這個樣子非常的....嗯...你懂的...

![改變 HTML5 range 樣式的兩種方法](/img/articles/201503/20150324_1_02.jpg)

<br/>
第一種方法是純 CSS 的做法，由於 range 是 input 的一種類型，我們無法用傳統的 CSS 編輯方法來修改樣式，這裡必須要使用到`-webkit-appearance`這個特殊屬性，這是 webkit 特有的屬性，代表使用系統預設的外觀，可惜 W3C 到寫這篇文章的時候，都還沒有納入規範 ( 不然 webkit 簡直是神呀 )，只要我們將這個屬性設為`none`，那麼原本 range 的樣式就不會呈現了，這時我們只要加入自己的背景、陰影...等樣式，就可以看到樣式被換過來了。

	input[type="range"]{
	  -webkit-appearance: none;
	  overflow:hidden;     /* 限定範圍 */
	  width:200px;
	  height:20px;
	  outline : none;      /* 避免點選會有藍線或虛線 */
	  background:none;
	}

<br/>
上面的 CSS 只是針對 range 的本體，但還有一個拉霸的按鈕樣式還沒改，這時候我們要使用另外一個 webkit 的偽元素`::-webkit-slider-thumb`來修改。

	input[type="range"]::-webkit-slider-thumb{
	  -webkit-appearance: none;
	  position: relative;    /* 設為相對位置，為了前後區塊的絕對位置而設定 */
	  width:10px;
	  height:10px;
	  background:#f22;
	  border-radius:50%;
	  transition:.2s;        /* 點選放大時候的漸變時間 */
	}

<br/>
 寫完上面這兩段，應該就可以看到 range slider 變成下面這個樣子只有一個紅點，然後這個紅點可以左右拉動。( 範例：[html5-input-range-style-demo1.html](/demo/201503/html5-input-range-style-demo1.html))

![改變 HTML5 range 樣式的兩種方法](/img/articles/201503/20150324_1_03.gif)

再來要進行的步驟就是要來加上一些顏色和效果，主要讓圓點左邊的區域是紅色，右邊的區域是淺紅色，這樣看起來才像是不同的 range，為了達到這個目的，我們要使用「偽元素裡面的偽元素」，也就是在 webkit 的`::-webkit-slider-thumb`偽元素的前後，各再安插`:before`和`:after`的偽元素，並讓這兩個偽元素顏色不同，就可以做出前後顏色差異的效果。

	input[type="range"]::-webkit-slider-thumb:before,
	input[type="range"]::-webkit-slider-thumb:after
	{
	  position: absolute;
	  top: 3px;
	  width: 2000px;          /* 長度很長沒關係，因為剛剛有用 overflow:hidden 了 */
	  height: 4px;
	  content:"";
	  pointer-events: none;   /* 讓滑鼠可以點擊穿透偽元素，不然會點不到下面 */
	  transition:.2s;
	}
	
	input[type="range"]::-webkit-slider-thumb:before{
	  left: -1997px;
	  background: #f22;
	}
	input[type="range"]::-webkit-slider-thumb:after {
	  left: 10px;
	  background: #edc;
	}

<br/>
這樣寫完之後，應該就已經可以看到前後不同顏色的 range slider 效果。( 範例：[html5-input-range-style-demo2.html](/demo/201503/html5-input-range-style-demo2.html))

![改變 HTML5 range 樣式的兩種方法](/img/articles/201503/20150324_1_04.gif)

不過光是這樣還不夠，接著我們要來讓點擊的時候圓圈會變大，本來想做滑鼠移上去就會變大，但兩層偽元素雖然會變大，但位置卻無法控制，所以就只好用 active 來代替。

	input[type="range"]:active::-webkit-slider-thumb:before,
	input[type="range"]:active::-webkit-slider-thumb:after
	{
	  top: 6px;
	}
	
	input[type="range"]:active::-webkit-slider-thumb{
	  width:16px;
	  height:16px;
	}
	
	input[type="range"]:active::-webkit-slider-thumb:after {
	  left: 16px;
	}

<br/>
完成之後的長相就會像下圖這樣。( 範例：[html5-input-range-style-demo3.html](/demo/201503/html5-input-range-style-demo3.html))

![改變 HTML5 range 樣式的兩種方法](/img/articles/201503/20150324_1_05.gif)

不過如果是 Firefox，就必須要做一些修改，因為 Firefox 是認不得 webkit 的，要在 Firefox 跑的 CSS 就要寫成下面這樣，相較於 webkit，Firefox 就顯得比較直覺，因為他裡面具有一個`::-moz-range-progress`的偽元素，利用這個偽元素，我們就不用在前後加個區塊，他直接就可以呈現 range 的色彩囉！

	input[type="range"]{
	  width:200px;
	  height:16px;
	  outline : none;
	  background:none;
	}
	
	input[type="range"]::-moz-range-track{
	  height:4px;
	  background:#edc;
	  border:none;
	}
	
	input[type="range"]::-moz-range-thumb{
	  width:10px;
	  height:10px;
	  background:#f22;
	  border:none;
	  border-radius:50%;
	}
	
	input[type="range"]::-moz-range-thumb:hover,input[type="range"]:active::-moz-range-thumb{
	  width:16px;
	  height:16px;
	}
	
	input[type="range"]::-moz-range-progress{
	  height:4px;
	  background:#f22;
	}
	
	input[type="range"]::-moz-focus-outer{
	  border:none;    /* 去除 focus 時候的外框虛線 */
	}

<br/>
好了，介紹完了用純 CSS 做 range slider 的用法之後，接著介紹一下如何用 CSS +  jQuery 做出一樣的效果，同樣的，我們要先用`-webkit-appearance`把原始樣式隱藏，先看到`input[type="range"]`的樣式，這邊我利用背景顏色漸層的方式，來完成左右顏色不同的效果 ( 雖然方便，但相對的就不能用純 CSS 控制 )。

	input[type="range"]{
	  -webkit-appearance: none;
	  border-radius:2px;
	  width:200px;
	  height:3px;
	  background-image:-webkit-linear-gradient(left ,#f22 0%,#f22 50%,#fff 50%, #fff 100%);
	  box-shadow:inset #ebb 0 0 5px;
	  outline : none;
	  transition:.1s;
	}


<br/>
接著看到`input[type="range"]::-webkit-slider-thumb`的樣式，並加上 hover 的效果：

	input[type="range"]::-webkit-slider-thumb{
	  -webkit-appearance: none;
	  width:10px;
	  height:10px;
	  background:#f22;
	  border-radius:50%;
	  transition:.1s;
	}
	
	input[type="range"]::-webkit-slider-thumb:hover,
	input[type="range"]::-webkit-slider-thumb:active{
	  width:16px;
	  height:16px;
	}


<br/>
因為背景是用漸層產生的呀，如果要動態改背景，就不是純 CSS 能辦得到的領域，這時候就要借助 jquery 來幫忙了，利用簡單的`focus`和`mousemove`，我們就可以讓背景跟著移動囉！ ( 範例：[html5-input-range-style-demo4.html](/demo/201503/html5-input-range-style-demo4.html))

	$(function(){
	  var r = $('input');
	  r.on('mouseenter',function(){
	    var p = r.val();
	    r.on('click',function(){
	      p = r.val();
	      bg(p);
	    });
	    r.on('mousemove',function(){
	      p = r.val();
	      bg(p);
	    });
	  });
	  function bg(n){
	      r.css({
	        'background-image':'-webkit-linear-gradient(left ,#f22 0%,#f22 '+n+'%,#fff '+n+'%, #fff 100%)'
	      });
	  }
	});

![改變 HTML5 range 樣式的兩種方法](/img/articles/201503/20150324_1_06.gif)

<br/>
以上就是用 CSS 和 jQuery 去修改 range  slider 樣式的基本方法，分享給大家，活用這個方法，就可以做出許多非常有特色的 range slider 囉。

<br/>
參考文章：

- [Styling native elements](https://gist.github.com/webtobesocial/aefd6e25064c08e0cc9a)
- [How I Did Make The Ubuntu HTML5 Range Slider](http://daker.me/2014/06/how-i-did-make-the-ubuntu-html5-range-slider.html)
- [穿透的 div ( pointer-events )](http://www.oxxostudio.tw/articles/201409/pointer-events.html)
- [電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html)

<!-- @@close-->