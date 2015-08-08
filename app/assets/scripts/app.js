(function() {
angular
	.module('htApp', [
		'ui.router',
		'htmlTable',
		'templates-main'
	])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			'use strict';

			$stateProvider
				.state('index', {
					url: '/',
					views: {
						'': {
							templateUrl: 'assets/views/main-view.html',
							controller:  'MainViewController as mainViewCtrl'
						}
					}
				})

			$urlRouterProvider.otherwise('/#');

		}
	]);

})();
