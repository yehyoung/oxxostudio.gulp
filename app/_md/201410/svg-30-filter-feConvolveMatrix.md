# SVG 研究之路 (30) - filter - feConvolveMatrix  

![](/img/articles/201410/svg-30-filter-feConvolveMatrix.jpg#preview-img)

之前有介紹過模糊的濾鏡「SVG 研究之路 (13) - filter - feGaussianBlur」，既然有模糊濾鏡，為什麼沒有銳利化的濾鏡呢？其實是有的，在 SVG 如果說要進行銳利化，便要使用 feConvolveMatrix 這個濾鏡來實現，而且 feConvolveMatrix 不僅能進行銳利化，同時它也可以進行模糊的動作，不過因為是針對每個像素與四周像素進行矩陣運算，來計算出模糊或銳利，所以要寫的數字和程式相較於單純的 feGaussianBlur 濾鏡會複雜不少，因此如果有模糊的需求，還是直接使用 feGaussianBlur 吧！以下就來介紹一下 feConvolveMatrix 這個神奇的濾鏡。

> 參考：[SVG 研究之路 (13) - filter - feGaussianBlur](http://www.oxxostudio.tw/articles/201406/svg-13-filter-feGaussianBlur.html)

首先要來看一下 feConvolveMatrix 的原理，feConvolveMatrix 要把字拆開看，也就是 Convolution Matrix，我們搜尋 feConvolveMatrix 其實找不太到資料，但如果搜尋 Convolution Matrix，就會發現在圖學裡頭有一拖拉庫的東西，還牽扯到許多的演算法之類的，超複雜的呀！而且，photoshop 和 premiere 裡面竟然也有 Convolution Matrix，真是令人太驚訝啦！( 看下圖 )

Photoshop ( 濾鏡>其他>自訂 )

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_02.png)

Premiere ( Effect 搜尋 Convolution )

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_03.png)


看到這麼多資訊，糾竟 Convolution Matrix 是什麼玩意兒這麼強大，連 Adobe 都會使用 ( 相信絕對不只這幾套軟體有用 )，簡單來說，就是透過每個像素本身與周圍像素的矩陣運算，算出這個圖形裏頭每個像素的 RGBA 分別會變成如何，演算過後有可能彼此差異變大(銳利)，也有可能差異變小(模糊)，也有可能整個反相(浮雕或反相)，也因此可以做出基本的模糊、銳利或浮雕...等的效果，熟悉的高手更可以根據不同的圖片套用不同的矩陣，達到一般濾鏡所辦不到的事情，但通常我們不會這樣去做，畢竟有現成的濾鏡就直接拿來用了呀。

文字的解釋看完，就來看一下 Convolution Matrix 的原理，下圖是 Convolution Matrix 的公式：

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_04.png)

很難懂對不對！沒關係，換個角度思考，其實就是下面這張圖，左邊英文字母是我們圖片的一個個像素，E 在正中間是套用濾鏡的像素，而進行矩陣運算之後就會變成一組數字 ( Ax1 + Bx2 + Cx3 + Dx4 + Ex5 + Fx6 + Gx7 + Hx8 + Ix9 )，然後再除以矩陣的數字和 ( 1+2+3+4+5+6+7+8+9 )，最後出來的數字就是經過 Convolution Matrix 轉換的結果，而加上的 bias 是偏移量。

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_05.png)

我知道還是很難懂，那就再用另外一張圖解釋，假設我們現在有一個 5x5 的圖：

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_06.png)

這張圖換算成 rgb 的點就變成這樣：

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_07.png)

經過 Convolution Matrix (1 1 1 1 1 1 1 1 1) 換算後：

![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_08.png)


整張圖就變得不一樣了，或是說變模糊了，這就是進行了 Convolution Matrix 的結果，同樣的，上面花了這麼大篇幅解釋的原理，其實就是 SVG 的 feConvolveMatrix 濾鏡原理，現在就來看看 feConvolveMatrix 有哪些屬性可以設定：

- **order**

	定義我們作用的圖格有幾格 ( 也就是矩陣要多大 )，預設是 3 ，也就是 3x3 的矩陣，當然你也可以設大一點，但會比較消耗 CPU。

