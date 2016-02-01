var webpack                = require('webpack');
var autoprefixer           = require('autoprefixer');
var postcssImport          = require('postcss-import');
var postcssVars            = require('postcss-simple-vars');
var postcssNested          = require('postcss-nested');
var postcssCalc            = require('postcss-calc');
var postcssInlineComment   = require('postcss-inline-comment');
var SvgStore               = require('webpack-svgstore-plugin');
var path                   = require('path');
var PORT = 8070;

var paths = {
	src: path.join(__dirname, '/src'),
	dist: './dist',
	distAbsolute: __dirname + '/dist'
};

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
			}),
			postcssInlineComment, autoprefixer, postcssVars, postcssNested, postcssCalc
		];
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			'whatwgfetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
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
				target: 'http://127.0.0.1:4300'
				// secure: false,
				// changeOrigin: true
			}
		},
		historyApiFallback: true
	}
};

module.exports = config;
