(function() {
angular
	.module('htApp')

	.controller('MainViewController', [
		'$scope', 'peopleData',  'htmltableRenders',
		function ($scope, peopleData, htmltableRenders) {
			'use strict';

			var _this = this,
				htmlTableConfig = {};

			htmlTableConfig.renders = [
				htmltableRenders.get('simpleRender'),
				htmltableRenders.get('simpleRender'),
				htmltableRenders.get('dateRender'),
				htmltableRenders.get('roundFloatRender')
			];
			htmlTableConfig.data = peopleData.getData();
			_this.htConfig = htmlTableConfig;

			$scope.$on('$destroy', function () {
				_this.htConfig = null;
			});
		}
	]);

})();
