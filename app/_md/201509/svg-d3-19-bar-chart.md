# SVG D3.js - 直條圖 ( Bar Chart ) 

在之前一系列的 d3.js 介紹之後，終於要來發揮 d3.js 的強項「畫圖表」了 ( 其實之前已經有畫過折線圖了，參考：[SVG D3.js - 區域 ( area )](http://www.oxxostudio.tw/articles/201411/svg-d3-05-area.html) )，這篇要來繪製的圖表是「長條圖 bar chart」，長條圖大概也是最簡單的圖表了，雖然可以直接用 CSS 和 div 來做，不過為了之後更複雜的圖表設計，這裏就直接用 SVG 進行。

一開始先熟悉一下長條圖的畫法，用一個簡單的資料數據來畫，這裏的數據我用 random 的方式產生，接著在畫面中用 d3.js 放入一個 SVG，接著利用 data 產生對應的矩形，矩形的位置和寬度，就根據數據的數值自動產生 (`data(data`和`enter()`)，很簡單的就可以完成一個 SVG 的長條圖。( 範例：[svg-d3-19-bar-chart-demo01.html](/demo/201509/svg-d3-19-bar-chart-demo01.html) )

	var data=[
	  {x:1, w:Math.floor(Math.random()*200)},
	  {x:2, w:Math.floor(Math.random()*200)},
	  {x:3, w:Math.floor(Math.random()*200)},
	  {x:4, w:Math.floor(Math.random()*200)},
	  {x:5, w:Math.floor(Math.random()*200)},
	];

	var s = d3.select('body')
	          .append('svg')
	          .attr({
	            'width':300,
	            'height':300
	          });

	s.selectAll('rect')
	 .data(data)
	 .enter()
	 .append('rect')
	 .attr({
	  'fill':'#09c',
	  'width':function(d){
	    return d.w;
	  },
	  'height':30,
	  'x':0,
	  'y':function(d){
	    return (d.x-1) * 35;
	  }
	 });

![SVG D3.js - 直條圖 ( Bar Chart )](/img/articles/201509/20150919_1_02.jpg)

不過只有長條圖好像是不太夠，我們再把文字加進去，畢竟這樣才知道數值究竟為何，SVG 加入數值的方式就是用 text 的標籤，和製作 rect 是差不多的，加進去之後同樣要根據數據來設定位置。( 範例：[svg-d3-19-bar-chart-demo02.html](/demo/201509/svg-d3-19-bar-chart-demo02.html) )

	s.selectAll('text')
	 .data(data)
	 .enter()
	 .append('text')
	 .text(function(d){
	  return d.w;
	 })
	 .attr({
	  'fill':'#000',
	  'x':function(d){
	    return d.w + 3;
	  },
	  'y':function(d){
	    return d.x * 35 - 12;
	  }
	 });

![SVG D3.js - 直條圖 ( Bar Chart )](/img/articles/201509/20150919_1_03.jpg)

如果今天要在長條圖加上動畫也是很容易的，這裏我們要用到 transition 來讓長條圖可以用動畫的方式變長，而數字的增加可以搭配 tween 來做增加的效果，如果不會的可以參考我之前寫的這兩篇文章：[SVG D3.js - transition 基本篇](http://www.oxxostudio.tw/articles/201501/svg-d3-14-transition-1.html) 和 	[SVG D3.js - transition ( tween、interpolate )](http://www.oxxostudio.tw/articles/201509/svg-d3-15-transition-tween.html)，不過因為要進行漸變的動畫，所以一開始我都先把寬度和數值都設為 0，漸變的時間用 duration 設為 1500 毫秒。( 範例：[svg-d3-19-bar-chart-demo03.html](/demo/201509/svg-d3-19-bar-chart-demo03.html) )

	s.selectAll('rect')
	 .data(data)
	 .enter()
	 .append('rect')
	 .attr({
	  'fill':'#09c',
	  'width':0,
	  'height':30,
	  'x':0,
	  'y':function(d){
	    return (d.x-1) * 35;
	  }
	 })
	 .transition()
	 .duration(1500)
	 .attr({
	  'width':function(d){
	    return d.w;
	  }
	 });

	s.selectAll('text')
	 .data(data)
	 .enter()
	 .append('text')
	 .text(function(d){
	  return 0  ;
	 })
	 .attr({
	  'fill':'#000',
	  'x':3,
	  'y':function(d){
	    return d.x * 35 - 12;
	  }
	 })
	 .transition()
	 .duration(1500)
	 .attr({
	  'x':function(d){
	    return d.w + 3;
	  }
	 })
	 .tween('number',function(d){
	    var i = d3.interpolateRound(0, d.w);
	      return function(t) {
	      this.textContent = i(t);
	    };
	 });

![SVG D3.js - 直條圖 ( Bar Chart )](/img/articles/201509/20150919_1_04.gif)

既然可以讓一開始有動畫效果，其實也可以做一個按鈕，每次點按鈕的時候，就會自動生成一組數據，並讓長條圖自動切換顯示，實作的方式我先在外面建了一陣列型別的變數，預設為 0，目的在紀錄每次動畫做完之後的數值，這樣下次點擊按鈕，就會用這組數值作為基準去變化，除了這個按鈕，我又多做了一個歸零的按鈕，點選後就會歸零。

	var newNumber = [0,0,0,0,0];

	var btn = d3.select('#btn')
	            .on('click',function(){
	              for(var i=0; i<5; i++){
	                data[i].w = Math.floor(Math.random()*200);
	              }
	              _transition(data);
	            });
	
	var btn = d3.select('#zero')
	            .on('click',function(){
	              for(var i=0; i<5; i++){
	                data[i].w = 0;
	              }
	              _transition(data);
	            });

<br/>

然後在剛剛文字 tween 的 function 加入這兩段，目的就是紀錄數值。

	var i = d3.interpolateRound(newNumber[d.x-1], d.w);
	newNumber[d.x-1] = d.w;

<br/>

最後就是寫漸變的 function，這裏就不需要用到 enter 了，因為 enter 是把數據放進去，這裏純粹是數據的變化，直接用 data 即可，寫完 function，我們就完成了一個點選按鈕，長條圖就會動態變化的效果囉！( 範例：[svg-d3-19-bar-chart-demo04.html](/demo/201509/svg-d3-19-bar-chart-demo04.html) )

	function _transition(){

	  s.selectAll('rect')
	   .data(data)
	   .transition()
	   .duration(1500)
	   .attr({
	    'width':function(d){
	      return d.w;
	    }
	   });

	  s.selectAll('text')
	   .data(data)
	   .transition()
	   .duration(1500)
	   .attr({
	    'x':function(d){
	      return d.w + 3;
	    }
	   })
	   .tween('number',function(d){
	      var i = d3.interpolateRound(newNumber[d.x-1], d.w);
	      newNumber[d.x-1] = d.w;
	        return function(t) {
	        this.textContent = i(t);
	      };
	  });

	}

![SVG D3.js - 直條圖 ( Bar Chart )](/img/articles/201509/20150919_1_05.gif)

當然直條圖的變化還有很多，下一篇會直接用一些現成的數據，來做一點實際的應用。

