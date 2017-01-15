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

<meta property="article:published_time" content="2017-01-15T23:50:00+01:00">

<meta name="keywords" content="line, line bot"> 

<meta name="description" content="上一篇我們已經知道 LINE BOT 相關的原理以及如何部署，這篇就真的來完成一個會和你聊天的機器人，希望可以時實作一個你問他現在 PM2.5 數值他就會回答你，甚至你問他日幣匯率他也會回答你。">

<meta itemprop="name" content="LINE BOT 實戰 ( 聊天篇 ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201701/20170115_2_01b.jpg">

<meta itemprop="description" content="上一篇我們已經知道 LINE BOT 相關的原理以及如何部署，這篇就真的來完成一個會和你聊天的機器人，希望可以時實作一個你問他現在 PM2.5 數值他就會回答你，甚至你問他日幣匯率他也會回答你。">

<meta property="og:title" content="LINE BOT 實戰 ( 聊天篇 ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201701/line-bot-2.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201701/20170115_2_01b.jpg">

<meta property="og:description" content="上一篇我們已經知道 LINE BOT 相關的原理以及如何部署，這篇就真的來完成一個會和你聊天的機器人，希望可以時實作一個你問他現在 PM2.5 數值他就會回答你，甚至你問他日幣匯率他也會回答你。">

