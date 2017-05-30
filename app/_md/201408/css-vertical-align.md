# CSS 垂直置中的三個方法

![](/img/articles/201408/css-vertical-align.jpg#preview-img)

( 新增文章參考：[ CSS 垂直置中的七個方法](http://www.oxxostudio.tw/articles/201502/css-vertical-align-7methods.html) )

我們在編輯一個版面，通常都會用到水平置中和垂直置中來設計，而水平置中很好處理，不外乎就是設定`margin:0 auto;`或是`text-align:center;`,就可以輕鬆解決掉水平置中的問題，但一直以來最麻煩對齊問題，都是「垂直置中」這個討人厭的設定，以下將介紹三種單純利用 CSS 垂直置中的方式：「設定行高」、「添加偽元素」、「calc 動態計算」，其實一點也不難 ( 當然跟水平置中比起來難了一點 )，只需要觀念正確就可以解決。

<br/>

1. **設定行高 ( line-height )**  

	設定行高是垂直置中最簡單的方式，適用於「單行」的「行內元素」 ( inline、inline-block )，例如單行的標題，或是已經設為 inline-block 屬性的 div，若將 line-height 設成和高度一樣的數值，則內容的行內元素就會被垂直置中，**因為是行高，所以會在行內元素的上下都加上行高的 1/2**，所以就垂直置中了！不過由此就可以看出，為什麼必須要單行的行內元素，因為**如果多行，第二行與第一行的間距會變超大**，就不是我們所期望的效果了。
	CSS 範例：外層 div0，內容 redbox，讓 redbox 水平垂直置中。

	![CSS 垂直置中的三個方法](/img/articles/201408/20140831_1_02.png)

		.div0{
		  width:200px;
		  height:150px;
		  border:1px solid #000;
		  line-height:200px;
		  text-align:center;
		}
		.redbox{
		  display:inline-block;
		  width:30px;
		  height:30px;
		  background:#c00;
		}

<br/>

2. **添加偽元素 ( ::before、::after )** 

	剛剛第一種方法，雖然是最簡單的方法 ( 適用於單行標題 )，不過就是只能單行，所以我們如果要讓多行的元素也可以垂直置中，就必須要使用偽元素的方式。在此之前，先解釋一下 CSS 裏頭 vertical-align 這個屬性，這個屬性雖然是垂直置中，不過卻是指**在元素內的所有元素垂直位置互相置中**，並不是相對於外框的高度垂直置中。 ( 下面的 CSS 會造成這種樣子的垂直置中 )

	![CSS 垂直置中的三個方法](/img/articles/201408/20140831_1_03.png)

		.div0{
		  width:200px;
		  height:150px;
		  border:1px solid #000;
		  text-align:center;
		}
		.redbox{
		  width:30px;
		  height:30px;
		  background:#c00;
		  display:inline-block;
		  vertical-align:middle;
		}
		.greenbox{
		  width:30px;
		  height:60px;
		  background:#0c0;
		  display:inline-block;
		  vertical-align:middle;
		}
		.bluebox{
		  width:30px;
		  height:40px;
		  background:#00f;
		  display:inline-block;
		  vertical-align:middle;
		}

	因此，如果有一個方塊變成了高度 100%，那麼其他的方塊就會真正的垂直置中。

	![CSS 垂直置中的三個方法](/img/articles/201408/20140831_1_04.png)

		.greenbox{
		  width:30px;
		  height:100%;
		  background:#0c0;
		  display:inline-block;
		  vertical-align:middle;
		}

	但是我們總不能每次要垂直置中，都要添加一個奇怪的 div 在裏頭吧！所以我們就要把腦筋動到「偽元素」身上，利用`::before`和`::after`添加 div 進到框框內，讓這個「偽」div的高度 100%,就可以輕鬆地讓其他的 div 都置中。不過不過不過！**div 記得要把 display 設為 inline-block**，畢竟 vertical-align:middle; 是針對行內元素，div 本身是 block，所以必須要做更改！

	![CSS 垂直置中的三個方法](/img/articles/201408/20140831_1_05.png)

		.div0::before{
		  content:'';
		  width:0;
		  height:100%;
		  display:inline-block;
		  position:relative;
		  vertical-align:middle;
		  background:#f00;
		}

<br/>

3. **calc 動態計算**

	看到這邊或許會有疑問，如果今天我的 div 必須要是 block，我該怎麼讓它垂直置中呢？這時候就必須用到 CSS 特有的`calc`動態計算的能力，我們只要讓要置中的 div 的 top 屬性，與上方的距離是「50% 的外框高度 + 50% 的 div 高度」，就可以做到垂直置中，至於為什麼不用 margin-top，因為 margin 抓到的是水平寬度，必須要用 top 才會正確。

	![CSS 垂直置中的三個方法](/img/articles/201408/20140831_1_05.png)

		.div0{
		  width:200px;
		  height:150px;
		  border:1px solid #000;
		}
		.redbox{
		  width:30px;
		  height:30px;
		  background:#c00;
		  float:left;
		  top:calc(50% - 15px);
		  margin-left:calc(50% - 45px);
		}
		.greenbox{
		  width:30px;
		  height:80px;
		  background:#0c0;
		  float:left;
		  top:calc(50% - 40px);
		}
		.bluebox{
		  width:30px;
		  height:40px;
		  background:#00f;
		  float:left;
		  top:calc(50% - 20px);
		}

<br/>

以上就是三種垂直置中的方法，沒有想像的困難，但往往在需要的時候都會忘記，做個筆記也分享一下。( 新增文章參考：[ CSS 垂直置中的七個方法](http://www.oxxostudio.tw/articles/201502/css-vertical-align-7methods.html) )
