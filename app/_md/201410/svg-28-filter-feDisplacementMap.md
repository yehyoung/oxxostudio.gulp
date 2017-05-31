# SVG 研究之路 (28) - filter - feDisplacementMap  

![](/img/articles/201410/svg-28-filter-feDisplacementMap.jpg#preview-img)

在玩 photoshop 的時候，我時常會使用一個名為「移置」的特效，這個特效說難不難，我在 2008 年使用 photoshop 做過國旗飄揚皺折的特效，在 Photoshop 裏頭這個特效的基本原理，就在於利用 Alpha 色版的深度，讓圖片的像素產生不同的位移情形，在許多的 AfterEffect 特效或 3D 效果裏頭，也都會使用類似的作法，來讓貼圖更吻合表面。

> 參考：[photoshop：國旗飄揚皺折](http://oxxo-studio-past.blogspot.tw/2008/01/photoshop_5142.html)

同樣的，SVG 裡也有提供這種功能，就叫做 feDisplacementMap，也因為有了這個濾鏡，我們更可以做出許多有趣的變化，現在就讓我們來繼續看下去~

feDisplacementMap 的屬性：

- **scale**
- **xChannelSelector**
- **yChannelSelector**
- **in**
- **in2**
 
在解釋這些屬性之前，可以先看到 SVG 裡頭關於每個像素移置的公式：「`P'(x,y) <- P( x + scale * (XC(x,y) - .5), y + scale * (YC(x,y) - .5))`」，看起來很難，翻成中文就是：P’(x,y) 是移置過的該像素坐標，公式就是原本的坐標 ( x,y ) 加上振幅比例 ( scale ) 與 xChannelSelector 或 yChannelSelector 的乘積。

好像很難理解？沒關係，我再講的直白一點，簡單來說就是我們提供一張以 R 或 G  或 B 或 A 為主的圖片，目的在作為另外一張圖片的移置參考，會怎麼移置取決了我們提供的圖片內容顏色以及被移置的圖片內容顏色，如果今天以 R ( 紅色 ) 通道為例，越紅移置的比例越高，但如果圖片裡面沒有紅色，則 R 作為移置的效用就不明顯或與其他顏色通道不同。

然而和 Photoshop 最大的不同，SVG 裡頭可以選擇四種通道顏色，也就是 RGBA，換句話說，我們在 HTML 的色彩，寫成 red 或 #f00 其實只描述了 RGB，如果寫成 rgba(255,0,0,1) 就會更容易理解，如果對於這些寫法不容易轉換的話，也可以開啟 photoshop 或繪圖軟體的調色盤，通常都可以看到色彩的數值。( 不明白 rgba 的請參考這篇文章 [http://zh.wikipedia.org/wiki/RGBA](http://zh.wikipedia.org/wiki/RGBA)，這裡就不介紹了 )

上面其實就是在介紹 scale、xChannelSelector 和 yChannelSelector 這三個屬性，至於剩下的 in 和 in2 屬性，**in 代表要被套用的圖片 ( 要變形的 )，in2 則是要套用的圖片 ( RGBA 通道使用 )，而要套用的 feImage，則必須要寫上 result，就可以被套用**。

講到這裡非常多的解釋，不如直接來幾張示意圖才比較好理解，下面我先拿一張黑白棋盤圖作為要變形的圖片 ( 通常變形都會拿這種圖來解釋，因為最明顯也最清楚 )，我們先看看套用紅黑漸層移置的效果：

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_02.png)

    <svg width="250" height="150">
      <defs>
        <filter id="f" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
          <feImage result="pict1" xlink:href="#m1" x="0" y="0" width="1" height="1"></feImage>
          <feImage result="pict2" xlink:href="#m2" x="0" y="0"  width="1" height="1"></feImage>
          <feDisplacementMap id="fdm" scale=".5" xChannelSelector="R" yChannelSelector="R" in2="pict2" in="pict1"></feDisplacementMap>
        </filter>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f00"></stop>
          <stop offset="1" stop-color="#000"></stop>
        </linearGradient>
        <rect id="m2" x="0" y="0" width="100" height="100" fill="url(#g)"></rect>
        <image id="m1" x="0" y="0" width="100" height="100" xlink:href="http://www.oxxostudio.tw/img/articles/201410/20141009_1_demo.jpg"></image>
      </defs>
      <rect x="0" y="0" width="100" height="100" filter="url(#f)" stroke="#000" transform="translate(110)"></rect>
      <rect x="0" y="0" width="100" height="100" fill="url(#g)"></rect>
      <rect x="110" y="0" width="100" height="100" fill="none" stroke="#000"></rect>
    </svg>

再來看看紅綠漸層移置的效果：

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_03.png)

        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f00"></stop>
          <stop offset="1" stop-color="#0f0"></stop>
        </linearGradient>

為什麼上面的效果是一樣的呢？原因就是剛剛說的，我們採用紅色通道作為移置的參考，所以紅黑漸層或紅綠漸層，紅色通道的值是固定的，所以出來的效果才會一模一樣，不過這時候如果像下面的範例把通道改為 A，就會發現整張圖往左上角飄移！為什麼呢？

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_04.png)

	<feDisplacementMap id="fdm" scale=".5" xChannelSelector="A" yChannelSelector="A" in2="pict2" in="pict1"></feDisplacementMap>

