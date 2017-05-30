# 單一 div 的正多邊形變換 ( 純 CSS ) 

![](/img/articles/201503/css-regular-polygon-transform.jpg#preview-img)

[上一篇](http://www.oxxostudio.tw/articles/201503/css-material-design-icon.html) 我們介紹了如何利用 before 和 after 偽元素來做 Material Design 風格的按鈕，裏頭關鍵的技術就在於活用邊框寬度和 div 本體寬高，因此這篇再加碼一個效果，就是純粹利用 CSS，讓「**單一個**」div，從正三角形變換為正八邊形 ( 單一 div 最多只能做到正八邊形 )，最後再搭配動畫的效果，變成正多邊形的變換動畫，也由於正多邊形需要用到不少的三角函數計算，為了方便起見，這裡將正多邊形的邊統一都設為 100px。

如果對於偽元素的應用有興趣的，也可以參考我之前的一些文章的啦！

>- [CSS3動畫 - Google Loading Animation](http://www.oxxostudio.tw/articles/201406/css-google-loading.html)
- [電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html)
- [點擊後的 CSS 載入效果](http://www.oxxostudio.tw/articles/201412/css-click-loading.html)
- [有趣的 CSS 彈跳動畫](http://www.oxxostudio.tw/articles/201502/css-bounce.html)
- [純 CSS 繪製圓餅圖](http://www.oxxostudio.tw/articles/201503/css-pie-chart.html)

<br/>

- **正三角形**

	正三角形不需要用到偽元素，只需要設定 div 本身的邊框寬度即可產生，先來看一下正三角形的邊長與中線，若邊長為 100px，則中線四捨五入就是 87px `( 100 x sin(60) = 87 )`。

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_02.jpg)

	因此我們要將 div 的長寬都設為 0，接著把底部 border 的寬度設為 87px，左右的 border 寬度設為 50px ( 顏色設為透明 transparent )，就可以做出一個漂亮的三角形。( 範例：[css-regular-polygon-transform-demo1.html](/demo/201503/css-regular-polygon-transform-demo1.html) )

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_03.jpg)

	    width:0;
		height:0;
		border-width:0 50px 87px ;
		border-style:solid;
		border-color:transparent transparent #095;

<br/>

- **正方形**

	正方形應該是最簡單的，只要設定長寬設定為同樣數值就可以了，不過其實還有另外兩種方法，第一種你可以把長寬設為 0，把上下左右的 border 設為 50px 也可以，第二種則是高度設為 0，寬度設為 100px，然後某個邊寬也設為 100，都是可以的。( 範例：[css-regular-polygon-transform-demo2.html](/demo/201503/css-regular-polygon-transform-demo2.html) )

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_04.jpg)

		.a{
	    width:100px;
	    height:100px;
	    background:#c00;
		}
		.b{
	    width:0;
	    height:0;
	    border-width:50px;
	    border-style:solid;
	    border-color:#095;
		}
		.c{
	    width:100px;
	    height:0;
	    border-width:0 0 100px;
	    border-style:solid;
	    border-color:#069;
		}

<br/>

- **正五邊形**

	正五邊形就需要進入基本的三角函數領域了，讓我們先把正五邊形分解，用原本的 div 作為上方的三角形，然後用一個偽元素製作下方的梯形，因為正五邊形每邊的夾角為 108 度，所以可以藉由三角函數計算出上方三角形的高度為 59px `( 100 x cos(54) )`，寬度為 192px `( 100 x sin(54) x 2 )`，下方梯形的高度為 95px `( 100 x sin(72) )`，長邊的寬度跟上面的三角形一樣都是 192px。
	
	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_05.jpg)

	了解原理之後，就可以利用偽元素來搭配製作囉！( 範例：[css-regular-polygon-transform-demo3.html](/demo/201503/css-regular-polygon-transform-demo3.html) )

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_06.jpg)

		.a{
  		  position:relative;
	      width:0;
	      height:0;
	      border-width:0 81px 59px;
  		  border-style:solid;
	      border-color:transparent transparent #069;
		}
		.a:before{
		  position:absolute;
		  content:"";
		  top:59px;
		  left:-81px;
		  width:100px;
		  height:0;
		  background:none;
		  border-width:95px 31px 0;
		  border-style:solid;	
		  border-color:#069 transparent transparent;
  		}
	

<br/>

- **正六邊形**

	正六邊形的每個夾角是 120 度，如果以純 CSS 的方向來看的話，就是把正五邊形上面的三角形改變一下，就可以做出正六邊形，也就是變成上下兩個梯形的組合而已，梯形的長邊為 200px `( 100 x cos(60) x 2 + 100 )`，梯形的高度為 87px `( 100 x sin(60) )`。

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_07.jpg)

	所以只要把正五邊形的 CSS 稍作修改就可以做出正六邊形了。( 範例：[css-regular-polygon-transform-demo4.html](/demo/201503/css-regular-polygon-transform-demo4.html) )

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_08.jpg)

		.a{
  		  position:relative;
    	  width:100px;
    	  height:0;
    	  border-width:0 50px 87px;
  		  border-style:solid;
    	  border-color:transparent transparent #f80;
		}
		.a:before{
		  position:absolute;
		  content:"";
    	  top:87px;
    	  left:-50px;
    	  width:100px;
    	  height:0;
	      background:none;
    	  border-width:87px 50px 0;
		  border-style:solid;	
    	  border-color:#f80 transparent transparent;
  		}

