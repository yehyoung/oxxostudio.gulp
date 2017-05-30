# SVG 研究之路 (23) - 理解 viewport 與 viewbox  

![](/img/articles/201409/svg-23-viewpoint-viewBox.jpg#preview-img) 

記得我初次接觸 SVG 的時候，常常為了定位和大小感到相當的疑惑，有時候明明設定了這樣的大小，莫名其妙的又變成了另外的大小，也不知道該如何去設定，直到看了 [W3C 的定義](http://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute) 之後，總算才明白了箇中原理，雖然我們都知道 SVG 該如何去使用，但往往一開始卻忽略了 SVG 的許多設定，所以這篇文章我們回頭仔細看看相關的設定，對於之後的圖形操作，也才能夠真正的融會貫通，也不需要一查再查了。

在 [SVG 研究之路 (17) - Stroke-marker](http://www.oxxostudio.tw/articles/201409/svg-17-storke-marker.html) 裡其實也有提到 viewbox ，但是總覺得沒有直接來篇文章介紹，觀念上再遇到的時候又會亂掉了。這篇主要會介紹 viewport ，當中包含了 viewbox 和 preserveAspectRatio 兩個屬性。

- **viewport**

	簡單來說這也不算是個屬性，這是指「視圖」或「視區」，也就是圖片可視區域的大小，除了 SVG 本身，一些指定的元素也是有視區的機制存在，例如 symbol、image、pattern、marker 都是，如果我們以 SVG 來說，width="300" height="300" 就表示我們定義了一個 300x300 的視區，與 HTML 和 CSS 比較不同的地方，SVG 本身定義這些屬性是沒有單位的，不過基本上就是以「像素 px」為單位。

- **viewbox ( min-x, min-y, width, height )**

	viewbox 對於第一次接觸的人來說，是很抽象的一個元素，第一因為不知道它是幹嘛用的，第二，就算你勉強了解了，還是不清楚該如何去設定。
	
	首先來談談 viewbox 的原理，它的原理其實很簡單，就直接從字面上翻譯：視盒，也就是 SVG 的可視範圍，講到這裡應該有點亂了，為什麼上面才提到 viewport，現在又來一個可視範圍？其實應該這樣解釋，當我們不設定 viewbox 的時候，viewbox 就是整個 viewport 的大小，當我們設定了 viewbox，等於就是告訴 SVG 說：「只有這個區域是我要表現的」，SVG 便會把這個區域放大到 viewport 的大小，如果還是很難理解，可以想像一下我們家的電視機，電視機就是那麼大，就是 viewport，而電視機裡的畫面，可以特寫，可以全景，這就是 viewbox。

	![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_02.jpg)

	換句話說，viewbox 其實是一個虛擬的座標系統，當我們使用了 viewbox，位置和大小就會按照 viewbox 的座標系統去做設定，看下面這張示意的動畫會更清楚。

	![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_03.gif)

	如果我們將圖形超過了 viewbox 會如何呢？看下面的動畫就更能理解：

	![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_04.gif)

	這時候你一定還有疑問，如果今天 viewbox 的比例和 viewport 不同該怎麼辦呢？最終結果當然還是會以填滿 viewport 為主，畢竟不可能有畫面可以超出電視機的吧！( 3D 電視？XD ) 不過畢竟不是每個 viewbox 都和 viewport 同比例，這樣又該如何去做設定呢？這時候就需要用到「preserveAspectRatio」了。
		
- **preserveAspectRatio ( align [meetOrSlice] )**

	preserveAspectRatio 是使用 viewbox 時，一個搭配服用的特別屬性，這個屬性必須要有 viewbox 才有作用，不然寫了就會直接被忽略掉，接著我們看到 preserveAspectRatio 裏頭具有兩個參數，第一個參數是必填的 align，第二個參數是選填的 meetOrSlice，也因此從字面上可以發現，preserveAspectRatio 是一個以**對齊為主，然後再選擇要自動填滿還是咖掉的屬性**，了解之後，就讓我們來一一解釋。

	- *align*

		align 參數是由兩個名詞所組成，這兩個名詞分別代表 viewbox 與 viewport 的 x 方向對齊模式，以及 y 方向的對齊模式，換句話說，可以想成：「水平置中 + 垂直靠上對齊」的這種感覺，不過在這個 align 的表現手法倒是很抽象，可以用下方的表格看出端倪：

		<table width="500">
		<tbody><tr>
		<th>參數</th>
		<th>代表意義</th>
		</tr>
		<tr>
		<td>xMin</td>
		<td>viewport 和 viewBox 水平靠左對齊</td>
		</tr>
		<tr>
		<td>xMid</td>
		<td>viewport 和 viewBox 水平置中</td>
		</tr>
		<tr>
		<td>xMax</td>
		<td>viewport 和 viewBox 水平靠右對齊</td>
		</tr>
		<tr>
		<td>YMin</td>
		<td>viewport 和 viewBox 垂直靠上對齊</td>
		</tr>
		<tr>
		<td>YMid</td>
		<td>viewport 和 viewBox 垂直置中</td>
		</tr>
		<tr>
		<td>YMax</td>
		<td>viewpor t和 viewBox 垂直靠下對齊</td>
		</tr>
		</tbody></table>

		也因此我們要做一個「水平置中 + 垂直靠上對齊」的 viewbox 設定，就必須寫成：`xMidYMin`，做一個「水平靠右對齊 + 垂直靠下對齊」的 viewbox 設定，就必須寫成：`xMaxYMax`，**不過這裡有個細節請特別注意，「Y」是大寫呀！**真是不知道為什麼會這樣設計，我想或許跟命名規則有關吧！

		好啦！了解原理之後，直接用一些範例會更清楚再說甚麼，下列的範例，紅色框框是 viewbox 的示意圖，在右上左上右下左下分別有四個色塊，正中間有一個黑色色塊，就讓我們來設定 preserveAspectRatio，看看效果會如何：

		![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_05.png)

		這是水平靠左垂直靠上的模式：

		![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_06.png)

			<svg width="300" height="200" style="border:1px solid; background:#fff;" viewbox="0,0,100,160" preserveAspectRatio="xMinYMin slice">
			  <rect width="40" height="30" x="0" y="0" fill="#c00">  
			  </rect> 
			  <rect width="40" height="30" x="60" y="0" fill="#f80">  
			  </rect> 
			  <rect width="40" height="30" x="0" y="130" fill="#09c">  
			  </rect> 
			  <rect width="40" height="30" x="60" y="130" fill="#0c0">  
			  </rect> 
			  <rect width="40" height="30" x="30" y="65" fill="#000">  
			  </rect> 
			</svg>

		這是水平置中垂直置中的模式：

		![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_07.png)

			<svg width="300" height="200" style="border:1px solid; background:#fff;" viewbox="0,0,100,160" preserveAspectRatio="xMidYMid slice">
			  <rect width="40" height="30" x="0" y="0" fill="#c00">  
			  </rect> 
			  <rect width="40" height="30" x="60" y="0" fill="#f80">  
			  </rect> 
			  <rect width="40" height="30" x="0" y="130" fill="#09c">  
			  </rect> 
			  <rect width="40" height="30" x="60" y="130" fill="#0c0">  
			  </rect> 
			  <rect width="40" height="30" x="30" y="65" fill="#000">  
			  </rect> 
			</svg>

		看到這裡，我相信大家應該已經理解了不少，不過，應該也又冒出了一些疑問，例如：「為什麼水平看起來都沒變化？」「裡面的 slice 是甚麼挖哥呀？」，這些疑問將在選填的 meetOrSlice 來做解答。

	- *meetOrSlice*

		設定 viewbox 的填滿規則，由於 viewbox 存在的目的，就是為了填滿 viewport，因此，上面提到的 align，就只是對齊的部分，而預設的 meetOrSlice 就是 meet，也就是會保持長寬比例的縮放 viewbox，直到 viewbox 的長或寬填滿 viewport 為止，從下面的圖片可以很清楚的看出來，紅色框框的 viewbox，在設定為 meet 之後，就保持比例的放大，直到高度填滿了 viewport 為止。

		![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_08.gif)

			<svg width="300" height="200" style="border:1px solid; background:#fff;" viewbox="0,0,120,120" preserveAspectRatio="xMinYMin meet">
			  <rect width="40" height="30" x="0" y="0" fill="#c00">  
			  </rect> 
			  <rect width="40" height="30" x="80" y="0" fill="#f80">  
			  </rect> 
			  <rect width="40" height="30" x="0" y="90" fill="#09c">  
			  </rect> 
			  <rect width="40" height="30" x="80" y="90" fill="#0c0">  
			  </rect> 
			  <rect width="40" height="30" x="40" y="45" fill="#000">  
			  </rect> 
			</svg>

		至於 slice 就照字面的意思，會等比例縮放，但直到填滿 viewport 為止，超出去的部分就直接咖掉

		![SVG 研究之路 (23) - 理解 viewport 與 viewbox](/img/articles/201409/20140925_1_09.gif)

			<svg width="300" height="200" style="border:1px solid; background:#fff;" viewbox="0,0,120,120" preserveAspectRatio="xMidYMid slice">
			  <rect width="40" height="30" x="0" y="0" fill="#c00">  
			  </rect> 
			  <rect width="40" height="30" x="80" y="0" fill="#f80">  
			  </rect> 
			  <rect width="40" height="30" x="0" y="90" fill="#09c">  
			  </rect> 
			  <rect width="40" height="30" x="80" y="90" fill="#0c0">  
			  </rect> 
			  <rect width="40" height="30" x="40" y="45" fill="#000">  
			  </rect> 
			</svg>

		由於 meet 和 slice 均會至少一邊整個填滿 viewport ，所以不會在設定的過程中發現沒有填滿的情形。(填滿是指 viewbox 的某一邊填滿 viewport)

以上就是 SVG 的 viewport 與 viewbox，理解之後，對於各種圖形的顯示區域與放大縮小，就能有更深一層的體會，也不容易用錯囉！

