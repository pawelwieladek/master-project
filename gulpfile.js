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

var paths = {
    dest: './dist',
    html: {
        src: './app/view/index.html',
        dest: './dist/app/'
    },
    init: './app/core/init.js'
};

gulp.task('clear', function (callback) {
    del([paths.dest], callback);
});

gulp.task('view:html', ['clear'], function () {
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
            gutil.log('[webpack]', stats.toString());
            if (!callbackCalled) {
                callbackCalled = true;
                callback();
            }
        });
    }
};

gulp.task('view:scripts', ['clear'], webpackTask({ config: './webpack-view.config' }));
gulp.task('core:scripts', ['clear'], webpackTask({ config: './webpack-core.config' }));

gulp.task('core:init', ['clear'], function () {
    return gulp.src([paths.init])
        .pipe(gulp.dest(paths.dest));
});

gulp.task('core', ['core:scripts', 'core:init']);

gulp.task('view', ['view:scripts', 'view:html']);

gulp.task('build', ['view', 'core']);

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