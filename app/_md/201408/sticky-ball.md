# 噁心黏黏球 ( 純 CSS )

這是一個純粹利用 CSS 所做出來的效果，這個效果說穿了就是一個影像處理的原理，做法跟 Photoshop 裡頭的幾乎一模一樣，只是一個用圖層和色版來製作，一個則是用 CSS ( 把 div 當成圖層思考就好了 )。

> 完整範例程式碼：[http://jqmdesigner.appspot.com/designer.html#&ref=5128921674678272](http://jqmdesigner.appspot.com/designer.html#&ref=5128921674678272)

一開始我們來玩 Photoshop，會比直接寫 CSS 來得容易理解 ( 沒有 Photoshop 的人也沒關係，看完說明也就懂了ㄎㄎ )，首先我們新增兩個圖層，一個裡頭放上紅色的小球，另外一個裡頭放上黑色的大球。

![](/img/articles/201408/20140829_1_02.png)

接著我們使用高斯模糊的濾鏡，分別把小紅球和大黑球模糊。

![](/img/articles/201408/20140829_1_03.png)

![](/img/articles/201408/20140829_1_04.png)

再來我們新增一個「亮度與對比」的調整圖層，勾選使用舊版，然後把對比數值往上拉，你就會看到神奇的現象。

![](/img/articles/201408/20140829_1_05.png)

拉到邊緣不再模糊之後，你就可以用滑鼠嘗試著把紅球移動，就會發現紅球與黑球交界的地方變成黏黏的很噁心，這就是我們要做的效果！( 笑 )

![](/img/articles/201408/20140829_1_06.gif)

就這樣，你已經知道如何用 Photoshop 來製作，同理，CSS 也是用同樣的方法，只是把圖層換成了 div 而已，就這麼簡單。

首先我在 HTML 裡頭，放上一個 class 為 redball 的 div 當作紅球，class 為 blackball 的是黑球，這就是剛剛在 PhotoShop 裡頭的兩個圖層，接著在最外圍放上一個 class 為 effect 的 div，這就是我們的調整圖層，完成後 HTML 程式碼的長相應該是這樣：

    <div class="effect">
      <div class="blackball"></div>
      <div class="redball"></div>
    </div>

只要對 blackball 和 redball 加入模糊的濾鏡，對 effect 加入對比的濾鏡，就能夠達到 Photoshop 裡面的特效，而模糊的濾鏡必須使用`-webkit-filter:blur(數值)`，對比則使用`-webkit-filter:blur(數值)`，這個只能夠運行在 Chrome 和 Safari 這兩個使用 webkit 核心的瀏覽器，所以 firefox 和 IE 就抱歉啦！

![](/img/articles/201408/20140829_1_07.gif)

CSS 的長相會長這樣：

	.effect{
	  width:100%;
	  height:100%;
	  padding-top:50px;
	  -webkit-filter:contrast(10);
	  background:#fff;
	}
	.blackball{
	  width:100px;
	  height:100px;
	  background:black;
	  padding:10px;
	  border-radius:50%;
	  margin:0 auto;
	  z-index:1;
	  -webkit-filter:blur(5px);
	}
	.redball{
	  width:60px;
	  height:60px;
	  background:#f00;
	  padding:10px;
	  border-radius:50%;
	  position:absolute;
	  top:70px;
	  left:50px;
	  z-index:2;
	  -webkit-filter:blur(5px) ;
	  -webkit-animation:rball 6s infinite;
	}

忽略 CSS 裡頭那些定位數值，裡頭 blur 的數值設為 5px，contrast 的數值設為 10，就可以看到紅求黑球黏在一起了，至於該怎麼讓他們動起來呢？就要使用 CSS3 的 animation，animation 的程式如下：

	@-webkit-keyframes rball{
	  0%,100%{
	    left:35px;
	    width:60px;
	    height:60px;
	  }
	  4%,54%{
	    width:60px;
	    height:60px;
	  }
	  10%,60%{
	    width:50px;
	    height:70px;
	  }
	  20%,70%{
	    width:60px;
	    height:60px;
	  }
	  34%,90%{
	    width:70px;
	    height:50px;
	  }
	  41%{
	    width:60px;
	    height:60px;
	  }
	  50%{
	    left:calc(100% - 95px);
	    width:60px;
	    height:60px;
	  }
	}

這裡落落長的 keyframe 寫了很多，因為要讓紅球進入黑球時，水平方向會被壓縮一下，然後再離開黑球的時候，水平方向會被拉長，如此一來才會更像有黏性的感覺，為了測試這個效果，可真是煞費我的苦心呀！( 不過這裡有個要注意的地方，由於位置上會自動去計算，所以要測試的話，最外層的 effect 寬度記得設為 320px  )

完成紅球之後，要讓兩顆藍色球合在一起再分開，也是同樣的原理，下方列出兩顆藍色球的 CSS，比較需要注意的地方是我讓藍色球合體之後會變大一些，分開的時候也會拉長，在這個距離和時間上倒是花了不少時間調整呀！

![](/img/articles/201408/20140829_1_08.gif)

	.blueball1{
	  width:80px;
	  height:80px;
	  background:#00f;
	  padding:10px;
	  border-radius:50%;
	  position:absolute;
	  top:230px;
	  left:0;
	  z-index:2;
	  -webkit-filter:blur(8px) ;
	  -webkit-animation:bball1 6s infinite;
	}
	.blueball2{
	  width:80px;
	  height:80px;
	  background:#00f;
	  padding:10px;
	  border-radius:50%;
	  position:absolute;
	  top:230px;
	  left:240px;
	  z-index:2;
	  -webkit-filter:blur(8px) ;
	  -webkit-animation:bball2 6s infinite;
	}
	@-webkit-keyframes bball1{
	  0%,100%{
	    left:0;
	    top:230px;
	    width:80px;
	    height:80px;
	  }
	  20%{
	    top:230px;
	    width:80px;
	    height:80px;
	  }
	  85%{
	    top:230px;
	    left:75px;
	    width:90px;
	    height:70px;
	  }
	  90%{
	    top:228px;
	    width:75px;
	    height:85px;
	  }
	  50%{
	    top:215px;
	    left:110px;
	    width:110px;
	    height:110px;
	  }
	}
	@-webkit-keyframes bball2{
	  0%,100%{
	    left:240px;
	    top:230px;
	    width:80px;
	    height:80px;
	  }
	  20%{
	    top:230px;
	    width:80px;
	    height:80px;
	  }
	  85%{
	    top:230px;
	    left:165px;
	    width:90px;
	    height:70px;
	  }
	  90%{
	    top:228px;
	    width:75px;
	    height:85px;
	  }
	  50%{
	    left:110px;
	    top:215px;
	    width:110px;
	    height:110px;
	  }
	}

  
就這樣，單純利用 CSS 就完成了一個噁心的效果，坦白說我也不太清楚這個效果可以用在哪裡，不過如果用在水底世界或一些 loading 的特效，應該是相當不賴的噢！

完整範例程式碼：[http://jqmdesigner.appspot.com/designer.html#&ref=5128921674678272](http://jqmdesigner.appspot.com/designer.html#&ref=5128921674678272) ( 使用 EZoApp，按下上方 preview 可以預覽 )
