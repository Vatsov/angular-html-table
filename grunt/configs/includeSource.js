/*
 Includes sources into HTML files automatically.
 Used to include the compiled css into the html.
 https://github.com/jwvdiermen/grunt-include-source
 */

module.exports = {
	options: {
		basePath: '<%= config.dist %>',
		includePath: 'assets/styles/'
	},
	dist: {
		files: {
			'<%= config.dist %>/index.html': '<%= config.dist %>/index.html'
		}
	}
};