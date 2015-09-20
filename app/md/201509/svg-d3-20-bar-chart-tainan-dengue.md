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

<meta property="article:published_time" content="2015-09-20T17:50:00+01:00">

<meta name="keywords" content="svg,d3,d3js,bar,chart,bar chart,直條圖,登革熱,台南">

<meta name="description" content="在上一篇我們介紹了長條圖的畫法，因為之前看過有人做了高雄和台南登革熱病例的長條圖 ( 不過他們不是用 d3.js 做的 )，所以想說自己學了 d3.js 也來試試看，雖然還做不到跟地圖結合，但可以將數字表格轉換成可視的圖形，就更容易理解疫情的變化囉。">

<meta itemprop="name" content="SVG D3.js - 直條圖 ( 以登革熱數據為例 ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201509/20150920_1_01b.jpg">

<meta itemprop="description" content="在上一篇我們介紹了長條圖的畫法，因為之前看過有人做了高雄和台南登革熱病例的長條圖 ( 不過他們不是用 d3.js 做的 )，所以想說自己學了 d3.js 也來試試看，雖然還做不到跟地圖結合，但可以將數字表格轉換成可視的圖形，就更容易理解疫情的變化囉。">

<meta property="og:title" content="SVG D3.js - 直條圖 ( 以登革熱數據為例 )  - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201509/svg-d3-20-bar-chart-tainan-dengue.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201509/20150920_1_01b.jpg">

<meta property="og:description" content="在上一篇我們介紹了長條圖的畫法，因為之前看過有人做了高雄和台南登革熱病例的長條圖 ( 不過他們不是用 d3.js 做的 )，所以想說自己學了 d3.js 也來試試看，雖然還做不到跟地圖結合，但可以將數字表格轉換成可視的圖形，就更容易理解疫情的變化囉。">

<title>SVG D3.js - 直條圖 ( 以登革熱數據為例 )  - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##SVG D3.js - 直條圖 ( 以登革熱數據為例 ) <span class="article-date" tag="web">SEP 20	, 2015</span>

<img src="/img/articles/201509/20150920_1_01.jpg" class="preview-img">

在 [上一篇](svg-d3-19-bar-chart.html) 我們介紹了長條圖的畫法，因為之前看過有人做了高雄和台南登革熱病例的長條圖 ( 不過他們不是用 d3.js 做的 )，所以想說自己學了 d3.js 也來試試看，雖然還做不到跟地圖結合，但可以將數字表格轉換成可視的圖形，就更容易理解疫情的變化囉。

