# Google 語音辨識 API 

又是因為工作的緣故，接觸到 Google 語音辨識的 api，實在覺得還滿有趣的，由於是 Chrome 內建的功能，所以不需要額外載入其他資源就可以運行，算是相當的便利，不過也很可惜的現在就只有桌上版的 Chrome 才支援，可惜了連 iPhone 和 iPad 都不能跑呀！( 不過我相信未來應該會支援的，畢竟瀏覽器的發展就是這樣咩，而且 iOS 平台的 Google App 也有內建語音辨識呀，但也不太一定，畢竟 iOS 上頭有個 Siri... )

有興趣的人可以先到這個 demo 網站看看：[https://www.google.com/intl/en/chrome/demos/speech.html](https://www.google.com/intl/en/chrome/demos/speech.html)，下拉選單選擇自己要念的語言，按一下右上的麥克風，就可以開始玩語音輸入了。

![Google 語音辨識 API](/img/articles/201509/20150906_1_02.jpg)

接著要來看一下怎麼實作語音辨識，語音辨識一開始要判斷「**webkitSpeechRecognition**」有沒有存在瀏覽器裡，因為這是內建於瀏覽器的 api，從 webkit 的字樣我們也可以知道，Firefox 和 IE 是一定 GG 的，所以一開始的程式可以這樣寫：

	if (!('webkitSpeechRecognition' in window)) {
	  // do something...
	} else {
	  // do something...
	}

<br/>

if 裡面就可以放個 alert 或顯示文字作為警告，重點放在 else 裏頭，一開始我們要先建立 webkitSpeechRecognition 物件，接著我們才可以使用這個物件的屬性來做設定。

	var recognition = new webkitSpeechRecognition();

<br/>

再來我們來瞭解一下有哪些屬性可以用：

- **recognition.continuous=true/false**

	這個屬性是布林值，如果設定為 true，表示除非我們停止辨識，不然就會一直持續的辨識語音轉換為文字，如果設定為 false，在辨識一段話完成之後就會結束辨識。

- **recognition.interimResults=true/false**

	這個屬性也是布林值，如果設定為 true，表示在我們講話的當下就會即時辨識，不然就會在一段話結束之後，才會開始辨識。

- **recognition.lang="語系"**

	設定辨識的語系，如果是講中文，就要設定為「cmn-Hant-TW」，如果是英文，就可以設定為「en-US」，當然 Google 所提供的語系非常多，可以從上面[範例連結](https://www.google.com/intl/en/chrome/demos/speech.html)的原始碼看到對應的語系喔！不過也是因為要連結到 Google 的語系資料庫，所以基本上沒有網路也就無法進行語音辨識了。

- **recognition.onstart=function(){}**

	「開始」辨識的時候要執行什麼函式。

- **recognition.onend=function(){}**

	「停止」辨識的時候要執行什麼函式。

- **recognition.start();**

	「開始辨識」的 API。

- **recognition.stop();**

	「停止辨識」的 API。

- **recognition.onresult=function(event){}**

	當「辨識有結果」的時候，要做什麼事情，這也是進行語音辨識最關鍵的動作，所以我們要來解構一下語音辨識時的結果，首先用下面的範例來看看 event 長怎樣，當我們講話進行辨識的時候，就會印出 event。( 範例：[web-speech-api-demo01.html](/demo/201509/web-speech-api-demo01.html) )

      var recognition = new webkitSpeechRecognition();
      
      recognition.continuous=true;
      recognition.interimResults=true;
      recognition.lang="cmn-Hant-TW";
      
      recognition.onstart=function(){
        console.log('開始辨識...');
      };
      recognition.onend=function(){
        console.log('停止辨識!');
      };
      
      recognition.onresult=function(event){
        console.log(event);
      };
      
      recognition.start(); 	

	![Google 語音辨識 API](/img/articles/201509/20150906_1_03.jpg)

	從印出來的結果可以看到，每一段話之間其實都存在著一個「isFinal」的屬性，這個屬性如果是 true，表示這段話結束，就會把這段話存為一個 result，因此我們可以從這邊發現幾個比較重要的 event 屬性如下：

  - **event.results[i]**
  
    代表辨識了幾段話，每段話都會存在 results 這個陣列裡面，如果要獲取所辨識的值，可以直接用數字從陣列中取出。
  
  - **event.resultIndex **
  
    表示目前辨識的這段語句，處於陣列的第幾個位置，其實跟 index 是很像的。
  
  - **event.results[i].isFinal**
  
    承如上面所說的，等於 true 表示這段話判斷結束，等於 flase 表示還在判斷。( 如果是用手機的瀏覽器，就會都是   false，因此如果要用電腦瀏覽器來模擬手機的辨識狀態，記得要設為 flase )
  
  - **event.results[i][j]**
  
    每個語句所辨識出來的結果，如果我們在一開始把`recognition.interimResults`設為   true，你就會發現同一句的辨識結果會有好幾個，因為在你講話的當下，就會開始進行辨識，如果是   flase，那麼就只會有一個結果。
  
  - **event.results[i][j].transcript **
  
    每個語句所辨識出來的結果文字顯示。
  
  - **event.results[i][ j].confidence**
  
    辨識的可信度，是一個由 0 到 1 的浮點數，表示辨識的準確度。
  
  <br/>
  有了上面的屬性列表，我們就可以做一個即時辨識並把文字顯示在網頁上頭的範例：( 範例：[web-speech-api-demo02.html](/demo/201509/web-speech-api-demo02.html) )

      var show = document.getElementById('show');
      var recognition = new webkitSpeechRecognition();
      
      recognition.continuous=true;
      recognition.interimResults=true;
      recognition.lang="cmn-Hant-TW";
      
      recognition.onstart=function(){
        console.log('開始辨識...');
      };
      recognition.onend=function(){
        console.log('停止辨識!');
      };
      
      recognition.onresult=function(event){
        var i = event.resultIndex;
        var j = event.results[i].length-1;
        show.innerHTML = event.results[i][j].transcript;
      };
      
      recognition.start();  

	![Google 語音辨識 API](/img/articles/201509/20150906_1_03.jpg)

以上就是利用現成的 Chrome 語音辨識 API 的應用實例，記得要使用的時候一定要有網路，而且網路的速度也決定了辨識的速度，畢竟他的運作原理是把我們的聲音錄製即時傳送出去辨識，所以網路越慢來往的時間就會拉大，最後再附上一個我用語音辨識來操控自走車的影片，真的滿有趣的喔！

<iframe width="560" height="315" src="https://www.youtube.com/embed/ERY1ukVxTJM" frameborder="0" allowfullscreen></iframe>
