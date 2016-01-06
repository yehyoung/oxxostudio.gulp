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

<meta property="article:published_time" content="2016-01-05T23:50:00+01:00">

<meta name="keywords" content="css,less,gulp less,css 預處理器">

<meta name="description" content="上一篇介紹了 LESS 的基本用法、import 和變數，這一篇要來玩一點比較進階的：函式、 mixin 和 extend，當我們可以熟練mixin 和 extend 的用法，相信對於整個 CSS 可以有大幅加速的功能。">

<meta itemprop="name" content="用 LESS 寫 CSS ( Mixin、Extend ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201601/20160105_1_01b.jpg">

<meta itemprop="description" content="上一篇介紹了 LESS 的基本用法、import 和變數，這一篇要來玩一點比較進階的：mixin 和 extend，當我們可以熟練 mixin 和 extend 的用法，相信對於整個 CSS 可以有大幅加速的功能。">

<meta property="og:title" content="用 LESS 寫 CSS ( Mixin、Extend ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201601/css-less-02.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201601/20160105_1_01b.jpg">

<meta property="og:description" content="上一篇介紹了 LESS 的基本用法、import 和變數，這一篇要來玩一點比較進階的：mixin 和 extend，當我們可以熟練mixin 和 extend 的用法，相信對於整個 CSS 可以有大幅加速的功能。">

<title>用 LESS 寫 CSS ( Mixin、Extend ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

## 用 LESS 寫 CSS ( Mixin、Extend ) <span class="article-date" tag="css">JAN 5, 2016</span>

上一篇介紹了 LESS 的基本用法、import 和變數，這一篇要來玩一點比較進階的：mixin 和 extend，當我們可以熟練 mixin 和 extend 的用法，相信對於整個 CSS 可以有大幅加速的功能。

### mixin

有別於 SASS 的寫法，LESS 的 mixin 長相跟 class 一模一樣，就是用一個「.」開頭，裡面放入變數重複使用，雖然跟 class 一樣，但如果是帶有小括號，轉出來的 CSS 是不會出現的。

- LESS

		.fn1(@v){
			border-width:@v;
		}
		.box1{
			.fn1(10px);
		}

- CSS

		.box1 {
		  border-width: 10px;
		}

mixin 就是混合，不過其實也就是剛剛上面介紹函式的延伸，只要有「()」的基本上都會被判斷為函式，轉出的 CSS 裡面就不會有它出現，以下面的例子來說，`.m2()`轉成 CSS 就消失了，只剩下他裡面的樣式而已。

- LESS

		.m1{
			font-size:20px;
		}
		.m2(){
			font-size:30px;
		}
		#m1{
			.m1;
		}
		#m2{
			.m2();
		}
		#m3{
			.m1 !important;
			.m2() !important;
		}

- CSS

		.m1 {
		  font-size: 20px;
		}
		#m1 {
		  font-size: 20px;
		}
		#m2 {
		  font-size: 30px;
		}
		#m3 {
		  font-size: 20px !important;
		  font-size: 30px !important;
		}

<br/>

### mixin 的計算

我們可以針對要 mixin 的變數做加減乘除的計算，不過要記得「前後加空格」( 其實跟 calc 很像 )，不用在意單位的問題，你的變數如果帶的是 px 單位，轉出來就會是 px 為單位。

- LESS

		.fn2(@v){
			border-width:@v - 5;
		}
		.box2{
			.fn2(10px);
		}

- CSS

		.box2 {
		  border-width: 5px;
		}

<br/>

### 把 mixin 當作樣式 class 使用

剛剛提到長相跟 class 很像，其實我們在某些情形下可以當作「整包」class 來使用，以下面的例子，在`#b-mixin .b-mixin-1`裡面我們直接寫入`#b .b-1`，轉出來的 CSS 就會把`#b .b-1`的內容整包帶入`#b-mixin .b-mixin-1`裡頭，因此如果有定義樣式表，或是有要定義重複性高的樣式，就可以用這種方法來實作。

- LESS

		#b{
			.b-1{
				margin:20px;
				padding:20px;
				border:5px solid #000;
			}
			.b-2{
				margin:10px;
				padding:10px;
				border:none;
			}
		}
		#b-mixin .b-mixin-1{
			#b .b-1;
		}
		#b-mixin .b-mixin-2{
			#b .b-2;
		}

