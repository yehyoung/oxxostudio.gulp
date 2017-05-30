# 點選複製 Clipboard.js 

之前有介紹過 [點選自動複製 ( ZeroClipboard )](http://www.oxxostudio.tw/articles/201501/zeroclipboard.html) 這個透過 flash 的方式，繞過瀏覽器安全性限制，將網頁元素內容複製到剪貼簿的方法，但因為必須走 flash 的緣故，在不支援 flash 的瀏覽器裡反而變成了一個隱性的問題，從以前那篇文章可以看到，當初其實是參考了 Github 的做法，結果前一陣子在 Github 裡頭，赫然發現他的那顆按鈕已經不是 flash，變成用純粹的 JavaScript 就可以複製到剪貼簿，真是太令人感到意外！

再差不多同一時間，從 Facebook 的 Front-End Developers Taiwan 社團看到了 Rplus Chen 大大發的一篇文章：「[Clipboard.js](https://zenorocha.github.io/clipboard.js/)」，就這麼巧同樣也是在講不走 flash 就能複製到剪貼簿的 JavaScript，找了一些資料，發現 W3C 也開始支援 ( 參考：[Clipboard API and events](http://www.w3.org/TR/clipboard-apis/) )，就先把這些內容收藏著，等待時機派上用場。

一直到最近，工作上總算是需要用到這個方法 ( 之前一直都用需要 flash 的版本 )，在實作的過程中又遇到了一點小坑，不過做完之後覺得真是滿方便的，趕緊寫篇文章記錄一下。

首先我們先連結到 Clipboard.js 的官方網站：[https://zenorocha.github.io/clipboard.js/](https://zenorocha.github.io/clipboard.js/)，當然直接連結去他的 Github 也可以，星星超多 Der！

![點選複製 Clipboard.js](/img/articles/201510/20151029_1_02.jpg)

一開始他說的是 node.js 的安裝方式，如果要直接用在網頁上，其實直接載入對應的 js 就可以，大概就像下面這樣，不過作者也附上了 CDN 的網址。( [https://github.com/zenorocha/clipboard.js/wiki/CDN-Providers](https://github.com/zenorocha/clipboard.js/wiki/CDN-Providers) )

	<script src="dist/clipboard.min.js"></script>

<br/>

載入之後就要來看用法，要用這支 js 最主要的目的，就是讓我們可以「一點就複製」，因此要先把行為綁定在需要點選的元素上，這裏作者稱之為「Trigger」，以下面的程式碼來說，最重要的就是要寫上`data-clipboard-target`這段，這指定了要複製的元素 id，點選後就會自動複製這個 id 的內容。

	<button id="btn" data-clipboard-target="#foo">
		點選複製
	</button>

	<div id="foo">123</div>

<br/>

當然這只是預設值 ( 複製 )，如果要剪下，就要額外增加`data-clipboard-action="cut"`的屬性，不過「剪下」的功能，就只適合「文字輸入」的欄位，畢竟一般要將元素的內容剪下，就要用到其他的 js 來輔助了。

	<button id="btn" data-clipboard-action="cut" data-clipboard-target="#foo">
		點選複製
	</button>

	<textarea id="foo">123</textarea>

<br/>

寫完 HTML 就要來看程式，結果 JavaScript 的部份異常簡單，一段 code 就搞定，只要有這行，new 了一個 Clipboard 的物件之後，就可以點選複製或點選剪下了。

	var clipboard = new Clipboard('btn');

<br/>

不過作者當然不只有提供這些功能，他還提供了成功與失敗的事件，而取消選取的方法，就可以寫在「成功」的事件裡頭，複製完就會自動取消選取。( 想當初還花了很大的功夫寫了一篇 [自動選取某個區域的文字](http://www.oxxostudio.tw/articles/201508/select-text.html) )

	clipboard.on('success', function(e) {
	    console.info('Action:', e.action);
	    console.info('Text:', e.text);
	    console.info('Trigger:', e.trigger);

	    e.clearSelection(); //取消選取
	});

	clipboard.on('error', function(e) {
	    console.error('Action:', e.action);
	    console.error('Trigger:', e.trigger);
	});

<br/>

而這次自己實作遇到的小坑，是因為自己沒有看清楚作者的進階範例，進階用法裡，可以選擇複製下一個`trigger.nextElementSibling`，或複製指定屬性`trigger.getAttribute('aria-label')`，一開始沒看清楚，還以為是什麼 bug 導致都複製到下一個呢...

	new Clipboard('.btn', {
	    target: function(trigger) {
	        return trigger.nextElementSibling;
	    }
	});

	new Clipboard('.btn', {
    text: function(trigger) {
        return trigger.getAttribute('aria-label');
    }
	});

<br/>

總之，就這樣順利的完成了點選複製的功能，但很可惜的，在 Safari、iOS ( iPhone、iPad ) 上頭都不能跑，或許跟 Apple 的安全性限制還是有關係，不過...在 IE9 都能跑呀！相信之後一定會支援的啦！


