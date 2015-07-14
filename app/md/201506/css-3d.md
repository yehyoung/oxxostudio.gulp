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

<meta property="article:published_time" content="2015-06-19T17:25:00+01:00">

<meta name="keywords" content="css,css3,css 3d">

<meta name="description" content="CSS 3D 坦白說就是純粹利用計算的方法，藉由瀏覽器的高效能，在 2D 的空間繪製一個 3D 的圖形，就像我們拿張紙，用鉛筆在上頭畫個正立方體之類的，從這篇開始以及再來的一兩篇，將會深入介紹 CSS 3D 的繪圖以及直接做些應用。">

<meta itemprop="name" content="玩轉 CSS 3D - 原理篇 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201506/20150619_1_01b.jpg">

<meta itemprop="description" content="CSS 3D 坦白說就是純粹利用計算的方法，藉由瀏覽器的高效能，在 2D 的空間繪製一個 3D 的圖形，就像我們拿張紙，用鉛筆在上頭畫個正立方體之類的，從這篇開始以及再來的一兩篇，將會深入介紹 CSS 3D 的繪圖以及直接做些應用。">

<meta property="og:title" content="玩轉 CSS 3D - 原理篇 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201506/css-3d.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201506/20150619_1_01b.jpg">

<meta property="og:description" content="CSS 3D 坦白說就是純粹利用計算的方法，藉由瀏覽器的高效能，在 2D 的空間繪製一個 3D 的圖形，就像我們拿張紙，用鉛筆在上頭畫個正立方體之類的，從這篇開始以及再來的一兩篇，將會深入介紹 CSS 3D 的繪圖以及直接做些應用。">

<title>玩轉 CSS 3D - 原理篇 - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##玩轉 CSS 3D - 原理篇  <span class="article-date" tag="css"><i></i>JUN 19, 2015</span>

這篇 CSS 3D 的文章，其實醞釀已久，從 CSS 3D 出來的時候就已經在關注，只是要寫 CSS 3D 真的很費工，裏頭太多東西要講，加上最近在做 [Webduino](http://webduino.io) 可以改變世界的事業 ( Webduino 超讚呀！ )，所以就一直擱著了，趁著端午連假，一口氣把它搞定吧！

雖然 CSS 3D 並非真的 3D，也不是甚麼 2.5D ( 因為無法解釋 0.5 的小數點的意義為何，所以我不會這樣講 )，CSS 3D 坦白說就是純粹利用計算的方法，藉由瀏覽器的高效能，在 2D 的空間繪製一個 3D 的圖形，就像我們拿張紙，用鉛筆在上頭畫個正立方體之類的，也因為是藉用了瀏覽器來運算，自然而然非常地耗效能，往往只要有過多的形狀轉換為 3D 呈現，就會發現電腦的風扇開始狂轉，這也是使用 CSS 3D 必須要注意的地方，畢竟 CSS 原本就不是拿來做 3D 應用的技術，可以畫 3D，只是可以加強 CSS 呈現的美感和能力，但用在精細的 3D 動畫或轉場效果，還是交給專業的 3D 繪圖軟體來進行。

從這篇開始的接下來幾篇，將會深入介紹 CSS 3D 的繪圖以及直接做些應用。
	
<br/>

- **3D 起手式**

	我們這邊先來用 Google SketchUp 這個免費的 3D 建模軟體，看一下最普通的 3D 繪圖的介面，從裏頭最基本的會有三個元素，第一個：攝影鏡頭，第二個：立體空間，第三個：立體物件。
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_02.jpg)
	
	<br/>
	攝影鏡頭主要定義了觀看者的角度，就如同我們在拍照，使用長焦距的望遠鏡頭，物體可以拉近且比較不會變形，使用短焦距的廣角鏡，拍攝的物體就容易變形，從下圖可以看出，鏡頭的焦距可以讓空間內的物體產生不同的變形，至於立體空間則是具備了 X、Y、Z 三個座標軸的空間，立體物件則是在這個空間裏頭的物件。
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_03.jpg)
	
	<br/>
	所以繪製 CSS 的 3D 圖形，最重要的也就是要架設這三個物件，不過因為在 CSS 裡並沒有攝影鏡頭、立體空間...等這些 3D 軟體才有的元素，所以變成都是用 div 取代，在對應的 div 上頭加入對應的 style 屬性，就可以進行模擬，藉由上面所提到的三個元素，我們這裡就必須要用到三層 div，最外層是攝影鏡頭，第二層為立體空間，第三層則是立體空間內的立體元素，寫出來的 HTML 長得就像下面這樣：
	
		<div class="camera">
			<div class="space">
				<div class="box"></div>
			</div>
		</div>

<br/>

