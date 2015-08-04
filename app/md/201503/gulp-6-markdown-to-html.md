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

<meta property="article:published_time" content="2015-03-13T23:25:00+01:00">

<meta name="keywords" content="gulp,markdown,markdown to html,gulp-markdown">

<meta name="description" content="當我發現 Gulp 也有 markdown 轉換的套件之後，就決定可以自己來做一個轉換的環境，如此一來就不用受限於各個編輯器的樣式，也不用受限於 gitbook 只能轉電子書的樣貌，甚至可以搭配之前幾篇介紹過的壓縮打包、html extend...等，做出一個純粹用 markdown 編寫網頁的環境。">

<meta itemprop="name" content="Gulp 學習 6 - 架設 Markdown 轉 HTML 環境 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201503/20150313_1_01b.jpg">

<meta itemprop="description" content="當我發現 Gulp 也有 markdown 轉換的套件之後，就決定可以自己來做一個轉換的環境，如此一來就不用受限於各個編輯器的樣式，也不用受限於 gitbook 只能轉電子書的樣貌，甚至可以搭配之前幾篇介紹過的壓縮打包、html extend...等，做出一個純粹用 markdown 編寫網頁的環境。">

<meta property="og:title" content="Gulp 學習 6 - 架設 Markdown 轉 HTML 環境 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201503/gulp-6-markdown-to-html.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201503/20150313_1_01b.jpg">

<meta property="og:description" content="當我發現 Gulp 也有 markdown 轉換的套件之後，就決定可以自己來做一個轉換的環境，如此一來就不用受限於各個編輯器的樣式，也不用受限於 gitbook 只能轉電子書的樣貌，甚至可以搭配之前幾篇介紹過的壓縮打包、html extend...等，做出一個純粹用 markdown 編寫網頁的環境。">

<title>Gulp 學習 6 - 架設 Markdown 轉 HTML 環境 - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##Gulp 學習 6 - 架設 Markdown 轉 HTML 環境  <span class="article-date" tag="web">MAR 13, 2015</span>

<img src="/img/articles/201503/20150313_1_01.jpg" class="preview-img">

要談到 Markdown 轉 HTML，其實有一大堆的 Markdown 編輯器都做得到，我個人最愛用的不外乎就是 Markdown Pad ( 只有 windows )、Mou ( Mac ) 和 lightPaper ( Mac )，然而不管是怎樣的編輯器，基本上都會具備將 markdown 轉為 HTML 的功能，所以一直以來我都不覺得在編輯器撰寫之後在轉檔有什麼不方便的，我的 blog 文章也一直都是用 markdown 寫的，不過自從用 gitbook 寫書之後，赫然發現 gitbook 的 markdown 自動轉換 html 功能真是太優了，用自己慣用的編輯器，存檔之後，Gitbook 就自動將 markdown 轉換為 HTML，而且還套上 layout 和樣式，真是太讚啦！

於是，當我發現 Gulp 也有 markdown 轉換的套件之後，就決定可以自己來做一個轉換的環境，如此一來就不用受限於各個編輯器的樣式，也不用受限於 gitbook 只能轉電子書的樣貌，甚至可以搭配之前幾篇介紹過的壓縮打包、html extend...等，做出一個純粹用 markdown 編寫網頁的環境。

