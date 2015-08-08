/*
 Minify javascript.
 https://github.com/gruntjs/grunt-contrib-uglify
 */

module.exports = {
	options: {
		mangle: false,
		preserveComments: false,
		compress: false,
		beautify: false,
		noSqueeze: true,
		codegen: { 'quote_keys': false}
	},
	dist: {
		files: {
			'<%= config.dist %>/assets/scripts/scripts.js': '<%= config.dist %>/assets/scripts/scripts.js',
			'<%= config.dist %>/assets/scripts/lib.js': '<%= config.dist %>/assets/scripts/lib.js',
			'<%= config.dist %>/assets/scripts/html-templates.js': '<%= config.dist %>/assets/scripts/html-templates.js'
		}
	}
};
