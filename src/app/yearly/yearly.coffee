angular.module('yearly', ['restangular'])

.config(['$routeProvider', ($routeProvider)->
  $routeProvider.when '/yearly', {
    templateUrl: 'yearly/yearly.tpl.html'
    controller: 'YearlyCtrl'
    resolve:
      stats: ['Restangular', (Restangular)->
        Restangular.one('queries', 'on_a_year.json').get()
      ]
  }
])

.controller('YearlyCtrl', ['$scope', 'stats', ($scope, stats)->
  $scope.stats = stats
])
