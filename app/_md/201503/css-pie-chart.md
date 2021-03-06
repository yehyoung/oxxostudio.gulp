# 純 CSS 繪製圓餅圖  

![](/img/articles/201503/css-pie-chart.gif#preview-img)

當初我玩 SVG 的初衷，一部分就是因為當時的瀏覽器無法支援 CSS3 的動畫效果，當年為了一個圓餅圖 ( pie chart )，做不出來簡直快抓狂啦，但是近年來瀏覽器的效能大幅躍進，基本上使用純粹的 CSS 也可以做到圓餅圖的效果 ( 甚至是動畫 )，所以就用一篇文章來記錄一下純 CSS 繪製圓餅圖的過程吧！

利用 CSS 做圓餅圖不如 SVG 來的直覺，畢竟在 CSS 裡頭要做成圓形，只能利用`border-radius`的方法進行，因此純粹的 CSS 圓餅圖，勢必得用一個以上的 div 來組合產生，那麼，啾竟需要多少個 div 才有辦法做出一個漂亮的圓餅圖呢？目前我的做法「只需要用一個 div 搭配自身兩個偽元素」即可，換句話說，就是用 div 本身作為遮罩，內容的兩個偽元素互相旋轉搭配，就可以做出逼真的圓餅圖。

看完上面的文字，我相信一定還是搞不太懂，所以先來看一下步驟拆解圖，兩個偽元素拆解出來，就是兩個一模一樣的半圓形，利用半圓形的旋轉，就可以做出從 180 度開始往上算的扇形。

![純 CSS 繪製圓餅圖](/img/articles/201503/20150324_2_02.jpg)

那麼要如何做出小於 180 度的扇形呢？這裏就必須讓原本的 div 作為遮罩，當身為半圓形的偽元素被遮住，自然就可以做出不同角度的扇形囉！

![純 CSS 繪製圓餅圖](/img/articles/201503/20150324_2_03.jpg)

了解原理之後，就要來寫 CSS 了 ( HTML 裡頭只有一個 div，id 是 m )，這個 div 照理來說應該要是正方形的，但因為我們要把這個 div 作為遮罩使用，所以一開始要讓它的寬度減半，因為消失的那一半，利用 `overflow:hidden;`讓偽元素躲在裡面 ( 就像魔術師變魔術的隱藏空間 )，同時設定`border-radius`，讓偽元素裡頭的一些邊緣消失 ( 因重疊的區域往往會產生鋸齒狀的毛邊 ) ，動畫的部分稍後就會講到。

	#m{
	  top:100px;
	  left:100px;
	  margin-left:50px;
	  position:absolute;
	  width:50px;
	  height:100px;
	  overflow:hidden;
	  border-radius:0 50px 50px 0;
	  -webkit-animation:a 5s infinite linear;
	}

<br/>
寫完 div 之後就來看看偽元素的寫法，基本上 before 和 after兩個偽元素長的一模一樣，差別在於 before 先躲在遮罩裡，after 則是以透明的狀態出現在外面 ( 一個躲在裡面，一個用隱身術站在外面 )，當 before 利用 transform 的方式旋轉出來之後，before 和 after 重疊的瞬間 after 就現身，就可以組成一個大於 180 杜的扇形。

	#m:before,#m:after{
	  content:"";
	  box-sizing:border-box;
	  position:absolute;
	  top:0;
	  right:0; 
	  width:100px;
	  height:50px;
	  background:#0ce;
	  border-style:solid;
	  border-color:#000;
	  border-width:6px 6px 0;
	  border-radius:50px 50px 0 0;
	  transform-origin:50px 50px;
	}
	#m:before{
	  z-index:1;
	  -webkit-animation:a1 5s infinite linear;
	  transform:rotate(-90deg);
	}
	#m:after{
	  opacity:0;
	  z-index:2;
	  transform:rotate(90deg);
	  -webkit-animation:a2 5s infinite linear;
	}

