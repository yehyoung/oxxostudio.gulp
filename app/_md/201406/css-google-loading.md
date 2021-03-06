# CSS3動畫 - Google Loading Animation 

自從使用了智慧型手機之後，就常常在觀察手機 UI 的設計細節，隨著扁平化設計風格的興起，Google 的載入進度動畫也就變得相當的扁平風且具有設計感，後來發現不只手機的載入進度是用扁平化的風格，連 Google plus、Gmail...等 Google 產品都是使用類似的載入進度動畫，一時興起，使用 CSS3 做了一組 Google 的載入動畫。( 凡是跟 Google 沾上邊好像就高級了一些，不過有些電腦效能比較差的會有些閃爍 )

<div id="google_loading">
<div></div>
</div>

在製作載入動畫之前，我們必須要先有 CSS3 的動畫概念以及立體的概念，不過因為這篇不是介紹 CSS3 動畫與立體，因此這邊就不太過著墨，直接來看成品的程式碼來一步步說明。

首先看到動畫的架構，主要分為了三個層，一個是**定位層** ( #googleloading )，一個是**底層** ( div、::after )，最後一個是**葉片層** ( ::before )，定位層目的在於讓整個 loading 可以做定位，位置不會影響到內容，底層包含了一個 div 和一個偽元素 ::after，主要是區分兩個顏色，葉片層則是直接使用 ::before 代替。或許有人會問說兩種顏色直接用漸層色代替就好啦，沒錯，我一開始就是使用這個方式，但後來發現**漸層色的動畫在 firefox 是出不來的**，所以必須使用 ::after 來代替。( ::before 和 ::after 是偽元素，可以當作連著主體前後的 div 使用 )

	<div id="google_loading">
	   <div></div>
	</div>

<br/>

讓我們先看看本體的 div ，主要設定 border-radius 讓它變成半圓形，同加上動畫使其顏色每固定一秒就換一次，同時變換角度，然而原本有個`transform-style`的屬性，因為沒有牽涉到 Z 軸的變化，因此就不需要使用，當中比較特別的，因為圓形的另外一半使用偽元素 ::after 代替，因此中心點必須使用 left 使其往左移，避免到時候是繞著本體的中心點移動。

	#google_loading>div{
	  left:50px;
	  width:50px;
	  height:100px;
	  border-radius:0 50px 50px 0;
	  position:absolute;
	  z-index:10;
	  -webkit-perspective:200px;
	  -webkit-transform:rotateY(0deg);
	  -webkit-animation:bgColor1_key 4s linear infinite both,rotate_key 4s infinite both;
	  -webkit-transform-origin:0 50%;
	  perspective:200px;
	  transform:rotateY(0deg);
	  animation:bgColor1_key 4s linear infinite both,rotate_key 4s infinite both;
	  transform-origin:0 50%;
	}

</br>

再來看看另外一個半圓 ::after 的主要的 CSS 結構，和主體一樣，設定成半圓形和主體接在一起，並設定動畫每一秒就換色和換角度。( 因為有四個角度所以一秒換一個，總共就四秒 )

	#google_loading>div:after{
	  content:'';
	  position:absolute;
	  z-index:10;
	  top:0;
	  left:-50px;
	  width:50px;
	  height:100px;
	  border-radius:50px 0 0 50px;
	  background:#ccc;
	  -webkit-animation:bgColor2_key 4s linear infinite both;
	  animation:bgColor2_key 4s linear infinite both;
	}

<br/>

最後看到作為葉片 ::before ，其實並沒有太特別的，主要就是讓正方形的 div 利用`border-radius`方式變成**半圓形**，接著設定`transform-origin`讓旋轉時可以固定在直線的邊邊。接著設定好顏色與角度的變化，就可以轉動了，而葉片因為是跟隨主體 ( 主體的偽元素 )，因此就會跟著主體每隔一秒變換 90 度角一次。

	#google_loading>div:before{
	  content:'';
	  position:absolute;
	  z-index:11;
	  top:0;
	  left:0px;
	  width:50px;
	  height:100px;
	  border-radius:0 50px 50px 0;
	  -webkit-transform-origin:0 50%;
	  -webkit-transform:rotateY(0deg) rotateZ(0deg);
	  -webkit-animation:flipColor_key 4s linear infinite both,flip_key 4s linear infinite both;
	  transform-origin:0 50%;
	  transform:rotateY(0deg) rotateZ(0deg);
	  animation:flipColor_key 4s linear infinite both,flip_key 4s linear infinite both;
	}

</br>

其實就是以下三個東西組合在一起。

