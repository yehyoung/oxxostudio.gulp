# SVG D3.js - transition ( tween、interpolate )  

![](/img/articles/201509/svg-d3-15-transition-tween.gif#preview-img) 

之前有介紹過「d3.js 基本的 transition」( 好像是一月份的事情了，真是好久以前啦... )，這篇要來談談比較難的 tween ( 補間動畫 )，在之前的 transition 都是使用 d3.js 預設的補間動畫，而 tween 可以透過一個函式，指定中間過場的行為，這個方式其實很好用，因為我們除了基本的長、寬、位置、顏色，更可以做出文字、數字...等電腦不知道如何做補間動作的效果 ( 例如 1~10 的數字變換 )，而 tween 通常會搭配 interpolate 一起服用，所以這篇就一起來介紹。

> 參考：[d3.js 基本的 transition](http://www.oxxostudio.tw/articles/201501/svg-d3-14-transition-1.html)

tween 的用法其實滿容易的，就是`tween(name,factory)`，當中的 name 是我們自訂這個補間動畫的名稱，不過這個 name 實際上沒有太大的用處，彷彿是識別用的 ( 可以參考 stackoverflow 的[這篇](http://stackoverflow.com/questions/25002417/d3-use-of-the-name-argument-in-transition-tween)，也是有人對這個 name 有同樣的困惑 )，至於第二個參數 factory 就十分重要了，裏頭主要會放上我們需要進行補間動畫的程式，以下面的這個例子來看，透過`interpolateRound`，可以計算 0 到 100 之間的補間數字，然後再透過 tween 本身的 return，就可以非常簡單的做出一個 0 到 100 跳動的效果。( 範例：[svg-d3-15-transition-tween-demo1.html](/demo/201509/svg-d3-15-transition-tween-demo1.html) ) 

	var show = d3.select('#show');

	show.transition().tween("number", function() {
	  var i = d3.interpolateRound(0, 100);
	  return function(t) {
	    this.textContent = i(t);
	  };
	});

在上一篇 transition 有提過，duration 預設值為 250ms，因此我們如果把 duration 拉長，就會看到數字慢慢增加。( 範例：[svg-d3-15-transition-tween-demo2.html](/demo/201509/svg-d3-15-transition-tween-demo2.html) )

	var show = d3.select('#show');

	show.transition()
	.duration(2000)
	.tween("number", function() {
	  var i = d3.interpolateRound(0, 100);
	  return function(t) {
	    this.textContent = i(t);
	  };
	});

![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_02.gif)

比較清楚 tween 在幹嘛之後，接著要先來看一下 interpolate 的用法，畢竟 tween 的精髓還是在 interpolate，其實在之前已經有出現過 interpolate ( [SVG D3.js - 繪製線段](http://www.oxxostudio.tw/articles/201411/svg-d3-02-line.html) )，是幫我們自動去計算線段之間的插值，而 interpolate 主要有以下這幾種：

- **d3.interpolate(a, b)**

  回傳一個 a 到 b 之間的 ( 插 ) 值，會根據 a 和 b 的型別或屬性去做自動判斷，如果是顏色，則會回傳顏色的值，如果是數字，則會回傳數字的值，舉例來說，我們可以算出 0 到 200 之間從 0 數過來 30% 的數字，也可以換成顏色紅到青之間從紅色算過來 30% 的顏色是什麼，只要使用 d3.interpolate 就很容易搞定。( 範例：[svg-d3-15-transition-tween-demo3.html](/demo/201509/svg-d3-15-transition-tween-demo3.html) )

      var n = d3.select('#number');
      var s = d3.select('#string');
      var c = d3.select('#color');
    
      var ni = d3.interpolate(0, 200);
      var si = d3.interpolate('Apple1','Apple5');
      var ci = d3.interpolate('#ff0000','#00ffff');
    
      n.text(ni(0.3));
      s.text(si(0.3));
      c.text(ci(0.3));

	![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_03.jpg)


- **d3.interpolateNumber(a, b)**

	回傳一個數字插值。

- **d3.interpolateRound(a, b)**

	回傳一個整數的數字插值。

- **d3.interpolateString(a, b)**

	回傳一個字串插值，方式是從字串裡面找到數字，由數字去做插值判斷，舉例來說，如果今天你的字串是「Hello 123 World」到「Cool 456」，那麼出來的結果就會是「Cool 232.89000000000001」。( 範例：[svg-d3-15-transition-tween-demo4.html](/demo/201509/svg-d3-15-transition-tween-demo4.html) )

      var s = d3.select('#string');
      var si = d3.interpolateString('Hello 123 World', 'Cool 456');
    
      s.text(si(0.33));

	![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_04.jpg)

- **d3.interpolateRgb(a, b)**

	回傳顏色插值，類似的還有`d3.interpolateHsl(a, b)`、`d3.interpolateLab(a, b)`、`d3.interpolateLab(a, b)`，這裏就直接用 RGB 的來介紹就可以，因為用法一樣，使用這個 API 我們就可以很簡單的做出在某個區間內的顏色。( 範例：[svg-d3-15-transition-tween-demo5.html](/demo/201509/svg-d3-15-transition-tween-demo5.html) 

	  var c = d3.select('#color');
	  var show = d3.select('#show');
  
	  var ci = d3.interpolateRgb('#f00', '#39e');
  
	  c.text(ci(0.6));
	  show.style({
	    'background':ci(0.6)
	  });

	![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_05.jpg)

- **d3.interpolateArray(a, b)**

	回傳陣列的插值，比較需要注意的地方是，不管 a 或 b 陣列長度如何，最終的結果都會是相同長度的陣列，舉例來說，如果今天 a 陣列是 [0,1] 而 b 陣列是 [1,10,100]，那麼 0.5 的時候就會回傳 [0.5,5,100]，最後就自動補上 100 了。( 範例：[svg-d3-15-transition-tween-demo6.html](/demo/201509/svg-d3-15-transition-tween-demo6.html)

	  var a = d3.select('#array');
	  var ai = d3.interpolateArray([0,1], [1,50,100]);
  
	  a.text(ai(0.5));

	![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_06.jpg)


- **d3.interpolateObject(a, b)**

	回傳物件的插值，做法其實跟陣列很像，如果缺少的會就會自動補上，因為是物件，所以我們用 console 來看。( 範例：[svg-d3-15-transition-tween-demo7.html](/demo/201509/svg-d3-15-transition-tween-demo7.html)

	  var o = d3.select('#object');
	  var oi = d3.interpolateObject(
	    {x:0,y:1},{x:1,y:50,z:100}
	  );
	  
	  console.log(oi(0.5));

	![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_07.jpg)

- **d3.interpolateTransform(a, b)**

	如果要純粹針對 SVG 的 transform，就可以使用 d3.interpolateTransform 來回傳變形的插值。( 如果是用在一般 CSS 可能會有錯誤，因為如果在 translate 內加上 px 就會錯了 )( 範例：[svg-d3-15-transition-tween-demo8.html](/demo/201509/svg-d3-15-transition-tween-demo8.html)

	  var box = d3.select('#box');  
	  
	  box.transition()
	    .duration(2000)
	    .tween('move',function(){
	      var start = d3.transform("translate(10,10)");
	      var stop = d3.transform("translate(80,80)");
	      var interpolate = d3.interpolateTransform(start,stop);
	      return function(t){
	         d3.select(this).attr("transform", interpolate(t));
	      }
	    });

	![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/20150912_1_08.gif)


到這邊基本上已經可以利用 interpolate 和 tween 做出自己的補間動畫，這個方式其實在許多視覺畫圖表的動態都滿常見的，最後我們將前面的集合在一起做個變化，就會有頗酷的效果囉！( 範例：[svg-d3-15-transition-tween-demo9.html](/demo/201509/svg-d3-15-transition-tween-demo9.html)

	var show = d3.select('#show');
	var cc = document.getElementById('color');
	
	show.transition()
	.duration(2000)
	.tween("number", function() {
	  var i = d3.interpolateRound('0', '1000');
	  var c = d3.interpolateRgb('#555', '#fa0');
	  return function(t) {
	    this.textContent = i(t);
	    d3.select(this).style({'color':c(t)});
	    console.log(cc.textContent);
	    cc.innerHTML = c(t);
	  };

![SVG D3.js - transition ( tween、interpolate )](/img/articles/201509/svg-d3-15-transition-tween.gif)


