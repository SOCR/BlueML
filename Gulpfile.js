var gulp = require('gulp');
var webserver = require('gulp-webserver');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyhtml = require('gulp-minify-html');
var responsive = require('gulp-responsive');
var imagemin = require('gulp-imagemin');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var exec = require('child_process').exec

var paths = {
	scripts: ['public/js/*.js'],
	styles: ['public/css/*.css'],
	images: ['public/static/images/*']
};

gulp.task('nodestart', function () {
	exec('node bin/www', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
	});
});

gulp.task('styles', function() {
	return gulp.src(paths.styles)
	.pipe(minifycss({compatibility: 'chrome10'}))
	.pipe(gulp.dest('build/css/'))
	.pipe(connect.reload());
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/js/'))
	.pipe(connect.reload());
});

gulp.task('html', function() {
	return gulp.src(paths.html)
	.pipe(minifyhtml({
	empty: true,
	quotes: true
	}))
	.pipe(gulp.dest('build'));
});

gulp.task('images', function() {
	return gulp.src(paths.images)
	.pipe(responsive({
	'BlockM-rball.png': {
		width: 32,
		height: 32
	},
	'blueML_logo.png': {
		width: 216,
		height: 86
	}
	}))
	.pipe(gulp.dest('build/images/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('clean', function() {
	return del(['build/css/', 'build/js/', 'build/images/']);
});

gulp.task('webserver', function() {
	gulp.src('build')
	.pipe(webserver({
		livereload: true,
		directoryListing: true,
	}));
});

gulp.task('connect', function() {
	connect.server({
		root: '.',
		livereload: true
	})
});

gulp.task('ETL', function() {
	exec('node ETL.js', function (err, stdout, stderr) {
		console.log(stdout);
	});
});

gulp.task('default', ['nodestart', 'styles', 'scripts', 'images', 'watch', 'webserver', 'connect']);
gulp.task('startup',['ETL']);