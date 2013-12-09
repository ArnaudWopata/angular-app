angular.module('hourly', ['restangular'])

.config(['$routeProvider', ($routeProvider)->
  $routeProvider.when '/hourly', {
    templateUrl: 'hourly/hourly.tpl.html'
    controller: 'HourlyCtrl'
    resolve:
      stats: ['Restangular', (Restangular)->
        Restangular.one('queries', 'on_a_week.json').get()
      ]
  }
])

.controller('HourlyCtrl', ['$scope', 'stats', ($scope, stats)->
  $scope.stats = stats
])
