# 用 LESS 寫 CSS ( 入門、Import、變數 ) 

猶記部落格創立之初，是用 SASS 這個基於 Ruby on rails 的 CSS 預處理器來撰寫 CSS ( 不過個人寫程式喜好還是傾向 SCSS )，當初還寫了一些跟 SASS 有關的文章，不過後來覺得實在太麻煩，要用 SASS 還必須要先裝 Ruby 還有一堆哩哩摳摳的環境問題，加上部落格已經完全改用 NodeJS 為基底的 gulp 來實作，貌似再安裝 SASS 又有點多此一舉了，所以就直接轉戰 LESS 這套以 JavaScript 為基底的預處理器 ( BootStrap 也是用 LESS )，除了可以用 gulp-less 來作轉換，更不需要安裝任何東西 ( 當然 NodeJS 還是得裝 )，就算你都不安裝，載一個 less.js 放在網頁裡面就可以直接撰寫 less 在網頁裡面跑，相當的方便好用，就這樣一寫就寫了半年以上，也算是有點心得，可以來寫幾篇 LESS 教學，順便記錄一下。

![就是要玩 LESS (1)](/img/articles/201601/20160104_1_02.jpg)

這篇並不是要描述 SASS 和 LESS 哪個好哪個壞，畢竟 CSS 就是 CSS，不管你用哪種預處理器來寫，最終都還是會變成 CSS，因此最重要的是 CSS 的撰寫觀念，所有的預處理器都只是輔助而已，CSS 寫得好，預處理器就是扮演如虎添翼的角色，以下就來認識一下 LESS 吧！

<br/>

## 安裝 LESS

