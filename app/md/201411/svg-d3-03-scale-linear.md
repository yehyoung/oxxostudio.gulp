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

<meta property="article:published_time" content="2014-11-12T22:25:00+01:00">

<meta name="keywords" content="svg,d3,d3.js,scale,linear,比例">

<meta name="description" content="當我們面對一個折線圖或長條圖的長寬，超過電腦視窗的畫面大小，就必須用比例的方式讓圖表等比例縮小來適合寬度，在 D3.js 裏頭，就要使用 scale 這個方法來達成。">

<meta itemprop="name" content="SVG D3.js - 定義比例 ( scale.linear() ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201411/20141112_1_01b.jpg">

<meta itemprop="description" content="當我們面對一個折線圖或長條圖的長寬，超過電腦視窗的畫面大小，就必須用比例的方式讓圖表等比例縮小來適合寬度，在 D3.js 裏頭，就要使用 scale 這個方法來達成。">

<meta property="og:title" content="SVG D3.js - 定義比例 ( scale.linear() ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201411/svg-d3-03-scale-linear.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201411/20141112_1_01b.jpg">

<meta property="og:description" content="當我們面對一個折線圖或長條圖的長寬，超過電腦視窗的畫面大小，就必須用比例的方式讓圖表等比例縮小來適合寬度，在 D3.js 裏頭，就要使用 scale 這個方法來達成。">

<title>SVG D3.js - 定義比例 ( scale.linear() )  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG D3.js - 定義比例 ( scale.linear() )  <span class="article-date" tag="web">NOV 12, 2014</span>

