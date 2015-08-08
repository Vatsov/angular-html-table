/*
 Copy files and folders.
 https://github.com/gruntjs/grunt-contrib-copy
 */

module.exports = {
	dist: {
		files: [{
			expand: true,
			dot: true,
			cwd: '<%= config.app %>/assets',
			dest: '<%= config.dist %>/assets',
			src: [
				'feeds/**/*'
			]
		},
		{
			expand: true,
			dot: true,
			cwd: '<%= config.app %>',
			dest: '<%= config.dist %>',
			src: 'index.html'
		}]
	}
};
