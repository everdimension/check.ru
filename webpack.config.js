var webpack                = require('webpack');
var SvgStore               = require('webpack-svgstore-plugin');
var HtmlWebpackPlugin      = require('html-webpack-plugin');
var path                   = require('path');
var postcssImport          = require('postcss-import');
var postcssLoaders         = require('./tools/postcssLoaders');
var fileExists             = require('./tools/fileExists');
const nodeEnv              = process.env.NODE_ENV || 'development';
var isProduction           = nodeEnv === 'production';
var isDevelopment          = !isProduction;
var PORT                   = 8070;

var envExists = fileExists('./.env');
if (!envExists) { console.warn('.env file not found'); }
if (isProduction) {
	if (!envExists) { process.exit(1); }
	require('dotenv').config();
} else {
	if (!envExists) { console.warn('falling back to .env_sample'); }
	require('dotenv').config(envExists ? {} : { path: './.env_sample' });
}

var paths = {
	src: path.join(__dirname, '/src'),
	dist: './dist',
	distAbsolute: __dirname + '/dist'
};

var entry = [
	paths.src + '/index.js'
];

if (isDevelopment) {
	entry.unshift(
		'webpack-dev-server/client?http://0.0.0.0:' + PORT,
		'webpack/hot/only-dev-server'
	);
}

var output = {
	path: paths.distAbsolute,
	publicPath: '/',
	filename: 'app.bundle.js'
};

var wpModule = {
	loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'react-hot!babel'
		}, {
			test: /\.css$/,
			loader: 'style!css!postcss'
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
		}, {
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
			loader: 'url-loader?limit=10000',
		}
	]
};

if (isDevelopment) {
	wpModule.preLoaders = [
		{
			test: /\.jsx?$/,
			exclude: /(node_modules|lib)/,
			loader: 'eslint'
		}
	];
}

var htmlWebpackPluginConfig = {
	inject: true,
	template: path.join(paths.src, 'index.html')
};

if (isProduction) {
	htmlWebpackPluginConfig.googleAnalytics = {
		trackingId: 'UA-XXXXXXPP-X',
		pageViewOnLoad: true
	};
} else {
	// DEVELOPMENT
	htmlWebpackPluginConfig.development = true;
}

var plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(nodeEnv),
		__AD_CLIENT_KEY__: JSON.stringify(process.env.AD_CLIENT_KEY),
		__AD_SLOT_NUMBER__: JSON.stringify(process.env.AD_SLOT_NUMBER),
		__DEV__: isDevelopment,
	}),
	new HtmlWebpackPlugin(htmlWebpackPluginConfig),
	// new webpack.ProvidePlugin({
	// 	'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	// }),
	new SvgStore(path.join(paths.src, 'svg', '**/*.svg'), 'svg', {
		name: '[hash].sprite.svg',
		chunk: 'app'
	})
];

if (isDevelopment) {
	plugins.unshift(
		new webpack.HotModuleReplacementPlugin()
	);
}


// ***************

module.exports = {
	entry: entry,
	output: output,
	module: wpModule,

	postcss: function (webpack) {
		return [
			postcssImport({
				addDependencyTo: webpack
			})
		].concat(postcssLoaders);
	},

	plugins: plugins,

	devServer: {
		hostname: '0.0.0.0',
		port: PORT,
		contentBase: paths.dist,
		publicPath: '/',
		hot: true,
		stats: 'errors-only',
		proxy: {
			'/api/*': {
				// target: 'http://127.0.0.1:4300',
				target: 'http://127.0.0.1:8888/checkru_server/public',
				// target: 'http://new.check.ru/api',
				// secure: false,
				// changeOrigin: true,
			}
		},
		historyApiFallback: true
	}
};
