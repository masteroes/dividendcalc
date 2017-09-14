/*******************************************************************************
 *@file gulpfile.js contains details of all gulp tasks required
 *
 *@author : Vishnu Narayan Dubey
 ******************************************************************************/
'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var jsdoc = require("gulp-jsdoc");
var shrinkwrap = require('gulp-shrinkwrap');

var path     = require('path');
var fs       = require('fs');
var process = require("process");


//Gjsdoc task to generate the API Manual

gulp.task('eslint', function() {
    var target = path.resolve(__dirname, 'reports');
    return gulp.src(['util/*.js', './*.js'])
        .pipe(eslint())
        .pipe(eslint.format("html", function (results) {
            fs.writeFileSync(target + '/lint-results.html', results);
        }))
        // Break on failure to be super strict
        .pipe(eslint.failOnError());
});

//shrinkwrap-lock down dependencies
gulp.task('shrinkwrap', function () {
    return gulp.src('package.json')
        .pipe(shrinkwrap())      // just like running `npm shrinkwrap`
        .pipe(gulp.dest('./'));  // writes newly created `npm-shrinkwrap.json` to the location of your choice
});
// mocha test runner
gulp.task('mochaTest', function (cb) {
    gulp.src(['util/*.js', './*.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {

            process.env.NODE_ENV = 'unittest';
            var app = require('./server/server');

            gulp.src(['test/*-test.js'])
                                .pipe(mocha({ timeout: 10000 }))
                                .pipe(istanbul.writeReports({dir:'reports/coverage'}))// Creating the reports after tests runned
                                .on('end', function(){
                                    //Post Tests finished
                                });

        });
});

gulp.task('createReportDir', function(callback){
    var dir = './reports';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    callback();
});

// default task
gulp.task('default', function (callback) {
    runSequence(
        'createReportDir',
        'eslint',
        'mochaTest','js-doc',
        function (error) {
            callback(error);
        });
});


gulp.task('build', ['default']);

//gulp.on('stop', function() { process.exit(0); });
