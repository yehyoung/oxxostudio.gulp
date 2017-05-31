# SVG D3.js - Enter、Update 和 Exit 

在我之前的文章有談過「D3.js 的資料處理」，這篇要來在介紹一下資料處理當中很重要的三個元素：enter、update 和 exit ( 不知道為什麼當初寫那篇文章沒有寫到哈哈 )，為什麼說很重要呢？因為這三個元素可以處理當畫面元素 ( Elements ) 和資料數量 ( data ) 不相等的情形。

> 參考：[D3.js 的資料處理](http://www.oxxostudio.tw/articles/201411/svg-d3-01-data.html)

以下面這張圖來說，我們利用 enter 來放入資料，如果資料有多少筆，就會在背景「預先」產生多少個元素，當 enter 指令發生的當下，就會把這些預先產生的元素放到畫面裏，而資料和元素數量相等的部分，我們就稱之為「update」，如果資料比元素多，「enter」就會自動生成對應數量的元素來因應，如果資料比元素少，就可以用 exit 指令來列出多的元素，再利用 remove 來移除，這就是 enter 到 update 到 exit 的標準流程。( 簡單來說，enter 就是多出來的，update 就是相等，exit 就是少掉的 )

![SVG D3.js - Enter、Update 和 Exit](/img/articles/201509/svg-d3-18-enter-update-exit.jpg)

舉個例子來說，今天我們在畫面裡有三個 div，但是有一個長度為 5 的陣列要放進去，一開始我們先用 data 來裝入資料，可以看到第一個 console 出來的結果雖然長度是 5，但是內容卻只有三個，這三個就是 update，我們就用一個名為 update 的變數裝著，第二個 console 印出來的雖然長度是 5，但內容卻只有兩個，這就是 enter，因此我用一個名為 enter 的變數裝著。( 範例：[svg-d3-18-enter-update-exit-demo01.html](/demo/201509/svg-d3-18-enter-update-exit-demo01.html) )

	var data = [1,2,3,4,5];

	var d = d3.select('body').selectAll('div');

	var update = d.data(data);
	console.log(update);

	var enter = update.enter();
	console.log(enter);

![SVG D3.js - Enter、Update 和 Exit](/img/articles/201509/20150917_1_02.jpg)

再來我們就用 append div，把這些資料秀出來，並且標明哪些是 enter 產生進去的，這時候我們打開 console 就可以看到一個有趣的現象，突然間 update 的資料變成五筆了，原因無他，因為當 enter 事件發生時，就產生了五個 div，導致我們的 console 就出現五筆資料。( 非同步 )( 範例：[svg-d3-18-enter-update-exit-demo02.html](/demo/201509/svg-d3-18-enter-update-exit-demo02.html) )

	update.append('div')
	  .text(function(d){
	    return 'update: '+d;
	  });

	enter.append('div')
	  .text(function(d){
	    return 'enter: '+d;
	  });

![SVG D3.js - Enter、Update 和 Exit](/img/articles/201509/20150917_1_03.jpg)

如果今天資料量比元素量少，又該如何處理呢？跟剛剛一樣的做法，先來看一下 console 怎麼說，因為我們有三個資料，所以預設的 update 出來就會是 3 筆，而 exit 看到的則是元素有五個，所以長度是五，但內容卻列出來後面兩個空值。( 範例：[svg-d3-18-enter-update-exit-demo03.html](/demo/201509/svg-d3-18-enter-update-exit-demo03.html) )

	var data = [1,2,3];

	var d = d3.select('body').selectAll('div');

	var update = d.data(data);
	console.log(update);

	var exit = update.exit();
	console.log(exit);

![SVG D3.js - Enter、Update 和 Exit](/img/articles/201509/20150917_1_04.jpg)

接著就是把資料秀出來，如果是 exit 就出現 exit 的文字。( 範例：[svg-d3-18-enter-update-exit-demo04.html](/demo/201509/svg-d3-18-enter-update-exit-demo04.html) )

	update.append('div')
	  .text(function(d){
	    return 'update: '+d;
	  });

	exit.append('div')
	  .text(function(d){
	    return 'this is exit';
	  });

![SVG D3.js - Enter、Update 和 Exit](/img/articles/201509/20150917_1_05.jpg)

最後我們也可以用`exit.remove()`將多出來的資料移除，就可以呈現資料相對應的數量元素在畫面上，以上就是 enter、update、exit 的典型用法，也是 d3.js 官方網站的第一頁就有提到的，非常之重要呀！

