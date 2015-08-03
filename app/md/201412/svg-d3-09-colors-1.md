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

<meta property="article:published_time" content="2014-12-25T23:55:00+01:00">

<meta name="keywords" content="svg,d3,d3js,d3.js,color,colors,色彩">

<meta name="description" content="在 d3.js 裡，同樣也有操作顏色的 API,有別於一般我們在寫 CSS 的顏色方式，d3.js 是使用 RGB ( 紅綠藍 )、HSL (色調、飽和度，亮度) 、HCL 與 LAB ( 亮度，a 維度，b 維度 ) 的這些色彩空間。">

<meta itemprop="name" content="SVG D3.js - 定義色彩 - 基本篇 ( colors ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201412/20141225_1_01b.jpg">

<meta itemprop="description" content="在 d3.js 裡，同樣也有操作顏色的 API,有別於一般我們在寫 CSS 的顏色方式，d3.js 是使用 RGB ( 紅綠藍 )、HSL (色調、飽和度，亮度) 、HCL 與 LAB ( 亮度，a 維度，b 維度 ) 的這些色彩空間。">

<meta property="og:title" content="SVG D3.js - 定義色彩 - 基本篇 ( colors ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201412/svg-d3-09-colors-1.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201412/20141225_1_01b.jpg">

<meta property="og:description" content="在 d3.js 裡，同樣也有操作顏色的 API,有別於一般我們在寫 CSS 的顏色方式，d3.js 是使用 RGB ( 紅綠藍 )、HSL (色調、飽和度，亮度) 、HCL 與 LAB ( 亮度，a 維度，b 維度 ) 的這些色彩空間。">

<title>SVG D3.js - 定義色彩 - 基本篇 ( colors )  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG D3.js - 定義色彩 - 基本篇 ( colors )  <span class="article-date" tag="web">DEC 25, 2014</span>

<img src="/img/articles/201412/20141225_1_01.jpg" class="preview-img">

