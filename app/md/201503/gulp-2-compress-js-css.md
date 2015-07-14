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

<meta property="article:published_time" content="2015-03-06T23:35:00+01:00">

<meta name="keywords" content="gulp,gulp-minift-css,gulp-uglify,gulp-concat,打包,壓縮">

<meta name="description" content="在上線版本裡頭，就會使用到打包和壓縮過的 JS 或 CSS，這類型的 JS 或 CSS 會在檔案名稱加個「.min」進行區隔，而一個打包壓縮過的 JS 和 CSS，基本上可能是好幾個檔案組合在一起，利用 Gulp 的套件，非常簡單的就可以做到打包壓縮的動作，甚至還可以自動重新命名檔案，一氣呵成。">

<meta itemprop="name" content="Gulp 學習 2 - 打包壓縮 CSS 與 JS - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201503/20150306_1_01b.jpg">

<meta itemprop="description" content="在上線版本裡頭，就會使用到打包和壓縮過的 JS 或 CSS，這類型的 JS 或 CSS 會在檔案名稱加個「.min」進行區隔，而一個打包壓縮過的 JS 和 CSS，基本上可能是好幾個檔案組合在一起，利用 Gulp 的套件，非常簡單的就可以做到打包壓縮的動作，甚至還可以自動重新命名檔案，一氣呵成。">

<meta property="og:title" content="Gulp 學習 2 - 打包壓縮 CSS 與 JS - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201503/gulp-2-compress-js-css.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201503/20150306_1_01b.jpg">

<meta property="og:description" content="在上線版本裡頭，就會使用到打包和壓縮過的 JS 或 CSS，這類型的 JS 或 CSS 會在檔案名稱加個「.min」進行區隔，而一個打包壓縮過的 JS 和 CSS，基本上可能是好幾個檔案組合在一起，利用 Gulp 的套件，非常簡單的就可以做到打包壓縮的動作，甚至還可以自動重新命名檔案，一氣呵成。">

<title>Gulp 學習筆記 2 - 打包壓縮 CSS 與 JS - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##Gulp 學習筆記 2 - 打包壓縮 CSS 與 JS  <span class="article-date" tag="web"><i></i>MAR 6, 2015</span>

通常我們在寫網頁的時候，都會引入許多的 JS 和 CSS，而每引入一個也就會產生一個 request，當引入的越來越多，在效能和時間的等待上也就相對付出的越來越多，雖然在對於現在的網路速度和瀏覽器效能而言，看似問題都不大，但是對於一個流量超大的網站來說，一個使用者多了一個 request，在效能的處理上就相對重要許多，因此，在做網頁的時候，往往至少會分成兩個階段，一個階段是「開發時期」的版本，一個階段是「發佈上線」的版本，最主要就是會把「開發」和「上線」分開，如此一來才不會一時疏忽把還沒開發好的版本給對外公開了。

在上線版本裡頭，就會使用到打包和壓縮過的 JS 或 CSS，這類型的 JS 或 CSS 會在檔案名稱加個「.min」進行區隔，而一個打包壓縮過的 JS 和 CSS，基本上可能是好幾個檔案組合在一起，過去我會利用 Yahoo 或 Google 提供的壓縮程式來處理，但許多步驟仍然要手工處理，但學習了 Gulp 之後，利用 Gulp 的套件，非常簡單的就可以做到打包壓縮的動作，甚至還可以自動重新命名檔案，一氣呵成，這篇主要會介紹如何打包壓縮的做法。

如同上一篇描述的，我們要先用`npm init`將專案初始化 ( 參考前一篇 )，接著輸入以下指令，安裝 gulp、gulp-minify-css、gulp-uglify、gulp-concat、gulp-rename 這五個 Node Module。( Mac 可能要加 sudo )

npm install gulp gulp-minify-css gulp-uglify gulp-concat gulp-rename -save-dev

