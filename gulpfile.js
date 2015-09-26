var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-spawn-mocha');
var webpack = require('webpack');
var electron = require('electron-prebuilt');
var spawn = require('child_process').spawn;
var stdio = require('stdio');
var del = require('del');
var assign = Object.assign || require('object-assign');

var options = stdio.getopt({
    'watch': { key: 'w', description: 'Watch changes', 'default': false }
});

process.env.NODE_ENV = 'production';

var paths = {
    dest: './dist',
    html: {
        src: './app/renderer/index.html',
        dest: './dist/app/'
    },
    init: './app/browser/init.js'
};

gulp.task('clear', function (callback) {
    del([paths.dest], callback);
});

gulp.task('renderer:html', ['clear'], function () {
    return gulp.src([paths.html.src])
        .pipe(gulp.dest(paths.html.dest));
});

var webpackTask = function(params) {
    return function(callback) {
        var config = require(params.config);

        if (options.watch) {
            config = assign(config, { watch: true });
        }

        var callbackCalled = false;

        return webpack(config, function(err, stats) {
            if (err) throw new gutil.PluginError('webpack', err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            if (!callbackCalled) {
                callbackCalled = true;
                callback();
            }
        });
    }
};

gulp.task('renderer:scripts', ['clear'], webpackTask({ config: './webpack-renderer.config' }));
gulp.task('browser:scripts', ['clear'], webpackTask({ config: './webpack-browser.config' }));

gulp.task('browser:init', ['clear'], function () {
    return gulp.src([paths.init])
        .pipe(gulp.dest(paths.dest));
});

gulp.task('browser', ['browser:scripts', 'browser:init']);

gulp.task('renderer', ['renderer:scripts', 'renderer:html']);

gulp.task('build', ['renderer', 'browser']);

gulp.task('run', ['build'], function() {
    spawn(electron, ['.'], { stdio: 'inherit' });
});

gulp.task('test', function () {
    return gulp.src(['test/**/*.test.js'], { read: false })
        .pipe(mocha({
            compilers: 'js:babel/register',
            reporter: 'dot',
            require: 'test/setup.js'
        }));
});