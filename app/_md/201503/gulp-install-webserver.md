# Gulp 學習 1 - 安裝與執行  

![](/img/articles/201503/gulp-install-webserver.jpg#preview-img)

在二月的時候，我花了不少時間在學習 Gulp 這個任務自動化管理工具，最主要受到了 Gitbook 的啟發，還有洧杰與志誠的推薦，讓我毅然決然地投入了 Gulp 的世界，過去因為工作的需求，接觸過一點點的 Grunt，Gulp 和 Grunt 的初衷相同，都是要把過去需要人工處理的步驟給自動化，如此一來就可以省下不少寶貴的時間，不過我的 Gulp 仍不熟稔，因此從這篇開始的接下來幾篇，都是我學習 Gulp 的歷程，如果有寫錯或是不明白的地方，也請大家多多給予指教。

學習 Gulp 之初，我找了不少的參考資料，以下是我在初期入門所閱讀的資料，內容都滿詳細的描述了關於 Gulp 的基本觀念，特別是 [gulp 入門指南](https://987.tw/2014/07/09/gulpru-men-zhi-nan/) 這篇，非常詳細且完整，看完之後應該就可以明白八九成囉。

- [Gulp 官方網站](http://gulpjs.com/)
- [Gulp 入門指南](https://987.tw/2014/07/09/gulpru-men-zhi-nan/)
- [Gulp 開發教程](http://www.w3ctech.com/topic/134)
- [了不起的任務運行器 Gulp 基礎教程](http://www.html-js.com/article/1742)
- [appleboy 大大：Automating your workflow with Gulp.js](http://www.slideshare.net/appleboy/automating-your-workflow-with-gulp)
- [洧杰：Gulp.js 自動化前端任務流程](http://www.slideshare.net/sfismy/gulpjs)
- [志誠：Gulp Task and Gulp Pipe](http://wcc723.github.io/gulp/2014/09/24/gulp-task/)
- [An Introduction to Gulp.js](http://www.sitepoint.com/introduction-gulp-js/)
- [Automate Your Tasks Easily with Gulp.js](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)

<br/>
雖然上面幾篇都詳細的描述了 Gulp，不過由於這是我自己的學習筆記，第一篇仍然不免俗的要介紹一下 Gulp 與 Gulp 的安裝，揪竟 Gulp 是什麼呢？為什麼我要學 Gulp 呢？Gulp 是基於 Node.js 的任務自動化管理工具，和 Grunt 同樣都是用來簡化人工的步驟，但兩者卻又有著本質上的差異 ( 可以參考 appleboy 大大的 [Automating your workflow with Gulp.js](http://www.slideshare.net/appleboy/automating-your-workflow-with-gulp) )，最主要就是 Gulp 使用了 streams ( 流 ) 的概念，一個任務一個任務的依序按照流程做完，相當的容易思考和理解，然而請教過一些常用 Grunt 的朋友，Grunt 相較於 Gulp，就顯得不那麼直覺 ( 設定比較容易跳來跳去 )。

總而言之，我就捨棄了 Grunt ，轉而投入 Gulp 的懷抱，我目標很簡單，我想要做一個「**可以純粹寫 Markdown 就轉成 HTML 的 blog，並且自動幫我壓縮圖片、HTML、CSS 和 JS，還會自動產出 sitemap 和 json 資料**」，基本上就是有點類似 Gitbook 的做法啦 ( 畢竟我是受到 Gitbook 的啟發呀 )。

要使用 Gulp，第一步就是要安裝 Node.js，因為 Gulp 是基於 Node.js 開發而成，所以就先上 Node.js 的官網下載安裝 ( [http://nodejs.org/download/](http://nodejs.org/download/) )

![Gulp 學習筆記 1 - 安裝與執行](/img/articles/201503/20150302_1_02.jpg)

安裝 node.js 也會順便把 npm 安裝進去，接著就是使用 windows 的 cmd 或 Mac 的 Termial 來安裝 Gulp，首先我們先輸入以下的指令，把 Gulp 安裝到全域的環境。( 在 Mac 要記得加 sudo 不然會裝不進去 )

	npm install -g gulp

<br/>
接著利用指令移到我們的專案目錄下 ( 範例為 gulptest )，輸入`npm init`，進行這個空白專案的初始化，同時也會生成一個基本的`package.json`，這個`package.json`非常重要，因為它定義了這個 Node.js 專案裏頭會需要用到的模組與套件 ( Node modules )，輸入`npm init`之後，基本上可以填寫一些名稱或描述，不然其實也可以直接一直 enter 按下去就會建立完成。

![Gulp 學習筆記 1 - 安裝與執行](/img/articles/201503/20150302_1_03.jpg)

建立好的`package.json`長成這樣：

![Gulp 學習筆記 1 - 安裝與執行](/img/articles/201503/20150302_1_04.jpg)

專案初始化完成之後，接著就可以來安裝這個專案的 Gulp 套件，輸入以下的指令就可以安裝 ( Mac 要加 sudo )，至於為什麼要有`-save-dev`呢？當我們寫`-save-dev`，會將這個模組添加到`package.json`的`devDependencies`裏頭，如果寫`-save`，就會添加到`dependencies`裡，這兩個的差異在於讓使用具備這個`package.json`專案的人，可以清楚的知道這個模組，是開發使用，還是執行專案時使用的。

	npm install gulp -save-dev

![Gulp 學習筆記 1 - 安裝與執行](/img/articles/201503/20150302_1_05.jpg)

其實到這個步驟，已經完成了 Gulp 的安裝，最後來安裝一個名為`Gulp-webserver`的套件，來測試一下我們的第一個 Gulp 專案！安裝的方法跟剛剛是一模一樣的，有興趣了解更多套件的人，可以直接上 [npm 網站](https://www.npmjs.com/)查詢，`gulp-webserver`的套件在這裡：[https://www.npmjs.com/package/gulp-webserver](https://www.npmjs.com/package/gulp-webserver)

	npm install gulp-webserver -save-dev

<br/>
安裝完成之後，由 npm 的網站我們可以清楚的看到`gulp-webserver`的用法，首先我們在專案的資料夾內先建立一個名為`gulpfile.js`的 JS 檔案，內容撰寫下列的程式，這就是當我們執行 gulp 的時候會跑的任務流程。

	var gulp = require('gulp');
	var webserver = require('gulp-webserver');
	 
	gulp.task('webserver', function() {
	  gulp.src('./app/')
	    .pipe(webserver({
		  port:1234,
	      livereload: true,
	      directoryListing: false,
	      open: true,
		  fallback: 'index.html'
	    }));
	});

	gulp.task('default',['webserver']);

<br/>
首先看到前兩行，這是 Node.js 載入這些 Node Modules 的方法，接著就看到 gulp 後面緊跟著 task (`gulp.task`)，這表明了，這段程式裏頭，是兩個任務，分別名為「webserver」和「default」，在`gulp.task('default',['webserver'])`這段裏頭又有一個很重要的涵義，就是 default 這個任務相依於 webserver 任務，因此當我們輸入指令`gulp`執行 default 這個任務的時候，就會先把 webserver 這個任務給執行。 ( 預設任務為 default，因此輸入`gulp`就可以執行 default，不然也可以輸入`gulp.webserver`就可以直接執行`webserver`這個任務 )

繼續看下去，`gulp.src`是指這個任務工作的目標資料夾，`pipe`則是這個任務的流程，之後還會介紹到`gulp.dest`這個任務完成的存檔路徑，以這個 webserver 的例子來說，就是以 app 這個資料夾為目標，在上面建立一個 webserver，當中會包含 livereload 的功能，並且不要顯示文件樹狀清單、port 1234 以及自動開啟 index.html...等。

這時候我們只需要建立一個名位 app 的資料夾，在裏頭放入一些網頁，執行 gulp，就會幫我們建立好一個簡單的 web server 囉！

![Gulp 學習筆記 1 - 安裝與執行](/img/articles/201503/20150302_1_06.jpg)

以上就是我學 Gulp 的起手式，分享給大家。