- **kernelMatrix = "list of numbers"**

	feConvolveMatrix 最關鍵的屬性，裏頭擺放的就是矩陣，因為在計算的時候，矩陣內容總和會作為分母，**如果分母等於 0，在數學上是不成立的，這時候整體除出來的數值就會變成 1**，通常在寫的時候，會以矩陣的方式換行來寫，但如果覺得換行很佔空間，也是可以把 3x3 共九個數字寫成一排，中間記得要空格就是了。
	而且在 SVG 裏頭計算起來，其實是與要相反過來看，也就是剛剛上面提到 Ax1 + Bx2 + Cx3 + Dx4 + Ex5 + Fx6 + Gx7 + Hx8 + Ix9，在 SVG 實際上是 Ax9 + Bx8 + Cx7 + Dx6 + Ex5 + Fx4 + Gx3 + Bx2 + Ax1，下圖是一個簡單的示意：

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_09.png)

- **divisor**

	這個數字預設值為矩陣的總和，當然也可以自己去定義，若有定義這個值，則會按照我們的定義進行。( 不過同樣的不能等於0, 等於 0 的話除出來就會變成 1 )

- **bias**

	最後出來結果的偏移量，預設值為 0。

- **targetX、targetY**

	目標像素的中心位置，最左邊與最上面為 0，最右邊和最下面則是整個矩陣的大小，預設都是在中心點的位置。

- **edgeMode = "duplicate | wrap | none"**

	這個屬性跟漸層的重複原理很像，none 就是不會重複，duplicate 就是進行鏡像地重複，wrap 就是進行單純的重複。

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_10.png)
	
- **kernelUnitLength**

	預設只有一個數值，也可以填寫兩個數值，分別是 dx 和 dy，這個屬性讓原本作用只有一個像素的內核，可以伸縮擴展。

- **preserveAlpha = "false | true"**

	預設值為 false ，表示 alpha 色版將也會一併進行矩陣運算，如果設為 true，將只會用於 RGB 色版。


一堆文字的說明終於結束，其實上述的文字，就是這個濾鏡的基本介紹和原理，因為真的要花心思去做圖片矩陣的計算，還真的會搞死一堆人，所以，可以先參考許多圖學前輩先們所累積的矩陣，直接套用，來看看實際的效果是如何。

- 原圖

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_demo.png)

- 模糊 1

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_11.png)

	    <feConvolveMatrix order="3" kernelMatrix="
            1  1  1	
            1  1  1	
            1  1  1" edgeMode="none">
        </feConvolveMatrix>

- 模糊 2

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_12.png)

	    <feConvolveMatrix order="3" kernelMatrix="
            3  0  3	
            0  0  0	
            3  0  3" edgeMode="none">
        </feConvolveMatrix>

- 銳利 1

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_13.png)

	    <feConvolveMatrix order="3" kernelMatrix="
            0 -1  0	
           -1  5 -1	
            0 -1  0" edgeMode="none">
        </feConvolveMatrix>

- 銳利 2

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_14.png)

	    <feConvolveMatrix order="3" kernelMatrix="
            0 -2  0	
           -2  15 -2	
            0 -2  0" edgeMode="none">
        </feConvolveMatrix>

- 邊緣化

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_15.png)

	    <feConvolveMatrix order="3" kernelMatrix="
            1  1  1	
            1 -6  1	
            1  1  1" edgeMode="none">
        </feConvolveMatrix>

- 浮雕 1

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_16.png)

	    <feConvolveMatrix order="3" kernelMatrix="
           -2 -1  0	
           -1  1  1	
            0  1  2" edgeMode="none">
        </feConvolveMatrix>

- 浮雕 2

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_17.png)

	    <feConvolveMatrix order="3" kernelMatrix="
           -9 -2  0	
           -2  1  2	
            0  2  9" edgeMode="none">
        </feConvolveMatrix>

- 浮雕 3

	![SVG 研究之路 (30) - filter - feConvolveMatrix](/img/articles/201410/20141020_1_18.png)

	    <feConvolveMatrix order="3" kernelMatrix="
            2  0  0	
            0 -1  0	
            0  0 -1" edgeMode="none" bias="100">
        </feConvolveMatrix>


以上就是 feConvolveMatrix 的基本介紹，不過，除非真的有需要，不然這種影像處理的事情還是交給 photoshop 來解決就好了哈哈！畢竟人家才是專家咩~ 而且雖然我們可以自己手動計算，但實際上的演算法卻不是加減乘除這麼單純，而且每種利用矩陣來進行影像處理的方式，也會受到圖片本身的影響，所以這個方法學起來，雖然實際用到的情況不多，但真的有需要就會派上用處囉！
