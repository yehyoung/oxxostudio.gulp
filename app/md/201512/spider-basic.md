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

<meta property="article:published_time" content="2015-12-23T23:50:00+01:00">

<meta name="keywords" content="spider,cheerio,爬蟲,網路爬蟲,request,nodejs,fs">

<meta name="description" content="幾個月前聽了一場用 NodeJS 做爬蟲的分享，大致上就是用純前端的技術，來爬靜態網頁的資料，聽完一直很想做個爬蟲看看，剛好最近因為「空氣污染」( PM2.5 ) 正夯，公司也正在研發 PM2.5 的感測器，於是就想說自己先來試試看，用爬蟲去中央氣象局爬爬 PM2.5 的數據。">

<meta itemprop="name" content="做個簡單的爬蟲 ( 幣值、空污 PM2.5 ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201512/20151223_1_01b.jpg">

<meta itemprop="description" content="幾個月前聽了一場用 NodeJS 做爬蟲的分享，大致上就是用純前端的技術，來爬靜態網頁的資料，聽完一直很想做個爬蟲看看，剛好最近因為「空氣污染」( PM2.5 ) 正夯，公司也正在研發 PM2.5 的感測器，於是就想說自己先來試試看，用爬蟲去中央氣象局爬爬 PM2.5 的數據。">

<meta property="og:title" content="做個簡單的爬蟲 ( 幣值、空污 PM2.5 ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201512/spider-basic.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201512/20151223_1_01b.jpg">

<meta property="og:description" content="幾個月前聽了一場用 NodeJS 做爬蟲的分享，大致上就是用純前端的技術，來爬靜態網頁的資料，聽完一直很想做個爬蟲看看，剛好最近因為「空氣污染」( PM2.5 ) 正夯，公司也正在研發 PM2.5 的感測器，於是就想說自己先來試試看，用爬蟲去中央氣象局爬爬 PM2.5 的數據。">

