# SVG D3.js - 序數比例尺 ( ordinal )  

![](/img/articles/201412/svg-d3-08-ordinal.jpg#preview-img)

之前我在 [SVG D3.js - 定義比例 ( scale.linear() )](http://www.oxxostudio.tw/articles/201411/svg-d3-03-scale-linear.html) 有介紹過比例尺的用法，當中有提到 ordinal，ordinal 與 linear 最大的差別，可以不一定要使用數字，可以使用非定量的值作為比例尺 ( 序數：非定量的值依序排列 )，因為可以使用非數字的值，畫出來的座標，也就更能朝理想的座標長相邁進了。

其實 ordinal 的用法和 linear 的用法幾乎一模一樣，不過仍然先來看一下 ordinal 有哪些 API ，然後再介紹一下吧！( 忘記的請複習 [SVG D3.js - 定義比例 ( scale.linear() )](http://www.oxxostudio.tw/articles/201411/svg-d3-03-scale-linear.html) )

>- ordinal.domain
- ordinal.range
- ordinal.rangePoints
- ordinal.rangeRoundPoints 
- ordinal.rangeBands
- ordinal.rangeRoundBands
- ordinal.rangeBand
- ordinal.rangeExtent
- ordinal.copy

<br/>
開始之前，同樣用一組數據做為範例使用：

	var data=[
	  {x:'a',y:135},
	  {x:'b',y:138},
	  {x:'c',y:132},
	  {x:'d',y:121},
	  {x:'e',y:126},
	  {x:'f',y:140},
	  {x:'g',y:123},
	  {x:'h',y:89},
	  {x:'i',y:79},
	  {x:'j',y:83}
	];

然後也先畫個 svg 的外框出來，就可以開始了。

	var s = d3.select('svg');
		
	s.attr({
	     'width': width,
	     'height': 200,
	  }).style({
	     'border':'1px solid #000'
	  });

<br/>

- **ordinal.domain([values])** 
 
	ordinal 的 domain 內所帶入的值，與 linear 有所不同，linear 帶入的是一個數字範圍，而 ordinal.domain 內所帶入的是一串陣列值，陣列的第一個值會對應到第一個元素的的輸出範圍，第二個則會對應到第二個範圍，依此類推。

<br/>

- **ordinal.range([values])**

	在 ordinal.range 裏頭同樣是帶入陣列，換句話說，domain 有幾個，範圍也要有幾個，這裡與 linear 是不太相同的，如果照著 linear 的設定方式，出來的結果可能就會出乎意料，範例裏頭藍色的線就是按照 linear 的 range 設定，整個就是非常的詭異呀！範例的 domain 使用之前介紹過的 [d3.map](http://www.oxxostudio.tw/articles/201412/svg-d3-07-data-map.html)，很容易的產生一個陣列放進去。( 範例：[svg-d3-08-ordinal-demo1.html](/demo/201412/svg-d3-08-ordinal-demo1.html) )

		var height = 120,
		    width = 200;

		var scaleX1 = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .range([0, width]);

		var scaleX2 = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .range([0,20,40,60,80,100,120,140,160,180]);
		 
		var scaleY = d3.scale
		               .linear()
		               .domain([0,150])
		               .range([height, 0]);

		var line1 = d3.svg.line()
							   .x(function(d) {
							      return scaleX1(d.x);
							   }).y(function(d) {
							      return scaleY(d.y);
							   });

		var line2 = d3.svg.line()
							   .x(function(d) {
							      return scaleX2(d.x);
							   }).y(function(d) {
							      return scaleY(d.y);
							   });

		s.append('path')
		   .attr({
		    	'd':line1(data),
		    	'stroke':'#09c',
		    	'fill':'none'
		   });
	
		s.append('path')
		   .attr({
		    	'd':line2(data),
		    	'stroke':'#f66',
		    	'fill':'none',
		    	'transform': 'translate(0,80)'
		   });

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_02.jpg)


<br/>

- **ordinal.rangePoints(interval[, padding])**
	
	由於使用 range，要寫了一大堆的點在裏頭，因此，通常如果我們使用 ordinal，會使用 rangePoints 代替 range，rangePoints 可以指定一段範圍，這段範圍會根據 domain 有多少個值，自動區分為多少個間隔單位。( 範例：[svg-d3-08-ordinal-demo2.html](/demo/201412/svg-d3-08-ordinal-demo2.html) )

		var scaleX = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangePoints([0, width]);

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_03.jpg)

	這裡還有一個選填的數值 padding，表示範圍前後的邊距，而邊距的長度等於 step 與 step 之間的距離，乘以 padding/2，如果 step 之間的距離是 10， padding 是 1，那麼實際 padding 的長度就會是 5 ( 10*1/2 )。( 範例：[svg-d3-08-ordinal-demo3.html](/demo/201412/svg-d3-08-ordinal-demo3.html) )

		var scaleX = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangePoints([0, width],1);

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_04.jpg)


<br/>

- **ordinal.rangeRoundPoints(interval[, padding])**

	由於剛剛講的 rangePoints 是自動化分間格，所以出來的數值從開發者工具可以看出，都會有一大堆的小數點在後面，如果要做四捨五入的整數，就可以使用 rangeRoundPoints 代替 rangePoints，下面的範例紅色的線條是 rangeRoundPoints，雖然直接看開發者工具會看到還是有些小數，但基本上都是十分接近整數的。( 範例：[svg-d3-08-ordinal-demo4.html](/demo/201412/svg-d3-08-ordinal-demo4.html) )

		var scaleX1 = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangePoints([0, width]);

		var scaleX2 = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangeRoundPoints([0, width]);

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_05.jpg)


<br/>

- **ordinal.rangeBands(interval[, padding[, outerPadding]])**

	rangeBands 是 ordinal 滿特別的一個 API，要了解這個 API 就要先看一下 [官方的說明](https://github.com/mbostock/d3/wiki/Ordinal-Scales) ，最主要的也就是下面這張圖片，rangeBands 可以看做是總長度的分段，有幾個數值，就會分成「數值-1」段，而當中又包含了 padding 與 outpadding 的設定，定義了每段 rangeBands 後方接續的 padding 與兩側的 outpadding 數值。

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_06.jpg)

	不過光是看這張圖或許還不太明白，當我們把上面寫的範例改為 rangeBands，就會發現後面空了一塊，因為預設的 padding 與 outpadding 都是 0，分成九段，最後面當然就會空出一段出來。( 範例：[svg-d3-08-ordinal-demo5.html](/demo/201412/svg-d3-08-ordinal-demo5.html) )

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_07.jpg)

	padding 的值，根據 d3.js 的定義是 0 到 1 之間的數字，而 padding 的實際大小是該 step 點經過 range 之後的數值乘以這個 padding 值，恩，沒錯，講得非常模糊，舉例來說，是我把十個點，放在寬度 100px 的範圍內，把 padding 設為 1，會出現 11.111111 的數值，因為 rangeBands 自的真諦是讓每段 rangeBand 長度相等，而且之間有相等的空隙，當我們把 padding 設為 1，換個角度思考，其實就是利用 padding 補滿一段 bands 的長度，因此 padding 的值就是 10/9=1.11111111。( 範例：[svg-d3-08-ordinal-demo6.html](/demo/201412/svg-d3-08-ordinal-demo6.html) )

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_08.jpg)

	或許這樣說還是不太明白，可以看看下面這張我畫的示意圖，換個角度思考，padding=1 的意思，也等同於全部 padding 總和，等於一段 rangBand，因此會補滿原本的寬度，這也是為什麼 d3.js 要我們設定 0 到 1 的原因，如果設定大於 1，例如 padding=2，就表示總 padding 的長度的兩段 rangeBand，而在範圍內的 rangeBand + padding 必須要等於範圍，所以就變成有一段 rangeBand 不見了 ( 凸到外面去 )

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_09.jpg)

	依此類推，如果範圍是 100，有十個點，就可以用計算機算出 padding 的值會是多少，1 就是 0.11111 ( 1/9 )，2 就是 0.25 ( 2/8 ) ，3 就是 0.4285714... ( 3/7 )，4 就是 0.66666 ( 4/6 )，其他就自己算下去吧，為了證明，我們寫一個 padding=4 的來看看是不是這樣，結果當然是這樣囉！而且還可以很明顯地看到有三個點跑到 100 外面去了。( 範例：[svg-d3-08-ordinal-demo7.html](/demo/201412/svg-d3-08-ordinal-demo7.html) )

		var scaleX = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangeBands([0, width],4,0);

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_10.jpg)

	理解了 padding 之後，outpadding 就是兩側的邊距，預設也是 0，如果我們寫 rangeBands([0, width],1)，就表示 padding 與 outpadding 都是 1。( 範例：[svg-d3-08-ordinal-demo8.html](/demo/201412/svg-d3-08-ordinal-demo8.html) )

		var scaleX = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangeBands([0, width],1);

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_11.jpg)


