/*
 Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views).
 This is the final task, which replaces the newly produced files into the html. It also understands rev (revision) patterns.
 https://github.com/yeoman/grunt-usemin
 */

module.exports = {
	html: '<%= config.dist %>/*.html',
		css: '<%= config.dist %>/assets/styles/{,*/}*.css',
		options: {
			dirs: ['<%= config.dist %>']
	}
};