安裝完成之後，先來建立一下我們檔案的目錄，首先新增一個 app 的資料夾，裡頭再放入一個 CSS 與 JS 的資料夾，分別在這些資料夾內新增一些 CSS 與 JS 檔案，接著在與 app 資料夾的同一層，新增 build 的資料夾，作為最後完成發佈使用，完成後的目錄應該長成這樣：

![Gulp 學習筆記 2 - 打包壓縮 CSS 與 JS](/img/articles/201503/20150306_1_02.jpg)

好了，模擬一個簡單的專案目錄之後，先解釋一下剛剛安裝的這幾個套件是在幹嘛用的：

- gulp-concat：合併檔案
- gulp-minify-css：壓縮 CSS
- gulp-uglify：混淆並壓縮 JS
- gulp-rename：重新命名檔案

大概明白之後，就要來撰寫 gulpfile.js 了，首先第一個步驟，就是要引入這些套件：

	var gulp       = require('gulp'),
	    concat     = require('gulp-concat'),
	    minifyCSS  = require('gulp-minify-css'),
	    uglify     = require('gulp-uglify'),
	    rename     = require("gulp-rename");

<br/>
然後因為我新增了三個 css 檔案，所以我要先把這三個合併起來，才進行壓縮，合併採用的套件為：gulp-concat，它可以把目標資料夾內所有指定的檔案合併成為 all.css，然後放到 build 的資料夾內。( 可以參考 [gulp-concat](https://www.npmjs.com/package/gulp-concat) )

	gulp.task('concat', function() {
	    return gulp.src('./app/css/*.css')
	        .pipe(concat('all.css'))
	        .pipe(gulp.dest('./build/css/'));
	});

<br/>
再來我們壓縮 CSS，這裡要用到的是 gulp-minify-css 和 gulp-rename，下面的寫法是建立一個名為 minify-css 的任務，裡頭先使用 minifyCSS 壓縮，壓縮之後直接用 rename 對壓縮的檔案重新命名，命名時可以設定 basename 與 extname，完成後就把壓縮好的檔案，同樣放在 build 的資料夾裡頭。( 可以參考 [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) 和 [gulp-rename](https://www.npmjs.com/package/gulp-rename) )

	gulp.task('minify-css',['concat'], function() {
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

<br/>
第三步使用 uglify 混淆與壓縮 javascript，用法和 minifyCSS 幾乎相同。( 可以參考：[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) )

	gulp.task('uglify', function() {
	    return gulp.src('./app/js/*.js')
	        .pipe(uglify())
	        .pipe(rename(function(path) {
	            path.basename += ".min";
	            path.extname = ".js";
	        }))
	        .pipe(gulp.dest('./build/js/'));
	});

<br/>
到這邊幾乎已經完成囉，最後只要寫上 default 的任務就可以執行 gulp 看看。

	gulp.task('default',['minify-css','uglify']);

<br/>
執行 gulp 後，就會發現我們的檔案，已經被壓縮好並且重新命名，放在指定的位置了，這就是最基本的打包壓縮 CSS 與 JS 的 Gulp 用法。( 執行 gulp 就是直接在 cammand 輸入 gulp 就可以 )

![Gulp 學習筆記 2 - 打包壓縮 CSS 與 JS](/img/articles/201503/20150306_1_02.jpg)

完整的 gulpfile.js 長這樣：

	var gulp       = require('gulp'),
	    concat     = require('gulp-concat'),
	    minifyCSS  = require('gulp-minify-css'),
	    uglify     = require('gulp-uglify'),
	    rename     = require("gulp-rename");

	gulp.task('concat', function() {
	    return gulp.src('./app/css/*.css')
	        .pipe(concat('all.css'))
	        .pipe(gulp.dest('./build/css/'));
	});

	gulp.task('minify-css',['concat'], function() {
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

	gulp.task('default',['minify-css','uglify']);

<br/>

<!-- @@close-->