# SVG 研究之路 (1) - 初探 SVG 

![](/img/articles/201406/svg-01-intro.jpg#preview-img)

SVG（Scalable Vector Graphics）為一種可縮放向量圖形，是基於 XML ，用於描述二維向量圖形的一種圖形格式，而 SVG 也是由 W3C 所制定的開放標準，老早就成為網頁標準，只是一直以來因為瀏覽器的不支援，導致無法廣泛被利用，雖然我自己在兩年前就開始玩 SVG，不過也因為瀏覽器的緣故玩一玩就荒廢了 ( 當然連手機瀏覽器都不支援 )，近年來瀏覽器等級的大幅提升， SVG 又開始變得火熱起來，又燃起了我心中的那團火呀！

以往我們在製作網頁的圖片都會使用 jpg、png 或 gif 格式，無形中往往增加了不少下載的負擔，在 CSS 技術進步之後，取而代之的就出現許多 sprites 的技術，我自己也是這門技術的愛用者，雖然對於單純的網頁瀏覽已經很足夠，不過若是要進階控制圖形的細節，卻往往會需要額外畫上不少圖形 ( 例如一張圖，滑鼠移上去某個區域會變色，就必須要畫兩張圖，變色前和變色後 )，這時候就立馬看出 SVG 的優勢了！

這是一張普通的 png 圖檔，滑鼠移上去沒有任何反應，我如果要讓他有變化，我必須要再重畫一張，再利用`hover`的方式來變換背景或圖片之類，此外，這張圖檔基本上就只能這麼大，如果要放大就會產生鋸齒或模糊，縮小的時候在不同的瀏覽器演算法下，也會產生鋸齒或模糊。

![SVG](/img/articles/201406/20140608_1_03.png)

這是一張 SVG 的向量圖，大家可以把滑鼠移到上面去，就會發現移到不同的區域就會變化不同的顏色，而這僅僅只是利用一張 SVG 和一些 CSS 就可以達成，而且不管如何縮放，這張圖都不會模糊也不會有鋸齒，實在是相當的方便。

<svg style="height:300px;">
<path id="SVG-base" d="M8.5,150h283v100c0,23.5-18,41.5-41.5,41.5H50c-23.5,0-41.5-18-41.5-41.5V150z" />
<path fill="#FFB13B" stroke="#000000" stroke-width="38.0086" d="M265.852,134.149c-8.755-8.755-22.948-8.755-31.703,0h-45.88
l32.442-32.442c12.381,0,22.417-10.037,22.417-22.417c0-12.381-10.036-22.417-22.417-22.417s-22.418,10.037-22.418,22.417
l-32.441,32.441v-45.88c8.754-8.754,8.754-22.948,0-31.702c-8.755-8.754-22.948-8.754-31.703,0s-8.754,22.948,0,31.702v45.88
L101.707,79.29c0-12.381-10.037-22.417-22.417-22.417c-12.381,0-22.417,10.037-22.417,22.417c0,12.38,10.037,22.417,22.417,22.417
l32.442,32.442h-45.88c-8.754-8.755-22.948-8.755-31.702,0c-8.754,8.754-8.754,22.948,0,31.703c8.754,8.754,22.948,8.754,31.702,0
h45.88L79.29,198.293c-12.381,0-22.417,10.037-22.417,22.418s10.037,22.417,22.417,22.417c12.38,0,22.417-10.036,22.417-22.417
l32.442-32.442v45.88c-8.754,8.755-8.754,22.948,0,31.703c8.754,8.754,22.948,8.754,31.703,0c8.754-8.755,8.754-22.948,0-31.703
V188.27l32.441,32.441c0,12.381,10.037,22.417,22.418,22.417s22.417-10.036,22.417-22.417s-10.036-22.418-22.417-22.418
l-32.441-32.441h45.879c8.755,8.754,22.948,8.754,31.703,0C274.605,157.097,274.605,142.903,265.852,134.149z" />
<path id="SVG-bar" fill="#FFB13B" d="M265.852,134.149c-8.755-8.755-22.948-8.755-31.703,0h-45.88l32.442-32.442
c12.381,0,22.417-10.037,22.417-22.417c0-12.381-10.036-22.417-22.417-22.417s-22.418,10.037-22.418,22.417l-32.441,32.441v-45.88
c8.754-8.754,8.754-22.948,0-31.702c-8.755-8.754-22.948-8.754-31.703,0s-8.754,22.948,0,31.702v45.88L101.707,79.29
c0-12.381-10.037-22.417-22.417-22.417c-12.381,0-22.417,10.037-22.417,22.417c0,12.38,10.037,22.417,22.417,22.417l32.442,32.442
h-45.88c-8.754-8.755-22.948-8.755-31.702,0c-8.754,8.754-8.754,22.948,0,31.703c8.754,8.754,22.948,8.754,31.702,0h45.88
L79.29,198.293c-12.381,0-22.417,10.037-22.417,22.418s10.037,22.417,22.417,22.417c12.38,0,22.417-10.036,22.417-22.417
l32.442-32.442v45.88c-8.754,8.755-8.754,22.948,0,31.703c8.754,8.754,22.948,8.754,31.703,0c8.754-8.755,8.754-22.948,0-31.703
V188.27l32.441,32.441c0,12.381,10.037,22.417,22.418,22.417s22.417-10.036,22.417-22.417s-10.036-22.418-22.417-22.418
l-32.441-32.441h45.879c8.755,8.754,22.948,8.754,31.703,0C274.605,157.097,274.605,142.903,265.852,134.149z" />
<path id="SVG-base_1_" d="M8.5,150h283v100c0,23.5-18,41.5-41.5,41.5H50c-23.5,0-41.5-18-41.5-41.5V150z" />
<path id="SVG-S" fill="#FFFFFF" d="M50.964,220.639c-6.638-6.637-10.746-15.801-10.746-25.923c0-20.252,16.426-36.668,36.668-36.668
c20.252,0,36.678,16.416,36.678,36.668h-21.48c0-8.388-6.808-15.187-15.198-15.187c-8.388,0-15.186,6.799-15.186,15.187
c0,4.19,1.702,7.986,4.44,10.726h0.01c2.75,2.761,5.04,3.559,10.736,4.463l0,0c10.132,1.054,19.296,4.107,25.932,10.744l0,0
c6.638,6.638,10.746,15.802,10.746,25.924c0,20.252-16.426,36.678-36.678,36.678c-20.242,0-36.668-16.426-36.668-36.678H61.7
c0,8.388,6.798,15.195,15.186,15.195c8.39,0,15.198-6.808,15.198-15.195c0-4.19-1.702-7.977-4.442-10.727h-0.01
c-2.75-2.75-6.696-3.697-10.746-4.451v-0.01C67.066,229.878,57.6,227.275,50.964,220.639L50.964,220.639L50.964,220.639z" />
<path id="SVG-V" fill="#FFFFFF" d="M186.904,158.048l-25.94,125.202h-21.48l-25.92-125.202h21.48l15.2,73.326l15.18-73.326H186.904z" />
<path id="SVG-G" fill="#FFFFFF" d="M223.584,209.904h36.668v36.668h0.01c0,20.254-16.426,36.68-36.678,36.68
c-20.254,0-36.668-16.426-36.668-36.68l0,0v-51.854h-0.01c0-20.253,16.424-36.669,36.678-36.669
c20.242,0,36.668,16.416,36.668,36.669H238.77c0-8.381-6.808-15.189-15.186-15.189c-8.391,0-15.188,6.809-15.188,15.189v51.854l0,0
c0,8.39,6.797,15.188,15.188,15.188c8.378,0,15.176-6.798,15.186-15.178v-0.01v-15.176h-15.186V209.904L223.584,209.904z" />
</svg>

<style>
	#SVG-S,#SVG-V,#SVG-G,#SVG-bar{
		cursor:pointer;
		transition:.3s;
	}
	#SVG-bar:hover{
		fill:#0ff;
	}
	#SVG-S:hover{
		fill:#f00;
	}
	#SVG-V:hover{
		fill:#0f0;
	}
	#SVG-G:hover{
		fill:#00f;
	}