<title>LINE BOT 實戰 ( 聊天篇 ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

## LINE BOT 實戰 ( 聊天篇 ) <span class="article-date" tag="web">JAN 1, 2017</span>

[上一篇](line-bot.html) 我們已經知道 LINE BOT 相關的原理以及如何部署，這篇就真的來完成一個會和你聊天的機器人，希望可以時實作一個你問他現在 PM2.5 數值他就會回答你，甚至你問他日幣匯率他也會回答你。( 可以參考 [做個簡單的爬蟲 ( 幣值、空污 PM2.5 )](http://www.oxxostudio.tw/articles/201512/spider-basic.html) )

<br/>

### 1. LINE Message Type

如果我們傳訊息給我們建立的 LINE BOT，可以看到 Message 裡面有個「type」的屬性，透過這個屬性我們可以作出對應的動作，以下就列出 LINE Message 的 type 種類。( 參考 [https://www.npmjs.com/package/linebot](https://www.npmjs.com/package/linebot)、[https://devdocs.line.me/](https://devdocs.line.me/en/) )

- **text**：純文字。
- **image**：圖片。
- **video**：影片。
- **audio**：聲音。
- **location**：地點。
- **sticker**：表情符號、貼圖。

<br/>

### 2. 重複我們說過的話

通常第一個範例都是這樣，這邊我們把上一篇的程式碼做些修改，也就是我們傳一個訊息給 LINE BOT，它就回傳一個一模一樣的訊息。

	bot.on('message', function(event) {
	  if (event.message.type = 'text') {
	    var msg = event.message.text;
	    event.reply(msg).then(function(data) {
	      // success 
	      console.log(msg);
	    }).catch(function(error) {
	      // error 
	      console.log('error');
	    });
	  }
	});

重新 Commit 和 push 就可以重新 Deploy 到 heroku 上頭，這時候傳訊息給 LINE BOT，就會看到它會回應一模一樣的訊息了。( 如果遇到沒反應，檢查一下 log，可能要把伺服器的 IP 加入 LINE 的「Server IP Whitelist」 )

![LINE BOT 實戰 ( 聊天篇 )](/img/articles/201701/20170115_2_02.jpg)

<br/>

### 3. 主動發送訊息

如果我們增加下面這段程式碼，那麼就會在 Server 啟動後五秒鐘，發送文字給對應的使用者。

	setTimeout(function(){
		var userId = '使用者 ID';
		var sendMsg = '要發送的文字';
		bot.push(userId,sendMsg);
		console.log('send: '+sendMsg);
	},5000);

![LINE BOT 實戰 ( 聊天篇 )](/img/articles/201701/20170115_2_03.jpg)

<br/>

### 4. 詢問 PM2.5 空氣污染數值

最近空氣污染越來越嚴重，因此我們可以透過氣象局的 Opendata 來獲取每個小時所在區域的 PM2.5 數值，然後我們也可以用聊天的方式，詢問 PM2.5 數值，當然如果搭配剛剛的 push 方式，就可以讓 LINE BOT 發訊息讓我們知道囉！。

我這邊要使用的數值是「[空氣污染即時指標](http://data.gov.tw/node/6074)」裡面的 json 資料，所以後端我要先`npm install get-json --save`安裝這個「get-json」套件來抓取資料，完整程式寫法如下，先判斷一段文字裡面有沒有 PM2.5，然後接著判斷地點，如果在條件之外就用其他訊息來呈現。

	var linebot = require('linebot');
	var express = require('express');
	var getJSON = require('get-json');

	var bot = linebot({
	  channelId: 'channelId',
	  channelSecret: 'channelSecret',
	  channelAccessToken: 'channelAccessToken'
	});

	var timer;
	var pm = [];
	_getJSON();

	_bot();
	const app = express();
	const linebotParser = bot.parser();
	app.post('/', linebotParser);

	//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
	var server = app.listen(process.env.PORT || 8080, function() {
	  var port = server.address().port;
	  console.log("App now running on port", port);
	});

	function _bot() {
	  bot.on('message', function(event) {
	    if (event.message.type == 'text') {
	      var msg = event.message.text;
	      var replyMsg = '';
	      if (msg.indexOf('PM2.5') != -1) {
	        pm.forEach(function(e, i) {
	          if (msg.indexOf(e[0]) != -1) {
	            replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
	          }
	        });
	        if (replyMsg == '') {
	          replyMsg = '請輸入正確的地點';
	        }
	      }
	      if (replyMsg == '') {
	        replyMsg = '不知道「'+msg+'」是什麼意思 :p';
	      }

	      event.reply(replyMsg).then(function(data) {
	        console.log(replyMsg);
	      }).catch(function(error) {
	        console.log('error');
	      });
	    }
	  });

	}

	function _getJSON() {
	  clearTimeout(timer);
	  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
	    response.forEach(function(e, i) {
	      pm[i] = [];
	      pm[i][0] = e.SiteName;
	      pm[i][1] = e['PM2.5'] * 1;
	      pm[i][2] = e.PM10 * 1;
	    });
	  });
	  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
	}

![LINE BOT 實戰 ( 聊天篇 )](/img/articles/201701/20170115_2_04.jpg)

<br/>

### 5. 主動通知日幣匯率

關於日幣爬蟲的技術，可以參考我之前寫的 [實戰智慧插座 29 - 用日幣匯率開關燈 ( Node.js 爬蟲應用篇 )](http://ithelp.ithome.com.tw/articles/10188884) 裡面有很完整的說明，這邊我就只貼出關鍵的程式碼，下面的程式表示當日幣小於 0.28 的時候，就會主動發送 LINE 的訊息通知。

	function _japan() {
	  clearTimeout(timer2);
	  request({
	    url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
	    method: "GET"
	  }, function(error, response, body) {
	    if (error || !body) {
	      return;
	    } else {
	      var $ = cheerio.load(body);
	      var target = $(".rate-content-sight.text-right.print_hide");
	      console.log(target[15].children[0].data);
	      jp = target[15].children[0].data;
	      if (jp < 0.28) {
	        bot.push('使用者 ID', '現在日幣 ' + jp + '，該買啦！');
	      }
	      timer2 = setInterval(_japan, 120000);
	    }
	  });
	}

![LINE BOT 實戰 ( 聊天篇 )](/img/articles/201701/20170115_2_05.jpg)

<br/>

以上就是我們把 LINE BOT 拿來和各種網頁技術結合產生的應用，其實還可以做到一大堆事情呀！舉例來說，下面這個影片就是我把 LINE BOT 和 Webduino 結合，就可以用 LINE 來開關燈！真的是很酷呀！

如果你對 Webduino 有興趣，可以參考我最近寫完的三十篇「實戰智慧插座」( 連結：[https://goo.gl/UtaUss](https://goo.gl/UtaUss) )，或是前往 Webduino 官方網站瞧瞧 ( 連結：[https://webduino.io](https://webduino.io) )

<iframe width="560" height="315" src="https://www.youtube.com/embed/cK3calqizTs" frameborder="0" allowfullscreen></iframe>

<br/>

<!-- @@close-->




