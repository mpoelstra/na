angular.module('AttenderingApp.factories').factory('Depot', function($resource){
	return $resource('../api/depot/pasnummer/:nummer', {nummer: '@pasnummer'});
});