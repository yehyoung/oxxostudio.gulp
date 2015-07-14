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

<meta property="article:published_time" content="2014-09-02T23:55:00+01:00">

<meta name="keywords" content="css,css3,hover,svg,pointer-events,div,穿透">

<meta name="description" content="pointer-events 是一個滿有趣的 CSS3 屬性，雖然主要是針對 SVG ，但其中幾個屬性應用在 div 上也是頗有意思。顧名思義，這是一個針對滑鼠事件的屬性，預設值為 auto，若值為 none，則可以穿越該元素，點擊到下方的元素。">

<meta itemprop="name" content="穿透的 div ( pointer-events ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201409/20140902_1_01.jpg">

<meta itemprop="description" content="pointer-events 是一個滿有趣的 CSS3 屬性，雖然主要是針對 SVG ，但其中幾個屬性應用在 div 上也是頗有意思。顧名思義，這是一個針對滑鼠事件的屬性，預設值為 auto，若值為 none，則可以穿越該元素，點擊到下方的元素。">

<meta property="og:title" content="穿透的 div ( pointer-events ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201409/pointer-events.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201409/20140902_1_01.jpg">

<meta property="og:description" content="pointer-events 是一個滿有趣的 CSS3 屬性，雖然主要是針對 SVG ，但其中幾個屬性應用在 div 上也是頗有意思。顧名思義，這是一個針對滑鼠事件的屬性，預設值為 auto，若值為 none，則可以穿越該元素，點擊到下方的元素。">

<title>穿透的 div ( pointer-events ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##穿透的 div ( pointer-events ) <span class="article-date" tag="css"><i></i>SEP 2, 2014</span>

pointer-events 是一個滿有趣的 CSS3 屬性，雖然主要是針對 SVG ，但其中幾個屬性應用在 div 上也是頗有意思。顧名思義，這是一個針對滑鼠事件的屬性，預設值為 auto，若值為 none，則可以穿越該元素，點擊到下方的元素。除了 auto 和 none，這是完整的屬性列表：`pointer-events: auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit`，除了 auto 與 none，其他都是控制 SVG 的屬性，若採用預設值，則 SVG 就是以 visiblePainted 來表現。

首先看到 `pointer-events: auto`，就是我們一般常見的，一個 div 被另外一個 div 遮住，就無法進行點擊或 hover 的動作，如下圖：  

![穿透的 div ( pointer-events )](/img/articles/201409/20140902_1_02.gif)

HTML：

    <div class="ybox"></div>
    <div class="gbox"></div>

CSS：

	.ybox {
	  background: rgba(255, 200, 0, .8);
	  margin: 20px;
	  z-index: 3;
	}
	.gbox {
	  background: rgba(0, 220, 170, .8);
	  margin: -80px 40px 20px;
	  z-index: 2;
	}
	.gbox:hover{
	  background: rgba(255, 50, 50, .8);
	}

這時候如果我們把 ybox 增加 `pointer-events: none;`，就會發現底下的 gbox 可以 hover 了！

![穿透的 div ( pointer-events )](/img/articles/201409/20140902_1_03.gif)


至於其他的屬性，在這邊稍微做一些介紹，根據 [這篇](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)的解釋，可以知道其他屬性是這樣解釋：

- visiblePainted：  
	只適用於 SVG。元素只有在以下情況才會成為鼠標事件的目標：visibility 屬性值為 visible，且鼠標指針在元素內部，且 fill 屬性指定了 none 之外的值、visibility 屬性值為 visible，鼠標指針在元素邊界上，且 stroke 屬性指定了none 之外的值。

- visibleFill：  
	只適用於 SVG。只有在元素 visibility 屬性值為 visible，且鼠標指針在元素內部時,元素才會成為鼠標事件的目標，fill屬性的值不影響事件處理。

- visibleStroke：  
	只適用於 SVG。只有在元素 visibility 屬性值為 visible，且鼠標指針在元素邊界時,元素才會成為鼠標事件的目標，stroke 屬性的值不影響事件處理。

- visible：  
	只適用於 SVG。只有在元素 visibility 屬性值為 visible，且鼠標指針在元素內部或邊界時,元素才會成為鼠標事件的目標，fill 和 stroke 屬性的值不影響事件處理。

- painted：  
	只適用於 SVG。元素只有在以下情況才會成為鼠標事件的目標：鼠標指針在元素內部，且 fill 屬性指定了 none 之外的值、鼠標指針在元素邊界上，且 stroke 屬性指定了 none 之外的值。

- visibility屬性的值不影響事件處理。

- fill：  
	只適用於 SVG。只有鼠標指針在元素內部時,元素才會成為鼠標事件的目標，fill 和 visibility 屬性的值不影響事件處理。

- stroke：  
	只適用於 SVG。只有鼠標指針在元素邊界上時,元素才會成為鼠標事件的目標，stroke 和 visibility 屬性的值不影響事件處理。

- all：  
	只適用於 SVG。只有鼠標指針在元素內部或邊界時,元素才會成為鼠標事件的目標，fill、stroke 和 visibility 屬性的值不影響事件處理。


例如我們畫面中有一個 SVG 所繪製的矩形，就可以控制讓滑鼠移到邊框變色，或是移到填滿區域才變色，這是設為 fill 的結果：

![穿透的 div ( pointer-events )](/img/articles/201409/20140902_1_04.gif)

HTML：

    <svg width="200" height="140">
      <rect width="100" height="100" fill="#f00" stroke="#000" stroke-width="10" x="20" y="20" id="test"></rect>
    </svg>

CSS：

	#test {
	  pointer-events: fill;
	}
	#test:hover {
	  fill: #09f;
	}

如果改設為 stroke 就會變成這樣：

![穿透的 div ( pointer-events )](/img/articles/201409/20140902_1_05.gif)

這就是 pointer-events 的用法，其實搞懂之後，因為可以點擊到被覆蓋的 div 下方的東西，就可以做出許多應用喔！真是迫不及待想要用用看啦！

<!-- @@close-->



