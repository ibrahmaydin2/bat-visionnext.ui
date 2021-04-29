module.exports = {
	globDirectory: "dist/",
	globPatterns: [
	  "**/*.{css,ico,png,html,js,woff2,eot,ttf,otf}"
	],
	swDest: "dist/sw.js",
	// Define runtime caching rules.
	runtimeCaching: [{
		// Match any request that ends with .png, .jpg, .jpeg or .svg.
		urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
		
		// Apply a cache-first strategy.
		handler: 'CacheFirst',
		
		options: {
			// Use a custom cache name.
			cacheName: 'images',
		
			// Only cache 20 images.
			expiration: {
			  maxEntries: 20,
			},
		},
	}],
};