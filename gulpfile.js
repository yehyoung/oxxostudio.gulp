var gulp = require('gulp'),
  extend = require('gulp-html-extend'),
  replace = require('gulp-concat'),
  include = require('gulp-html-tag-include'),
  newer = require('gulp-newer'),
  clean = require('gulp-clean'),
  markdown = require('gulp-markdown'),
  md2json = require('gulp-markdown-to-json'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  minicss = require('gulp-minify-css'),
  minihtml = require('gulp-minify-html'),
  uglifyjs = require('gulp-uglify'),
  sitemap = require('gulp-sitemap'),
  merge = require('merge-stream'),
  webserver = require('gulp-webserver'),
  gutil = require('gulp-util');

/*
                                     oooo              .o8                                         
                                     `888             "888                                         
ooo. .oo.  .oo.    .oooo.   oooo d8b  888  oooo   .oooo888   .ooooo.  oooo oooo    ooo ooo. .oo.   
`888P"Y88bP"Y88b  `P  )88b  `888""8P  888 .8P'   d88' `888  d88' `88b  `88. `88.  .8'  `888P"Y88b  
 888   888   888   .oP"888   888      888888.    888   888  888   888   `88..]88..8'    888   888  
 888   888   888  d8(  888   888      888 `88b.  888   888  888   888    `888'`888'     888   888  
o888o o888o o888o `Y888""8o d888b    o888o o888o `Y8bod88P" `Y8bod8P'     `8'  `8'     o888o o888o 
*/

// markdown，需要手動修改把 id 拿掉，markdown to json 必須把 data[path].body mark 起來
// gulp-markdown > node-modules > marked > lib > marked.js
//+ ' id="'
//+ this.options.headerPrefix
//+ raw.toLowerCase().replace(/[^\w]+/g, '-')

/* all */
gulp.task('md-clean', function() {
  return gulp.src(['app/md2html', 'app/articles'], {
    read: true
  }).pipe(clean());
});
gulp.task('md', ['md-clean'], function() {
  return gulp.src('app/md/**/*.md').pipe(markdown()).pipe(gulp.dest('app/md2html/'));
});
gulp.task('md-extend', ['md'], function() {
  return gulp.src('app/md2html/**/*.html')
    .pipe(extend({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('app/articles/'));
});
gulp.task('md-include', ['md-extend'], function() {
  return gulp.src('app/articles/**/*.html').pipe(include()).pipe(gulp.dest('app/articles/'));
});

var time = [
  '201405',
  '201406',
  '201407',
  '201408',
  '201409',
  '201410',
  '201411',
  '201412',
  '201501',
  '201502',
  '201503',
  '201505',
  '201506',
  '201508',
  '201509',
  '201510',
  '201512',
  '201601'
];

for(var timeLength = 0; timeLength < time.length; timeLength++){
  task(time[timeLength]);
}

function task(t){
  gulp.task('md-clean-'+t, function() {
    return gulp.src(['app/md2html/'+t, 'app/articles/'+t], {
      read: true
    }).pipe(clean());
  });
  gulp.task('md-'+t, ['md-clean-'+t], function() {
    return gulp.src('app/md/'+t+'/*.md').pipe(markdown()).pipe(gulp.dest('app/md2html/'+t+'/'));
  });
  gulp.task('md-extend-'+t, ['md-'+t], function() {
    return gulp.src('app/md2html/'+t+'/*.html')
      .pipe(extend({
        annotations: false,
        verbose: false
      }))
      .pipe(gulp.dest('app/articles/'+t+'/'));
  });
  gulp.task('md-include-'+t, ['md-extend-'+t], function() {
    return gulp.src('app/articles/'+t+'/*.html').pipe(include()).pipe(gulp.dest('app/articles/'+t+'/'));
  });
}

/*
                        .o8         .oooo.            o8o                                
                       "888       .dP""Y88b           `"'                                
ooo. .oo.  .oo.    .oooo888             ]8P'         oooo  .oooo.o  .ooooo.  ooo. .oo.   
`888P"Y88bP"Y88b  d88' `888           .d8P'          `888 d88(  "8 d88' `88b `888P"Y88b  
 888   888   888  888   888         .dP'              888 `"Y88b.  888   888  888   888  
 888   888   888  888   888       .oP     .o          888 o.  )88b 888   888  888   888  
o888o o888o o888o `Y8bod88P"      8888888888          888 8""888P' `Y8bod8P' o888o o888o 
                                                      888                                
                                                  .o. 88P                                
                                                  `Y888P                                 
*/
// markdown to json，需要手動修改把 body mark 起來
// gulp-markdown-to-json > node-modules > index.js
//data[path].body = markup.slice(1).join(' ');
//data[path].body = marked(parsed.body);


gulp.task('md2json', function() {
  return gulp.src(['app/md/**/*.md'])
    .pipe(gutil.buffer())
    .pipe(md2json('articles.json'))
    .pipe(gulp.dest('app/json'))
});


/*
oooo                              
`888                              
 888   .ooooo.   .oooo.o  .oooo.o 
 888  d88' `88b d88(  "8 d88(  "8 
 888  888ooo888 `"Y88b.  `"Y88b.  
 888  888    .o o.  )88b o.  )88b 
o888o `Y8bod8P' 8""888P' 8""888P'
*/

gulp.task('css-clean', function() {
  return gulp.src(['app/style/css/*'], {
      read: true
    })
    .pipe(clean());
});

gulp.task('less', ['css-clean'], function() {
  return gulp.src('app/style/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/style/css'))
});


/*
 o8o                    .o8                        
 `"'                   "888                        
oooo  ooo. .oo.    .oooo888   .ooooo.  oooo    ooo 
`888  `888P"Y88b  d88' `888  d88' `88b  `88b..8P'  
 888   888   888  888   888  888ooo888    Y888'    
 888   888   888  888   888  888    .o  .o8"'88b   
o888o o888o o888o `Y8bod88P" `Y8bod8P' o88'   888o 
*/

gulp.task('index', function() {
  return gulp.src('app/_index.html')
    .pipe(extend({
      annotations: false,
      verbose: false
    }))
    .pipe(rename(function(path) {
      path.basename = "index";
    }))
    .pipe(gulp.dest('app'));
});


/*
oooo   o8o               .   
`888   `"'             .o8   
 888  oooo   .oooo.o .o888oo 
 888  `888  d88(  "8   888   
 888   888  `"Y88b.    888   
 888   888  o.  )88b   888 . 
o888o o888o 8""888P'   "888" 
*/

gulp.task('list', function() {
  return gulp.src('app/_list.html')
    .pipe(extend({
      annotations: false,
      verbose: false
    }))
    .pipe(rename(function(path) {
      path.basename = "list";
    }))
    .pipe(gulp.dest('app'));
});

/*
                                                oooo        
                                                `888        
 .oooo.o  .ooooo.   .oooo.   oooo d8b  .ooooo.   888 .oo.   
d88(  "8 d88' `88b `P  )88b  `888""8P d88' `"Y8  888P"Y88b  
`"Y88b.  888ooo888  .oP"888   888     888        888   888  
o.  )88b 888    .o d8(  888   888     888   .o8  888   888  
8""888P' `Y8bod8P' `Y888""8o d888b    `Y8bod8P' o888o o888o 
*/

gulp.task('search', function() {
  return gulp.src('app/_search-results.html')
    .pipe(extend({
      annotations: false,
      verbose: false
    }))
    .pipe(rename(function(path) {
      path.basename = "search-results";
    }))
    .pipe(gulp.dest('app'));
});


/* 
 .oooo.o  .ooooo.  oooo d8b oooo    ooo  .ooooo.  oooo d8b 
d88(  "8 d88' `88b `888""8P  `88.  .8'  d88' `88b `888""8P 
`"Y88b.  888ooo888  888       `88..8'   888ooo888  888     
o.  )88b 888    .o  888        `888'    888    .o  888     
8""888P' `Y8bod8P' d888b        `8'     `Y8bod8P' d888b    
*/

gulp.task('server', function() {
  return gulp.src('app/')
    .pipe(webserver({
      port: 1111,
      livereload: false,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});


/*
oooooooooo.  ooooo     ooo ooooo ooooo        oooooooooo.   
`888'   `Y8b `888'     `8' `888' `888'        `888'   `Y8b  
 888     888  888       8   888   888          888      888 
 888oooo888'  888       8   888   888          888      888 
 888    `88b  888       8   888   888          888      888 
 888    .88P  `88.    .8'   888   888       o  888     d88' 
o888bood8P'     `YbodP'    o888o o888ooooood8 o888bood8P'   
*/

/* build */
gulp.task('build-clean', function() {
  return gulp.src(['build/*'], {
    read: true
  }).pipe(clean());
});

gulp.task('move', ['build-clean'], function() {
  var opts = {
    conditionals: true,
    spare: true,
    loose: true
  };
  var a1 = gulp.src('app/img/**/*').pipe(gulp.dest('build/img')),
    a2 = gulp.src('app/articles/**/*').pipe(gulp.dest('build/articles')),
    a3 = gulp.src('app/demo/**/*').pipe(gulp.dest('build/demo')),
    a4 = gulp.src('app/js/lib/*').pipe(gulp.dest('build/js/lib')),
    a4 = gulp.src('app/style/lib/*').pipe(gulp.dest('build/style/lib')),
    a5 = gulp.src('app/json/*').pipe(gulp.dest('build/json')),
    a6 = gulp.src('app/js/*.js')
    .pipe(uglifyjs())
    .pipe(gulp.dest('build/js')),
    a7 = gulp.src('app/style/css/*.css')
    .pipe(minicss())
    .pipe(gulp.dest('build/style/css')),
    a8 = gulp.src([
      'app/index.html',
      'app/list.html',
      'app/search-results.html',
      'app/favicon.ico',
      'app/404.html',
      'app/robots.txt',
      'app/rss.xml',
      'app/CNAME',
      'app/googleddac32a05b66aecc.html'
    ])
    .pipe(gulp.dest('build'));
  return merge(a1, a2, a3, a4, a5, a6, a7, a8);
});

gulp.task('build', ['move'], function() {
  return gulp.src([
    'build/**/*.html', 
    '!build/demo/**/*', 
    '!build/search-results.html', 
    '!build/404.html',
    '!build/googleddac32a05b66aecc.html'
    ])
    .pipe(sitemap({
      siteUrl: 'http://www.oxxostudio.tw'
    }))
    .pipe(gulp.dest('build'));
});



/* 
                               .             oooo        
                             .o8             `888        
oooo oooo    ooo  .oooo.   .o888oo  .ooooo.   888 .oo.   
 `88. `88.  .8'  `P  )88b    888   d88' `"Y8  888P"Y88b  
  `88..]88..8'    .oP"888    888   888        888   888  
   `888'`888'    d8(  888    888 . 888   .o8  888   888  
    `8'  `8'     `Y888""8o   "888" `Y8bod8P' o888o o888o 
*/

gulp.task('watch', function() {
  gulp.watch('app/_index.html', ['index']);
  gulp.watch('app/_list.html', ['list']);
  gulp.watch('app/_search-results.html', ['search']);
  gulp.watch('app/_layout.html', ['index', 'list', 'search', 'md-include']);
  gulp.watch('app/_articles-js.html', ['md-include']);
  gulp.watch('app/_articles-css.html', ['md-include']);
  gulp.watch('app/_articles.html', ['md-include']);
  gulp.watch('app/style/less/*.less', ['less']);
  //gulp.watch('app/md/**/*.md',['md2json']);
  gulp.watch('app/md/201405/*.md', ['md-include-201405']);
  gulp.watch('app/md/201406/*.md', ['md-include-201406']);
  gulp.watch('app/md/201407/*.md', ['md-include-201407']);
  gulp.watch('app/md/201408/*.md', ['md-include-201408']);
  gulp.watch('app/md/201409/*.md', ['md-include-201409']);
  gulp.watch('app/md/201410/*.md', ['md-include-201410']);
  gulp.watch('app/md/201411/*.md', ['md-include-201411']);
  gulp.watch('app/md/201412/*.md', ['md-include-201412']);
  gulp.watch('app/md/201501/*.md', ['md-include-201501']);
  gulp.watch('app/md/201502/*.md', ['md-include-201502']);
  gulp.watch('app/md/201503/*.md', ['md-include-201503']);
  gulp.watch('app/md/201505/*.md', ['md-include-201505']);
  gulp.watch('app/md/201506/*.md', ['md-include-201506']);
  gulp.watch('app/md/201508/*.md', ['md-include-201508']);
  gulp.watch('app/md/201509/*.md', ['md-include-201509']);
  gulp.watch('app/md/201510/*.md', ['md-include-201510']);
  gulp.watch('app/md/201512/*.md', ['md-include-201512']);
  gulp.watch('app/md/201601/*.md', ['md-include-201601']);
});

gulp.task('default', ['index', 'list', 'search', 'less', 'md-include', 'watch']);