這篇原本要延續上一篇 [SVG D3.js - 繪製線段](http://www.oxxostudio.tw/articles/201411/svg-d3-02-line.html)，然後立馬做一個折線圖出來，不過在製作過程中發現有兩個重點必須要先闡述，第一個就是比例 Scale，第二個就是座標 Axis，深入研究之後，發現這兩個方法在 D3.js 裏頭學問還頗大的，所以就先獨立出來分別描述，完成後再來繼續折線圖的製作。

什麼是比例 Scale 呢？最常見到比例尺的地方應該就是在地圖上，例如台灣面積大約 36,188 平方公里，要把台灣塞進一張 A4 大小的地圖根本就是天方夜譚，這時候就必須要用到比例了。

![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_02.png)

<br/>
除了地圖，應用比例的原理，在日常生活中也是很常見，例如最近發現全世界最大的恐龍，大約是非洲大象的 14 倍大，或是今天走在路上看到一個「九頭身」的美女，亦或是拍照的時候旁邊放個十元硬幣，都是很簡單的比例應用。

![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_03.png)

<br/>
有點離題了，因此，同樣的當我們面對一個折線圖或長條圖的長寬，超過電腦視窗的畫面大小，就必須用比例的方式讓圖表等比例縮小來適合寬度，在 D3.js 裏頭，就要使用 scale 這個方法來達成 ( 舖梗舖好長~ XD )，首先來看一下 scale 要怎麼來使用，Scale 有分成兩大類，第一類是「Quantitative」，主要以數字或日期為比例縮放的依據，第二類是「Ordinal」，則是以自訂的名稱或標籤為縮放依據，這篇會先介紹第一類「Quantitative」，接著再搭配座標軸「Axis」介紹第二類「Ordinal」。

Quantitative Scale 又分為 linear、pow、log、quantize、threshold、quantile 和 identity，其中又以 linear 最常使用，這篇也將主要介紹 scale.linear() 的用法;scale.linear() 具有以下幾個 API 可以使用：
> 
- linear.domain([numbers])
- linear.range([values])
- linear.invert(y)
- linear.clamp([boolean])
- linear.rangeRound(values)
- linear.nice([count])
- linear.interpolate([factory])
- linear.ticks([count])
- linear.tickFormat(count, [format])
- linear.copy()


<br/>
來解釋一下吧！

- **linear.domain([numbers])、linear.range([values])**

	一開始要使用 scale.linear ，必須要有一個 domain([number])，裏頭是一個數字陣列，最少要有兩個數字以上才可以，這代表了「原始的資料範圍」，在 domain 之後通常都會緊跟著一個 range([values])，內容也是一個「值」的陣列，代表原本 domain 內容陣列的範圍，dmmain 具有的陣列長度多少，range 內容陣列的長度也要多少，看解釋其實很模糊，所以直接來看一下圖片說明，下圖的 domain 是原本是 30-50 ( domain([30,50]) )，經過 range 變成了 0-100 ( range([0,100]) )，這時候原本的 40 就會變成 50。

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_04.png)

	<br/>
	上面看起來就像是小叮噹的放大燈，如果將 domain 設為 0-500 ( domain([0,500]) )，經過 range 變成了 0-100 ( range([0,100]) )，這時候就像是小叮噹的縮小燈一樣，這時候原本的 250 就會變成 50。

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_05.png)

	<br/>
	用前一篇的 line 來畫個折線圖試試看，當折線圖超過 SVG 的範圍就會被裁切，就可以利用 scale 將折線圖固定在一定的大小內，如此一來也不用擔心數值的變動，因為一定都會以我們自訂的比例在範圍內顯示。原本的折線圖，看起來實在有夠小。 ( 範例：[svg-d3-03-scale-linear-demo1.html](/demo/201411/svg-d3-03-scale-linear-demo1.html) )

		  var data = [
		  {x:0, y:1.89}, 
		  {x:1, y:2.77}, 
		  {x:2, y:0.86}, 
		  {x:3, y:3.45}, 
		  {x:4, y:4.13}, 
		  {x:5, y:3.59}, 
		  {x:6, y:2.33}, 
		  {x:7, y:3.79}, 
		  {x:8, y:2.61}, 
		  {x:9, y:2.15}
		  ];
		
		  var width = 240,
		    height = 120;
		
		  var s = d3.select('#s');
		
		  s.attr({
		      'width': width,
		      'height': height,
		    }).style({
		      'border':'1px solid #000'
		    });
		
		  var line = d3.svg.line()
		    .x(function(d) {
		      return d.x;
		    }).y(function(d) {
		      return d.y;
		    });
		
		  s.append('path')
		    .attr({
		    	'd':line(data),
		    	'stroke':'#09c',
		    	'fill':'none'
		    });
		  </script>

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_06.png)

	<br/>
	套用 scale 的折線圖，瞬間放大到適合的大小，套用 scale 的方法很簡單，最主要就是要先宣告水平和垂直的 scale 方法，然後把需要套用這個 scale 方法的數值加上 **scaleX(d.x)** 或 **scaleY(d.y)**，數值就會根據 scale 的定義進行縮放。( 範例：[svg-d3-03-scale-linear-demo3.html](/demo/201411/svg-d3-03-scale-linear-demo3.html) ) 
		
		  var scaleX = d3.scale.linear()
		                 .range([0,width])
		                 .domain([0,9]);
		
		  var scaleY = d3.scale.linear()
		                 .range([0,height])
		                 .domain([0,5]);
		
		  var line = d3.svg.line()
		    .x(function(d) {
		      return scaleX(d.x);
		    }).y(function(d) {
		      return scaleY(d.y);
		    });

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_07.png)

	<br/>
	如果換成超過範圍的折線圖。 ( 範例：[svg-d3-03-scale-linear-demo2.html](/demo/201411/svg-d3-03-scale-linear-demo2.html) )

		  var data = [
		  {x:0, y:100}, 
		  {x:10, y:154}, 
		  {x:20, y:288}, 
		  {x:30, y:187}, 
		  {x:40, y:235}, 
		  {x:50, y:198}, 
		  {x:60, y:172}, 
		  {x:70, y:134}, 
		  {x:80, y:94}, 
		  {x:90, y:88}
		  ];

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_08.png)

	<br/>
	套用 scale 的折線圖，瞬間放大到適合的大小。 ( 範例：[svg-d3-03-scale-linear-demo4.html](/demo/201411/svg-d3-03-scale-linear-demo4.html) )

		  var scaleX = d3.scale.linear()
		                 .range([0,width])
		                 .domain([0,90]);
		
		  var scaleY = d3.scale.linear()
		                 .range([0,height])
		                 .domain([0,300]);
		
		  var line = d3.svg.line()
		    .x(function(d) {
		      return scaleX(d.x);
		    }).y(function(d) {
		      return scaleY(d.y);
		    });

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_09.png)

	<br/>
	從上面的例子可以看出 scale 其實相當的好用，利用 range 與 domain 的搭配，就可以讓圖形在指定的範圍內顯示，但如果每次都要手動計算 domain 的數值大小其實有點麻煩，這時候就可以使用 D3.js 的 **min** 與 **max** 功能 ( 回想一下，在 [SVG D3 - 淺談 D3.js 的資料處理](http://www.oxxostudio.tw/articles/201411/svg-d3-01-data.html) 有介紹過 )，就可以讓 D3.js 自動去抓取陣列裏頭的最大值和最小值，此外，在 range 的設定，如果把 [0,height] 改為 [height,0]，折線圖就會上下顛倒，畢竟 SVG 的座標系統是越往下數值越大，反過來才比較直覺。  ( 範例：[svg-d3-03-scale-linear-demo5.html](/demo/201411/svg-d3-03-scale-linear-demo5.html) )

		  var data = [
		  {x:0, y:1.89}, 
		  {x:1, y:2.77}, 
		  {x:2, y:0.86}, 
		  {x:3, y:3.45}, 
		  {x:4, y:4.13}, 
		  {x:5, y:3.59}, 
		  {x:6, y:2.33}, 
		  {x:7, y:3.79}, 
		  {x:8, y:2.61}, 
		  {x:9, y:2.15}
		  ];
		
		  var width = 240,
		    height = 120;
		
		  var s = d3.select('#s');
		
		  s.attr({
		      'width': width,
		      'height': height,
		    }).style({
		      'border':'1px solid #000'
		    });
		
		  var minX = d3.min(data, function(d){return d.x});
		  var maxX = d3.max(data, function(d){return d.x});
		  var minY = d3.min(data, function(d){return d.y});
		  var maxY = d3.max(data, function(d){return d.y});
		
		  var scaleX = d3.scale.linear()
		                 .range([0,width])
		                 .domain([minX,maxX]); //x 的最大值與最小值
		
		  var scaleY = d3.scale.linear()
		                 .range([height,0])    //反過來才會上下顛倒
		                 .domain([minY,maxY]); //y 的最大值與最小值
		
		  var line = d3.svg.line()
		    .x(function(d) {
		      return scaleX(d.x);
		    }).y(function(d) {
		      return scaleY(d.y);
		    });
		
		  s.append('path')
		    .attr({
		    	'd':line(data),
		    	'stroke':'#09c',
		    	'fill':'none'
		    });

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_10.png)

<br/>

- **linear.clamp([boolean])**

	clamp 的內容是放 true 或 false 的布林值，這只是一個開關的設定，預設是 flase，為什麼說是開關呢？因為當我們沒有設定或設為 flase 的時候，超過 domain 最大值的數字將仍然按照 range 的比例進行縮放，但若設定為 true，超過最大值的數字一律以最大值呈現。

	當數值超過了範圍，其實還是受到 range 的影響。( 範例：[svg-d3-03-scale-linear-demo6.html](/demo/201411/svg-d3-03-scale-linear-demo6.html) )

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_11.png)

	<br/>
	如果將 clamp 設為 true，超過的部分一律以最大值呈現。( 範例：[svg-d3-03-scale-linear-demo7.html](/demo/201411/svg-d3-03-scale-linear-demo7.html) )

		  var scaleX = d3.scale.linear()
		    .range([0, width])
		    .domain([0, 9])
		    .clamp(true);

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_12.png)

