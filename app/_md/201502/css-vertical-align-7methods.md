# CSS 垂直置中的七個方法  

![](/img/articles/201502/css-vertical-align-7methods.jpg#preview-img)

之前我有寫過一篇文章：「CSS 垂直置中的三個方法」，介紹了三種常用的垂直置中的小技巧，這篇將延續該篇文章，繼續介紹另外四種垂直置中的方法，如此一來總共就有七種垂直置中的方式可以搭配使用囉！( 雖然現在瀏覽器的支援度都差不多支援了，但仍然建議安全起見都要測試一下，特別是 IE )

> 參考：[CSS 垂直置中的三個方法](http://www.oxxostudio.tw/articles/201408/css-vertical-align.html)

因此，糾竟是哪七種 CSS 垂直置中的方法呢？就是以下這七種的啦！

>- 設定行高 ( line-height ) 
- 添加偽元素
- calc 動態計算
- 使用表格或假裝表格
- transform
- 絕對定位
- 使用 Flexbox

因為「設定行高」、「添加偽元素」以及「calc 動態計算」，在 [CSS 垂直置中的三個方法](http://www.oxxostudio.tw/articles/201408/css-vertical-align.html) 裏頭都介紹過，所以就不在這篇文章詳述，這篇文章主要介紹其他的四種垂直置中的方法。

<br/>

- **使用表格或假裝表格**

	或許有些人會發現，在表格這個 HTML 裡面常用的 DOM 裏頭，要實現垂直置中是相當容易的，只需要下一行`vertical-align:middle`就可以，為什麼呢？最主要的原因就在於 table 的 display 是 table，而 td 的 display 是 table-cell，所以我們除了直接使用表格之外，也可以將要垂直置中元素的父元素的 display 改為 table-cell，就可以輕鬆達成，不過修改 display 有時候也會造成其他樣式屬性的連動影響，需要比較小心使用。( 範例：[css-vertical-align-7methods-demo1.html](/demo/201502/css-vertical-align-7methods-demo1.html) )

	HTML：

		<table>
			<tr>
				<td>
					<div>表格垂直置中</div>
				</td>
			</tr>
		</table>
		<div class="like-table">
			<div>假的表格垂直置中</div>
		</div>

	CSS：

		.like-table{
			display:table-cell;
		}
		td,
		.like-table{
			width:150px;
			height:100px;
			border:1px solid #000;
			vertical-align: middle;
		}
		td div,
		.like-table div{
			width:100px;
			height:50px;
			margin:0 auto;
			color:#fff;
			font-size:12px;
			line-height: 50px;
			text-align: center;
			background:#c00;
		}
		.like-table div{
			background:#069;
		}

	![CSS 垂直置中的七個方法](/img/articles/201502/20150201_1_02.jpg)

<br/>

- **transform**

	transform 是 CSS3 的新屬性，主要掌管元素的變形、旋轉和位移，利用 transform 裏頭的 translateY ( 改變垂直的位移，如果使用百分比為單位，則是以元素本身的長寬為基準 )，搭配元素本身的 top 屬性，就可以做出垂直置中的效果，比較需要注意的地方是，子元素必須要加上`position:relative`，不然就會沒有效果喔。( 範例：[css-vertical-align-7methods-demo2.html](/demo/201502/css-vertical-align-7methods-demo2.html) )

		.use-transform{
			width:200px;
			height:200px;
			border:1px solid #000;
		}
		.use-transform div{
			position: relative;
			width:100px;
			height:50px;
			top:50%;
			transform:translateY(-50%);
			background:#095;
		}

	![CSS 垂直置中的七個方法](/img/articles/201502/20150201_1_03.jpg)

<br/>

- **絕對定位**

	絕對定位就是 CSS 裏頭的`position:absolute`，利用絕對位置來指定，但垂直置中的做法又和我們正統的絕對位置不太相同，是要將上下左右的數值都設為 0，再搭配一個`margin:auto`，就可以辦到垂直置中，不過要特別注意的是，設定絕對定位的子元素，其父元素的 position 必須要指定為 relative 喔！而且絕對定位的元素是會互相覆蓋的，所以如果內容元素較多，可能就會有些問題。( 範例：[css-vertical-align-7methods-demo3.html](/demo/201502/css-vertical-align-7methods-demo3.html) )

		.use-absolute{
			position: relative;
			width:200px;
			height:150px;
			border:1px solid #000;
		}
		.use-absolute div{
			position: absolute;
			width:100px;
			height:50px;
			top:0;
			right:0;
			bottom:0;
			left:0;
			margin:auto;
			background:#f60;
		}

	![CSS 垂直置中的七個方法](/img/articles/201502/20150201_1_04.jpg)

<br/>

- **使用 Flexbox**

	回想一下之前的文章 [深入解析 CSS Flexbox](http://www.oxxostudio.tw/articles/201501/css-flexbox.html)，裡面介紹了 CSS3 最威的盒子模型：Flexbox，使用 align-items 或 align-content 的屬性，輕輕鬆鬆就可以做到垂直置中的效果喔！( 範例：[css-vertical-align-7methods-demo4.html](/demo/201502/css-vertical-align-7methods-demo4.html) )

		.use-flexbox{
			display:flex;
			align-items:center;
			justify-content:center;
			width:200px;
			height:150px;
			border:1px solid #000;
		}
		.use-flexbox div{
			width:100px;
			height:50px;
			background:#099;
		}

	![CSS 垂直置中的七個方法](/img/articles/201502/20150201_1_05.jpg)

<br/>

以上就是一些垂直置中的方法，由於垂直置中往往會動用到修改 display 這個屬性，往往也會在排版上造成一些影響，例如不該用 flexbox 的地方如果用了 flexbox，不該用 table 的地方用了 table，不該用 inline-block 的地方用了 inline-block，後續反而要多寫許多其他的定位樣式來修正，那就有點本末倒置了，因此如何活用這些 CSS 垂直置中的方法，就要端看大家的版面結構而靈活運用囉！^_^

