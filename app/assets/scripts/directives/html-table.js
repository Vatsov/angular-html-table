(function() {
angular
	.module('htmlTable')

	.directive('htmlTable', [
		function () {
			'use strict';

			return {
				templateUrl: 'assets/views/directives/html-table.html',
				restrict: 'A',
				replace: true,
				transclude: true,
				scope: {
					table: '=htTable',
					config: "=htConfig"
				},
				controller: ['$scope', '$q', 'htmlTableFactory',
					function($scope, $q, HtmlTable) {

						var htmlTable = {};

						function _initTable(data) {
							var config = {
								tableContainerID: 'table-container',
								paginationContainerID: 'table-pagination-container',
								data: data
							};
							htmlTable = new HtmlTable(config);
							$scope.table = htmlTable;
						}

						$scope.$watch('config', function(configReady) {
							if (configReady) {
								configReady.data.then(function (response) {
									response.renders = configReady.renders
									_initTable(response);
								}, function () {
									console.log('error')
								});
							}
						}, true);
					}
				],
				link: function postLink(scope, element, attrs) {

				}
			};
		}
	]);

})();
