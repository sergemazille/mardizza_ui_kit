'use strict';

// dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

// Scripts (ES6)
gulp.task('babelify', function () {
    let bundler = browserify('./src/script/main.js', {debug: true}).transform(babelify);

    bundler.bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('app.js')) //fichier de destination
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/script'));
});

// Style (sass)
gulp.task('style', function () {
    return gulp.src('./src/style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(postcss([ autoprefixer() ]))
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/style'));
});

// Fonts (move)
gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Watches
gulp.task('watch', function () {
    gulp.watch('./src/script/**/*.js', ['babelify']);
    gulp.watch('./src/style/**/*.scss', ['style']);
    gulp.watch('./src/fonts/**/*.*', ['fonts']);
});

// Default
gulp.task('default', ['deploy', 'watch']);

// Deploy only (without watch task)
gulp.task('deploy', ['babelify', 'style', 'fonts']);
