# Photoshop SandStorm 沙塵暴效果  

SandStorm 是我偶然發現的一個 Photoshop 效果，它其實不是 Photoshop 內建的功能，而是有人做出來的一系列行為 ( Action )，也就是一連串的動作所組成，最後產生有如會畫一般的粒子效果，也就像 SandStorm 的名稱一樣，沙塵暴。

要使用 SandStorm 首先當然要去下載這個 Action，副檔名是 .atn，至於哪裡可以下載我想大家都會 Google 才是，因為這個 SandStorm 是要錢的，請參考：[http://graphicriver.net/item/sandstorm-photoshop-action/10012562](http://graphicriver.net/item/sandstorm-photoshop-action/10012562)，如果真的有需要，你知道的，ㄎㄎ。

![SandStorm](/img/articles/201509/20150907_1_02.jpg)

下載之後，先把手邊的 Photoshop 變更為英文版，變更的方法很簡單，進入 Locales 資料夾，再進入 zh_TW 資料夾，再進入 Support Files 的資料夾，把 tw10428.dat 的檔名改掉，Photoshop 抓不到中文語系，就會自動變成英文語系，至於為什麼要變更為英文語系呢？因為這個 Action 的作者是外國人，當中用到許多複製圖層以及重新命名圖層的動作，所以必須要是英文語系才可行。

![SandStorm](/img/articles/201509/20150907_1_03.jpg)

完成之後，打開 Photoshop ( 應該就會是英文版 )，打開 Actions 面板，Load 我們要的動作。

![SandStorm](/img/articles/201509/20150907_1_04.jpg)

載入之後就會發現我們的動作面板多了一個名為 SandStorm 的動作組合，當中有上、下、左、右以及中間五種動作，這表示沙塵暴會往哪個方向飄散。

![SandStorm](/img/articles/201509/20150907_1_05.jpg)

有了動作之後，就要拿張圖片來實測，這裏盡量挑選長寬大於 1024 的圖片比較不會發生錯誤 ( 自己實作發現較小的圖片容易出問題 )，這裏我選了一張[美國隊長的圖片](/img/articles/201509/20150907_1_06.jpg)來改，首先我們把圖片當作背景，圖層名稱為「background」，然後在這個圖層上方新增一個圖層，名為「brush」。

![SandStorm](/img/articles/201509/20150907_1_07.jpg)

完成之後用筆刷在上面想要的區域塗抹 ( 顏色不重要，挑選可以在這張圖上看出來筆畫的顏色即可 )，基本上個人建議塗抹在邊緣，當 SandStorm 沙塵暴動作進行時，才不會有過多的例子效果影響到主體畫面。

![SandStorm](/img/articles/201509/20150907_1_08.jpg)

再來就是挑選想要的行為，這裏我選擇「UP」，點選執行，就會開始進行動作。

![SandStorm](/img/articles/201509/20150907_1_09.jpg)

動作完成之後就會看非常炫麗的沙塵暴效果，完成之後的圖形，跟原圖感覺真是不太相同呀！

![SandStorm](/img/articles/201509/20150907_1_10.jpg)

看完了這個精彩的效果，如果稍微研究一下他到底是怎麼辦到的，這時候我們就必須借重 Photoshop 的歷史紀錄，基本上我是把歷史紀錄開到 700 層才有辦法完全看到過程，有興趣的也可以試試看，基本上他就是利用筆刷的圖層，產生那些飄散的粒子，當中用到了許多像素化的濾鏡以及水波、風動...等濾鏡，同時他也會不斷地複製圖層並且更名圖層，也因為如此才會造成步驟紀錄有一大堆，總而言之，如果是自己要進行這些動作也不是不可以，不過會非常累就是了，還是多多善用 Actions 的功能吧！

以下是我又另外做的幾張圖，效果還真是滿不賴的，分享給大家！

![SandStorm](/img/articles/201509/20150907_1_11.jpg)

![SandStorm](/img/articles/201509/20150907_1_12.jpg)


