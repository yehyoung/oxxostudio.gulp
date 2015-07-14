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

<meta property="article:published_time" content="2014-12-01T22:25:00+01:00">

<meta name="keywords" content="google搜尋,站內搜尋,搜尋,site search,google search,data,css,not">

<meta name="description" content="這篇文章來分享一下自己部落格使用的兩種站內搜尋方式，第一種是利用 google 的「自訂搜尋」，就可以做出利用 google 進行全站搜尋的超強大功能，第二種則是單純使用一行 CSS 和一點點的 jQuery，就可以實現純前端的單頁內容搜尋。">

<meta itemprop="name" content="簡單打造站內搜尋、標題搜尋 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201412/20141201_1_01b.jpg">

<meta itemprop="description" content="這篇文章來分享一下自己部落格使用的兩種站內搜尋方式，第一種是利用 google 的「自訂搜尋」，就可以做出利用 google 進行全站搜尋的超強大功能，第二種則是單純使用一行 CSS 和一點點的 jQuery，就可以實現純前端的單頁內容搜尋。">

<meta property="og:title" content="簡單打造站內搜尋、標題搜尋 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201412/site-search.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201412/20141201_1_01b.jpg">

<meta property="og:description" content="這篇文章來分享一下自己部落格使用的兩種站內搜尋方式，第一種是利用 google 的「自訂搜尋」，就可以做出利用 google 進行全站搜尋的超強大功能，第二種則是單純使用一行 CSS 和一點點的 jQuery，就可以實現純前端的單頁內容搜尋。">

<title>簡單打造站內搜尋、標題搜尋  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##簡單打造站內搜尋、標題搜尋  <span class="article-date" tag="web"><i></i>DEC 1, 2014</span>

自己個 blog 從五月正式上線至今，一直都缺了一個「站內搜尋」的功能，總算在這陣子找了空檔，把這個功能補上，同時在 list 頁面新增了 filter 以及標題搜尋的功能，每一篇文章的最下方也新增的上一頁下一頁的功能，最後順便把一些長期累積的小 bug 給修掉，在底層動的工程頗精彩呀。

這篇文章來分享一下自己部落格使用的兩種站內搜尋方式，第一種是利用 google 的「**自訂搜尋**」，就可以做出利用 google 進行全站搜尋的超強大功能，第二種則是**單純使用一行 CSS 和一點點的 jQuery**，就可以實現純前端的單頁內容搜尋，我也將這種方法應用在 [list 頁面](http://www.oxxostudio.tw/list.html) 進行標題的快速查找，兩種搜尋功能互相搭配，部落格的功能總算是完備了。

<br/>
###第一種 google 的自訂搜尋
要使用自訂搜尋，就要先登入「**[自訂搜尋引擎](https://www.google.com/cse/?hl=zh-TW)**」。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_02.jpg)

<br/>
登入之後，就把自己的網站或部落格網只填入「要搜尋的網站」，然後給個名稱即可。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_03.jpg)

<br/>
以我的 blog 來說，完成後就會長這樣：

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_04.jpg)

<br/>
進入之後會先看到這個畫面，第一頁其實沒有甚麼特別 ( 進階功能沒有摸索不了解 )，主要就是一些這個搜尋引擎的基本設定。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_05.jpg)

<br/>
真正的重點是第二頁「外觀和風格」，這一頁決定了搜尋引擎的長相，以及搜尋結果要出現的位置，google 總共提供了七種方式讓我們選擇，好幾年前我的 blog 是採用「google 代管」的方式，這個方式其實很簡單，就是搜尋結果會像 google 搜尋一樣獨立一頁出來，就不需要考慮樣式和結果頁面的呈現，而我現在的 blog，是使用「2 頁」的作法。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_06.jpg)

<br/>
選擇好了之後，點選右下角「儲存並取得程式碼」，就可以開始進行我們搜尋引擎的製作，因為我選擇的是「2頁」，所以第一步要先點選上方「搜尋結果詳細資料」來進行設定。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_07.jpg)

<br/>
點選後，第一個欄位是搜尋頁面的位置，第二個欄位是搜尋時在網址列的參數代碼，預設是 q，而我這邊設為 s。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_08.jpg)

<br/>
一開始 google 所提供的是第三版，剛剛上面提到搜尋頁面的位置，影響比較大的也就是這一版，不過這版上去之後，雖然搜尋的功能是正常，但在開發者工具裏頭都會報錯 (`Failed to load resource - http://www.google.com/uds/?file=ads&v=3&packages=search&async=2`)，查了很久都找不到解決方式，為了避免報錯不知道會產生甚麼問題，所以就捨棄這一個版本，點選下方「**取得 V1 程式碼**」就可以取得 V1 的程式碼，從程式碼中可以發現剛剛設定的參數都在裏頭，而你也可以點選下一步，就可以看到搜尋結果頁面的程式碼。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_09.jpg)

