/*
 Static file asset revisioning through content hashing.
 Used to produce unique files names for each build, so that browsers do not use cache between new builds.
 https://github.com/cbas/grunt-rev
 */

module.exports = {
	options: {
		encoding: 'utf8',
		algorithm: 'md5',
		length: 8
	},
	assets: {
		files: [{
			src: [
				'<%= config.dist %>/assets/scripts/*.js',
				'<%= config.dist %>/assets/styles/*.css'
			]
		}]
	}
};
