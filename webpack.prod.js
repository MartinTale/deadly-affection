const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		runtimeChunk: false,
	},
	// plugins: [
	// 	new WorkboxPlugin.GenerateSW({
	// 		// these options encourage the ServiceWorkers to get in there fast
	// 		// and not allow any straggling "old" SWs to hang around
	// 		clientsClaim: true,
	// 		skipWaiting: true,
	// 	}),
	// ],
});
