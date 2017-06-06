# JavaScript 同步延遲 ( Promise + setTimeout )

![](/img/articles/201706/javascript-promise-settimeout.jpg#preview-img)

過去在寫 JavaScript 使用的同步延遲，都是用非同步的 setTimeout 加上 callback 來實現，但如果有很多個任務或流程要執行，就得用上一大堆的 callback，然而 JavaScript 裡的 Promise ，剛好就可以用來解決同步與非同步的問題，讓整個延遲的過程可以很漂亮且同步的「串」在一起。

## 同步非同步

一般來說 JavaScript 裡面有分成同步 sync 和非同步 async，在同步模式下，每個任務必須按照順序執行，後面的任務必須等待前面的任務執行完成，非同步模式則相反，後面的任務不用等前面的，各自執行各自的任務，例如`setTimeout`、`setInterval`都是這種模式。

> 延伸閱讀：[非同步(Asynchronous)與同步(Synchronous)的差異](https://goo.gl/l8mN6W)

![](/img/articles/201706/javascript-promise-settimeout-1.jpg)

如果 JavaScript 撰寫成下面這樣，結果並不會如果們預期的「等待一秒後出現 A，出現 A 後等待一秒再出現 B」，反而是等待一秒後 A、B 同時出現，所以變成傳統在實作的時候，就要寫很多的 callback 來滿足同步的情況。

	setTimeout(function(){
		console.log('A');
	},1000);

	setTimeout(function(){
		console.log('B');
	},1000);

## Promise

為了解決同步非同步的問題，我開始學習 Promise，剛接觸 Promise 的時候實在是有點頭昏腦脹，因為網路上的資料很多，但總找不到一個合適的範例展示，導致一直沒辦法深入理解，後來找到了下面這兩篇相當完整且豐富的教學，也讓我終於踏入了 Promise 的世界，由於這兩篇文章已經相當完整，就不在這邊做描述，有興趣的可以點進去看看。

> - [從 Promise 開始的 JavaScript 異步生活](https://eyesofkids.gitbooks.io/javascript-start-es6-promise/content/)
- [JavaScript Promise 迷你書（ 中文版 )](http://liubin.org/promises-book/#how-to-write-promise)

簡單來說，Promise 就是「承諾」，可以想像成 A 承諾 B 要去辦事，辦完之後才會回報結果，而這個結果只有兩種狀況：成功與失敗，不會有處於成功失敗不明的中間狀況。

所以換成程式的講法，要使用 Promise，一開始要*先 new 一個 Promise 物件，物件中的建構式包含兩個參數：resolve ( 成功 ) 與 reject ( 失敗 )*。

基本創建 Promise 的方法如下，resolve 在函式或流程成功，或有合法值的狀況下會執行，reject 則是在失敗或有錯誤的時候會執行，resolve 和 reject 都有一個回傳值，可將這個會傳值透過`.then`傳給下一個流程。

	function asyncFunction(value) {
	  return new Promise(function(resolve, reject){
	    if(value){
	      resolve(value) // 已實現，成功
	    }else{
	      reject(reason) // 有錯誤，已拒絕，失敗
	    }
	  });
	}

## 同步延遲

大概知道用法之後，先來個簡單的例子，建立一個 delay 的流程，流程裡有個`setTimeout`，在延遲一秒後，將 resolve 成功的值透過`.then`傳下去。

	function delay() {   
	  return new Promise(function (resolve, reject) {
	    setTimeout(function () {
	      resolve('我是傳下去的值');
	    }, 1000);
	  });
	}

	delay().then(function (value) {
	  console.log(value);    // '我是傳下去的值'
	}).catch(function (error) {
	  console.log(error);
	});

不過這樣只有寫，跟純粹`setTimeout`的結果看起來沒什麼差異，因為只延遲了一次而已，現在換個例子，讓顯示的文字延遲三次，每次都延遲一秒，如果是傳統`setTimeout`的寫法就會像下面這樣：三個流程 + 兩個 callback，不僅越來越難閱讀，維護成本相對也越來越高。

	setTimeout(function(){
	  console.log(1);  // 顯示 1
	  a(2);            // 呼叫 a 顯示 2
	});

	function a(v){
	  setTimeout(function(){
	    console.log(v);  // 延遲一秒之後顯示 2
	    b(3);            // 延遲一秒之後呼叫 b 來顯示 3
	  },1000);
	}

	function b(v){
	  setTimeout(function(){
	  console.log(v);    // 延遲一秒之後顯示 3
	  },1000);
	}

如果換成 Promise 的做法，就可以把 setTimeout 放到 Promise 裡面，同時可以設定一個變數作為延遲的毫秒數，接下來就可以使用`.then`來做串接，在每一個 then 裡頭，再 return 一個 Promise 物件，就可以繼續使用`.then`串接下去，實際完成之後，應該就會看到 123 依序隔一秒才出現，寫法上也就更為清楚簡潔。

>範例展示：[demo-01.html](/demo/201706/javascript-promise-settimeout-demo-01.html)

	var delay = function(s){
	  return new Promise(function(resolve,reject){
	   setTimeout(resolve,s); 
	  });
	};

	delay().then(function(){
	  console.log(1);     // 顯示 1
	  return delay(1000); // 延遲ㄧ秒
	}).then(function(){
	  console.log(2);     // 顯示 2
	  return delay(1000); // 延遲一秒
	}).then(function(){
	  console.log(3);     // 顯示 3
	});

## resolve 回傳值

當 resolve 有合法值的時候，可將這個值傳遞下去使用，但 resolve 只能有一個回傳值 (`resolve(value)`)，所以如果有兩個以上，則必須透過陣列或是物件來傳遞，舉例來說 delay 有兩個變數，第一個變數是顯示的文字，第二個則是延遲的秒數，透過`resolve([r,s]);`就能不斷地將值傳遞下去，結果就會是先顯示「a 0」，延遲一秒後顯示「b 1000」，延遲兩秒後顯示「c 2000」。

>範例展示：[demo-02.html](/demo/201706/javascript-promise-settimeout-demo-02.html)

	var delay = function(r,s){
	  return new Promise(function(resolve,reject){
	   setTimeout(function(){
	     resolve([r,s]);
	   },s); 
	  });
	};

	delay('a',0).then(function(v){
	  console.log(v[0],v[1]);   // 顯示 a 0
	  return delay('b',1000);   // 延遲一秒之後，告訴後面的函示顯示 b 1000
	}).then(function(v){
	  console.log(v[0],v[1]);   // 顯示 b 1000
	  return delay('c',2000);   // 延遲兩秒之後，告訴後面的函示顯示 c 2000
	}).then(function(v){
	  console.log(v[0],v[1]);   // 顯示 c 2000
	});

## 小結

以上就是透過 Promise + setTimeout 所實現的同步延遲，但在 ES7 開始其實有 async、await、delay 的用法 ( 聽說用過就會上癮了 )，就等瀏覽器全面支援後，應該就可以更方便的使用囉！