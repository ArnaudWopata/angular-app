angular.module('app', [
  'ngRoute',
  'restangular',
  'dashboard',
  'hourly',
  'directives.hourlyGraph',
  'templates.app',
  'templates.common']);

//TODO: move those messages to a separate module
angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError':'Route change error'
});

// angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//   $locationProvider.html5Mode(true);
// }]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]);
