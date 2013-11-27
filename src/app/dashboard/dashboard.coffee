angular.module("dashboard", [])

.config(["$routeProvider", ($routeProvider) ->
  $routeProvider.when "/",
    templateUrl: "dashboard/dashboard.tpl.html"
    controller: "DashboardCtrl"
])

.controller "DashboardCtrl", ["$scope", "$location", ($scope, $location) ->
  # nothing... for now
]