<div id="google_loading1">
<div></div>
</div>
<div id="google_loading3">
<div></div>
</div>
<div id="google_loading2">
<div></div>
</div>

最後補上完整的動畫程式碼，記得，chrome 要加上 -webkit-，firefox 則不用，再補充一次，為什麼要使用 ::after 充當另外一個色塊而不使用漸層，因為 firefox 在漸層的動畫是沒有作用的，所以才必須如此，然而比較早的時候我也用了另外一種作法，就是使用三個 div 來彼此作變化，但若是分成不同的 div，除了程式碼會比較肥大，也會有瀏覽器效能的問題，不同的 div 的時間差不同，會造成閃動的情形，尤其在效能比較差的電腦或是手機上更是常見，現在改用這種作法，除了程式碼更為簡潔，效果也更好！

	#google_loading>div:after{
	  content:'';
	  position:absolute;
	  z-index:10;
	  top:0;
	  left:-50px;
	  width:50px;
	  height:100px;
	  border-radius:50px 0 0 50px;
	  background:#ccc;
	  -webkit-animation:bgColor2_key 4s linear infinite both;
	  animation:bgColor2_key 4s linear infinite both;
	}
	@-webkit-keyframes flip_key{
	  0%    {-webkit-transform:rotateY(0deg);}
	  12.5% {-webkit-transform:rotateY(90deg);}
	  25%   {-webkit-transform:rotateY(180deg);}
	  37.5% {-webkit-transform:rotateY(90deg);}
	  50%   {-webkit-transform:rotateY(0deg);}
	  62.5% {-webkit-transform:rotateY(90deg);}
	  75%   {-webkit-transform:rotateY(180deg);}
	  87.5% {-webkit-transform:rotateY(90deg);}
	  100%  {-webkit-transform:rotateY(0deg);}
	}
	@-webkit-keyframes flipColor_key{
	  0%    {background: #f52d27;}
	  12.5% {background: #7d0906;}
	  25%   {background: #ffd539;}
	  37.5% {background: #9f7d00;}
	  50%   {background: #00b262;}
	  62.5% {background: #00190e;}
	  75%   {background: #3a71f8;}
	  87.5% {background: #052e94;}
	  100%  {background: #f52d27;}
	}
	@-webkit-keyframes bgColor1_key{
	  0%,50%  {background: #ffd539;}
	  50.01%,100% {background: #3a71f8;}
	}
	@-webkit-keyframes bgColor2_key{
	  0%,25%    {background: #f52d27;}
	  25.01%,75% {background: #00b262;}
	  75.01%,100% {background: #f52d27;}
	}
	@-webkit-keyframes rotate_key{
	  0%,25%{
	    -webkit-transform:rotate(0deg);
	  }
	  25.01%,50%{
	    -webkit-transform:rotate(90deg);
	  }
	  50.01%,75%{
	    -webkit-transform:rotate(180deg);
	  }
	  75.01%,100%{
	    -webkit-transform:rotate(270deg);
	  }
	}
	@keyframes flip_key{
	  0%    {transform:rotateY(0deg);}
	  12.5% {transform:rotateY(90deg);}
	  25%   {transform:rotateY(180deg);}
	  37.5% {transform:rotateY(90deg);}
	  50%   {transform:rotateY(0deg);}
	  62.5% {transform:rotateY(90deg);}
	  75%   {transform:rotateY(180deg);}
	  87.5% {transform:rotateY(90deg);}
	  100%  {transform:rotateY(0deg);}
	}
	@keyframes flipColor_key{
	  0%    {background: #f52d27;}
	  12.5% {background: #7d0906;}
	  25%   {background: #ffd539;}
	  37.5% {background: #9f7d00;}
	  50%   {background: #00b262;}
	  62.5% {background: #00190e;}
	  75%   {background: #3a71f8;}
	  87.5% {background: #052e94;}
	  100%  {background: #f52d27;}
	}
	@keyframes bgColor1_key{
	  0%,50%     {background: #ffd539;}
	  50.1%,100% {background: #3a71f8;}
	}
	@keyframes bgColor2_key{
	  0%,25%    {background: #f52d27;}
	  25.01%,75% {background: #00b262;}
	  75.01%,100%{background: #f52d27;}
	}
	@keyframes rotate_key{
	  0%,25%{
	    transform:rotate(0deg);
	  }
	  25.01%,50%{
	    transform:rotate(90deg);
	  }
	  50.01%,75%{
	    transform:rotate(180deg);
	  }
	  75.01%,100%{
	    transform:rotate(270deg);
	  }
	}

