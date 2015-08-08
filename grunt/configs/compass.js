/*
 Compile Sass to CSS using Compass.
 https://github.com/gruntjs/grunt-contrib-compass
 */

module.exports = {
	options: {
		sassDir: '<%= config.app %>/assets/styles',
		cssDir: '.tmp/assets/styles',
		javascriptsDir: '<%= config.app %>/assets/scripts',
		relativeAssets: true
	},
	dist: {
		options: {
			debugInfo: false
		}
	}
};
