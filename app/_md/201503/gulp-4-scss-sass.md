# Gulp 學習 4 - 建立 SCSS/SASS 編輯環境  

隨著時代的演進，這一兩年來我都已經是用 SCSS 在編寫 CSS，不過 SCSS/SASS 是建構在 Ruby 的環境之下，通常我們要使用，則必須先安裝 Ruby 以及 compass，或也可以購買安裝 Fire.app 代勞，那麼要如何才能用 gulp ，來建立一個自動執行轉換 SCSS 的環境呢？

與 SCSS/SASS 的安裝同樣的前置步驟，我們必須先安裝 Ruby 以及 compass，Ruby 可以直接到 Ruby 的官方網站下載安裝： [rubyinstaller](http://rubyinstaller.org/downloads/) 。 

![Gulp 學習 4 - 建立 SCSS/SASS 編輯環境](/img/articles/201503/20150308_1_02.jpg)

安裝 Ruby 之後就是要繼續安裝 compass，開啟命令提示字元 ( CMD )，輸入以下程式碼，就可以安裝 compass。

	gem install compass

<br/>
安裝 Ruby 與 compass 的前置作業完成之後，接著就要來回歸 Gulp ，這裡我們要用到的套件只有一個：gulp-compass。( Mac 可能要加 sudo )

	npm install gulp gulp-compass -save-dev

<br/>
安裝之後先來規劃一下我們的目錄結構，首先建立一個名為 style 的資料夾，內部分別建立兩個名為 SCSS、CSS 的資料夾，我們的目標是要在 SCSS 資料夾內編寫 SCSS，然後自動轉換成 CSS 檔案放在 CSS 的資料夾內。

![Gulp 學習 4 - 建立 SCSS/SASS 編輯環境](/img/articles/201503/20150308_1_03.jpg)

資料夾用好之後，來寫一下 gulpfile.js 了，第一步就是先引入套件。(參考：[gulp-compass](https://www.npmjs.com/package/gulp-compass))

	var gulp = require('gulp'),
		compass   = require('gulp-compass');
	
<br/>
然後就是定義一個叫做 compass 的任務，`gulp.src`是讀取 scss 資料夾內所有的 scss 檔案，然後利用 compass 的方法進行轉換，轉換的設定有滿多的，下面的範例只列出幾個，例如 sourcemap ，是在轉換之後會產生 sourcemap 的一個 json 檔案 ( css.map )，如此一來就可以從編譯出的 css，反查回原本的 scss，而 time 就是顯示轉換經過的時間，style 則是轉換出來的 CSS 長相會是如何。

	gulp.task('compass',function(){
		return gulp.src('./style/scss/*.scss')
			.pipe(compass({
				sourcemap: true,
				time: true,
	      css: './style/css/',
	      sass: './style/scss/',
	      style: 'compact' //nested, expanded, compact, compressed
			}))
			.pipe(gulp.dest('./style/css/'));
	}); 

<br/>
接著，我們要來寫一個 watch 的任務，這個任務不需要安裝甚麼套件，它原本就預設在 gulp 裏頭，它的目的是去監看變化的檔案，當指定監看的檔案有變化 ( 新增、修改 )，就會自動去執行對應的任務，下面的範例是讓 gulp 自動去監看 scss 資料夾內所有 scss 的檔案，如果有變化，就自動執行 compass，如此一來我們就可以純粹編輯 scss ，讓 gulp 自動去產出 css 囉！最後當然就是要一併執行 compass 和 watch 這兩個任務。

	gulp.task('watch',function(){
		gulp.watch('./style//scss/*.scss',['compass']);
	});
	
	gulp.task('default',['compass','watch']);

<br/>
最終的 gulpfile 的長相，我也有放在 Github 上頭，也歡迎大家 fork，在 SCSS 的註解裏頭，其實也是我自己做的一份 SCSS 的教學範例喔，下載之後執行 npm install 就可以安裝相對應的套件了。( [Gulp-SCSS](https://github.com/oxxostudio/Gulp-SCSS) ) 

	var gulp = require('gulp'),
		compass   = require('gulp-compass');
	
	gulp.task('compass',function(){
		return gulp.src('./style/scss/*.scss')
			.pipe(compass({
				config_file: './style/scss/config.rb',
				sourcemap: true,
				time: true,
	      css: './style/css/',
	      sass: './style/scss/',
	      style: 'compact' //nested, expanded, compact, compressed
			}))
			.pipe(gulp.dest('./style/css/'));
	}); 
	
	gulp.task('watch',function(){
		gulp.watch('./style//scss/*.scss',['compass']);
	});
	
	gulp.task('default',['compass','watch']);

<br/>
題外話，在 Mac 寫以上的步驟都沒有問題，真正遇到問題是用 windows 才產生，一開始因為我的 compass 版本較舊，導致無法順利轉出 scss 裏頭註解的部分，於是我用`gem install compass`要更新 compass，沒有到卻又發生`SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed`這個莫名其妙的問題，因為 gulp-compass 就是必須要用 compass，無法順利升級 compass 就等於宣告 gulp-compass 陣亡，找了很久，終於找到這篇文章：[SSL upgrades on rubygems.org and RubyInstaller versions](https://gist.github.com/luislavena/f064211759ee0f806c88)，裏頭詳細描述這個問題的解決方法，就是要先下載 rubygems-update-1.8.30.gem 到本地端，然後升級 gem ( 因為用 update 都升級不了 )，升級之後，就可以順利升級 compass。( 寫這篇的時候 compass 是 1.0.3 )

不過光是升級還是會有點小問題，就是 compass 預設對於中文的註解會發生錯誤，解決方式有兩種，一種是在專案檔裏頭添加 config.rb，內容添加：`Encoding.default_external = 'utf-8'`，第二種是在 scss 的檔案開頭，加上`@charset "UTF-8";`就可以解決。

沒想到原本在 Mac 上很簡單的步驟，在 windows 我卻花了好幾個小時才搞定，真是莫名其妙呀喔哈！

參考資料：

>- [SCSS/SASS](http://sass-lang.com/)
- [fire.app](http://fireapp.kkbox.com/doc/tw/index.html)
- [SCSS 安裝與執行](http://www.oxxostudio.tw/articles/201406/scss-01-install.html)
- [解決中文註解發生錯誤](http://jsnwork.kiiuo.com/archives/1723/sass-scss-compass-susy2-ruby-%E8%A7%A3%E6%B1%BA%E4%B8%AD%E6%96%87%E8%A8%BB%E8%A7%A3%E7%99%BC%E7%94%9F%E9%8C%AF%E8%AA%A4)
