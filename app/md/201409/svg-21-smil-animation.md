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

<meta property="article:published_time" content="2014-09-21T20:55:00+01:00">

<meta name="keywords" content="svg,smil,animation,動畫,transform,scale,rotate">

<meta name="description" content="SVG 動畫其實跟 CSS3 的動畫很類似，都是必須要手動寫程式控制動畫時間、延遲時間與影格...等的數值，不過 SVG 動畫勝過 CSS3 動畫的地方，就在於 SVG 動畫可以讓圖形跟隨路徑移動、旋轉，還可以將動畫影格與時間做更精準的搭配！">

<meta itemprop="name" content="SVG 研究之路 (21) - 初探 SMIL Animation - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201409/20140921_1_01.jpg">

<meta itemprop="description" content="SVG 動畫其實跟 CSS3 的動畫很類似，都是必須要手動寫程式控制動畫時間、延遲時間與影格...等的數值，不過 SVG 動畫勝過 CSS3 動畫的地方，就在於 SVG 動畫可以讓圖形跟隨路徑移動、旋轉，還可以將動畫影格與時間做更精準的搭配！">

<meta property="og:title" content="SVG 研究之路 (21) - 初探 SMIL Animation - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201409/svg-21-smil-animation.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201409/20140921_1_01.jpg">

<meta property="og:description" content="SVG 動畫其實跟 CSS3 的動畫很類似，都是必須要手動寫程式控制動畫時間、延遲時間與影格...等的數值，不過 SVG 動畫勝過 CSS3 動畫的地方，就在於 SVG 動畫可以讓圖形跟隨路徑移動、旋轉，還可以將動畫影格與時間做更精準的搭配！">

<title>SVG 研究之路 (21) - 初探 SMIL Animation  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG 研究之路 (21) - 初探 SMIL Animation  <span class="article-date" tag="web"><i></i>SEP 20, 2014</span>

