# CSS 搞怪的 text-decoration  

![](/img/articles/201501/css-text-decoration.jpg#preview-img)

自己從出社會工作開始，CSS 一定會出現在每個大大小小不同的專案裏頭，真可以說是吃飯的工具無誤，但今天在改一個專案的時候卻遇到了一個莫名其妙的屬性：text-decoration，這個屬性，其實就只是用來把一段文字加上上橫線、刪除線或底線的屬性罷了，通常會用在移除超連結的底線、或一些特殊強調的效果裏頭，但是這麼容易的屬性，為什麼會莫名其妙呢？就讓我們繼續看下去~

在我的專案裏頭遇到的問題如下，一個 div 裏頭包了一個 span，我要「**除了這個 span 之外，其他所有的文字都有底線**」，通常看到這個問題一定覺得很簡單，只要照下面的 CSS 寫法一定可以達成：

	div{
		font-size:20px;
		text-decoration: underline;
	}
	div span{
		text-decoration: none;
	}

理論上應該前一段會有底線，後一段會沒有底線，但是實際上卻是一條底線通到底.....( 範例：[css-text-decoration-demo1.html](/demo/201501/css-text-decoration-demo1.html) )

![CSS 搞怪的 text-decoration](/img/articles/201501/20150113_2_02.jpg)

<br/>
不過我不信邪，怕是哪裡 CSS 權重出了問題 ( 參考 [CSS Specificity](http://www.oxxostudio.tw/articles/201405/css-specificity.html) )，直接加上萬惡的 important 試試看，結果發現結果還是一模一樣！天呀！是見到鬼了嗎！( 範例：[css-text-decoration-demo2.html](/demo/201501/css-text-decoration-demo2.html) )

	div{
		font-size:20px;
		text-decoration: underline;
	}
	div span{
		text-decoration: none!important;
	}

![CSS 搞怪的 text-decoration](/img/articles/201501/20150113_2_02.jpg)

<br/>
由於實在是太詭異了，必須要查明原因，於是我換個角度思考，來改一下顏色試試看吧！一改才發現不得了，為什麼底線會是紅色的呀？！( 範例：[css-text-decoration-demo3.html](/demo/201501/css-text-decoration-demo3.html) )

	div{
		font-size:20px;
		color:#f00;
		text-decoration: underline;
	}
	div span{
		color:#00f;
		text-decoration: none!important;
	}

![CSS 搞怪的 text-decoration](/img/articles/201501/20150113_2_03.jpg)

<br/>
看到這邊我已經大概知道原因了，最有可能的原因應該就是出在 text-decoration 這個屬性的定義，經過一番追根究柢，總算看到 [W3C 的說法](http://www.w3.org/TR/CSS21/text.html#lining-striking-props)，主要是因為 text-decoration 會把**整個父元素加上底線**，而整個父元素，當然就包含了子元素，因為同樣顏色的緣故，就以為子元素也被加上底線了，( 實際上子元素沒有被加上底線 )，不過後來又看了這個專門分析兼容性問題的網站 [說明](http://w3help.org/zh-cn/causes/RT3002)，其實 text-decoration 會根據不同的 display 屬性，而決定父元素的底線是否延伸，舉例來說吧！如果今天我把 span 的 display 改成 inline-block，就會得到不同的結果：( 範例：[css-text-decoration-demo4.html](/demo/201501/css-text-decoration-demo4.html) )

	div{
		font-size:20px;
		color:#f00;
		text-decoration: underline;
	}
	div span{
		display:inline-block;
		color:#00f;
		text-decoration: none!important;
	}

![CSS 搞怪的 text-decoration](/img/articles/201501/20150113_2_04.jpg)

<br/>
不過由於各家瀏覽器的渲染不同，加上已經明白了箇中原理，這裡就不做太多的測試，只要記得下次如果又遇到這種問題，可能就是父元素和子元素互相干擾所造成，自己也要特別留心。最後，好像也可以利用這種方法，做出莫名其妙的效果...( 範例：[css-text-decoration-demo5.html](/demo/201501/css-text-decoration-demo5.html) )

HTML

	<div>
		<span><span><span>真是很莫名其妙的效果<span></span></span>
	</div>

CSS

	div{
		font-size:30px;
		color:#f00;
		text-decoration:overline;
	}
	div span{
		color:#00f;
		text-decoration: line-through;
	}
	div span span{
		color:#0f0;
		text-decoration: underline;
	}
	div span span span{
		color:#000;
		text-decoration: none;
	}

![CSS 搞怪的 text-decoration](/img/articles/201501/20150113_2_05.jpg)
