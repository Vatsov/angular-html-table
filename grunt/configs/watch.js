/*
 Run predefined tasks whenever watched file patterns are added, changed or deleted.
 https://github.com/gruntjs/grunt-contrib-watch
 */

module.exports = {
	compass: {
		files: [
			'<%= config.app %>/assets/styles/{,*/}*.{scss,sass}',
			'<%= config.app %>/assets/styles/sass-bootstrap/lib/*.{scss,sass}'
		],
		tasks: 'compass'
	},
	livereload: {
		options: {
			livereload: '<%= connect.options.livereload %>'
		},
		files: [
			'<%= config.app %>/{,*/}*.html',
			'{.tmp,<%= config.app %>}/assets/styles/{,*/}*.css',
			'{.tmp,<%= config.app %>}/assets/scripts/{,*/}*.js'
		]
	}
};