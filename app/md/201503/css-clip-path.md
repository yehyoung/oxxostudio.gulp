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

<meta property="article:published_time" content="2015-03-30T23:55:00+01:00">

<meta name="keywords" content="css,css3,clip path,clip,polygon">

<meta name="description" content="在單一 div 的正多邊形變換 ( 純 CSS ) 這篇所提到繪製正多邊形的方法，算是純粹利用偽元素來完成，不過坦白說還有另外一種方法，可以將單一 div 做更多形狀的變換，這種方法就是 CSS3 的「clip-path」，這個「clip-path 」看起來有點眼熟，因為它原本就存在於 SVG 裡頭。">

<meta itemprop="name" content="運用 clip-path 的純 CSS 形狀變換 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201503/20150330_1_01b.jpg">

<meta itemprop="description" content="在單一 div 的正多邊形變換 ( 純 CSS ) 這篇所提到繪製正多邊形的方法，算是純粹利用偽元素來完成，不過坦白說還有另外一種方法，可以將單一 div 做更多形狀的變換，這種方法就是 CSS3 的「clip-path」，這個「clip-path 」看起來有點眼熟，因為它原本就存在於 SVG 裡頭。">

<meta property="og:title" content="運用 clip-path 的純 CSS 形狀變換 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201503/css-clip-path.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201503/20150330_1_01b.jpg">

<meta property="og:description" content="在單一 div 的正多邊形變換 ( 純 CSS ) 這篇所提到繪製正多邊形的方法，算是純粹利用偽元素來完成，不過坦白說還有另外一種方法，可以將單一 div 做更多形狀的變換，這種方法就是 CSS3 的「clip-path」，這個「clip-path 」看起來有點眼熟，因為它原本就存在於 SVG 裡頭。">

<title>運用 clip-path 的純 CSS 形狀變換 - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##運用 clip-path 的純 CSS 形狀變換  <span class="article-date" tag="css">MAR 30, 2015</span>

