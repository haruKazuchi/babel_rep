var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");//エラー時にwatchを止めない
var browser = require("browser-sync");
var ssi = require ('browsersync-ssi');


var PATH = {
	ROOT : './public',
	SRC  : {
		ES6 : './src/es6',
		SASS : './src/sass',
	},
	DEST : {
		JS : './public/assets/js',
		CSS : './public/assets/css',
	}
}

/*----------------------------
 *browserSyncgulp
------------------------------*/
gulp.task("browsersync", function() {
    browser({
        port: 5000,
        server: {
            baseDir: PATH.ROOT,
			middleware : ssi({
				baseDir: PATH.ROOT,
				ext: '.html'
			})
		},
    });
});

/*----------------------------
 *es6
------------------------------*/
gulp.task("js",function(){
	return gulp.src(PATH.SRC.ES6 + "/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("app.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(PATH.DEST.JS))
})

/*----------------------------
 *Watch対象のファイル
------------------------------*/
gulp.task("watch",function(){
	gulp.watch(PATH.SRC.SASS,["sass"]);
	gulp.watch(PATH.DEST.JS + '/**/*.js', browser.reload);
	gulp.watch(PATH.DEST.CSS + '/**/*.css', browser.reload);
	gulp.watch(PATH.ROOT + '/**/*.html', browser.reload);
});

gulp.task('default', ["browsersync","watch","js"]);