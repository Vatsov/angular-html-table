/*
 Concatenate files.
 https://github.com/gruntjs/grunt-contrib-concat
 */

module.exports = {
	dist: {
		files: {
			'<%= config.dist %>/assets/scripts/scripts.js':  '<%= config.app %>/assets/scripts/*.js'
		}
	}
};