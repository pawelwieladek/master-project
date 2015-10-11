var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-spawn-mocha');
var webpack = require('webpack');
var electronPath = require('electron-prebuilt');
var spawn = require('child_process').spawn;
var stdio = require('stdio');
var del = require('del');
var assign = Object.assign || require('object-assign');
var electron = require('gulp-electron');
var rename = require('gulp-rename');

var packageJson = require('./package.json');

var options = stdio.getopt({
    'watch': { key: 'w', description: 'Watch changes', 'default': false }
});

process.env.NODE_ENV = 'production';

var webpackTask = function(params) {
    return function(callback) {
        var config = require(params.config);

        if (options.watch) {
            config = assign(config, { watch: true });
        }

        var callbackCalled = false;

        return webpack(config, function(err, stats) {
            if (err) throw new gutil.PluginError('webpack', err);
            gutil.log('[webpack]', stats.toString({
                colors: true,
                children: false,
                chunks: false,
                modules: false
            }));
            if (!callbackCalled) {
                callbackCalled = true;
                callback();
            }
        });
    }
};

gulp.task('clear', function (callback) {
    del([ './dist', './release' ], callback);
});

gulp.task('package-json', ['clear'], function() {
    return gulp.src('./app/package.json.template')
        .pipe(rename('package.json'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('renderer:html', ['clear'], function () {
    return gulp.src([ './app/renderer/index.html' ])
        .pipe(gulp.dest('./dist/app/'));
});

gulp.task('renderer:scripts', ['clear'], webpackTask({ config: './config/webpack-renderer.config' }));
gulp.task('browser:scripts', ['clear'], webpackTask({ config: './config/webpack-browser.config' }));

gulp.task('browser:init', ['clear'], function () {
    return gulp.src([ './app/browser/init.js' ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('browser', ['browser:scripts', 'browser:init']);

gulp.task('renderer', ['renderer:scripts', 'renderer:html']);

gulp.task('build', ['renderer', 'browser', 'package-json']);

gulp.task('run', ['build'], function() {
    spawn(electronPath, ['.'], { stdio: 'inherit' });
});

gulp.task('test', function () {
    return gulp.src(['test/**/*.test.js'], { read: false })
        .pipe(mocha({
            compilers: 'js:babel/register',
            reporter: 'dot',
            require: 'test/setup.js'
        }));
});

gulp.task('electron', ['build'], function() {

    gulp.src('')
        .pipe(electron({
            src: './dist',
            packageJson: packageJson,
            release: './release',
            cache: './cache',
            version: 'v0.30.4',
            packaging: true,
            platforms: ['darwin-x64', 'win32-ia32'],
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                    icon: './app/renderer/icons/logo.icns'
                },
                win: {
                    "version-string": packageJson.version,
                    "file-version": packageJson.version,
                    "product-version": packageJson.version
                }
            }
        }))
        .pipe(gulp.dest(''));
});