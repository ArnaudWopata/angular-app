angular.module('resources.stats', ['restangular']);
angular.module('resources.stats').factory('Stats', ['Restangular', function (Restangular) {
  return {
    all: Restangular.all('stats').getList(),
    one: function(id){
      Restangular.one('stats', id).get();
    }
  };
}]);
