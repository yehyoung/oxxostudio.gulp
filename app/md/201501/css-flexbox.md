<!-- @@master  = ../../_layout.html-->

<!-- @@block  =  jsBottom-->

<include src="../../_articles-js.html"></include>

<!-- @@close-->

<!-- @@block  =  css-->

<include src="../../_articles-css.html"></include>

<!-- @@close-->

<!-- @@block  =  articles-social-->

<include src="../../_articles-social.html"></include>

<!-- @@close-->

<!-- @@block  =  articles-footer-->

<include src="../../_articles.html"></include>

<!-- @@close-->

<!-- @@block  =  meta-->

<meta property="article:published_time" content="2015-01-30T23:55:00+01:00">

<meta name="keywords" content="css3,flex,flexbox">

<meta name="description" content="Flexbox 是一個 CSS3 的盒子模型 ( box model )，顧名思義它就是一個靈活的盒子 ( Flexible Box )，為什麼最近這個屬性才紅起來呢？最主要也是因為 CSS3 的規範終於普及 ( 或 IE 終於敗亡 )，加上行動裝置的發展促成了響應式布局興起，自適應長寬彈性相當大的 Flexbox 就趁勢而起了。">

<meta itemprop="name" content="深入解析 CSS Flexbox - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201501/20150130_1_01b.jpg">

<meta itemprop="description" content="Flexbox 是一個 CSS3 的盒子模型 ( box model )，顧名思義它就是一個靈活的盒子 ( Flexible Box )，為什麼最近這個屬性才紅起來呢？最主要也是因為 CSS3 的規範終於普及 ( 或 IE 終於敗亡 )，加上行動裝置的發展促成了響應式布局興起，自適應長寬彈性相當大的 Flexbox 就趁勢而起了。">

<meta property="og:title" content="深入解析 CSS Flexbox - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201501/css-flexbox.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201501/20150130_1_01b.jpg">

<meta property="og:description" content="Flexbox 是一個 CSS3 的盒子模型 ( box model )，顧名思義它就是一個靈活的盒子 ( Flexible Box )，為什麼最近這個屬性才紅起來呢？最主要也是因為 CSS3 的規範終於普及 ( 或 IE 終於敗亡 )，加上行動裝置的發展促成了響應式布局興起，自適應長寬彈性相當大的 Flexbox 就趁勢而起了。">

<title>深入解析 CSS Flexbox - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##深入解析 CSS Flexbox  <span class="article-date" tag="css"><i></i>JAN 30, 2015</span>

Flexbox 是一個 CSS3 的盒子模型 ( box model )，顧名思義它就是一個靈活的盒子 ( Flexible Box )，為什麼最近這個屬性才紅起來呢？最主要也是因為 CSS3 的規範終於普及 ( 或 IE 終於敗亡 )，加上行動裝置的發展促成了響應式布局興起，自適應長寬彈性相當大的 Flexbox 就趁勢而起了。 

