var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

var nodemonServerInit = function () {
    livereload.listen(1234);
};

gulp.task('build', ['css', 'index-js-minify', 'index-js-concat', 'post-js-minify', 'post-js-concat']);

gulp.task('css', function () {
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer({ browsers: ['last 2 versions'] }),
        cssnano()
    ];

    return gulp.src('assets/css/*.css')
        .pipe(postcss(processors))
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('assets/built/css'))
});

gulp.task('index-js-minify', function (cb) {
    var stream = gulp.src('assets/js/index/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js/index/min'))
    return stream;

})
gulp.task('index-js-concat', ['index-js-minify'], function (cb) {
    var stream = gulp.src('assets/js/index/min/*.js')
        .pipe(concat('index.built.js'))
        .pipe(gulp.dest('assets/built/js/'))
    return stream;
})
gulp.task('post-js-minify', function (cb) {
    var stream = gulp.src('assets/js/post/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js/post/min'))
    return stream;

})
gulp.task('post-js-concat', ['post-js-minify'], function (cb) {
    var stream = gulp.src('assets/js/post/min/*.js')
        .pipe(concat('post.built.js'))
        .pipe(gulp.dest('assets/built/js/'))
    return stream;

});
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['css']);
});

gulp.task('zip', ['css'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build']);
