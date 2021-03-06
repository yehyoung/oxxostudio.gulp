# HTML5 控制裝置陀螺儀 ( 三軸 )  

![](/img/articles/201506/html5-device-orientation.jpg#preview-img)

自從幾年前入手智慧型手機之後，對於行動裝置上特有的陀螺儀 ( 三軸 ) 偵測與感應器就滿感興趣的，而相關的應用除了在一些典型的 APP 裏頭很常見到之外 ( 指南針、水平儀、星空定位...等 )，在遊戲裡頭更是屢見不鮮 ( 賽車、跑酷、飛行、滾球...等 )，但撇除 APP 不談，過去在網頁裡頭要使用陀螺儀的三軸感測，幾乎是不可能，應該是說沒這個必要，因為在智慧行動裝置尚未普及的年代，誰會搬台電腦轉來轉去呢？

不過在行動裝置發達的現在，手機或平板的瀏覽器效能也跟了上來，加上 iOS 與 Android 兩大陣營對於瀏覽器可以控制硬體的權限逐漸鬆手，慢慢的當年 HTML5 裏頭所制定出來，和控制裝置硬體相關的 API 也逐漸可以派上用場。

這篇文章主要是記錄自己藉由控制陀螺儀獲取三軸數值的用法 ，如果不做個紀錄，我可能過一陣子又忘記怎麼用了。

<br/>

###起手式

要使用行動裝置的陀螺儀，我們只要監聽 `deviceorientation` 的事件就可以，它的用法和 `click` 是一模一樣。

	window.addEventListener('deviceorientation', function(event) {
	  var alpha = event.alpha;
	  var beta = event.beta;
	  var gamma = event.gamma;
	}, false);

從上述最基本的程式碼中可以看到，這個事件有三個 API，分別是：alpha、beta 以及 gamma，這三個 API 代表甚麼意思呢？下面三張圖分別表現三個軸轉動的角度和方向。

- aplha：

	行動裝置水平放置時，繞 Z 軸旋轉的角度，數值為 0 度到 360 度。

	![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_03.jpg)

- beta：

	行動裝置水平放置時，繞 X 軸旋轉的角度，數值為 -180 度到 180 度。

	![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_04.jpg)

- gamma：

	行動裝置水平放置時，繞 Z 軸旋轉的角度，數值為 -90 度到 90 度。

	![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_02.jpg)

<br/>

###實際測試

知道起手式之後，接著就用簡單的範例來測試看看，下面的範例我在畫面中放入三個區塊，分別代表 alpha、beta 與 gamma，當用手機打開這個網頁，轉動手機就會看到數值的變化，此外在一開始也加入一個判斷式，如果手機不支援，則會顯示不支援的文字訊息，判斷的方式為讀取 window 是否有`DeviceOrientationEvent`這個屬性，其實我們也可以從瀏覽器的 console 裏頭看到 window 是否有包含這個屬性。

理解之後就看一下程式碼，HTML 就擺上三個區塊。

	alpha:<span id="alpha"></span><br/>
	beta:<span id="beta"></span><br/>
	gamma:<span id="gamma"></span><br/>

Javascript 的部分利用`window.addEventListener`監聽`deviceorientation`事件，接著就可以獲取 alpha、beta 和 gamma，不過獲取到的數值其實是個有非常多個小數點位數的數值，再利用 Math.round 來四捨五入。
	
	if(window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', function(event) {
	  var a = document.getElementById('alpha',
	  		b = document.getElementById('beta'),
	  		g = document.getElementById('gamma'),
	  		alpha = event.alpha,
	  		beta = event.beta,
		  		gamma = event.gamma;
	  
	  a.innerHTML = Math.round(alpha);
	  b.innerHTML = Math.round(beta);
	  g.innerHTML = Math.round(gamma);
	      
		}, false);
	}else{
		document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
	}

完成後，用手機打開旋轉一下，應該就可以看到數值的變化了。( 範例：[html5-device-orientation-demo01.html](/demo/201506/html5-device-orientation-demo01.html)，也可以掃描下方的 qrcode )

![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_05.jpg)

![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_06.gif)

<br/>

###CSS 3D 的應用