- CSS

		#b .b-1 {
		  margin: 20px;
		  padding: 20px;
		  border: 5px solid #000;
		}
		#b .b-2 {
		  margin: 10px;
		  padding: 10px;
		  border: none;
		}
		#b-mixin .b-mixin-1 {
		  margin: 20px;
		  padding: 20px;
		  border: 5px solid #000;
		}
		#b-mixin .b-mixin-2 {
		  margin: 10px;
		  padding: 10px;
		  border: none;
		}

<br/>

### 帶有參數的 mixin

我們可以在 mixin 裡面加入參數重複使用，而這些參數我們也可以定義預設值，當帶有預設值的參數遇到自訂的數值，就會以自訂的數值為主，不過如果自訂的數值沒有到參數的數量呢？這時候就可以使用「**@arguments**」這個特別的參數，「@arguments」就表示在沒有自定義數值的狀態下，自動採用我們的預設值。

這邊其實非常好用，特別是針對許多 CSS3 帶有前綴字的屬性 ( 像是 -webkit- 、 -moz- 之類的 )，基本上只需要定義一次，後面重複使用即可。

- LESS

		.mx(@mx1:red;@mx2:green;@mx3:blue){
			color:@mx1;
			background-color:@mx2;
			border-color:@mx3;
		}
		.mxx{
			.mx(@mx1:yellow);
		}

		.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
		  -webkit-box-shadow: @arguments;
		     -moz-box-shadow: @arguments;
		          box-shadow: @arguments;
		}
		.big-block1 {
		  .box-shadow(2px;2px;2px);
		}
		.big-block2 {
		  .box-shadow(2px;);
		}

		.average(@x, @y) {
		  @average: ((@x + @y) / 2);
		}
		.div-a {
		  .average(16px, 50px); 
		  padding: @average; 
		}

- CSS

		.mxx {
		  color: yellow;
		  background-color: green;
		  border-color: blue;
		}
		.big-block1 {
		  -webkit-box-shadow: 2px 2px 2px #000000;
		  -moz-box-shadow: 2px 2px 2px #000000;
		  box-shadow: 2px 2px 2px #000000;
		}
		.big-block2 {
		  -webkit-box-shadow: 2px 0 1px #000000;
		  -moz-box-shadow: 2px 0 1px #000000;
		  box-shadow: 2px 0 1px #000000;
		}
		.div-a {
		  padding: 33px;
		}

<br/>

### + 與 +_

`+`與`+_`也是負責合併使用，有使用`+`或`+_`的會和前一個使用的合併在一起，以下面的例子來說，陰影就會合併在同一個樣式裡，不會變成兩個，`+`轉換出來會有逗號，`+_`則是沒有逗號，用空白呈現。

- LESS

		.x1() {
		  box-shadow+: inset 0 0 10px #555;
		}
		.y1 {
		  .x1();
		  box-shadow+: 0 0 20px black;
		}
		.x2() {
		  box-shadow+_: inset 0 0 10px #555;
		}
		.y2 {
		  .x2();
		  box-shadow+_: 0 0 20px black;
		}

- CSS

		.y1 {
		  box-shadow: inset 0 0 10px #555, 0 0 20px black;
		}
		.y2 {
		  box-shadow: inset 0 0 10px #555 0 0 20px black;
		}

<br/>

### extend

extend 顧名思義就是「延伸、延展」，如果我們要重複引用的 class 裡面又有子元素該怎麼辦呢？這裏就可以使用`:extend`，它會把重複的樣式獨立出來，如果要進一步跟子元素有關聯，就可以使用`all`，就會聯同子元素的樣式一起轉換進去。

- LESS

		.a1:extend(.b){
			color:#f00;
		}
		.a2:extend(.b all){
		}
		.b{
			border:1px solid;
			font-size:20px;
		}
		.b.c{
			text-align:20px;
		}

- CSS

		.a1 {
		  color: #f00;
		}
		.b, .a1, .a2 {
		  border: 1px solid;
		  font-size: 20px;
		}
		.b.c, .a2.c {
		  text-align: 20px;
		}

<br/>

<!-- @@close-->




