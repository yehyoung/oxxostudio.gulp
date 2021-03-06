# SVG 研究之路 (5) - Path 進階篇 

![](/img/articles/201406/svg-05-path-2.jpg#preview-img)

上一篇看完了 Path 大部分的指令，這一篇就要介紹最困難的 A 指令，什麼是 A 呢？就是「弧形」 ( Arcs )，更簡單來說就是畫個橢圓圓弧 ( Elliptical Arc )，這裡可能會有人有疑問，為什麼是橢圓圓弧，而不是圓形圓弧呢？因為橢圓形可以做成圓形呀就是這麼簡單ㄎㄎ，因此， A 指令裏頭參數非常之多，竟然高達 7 個參數，以下就一一為大家解釋這些參數。

- rx ： 橢圓的 x 軸半徑 ( 根據不同的終點換算成比例 )
- ry ： 橢圓的 y 軸半徑 ( 根據不同的終點換算成比例 )
- x-axis-rotation ： 弧線與 x 軸的夾角
- large-arc-flag ： 1 為大角度弧線，0 為小角度弧線 ( 必須有三個點 )
- sweep-flag ： 1 為順時針方向，0 為逆時針方向
- x ： 終點 x 座標
- y ： 終點 y 座標

首先來看一個利用 A 指令畫出來的弧形：扁長型，x,y 軸半徑比例為 5:1，小角度弧線，**逆時針**方向  

![SVG-Path](/img/articles/201406/20140612_1_02.png)  

	<path d="M0 0 A100 20,0 0 0 50 100" stroke="#000" fill="none"/>

<br/>

扁長型，x,y 軸半徑比例為 5:1，小角度弧線，**順時針**方向  

![SVG-Path](/img/articles/201406/20140612_1_03.png)  

	<path d="M0 0 A100 20,0 0 1 50 100" stroke="#000" fill="none"/>

<br/>

扁長型，x,y 軸半徑比例為 5:1，**大角度**弧線，順時針方向 ( 因為只有兩個點，所以大小角度結果相同，返回原來的點了 ) 

![SVG-Path](/img/articles/201406/20140612_1_03.png) 

	<path d="M0 0 A100 20,0 1 1 50 100" stroke="#000" fill="none"/>

<br/>

看到上圖可能很多人會混淆，為什麼大小角度是相同的結果，只因為 Path 裏頭我們只提供了兩個點，兩個點只有一條線，不會有角度的問題，因此為了實際測試，我們多增加一個點，就可以看出大小角度的差異。  

![SVG-Path](/img/articles/201406/20140612_1_04.png) 

	大角度 ( 黑色線 )
	<path d="M0 0 L50 50 A50 50,0 1 0 100 0" stroke="#000" fill="none"/>
	小角度 ( 紅色線 )
	<path d="M0 0 L50 50 A50 50,0 0 0 100 0" stroke="#f00" fill="none"/>

<br/>

不過這裡要注意，如果弧形的 x,y 軸的長度相加，小於弧線兩點之間的距離，那麼就會一律以大角度弧線顯示，以上面的公式來說，弧線兩點之間的長度為：50的平方加50的平方然後開根號，大約是 70.7 左右，因此如果小於弧線的兩個軸的長度相加小於 70.71 ，就會一律用大角度弧線表示

小於 70.71 ( 加起來 60，兩條弧線重疊 )  

![SVG-Path](/img/articles/201406/20140612_1_05.png) 

	大角度 ( 黑色線 )
	<path d="M0 0 L50 50 A50 10,0 1 0 100 0" stroke="#000" fill="none"/>

	小角度 ( 紅色線 )
	<path d="M0 0 L50 50 A50 10,0 0 0 100 0" stroke="#f00" fill="none"/>

大於 70.71 ( 加起來 80，兩條弧線分開 )  

![SVG-Path](/img/articles/201406/20140612_1_06.png) 

	大角度 ( 黑色線 )
	<path d="M0 0 L50 50 A50 30,0 1 0 100 0" stroke="#000" fill="none"/>

	小角度 ( 紅色線 )
	<path d="M0 0 L50 50 A50 30,0 0 0 100 0" stroke="#f00" fill="none"/>

為什麼會這樣呢？主要因為小角度的弧線，是指三角形的三個內角合小於 180 度，但不代表弧線和直線的合可以變成負值，因為如果變成負值，計算起來也會變成大角度的弧線，這也是要非常注意的地方！下面這張圖是很好的說明範例：  

![SVG-Path](/img/articles/201406/20140612_1_07.png) 

<br/>

關於 A 的指令，最難的就是上述的大角度小角度弧線，而最後一個參數，就是指弧線跟的 x 軸和畫面 x 軸的夾角，我們看以下的範例：  

![SVG-Path](/img/articles/201406/20140612_1_08.png) 

	夾角 0 度 ( 黑色線 )
	<path d="M0 0 A50 100,0 0 0 100 0" stroke="#000" fill="none"/>

	夾角 30 度 ( 紅色線 )
	<path d="M0 0 A50 100,30 0 0 100 0" stroke="#f00" fill="none"/>

	夾角 60 度 ( 橘色線 )
	<path d="M0 0 A50 100,60 0 0 100 0" stroke="#f90" fill="none"/>

<br/>

以上就是 Path 裏頭最讓人混亂的 A 指令啦！