- **設定 camera**

	接著就要來把最外層的 div ( 以下通稱 camera ) 設定為攝影鏡頭，設定的方法為添加 perspective-origin 以及 perspective 這兩個屬性，這個屬性是什麼呢？簡單來說就是透視點以及鏡頭到透視點的距離，如果直接查詢 perspective，看到的八九不離十是下面這些圖案：( 圖片來源：http://mathworld.wolfram.com/Perspective.html )
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_04.jpg)
	
	<br/>
	然而在 W3C 裏頭對於 perspective 的解釋則是下圖這樣，透視點同樣也是物體到攝影機的距離 ( d ) ，但又因為 CSS 的 3D 空間裏頭具有 Z 軸，所以 perspective 的距離會因為 Z 軸的關係而有所縮放 ( 不過千萬要注意，這裡的 Z 指的是物體的 Z 軸，也就是 translateZ，不是攝影機的 )。
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_05.jpg)
	
	<br/>
	此外，perspective-origin 是攝影機的中心點位置，預設相對應空間 div ( 以下都稱為 space ) 的中心點，不做設定的話預設都是 center center ( 或 50% 50% )，換句話說，作為攝影鏡頭的 camera 的三個維度，perspective-origin 代表了 X 和 Y 軸，而 perspective 代表 Z 軸 ( 和內容物體的 Z 軸相減才會變成攝影機的 )，camera 就可以在三維空間裏頭進行移動，下圖同樣是 W3C 對於 perspective-origin 所作的解釋，當攝影鏡頭往上，圖形的下半部就看不到了。
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_06.jpg)
	
	<br/>
	回到 CSS 來看的話，我們可以像下面這樣設定，這時候會完全沒有畫面是正常的，因為還沒有設定空間和物體。
	
		.camera{
			width:200px;
			height:200px;
			perspective-origin:center center;
			-moz-perspective-origin:center center;
			-webkit-perspective-origin:center center;
			perspective:500px;
			-moz-perspective:500px;
			-webkit-perspective:500px;
		}

<br/>

- **設定 space**

	攝影機完成後，就是要設定一個立體空間 space，這個空間設定的方式很簡單，只要設定一個屬性：transform-style，這個屬性預設為 flat，也就是只要是這個 div 內的子元素，一律都是以扁平 ( flat ) 的方式呈現，所屬的變換 transform 也一律都是用 flat 的方式變換，換句話說就是沒有 Z 軸的存在，為了讓內容元素都是立體元素，所以我們要將 transform-style 設為 3D，如此一來內容元素就全部都可以用 3D 進行變換，為了方便區隔，下面我將 space 外圍多一個 boder 做識別。( 範例：[css-3d-demo01.html](/demo/201506/css-3d-demo01.html) )
	
		.space{
			width:100%;
			height:100%;
			border:1px dashed #000;
			transform-style:3d;
			-moz-transform-style:3d;
			-webkit-transform-style:3d;
		}

	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_07.jpg)

<br/>

- **設定 box**

	最後就是內容元素 box 了，我們可以添加一個 100px x 100px 的 box 進去，接著，用這個 box 來複習一下前面講的觀念，在**沒有設定 box 的 traslateZ、rotate 的情形下，不論我們如何去修改 camera 的 perspective-origin 和 perspective，box 的大小和位置都不會有變化**，為什麼呢？因為在沒有設定 box 的 translateZ 或 rotate，讓 Z 的深度有所變化，攝影機透過 perspective 看出去的位置都是相同的，也造成不論怎麼去看這個 box 都是一樣的大小。( 範例：[css-3d-demo02.html]((/demo/201506/css-3d-demo02.html) )
	
		.box{
			width:100px;
			height:100px;
			background:#069;
			transform:translateX(50px) translateY(50px);
			-moz-transform:translateX(50px) translateY(50px);
			-webkit-transform:translateX(50px) translateY(50px);
		}
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_08.jpg)

	<br/>
	不過當我們給 box 	改變 Z 軸的深度之後 ( 這裡我先把 translateZ 設定為 150px )，再去改變 camera 的 perspective-origin 和 perspective，一切彷彿就有了變化。( 範例：[css-3d-demo03.html](/demo/201506/css-3d-demo03.html) )
	
		.box{
			width:100px;
			height:100px;
			background:#069;
			transform:translateX(50px) translateY(50px) translateZ(150px);
			-moz-transform:translateX(50px) translateY(50px) translateZ(150px);
			-webkit-transform:translateX(50px) translateY(50px) translateZ(150px);
		}
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_09.jpg)

	<br/>
	大概了解之後，來把 box 旋轉一下角度，看得應該就會更清楚，當攝影機的變成廣角，也就是 perspective 變短，整個旋轉後變形也會更加明顯，大家可以用開發者工具修改 camera 的 perspective 就會明白。( 範例：[css-3d-demo04.html](/demo/201506/css-3d-demo04.html) )
	
		.box{
			width:100px;
			height:100px;
			background:#069;
			transform:translateX(50px) translateY(50px) rotateY(60deg);
			-moz-transform:translateX(50px) translateY(50px) rotateY(60deg);
			-webkit-transform:translateX(50px) translateY(50px) rotateY(60deg);
		}
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_10.gif)

	<br/>
	改變一下 perspective-origin 也會很有意思。
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_11.gif)


	<br/>
	再來我們加入多一點的 box，並且讓這些 box 的位置改變或旋轉，看看效果如何，這裡比較需要注意的地方，是我們必須要額外在每個 box 加入 position:absolute 的屬性，因為 div 本身為 block 屬性，會互相擠壓，要設定位置為絕對位置，才會正確地放在 space 裏頭。( 範例：[css-3d-demo05.html](/demo/201506/css-3d-demo05.html) )
	
		.space div{
			position:absolute;
			width:100px;
			height:100px;
		}
		.box1{
			background:#069;
			transform:translateX(50px) translateY(50px) rotateY(60deg);
			-moz-transform:translateX(50px) translateY(50px) rotateY(60deg);
			-webkit-transform:translateX(50px) translateY(50px) rotateY(60deg);
		}
		.box2{
			background:#c00;
			transform:translateX(100px) translateY(20px) rotateX(60deg);
			-moz-transform:translateX(100px) translateY(20px) rotateX(60deg);
			-webkit-transform:translateX(100px) translateY(20px) rotateX(60deg);
		}
		.box3{
			background:#f90;
			transform:translateX(0px) translateZ(-250px) rotateY(20deg);
			-moz-transform:translateX(0px) translateZ(-250px) rotateY(20deg);
			-webkit-transform:translateX(0px) translateZ(-250px) rotateY(20deg);
		}
		.box4{
			background:#0c9;
			transform:translateX(20px) translateY(80px) rotateX(-80deg);
			-moz-transform:translateX(20px) translateY(80px) rotateX(-80deg);
			-webkit-transform:translateX(20px) translateY(80px) rotateX(-80deg);
		}
	
	![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_12.jpg)

