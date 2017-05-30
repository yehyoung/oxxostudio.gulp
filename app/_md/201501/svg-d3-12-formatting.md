# SVG D3.js - 數字格式 ( Formatting ) 

![](/img/articles/201501/svg-d3-12-formatting.jpg#preview-img)

在 [SVG D3.js - 時間格式 ( Time Formatting )](http://www.oxxostudio.tw/articles/201412/svg-d3-11-time.html) 這篇文章裡看完了時間的格式，接著就要來看看 d3.js 對於數字格式是如何處理的，因為 d3.js 主要就是針對數據去進行視覺化，所以大幅簡化了過去我們往往要寫很多判斷式來讓數字格式化的方法，只需要運用簡單的 API，就能夠輕鬆地讓數據格式化。其實講到數據的格式化，讓我想到一個強迫症藝術家 Ursus Wehrli 的一系列作品 ( [Tidying Up Art](https://www.google.com.tw/search?q=Tidying+Up+Art&es_sm=122&source=lnms&tbm=isch&sa=X&ei=iYuyVK_nLei9mgX424KgBw&ved=0CAgQ_AUoAQ&biw=1527&bih=850#imgdii=_) )，從一堆雜亂無章的數據當中把這些數據分門別類並且格式化，意境上非常的雷同呀喔哈！( 所以這篇文章的圖片就用這系列藝術作品來表現吧！ )

d3.js 格式化數字的方法，就像下面的範例這樣，先宣告一個格式化的方法，然後把數字放進去，就會得到格式化的「字串」。( 注意，得到的結果是字串 )

	var formatting = d3.format("");
	formatting(123); // '123'

<br/>
知道用法之後，就來看看 d3.js 格式化數據的用法，下面這串是 d3.js 所提供的格式，每個項目都是可以單獨填寫或混合使用，這時候看不明白不打緊，後面會繼續介紹相關用法。

>[[fill]align][sign][symbol][0][width][,][.precision][type]

<br/>
首先我們先從`type`看起，因為 d3.js 的官方文件也是最著墨在這邊，`type`有以下幾種，不同的`type`就會把數字產生成不同格式的字串顯示。

>- e：數字的指數 ( 使用 [Number.toExponential](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toExponential) )
- g：指定有幾個位數 ( 使用 [Number.toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) )
- f：指定小數點後有幾位數 ( 使用 [Number.toFixed](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toFixed) )
- d：返回這個數字的字串格式，忽略任何非整數值 ( 使用 [Number.toString](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number/toString) )
- r：四捨五入指定的小數精度位數，必要時會採用 f 的方式
- %：以 f 為基礎，返回乘以 100 後加上 %
- p：以 r 為基礎，返回乘以 100 後加上 %
- b：二進位
- o：八進位
- x：十六進位 ( 小寫英文字母 )
- X：十六進位 ( 大寫英文字母 )
- c：將整數轉換為對應的 unicode
- s：以 r 為基礎，但帶有一個單位碼 ( 例如 9.5M、或 1.00µ  )

<br/>
了解有這些 type 之後，直接用一個範例來看看數據產生出來的樣子為何。 ( 範例都要開 console 出來看喔 )

e 範例：[svg-d3-12-formatting-demo1.html](/demo/201501/svg-d3-12-formatting-demo1.html)

	var _e = d3.format("e");
	
	console.log(_e(100));  //1e+2
	console.log(_e(10));   //1e+1
	console.log(_e(1));    //1e+0
	console.log(_e(0.1));  //1e-1
	console.log(_e(0.01)); //1e-2
	console.log(_e(-10));  //-1e+1
	console.log(_e(-0.01));//-1e-2


g 範例：[svg-d3-12-formatting-demo2.html](/demo/201501/svg-d3-12-formatting-demo2.html)

	var _g1 = d3.format(".9g");
	
	console.log(_g1(10000));  //10000.0000
	console.log(_g1(10));     //10.0000000
	console.log(_g1(1));      //1.00000000
	console.log(_g1(0.01));   //0.0100000000
	console.log(_g1(0.0001)); //0.000100000000
	console.log(_g1(-10));    //-10.0000000
	console.log(_g1(-0.01));  //-0.0100000000

	var _g2 = d3.format("5g");
	
	console.log(_g2(10000));  //10000
	console.log(_g2(10));     //   10 <-- 前面有空白
	console.log(_g2(1));      //    1
	console.log(_g2(0.01));   // 0.01
	console.log(_g2(0.0001)); //0.0001
	console.log(_g2(-10));    //  -10
	console.log(_g2(-0.01));  //-0.01

f 範例：[svg-d3-12-formatting-demo3.html](/demo/201501/svg-d3-12-formatting-demo3.html)

	var _f1 = d3.format(".6f");
	
	console.log(_f1(10000));  //10000.000000
	console.log(_f1(10));     //10.000000
	console.log(_f1(1));      //1.000000
	console.log(_f1(0.01));   //0.010000
	console.log(_f1(0.0001)); //0.000100
	console.log(_f1(-10));    //-10.000000
	console.log(_f1(-0.01));  //-0.010000

	var _f2 = d3.format("6f");
	
	console.log(_f2(10000));  // 10000 <-- 前面有空白
	console.log(_f2(10));     //    10
	console.log(_f2(1));      //     1
	console.log(_f2(0.01));   //     0
	console.log(_f2(0.0001)); //     0
	console.log(_f2(-10));    //   -10
	console.log(_f2(-0.01));  //    -0 <-- -0

d 範例：[svg-d3-12-formatting-demo4.html](/demo/201501/svg-d3-12-formatting-demo4.html)

	var _d1 = d3.format("d");
	
	console.log(_d1(10000));  //10000
	console.log(_d1(10));     //10
	console.log(_d1(1));      //1
	console.log(_d1(0.01));   //
	console.log(_d1(0.0001)); //
	console.log(_d1(-10));    //-10
	console.log(_d1(-0.01));  //

	var _d2 = d3.format("6d");
	
	console.log(_d2(10000));  // 10000 <-- 前面有空白
	console.log(_d2(10));     //    10
	console.log(_d2(1));      //     1
	console.log(_d2(0.01));   //
	console.log(_d2(0.0001)); //
	console.log(_d2(-10));    //   -10
	console.log(_d2(-0.01));  //

r 範例：[svg-d3-12-formatting-demo5.html](/demo/201501/svg-d3-12-formatting-demo5.html)

	var _r1 = d3.format("5r");
	
	console.log(_r1(100));      //  100 <-- 前面有空白
	console.log(_r1(10));       //   10
	console.log(_r1(1));        //    1
	console.log(_r1(0.0123));   //0.0123
	console.log(_r1(0.012345)); //0.012345
	console.log(_r1(-10));      //  -10
	console.log(_r1(-0.123));   //-0.123

	var _r2 = d3.format(".5r");
	
	console.log(_r2(100));      //100.00
	console.log(_r2(10));       //10.000
	console.log(_r2(1));        //1.0000
	console.log(_r2(0.0123));   //0.012300
	console.log(_r2(0.012345)); //0.012345
	console.log(_r2(-10));      //-10.000
	console.log(_r2(-0.123));   //-0.12300

% 範例：[svg-d3-12-formatting-demo6.html](/demo/201501/svg-d3-12-formatting-demo6.html)

	var _pc1 = d3.format("%");
	
	console.log(_pc1(100));      //10000%
	console.log(_pc1(10));       //1000%
	console.log(_pc1(1));        //100%
	console.log(_pc1(0.0123));   //1%
	console.log(_pc1(0.012345)); //1%
	console.log(_pc1(-10));      //-1000%
	console.log(_pc1(-0.123));   //-12%
 
	var _pc2 = d3.format("3%");
	
	console.log(_pc2(100));      //10000%
	console.log(_pc2(10));       //1000%
	console.log(_pc2(1));        //100%
	console.log(_pc2(0.0123));   //1%      <-- 只剩整數部分
	console.log(_pc2(0.012345)); //1%
	console.log(_pc2(-10));      //-1000%
	console.log(_pc2(-0.123));   //-12%

	var _pc3 = d3.format(".3%");
	
	console.log(_pc3(100));      //10000.000%
	console.log(_pc3(10));       //1000.000%
	console.log(_pc3(1));        //100.000%
	console.log(_pc3(0.0123));   //1.230%
	console.log(_pc3(0.012345)); //1.234%   <-- 後面刪除了
	console.log(_pc3(-10));      //-1000.000%
	console.log(_pc3(-0.123));   //-12.300%

p 範例：[svg-d3-12-formatting-demo7.html](/demo/201501/svg-d3-12-formatting-demo7.html)

	var _p1 = d3.format("p");
	
	console.log(_p1(100));      //10000%
	console.log(_p1(10));       //1000%
	console.log(_p1(1));        //100%
	console.log(_p1(0.0123));   //1.23%
	console.log(_p1(0.012345)); //1.2345%
	console.log(_p1(-10));      //-1000%
	console.log(_p1(-0.123));   //-12.3%
 
	var _p2 = d3.format("3p");
	
	console.log(_p2(100));      //10000%
	console.log(_p2(10));       //1000%
	console.log(_p2(1));        //100%
	console.log(_p2(0.0123));   //1.23%
	console.log(_p2(0.012345)); //1.2345%
	console.log(_p2(-10));      //-1000%
	console.log(_p2(-0.123));   //-12.3%

	var _p3 = d3.format(".3p");
	
	console.log(_p3(100));      //10000.000%
	console.log(_p3(10));       //1000.000%
	console.log(_p3(1));        //100.000%
	console.log(_p3(0.0123));   //1.23% 
	console.log(_p3(0.012345)); //1.23%  <-- 四捨五入了
	console.log(_p3(-10));      //-1000.000%
	console.log(_p3(-0.123));   //-12.3%

p 範例：[svg-d3-12-formatting-demo8.html](/demo/201501/svg-d3-12-formatting-demo8.html)
	
	var _b1 = d3.format("b");
	
	console.log(_b1(100));      //1100100
	console.log(_b1(10));       //1010
	console.log(_b1(1));        //1
	console.log(_b1(0.0123));   //
	console.log(_b1(0.012345)); //
	console.log(_b1(-10));      //-1010
	console.log(_b1(-0.123));   //

o 範例：[svg-d3-12-formatting-demo9.html](/demo/201501/svg-d3-12-formatting-demo9.html)
	
	var _o1 = d3.format("o");
	
	console.log(_o1(100));      //144
	console.log(_o1(10));       //12
	console.log(_o1(1));        //1
	console.log(_o1(0.0123));   //
	console.log(_o1(0.012345)); //
	console.log(_o1(-10));      //-12
	console.log(_o1(-0.123));   //

x 範例：[svg-d3-12-formatting-demo10.html](/demo/201501/svg-d3-12-formatting-demo10.html)

	var _x1 = d3.format("x");
	
	console.log(_x1(1000));     //3e8
	console.log(_x1(10));       //a
	console.log(_x1(1));        //1
	console.log(_x1(0.0123));   //
	console.log(_x1(0.012345)); //
	console.log(_x1(-10));      //-a
	console.log(_x1(-0.123));   //

X 範例：[svg-d3-12-formatting-demo11.html](/demo/201501/svg-d3-12-formatting-demo11.html)

	var _X1 = d3.format("X");
	
	console.log(_X1(1000));     //3E8
	console.log(_X1(10));       //A
	console.log(_X1(1));        //1
	console.log(_X1(0.0123));   //
	console.log(_X1(0.012345)); //
	console.log(_X1(-10));      //-A
	console.log(_X1(-0.123));   //

c 範例：[svg-d3-12-formatting-demo12.html](/demo/201501/svg-d3-12-formatting-demo12.html)

	var _c1 = d3.format("c");
	
	console.log(_c1(13256));     //㏈
	console.log(_c1(1256));      //Ө
	console.log(_c1(13899));     //㙋

s 範例：[svg-d3-12-formatting-demo13.html](/demo/201501/svg-d3-12-formatting-demo13.html)

	var _s1 = d3.format("s");
	
	console.log(_s1(10000));   //10k
	console.log(_s1(100));     //100
	console.log(_s1(1));       //1
	console.log(_s1(0.01));    //10m
	console.log(_s1(0.0001));  //100µ
	console.log(_s1(-100));    //-100
	console.log(_s1(-0.01));   //-10m

	var _s2 = d3.format("10s");
	
	console.log(_s2(10000));   //        10k  <-- 前面有空格
	console.log(_s2(100));     //       100
	console.log(_s2(1));       //         1
	console.log(_s2(0.01));    //        10m
	console.log(_s2(0.0001));  //       100µ
	console.log(_s2(-100));    //      -100
	console.log(_s2(-0.01));   //       -10m

	var _s3 = d3.format(".5s");
	
	console.log(_s3(10000));   //10.000k
	console.log(_s3(100));     //100.00
	console.log(_s3(1));       //1.0000
	console.log(_s3(0.01));    //10.000m
	console.log(_s3(0.0001));  //100.00µ
	console.log(_s3(-100));    //-100.00
	console.log(_s3(-0.01));   //-10.000m

<br/>
以上的範例應該就可以看出`type`對於格式化數據的影響力，上述的範例除了是介紹 type，其實無形當中也介紹了一些額外的格式化方法，例如我們在格式化`type`的前面加上一個整數，就是 d3.js Formatting 裏頭的`[width]`，也就是格式化數據的寬度，換句話說就是有幾個整數的位數，這也是為什麼在上面的範例，會看到有些轉換出來的數據格式「**前面有空格**」了;至於加上小數點，就是`[.precision]`，意思是「**加上小數點之後總共會有幾位數**」，也因此套用後就會發現整數後面多了一些 0 的小數在後面。

除了加上整數和小數，當我們加上**逗號**，數據就會自動被逗號來區隔：(範例：[svg-d3-12-formatting-demo14.html](/demo/201501/vg-d3-12-formatting-demo14.html))

	var _comma = d3.format(",");
	
	console.log(_comma(1000000));   //1,000,000
	console.log(_comma(10000));     //10,000
	console.log(_comma(1));         //1
	console.log(_comma(-10000));    //-10,000

<br/>
我們也可以**用組合的方式**來組合，但組合的順序記得要按照這個規則進行：(範例：[svg-d3-12-formatting-demo15.html](/demo/201501/svg-d3-12-formatting-demo15.html))

>[[fill]align][sign][symbol][0][width][,][.precision][type]

	console.log(d3.format(",.5e")(10000));   //1.00000e+4
	console.log(d3.format(",.5g")(10000));   //10,000
	console.log(d3.format(",.5f")(10000));   //10,000.00000
	console.log(d3.format(",.5d")(10000));   //10,000
	console.log(d3.format(",.5r")(10000));   //10,000.0
	console.log(d3.format(",.5%")(10000));   //1,000,000.00000%
	console.log(d3.format(",.5p")(10000));   //1,000,000%
	console.log(d3.format(",.5b")(10000));   //10,011,100,010,000
	console.log(d3.format(",.5o")(10000));   //23,420
	console.log(d3.format(",.5x")(10000));   //2,710
	console.log(d3.format(",.5s")(10000));   //10.000k

	console.log(d3.format("10,.5e")(10000));   //1.00000e+4
	console.log(d3.format("10,.5g")(10000));   //    10,000  <-- 前面有空格
	console.log(d3.format("10,.5f")(10000));   //10,000.00000
	console.log(d3.format("10,.5d")(10000));   //    10,000
	console.log(d3.format("10,.5r")(10000));   //  10,000.0
	console.log(d3.format("10,.5%")(10000));   //1,000,000.00000%
	console.log(d3.format("10,.5p")(10000));   // 1,000,000%
	console.log(d3.format("10,.5b")(10000));   //10,011,100,010,000
	console.log(d3.format("10,.5o")(10000));   //    23,420
	console.log(d3.format("10,.5x")(10000));   //     2,710
	console.log(d3.format("10,.5s")(10000));   //    10.000k

<br/>
了解組合之後，接著看到`[0]`，意思是我們可以在**剛剛留白的地方補 0**，看看下面的範例就會清楚了：(範例：[svg-d3-12-formatting-demo16.html](/demo/201501/svg-d3-12-formatting-demo16.html))

	console.log(d3.format("08,.5e")(1000));   //1.00000e+3
	console.log(d3.format("08,.5g")(1000));   //01,000.0
	console.log(d3.format("08,.5f")(1000));   //1,000.00000
	console.log(d3.format("08,.5d")(1000));   //0,001,000
	console.log(d3.format("08,.5r")(1000));   //01,000.0
	console.log(d3.format("08,.5%")(1000));   //100,000.00000%
	console.log(d3.format("08,.5p")(1000));   //0,100,000%
	console.log(d3.format("08,.5b")(1000));   //1,111,101,000
	console.log(d3.format("08,.5o")(1000));   //0,001,750
	console.log(d3.format("08,.5x")(1000));   //0,000,3e8
	console.log(d3.format("08,.5s")(1000));   //001.0000k

<br/>
再來就是`[sign][symbol]`，這兩個沒有太大的區隔，主要就是一些標記符號例如 $ 這個錢幣符號，而正負號也是可以添加的，不過負號只有在負數的情形才會出現。(範例：[svg-d3-12-formatting-demo17.html](/demo/201501/svg-d3-12-formatting-demo17.html))

	console.log(d3.format("$08,.5e")(1000));   //$1.00000e+4
	console.log(d3.format("$08,.5g")(1000));   //$10,000
	console.log(d3.format("$08,.5f")(1000));   //$10,000.00000
	console.log(d3.format("$08,.5d")(1000));   //$10,000
	console.log(d3.format("$08,.5r")(1000));   //$10,000.0
	console.log(d3.format("+08,.5%")(1000));   //+1,000,000.00000%
	console.log(d3.format("+08,.5p")(1000));   //+1,000,000%
	console.log(d3.format("+08,.5b")(1000));   //+10,011,100,010,000
	console.log(d3.format("+08,.5o")(1000));   //+0,001,750
	console.log(d3.format("-08,.5x")(1000));   //0,000,3e8	
	console.log(d3.format("-08,.5s")(1000));   //001.0000k
	console.log(d3.format("-08,.5x")(-1000));  //-0,000,3e8
	console.log(d3.format("-08,.5s")(-1000));  //-001.0000k

<br/>
最後就是`[[fill]align]`了，這可以在空白填充字串，然後把我們原本的數字對齊，對齊的方式有三種：

>- "^" 置中
- "<" 靠左
- ">" 靠右

直接看看範例就會比較清楚了：(範例：[svg-d3-12-formatting-demo18.html](/demo/201501/svg-d3-12-formatting-demo18.html))

	console.log(d3.format("哈^8")(1));   //哈哈哈哈1哈哈哈
	console.log(d3.format("哈<8")(1));   //1哈哈哈哈哈哈哈
	console.log(d3.format("哈>8")(1));   //哈哈哈哈哈哈哈1

<br/>
以上就是 d3.js 數字格式 ( Formatting ) 的用法，相信熟練之後，在數據視覺化的圖表裡，就可以把顯示的數字做一個統一的格式處理囉！ 
