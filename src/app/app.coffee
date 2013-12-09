angular.module "app", [
  "ngRoute",
  "restangular",
  "dashboard",
  "hourly",
  "yearly",
  "directives.hourlyGraph",
  "directives.yearlyGraph",
  "templates.app",
  "templates.common"]

# # Commented for now because python serv does not auto redirect to index
# angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
#   $locationProvider.html5Mode(true);
# }]);

angular.module("app").controller "AppCtrl", ["$scope", ($scope) ->
  $scope.$on "$routeChangeError", (event, current, previous, rejection) ->
    console.log "errors.route.changeError", "error", {},
      rejection: rejection
]

angular.module('app').config(['$sceDelegateProvider', 'RestangularProvider', ($sceDelegateProvider, RestangularProvider)->
    $sceDelegateProvider.resourceUrlWhitelist ['self', '/^http:\/\/192.168.1.72:3000/']
    RestangularProvider.setBaseUrl 'http://192.168.1.72:3000/'
])
