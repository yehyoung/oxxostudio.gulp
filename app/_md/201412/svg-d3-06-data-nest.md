# SVG D3.js - 巢狀數據結構 ( d3.nest )  

![](/img/articles/201412/svg-d3-06-data-nest.jpg#preview-img)

之前在「SVG D3.js - 淺談 D3.js 的資料處理」提過基本的數據處理方法，這陣子又研究了一下 d3.js 的 nest，這篇就來介紹一下這個很有意思的數據處理方法：d3.nest。

> 參考：[SVG D3.js - 淺談 D3.js 的資料處理](http://www.oxxostudio.tw/articles/201411/svg-d3-01-data.html)

nest 就是「巢」的意思 ( 不是潮喔~ 雖然 d3.js 好像有點潮 )，透過 d3.nest 的轉換，可以將原本的數據變成以 key 和 value 為主的巢狀結構，並且可以針對巢狀結構的每個節點進行排序，而所得到的巢狀結構數據，可以在程式裡重複使用而不會影響到原本的數據。

光是看文字其實是搞不清楚的，直接用個簡單的範例來說明一下，下面是一個 json 的檔案格式，是四個班級學生的得分，分別有 name、score 和 type。

	var data = [
	  {name:'Tom'   , score:98, type:'class1' , sex:'man'},
	  {name:'Jack'  , score:72, type:'class2' , sex:'man'},
	  {name:'Owen'  , score:93, type:'class3' , sex:'man'},
	  {name:'Mark'  , score:41, type:'class4' , sex:'man'},
	  {name:'Marry' , score:67, type:'class4' , sex:'woman'},
	  {name:'Rock'  , score:59, type:'class2' , sex:'man'},
	  {name:'Jason' , score:83, type:'class1' , sex:'man'},
	  {name:'Peter' , score:47, type:'class3' , sex:'man'},
	  {name:'Cherry', score:53, type:'class1' , sex:'woman'},
	  {name:'Jean'  , score:68, type:'class4' , sex:'woman'}
	];

<br/>
這時候利用 d3.nest，把 type 設為 key，這時候 value 就會以 type 為樹狀結構的節點往下長，這裡我們先使用了 d3.nest 的 key 和 entries 這兩個 API，key 主要讓我們作為節點使用，把要做為節點的值以 key 的方法長出來，最後用 entries 把 data 丟進去。( 範例：[svg-d3-06-data-nest-demo1.html](/demo/201412/svg-d3-06-data-nest-demo1.html)，打開開發者工具看 console 喔~ )

	var a = d3.nest()
	          .key(function(d){return d.type;})
			  .entries(data); 

    console.log(a);

![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_02.jpg)

<br/>
同樣的道理，如果再把 sex 設為第二層 key，就會再依據 sex 長出一層。( 範例：[svg-d3-06-data-nest-demo2.html](/demo/201412/svg-d3-06-data-nest-demo2.html) )

	var a = d3.nest()
	        .key(function(d){return d.type;})
	        .key(function(d){return d.sex;})
			    .entries(data); 

    console.log(a);

![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_03.jpg)

<br/>
其實這就是 d3.nest 最基本的用法，用這個方法，就可以很輕鬆的把一堆資料分類，篩選出所需要的東西，但 d3.nest 還有其他的 API，這裡先列出 d3.nest 具有的 API，然後再來一個個看看它們功用：
>
- nest.sortKeys(comparator)
- nest.sortValues(comparator)
- nest.rollup(function)
- nest.map(array[, mapType])

<br/>

- **nest.sortKeys(comparator)**

	這是進行排序的 API，在 sortKeys 內是放入排序的比較函式，不過這裡可以先使用`d3.descending`降冪或`d3.aescending`升冪來進行簡單的判斷。( 範例：[svg-d3-06-data-nest-demo3.html](/demo/201412/svg-d3-06-data-nest-demo3.html) )

		var a = d3.nest()
		        .key(function(d){return d.score;})
		        .sortKeys(d3.descending)  //降冪
				    .entries(data);
	
		var b = d3.nest()
		        .key(function(d){return d.score;})
		        .sortKeys(d3.ascending)  //升冪
				    .entries(data); 

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_04.jpg)

	而 sortKeys 是針對所連接的值進行排序作業，以下面的例子來說，並不會把 type 排序，而是會把 type 內的 score 排序。( 範例：[svg-d3-06-data-nest-demo4.html](/demo/201412/svg-d3-06-data-nest-demo4.html) )

	  var a = d3.nest()
	          .key(function(d){return d.type;})
	          .key(function(d){return d.score;})
	          .sortKeys(d3.descending)
	  		    .entries(data);
  
	  var b = d3.nest()
	          .key(function(d){return d.type;})
	          .key(function(d){return d.score;})
	          .sortKeys(d3.ascending)
	  		    .entries(data); 

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_05.jpg)

	當然如果不使用 d3 本身的升冪與降冪，也可以使用自定義的方式進行排序，例如下面的範例，就會把分數大於六十的排在上面或排在下面。( 範例：[svg-d3-06-data-nest-demo5.html](/demo/201412/svg-d3-06-data-nest-demo5.html) )

		var a = d3.nest()
		        .key(function(d){return d.score;})
		        .sortKeys(function(a){return a<60;})
				    .entries(data);
	
		var b = d3.nest()
		        .key(function(d){return d.score;})
		        .sortKeys(function(a){return a>60;})
				    .entries(data); 

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_06.jpg)

