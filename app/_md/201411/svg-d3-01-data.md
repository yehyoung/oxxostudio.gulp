# SVG D3.js - 淺談 D3.js 的資料處理  

![](/img/articles/201411/svg-d3-01-data.jpg#preview-img)

D3.js 畢竟是把數據做視覺化呈現的 library，所以最強的就在於它的資料處理能力，有別於一般我們要塞資料進 HTML，或要利用資料自動長出元素，不外乎都要用到 for 迴圈或是 each 的方式來進行，但對於 D3 來說，這些基本的功能已經全部包辦，甚至連同亂數和排序都內建在裏頭，因此，再進行利用 D3 畫圖之前，一定要先搞懂處理數據的方式，所以這篇就來嘗試一下 D3 資料處理的基本功能，也作為學習 D3 的一個紀錄。

先來看看這個例子，有一個 data 的陣列，要把這個陣列的值分別放到五個 div 裏頭，過去應該會寫個 for 迴圈一一把值丟進去長出來，但在 D3 裏頭可以這樣寫 ( 阿對了，忘記說一點，D3 的 script 放在 header，D3 的執行 script 放在 body 裏頭, 放錯位置可就跑不出來了 ) ：

	var data = [1,2,3,4,5];
	
	d3.select('body').selectAll('div')
	  .data(data)
	  .enter()
	  .append('div')
	  .text('ok');
			
執行的結果應該會在畫面上長出五個 ok 分別放在五個 div 裏頭，就像範例  ( [svg-d3-01-data-demo1.html](/demo/201411/svg-d3-01-data-demo1.html) ) 這樣，這時候一定會有疑問，設定的 data 是五個數字，怎沒有顯示出來呢？所以我們要把開發者工具打開來看看，在開發者工具的 console 裏頭輸入：`console.log(d3.selectAll('div'));`，看看會是什麼結果，結果就像下圖這樣，其實在 `selectAll('div').data(data).enter()` 這行裏頭，D3 已經悄悄的把資料放到背景，而且也預先塞入 div 裏頭。

![SVG D3 - 淺談 D3.js 的資料處理](/img/articles/201411/20141101_1_02.jpg)

這時侯只需要將程式改成這樣，就可以把 data 載入：

  	var data = [1,2,3,4,5];

	d3.select('body').selectAll('div')
	  .data(data)
	  .enter()
	  .append('div')
	  .text(function(d){
		 return d;
	  });

可以點選範例  ( [svg-d3-01-data-demo2.html](/demo/201411/svg-d3-01-data-demo2.html) )  參考，為什麼會這樣呢？D3 讓我們在使用各個方法裏頭，都可以利用一個匿名函數的 function 來獲取存在背景的資料，而這些資料會依序放在 function 的第一個變數裏頭，因此 `return d` 就可以依序返回該有的數值，也就會按照 1,2,3,4,5 來呈現。

![SVG D3 - 淺談 D3.js 的資料處理](/img/articles/201411/20141101_1_03.jpg)

因為有了這個神奇的「d」，就可以做出許多有趣的變化，舉例來說，現在有一個全班的成績，要讓不及格的數字是紅色，就可以這樣寫 ( [svg-d3-01-data-demo3.html](/demo/201411/svg-d3-01-data-demo3.html) ) ：

  	var data = [38,69,72,42,58,87];

	d3.select('body').selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.text(function(d){
			return d;
		}).style({
			'color':function(d){
				if(d<60){
					return 'red'
				}
			}
		});

![SVG D3 - 淺談 D3.js 的資料處理](/img/articles/201411/20141101_1_04.jpg)

從上圖可以看到，分數不到六十的，都已經被加上了`color:red`的 CSS style，如果在以前，感覺好像要寫不少行程式，但在 D3 裏頭，卻用沒幾個字就完成了，但光是會用數字還不稀奇，今天再來試著套用到 div 的寬度上看看會如何。( [svg-d3-01-data-demo4.html](/demo/201411/svg-d3-01-data-demo4.html) )  )

 	var data = [38,69,72,42,58,87];

	d3.select('body').selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.text(function(d){
			return d;
		}).style({
			'color':function(d){
				if(d<60){
					return 'red'
				}
			},
			'width':function(d){
				return d+'px'
			},
			'margin':'2px 0',
			'background':'#aaa',
		});

![SVG D3 - 淺談 D3.js 的資料處理](/img/articles/201411/20141101_1_05.jpg)

由上面幾個範例可以看出，D3 對於資料處理的能力，真是有不可言喻的奧妙，但其實 D3 針對數據，其實提供了不少的 API  ( [https://github.com/mbostock/d3/wiki/API-Reference](https://github.com/mbostock/d3/wiki/API-Reference) )，以下來就來稍微看一下 D3 基本的數據處理 API。( [svg-d3-01-data-demo5.html](/demo/201411/svg-d3-01-data-demo5.html) ) 

	var data = [38,69,72,42,58,87];
	
	console.log('min: '+ d3.min(data));         //最小值
	console.log('max: '+ d3.max(data));         //最大值
	console.log('sum: '+ d3.sum(data));         //總和
	console.log('extent: '+ d3.extent(data));   //最小值與最大值
	console.log('mean: '+ d3.mean(data));       //平均數
	console.log('shuffle: '+ d3.shuffle(data)); //亂數排列

![SVG D3 - 淺談 D3.js 的資料處理](/img/articles/201411/20141101_1_06.jpg)

其實 D3 在數據的處理上還有很多方法無法在這篇闡述完成 ( 敝人功力太弱 >_< )，相信熟悉之後一定會更容易處理數據，理解之後也會再一一分享的啦！
