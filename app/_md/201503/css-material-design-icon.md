# 純 CSS Material Design 風格按鈕  

其實 Material Design 的扁平化、以及著重動畫強調的設計風格早在去年七八月的時候就開始大流行 ( 2014 年的 Google I/O 大會 )，在台灣高雄的志誠大也不遑多讓的翻譯了相關設計文件，然而當初一看到，其實就很想要嘗試做做看 Material Design 的 icon 按鈕，這類型的按鈕往往只利用幾何色塊的變化，就能抓住使用者的眼光，並且從幾何形狀中明白按鈕的含意，這也是 Material Design 非常強調的設計理念和精髓。

> 參考：[Google Material Design 正體中文版](http://wcc723.gitbooks.io/google_design_translate/content/) 

![純 CSS Material Design 風格按鈕](/img/articles/201503/20150325_1_02.jpg)

在這篇我純粹利用 CSS ，就做出了 Material Design 風格的按鈕，其實沒有很難，比較需要知道的重點如下：

- **偽元素 before 和 after 的應用**

	偽元素在裏頭扮演相當重要的腳色，利用偽元素我們可以產生兩個不在 HTML 裏頭的類 div，可以大幅降低程式碼的複雜程度。

- **div 的自身寬度與邊框**

	由於我們要進行三角形與矩形之間的形變，雖然三角形可由邊框產生，但卻無法做出漂亮的形變效果 ( 用背景色的話就會有淡入淡出的現象 )，所以必須要用邊框寬度和矩形大小去搭配，當邊框變細的時候，矩形變大，如此一來就可以做出三角形與矩形互相變換的效果囉，下圖的紅色是純粹用顏色變換，藍色則是用邊框寬度與 div 寬度變換，效果應該很明顯吧！( [css-material-design-icon-demo2.html](/demo/201503/css-material-design-icon-demo2.html) )

	![純 CSS Material Design 風格按鈕](/img/articles/201503/20150325_1_03.gif)

- **transform 的應用**

	CSS 裡所有的形變都是藉由 transform 來完成 ( 必要時請加各個瀏覽器的前墜字 )，範例裏頭會用到 scale 與 rotate 這兩個變形屬性。

<br/>
了解原理之後，先來看一下 HTML 代碼，代碼裡面有兩個主要的 div 分別是 a 和 b，a 的話是利用偽元素來進行變換，b 的內容還有三個小 i 分別是 b1、b2 和 b3 ( 都會宣告為 block 屬性 )，因為大於兩個就無法純粹使用偽元素，所以直接用三個 block 元素來表示比較快。

	<div class="a"></div>
	<div class="b">
	  <i class="b1"></i>
	  <i class="b2"></i>
	  <i class="b3"></i>
	</div>

<br/>
接下來就是 CSS 了，先看到 a，首先當然是先畫兩條垂直的矩形，做出暫停的 icon，這裡直接利用偽元素來畫，比較特別的是「高度為 0」，因為在上面有說過，為了要塑造一個「形狀的變換」，而不是「顏色的淡入淡出」，所以必須用 border-width 來代替高度 ( 記得加上 transition 的漸變時間 )。

	.a{
	  position:absolute;
	  top:50px;
	  left:50px;
	  width:100px;
	  height:100px;
	  border-radius:50%;
	  background:#363;
	  transition:.2s;
	}
	.a:before,.a:after{
	  content:"";
	  position:absolute;
	  width:12px;
	  height:0;
	  top:24px;
	  border-style:solid;
	  border-width:0 0 54px 0;
	}
	.a:before{
	  left:27px;
	  border-color:#fff rgba(255,255,255,0) #fff rgba(255,255,255,0);
	  transition:.2s;
	}
	.a:after{
	  left:54px;
	  border-color: rgba(255,255,255,0) rgba(255,255,255,0) #fff #fff ;
	  transition:.2s;
	}

<br/>
主體設定好之後，接著就要來設定 hover 和 active 的效果，這裡就會用 transform 的 scale 和 rotate，除了變形，仔細看一下，寬度和 border 寬度都改變了，加上位置的互相搭配，就可以很容易地做出兩個矩形在滑鼠移上去的時候變成三角形，點下去的時候變成正方形囉！( scale 如果設定兩個值，分別就是寬與長的變形比例 )

	.a:hover:before{
	  top:26px;
	  left:45px;
	  width:0;
	  transform:scale(2,1.17) rotate(90deg);
	  border-width:0 0 24px 24px; 
	}
	.a:hover:after{
	  top:53px;
	  left:45px;
	  width:0;
	  transform:scale(2,1.17) rotate(90deg);
	  border-width:0 24px 24px 0; 
	}
	.a:hover{
	  background:#095;
	  transition:.4s;
	}
	.a:active:before{
	  border-width:0 0 24px 0;
	  width:22px;
	  top:26px;
	  left:38px;
	  transition:.4s;
	}
	.a:active:after{
	  border-width:0 0 24px 0;
	  width:22px;
	  top:50px;
	  left:38px;
	  transition:.4s;
	}
	.a:active{
	  transform:rotate(180deg);
	  background:#0a9;
	}

<br/>
完成的效果就是長這樣。( [css-material-design-icon-demo2.html](/demo/201503/css-material-design-icon-demo2.html) )

![純 CSS Material Design 風格按鈕](/img/articles/201503/20150325_1_04.gif)

接著是另外一個，原理基本上大同小異，然而不需要做形狀變換反而簡單許多，只需要調整角度和長寬就好囉！

	.b{
	  position:absolute;
	  top:50px;
	  left:160px;
	  width:100px;
	  height:100px;
	  border-radius:50%;
	  background:#09c;
	  transition:.2s;
	}
	.b i{
	  position:absolute;
	  display:block;
	  width:56px;
	  height:10px;
	  background:#fff;
	  left:22px;
	  border-radius:2px;
	  transition:.2s;
	}
	.b1{
	  top:24px;
	}
	.b2{
	  top:44px;
	}
	.b3{
	  top:64px;
	}
	.b:hover .b1{
	  left:15px;
	  width:70px;
	  transform:translateY(20px) rotate(45deg);
	}
	.b:hover .b3{
	  left:15px;
	  width:70px;
	  transform:translateY(-20px) rotate(-45deg);
	}
	.b:hover .b2{
	  left:50px;
	  width:0;
	}
	.b:hover{
	  background:#c00;
	}
	.b:active .b1{
	  width:40px;
	  transform:translateY(11px) rotate(-45deg);
	  transition:.3s;
	}
	.b:active .b3{
	  width:40px;
	  transform:translateY(-7px) rotate(45deg);
	  transition:.3s;
	}
	.b:active .b2{
	  top:46px;
	  left:22px;
	  width:60px;
	  transition:.3s;
	}
	.b:active{
	  transform:rotate(45deg);
	  background:#f70;
	}


<br/>
完成的效果長這樣。( [css-material-design-icon-demo3.html](/demo/201503/css-material-design-icon-demo3.html) )

![純 CSS Material Design 風格按鈕](/img/articles/201503/20150325_1_05.gif)

以上就是純粹利用 CSS 做出來的 Material Design 風格按鈕，相信熟練之後就可以做出更多不錯的應用囉！
