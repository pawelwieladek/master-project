var excluded = /(node_modules|bower_components|dist)/;

module.exports = {
    entry: {
        'child': './app/browser/child/child',
        'main': './app/browser/main/main'
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
