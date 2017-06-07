# Promise 與 Opendata

Opendata 是個很好用的練習資料，之前都是透過 jQuery 內建的 getJSON 或 AJAX 來完成資料串接取得，這篇將會透過`XMLHttpRequest()`來實作，並且搭配 Promise 的用法，載入一組資料之後再載另外一組資料，避免同時載入的情況發生。

## Opendata 哪裡找

基本上我們的縣市政府網站，都有提供不少 Opendata 的資訊讓開發者使用，我自己很喜歡到「政府資料開放平臺」上面去挖寶，或是「台北市政府資料開放平臺」，這兩個平台的開放資料都是相當完整且容易介接。

> - 政府資料開放平臺：[http://data.gov.tw/](http://data.gov.tw/)
- 台北市政府資料開放平臺：[http://data.taipei/](http://data.taipei/)

在這邊列出一些我覺得還滿實用，至少都是每小時更新的 Opendata：

>- 即時海水水位：[http://data.gov.tw/node/35077](http://data.gov.tw/node/35077)
- 即時水位 ( 10min 更新 )：[http://data.gov.tw/node/25768](http://data.gov.tw/node/25768)
- 即時雨量 ( 10 min 更新 )：[http://data.gov.tw/node/7879](http://data.gov.tw/node/7879)
- 空氣品質指標 ( AQI )：[http://data.gov.tw/node/40448](http://data.gov.tw/node/40448)
- 空氣品質即時污染指標：[http://data.gov.tw/node/6074](http://data.gov.tw/node/6074)
- 高雄機場國內線即時到站航班：[http://data.gov.tw/node/33649](http://data.gov.tw/node/33649)
- 紫外線即時監測資料：[http://data.gov.tw/node/6076](http://data.gov.tw/node/6076)
- 曾文水庫即時水情資訊：[http://data.gov.tw/node/32733](http://data.gov.tw/node/32733)
- 台北捷運列車到站：[https://goo.gl/m1WM1n](https://goo.gl/m1WM1n)

## 讀取 Opendata

原本要透過`XMLHttpRequest()`來讀取 Opendata，因為 jQuery 的 Ajax 即運用非標準的 XMLHttpRequest 物件，並配合伺服器端的 Script 進行通訊，詳細介紹可以參考下面這些文章。

> 延伸閱讀：[你真的會使用 XMLHttpRequest 嗎？](https://segmentfault.com/a/1190000004322487)、[AJAX 上手篇](https://developer.mozilla.org/zh-TW/docs/AJAX/Getting_Started)、[XMLHttpRequest2 新技巧](https://www.html5rocks.com/zh/tutorials/file/xhr2/)

但是在實作的過程中，遇到跨域的問題無法解決 ( 殘念 )，只好再回歸 jQuery 的`.getJSON`，畢竟支援 JSONP 還是比較方便，透過下面這段程式碼，可以載入空氣質的數據，並在載入完成後透過 console 顯示。

> 範例展示：[demo-01.html](/demo/201706/javascript-promise-opendata-demo-01.html)

	var url = "http://opendata2.epa.gov.tw/AQX.json";
	var myArr;
	$.getJSON(url,function(e){
	  console.log(e);
	});

## 同步處理 Opendata

因為載入 Opendata 需要時間 ( 看檔案大小與網路速度 )，加上 XMLHttpRequest 非同步的特性，如果你在程式碼最下面放個`console(123);`，就會看到 123 先顯示，然後才出現 Opendata 的資料 ( 如果你以為「放在最下面就會最後才出現」就錯了 )。

![](/img/articles/201706/javascript-promise-opendata-01.jpg)

這時候最簡單的做法就是將 console 放到 getJSON 程式內，就可以看到 Opendata 先出現，接著才出現 123。

> 範例展示：[demo-02.html](/demo/201706/javascript-promise-opendata-demo-02.html)

	var url = "http://opendata2.epa.gov.tw/AQX.json";
	var myArr;
	$.getJSON(url,function(e){
	  console.log(e);
	  console.log(123); // 把 123 放在這邊
	});

![](/img/articles/201706/javascript-promise-opendata-02.jpg)

如果在只有一組 Opendata 的時候是很方便的，但誠如之前說過的，若是今天需要呼叫很多個檔案，相對來說得要使用一堆的 callback 來解決，這時候就可以把 Promise 派上用場，我們將`$.getJSON`變成一個 Promise 物件，這樣就可以透過`.then`不斷連結下去，也就可以在程式碼很乾淨的情況下，做到先載入完成一組 Opendata，再載入另外一組的流程。( 範例把兩個網址載入先後順序互換，就更能清楚看出來哪個先載入 )

> 範例展示：[demo-03.html](/demo/201706/javascript-promise-opendata-demo-03.html)

	var data1 = "http://opendata2.epa.gov.tw/AQX.json";
	var data2 = "http://opendata.epa.gov.tw/ws/Data/RainTenMin/?format=json&callback=?"; // 加上 &callback=? 是 JSONP 格式

	var myArr;
	var p = function(url) {
	  return new Promise(function(resolve, reject) {
	    $.getJSON(url, function(e) {
	      resolve([e, url]);  // 把多個值用成一個陣列傳遞下去 ( 因為 resolve 只有一個回傳值 )
	    });
	  });
	}

	p(data2).then(function(v) {
	  console.log(v[1]);  // 顯示 opendata 網址
	  console.log(v[0]);  // 顯示資料內容
	  return p(data1);
	}).then(function(v) {
	  console.log(v[1]);  // 顯示 opendata 網址
	  console.log(v[0]);  // 顯示資料內容
	});

![](/img/articles/201706/javascript-promise-opendata-03.jpg)

## 小結

Opendata 其實有很多好玩的資料等著我們去應用，學會 Promise 的用法之後更是如虎添翼，當然純前端串接 Opendata 一定會遇到一些安全性或是瀏覽器先天的問題，但相信透過現成技術的輔助和陸續支援，應該會有越來越多的發揮與想像空間。



