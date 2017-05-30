# SVG D3.js - 座標軸 ( Axis )  

藉由上一篇了解了最常用的 scale，再來就要談談座標軸 Axis，在 D3.js 裏頭，座標軸與 scale 幾乎是如影隨形地出現，畢竟既然是要用來顯示座標，就一定會出現在畫面裡，也因此必須要用 scale 才能夠讓座標軸按照比例大小擺放。至於什麼是座標軸 Axis 呢？很簡單就是水平 x 軸和垂直 y 軸，上面會有刻度，前使用 illustrator 慢慢刻畫刻度，常常必須刻到天花地老，如果會用 Excel，就可以讓 Excel 產生大家都會的一百零一種刻度，今天利用 D3.js，我們就可以自己做出自己的圖表刻度。

首先來看看 Axis 有哪些 API 可以使用：
> 
- axis.scale
- axis.orient
- axis.ticks
- axis.tickValues
- axis.tickSize
- axis.innerTickSize
- axis.outerTickSize
- axis.tickPadding
- axis.tickFormat

<br/>
整體而言，Axis 比 scale 容易理解得多，相關的 API 基本上也很方便使用，以下就來一一解釋說明：

- **axis.scale([scale])、axis.ticks([arguments…])**

	第一個 API ，是告訴我們，要讓 axis 按照 scale 的比例縮放，不過光是知道這點還是不夠，要如何才能將 asix 加入圖表呢？下面的範例，我們拿上一篇的折線圖來當作示範，可以看到裡面多了兩個名為 axisX 和 axisY 的方法，**最下方讓 SVG append 一個 g，然後 call axisX 方法與 axisY 方法，就可以產生座標軸**，而 ticks 的用法和 scale 差不多，就是會按照上面設定的數字進行對應的區隔，不過同樣的，若區隔不適當則不一定會按照我們的數字進行。 ( 範例：[svg-d3-04-axis-demo0.html](/demo/201411/svg-d3-04-axis-demo0.html) )

		  var data = [
		  {x: 0,y: 1.89}, 
		  {x: 1,y: 2.77}, 
		  {x: 2,y: 0.86}, 
		  {x: 3,y: 3.45}, 
		  {x: 4,y: 4.13}, 
		  {x: 5,y: 3.59}, 
		  {x: 6,y: 2.33}, 
		  {x: 7,y: 3.79}, 
		  {x: 8,y: 2.61}, 
		  {x: 9,y: 2.15}
		  ];
		
		  var width = 240,
		    height = 120;
		
		  var s = d3.select('#s');
		
		  s.attr({
		    'width': '300',
		    'height': '180'
		  }).style({
		    'border': '1px dotted #aaa'
		  });
		
		  var scaleX = d3.scale.linear()
		    .range([0, width])
		    .domain([0, 9]);
		
		  var scaleY = d3.scale.linear()
		    .range([height, 0])
		    .domain([0, 5]); 
		
		  var line = d3.svg.line()
		    .x(function(d) {
		      return scaleX(d.x);
		    }).y(function(d) {
		      return scaleY(d.y);
		    });
		
		  var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .ticks(10);
		
		  var axisY = d3.svg.axis()
		    .scale(scaleY)
		    .ticks(10);
		
		  s.append('path')
		    .attr({
		      'd': line(data),
		      'stroke': '#09c',
		      'fill': 'none'
		    });
		
		  s.append('g')
		   .call(axisX);  //call axisX
		
		  s.append('g')
		   .call(axisY);  //call axisY

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_02.png)

<br/>

- **axis.orient([orientation])**

	如果只是單純的設定 axis.scale 和 axis.ticks，出來的長相一定跟上面那張圖一樣莫名其妙，文字擠在一起！？座標軸在最上方！？這時候就必須要用 axis.orient 來定義座標標籤的上下左右位置，只要填入 top、right、bottom 或 left 就可以，上下通常針對 x 軸座標標籤，左右則是針對 y 軸座標標籤。( 範例：[svg-d3-04-axis-demo1.html](/demo/201411/svg-d3-04-axis-demo1.html) )

		  var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .ticks(10);
		
		  var axisY = d3.svg.axis()
		    .scale(scaleY)
		    .orient("left")
		    .ticks(10);

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_03.png)

	<br/>
	不過只有修改標籤位置還是不構，接著要利用 transform 修改 g 的位置參數 ( 不知道 SVG transform 的請參考 [SVG 研究之路 (19) - transform 基礎篇](http://www.oxxostudio.tw/articles/201409/svg-19-transform.html) )，同時設定一下 fill 與 stroke 的屬性，看起來就真有座標軸的樣子。( 範例：[svg-d3-04-axis-demo2.html](/demo/201411/svg-d3-04-axis-demo2.html) )

		  s.append('path')
		    .attr({
		      'd': line(data),
		      'stroke': '#09c',
		      'fill': 'none',
		      'transform':'translate(35,20)'  //折線圖也要套用 translate
		    });
		
		  s.append('g')
		   .call(axisX)
		   .attr({
		    'fill':'none',
		    'stroke':'#000',
		    'transform':'translate(35,'+(height+20)+')' 
		   });
		
		  s.append('g')
		   .call(axisY)
		   .attr({
		    'fill':'none',
		    'stroke':'#000',
		    'transform':'translate(35,20)'
		   });

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_04.png)

	<br/>
	不過從上圖可以看到，文字好像都變成空心的，主要因為把整個 g 內部的形狀都套用了`'fill':'none'`以及`'stroke':'#000'`的屬性，因此文字就變成只有外框，沒有填滿的外框字，為了改善，我們必須要再單獨針對 text 的屬性作設定，同時調整它的 style，看起來就會漂亮許多。( 範例：[svg-d3-04-axis-demo3.html](/demo/201411/svg-d3-04-axis-demo3.html) )

		  s.append('g')
		   .call(axisX)
		   .attr({
		    'fill':'none',
		    'stroke':'#000',
		    'transform':'translate(35,'+(height+20)+')' 
		   }).selectAll('text')
		   .attr({
		    'fill':'#000',
		    'stroke':'none',
		   }).style({
		    'font-size':'11px'
		   });
		
		  s.append('g')
		   .call(axisY)
		   .attr({
		    'fill':'none',
		    'stroke':'#000',
		    'transform':'translate(35,20)'
		   }).selectAll('text')
		   .attr({
		    'fill':'#000',
		    'stroke':'none',
		   }).style({
		    'font-size':'10px'
		   });

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_05.png)

	<br/>
	如果把 axisX 的 orient 修改為 top ，座標標籤就會跑到上方，同理修改 axisY 的 orient 為 right 就會跑到右方。

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_06.png)

