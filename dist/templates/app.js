angular.module('templates.app', ['dashboard/dashboard.tpl.html', 'hourly/hourly.tpl.html', 'yearly/yearly.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<h4>Dashboard</h4>\n" +
    "<a href=\"/#hourly\">Hourly asked questions</a>\n" +
    "<a href=\"/#yearly\">Yearly asked questions per service</a>\n" +
    "");
}]);

angular.module("hourly/hourly.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hourly/hourly.tpl.html",
    "<h4>Hourly asked questions</h4>\n" +
    "<hourly-graph values='stats'></hourly-graph>\n" +
    "");
}]);

angular.module("yearly/yearly.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("yearly/yearly.tpl.html",
    "<h4>Yearly asked questions per service</h4>\n" +
    "");
}]);
