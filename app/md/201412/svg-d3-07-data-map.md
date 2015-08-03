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

<meta property="article:published_time" content="2014-12-16T23:55:00+01:00">

<meta name="keywords" content="d3,map,de.map,array,data">

<meta name="description" content="d3.map 這個其實我找不到合適的翻譯，只好暫時用我的破英文翻譯成「陣列數據地圖」，雖然有地圖兩個字，但跟實際的地圖卻是沒啥關聯性，d3.map 會根據我們所下的條件，把特定的值取出成為 key 而成為一個新的陣列，也可藉由 get、has 或 set 的 API 對數據做判斷或重新設定。">

<meta itemprop="name" content="SVG D3.js - 陣列數據地圖 ( d3.map ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201412/20141216_1_01b.jpg">

<meta itemprop="description" content="d3.map 這個其實我找不到合適的翻譯，只好暫時用我的破英文翻譯成「陣列數據地圖」，雖然有地圖兩個字，但跟實際的地圖卻是沒啥關聯性，d3.map 會根據我們所下的條件，把特定的值取出成為 key 而成為一個新的陣列，也可藉由 get、has 或 set 的 API 對數據做判斷或重新設定。">

<meta property="og:title" content="SVG D3.js - 陣列數據地圖 ( d3.map ) - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201412/svg-d3-07-data-map.html">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201412/20141216_1_01b.jpg">

<meta property="og:description" content="d3.map 這個其實我找不到合適的翻譯，只好暫時用我的破英文翻譯成「陣列數據地圖」，雖然有地圖兩個字，但跟實際的地圖卻是沒啥關聯性，d3.map 會根據我們所下的條件，把特定的值取出成為 key 而成為一個新的陣列，也可藉由 get、has 或 set 的 API 對數據做判斷或重新設定。">

<title>SVG D3.js - 陣列數據地圖 ( d3.map )  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG D3.js - 陣列數據地圖 ( d3.map )  <span class="article-date" tag="web">DEC 16, 2014</span>

<img src="/img/articles/201412/20141216_1_01.jpg" class="preview-img">

d3.map 這個其實我找不到合適的翻譯，只好暫時用我的破英文翻譯成「陣列數據地圖」，雖然有地圖兩個字，但跟實際的地圖卻是沒啥關聯性，主要是利用 d3.map 的 API，可以幫助我們把一連串的數據做轉換，與之前提過的巢狀數據處理 ( [SVG D3.js - 巢狀數據結構 ( d3.nest ) ](http://www.oxxostudio.tw/articles/201412/svg-d3-06-data-nest.html)) 有異曲同工之妙，d3.map 會根據我們所下的條件，把特定的值取出成為 key 而成為一個新的陣列，也可藉由 get、has 或 set 的 API 對數據做判斷或重新設定，在許多的 D3.js 圖形與數據的處理中，d3.map 都扮演了相當中要的腳色。

要處理數據，就一定要先有數據，以下是這篇文章會用到的範例數據：

	var data = [
	  {name:'Tom'   , type:['a','b','c']},
	  {name:'Jack'  , type:['b,c']},
	  {name:'Owen'  , type:['c','d','e']},
	  {name:'Mark'  , type:['a','c']},
	  {name:'Marry' , type:['a','b','c','d']},
	  {name:'Rock'  , type:['a','c']},
	  {name:'Jason' , type:['b','c']},
	  {name:'Peter' , type:['a','b','c']},
	  {name:'Cherry', type:['c','d']},
	  {name:'Jean'  , type:['a','c','d']}
	];

而這篇將會介紹 d3.map 的 API 如下：

>- d3.map([object][, key])
- map.has(key)
- map.get(key)
- map.set(key, value)
- map.remove(key)
- map.keys()
- map.values()
- map.size()
- map.empty()
- map.forEach(function)

<br/>

- **d3.map([object][, key])**

	這應該是 d3.map 裏頭最常用到的 API,跟 d3.nest 類似，將數據分為 keys 和 values 兩種，從 API 帶入的值可以看到，將物件丟進去之後，設定 key 是什麼，最後就會產生一個以這個 key 為基礎的陣列，以下面的例子來說，可以很明顯的看出來設定的 key 不同，出來的陣列也不相同，但很神奇的，使用 d3.map 所創造出的物件陣列，都已經幫我們排序排好了。( 範例：[svg-d3-07-data-map-demo1.html](/demo/201412/svg-d3-07-data-map-demo1.html) )

		var i = d3.map(data,function(d){return d.name;});
		var j = d3.map(data,function(d){return d.type;});

		console.log(i);
		console.log(j);

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_02.jpg)

<br/>

- **map.has(key)**

	這個 API 回傳的是　true 或　false，主要是找看看列出來的　key 當中有沒有我們想要的值，如果有，回傳　true，沒有則回傳　false。( 範例：[svg-d3-07-data-map-demo2.html](/demo/201412/svg-d3-07-data-map-demo2.html) )

		var i = d3.map(data,function(d){return d.name;});

		console.log(i.has('Tom'));   // true
		console.log(i.has('Rock'));  // true
		console.log(i.has('rock'));  // false
		console.log(i.has('oxxo'));  // false

<br/>

- **map.get(key)**

	get 顧名思義就是將這個　key 提取出變成獨立的物件。( 範例：[svg-d3-07-data-map-demo3.html](/demo/201412/svg-d3-07-data-map-demo3.html) )

		var i = d3.map(data,function(d){return d.name;});

		console.log(i.get('Tom'));  
		console.log(i.get('Owen')); 
		console.log(i.get('oxxo')); 

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_03.jpg)

