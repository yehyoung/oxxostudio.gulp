# box-sizing 與 background-clip 

過去在學習 CSS 的時候，首要任務就是要理解「box model」，因為　box model 是 CSS 裏頭很重要的模型概念，描述了 padding、margin、border 與 content 的空間定位 ( 參考 [W3C Box model](http://www.w3.org/TR/CSS2/box.html) )，雖然 CSS 是我吃飯的工具，但今天的專案竟然卡在一個簡單的小問題，因此就用一篇文章做個紀錄提醒自己不要忘記，也避免之後遭遇到又會卡住了。( 下圖就是 CSS 的 box model )

![box-sizing 與 background-clip](/img/articles/201412/20141210_1_02.jpg)

今天遇到的問題是出在我用了一個半透明的 border，但卻無法順利地透過並顯示背景的圖案或顏色，後來發現原來 box 預設的 border ，其實是在這個 box 之內的，雖然 border 在 box 的內部，但其實與剛剛的 box model 並沒有相違背，因為 border 包住的空間，仍然是 padding 與 content，只是如果把 border 變成半透明，就會把原本 box 的底色給呈現出來。( 如下圖 )

![box-sizing 與 background-clip](/img/articles/201412/20141210_1_03.jpg)

為了讓 border 可以順利的在外面顯示背景的圖案或顏色，就需要用到`box-sizing`與`background-clip`這兩個 CSS3 的屬性來設定，就讓我們來分別看看這兩個屬性該如何使用：

<br/>

- **box-sizing**

	`box-sizing`有兩個值可以設定，分別是：`content-box`(預設值) 與`border-box`，如果在`content-box`的情形下，我們設定了 box 的 padding 或 border，box 就會被撐開，因為 padding 和 border 是長在 box 內的，不過如果我們將`box-sizing`設定為`border-box`，那麼就會一直維持原始的大小，但相對的也就會壓縮內部的空間，我自己在設計網頁的習慣，都會預先把所有的 div 設為`border-box`，如此一來才能更方便去計算大小，也能避免內容的東西加了 padding 就把外框變大了，然後再根據當下的情況，去決定是否要改為`content-box`。

	下面的範例是用三個範例來對照參考，半透明的藍色方塊是原始的大小，第一張圖設定了`padding:20px;`，第二張圖除了 `padding:20px`之外，還有設定了`border:10px dotted rgba(255,0,0,.5);`，第三張圖則是與第二張圖同樣的設定，但`box-sizing`設為`border-box`，經由對照，就可以很明顯的發現彼此的差異。

	HTML：

	  	<div><div></div></div>
  		<div class="box default"><div></div></div>
  		<div class="box border-box"><div></div></div>

	CSS：

		div{
		  width:120px;
		  height:120px;
		  margin:20px 0 0 10px;
		  padding:20px;
		  display:inline-block;
		  background:url(圖);
		}
		div>div{
		  background:rgba(0,200,255,.4);
		  margin:0;
		  padding:0;
		}
		.box{
		  border:10px dotted rgba(255,0,0,.5);
		}
		.default{
		  /*box-sizing:content-box;*/ /*預設值*/
		}
		.border-box{
		  box-sizing:border-box;
		}

	![box-sizing 與 background-clip](/img/articles/201412/20141210_1_04.jpg)

<br/>

- **background-clip**

	嚴格說起來`background-clip`與`box-sizing`應該是八竿子打不著邊，但因為在設計一個 box 的時候，往往都會 border、padding 和 margin 混合使用，也因為這個 CSS3 的屬性，讓我剎那間不知道是哪裡寫錯了，結果原來是自己忘了屬性該怎麼使用。

	`background-clip`共有三個設定值，分別是：`border-box`( 預設值 )、`padding-box`、`content-box`，很有趣的是，剛剛的`box-sizing`預設值為`content-box`，這裡的預設值卻變成了`border-box`，下面的三張圖，分別代表了這三個設定值的長相，我們可以看到，第一章圖在預設值的情形下，邊框之下就是原本 box 的底色 ( 邊框是半透明的虛線 )，第二張圖設為`padding-box`，border 下方就不會有 box 底色，最後一個設定為`content-box`，就只會出現 content 區域的背景，border 與 padding 下的背景都會消失，這也是 background ( 背景 ) clip ( 剪裁 ) 的意義所在。

	HTML：

		<div class="box bg-border-box"><div></div></div>
		<div class="box bg-padding-box"><div></div></div>
		<div class="box bg-content-box"><div></div></div>

	CSS：

		div{
		  width:120px;
		  height:120px;
		  margin:20px 0 0 10px;
		  display:inline-block;
		  background:url(圖);
		  padding:20px;
		}
		div>div{
		  margin:0;
		  padding:0;
		  background:rgba(0,200,255,.4);
		}
		.bg-border-box{
		  /* background-clip:border-box; */ /*預設值*/
		}
		.bg-padding-box{
		  background-clip:padding-box;
		}
		.bg-content-box{
		  background-clip:content-box;
		}

	![box-sizing 與 background-clip](/img/articles/201412/20141210_1_05.jpg)

<br/>

以上就是看似無關卻又有關的`background-clip`與`box-sizing`，相信理解了之後，遇到 box 的尺寸大小調整，就能夠更得心應手囉！
