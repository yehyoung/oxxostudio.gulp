# 獲取錄音資訊 (getUserMedia) 

當我們會使用音訊播放並且會製成頻譜圖之後，接著就要來玩玩錄音了，原理大概就是透過電腦的麥克風，獲取外部聲音，然後經由 Web Audio 聲音處理節點把聲音數位化，更進一步地把聲音儲存下來。( 不過錄音需要用到 https，畢竟如果隨隨便便就可以錄，還真是滿危險的...XD )

如果有遇到出現這個畫面，按下「進階」，點選「繼續前往 www.oxxostudio.tw 網站 (不安全)」即可，會出現這個畫面主要原因就是錄音需的網址要有 SSL 憑證，而我的部落格卻沒有買憑證所以是 http 開頭，才會有這個畫面出現，所以，要試用就只能先這樣囉~ ( 不過如果跑在本機端 localhost 就沒這問題 )

![獲取錄音資訊](/img/articles/201601/20160103_2_06.jpg)

HTML 先放上兩個按鈕，一個是開始，一個是暫停。

	<button id="p">play</button>
	<button id="s">pause</button>

<br/>

然後因為我們錄音會動用到電腦的麥克風，所以要先看看瀏覽器有沒有支援，第一行是有沒有支援 Web Audio，第二行則是要確認可以支援使用者的 media 也就是視訊或麥克風的 API。( 不過現在視訊應該有安全性的限制，只有 https 能存取 )

	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

<br/>

`getUserMedia`這個 API 用法就像下面這樣，`constraints`是一個物件 ( 可以參考 [MDN MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Parameters) )，可以設定 audio 或 video 的 true 或 false，`successCallback`和`errorCallback`就是成功和失敗時要做的事情。

	navigator.getUserMedia(constraints, successCallback, errorCallback);

<br/>

知道用法後，就可以來寫一下把麥克風收到的聲音轉換為數值陣列的程式，開始一樣先宣告一些變數，然後把剛剛的`getUserMedia`API 放進來。

	var s = document.getElementById('s');
	var p = document.getElementById('p');
	var timer;
	var context = new AudioContext();
	navigator.getUserMedia({audio: true}, function(stream) {

		//把要做的事情寫在這邊

	}, function(){
	  console.log('error');
	});

<br/>

接著就把要做的事情寫在裡面，先宣告一個 microphone 變數來用音訊處理器承接麥克風的音訊 ( createMediaStreamSource )，因為進來的都是即時的，所以用 analyser 來做處理，把音訊接到 analyser 上面後就做一些基本的設定，每 20ms 分析一次，完成後打開網頁 console，對著麥克風講話，應該就可以看到數值開始跑囉！不過這裡會把`analyser.connect(context.destination);`這段給移除掉，因為如果一邊錄音又一邊播放，就會產生無窮迴圈，喇叭就會發出非常刺耳的聲音。 ( 範例：[web-audio-recorder-demo01.html](https://www.oxxostudio.tw/demo/201601/web-audio-recorder-demo01.html) )

	var microphone = context.createMediaStreamSource(stream);
	var analyser = context.createAnalyser();
	microphone.connect(analyser);
	analyser.connect(context.destination);

	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(analyser.fftSize);
	//analyser.getByteFrequencyData(dataArray);

	s.onclick = function(){
	  clearTimeout(timer);
	};

	p.onclick = function(){
	  update();
	};

	update();

	function update(){
	  console.log(dataArray);
	  analyser.getByteFrequencyData(dataArray);
	  timer = setTimeout(update,20);
	}

![獲取錄音資訊](/img/articles/201601/20160103_2_02.jpg)

當然只有數值一定不有趣，把數值轉換成視覺化的頻譜才特別，和之前畫頻譜都類似，這裏用比較簡單的方法 ( 不用 SVG、D3 或 Canvas )，純粹先用 div 來表現，首先在畫面裡用 JavaScript 放入 256 個 div，讓 div 依據陣列數值變化高度和背景顏色。( 範例：[web-audio-recorder-demo02.html](https://www.oxxostudio.tw/demo/201601/web-audio-recorder-demo02.html) )

![獲取錄音資訊](/img/articles/201601/20160103_2_03.jpg)

除了把麥克風擷取的聲音化作頻譜外，有沒有方法可以把聲音儲存下來呢？其實是有的，這裏要來介紹一隻 JavaScript：Recorderjs ( [https://github.com/mattdiamond/Recorderjs](https://github.com/mattdiamond/Recorderjs) )，他可以直接幫我們把錄製到的聲音變成 wav 的形式儲存下來，為什麼要用這隻程式呢？其實 Web audio 也是可以儲存，但原始的儲存方式仍然受到 https 的影響，而這隻 js 就是幫我們處理掉這些惱人的過程，既然是 MIT 的 opensource，就直接用囉！

![獲取錄音資訊](/img/articles/201601/20160103_2_04.jpg)

Recorder.js 有幾個 API 可以用，分別是`record()`負責錄音，`stop()`停止錄音，`clear()`清除錄音緩衝區暫存，`exportWAV()`產生 wav 檔案，修改上面兩個例子，寫法大概就像下面這樣，按下「錄音」按鈕的時候，先 new 一個 Recoder 物件，物件錄製的音訊就是我們剛剛用聲音處理器截取的 microphone，接著就用`record()`來錄音，停止錄音的按鈕一開始先把計時器停下來，然後用`stop()`停止錄音，並且產生 wav 檔案以及 wav 檔案的下載連結，然後`clear()`清除錄音緩衝區暫。

	s.onclick = function(){
	  clearTimeout(timer);
	  p.disabled = false;
	  s.disabled = true;
	  recorder.stop();
	  createDownloadLink();
	  recorder.clear();
	};

	p.onclick = function(){
	  recorder = new Recorder(microphone);
	  recorder.record();
	  p.disabled = true;
	  s.disabled = false;
	  update();
	};

<br/>

產生 wav 檔案的函式如下，使用`exportWAV`來產生一個 wav 物件，接著在畫面上用`createElement`創造一個 audio 標籤來裝載這個 wav 物件，就可以用 HTML5 的播放器來播放，不過因為要下載，所以這裡用了一個叫做`createObjectURL`的 Web API，目的在幫我們產生一個物件的連結 ( 可以參考 [MDN URL.createObjectURL()](https://developer.mozilla.org/zh-TW/docs/Web/API/URL/createObjectURL) )，這樣就可以有下載連結下載囉！ 

	function createDownloadLink(){
	  recorder.exportWAV(function(blob) {
	    var url = URL.createObjectURL(blob);
	    var li = document.createElement('li');
	    var au = document.createElement('audio');
	    var hf = document.createElement('a');
	    
	    au.controls = true;
	    au.src = url;
	    hf.href = url;
	    hf.download = new Date().toISOString() + '.wav';
	    hf.innerHTML = hf.download;
	    li.appendChild(au);
	    li.appendChild(hf);
	    recordingslist.appendChild(li);
	  });
	}

<br/>

完成後，打開網頁，按下錄音就可以開始錄音，同時也會看到聲音頻譜在跳動，錄音完成就會自動產生播放器試聽與下載聲音檔案，相當有趣味的啦！( 範例：[web-audio-recorder-demo03.html](https://www.oxxostudio.tw/demo/201601/web-audio-recorder-demo03.html) )

![獲取錄音資訊](/img/articles/201601/20160103_2_05.jpg)






