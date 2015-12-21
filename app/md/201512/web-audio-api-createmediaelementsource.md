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

<meta property="article:published_time" content="2015-12-21T23:50:00+01:00">

<meta name="keywords" content="music,audio,web audio api">

<meta name="description" content="前幾篇認識了許多利用 Web Audio API 產生聲音或音效的方法，這篇則是要引入外部的音樂或聲音，並將聲音轉換為數值頻譜。( 因為轉換為數值，就可以拿這些數值來做應用了 )">

<meta itemprop="name" content="建立音樂頻譜 ( createMediaElementSource ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201512/20151221_1_01b.jpg">

<meta itemprop="description" content="前幾篇認識了許多利用 Web Audio API 產生聲音或音效的方法，這篇則是要引入外部的音樂或聲音，並將聲音轉換為數值頻譜。( 因為轉換為數值，就可以拿這些數值來做應用了 )">

<meta property="og:title" content="建立音樂頻譜 ( createMediaElementSource ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201512/web-audio-api-createmediaelementsource.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201512/20151221_1_01b.jpg">

<meta property="og:description" content="前幾篇認識了許多利用 Web Audio API 產生聲音或音效的方法，這篇則是要引入外部的音樂或聲音，並將聲音轉換為數值頻譜。( 因為轉換為數值，就可以拿這些數值來做應用了 )">