<br/>

- **linear.nice([count])**

	nice 會根據整體 range 的狀況，改變函數的 domain，使 domain 內的範圍值返回最接近的數，例如 0.986743 就返回 1.0，0.444 就返回 0.45，範例使用一個有套用 nice 一個沒有，就可以很明顯的看出差異，如果把 console 打開來看，就可以發現套用 nice 的數值明顯變了許多。( 範例：[svg-d3-03-scale-linear-demo8.html](/demo/201411/svg-d3-03-scale-linear-demo8.html) )
		
		  //對照組，沒有使用 .nice()
		  var scaleX1 = d3.scale.linear()
		    .range([0, width])
		    .domain([0.123, 9.189]);
		
		  var scaleY1 = d3.scale.linear()
		    .range([height, 0])
		    .domain([0.123, 5.567]); 
		
		  var line1 = d3.svg.line()
		    .x(function(d) {
		      return scaleX1(d.x);
		    }).y(function(d) {
		      return scaleY1(d.y);
		    });
		
		  //實驗組，使用 .nice()
		  var scaleX2 = d3.scale.linear()
		    .range([0, width])
		    .domain([0.123, 9.189]).nice();
		
		  var scaleY2 = d3.scale.linear()
		    .range([height, 0])
		    .domain([0.123, 5.567]).nice(); 
		
		  var line2 = d3.svg.line()
		    .x(function(d) {
		      return scaleX2(d.x);
		    }).y(function(d) {
		      return scaleY2(d.y);
		    });
		
		  s.append('path')
		    .attr({
		      'd': line1(data),
		      'stroke': '#f66',
		      'fill': 'none'
		    });
		
		  s.append('path')
		    .attr({
		      'd': line2(data),
		      'stroke': '#09c',
		      'fill': 'none'
		    });

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_13.png)

<br/>