</style>

雖然 SVG 是如此的便利，但還是要補充說明一點，根據我十多年來設計的背景和經驗，**「向量」與「點陣」這兩種圖形，各有各自的好處**，如果你要使用向量圖來表現細節非常繁雜的圖片，整張向量圖的大小有可能會遠大於點陣圖，處理和運算的速度也會非常慢 ( 可以想像幾千個數學式同時進行，跟我只要單純呈現表現幾千個點，速度就差多了 )，況且有時候你就是希望有點陣的風格，這就是向量圖做不到的地方，但向量圖所具備的優勢也是點陣圖所無法達成，可以縮放自如的圖片，可以由程式控制的細節...等。

因此，**如何在點陣和向量之間取得一個完美的平衡，就大大考驗著設計師的功力！**最後，對於設計師來說，也不用擔心不會寫 SVG 怎麼辦，你只要打開 Illustrator ，就可以把向量圖轉換成 SVG，再進去改程式碼就可以囉！ ( 如果你不會用 Illustrator，那我想你應該就不配稱作設計師了ㄎㄎ ) 由下面這張圖可以看出，我們把上面那張 SVG 用 Illustrator 打開，就可以看出各個群組與向量是如何繪製，對於設計師來說，這就是我們的強項了，對吧！


![SVG](/img/articles/201406/20140608_1_02.png)

以下提供一些 SVG 的基本網站，大家有興趣可以自己點進去看看。

- [SVG WIKI](http://zh.wikipedia.org/wiki/%E5%8F%AF%E7%B8%AE%E6%94%BE%E5%90%91%E9%87%8F%E5%9C%96%E5%BD%A2)
- [SVG 教程](http://www.w3school.com.cn/svg/index.asp)
- [SVG MDN](https://developer.mozilla.org/zh-TW/docs/Web/SVG/Tutorial/Introduction)
