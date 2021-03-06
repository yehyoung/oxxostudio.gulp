# SVG D3.js - 拖拉行為 ( Drag Behavior ) 

![](/img/articles/201509/svg-d3-16-drag-behavior.gif#preview-img) 

這篇要來談一下 d3.js 裏頭的「拖拉行為」( Drag Behavior )，其實 drag 這個行為在 web 的世界裡頭早就存在已久，HTML5 出來之後更變成了一些基本的網頁行為，不過這個行為在 d3.js 該如何實現呢？其實 d3.js 早就已經幫我們做好了，不僅適用在 svg 裡頭，更可以應用在一般的網頁元素上頭。

要使用 d3.js 的 drag，一開始必須要先利用`d3.behavior.drag()`宣告這個行為，接著在裡面寫入`dragstart`、`drag`和`dragend`要做些什麼事，接著再讓我們的選擇的物件用`call`去呼叫，就可以讓我們選擇的物件具有 drag 的行為，用講的不是很好理解，用程式碼一步步分解來看。

一開始我們先用一個變數去裝載 drag 行為，方便我們後續呼叫 ( call ) 使用，在 d3.js 裏頭有三種 drag 行為，分別是`dragstart`、`drag`和`dragend`，直接用 on 後面接上去即可，很像 jQuery 的做法。

	var drag = d3.behavior.drag()  
	            .on('dragstart', function() { 
	              //拖拉開始時，要做什麼事 
	            })
	            .on('drag', function() { 
	              //拖拉時，要做什麼事 
	            })
	            .on('dragend', function() { 
	              //拖拉結束時，要做什麼事 
	            });

<br/>

接著我在 HTML 裏頭放入一個 id 為 r 的正方形，CSS 的位置設為 absolute ( 這樣才可以拖拉 )，然後用 d3.js 的選擇器來選擇它，設定位置，並且呼叫 drag。

	var rect = d3.select('#r')
	            .style({'left':'50px','top':'50px'})
	            .call(drag);

<br/>

完成之後我們就要來寫一下 drag 要做些什麼事情，因為我們已經宣告了 rect 這個變數，所以我們在 drag 裏頭就可以使用 ( 因為 rect 會呼叫 drag，所以變數的宣告 drag 要寫在前面 )，這時候要用到`d3.event`來獲取 drag 當下的事件，因為要知道有哪些事件，所以我們先用 console 來看看，如果用 console 印出每個`d3.event`，可以看到裡面主要包含「type」以及「sourceEvent」，「type」表示拖拉的識別行為，而「sourceEvent」則是我們網頁原本會有的事件，像是偵測滑鼠座標的 pageX 和 pageY 都在裡頭，而`drag`幫我們把滑鼠座標給直接取出到外層變成物件，就可以直接坐設定了。( 範例：[svg-d3-16-drag-behavior-demo1.html](/demo/201509/svg-d3-16-drag-behavior-demo1.html) )

	var drag = d3.behavior.drag()  
	            .on('dragstart', function() { 
	              console.log(d3.event);
	            })
	            .on('drag', function() { 
	              console.log(d3.event);
	            })
	            .on('dragend', function() { 
	              console.log(d3.event);
	            });

![SVG D3.js - 拖拉行為 ( Drag Behavior )](/img/articles/201509/20150914_1_02.jpg)

有了滑鼠事件之後，就可以實作拖拉的行為了，`dragstart`和`dragend`只需要負責改變顏色，`drag`就讓方塊的中心點可以跟著滑鼠座標移動，移動的時候還會變成綠色。( 範例：[svg-d3-16-drag-behavior-demo2.html](/demo/201509/svg-d3-16-drag-behavior-demo2.html) )

	var drag = d3.behavior.drag()  
	            .on('dragstart', function() { 
	              rect.style({'background':'red'}); 
	            })
	            .on('drag', function() { 
	              rect.style({
	                'left':(d3.event.x-25)+'px',
	                'top':(d3.event.y-25)+'px',
	                'background':'green'
	              }); 
	            })
	            .on('dragend', function() { 
	              rect.style({'background':'#000'}); 
	            });
	  
	var rect = d3.select('#r')
	            .style({'left':'50px','top':'50px'})
	            .call(drag);

![SVG D3.js - 拖拉行為 ( Drag Behavior )](/img/articles/201509/20150914_1_03.gif)

不過，今天如果只有單純拖拉的行為好像不足以表現 d3.js 的長處，所以我們把 drag 換成 svg，根據 data 來產生一些圓形，並讓這些圓形都可以拖拉，一開始我們先設定 data ( 或是引入 data 也可以 )，然後設定 drag 行為，在 body 裡面放入 svg，有了 svg 之後就根據 data，利用`.data(data).enter()`產生圓形，呼叫 drag 行為，就完成囉！( 範例：[svg-d3-16-drag-behavior-demo3.html](/demo/201509/svg-d3-16-drag-behavior-demo3.html) )

	var data = [
	  {'cx':210, 'cy':210, 'r':50, 'fill':'#ff0000'},
	  {'cx':75, 'cy':75, 'r':40, 'fill':'#00cc00'},
	  {'cx':200, 'cy':30, 'r':30, 'fill':'#0000ff'},
	  {'cx':80, 'cy':190, 'r':80, 'fill':'#0099cc'},
	  {'cx':100, 'cy':100, 'r':30, 'fill':'#ff9900'}
	];

	var drag = d3.behavior.drag()  
	            .on('dragstart', function(d) { 
	              d3.select(this).attr({'fill':'black'}); 
	            })
	            .on('drag', function(d) { 
	              d3.select(this).attr({
	                'cx': d.x = d3.event.x,
	                'cy': d.y = d3.event.y,
	              }); 
	            })
	            .on('dragend', function(d) { 
	              d3.select(this).attr({'fill':d.fill}); 
	            });

	var svg = d3.select('body')
	          .append('svg')
	          .attr({
	            'width':'400',
	            'height':'300'
	          })
	          .style({
	            'border':'1px solid #000'
	          });

	svg.selectAll('circle')
	          .data(data)
	          .enter()
	          .append('circle')
	          .attr({
	            'cx': function(d){return d.cx;},
	            'cy': function(d){return d.cy;},
	            'r': function(d){return d.r;},
	            'fill': function(d){return d.fill;}
	          })
	          .call(drag);

![SVG D3.js - 拖拉行為 ( Drag Behavior )](/img/articles/201509/svg-d3-16-drag-behavior.gif)