<br/>

- **axis.tickFormat([format])**

	上一篇 scale 裏頭提過 tickFormat，在 Axis 裏頭也有 tickFormat，不過用法不太相同，scale 的是套用 D3.js 的格式化，輸入 % 或 p 就會自動轉換成 100% 起跳的數值，而在 Axis 裏頭卻是真的在原本的數值後方加上格式，下面的範例在 tickFormat 裡頭家上了一個`function(d){return d+'n';}`，因為套用了 scale，所以 d 就會自動返回 d.x 或 d.y，可想而知，在後方加上 n 或 % ，就會產生有單位的座標軸，不過如果 tickFormat("")，就會清空座標軸數值，要小心。( 範例：[svg-d3-04-axis-demo4.html](/demo/201411/svg-d3-04-axis-demo4.html) )
		
		  var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .ticks(10)
		    .tickFormat(function(d){return d+'n';});
		
		  var axisY = d3.svg.axis()
		    .scale(scaleY)
		    .orient("left")
		    .ticks(5)
		    .tickFormat(function(d){return d+'%';});

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_07.png)
	
	如果要換成 scale 的 tickFormat 思考的話，就要改成下方的範例這樣，% 就會變成百位數的百分比：

		  var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .ticks(10)
		    .tickFormat(d3.format(",%"));

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_08.png)

<br/>

- **axis.tickSize([inner, outer])**

	tickSize 表達的是座標軸上刻度線條的尺寸，包含了內部線段和和最外邊的線段，共兩個數值，而這兩個數值也各自獨立出來，所以其實直接用 tickSize 就可以都滿足，座標軸上預設的刻度長度是 **6** ，數字負值往座標內縮，正值往座標外長出去，利用 tickSize，我們可以輕鬆地做出座標的內格線 ( Grid ) ，做法就是新增另外兩組 g 來放座標格線的 axis，然後讓刻度尺寸長度和圖表寬高一樣就可以，而且這裡頭使用剛剛講的 tickFormat("")，就不會有額外的座標標籤產生。( 範例：[svg-d3-04-axis-demo5.html](/demo/201411/svg-d3-04-axis-demo5.html) )

		  var axisXGrid = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .ticks(10)
		    .tickFormat("")
		    .tickSize(-height,0);
		
		  var axisYGrid = d3.svg.axis()
		    .scale(scaleY)
		    .orient("left")
		    .ticks(10)
		    .tickFormat("")
		    .tickSize(-width,0);

		  s.append('g')
		   .call(axisXGrid)
		   .attr({
		    'fill':'none',
		    'stroke':'rgba(0,0,0,.1)',
		    'transform':'translate(35,'+(height+20)+')' 
		   });
		
		  s.append('g')
		   .call(axisYGrid)
		   .attr({
		    'fill':'none',
		    'stroke':'rgba(0,0,0,.1)',
		    'transform':'translate(35,20)'
		   });

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_09.png)

<br/>

- **axis.tickValues([values])**

	剛剛我們的座標軸標籤都是由 D3.js 自動產生，雖然可以使用 ticks 作一些區隔，但也常常不受控制，因此如果要自訂我們自己的間格區間，就可以使用 tickValues 來完成，tickValues 的內容是一個陣列，放上陣列之後就會按照我們設定的陣列進行。( 範例：[svg-d3-04-axis-demo6.html](/demo/201411/svg-d3-04-axis-demo6.html) )

		  var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .tickValues([1,3,5,7,9])
		    .tickFormat(function(d){return d+'n';});

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_10.png)

	<br/>
	改變區間就會看到不同的效果。( 範例：[svg-d3-04-axis-demo7.html](/demo/201411/svg-d3-04-axis-demo7.html) )	

		 var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .tickValues([1,2,6,7,9])
		    .tickFormat(function(d){return d+'n';});

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_11.png)

<br/>

- **axis.tickPadding([padding])**

	padding 很簡單不太需要解釋，就是座標標籤和座標軸之間的間距，直接用範例玩玩看囉！( 範例：[svg-d3-04-axis-demo8.html](/demo/201411/svg-d3-04-axis-demo8.html) )

		  var axisX = d3.svg.axis()
		    .scale(scaleX)
		    .orient("bottom")
		    .tickValues([1,3,5,7,9])
		    .tickFormat(function(d){return d+'n';})
		    .tickPadding(-20);
		
		  var axisY = d3.svg.axis()
		    .scale(scaleY)
		    .orient("left")
		    .ticks(5)
		    .tickFormat(function(d){return d+'%';})
		    .tickPadding(15);

	![SVG D3 - 座標軸 ( Axis )](/img/articles/201411/20141113_1_12.png)

<br/>
以上就是 Axis 的基本用法，會使用座標軸之後，就可以做出一大堆實用的圖表囉！^_^

