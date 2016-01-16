var webpack                = require('webpack');
var autoprefixer           = require('autoprefixer');
var postcssImport          = require('postcss-import');
var postcssVars            = require('postcss-simple-vars');
var postcssNested          = require('postcss-nested');
var postcssCalc            = require('postcss-calc');
var postcssInlineComment   = require('postcss-inline-comment');
var SvgStore               = require('webpack-svgstore-plugin');
var path                   = require('path');

var paths = {
	src: path.join(__dirname, '/src'),
	dist: './dist',
	distAbsolute: __dirname + '/dist'
};

var config = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
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

	postcss: function () {
		return [postcssInlineComment, autoprefixer, postcssImport, postcssVars, postcssNested, postcssCalc];
	},

	devServer: {
		contentBase: paths.dist,
		host: '0.0.0.0',
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api/*': {
				target: 'https://instaflower.herokuapp.com',
				secure: false,
				changeOrigin: true
			}
		}
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			'whatwgfetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new SvgStore(path.join(paths.src, 'svg', '**/*.svg'), 'svg', {
			name: '[hash].spritve.svg',
			chunk: 'app'
		})
	]
};

module.exports = config;
