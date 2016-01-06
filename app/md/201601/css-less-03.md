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

<meta property="article:published_time" content="2016-01-06T22:50:00+01:00">

<meta name="keywords" content="css,less,gulp less,css 預處理器">

<meta name="description" content="經過前兩篇的洗禮，應該可以直接用 LESS 來撰寫整個網站的 CSS 了，不過如果要針對大型的專案，在樣式的規劃上可能就要用到更進階的設定，第三篇的 LESS 文章將會介紹一些進階的功能。">

<meta itemprop="name" content="用 LESS 寫 CSS ( 判斷式、迴圈、Function ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201601/20160106_1_01b.jpg">

<meta itemprop="description" content="經過前兩篇的洗禮，應該可以直接用 LESS 來撰寫整個網站的 CSS 了，不過如果要針對大型的專案，在樣式的規劃上可能就要用到更進階的設定，第三篇的 LESS 文章將會介紹一些進階的功能。">

<meta property="og:title" content="用 LESS 寫 CSS ( 判斷式、迴圈、Function ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201601/css-less-03.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201601/20160106_1_01b.jpg">

<meta property="og:description" content="經過前兩篇的洗禮，應該可以直接用 LESS 來撰寫整個網站的 CSS 了，不過如果要針對大型的專案，在樣式的規劃上可能就要用到更進階的設定，第三篇的 LESS 文章將會介紹一些進階的功能。">

