# 偽元素 ( content 與 counter )

前面介紹過 ::before 和 ::after 這兩個偽元素，以及 content 相關的用法，這篇將針對 content 搭配 counter ( 計數器 ) 進行一些有趣的應用，相信熟練之後搞不好很好玩也說不定。

## counter 基本用法

在 CSS 裏頭，counter 是個很有意思的功能，最常見得就是如果我們使用 list 清單，樣式選擇 decimal 十進位，當清單變多的時候數字也會跟著增加，底層貌似就是使用 counter 來做的，也因為 counter 所產生的數值並不存在於網頁的元素內，所以如果我們要在清單元素之外使用，就必須透過 ::before 或 ::after 的 content 來實現。

counter 最的基本用法一定要有一個父元素和子元素 ( 類似 list 的原理，使用 ul 包著 li )，所以長相會類似下面這段 html：

	<div>
	  <span>鋼鐵人</span>
	  <span>美國隊長</span>
	  <span>雷神索爾</span>
	</div>

在 CSS 裏頭，先針對 div 父元素使用`counter-reset:num;`進行計數器歸零的設置，裡面 num 是計數器累加數值的變數，接著可以在 span::before 裡面看到`counter-increment:num;`這一段，
這段的作用是把 num 累加上去，預設數值為加 1，接著就透過 content 顯示出來。

>計數器預設的顯示語法為：`counter(計數器名稱, list-style-type)`

	div{
	  counter-reset:num;
	}
	span{
	  display:block;
	}
	span::before{
	  counter-increment:num; 
	  content:counter(num) '. ';
	}

![](/img/articles/201706/pseudo-element-2-01.jpg)

透過指定一開始 counter-reset 的起始數值，還有 counter-increment 累加的間隔數值，就可以做出從某個數值開始或只顯示偶數、奇數的效果。

	div{
	  counter-reset:num 3;
	}
	span{
	  display:block;
	}
	span::before{
	  counter-increment:num 2; 
	  content:counter(num) '. ';
	}

![](/img/articles/201706/pseudo-element-2-02.jpg)

如果要更換數字的樣式，也可以*透過計數器的第二個設定值 list-style-type 來更改*，下面的例子就是將樣式更改為 georgian。

	div{
	  counter-reset:num;
	}
	span{
	  display:block;
	}
	span::before{
	  counter-increment:num; 
	  content:counter(num, georgian) '. ';
	}

![](/img/articles/201706/pseudo-element-2-03.jpg)

## counter 進階用法

除了指定單一個變數外，counter 也可以同時指定多個變數，例如下面這段 HTML，有三個類別在裡面，我分別用 span、i 和 b 來分類。

	<div>
	  <span>鋼鐵人</span>
	  <span>美國隊長</span>
	  <span>雷神索爾</span>
	  <i>神盾局</i>
	  <i>神鬼局</i>
	  <i>神經局</i>
	  <b>九頭蛇</b>
	  <b>九頭牛</b>
	  <b>九頭豬</b>
	</div>

CSS 一開始 counter-reset 可以指定多個變數，透過一個空白字元分隔，如果*空白字元後面接著數字則是起始值，沒有數字預設為 0*，當這樣設定之後，就可以看到不同類別的數字代號就不同。

	div{
	  counter-reset:num numi 2 numb 5;
	}
	span, i, b{
	  display:block;
	}
	span::before{
	  counter-increment:num; 
	  content:counter(num) '. ';
	}
	i::before{
	  counter-increment:numi 2; 
	  content:counter(numi) '. ';
	}
	b::before{
	  counter-increment:numb 5; 
	  content:counter(numb) '. ';
	}

![](/img/articles/201706/pseudo-element-2-04.jpg)

如果遇到了巢狀結構，需要一層層的展開 ( 例如：1 > 1.1 > 1.1.1 )，採用上述的作法可能就會複雜許多，好險 counter 還提供了另外一個 counters 的功能，目的就是來解決巢狀結構的麻煩事，在開始前可以先看看透過 ul 和 li 組合的清單長相：

	<ul>
	  <li>第一層
	    <ul>
	      <li>第二層
	        <ul>
	          <li>第三層</li>
	          <li>第三層</li>
	          <li>第三層</li>
	        </ul>
	      </li>
	      <li>第二層</li>
	      <li>第二層</li>
	    </ul> 
	  </li>
	  <li>第一層</li>
	    <ul>
	      <li>第二層</li>
	      <li>第二層</li>
	    </ul>
	</ul>

傳統的清單如果將 list-style 設為 decimal，同樣可以具備數字接續的功能，但相對來說要做一些特殊變化就辦不到了。

	li{
	  list-style:decimal;
	}

![](/img/articles/201706/pseudo-element-2-05.jpg)

透過 content 和 counters 的搭配，我們就可以告別預設值的困擾，甚至可以在不使用清單 ul 和 li 的狀況下，實現和清單一模一樣的效果，舉例來說，我們純粹透過 div 模擬一個清單的長相 ( 狀態仍然必須是有父元素和子元素的概念 )，裡面的樣式 b 就等於是 ul，樣式 a 就等於是 li：

	<div class="a">第一層
	  <div class="b"> 
	    <div class="a">第二層
	      <div class="b">
	        <div class="a">第三層</div>
	        <div class="a">第三層</div>
	        <div class="a">第三層</div>
	      </div>
	    </div>
	    <div class="a">第二層</div>
	    <div class="a">第二層</div>
	  </div>
	</div>
	<div class="a">第一層
	  <div class="b">
	    <div class="a">第二層</div>
	    <div class="a">第二層</div>
	  </div>
	</div>

由於 b 的外層沒有東西，所以一開始要把 body 和 b 都進行 counter reset 的動作，接著透過 counters 的使用，讓計數器的數值可以一個接著一個放進去，如此一來就可以做到原本清單不容易實現的效果了。

>counters 使用語法：`counters(計數器名稱, 分隔字, list-style-type)`

	body, .b{
	  counter-reset:c;
	}
	.a::before{
	  content:counters(c, ".") "：";
	  counter-increment:c; 
	}
	div{
	  margin-left:10px;
	}

![](/img/articles/201706/pseudo-element-2-06.jpg)

了解原理之後，透過 ::before 和 ::after 的交互應用，就可以做出頗具特色的清單效果。

	body, .b{
	  counter-reset:c;
	}
	.a{
	  box-sizing:border-box;
	  position:relative;
	  line-height:40px;
	}

	.a .a{
	  padding-left:30px;
	}

	.a::after{
	  content:'';
	  box-sizing:border-box;
	  display:inline-block;
	  position:absolute;
	  z-index:-1;
	  top:0;
	  left:0;
	  width:100%;
	  height:40px;
	  margin-left:30px;
	  box-shadow:inset 0 2px #666;
	  background:#eee;
	}
	.a::before{
	  content:counter(c, upper-roman);
	  counter-increment:c;
	  display:inline-block;
	  width:30px;
	  height:40px;
	  background:#666;
	  color:#fff;
	  text-align:center;
	  margin-right:5px;
	}

![](/img/articles/201706/pseudo-element-2-07.jpg)

## 小結

原本網頁裡面使用的清單，如果要進行樣式的修改、或是一些編號的設置，往往都要透過 JavaScript 來實現，如果熟練了 counter 的用法，搞不好純粹使用 CSS 就能取代掉大部分 JavaScript 也說不定呢~

說到 JavaScript，下一篇將會介紹透過 JavaScript 來操控偽元素的用法。


