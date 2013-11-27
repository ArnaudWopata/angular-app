angular.module('dashboard', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl:'dashboard/dashboard.tpl.html',
    controller:'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', function ($scope, $location) {
}]);