既然有了這麼好玩又好用的 Web API，就一定要拿之前玩的 CSS 3D 來試試看，這裡我們用最簡單的正立方體來測試 ( 正立方體的製作請參考：[玩轉 CSS 3D - 正四面體與正六面體](http://www.oxxostudio.tw/articles/201506/css-3d-platonic-solid-1.html) )，基本上就是把上面 alpha、beta 和 gamma 的數值，提供給正立方體的 space。

HTML 的部分就放上 camera、space 和 box。

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

CSS 就比較複雜，不過因為不是這篇的重點所以就略過，有興趣的就去 [玩轉 CSS 3D - 正四面體與正六面體](http://www.oxxostudio.tw/articles/201506/css-3d-platonic-solid-1.html) 這篇閱讀，直接看到 js 的部分，沒有太特別，跟上一個範例幾乎相同，不過因為這裡我用了`document.querySelectorAll`，回傳的是一個陣列，所以要用`space[0]`。

	var space = document.querySelectorAll('.space');
	if(window.DeviceOrientationEvent) {

	  window.addEventListener('deviceorientation', function(event) {
      var alpha = event.alpha,
      	beta = event.beta,
		 gamma = event.gamma;
      
        space[0].style.webkitTransform = 'rotateX('+beta+'deg) rotateY('+gamma+'deg) rotateZ('+alpha+'deg)';
        space[0].style.transform = 'rotateX('+beta+'deg) rotateY('+gamma+'deg) rotateZ('+alpha+'deg)';
        space[0].style.mozTransform = 'rotateX('+beta+'deg) rotateY('+gamma+'deg) rotateZ('+alpha+'deg)';

	      }, false);
	}else{
	  document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
	}

完成後，用手機打開旋轉一下，應該就可以看到一個正立方體在旋轉囉。( 範例：[html5-device-orientation-demo02.html](/demo/201506/html5-device-orientation-demo02.html)，也可以掃描下方的 qrcode )

![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_07.jpg)

![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_08.gif)

<br/>

###手機網頁指南針的應用

經由上面兩個例子，應該就可以比較了解相關的原理，接著要來實作指南針了，不過由於 iOS 和 Android 兩家系統對於手機硬體提供 alpha 數值不盡相同，所以這裡必須使用一個叫做`webkitCompassHeading`的屬性來判斷是 iOS 還是 Android，如果再 iOS 上頭才會有`webkitCompassHeading`，`webkitCompassHeading`表示「**手機與地球正北方的夾角**」，而 Android 則直接用 alpha 即可。( 不過如果不是 chrome 又不盡相同，反正如果不同，就是在進行角度的加減即可 )

一開始仍然要先寫 HTML，這裡我只放上一個名為 compass 的 div，背景圖用指南針的背景圖。

	<div id="compass"></div>

CSS 的寫法是這樣：

	#compass{
	  margin:0 auto;
	  width:90%;
	  background-image:url(compass.jpg);
	  background-size:cover;
	  transform-origin:center center;
	  -moz-transform-origin:center center;
	  -webkit-transform-origin:center center;
	}

再來就是精彩的 javascript，最上面三行只是在定義指南針大小，可以忽略，重點在判斷`webkitCompassHeading`，抓到數值之後，把數值丟給 alpha，如果沒抓到，就直接用 alpha 得到的數值即可。

	var compass = document.getElementById('compass'),
	    w = compass.offsetWidth;

	compass.style.height = w +'px';

	if(window.DeviceOrientationEvent) {

	  window.addEventListener('deviceorientation', function(event) {
	        var alpha;
	        // 	判斷是否為 iOS 裝置
	        if(event.webkitCompassHeading) {
	          alpha = event.webkitCompassHeading; // iOS 裝置必須使用 event.webkitCompassHeading
	          compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
	          show.innerHTML = alpha;
	        }
	        else {
	          alpha = event.alpha;
	          webkitAlpha = alpha;
	          if(!window.chrome) {
	            webkitAlpha = alpha-270;
	          }
	        }

	        compass.style.Transform = 'rotate(' + alpha + 'deg)';
	        compass.style.WebkitTransform = 'rotate('+ webkitAlpha + 'deg)';
	        compass.style.MozTransform = 'rotate(-' + alpha + 'deg)'; 
	      }, false);
	}else{
	  document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
	}

完成後，用手機打開旋轉一下，一個網頁指南針就順利誕生囉！( 範例：[html5-device-orientation-demo03.html](/demo/201506/html5-device-orientation-demo03.html)，也可以掃描下方的 qrcode )

![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_09.jpg)

![HTML5 控制裝置陀螺儀 ( 三軸 )](/img/articles/201506/20150630_1_10.gif)

<br/>

###結合實物的應用 ( Webduino )

為什麼會寫這篇文章呢？最主要是 Webduino 的教學範例裏頭有用到，下面這個影片，就是利用手機的陀螺儀，讓伺服馬達可以左右擺動，輕鬆完成網頁與實物的結合。( 對於 Webduino 有興趣的可以參考：[https://webduino.io](https://webduino.io) )

<iframe width="560" height="315" src="https://www.youtube.com/embed/P1xOpSO10qw" frameborder="0" allowfullscreen></iframe>

此外還有 Webduino 的前段工程師同好，用陀螺儀做了一個操控夾娃娃機的裝置，也是很不賴！

<iframe width="560" height="315" src="https://www.youtube.com/embed/2_IAxdnH4JQ" frameborder="0" allowfullscreen></iframe>

