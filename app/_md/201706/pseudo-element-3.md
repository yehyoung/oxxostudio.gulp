# 偽元素 ( JavaScript 操控 )

由於偽元素不存在於網頁元素內，所以 JavaScript 無法透過正規操控 DOM 的方式來修改或控制，不過 JavaScript 身為一個神通廣大的程式語言，仍然是有方法可以辦到的。

## 讀取偽元素屬性

一般來說使用 JavaScript 讀取某個元素 DOM 裡頭的屬性不難，但相對來說要讀取一個不存在網頁裡的元素就不容易，如果要讀取偽元素屬性，可以透過`getComputedStyle`來獲得，`getComputedStyle`是個可以獲取當前元素「所有最終使用的 CSS 屬性值」，讀取後會返回一個 Object CSSStyleDeclaration，而這個物件是唯讀的，無法進行修改。

>使用方法：`window.getComputedStyle('元素', '偽元素')`

舉例來說 html 放入一個 div 以及一個 span，待會會用這個 span 來顯示 div 的 ::before 屬性。

	<div id="d">我是 div</div>
	<span id="s"></span>

CSS 的部分指定偽元素的 content 和 color。

	#d::before{
	  content:'偽元素的 content ';
	  color:red;
	}

JavaScript 使用`window.getComputedStyle(d,'::before')`獲取 div 裡頭偽元素最終使用的 style，然後顯示在 span 裡面。

	var d = document.getElementById('d');
	var s = document.getElementById('s');
	var b = window.getComputedStyle(d,'::before');
	s.innerHTML = b.content +'<br/>'+b.color;

最後呈現的結果，第一段就是原本的 div 加上紅色的偽元素文字，下方第一段是 content 的內容，緊接著是偽元素的顏色屬性。

![](/img/articles/201706/pseudo-element-3-01.jpg)


## 修改偽元素屬性

可以讀取屬性值也就一定要嘗試修改，不過修改偽元素的屬性其實比想像的不容易，必須透過`insertRule`這個方法在指定的 style 裡插入「預設的規則」，讓這個規則去影響偽元素的屬性表現。

>用法：`style 標籤元素.insertRule(樣式規則, 0)`

舉例來說我們的網頁長相如下，一開始開頭的部分有兩組 style，第一組是我們賦予元素的樣式屬性，第二組則是要來定義規則的 style，因為要加入規則，所以讓第二組 style 有一個 id。至於 html 就放入一個 div。

	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width">
	  <title>JS Bin</title>
	  <style>
	    #d::before{
	      content:'偽元素的 content ';
	      color:red;
	    }
	  </style>
	  <style id="css"></style>
	</head>
	<body>
	  <div id="d">我是 div</div>
	</body>
	</html>

在完全沒有撰寫 JavaScript 的狀態，應該會呈現如下圖的樣子：

![](/img/articles/201706/pseudo-element-3-02.jpg)

JavaScript 開始先用一個變數 css，透過 id 抓取 style，然後使用在指定一個變數給`css.sheet`，就可以透過`insertRule`的方法修改了。這邊比較需要注意的是，由於*規則加入時會放在整串 style 的開頭 ( 第二個值預設 0 )，所以純粹使用一個`#d`是無法覆蓋原本的屬性 ( CSS 權重問題 )*，所以這邊使用`#d#d`兩次，就可以在權重上壓過原本的屬性。( 當然如果要用`!important`也是可以 )

	var css = document.getElementById('css');
	var d = document.getElementById('d');
	var c = css.sheet;
	c.insertRule("#d#d::before{content:'我是修改的 content ';}", 0);
	c.insertRule("#d#d::before{color:blue;}", 0);

如此一來，呈現出來的樣貌就會是透過 JavaScript 修改的。

![](/img/articles/201706/pseudo-element-3-03.jpg)


## 修改偽元素 content

我們知道 ::before 和 ::after 的 content 可以透過 attr 抓取父元素的舉屬性，因此透過改變這個屬性，就能連帶改變 content 的內容，舉例來說有個 div，我們指定它的`data-text="我是預設文字"`，然後放兩個按鈕，期望點選不同的按鈕，會更換 content 不同的內容。

	<button id="b1">顯示 ABC</button>
	<button id="b2">顯示 123</button>
	<div data-text="我是預設文字">我是 div</div>

接著設定 CSS，關鍵在使用 content 的`attr`，讓偽元素直接顯示父元素屬性的內容。

	button{
	  font-size:16px;
	}
	div{
	  margin:10px;
	  font-size:20px;
	}
	div::before{
	  content: attr(data-text) '，';
	}

最後就是 JavaScript 的部分，透過`setAttribute`變更 div 的屬性，就會看到 content 的內容跟著做更換了。

	var b1 = document.getElementById('b1');
	var b2 = document.getElementById('b2');
	var d = document.querySelector('div');

	b1.addEventListener('click',function(){
	  d.setAttribute('data-text','ABC');
	});
	b2.addEventListener('click',function(){
	  d.setAttribute('data-text','123');
	});

![](/img/articles/201706/pseudo-element-3-01.gif)



## 小結

雖然說我們可以透過 JavaScript 來操控偽元素，但偽元素終究不是真正的網頁元素，也因此操作起來也不如基本操作網頁元素 DOM 來的簡便，所以如果可以，還是盡量用正常的操控模式吧。


