# 自動選取某個區域的文字 

最近在工作上需要一個功能，就是點選一個按鈕可以全選某個區域內的文字，由於，找了一些解法大多都是針對文 input 的 text 或 textarea 所設計，，後來總算是在 Stack Overflow 發現了完美的解法，根據這個解法我就做出來了可以選取特定區域文字的範例。 

> 範例：[select-text-demo01.html](/demo/201508/select-text-demo01.html)

> 參考：[http://goo.gl/uAHGuS](http://goo.gl/uAHGuS)  

HTML：

	<div id="textA">點選 A 會選取我</div>
	<div id="textB">點選 B 會選取我</div>
	<button id="btnA">按鈕 A</button>
	<button id="btnB">按鈕 B</button>

javascript：

	function SelectText(element) {
	  var doc = document,
	    text = doc.getElementById(element),
	    range, selection;
	  if (doc.body.createTextRange) {
	    range = document.body.createTextRange();
	    range.moveToElementText(text);
	    range.select();
	  } else if (window.getSelection) {
	    selection = window.getSelection();
	    range = document.createRange();
	    range.selectNodeContents(text);
	    selection.removeAllRanges();
	    selection.addRange(range);
	  }
	}

	document.getElementById('btnA').addEventListener('click', function() {
	  SelectText('textA');
	});
	document.getElementById('btnB').addEventListener('click', function() {
	  SelectText('textB');
	});

<br/>
判斷式裡的`createTextRange`只有 IE 支援，所以上面這段程式碼之所以要加上判斷，主要也是區分瀏覽器使用，因為自己不用 IE 也沒辦法測試 ( mac 沒有 IE )，所以就直接忽略第一個判斷式裡頭的東西。

再來可能是自己 javascript 見識淺薄，第一次看到`getSelection()`與`createRange()`這兩個方法，`getSelection()`目的在返回一個 selection 對象開始選取，而`createRange()`則定義了一個範圍 range，在上面的範例裏，使用了`selectNodeContents()`的方法，讓我們可以全選指定的 DOM 內的文字 ( 應該說選取整個指定的 DOM )。

除了全選，我們也可以使用`setStart()`以及`setEnd()`的方法，指定要選取的文字，不過因為這兩個方法是針對「節點 Node」的操作，所以放在裡面的，就是我們要選擇節點，以及從這個節點起算的第幾個字元，因為我們要獲取文字，所以，可以參考以下的程式碼，當我們按下 A 的按鈕，第一行會有部分文字被選取起來，當我們按下 B 的按鈕，換成第二行有部分文字被選取起來。   
( 範例：[select-text-demo02.html](/demo/201508/select-text-demo02.html) )

	function SelectText(element) {
	  var doc = document,
	    text = doc.getElementById(element),
	    range,
	    selection;
	  if (doc.body.createTextRange) {
	    range = document.body.createTextRange();
	    range.moveToElementText(text);
	    range.select();
	  } else if (window.getSelection) {
	    selection = window.getSelection();
	    range = document.createRange();
	    if (element == 'textA') {
	      range.setStart(text.firstChild, 1);
	      range.setEnd(text.firstChild, 7);
	    }
	    if (element == 'textB') {
	      range.setStart(text.firstChild, 5);
	      range.setEnd(text.firstChild, 8);
	    }
	    selection.removeAllRanges();
	    selection.addRange(range);
	  }
	}

	document.getElementById('btnA').addEventListener('click', function() {
	  SelectText('textA');
	});
	document.getElementById('btnB').addEventListener('click', function() {
	  SelectText('textB');
	});

<br/>

除了純粹的選取之外，我們也可以使用`cloneContents()`的方法來同時複製並貼上，使用`deleteContents()`來刪除，使用`extractContents()`同時剪下並貼上 ( 移動 )，下面的範例做出三個按鈕，分別套用這三個方法。( 範例：[select-text-demo03.html](/demo/201508/select-text-demo03.html) )

	var p = document.getElementById('p');

	function SelectText(element, check) {
	  var doc = document,
	    text = doc.getElementById(element),
	    range,
	    selection;
	  if (doc.body.createTextRange) {
	    range = document.body.createTextRange();
	    range.moveToElementText(text);
	    range.select();
	  } else if (window.getSelection) {
	    selection = window.getSelection();
	    range = document.createRange();
	    range.setStart(text.firstChild, 1);
	    range.setEnd(text.firstChild, 5);
	    if (check == 'A') {
	      var oFragment = range.cloneContents();
	    }
	    if (check == 'B') {
	      var oFragment = range.extractContents();
	    }
	    if (check == 'C') {
	      var oFragment = range.deleteContents();
	    }
	    p.appendChild(oFragment);
	    selection.removeAllRanges();
	    selection.addRange(range);
	  }
	}

	document.getElementById('btnA').addEventListener('click', function() {
	  SelectText('text', 'A');
	});
	document.getElementById('btnB').addEventListener('click', function() {
	  SelectText('text', 'B');
	});
	document.getElementById('btnC').addEventListener('click', function() {
	  SelectText('text', 'C');
	});

<br/>

在實作第三個範例的時候，為了要使用`innerHTML`還是`appendChild`讓我有點頭疼，因為這邊 range 返回的是 node 對象，如果我們使用`innerHTML`就會發現出來的是節點的代碼，而並非相對應的內容文字，而使用`appendChild`是把整個節點放進去，自然就會是內容文字了，這邊其實不是很好理解，找了很多文章總算是有以下這個結論，我想這也應該是我 javascript 沒有深入學好才會出現這種問題吧！

DOM 的三種節點：

- **元素節點**：element node，各種標籤便是這些元素節點的名稱，元素節點可以包含其他元素，唯一沒有被包含只有根元素`<html>`。
- **屬性節點**：attribute node，屬性節點總是被包含在元素節點之中，例如：`<a href="網址">連結文字</a>`，a 是元素節點名稱，href 是屬性節點名稱。
- **文字節點**：text node，標籤裡具體的文字內容，網頁最終目的是向使用者展示內容。

<br/>

最後附上這一篇文章我的參考資料：

>- [JAVASCRIPT - W3C DOM簡介](http://blog.kkbruce.net/2012/02/javascript-w3c-dom.html#.VdHiKVOqqkp)
- [Javascript标准DOM Range操作](http://www.cnblogs.com/rainman/archive/2011/02/28/1967488.html)
- [MDN Window.getSelection](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)
- [Selecting text in an element](http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse/987376#987376)