<br/>

- **map.set(key, value)**
	
	設定某個　key 的值，但置換後並不會影響到原本的值。( 範例：[svg-d3-07-data-map-demo4.html](/demo/201412/svg-d3-07-data-map-demo4.html) )

		var i = d3.map(data,function(d){return d.name;});
  
		console.log(i.set('Tom','hello world?!')); 
		console.log(i);  
		console.log(data); 

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_04.jpg)

<br/>

- **map.remove(key)**

	移除某個　key，移除成功回傳 true，如果沒有 key 仍要移除，則回傳 false。( 範例：[svg-d3-07-data-map-demo5.html](/demo/201412/svg-d3-07-data-map-demo5.html) )

		var i = d3.map(data,function(d){return d.name;});
  
		console.log(i.remove('Tom')); 
		console.log(i);  
		console.log(data);  
		console.log(i.remove('Tom')); 

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_05.jpg)

<br/>

- **map.keys()**

	列出所有的 key 成為一個陣列。( 範例：[svg-d3-07-data-map-demo6.html](/demo/201412/svg-d3-07-data-map-demo6.html) )

		var i = d3.map(data,function(d){return d.name;});
  		var j = i.keys();

		console.log(j); 

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_06.jpg)

<br/>

- **map.values()**

	列出所有的 value 成為一個陣列。( 範例：[svg-d3-07-data-map-demo7.html](/demo/201412/svg-d3-07-data-map-demo7.html) )

		var i = d3.map(data,function(d){return d.name;});
  		var j = i.values();

		console.log(j); 

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_07.jpg)

<br/>

- **map.size()**

	跟我們在寫 length 相同，回傳 map 有多少 key。( 範例：[svg-d3-07-data-map-demo7.html](/demo/201412/svg-d3-07-data-map-demo8.html) )

		var i = d3.map(data,function(d){return d.name;});

		console.log(i.size());  //10

<br/>

- **map.empty()**

	如果 map 中具有 key 則回傳 false， map 的 key 為空則回傳 true。( 範例：[svg-d3-07-data-map-demo9.html](/demo/201412/svg-d3-07-data-map-demo9.html) )

		var emptyData = [];

		var i = d3.map(data,function(d){return d.name;});
		var j = d3.map(emptyData,function(d){return d.name;});

		console.log(i.empty());  //false
		console.log(j.empty());  //true

<br/>

- **map.forEach(function)**

	針對 map 產生的值，一一進行 function，最後回傳 undefined。( 範例：[svg-d3-07-data-map-demo10.html](/demo/201412/svg-d3-07-data-map-demo10.html) )

		var i = d3.map(data,function(d){return d.name;});
		var j = i.forEach(function(n){console.log(n);});

		console.log(j);

	![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_08.jpg)

<br/>

以上就是 d3.map 的相關介紹，當然我們也可以直接對我們的數據下 map，例如以下的範例，就可以直接回傳 key 成為一個陣列，之後撰寫與 d3.js 有關的範例文章，也將會大量地使用 d3.map，這也是學習 d3.js 一定要會的部分喔。( 範例：[svg-d3-07-data-map-demo11.html](/demo/201412/svg-d3-07-data-map-demo11.html) )

	var i = data.map(function(d){return d.name;});

	console.log(i);

![SVG D3.js - 陣列數據地圖 ( d3.map )](/img/articles/201412/20141216_1_09.jpg)

<!-- @@close-->

