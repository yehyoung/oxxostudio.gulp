# FIGlet - ASCII Decorator 

早在十幾年前玩 BBS 的時候 ( 暴露年紀了 )，就已經開始玩許多利用文字與線條組成的圖形，當時甚也用 ASCII 色碼來表現顏色，真是令人不勝懷念，然而到了今時今日，因為 SublimeText 的緣故，竟然又接觸到了類似的技術，因此找了一些相關的資訊，用這篇文章做個紀錄的分享。

首先談到這種字體的由來，它其實有幾個固定名稱，幾種比較主要的稱呼分別是：「ASCII TEXT」、「ASCII TEXT Banner」、「ASCII Art」、「ASCII Decorator」和「FIGlet」，「FIGlet」這個詞應該是最標準的用法，因為這個詞可是在維基百科上頭有介紹的 ( [https://en.wikipedia.org/wiki/FIGlet](https://en.wikipedia.org/wiki/FIGlet) )，而「FIGlet」源自於 Frank、Ian 和 Glen 的信，應該就是他們當初在寫信的時候加上去的一些字體藝術 ( 參考：[http://www.figlet.org/faq.html](http://www.figlet.org/faq.html) )

![](/img/articles/201508/20150808_1_04.jpg)

除了字體，其實也有不少轉換圖片為 ASCII 的工具和軟體，有興趣的人可以參考：[ASCII Art](https://en.wikipedia.org/wiki/ASCII_art)，或是用這個網站：[http://picascii.com/](http://picascii.com/) 體驗一下，總之相關作法其實都類似，過去我們要花很多時間做這些文字與符號的編排，現在則是靠程式來幫我們完成。

![](/img/articles/201508/20150808_1_05.jpg)

接著談到為什麼在 SublimeText 裡頭會用到文字與線條組成的圖形，主要因為 SublimeText 的右側有一個區塊負責顯示程式碼的縮圖，當今天程式碼非常多行的時候，就可以利用這種特殊的「大型字體」來分隔，同時在右側因為縮圖的關係就會變成是較為清晰的「小字」，往後要查找個別區塊就可以直接利用縮圖查找，非常的方便和迅速。

![](/img/articles/201508/20150808_1_02.jpg)

而我一開始用的時候，我其實是找了這個網站：[http://www.network-science.de/ascii/](http://www.network-science.de/ascii/) 來幫忙，只要輸入文字，按下「do it」，就會自動幫我轉換出來。

![](/img/articles/201508/20150808_1_06.jpg)

後來學聰明直接用套件來完成，因為在 SublimeText 裡頭有趣的套件，就叫做：**ASCII-Decorator**，有興趣的人可以直接安裝，或從 Github 上頭下載 ( [https://github.com/viisual/ASCII-Decorator](https://github.com/viisual/ASCII-Decorator) ) ，安裝之後，只要選取需要變成 ASCII Decorator 字體的文字，按下`cammand (ctrl) + shift + k`就可以進行轉換，而我們也可以再套件的 user 設定裡，設定轉換的字體，個人推薦「Roman」字體，相當的清晰。

![](/img/articles/201508/20150808_1_03.jpg)

做的這邊貌似結束了，但是身為一個充滿創意和好奇心的前端工程師，一定要再追根究底看看能不能自己做出一個打字就自己產生圖形的網頁，所以就開始找看看有沒有現成的 js 可以使用，不找還好，一找發現其實還滿多人做的，不過大多都是在 node.js 的環境運行居多，此外也有滿多其他開發語言，於是我就選擇了在 npm 上頭更新頻率還滿高的這個：figlet ( [https://www.npmjs.com/package/figlet#horizontallayout](https://www.npmjs.com/package/figlet#horizontallayout) )，不過因為我只是要純粹用在網頁上，我就只使用了它的`figlet.js`和`fonts`資料庫。

![](/img/articles/201508/20150808_1_07.jpg)

用在網頁裡其實沒有太大的難度，照著步驟進行就可以，重點是因為他有用到 jQuery，所以 jQuery 變成一定要載入，程式碼如下，`inputText`是要放進去的文字，第二個屬性是字體，再來是要執行的 function。

	<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="figlet.js"></script>
	    
	<script>
	 
	  figlet(inputText, 'Standard', function(err, text) {
	      if (err) {
	          console.log('something went wrong...');
	          console.dir(err);
	          return;
	      }
	      console.log(text);
	  });
	 
	</script> 

<br/>

所以我就照著他的作法做了一個網頁，字體庫就直接用它附帶的 fonts 資料夾即可，或是也可以直接到 figlet 的網站看看 ( [http://www.figlet.org/fontdb.cgi](http://www.figlet.org/fontdb.cgi) )，不過我想要做的是直接輸入就可以變換內容，直接點選字體就可以變換字體，所以改成以下這樣：

	$(function(){
	  var inputText = $('#textInput')[0].value;
	  var font = 'Basic';

	  decorator(inputText, font);

	  function decorator(input, font) {
	    figlet(inputText, font, function(err, text) {
	      if (err) {
	        console.log('something went wrong...');
	        console.dir(err);
	        return;
	      }
	      $('#show').html(text);
	    });
	  }

	  $('#select div').on('click',function(e){
	  	$('#select div').attr('class','');
	  	e.target.setAttribute('class','selected');
	  	font = e.target.innerHTML;
	  	decorator(inputText, font);
	  });
	  $('#textInput').on('keyup', function(e) {
	  	inputText = e.target.value;
	  	decorator(inputText, font);
	  });
	});

<br/>

所以就做出來了這個簡單的網頁：[http://www.oxxostudio.tw/figlet/](http://www.oxxostudio.tw/figlet/)，不過如果要在網頁呈現，還要千萬要記住下面兩個重點：

- **字體使用等寬字體 Monospaced Font**

	因為產生的字體是使用各種符號組成，如果沒有使用等寬字，出來的形狀就會因為字元的寬度不同而錯位，有需要等寬字的朋友其實 google 搜尋一下，找 google fonts 裡面的可以囉 ( [https://goo.gl/paq3QJ](https://goo.gl/paq3QJ) )

- **HTML 的空白字元保留**

	有做過網頁的都知道，HTML 裡頭的空白字元會被自動刪除，所以連續空白只會留下一個，但這點對於要用到很多空白來排列的 ASCII 文字就很頭痛了，所以我們要利用 CSS 的`white-space`來把空白保留，只要我們把`white-space`設為`pre`就可以完美解決。( CSS 不熟的可以參考：[CSS white-space](http://www.w3school.com.cn/cssref/pr_text_white-space.asp) )

![](/img/articles/201508/20150808_1_08.jpg)

最後提供這次找的一些參考資訊，也是今天颱風天的一點小小練習，颱風天就是要寫程式呀，不然要幹麻~ XD 

- FIGlet wiki：[https://en.wikipedia.org/wiki/FIGlet#cite_note-4](https://en.wikipedia.org/wiki/FIGlet#cite_note-4)
- FIGlet：[http://www.figlet.org/faq.html](http://www.figlet.org/faq.html)
- FIGlet npm：[https://www.npmjs.com/package/figlet#horizontallayout](https://www.npmjs.com/package/figlet#horizontallayout)
- ASCII Art wiki：[https://en.wikipedia.org/wiki/ASCII_art](https://en.wikipedia.org/wiki/ASCII_art)
- ASCII generator：[http://www.network-science.de/ascii/](http://www.network-science.de/ascii/)
- ASCII Decorator npm：[https://github.com/viisual/ASCII-Decorator/tree/master/pyfiglet](https://github.com/viisual/ASCII-Decorator/tree/master/pyfiglet)
- Picascii：[hhttp://picascii.com/](http://picascii.com/)
- FIGlet：[https://en.wikipedia.org/wiki/FIGlet#cite_note-4](https://en.wikipedia.org/wiki/FIGlet#cite_note-4)