<br/>
了解之後，回頭看一下上面的程式，`<div id='cse-search-form' style='width: 100%;'>Loading</div>`這一段其實就是搜尋框的位置，我放在右上角的搜尋框，loading 是預設的顯示文字，loading 完成後就會自動消失，我自己是不喜歡，所以我就把 loading 移除了，至於 js 我放在整個頁面的最下方，避免有甚麼問題的時候，也只有搜尋死掉而已。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_10.jpg)

<br/>
不過剛放上搜尋框的時候一定會被他的樣式嚇到，因為就是一個很醜的`text-input`加上一顆`button`，打開開發者工具可以清楚地發現，網頁被內嵌了一大堆 style，而搜尋框也是內含一脫拉庫的 HTML。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_11.jpg)

<br/>
這時候就必須要利用 [CSS 的權重](http://www.oxxostudio.tw/articles/201405/css-specificity.html) 來和這些 style 硬碰硬，就可以把這些 style 強壓換成自己的 style，下圖是我的 SCSS 長相，因為 google 加入的 style 在我的 style 後面，導致我的 style 怎麼寫都會被蓋掉 ( 當然可以用 id 打頭覆蓋，但我的 HTML 沒有 id，就無法這麼做 )，所以這裡我用了不少`!important`來進行覆蓋的作業。(`!important`很邪惡，要小心使用。 )

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_12.jpg)

<br/>
同樣的，取得搜尋結果程式碼後，程式碼的`<div id='cse' style='width: 100%;'>Loading</div>` 放在搜尋結果頁面要顯示結果的位置，看看搜尋結果畫面的長相，也是由一大堆被 google 塞進去的 DOM 所組成。

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_13.jpg)

<br/>
因此這裡同樣要強迫把 style 給覆蓋掉，這裡同樣使用了`!important`來強制覆蓋。( 其實免費版的有廣告，還有一些有的沒有的欄位，都可以用這種方式來覆蓋使其消失 )

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_14.jpg)

<br/>
完成後，恭喜恭喜，整個網站的站內搜尋總算是大功告成啦！其實要使用 google 的站內搜尋是很簡單的，程式碼貼上去基本上就都可以搜尋嘗鮮，但真正麻煩的還是在調整 UI 的細節，要如何才能讓搜尋框、按鈕和搜尋結果，與自己的網站無縫接軌搭配，才是真正耗費時間的地方。

<br/>
###第二種標題搜尋
至於我的 blog 內的第二種搜尋方式「標題搜尋」，就不是用像 google 的這種高級方式，而是單純的利用了 CSS 裏頭的`:not`，`:not`顧名思義就是「**沒有的**就會怎樣怎樣...」，原理很簡單，當輸入文字的時候，同時寫入 CSS，藉由 CSS 與 DOM 之間的連動，就可以輕鬆做出及時篩選的功能。( 參考 [所有文章列表](http://www.oxxostudio.tw/list.html) )

要如何實現呢？首先我在我的 blog 原始碼裡頭放了一段空白的 style，並給予一個 class 命名，如此一來，我就可以用 jquery 在裡面寫東西。 

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_15.jpg)

<br/>
第二步，我在清單裡頭都加入了一個`data-title`的 HTML5 才有的 data attribute，其實不一定要叫 title，主要是以`data-`打頭的都是 HTML5 特有的 data attribute，有了這個屬性，我們就可以用 CSS 來獲取。

	<li class="tag-web" data-title="svg d3.js - 區域 ( area )">

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_16.jpg)

<br/>
再來就是了解一下剛剛的那個 style 裡面該放些甚麼，裡面是要動態寫入寫入下方的 CSS，如此一來，data-title 裡面只要有吻合的字串，就會顯示，沒有就會被加入`display:none`的屬性。

    #container .content li:not([data-title*="字串"]) {display: none;}

<br/>
最後就是寫 js 了，一開始定義按下、貼上或改變時就會觸發的事件，為了避免有英文大小寫的問題，一開始就先使用`toLowerCase()`讓輸入的值都轉為小寫，並且當沒有數值的時候，清空 style，避免清空的時候無法還原所有的清單。

	$search.on('change paste keyup',function(){
		var value = $(this).val().toLowerCase();
        if(!value){
          $('.list-search-style').html('');
        }
        else{
          _searchStart(value);
        }
      function _searchStart(v){
        $('.list-search-style').html(
          '#container .content li:not([data-title*="' + v + '"]) {display: none;}'
        );
      }
	}

<br/>
就這樣，很簡單的就做出一個及時搜尋的功能，不過除了上面寫的，我還多寫了很多行，畢竟在我的 blog 裏頭，還牽扯到和 filter 標籤的互動，不過理解原理後，就可以做出很多有趣的應用囉！( 參考 [所有文章列表](http://www.oxxostudio.tw/list.html) )

![簡單打造站內搜尋、標題搜尋](/img/articles/201412/20141201_1_17.jpg)

<!-- @@close-->