<br/>
在 after 現身的瞬間，原本的 div 也要瞬間恢復原本的大小，不然 before 又會進入遮罩的區域而看不見，這時候就需要動畫的效果呈現囉！a1 是 before 的動畫，純粹就是旋轉，a2 是 after 的動畫，只有透明度的變化 ( 因為它只是負責隱形而已 )，a 就是 div 自身的動畫效果。

	@-webkit-keyframes a1{
	  0%{ 
	    transform:rotate(-90deg);
	  }
	  100%{ 
	    transform:rotate(270deg);
	  }
	}
	@-webkit-keyframes a2{
	  0%{
	    opacity:0;
	  }
	  49.99%{
	    opacity:0;
	  }
	  50%{
	    opacity:1;
	  }
	  100%{
	    opacity:1;
	  }
	}
	@-webkit-keyframes a{
	  0%{
	    margin-left:50px;
	    width:50px;
	    border-radius:0 50px 50px 0;
	  }
	  49.99%{
	    margin-left:50px;
	    width:50px;
	    border-radius:0 50px 50px 0;
	  }
	  50%{
	    margin-left:0;
	    width:100px;
	    border-radius:0;
	  }
	  100%{
	    margin-left:0;
	    width:100px;
	    border-radius:0;
	  }
	}

<br/>
完成之後的長相就會是這樣囉！( 範例：[css-pie-chart-demo1.html](/demo/201503/css-pie-chart-demo1.html))

![純 CSS 繪製圓餅圖](/img/articles/201503/20150324_2_04.gif)

其實如果你把遮罩拿掉，圓角移除，再用個透明度，看到的就會是真實的長相，所以，利用 before 和 after 的變化，就可以輕鬆地純粹利用 CSS 來做圓餅圖了。( 範例：[css-pie-chart-demo2.html](/demo/201503/css-pie-chart-demo2.html))

![純 CSS 繪製圓餅圖](/img/articles/201503/20150324_2_05.gif)

最後，如果搭配 jQuery 的應用，就可以做出不同角度的圓餅圖，甚至你也可以利用 range slider 來實現一些簡單的互動，不過用 jquery 有個要注意的地方，就是偽元素 after 和 before 並不是 HTML 的 DOM，所以無法正常的用 jQuery 獲取，因此要直接用 append 添加樣式才可以囉。( 範例：[css-pie-chart-demo3.html](/demo/201503/css-pie-chart-demo3.html))

	$(function(){
	  var deg;
	  
	  $('input').on('mousedown',function(){
	    deg = $(this).val();
	    _deg(deg);
	    $('input').on('mousemove',function(){
	      deg = $(this).val();
	      _deg(deg);
	    });
	  });
	  
	  function _deg(deg){
	    if(deg<180){
	      $('head').append(
	        "<style>"+
	        ".pie{width:50px; margin-left:50px;border-radius:0 50px 50px 0;}"+
	        ".pie:before{transform:rotate("+(deg-90)+"deg);}"+
	        ".pie:after{opacity:0;}"+
	        "</style>"
	      );
	    }else{
	      $('head').append(
	        "<style>"+
	        ".pie{width:100px; margin-left:0;border-radius:0;}"+
	        ".pie:before{transform:rotate("+(deg-90)+"deg);}"+
	        ".pie:after{opacity:1;}"+
	        "</style>"
	      );
	    }
	  }
	  
	});


![純 CSS 繪製圓餅圖](/img/articles/201503/css-pie-chart.gif)

圓餅圖相關連結：

- [SVG 研究之路 (12) - pie chart 圓餅圖實作](http://www.oxxostudio.tw/articles/201406/svg-12-pie-chart.html)
- [SVG 研究之路 (24) - 寫 jquery 產生圓餅圖](http://www.oxxostudio.tw/articles/201409/svg-24-jquery-pie-chart.html)


