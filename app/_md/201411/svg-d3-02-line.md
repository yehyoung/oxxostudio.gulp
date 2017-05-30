# SVG D3.js - 繪製線段  

在之前的 [SVG 研究之路 (4) - Path 基礎篇](http://www.oxxostudio.tw/articles/201406/svg-04-path-1.html) 裡頭，詳細的列出了 SVG path 的繪製方式，現在我們要來利用 D3.js 的 line() API ，來完成線段 ( line ) 的繪製，且有別於單純的 SVG 產生 path 不容易放入數據，D3.js 可以根據我們的數據，自動產生對應的線條。

先來了解一下如何利用 D3.js 的 line() 畫線，一開始一定要有一些 data，而且這些 data 必須要有 x 座標和 y 座標 ( 因為有「點」才有「線」，點是由 x 與 y 構成 )，因此我們的 data 陣列的值，都會是個「具有 x 與 y 屬性的物件」 ( 大括號為物件，內容是屬性 )，第一個點的座標就是`data[0].x`和`data[0].y`，依此類推。

	var data = [
	  {x:10,y:10},
	  {x:50,y:100},
	  {x:60,y:50},
	  {x:100,y:30}
	];

<br/>
有了 data 之後，再來就是要把 data 餵給 SVG 的線條上的每個點，讓它們按照 data 長出來，首先先放一個 svg 到 body 裏頭

	  var svg = d3.select('body')
	    .append('svg')
	    .attr({
	      'width': 800,
	      'height': 800
	    });

<br/>
然後使用 line().x() 以及 line().y()，讓座標由 data 長出來
	
	  var line = d3.svg.line()
	    .x(function(d) {
	      return d.x;
	    })
	    .y(function(d) {
	      return d.y;
	    });

<br/>
最後就是利用 append 的方式在 svg 裏頭放入一個 path，d 是用`line(data)`將 data 餵給剛剛的 line，如此各個點的座標就會依序長出 
	
	  svg.append('path')
	    .attr({
	      'd': line(data),
	      'y': 0,
	      'stroke': '#000',
	      'stroke-width': '5px',
	      'fill': 'none'
	    });

結果就會像下圖這樣：

![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_02.png)

<br/>
打開開發者工具就可以看到每個點的座標都照 data 畫出來了  ( 範例：[svg-d3-02-line-demo1.html](/demo/201411/svg-d3-02-line-demo1.html) )

![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_03.png)

<br/>
從上面的例子，雖然還看不出有多強大，但如果有一百個點要畫，就可以靠 D3 幫我們省下不少寫座標的功夫，但 line() 特別的地方還不在此，有個很神奇的`.interpolate()`，可以幫我們算出各種線段的樣式，再來就看一下這個神奇的`.interpolate()`，`.interpolate()`總共有 13 個模式可以設定，這是十三個模式分別是：

- linear：預設值，就是剛剛的演示。 
- linear-closed：封閉的線段。 
- step：一律以水平線段或垂直線段顯示，採中間點的方式做連接。 
- step-before：以起始點垂直畫線方式開始。 
- step-after：以終點垂直畫線方式結束。 
- basis：基於 [B-spline](http://en.wikipedia.org/wiki/B-spline) 的定義長出曲線。 
- basis-open：開放的 B-spline，不包含起點與終點 ( 大於三個點 )。 
- basis-closed：封閉的 B-spline。 
- bundle：基於 B-spline 之上，但包含了 tension 參數。 
- cardinal：基於 [Cardinal spline](http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) 的線段。
- cardinal-open：開放的 Cardinal spline，不包含起點與終點 ( 大於三個點 )。
- cardinal-closed：封閉的 Cardinal spline。
- monotone：基於 [cubic interpolation](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_x) 的線段。

<br/>
很好，看完上面的十三個模式應該已經暈頭轉向，完全搞不懂字面上的意思是啥，我也是一模一樣的情形，所以這時候就要直接實作看看，應該就能明白箇中道理，因為 linear 剛剛是預設值，也就是剛剛的範例所以就不介紹，直接從 linear-closed 開始  ( data 還是剛剛那一組喔~ )：

- linear-closed：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_04.png)

		var line2 = d3.svg.line()
		              .x(function(d){
		                return d.x;
		              })
		              .y(function(d){
		                return d.y;
		              })
		              .interpolate('linear-closed');

<br/>

- step ( 圖中紅色的點為 data 的座標提示，程式碼與上面相同，差別只在於 interpolate 的模式名稱 )：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_05.png)

<br/>

- step-before：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_06.png)

<br/>

- step-after：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_07.png)

<br/>

- basis：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_08.png)

<br/>`

- basis-open：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_09.png)

<br/>

- basis-closed：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_10.png)

<br/>

- bundle：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_11.png)

<br/>

- bundle + tension：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_12.png)

		var line2 = d3.svg.line()
		              .x(function(d){
		                return d.x;
		              })
		              .y(function(d){
		                return d.y;
		              })
		              .interpolate('linear-closed')
					  .tension(2);

<br/>

- cardinal：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_13.png)

<br/>

- cardinal-open：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_14.png)

<br/>

- cardinal-closed：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_15.png)

<br/>

- monotone：

	![SVG D3 - 繪製線段](/img/articles/201411/20141103_1_16.png)

<br/>
從上面各種模式所產生的線段就可以發現，D3.js 其實已經幫我們解決了很多想像不到的情形，特別是如果今天畫出來的線段希望它 smooth 一些，都可以藉由 D3.js 輕鬆實現，不需要再自己去計算 C 或是 Q ( 參考 [SVG 研究之路 (4) - Path 基礎篇](http://www.oxxostudio.tw/articles/201406/svg-04-path-1.html) )，最後實現的範例：[svg-d3-02-line-demo2.html](/demo/201411/svg-d3-02-line-demo2.html)

不過 D3.js 的 line() 其實還有不少其他的用法，之後研究之後再來慢慢分享。^_^




