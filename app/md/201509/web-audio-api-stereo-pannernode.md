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

<meta property="article:published_time" content="2015-09-30T23:10:00+01:00">

<meta name="keywords" content="music,audio,web audio api,PannerNode,StereoPannerNode">

<meta name="description" content="通常我們在電影院看電影時，高檔一點的電影院會有立體音響 ( 特別是 iMax3D )，讓我們有置身在電影場景裡的感受，然而在 Web Audio API 裡也有類似的功能，讓我們可以模擬出立體的聲音，而這項技術雖然還沒有被廣泛應用，但根據現有的資訊，未來應該將會與 WebGL 結合，廣泛用於 360 度影片、Web 遊戲...等需要有立體聲音的技術領域。">

<meta itemprop="name" content="立體聲 ( PannerNode,StereoPannerNode ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201509/20150930_1_01b.jpg">

<meta itemprop="description" content="通常我們在電影院看電影時，高檔一點的電影院會有立體音響 ( 特別是 iMax3D )，讓我們有置身在電影場景裡的感受，然而在 Web Audio API 裡也有類似的功能，讓我們可以模擬出立體的聲音，而這項技術雖然還沒有被廣泛應用，但根據現有的資訊，未來應該將會與 WebGL 結合，廣泛用於 360 度影片、Web 遊戲...等需要有立體聲音的技術領域。">

<meta property="og:title" content="立體聲 ( PannerNode,StereoPannerNode ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201509/web-audio-api-stereo-pannernode.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201509/20150930_1_01b.jpg">

<meta property="og:description" content="通常我們在電影院看電影時，高檔一點的電影院會有立體音響 ( 特別是 iMax3D )，讓我們有置身在電影場景裡的感受，然而在 Web Audio API 裡也有類似的功能，讓我們可以模擬出立體的聲音，而這項技術雖然還沒有被廣泛應用，但根據現有的資訊，未來應該將會與 WebGL 結合，廣泛用於 360 度影片、Web 遊戲...等需要有立體聲音的技術領域。">

