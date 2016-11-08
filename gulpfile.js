'use strict'

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


gulp.task('styles:app', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass())
		.on('error', notify.onError())
		.pipe(concat('styles.css'))
		.on('error', notify.onError())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('styles:libs', function() {
	return gulp.src('src/libs/**/*.css')
		.pipe(concat('vendors.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('styles', gulp.parallel('styles:app', 'styles:libs'));


gulp.task('js:app', function() {
	return gulp.src('src/app/**/*.js')
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));

});

gulp.task('js:libs', function() {
	return gulp.src('src/libs/**/*.js')
	.pipe(concat('vendors.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('js', gulp.parallel('js:app', 'js:libs'));

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('assets', function() {
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest('./dist/assets'));
});

gulp.task('clean', function() {
	return del('./dist');
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets', 'html', 'js')));

gulp.task('watch', function() {
	gulp.watch('src/**/*.scss', gulp.series('styles:app'));
	gulp.watch('src/**/*.html', gulp.series('html'));
	gulp.watch('src/app/**/*.js', gulp.series('js:app'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'dist'
	});

	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});


gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));


//
//Copy to libs
gulp.task('angular', function() {
	return gulp.src('node_modules/angular/angular.min.js')
	.pipe(gulp.dest('./src/libs/angular'));
});

gulp.task('router-ui', function() {
	return gulp.src('node_modules/angular-ui-router/release/angular-ui-router.min.js')
	.pipe(gulp.dest('./src/libs/angular-ui-router'));
});

gulp.task('design-lite', function() {
	return gulp.src('node_modules/material-design-lite/material.min.{js,css}')
	.pipe(gulp.dest('./src/libs/design-lite'));
});

gulp.task('build:libs', gulp.parallel('angular', 'router-ui', 'design-lite'));