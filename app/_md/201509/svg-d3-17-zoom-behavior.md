# SVG D3.js - 縮放行為 ( Zoom Behavior ) 

![](/img/articles/201509/svg-d3-17-zoom-behavior.jpg#preview-img) 

上一篇我們提到了「拖拉行為 Drag Behavior」，但在視覺化圖表的世界裡，如果只有拖拉好像還是不夠的，因此 d3.js 也很貼心的設計了「縮放行為」( Zoom Behavior )，讓我們可以透過例如滑鼠滾輪滾動或手指的手勢，就可以進行圖表的縮放，這篇也將要來探討是如何實作的，畢竟縮放的效果在 web 領域是比較少見也比較不容易實做，而 d3.js 與 svg 的結合，讓這個效果可以輕鬆愜意的展現。

> 參考：[拖拉行為 Drag Behavior](http://www.oxxostudio.tw/articles/201509/svg-d3-16-drag-behavior.html)

zoom 的用法和 drag 滿類似的，都是一開始要先用`d3.behavior.zoom();`宣告行為，然後再使用`call`來呼叫，不過 zoom 相對又稍微複雜了些，因為又多了一些參數需要設定，讓我們先來看一下它提供了哪些 api：

>- zoom.translate([translate])：移動距離，預設為(0,0)
- zoom.scale([scale])：縮放大小比例，預設為(1)
- zoom.scaleExtent([extent])：縮放最大值與最小值，預設為(1,無限大)
- zoom.center([center])：預設值為 null，縮放中心點，會以滑鼠指標位置為中心點
- zoom.x([x])：預設值為 null，指定縮放時，應自動調整其域 x 縮放比例
- zoom.y([y])：預設值為 null，指定縮放時，應自動調整其域 y 縮放比例
- zoom.on(type, listener)：提供「zoomstart」、「zoom」和「zoomend」的監聽事件
- zoom.event(selection)：執行當下事件

<br/>

雖然都列出來，不過預設值為 null 的 center、x 和 y 看了許多範例也沒有看到相關的用法，難怪會預設為 null 了，可能之後做得比較複雜會用到也不一定，所以這三個就不在這篇介紹，這篇主要來介紹「基本的縮放」、「點選放大」以及「reset 回原本尺寸」的實作。

首先我們先用 d3.js 來放入 svg，設定長寬，並給予一個邊框。( 如果不知道怎麼使用的，可以參考我之前的[文章](http://www.oxxostudio.tw/list.html)，在標題搜尋輸入「d3」 )

	var w = 800;
	var h = 400;

	var svg = d3.select('body')
    .append('svg')
    .attr({
      'width':'100%',
      'height':'100%'
    }).style({
      'border':'1px solid #000'
    });

<br/>

接著在 svg 裏頭放入一個變數名為 container 的群組 g，把要縮放的東西全都丟進去裡面，首先要丟進去的是垂直和水平的灰線，這裡我用了`d3.range`來快速畫線，`d3.range`有三個屬性，第一個和第二個是範圍，第三個是中間自動產生的數值的間距，由我的設定可以看出，假設 0 到 w 是 300，每 30 做一個區分，所以 x 方向會有 11 個數字產生，而 y 方向也是一樣的做法，由此我們便可以由這些數字畫出對應的線條了。

	var container = svg.append('g');

	container.append('g')
	  .selectAll('line')
	  .data(d3.range(0, w, 30))
	  .enter()
	  .append('line')
	  .attr({
	    'x1': function(d) { return d; },
	    'y1': 0,
	    'x2': function(d) { return d; },
	    'y2': h,
	    'stroke':'#ddd',
	    'fill':'none'
	  });

	container.append('g')
	  .selectAll('line')
	  .data(d3.range(0, h, 30))
	  .enter()
	  .append('line')
	  .attr({
	    'x1': 0,
	    'y1': function(d) { return d; },
	    'x2': w,
	    'y2': function(d) { return d; },
	    'stroke':'#ddd',
	    'fill':'none'
	  });

<br/>

再來就是在畫面上放入一些圓球，這裏直接用一個 data 的陣列來產生這些球，也因為這些球也要縮放，所以同樣放在 container 裡頭。

	var data = [
	  {'cx':150, 'cy':210, 'r':50, 'fill':'#ff0000'},
	  {'cx':75, 'cy':55, 'r':40, 'fill':'#00cc00'},
	  {'cx':200, 'cy':30, 'r':30, 'fill':'#0000ff'},
	  {'cx':650, 'cy':190, 'r':70, 'fill':'#0099cc'},
	  {'cx':300, 'cy':200, 'r':30, 'fill':'#ff9900'}
	];

	container.append("g").selectAll('circle')
	  .data(data)
	  .enter()
	  .append('circle')
	  .attr({
	    'cx': function(d){return d.cx;},
	    'cy': function(d){return d.cy;},
	    'r': function(d){return d.r;},
	    'fill': function(d){return d.fill;}
	  })
	  .style({
	    'cursor':'pointer'
	  });

<br/>

如果沒有意外，完成後的長相應該會像下圖這樣，不過還不能縮放，因為我們還沒有寫 zoom 的程式進去。( 範例：[svg-d3-17-zoom-behavior-demo01.html](/demo/201509/svg-d3-17-zoom-behavior-demo01.html) )

![SVG D3.js - 縮放行為 ( Zoom Behavior )](/img/articles/201509/20150915_1_02.jpg)

再來就是要針對 SVG 加入 zoom 的行為，我們先新增三個全域變數 x、y、s，作為紀錄縮放改變大小的位置偏移量以及縮放尺寸，如此一來我們「要縮回去原本大小的時候，就有一個參考的準則」，接著設置一個 zoom 的行為，一開始的 translate 設為 0,0，也就是會對齊左上角，scaleExtent 設為 [1,10]，最大值鎖定在 10 倍大，預設的 scale 設為 1，然後寫一下在 zoom 發生時要執行的 function，重點在利用`d3.event.translate`獲取當下的偏移量，用`d3.event.scale`獲得當下的縮放比例，最後設置新的偏移量以及尺寸。( 在這裡不用煩惱滑鼠與座標的轉換，因為在 d3.event 裏頭已經幫我們算好了 )

然後最重要的，在剛剛的 svg 後方加入 call，呼叫 zoom 的行為，到這個步驟，打開範例我們已經可以用滑鼠的滾輪，或是手勢來進行縮放了。
( 範例：[svg-d3-17-zoom-behavior-demo02.html](/demo/201509/svg-d3-17-zoom-behavior-demo02.html) )

	var x,y,s;

	var zoom = d3.behavior.zoom()
	    .translate([0, 0])
	    .scaleExtent([1, 10])
	    .scale(1)
	    .on("zoom", zoomed);

	function zoomed() {
	  x=d3.event.translate[0];
	  y=d3.event.translate[1];
	  s=d3.event.scale;
	  container.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
	}

	var svg = d3.select('body')
	.append('svg')
	.attr({
	  'width':'100%',
	  'height':'100%'
	}).style({
	  'border':'1px solid #000'
	})
	.call(zoom);

<br/>

接著，我在畫面裡頭放上一個 id 為 reset 的按鈕，目的在於點選這個按鈕的時候，不論今天我把畫面縮放到如何，都會恢復為預設的大小和位置，當然因為是按鈕，會有「click」事件，直接用 d3.js 提供的 on api 就可以，不過如果只有恢復原本的大小，畫面就會是跳動的，不會有中間的補間動畫，因此這裡我利用之前提過的「[tween](http://www.oxxostudio.tw/articles/201509/svg-d3-15-transition-tween.html)」，來加入補間動畫，由於要從現在縮放的大小跑到預設值，就必須要用到一開始的全域變數 s、x 和 y，最後呼叫`zoom.event`，就可以很流暢的恢復到原本的大小。

	d3.select('#reset').on('click',function(){
	  d3.transition().duration(250).tween("zoom", function() {
	    var si = d3.interpolate(s, 1);
	    var xi = d3.interpolate(x, 0);
	    var yi = d3.interpolate(y, 0);
	    return function(t){
	      svg.call(zoom.translate([xi(t),yi(t)]).scale(si(t)).event);
	    }
	  });
	});

<br/>

但只有這樣子我還不滿足，應該還要加上一個點選圓形就會放大的效果，所以我們在每個圓形上都加上 click 事件，利用`getAttribute`獲得圓心座標，然後利用`(w-r)/2-4*cx`或`(h-r)/2-4*cy`的簡單數學計算讓放大的時候圓心會置中 ( 放大四倍就乘四 )，最後同樣用搭配`tween`和`zoom.event`就可以完成點擊放大的效果。

	d3.selectAll('circle').on('click',function(){
	  var circle = d3.select(this);
	  circle.transition().duration(250).tween("zoom", function() {
	    var r = this.getAttribute('r')*1;
	    var cx = this.getAttribute('cx')*1;
	    var cy = this.getAttribute('cy')*1;
	    var si = d3.interpolate(s, 4);
	    var xi = d3.interpolate(x, (w-r)/2-4*cx);
	    var yi = d3.interpolate(y, (h-r)/2-4*cy);
	    return function(t){
	      svg.call(zoom.translate([xi(t),yi(t)]).scale(si(t)).event);
	    }
	  });
	});

最後最後，我們加上一段`svg.call(zoom.event);`，這樣一開始才會按照我們設定 zoom 的屬性安排畫面，到這邊，我們已經完成了一個可以縮放，點選也會放大，又可以回歸原本大小的畫面囉！zoom 其實相當的好用，之後會再繼續介紹更多好玩的！ ( 最終完成範例：[svg-d3-17-zoom-behavior-demo03.html](/demo/201509/svg-d3-17-zoom-behavior-demo03.html) )

![SVG D3.js - 縮放行為 ( Zoom Behavior )](/img/articles/201509/20150915_1_03.gif)


