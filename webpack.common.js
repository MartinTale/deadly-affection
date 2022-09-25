const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(mp3|wav|ogg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "src/audio", to: "audio" },
				{ from: "src/assets", to: "./" },
				{ from: "src/service-worker.js", to: "service-worker.js" },
				{ from: "src/manifest.json", to: "manifest.json" },
				{ from: "src/robots.txt", to: "robots.txt" },
			],
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
	optimization: {
		runtimeChunk: 'single',
		usedExports: true,
	},
};
