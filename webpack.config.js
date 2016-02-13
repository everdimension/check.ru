var webpack                = require('webpack');
var SvgStore               = require('webpack-svgstore-plugin');
var HtmlWebpackPlugin      = require('html-webpack-plugin');
var path                   = require('path');
var postcssImport          = require('postcss-import');
var postcssLoaders         = require('./tools/postcssLoaders');
var isProduction           = process.env.NODE_ENV === 'production';
var isDevelopment          = !isProduction;
var PORT                   = 8070;

var paths = {
	src: path.join(__dirname, '/src'),
	dist: './dist',
	distAbsolute: __dirname + '/dist'
};

var htmlWebpackPluginConfig = {
	inject: true,
	template: path.join(paths.src, 'index.html')
};

if (isProduction) {
	htmlWebpackPluginConfig.googleAnalytics = {
		trackingId: 'UA-XXXXXXPP-X',
		pageViewOnLoad: true
	};
}

var config = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:' + PORT,
		'webpack/hot/only-dev-server',
		paths.src + '/index.js'
	],
	output: {
		path: paths.distAbsolute,
		publicPath: '/',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
			},
			{
				test: /\.css$/,
				loader: 'style!css!postcss'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}
		]
	},

	postcss: function (webpack) {
		return [
			postcssImport({
				addDependencyTo: webpack
			})
		].concat(postcssLoaders);
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin(htmlWebpackPluginConfig),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new SvgStore(path.join(paths.src, 'svg', '**/*.svg'), 'svg', {
			name: '[hash].sprite.svg',
			chunk: 'app'
		})
	],

	devServer: {
		hostname: '0.0.0.0',
		port: PORT,
		contentBase: paths.dist,
		publicPath: '/',
		hot: true,
		proxy: {
			'/api/*': {
				// target: 'http://127.0.0.1:4300'
				target: 'http://127.0.0.1:8888/checkru_server/public'
				// secure: false,
				// changeOrigin: true
			}
		},
		historyApiFallback: true
	}
};

module.exports = config;