<br/>

- **ordinal.rangeRoundBands(interval[, padding[, outerPadding]])**

	和 ordinal.rangeRoundPoints 很像，就是把剛剛的小數變成整數，直接用 padding=4 來跟剛剛的 ordinal.rangeBands 比較一下，有沒有看到，變成整數了。( 範例：[svg-d3-08-ordinal-demo9.html](/demo/201412/svg-d3-08-ordinal-demo9.html) )

		var scaleX = d3.scale 
		               .ordinal() 
		               .domain(data.map(function(d){return(d.x);}))
		               .rangeRoundBands([0, width],4,0);

	![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_12.jpg)


<br/>

- **ordinal.rangeBand()**

	返回與邊界的邊距，如果 padding 為 1，則 rangeBand 出來的結果是 0，padding 設為 2，則 rangeBand 出來的結果是 -2.5。( 範例：[svg-d3-08-ordinal-demo10.html](/demo/201412/svg-d3-08-ordinal-demo10.html) )

		console.log(scaleX.rangeBand());

<br/>

- **ordinal.rangeExtent()**

	返回範圍寬度，如果以這篇的範例來說，就是返回 100 或 200 ( 因為一開始用 200，後來的都用 100 )( 範例：[svg-d3-08-ordinal-demo11.html](/demo/201412/svg-d3-08-ordinal-demo11.html) )

		console.log(scaleX.rangeExtent());

<br/>

- **ordinal.copy**

	複製一份出來，而不會影響到原本的。

<br/>
以上大概就是 ordinal 的 API 介紹，最後，當然要結合 Axis 坐標軸，做一個與 ordinal 有關的座標來瞧瞧，如果忘記座標軸怎麼做的，請參考 [SVG D3.js - 座標軸 ( Axis )](http://www.oxxostudio.tw/articles/201411/svg-d3-04-axis.html) 還有 [SVG D3.js - 區域 ( area )](http://www.oxxostudio.tw/articles/201411/svg-d3-05-area.html)：( 範例：[svg-d3-08-ordinal-demo12.html](/demo/201412/svg-d3-08-ordinal-demo12.html) )

![SVG D3.js - 序數比例尺 ( ordinal )](/img/articles/201412/20141223_1_13.jpg)

