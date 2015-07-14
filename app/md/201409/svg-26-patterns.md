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

<meta property="article:published_time" content="2014-09-28T23:25:00+01:00">

<meta name="keywords" content="svg,patterns,fill,patternUnits,patternContentUnits,userSpaceOnUse,objectBoundingBox">

<meta name="description" content="Patterns 是 SVG fill 裏頭的一個有趣元素，記得在 CSS 裏頭，我們可以自訂背景的圖案，達到許多很有特色的變化，然而在 SVG 也是如此，而 SVG 比 CSS 更加強大的地方，是你所有的圖案幾乎都可以在 SVG 裏頭畫出來。">

<meta itemprop="name" content="SVG 研究之路 (26) - 有趣的 Patterns - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201409/20140928_1_01.jpg">

<meta itemprop="description" content="Patterns 是 SVG fill 裏頭的一個有趣元素，記得在 CSS 裏頭，我們可以自訂背景的圖案，達到許多很有特色的變化，然而在 SVG 也是如此，而 SVG 比 CSS 更加強大的地方，是你所有的圖案幾乎都可以在 SVG 裏頭畫出來。">

<meta property="og:title" content="SVG 研究之路 (26) - 有趣的 Patterns - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201409/svg-26-patterns.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201409/20140928_1_01.jpg">

<meta property="og:description" content="Patterns 是 SVG fill 裏頭的一個有趣元素，記得在 CSS 裏頭，我們可以自訂背景的圖案，達到許多很有特色的變化，然而在 SVG 也是如此，而 SVG 比 CSS 更加強大的地方，是你所有的圖案幾乎都可以在 SVG 裏頭畫出來。">

<title>SVG 研究之路 (26) - 有趣的 Patterns  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG 研究之路 (26) - 有趣的 Patterns  <span class="article-date" tag="web"><i></i>SEP 28, 2014</span>

Patterns 是 SVG fill 裏頭的一個有趣元素，記得在 CSS 裏頭，我們可以自訂背景的圖案，達到許多很有特色的變化，然而在 SVG 也是如此，而 SVG 比 CSS 更加強大的地方，是你所有的圖案幾乎都可以在 SVG 裏頭畫出來 ( 當然強調細節的點陣圖案例外 )，以下將介紹 Patterns 的相關屬性與參數設定，並直接來看一些 Patterns 的範例。

這是 SVG Patterns 的所具有的屬性：

- **patternUnits = "userSpaceOnUse | objectBoundingBox"**
- **patternContentUnits = "userSpaceOnUse | objectBoundingBox"**
- **patternTransform**
- **x**
- **y**
- **width**
- **height**
- **xlink:href**
- **preserveAspectRatio = "[defer] <align> [<meetOrSlice>]"**

現在就讓我們詳細的來看看這些屬性：

