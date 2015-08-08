(function() {
angular
	.module('htmlTable')

	.factory('htmlTableFactory', [
		'$window',
		function ($window) {
			'use strict';

			var HtmlTable = function (args) {
				var table = {};

				function _convertTableConfig(args) {
					return {
						containers: {
							table: args.tableContainerID,
							pagination: args.paginationContainerID
						},
						data: args.data.records,
						columns: args.data.columns,
						renders: args.data.renders,
						options: {
							sort: {
								orderBy: args.data.orderBy - 1,
								ascending: args.data.orderType === 'ASC'
							},
							pagination: {
								recordsPerPage: args.data.recordsPerPage,
								currentPage: args.data.currentPage,
								maxVisiblePages: 3
							},
							filter: {
								text: args.data.searchText
							}
						}
					};
				}

				function _buildHtmlTable() {
					var config = _convertTableConfig(args),
						containers = config.containers,
						data = config.data,
						columns = config.columns,
						renders = config.renders,
						options = config.options;

					table = new window.htmlTableNS.HtmlTable(containers, data, columns, renders, options);
				}

				function _initHtmlTable() {
					_buildHtmlTable();
				}

				_initHtmlTable();

				return table;
			};

			return HtmlTable;
		}
	])

})();
