# 偽元素 ( before 與 after )

最近因為一些網頁的需要，比較深入的使用了「偽元素」( Pseudo Element )，發現原來不只是用用 before 或 after 而已，可以玩的東西還真是不少，所以就來篇文章，把這些比較不常玩的用法紀錄一下。

## 什麼是「偽元素」？

「偽元素」之所以稱作「偽」，除了英文從「Pseudo」翻譯過來之外，就是因為它並不是真正網頁裡的元素，但行為與表現又和真正網頁元素一樣，也可以對其使用 CSS 操控。

跟偽元素類似的還有「偽類」(  Pseudo classes )，在 W3C 的定義裡總共有五個偽元素 ( 其他仍在測試階段 )，分別是`::before`、`::after`、`::first-line`、`::first-letter`和`::selection`，為了和偽類區分，偽元素使用*兩個冒號「::」開頭*，而偽類使用一個冒號「:」開頭 ( 像是 :hover、:target...等 )。

雖然現在的瀏覽器就算寫一個冒號也可以正常運作，不過為了方便區分，用兩個冒號還是比較好的， 而且不論瀏覽器是什麼，`::selection`必須是兩個冒號才能正常運作。

>參考：[MDN Pseudo-elements](https://developer.mozilla.org/zh-TW/docs/Web/CSS/Pseudo-elements)、[偽類 child 和 of-type](http://www.oxxostudio.tw/articles/201405/css-selector.html)

## 認識 ::before 與 ::after

::before、::after 大概是最常使用的偽元素，兩者都是以`display:inline-block`的屬性存在，::before 是在原本的元素「之前」加入內容，::after 則是在原本的元素「之後」加入內容，同時偽元素也會*「繼承」原本元素的屬性*，如果原本文字是黑色，偽元素的文字也會是黑色。

舉例來說，下面這段程式碼，有一個 div 內容是「大家好，我是 div」，使用 ::before、::after 之後，會在原本 div 的前後各添加一段文字，並且讓這兩段文字都呈現紅色。

	div::before{
		content:"我是 before";
		color:red;
	}
	div::after{
		content:"我是 after";
		color:red;
	}

![](/img/articles/201706/pseudo-element-1-01.jpg)

## 實用的 content

上述的內容乍看之下很容易理解，比較需要注意的是*一定要具備 content 的屬性*，就算是只有`content:"";`都可以，因為沒有 content 的偽元素是不會出現在畫面上的，然而 content 是個很特別的屬性，它可以使用 attr 直接獲取內容元素的屬性值 ( attribute )，舉例來說，在 HTML 裡有一個超連結，點擊後會彈出新視窗並連結至 Google：

	<a href="https://www.google.com" target="_blank">google</a>

使用下列的程式碼用法，將會把超連結的 href 內容與 target 內容，透過偽元素一前一後的顯示出來。

	a::before{
	  content: attr(href);
	  color:red;
	}
	a::after{
	  content: attr(target);
	  color:green;
	}

![](/img/articles/201706/pseudo-element-1-02.jpg)

此外 content 內容是可以「*相加*」的，不過用法不像 JavaScript 使用 + 號來相連，而是直接用一個空白鍵就可以不斷的累加下去，以下面的程式碼來說，可以在剛剛擷取的超連結文字後方和 target 屬性前方，加入標點符號。

	a::before{
	  content: "( " attr(href) " ) < ";
	  color:red;
	}
	a::after{
	  content: " > ( " attr(target) " ) ";
	  color:green;
	}

![](/img/articles/201706/pseudo-element-1-03.jpg)

content 甚至可以使用 url 放入圖片圖片的功能，下列的程式碼會呈現出三張圖片。

	div::before{
	  content:url(圖片網址) url(圖片網址) url(圖片網址);
	}

![](/img/articles/201706/pseudo-element-1-04.jpg)

透過 border 的變化，我們可以實現上下左右的三角形，而這個變化同樣也適用於 content，由於我之前已經寫過好幾篇類似的文章，所以在這邊就不多作介紹，有興趣的可以直接參考下面這些文章：

>- [電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html)
- [點擊後的 CSS 載入效果](http://www.oxxostudio.tw/articles/201412/css-click-loading.html)
- [有趣的 CSS 彈跳動畫](http://www.oxxostudio.tw/articles/201502/css-bounce.html)
- [純 CSS 繪製圓餅圖](http://www.oxxostudio.tw/articles/201503/css-pie-chart.html)

## content 搭配 quotes 使用

在 CSS 裡有個不常用的屬性就是 quotes，這是做為定義「*括號格式*」的屬性，也就是如果在一段文字被`<q></q>`包住，這段文字的前後就會出現自定義的括號，而且 quotes 支援巢狀的結構，也就是你可以一層層的寫下去，以下面這段 HTML 文字舉例：

	最外層<q>第一層<q>第二層</q><q>第二層<q>第三層</q></q></q>。

quotes 的屬性如果只寫一層，就會看到只出現一種括號，前後括號使用空白區隔，兩組為一個單位，前後可以不同符號。

	q{
	  quotes: ' < ' ' > ';
	}

![](/img/articles/201706/pseudo-element-1-05.jpg)

如果寫了三層，就會看到出現三種括號，支援把文字當作括號使用。

	q{
	  quotes: ' < ' ' > ' ' ya ' ' ya ' ' ( ' ' ) ' ;
	}

![](/img/articles/201706/pseudo-element-1-06.jpg)

同樣的道理，我們可以應用在 content 裡面，而且透過偽元素已 ::before 和 ::after 已經處於前後的預設位置，甚至不用`<q></q>`就實現前後括號的效果，以下面這段 HTML 文字舉例，把剛剛的 q 全部換成 span：

	最外層<span>第一層<span>第二層</span><span>第二層<span>第三層</span></span></span>。

CSS 的部分比較特別，在偽元素 content 裡使用了 *open-quote ( 啟始括號 ) 和 close-quote ( 結束括號 )* 這兩個有趣的值，換句話說 open-quote 對應到`<q>`，close-quote 對應到`</q>`，此外也由於括號是在偽元素內，就可以指定不同的顏色或樣式了。

	span{
	  quotes: ' < ' ' > ' ' ya ' ' ya ' ' ( ' ' ) ' ;
	}
	span::before{
	  content:open-quote;
	  color:red;
	}
	span::after{
	  content:close-quote;
	  color:#aaa;
	}

![](/img/articles/201706/pseudo-element-1-07.jpg)


## 小結

雖然說偽元素很好用，但偽元素的內容實際上不存在網頁裡 ( 如果打開瀏覽器的開發者工具，是看不到內容的 )，所以如果在裡頭塞了太多的重要的內容，反而會影響到 SEO 的成效，因此對於使用偽元素的定位，還是當作「輔助」性質會比較恰當。

下一篇會繼續介紹 content 的部份玩些特別 ( 比較少用到 ) 的技法。