<title>用 LESS 寫 CSS ( 判斷式、迴圈、Function ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

## 用 LESS 寫 CSS ( 判斷式、迴圈、Function ) <span class="article-date" tag="css">JAN 6, 2016</span>

經過前兩篇的洗禮，應該可以直接用 LESS 來撰寫整個網站的 CSS 了，不過如果要針對大型的專案，在樣式的規劃上可能就要用到更進階的設定，第三篇的 LESS 文章將會介紹一些進階的功能，總而言之，其實 LESS 和 SASS 的功能都大同小異，我自己也是寫過 SASS 又轉戰 LESS，不過 LESS 真是滿簡便好用的，提供給大家參考。

### 判斷式

LESS 的判斷式使用`if`和`when`，如果有多個判斷就要寫多個判斷式，以下面的例子來說，第一段表示如果變數大於 0，就顯示變數數值，第二個判斷式就是小於等於 0 的話就顯示`border:30px;`。

- LESS

		.if (@aif) when (@aif > 0) { 
			border:@aif;
		}
		.if (@aif) when (default()) {
			border:30px;
		} 
		.ifmixin1{
			.if(-20px);
		}
		.ifmixin1{
			.if(20px);
		}

- CSS

		.ifmixin1 {
		  border: 30px;
		}
		.ifmixin1 {
		  border: 20px;
		}

<br/>

### 迴圈

迴圈就是我們常見的 for 迴圈，不過在 LESS 裡型態比較不同，是用`when`來表現，最外層的`when`是針對這個迴圈下一個停止點，以下面的例子來說就是`@counter > 0`，而每進行一次迴圈`@counter`就會少 1 直到 0 為止，然後迴圈跑出來的內容就是跟著後面表現。

- LESS

		.loop(@counter) when (@counter > 0) {
		  .loop((@counter - 1));    
		  width: (10px * @counter); 
		}
		.loopdiv {
		  .loop(5);
		}
		.loop2(@counter) when (@counter > 0) {
		  .loop2((@counter - 1));   
		  .loop-@{counter}-div{ 
		  	width: (10px * @counter); 
		  }
		}
		.loop2(5);

- CSS

		.loopdiv {
		  width: 10px;
		  width: 20px;
		  width: 30px;
		  width: 40px;
		  width: 50px;
		}
		.loop-1-div {
		  width: 10px;
		}
		.loop-2-div {
		  width: 20px;
		}
		.loop-3-div {
		  width: 30px;
		}
		.loop-4-div {
		  width: 40px;
		}
		.loop-5-div {
		  width: 50px;
		}

<br/>

### function - 獲取圖片尺寸

透過`image-width`、`image-height`和`image-size`，我們可以直接獲取圖片的長寬尺寸

- LESS

		.img1{
			width:image-width("../img/less-logo.png");
			height:image-height("../img/less-logo.png");
			margin:image-size("../img/less-logo.png");
		}

- CSS

		.img1 {
		  width: 199px;
		  height: 81px;
		  margin: 199px 81px;
		}

<br/>

### function - 單位轉換

其實我也不知道為什麼要有單位轉換的功能，可能還是會擔心有些人分不清楚各種單位吧，單位轉換只要使用`convert`就可以，可以轉換的長度單位有：m、cm、mm、in、pt、和 pc，時間單位有：s 和 ms，角度單位有：rad、deg、grad 和 turn。

- LESS

		.img2{
			width:convert(9s, "ms");
			height:convert(14cm, mm);
			margin:convert(8, mm);
		}

- CSS

		.img2 {
		  width: 9000ms;
		  height: 140mm;
		  margin: 8;
		}

<br/>

### function - 陣列

如果要共用的變數有很多又不想一個個寫，我們可以用一個陣列來表示，不過和一般陣列第一個順序是 0 不同，LESS 的陣列是從 1 開始的。

- LESS

		@list: red, blue, green, yellow;
		.list{
			color:extract(@list, 1);
			border-color:extract(@list, 2);
			background-volor:extract(@list, 3);
		}

- CSS

		.list {
		  color: red;
		  border-color: blue;
		  background-volor: green;
		}

<br/>

### function - 數學計算

這裏我們可以用一些數學式來計算，不過也不是很實用，畢竟真正需要運算，都會用 JS 或其他方式來代替才比較正統一點 ( 因為通常會用到計算都是動態計算，CSS 除了百分比和 calc 之外，基本上都只能算是靜態的數值而已 )。

- LESS

		.math{
			width:sqrt(25cm);
			width:abs(-18.6%);
			width:sin(1deg);
			width:pow(25, -2);
			width:max(5, 10);
			width:min(5, 10);
			width:percentage(0.5);
			width:round(1.67);
			width:round(1.67, 1);
		}

- CSS

		.math {
		  width: 5cm;
		  width: 18.6%;
		  width: 0.01745241;
		  width: 0.0016;
		  width: 10;
		  width: 5;
		  width: 50%;
		  width: 2;
		  width: 1.7;
		}

<br/>

### function - 色彩轉換

這是在設計大型專案上一定要會使用的，舉例來說，今天如果設定了一組標準色，在沒有 class 或 id 的輔助下，如果需要一次修改所有的顏色 ( 例如老闆說：請幫我把所有的某某字從藍色換成紅色 )，大概就會瘋掉了，但是 LESS 就是要來解決這個麻煩事，我們可以定義好幾組顏色，然後重複使用，如此一來當遇到要修改，只要改一次顏色即可。

- LESS

		/* 色彩轉換 */
		.color{
			color:rgb(90, 23, 148);
		}

		/* 顏色調整-飽和度 */
		.color-saturate{
			color:saturate(#cc8888, 10%);
			color:saturate(#cc8888, -10%);
		}

		/* 顏色調整-不飽和度 */
		.color-desaturate{
			color:desaturate(#cc8888, 10%);
			color:desaturate(#cc8888, -10%);
		}

		/* 顏色調整-變亮 */
		.color-lighten{
			color:lighten(#cc8888, 10%);
			color:lighten(#cc8888, -10%);
		}

		/* 顏色調整-變暗 */
		.color-darken{
			color:darken(#cc8888, 10%);
			color:darken(#cc8888, -10%);
		}

		/* 顏色調整-灰階 */
		.color-darken{
			color:greyscale(#cc8888);
		}

		/* 顏色混合 */
		.color-mix{
			color:mix(#f00, #00f, 50%);
			color:mix(#f00, #00f, 20%);
			color:mix(#f00, #00f, 80%);
		}

- CSS

		/* 色彩轉換 */
		.color {
		  color: #5a1794;
		}

		/* 顏色調整-飽和度 */
		.color-saturate {
		  color: #d58080;
		  color: #c49191;
		}

		/* 顏色調整-不飽和度 */
		.color-desaturate {
		  color: #c49191;
		  color: #d58080;
		}

		/* 顏色調整-變亮 */
		.color-lighten {
		  color: #dbacac;
		  color: #bd6464;
		}

		/* 顏色調整-變暗 */
		.color-darken {
		  color: #bd6464;
		  color: #dbacac;
		}

		/* 顏色調整-灰階 */
		.color-darken {
		  color: #aaaaaa;
		}

		/* 顏色混合 */
		.color-mix {
		  color: #800080;
		  color: #3300cc;
		  color: #cc0033;
		}

<!-- @@close-->




