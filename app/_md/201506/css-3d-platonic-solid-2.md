# 玩轉 CSS 3D - 正八面體與正十二面體 

認識了正四面體與正六面體，接著我們要用同樣的方法，來製作正八面體與正十二面體，這兩個正多面體雖然組合的面比較多，不過因為具備了對稱性，所以只需要製作出一半的結構，另外一半再用反轉的方式接在一起即可。

- **正八面體**

	正八面體可以想像成「兩個金字塔」疊合在一起，為了方便我們後續作整個金字塔旋轉的動作，我們要用另外一個容器來把金字塔包裝起來，可以想像成把金字塔的四個面變成一個群組，就可以針對這個群組做變形或移動，HTML 的結構如下，space 裡面有 box1 和 box2，box1 是上半部的金字塔，box2 是下半部的金字塔：

		<div class="camera">
			<div class="space">
				<div class="box1">
					<div class="face1"></div>
					<div class="face2"></div>
					<div class="face3"></div>
					<div class="face4"></div>
				</div>
				<div class="box2">
					<div class="face1"></div>
					<div class="face2"></div>
					<div class="face3"></div>
					<div class="face4"></div>
				</div>
			</div>
		</div>

	再來同樣先針對 camera 和 space 做設定。

		.camera{
			width:200px;
			height:200px;
			-webkit-perspective-origin:50% 50%;
			-webkit-perspective:500px;
		}
		.space{
			position:relative;
			width:100%;
			height:100%;
			border:1px dashed #000;
			-webkit-transform-style:preserve-3d;
		}

	然後因為我們用到的面 face 都是三角形，同樣要用 border 來達成，記得 position 要設定為 absolute，並且由於 box1, box2 本身內部也是立體空間，所以同樣要加上`transform-style: preserve-3d`的屬性。

		.space div{
			position:absolute;
		}
		.box1, .box2{
			transform-style:preserve-3d;
		}
		.box1 div,.box2 div{
		  width:0;
		  height:0;
		  border-width:0 50px 87px;
		  border-style:solid;
		  opacity:.4;
		}

	再來製作 box1 的金字塔造型，由於正八面體每個面夾角為 109.28 度，又因為分為上兩半，從中間差開，一半為 54.64 度，因此我們要旋轉的角度是：90 - 54.64 = 35.36，所以待會我們要旋轉的角度就以此為主，先看到 face1，順著 x 軸往內轉 35.36 度。

		.face1{
			border-color:transparent transparent #f00;
			transform-origin:center bottom;
			transform:translateX(50px) translateY(50px) rotateX(35.36deg);
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_02.jpg)

	<br/>
	face2 則要先以右邊為圓心，繞 Y 軸旋轉 90 度，之後再繞 X 軸旋轉 35.36 度。

		.face2{
			border-color:transparent transparent #00f;
			transform-origin:right bottom;
			transform:translateX(50px) translateY(50px) rotateY(-90deg) rotateX(-35.36deg);
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_03.jpg)

	<br/>
	face3 在 face1 的對面，所以先在 Z 軸移動 100px，接著再繞 X 軸旋轉 35.36 度。

		.face3{
			border-color:transparent transparent #0f0;
			transform-origin:left bottom;
			transform:translateX(50px) translateY(50px)  translateZ(-100px) rotateX(-35.36deg);
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_04.jpg)

	<br/>
	face4 跟 face2 雷同，只是 face4 用左側為圓心。

		.face4{
			border-color:transparent transparent #f90;
			transform-origin:left bottom;
			transform:translateX(50px) translateY(50px) rotateY(90deg) rotateX(-35.36deg);
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_05.jpg)

	<br/>
	基本上到這邊，已經完成了上半部 box1 的金字塔造型，這時後的 box1 與 box2 是重疊的，我們只要將 box2 反轉並改變位置，就可以變成一個正八面體的造型，但這裡會遇到一個很有意思的問題，box2 變形的中心點在哪裡？這時候就必須用到好幾次的三角函數計算，因為是一個金子塔造型旋轉的中心點，所以就要把 Z 軸考量進去，首先看到 X 軸設定為 center 是沒問題的，Z 軸因為金子塔的底部是 100 x 100 的正方形，所以中心點在 50px 的位置也很正常，但 Y 軸就比較麻煩，首先我們看到正三角形的一個邊長為 100px，中線的長度就是 sin(60) x 100 = 86.6 左右，再來用 sin(54.64) x 86.6 就得到金子塔的高度 70.6，四捨五入一下就得到了 71，因此當我們將變形中心設定在這邊，旋轉的時候就會繞著金子塔頂旋轉，旋轉 180 度之後，就要利用 translateY 來歸位，要移動的距離約為 100 + 71/2 = 135 左右，但因為從一開始我們就都是用四捨五入的方式進行，難免最後用整數表現會有誤差 ( 兩個金字塔接不起來 )，這時就必須要用手動微調，這裡設定為 -132px 即可。( 範例：[css-3d-platonic-solid-2-demo01.html](/demo/201506/css-3d-platonic-solid-2-demo01.html) )

		.box2{
	  		transform-origin: center 71px -50px;
	  		transform: rotateX(180deg) translateY(-132px);
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_06.jpg)

	<br/>
	同樣的，旋轉 space 讓整個正八面體旋轉，看起來更有 fu。( 範例：[css-3d-platonic-solid-2-demo02.html](/demo/201506/css-3d-platonic-solid-2-demo02.html) )

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

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_07.gif)

