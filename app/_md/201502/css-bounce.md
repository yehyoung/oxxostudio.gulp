# 有趣的 CSS 彈跳動畫  

這是只用了一個 div 來做的小動畫，純粹利用 CSS3 的 animation 來完成，就像是一個正方形在地上彈跳，碰到地面的時候尖角還會壓縮變圓，陰影的部分也會隨著正方形升高而縮小，至於到底該怎麼完成呢？讓我們繼續看下去。

由於只使用了一個 div，要同時達到正方形旋轉與陰影縮放的效果，這裡必須使用兩個偽元素 ( before 與 after ) 來完成，嚴格來說，雖然只有一個 div，但是卻是把這個 div 當作外框，讓偽元素 before 作為旋轉的正方形，讓偽元素 after 作為陰影，如果對於偽元素不太了解的，可以參考我之前寫的這篇：[電子時鐘效果 ( CSS 偽元素的應用 )](http://www.oxxostudio.tw/articles/201407/css-clock.html)
	
	.box{
	  position:relative;
	  
	}
	.box:before{
	  content:'';
	  position:absolute;
	  z-index:2;
	  top:60px;
	  left:50px;
	  width:50px;
	  height:50px;
	  background:#c00;
	  border-radius:2px;
	  transform: rotate(45deg);
	}
	.box:after{
	  content:'';
	  position:absolute;
	  z-index:1;
	  top:128px;
	  left:52px;
	  width:44px;
	  height:3px;
	  background:#eaeaea;
	  border-radius:100%;
	}

![有趣的 CSS 彈跳動畫](/img/articles/201502/20150209_1_02.jpg)

<br/>
畫出正方形與陰影之後，再來就是要做動畫了，為了避免太過複雜，這裡我們先不要旋轉，先單純讓正方形上下跳動，然後陰影會放大縮小，下面的範例的動畫，有新增了 20% 與 80% 的 keyframe，目的是為了讓接觸的時候角落才會變圓，不然就會變成剛開始移動時尖角就變圓，就會很怪異了。(範例：[css-bounce-demo1.html](/demo/201502/css-bounce-demo1.html))

	.box:before{
	  content:'';
	  position:absolute;
	  z-index:2;
	  top:60px;
	  left:50px;
	  width:50px;
	  height:50px;
	  background:#c00;
	  border-radius:2px;
	  transform: rotate(45deg);
	  -webkit-animation:box .8s infinite ; 
	}
	@-webkit-keyframes box{
	  0%{
	    top:50px;
	  }
	  20%{
	    border-radius:2px;  /*從 20% 的地方才開始變形*/
	  }
	  50%{
	    top:80px; 
	    border-bottom-right-radius:25px;
	  }
	  80%{
	    border-radius:2px;  /*到 80% 的地方恢復原狀*/
	  }
	  100%{
	    top:50px;
	  }
	}
	.box:after{
	  content:'';
	  position:absolute;
	  z-index:1;
	  top:128px;
	  left:52px;
	  width:44px;
	  height:3px;
	  background:#eaeaea;
	  border-radius:100%;
	  -webkit-animation:shadow .8s infinite ; 
	}
	@-webkit-keyframes shadow{
	  0%,100%{
	    left:54px;
	    width:40px;
	    background:#eaeaea;
	  }
	  50%{
	    top:126px;
	    left:50px;   /*讓陰影保持在原位*/
	    width:50px;
	    height:7px;
	    background:#eee;
	  }
	}

![有趣的 CSS 彈跳動畫](/img/articles/201502/20150209_1_03.gif)

<br/>
了解原理之後，我們只要再加上旋轉的屬性，就可以達到彈跳起來的時候有旋轉的效果，不過這裡又有用到一個小技巧，就是落下的時候是 90 度轉到 45 度，彈上去的時候從 45 旋轉到 0 度，然後在這一瞬間從 0 度變成 90 度 ( 100% 到 0% )，如此一來我們就會產生錯覺，感覺好像一直在旋轉了。(範例：[css-bounce-demo2.html](/demo/201502/css-bounce-demo2.html))

	@-webkit-keyframes box{
	  0%{
	    top:50px;
	    transform: rotate(90deg); /**/
	  }
	  20%{
	    border-radius:2px;
	  }
	  50%{
	    top:80px; 
	    transform: rotate(45deg);
	    border-bottom-right-radius:25px;
	  }
	  80%{
	    border-radius:2px;
	  }
	  100%{
	    top:50px;
	    transform: rotate(0deg);
	  }
	}

![有趣的 CSS 彈跳動畫](/img/articles/201502/20150209_1_04.gif)

<br/>
舉一反三，我們也可以把角度反轉，就會往另外一邊彈跳。(範例：[css-bounce-demo3.html](/demo/201502/css-bounce-demo3.html))

![有趣的 CSS 彈跳動畫](/img/articles/201502/20150209_1_05.gif)

<br/>
如果我們把動畫裡頭添加 linear，就會變成線性的連續方式喔。(範例：[css-bounce-demo4.html](/demo/201502/css-bounce-demo4.html))

![有趣的 CSS 彈跳動畫](/img/articles/201502/20150209_1_06.gif)
