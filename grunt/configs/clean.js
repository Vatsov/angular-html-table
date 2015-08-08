/*
 Clear files and folders.
 https://github.com/gruntjs/grunt-contrib-clean
 */

module.exports = {
	dist: ['.tmp', '<%= config.dist %>/*'],
	server: '.tmp'
};