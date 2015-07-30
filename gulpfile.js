var gulp = require("gulp");
var gutil = require("gulp-util");
var mocha = require("gulp-spawn-mocha");
var webpack = require("webpack");
var electron = require("electron-prebuilt");
var spawn = require("child_process").spawn;

gulp.task("html", function () {
    return gulp.src(["./src/app/browser/index.html"])
        .pipe(gulp.dest("./build"));
});

gulp.task("scripts", function(callback) {
    webpack(require("./webpack.config"), function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task("main", function () {
    return gulp.src(["./src/app/browser/main.js"])
        .pipe(gulp.dest("./build"));
});

gulp.task("run", ["html", "scripts", "main"], function() {
    spawn(electron, ["."], { stdio: "inherit" });
});

gulp.task("test", function () {
    return gulp.src(["test/**/*.test.js"], { read: false })
        .pipe(mocha({
            compilers: "js:babel/register",
            reporter: "dot",
            require: "test/setup.js"
        }));
});