- **linear.rangeRound(values)**

	在 Math 裏頭 round 是返回最接近的整數，因此若我們將 range 換成 rangeRound，那麼返回的數值就不會是小數而是整數，可以從 console 看出原本的小數單位，都已經變成了整數。( 範例：[svg-d3-03-scale-linear-demo9.html](/demo/201411/svg-d3-03-scale-linear-demo9.html) )

		  //對照組，range()
		  var scaleX1 = d3.scale.linear()
		    .range([0, width])
		    .domain([0, 9]);
		
		  var scaleY1 = d3.scale.linear()
		    .range([120.967, 0.678])
		    .domain([0, 5]); 
		
		  var line1 = d3.svg.line()
		    .x(function(d) {
		      return scaleX1(d.x);
		    }).y(function(d) {
		      return scaleY1(d.y);
		    });
		
		  //實驗組，rangeRound()
		  var scaleX2 = d3.scale.linear()
		    .rangeRound([0, width])
		    .domain([0, 9]);
		
		  var scaleY2 = d3.scale.linear()
		    .rangeRound([120.967, 0.678])
		    .domain([0, 5]); 
		
		  var line2 = d3.svg.line()
		    .x(function(d) {
		      return scaleX2(d.x);
		    }).y(function(d) {
		      return scaleY2(d.y);
		    });

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_14.png)
 
<br/>

- **linear.invert(y)**

	了解了 domain 和 range 之後，再來談談 linear.invert(y)，顧名思義，這就是讓套用之後的數字反轉回原本的數字，看到以下的例子，一開始的 a1 經過 range 之後，變成了，然後再經過 invert 就變回原本的數字。( 範例：[svg-d3-03-scale-linear-demo10.html](/demo/201411/svg-d3-03-scale-linear-demo10.html) )

		console.log(scaleX(2.5));             //得到 66.66666666666667 
	    console.log(scaleX.invert(66.6667));  //得到 2.50000125 

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_15.png)

<br/>
 
- **linear.ticks([count])、linear.tickFormat(count, [format])**

	ticks 和 tickFormat 通常都會一起看，ticks 會根據內容數值的範圍，按照 count 的數量來做切割，取出最適當的數值區間，預設值為 10，不過若按照數字切割出來的範圍不適當，有時不一定會按照我們所設的數字切割範圍，而 tickFormat 就是可以設定數值的格式，這兩者在 Axis 座標裏頭比較有用，這裡可以使用 console 看出差異。( 範例：[svg-d3-03-scale-linear-demo11.html](/demo/201411/svg-d3-03-scale-linear-demo11.html) )

		console.log(
	      scaleX.ticks(10)
	      );
	    console.log(
	      scaleX.ticks(10).map(scaleX.tickFormat(1,"%"))
	      );
		//格式可以參考 https://github.com/mbostock/d3/wiki/Formatting#d3_format

	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_16.png)

<br/>

- **linear.copy()**

	copy 很容易理解，就單純是複製一份 range ，而不會影響到原本的 range。( 範例：[svg-d3-03-scale-linear-demo12.html](/demo/201411/svg-d3-03-scale-linear-demo12.html) )

		   var scaleX2 = scaleX1.copy();
		
		   var scaleY2 = d3.scale.linear()
		    .range([height, 0])
		    .domain([0, 10]);
		
		   var line2 = d3.svg.line()
		    .x(function(d) {
		      return scaleX2(d.x);
		    }).y(function(d) {
		      return scaleY2(d.y);
		    });


	![SVG D3 - 定義比例 ( scale.linear() )](/img/articles/201411/20141112_1_17.png)

<br/>

- **linear.interpolate([factory])**

	還記得在 [SVG D3 - 繪製線段](http://www.oxxostudio.tw/articles/201411/svg-d3-02-line.html) 有提過 .interpolate() ，在 linear.interpolate 其實和之前提過的不太一樣，主要是內容的 factory 是使用以下的 API 進行 ( [參考 D3 API Reference](https://github.com/mbostock/d3/wiki/API-Reference) )，詳細的用法之後用到了再進行介紹 。

	- d3.interpolateNumber
	- d3.interpolateRound
	- d3.interpolateString
	- d3.interpolateRgb
	- d3.interpolateHsl
	- d3.interpolateLab
	- d3.interpolateHcl
	- d3.interpolateArray
	- d3.interpolateObject
	- d3.interpolateTransform
	- d3.interpolateZoom
	- d3.interpolators


<br/>

以上就是 D3.js 的 scale.linear() 介紹，scale.linear() 也是 Quantitative Scale 最常使用的，最後也列出 Quantitative Scale 裡其他的 API，該如何使用這邊就不多做說明，之後有機會用到就會慢慢介紹囉。

- **Identity**: linear 的特例，主要針對 1:1 的縮放。
- **Power and Logarithmic scales**: 利用指數函數來進行比例縮放。
- **Quantize and Quantile scales**: 離散並量化的比例縮放。

<!-- @@close-->
	



