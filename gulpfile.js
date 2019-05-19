var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp
    .src('assets/styles/**/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://php-ryanniswonger890595.codeanyapp.com/spirits-of-the-forest-score-sheet',
  });
});

gulp.task('jshint', function() {
  return gulp
    .src('assets/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('scripts', ['jshint'], function() {
  gulp.src('assets/scripts/*.js').pipe(gulp.dest('dist/scripts/'));
});

gulp.task('default', ['sass', 'scripts',  'browser-sync'], function() {
  gulp.watch('assets/styles/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/**/*.js', ['jshint']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
