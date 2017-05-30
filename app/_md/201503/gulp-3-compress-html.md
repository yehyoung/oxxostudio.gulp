# Gulp 學習 3 - 打包壓縮 HTML  

![](/img/articles/201503/gulp-3-compress-html.jpg#preview-img)

上一篇我們看完了打包與壓縮 CSS 和 JS，為什麼打包壓縮 HTML 不要一起講呢？是因為打包壓縮 HTML 還會用到額外的套件和方法，避免混淆，所以就分成兩篇來紀錄。

壓縮 HTML 與 CSS 和 JS 不同的地方，在於 CSS 和 JS 利用合併之後再混淆或壓縮，而 HTML 除了壓縮，更多了去置換內容的方式，例如我們有一個網頁，裡頭載入了三個 CSS 與三個 JS，壓縮之後就會變成只有一個 min.css 和一個 min.js，如此一來原本要載入六個檔案，瞬間就變成了只需要載入兩個檔案而已，也由於由六個 request 降為兩個 request，整個網頁的流暢度也會提升。( 就像傳送一千個小檔案，速度遠不如把一千個小檔案壓縮成一個大檔案，直接傳送大檔案還來得快 )

打包壓縮 HTML 我們會用到的套件有這些：gulp-html-replace、gulp-minify-html，gulp-html-replace 的作用，是把原本的三個 CSS 置換為一個 min.css，gulp-minify-html 就是純粹的壓縮 HTML，除此之外，我們也要把上一篇的壓縮 CSS 與 JS 所需要的套件一起拿來用，畢竟打包壓縮是要成為完整 ( 壓縮 HTML、CSS、JS )才是，所以首先就安裝吧！( mac 要加 sudo，相關套件參考：[gulp-html-replace](https://www.npmjs.com/package/gulp-html-replace)、[gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html) )

	npm install gulp gulp-html-replace gulp-minify-html gulp-minify-css gulp-uglify gulp-concat gulp-rename -save-dev

<br/>
目錄結構應該是長成這樣：

![Gulp 學習 3 - 打包壓縮 HTML](/img/articles/201503/20150307_1_02.jpg)

<br/>
安裝好了之後就來寫 gulpfile.js，一開始當然是先引入這些套件，引入的套件就這樣越來越多了。

	var gulp      = require('gulp'),
	  concat      = require('gulp-concat'),
	  minifyCSS   = require('gulp-minify-css'),
	  uglify      = require('gulp-uglify'),
	  rename      = require("gulp-rename"),
	  htmlreplace = require('gulp-html-replace'),
	  minifyHTML  = require('gulp-minify-html');

<br/>
上一篇的壓縮 CSS 和 JS 就先略過，直接看到壓縮 HTML 的部分，我們先來瞧瞧未壓縮的 HTML 長怎樣，基本上裡面會包含了一大串載入的 CSS 和 JS。

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Compress</title>
		<link rel="stylesheet" href="css/test1.css">
		<link rel="stylesheet" href="css/test2.css">
		<link rel="stylesheet" href="css/test3.css">
		<script src="js/test.js"></script>
	</head>
	<body>
		
	</body>
	</html>

<br/>
這時候我們要使用 gulp-html-replace，把這一大串載入的 CSS 和 JS 替換掉，換成我們壓縮過的 CSS 與 JS 檔案，置換的方法就是在 HTML 裏頭寫上一些特定的註解描述就可以，例如要把整段 css 替換掉，就用`<!-- build:css --><!-- endbuild -->` 把要替換掉的地方包起來。

	<!-- build:css -->
	<link rel="stylesheet" href="css/test1.css">
	<link rel="stylesheet" href="css/test2.css">
	<link rel="stylesheet" href="css/test3.css">
	<!-- endbuild -->
	<!-- build:js -->
	<script src="js/test.js"></script>
	<!-- endbuild -->

<br/>
包起來之後就要在 gulpfile.js 裏頭寫出要置換的內容，同時一併把 gulp-minify-html 給寫進去，畢竟置換完就要同時壓縮，才是一個完整的打包壓縮，下面的範例將 minifyHTML 的設定寫在外面，而 htmlreplace 表示要把剛剛 css 的部分換為 all.min.css，js 的部分換為 js/all.min.js。

	gulp.task('html-replace',function() {
	  var opts = {comments:false,spare:false,quotes:true};
	  return gulp.src('./app/*.html')
	    .pipe(htmlreplace({
	        'css': 'css/all.min.css',
	        'js': 'js/all.min.js'
	    }))  
	    .pipe(minifyHTML(opts))
	    .pipe(gulp.dest('./build/'));
	});

	gulp.task('default', ['html-replace','minify-css', 'uglify']);

<br/>
完成之後只要執行 gulp，就可以看到最後的成果：

![Gulp 學習 3 - 打包壓縮 HTML](/img/articles/201503/20150307_1_03.jpg)

這裡要補充一點上一篇沒有提到的，在上一篇的 minify-css 任務，必須要在 concat 任務完成之後才會進行，但要如何保證呢？因為在 gulp 裏頭，所有任務並不會按照順序，因此很有可能當我們執行 minify-css 的時候， concat 尚未完成，就會造成產生的程式碼有問題，所以，「**在每個 task 任務裏頭加上 return，接著把 minify-css 的任務寫成這樣：`gulp.task('minify-css', ['concat'], function(){})`**」，就可以保證 minify-css 會接在 concat 之後囉！最後完成的 gulpfile.js 如下：

	var gulp      = require('gulp'),
	  concat      = require('gulp-concat'),
	  minifyCSS   = require('gulp-minify-css'),
	  uglify      = require('gulp-uglify'),
	  rename      = require("gulp-rename"),
	  htmlreplace = require('gulp-html-replace'),
	  minifyHTML  = require('gulp-minify-html');
	
	gulp.task('concat', function() {
	  return gulp.src('./app/css/*.css')
	    .pipe(concat('all.css'))
	    .pipe(gulp.dest('./build/css/'));
	});
	
	gulp.task('minify-css', ['concat'], function() {
	  return gulp.src('./build/css/all.css')
	    .pipe(minifyCSS({
	      keepBreaks: true,
	    }))
	    .pipe(rename(function(path) {
	      path.basename += ".min";
	      path.extname = ".css";
	    }))
	    .pipe(gulp.dest('./build/css/'));
	});
	
	gulp.task('uglify', function() {
	  return gulp.src('./app/js/*.js')
	    .pipe(uglify())
	    .pipe(rename(function(path) {
	      path.basename += ".min";
	      path.extname = ".js";
	    }))
	    .pipe(gulp.dest('./build/js/'));
	});
	
	gulp.task('html-replace',function() {
	  var opts = {comments:false,spare:false,quotes:true};
	  return gulp.src('./app/*.html')
	    .pipe(htmlreplace({
	        'css': 'css/all.min.css',
	        'js': 'js/all.min.js'
	    }))  
	    .pipe(minifyHTML(opts))
	    .pipe(gulp.dest('./build/'));
	});
	
	gulp.task('default', ['html-replace','minify-css', 'uglify']);

<br/>
