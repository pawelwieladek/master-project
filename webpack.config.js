var excluded = /(node_modules|bower_components|build)/;

module.exports = {
    entry: {
        app: './app/view/scripts/app.js',
        child: './app/core/child.js'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    target: 'atom',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: excluded,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                exclude: excluded,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                exclude: excluded,
                loader: 'style!css!sass'
            }
        ]
    }
};
