# Material Design - Progress and Activity 

這是一個利用 CSS 與 SVG 所做出來的進度條，仿照 Google Material Design 的設計風格設計，雖然 Google 有提供一系列的扁平風格樣式，但是由於技術尚未完全成熟，沒有相關的程式可以參考和套用，就自己寫了一個類似的，雖然還沒有模擬到百分之百，但已經是百分之八十接近了，分享一下。

我所做的 Progress and Activity 結構其實很簡單，就是使用 SVG 內部的 Circle 進行虛線的長度和間距變換，然後外層的 SVG 進行 360 度的旋轉，再搭配另外一個 SVG Circle 就可以做出頗炫的動態效果，整個效果完全不需要用到 JS,
只需要撰寫 CSS 就完成囉！

<div class="sd">
<svg class="loading-bg-red" width="100" height="100" x="0" y="0" style="position:absolute; top:0; left:0;">
<circle cx="50" cy="50" r="25" stroke="rgba(255,100,120,.2)" stroke-width="0" fill="none" stroke-dasharray="156,156" stroke-dashoffset="0" stroke-linecap="round" />
</svg>

<svg width="100" height="100" class="loading-circle loading-red" x="100" y="100" style="position:absolute; top:0; left:0;">
<circle cx="50" cy="50" r="25" stroke="#f99" stroke-width="1" fill="none" stroke-dasharray="104,156" stroke-linecap="round" stroke-dashoffset="-52" />
</svg>
</div>

首先看到 SVG 的結構，第一個 SVG 名為 loading-bg-red ，內容的 Circle 是背景的大圈圈，因此它的背景是半透明的`rgba(255,100,120,.2)`,因為我是使用虛線的外框 ( stroke )，至於為什麼`stroke-width`設為 0 呢？因為一開始是沒有大圈圈的，所以設為 0，再使用 CSS 進行漸變，再來看到第二個 SVG，就是內容旋轉的進度條，最重要的是`stroke-dasharray`和`stroke-dashoffset`兩個屬性，主要掌管了這個虛線的長度以及虛線要跑去哪裡。 ( 可以參考我之前的 [SVG 研究之路 (6) - stroke 邊框](http://www.oxxostudio.tw/articles/201406/svg-06-stroke.html) )

    <svg class="loading-bg-red" width="100" height="100" x="0" y="0" style="position:absolute; top:0; left:0;">
        <circle cx="50" cy="50" r="25" stroke="rgba(255,100,120,.2)" stroke-width="0" fill="none" stroke-dasharray="156,156" stroke-dashoffset="0" stroke-linecap="round"></circle>
    </svg>

    <svg width="100" height="100" class="loading-circle loading-red" x="100" y="100" style="position:absolute; top:0; left:0;">
        <circle cx="50" cy="50" r="25" stroke="#f99" stroke-width="1" fill="none" stroke-dasharray="104,156" stroke-linecap="round" stroke-dashoffset="-52"></circle>
    </svg>

<br/>

知道了 SVG 的結構，再來就看看要如何做出讓虛線一長一短的效果，首先要注意就是虛線的長度，因為要一長一短，起點和終點的位置要相同，所以我們可以用一個簡單的規則來設計相關的 CSS，規則就是如果虛線最長的長度是圓周的一半，則必須使用 2x2=4 也就是四個 CSS 來描述四段虛線，若長度為 2/3，則必須使用 2x3=6 六段 CSS 來描述六段虛線，同理，若為 3/4，就必須使用八段 CSS，至於為什麼要這麼多段呢？因為一段為收合，一段為延長，每段的虛線起始點都不同，所以必須這麼進行，也因此盡量讓虛線長度為 1/2 或 2/3 或 3/4，不然大概會寫 CSS 寫到天荒地老吧！以下列出我寫的虛線 ( 2/3 長度 ) 的 CSS。

	.loading-circle circle{ 
	  -webkit-animation:c1_2 9s linear infinite,c1_3 4.5s infinite; 
	  -moz-animation:c1_2 9s linear infinite,c1_3 4.5s infinite; 
	  animation:c1_2 9s linear infinite,c1_3 4.5s infinite; 
	}

	/*控制粗細*/
	@-webkit-keyframes c1_2{
	  0%{
	    stroke-width:0;
	  }
	  10%{
	    stroke-width:8;  
	  }
	  75%{
	    stroke-width:8;  
	  }
	  90%{
	    stroke-width:0;  
	  }
	  100%{
	    stroke-width:0;  
	  }
	}

	/*控制段落*/
	@-webkit-keyframes c1_3{
	  /*第一段*/
	  0%{
	    stroke-dasharray:104,156;
	    stroke-dashoffset:-52;
	  }
	  16%{
	    stroke-dasharray:1,156;
	    stroke-dashoffset:-52;
	  }
	  /*第二段*/
	  16.01%{
	    stroke-dasharray:1,156;
	    stroke-dashoffset:-208;
	  }
	  33%{
	    stroke-dasharray:104,52;
	    stroke-dashoffset:-104;
	  }
	  /*第三段*/
	  33.01%{
	    stroke-dasharray:104,52;
	    stroke-dashoffset:-104;
	  }
	  49%{
	    stroke-dasharray:1,156;
	    stroke-dashoffset:-104;
	  }
	  /*第四段*/
	  49.01%{
	    stroke-dasharray:1,156;
	    stroke-dashoffset:52;
	  }
	  66%{
	    stroke-dasharray:104,52;
	    stroke-dashoffset:156;
	  }
	  /*第五段*/
	  66.01%{
	    stroke-dasharray:104,52;
	    stroke-dashoffset:156;
	  }
	  82%{
	    stroke-dasharray:1,156;
	    stroke-dashoffset:156;
	  }
	  /*第六段*/
	  82.01%{
	    stroke-dasharray:1,156;
	    stroke-dashoffset:156;
	  }
	  99.99%{
	    stroke-dasharray:104,52;
	    stroke-dashoffset:256;
	  }
	}

如果還是對於分成六段有疑問，可以參考下圖，主要就是要將這三個圈圈組合起來，每個圈圈會收會放，換成這樣子思考，就會必較簡單。  

![Material Design - Progress and Activity](/img/articles/201407/20140710_1_02.png)

<br/>

了解了整體的運作模式之後，最後一個步驟就是讓整個 SVG 進行旋轉，因此加上旋轉的 CSS 動畫，就可以做出相當不錯的特效囉！

	@-webkit-keyframes c1_1{
	  0%,100%{
	    -webkit-transform:rotate(0deg);
	  }
	  100%{
	    -webkit-transform:rotate(-360deg);
	  }
	}
	
<br/>

完整的程式碼可以參考下列的 [EZoApp 範例連結](http://goo.gl/adm32D) ( 看不到效果可以點選 preview )，或 [jsbin 範例連結](http://jsbin.com/moyiyi/12)。  

![Material Design - Progress and Activity](/img/articles/201407/20140710_1_03.gif)
