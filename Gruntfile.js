(function () {
	'use strict';

	module.exports = function (grunt) {
		// load all grunt tasks
		require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
		require('time-grunt')(grunt);

		// set default options
		if (grunt.option('browsers') !== undefined) {
			grunt.option('browsers', grunt.option('browsers').split(','));
		} else {
			grunt.option('browsers', ['ChromeMax']);
		}

		// configurable paths
		var config = {
			config: {
				app: 'app',
				dist: 'dist'
			}
		};

		// default task
		grunt.registerTask('default', 'build');

		// load all tasks
		grunt.loadTasks('./grunt/tasks');

		// load all configurations
		function loadConfig(path) {
			var glob = require('glob'),
				object = {},
				key;

			glob.sync('*', {cwd: path}).forEach(function(option) {
				key = option.replace(/\.js$/,'');
				object[key] = require(path + option);
			});

			return object;
		}

		grunt.util._.extend(config, loadConfig('./grunt/configs/'));
		grunt.initConfig(config);
	};
}());