要用 LESS 有幾個方法，第一個最簡單，就是去 LESS 的官方網站下載 less.js，放在你的網頁裡面，就可以直接撰寫副檔名為 .less 的檔案，less.js 會自動在網頁載入的時候將其編譯為 CSS ( 就像下面的例子就可以直接編譯 )，不過 less.js 就算是 min 的版本也要一百多 KB，我看還是乖乖轉換成 CSS 比較實在。( LESS 官網：[http://lesscss.org/](http://lesscss.org/) )

	<link rel="stylesheet/less" type="text/css" href="要轉換的檔案.less" />
	<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js"></script>

第二種方法就是用 NodeJS 的方式安裝，我自己比較喜歡用 gulp 來實作，先 npm install gulp 和 gulp-less ( 安裝方法請參考 [Gulp 學習 1 - 安裝與執行](http://www.oxxostudio.tw/articles/201503/gulp-install-webserver.html) )，gulp less 的使用方式很簡單，只要 require gulp less，然後在 pipe 裡面使用，就可以進行轉換，後面再加上一個 watch 的 task，幫助我們可以在存檔的當下就進行轉換動作。  
gulp-less：[https://www.npmjs.com/package/gulp-less](https://www.npmjs.com/package/gulp-less)

	var gulp = require('gulp'),
			less = require('gulp-less');

	gulp.task('less',function(){
		gulp.src('./style/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./style/css/'))
		});

	gulp.task('watch',function(){
		gulp.watch('./style/less/*.less',['less']);
		});

	gulp.task('default',['less','watch']);

<br/>

## 起手式

LESS 使用上也是巢狀的概念，下一層的就會自動轉換出來，不需要寫個好幾次，但其實像 SASS 和 LESS 這種巢狀結構往往也會造成一些不好的 CSS 結構，因為比較好的 CSS 最多不要超過三層，但在寫 LESS 巢狀往往寫得太爽就忽略了，這也是用 LESS 需要熟練的地方。

- LESS

		div{
			span{
				font-size:20px;
				b{
					color:red;
				}
			}
			i{
				font-size:12px;
			}
		}

- CSS

		div span{
			font-size:20px;
		}
		div span b{
			color:red;
		}
		div i{
			font-size:12px;
		}

<br/>

## ＆

`&`和 SASS 的用法差不多，就是可以直接繼承，如果像下面的例子，兩個`&&`則是會把一系列選擇器許出的標籤或樣式全部合併在一起。

- LESS

		.a{
			&:hover{
				color:red;
			}
		}
		.p, .a, .ul, .li {
		  border-top: 2px dotted #366;
		  && {
		    border-top: 0;
		  }
		  & + & {
		    border-top: 0;
		  }
		}

- CSS

		.a:hover{
			color:red;
		}
		.p, .a, .ul, .li {
		  border-top: 2px dotted #366;
		}
		.p.p, .p.a, .p.ul, .p.li,
		.a.p, .a.a, .a.ul, .a.li,
		.ul.p, .ul.a, .ul.ul, .ul.li,
		.li.p, .li.a, .li.ul, .li.li {
		  border-top: 0;
		}
		.p + .p, .p + .a, .p + .ul, .p + .li,
		.a + .p, .a + .a, .a + .ul, .a + .li,
		.ul + .p, .ul + .a, .ul + .ul, .ul + .li,
		.li + .p, .li + .a, .li + .ul, .li + .li {
		  border-top: 0;
		}

<br/>

## import

LESS 可以 import 別隻 less 的檔案，最後一起輸出成 CSS，在下面的例子就是把 tt.less 這隻檔案引入使用。

- LESS

		@import "tt.less";

- CSS

		.tt {
		  color: #fff;
		}

<br/>

## 變數

LESS 的變數使用「@」開頭 ( SASS 使用 $ 開頭 )，變數其實很方便，因為可以重複使用，可以將常用的變成變數的形式，可以省下很多時間。

- LESS

		@color-red: red;
		@color-blue: blue;
		@color-black: black;
		div{
			color:@color-red;
			span{
				color:@color-blue;
				&:hover{
					color:@color-black;
				}
			}
		}

- CSS

		div {
		  color: red;
		}
		div span {
		  color: blue;
		}
		div span:hover {
		  color: black;
		}

<br/>

## 覆蓋變數

雖然 LESS 具有變數機制，但如果我們在一段大括號內把這個變數覆蓋了 ( 賦予新值 )，在這個大括號內的所有變數都會被影響到，以下面的例子來說，原本`@color-red`應該是紅色，但是在`.text-blue`的大括號裏把它變成藍色，導致在`.text-blue`裡面所有用到`@color-red`的地方都變成藍色了。( 但在大括號外面的就影響不到了 )

- LESS

		@color-red: red;
		.text-blue{
			span{
				color:@color-red;
			}
			@color-red: blue;
			color:@color-red;
		}
		.text-red{
			color:@color-red;
		}

- CSS

		.text-blue {
		  color: blue;
		}
		.text-blue span {
		  color: blue;
		}
		.text-red {
		  color: red;
		}

<br/>

## 變數載入變數

會使用基本變數之後，變數也可以載入變數，看起來就像兩個 @@ 一樣 ( 因為 markdown 轉 html 把 @@ 消失了，要使用的時候把 @ @ 中間的空白移除 )。

- LESS

		@aa: "111";
		@bb:  "222";
		@var1:    "aa";
		@var2:    "bb";
		.div1::before{
			content: @ @var1; /*中間不用分開*/
		}
		.div1::after{
			content: @var1;
		}
		.div2::before{
			content: @ @var2; /*中間不用分開*/
		}
		.div2::after{
			content: @var2;
		}

- CSS

		.div1::before {
		  content: "111";
		}
		.div1::after {
		  content: "aa";
		}
		.div2::before {
		  content: "222";
		}
		.div2::after {
		  content: "bb";
		}

<br/>

## 變數字串結合

如果今天我們要把變數使用字串的香加上，例如「名稱」或「網址」上頭，就要使用`@{變數名}`，才會進行字串的相加，下面的例子我們建立了一個新的 class 名稱，還有統一網址的開頭。

- LESS

		@color-red: red;
		div.qq-@{color-red}{
			color:@color-red;
		}
		@url: "../";
		div{
			background-image:url("@{url}img/bg.png");
		}

- CSS

		div.qq-red {
		  color: red;
		}
		div {
		  background-image: url("../img/bg.png");
		}

<br/>

## @media

`@media`是在做 RWD 網頁必備的 CSS 技能，LESS 其實也有幫我們做了一些處理，如果我們`@media`是寫在巢狀結構裡面，轉出來的 CSS 會自動變成 and 的形式。

- LESS

		@media screen {
		  .selector {  
		    color: blue;
		  }
		  @media (min-width: 1023px) {
		    .selector {  
		      color: blue;
		    }
		  }
		}

- CSS

		@media screen {
		  .selector {
		    color: blue;
		  }
		}
		@media screen and (min-width: 1023px) {
		  .selector {
		    color: blue;
		  }
		}





