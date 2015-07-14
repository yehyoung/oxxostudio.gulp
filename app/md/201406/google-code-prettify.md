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

<meta property="article:published_time" content="2014-06-04T23:00:00+01:00">

<meta name="keywords" content="Google Code Prettify,Code Prettify,程式碼美化,程式碼上色">

<meta name="description" content="這是一套由 Google 出品的程式碼美化工具，主要用來美化分享在網站上的程式碼，Google Code Prettify 產生出來的美化效果也相當不錯，在此推薦給大家使用！">

<meta itemprop="name" content="Google Code Prettify - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201406/20140604_2_01.jpg">

<meta itemprop="description" content="這是一套由 Google 出品的程式碼美化工具，主要用來美化分享在網站上的程式碼，Google Code Prettify 產生出來的美化效果也相當不錯，在此推薦給大家使用！">

<meta property="og:title" content="Google Code Prettify - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201406/google-code-prettify.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201406/20140604_2_01.jpg">

<meta property="og:description" content="這是一套由 Google 出品的程式碼美化工具，主要用來美化分享在網站上的程式碼，Google Code Prettify 產生出來的美化效果也相當不錯，在此推薦給大家使用！">

<title>google code prettify - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##google code prettify <span class="article-date" tag="web"><i></i>JUN 4, 2014</span>

這是一套由 google 出品的程式碼美化工具，主要用來美化分享在網站上的程式碼，通常我們的程式碼會使用`pre`的標籤包覆，但內容的樣式卻是非常的死板，若自己進行樣式的編輯，而要使用各種不同的顏色來滿足各種不同的代碼，這項工程更比登天還難，這時候就很需要程式碼美化的工具。

自己曾經使用過一套名為 SyntaxHighlighter 的程式碼美化工具，不過後來使用過 google code prettify，整體而言比 SyntaxHighlighter 更為輕薄短小便利，產生出來的美化效果也相當不錯，在此推薦給大家使用！使用與安裝的方式如下：

- **下載 google code prettify**  
	由這裡下載 [https://code.google.com/p/google-code-prettify/](https://code.google.com/p/google-code-prettify/)

- **載入`run_prettify.js`**  
	把 js 放入你需要美化程式碼的頁面當中

		<script src="js/lrun_prettify.js"></script>

- **添加樣式**  
	接著別忘記在`pre`的標籤，加上`prettyprint`的樣式，一切就大功告成囉！

		<pre class="prettyprint">

- **置換樣式**  
	我個人偏好一套名為 tomorrow 的樣式，可以從這裡下載：[http://jmblog.github.io/color-themes-for-google-code-prettify/tomorrow/](http://jmblog.github.io/color-themes-for-google-code-prettify/tomorrow/)

如此一來就能夠輕鬆做出美美的程式碼囉！  

美化過的 HTML 範例：

	<!doctype html>
	<html lang="en">
	<head>
	  <meta charset="utf-8">
	  <title></title>
	  <link rel="stylesheet" href="css/style.css">
	</head>
	<body>
	  <header></header>
	  <div role="main"></div>
	  <footer></footer>
	  <script src="js/script.js"></script>
	</body>
	</html>

<br/>

<!-- @@close-->