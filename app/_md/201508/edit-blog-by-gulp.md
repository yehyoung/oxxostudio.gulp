# 用 Gulp 展開新的 blog 編輯旅程 

![](/img/articles/201508/edit-blog-by-gulp.jpg#preview-img) 

oxxostudio 開張一年多以來，我都是用 Fire.app 在撰寫我的 blog，撰寫的方式不外乎就是利用樣板語法，達成每一頁都會有固定的 layout，然後還可以根據不同頁面套用不同的 CSS 與 Javascript，雖然當初用幾百塊錢買的 Fire.app 還滿方便的，但坦白說它的速度真是慢到有點受不了，或許是背後要用到 Java 的緣故 ( 且在 Java 7 和 Java 8 之間還造成不少問題 )，加上工作上同事都是 node.js 的高手，所以就毅然決然的告別 Fire.app，投入了 Gulp 的懷抱。

雖然用說的很簡單，但一個 blog 要完全轉換為用另外一種編輯模式，實在也沒那麼容易，雖然當初我都使用 markdown 來做編輯與手動轉換，但若要將其全自動，就是一個大挑戰了，因為當初在寫的時候有時候偷懶，有時候隔了幾天或幾週才寫，造成了格式上些許的疏漏和差異，而這些差異又得一篇篇文章查找才明白，也導致我的轉換過程整整耗費了兩個月才完成 ( 也是因為最近太忙了 )。

話說 Gulp 大概是我在今年一月開始接觸的，坦白說實在是滿好用的，主要因為 Gulp 有著龐大 npm package 的後盾，許多疑難雜症都相當容易找到解決的方式，且實際運作起來的速度也是不同凡響，加上自己也在工作上實際用來製作網站，在各種條件都備妥的情況下，自然而然的就把開發模式轉換過來了，以下就大概介紹一下我用到的一些 Gulp Package 給大家參考：

- **gulp**：用 Gulp 一定要裝 Der
- **gulp-html-extend**：讓各個頁面和 Layout 合併
- **gulp-html-tag-include**：很好用的套件，可以將共用的部分獨立出來然後再合併
- **gulp-newer**：有新檔案的時候執行
- **gulp-clean**：清除檔案
- **gulp-markdown**：markdown 轉換為 html
- **gulp-markdown-to-json**：將許多 markdown 轉換為 json
- **gulp-rename**：將檔案更名
- **gulp-less**：有了 less 其實就不需要 sass
- **gulp-minify-css**：壓縮 CSS
- **gulp-uglify**：js 混淆
- **gulp-sitemap**：將所有的 html 轉換為 sitemap.xml
- **merge-stream**：讓任務內的任務流可以用變數來表達和合併
- **gulp-webserver**：起一個 server ( 不過其實用 npm 的 serve 更快 )
- **gulp-util**：merge-stream 會用到

<br/>
不過除了上面的，還有`gulp-html-replace`置換特定區塊 ( 例如把分散的 js 或 css 置換為合併壓縮的 js 或 css )，`gulp-minify-html`壓縮 HTML，`gulp.spritesmith`製作 spritesmith 圖，這幾個也都是非常好用的套件，也都推薦給大家。

在整個 blog 轉換之際，也將原本那些些微的差異一次給解決了，最讓人高興的是只要直接寫 Markdown，就可以自動產出與 layout 合併的 html，並可以直接透過 webserver 預覽，省下了許多編輯的時間，也更讓我可以專注在寫好每一篇文章 ( 發布文章時間大概從十分鐘縮短為不到一分鐘 )，總之，Gulp 真是一個很棒的工具 ( 或程式 )，爾後我也會陸陸續續撰寫與 Gulp 有關的文章，也請大家繼續支持繼續給予指教，非常感謝的啦！