在 [單一 div 的正多邊形變換 ( 純 CSS )](http://www.oxxostudio.tw/articles/201503/css-regular-polygon-transform.html) 這篇所提到繪製正多邊形的方法，算是純粹利用偽元素來完成，不過坦白說還有另外一種方法，可以將單一 div 做更多形狀的變換，這種方法就是 CSS3 的「clip-path」，這個「clip-path
」看起來有點眼熟，因為它原本就存在於 SVG 裡頭 ( 參考：[SVG 研究之路 (9) - Clipping and Masking](http://www.oxxostudio.tw/articles/201406/svg-09-clipping-masking.html) )，利用遮罩 ( 剪裁 ) 的方法，連接座標繪製遮罩區域，就可以做出許多不同的形狀，讓底色或底圖顯現，隨著瀏覽器對於 CSS3 的支援度大幅提升，自然而然的就可以用它來做些與眾不同的變化。

最先看到這個屬性的應用，是從這個網站看到的：[http://species-in-pieces.com/](http://species-in-pieces.com/) ，不得不說這個網站做得實在太神了，一開始看到還真以為是用 SVG 做的，沒想到竟然是用 CSS 刻出來的... 真是太驚人啦！

![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_02.jpg)

接著在找資料的過程中，又發現一個很強的網站：[http://bennettfeely.com/clippy/](http://bennettfeely.com/clippy/) ，專門介紹「clip-path」這個 CSS3 的屬性，你可以直接在上面拖拉或修改，除了貝茲曲線外，幾乎任何形狀都做得出來 ( 中空的部分要用組合的 )

![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_03.jpg)

如果不考慮一些瀏覽器支援度的問題，使用 clip-path 來繪製多邊形，還比利用偽元素還製作多邊形來得簡單許多，而且也可以做到單一 div 繪製超過八邊形，使用偽元素的繪製是直接從長寬著手，而利用 clip-path 則是要由每個點的座標著手，因為是座標點的緣故，要做出正多邊形就也同樣要用到許多基本的三角函式來計算座標，以下就利用 clip-path 來繪製圓形、橢圓和正多邊形給大家看看。( 請用 Chrome 看吧！ )

開始繪製之前，有兩點注意事項：

>- 使用 clip-path 要從同一個方向繪製，如果順時針繪製就一律順時針，逆時針就一律逆時針，因為 polygon 是一個連續的線段，若線段彼此有交集，面積區域就會有相減的狀況發生 ( 當然如果這是你要的效果就無妨了 )。
- 如果繪製時採用「比例」的方式繪製，長寬就必須要先行設定，不然有可能繪製出來的長寬和我們想像的就會有落差，使用「像素」繪製就沒有這種問題。

<br/>

- **圓形 circle( 半徑 at 圓心座標 )**

	範例：[css-clip-path-demo1.html](/demo/201503/css-clip-path-demo1.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_04.jpg)

		.circle{
		  width:100px;
		  height:100px;
		  background:#0cc;
		  -webkit-clip-path:circle(50% at 50% 50%);
		}

<br/>

- **橢圓形 ellipse( 長、短軸半徑 at 圓心座標 )**

	範例：[css-clip-path-demo2.html](/demo/201503/css-clip-path-demo2.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_05.jpg)
	
		.ellipse{
		  width:100px;
		  height:100px;
		  background:#aaa;
		  -webkit-clip-path:ellipse(25% 50% at 50% 50%);
		}

<br/>

- **內置矩形 inset( 上右下左的邊距 round 上右下左圓角 )**

	範例：[css-clip-path-demo3.html](/demo/201503/css-clip-path-demo3.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_06.jpg)
	
		.inset{
		  width:100px;
		  height:100px;
		  background:#99f;
		  -webkit-clip-path:inset(10px 20px 30px 10px round 20px 5px 50px 0);
		}

<br/>

- **正三角形**

	範例：[css-clip-path-demo4.html](/demo/201503/css-clip-path-demo4.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_07.jpg)

		.a{
		  width:100px;
		  height:87px;
		  background:#c00;
		  -webkit-clip-path:polygon(0% 100%, 50%  0%,100% 100%);
		}

<br/>

- **正方形**

	範例：[css-clip-path-demo5.html](/demo/201503/css-clip-path-demo5.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_08.jpg)

		.b{
		  width:100px;
		  height:100px;
		  background:#069;
		  -webkit-clip-path:polygon(0% 0%, 0% 100%,100% 100%,100% 0%);
		}

<br/>

- **正五邊形**

	正五邊形就要計算一下了，`59/(59+95)=38.31%`，`31/(81*2)=19.14%`，範例：[css-clip-path-demo6.html](/demo/201503/css-clip-path-demo6.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_09.jpg)

		.c{
		  width:162px;
		  height:154px;
		  background:#095;
		  -webkit-clip-path:polygon(0% 38.31%, 50% 0%,100% 38.31%,80.86% 100%,19.14% 100%);
		}

<br/>

- **正六邊形**

	正六邊形的計算比較簡單，`50/(100+50*2)=25%`，`150/(100+50*2)=75%`，範例：[css-clip-path-demo7.html](/demo/201503/css-clip-path-demo7.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_10.jpg)

		.d{
		  width:200px;
		  height:174px;
		  background:#f80;
		  -webkit-clip-path:polygon(25% 0%, 75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);
		}

<br/>

- **正七邊形**

	正七邊形是這裡頭需要計算最多的形狀，`22/(100+62*2)=10.09%`，`202/(100+62*2)=90.18%`，`43/(43+97+78)=19.72%`，`(43+97)/(43+97+78)=64.22%`，`62/(100+62*2)=27.68%`，`(100+62)/(100+62*2)=72.32%`，範例：[css-clip-path-demo8.html](/demo/201503/css-clip-path-demo8.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_11.jpg)

		.e{
		  width:224px;
		  height:218px;
		  background:#09c;
		  -webkit-clip-path:polygon(50% 0%, 90.18% 19.72%,100% 64.22%,72.32% 100%,27.68% 100%,0% 64.22%,10.09% 19.72%);
		}

<br/>

- **正八邊形**

	正八邊形的計算如下，`71/(100+71*2)=29.34%`，`(71+100)/(100+71*2)=70.66%`，範例：[css-clip-path-demo9.html](/demo/201503/css-clip-path-demo9.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_12.jpg)

		.f{
		  width:242px;
		  height:242px;
		  background:#f69;
		  -webkit-clip-path:polygon(29.34% 0%, 70.66% 0%,100% 29.34%,100% 70.66%,70.66% 100%,29.34% 100%,0% 70.66%,0% 29.34%);
		}

<br/>
熟練了 clip-path 之後，當然就要用它來做點動畫，下面提供兩個範例，第一個是正多邊形的變換，第二個則是三角形的變換組合，雖然看起來很簡單，但實際製作起來卻要考慮每個點的座標，為了讓形狀不要有「翻轉」的錯覺，**形狀裡頭每個點在進行移動的時候，盡可能的不要交錯**，因為只要一交錯，就會有交集的空白產生，就會有不自然或是翻轉的現象喔！當然同樣的，如果你希望有翻轉的效果，應該就要讓他們交錯囉！

<br/>

- **正多邊形的變換**

	範例：[css-clip-path-demo10.html](/demo/201503/css-clip-path-demo10.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_13.gif)

<br/>

- **三角形的變換組合**

	範例：[css-clip-path-demo11.html](/demo/201503/css-clip-path-demo11.html)

	![運用 clip-path 的純 CSS 形狀變換](/img/articles/201503/20150330_1_14.gif)


<br/>
以上就是利用 clip-path 所完成的純 CSS 形狀變換，如果你不喜歡這種方式，或是瀏覽器還有一些哩哩摳摳的支援度問題，也可以純粹使用偽元素來進行形狀的變換，請參考上一篇 [單一 div 的正多邊形變換 ( 純 CSS )](http://www.oxxostudio.tw/articles/201503/css-regular-polygon-transform.html)

<!-- @@close-->

