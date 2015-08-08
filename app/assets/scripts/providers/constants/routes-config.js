angular
	.module('htApp')

	.constant('routesConfig', (function () {

		'use strict';

		var rootRoutesConfig = {
			people: 'assets/feeds/people.json'
		};

		var routesConfig = {
			people: {
				all: function () {
					return rootRoutesConfig.people;
				}
			}
		}

		return routesConfig;
	})());
