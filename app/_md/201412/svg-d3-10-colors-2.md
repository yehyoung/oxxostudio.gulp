# SVG D3.js - 定義色彩 - 應用篇 ( colors ) 

![](/img/articles/201412/svg-d3-10-colors-2.jpg#preview-img)

上一篇我們探討了 d3.js 裏頭色彩的定義與 API 操作方式，其實對於色彩，d3.js 還有不少應用的方法，也因此在官網所介紹的範例，才會如此的色彩豐富生動多姿，因此，這篇將繼續介紹色彩的應用，主要是利用之前介紹過的 scale 來變化色彩，很神奇吧！scale 要怎麼定義色彩？就讓我們繼續看下去吧~

介紹之前，來回顧一下 scale 的用法，之前介紹過兩種用法，分別是 [linear](http://www.oxxostudio.tw/articles/201411/svg-d3-03-scale-linear.html) 和 [ordinal](http://www.oxxostudio.tw/articles/201412/svg-d3-08-ordinal.html) ( 當然還有其他的，不過最常用的就這兩種 )，而 d3.js 的色彩同樣也可以使用這兩種 API 來進行定義，首先來看看 linear 該如何使用。

一開始先在 HTML 放入十個 div

	<div id="div1">1</div>
	<div id="div2">2</div>
	<div id="div3">3</div>
	<div id="div4">4</div>
	<div id="div5">5</div>
	<div id="div6">6</div>
	<div id="div7">7</div>
	<div id="div8">8</div>
	<div id="div9">9</div>
	<div id="div10">10</div>

接著按照 scale.linear() 的方式寫 js，比較特別的是，range 裡放入的是顏色的色碼 ( 或顏色名稱 )，如此一來，就會在 domain 裏頭，讓顏色進行如漸層般的運算，接著只要填入對應的數字，就可以得到漸層內的顏色，範例的程式碼比較冗長，因為完全沒有使用 CSS，連同 CSS 都一併由 d3.js 解決，這種方法其實不好，最好還是 CSS 與 js 各司其職，但這只是為了範例可以更清楚的表現才使用喔！( 範例：[svg-d3-10-colors-2-demo1.html](/demo/201412/svg-d3-10-colors-2-demo1.html) )

	var d = d3.selectAll('div'),
	    div1 = d3.select('#div1'),
	    div2 = d3.select('#div2'),
	    div3 = d3.select('#div3'),
	    div4 = d3.select('#div4'),
	    div5 = d3.select('#div5'),
	    div6 = d3.select('#div6'),
	    div7 = d3.select('#div7'),
	    div8 = d3.select('#div8'),
	    div9 = d3.select('#div9'),
	    div10 = d3.select('#div10');
	
	d.style({
	  'width':'50px',
	  'height':'50px',
	  'display':'inline-block',
	  'line-height':'50px',
	  'color':'#fff',
	  'text-align':'center',
	  'margin':'2px'
	});
	
	var color = d3.scale
	              .linear()
	              .domain([1,10])
	              .range(['#f00', '#00f']);
	
	div1.style({background:color(1)});  //注意這裡的寫法
	div2.style({background:color(2)});
	div3.style({background:color(3)});
	div4.style({background:color(4)});
	div5.style({background:color(5)});
	div6.style({background:color(6)});
	div7.style({background:color(7)});
	div8.style({background:color(8)});
	div9.style({background:color(9)});
	div10.style({background:color(10)});

![SVG D3.js - 定義色彩 - 應用篇 ( colors )](/img/articles/201412/20141226_1_02.jpg)

用這種方法，我們就可以定義出一個範圍內的顏色變化，也更能將死板板的數據，對應到各自代表的顏色，例如汙染越高的地方越黑、音量越大越紅、溫度越冷越藍、雨量越多越紫...等之類的圖表，然而除了 scale.linear 這種方法之外，也可以使用之前介紹過的 [ordinal](http://www.oxxostudio.tw/articles/201412/svg-d3-08-ordinal.html)，定義出類似陣列概念的顏色陣列，而且其實我們不用自己定義，d3.js 已經幫我們定義好了幾種，分別是以下幾種：

>- d3.scale.category10()
- d3.scale.category20()
- d3.scale.category20b()
- d3.scale.category20c()

<br/>

當中所包含的色彩序列如下：

- d3.scale.category10()：

	<span style="width:20px; height:20px; display:inline-block; background:#1f77b4;"></span> 1f77b4
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ff7f0e;"></span> ff7f0e
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#2ca02c;"></span> 2ca02c
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#d62728;"></span> d62728
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#9467bd;"></span> 9467bd
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#8c564b;"></span> 8c564b
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#e377c2;"></span> e377c2
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#7f7f7f;"></span> 7f7f7f
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#bcbd22;"></span> bcbd22
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#17becf;"></span> 17becf


- d3.scale.category20()：

	<span style="width:20px; height:20px; display:inline-block; background:#1f77b4;"></span> 1f77b4
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#aec7e8;"></span> aec7e8
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ff7f0e;"></span> ff7f0e
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ffbb78;"></span> ffbb78
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#2ca02c;"></span> 2ca02c
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#98df8a;"></span> 98df8a
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#d62728;"></span> d62728
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ff9896;"></span> ff9896
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#9467bd;"></span> 9467bd
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#c5b0d5;"></span> c5b0d5
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#1f77b4;"></span> 1f77b4
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#aec7e8;"></span> aec7e8
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ff7f0e;"></span> ff7f0e
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ffbb78;"></span> ffbb78
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#2ca02c;"></span> 2ca02c
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#98df8a;"></span> 98df8a
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#d62728;"></span> d62728
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ff9896;"></span> ff9896
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#9467bd;"></span> 9467bd
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#c5b0d5;"></span> c5b0d5


- d3.scale.category20b()：

	<span style="width:20px; height:20px; display:inline-block; background:#393b79;"></span> 393b79
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#5254a3;"></span> 5254a3
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#6b6ecf;"></span> 6b6ecf
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#9c9ede;"></span> 9c9ede
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#637939;"></span> 637939
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#8ca252;"></span> 8ca252
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#b5cf6b;"></span> b5cf6b
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#cedb9c;"></span> cedb9c
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#8c6d31;"></span> 8c6d31
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#bd9e39;"></span> bd9e39
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#e7ba52;"></span> e7ba52
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#e7cb94;"></span> e7cb94
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#843c39;"></span> 843c39
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ad494a;"></span> ad494a
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#d6616b;"></span> d6616b
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#e7969c;"></span> e7969c
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#7b4173;"></span> 7b4173
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#a55194;"></span> a55194
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#ce6dbd;"></span> ce6dbd
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#de9ed6;"></span> de9ed6


- d3.scale.category20b()：

	<span style="width:20px; height:20px; display:inline-block; background:#3182bd;"></span> 3182bd
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#6baed6;"></span> 6baed6
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#9ecae1;"></span> 9ecae1
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#c6dbef;"></span> c6dbef
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#e6550d;"></span> e6550d
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#fd8d3c;"></span> fd8d3c
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#fdae6b;"></span> fdae6b
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#fdd0a2;"></span> fdd0a2
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#31a354;"></span> 31a354
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#74c476;"></span> 74c476
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#a1d99b;"></span> a1d99b
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#c7e9c0;"></span> c7e9c0
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#756bb1;"></span> 756bb1
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#9e9ac8;"></span> 9e9ac8
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#bcbddc;"></span> bcbddc
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#dadaeb;"></span> dadaeb
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#636363;"></span> 636363
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#969696;"></span> 969696
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#bdbdbd;"></span> bdbdbd
	<br/>
	<span style="width:20px; height:20px; display:inline-block; background:#d9d9d9;"></span> d9d9d9

<br/>

當你滑鼠滾輪滾到這邊，一定滿肚子怨念，幹嘛列出這麼多顏色，坦白說我寫完上面這一大串也是滿肚子大便，但為了忠實呈現 d3.js 官網的東西，還是必須要列出這些顏色，這些顏色就是 d3.js 幫我們定義的顏色序列，我們可以像下面範例這樣使用，先定義 color，然後內容的數字分別就是對應到色彩序列的顏色編號。( 範例：[svg-d3-10-colors-2-demo2.html](/demo/201412/svg-d3-10-colors-2-demo2.html) )

	var d = d3.selectAll('div'),
	    div1 = d3.select('#div1'),
	    div2 = d3.select('#div2'),
	    div3 = d3.select('#div3'),
	    div4 = d3.select('#div4'),
	    div5 = d3.select('#div5');
	
	d.style({
	  'width':'50px',
	  'height':'50px',
	  'display':'inline-block',
	  'line-height':'50px',
	  'color':'#fff',
	  'text-align':'center',
	  'margin':'2px'
	});
	
	var color = d3.scale.category20b();
	
	div1.style({
	  background:color(1)
	});
	div2.style({
	  background:color(2)
	});
	div3.style({
	  background:color(3)
	});
	div4.style({
	  background:color(4)
	});
	div5.style({
	  background:color(5)
	});

![SVG D3.js - 定義色彩 - 應用篇 ( colors )](/img/articles/201412/20141226_1_03.jpg)

<br/>
	
	var color = d3.scale.category20c();
	
	div1.style({
	  background:color(1)
	});
	div2.style({
	  background:color(2)
	});
	div3.style({
	  background:color(3)
	});
	div4.style({
	  background:color(4)
	});
	div5.style({
	  background:color(5)
	});

![SVG D3.js - 定義色彩 - 應用篇 ( colors )](/img/articles/201412/20141226_1_04.jpg)



<br/>
以上，就是在 d3.js 裏頭色彩的另外一種應用作法，相信理解了之後，看待一大串的數字，可能都會不由自主地把這些數據給上顏色囉！如果對於色碼與顏色名稱有興趣的，也可以參考：[Recognized color keyword names](http://www.w3.org/TR/SVG/types.html#ColorKeywords)