<br/>

- **正七邊形**

	正七邊形開始就必須再使用 after 這個偽元素了，因為正七邊形必須要拆解為三個區塊，分別是用原本的 div 作為上面的三角形，一個偽元素作為中間的梯形，然後另一個偽元素作為底部的梯形，正七邊形的夾角比較特別不是整數，而是 128 又 4/7 度，大概取到小數第二位是 128.57，所以計算起來結果就如下圖所示，重點就是必須要清楚地知道長寬是多少。

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_09.jpg)

	有了長寬之後，就開始用 CSS 來寫囉！( 範例：[css-regular-polygon-transform-demo5.html](/demo/201503/css-regular-polygon-transform-demo5.html) )

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_10.jpg)

		.a{
  		  position:relative;
          width:0;
          height:0;
          border-width:0 90px 43px;
  		  border-style:solid;
          border-color:transparent transparent #09c;
		}
		.a:before{
		  position:absolute;
		  content:"";
          top:140px;
          left:-112px;
          width:100px;
          height:0;
          border-width:78px 62px 0;
		  border-style:solid;	
          border-color:#09c transparent transparent;
  		}
    	.a:after{
          position:absolute;
          content:"";
          top:43px;
          left:-112px;
          width:180px;
          height:0;
          border-width:0 22px 97px;
          background:none;
          border-style:solid;
          border-color:transparent transparent #09c;
    	}

<br/>

- **正八邊形**

	正八邊形其實就是把正七邊形上面的三角形變成梯形，然後中間的梯形變成矩形就搞定了，正八邊形的夾角為 135 度，計算出來的各個區域長寬如下圖。

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_11.jpg)

	同樣的了解原理，CSS 做起來就簡單多囉！( 範例：[css-regular-polygon-transform-demo6.html](/demo/201503/css-regular-polygon-transform-demo6.html) )

	![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_12.jpg)

		.a{
  		  position:relative;
          width:100px;
      	  height:0;
      	  border-width:0 71px 71px;
  		  border-style:solid;
          border-color:transparent transparent  #f69;
		}
		.a:before{
		  position:absolute;
		  content:"";
          top:171px;
      	  left:-71px;
      	  width:100px;
      	  height:0;
      	  border-width:71px 71px 0;
		  border-style:solid;	
      	  border-color: #f69 transparent transparent;
  		}
    	.a:after{
      	  position:absolute;
      	  content:"";
      	  top:71px;
      	  left:-71px;
      	  width:242px;
      	  height:0;
      	  border-width:0 0 100px;
      	  background:none;
      	  border-style:solid;
      	  border-color:transparent transparent #f69;
    	}

<br/>
以上就是純粹利用 CSS 做出來的單一 div 的正多邊形變換，如果熟練的話，其實加上動畫效果，就可以做出像下面範例這個樣子的變換動畫囉！不過下面的範例有再另外用一個 div 包在外面做大小的變換動畫，避免因為大小的變換造成銜接處的不密合，大家可以參考看看喔！( chrome 限定，範例：[css-regular-polygon-transform-demo7.html](/demo/201503/css-regular-polygon-transform-demo7.html) )

![單一 div 的正多邊形變換 ( 純 CSS )](/img/articles/201503/20150329_1_13.gif)

<br/>
其他與偽元素有關的 CSS 文章參考：

>- [CSS3動畫 - Google Loading Animation](http://www.oxxostudio.tw/articles/201406/css-google-loading.html)
- [電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html)
- [點擊後的 CSS 載入效果](http://www.oxxostudio.tw/articles/201412/css-click-loading.html)
- [有趣的 CSS 彈跳動畫](http://www.oxxostudio.tw/articles/201502/css-bounce.html)
- [純 CSS 繪製圓餅圖](http://www.oxxostudio.tw/articles/201503/css-pie-chart.html)
