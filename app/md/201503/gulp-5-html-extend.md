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

<meta property="article:published_time" content="2015-03-09T23:35:00+01:00">

<meta name="keywords" content="gulp,html extend,gulp-html-extend,layout,master">

<meta name="description" content="這裡我們要用到的是 gulp-html-extend 這個套件，gulp-html-extend 會把某些特定註解內的內容置換為我們想要的內容，但與 gulp-html-replace 不同的地方，gulp-html-replace 要置換的內容寫在 gulpfile.js 裏頭，而 gulp-html-extend 則是將外部的 HTML 內容嵌入註解的區域。">

<meta itemprop="name" content="Gulp 學習 5 - 建立 HTML 模板 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201503/20150309_1_01b.jpg">

<meta itemprop="description" content="這裡我們要用到的是 gulp-html-extend 這個套件，gulp-html-extend 會把某些特定註解內的內容置換為我們想要的內容，但與 gulp-html-replace 不同的地方，gulp-html-replace 要置換的內容寫在 gulpfile.js 裏頭，而 gulp-html-extend 則是將外部的 HTML 內容嵌入註解的區域。">

<meta property="og:title" content="Gulp 學習 5 - 建立 HTML 模板 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201503/gulp-5-html-extend.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201503/20150309_1_01b.jpg">

<meta property="og:description" content="這裡我們要用到的是 gulp-html-extend 這個套件，gulp-html-extend 會把某些特定註解內的內容置換為我們想要的內容，但與 gulp-html-replace 不同的地方，gulp-html-replace 要置換的內容寫在 gulpfile.js 裏頭，而 gulp-html-extend 則是將外部的 HTML 內容嵌入註解的區域。">

<title>Gulp 學習 5 - 建立 HTML 模板 - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##Gulp 學習 5 - 建立 HTML 模板  <span class="article-date" tag="web"><i></i>MAR 9, 2015</span>

這個部落格經營了快一年，都是利用 fire.app 替我建置「純靜態」的 blog，換句話說，其實我只是撰寫內容，然後藉由 fire.app 幫我把內容和 layout 合併在一起，如果有興趣的人可以直接購買 [fire.app](http://fireapp.kkbox.com/doc/tw/index.html) 下來使用即可。不過這一篇並不是要介紹 fire.app，而是要利用 gulp，建立 HTML 的模板，同樣也是將 layout 和 content 分開，然後在預覽與上線的時候再合併。

這裡我們要用到的是 gulp-html-extend 這個套件 ( 參考 [gulp-html-extend](https://www.npmjs.com/package/gulp-html-extend) )，和之前介紹過的 gulp-html-replace 類似，gulp-html-extend 會把某些特定註解內的內容置換為我們想要的內容，但與 gulp-html-replace 不同的地方，在於 gulp-html-replace 要置換的內容寫在 gulpfile.js 裏頭，而 gulp-html-extend 則是將外部的 HTML 內容嵌入註解的區域。

以下面的例子來說，首先我們建立一個 layout.html 的樣版，裡頭是要共用的內容，在裡面可以看到有兩個註解，分別是 title 和 content，這就是我們要合併的部分。

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<!-- @@placeholder= title -->
		
	</head>
	<body>
		<!-- @@placeholder= content -->
		<footer>
		    footer
		</footer>
	</body>
	</html>

<br/>
接著看到要和 layout.html 合併的頁面，分別是 index.html 和 index2.html，裏頭用註解區塊很清楚的標示哪裡是 title ，哪裡是 content，屆時合併之後，index.html 和 index2.html 就會具備相同的 layout了。

未合併的 index.html

	<!-- @@master  = ../layout.html-->
	
	<!-- @@block  =  title-->
	<title>index</title>
	<!-- @@close-->

	<!-- @@block  =  content-->
	<main>
	    我是 index
	</main>
	<!-- @@close-->

未合併的 index2.html

	<!-- @@master  = ../layout.html-->
	
	<!-- @@block  =  title-->
	<title>index2</title>
	<!-- @@close-->

	<!-- @@block  =  content-->
	<main>
	    我是 index2
	</main>
	<!-- @@close-->

<br/>
合併之後就會變成這樣：

合併的 index.html

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>index</title>	
	</head>
	<body>
	
	<main>
	    我是 index
	</main>
	<footer>
	    footer
	</footer>
	</body>
	</html>

合併的 index2.html

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>index2</title>	
	</head>
	<body>
	
	<main>
	    我是 index2
	</main>
	<footer>
	    footer
	</footer>
	</body>
	</html>

<br/>
看完 html 是如何進行合併，再來就是 gulpfile.js 要怎麼寫呢？一開始同樣是要引入套件，然後建立名為 extend 的任務，src 設定目標資料夾內的 html 檔案，然後設定 ( verbose 設定為 false 就可以在合併之後把註解移除 )

	var gulp      = require('gulp'),
		extender    = require('gulp-html-extend');
	
	gulp.task('extend', function () {
	    gulp.src('./app/dist/*.html')
	        .pipe(extender({annotations:false,verbose:false})) // default options 
	        .pipe(gulp.dest('./app/preview/'));
	});
	
	gulp.task('default',['extend']);

<br/>
以上就是利用 Gulp 建立 HTML 模板的方法，下圖是整個 HTML 的資料夾結構。

![Gulp 學習 5 - 建立 HTML 模板](/img/articles/201503/20150309_1_02.jpg)

<!-- @@close-->