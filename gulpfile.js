var gulp = require('gulp'),
  markdown = require('gulp-markdown'),
  dom = require('gulp-dom'),
  rename = require("gulp-rename"),
  clean = require("gulp-clean"),
  less = require('gulp-less'),
  md2json = require('gulp-markdown-to-json'),
  md = require('marked'),
  gutil = require('gulp-util'),
  extender = require('gulp-html-extend'),
  include = require('gulp-html-tag-include'),
  merge = require('merge-stream'),
  sitemap = require('gulp-sitemap'),
  changed = require('gulp-changed'),
  runSequence = require('run-sequence'),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  insert = require('gulp-insert'),
  data = require('gulp-data');

/**
 * markdown to html
 * marked 設定，避免 <h1> 會轉不出中文而產生奇怪 id
 * 參考 https://www.npmjs.com/package/marked
 * 參考 https://www.npmjs.com/package/gulp-markdown
 */
var marked = markdown.marked;
var renderer = new marked.Renderer();

renderer.html = function(html) {
  return html;
};
renderer.heading = function(text, level) {
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

renderer.image = function(href, title, text) {
  var image = marked.Renderer.prototype.image.call(this, href, title, text);
  if (image.indexOf('#preview-img') > 0) {
    return image.replace('#preview-img"', '" class="preview-img"');
  } else {
    return image;
  }
};
//如果結尾帶有 #_blank 的超連結，輸出後變成 target=_blank
renderer.link = function(href, title, text) {
  href = href + '" target="_blank';
  var link = marked.Renderer.prototype.link.call(this, href, title, text);
  if (link.indexOf('#_top') > 0) {
    link =  link.replace('target="_blank"', '');
    return link.replace('#_top', '');
    //return link.replace('#_blank"', '" target="_blank"');
  } else {
    return link;
  }
};

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

renderer.code = function(code) {
  return '<pre class="prettyprint"><code>' + escape(code, true) + '\n</code></pre>';
};

/**
 * 透過 include 把版面共用的元素獨立出來變成模組
 * 主板放在 main 資料夾，共用的模組則放在 module 資料夾
 * 合併後放在 _layout-combine 資料夾內
 */
gulp.task('include', function() {
  return gulp.src(['app/_layout/*.html'])
    .pipe(include({
      prefixVar: '@!@'
    }))
    .pipe(gulp.dest('app/_layout-combine/'));
});

/**
 * markdown 轉換成 html，記得加入 marked 的設定
 * changed 幫助我們只轉換有改變的檔案，增加效能
 * 記得要加入 extension: '.html' 的設定，不然會失效
 * 參考 https://www.npmjs.com/package/gulp-changed
 * 透過 insert 可以在每一頁的開頭加入固定內容
 * 因為 index 為第一層，相對路徑必須獨立出來
 */
gulp.task('markdown', ['include'], function() {
  return gulp.src(['app/_md/**/*.md'])
    .pipe(changed('app/_md2html/', {
      extension: '.html'
    }))
    .pipe(markdown({
      renderer: renderer
    }))
    .pipe(insert.prepend('<!-- @@master  = ../../_layout-combine/layout-article.html-->\n<!-- @@block  =  article-->\n'))
    .pipe(insert.append('\n<!-- @@close-->'))
    .pipe(gulp.dest('app/_md2html/'));
});

/**
 * 轉換後的 html 合併 layout，透過 changed 只轉換有改變的檔案
 */
gulp.task('extender', ['markdown'], function() {
  return gulp.src('app/_md2html/**/*')
    .pipe(changed('app/articles/', {
      extension: '.html'
    }))
    .pipe(extender({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('app/articles/'));
});


/**
 * 透過 delete data.body 避免產生的 json 包含 body
 * 參考 https://www.npmjs.com/package/gulp-markdown-to-json
 */
gulp.task('md2json', ['extender'], function() {
  return gulp.src(['app/_md/**/*.md'])
    .pipe(gutil.buffer())
    .pipe(md2json(marked, 'articles.json', function(data, file) {
      var filePath = file.path.split('app/_md')[1].replace('.md', '.html');
      delete data.body;
      data.url = filePath;
      return data;
    }))
    .pipe(gulp.dest('app/json'))
});

/**
 * 如果是 layout 改變，則全部重新轉換 ( 不然會被 changed 影響 )
 */
gulp.task('layout-extender', ['include'], function() {
  var layout_1 = gulp.src('app/_md2html/**/*')
    .pipe(extender({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('app/articles/'));

  var layout_2 = gulp.src(['app/_layout-combine/*.html', '!app/_layout-combine/layout-article.html'])
    .pipe(extender({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('app/'));

  return merge(layout_1, layout_2);
});

/**
 * less to css
 */
gulp.task('less', function() {
  return gulp.src(['app/_less/*.less'])
    .pipe(less())
    .pipe(gulp.dest('app/css/'))
});

gulp.task('less2css', ['less'], function() {
  return gulp.src('app/_less/lib/**/*').pipe(gulp.dest('app/css/lib'));
});


/** 
 * build 前先清空原本舊的 build 內容
 */
gulp.task('build-clean', function() {
  return gulp.src(['build/*'], {
      read: true
    })
    .pipe(clean());
});

/**
 * 產生每一頁的 meta 內容
 */
gulp.task('build-meta', ['build-clean'], function() {
  var baseUrl = 'http://www.oxxostudio.tw';
  var fileUrl = [];
  var a = 0,
    b = 0;
  return gulp.src('app/articles/**/*.html')
    .pipe(data(function(file) {
      a = a + 1;
      fileUrl[a] = file.path.split('app')[1];
    }))
    .pipe(dom(function() {
      b = b + 1;
      var src, imgUrl;
      var title = this.querySelector('h1').innerHTML;
      // 篩選 meta 裡 description 的描述內容
      // 移除超連結、移除 code 與 strong...等標籤
      var p = this.querySelector('p');
      var description = p.innerHTML;
      if (description.indexOf('img') > 0) {
        p = this.querySelector('p+p');
        description = p.innerHTML;
      }
      var a = p.querySelectorAll('a');
      var an = Array.apply(null, a);
      an.forEach(function(e) {
        var ao = e.outerHTML;
        var ai = e.innerHTML;
        description = description.replace(ao, ai);
      });
      String.prototype.allReplace = function(obj) {
        var retStr = this;
        for (var x in obj) {
          retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
      };
      description = description.allReplace({
        '<code>': '',
        '</code>': '',
        '<strong>': '',
        '</strong>': ''
      });
      var meta = this.querySelectorAll('meta');
      var metaToArray = Array.apply(null, meta);

      this.querySelector('title').innerHTML = title + ' - OXXO.STUDIO';
      imgUrl = fileUrl[b].replace('.html', '.jpg');

      var re = new RegExp("&quot;");
      description.replace(/&quot;/g, '');

      metaToArray.forEach(function(e) {
        if (e.getAttribute('property') == 'og:title') {
          e.setAttribute('content', title);
        }
        if (e.getAttribute('property') == 'og:description' || e.getAttribute('itemprop') == 'description' || e.getAttribute('name') == 'description') {
          e.setAttribute('content', description);
        }
        if (e.getAttribute('property') == 'og:image' || e.getAttribute('itemprop') == 'image') {
          e.setAttribute('content', baseUrl + '/img' + imgUrl);
        }
        if (e.getAttribute('property') == 'og:url') {
          e.setAttribute('content', baseUrl + fileUrl[b]);
        }
      });

      return this;
    }))
    .pipe(gulp.dest('build/articles/'));
});

/** 
 * 透過 gulp-stream 來合併 task 
 * build 的時候根據網頁結構，自動產生 sitemap.xml
 */
gulp.task('build-move', ['build-meta'], function() {

  var a1 = gulp.src('app/json/*').pipe(gulp.dest('build/json')),
    a2 = gulp.src('app/img/**/*').pipe(gulp.dest('build/img')),
    a3 = gulp.src('app/js/lib/**/*').pipe(gulp.dest('build/js/lib')),
    a4 = gulp.src('app/js/*.js').pipe(uglify()).pipe(gulp.dest('build/js')),
    a5 = gulp.src('app/css/lib/**/*').pipe(gulp.dest('build/css/lib')),
    a6 = gulp.src('app/css/*.css').pipe(minifyCss()).pipe(gulp.dest('build/css')),
    a7 = gulp.src('app/*').pipe(gulp.dest('build'));

  return merge(a1, a2, a3, a4, a5, a6, a7);
});

gulp.task('build', ['build-move'], function() {
  return gulp.src(['build/**/*.html'])
    .pipe(sitemap({
      siteUrl: 'http://www.oxxostudio.tw'
    }))
    .pipe(gulp.dest('build'));
});


/** 
 * watch 
 */
gulp.task('watch', function() {
  /** 
   * 判斷如果狀態是修改，就純粹執行 extender
   * 如果是新增、更名或刪除，則 json 要重新產生
   */
  gulp.watch(['app/_md/**/*'], function(event) {
    if (event.type != 'changed') {
      gulp.start('md2json');
    } else {
      gulp.start('extender');
    }
  });
  gulp.watch(['app/_less/**/*'], ['less2css']);
  gulp.watch(['app/_layout/**/*'], ['layout-extender']);
});



/** 
 * 不用每次編輯都做一次清除動作，在開始前先清除一次即可
 * 透過 runSequence 讓開始前先執行一次清除動作
 * 參考 https://www.npmjs.com/package/run-sequence
 */
gulp.task('clean', function() {
  return gulp.src(['app/_md2html/*', 'app/articles/*', 'app/css/*', 'app/_layout-combine/*'], {
      read: true
    })
    .pipe(clean());
});

gulp.task('default', function(callback) {
  runSequence('clean', ['md2json', 'layout-extender', 'less2css', 'watch'],
    callback);
});
