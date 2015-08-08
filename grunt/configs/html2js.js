/*
 Compiles AngularJS templates to a JavaScript template, which can then be loaded and cached with one request only.
 https://github.com/karlgoldstein/grunt-html2js
 */

module.exports = {
	options: {
		rename: function (moduleName) {
			return moduleName.replace('../app/', '');
		},
		htmlmin: {
			collapseWhitespace: true,
			removeComments: true
		}
	},
	main: {
		src: '<%= config.app %>/assets/views/**/*.html',
		dest: '<%= config.dist %>/assets/scripts/html-templates.js'
	}
};