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

<meta property="article:published_time" content="2014-10-30T22:55:00+01:00">

<meta name="keywords" content="svg,d3,d3.js,視覺化數據,視覺化資料">

<meta name="description" content="D3.js 是一個用動態視覺化顯示資料的 js library，透過使用 HTML DOM、SVG 在網頁上顯示資料，在接觸 SVG 的時候不斷的接觸到 D3.js 的資訊，原本想說要先來玩玩 snap.svg 的，但由於大家都在談 D3，於是就也踏上這條不歸路。">

<meta itemprop="name" content="SVG D3.js - 初體驗 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201410/20141030_1_01.jpg">

<meta itemprop="description" content="D3.js 是一個用動態視覺化顯示資料的 js library，透過使用 HTML DOM、SVG 在網頁上顯示資料，在接觸 SVG 的時候不斷的接觸到 D3.js 的資訊，原本想說要先來玩玩 snap.svg 的，但由於大家都在談 D3，於是就也踏上這條不歸路。">

<meta property="og:title" content="SVG D3.js - 初體驗 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201410/svg-d3-js.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201410/20141030_1_01.jpg">

<meta property="og:description" content="D3.js 是一個用動態視覺化顯示資料的 js library，透過使用 HTML DOM、SVG 在網頁上顯示資料，在接觸 SVG 的時候不斷的接觸到 D3.js 的資訊，原本想說要先來玩玩 snap.svg 的，但由於大家都在談 D3，於是就也踏上這條不歸路。">

<title>SVG D3 - D3.js 初體驗  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG D3 - D3.js 初體驗  <span class="article-date" tag="web"><i></i>OCT 30, 2014</span>

D3.js 是一個用動態視覺化顯示資料的 js library，透過使用 HTML DOM、SVG 在網頁上顯示資料，在接觸 SVG 的時候不斷的接觸到 D3 的資訊，原本想說要先來玩玩 snap.svg 的，但由於大家都在談 D3，於是就也踏上這條不歸路，因為 D3 主要的應用會以 SVG 來表現，趁著之前 SVG 31 天教學的文章剛寫完，對 SVG 印象猶新之際，打鐵趁熱學學 D3。

既然下定決心要學了，就要先來了解一下 D3 的故事起源：

D3 是一個縮寫，全名叫作 Data-Driven Documents（ 資料驅動的文件 ），在 2005 年的時候，Jeffrey Heer、Stuart Card 和 James Landay 推出 prefuse，透過 JAVA 在瀏覽器中視覺化呈現資料，當時算是一個相當突破的應用，也開啟了在 web 裏頭視覺化操作數據的時代。

兩年後 Jeff Heer 又推出了 Flare，也是透過瀏覽器來呈現視覺化資料，到了 2009 年，Jeff Heer 說服一位剛畢業的學生Mike Bostock，共同開發 Protovis，Protovis 是一個只依賴原生的瀏覽器，利用 JavaScript 的視覺化檢視包，這時候已經慢慢看出 D3 的樣子，直到 2011 年，Mike Bostock、Vadim Ogievetsky 和 Jeff Heer 正式推出 D3，作為下一代 Web 視覺化檢視，與 Protovis 不同的是，D3 可以直接操作網頁文檔，展示視覺效果的可能性也更多。

一直到今天，Mike Bostocks 都致力於 D3 的開發和維護， 他的網站 ( [http://bost.ocks.org/](http://bost.ocks.org/) ) 以及 github（ [HTTPs://github.com/mbostock/d3](HTTPs://github.com/mbostock/d3) ）也都是 D3 開發者必須要朝聖的地方。

![SVG D3 - D3.js 初體驗](/img/articles/201410/20141030_1_02.jpg)


故事講完了，來談點正經的吧！要使用 D3，第一步就是要先上 D3 的官網：[http://d3js.org/](http://d3js.org/)，官網的 banner 就是一大堆六角形的圖片，別懷疑，這些全都是 D3 可以做出來的範例。

![SVG D3 - D3.js 初體驗](/img/articles/201410/20141030_1_03.jpg)

點選上方的 example ( [https://github.com/mbostock/d3/wiki/Gallery](https://github.com/mbostock/d3/wiki/Gallery) )，就可以連到 D3 的 github，同時也可以看到滿滿的範例等著使用。

![SVG D3 - D3.js 初體驗](/img/articles/201410/20141030_1_04.jpg)

隨便打開一個範例，感覺都是要寫很久的 code 才寫得出來的...( 例如：[http://www.brightpointinc.com/interactive/political_influence/index.html?source=d3js](http://www.brightpointinc.com/interactive/political_influence/index.html?source=d3js) )

![SVG D3 - D3.js 初體驗](/img/articles/201410/20141030_1_05.jpg)

實際上用了幾天，我自己的感覺就像是 jQuery 一樣的好用，不過某種程度又更方便了些，不過畢竟是是初體驗，沒有辦法有太多深入的用法介紹，待我來慢慢使用紀錄一下吧！

<!-- @@close-->

