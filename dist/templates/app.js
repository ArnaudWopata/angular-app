angular.module('templates.app', ['dashboard/dashboard.tpl.html', 'hourly/hourly.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<h4>Dashboard</h4>\n" +
    "<a href=\"/#hourly\">Hourly asked questions</a>\n" +
    "");
}]);

angular.module("hourly/hourly.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hourly/hourly.tpl.html",
    "<h4>Hourly asked questions</h4>\n" +
    "<hourly-graph val='stats'></hourly-graph>\n" +
    "");
}]);
