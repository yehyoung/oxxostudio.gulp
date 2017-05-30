# 玩轉 CSS 3D - 正四面體與正六面體  

繼 [上一篇](http://www.oxxostudio.tw/articles/201506/css-3d.html) 我們理解了 CSS 3D 的箇中原理之後，廢話就不用多說，直接來畫正多面體吧！只要正多面體可以畫出來，基本上在 CSS 3D 的領域裡，大概就沒甚麼難得倒我們了。

首先看一下 [維基百科](https://goo.gl/ZsQZHm) 對於正多面體的介紹：「多面體，或稱柏拉圖立體， 指各面都是全等的正多邊形且每一個頂點所接的面數都是一樣的凸多面體。」簡單來說，就是非常對稱的立方體，而且每一個面都是由正多邊形組成，因此在這一篇，將會畫出正四面體、正六面體。

開始之前，如果有不會用 CSS 畫正多邊形的，請先參考我之前寫過的：[單一 div 的正多邊形變換 ( 純 CSS )](http://www.oxxostudio.tw/articles/201503/css-regular-polygon-transform.html)

<br/>

- **正六面體**

	要繪製正多面體，第一個一定要先畫正六面體，為什麼呢？因為正六面體就是我們熟知的正立方體，夾角都是 90 度，也是最容易理解的形狀 ( 就算有寫少許錯，好像還是畫得出來... )

	首先我們要先在 space 裏頭放入六個正方形，分別給予 box1 到 box6 的類別名稱識別，並寫上 1 到 6 來確定翻轉是否為正面朝外 ( 朝內的話文字就會是反過來的 )。

		<div class="camera">
			<div class="space">
				<div class="box1">1</div>
				<div class="box2">2</div>
				<div class="box3">3</div>
				<div class="box4">4</div>
				<div class="box5">5</div>
				<div class="box6">6</div>
			</div>
		</div>

	接著對 camera、space 和這些 box 做基本的 CSS 定義，記得 box 的 position 要設為 absolute，才不會互相擠壓。

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
		.space{
			position:relative;
			width:100%;
			height:100%;
			border:1px dashed #000;
			transform-style:preserve-3d;
			-moz-transform-style:preserve-3d;
			-webkit-transform-style:preserve-3d;
		}
		.space div{
			position:absolute;
			width:100px;
			height:100px;
			font-size:50px;
			text-align:center;
			line-height:100px;
		}

	完成後先來看 box1，box1 最簡單，只要將它位移到 space 的中間即可。

		.box1{
			background:rgba(255,0,0,.2);
			transform:translateX(50px) translateY(50px);
		}

	box2 除了移到中間，還必須要旋轉 90 度，這時候就要使用`transform-origin`的屬性，這可以設定物體作變化時要以自身的哪一點為主，設定不同的位置，旋轉 90 度之後就會在不同的位置，這裡我們先把 box2 水平位移 150px，然後把變換的 X 定位在左側，旋轉後就會可以順利地接在 box1 旁邊。

		.box2{
			background:rgba(255,255,0,.2);
			transform-origin:left top;
			transform:translateX(150px) translateY(50px) rotateY(90deg);
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_06.jpg)

	<br/>
	box3 剛好在 box1 的正對面，所以只要旋轉 180 度即可，但很重要的是旋轉之後整個 Z 軸會跟著旋轉 180 度，為了避免錯亂，先把 box3 往 Z 軸後面移動 100px，旋轉後就會正常。( 先寫 translateZ 再寫 rotateY，不明白的可以參考我寫的 [玩轉 CSS 3D - 原理篇](http://www.oxxostudio.tw/articles/201506/css-3d.html) )

		.box3{
			background:rgba(0,255,0,.2);
			transform:translateX(50px) translateY(50px) translateZ(-100px) rotateY(180deg);
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_07.jpg)

	<br/>
	box4 和 box2 類似，不過要將旋轉的中心點移到右側，也因為移到右側的緣故，所以我們要先進行 X 的位移。

		.box4{
			background:rgba(255,0,255,.2);
			transform-origin:right top;
			transform:translateX(-50px) translateY(50px) rotateY(-90deg);
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_08.jpg)

	<br/>
	box5 在上方，box6 在下方，用跟 box1 到 box4 同樣的方法，只是這次是要繞著 X 軸旋轉。

		.box5{
			background:rgba(0,0,255,.2);
			transform-origin:center bottom;
			transform:translateX(50px) translateY(-50px) rotateX(90deg);
		}
		.box6{
			background:rgba(0,255,255,.2);
			transform-origin:center top;
			transform:translateX(50px) translateY(150px) rotateX(-90deg);
		}

	<br/>
	
	完成之後應該就會順利地看到一個正六面體，這時候我們可以改變 camera 的 perspective，可以更加清楚。( 範例：[css-3d-platonic-solid-1-demo01.html](/demo/201506/css-3d-platonic-solid-1-demo01.html) )

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_02.jpg)

	<br/>
	我們可以在 space 套用 animate 的效果，透過 space 的旋轉，彷彿就是一個正立方體在旋轉囉！( 範例：[css-3d-platonic-solid-1-demo02.html](/demo/201506/css-3d-platonic-solid-1-demo02.html) )

		.space{
			position:relative;
			width:100%;
			height:100%;
			-webkit-transform-style:preserve-3d;
			-webkit-transform-origin:center center -50px;
			-webkit-animation:s 4s linear infinite;
		}
		@-webkit-keyframes s{
			0%{
				-webkit-transform:rotateY(0);
			}
			100%{
				-webkit-transform:rotateY(-359.9deg);
			}
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_03.gif)
	
<br/>

- **正四面體**

	理解正六面體之後，正四面體就比較好上手了，正四面體由四個正三角形組成 ( 不會畫正三角形的可以參考這篇：[單一 div 的正多邊形變換 ( 純 CSS )](http://www.oxxostudio.tw/articles/201503/css-regular-polygon-transform.html) )，每個面之間的夾角為 70.5 度，所以待會旋轉的角度也就是 70.5 度。

	首先看到 HTML 的結構就是只有四個 div 而已。

		<div class="camera">
			<div class="space">
				<div class="box1"></div>
				<div class="box2"></div>
				<div class="box3"></div>
				<div class="box4"></div>
			</div>
		</div>

	camera 和 space 的設定就不多談，直接看到這些 box 的屬性，別忘記要畫正三角形，就要用到邊框來繪製。

		.space div{
		  position:absolute;
		  width:0;
		  height:0;
		  border-width:0 50px 87px;
		  border-style:solid;
		  opacity:.4;
		}

	首先看到 box1，box1 依舊是最簡單的 ( 但也是比正方形的麻煩一點 )，這裡我要用 box1 當底，所以除了直接做位置的移動，移動後還要繞 X 軸旋轉 90 度，比較特別的是因為正三角形是由邊框構成，所以顏色就是要改變 border 才可以。

		.box1{
			border-color:transparent transparent #f00;
			transform-origin:center bottom;
			transform:translateX(50px) translateY(50px) rotateX(-90deg);
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_10.jpg)

	<br/>

	再來就是另外三個面了，box2 跟 box1 差不多簡單，只是 box1 旋轉 90 度，box2 要旋轉 19.5 度，因為 box1 要和 box2 有著 70.5 度的夾角。

		.box2{
			border-color:transparent transparent #00f;
			transform-origin:center bottom;
			transform:translateX(50px) translateY(50px) rotateX(-19.5deg);
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_11.jpg)

	<br/>

	box3 比較麻煩，我們要先讓 box3 繞著 Y 軸旋轉 60 度 ( 因為正三角形每個角是 60 度 )，繞完之後，再繞 X 軸旋轉 19.5 度，為什麼這裡的 19.5 度是正值呢？因為我們繞 Y 軸旋轉後，X 軸也跟著旋轉，所以繞 X 軸的方向就變成顛倒過來了。

		.box3{
			border-color:transparent transparent #00f;
			transform-origin:right bottom;
			transform:translateX(50px) translateY(50px) rotateY(60deg) rotateX(19.5deg);
		}

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_12.jpg)

	<br/>

	box4 和 box3 類似，同樣的要先繞 Y 旋轉 60 度，這次是要繞負的，因為是另外一側。

		.box4{
			border-color:transparent transparent #f0f;
			transform-origin:left bottom;
			transform:translateX(50px) translateY(50px) rotateY(-60deg) rotateX(19.5deg);
		}

	按照上面做，應該就可以得到下圖的結果：( 範例：[css-3d-platonic-solid-1-demo03.html](/demo/201506/css-3d-platonic-solid-1-demo03.html) )

	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_04.jpg)

	<br/>

	同樣的，把 space 加上動畫，就可以看到正四面體旋轉囉！比較不同的地方是中心點的位移為 29px，為什麼呢？因為要抓取正三角形的中心點，數學式為：tan(30deg) x 50 = 28.86。( 範例：[css-3d-platonic-solid-1-demo04.html](/demo/201506/css-3d-platonic-solid-1-demo04.html) )

		.space{
			position:relative;
			width:100%;
			height:100%;
			transform-style:preserve-3d;
			-webkit-transform-origin:center center 29px;
			-webkit-animation:s 4s linear infinite;
		}
		@-webkit-keyframes s{
			0%{
				-webkit-transform:rotateY(0);
			}
			100%{
				-webkit-transform:rotateY(-359.9deg);
			}
		}
	
	![玩轉 CSS 3D - 正四面體與正六面體](/img/articles/201506/20150620_1_05.gif)

<br/>