<br/>
藉由上述的三個 3D 元素，我們就可以輕鬆的繪製 CSS 3D 圖形，不過除了 camera、space 和 box 之外，還有一個**最重要最重要最重要**的撰寫規律在裏頭 ( 因為很重要所以要講三次 )，這個規律就是 tramsform 裏頭是有順序的，因為 CSS 3D 完全是藉由 2D 演算而來，並不是真的像 3D 軟體是真的有 3D 的空間，所以就變成會「按照順序」進行演算，而且又因為 transform 會造成物體的整個座標軸變換，在順序的編排上就格外重要。

例如今天我先讓 box 在 X 軸上水平位移 100px 再繞著 Y 軸順時針轉 60 度，和先繞 Y 軸順時針轉 60 度，再在 X 軸上頭水平位移 100px 的結果會**完全不同**，因為當我先繞了 Y 軸轉動，整個 X 軸也會跟著轉動，這時候再做水平位移，位置就會像是在深度做變換。( 範例：[css-3d-demo06.html](/demo/201506/css-3d-demo06.html) )

	.space div{
		position:absolute;
		width:100px;
		height:100px;
	}
	.box1{
		background:#069;
		transform:translateY(50px) translateX(100px) rotateY(60deg);
		-moz-transform:translateY(50px) translateX(100px) rotateY(60deg);
		-webkit-transform:translateY(50px) translateX(100px) rotateY(60deg);
	}
	.box2{
		background:#c00;
		transform:translateY(50px) rotateY(60deg) translateX(100px);
		-moz-transform:translateY(50px) rotateY(60deg) translateX(100px);
		-webkit-transform:translateY(50px) rotateY(60deg) translateX(100px);
	}
	
![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_13.jpg)

<br/>
transform 的數量少還比較看不出來，當今天 transform 裏頭數量一多，造成的差異就更加明顯，這也是在玩 CSS 3D 最最最最最需要注意的重點所在，一定要注意，一定要注意，一定要注意，非常重要所以再講三次呀！( 範例：[css-3d-demo07.html](/demo/201506/css-3d-demo07.html) )

	.space div{
		position:absolute;
		width:100px;
		height:100px;
	}
	.box1{
		background:#069;
		transform:translateY(50px) translateX(100px) rotateY(60deg) rotateX(60deg) translateX(-50px);
		-moz-transform:translateY(50px) translateX(100px) rotateY(60deg) rotateX(60deg) translateX(-50px);
		-webkit-transform:translateY(50px) translateX(100px) rotateY(60deg) rotateX(60deg) translateX(-50px);
	}
	.box2{
		background:#c00;
		transform:translateX(-50px) translateY(50px) rotateX(60deg) rotateY(60deg) translateX(100px);
		-moz-transform:translateX(-50px) translateY(50px) rotateX(60deg) rotateY(60deg) translateX(100px);
		-webkit-transform:translateX(-50px) translateY(50px) rotateX(60deg) rotateY(60deg) translateX(100px);
	}
	
![玩轉 CSS 3D - 原理篇](/img/articles/201506/20150619_1_14.jpg)


<br/>
以上就是 CSS 3D 的原理解析，坦白說如果明白了 3D 的結構組成，CSS 的 3D 就沒有難度，總而言之，就是先建立好三個元素：攝影機、立體空間、立體物件，就可以開始玩轉 CSS 3D 囉！

<!-- @@close-->


