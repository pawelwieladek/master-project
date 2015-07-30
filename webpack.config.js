var excluded = /(node_modules|bower_components|build)/;

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