- **patternUnits = "userSpaceOnUse | objectBoundingBox"**

	patternUnits，這個屬性非常的奇怪，因為這個屬性有兩個參數可以選，而這兩個參數所對應後續的 width 和 height 是不同的，也因此非常容易混淆，如果將 patternUnits 設定為`userSpaceOnUse`，表示以使用者的座標為主，後面的 width 和 height 就是實際的寬和高，例如下面的範例，SVG 的寬高是 240x160，我們將 pattern 的寬高都設為 60，表示我們將在 240x160 的範圍內重複填滿 60x60 的 pattern ( 也就是圖中的藍色框框內的 )，同時我們也可以發現，不管我們的圖形放在哪，圖案都會以 SVG 的左上角 0,0 為基準點 ( 因為內容 pattern 的 rect 設為 0,0 )，可以看到綠色框的圓形，填滿的圖形和底下的圖形位置一模一樣。

	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_02.png)
	
	    <svg width="240" height="160">
	      <defs>
	        <pattern id="p" patternUnits="userSpaceOnUse" width="60" height="60">
	          <rect width="30" height="30" fill="#f99" x="0" y="0"></rect>
	        </pattern>
	      </defs>
	      <rect width="240" height="160" stroke="#aaa" fill="url(#p)" />
	      <circle cx="150" cy="80" r="50" stroke="#000" fill="url(#p)" />
	      <rect width="60" height="60" x="1" y="1" stroke="#00f" stroke-width="2" fill="url(#p)" />
	    </svg>

	如果還是不明白，跟下面這個範例對照一下，下面的範例我將 pattern 的尺寸改為 40x40，出來的圖案白色間距就會變窄了
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_03.png)
	
	    <svg width="240" height="160">
	      <defs>
	        <pattern id="p" patternUnits="userSpaceOnUse" width="40" height="40">
	          <rect width="30" height="30" fill="#f99" x="0" y="0"></rect>
	        </pattern>
	      </defs>
	      <rect width="240" height="160" stroke="#aaa" fill="url(#p)" />
	      <circle cx="150" cy="80" r="50" stroke="#0a0" stroke-width="2" fill="url(#p)" />
	      <rect width="40" height="40" x="1" y="1" stroke="#00f" stroke-width="2" fill="url(#p)" />
	    </svg>
	
	換句話說，如果我把 pattern 裏頭的 rect ，位置超過了 pattern 的範圍，就會發現 rect 會被裁切掉。
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_04.png)
	
	    <defs>
	      <pattern id="p" patternUnits="userSpaceOnUse" width="40" height="40">
	        <rect width="30" height="30" fill="#f99" x="30" y="0"></rect>
	      </pattern>
	    </defs>

	這就是我們將 patternUnits 設為`userSpaceOnUse`的效果呈現，至於`objectBoundingBox`是 patternUnits 的預設參數，也就是以我們畫出來的形狀為基準，這時候我們設定的 pattern 長寬，就**變成了「比例」，而不是數值！**這點非常非常非常的重要！因為是比例，如果我們寫 60，就會是畫出來圖形長或寬的六十倍！下面的範例，我們將 width 設為 1，height 也設為 1，就表示 pattern 的長寬等於畫出來的圖形長寬，由於內容只有一個 rect，也就只填滿了一個 rect 而已。
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_05.png)

	    <defs>
	      <pattern id="p" patternUnits="objectBoundingBox" width="1" height="1">
	        <rect width="30" height="30" fill="#f99" x="0" y="0"></rect>
	      </pattern>
	    </defs>
	    <circle cx="180" cy="80" r="50" stroke="#0a0" stroke-width="2" fill="url(#p)" />
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p)" />

	如果到這邊已經混亂了，可以跟下面這個範例比較，下面的範例將 width 設為 .4，height 設為 .4，換算成 100x100 的圖形，則是 40x40 的 pattern，畫出來的背景圖案就會是帶有 10 的寬度間距的重複圖案。
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_06.png)
	
	    <defs>
	      <pattern id="p" patternUnits="objectBoundingBox" width=".4" height=".4">
	        <rect width="30" height="30" fill="#f99" x="0" y="0"></rect>
	      </pattern>
	    </defs>
	    <circle cx="180" cy="80" r="50" stroke="#0a0" stroke-width="2" fill="url(#p)" />
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p)" />

	如果使用兩個不同的矩形套用，出來的結果也會不同：
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_07.png)

	    <defs>
	      <pattern id="p" patternUnits="objectBoundingBox" width=".4" height=".4">
	        <rect width="30" height="30" fill="#f99" x="0" y="0"></rect>
	      </pattern>
	    </defs><rect width="80" height="80" x="120" y="30" stroke="#000" stroke-width="2" fill="url(#p)" />
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p)" />

	所以啦，**設定為`userSpaceOnUse`代表是實際的寬度或高度數值 ( SVG 的 )，而設定為`objectBoundingBox`的則是比例，實際數值要乘上套用的圖案長寬**，要非常非常之注意喔！