廢話說太多，開始今天的正題，我使用的套件是：gulp-markdown 這個套件 ( 參考：[gulp-markdown](https://www.npmjs.com/package/gulp-markdown) )，這個套件可以將 markdown 純粹轉為 HTML 的格式，但不包含一個網頁應該要有的 head 與 body，它就是一個純粹的 HTML tag 而已，舉例來說，我們來將下面這段 Markdown 進行轉換：

	#這是大標題
	##這是次標題
	我是內文，我是**粗體**
	
轉換出來就變成：

	<h1 id="-">這是大標題</h1>
	<h2 id="-">這是次標題</h2>
	<p>我是內文，我是<strong>粗體</strong></p>

<br/>
也因為不是一個完整的網頁，所以我們使用 gulp-webserver 來做 livereload ( 參考 [Gulp 學習 1 - 安裝與執行](http://www.oxxostudio.tw/articles/201503/gulp-install-webserver.html) ) 就會失效，所以變成要搭配 gulp-html-extend，結合一個 layout，組成一個完整的網頁，就可以使用  livereload 的功能囉！

所以這裡我們要輸入以下的指令安裝四個套件，分別是 gulp、gulp-webserver、gulp-html-extend、gulp-markdown ( mac 可能需要 sudo )：

	npm install gulp gulp-webserver gulp-html-extend gulp-markdown

<br/>
安裝之後就來寫 gulpfile.js，第一步當然是要引入這四個套件了。

	var gulp = require('gulp'),
	      md = require('gulp-markdown'),
	      extender = require('gulp-html-extend'),
	      webserver = require('gulp-webserver');
	      
<br/>
第二步就是要新增一些資料夾，資料結構如下，md 資料夾裏頭有一個 test.md，是我們要轉換的 markdown 檔案，轉換完之後會預先放在 md2html 的資料夾，接著會將裏頭的檔案和 layout 資料夾內的 master.html 合併，合併完就會放在 dist 的資料夾內。

	|____dist
	|____layout
	| |____master.html
	|____md
	| |____test.md
	| |____md2html

<br/>
資料目錄建立好之後，新增一個名為 md 的任務，裡頭就是負責進行 markdown 轉換 html 的作業，這裡面`./md/**/*.md`代表是 md 資料夾內所有的 md 檔案，也包含子資料夾內的都會抓到。

	gulp.task('md',function(){
	    return gulp.src('./md/**/*.md')
	        .pipe(md())
	        .pipe(gulp.dest('./md/md2html/'));
		});
		
<br/>
因為轉出來檔案要和 HTML 的 layout 做合併，所以我們必須要在我們要轉換的 markdown 檔案裡頭加上一些 html 的註解，轉換之後就會根據這些註解去做合併，下面這是我要用來轉換的 markdown 與 layout 的長相：

markdown：

	<!-- @ @master  = ../../layout/master.html-->
	<!-- @ @block  =  content-->
	
	#這是大標題
	##這是次標題
	我是內文，我是**粗體**
	
	測試 Markdown 轉 html
	
	<!-- @ @close-->

html layout：

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<link href="" rel="stylesheet">
		<title>markdown preview</title>
		<!-- @ @placeholder= head -->
	</head>
	<body>
		<!-- @ @placeholder= content -->
	</body>
	</html>

合併之後：

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<link href="" rel="stylesheet">
		<title>markdown preview</title>
	</head>
	<body>
		<h1 id="-">這是大標題</h1>
		<h2 id="-">這是次標題</h2>
		<p>我是內文，我是<strong>粗體</strong></p>
	</body>
	</html>
	
<br/>
接著就來建立 html 合併的任務，記得合併任務要在 md 任務完成之後再執行，可以參考上一篇所講的 [Gulp 學習 5 - 建立 HTML 模板](http://www.oxxostudio.tw/articles/201503/gulp-5-html-extend.html)。

	gulp.task('extend', ['md'], function () {
	    return gulp.src('./md/md2html/**/*.html')
	        .pipe(extender({annotations:true,verbose:false}))
	        .pipe(gulp.dest('./dist/'));
	});
	
<br/>
合併之後，就是啟動一個 webserver 來進行預覽的動作，此外也要順便建立 watch 的任務，這樣才能編輯完 markdown 檔案存檔之後，就可以自動更新預覽囉。

	gulp.task('watch',function(){
		gulp.watch('./md/**/*.md', ['extend']);
		});
	
	gulp.task('webserver', ['extend'],function() {
	  return gulp.src('./dist/')
	    .pipe(webserver({
	      port:1111,
	      livereload: true,
	      directoryListing: false,
	      open: true,
	      fallback: 'test.html'
	    }));
	});

	gulp.task('default',['watch','webserver']);
	
<br/>
任務都用好之後，就可以執行 gulp 看看，如此一來，其實我們已經建立了一個簡易的 markdown 自動轉 html 的環境，當然還有很多地方要設定，之後會再慢慢分享，上圖執行之後的資料夾顯示圖就像下面這樣：

![Gulp 學習 6 - 架設 Markdown 轉 HTML 環境](/img/articles/201503/20150313_1_02.jpg)

完整的 gulpfile.js：

	var gulp      = require('gulp'),
		  md        = require('gulp-markdown'),
		  extender  = require('gulp-html-extend'),
		  webserver = require('gulp-webserver');
	
	gulp.task('md',function(){
	    return gulp.src('./md/**/*.md')
	        .pipe(md())
	        .pipe(gulp.dest('./md/md2html/'));
		});
	
	gulp.task('extend', ['md'], function () {
	    return gulp.src('./md/md2html/**/*.html')
	        .pipe(extender({annotations:true,verbose:false}))
	        .pipe(gulp.dest('./dist/'));
	});
	
	gulp.task('watch',function(){
		gulp.watch('./md/**/*.md', ['extend']);
		});
	
	gulp.task('webserver', ['extend'],function() {
	  return gulp.src('./dist/')
	    .pipe(webserver({
	      port:1111,
	      livereload: true,
	      directoryListing: false,
	      open: true,
	      fallback: 'test.html'
	    }));
	});
	
	gulp.task('default',['watch','webserver']);

<br/>
相關連結：

>- [MarkdownPad](http://markdownpad.com/)
- [Mou](http://25.io/mou/)
- [lightPaper](http://www.ashokgelal.com/lightpaper-for-mac/)
- [Gitbook](https://www.gitbook.com/)	

<!-- @@close-->