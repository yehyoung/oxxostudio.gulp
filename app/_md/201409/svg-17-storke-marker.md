# SVG 研究之路 (17) - Stroke-marker 

在「SVG 研究之路 (16) - Stroke-miterlimit」和「SVG 研究之路 (6) - stroke 邊框」都有介紹了 stroke 的用法，其實 stroke 還有另外一個特別的功能可以設定，就是「marker」，顧名思義，就是在線段的起點、中間點或結束點，加上我們自訂的符號，就可以讓折線圖更有特色。

> 參考 [SVG 研究之路 (16) - Stroke-miterlimit](http://www.oxxostudio.tw/articles/201409/svg-16-storke-miterlimit.html)、[SVG 研究之路 (6) - stroke 邊框](http://www.oxxostudio.tw/articles/201406/svg-06-stroke.html)

不過 marker 並不是寫在 stroke 的屬性裏頭，而是用`defs`來定義，再使用`marker-start`、`marker-mid`和`marker-end`來將其放入線段當中，原本我想使用 illustrator 來表現，不過在 illustrator 裏頭，是用`g` ( group ) 把符號和線段組合，並不是使用 marker 的方式，但我們仍然可以使用 illustrator 來繪製圖案。

例如今天要做一支愛神之箭，必須要有愛心箭頭和羽毛尾巴，利用 illustrator 繪製這兩個形狀之後存成 SVG ( 就可以看到程式碼 )，接著在`defs`裏頭加入 marker，就可以和線段串接在一起。  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_02.png)

    <svg width="300" height="400">
      <defs>
        <marker id="a1" viewBox="0 0 77 77" refX="20" refY="39" markerWidth="30" markerHeight="30" orient="auto" >
          <path fill="#f00"  d="M12.707,38.6C-8.594,27.4-1.594,0,22.406,0c30.3,0,51.7,38.5,51.7,38.5s-22.7,38.6-51.7,38.6	C-1.594,77.1-8.594,49.8,12.707,38.6z"></path>
        </marker>
        
        <marker id="a2" viewBox="0 0 80 45" refX="50" refY="22" markerWidth="40" markerHeight="30" orient="auto" >
          <polygon fill="#600" points="65.397,0 0,0 14.173,22.417 0.001,44.833 65.398,44.833 79.569,22.417 "/>
        </marker>
      </defs>
      <polyline points="50,20 150,20" fill="none" stroke="black" stroke-width="1" marker-end="url(#a1)" marker-start="url(#a2)"></polyline>
    </svg>

上述 marker ，必須由某些屬性來進行基本的調控，`id`的目的在於讓線段可以獲取這個 marker，`viewbox`是 SVG 裏頭特有的屬性，是一個檢視的區域界限，後方跟隨四個數值，分別是左上起點座標以及長寬：`viewbox="x,y,width,height"`，以 id="a1" 而言，愛心的大小約為 77x77，若`viewbox`改為於 0,0,37,77，則愛心會發生被裁切的現象 ( 如下圖 )  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_03.png)

        <marker id="a1" viewBox="0 0 37 77" refX="20" refY="39" markerWidth="30" markerHeight="30" orient="auto" >
          <path fill="#f00"  d="M12.707,38.6C-8.594,27.4-1.594,0,22.406,0c30.3,0,51.7,38.5,51.7,38.5s-22.7,38.6-51.7,38.6	C-1.594,77.1-8.594,49.8,12.707,38.6z"></path>
        </marker>

了解了`viewbox`之後，`refX`與`refY`就是**相對**於 X 軸與 y 軸的座標，例如我們設定 refX="20"，就表示我們以 20,0 作為起始點，所以整張圖就會往左邊移，設定 refY="39"，整張圖就會往上面移;至於`markerWidth`與`markerHeight`，就是 marker 的長與寬，設定的越大就越大。  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_04.png)

        <marker id="a1" viewBox="0 0 77 77" refX="20" refY="39" markerWidth="80" markerHeight="80" orient="auto" >
          <path fill="#f00"  d="M12.707,38.6C-8.594,27.4-1.594,0,22.406,0c30.3,0,51.7,38.5,51.7,38.5s-22.7,38.6-51.7,38.6	C-1.594,77.1-8.594,49.8,12.707,38.6z"></path>
        </marker>

最後一個屬性是`orient`，這個屬性很特別，是 marker 圖形跟隨線段的方向，單位是**角度**，預設值是 **auto** ，也就是線段怎麼跑，都會自動隨著線段旋轉角度，不過要注意的是，auto 的話，**一律以水平方向作為起始方向**，不是垂直！

orient="auto"  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_05.png)

orient="-45"  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_06.png)

了解了所有 marker 的屬性之後，要做出帶有圖案的折線圖就非常的方便了，下圖我將起點設定為紅色球，中間的折點設定為綠色球，終點設定為藍色球。  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_07.png)

    <svg width="300" height="400">
      <defs>
        <marker id="r" viewBox="0 0 50 50" refX="25" refY="25" markerWidth="10" markerHeight="10" orient="auto" >
          <circle fill="#f00" cx="25" cy="25" r="25"/>
        </marker>
        <marker id="g" viewBox="0 0 50 50" refX="25" refY="25" markerWidth="10" markerHeight="10" orient="auto" >
          <circle fill="#0f0" cx="25" cy="25" r="25"/>
        </marker>
        <marker id="b" viewBox="0 0 50 50" refX="25" refY="25" markerWidth="10" markerHeight="10" orient="auto" >
          <circle fill="#00f" cx="25" cy="25" r="25"/>
        </marker>
      </defs>
      <polyline points="20,100 50,100 80,20 110,80 140,30 170,100 200,100" fill="none" stroke="black" stroke-width="1" marker-end="url(#b)" marker-start="url(#r)" marker-mid="url(#g)"></polyline>
    </svg>

藉由更改 marker 的形狀，就可以做出更多的變化。  

![SVG 研究之路 (17) - Stroke-marker](/img/articles/201409/20140908_1_08.png)

    <svg width="300" height="400">
      <defs>
        <marker id="r" viewBox="-10 -10 70 70" refX="25" refY="25" markerWidth="15" markerHeight="15" orient="auto" >
          <circle fill="#fff" stroke="#000" stroke-width="10" cx="25" cy="25" r="25"/>
        </marker>
        <marker id="g" viewBox="0 0 50 50" refX="25" refY="25" markerWidth="10" markerHeight="10" orient="45" >
          <rect fill="#0a0" width="50" height="50"/>
        </marker>
        <marker id="b" viewBox="-10 -10 70 70" refX="25" refY="25" markerWidth="15" markerHeight="15" orient="auto" >
          <circle fill="#f99" stroke="#f00" stroke-width="10" cx="25" cy="25" r="25"/>
        </marker>
      </defs>
      <polyline points="20,100 50,100 80,20 110,80 140,30 170,100 200,100" fill="none" stroke="black" stroke-width="1" marker-end="url(#b)" marker-start="url(#r)" marker-mid="url(#g)"></polyline>
    </svg>

以上就是運用 marker 可以做到的許多特殊效果，對於繪製折線圖來說相當的方便好用喔！
