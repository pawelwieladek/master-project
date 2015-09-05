var excluded = /(node_modules|bower_components|dist)/;

module.exports = {
    entry: {
        "child": './app/core/child/child',
        "main": './app/core/main/main'
    },
    output: {
        path: './dist/',
        filename: '[name].js',
        library: 'core',
        libraryTarget: 'commonjs2'
    },
    target: 'atom',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: excluded,
                loader: 'babel'
            }
        ]
    }
};