<br/>

- **正十二面體**

	會作正八面體之後，正十二面體差不多也是同樣的原理，只是正十二面體更加複雜，因為它是由十二個正五邊形組成，不會畫正五邊形的可以參考我之前寫的教學文章：[單一 div 的正多邊形變換 ( 純 CSS )](http://www.oxxostudio.tw/articles/201503/css-regular-polygon-transform.html)，不過這裡要從正五邊形的五個邊去長出五個面，每個面的夾角為 116.56 度，180 - 116.56 = 63.44，待會用到的角度大概不會脫離這兩個數值，當然因為有很多小數點，所以屆時還是必須手動微調 ( 因為像素最小單位是 1 )。

	HTML 的結構如下，也是分成兩塊，內容各有六個面。

		<div class="camera">
			<div class="space">
				<div class="box1">
					<div class="face1"></div>
					<div class="face2"></div>
					<div class="face3"></div>
					<div class="face4"></div>
					<div class="face5"></div>
					<div class="face6"></div>
				</div>
				<div class="box2">
					<div class="face1"></div>
					<div class="face2"></div>
					<div class="face3"></div>
					<div class="face4"></div>
					<div class="face5"></div>
					<div class="face6"></div>
				</div>
			</div>
		</div>

	先設定一開始的 CSS。

		.camera{
			width:200px;
			height:200px;
			perspective-origin:50% 0%;
			-moz-perspective-origin:50% 0%;
			-webkit-perspective-origin:50% 0%;
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
		}
		.box1, .box2{
			transform-style:preserve-3d;
			-moz-transform-style:preserve-3d;
			-webkit-transform-style:preserve-3d;
		}

	再來是慢慢的畫每個面，首先是畫出所有的正五邊形。

		.box1 div,.box2 div{
		  width:162px;
		  height:154px;
		  opacity:.9;
		}
		.box1 div:before,.box2 div:before{
		  position:absolute;
		  content:"";
		  top:0;
		  width:0;
		  height:0;
		  border-width:0 81px 59px;
		  border-style:solid;
		  border-color:transparent transparent #069;
		}
		.box1 div:after,.box2 div:after{
		  position:absolute;
		  content:"";
		  top:59px;
		  left:0;
		  width:100px;
		  height:0;
		  background:none;
		  border-width:95px 31px 0;
		  border-style:solid;   
		  border-color:#069 transparent transparent;
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_08.jpg)

	<br/>
	
	因為是要由正五邊形的五個邊往外長五個面，所以 face1 就不做更動，屆時再讓 box 做旋轉即可，而 face2 到 face6 這五個面，比較簡單的做法就是直接先做 Z 軸旋轉的動作，然後再進行 Y 軸旋轉，再把各個面 translate 到對應的位置，不過這裡要非常注意，因為我們先進行了 Z 軸與 Y 軸的旋轉，所以各個面的座標系統已經改變，可以參照下圖，就可以明白該如何 translate，基本上就是在 Y 軸旋轉了 -116.56 度之後，各個面先朝向自己的 Y 軸移動 69px,然後為了讓各個邊貼齊，必須要再往 Y 軸移動 31px ( cos(180-116.56) x 69 )，往 Z 軸移動 62px ( sin(180-116.56) x 69 )。

	![圖9](/img/articles/201506/20150620_2_09.jpg)

	<br/>

	因此 face2 到 face6 就可以幾乎用完全一樣的方式寫出來 ( Z 軸旋轉角度每個面差 72 度 )

		.face2{  
			transform-origin:81px 85px 0;
  			transform:rotateZ(0) rotateX(-116.56deg) translateY(-69px) translateY(-31px) translateZ(62px);
		}
		.face3{  
  			transform-origin:81px 85px 0;
  			transform:rotateZ(72deg) rotateX(-116.56deg) translateY(-69px) translateY(-31px) translateZ(62px);
		}
		.face3{  
  			transform-origin:81px 85px 0;
  			transform:rotateZ(72deg) rotateX(-116.56deg) translateY(-69px) translateY(-31px) translateZ(62px);
		}
		.face4{
  			transform-origin:81px 85px 0;
  			transform:rotateZ(144deg) rotateX(-116.56deg) translateY(-69px) translateY(-31px) translateZ(62px);
		}
		.face5{  
	  		transform-origin:81px 85px 0;
	  		transform:rotateZ(-144deg) rotateX(-116.56deg) translateY(-69px) translateY(-31px) translateZ(62px);
		}
		.face6{  
  			transform-origin:81px 85px 0;
 		  transform:rotateZ(-72deg) rotateX(-116.56deg) translateY(-69px) translateY(-31px) translateZ(62px);
		}

	為了讓每個面不同顏色，這裡必須要改變偽元素的 border 色彩。

		.box1 .face2:before{
		  border-color:transparent transparent #f00;
		}
		.box1 .face2:after{
		  border-color:#f00 transparent transparent;
		}
		.box1 .face3:before{
		  border-color:transparent transparent #0f0;
		}
		.box1 .face3:after{
		  border-color:#0f0 transparent transparent;
		}
		.box1 .face4:before{
		  border-color:transparent transparent #f90;
		}
		.box1 .face4:after{
		  border-color:#f90 transparent transparent;
		}
		.box1 .face5:before{
		  border-color:transparent transparent #09f;
		}
		.box1 .face5:after{
		  border-color:#09f transparent transparent;
		}
		.box1 .face6:before{
		  border-color:transparent transparent #f0f;
		}
		.box1 .face6:after{
		  border-color:#f0f transparent transparent;
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_10.jpg)

	<br/>

	最後就針對 box1 與 box2 做旋轉的動作，這裡比較需要注意的是 translateZ，整個正五邊形的高度為 276 ( sin(63.44) x 154 x 2 )，但位移的時候並非完全是這個高度，必須扣掉接合處短邊的高度，因此會變成 223 ( 276 - sin(36) x 100 )( 範例：[css-3d-platonic-solid-2-demo03.html](/demo/201506/css-3d-platonic-solid-2-demo03.html) )

		.box1{
			transform-origin:81px 85px 0;
			transform:rotateX(90deg) translateZ(-223px);
		}
		.box2{
			transform-origin:81px 85px 0;
			transform:rotateX(-90deg);
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_11.jpg)

	<br/>

	space 加上動畫效果，驗證一下每個面是否都有接合的完美。( 範例：[css-3d-platonic-solid-2-demo04.html](/demo/201506/css-3d-platonic-solid-2-demo04.html) )

		.space{
			position:relative;
			width:100%;
			height:100%;
			-webkit-transform-style:preserve-3d;
			-webkit-transform-origin:81px 170px 0;
			-webkit-animation:s 4s linear infinite;
		}
		@-webkit-keyframes s{
			0%{
				-webkit-transform:rotateY(0) rotateX(0);
			}
			100%{
				-webkit-transform:rotateY(-359.9deg)  rotateX(359.9deg);
			}
		}

	![玩轉 CSS 3D - 正八面體與正十二面體](/img/articles/201506/20150620_2_12.gif)

