<!-- @@master  = ../../_layout.html-->

<!-- @@block  =  jsBottom-->

<include src="../../_articles-js.html"></include>

<!-- @@close-->

<!-- @@block  =  css-->

<include src="../../_articles-css.html"></include>

<!-- @@close-->

<!-- @@block  =  articles-social-->

<include src="../../_articles-social.html"></include>

<!-- @@close-->

<!-- @@block  =  articles-footer-->

<include src="../../_articles.html"></include>

<!-- @@close-->

<!-- @@block  =  meta-->

<meta property="article:published_time" content="2016-03-29T23:50:00+01:00">

<meta name="keywords" content="javascript,prototype">

<meta name="description" content="JavaScript 裡面所有物件都具有 Prototype 這個原型物件，但只有函式物件才有公開的原型物件，其他的物件都只有私有的原型物件，凡是原型物件裡面的屬性或方法，都會直接繼承到它的實體物件上頭。">

<meta itemprop="name" content="JavaScript 筆記 ( Prototype ) - OXXO.STUDIO">

<meta itemprop="image" content="http://www.oxxostudio.tw/img/articles/201603/20160329_1_01b.jpg">

<meta itemprop="description" content="JavaScript 裡面所有物件都具有 Prototype 這個原型物件，但只有函式物件才有公開的原型物件，其他的物件都只有私有的原型物件，凡是原型物件裡面的屬性或方法，都會直接繼承到它的實體物件上頭。">

<meta property="og:title" content="JavaScript 筆記 ( Prototype )  - OXXO.STUDIO">

<meta property="og:url" content="http://www.oxxostudio.tw/articles/201603/javascript-prototype.html" target="_blank">

<meta property="og:image" content="http://www.oxxostudio.tw/img/articles/201603/20160329_1_01b.jpg">

<meta property="og:description" content="JavaScript 裡面所有物件都具有 Prototype 這個原型物件，但只有函式物件才有公開的原型物件，其他的物件都只有私有的原型物件，凡是原型物件裡面的屬性或方法，都會直接繼承到它的實體物件上頭。">

<title>JavaScript 筆記 ( Prototype ) - OXXO.STUDIO</title> 

<!-- @@close-->

<!-- @@block  =  articles-content--> 

##JavaScript 筆記 ( Prototype )  <span class="article-date" tag="web">MAR 29, 2016</span>

<img src="/img/articles/201603/20160329_1_01.jpg" class="preview-img">