因為這個漸層的 A 都是 1 ( 沒有不透明的部分 )，加上我們要用作移置的圖片 Aplha 色板也都是 1，所以在換算之後就整張圖移置了 ( 應該說所有的像素都移置了 )，如果這時候改成 B，就會發現往右下角飄移，因為漸層裏頭 B 的數值是 0 而套用的圖片 B 有數值 ( 白色的區域 B=255 )

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_05.png)

	<feDisplacementMap id="fdm" scale=".5" xChannelSelector="B" yChannelSelector="B" in2="pict2" in="pict1"></feDisplacementMap>


因此如果真的要精準控制 A，則必須要把漸層顏色加入透明度，你可以使用 stop-opacity 來加入，或是使用 rgba 來加入也可以，下面的範例使用 rgba，當有了透明度，設 A 通道的模式就有作用囉。 ( 不過你會發現出來的結果和經過 A 通道不同，因為被套用的圖片裡，所有像素的 A 都是 1，而對於 R 來說，白色區域的 R=255 )

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_06.png)

        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(255,0,0,0)"></stop>
          <stop offset="1" stop-color="rgba(0,255,0,1)"></stop>
        </linearGradient>

除了自己畫漸層，也可以直接用別當圖來當作移置的參考：

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_07.png)

        <image id="m1" x="0" y="0" width="100" height="100" xlink:href="http://www.oxxostudio.tw/img/articles/201410/20141009_1_demo.jpg"></image>
        <image id="m3" x="0" y="0" width="100" height="100" xlink:href="http://www.oxxostudio.tw/img/articles/201410/20141009_1_demo2.jpg"></image>

了解原理之後，我們做一個放射漸層看看效果，那就再來一個多層的放射漸層，整個就變成水波了！( 不過由於範例的 primitiveUnits 設定為 objectBoundingBox，所以很多是比例的換算，比較麻煩且複雜 )

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_08.png)

    <svg width="340" height="231">
      <defs>
        <filter id="f" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" x="0" y="0" width="1.1" height="1.1">
          <feImage result="pict1" xlink:href="#m1" x="0" y="0" width="1.1" height="1.1"></feImage>
          <feImage result="pict2" xlink:href="#m2" x="0" y="0" width="1.1" height="1.1"></feImage>
          <feDisplacementMap id="fdm" scale=".1" xChannelSelector="R" yChannelSelector="R" in2="pict2" in="pict1"></feDisplacementMap>
        </filter>
        <radialGradient id="g" cx=".6" cy=".6" r=".05" spreadMethod="reflect">
          <stop offset="0" stop-color="#000"></stop>
          <stop offset="1" stop-color="#fff"></stop>
        </radialGradient>
        <rect id="m2" x="-10" y="0" width="410" height="300" fill="url(#g)"></rect>
        <image id="m1" x="0" y="0" width="400" height="300" xlink:href="http://www.oxxostudio.tw/img/articles/201410/20141009_1_demo3.JPG"></image>
      </defs>
      <rect x="0" y="0" width="400" height="300" filter="url(#f)" transform="translate(-60 -60)"></rect>
    </svg>

同樣的效果也可以應用在國旗上噢！

![SVG 研究之路 (28) - filter - feDisplacementMap](/img/articles/201410/20141009_1_09.png)

    <svg width="340" height="231">
      <defs>
        <filter id="f" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" x="0" y="0" width="1.1" height="1.1">
          <feImage result="pict1" xlink:href="#m1" x="0" y="0" width="1.1" height="1.1"></feImage>
          <feImage result="pict2" xlink:href="#m2" x="0" y="0" width="1.1" height="1.1"></feImage>
          <feDisplacementMap id="fdm" scale=".05" xChannelSelector="A" yChannelSelector="A" in2="pict2" in="pict1"></feDisplacementMap>
        </filter>
        <linearGradient id="g" x1="0" y1="0" x2=".2" y2=".02" spreadMethod="reflect">
          <stop offset="0" stop-color="rgba(0,0,0,.8)"></stop>
          <stop offset=".2" stop-color="rgba(0,0,0,.7)"></stop>
          <stop offset=".6" stop-color="rgba(0,0,0,.1)"></stop>
          <stop offset="1" stop-color="rgba(0,0,0,0)"></stop>
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2=".2" y2=".02" spreadMethod="reflect">
          <stop offset="0" stop-color="rgba(0,0,0,.8)"></stop>
          <stop offset=".2" stop-color="rgba(0,0,0,.7)"></stop>
          <stop offset=".6" stop-color="rgba(0,0,0,.1)"></stop>
          <stop offset="1" stop-color="rgba(0,0,0,0)"></stop>
        </linearGradient>
        <rect id="m2" x="-10" y="0" width="410" height="300" fill="url(#g)"></rect>
        <image id="m1" x="0" y="0" width="400" height="300" xlink:href="http://www.oxxostudio.tw/img/articles/201410/20141009_1_demo4.jpg"></image>
      </defs>
      <rect x="0" y="0" width="400" height="300" filter="url(#f)" transform="translate(-50 -30)"></rect>
      <rect x="0" y="0" width="400" height="300" fill="url(#g2)" transform="translate(-50 -30)"></rect>
    </svg>


以上就是非常有趣的 feDisplacementMap 濾鏡，趕緊用幾張圖來玩玩看吧！^_^

