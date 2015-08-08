var htmlTableNS = htmlTableNS || {};

;(function (ns, window, document, undefined) {
	"use strict";

	var HtmlTable = function _htmlTable (containers, data, columns, renders, options) {
		var $table,
			$container,
			initialized = false,
			sortInfo = {},
			paginationInfo = {},
			rowData = data;

		function _init() {
			$container = document.getElementById(containers.table);

			_validateInputData();

			$table = document.createElement('table');
			$table.setAttribute("class", "table table-striped");
			$table.insertAdjacentHTML('beforeend', '<thead></thead><tbody></tbody>');
			$container.appendChild($table);

			_postInitialization();
		};

		function _validateInputData() {
			if ($container === null) {
				throw new Error("Container cannot be found");
			}

			if (columns.constructor.toString().indexOf("Array") < 0) {
				throw new Error("Columns data type have to be array");
			}

			if (columns.length < 1) {
				throw new Error("Cannot create table without columns");
			}
		}

		function _postInitialization() {
			initialized = true;
			_createHeader();
			_sort(options.sort.orderBy, options.sort.ascending);
			addEvents();
		}

		function listeners() {
			return {
				onTableHeaderClick: function(event) {
					_sort(event.target.cellIndex);
				},
				onPaginationClick: function(event) {
					_navigateTo(event.target.dataset.index);
				}
			} 
		} 
		
		function addEvents() {
			_getHeader().addEventListener('click', listeners().onTableHeaderClick, false);
			_getPagination().addEventListener('click', listeners().onPaginationClick, false);
		}
		
		function removeEvents() {
			_getHeader().removeEventListener('click', listeners().onTableHeaderClick, false);
			_getPagination().removeEventListener('click', listeners().onPaginationClick, false);
		}

		function _createHeader() {
			var index,
				columnsLength = columns.length,
				$tableHeaderRow = document.createElement('tr');

			for (index = 0; index < columnsLength; index++) {
				$tableHeaderRow.insertAdjacentHTML('beforeend', '<td>' + columns[index] + '</td>');
			}

			_setHeader($tableHeaderRow)
		}

		function _setHeader($headerRow) {
			var $tableHeader = _getHeader();
			$tableHeader.appendChild($headerRow);
		};

		function _getHeader() {
			return $table.getElementsByTagName('thead')[0];
		}

		function _setBody(bodyRows) {
			var $tableBody = _getBody();
			$tableBody.innerHTML = "";
			$tableBody.insertAdjacentHTML('beforeend', bodyRows);
		};

		function _getBody() {
			return $table.getElementsByTagName('tbody')[0];
		}

		function _generateRowHtml(row) {
			var index,
				columnsLength = columns.length,
				tableCells = '';


			for (index = 0; index < columnsLength; index++) {
				tableCells +=  _generateCellHtml(row[index], renders[index]);
			}

			return '<tr>' + tableCells + '</tr>';
		};

		function _generateCellHtml(cell, render) {
			var tableCell = '';

			tableCell = '<td>' + render(cell) + '</td>';

			return tableCell;
		};

		function _renderRows(range) {
			var start = range.start,
				end = range.end,
				tbody = $table.getElementsByTagName('tbody'),
				rows = '';

			for (start; start < end; start++) {
				rows += _generateRowHtml(data[start]);
			}

			_setBody(rows);
		};

		function _render(range) {
			if (!initialized) {
				return;
			}

			if (typeof range === 'undefined') {
				range = getRange();
			}

			if (data.slice(range.start, range.end).length === 0) {
				range.start = 0;
			}
			range.end = range.start + data.slice(range.start, range.start + paginationInfo.recordsPerPage).length;

			_updatePagination(range)
			_renderRows(range);
		};

		function _sort (column, ascending) {
			if (!initialized) {
				return;
			}

			if (column === sortInfo.sortedColumn && typeof ascending === 'undefined') {
				data.reverse();
				if (_getHeader().rows[0].cells[sortInfo.sortedColumn].getAttribute('class') === 'arrow arrow-up') {
					_getHeader().rows[0].cells[sortInfo.sortedColumn].setAttribute('class', 'arrow arrow-down');
				} else {
					_getHeader().rows[0].cells[sortInfo.sortedColumn].setAttribute('class', 'arrow arrow-up');
				}
			} else {
				typeof sortInfo.sortedColumn !== 'undefined' ? 
					_getHeader().rows[0].cells[sortInfo.sortedColumn].setAttribute('class', '') : '';

					data.sort(function(a, b) {
					if (a[column] < b[column]) {
						return -1;
					} else if (a[column] > b[column]) {
						return 1;
					} else {
						return 0;
					}
				});

				if (sortInfo.ascending === false) {
					data.reverse();
					_getHeader().rows[0].cells[column].setAttribute('class', 'arrow arrow-down');
				} else {
					console.log(_getHeader().rows[0].cells[column])
					_getHeader().rows[0].cells[column].setAttribute('class', 'arrow arrow-up');
				}
				sortInfo.ascending = ascending;
				sortInfo.sortedColumn = column;
			}

			_navigateTo();
		};

		function _filter() {
			
		};

		function _getPagination() {
			var $container = document.getElementById(containers.pagination);
			return $container.getElementsByTagName('ul')[0];
		};

		function _createPagination() {
			var $container = document.getElementById(containers.pagination),
				$pagination = document.createElement('ul');

			$pagination.setAttribute("class", "pagination");
			$container.appendChild($pagination);
			paginationInfo.recordsPerPage = options.pagination.recordsPerPage;
			paginationInfo.maxVisiblePages = options.pagination.maxVisiblePages;
		};

		function _updatePagination(range) {
			var $container = document.getElementById(containers.pagination),
				$pagination = $container.getElementsByTagName('ul')[0],
				currentPage = range.start === 0 ? 1 : (range.start / paginationInfo.recordsPerPage) + 1,
				previousPage  = currentPage <= 1 ? false : currentPage - 1,
				nextPage = data.length > range.start + paginationInfo.recordsPerPage ? currentPage + 1 : false,
				ltOtherPages = previousPage !== false ? currentPage - 1 : false,
				gtOtherPages = nextPage ? Math.ceil(data.length / paginationInfo.recordsPerPage) - currentPage : false,
				htmlPagination = '',
				numberOfltOtherPages = Math.ceil((paginationInfo.maxVisiblePages - 1) / 2),
				numberOfgtOtherPages = Math.ceil((paginationInfo.maxVisiblePages - 1) / 2),
				index;

				if (ltOtherPages === false) {
					numberOfgtOtherPages += numberOfltOtherPages;
				} else if (ltOtherPages < numberOfltOtherPages) {
					numberOfgtOtherPages += Math.abs(numberOfltOtherPages - ltOtherPages);
				}

				if (gtOtherPages === false) {
					numberOfltOtherPages += numberOfgtOtherPages;
				} else if (gtOtherPages < numberOfgtOtherPages) {
					numberOfltOtherPages += Math.abs(numberOfgtOtherPages - gtOtherPages);
				}

			if (previousPage !== false) {
				htmlPagination += '<li><a href="#" data-index="' + previousPage + '">previous page</a></li>';
			}

			if (ltOtherPages !== false) {
				for (index = currentPage - ltOtherPages; index < currentPage ;index++) {
					if (numberOfltOtherPages === 0) {
						break;
					}
					htmlPagination += '<li><a href="#" data-index="' + index + '">' + index + '</a></li>';
					numberOfltOtherPages--;
				}
			}

			htmlPagination += '<li class="active"><a href="#" data-index="' + currentPage + '">' + currentPage + '</a></li>';

			if (gtOtherPages !== false) {
				for (index = currentPage + 1; index < currentPage + gtOtherPages + 1; index++) {
					if (numberOfgtOtherPages === 0) {
						break;
					}
					htmlPagination += '<li><a href="#" data-index="' + index + '">' + index + '</a></li>';
					numberOfgtOtherPages --;
				}
			}

			if (nextPage) {
				htmlPagination += '<li><a href="#" data-index="' + nextPage + '">next page</a></li>';
			}

			$pagination.innerHTML = '';
			$pagination.insertAdjacentHTML('beforeend', htmlPagination);
		}

		function getRange(page) {
			if (typeof page !== 'undefined') {
				paginationInfo.page = page;
			} else if (typeof paginationInfo.page === 'undefined') {
				_createPagination();
				paginationInfo.page = options.pagination.currentPage;
			}

			return {
				start: (paginationInfo.page - 1) * paginationInfo.recordsPerPage,
				end: paginationInfo.page * paginationInfo.recordsPerPage
			};
		}

		function _navigateTo(page) {
			if (!initialized) {
				return;
			}

			var range = getRange(page);

			_render(range);
		};

		function _destroy() {
			removeEvents
		}

		_init();

		return {
			render: _render,
			sort: _sort,
			filter: _filter,
			getOptions: options,
			destroy: _destroy
		}
	};


	ns.HtmlTable = HtmlTable;

}(htmlTableNS, window, document));
