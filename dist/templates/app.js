angular.module('templates.app', ['dashboard/dashboard.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<h4>Dashboard</h4>\n" +
    "");
}]);
