var autoprefixer           = require('autoprefixer');
var postcssVars            = require('postcss-simple-vars');
var postcssColorFunction   = require('postcss-color-function');
var postcssNested          = require('postcss-nested');
var postcssCalc            = require('postcss-calc');
var postcssInlineComment   = require('postcss-inline-comment');

module.exports = [
	postcssInlineComment,
	autoprefixer,
	postcssVars,
	postcssColorFunction,
	postcssNested,
	postcssCalc
];
