# SVG 研究之路 (16) - Stroke-miterlimit  

在之前 [SVG 研究之路 (6) - stroke 邊框](http://www.oxxostudio.tw/articles/201406/svg-06-stroke.html) 有介紹過邊框的用法，不過其實 Stroke 還有其他的屬性可以設定使用，以下將介紹：「stroke-miterlimit」這個線段屬性，與之前相同，這篇仍舊會搭配一些 illustrator 來說明，因為我覺得，能回歸圖形思考，才是向量「圖」的真實面貌。

首先我們仍然先使用 illustrator 畫出一段折線，並存檔成為 SVG。  

![SVG 研究之路 (16) - Stroke-miterlimit](/img/articles/201409/20140906_1_02.png)

接著我們把 SVG 的程式碼打開，可以看到這段折線的程式碼長得這樣：

	<polyline fill="none" stroke="#000" stroke-width="10" stroke-miterlimit="10" 
		points="62,45 109,62.7 54.3,74.3 101.3,87.7 77.7,116.7 "/>

對照 illustrator 的線段屬性面板，我們可以很簡單的發現邊框的寬度，以及一個特別的數值：「限度」，這個「限度」，就是`stroke-miterlimit`這個屬性。  

![SVG 研究之路 (16) - Stroke-miterlimit](/img/articles/201409/20140906_1_03.png)

我們嘗試將 10 調整為 1，就可以發現有趣的現象，原本線段交界的交折處，尖角會開始變成不是尖角的形式。  

![SVG 研究之路 (16) - Stroke-miterlimit](/img/articles/201409/20140906_1_04.gif)

在解釋為什麼之前，我們也可以藉由 illustrator 的屬性面板裏頭發現，若將線段的交折處設定為「圓角」或「斜角」，則不會有「限度」這個屬性可以設定，同理，圓角與斜角在 SVG Stroke 裡的屬性分別為`stroke-linejoin="round"`以及`stroke-linejoin="bevel"`( 參考 [SVG 研究之路 (6) - stroke 邊框](http://www.oxxostudio.tw/articles/201406/svg-06-stroke.html) )，因為圓角不會有尖角的突出，斜角則已經是切邊的狀態。  

![SVG 研究之路 (16) - Stroke-miterlimit](/img/articles/201409/20140906_1_05.gif)

藉由 illustrator 快速瞭解了之後，就來解釋一下原理，`stroke-miterlimit`這個屬性很特別的地方，它其實是「斜切長度除以線段寬度」的值 ( 如下圖 )，也因此我們在 illustrator 的屬性面板可以看到它的單位不是 pt 也不是 px，而是一個「x」。

![SVG 研究之路 (16) - Stroke-miterlimit](/img/articles/201409/20140906_1_06.png)

所以，當我們設定了這個比例的最小值，當比例越來越小，斜切的長度也越小，當小到比線段寬度交錯的更小，線段無法演算，就會發生切邊的現象。  

![SVG 研究之路 (16) - Stroke-miterlimit](/img/articles/201409/20140906_1_07.png)

我自己在繪圖的時候，有時候還滿希望有尖角的效果，就會把這個「stroke-miterlimit」值調大，在一些線段轉折處，就不會是硬梆梆的斜切，而會產生漂亮的尖角，同樣的道理，在使用 SVG 繪製折線圖的時候，適度的出現斜切或尖角，才能夠讓圖形更美觀更漂亮。

