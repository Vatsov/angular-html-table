/*
 Compress CSS files.
 https://github.com/gruntjs/grunt-contrib-cssmin
 */

module.exports = {
	dist: {
		files: [{
			'<%= config.dist %>/assets/styles/main.css': '.tmp/assets/styles/main.css'
		}]
	}
};
