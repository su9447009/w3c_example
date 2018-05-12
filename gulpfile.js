const gulp = require('gulp');
const sass = require('gulp-sass');
// const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpPlumber = require('gulp-plumber');

gulp.task('default', [ 'html', 'sass', 'js', 'watch', 'browser-sync' ]);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        port: 8080
    });
});

gulp.task('watch', function () {

    gulp.watch(['./src/template/**/*.html','./src/template/**/*.htm'], ['html'])
    .on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', ['js'])
    .on('change', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', ['sass'])
    .on('change', browserSync.reload);
});


gulp.task('html', function () {
  return gulp.src(['./src/template/**/*.html','./src/template/**/*.htm'])
    .pipe(gulp.dest('./dist'));
});

// gulp.task('css', function(){
//   return gulp.src('client/templates/*.less')
//     .pipe(less())
//     .pipe(minifyCSS())
//     .pipe(gulp.dest('build/css'))
// });
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
  	.pipe(gulpPlumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

gulp.task('js', function(){
  return gulp.src('./src/js/**/*.js')
  	.pipe(gulpPlumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'));
});