<title>做個簡單的爬蟲 ( 幣值、空污 PM2.5 ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##做個簡單的爬蟲 ( 幣值、空污 PM2.5 ) <span class="article-date" tag="web">DEC 23	, 2015</span>

幾個月前聽了一場用 NodeJS 做爬蟲的分享，大致上就是用純前端的技術，來爬靜態網頁的資料，聽完一直很想做個爬蟲看看，剛好最近因為「空氣污染」( PM2.5 ) 正夯，公司也正在研發 PM2.5 的感測器，於是就想說自己先來試試看，用爬蟲去中央氣象局爬爬 PM2.5 的數據。

爬空污數據除了直接爬網頁資料外，也可以從「[空氣品質即時污染指標](http://data.gov.tw/node/6074)」這個政府開放資料平台來撈，這裏有提供 CSV、JSON 和 XML 的格式，不過因為這篇在爬蟲，所以我要爬的網站是這個：「[即時細懸浮微粒指標](http://taqm.epa.gov.tw/taqm/tw/Pm25Index.aspx)」，加上這個網站更新的速度比開放資料的速度快 ( 雖然都是一小時更新一次，不過還是快樂十幾分鐘左右 )，所以就直接爬數據囉！

![做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](/img/articles/201512/20151223_1_02.jpg)

既然要爬，就要先來看看他的網頁原始碼，才知道要從何爬起，看了原始碼才發現他不是用什麼 json 資料的載入，而是把數據直接寫在原始碼內，意思就是只要爬出來 class 為 jTip 的 area，就可以獲得資料。

![做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](/img/articles/201512/20151223_1_03.jpg)

知道要爬什麼東西之後，就要來寫 NodeJS 了，這裏先 npm install 兩個模組，分別是「request」和「cheerio」，request 可以想像成就是在後端載入一個網頁，而 cheerio 就是這個網頁裡面的 jQuery ( 用法一樣，因為它的核心就是 jQuery )，install 之後我這邊建立一個 test.js，開頭先寫入這三行，request 和 cheerio 沒問題，fs 則是 NodeJS 的檔案系統模組，包含讀取、刪除、寫入、更名等等的檔案操作。

	var request = require("request");
	var cheerio = require("cheerio");
	var fs = require("fs");

然後我先建立一個名為 pm25 的函式，一開始就先用了 request，網址就是空污的網址，方法使用 GET，後面接著一個 callback 函式，裡面有三個參數，分別是 error、response 和 body，一直到 body 載入之後我們再來分析。

	var pm25 = function() {
	  request({
	    url: "http://taqm.epa.gov.tw/taqm/tw/Pm25Index.aspx",
	    method: "GET"
	  }, function(error, response, body) {
	    if (error || !body) {
	      return;
	    }
	    // 爬完網頁後要做的事情
	  });
	};

body 載入之後要做的事情就是下面這段，一開始用 cheerio 載入 body，宣告一個 title 的變數裝載`area.jTip`，接著把資料拋進 result 的陣列裡，並用`fs.writeFile`將這個陣列寫入 result.json 這個 json 檔裡，最後接著一個完成後 callback 的函式，裡面分析這個陣列，取出「前鎮區」的 PM2.5 數值，用 console 印出。( 為什麼選擇前鎮呢？因為我在前鎮呀ㄎㄎ )

	var $ = cheerio.load(body);
	var result = [];
	var titles = $("area.jTip");
	var location;
	for (var i = 0; i < titles.length; i++) {
	  result.push(titles.eq(i).attr('jtitle'));
	}
	fs.writeFile("result.json", result, function() {

	  var varTime = new Date();
	  for (var j = 0; j < result.length; j++) {
	    var data = JSON.parse(result[j]);
	    if(data.SiteName=='前鎮'){
	      console.log(data.SiteName + ', PM2.5: '+ data.PM25 +' (' + varTime.toLocaleTimeString() + ')');
	    }
	  }

	});

最後，就要要用`setInterval`來做出一段時間抓一次數據的功能，如此一來就大功告成，執行`node test`就會看到結果囉！

	pm25();
	setInterval(pm25,30*60*1000);

![做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](/img/articles/201512/20151223_1_04.jpg)

會抓空污資料之後，我又異想天開的想說因為過一陣子要去日本玩，因為要兌換日幣，不如做一個自動抓取幣值的爬蟲好了，這樣就可以掌握幣值的變化，當幣值匯率到多少的時候，還會自動發個通知該多好，所以我就拿台灣銀行的幣值牌告匯率網頁來練習：[http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm](http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm)。

![做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](/img/articles/201512/20151223_1_05.jpg)

不看原始碼還好，看了快昏倒，發現架構就是一堆 table 組成，很多還沒有 class，寫了很多行內的 style，所以爬進來之後還得費一番功夫來解析一下。 ( 經過這幾次的爬蟲經驗，發現架構做得越好的網站越好爬 )

![做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](/img/articles/201512/20151223_1_06.jpg)

前面的程式碼都大同小異，直接進到載入 body 之後的動作，這裏抓取 table 每一列都有的 class：decimal，抓出來之後會發現是一串很大串的陣列，裡面塞了一大堆物件與陣列，由於我們要的只是一開始的國家幣值名稱以及前兩個欄位買進賣出的匯率，所以就直接篩選出來。

![做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](/img/articles/201512/20151223_1_07.jpg)

篩選之後這裏用了個偷雞的方法，因為日圓排在第八位，所以就直接用`result[7]`來取值了。

	var $ = cheerio.load(body);
	var varTime = new Date();
	var result = [];
	var title = $(".titleLeft");
	var decimal = $(".decimal");
	for (var i = 0; i < title.length; i++) {
	  result.push('{"'+title[i].children[1].data+'":['+decimal[4*i].children[0].data + ','+decimal[4*i+1].children[0].data+']}');
	}
	fs.writeFile("result.json", result, function() {

	  var varTime = new Date();
	  var a = JSON.parse(result[7]);
	  console.log(varTime.toLocaleTimeString()+': '+a[' 日圓 (JPY)'][1]);

	});

最後一樣使用`setInterval`五分鐘撈一次資料，就可以囉！( Github：[https://github.com/oxxostudio/pm25](https://github.com/oxxostudio/pm25) )

	pm();
	setInterval(pm,5*60*1000);

不過這裡如果發通知要怎麼做呢？我原本使用了 firebase 來串接，當數據改變時，就會透過瀏覽器發一個 alert 通知，但還有一個更快的方法，就是我使用了自家研發的 Webduino 產品，當匯率改變時，就透過蜂鳴器發出聲音，或透過 LED 閃爍來提醒，就更方便囉！範例程式就像下面這樣，當匯率小於 0.27 就把 led 燈點亮。

	var led;
	boardReady('35PQ', function(board) {
	  board.samplingInterval = 20;
	  led = getLed(board, 11);
	  if (a[' 日圓 (JPY)'][1] < 0.27) {
	    led.on();
	  } else {
	    led.off();
	  }
	});

不過要在 NodeJS 使用 Webduino，要先 npm install 這兩支程式：`webduino-js`和`webduino-blockly`，就可以順利使用囉！

<!-- @@close-->




