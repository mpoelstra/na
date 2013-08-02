angular.module('AttenderingApp',['ngResource','angular-flexslider', 'AttenderingApp.controllers', 'AttenderingApp.factories', 'AttenderingApp.filters', 'AttenderingApp.directives']).config(function($routeProvider){
	$routeProvider.when('/studiezaal/', {
		templateUrl: 'tpl/studiezaal.tpl',
		controller: 'StudiezaalCtrl'
	})
	.when('/studiezaal/edit', {
		templateUrl: 'tpl/studiezaaledit.tpl',
		controller: 'StudiezaalEditCtrl'
	})
	.when('/depot/',{
		templateUrl: 'tpl/depot.tpl',
		controller: 'DepotCtrl'
	})
	.when('/depot/edit', {
		templateUrl: 'tpl/depotedit.tpl',
		controller: 'DepotEditCtrl'
	})
	.otherwise({
		template: 'bestaat niet'
	});
});


















