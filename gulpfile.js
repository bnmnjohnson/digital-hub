var gulp = require('gulp');
var bower = require ('gulp-bower');
var sass = require ('gulp-sass');
var notify = require ('gulp-notify');
var templateCache = require ('gulp-angular-templatecache')
var browserSync = require ('browser-sync');
var streamqueue = require('streamqueue');
var autoprefixer = require('gulp-autoprefixer');



//Compile views into an angular $templateCache module
//Move them to a temp folder, we'll add them to public later
gulp.task('views', function(){
 return streamqueue({ objectMode: true },
    gulp.src('./build/views/**/*.html')
    )
        .pipe(templateCache('./temp/templateCache.js', { module: 'templatescache', standalone: true }))
        .pipe(gulp.dest('./build/js/'));
});

//Move files in html to public/
gulp.task('home', ['views'], function(){
	gulp.src('./build/html/*.html')
  gulp.src('./build/brands/*.json')
		.pipe(gulp.dest('./public/'));
});



//move everything in the assets folder to public/assets
gulp.task('assets', ['home'], function(){
	gulp.src('./build/assets/*/**')
		.pipe(gulp.dest('./public/src/assets/'));
});

//move both the templatecache service and angular app to public/js
gulp.task('scripts', ['assets'], function(){
	return streamqueue({ objectMode: true },
		gulp.src('./build/js/angular-app.js'),
		gulp.src('./build/js/bnm-styleguide.js'),
		gulp.src('./build/js/data.js'),
		gulp.src('./build/js/prism.js'),
		gulp.src('./build/js/wufoo.js'),
    gulp.src('./build/js/temp/templateCache.js')
		)
		.pipe(gulp.dest('./public/src/js/'));
});

//compile SASS and then move it to public/css
//Notify when build is complete
gulp.task('build', ['scripts'], function(){
	gulp.src('./build/scss/*.scss')
		.pipe(sass({
	        style: 'compressed',
	        errLogToConsole: false,
	        onError: function(err) {
	            return notify().write(err);
	        }
	    }))
	    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('./public/src/css/'))
		.pipe(notify("Build - Success!"));
});

//move bower components to the library folder
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('./public/src/js/lib/'))
		.pipe(notify('Bower Success'));
});


gulp.task('watch-bower', function(){
	gulp.watch(['./bower_components'], ['bower'])
})
//watch these files and run the build if they update
gulp.task('watch-build', function(){
    gulp.watch(
        ['./build/scss/*.scss', './build/js/*.js', './build/brands/*.json', './build/html/*.html', './build/views/*.html',],
        ['build']
    )
});

//Create a local web server using browser-sync
//Refresh the browser if any files change
gulp.task('serve', function () {
		var files = [
		'./public/**/*',
		'./public/*.html'
	];

    browserSync.init(files, {
        server: {
            baseDir: './public',
        }
    });
});

//default task
gulp.task('default', ['build', 'bower', 'watch-build', 'watch-bower', 'serve']);

