const gulp = require('gulp')
const clean = require('gulp-clean')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

// 压缩 js
gulp.task('uglify', function() {
  gulp.src(['./pc-src/assets/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./pc-src/dist/js'));
})

// 编译 sass
gulp.task('sass', function() {
  gulp.src(['./pc-src/assets/sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./pc-src/dist/css'))
})

// 清除文件
gulp.task('clean', function(cb) {
  gulp.src(['./pc-src/dist']).pipe(clean())
})

// 监视文件变动
gulp.task('watch', function() {
  gulp.watch(['./pc-src/assets/js/*.js'], ['uglify'])
  gulp.watch(['./pc-src/assets/sass/*.scss'], ['sass'])
})

// gulp.task('default', ['uglify', 'sass'])
gulp.task('default', ['sass'])

gulp.task('build', ['clean', 'uglify', 'sass'])
