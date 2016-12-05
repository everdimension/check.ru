const webpack								 = require('webpack');
const SvgStore							 = require('webpack-svgstore-plugin');
const HtmlWebpackPlugin			 = require('html-webpack-plugin');
const path									 = require('path');
const postcssImport					 = require('postcss-import');
const postcssLoaders				 = require('./tools/postcssLoaders');
const fileExists						 = require('./tools/fileExists');
const nodeEnv							   = process.env.NODE_ENV || 'development';
const isProduction					 = nodeEnv === 'production';
const isDevelopment					 = !isProduction;
const PORT									 = 8070;

const envExists = fileExists('./.env');
if (!envExists) { console.warn('.env file not found'); }
if (isProduction) {
	if (!envExists) { process.exit(1); }
	require('dotenv').config();
} else {
	if (!envExists) { console.warn('falling back to .env_sample'); }
	require('dotenv').config(envExists ? {} : { path: './.env_sample' });
}

const paths = {
	src: path.join(__dirname, '/src'),
	dist: './dist',
	distAbsolute: `${__dirname}/dist`
};

const entry = [
	`${paths.src}/index.js`
];

if (isDevelopment) {
	entry.unshift(
		`webpack-dev-server/client?http://0.0.0.0:${PORT}`,
		'webpack/hot/only-dev-server'
	);
}

const output = {
	path: paths.distAbsolute,
	publicPath: '/',
	filename: 'app.bundle.js'
};

const wpModule = {
	loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: 'style!css!postcss'
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
		}, {
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
			loader: 'url-loader?limit=10000'
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

const htmlWebpackPluginConfig = {
	inject: true,
	template: path.join(paths.src, 'index.html')
};

if (isProduction) {
	htmlWebpackPluginConfig.googleAnalytics = {
		trackingId: 'UA-XXXXXXPP-X',
		pageViewOnLoad: true
	};
	htmlWebpackPluginConfig.production = true;
} else {
	// DEVELOPMENT
	htmlWebpackPluginConfig.development = true;
}

const plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(nodeEnv),
		__AD_CLIENT_KEY__: JSON.stringify(process.env.AD_CLIENT_KEY),
		__AD_SLOT_NUMBER__: JSON.stringify(process.env.AD_SLOT_NUMBER),
		__DEV__: isDevelopment
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

if (isProduction) {
	plugins.push(
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				unsafe: true,
				warnings: false,
				screw_ie8: true
			}
		})
	);
}


// ***************

module.exports = {
	entry,
	output,
	module: wpModule,

	postcss(wp) {
		return [
			postcssImport({
				addDependencyTo: wp
			})
		].concat(postcssLoaders);
	},

	plugins,

	devtool: 'source-map',

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
				target: 'http://127.0.0.1:8888/checkru_server/public'
				// target: 'http://new.check.ru/api',
				// secure: false,
				// changeOrigin: true,
			}
		},
		historyApiFallback: true
	}
};
