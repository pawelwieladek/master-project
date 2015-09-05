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
    core: './app/core/*.js'
};

gulp.task('clear', function (callback) {
    del([paths.dest], callback);
});

gulp.task('view:html', ['clear'], function () {
    return gulp.src([paths.html.src])
        .pipe(gulp.dest(paths.html.dest));
});

var scriptsCallbackCalled = false;

gulp.task('view:scripts', ['clear'], function(callback) {
    var config = require('./webpack.config');

    if (options.watch) {
        config = assign(config, { watch: true });
    }

    return webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString());
        if (!scriptsCallbackCalled) {
            scriptsCallbackCalled = true;
            callback();
        }
    });
});

gulp.task('view', ['view:scripts', 'view:html']);

gulp.task('core', ['clear'], function () {
    return gulp.src(paths.core).pipe(gulp.dest(paths.dest));
});

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