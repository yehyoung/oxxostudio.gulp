# LINE BOT 實戰 ( 原理篇 )

最近剛撰寫完 IT 鐵人賽的「實戰智慧插座」系列文章，原本最後兩篇想用個 LINE BOT 來完美收尾，但天不從人願 ( 自己後端的能力太弱 ），沒辦法順利完成，但趁著這個週末，總算是搞定了 LINE BOT ( LINE 聊天機器人 )。

> 實戰智慧插座：[https://goo.gl/hI1mEa](https://goo.gl/hI1mEa)

## 1. LINE BOT 設定

因為要使用 LINE 的機器人，一定要先到 「LINE Business Center」 建立 「BOT 帳號」( [https://business.line.me/zh-hant/](https://business.line.me/zh-hant/) )。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_02.jpg)

登入當然就是用自己的 LINE 帳號登入，登入會要求要手機輸入驗證碼，反正如果帳號是自己的應該都可以順利登入 ( 咦？XD )，登入之後點選右上方帳號旁邊的「尚未選擇公司/經營者」，然後新增「公司/經營者」。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_03.jpg)

註冊資訊基本上填寫「個人」就可以。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_04.jpg)

完成後就可以開始使用服務，這邊我使用的是「Messaging API」。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_05.jpg)

點選進入，選擇「開始使用Developer Trial」。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_06.jpg)

輸入帳戶名稱 ( 給機器人用的名稱 )，換張顯示圖片，然後選擇業種，按下確定之後，就會建立這個機器人專用的帳號。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_07.jpg)

完成後，到外面記得按下「申請」，就會出現申請完成的畫面。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_08.jpg)

進入「LINE Manager」，選擇「Bot 設定」，點選「開始使用 API」。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_09.jpg)

設定的部分，記得勾選「允許 Webhook 傳訊」，然後「取消」自動回應，接著就可以點選「LINE Developers」進入開發者頁面。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_10.jpg)

開發者頁面第一個選項「Basic information」是最重要的，在這邊我們要記住「Channel ID」、「Channel Secret」( 點選 SHOW 會出現 ) 和「Channel Access Token」( 點選 ISSUE 會產生 )，而「Webhook URL」則是一個要放在「https」的網址，用作和 LINE BOT 溝通使用，到這邊基本上我們已經完成了 LINE BOT 的設定，接著就來看看 Webhook URL 要怎麼做。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_11.jpg)

## 2. 製作 Webhook URL ( Node.js )

我這邊使用 Node.js 來建構我的 Webhook 頁面，首先我們要使用 「**linebot**」這個 Node.js 模組 ( 參考 [https://www.npmjs.com/package/linebot](https://www.npmjs.com/package/linebot) )，然後伺服器端使用「**express**」這個模組。

因為 LINE BOT 要求要「https」，所以我選擇了「**heroku**」( [https://www.heroku.com/](https://www.heroku.com/) ) 作為我的伺服器，也因為要部署到上面去，所以必須要有一個 package.json 檔案，所以一開始我到我的資料夾，輸入`npm init`。( 安裝 Ｎode.js 在這邊就不提了，建議安裝 4.2 版本以上的 Node.js )

然後比較重要的是部署上去之後，要告訴 heroku 啟動的命令，所以我們手動在 package.json 裡面增加`"start": "node ."`。

	{
	  "name": "linechat",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "start": "node ."
	  },
	  "author": "",
	  "license": "ISC"
	}

完成後輸入指令列 ` npm install linebot express --save` 安裝模組 ( 注意，`name`不要和安裝的模組重複了 )，安裝好了以後，建立一個 index.js，輸入下列指令，並填入自己 LINE BOT 的 channel Id、channel Secret 和 channel Access Token。

	var linebot = require('linebot');
	var express = require('express');

	var bot = linebot({
	  channelId: channel Id,
	  channelSecret: channel Secret,
	  channelAccessToken: channel Access Token
	});

鍵入下列程式碼，這會在我們部署到 heroku 上頭之後，在收到 LINE 的訊息的時候把 `event` 印出，然後因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過另外一段程式碼作轉換。( 參考：[http://stackoverflow.com/questions/18008620/node-js-express-js-app-only-works-on-port-3000](http://stackoverflow.com/questions/18008620/node-js-express-js-app-only-works-on-port-3000) )。

	bot.on('message', function(event) {
	  console.log(event); //把收到訊息的 event 印出來看看
	});

	const app = express();
	const linebotParser = bot.parser();
	app.post('/', linebotParser);

	//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
	var server = app.listen(process.env.PORT || 8080, function() {
	  var port = server.address().port;
	  console.log("App now running on port", port);
	});

## 3. 部署到 Heroku

程式都寫好之後，就可以部署到 Heroku 上面看看狀況 ( 先看看能否順利收到 LINE 的訊息 )，要部署上去，首先要有 Heroku 的帳號，然後就是登入 Heroku ( [https://www.heroku.com/](https://www.heroku.com/) )，登入之後右上角點選「New」，選擇「Create new app」。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_12.jpg)

建立完成後，在「Settings」的頁面，就可以看到對應的 git 網址，待會我們只要把程式透過 git push 到這邊，就會自動完成安裝。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_13.jpg)

因為要用到 git，所以先建立一個「.gitignore」的檔案，因為 node_modules 的檔案是不用 push 上去的。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_14.jpg)

不論用指令也好，還是像我自己喜歡用 souretree，總之就把剛剛的程式 push 到 Heroku 上面。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_15.jpg)

接著回到 Heroku，看到 logs 的地方，就可以看到程式已經成功部署成功，如果有錯，這邊也會顯示出來。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_16.jpg)

只有部署成功還不夠，還要進入 Heroku 的 Settings 頁面，在 Config Vars 的地方填入 LINE BOT 的 ChannelAccessToken 和 ChannelSecret。( 記得不要有空格 )

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_17.jpg)

最後點選右上方的 Open APP，如果出現這個畫面，應該就是全部設定完成了。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_18.jpg)

記下剛剛打開的網址，回到 LINE Developers 裡面，填入 Webhook URL，如果按下 VERIFY 後出現 success 的字樣，就是大功告成！可以傳 LINE 給機器人囉！

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_19.jpg)

## 4. 傳 LINE 給 LINE BOT

透過 QRCode 我們可以加入 LINE BOT 聊天室開始聊天，一開始會有一個自動訊息。

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_20.jpg)

然後我們可以傳一個訊息，就可以從 Heroku 的 log 裡面看到 LINE 的訊息格式，從裡面可以發現訊息是存在 `message` 的 `text` 屬性裡面，這也是我們之後可以拿來利用的部分。

	{ type: 'message',
	  replyToken: 'xxxxxxx',
	  source: 
	    { userId: 'xxxxxxx',
	      type: 'user',
	      profile: [Function] },
	  timestamp: 1484472609833,
	  message: 
	    { type: 'text',
	      id: 'xxxxxxxxxx',
	      text: 'hihi',
	      content: [Function] },
	  reply: [Function] }
	}

![LINE BOT 實戰 ( 原理篇 )](/img/articles/201701/20170115_1_21.jpg)

就這樣，基本上到這個步驟，我們已經可以實際的跟我們的 LINE BOT 傳訊息了，下一篇將會繼續來完成一個可以和我們對話的 LINE 機器人。






