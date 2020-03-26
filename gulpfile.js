const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const path = require('path');

gulp.task('sass', () => {
    return gulp.src("./build/sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('pug', () => {
    return gulp.src('./build/pug/index.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('subpages', () => {
    return gulp.src('./build/pug/pages/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(rename(function(file) {
            file.dirname = path.join(file.dirname, file.basename);
            file.basename = 'index';
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', () => {
    return gulp.src(
        [
            'node_modules/babel-polyfill/dist/polyfill.js',
            './build/js/app.js'
        ])
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('render-images', () => {
    return gulp.src(['./build/assets/images/*'])
        .pipe(gulp.dest('./dist/assets/images'))
});

gulp.task('render-docs', () => {
    return gulp.src(['./build/assets/documents/*'])
        .pipe(gulp.dest('./dist/assets/documents'))
});

gulp.task('watch', () => {
    gulp.watch('./build/sass/**/*.scss', gulp.series('sass'))
    gulp.watch('./build/pug/**/*.pug', gulp.series('pug'))
    gulp.watch('./build/pug/pages/*.pug', gulp.series('subpages'))
    gulp.watch('./build/js/app.js', gulp.series('scripts'))
    gulp.watch('./build/assets/images/*', gulp.series('render-images'))
    gulp.watch('./build/assets/documents/*', gulp.series('render-docs'))
});

gulp.task('reload', gulp.series('sass', 'pug', 'subpages', 'scripts','render-images', 'render-docs'));