# 偽元素 ( first-line、first-letter、selection)

除了 ::before 和 ::after，偽元素還有 ::first-line、::first-letter 和 ::selection 這三個，這三個相對來說就簡單得多，用法也較為單純。

## ::first-line

::first-line 顧名思義就是「第一行」，透過這個偽元素可以輕鬆指定文字的第一行，比較需要注意的是 ::first-line *「不能」作用於`display:inline`*的元素。以下面的例子，html 裡有一段文字寫在`<p></p>`裡面。

	<p> 我畢業於台灣藝術大學多媒體動畫藝術研究所，專長是 UI 與 UX 設計、網頁設計...等視覺設計領域，凡是眼睛所見關於「美」的東西，都是我所熱愛與追求的！</p>

CSS 只要這樣寫，呈現出來的第一行就會是綠色的，不論視窗如何縮放，就只有第一行會是綠色的。

	p::first-line{
	  color:green;
	}

![](/img/articles/201706/pseudo-element-4-01.jpg)

## ::first-letter

::first-line 顧名思義就是「第一個字」，透過這個偽元素，可以做出許多文章第一個字放大或變色的效果，我們這裡就用剛剛上面那段文字為例，把第一個字用下列的 CSS 來做變化，就可以看到第一個字放大且變色了。

	p::first-letter{
	  font-weight:bold;
	  font-size:38px;
	  color:red;
	}

![](/img/articles/201706/pseudo-element-4-02.jpg)

雖然把第一個字放大了，但排列上仍然有點亂，所以可以加入`line-height`、`float`或`padding`來進行修正，如此一來就會真的很像報章雜誌會出現的效果了。

	p::first-letter{
	  font-weight:bold;
	  font-size:38px;
	  color:red;
	  line-height:26px;
	  float:left;
	  padding:10px 5px 0 0;
	}

![](/img/articles/201706/pseudo-element-4-03.jpg)

不過很有趣的是，在實作的過程裡，發現「有一些符號」是無法套用 ::first-letter 的，例如「『 {} [] 都不行，但如果後方加上其他文字或符號，又會跟著一起放大...( 到底是怎樣？ )

![](/img/articles/201706/pseudo-element-4-05.jpg)

經過查詢 W3C 的資訊，發現了下面這段話，意思大概就是說網頁裡面有定義一些所謂「*包覆式、點綴式的標點符號*」，如果是這些包覆式的標點符號，基本上就無法放大，反而需要搭配其它字元使用，也因如此，在使用第一個字元變化的時候，就要注意有這種特殊狀況會發生。

> 參考：[https://www.w3.org/TR/CSS21/selector.html#first-letter](https://www.w3.org/TR/CSS21/selector.html#first-letter)

![](/img/articles/201706/pseudo-element-4-04.jpg)

## ::selection

::selection 是個十分常見的偽元素，它就是負責一段選取文字的效果，以下面這段 CSS 來說，選取後的文字，就會是深色背景，黃色文字。

	p::selection{
	  color:yellow;
	  background:#543;
	}

![](/img/articles/201706/pseudo-element-4-06.jpg)


## 小結

連續四篇深入的介紹了偽元素的用法，雖然說大部分的時候用不太到，但某些時候也不失為強化網頁效果、或是優化網頁程式碼的好方法。

> - [偽元素 ( before 與 after )](pseudo-element-1.html#_top)
- [偽元素 ( content 與 counter )](pseudo-element-2.html#_top)
- [偽元素 ( JavaScript 操控 )](pseudo-element-3.html#_top)
- [偽元素 ( first-line、first-letter、selection)](pseudo-element-4.html#_top)

