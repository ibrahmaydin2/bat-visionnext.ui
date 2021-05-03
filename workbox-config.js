module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{html,json,css,png,ico,ttf,woff,eot,woff2,svg,jpg,js}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js',
	maximumFileSizeToCacheInBytes: 5000000
};