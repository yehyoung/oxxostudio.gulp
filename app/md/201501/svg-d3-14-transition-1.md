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

<meta property="article:published_time" content="2015-01-24T21:15:00+01:00">

<meta name="keywords" content="svg,d3,d3js,transition,ease,duration,delay">

<meta name="description" content="在 d3.js 裡頭的 transition，會自動去計算補間動畫，更可以自己設定自己的補間效果，自己去設定相關的插值，許多 d3.js 圖表的動態效果，都是藉由這個 transition 來完成的。">

<meta itemprop="name" content="SVG D3.js - transition 基本篇 - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201501/20150124_1_01b.jpg">

<meta itemprop="description" content="在 d3.js 裡頭的 transition，會自動去計算補間動畫，更可以自己設定自己的補間效果，自己去設定相關的插值，許多 d3.js 圖表的動態效果，都是藉由這個 transition 來完成的。">

<meta property="og:title" content="SVG D3.js - transition 基本篇 - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201501/svg-d3-14-transition-1.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201501/20150124_1_01b.jpg">

<meta property="og:description" content="在 d3.js 裡頭的 transition，會自動去計算補間動畫，更可以自己設定自己的補間效果，自己去設定相關的插值，許多 d3.js 圖表的動態效果，都是藉由這個 transition 來完成的。">

<title>SVG D3.js - transition 基本篇  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG D3.js - transition 基本篇  <span class="article-date" tag="web">JAN 24, 2015</span>

在 CSS 裡面有非常好用的 transition 屬性，同樣的在 d3.js 裡頭也有，而且比 CSS 的 transition 更加強大，除了會自動去計算補間動畫 ( 這個詞在 flash 裡頭很常聽到 )，更可以自己設定自己的補間效果 ( tween )，自己去設定相關的插值 ( interpolate )，許多 d3.js 圖表的動態效果，都是藉由這個 transition 來完成的！這篇將先會先介紹基本的 transition 的用法，後續會用其他篇幅來說明比較進階的應用。

d3.js 基本的 API 有以下幾個：

>- d3.transition([selection], [name])
- transition.delay([delay])
- transition.duration([duration])
- transition.ease([value[, arguments]])
- transition.attr(name, value)
- transition.style(name, value[, priority])
- transition.each([type, ]listener)
- transition.call(function[, arguments…])

<br/>

- **.transition()、.delay()、.duratio()**

	要看 API 就一定要實作，先看到下面這個範例，三個正方形在頁面載入之後就會往下移動，但因為設定的不同，所以會在不同的時間點抵達下方，紅色的正方形，單純只寫了`.transition`，因此會帶入預設的`.duration(250)`，也就是 0.25 秒，綠色的正方形多寫了`.duration(1000)`，表示會在一秒內抵達下方，藍色的正方形則是又多了`.delay(500)`，表示會延遲五秒鐘才開始進行動作，其實在在 CSS 也幾乎是同樣的設定方式啦。( 範例：[svg-d3-14-transition-1-demo1.html](/demo/201501/svg-d3-14-transition-1-demo1.html) )

		d3.selectAll('div')
		  .style({
				'top':'0'
		  });
		d3.select('.box1')
			.transition()
			.style({
				'top':'100px'
			});
		d3.select('.box2')
			.transition()
			.duration(1000)
			.style({
				'top':'100px'
			});
		d3.select('.box3')
			.transition()
			.duration(1000)
			.delay(500)
			.style({
				'top':'100px'
			});

	![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_02.gif)


<br/>

- **.style()、.attr()**

	在上面的範例，其實還用到了`.style`這個方法，這個方法就是單純的針對具有樣式的樣式屬性去做變換，如果換成像 SVG 裡頭使用 attr 控制的元素，就必須要改用`.attr`的方式來控制，例如下面這個範例。( 範例：[svg-d3-14-transition-1-demo2.html](/demo/201501/svg-d3-14-transition-1-demo2.html) )

		d3.selectAll('rect')
		  .attr({
				'y':'0'
		  });
		d3.select('#r1')
			.transition()
			.attr({
				'y':'100'
			});
		d3.select('#r2')
			.transition()
			.duration(1000)
			.attr({
				'y':'100'
			});
		d3.select('#r3')
			.transition()
			.duration(1000)
			.delay(500)
			.attr({
				'y':'100'
			});
	
	![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_03.gif)


<br/>

