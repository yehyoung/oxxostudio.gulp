# SVG D3.js - 區域 ( area )  

理解了 line、scale 和座標軸之後，再來要介紹與 area 這個方法，area 就像字面翻譯一樣，可以繪製一個區域，同時也可以像 line 一樣的設定 interpolate ，因此搭配 line 一起使用，就可以畫出具有區域顏色的折線圖，相當的有意思。

一如往常，先來看看 area 有哪些 API 可以使用：
> 
- area.x
- area.x0
- area.x1
- area.y
- area.y0
- area.y1
- area.interpolate
- area.tension
- area.defined

<br/>

- **x([x])、x0([x0])、x1([x1])、y([y])、y0([y0])、y1([y1])**

	一開始的 x、x0、x1、y、y0、y1 這六個 API 是要一併處理的，這幾個 API 是專門處理座標的 API，通常 **x、y0、y1 互相搭配，y、x0、x1 互相搭配**，舉例來說，若我們把 x 和 y1 帶入一串數據 ( 不是陣列，要用 data 的方式帶入 )，y0 固定，那麼就會畫出一個區域的圖形。( [svg-d3-05-area-demo1.html](/demo/201411/svg-d3-05-area-demo1.html) )
	
		  var data = [
		  {x:0, y:18}, 
		  {x:20, y:27}, 
		  {x:40, y:56}, 
		  {x:60, y:34}, 
		  {x:80, y:41}, 
		  {x:100, y:35}, 
		  {x:120, y:100}, 
		  {x:140, y:37}, 
		  {x:160, y:26}, 
		  {x:180, y:21}
		  ];

		  var width = 240,
		    height = 120;

		  var s = d3.select('#s');

		  s.attr({
		      'width': width,
		      'height': height,
		    });

		  var area = d3.svg.area()
		      .x(function(d) { return d.x; })
		      .y0(0)
		      .y1(function(d) { return d.y; });

		    s.append('path')
		      .attr({
		      	'	d':area(data),
		      		'stroke':'#c00',
		      		'fill':'rgba(255,0,0,.3)',
        			'transform':'translate(2,2)'
		      });

	![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_02.png)

	<br/>
	如果我們將陣列換成垂直的，再改一下 area 的 API，方向就會變成垂直的。( [svg-d3-05-area-demo2.html](/demo/201411/svg-d3-05-area-demo2.html) )

		  var area = d3.svg.area()
		      .y(function(d) { return d.y; })
		      .x0(0)
		      .x1(function(d) { return d.x; });

	![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_03.png)
	
	<br/>
	如果要比較簡單來思考的話，y0 和 y1 可以分別看成是上方 y 座標與下方 y 坐標，x0、x1 可以看成左方的 x 座標與右方的 x 座標，基本上一定要有 x 一組數據搭配 y0、y1 或 y 一組數據搭配 x0、x1，因此最重要的其實就是必須要有一組座標來產生 area，前面使用了固定 x0 或固定 y0 的方式，就可以做出折線圖的區域效果，當然，如果我們數據，就會產生非常有趣的形狀。( [svg-d3-05-area-demo3.html](/demo/201411/svg-d3-05-area-demo3.html) )
	
		  var data = [
		  {x:0, y0:0, y1:20},
		  {x:20, y0:10, y1:30},
		  {x:40, y0:30, y1:80},
		  {x:60, y0:60, y1:70},
		  {x:80, y0:40, y1:40},
		  {x:100, y0:40, y1:20},
		  {x:120, y0:50, y1:30},
		  {x:140, y0:50, y1:40},
		  {x:160, y0:40, y1:20},
		  ];
		  
		  var area = d3.svg.area()
		      .x(function(d) { return d.x; })
		      .y0(function(d) { return d.y0; })
		      .y1(function(d) { return d.y1; });
		      
	![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_04.png)
	
<br/>