<title>建立音樂頻譜 ( createMediaElementSource ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##建立音樂頻譜 ( createMediaElementSource ) <span class="article-date" tag="web">DEC 21	, 2015</span>

最近好忙，一陣子沒寫這系列的文章，還回頭複習了一陣子，前幾篇認識了許多利用 Web Audio API 產生聲音或音效的方法，這篇則是要引入外部的音樂或聲音，並將聲音轉換為數值頻譜。( 因為轉換為數值，就可以拿這些數值來做應用了 )

在這系列的 [第一篇](http://www.oxxostudio.tw/articles/201509/web-audio-api.html) 有介紹過`createOscillator()`這個振盪器產生單音的方法，這篇要來介紹`createMediaElementSource`這個把外部音軌作為 source 的方法，這個方法需要搭配 HTML5 的`audio`標籤來實施，因為它預設就是會以 HTML5 所載入的音頻為主，以下面的例子來說，我們要先在 HTML 裡放入聲音，`controls`表示會載入預設的播放器介面，`autoplay`預設為一開始就自動播放。( mp3 格式基本上已經被所有瀏覽器接受，如果不能播放也可以採用 ogg 格式 )

	<audio controls autoplay>
	  <source src="test.mp3">
	</audio>

放入聲音之後就要來寫 JavaScript，首先要放入這三行，基本上就是用`createMediaElementSource`把我們的音樂轉成可以讓「節點」( AudioNode ) 使用的數位音頻。

	var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	var myAudio = document.querySelector('audio');
	var source = audioCtx.createMediaElementSource(myAudio);

再來我們可以做一個簡單的實驗，使用在之前 [聲音參數與音量節點](http://localhost:3000/articles/201509/web-audio-api-audioparam-gainnode.html) 有介紹過的音量節點 Gain 來控制音樂的音量大小，因此在這裡可以獲取整個視窗滑鼠的座標，把座標轉換為音量大小，因為音量最大不會超過 1，所以把視窗的高度當作分母，往下音量就會越大，往上聲音就會越小聲，同時也把音量顯示在畫面的 span 裡頭。( 範例：[web-audio-api-createmediaelementsource-demo1.html](/demo/201512/web-audio-api-createmediaelementsource-demo1.html) )

	var gainNode = audioCtx.createGain();
	source.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	window.onmousemove = function(e){
		var v = e.pageY/window.innerHeight;
		console.log(v);
	  gainNode.gain.value = v;
	  s.innerHTML = v;
	  myAudio.volume = v;
	};

![建立音樂頻譜 ( createMediaElementSource )](/img/articles/201512/20151221_1_02.jpg)

不過只是會控制聲音還不夠，再來我們要把數位化之後的聲音數值給取出，做一個很簡單的音量頻譜，這邊使用 div 來做，先在 HTML 裡面放入一個 div，然後用 JavaScript 的方式在裡面塞入 128 個 div。( 待會會讓這些 div 跳動 )

	<audio controls autoplay>
	  <source src="test.mp3">
	</audio>
	<span id="s"></span>
	<div id="d"></div>

JavaScript：

	var s = document.getElementById('s');
	var d = document.getElementById('d');
	for(var i=0; i<128; i++){
		d.innerHTML += '<div></div>';
	}
	var dd = document.querySelectorAll('#d div');

接著，我們會用到一個新的方法，叫做`createScriptProcessor`，這個方法目的在建立一個聲音的處理器，有三個屬性，依序為`bufferSize`、`numberOfInputChannels`和`numberOfOutputChannels`，第一個`bufferSize`可以照字面翻譯為緩衝區大小，換句話說就是可以容納聲音訊號的多寡，數值可為 256、512、1024、2048、 4096、8192、16384，數值較低會有較好的效率，但相對品質會變差，另外兩個屬性是輸入與輸出通道的數量，預設為 2，不過在沒有要做通道混合處理的狀況下都會設為 1。

因為要建立`createScriptProcessor`，我們就把它接在音量後面，因使程式碼就會改成這樣，剛剛用滑鼠控制音量的還是保留著：

	var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	var myAudio = document.querySelector('audio');
	var source = audioCtx.createMediaElementSource(myAudio);
	var gainNode = audioCtx.createGain();
	var processor = audioCtx.createScriptProcessor(4096, 1, 1);
	source.connect(gainNode);
	gainNode.connect(processor);
	processor.connect(audioCtx.destination);

	window.onmousemove = function(e){
		var v = e.pageY/window.innerHeight;
		console.log(v);
	  gainNode.gain.value = v;
	  s.innerHTML = v;
	  myAudio.volume = v;
	};

再來就是要設定處理器的內容，這裏會用到`onaudioprocess`這個屬性，這表示當音頻處理好之後，會發生什麼事情，裡面會設定一個 input 和一個 ouput，output 負責承接 input 來的訊號接著輸出，因此如果我們用 console 印出來看，就會發現這是一大串的陣列，由於剛剛設定 4096 就表示有這個陣列有 4096 個數值在裡面，這也是為什麼數值設越高聲音會越好，因為保留的細節越多，但相對即時要處理一個這麼大的數值資料，效率當然就會比較差一點。

回顧剛剛我們有設定 div 內有 128 個 div ( 為了增加效率所以就只用 128 個 )，這裏我們就用一個 for 迴圈，來把對應的數值轉換成這些 div 的高度。

	processor.onaudioprocess = function(e) {
	  var input = e.inputBuffer.getChannelData(0);
	  var output = e.outputBuffer.getChannelData(0);
	  for (var i = 0; i < input.length; i++) {
	    output[i] = input[i];
	  }
	  console.log(output);
	  for(var j=0; j<128; j++){
	 		dd[j].style.height = output[j*32]*100+'px';
	  }
	};

因為要讓 div 是從底部往上長，然後 div 也有顏色，所以要設定 CSS，這裏用了 after 這個為元素來讓所有 div 置底。

	#d {
	  height: 100px;
	}
	#d:after{
		content:'';
	  display: inline-block;
	  height:100px;
	  width:1px;
	}

	#d div {
	  display: inline-block;
	  width: 1px;
	  background: #a00;
	  margin: 0 0 0 1px;
	  vertical-align: bottom;
	}

完成後開始執行，就會看到一個有音量頻譜的顯示，同時我們也可以用滑鼠上下移動來操控大小聲囉！( 範例：[web-audio-api-createmediaelementsource-demo2.html](/demo/201512/web-audio-api-createmediaelementsource-demo2.html) )

![建立音樂頻譜 ( createMediaElementSource )](/img/articles/201512/20151221_1_03.jpg)


<!-- @@close-->