這陣子實在好忙 ( 這樣說好像也不是一兩個月了... )，然後因為工作夥伴都是 JavaScript 神之等級的工程師，從中也學到不少知識，畢竟就是要和強者工作才會成長呀！為了想好好瞭解他們寫的程式碼，所以就只好深入來理解一下 JavaScript 裏頭 Prototype 這個惱人的「原型」，在兩年前我有去上保哥 ( [http://blog.miniasp.com/](http://blog.miniasp.com/) ) 的 JavaScript，以自己當年的程度，加上工作上沒有真正的實戰機會，真的是聽完就忘了，隨著年紀增長，現在回頭再來看才發現真是滿有趣的，打鐵趁熱趁著搞懂了，趕快做個筆記。

JavaScript 裡面所有物件都具有 Prototype 這個原型物件，但只有函式物件才有公開的原型物件，其他的物件都只有私有的原型物件，凡是原型物件裡面的屬性或方法，都會直接繼承到它的實體物件上頭，這實在是講得很繞口，白話一點來說，就是我們每個人都具備「人類」這個 Prototype，而「人類」這個原型，具備了「用雙腳行走」、「可以用嘴講話」...等行為 ( 也就是方法 Method )，但對於每個人來說，各自有各自的屬性，例如「姓名」、「膚色」...等，這大概就是物件與其 Prototype 的關係。

好像比較理解了，現在就直接用程式碼來看看：

	/* 
	一開始我們先定義一個函式物件 people，也就是如果一個人誕生的時候，
	他會有「名字 name」的屬性和「皮膚 skin」的屬性。
	*/

	function people(n,s){
	  this.name = n;
	  this.skin = s;
	}
	
	/* 
	接著我們來定義 human 這個原型物件，因為 people 是人類 human，
	所以人類會具備 walk 走路、eat 吃東西和 scratch 抓癢這些行為，
	這些人類開始這些行為的時候，我們用 console 給印出來。
	*/

	var human = {
	 walk : function(){
	    console.log(this.name + ' 在走路');
	  },
	 eat : function(){
	   console.log(this.name + ' 在吃東西');
	 },
	 scratch : function(){
	   console.log(this.name + ' 抓自己的' + this.skin + '皮膚');
	 }
	};

	/* 
	然後我們把 human 這個原型物件綁定到 people 上頭，
	這裏使用目前標準的寫法 Object.create。
	*/

	people.prototype = Object.create(human);

	/*
	最後我們開始生小孩了，首先生出一個 tom ( 使用 new people 很貼切 )，
	名字叫做 Tom，皮膚是白色的，另外一個小孩叫做 Bill，皮膚是黑色的，Cherry 皮膚是黃色的。
	*/

	var tom = new people('Tom','白色');
	var bill = new people('Bill','黑色');
	var cherry = new people('Cherry','黃色');

	/*
	生小孩之後，小孩長大了，Tom 開始走路，Bill 抓癢，Cherry 在吃東西。
	*/

	tom.walk();
	bill.scratch();
	cherry.eat();

	/*
	所以執行起來結果就是：
	> Tom 在走路
	> Bill 抓自己的黑色皮膚
	> Cherry 在吃東西
	*/


完整程式碼：[javascript-prototype-demo01.html](/demo/201603/javascript-prototype-demo01.html)

使用 Prototype 的好處，最主要就是可以定義一些共用的方法，而這些定義在記憶體當中也只會存一份，因為當我們每次 new 一個物件的時候，物件裡所有的屬性都會被 new 一份出來，但原型繼承就不會，因為是「繼承」的概念，所以就是大家共用一份 ( 不會說我和你都是人類，但是你我的行為卻大不相同，就像不會有人用屁股吃飯用嘴巴拉屎 XD )

當然，當一個物件 new 出來之後，就可以自己添加自己的屬性，就像每個人的發展際遇、學歷、興趣都不同，這些就是看物件各自的屬性去做添加設定。

最後來寫一個可以用按鈕控制區域顏色的 API 吧！這裏我做一個 box，box 的原型是 boxDiv，boxDiv 具備了變紅色、變藍色、變大和變小四種方法，而 box 本身有一個屬性 name，這個 name 就是讀取有這個 id 的 div。( 
完整程式碼：[javascript-prototype-demo02.html](/demo/201603/javascript-prototype-demo02.html) )

	function box(n){
	  this.name = document.getElementById(n);
	}

	var boxDiv = {
	 red : function(){
	    this.name.style.background = '#f00';
	  },
	 blue : function(){
	    this.name.style.background = '#00f';
	 },
	 big : function(){
	    this.name.style.width = '100px';
	    this.name.style.height = '100px';
	 },
	 small : function(){
	    this.name.style.width = '20px';
	    this.name.style.height = '20px';
	 }
	};

	box.prototype = Object.create(boxDiv);

	var b = new box('area');

	document.getElementById('r').addEventListener('click',function(){
	  b.red();
	});
	document.getElementById('b').addEventListener('click',function(){
	  b.blue();
	});
	document.getElementById('big').addEventListener('click',function(){
	  b.big();
	});
	document.getElementById('small').addEventListener('click',function(){
	  b.small();
	});

<br/>

以上就是我理解 Prototype 的一些心得，用人類的角度去思考，就會變得很容易理解了 :D

<br/>

<!-- @@close-->




