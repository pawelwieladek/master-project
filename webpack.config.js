var excluded = /(node_modules|bower_components|build)/;

module.exports = {
    entry: {
        app: './src/app/browser/scripts/app.js',
        child: './src/app/browser/child.js'
    },
    output: {
        path: './build/',
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
                loader: "style!css!sass"
            }
        ]
    }
};