第一步要來看 Flexbox 的盒子模型，根據 [W3C](http://www.w3.org/TR/css3-flexbox/#box-model) 文章所描述，flex 的盒子模型如下圖所呈現，與一般的盒子模型不同的地方，在於 Flexbox 的盒子模型具有**水平的起點與終點** ( main start、main end )，**垂直的起點與終點** ( cross start、cross end )，**水平軸與垂直軸** ( main axis、cross axis )，然後元素具有**水平尺寸與垂直尺寸** ( main size、cross size )，這些都是相當重要的布局規畫。

![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_02.jpg)

再來我們先看看 Flexbox 有哪些屬性，也可參考 [W3C css3 flexbox css3-flexbox](http://www.w3.org/TR/css3-flexbox/#property-index)：

>- display 
- flex-direction 
- justify-content
- align-items
- align-self
- align-content
- flex-wrap
- order
- flex

<br/>

- **display**

	display 是我們熟知的 CSS 屬性，對於 Flexbox 來說，多了有兩種方式可以設定，預設為「flex」，其布局方式與 block 幾乎類似，都會強迫換行，但設定`display:flex`的子元素卻具備了更多彈性的設定，此外另外一種方式則是「inline-flex」，和 inline-block 也是幾乎雷同，意義上都是一個`display:flex`的元素外面包覆`display:inline `的屬性，在後方的元素不會換行。( 範例：[css-flexbox-demo1.html](css-flexbox-demo1.html) )

	CSS：

		.flex,
		.inline-flex{
			width:100px;
			height:50px;
			border:1px solid #000;
		}
		.flex{
			display:flex;
		}
		.inline-flex{
			display:inline-flex;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_03.jpg)

<br/>

- **flex-direction**

	flex-direction 表示 Flexbox 內容元素的「**排列方向**」，分別有下列四種。( 範例：[css-flexbox-demo2.html](css-flexbox-demo2.html) )

	- row：預設值，由左到右，從上到下
	- row-reverse：與 row 相反
	- column：從上到下，再由左到右
	- column-reverse：與 column 相反  	

	CSS：

    	.flex-row{
    		flex-direction:row;
    	}
    	.flex-row-reverse{
    		flex-direction:row-reverse;
    	}
    	.flex-column{
    		flex-direction:column;
    	}
    	.flex-column-reverse{
    		flex-direction:column-reverse;
    	}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_04.jpg)

<br/>

- **justify-content**

	justify-content 決定了內容元素與整個 Flexbox 的「**水平對齊**」位置，回想一下最上面講的 Flexbox 盒子模型，具有 main start 與 main end 左右兩個端點，justify-content 就是按照這個方式做設定，而其中的設定值總共有下列五個。( 範例：[css-flexbox-demo3.html](css-flexbox-demo3.html)、[W3C 說明](http://www.w3.org/TR/css3-flexbox/#justify-content-property) )

	- flex-start：預設值，對齊最左邊的 main start
	- flex-end：對齊最左邊的 main end
	- center：水平置中
	- space-between：平均分配內容元素，左右元素將會與 main start 和 main end 貼齊
	- space-around：平均分配內容元素，間距也是平均分配
	
	CSS：

		.flex-start{
			justify-content:flex-start;
		}
		.flex-end{
			justify-content:flex-end;
		}
		.center{
			justify-content:center;
		}
		.space-between{
			justify-content:space-between;
		}
		.space-around{
			justify-content:space-around;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_05.jpg)

<br/>

- **align-items**

	align-items 剛好和 justify-content 相反，align-items 決定了內容元素與整個 Flexbox 的「**垂直對齊**」位置，再回想一下最上面講的 Flexbox 盒子模型，具有 cross start 與 cross end 左右兩個端點，align-items 與 align-self 就是按照這個方式做設定，設定值總共有下列五個。( 範例：[css-flexbox-demo4.html](css-flexbox-demo4.html)、[W3C 說明](http://www.w3.org/TR/css3-flexbox/#align-items-property) )

	- flex-start：預設值，對齊最上面的 cross start
	- flex-end：對齊最下面的 cross end
	- center：垂直置中
	- stretch：將內容元素全部撐開至 Flexbox 的高度
	- baseline：以所有內容元素的基線作為對齊標準

	CSS：

		.flex-start{
			align-items:flex-start;
		}
		.flex-end{
			align-items:flex-end;
		}
		.center{
			align-items:center;
		}
		.stretch{
			align-items:stretch;
		}
		.baseline{
			align-items:baseline;
		}
		.flex-item{
			width:60px;
			text-align:center;
		}
		.item1{
			font-size:20px;
			line-height: 60px;
			background:#c00;
		}
		.item2{
			line-height: 30px;
			background:#095;
		}
		.item3{
			font-size:30px;
			line-height: 100px;
			background:#059;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_06.jpg)

<br/>

- **align-self**

	align-self 的設定與 align-items 相同，但目的不同，align-self 的作用在於覆寫已經套用 align-items 的屬性，如果照我們以前所寫，因為 align-items 是針對子元素，所以必須要用 align-self 來進行覆寫，我們直接用上一個範例來修改就很清楚了。( 範例：[css-flexbox-demo5.html](css-flexbox-demo5.html)、[W3C 說明](http://www.w3.org/TR/css3-flexbox/#align-items-property) )

	CSS：

		.item2{
			align-self:baseline;
			line-height: 30px;
			background:#095;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_07.jpg)

<br/>

- **align-content**

	剛剛談到的 align-items 是針對內容為單行的元素進行處理，如果遇到多行的元素，就要使用 align-content 這個屬性，這個屬性總共有六個設定值。( 範例：[css-flexbox-demo6.html](css-flexbox-demo6.html)、[W3C 說明](http://www.w3.org/TR/css3-flexbox/#align-content-property) )

	- flex-start：預設值，對齊最上面的 cross start
	- flex-end：對齊最下面的 cross end
	- center：垂直置中
	- space-between：將第一行與最後一行分別對齊最上方與最下方	
	- space-around：每行平均分配間距
	- stretch：內容元素全部撐開

	CSS：

		.flex-start,
		.flex-end,
		.center,
		.space-between,	
		.space-around,	
		.stretch{
			display:inline-flex;
			flex-wrap:wrap;
			width:180px;
			height:160px;
			margin:5px 5px 40px;
			border:1px solid #000;
			vertical-align: top;
		}
		.flex-start{
			align-content:flex-start;
		}
		.flex-end{
			align-content:flex-end;
		}
		.center{
			align-content:center;
		}
		.space-between{
			align-content:space-between;
		}
		.space-around{
			align-content:space-around;
		}
		.stretch{
			align-content:stretch;
		}
		.align-content>div{
			padding:15px;
			margin:2px;
			background:#666;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_08.jpg)

<br/>

- **flex-wrap**

	在剛剛的範例看到一個 flex-wrap 的屬性，這個屬性負責的是讓內容的元素換行，因為當我們把父元素的 display 設定為 flex 或 inline-flex 的時候，子元素就是以單行的方式，彈性撐滿父元素，所以就要利用 flex-wrap 來換行，共有三個設定值。( 範例：[css-flexbox-demo7.html](css-flexbox-demo7.html)) 

	- nowrap：預設值，單行
	- wrap：多行
	- wrap-reverse：多行，但內容元素反轉

	CSS：

		.nowrap,
		.wrap,
		.wrap-reverse{
			display:inline-flex;
			flex-wrap:wrap;
			width:180px;
			height:80px;
			margin:5px 5px 40px;
			border:1px solid #000;
			vertical-align: top;
		}
		.column{
			flex-direction:column;
			width:120px;
			height:180px;
		}
		.nowrap{
			flex-wrap:nowrap;
		}
		.wrap{
			flex-wrap:wrap;
		}
		.wrap-reverse{
			flex-wrap:wrap-reverse;
		}
		.align-content div{
			width:30px;
			height:30px;
			margin:5px;
			background:#069;
		}
		.column div{
			background:#f50;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_09.jpg)

<br/>

- **order**

	剛剛在 flex-wrap 的屬性裏頭看到了可以把元素反轉，order 這個屬性更是可以直接指定一個數字，就可以由小到大的排列順序。( 範例：[css-flexbox-demo8.html](css-flexbox-demo8.html))

		.item{
			width:50px;
			height:60px;
			text-align: center;
			line-height: 50px;
		}
		.order1{
			order:1;
			background:#c00;
		}
		.order2{
			order:2;
			background:#069;
		}
		.order3{
			order:3;
			background:#095;
		}
		.order4{
			order:4;
			background:#f50;
		}
		.order5{
			order:5;
			background:#777;
		}
		.order6{
			order:6;
			background:#077;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_10.jpg)

<br/>

- **flex**

	好酒沉甕底，有耐心看到下面的才會看到重點喔哈哈！flex 應該是 Flexbox 裏頭最重要的屬性了，而 flex 其實是由三個屬性組合而成，依照先後順序分別是「**flex-grow**」、「**flex-shrink**」和「**flex-basis**」，如果 flex 只填了一個數值 ( 無單位 )，那麼預設就是以 flex-grow 的方式呈現，至於三個屬性的解釋如下：

	- **flex-grow**：數字，無單位，當子元素的 flex-basis 長度「**小**」於它自己在父元素分配到的長度，按照數字做相對應的「伸展」比例分配，預設值為 1，設為 0 的話不會進行彈性變化，不可為負值。
	- **flex-shrink**：數字，無單位，當子元素的 flex-basis 長度「**大**」於它自己在父元素分配到的長度，按照數字做相對應的「壓縮」比例分配，預設值為 1，設為 0 的話不會進行彈性變化，不可為負值。
	- **flex-basis**：子元素的基本大小，作為父元素的大小比較基準，預設值為 0，也因為預設值為 0，所以沒有設定此屬性的時候，會以直接採用 flex-grow 屬性，flex-basis 也可以設為 auto，如果設為 auto，就表示子元素以自己的基本大小為單位。。

	三個屬性可以分開設定，也可以合在一起用一個 flex 統一設定，下面的例子展現出同一個 Flexbox，在不同的寬度，子元素會有不同大小的呈現。( 範例：[css-flexbox-demo9.html](css-flexbox-demo9.html))

	HTML：

		<div class="flex flex-300">
				<div class="item item1">1</div>
				<div class="item item2">2</div>
		</div>
		<div class="flex flex-150">
				<div class="item item1">1</div>
				<div class="item item2">2</div>
		</div>

	CSS：

		.flex{
			display:inline-flex;
			height:60px;
			margin:5px 5px 40px;
			border:1px solid #000;
			vertical-align: top;
		}
		.flex-300{
			width:300px;
		}
		.flex-150{
			width:80px;
		}
		.item{
			height:60px;
			text-align: center;
			line-height: 50px;
		}
		.item1{
			flex:1 2 200px;
			background:#c00;
		}
		.item2{
			flex:2 1 100px;
			background:#069;
		}

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_11.jpg)

	如果用動畫來表現，可以看出拉長的時候紅色會變得比藍色長，但壓縮的時候卻是藍色變得比紅色長，如此一來就更能體會 flex 在響應式設計裏頭的關鍵腳色囉！

	![深入解析 CSS Flexbox](/img/articles/201501/20150130_1_12.gif)

	

<br/>

以上就是 Flexbox 的完整介紹，想不到一個 CSS3 的屬性，可以花費這麼大一篇來介紹，不過也因為有了這個新的屬性，讓在做 layout 的佈局又更加彈性囉！

<!-- @@close-->



