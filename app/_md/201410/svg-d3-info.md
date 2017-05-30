# SVG D3.js - 起手式  

![](/img/articles/201410/svg-d3-info.jpg#preview-img)

雖然說對 D3.js 的印象是從圖形的表現開始，但 D3.js 真正的強項卻是在它的資料處理 ( data )，也因為能夠用很簡單的方式處理資料，將資料餵給 HTML 或 SVG，才能夠輕鬆的長出漂漂亮亮的圖形，也才更能將心力放在設計一個完美個圖表上，而 D3.js 的 data 也不見得只適用在 SVG 的圖形產生，只要是 HTML 的 DOM 也都可以藉由這個方式作成，例如以往要將一百個一千個資料放到 DOM 裡或產出 DOM，必須用上 for 迴圈或是 each 的方式，這部分 D3 也幫我們都解決掉了，真是相當的方便。

在介紹資料處理之前，一定得先來一段 D3.js 的起手式，第一步，掛載 D3.js：

	<script src="http://d3js.org/d3.v3.min.js"></script>

掛載完 D3.js 之後，接下來就是要使用 D3，與 jquery 的「$」符號很像的地方，要使用 D3，也是要有 d3 開頭，以下面的範例來說，就是選取了所有的 p 標籤,跟 jquery 裏頭的選擇器很像 ( $('p') )，而 D3 也可以和 jquery 混著使用，因為 D3 都會是 d3 開頭，基本上並不會有甚麼衝突的情形發生。

	d3.selectAll('p')

要一層層選擇下去的話，也可以這樣寫：

HTML：

	<div>red
  		<div>blue</div>
	</div>

JS：

	d3.select('div').style({
	  'color': 'red'
	});
	d3.select('div div').style({
	  'color': 'blue'
	});

結果就像這樣：

![SVG D3 - 起手式](/img/articles/201410/20141031_1_02.png)

其實說穿了 D3 和 jquery 大同小異，如果已經熟悉 jquery 的寫法，D3 用起來應該也很容易理解 ( 當然還是有不太一樣的地方要習慣 )，而且 D3 也採用了**「串鍊」**式的方法 ( Chaining Methods )，就是用點的一點一點串下去，例如：

	d3.select('div').style({
    	'color': 'red'
  	}).select('div').style({
    	'color': 'blue'
  	});

![SVG D3 - 起手式](/img/articles/201410/20141031_1_02.png)

跟上面也會是同樣的結果，一直串一直串就對了！然而除了選取器 ( select、selectAll ) 之外，跟 jquery 同樣，也可以使用 append 的指令在最後面放入物件或元素，不過要放在前面就要用 insert 而不是 prepend，而且要改變樣式必須用 style 而不是 css，要特別注意，下面就用個實際的例子來瞧瞧：

	d3.select('body')
	  .append('div')
	  .html('I am div')
	  .style({
	  'border':'1px solid #000',
	  'width':'120px'
	  });

![SVG D3 - 起手式](/img/articles/201410/20141031_1_03.png)

除了塞 HTML 的 DOM 之外，更重要的是可以塞 SVG 的形狀，還記得在我之前的文章：[SVG 研究之路 (14) - 控制 SVG 的注意事項](http://www.oxxostudio.tw/articles/201406/svg-14-control-SVG.html)，因為 SVG 本身不屬於 HTML 的標準元素，所以都要用額外的方式才能動態添加內容，但自從有了 D3，就都沒有這問題了，直接添加即可，下列程式碼會產生一個圓形 ( 如果對 SVG 形狀不了解的可以參考：[SVG 研究之路 (3) - 基本形狀](http://www.oxxostudio.tw/articles/201406/svg-03-basic-shapes.html) )：

	  d3.select('body')
	    .append('svg')
	    .attr({
	      'width':200,
	      'height':200
	    });
	
	  d3.select('svg')
	    .append('circle')
	    .attr({
	    'cx':50,
	    'cy':50,
	    'r':30,
	    'fill':'#f90',
	    'stroke':'#c00',
	    'stroke-width':'5px'
	    });

![SVG D3 - 起手式](/img/articles/201410/20141031_1_04.png)
 

以上就是一些 D3 起手式的介紹，雖然 D3 可以做到和 jquery 差不多的事情，但整體而言還是 jquery 比較方便，因為畢竟 D3 誕生的目的原本就和 jquery 不同，D3 是為了讓數據可以用視覺圖像化的方式而誕生的，所以上述基本的用法，其實也會跟隨著 data 來自動產生，會在之後用一些篇幅仔細分享。 