- **.ease()**

	看完上面兩個範例，我想應該已經大致上了解 transition 的運作原理，接著再來就看看`.ease`這個方法，在剛剛的兩個範例裏頭，並沒有設定`.ease`，呈現出來就是死板板的等速運動，換句話說，就是用`.ease(‘linear’)`的這個預設的動作類型，為了讓動畫看起來更漂亮，我們就會使用加速、減速或反彈...等動作類型，這些類型，在 d3.js 裏頭其實已經預設了不少囉！以下就是`.ease`具備的動作類型：

	- linear：線性，預設值，為一個常數
	- poly(k)：Math.Pow，指定一個冪次 k 給 線性的常數
	- quad：等同於 poly(2)
	- cubic：等同於 poly(3).
	- sin：三角函數的 sin 曲線
	- exp：基於線性常數的指數函數
	- circle：四分之一的圓周
	- elastic(a, p)：像是橡皮筋一樣的有彈性，會超出 0 和 1 的範圍
	- back(s)：先往後再往前
	- bounce：會像球一樣的反彈

  這個這個範例 [svg-d3-14-transition-1-demo3.html](/demo/201501/svg-d3-14-transition-1-demo3.html  ) 裏頭，將`  .ease`具備的模式一一展現，為了更清楚表現程式碼，就一段一段忠實呈現，在這裡就不一一把程式碼列出，可  以點選範例看原始碼即可。
  
  	d3.select('.box1')
  		.transition()
  		.duration(1000)
  		.ease('linear') //換裡面的字串即可
  		.style({
  			'top': '200px'
  		});
  	d3.select('.box2')
  		.transition()
  		.duration(1000)
  		.ease('poly','2') //比較需要注意的是，有帶參數的要這樣寫
  		.style({
  			'top': '200px'
  		});
	
	![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_04.gif)

	除此之外，還有另外四種類型。( 範例：[svg-d3-14-transition-1-demo4.html](/demo/201501/svg-d3-14-transition-1-demo4.html) )
	
	- cubic-in：加速
	- cubic-out：減速
	- cubic-in-out：先減速再加速
	- cubic-out-in：先加速再減速
	
  d3.select('.box1')
  	.tran  sition()
  	.duration(1000)
  	.ease('cubic-in')  //cubic-out,cubic-out-in,cubic-in-out
  	.style({
  		'top': '200px'
  	});
  
  ![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_05.gif)


<br/>

- **.each()**

	看完`.ease`，接下來就是`.each`這個方法，按照官網的說明，這是一個在補間動畫運作時的「監聽器」 ( listener )，具有三種類型，分別是「start」、「end」與「interrupt」，「start」代表在補間動畫開始的時候，同時執行，但根據官方說法，會有 17ms 的延遲，所以也不是完全同時，「end」表示在補間動畫結束後，要執行甚麼，而「interrupt」則表示當補間動畫中斷時，會執行些甚麼，下面的範例，第一個正方形在開始的時候就會有邊框，第二個則是在結束的時候會有邊框，第三個按鈕則是在我們按下 interrupt 按鈕的時候會出現邊框。( 範例：[svg-d3-14-transition-1-demo5.html](/demo/201501/svg-d3-14-transition-1-demo5.html) )
	
		d3.select('.box1')
			.transition()
			.duration(2000)
			.style({
				'top':'100px'
			})
			.each('start',function(){
				d3.select(this)
					.style({
						'border':'10px solid #000'
					});
			});
		d3.select('.box2')
			.transition()
			.duration(2000)
			.style({
				'top':'100px'
			})
			.each('end',function(){
				d3.select(this)
					.style({
						'border':'10px solid #000'
					});
			});
		d3.select('.box3')
			.transition()
			.duration(2000)
			.style({
				'top':'100px'
			})
			.each('interrupt',function(){
				d3.select(this)
					.style({
						'border':'10px solid #000'
					});
			});
	
	![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_06.gif)


<br/>

- **.call()**

	最後就是`.call`這個方法，其實這就類似我們在寫 JS 的時候，會把多個地方用到的函式獨立出來一樣，在下面的範例，由於三個正方形都會移動到同樣的位置，所以我們就將位置獨立出來，再使用`.call`來呼叫即可。( 範例：[svg-d3-14-transition-1-demo6.html](/demo/201501/svg-d3-14-transition-1-demo6.html) )
	
		function d3Transition(){
			d3.selectAll('div')
			  .style({
					'top':'30px'
			  });
			d3.select('.box1')
				.transition()
				.call(foo);
			d3.select('.box2')
				.transition()
				.duration(1000)
				.call(foo);
			d3.select('.box3')
				.transition()
				.duration(1000)
				.delay(500)
				.call(foo);
		}
		function foo(t){
			t.style({
					'top':'100px'
				});
		}
	
	![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_03.gif)

<br/>
補充一點，我們也可以將 transition 組合起來成為一連串的動畫效果。( 範例：[svg-d3-14-transition-1-demo7.html](/demo/201501/svg-d3-14-transition-1-demo7.html) )

	d3.select('.box1')
		.transition()
		.duration(1000)
		.style('top','100px')
		.transition()
		.duration(1000)
		.style('left','100px')
		.transition()
		.duration(1000)
		.style('top','30px')
		.transition()
		.duration(1000)
		.style('left','10px');

![SVG D3.js - transition 基本篇](/img/articles/201501/20150124_1_07.gif)

<br/>
以上就是 d3.js 裏頭 transition 的基本用法，不過 transition 真是滿博大精深的，之後將會再用其他篇幅，介紹比較深入的用法囉！

( 第一張圖片來源：http://iallenkelhet.no/2013/04/02/animation-a-little-goes-a-long-way/ )

<!-- @@close-->




