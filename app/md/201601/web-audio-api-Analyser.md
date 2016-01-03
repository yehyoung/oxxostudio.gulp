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

<meta property="article:published_time" content="2016-01-03T14:50:00+01:00">

<meta name="keywords" content="music,audio,web audio api,analyser">

<meta name="description" content="這裏要來介紹另外一個製作方式，就是使用 analyser 節點，analyser 節點可以針對經過它的音頻做分析，所以相較 createScriptProcessor 會建立緩衝區來保留音頻訊號，處理速度會較快，但缺點是會失去一些高頻的訊號，不過如果只是要單純顯示音樂頻譜，倒是一個不錯的選擇。">

<meta itemprop="name" content="建立音樂頻譜 2 ( analyser ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201601/20160103_1_01b.jpg">

<meta itemprop="description" content="這裏要來介紹另外一個製作方式，就是使用 analyser 節點，analyser 節點可以針對經過它的音頻做分析，所以相較 createScriptProcessor 會建立緩衝區來保留音頻訊號，處理速度會較快，但缺點是會失去一些高頻的訊號，不過如果只是要單純顯示音樂頻譜，倒是一個不錯的選擇。">

<meta property="og:title" content="建立音樂頻譜 2 ( analyser )  - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201601/web-audio-api-Analyser.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201601/20160103_1_01b.jpg">

<meta property="og:description" content="這裏要來介紹另外一個製作方式，就是使用 analyser 節點，analyser 節點可以針對經過它的音頻做分析，所以相較 createScriptProcessor 會建立緩衝區來保留音頻訊號，處理速度會較快，但缺點是會失去一些高頻的訊號，不過如果只是要單純顯示音樂頻譜，倒是一個不錯的選擇。">

<title>建立音樂頻譜 ( createMediaElementSource ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##建立音樂頻譜 2 ( analyser )  <span class="article-date" tag="web">JAN 3, 2016</span>

之前寫了一篇了用 createScriptProcessor 來製作音樂頻譜的功能，這裏要來介紹另外一個製作方式，就是使用 analyser 節點，analyser 節點可以針對經過它的音頻做分析 ( 顧名思義咩 )，所以相較 createScriptProcessor 會建立緩衝區來保留音頻訊號，處理速度會較快，但缺點是會失去一些高頻的訊號，不過如果只是要單純顯示音樂頻譜，倒是一個不錯的選擇。( 圖片來源：https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode ) 

![建立音樂頻譜 2 ( analyser )](/img/articles/201601/20160103_1_02.jpg)

先看到 HTML 的部分，一開始我們同樣先用 HTML5 的 audio 標籤來載入音樂，然後放入兩個按鈕，來做播放和暫停的動作。

	<audio controls autoplay>
	  <source src="test.mp3">
	</audio>
	<br/>
	<button id="p">play</button>
	<button id="s">pause</button>

JavaScript 要先做一些變數的宣告，因為 analyser 只會執行一次動作，所以這裡用一個 timer 作為計時器 ( 待會會用到 )，然後設定 audioCtx 是聲音處理器，重點是把音樂的訊號和 analyser 綁在一起，然後最後再用 analyser 輸出。

	var timer;
	var s = document.getElementById('s');
	var p = document.getElementById('p');
	var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	var myAudio = document.querySelector('audio');
	var source = audioCtx.createMediaElementSource(myAudio);
	var analyser = audioCtx.createAnalyser();
	source.connect(analyser);
	analyser.connect(audioCtx.destination);

接著對於 analyser 做設定，analyser 有幾個屬性：fftSize、frequencyBinCount、minDecibels、maxDecibels 和 smoothingTimeConstant，裡面最重要的是 fftSize ，這是傅立葉變換的區域 ( 可參考下圖 )，數值必須是 2 的平方，在 Web audio 裡最大值為 2048，不過如果純粹查詢 web audio 的資料其實比較少，但如果獨立查詢「FFT Size」
，可以發現有一拖拉庫的音頻率波的資料，frequencyBinCount 預設為 fftSize 的一半，minDecibels、maxDecibels 和 smoothingTimeConstant 這三個基本上都是 fftSize 的設定值，這裏直接用預設值即可。( 雖然以前大學物理系有學過一點，但因為年代已久遠，自己又不是專門在搞音頻訊號處理的，扯到傅立葉分析就有點...反正就先這樣吧 )

![建立音樂頻譜 2 ( analyser )](/img/articles/201601/20160103_1_03.jpg)

看完屬性，就來看一下 analyser 提供的四個方法，分別是 getFloatFrequencyData()、getByteFrequencyData()、getFloatTimeDomainData() 和 getByteTimeDomainData()，先看到名稱有 Float 的就是浮點數，屆時要使用`Float32Array`轉成陣列，如果沒有 Float 的就用`Uint8Array`轉換為純整數的陣列，再來如果名稱有 FloatFrequency 的，是以音頻為主，基準點為 0，解析出來單位是 dB ( 分貝 )，如果是 TimeDomain，則是以 128 作為基準點，解析出來的數值沒有單位，最大值為 255。

看到 JavaScript 的部分，如果我們 fftSize 都沒有設定，預設就會是 2048，比較特別的是要用`setTimeout`來做重複的動作，所以就用一個計時器來裝載`setTimeout`，方便我們待會可以把它暫停下來，在一些網路上的範例，也會使用`requestAnimationFrame`這個新的 Web API 來做重複播放，不過個人偏好用`setTimeout`啦哈哈！(`requestAnimationFrame`預設為 15ms 刷新一次，這也是大部分瀏覽器的刷新極限)

	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);
	analyser.getByteFrequencyData(dataArray);
	function update() {
	  console.log(dataArray);
	  dataArray = new Uint8Array(analyser.fftSize);
	  analyser.getByteFrequencyData(dataArray);
	  timer = setTimeout(update,50);
	};

	update();

