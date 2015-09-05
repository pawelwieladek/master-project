var excluded = /(node_modules|bower_components|dist|src)/;

module.exports = {
    entry: {
        "app/scripts/bundle": './app/view/scripts/app.js'
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