- **area.interpolate([interpolate])、area.tension([tension])**

	這兩個 API 和 line() 的用法其實一模一樣，可以參考 [SVG D3 - 繪製線段](http://www.oxxostudio.tw/articles/201411/svg-d3-02-line.html)，這兩者的目的在於根據我們的數據，描繪出有 B-spline 或 Cardinal spline  或 cubic interpolation 的邊緣線段，這裡我們拿剛剛範例 1 來做比較，實驗組套用了`.interpolate('bundle')`。( [svg-d3-05-area-demo4.html](/demo/201411/svg-d3-05-area-demo4.html) )
	
		 //對照組
		  var area1 = d3.svg.area()
		      .x(function(d) { return d.x; })
		      .y0(0)
		      .y1(function(d) { return d.y; });

		  //實驗組
		  var area2 = d3.svg.area()
		      .x(function(d) { return d.x; })
		      .y0(0)
		      .y1(function(d) { return d.y; })
		      .interpolate('bundle');

		    s.append('path')
		      .attr({
		        'd':area1(data),
		        'stroke':'#00c',
		        'fill':'rgba(0,0,255,.1)',
		        'transform':'translate(2,2)'
		      });
		    s.append('path')
		      .attr({
		        'd':area2(data),
		        'stroke':'#c00',
		        'fill':'rgba(255,0,0,.3)',
		        'transform':'translate(2,2)'
		      });
	      
	![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_05.png)	

<br/>

- **area.defined([defined])**

	defined 就式定義那些資料該出現或不該出現，舉例來說可以定義資料大於多少才出現，或資料是偶數才能出現...等之類,下面的範例讓區域只顯示 x 不是三的倍數的資料。 ( [svg-d3-05-area-demo5.html](/demo/201411/svg-d3-05-area-demo5.html) )

		  //對照組
		  var area1 = d3.svg.area()
		      .x(function(d) { return d.x; })
		      .y0(0)
		      .y1(function(d) { return d.y; });
		
		  //實驗組
		  var area2 = d3.svg.area()
		      .x(function(d) { return d.x; })
		      .y0(0)
		      .y1(function(d) { return d.y; })
		      .defined(function(d) { return d.x%3 != 0; });
	      
	![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_06.png)	

<br/>

理解了 area 的用法之後，現在要來把之前的 line()、scale()、Axis() 和 area() 全部結合在一起，做一個票漂亮亮的圖表，第一步，直接參考上一篇的 [範例](http://www.oxxostudio.tw/articles/201411/svg-d3-04-axis-demo5.html) 拿來用，然後我們直接多新增 area 進去，就可以做出具有區域的折線圖表，程式碼有點多，不過都是之前介紹過的，所以直接點開範例看看吧。( [svg-d3-05-area-demo6.html](/demo/201411/svg-d3-05-area-demo6.html) )
	      
![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_07.png)	

<br/>

只有一個折線圖不稀奇，可以放超過一個折線圖，看起來整個圖表的樣貌就更為完善囉！( [svg-d3-05-area-demo7.html](/demo/201411/svg-d3-05-area-demo7.html) )

資料長這樣：

	  var data = [
	  {x:0, y:38, z:28}, 
	  {x:20, y:27, z:15}, 
	  {x:40, y:56, z:39}, 
	  {x:60, y:34, z:45}, 
	  {x:80, y:41, z:88}, 
	  {x:100, y:35, z:74}, 
	  {x:120, y:100, z:55}, 
	  {x:140, y:57, z:75}, 
	  {x:160, y:36, z:44}, 
	  {x:180, y:41, z:30}
	  ];

<br/>
兩條線段兩個區域：

	  //line
	  var line1 = d3.svg.line()
	    .x(function(d) {
	      return scaleX(d.x);
	    }).y(function(d) {
	      return scaleY(d.y);
	    });
	
	  var line2 = d3.svg.line()
	    .x(function(d) {
	      return scaleX(d.x);
	    }).y(function(d) {
	      return scaleY(d.z);
	    });
	
	  //area
	  var area1 = d3.svg.area()
	  .x(function(d) { return scaleX(d.x); })
	  .y0(height)
	  .y1(function(d) { return scaleY(d.y); });
	
	  var area2 = d3.svg.area()
	  .x(function(d) { return scaleX(d.x); })
	  .y0(height)
	  .y1(function(d) { return scaleY(d.z); });
	
	  s.append('path')
	    .attr({
	      'd':line1(data),
	      'stroke':'#06c',
	      'fill':'none',
	      'transform':'translate(35,20)' 
	    });
	
	  s.append('path')
	  .attr({
	    'd':area1(data),
	    'fill':'rgba(0,150,255,.1)',
	    'transform':'translate(35,20)' 
	  });
	
	  s.append('path')
	    .attr({
	      'd':line2(data),
	      'stroke':'#c00',
	      'fill':'none',
	      'transform':'translate(35,20)' 
	    });
	
	  s.append('path')
	  .attr({
	    'd':area2(data),
	    'fill':'rgba(255,0,0,.1)',
	    'transform':'translate(35,20)' 
	  });
	    
  
![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_08.png)	

<br/>

以上就是 D3.js area 的基本介紹，相信理解之後，就可以做出更多有趣的圖表囉！最後，這篇文章的起始圖片，取自三星的 S3 廣告，總共有兩部，都超讚的，我很喜歡，分享給大家。^_^

![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_09.png)  
[http://youtu.be/zyMfpJh3h4A](http://youtu.be/zyMfpJh3h4A)

<br/>
![SVG D3 - 區域 ( area )](/img/articles/201411/20141116_1_10.png)   
[http://youtu.be/kF0yk9q2hp0](http://youtu.be/kF0yk9q2hp0)	