最後就要來設定一下按鈕的行為，按下播放就播放，按下暫停就暫停 ( 好像在講廢話 XD )

	s.onclick = function(){
	  myAudio.pause();
	  clearTimeout(timer);
	};

	p.onclick = function(){
	  myAudio.play();
	  update();
	};

實際跑一次，打開 console，就會看到音樂的頻譜數值跑出來了 ( 範例：[web-audio-api-Analyser-demo1.html](/demo/201601/web-audio-api-Analyser-demo1.html) )

![建立音樂頻譜 2 ( analyser )](/img/articles/201601/20160103_1_04.jpg)

既然有數值，下一步就是要來把數值畫成圖，和之前畫頻譜類似，這裏用比較簡單的方法 ( 不用 SVG、D3 或 Canvas )，純粹先用 div 來表現，首先在畫面裡用 JavaScript 放入 256 個 div，讓 div 依據陣列數值變化高度和背景顏色，圖畫出來就可以看到，越往右邊數值就開始消失了，這也是使用 analyser 的一個問題吧，不過如果只是純粹要畫頻譜，倒是滿方便又高效率的做法。 ( 範例：[web-audio-api-Analyser-demo2.html](/demo/201601/web-audio-api-Analyser-demo2.html) )

![建立音樂頻譜 2 ( analyser )](/img/articles/201601/20160103_1_05.jpg)

參考資源：

- 關於 FFT 理論 ( [http://goo.gl/79mRtJ](http://goo.gl/79mRtJ) )
- FFT基本概念總整理 ( [http://goo.gl/gW7chw](http://goo.gl/gW7chw) )
- AnalyserNode ( [http://goo.gl/QzxrY9](http://goo.gl/QzxrY9) )
- AnalyserNode MDN ( [https://goo.gl/4BSKe7](https://goo.gl/4BSKe7) )


<!-- @@close-->