<br/>

- **nest.sortValues(comparator)**

	sortValues 與 sortKeys 的差異就在於 sortValues 是針對 values 進行排序，而 sortKeys 是針對 key 進行排序 ( 光看名稱應該就很容易理解 )，下面的範例是先用班級分類，然後再進行分數的排序。( 範例：[svg-d3-06-data-nest-demo6.html](/demo/201412/svg-d3-06-data-nest-demo6.html) )

		var a = d3.nest()
		        .key(function(d){return d.type;})
		        .sortValues(function(i,j) { 
		        		return i.score > j.score;
		        	})
				    .entries(data);
		var b = d3.nest()
		        .key(function(d){return d.type;})
		        .sortValues(function(i,j) { 
		        		return i.score < j.score;
		        	})
				    .entries(data); 

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_07.jpg)

<br/>

- **nest.rollup(function)**

	rollup 翻譯起來是「彙總」的意思，不過這裡翻譯成彙總容易與「sum」有所混淆，rollup 其實是將 value 內的所有東西,根據我們所下的條件，彙總成一個 value，而不是像 sum 一樣，可以把內容的所有數字相加起來得到一個總和，必須要有所區隔，舉例來說，如果我們寫成下面的範例這樣，彙總的 value 就會得到陣列的長度。( 範例：[svg-d3-06-data-nest-demo7.html](/demo/201412/svg-d3-06-data-nest-demo7.html) )

		var a = d3.nest()
		        .key(function(d){return d.type;})
		        .rollup(function(d){return d.length;})
				.entries(data);

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_08.jpg)

	換個寫法，也可以得到內容所有分數的總和 ( 範例：[svg-d3-06-data-nest-demo8.html](/demo/201412/svg-d3-06-data-nest-demo8.html) )：

		var a = d3.nest()
		        .key(function(d){return d.type;})
		        .rollup(function(d){return d3.sum(d,function(dd){return dd.score;});})
				.entries(data);

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_09.jpg)


<br/>

- **nest.map(array[, mapType])**

	map 與 entries 其實有點類似，就是把 data 的值丟進去 nest 裏頭處理，不過 map 丟進去的出來會變成物件，entries 丟進去的出來會變成陣列，這其實從 console 裏頭可以很明顯的看出來，至於要用 map 還是 entries ，就看這份 data 的使用情境來決定囉。 ( 範例：[svg-d3-06-data-nest-demo9.html](/demo/201412/svg-d3-06-data-nest-demo9.html) )

		var a = d3.nest()
		        .key(function(d){return d.sex;})
		        .key(function(d){return d.type;})
				    .entries(data);
	
		var b = d3.nest()
		        .key(function(d){return d.sex;})
		        .key(function(d){return d.type;})
				    .map(data);

	![SVG D3.js - 巢狀數據結構 ( d3.nest )](/img/articles/201412/20141206_1_10.jpg)

<br/>
以上就是 d3.nest 的用法介紹，基本上因為 d3.js 已經有相當豐富的圖表讓大家使用，因此如何利用巢狀結構，做出適合圖表的數據，就變成使用者要學習的了。

