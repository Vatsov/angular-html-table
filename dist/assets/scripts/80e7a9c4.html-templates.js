angular.module("templates-main",["assets/views/directives/html-table.html","assets/views/main-view.html"]);angular.module("assets/views/directives/html-table.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("assets/views/directives/html-table.html",'<div data-ng-transclude=""></div>')}]);angular.module("assets/views/main-view.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("assets/views/main-view.html",'<div class="row"><div class="col-md-12 text-center"><div data-html-table="" data-ht-config="mainViewCtrl.htConfig" data-ht-table="htDataSet"><div id="table-container" class="table-responsive"></div><div id="table-pagination-container"></div></div></div></div>')}]);