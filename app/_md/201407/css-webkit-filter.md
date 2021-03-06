# CSS webkit filter 

![](/img/articles/201407/css-webkit-filter.jpg#preview-img)

由於我自己是多媒體專長的背景，「filter」 ( 濾鏡 ) 這個詞基本上是陪伴我成長的一個重要技術 ( 或工具 )，不管是在影像處理還是向量繪圖，甚至是影片剪輯、聲音處理都會需要使用到濾鏡，但很可惜的在網站設計裡，卻沒有如同 photoshop 一般的濾鏡可以輕鬆使用，一張圖如果需要一些特效 ( 例如模糊、黑白、高對比...等 )，往往必須直接再重製一張圖來使用，雖然對我自己來說重做一張圖應該不用花到一分鐘，但對於許多不會影像處理的人而言，簡直就是另外一門學問了。

某一天我發現了 webkit filter 這個超級好用的技術，雖然很可惜的一直到寫這篇文章的今天它都還只支援 webkit 核心的 chrome 或 safari 瀏覽器，但我自己倒是很期待 webkit filter 的未來，雖然我這篇文章其實在 2012 年我已經寫過一次啦！( 舊的 blog )

下面的預覽圖都是直接使用 webkit filter 做出來的，如果看到的圖都長一樣，就表示你的瀏覽器不支援，請更換成 chrome 或 safari 吧！

<p style="text-align:center;">
-webkit-filter: blur(3px)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: blur(3px);" />
</p>
<p style="text-align:center;">
-webkit-filter: grayscale(0.9)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: grayscale(0.9);" />
</p>
<p style="text-align:center;">
-webkit-filter: drop-shadow(5px 5px 10px #000)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: drop-shadow(5px 5px 10px #000);" />
</p>
<p style="text-align:center;">
-webkit-filter: sepia(0.7)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: sepia(0.7);" />
<br/>
</p>
<p style="text-align:center;">-webkit-filter: brightness(0.5)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: brightness(0.5);" />

</p>
<p style="text-align:center;">-webkit-filter: brightness(-0.5)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: brightness(-0.5);" />

</p>
<p style="text-align:center;">-webkit-filter: contrast(3)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: contrast(3);" />

</p>
<p style="text-align:center;">-webkit-filter: contrast(0.3)

<Br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: contrast(0.3);" />

</p>
<p style="text-align:center;">-webkit-filter: hue-rotate(90deg)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: hue-rotate(90deg);" />

</p>
<p style="text-align:center;">-webkit-filter: invert(1)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: invert(1);" />

</p>
<p style="text-align:center;">-webkit-filter: saturate(5)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: saturate(5);" />

</p>
<p style="text-align:center;">-webkit-filter: opacity(0.5)

<br/>
<img src="/img/articles/201407/20140726_2_02.png" style="-webkit-filter: opacity(0.5);" />

</p>
