# 點選自動複製 ( ZeroClipboard )  

自從用了 Github 開始，一直都覺得它裏頭複製網址的方法做得很好，只需要點一個按鈕就可以複製 ( 也有可能因為文字欄位太短才用這種方式 )，仔細看了一下它怎麼寫的，發現上面用 div 疊了一層 flash 的 swf ，百般不思其解的狀態下找了一些資料，發現原來不能用純 javascript 的方法來做是因為瀏覽器的安全性限制，不能夠單純用前端存取剪貼簿的資料，所以才會用 flash 作為介接。

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_02.jpg)

再仔細看看 Github 用了甚麼套件，發現它是使用一套名為「**ZeroClipboard**」的純 javascript 插件，主要是在需要點選自動複製的按鈕上方，覆蓋了一層 flash 的 swf，藉由點擊這個 flash 的事件，完成剪貼簿的複製和貼上，實際的運作原理我們就一一看下去。

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_04.jpg)

<br/>
先列出 ZeroClipboard 的 [官方網站](http://zeroclipboard.org/) 和 [Github](https://github.com/zeroclipboard/zeroclipboard)，內容其實有不少的 API 可以供大家使用，這裡就不一一贅述，只把基本常用的功能列出，相信對於單純需要「自動複製貼上」的情境，應該就已經綽綽有餘。( 換句話說現在除了 Github，真的很少見到有人這樣用呀，畢竟手機上不支援 flash 是一大隱憂 )

要實作之前，有一個前置作業要做，就是電腦上必須要有安裝 IIS 或 Apache 的 http 伺服器，同時藉由伺服器來瀏覽 ( 當然在這邊點選範例就不用，因為已經是網頁伺服器的環境 )，如果沒有透過伺服器瀏覽網頁，flash 的作用將會失效，至於要如何安裝呢？建議可以下載 MAMP ( [http://www.mamp.info/en/](http://www.mamp.info/en/) ) 這套在 Mac 與 Windows 都相當好用的一鍵架站軟體，下載免費版的就很好用囉！

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_05.jpg)

有了 http 的伺服器環境之後，接著就是要去 ZeroClipboard 的 [Github](https://github.com/zeroclipboard/zeroclipboard) 把整包給下載下來，裏頭有兩個檔案最為重要，一個是 ZeroClipboard.js，另一個就是 ZeroClipboard.swf，ZeroClipboard.js 是在一開始引入的 js，ZeroClipboard.swf 則是要和「**和 ZeroClipboard.js 放在同一個目錄**」的 swf 檔，當然也不一定要在同一個目錄下，只需要去修改 ZeroClipboard.js 裏頭的`swfPath`即可，這在後續會介紹。

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_06.jpg)

再來就是介紹如何使用，當我們引入 jquery 和 ZeroClipboard.js 之後，要先宣告一個 ZeroClipboard 物件，如此一來才能使用它的 API。( 參考 [ZeroClipboard 說明文件](https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#a-more-complete-example) )

HTML：

	<button class="clipboard" data-clipboard-text="12345">點我複製</button>
	<textarea></textarea>

JS：

	$(function(){
		var client = new ZeroClipboard($(".clipboard"));
		});

<br/>
上面的 HTML 我多放了一個 textarea，目的就是複製之後可以直接貼上，大家可以點選這個範例： [zeroclipboard-demo1.html](/demo/201501/zeroclipboard-demo1.html),實際感受一下複製貼上，同時也可以在按鈕上面按右鍵，就會發現它上面多了一層 flash。

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_07.jpg)

箇中原理其實就在於這段：`data-clipboard-text="12345"`，我們把要複製到剪貼簿的文字寫在裡面，點選之後就會把這段字複製起來，不過，總是不能所有東西都寫在裏頭，還是必須有寫在外面的時候，這時就必須用到 `data-clipboard-target`，裡面放上要複製區域的 id，就可以進行複製。( 範例： [zeroclipboard-demo2.html](/demo/201501/zeroclipboard-demo2.html) )

HTML：

	輸入要複製的內容：
	<br/>
	<textarea id="text"></textarea>
	<br/>
	<br/>
	<button class="clipboard" data-clipboard-target="text">點我複製</button>
	<br/>
	<br/>
	貼上測試：
	<br/>
	<textarea id="text"></textarea>

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_08.jpg)

<br/>
以上就是非常簡單就可以使用 ZeroClipboard.js 的作法，當然如果你 CSS 夠強，其實也可以利用 [偽元素](http://www.oxxostudio.tw/articles/201407/css-clock.html) 做出對話框的效果囉！( 範例： [zeroclipboard-demo3.html](/demo/201501/zeroclipboard-demo3.html) )

HTML：

	<button class="clipboard" data-clipboard-text="12345" data-hover="複製：12345" data-copied="複製完成！">點我複製</button>
	<br/>
	<br/>
	<br/> 貼上測試：
	<br/>
	<textarea id="text"></textarea>

CSS：

	.ho {
	  position: relative;
	}
	.ho::before {
	  content: attr(data-hover);  /*讀取 HTML5 的 data-attribute*/
	  position: absolute;
	  top: 26px;
	  width:60px;
	  padding: 5px 10px;
	  font-size: 12px;
	  color: #fff;
	  background: rgba(0, 0, 0, .5);
	  box-shadow: rgba(0, 0, 0, .4) 2px 2px 5px;
	}
	.ho::after {
	  content: '';
	  position: absolute;
	  top: 14px;
	  left: 10px;
	  border-top: 6px solid rgba(0, 0, 0, 0);
	  border-right: 6px solid rgba(0, 0, 0, 0);
	  border-bottom: 6px solid rgba(0, 0, 0, .5);
	  border-left: 6px solid rgba(0, 0, 0, 0);
	}
	.ho.copied::before{
	  content: attr(data-copied);   /*讀取 HTML5 的 data-attribute*/
	}

JS：

	$(function() {
	  var client = new ZeroClipboard($(".clipboard"));
	
	  $('.clipboard').hover(function() {
	    $(this).addClass('ho');
	  }, function() {
	    $(this).removeClass('ho').removeClass('copied');
	  });
	
	  client.on('aftercopy', function(event) {  //套用 aftercopy 的 api
	    $('.clipboard').addClass('copied');
	  });
	});

![點選自動複製 ( ZeroClipboard )](/img/articles/201501/20150126_1_09.jpg)

<br/>
上面個範例的做法，有用到一些 HTML5 與 CSS 的小技巧，就是**利用 CSS 偽元素的`content`的屬性**，自動讀取 HTML5 裏頭的 data-attribute，就可以做到在不用撰寫 JS 的情形下，自動把 HTML5 的內容帶入 CSS 裏頭呈現。當然最後寫的 JS 只是在點擊上做了點小小的判斷而已，相信大家如果熟練，就可以很簡單的做出「點選自動複製」的按鈕囉！

<br/>
最後，忘記剛剛說要補充`swfPath`要從哪裡修改，以我的 blog 為例，打開 ZeroClipboard.js，搜尋「swfPath」，可以看到這一段，從這段就可以修改 swfPath 囉！如果沒有修改的話，記得要將 swf 的檔案和 ZeroClipboard.js 放在同一個目錄，就可以正確運作。

	  var _globalConfig = {
	    swfPath: _getDefaultSwfPath(),
	    trustedDomains: window.location.host ? [ window.location.host ] : [],
	    cacheBust: true,
	    forceEnhancedClipboard: false,
	    flashLoadTimeout: 3e4,
	    autoActivate: true,
	    bubbleEvents: true,
	    containerId: "global-zeroclipboard-html-bridge",
	    containerClass: "global-zeroclipboard-container",
	    swfObjectId: "global-zeroclipboard-flash-bridge",
	    hoverClass: "zeroclipboard-is-hover",
	    activeClass: "zeroclipboard-is-active",
	    forceHandCursor: false,
	    title: null,
	    zIndex: 999999999
	  };

<Br/>
以上，就是自動點選複製按鈕的做法，雖然用到的機會不多，但多一個小步驟，可以讓使用者省掉全選複製的手續，也是個不錯的使用者體驗。( 不過到手機上就一定 GG 了哈哈！ )

