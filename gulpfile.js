var gulp = require('gulp');
var connect = require('gulp-connect');
var pug = require('gulp-pug');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var htmlbeautify = require('gulp-html-beautify');
var postcss = require('gulp-postcss');
var cssimport = require('postcss-import');
var cssmqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var svginline = require('postcss-inline-svg');
var presetenv = require('postcss-preset-env');
var cssshort = require('postcss-short');
var cssnested = require('postcss-nested');
var cssadvancedvariables = require('postcss-advanced-variables');


var browsersList = [
    "last 3 versions",
    "ie >= 11"
];

// Parameters
function findParamArg(paramName, listCommands) {
    var index = listCommands.indexOf(paramName);
    if (index < 0) return null;
    var value = listCommands[index + 1];
    return value;
}

var pageName = findParamArg('-page', process.argv);
var cssName = findParamArg('-style', process.argv);
var htmlFile = "*";
var htmlPath = "**/*";
var cssFile = htmlFile;
var cssPath = htmlPath;

if (pageName) {
    htmlFile = pageName;
    htmlPath = pageName + '/' + pageName;

    if (!cssName) {
        cssFile = htmlFile;
        cssPath = htmlPath;
    } else if (cssName === "common") {
        cssFile = cssName;
        cssPath = cssFile + "/" + cssFile;
    }
}

// Server
gulp.task('connect', function () {

    connect.server({
        host: '0.0.0.0',
        root: 'layout',
        livereload: true
    });
});

// Reload
gulp.task('reload', function () {

    gulp.src([
            'layout/' + htmlFile + '.html',
            'layout/stylesheets/' + cssFile + '.css',
            '!layout/stylesheets/' + cssFile + '.min.css'
        ])
        .pipe(connect.reload());
});

// Pug
gulp.task('pug', function () {
    return gulp.src('layout/_pages/' + htmlPath + '.pug')
        .pipe(pug())
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest('layout/'));
});

// HTML beautify
gulp.task('htmlbeautify', function() {

    return gulp.src('layout/' + htmlFile + '.html')
        .pipe(htmlbeautify({
            indentSize: 4,
            end_with_newline: true
        }))
        .pipe(gulp.dest('layout/'));
});

// CSS
gulp.task('css', function () {

    return gulp.src('layout/_pages/' + cssPath + '.css')
        .pipe(postcss([
            cssimport(),
            cssadvancedvariables(),
            cssshort(),
            svginline(),
            presetenv({
                stage: 0,
                autoprefixer: {
                    grid: true,
                    browsers: browsersList,
                },
            }),
            cssnested(),
            cssmqpacker(),
        ]))
        .pipe(rename({
            dirname: '',
        }))
        .pipe(gulp.dest('layout/stylesheets/'));
});

// CSS minify
gulp.task('cssminify', function () {

    return gulp.src([
            'layout/stylesheets/' + cssFile + '.css',
            '!layout/stylesheets/' + cssFile + '.min.css'
        ])
        .pipe(postcss([
            cssnano({
                autoprefixer: false
            })
        ]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('layout/stylesheets/'));
});

// Flow 1
gulp.task('flow-1', function () {

    runSequence('pug', 'htmlbeautify', 'reload');
});

// Flow 2
gulp.task('flow-2', function () {

    runSequence('css', 'cssminify', 'reload');
});

// Build
gulp.task('build', function () {

    runSequence('css', 'cssminify', 'pug', 'htmlbeautify');
});

gulp.task('go', ['connect'], function () {

    gulp.watch([
        'layout/_blocks/**/*.pug',
        'layout/_pages/' + htmlPath + '.pug'
    ], ['flow-1']);

    gulp.watch([
        'layout/_blocks/**/*.css',
        'layout/_pages/' + cssPath + '.css'
    ], ['flow-2']);
});

gulp.task('default', function () {

});