在網頁的世界裡，色彩是非常重要的，通常我們在寫網頁的色彩，不外乎就是用十六進制 ( #f00、#fff )、顏色名稱 ( red、yellow ) 或 rgba ( rgba(0,0,0,0) )，而在 d3.js 裡，同樣也有操作顏色的 API,有別於一般我們在寫 CSS 的顏色方式，d3.js 是使用 RGB ( 紅綠藍 )、HSL (色調、飽和度，亮度) 、HCL 與 LAB ( 亮度，a 維度，b 維度 ) 的這些色彩空間，對於這些色彩空間不了解的，可以參考 [維基百科色彩空間](http://zh.wikipedia.org/wiki/%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%96%93)。

和 CSS 最大的差異，d3.js 可以運用其 API 讓顏色亮一點或暗一點，如果在 CSS 裏頭，要調整某個顏色亮一點暗一點，就非得要自己從十六進制色碼下去著手，而當我們運用 d3.js，就可以直接交給 API 去處理即可，以下就來看看 d3.js 的 colors，具有那些 API 可以使用，這裡列出了以 rgb 開頭的 API,而 HSL、HCL 與 LAB 的用法也都一樣，大家舉一反三就好：

>- d3.rgb
- rgb.brighter
- rgb.darker
- rgb.hsl 
- rgb.toString

<br/>

- **d3.rgb(r, g, b)**

	這是可以把一個變數宣告為 d3 的色彩，也就是經過這個方式宣告之後，該變數不僅可作為色彩使用，也可利用 d3.js 其他的色彩 API 來控制和調整，下面的例子便是利用這種方式，將四個　div 的背景色設定為紅綠黃藍。( 範例：[svg-d3-09-colors-demo1.html](/demo/201412/svg-d3-09-colors-1-demo1.html) )

	HTML：

		<div id="red"></div>
		<div id="green"></div>
		<div id="yellow"></div>
		<div id="blue"></div>

	JS：

		var d = d3.selectAll('div'),
				r = d3.select('#red'),
				g = d3.select('#green'),
				y = d3.select('#yellow'),
				b = d3.select('#blue');
		
		d.style({
		  'width':'80px',
		  'height':'80px',
		  'display':'inline-block',
		  'margin':'3px'
		});
		
		var red = d3.rgb(255,0,0);
		var green = d3.rgb(0,255,0);
		var yellow = d3.rgb(255,255,0);
		var blue = d3.rgb(0,0,255);
		
		r.style({
		    'background':red
		  });
		g.style({
		    'background':green
		  });
		y.style({
		    'background':yellow
		  });
		b.style({
		    'background':blue
		  });

	![SVG D3.js - 定義色彩 - 基本篇 ( colors )](/img/articles/201412/20141225_1_02.jpg)


<br/>

- **d3.rgb(color)**

	除了用十進位撰寫顏色之外，其實 d3.js 也可以直接讓我們填寫顏色的名稱或十六進位色碼，不過要注意的是，記得要用引號包起來，才識字串的形式。( 範例：[svg-d3-09-colors-1-demo2.html](/demo/201412/svg-d3-09-colors-1-demo2.html) )

		var red = d3.rgb('red');
		var green = d3.rgb('green');
		var yellow = d3.rgb('yellow');
		var blue = d3.rgb('blue');

	![SVG D3.js - 定義色彩 - 基本篇 ( colors )](/img/articles/201412/20141225_1_03.jpg)

		var red = d3.rgb('#f00');
		var green = d3.rgb('#0f0');
		var yellow = d3.rgb('#ff0');
		var blue = d3.rgb('#00f');

	![SVG D3.js - 定義色彩 - 基本篇 ( colors )](/img/articles/201412/20141225_1_04.jpg)

<br/>

- **rgb.brighter([k])**

	加亮顏色的 API，數值從 0 開始往上加，最主要是在原本的顏色數字乘上 0.7^-k ，數字越大越亮，不過最終的數值範圍是 30-255，超過範圍的就會以最大值或最小值表現，範例有改了一下上面的 HTML，可以點開看完整原始檔。( 範例：[svg-d3-09-colors-1-demo3.html](/demo/201412/svg-d3-09-colors-1-demo3.html) )

		var red = d3.rgb(50,0,0);
		
		r.style({
		    'background':red.brighter(0)
		  });
		r1.style({
		    'background':red.brighter(1)
		  });
		r2.style({
		    'background':red.brighter(2)
		  });
		r3.style({
		    'background':red.brighter(3)
		  });
		r4.style({
		    'background':red.brighter(4)
		  });

	![SVG D3.js - 定義色彩 - 基本篇 ( colors )](/img/articles/201412/20141225_1_05.jpg)

	對於想要了解背後真正運算式的，可以利用 console 看出背後的運作原理，但實際上我們也不太需要真正了解，因為 我們使用 d3.js ，就是為了幫我們解決這些運算呀！

		brighter: function (n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),new dt(Math.min(255,t/n),Math.min(255,e/n),Math.min(255,r/n))):new dt(u,u,u)}

<br/>

- **rgb.darker([k])**

	和剛剛的 rgb.brighter 相反，rgb.darker 是變暗，是在原本的顏色數字乘上 0.7^k，注意不是 -k 而是 k。( 範例：[svg-d3-09-colors-1-demo4.html](/demo/201412/svg-d3-09-colors-1-demo4.html) )

		var red = d3.rgb(255,0,0);
		
		r.style({
		    'background':red.darker(0)
		  });
		r1.style({
		    'background':red.darker(1)
		  });
		r2.style({
		    'background':red.darker(2)
		  });
		r3.style({
		    'background':red.darker(3)
		  });
		r4.style({
		    'background':red.darker(4)
		  });

	![SVG D3.js - 定義色彩 - 基本篇 ( colors )](/img/articles/201412/20141225_1_06.jpg)

<br/>

- **rgb.hsl()**

	返回 HSL 的色彩，可以直接從 console 看出來。( 範例：[svg-d3-09-colors-1-demo5.html](/demo/201412/svg-d3-09-colors-1-demo5.html) )

		var red = d3.rgb(255,0,0);	
		console.log(red.hsl());

	![SVG D3.js - 定義色彩 - 基本篇 ( colors )](/img/articles/201412/20141225_1_07.jpg)



<br/>

- **rgb.toString()**

	輸出色彩為十六進位字串。( 範例：[svg-d3-09-colors-1-demo6.html](/demo/201412/svg-d3-09-colors-1-demo6.html) )
		
		var red = d3.rgb(255,0,0);
		console.log(red.toString());

<br/>

以上就是 d3.js 對於色彩的基本用法，最主要也是練習色彩的相關 API，下一篇將會繼續介紹色彩的其他用法。

<!-- @@close-->