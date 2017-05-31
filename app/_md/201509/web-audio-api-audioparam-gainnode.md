# 聲音參數與音量節點 ( AudioParam,GainNode ) 

上一篇有介紹到 GainNode 這個控制聲音大小的節點模組，但並沒有深入介紹相關的用法，這篇就要來談談 GainNode 的操作處理，由於 GainNode 實在簡單，因為它只有一個屬性叫做「gain」，所以一定要先介紹「AudioParam」這個 Audio 的參數。

AudioParam 主要用來控制 AudioNode 的運作，並且可以計算出從某個時間點到某個時間點數值的變化，以音量來說，利用 AudioParam 就可以做到淡入淡出的效果，AudioParam 包含了以下幾種方法 ( 詳細數學式說明可以參考 [W3C 解釋](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioParam) )：

>- setValueAtTime：在某個時間設定某個值
- linearRampToValueAtTime：到某個時間時，對值做線性的變化
- exponentialRampToValueAtTime：到某個時間時，對值做指數的變化
- setTargetAtTime：到某個時間時，用指數的方式前往該值
- setValueCurveAtTime：到某個時間時，對值做曲線的變化
- cancelScheduledValues：取消所有預定的參數的變化

<br/>

舉例來說，今天我們有一段聲音，使用`setValueAtTime`就可以讓聲音做階層式的跳耀，範例讓 0 秒時音量 0，一秒時直接跳到 2，兩秒時直接跳到 4，依此類推到五秒，六秒的時候就會停止。( 範例：[web-audio-api-audioparam-gainnode-demo01.html](/demo/201509/web-audio-api-audioparam-gainnode-demo01.html) )

	var AudioContext = AudioContext || webkitAudioContext;
	var context      = new AudioContext;

	var oscillator = context.createOscillator();
	oscillator.type = "square";
	oscillator.frequency.value = 440;
	oscillator.detune.value = 0;

	gainNode = context.createGain();
	gainNode.gain.value = 0;
	oscillator.connect(gainNode);
	gainNode.connect(context.destination);

	gainNode.gain.setValueAtTime(0, context.currentTime+0); 
	gainNode.gain.setValueAtTime(2, context.currentTime+1); 
	gainNode.gain.setValueAtTime(4, context.currentTime+2); 
	gainNode.gain.setValueAtTime(6, context.currentTime+3); 
	gainNode.gain.setValueAtTime(8, context.currentTime+4); 
	gainNode.gain.setValueAtTime(10, context.currentTime+5); 

	oscillator.start(context.currentTime+0);
	oscillator.stop(context.currentTime+6);

示意圖：

![聲音參數與音量節點 ( AudioParam,GainNode )](/img/articles/201509/20150929_1_02.jpg)

把剛剛的範例換成`linearRampToValueAtTime`，就不會是跳耀的聲音，而會是有漸大漸小的線性變化，會聽到先大聲，再小聲，接著更大聲然後聲音慢慢變小停止，過程共八秒。( 範例：[web-audio-api-audioparam-gainnode-demo02.html](/demo/201509/web-audio-api-audioparam-gainnode-demo02.html) )

	gainNode.gain.linearRampToValueAtTime(0, context.currentTime+0); 
	gainNode.gain.linearRampToValueAtTime(3, context.currentTime+2); 
	gainNode.gain.linearRampToValueAtTime(1, context.currentTime+4); 
	gainNode.gain.linearRampToValueAtTime(5, context.currentTime+6); 
	gainNode.gain.linearRampToValueAtTime(0, context.currentTime+8); 

	oscillator.start(context.currentTime+0);
	oscillator.stop(context.currentTime+8);

示意圖：

![聲音參數與音量節點 ( AudioParam,GainNode )](/img/articles/201509/20150929_1_03.jpg)

同樣的，換成`exponentialRampToValueAtTime`就會採用指數函數的變化，不過由於是指數函數，所以傳入的數值「不可以等於零或小於零」，不然就會發生錯誤 ( 數學運算的緣故 )。( 範例：[web-audio-api-audioparam-gainnode-demo03.html](/demo/201509/web-audio-api-audioparam-gainnode-demo03.html) )

	gainNode.gain.exponentialRampToValueAtTime(1, context.currentTime+0); 
	gainNode.gain.exponentialRampToValueAtTime(5, context.currentTime+3); 
	gainNode.gain.exponentialRampToValueAtTime(1, context.currentTime+6); 

	oscillator.start(context.currentTime+0);
	oscillator.stop(context.currentTime+6);

示意圖：

![聲音參數與音量節點 ( AudioParam,GainNode )](/img/articles/201509/20150929_1_04.jpg)

這個`setTargetAtTime`表示接近該數值的時候，用指數的方式前往該數值，有三個參數，第三個參數越大，表示漸變的斜率越緩和，越小則斜率越陡，數值變化的也越快，換句話說，也就是在幾秒內要變化到那個程度。( 範例：[web-audio-api-audioparam-gainnode-demo04.html](/demo/201509/web-audio-api-audioparam-gainnode-demo04.html) )

	gainNode.gain.setValueAtTime(0, context.currentTime+1);
	gainNode.gain.setTargetAtTime(3, context.currentTime+1, 0.1);  
	gainNode.gain.setTargetAtTime(5, context.currentTime+4, 2); 

	oscillator.start(context.currentTime+0);
	oscillator.stop(context.currentTime+6);

示意圖：

![聲音參數與音量節點 ( AudioParam,GainNode )](/img/articles/201509/20150929_1_05.jpg)

`setValueCurveAtTime`表示自定曲線，由我們自訂的曲線變換至指定的數值，也有三個參數，範例是按照 W3C 所提供的範例做成。( 範例：[web-audio-api-audioparam-gainnode-demo05.html](/demo/201509/web-audio-api-audioparam-gainnode-demo05.html) )

	var curveLength = 44100;
	var curve = new Float32Array(curveLength);
	for (var i = 0; i < curveLength; ++i)
	    curve[i] = Math.sin(Math.PI * i / curveLength);

	gainNode.gain.setValueCurveAtTime(curve, context.currentTime+0, 6); 

	oscillator.start(context.currentTime+0);
	oscillator.stop(context.currentTime+6);

示意圖：

![聲音參數與音量節點 ( AudioParam,GainNode )](/img/articles/201509/20150929_1_06.jpg)

以上就是利用 GainNode 來示範 AudioParam 的效果，有了這些淡入淡出控制數值的做法，之後在處理聲音上應該也就會更得心應手了。


