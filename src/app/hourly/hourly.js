angular.module('hourly', ['restangular'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/hourly', {
    templateUrl:'hourly/hourly.tpl.html',
    controller:'HourlyCtrl',
    resolve: {
      stats: ['Restangular', function(Restangular){
        return Restangular.one('stats', 'hourly').get();
      }]
    }
  });
}])

.controller('HourlyCtrl', ['$scope', '$location', 'stats', function ($scope, $location, stats) {
  $scope.stats = stats;
}]);

