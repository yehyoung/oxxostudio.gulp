# Low-Poly Art  

Low-Poly 這是個之前很紅的向量繪圖風格，不過其實 Low-Poly 存在已久，是由 3D 電腦繪圖發展而來，Low-Poly 是一個利用較少的多邊形，來構成一個 3D 的模型，由於減少了多邊形的數目，相對在做運算也會較為迅速，但缺點就是外觀會呈現一片一片的非擬真狀態。

下面這是幾個 3D 製作影片參考，可以看出一般的 3D 模型和 Low-Poly 之間的差異和演變。

<iframe width="560" height="315" src="https://www.youtube.com/embed/4rIEUv_Tiv4" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/zP3uh1-jimU" frameborder="0" allowfullscreen></iframe>

<br/>
然而，對於設計或多媒體領域而言，不見得每個人都會 3D 繪圖的工具和技巧，故而就衍伸出另外一種在平面上的 Low-Poly 畫法，和 3D 繪圖相同，主要也是將圖形利用三角形或四邊形的低多邊形 ( Low-Poly ) 的方式重新繪製，也可以產生類似的效果，相關的畫法也可以參考下面的這兩種方法：

第一種方法使用 Photoshop 進行繪製，利用 Photoshop 的「網格」，我們可以精準的把每個點串接在一起，利用「多邊形套鎖工具」，就可以輕鬆的選取一個三角形的範圍，接著利用「濾鏡」裏頭「模糊濾鏡」的「**平均**」，就可以把該選取區域的顏色做一個平均，而影片中又使用了另外一個特別的技巧，就是利用「動作」紀錄的方法，將 f1 設為快速鍵，如此選取完只要按下 f1，就會自動進行複製圖層和平均的動作。( 可以參考下面兩段影片 )

<iframe width="560" height="315" src="https://www.youtube.com/embed/MSAGUhzA-90" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/-s-dRtlxvNE" frameborder="0" allowfullscreen></iframe>

<br/>
另外一段影片，則是直接進 illustrator 繪製線段即可，繪製完成之後，將所有的線段集合成為一個「**即時上色**」的物件 ( 物件→即時上色→製作 )，不過製作前要先確認所有線段都是接在一起的，因為當我們將線段至作為即時上色的物件，就表示我們可以直接用「**即時上色油漆桶**」將線段封閉的區域填色，而我自己在畫的時候，就是用快速鍵互相切換來填色 ( i：滴管，k：即時上色油漆桶 )，畫完之後再把線段的寬度設為 0 就搞定囉！( 可以參考下面這段影片 )

<iframe width="560" height="315" src="https://www.youtube.com/embed/m2KaAKDMsHw" frameborder="0" allowfullscreen></iframe>

<br/>
然而網路上其實也有利用 Node.js 所寫成自動產生這種 Low-Poly 圖形的程式，只要來這個網站：[triangulate images](http://snorpey.github.io/triangulation/)，主要利用 HTML5 的 canvas 進行轉換和繪製，也有一些像是 blur、accuracy、point-rate 和 point-count 的選項可以調整，然後再 Github 也是 open source 喔~ ( [https://github.com/snorpey/triangulation](https://github.com/snorpey/triangulation) ) 

![Low-Poly Art](/img/articles/201503/20150308_2_02.jpg)

<br/>
不過很可惜的，我們可以發現利用這種自動產生的圖形，反而感覺變成了「馬賽克拼貼的效果」，為什麼會這樣呢？因為 Low-Poly 是基於 3D 而來，利用低邊形的明暗塑造出立體感，如果純粹把顏色分成區塊，而沒有掌握曲線的變化，出來的形狀反而就一點也不立體，反而像單純用幾何形狀拼貼出來的馬賽克圖案囉！

下面這三張圖，就是我用 Low-Poly 的畫法去畫的我家的三隻寵物，每隻繪製的時間大約 1.5 小時，分享給大家。( 其中的小狗，是我最愛的寵物，畫寵物也是為了紀念牠陪伴我的這十一年 )

![Low-Poly Art](/img/articles/201503/low-poly-art.jpg)

![Low-Poly Art](/img/articles/201503/20150308_2_03.jpg)

![Low-Poly Art](/img/articles/201503/20150308_2_04.jpg)