因為要繪圖，就需要資料，我這邊使用的資料是台南的登革熱每日病例 ( 參考 [104年臺南市本土登革熱病例數](http://data.tainan.gov.tw/dataset/dengue-dist/resource/fb2e5df8-d5dc-42d6-9fc2-8d638205a7aa)，使用 csv 需要跨域，可以用後端爬一份放在自己的 server 即可，不過覺得台南市政府可以用成英文啦，中文會有編碼的問題呀！ )，我抓了一份 csv 檔，用裡面的「確診日期」以及「編號 ( 加總就變成病例數 )」，就可以得到我們要畫圖的 data。

接著我使用了 d3.nest 把「日期」變成「key」，如此一來就可以知道每個日期裡面的「陣列長度」，陣列長度也就是病例數，因為透過 d3.nest 的轉換，已經變成陣列，不過因為後續需要編號來做位置排列、升冪、降冪排列，所以新增一個名為 _id 的屬性。不過因為這份 CSV 數據的日期格式，讓我在做升冪降冪排序遇到一些問題 ( 9/2 會在 9/10 的後面 )，所以我就再度利用 d3.nest 把剛剛的 _id 當 key，用 _id 來排序就解決了。( 範例：[svg-d3-20-bar-chart-tainan-dengue-demo01.html](/demo/201509/svg-d3-20-bar-chart-tainan-dengue-demo01.html) )

	d3.csv("tainan-dengue.csv", function(data) {
	  var day = d3.nest()
	  .key(function(d){
	    return d.確診日;
	  })
	  .entries(data); 

	  for(var i=0; i<day.length; i++){
	    if(i<9){
	      day[i]._id = '0'+(i+1).toString();
	    }else{
	      day[i]._id = (i+1).toString();
	    }
	  }

	  var dayById = d3.nest()
	  .key(function(d){
	    return d._id;
	  }).sortKeys(d3.descending)
	  .entries(day); 

	  for(var j=0; j<dayById.length; j++){
	      dayById[j]._id = j+1;
	  }

	  console.log(dayById);

![SVG D3.js - 直條圖 ( 以登革熱數據為例 )](/img/articles/201509/20150920_1_02.jpg)

有了數據之後，我們要來用 SVG 畫圖，首先我們在 body 裡用 d3.js 放入一個 svg，內容放上三個 g ( 群組 )，分別用變數 rect、num 和 date 表示，rect 是要放置矩形，也就是我們的長條圖，date 標示日期，num 表示該日期的病例數，svg 的高度我是用每個矩形的高度加總，上下 padding 10 來計算。

	var s = d3.select('body').append('svg')
	          .attr({
	            'width':800,
	            'height':day.length*15+20
	          }).style({
	            'border':'1px solid #000'
	          });
	var rect = s.append('g')
	            .attr({
	              'id':'rect'
	            });
	var num = s.append('g')
	            .attr({
	              'id':'num'
	            });
	var date = s.append('g')
	            .attr({
	              'id':'date'
	            });

<br/>

先來畫矩形，矩形的寬度就直接用病例數來表示，病例越多就越長，高度設為 10，利用 y 座標來做一個間距的 padding，顏色的部分會根據不同的病例數呈現不同的顏色，x 的座標先加 100，目的是讓前面可以放日期。

	rect.selectAll('rect')
	  .data(dayById)
	  .enter()
	  .append('rect')
	  .attr({
	    'width':function(d){
	      return d.values[0].values.length;
	    },
	    'height':10,
	    'fill':function(d){
	      if(d.values[0].values.length>300){
	        return '#c00';
	      }else if(d.values[0].values.length>200&&d.values[0].values.length<=300){
	        return '#f90';
	      }else if(d.values[0].values.length>100&&d.values[0].values.length<=200){
	        return '#aa0';
	      }else if(d.values[0].values.length>50&&d.values[0].values.length<=100){
	        return '#ac0';
	      }else{
	        return '#6c0';
	      }
	    },
	    'x':100,
	    'y':function(d){
	      return d._id*15;
	    }
	  });

<br/>

再來是病例的數字，這裏我要讓病例的數字會接在長條圖後方呈現，所以 x 的位置就比長條圖多了 5 也就是 105，y 的位置因為矩形有 10 的高度，所以這裡就加 10，高度才會剛剛好對齊。

	num.selectAll('text')
	  .data(dayById)
	  .enter()
	  .append('text')
	  .attr({
	    'fill':'#000',
	    'x':function(d){
	      return d.values[0].values.length+105;
	    },
	    'y':function(d){
	      return d._id * 15 + 10;
	    }
	  }).text(function(d){
	    return d.values[0].values.length;
	  }).style({
	    'font-size':'12px'
	  });

<br/>

最後就是日期的文字，做法和病例數一模一樣，比較特別的是在 SVG 裏頭文字的靠右對齊，要用`text-anchor=end`。

	date.selectAll('text')
	  .data(dayById)
	  .enter()
	  .append('text')
	  .attr({
	    'fill':'#000',
	    'text-anchor': 'end',
	    'x':90,
	    'y':function(d){
	      console.log(d);
	      return d._id * 15 + 10;
	    }
	  }).text(function(d){
	    return d.values[0].values[0].確診日;
	  }).style({
	    'font-size':'12px'
	  });

<br/>

做到這個步驟，基本上已經可以看到一個台南到 2015/9/17 為止的登革熱狀況，希望疫情趕快趨緩呀！！( 範例：[svg-d3-20-bar-chart-tainan-dengue-demo02.html](/demo/201509/svg-d3-20-bar-chart-tainan-dengue-demo02.html) )

![SVG D3.js - 直條圖 ( 以登革熱數據為例 )](/img/articles/201509/20150920_1_03.jpg)

同樣的做法，我們其實也可以篩出台南哪個區，幾月幾號有多少確診數，大概就可以知道該地區疫情有沒有控制下來，如果要這麼做，我們就要把剛剛用 d3.nest 篩選的 key 換成「區別」，有了「區別」之後，我們就有各個區各自的數據，接下來就只要把上面的做法用一個 draw 的 function 包起來，點選按鈕的時候執行即可，然後一開始先把所有 svg 清空作重繪的動作。

為什麼這裡要用「重繪」而不用上一篇的動畫呢？因為資料格式其實沒有很完整，如果以「區別」來說，並不是一連連續的日期，當然要用前端的方式處理讓日期連續也是可以，但必須花費不少的力氣才能完成，因為這純粹是展示直條圖的效果，就不在這邊做了。( 範例：[svg-d3-20-bar-chart-tainan-dengue-demo03.html](/demo/201509/svg-d3-20-bar-chart-tainan-dengue-demo03.html) )

	d3.csv("tainan-dengue.csv", function(data) {

	  var area = d3.nest()
	  .key(function(d){
	    return d.區別;
	  })
	  .entries(data); 

	  console.log(area);

	  d3.select('#button').selectAll('button')
	    .data(area)
	    .enter()
	    .append('button')
	    .text(function(d){
	          return d.key + ' ( ' +d.values.length+ ' )';
	    }).style({
	      'margin':'2px',
	      'padding':'5px'
	    }).on('click',function(d){
	      d3.selectAll('button').style({
	        'background':'#ddd',
	        'color':'#000'
	      });
	      this.style.background = '#666';
	      this.style.color = '#fff';
	      var areaData = d.values;
	      draw(areaData);
	    });

	  function draw(drawData){

	      d3.selectAll('svg').remove();

	      //剛剛做的事情
	      
	   }
	});

![SVG D3.js - 直條圖 ( 以登革熱數據為例 )](/img/articles/201509/20150920_1_04.jpg)

以上就是利用政府的開放資料所做的長條圖實例，開放資料的格式百百款，如何善用 d3.js 的數據處理能力，把資料變成我們要的格式，就可以輕輕鬆鬆地畫出圖形囉！最後我將上面的程式改良，變成下拉選單的方式，可以選擇行政區和里，分享給大家。( 範例：[svg-d3-20-bar-chart-tainan-dengue-demo04.html](/demo/201509/svg-d3-20-bar-chart-tainan-dengue-demo04.html) )

![SVG D3.js - 直條圖 ( 以登革熱數據為例 )](/img/articles/201509/20150920_1_05.jpg)

<!-- @@close-->




