/*
 Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views).
 This is the preparation task, which simply analyzes the initial html and produces / updates grunt tasks for concat, minify, etc.
 These tasks can be executed later on.
 https://github.com/yeoman/grunt-usemin
 */

module.exports = {
	html: '<%= config.app %>/*.html',
	options: {
		dest: '<%= config.dist %>'
	}
};