SVG 的動畫元素是由 W3C Synchronized Multimedia (SYMM) Working Group 由 Synchronized Multimedia Integration Language (SMIL，同步多媒體集成語言) 所規範開發，SMIL 規劃具有許多的參數與設定值 ( 可以參考 [W3C 的規範](http://www.w3.org/TR/SVG/animate.html) )，也因為有了這些設定，我們便可以輕鬆的控制 SVG 圖形，這篇將介紹 SVG 基本的動畫，進階動畫控制的部分會在下一篇文章進行分享。

SVG 動畫其實跟 CSS3 的動畫很類似，都是必須要手動寫程式控制動畫時間、延遲時間與影格...等的數值，不過 SVG 動畫勝過 CSS3 動畫的地方，就在於 SVG 動畫可以讓圖形跟隨路徑移動、旋轉，還可以將動畫影格與時間做更精準的搭配，甚至在不需要撰寫 javascript 的情形下，就讓動畫具有一些互動效果，真的是非常之神奇呀！( 隨著瀏覽器逐漸的支援，SVG 也逐漸火紅起來 )

SVG 支援 SMIL 動畫規範中定義的四個動畫元素如下：

- set
- animate
- animateMotion
- animateColor ( 已不使用，直接使用屬性值獲取顏色 )

SVG 也包括以下的相容性擴展到 SMIL 動畫元素：

- animateTransform
- path attribute
- mpath element
- keyPoints attribute
- rotate attribute

這篇文章會針對上面的 set、animate、animateMotion 與 animateTransform 這四個動畫元素，進行基本的介紹，除了 animateColor 已經不使用外，path、mpath、keyPoints 與 rotate 則必須依附在 animateMotion 上，之後會再一併介紹。

- set

	set 其實是一個很簡單的元素，若你要說它不像動畫也可以，因為顧名思義就是一個設定而已，但在動畫裡頭，我們時常會需要用到延遲幾秒後從某個位置出現之類的效果，這時候就可以將 set 派上用場，下列的範例表示兩秒之後，正方形會移到 x=70 的地方，雖然 set 支援所有 SVG 動畫的屬性，不過很可惜的，根據 W3C 的規範，動畫屬性不能添加，因此沒有辦法利用 set 做出兩秒跳這邊，四秒跳那邊的動畫。( 範例圖片是 gif，所以會重複播放 )

	![SVG 研究之路 (21) - 初探 SMIL Animation](/img/articles/201409/20140921_1_02.gif)

		<rect width="50" height="50" x="10" y="10" fill="#c00">
		  <set attributeName="x" to="40" begin="2s">
		</rect>
		<rect width="50" height="50" x="10" y="10" fill="none" stroke="#000"/>

- animate

	animate 元素就真的是一個動畫的元素 ( 廢話哈哈 )，下方的範例，設定兩秒內正方形會移到 x=60 的地方 ( dur="2s" )，同時無限次播放 ( repeatCount="indefinite" )。

	![SVG 研究之路 (21) - 初探 SMIL Animation](/img/articles/201409/20140921_1_03.gif)

		<rect width="50" height="50" x="10" y="10" fill="#09c">
		  <animate attributeName="x" to="60" dur="2s" repeatCount="indefinite"> 
		</rect>
		<rect width="50" height="50" x="10" y="10" fill="none" stroke="#000"/>

- animateMotion

	這個屬性是讓我們的圖形，可以跟隨路徑移動，甚至可以設定跟隨路徑自動旋轉，如果對於路徑 path 還不熟悉的，可以參考 [SVG 研究之路 (4) - Path 基礎篇](http://www.oxxostudio.tw/articles/201406/svg-04-path-1.html) 與 [SVG 研究之路 (5) - Path 進階篇](http://www.oxxostudio.tw/articles/201406/svg-05-path-2.html)，比較需要注意的是，當我們設定了 animateMotion，則圖形位置以 path 的起點 M 開始計算，也就是會把 M 當作圖形的 (0,0) 的座標，因此下面的範例將 x 設為 0，y 設為 -10。

	![SVG 研究之路 (21) - 初探 SMIL Animation](/img/articles/201409/20140921_1_04.gif)

		<rect width="20" height="10" x="0" y="-10" fill="#09c">
		  <animateMotion dur="5s" path="M7.4,15.3c17,20.4,48.8,38,91.6,27.8c79.5-18.9,107.4,48.2,69.4,48.2c-33.9,0-15.2-58.1,65.4-41.7c26.2,5.3,63.2-19.1,79.1-34.3" repeatCount="indefinite" rotate="auto" /> 
		</rect>
		<path fill="none" stroke="#000" d="M7.4,15.3c17,20.4,48.8,38,91.6,27.8c79.5-18.9,107.4,48.2,69.4,48.2c-33.9,0-15.2-58.1,65.4-41.7c26.2,5.3,63.2-19.1,79.1-34.3"/>

	如果沒有這樣設定，則會出現這樣的情況：

	![SVG 研究之路 (21) - 初探 SMIL Animation](/img/articles/201409/20140921_1_05.gif)

		<rect width="20" height="10" x="20" y="20" fill="#09c">
		  <animateMotion dur="5s" path="M7.4,15.3c17,20.4,48.8,38,91.6,27.8c79.5-18.9,107.4,48.2,69.4,48.2c-33.9,0-15.2-58.1,65.4-41.7c26.2,5.3,63.2-19.1,79.1-34.3" repeatCount="indefinite" rotate="auto" /> 
		</rect>
		<path fill="none" stroke="#000" d="M7.4,15.3c17,20.4,48.8,38,91.6,27.8c79.5-18.9,107.4,48.2,69.4,48.2c-33.9,0-15.2-58.1,65.4-41.7c26.2,5.3,63.2-19.1,79.1-34.3"/>

- animateTransform
	
	這是控制圖形 transform 動畫的屬性，要使用這個屬性，就非得掌握 SVG transform 的基礎知識，可以參考之前的文章：[SVG 研究之路 (19) - transform 基礎篇](http://www.oxxostudio.tw/articles/201409/svg-19-transform.html) 與 [SVG 研究之路 (20) - transform Matrix](http://www.oxxostudio.tw/articles/201409/svg-20-transform-matrix.html)，下面的範例可以看到我們設定 type 是 scale，從 1 的比例變成 1.5 的比例。

	![SVG 研究之路 (21) - 初探 SMIL Animation](/img/articles/201409/20140921_1_06.gif)

		<rect width="60" height="60" x="10" y="10" fill="#0c0">
		  <animateTransform dur="2s" attributeName="transform" repeatCount="indefinite" type="scale" from="1" to="1.5"/> 
		</rect>
		<rect width="60" height="60" x="10" y="10" fill="none" stroke="#000">

	也可以把 type 設為 rotate，就可以讓圖形旋轉

	![SVG 研究之路 (21) - 初探 SMIL Animation](/img/articles/201409/20140921_1_07.gif)

		<rect width="60" height="60" x="50" y="50" fill="#0c0">
		  <animateTransform dur="2s" attributeName="transform" repeatCount="indefinite" type="rotate" from="0,80,80" to="360,80,80"/> 
		</rect>
		<rect width="60" height="60" x="50" y="50" fill="none" stroke="#000">

其實 SVG animation 的設定還有很多，上述只是讓我們從最基本的「圖動起來」著手，避免一開始就介紹一大堆的屬性設定，喪失了對於動畫的好奇和熱情，下一篇即將介紹動畫更進階的設定，了解了這些設定之後，相信一定可以做出不錯的效果喔！

<!-- @@close-->
