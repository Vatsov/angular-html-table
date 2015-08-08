(function() {
angular
	.module('htmlTable')

	.service('htmltableRenders', [
		function () {
			'use strict';

			function _getRender(name) {
				return renders[name];
			}
			
			var renders = {
				simpleRender: function(data) {
					return data;
				},
				dateRender: function(data) {
					var date = new Date(data);
					return date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
				},
				roundFloatRender: function(data) {
					return Math.round(data).toFixed(2);
				}
			}

			return {
				get: _getRender
			};
		}
	]);

})();
