const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './node_modules/animate.css/animate.min.css',
    './src/css/style.css'
];

const jsFiles = [
    './node_modules/wowjs/dist/wow.min.js',
    './src/js/main.js'
];

function htmls() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

function pages() {
    return gulp.src('./src/pages/**/*.html')
        .pipe(gulp.dest('./build/pages'))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function imgs() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream());
}

function watch() {
        browserSync.init({
            server: {
                baseDir: "./build/"
            }
        });


    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/img/**/*', imgs);
    gulp.watch('./src/pages/**/*', pages);
    gulp.watch('./src/js/**/*', scripts);
    gulp.watch("./src/**/*.html", htmls);
}

function clean () {
    return del(['build/*'])
}

gulp.task('htmls', htmls);
gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.series(clean,
        gulp.parallel(htmls, pages, styles, scripts, imgs)
    ));
gulp.task('dev', gulp.series('build', 'watch'));
