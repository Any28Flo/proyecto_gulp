const gulp = require ('gulp');
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const config = {
	source : './src/',
	dist: './public/'
};

const paths = {
	html : "**/*.html",
	sass: "assets/scss/**/*.scss",
	mainSass : "assets/scss/main.scss"


};

const sources ={
	html: config.source + paths.html,
	sass : config.source + paths.sass,
	rootSass : config.source + paths.mainSass,

};

gulp.task('mover_html' , ()=>{
	gulp.src(sources.html)
		.pipe(gulp.dest(config.dist));
})

gulp.task('sass' , ()=>{
	gulp.src(sources.rootSass)
		.pipe(sass({outputStyle: "compresed"}).on("error",sass.logError))
		.pipe(gulp.dest(config.dist +"/assets/css"))
});

gulp.task('js' , ()=>{
	gulp.src("./src/assets/js/*.js")
		.pipe(browserify)
		.pipe(rename("misJavscript.js"))
		.pipe(gulp.dest("./public/assets/js"));
});

gulp.task('sass-watch' ,["sass"], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('js-watch' ,["js"], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('html-watch' ,["html"], (done)=>{
	browserSync.reload();
	done();
});

gulp.task('serve' ,()=>{
	browserSync.init({
		server:{
			baseDir:"./public"
		}
	})
	gulp.watch("./src/assets/scss/main.scss", ["sass-watch"]);
	gulp.watch("./src/assets/js/app.js", ["js-watch"]);
	gulp.watch("./src/assets/index.html", ["html-watch"]);

});
