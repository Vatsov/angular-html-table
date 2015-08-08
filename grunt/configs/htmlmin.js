/*
 Minify HTML.
 https://github.com/gruntjs/grunt-contrib-htmlmin
 */

module.exports = {
	dist: {
		options: {
			collapseWhitespace: true,
			removeComments: true,
			collapseBooleanAttributes: false,
			removeAttributeQuotes: false,
			removeRedundantAttributes: false,
			useShortDoctype: false,
			removeEmptyAttributes: false,
			removeOptionalTags: false
		},
		files: [{
			expand: true,
			cwd: '<%= config.dist %>',
			src: [
				'*.html'
			],
			dest: '<%= config.dist %>'
		}]
	}
};