- **patternContentUnits = "userSpaceOnUse | objectBoundingBox"**
 
	patternContentUnits 跟剛剛提到的 patternUnits 幾乎是異曲同工，只是這個屬性是用來定義 pattern 內容畫出來的圖形單位，同樣的，設定為`userSpaceOnUse`代表是實際的寬度或高度數值，設定為`objectBoundingBox`的則是比例，但是！又是非常重要的但是！但是**它的預設值為`userSpaceOnUse`**，整個擺明整人呀！

	下面的範例左邊是設定為`userSpaceOnUse`，右邊設定為`objectBoundingBox`，可以看到幾乎沒甚麼差別，因為左邊長寬直接指令了 20，而右邊的長寬則是 100x0.2=20，結果就變成一樣了。
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_08.png)

	    <defs>
	      <pattern id="p1" patternUnits="objectBoundingBox" width=".4" height=".4" patternContentUnits="userSpaceOnUse">
	        <rect width="20" height="20" fill="#069" x="0" y="0"></rect>
	      </pattern>
	      <pattern id="p2" patternUnits="objectBoundingBox" width=".4" height=".4" patternContentUnits="objectBoundingBox">
	        <rect width=".2" height=".2" fill="#069" x="0" y="0"></rect>
	      </pattern>
	    </defs>
	      
	    <rect width="100" height="100" x="120" y="30" stroke="#000" stroke-width="2" fill="url(#p1)" />
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p2)" />

- **patternTransform**

	讓我們可以直接對 pattern 下達 transform，範例中我們讓圖形旋轉 45 度，搭配剛剛提到的 patternUnits 和 patternContentUnits，就可以做出斜線的填滿。
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_09.png)

	    <defs>
	      <pattern id="p1" patternUnits="objectBoundingBox" width=".2" height=".4" patternTransform="rotate(45)">
	        <rect width="10" height="50" fill="#000" x="0" y="0"></rect>
	        <rect width="10" height="50" fill="#fa0" x="10" y="0"></rect>
	      </pattern>
	    </defs>
	      
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p1)" />

- **x,y,width,height**

	這四個屬性跟 patternUnits 設定為`userSpaceOnUse`或`objectBoundingBox`息息相關，反正只要記住，**設定為`userSpaceOnUse`就是標準長寬數值，而設定為`objectBoundingBox`就是比例**，千萬別忘記！

- **xlink:href**

	讓圖案可以引用其它元素的設定，也就是說我們可以先把 pattern 內容的圖案定義好，然後再用 pattern 引用，就可以做出不同的填滿效果，可以參考下面的範例：
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_10.png)

	    <defs>
	      <pattern id="r1">
	        <rect width="20" height="20" fill="#0c0" x="0" y="0"></rect>
	      </pattern>
	      <pattern id="p1" patternUnits="objectBoundingBox" width=".4" height=".4" xlink:href="#r1" />
	      <pattern id="p2" patternUnits="objectBoundingBox" width=".25" height=".25" xlink:href="#r1" />
	    </defs>
	
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p1)" />
	    <rect width="100" height="100" x="120" y="30" stroke="#000" stroke-width="2" fill="url(#p2)" />

- **preserveAspectRatio = "[defer] <align> [<meetOrSlice>]"**

	看到 preserveAspectRatio 這個屬性，就表示我們的 pattern 可以使用 viewbox，什麼是 viewbox 呢？請參考 [SVG 研究之路 (23) - 理解 viewport 與 viewbox](http://www.oxxostudio.tw/articles/201409/svg-23-viewpoint-viewBox.html) 有非常完整的教學，下面是範例，使用 viewbox 來控制圖案的長寬尺寸。
	
	![SVG 研究之路 (26) - 有趣的 Patterns](/img/articles/201409/20140928_1_11.png)

	    <defs>
	      <pattern id="p1" patternUnits="objectBoundingBox" width=".4" height=".4" viewbox="0,0,22,22">
	        <rect width="20" height="20" fill="#f80" x="0" y="0"></rect>
	      </pattern>
	      <pattern id="p2" patternUnits="objectBoundingBox" width=".4" height=".4" viewbox="0,0,40,40">
	        <rect width="20" height="20" fill="#f80" x="0" y="0"></rect>
	      </pattern>
	    </defs>
	      
	    <rect width="100" height="100" x="10" y="30" stroke="#000" stroke-width="2" fill="url(#p1)" />
	    <rect width="100" height="100" x="120" y="30" stroke="#000" stroke-width="2" fill="url(#p2)" />

以上就是完整的 SVG Patterns 的介紹，心動的話就趕快畫點圖案來填滿吧！喔哈！

<!-- @@close-->