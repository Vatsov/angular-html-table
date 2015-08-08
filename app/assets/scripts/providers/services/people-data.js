(function() {

angular
	.module('htApp')

	.service('peopleData', [
		'$http', '$q', 'routesConfig',
		function ($http, $q, routesConfig) {
			'use strict';

			function _getData() {
				var deferred = $q.defer();

				$http.get(routesConfig.people.all())
					.success(function(response) {
						deferred.resolve(response);
					})
					.error(function() {
						deferred.reject();
					});

				return deferred.promise;
			}

			return {
				getData: _getData
			};
		}
	]);

})();
