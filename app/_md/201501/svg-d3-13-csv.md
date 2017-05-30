# SVG D3.js - CSV 數據處理  

在數據的類型裡，CSV 是一種相當普及且方便的數據文件格式，從我們每個人手邊的 excel 就可以輕鬆地將數據轉換成 CSV 的數據格式，而對於 d3.js 而言，除了可以很輕鬆的處理 JSON 數據之外，也可以很便利的處理 CSV 的數據，搭配前幾篇所介紹的數據處理方法，就可以做出多樣的變化。

首先來看一下什麼是 CSV 數據，CSV 就是「用逗號分隔值」（ Comma-Separated Value )，舉例來說，在 EXCEL 裏頭的數據長得像下圖這樣：

![CSV 數據處理](/img/articles/201501/20150113_1_02.jpg)

轉換為 CSV 之後就變成這樣：

	sex,name,score
	male,Jack,88
	female,Marry,65
	female,Cherry,74
	male,Owen,95
	male,Jason,87
	male,Bill,61
	female,Amy,69
	female,Mia,74
	male,Peter,86

<br/>
這個 CSV 格式的資料，也就是我們要載入的，載入 CSV 格式資料的方法，和 jquery 裏頭的 ajax 類似，而且同樣會遇到「跨域」 ( cross domain ) 的問題，什麼是跨域呢？就是當我們使用網頁瀏覽器瀏覽網頁時，瀏覽器為了保障資料傳輸的安全性，具備一個重要的瀏覽器端語言的安全協定，這個協定僅允許 script 在同個網域之間互相傳送資料，但是禁止不同網域之間互相取用方法與屬性。( 參考 [Same-origin policy](http://en.wikipedia.org/wiki/Same-origin_policy) )

因此，為了方便在網頁端進行開發，建議大家可以使用 Google Chrome 進行瀏覽，並安裝跨域小套件：「[Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)」，安裝之後再 Chrome 右上角會出現一個紅色按鈕，點選會出現一個開關的選項：

![CSV 數據處理](/img/articles/201501/20150113_1_03.jpg)

打開開關就會變成綠色的，這時候就是把瀏覽器的安全性關閉，可以跨域了。

![CSV 數據處理](/img/articles/201501/20150113_1_04.jpg)

<br/>
可以跨域之後，我們就可以拿這個 CSV 格式的檔案 ( [svg-d3-13-csv.csv](/demo/201501/svg-d3-13-csv.csv) ) 來練習，首先我們要先把這個 CSV 載入，然後用 console 就看看載入的數據，會發現載入的數據經過 d3.js 的處理，已經變成了 JSON 的格式了。( 範例：[svg-d3-13-csv-demo1.html](/demo/201501/svg-d3-13-csv-demo1.html)，如果 console 出現`No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.`就是沒有跨域，跨域成功就會出現以下數據 )

	d3.csv("http://www.oxxostudio.tw/articles/201501/svg-d3-13-csv.csv", function(data) {
		console.log(data);
	});

![CSV 數據處理](/img/articles/201501/20150113_1_05.jpg)

<br/>
然而 d3.js 的 CSV 也具有像 ajax 一樣的 callback 機制，裏頭也具有 error 和 success 的方法，要測試 error 的話可以把跨域關起來，就會看到 console 出現 oh no 的字樣，範例裏頭將 CSV 的資料指定給另外一個陣列變成另外一個 JSON 資料，同時將分數的部分由字串轉換為數字。( 範例：[svg-d3-13-csv-demo2.html](/demo/201501/svg-d3-13-csv-demo2.html))

	d3.csv("http://www.oxxostudio.tw/articles/201501/svg-d3-13-csv.csv", function(d) {
	  return {
	    '性別': d.sex,
	    '姓名': d.name,
	    '分數': +d.score
		};
	}, function(error, rows) {
			if(error){
				console.log('oh no');
			}
			else{
		  	console.log(rows);
			}
	});

![CSV 數據處理](/img/articles/201501/20150113_1_06.jpg)

<br/>
上述的方式，是針對已經符合 [RFC4180 標準](http://zh.wikipedia.org/wiki/%E9%80%97%E5%8F%B7%E5%88%86%E9%9A%94%E5%80%BC) 的字串，同樣也適用於`d3.csv.parse(string[, accessor])`這個 API，不過使用`d3.csv.parse`必須是要餵字串才型喔！但是對於不符合 RFC4180 標準的字串，又該怎麼處理呢？例如下面這個 CSV：( [svg-d3-13-csv.csv](/demo/201501/svg-d3-13-csv2.csv) )

	name,Bill,score,80,sex,male
	name,Jean,score,78,sex,female
	name,Owen,score,92,sex,male

<br/>
針對這類型的數據，d3.js 提供了我們`d3.csv.parseRows(string[, accessor])`的方法來處理，下面的範例是利用 d3.text 將載入的 CSV 變成了字串的形式，接著利用`d3.csv.parseRows`把每一列變成物件，接著再利用`d3.map`把數據變成我們理想中的格式。( 範例：[svg-d3-13-csv-demo3.html](/demo/201501/svg-d3-13-csv-demo3.html))

	d3.text("http://www.oxxostudio.tw/articles/201501/svg-d3-13-csv2.csv", function(data) {
	  console.log(data);
	  var parsedCSV = d3.csv.parseRows(data);
	  console.log(parsedCSV);
	  var a = parsedCSV.map(function(d){
	  	return{
	  		name:d[1],
	  		score:d[3],
	  		sex:d[5]
	  	}
	  });
	  console.log(a);
	});

![CSV 數據處理](/img/articles/201501/20150113_1_07.jpg)

<br/>
把字串轉化為我們要的各式化數據還不稀奇，d3.js 裏頭的`d3.csv.format(rows)`和`d3.csv.formatRows(rows)`，可以將格式化後的數據，轉化回原本的 CSV 樣子。( 範例：[svg-d3-13-csv-demo4.html](/demo/201501/svg-d3-13-csv-demo4.html))

	console.log(d3.csv.format([
	    {name:"Bill",score:'80',sex:'male'},
	    {name:"Jean",score:'78',sex:'female'},
	    {name:"Owen",score:'92',sex:'male'}
	]));

	//name,score,sex
	//Bill,80,male
	//Jean,78,female
	//Owen,92,male

	console.log(d3.csv.formatRows([
	    ["Bill",'80','male'],
	    ["Jean",'78','female'],
	    ["Owen",'92','male']
	]));

	//Bill,80,male
	//Jean,78,female
	//Owen,92,male

知道用法之後，如果剛剛 d3.text 不明白的，就可以用 d3.csv.format 來轉換，結果會是一樣的。( 範例：[svg-d3-13-csv-demo5.html](/demo/201501/svg-d3-13-csv-demo5.html))

	d3.csv("http://www.oxxostudio.tw/articles/201501/svg-d3-13-csv2.csv", function(data) {
	  var f = d3.csv.format(data);
	  console.log(f);
	  var parsedCSV = d3.csv.parseRows(f);
	  console.log(parsedCSV);
	  var a = parsedCSV.map(function(d){
	  	return{
	  		name:d[1],
	  		score:d[3],
	  		sex:d[5]
	  	}
	  });
	  console.log(a);
	});

![CSV 數據處理](/img/articles/201501/20150113_1_07.jpg)

<br/>
以上就是 d3.js 裏頭 CSV 數據處理的基本方式，記得讀取數據的時候要記得跨域，不然就是要在同一個 domain name 底下喔！

