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


// Set up the paths for files. Folder structure.
var paths = {
    scripts: ['js/*.js'],
    styles: ['css/*.css'],
    images: ['static/images/*'],
    html: ['index.html'],
    fonts: ['fonts/*']
};

// Testing
gulp.task('hello', function() {
    console.log('Hello Isabel');
});

// Output files to build folder. Not sure if necessary.
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

gulp.task('images', function() {
    return gulp.src(paths.styles)
        .pipe(minifyjs({compatibility: 'chrome15'}))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('build'));
});

// Optimizes our image files and outputs them to build/image/*
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
  // or .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/images/'));
});
// Deleted favicon.png since could not open it.

gulp.task('fonts', function() {
  return gulp.src('paths.fonts')
      .pipe(gulp.dest('build/fonts/'))
})


// Watch for changes in the files in order to update.
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.images, ['images']);

    // Create LiveReload server
    // livereload.listen();

    // Watch any files in dist/, reload on change
    // gulp.watch(['build/**']).on('change', livereload.changed);
});

// Cleaning up.
gulp.task('clean', function() {
    return del(['build/css/', 'build/js/', 'build/images/', 'build/index.html', 'build/fonts/']);
});

 
gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            fallback: 'index.html'
        }));
});


gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    })
});


gulp.task('default', ['styles', 'scripts', 'html', 'images', 'watch', 'webserver', 'fonts', 'connect']);

