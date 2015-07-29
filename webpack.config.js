module.exports = {
    entry: './src/app/browser/scripts/app.js',
    output: {
        path: './build/',
        filename: 'app.js'
    },
    target: 'atom',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};