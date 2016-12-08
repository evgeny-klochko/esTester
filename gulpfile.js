'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const gulpIf = require('gulp-if');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');

const dirs = {
  src: './src',
  dist: './dist'
};

const paths = {
  scripts: {
    app: [dirs.src + '/app/**/module.js', dirs.src + '/app/**/*.js'],
    angular: [
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/ngstorage/ngStorage.min.js',
      './node_modules/angular-aria/angular-aria.min.js',
      './node_modules/angular-animate/angular-animate.min.js',
      './node_modules/angular-material/angular-material.min.js',
      './node_modules/angular-loading-bar/src/loading-bar.js',
      './node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js'
    ],
    vendors: [
      './node_modules/material-design-lite/material.min.js'
    ],
  },
  html: [
    dirs.src + '/**/*.html'
  ],
  styles: {
    main: dirs.src + '/sass/**/*.scss',
    vendors: [
      './node_modules/material-design-lite/material.min.css',
      './node_modules/angular-material/angular-material.min.css',
      './node_modules/angular-loading-bar/src/loading-bar.css'
    ]
  },
  assets: dirs.src + '/assets/**/*.*',
  lint: [
    dirs.src + '/app/**/*.js',
    '!node_modules/**'
  ],
  cleanup: dirs.dist
};

gulp.task('js-app', () => {
  return gulp.src(paths.scripts.app)
  .pipe(concat('app.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .on('error', notify.onError())
  .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('js-angular', () => {
  return gulp.src(paths.scripts.angular)
    .pipe(concat('angular.js'))
    .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('js-vendors', () => {
  return gulp.src(paths.scripts.vendors)
  .pipe(concat('vendors.js'))
  .pipe(uglify())
  .on('error', notify.onError())
  .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('html', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles.main)
    .pipe(sass())
    .on('error', notify.onError())
    .pipe(concat('styles.css'))
    .on('error', notify.onError())
    .pipe(cleanCSS())
    .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('styles-vendors', () => {
  return gulp.src(paths.styles.vendors)
    .pipe(concat('vendors.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('assets', function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(dirs.dist + '/assets'));
});

gulp.task('cleanup', () => {
  return del(paths.cleanup, {
    force: true
  });
});

gulp.task('lint', () => {
    return gulp.src(paths.lint)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});


gulp.task('build', gulp.series(
  'cleanup',
  'lint',
  gulp.parallel(
    'js-app',
    'js-angular',
    'js-vendors',
    'styles',
    'styles-vendors',
    'html',
    'assets'
  )
));

gulp.task('watch', () => {
  gulp.watch(paths.html, gulp.series('html'));
  gulp.watch(paths.scripts.app, gulp.series('js-app'));
  gulp.watch(paths.scripts.angular, gulp.series('js-angular'));
  gulp.watch(paths.styles.main, gulp.series('styles'));
  gulp.watch(paths.assets, gulp.series('assets'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: 'dist'
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('default',
  gulp.series('build', gulp.parallel('watch', 'serve')));
