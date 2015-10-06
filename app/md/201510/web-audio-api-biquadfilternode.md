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

<meta property="article:published_time" content="2015-10-06T23:50:00+01:00">

<meta name="keywords" content="music,audio,web audio api,BiquadFilterNode,濾波器">

<meta name="description" content="這篇要來探討 Web Audio API 裏頭的濾波器：BiquadFilterNode，濾波器顧名思義，就是只讓固定頻率的波通過，在一般常見的聲音播放軟體的「等化器」，當中就用到許多濾波的功能，透過濾波器，我們可以加強或過濾低音或高音，直接影響聽覺的感受，甚至可以利用過濾器濾掉高頻的雜訊或低頻的雜訊，得到更高的音質。">

<meta itemprop="name" content="聲音濾波器 ( BiquadFilterNode ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201510/20151006_1_01b.jpg">

<meta itemprop="description" content="這篇要來探討 Web Audio API 裏頭的濾波器：BiquadFilterNode，濾波器顧名思義，就是只讓固定頻率的波通過，在一般常見的聲音播放軟體的「等化器」，當中就用到許多濾波的功能，透過濾波器，我們可以加強或過濾低音或高音，直接影響聽覺的感受，甚至可以利用過濾器濾掉高頻的雜訊或低頻的雜訊，得到更高的音質。">

<meta property="og:title" content="聲音濾波器 ( BiquadFilterNode ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201510/web-audio-api-biquadfilternode.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201510/20151006_1_01b.jpg">

<meta property="og:description" content="這篇要來探討 Web Audio API 裏頭的濾波器：BiquadFilterNode，濾波器顧名思義，就是只讓固定頻率的波通過，在一般常見的聲音播放軟體的「等化器」，當中就用到許多濾波的功能，透過濾波器，我們可以加強或過濾低音或高音，直接影響聽覺的感受，甚至可以利用過濾器濾掉高頻的雜訊或低頻的雜訊，得到更高的音質。">

<title>聲音濾波器 ( BiquadFilterNode ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##聲音濾波器 ( BiquadFilterNode ) <span class="article-date" tag="web">OCT 6	, 2015</span>

這篇要來探討 Web Audio API 裏頭的濾波器：BiquadFilterNode，濾波器顧名思義，就是只讓固定頻率的波通過，在一般常見的聲音播放軟體的「等化器」，當中就用到許多濾波的功能，透過濾波器，我們可以加強或過濾低音或高音，直接影響聽覺的感受，甚至可以利用過濾器濾掉高頻的雜訊或低頻的雜訊，得到更高的音質。

使用 BiquadFilterNode 之前，要了解它有幾種類型 ( type ) 可以使用，如果對於文字描述不清楚的，其實只要看下面那張圖就能一目了然。

>- lowpass：低通，低於設定頻率的全濾掉
- highpass：高通，高於設定頻率的全濾掉
- bandpass：帶通，除了設定頻率之外的全濾掉
- lowshelf：低架，低於設定頻率的部分濾掉
- highshelf：高架，高於設定頻率的部分濾掉
- peaking：峰值，除了設定頻率之外的部分濾掉
- notch：缺口，將設定頻率的全部濾掉
- allpass：全通

![聲音濾波器 ( BiquadFilterNode )](/img/articles/201510/20151006_1_02.jpg)
 
光只有 type 仍然不夠，我們還需要有幾個屬性來做進一步的設定，這些屬性是：

>- frequency：頻率，也就是做為濾波的判斷依據，預設 350Hz。
- Q：Quality Factor，中文稱作「品質參數」，預設 1，區間  0.0001 到 1000。
- gain：通過的音量，預設 0。 ( 適用 lowshelf、highshelf、peaking)

frequency 與 gain 都還滿好理解，frequency 就是我們要指定一個頻率，由這個頻率和剛剛的過濾類型搭配過濾，gain 只適用 lowshelf、highshelf、peaking 這三個類型，因為這三個類型仍然會有波跑過去，而跑過去的波的音量，就由 gain 來指定，比較困擾的是這個「Q」，如果不是理工類科，大概很難理解，幸好我以前是物理系出身，又有一些好同學可以詢問，總算搞明白 Q 就是品質參數 ( Quality Factor )，舉例來說，如果今天我們要做一個頻率 1000 赫茲的帶通濾波，在不設定 Q 的情況下，帶通濾波濾出來的可能是 800 到 1200 的頻率，當 Q 變大，濾出來就會變成 990 到 1010，換句話說，Q 越大就會越精準，品質就會越好，這也就是品質參數的原理。

![聲音濾波器 ( BiquadFilterNode )](/img/articles/201510/20151006_1_03.jpg)

了解原理之後就要來看範例，這裏我實作了一個可以調整濾波器的 type、frequency、Q 和 gain 的拉霸，由於 BiquadFilterNode 也是節點模組，因此我們要用`createBiquadFilter`的方式來創建。

	var _filter = function(t,f,d,type,ff,q,g){
	  oscillator.type = t;
	  oscillator.frequency.value = f;
	  oscillator.detune.value = d;
	  var filter = context.createBiquadFilter();
	  filter.type = type;
	  filter.frequency.value = ff;
	  filter.Q.value = q;
	  filter.gain.value = g;
	  oscillator.connect(filter);
	  return filter;
	}

	function _sound(){
	  if(p == 1){
	    sound.disconnect(context.destination);
	    sound = _filter(type,frequency,detune,filterType,filterFrequency,filterQ,filterGain);
	    sound.connect(context.destination);
	  }
	}

<br/>

主要的程式就是上面這一段，至於拉霸與按鈕的程式，都與之前的做法類似，就不在這篇做太多說明了，總而言之，了解濾波器的原理，往後當我們匯入了一首真正的曲目，就可以透過濾波器來做一些有趣的聲音變化了。( 範例：[web-audio-api-biquadfilternode-demo01.html](/demo/201510/web-audio-api-biquadfilternode-demo01.html) )

![聲音濾波器 ( BiquadFilterNode )](/img/articles/201510/20151006_1_04.jpg)


<!-- @@close-->




