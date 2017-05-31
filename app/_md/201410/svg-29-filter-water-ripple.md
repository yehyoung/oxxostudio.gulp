# SVG 研究之路 (29) - filter - 水波效果  

在上一篇我們深入的認識了 feDisplacementMap 這個濾鏡，也做出了水波和國旗皺褶的效果，這篇將繼續針對 feDisplacementMap 做一些補充，同時也利用 SVG 的 animte 來做出水波的動畫，畢竟水波就是要會動才逼真呀！

說是補充其實也只是上一篇少講了這個 [W3C 的範例](http://www.w3.org/Graphics/SVG/Test/20030813/htmlframe/full-filters-displace-01-f.html) ( 看下圖 )，裏頭同樣是使用黑白的棋盤圖來做移置，不過作為移置的參考漸層圖是有設計過的漸層，可以讓整體的移置剛好旋轉 20 度，而且如果是以 png 作為漸層移置參考，就不會有鋸齒狀的效果。

![SVG 研究之路 (29) - filter - 水波效果](/img/articles/201410/20141010_1_02.png)

OK 補充完了，繼續來看一下這篇的主題：水波效果，在上一篇我使用的漸層，是利用漸層本身的重複性 spreadMethod="reflect" 來做重複的漸層，但如果應用在漸層的動畫上，就會有些問題了，因為漸層的重複性很多層面取決於 r 的大小，所以無法做出由內而外不斷重複的動畫，於是換個角度思考，直接從製作的漸層顏色 stop-offset 著手，製作出許多的漸層環，搭配動畫的時間差，就可以讓漸層看起來完全連接在一起。

先看看漸層動畫：

![SVG 研究之路 (29) - filter - 水波效果](/img/articles/201410/20141010_1_03.gif)

    <svg width="340" height="231">
      <defs>
        <radialGradient id="r" cx=".5" cy=".5" r=".8">
          <stop offset="0" stop-color="#000">
            <animate attributeName="offset" to=".2" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".1" stop-color="#f00">
            <animate attributeName="offset" to=".3" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".2" stop-color="#000">
            <animate attributeName="offset" to=".4" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".3" stop-color="#f00">
            <animate attributeName="offset" to=".5" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".4" stop-color="#000">
            <animate attributeName="offset" to=".6" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".5" stop-color="#f00">
            <animate attributeName="offset" to=".7" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".6" stop-color="#000">
            <animate attributeName="offset" to=".8" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".7" stop-color="#f00">
            <animate attributeName="offset" to=".9" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".8" stop-color="#000">
            <animate attributeName="offset" to="1" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".9" stop-color="#f00">
            <animate attributeName="offset" to="1.1" dur="1s" repeatCount="indefinite"></animate>
          </stop>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="340" height="231" fill="url(#r)"></rect>
    </svg>

套用移置率鏡後的效果，這樣的 gif 動畫只有一兩秒，檔案大小高達 600KB，SVG 只有 2KB，你也可以直接打開 [SVG 預覽](/img/articles/201410/20141010_1_demo.svg)，看不到就表示你的瀏覽器不支援喔~：

![SVG 研究之路 (29) - filter - 水波效果](/img/articles/201410/svg-29-filter-water-ripple.gif)

    <svg width="340" height="231">
      <defs>
        <filter id="f" filterUnits="objectBoundingBox" x="20" y="20" width="390" height="280">
          <feImage xlink:href="#MyImage1" result="pict1"></feImage>
          <feImage xlink:href="#MyImage2" result="pict2"></feImage>
          <feDisplacementMap id="fdm" scale="50" xChannelSelector="R" yChannelSelector="R" in2="pict2" in="pict1"></feDisplacementMap>
        </filter>
        <radialGradient id="r" cx=".5" cy=".5" r=".8">
          <stop offset="0" stop-color="#000">
            <animate attributeName="offset" to=".2" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".1" stop-color="#f00">
            <animate attributeName="offset" to=".3" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".2" stop-color="#000">
            <animate attributeName="offset" to=".4" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".3" stop-color="#f00">
            <animate attributeName="offset" to=".5" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".4" stop-color="#000">
            <animate attributeName="offset" to=".6" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".5" stop-color="#f00">
            <animate attributeName="offset" to=".7" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".6" stop-color="#000">
            <animate attributeName="offset" to=".8" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".7" stop-color="#f00">
            <animate attributeName="offset" to=".9" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".8" stop-color="#000">
            <animate attributeName="offset" to="1" dur="1s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset=".9" stop-color="#f00">
            <animate attributeName="offset" to="1.1" dur="1s" repeatCount="indefinite"></animate>
          </stop>
        </radialGradient>
        <rect id="MyImage2" x="0" y="0" width="390" height="281" fill="url(#r)"></rect>
        <image id="MyImage1" x="-20" y="-140" width="450" height="400" xlink:href="http://www.oxxostudio.tw/img/articles/201410/20141010_1_demo.jpg"></image>
      </defs>
      <use filter="url(#f)" x="-50" y="-50"></use>
    </svg>

如果你需要線上編輯測試看看，可以點選 [這個網址](http://jqmdesigner.appspot.com/designer.html#&ref=4811103238356992) 來測試，這是 EZoApp 線上開發工具，右邊可以編輯，編輯之後按下上面的 preview 就可以預覽囉~ ^_^