<title>立體聲 ( PannerNode,StereoPannerNode ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##立體聲 ( PannerNode,StereoPannerNode ) <span class="article-date" tag="web">SEP 30	, 2015</span>

<img src="/img/articles/201509/20150930_1_01.jpg" class="preview-img">

通常我們在電影院看電影時，高檔一點的電影院會有立體音響 ( 特別是 iMax3D )，讓我們有置身在電影場景裡的感受，然而在 Web Audio API 裡也有類似的功能，讓我們可以模擬出立體的聲音，而這項技術雖然還沒有被廣泛應用，但根據現有的資訊，未來應該將會與 WebGL 結合，廣泛用於 360 度影片、Web 遊戲...等需要有立體聲音的技術領域，這篇將會做一些簡單的介紹。

先看到比較簡單的 StereoPannerNode，這只是針對在 2D 平面上的左右移動，它也只有一個屬性叫做「pan」，數值為 -1 到 1，如果越接近 -1，左邊的聲音就會越大聲，右邊就越小聲，越接近 1 則反之，預設值為 0 也就是左右均等，在下面的範例我們利用`context.createStereoPanner()`產生 StereoPannerNode，賦予值，就可以控制左右聲道。( 範例：[web-audio-api-stereo-pannernode-demo01.html](/demo/201509/web-audio-api-stereo-pannernode-demo01.html) )

	var AudioContext = AudioContext || webkitAudioContext;
	var context      = new AudioContext;
	var oscillator   = context.createOscillator();
	var sound,
	    type = 'square',
	    frequency = 440,
	    detune = 0,
	    pan = 0;
	    c = 0;

	var startBtn  = document.getElementById('startBtn'),
	  stopBtn     = document.getElementById('stopBtn'),
	  panRange    = document.getElementById('panRange'),
	  showPan     = document.getElementById('showPan');

	var _pan = function(t,f,d,p){
	  oscillator.type = t;
	  oscillator.frequency.value = f;
	  oscillator.detune.value = d;
	  panNodes = context.createStereoPanner();
	  panNodes.pan.value = p;
	  oscillator.connect(panNodes);
	  return panNodes;
	}

	function _sound(){
	  if(c == 1){
	    sound.disconnect(context.destination);
	    sound = _pan(type,frequency,detune,pan);
	    sound.connect(context.destination);
	  }
	}

	startBtn.addEventListener('click',function(){
	  c = 1;
	  startBtn.disabled = true;
	  stopBtn.disabled = false;
	  sound = _pan(type,frequency,detune,pan);
	  sound.connect(context.destination);
	});

	stopBtn.addEventListener('click',function(){
	  c = 0;
	  startBtn.disabled = false;
	  stopBtn.disabled = true;
	  sound.disconnect(context.destination);
	});

	panRange.oninput = function(){
	  pan = this.value;
	  showPan.innerHTML = pan;
	  _sound();
	};

	oscillator.start();

<br/>

雖然說可以控制左右聲道，好像已經可以做出一些滿有趣的東西 ( 許多音樂也都會有左右聲道的切換 )，但對於一些 WebGL 所繪製的場景來說，要說立體又沒有那麼的立體，畢竟在真實的世界聲音不會只有左邊到右邊而已，因此 Web Audio API 還有提供力另外一個「PannerNode」來幫我們解決立體聲的問題，而它具備的屬性就多很多了：

>- panningModel：音訊空間演算法模組，預設值 equalpower。( 還有 HRTF 和 soundfield )
- distanceModel：聲音衰減演算法模組，預設值 inverse。( 還有 linear 和 exponential )
- maxDistance：聲音可傳遞的最大距離，預設值 10000
- rolloffFactor：距離衰減的速度演算，預設值 1
- coneInnerAngle：音源內側角度，預設 360 
- coneOuterAngle：音源外側角度，預設 360
- coneOuterGain：音源外側衰減率，預設 0

<br/>

前面兩個`panningModel`和`distanceModel`基本上就是聲音在 3D 空間和衰減的演算法，如果對於數學有興趣的可以參考[這篇](http://webaudio.github.io/web-audio-api/#idl-def-PanningModelType)和[這篇](http://webaudio.github.io/web-audio-api/#idl-def-DistanceModelType)，在這邊就不多作解釋，`maxDistance`也很好理解，就是聲音最多可以傳送到哪邊，而`rolloffFactor`就是在傳送過程中衰減的速度，數值愈大衰減的越快 ( 雖然還是會傳遞到我們設定的最大距離，但一開始衰減太快的話，其實就會很快就聽不到了 )。

比較有趣的是後面三個屬性`coneInnerAngle`、`coneOuterAngle`和`coneOuterGain`，要理解這三個屬性必須由下面這張示意圖著手，圖片來源：[http://curtaincall.weblike.jp/portfolio-web-sounder/](http://curtaincall.weblike.jp/portfolio-web-sounder/)

![立體聲道 ( PannerNode,StereoPannerNode )](/img/articles/201509/20150930_1_02.jpg)

因為聲音在我們日常生活中，可以看成一個「點」在發聲，例如一個爆炸聲響，一定朝四面八方擴散出去
，除非有某個地方擋住，然而這三個屬性顧名思義 cone 就是「圓錐」的意思，可以想像成聲音透過一個大聲公發出，就會類似圓錐一樣，inner 是指主要圓錐展出的角度，而 outer 可以想像成圓錐外延伸出去的聲音 ( 有點像是手電筒發光，主要光束的周圍還是會有飄出去的光 )，當我們直接面對聲音，圓錐越窄可以聽到聲音的範圍就越小。

除了上面描述的這些屬性外，PannerNode 還有以下三個方法：

>- setPosition(x, y, z)：音源位置設定，預設 (0,0,0)
- setOrientation(x, y, z)：音源方向	設定，預設 (1,0,0)
- setVelocity(x, y, z)：音源移動速度設定，預設 (0,0,0)

<br/>

`setPosition`是設定音源在 3D 空間的哪個位置，而`setOrientation`是告訴我們聲音往哪個方向發聲，有點像在繪製 3D 圖形的時候，探照燈或是攝影機，都會有自己的中心點，以及朝向哪個方向的點座標一樣，`setVelocity`指的是聲音的速度，也就是這個聲音朝哪個方向移動，下面的範例是利用 PannerNode 來做一個空間裡的聲音，有別於剛剛的左聲道右聲道，利用 PannerNode 還會發現聲音越來越小聲，彷彿真的有個聲音在移動的感覺，由於程式碼比較多，這裏就只列出主要修改的部分。( 範例：[web-audio-api-stereo-pannernode-demo02.html](/demo/201509/web-audio-api-stereo-pannernode-demo02.html) )

	oscillator.type = 'square';
	oscillator.frequency.value = 440;
	oscillator.detune.value = 0;
	panNodes = context.createPanner();
	panNodes.setPosition(x,y,z);
	panNodes.setOrientation(ox,oy,oz);
	panNodes.coneInnerAngle = it;
	panNodes.coneOuterAngle = ot;
	oscillator.connect(panNodes);

<br/>

如果開了範例之後調整拉霸還是不太明白，其實只要換個角度思考，在沒有設定`coneInnerAngle`和`coneOuterAngle`的情形下，聲音會朝四面八方擴散，聲音所在的位置 (0,0,0) 剛好也是我們人所在的位置 (0,0,0)，所以我們調整 x 的時候，就會發現突然是只有右邊有聲音或突然只有左邊有聲音 ( 想像有隻蚊子跨過頭頂，從左耳飛到右耳 )，又因為是「笛卡兒座標系統」，所以 y 軸往上為正。

![立體聲道 ( PannerNode,StereoPannerNode )](/img/articles/201509/20150930_1_03.jpg)

如果今天我們稍微調整一下 Z 軸 (pz)，讓蚊子飛行的時候不要從頭頂，而是往前一點或往後一點，我們就會開始兩隻耳朵都聽到聲音了。

![立體聲道 ( PannerNode,StereoPannerNode )](/img/articles/201509/20150930_1_04.jpg)

但這個時候你會注意到調整 ox、oy、oz ( setOrientation ) 都沒作用，因為我們聲音是朝四面八方擴散，「指向性」自然會失去作用，同樣的，如果只設定`coneInnerAngle`和`coneOuterAngle`，沒有設定指向性也是沒有用的，就像用了大聲公，一定得朝一個方向喊話才是，所以我們可以先把`coneInnerAngle`和`coneOuterAngle`都設為 30，這時候調整 ox、oy、oz，就會有不同的變化了。

![立體聲道 ( PannerNode,StereoPannerNode )](/img/articles/201509/20150930_1_05.jpg)

除了上述的 PannerNode 和 StereoPannerNode，其實還有另外一個 AudioListener，代表我們聽到聲音的人，它具有以下幾個屬性：

>- dopplerFactor：都卜勒效應，預設 1
- speedOfSound：因素，預設  343.3
- setPosition(x, y, z)
- setOrientation(x, y, z, xUp, yUp, zUp)
- setVelocity(x, y, z)

<br/>
`dopplerFactor`代表都卜勒效應，如果不了解都卜勒效應，可以參考[維基百科](https://zh.wikipedia.org/wiki/%E5%A4%9A%E6%99%AE%E5%8B%92%E6%95%88%E5%BA%94)，舉例來說，今天有輛鳴笛的警車朝我們駛過來，聽到的鳴笛聲會比較尖銳，當警車遠離我們時，鳴笛聲會比較低沈，這就是因為鳴笛的音速和車速的關聯，導致我們聽到的聲音頻率不同，這通常也是我們要在 Web 裏頭模擬真實的聲音會用到的。

![立體聲道 ( PannerNode,StereoPannerNode )](/img/articles/201509/20150930_1_03.gif)

此外雖然說用法類似，但 AudioListener 並不是 AudioNode，udioListener 是創立一個「聽者」，如果沒有創建，預設就以 (0,0,0) 為主，創建的話就可以設定由創建的聽者為主，也因此不會有 connect 的事件在它身上發生，創建的方法很簡單，一行程式就建立了，然後就可以使用上面的屬性和方法，在範例當中可以調整最後的 ax、ay 和 az，看看效果。( 範例：[web-audio-api-stereo-pannernode-demo03.html](/demo/201509/web-audio-api-stereo-pannernode-demo03.html) )

	var listener = context.listener;

<br/>

以上就是利用 Web Audio API 創建立體聲，如果把聲音想像成 3D 的繪圖，就會容易理解得多，雖然目前感覺起來，純粹使用感覺用處不大，但搭配一些 WebGL 的遊戲或立體空間，應該就會頗有看頭的啦！

參考資料：
- http://curtaincall.weblike.jp/portfolio-web-sounder/webaudioapi-effectors/auto-panner
- http://www.g200kg.com/jp/docs/webaudio/panner.html

<!-- @@close-->




