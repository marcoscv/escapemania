const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const ghPages = require('gulp-gh-pages');
const imagemin = require('gulp-imagemin');
 
gulp.task('images', () =>
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/images'))
);

// compile custom SCSS files
gulp.task('sass', () => {
  return gulp.src([
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('src/css'));
});

// pug build pages
gulp.task('pug', function() {  
  return gulp.src('src/templates/*.pug')
  .pipe(pug({
    pretty: true,
    cache: false
  }))
  .pipe(gulp.dest('src'))
  .pipe(browserSync.stream());
});


// copy JS modules
gulp.task('copy-js', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});

// init develop Server
gulp.task('serve', ['sass','copy-js', 'pug', 'images'], () => {
  browserSync.init({
    server: './src'
  });
  
  gulp.watch(['src/templates/**/*.pug','src/templates/**/*.txt'], ['pug']);
  gulp.watch(['src/scss/*.scss'], ['sass','minify-css']);
  gulp.watch(['src/images/**/*'], ['images']);
  gulp.watch('src/**/*').on('change',
    browserSync.reload
  );
});

//Publish gh-pages
gulp.task('deploy', ['sass','copy-js', 'pug', 'images'], () => {
  return gulp.src('./src/**/*')
    .pipe(ghPages());
});

// defaul task typing 'gulp'
gulp.task('default', ['copy-js',   'sass', 'minify-css', 'serve'])
