var myApp = angular.module('AttenderingApp',['ngResource']);

myApp.config(function($routeProvider){
	$routeProvider.when('/studiezaal/', {
		templateUrl: 'studiezaal.html',
		controller: 'StudiezaalCtrl'
	})
	.when('/studiezaal/edit', {
		templateUrl: 'studiezaaledit.html',
		controller: 'StudiezaalEditCtrl'
	})
	.otherwise({
		template: 'bestaat niet'
	});
})

myApp.factory('Studiezaal', function($resource){
	return $resource('../api/studiezaal/pasnummer/:nummer', {nummer: '@pasnummer'}, {
						save: {
							method: 'PUT'
						}
    			});
});



myApp.factory('Depot', function($resource){
	return [1,2,3];
});


myApp.filter('formatpasnummer', function(){
	return function(number) {
		var leadingzeros = '';
		for (var i = 0; i < (3 - number.length); i++) {
			leadingzeros += '0';
		}

		var formattednumber = '' + leadingzeros + number;
		return formattednumber;
	};

});

myApp.controller('StudiezaalEditCtrl', function($scope, Studiezaal){

	var rowsize = 20;
	$scope.currentpas = null;
	$scope.editstate = '';

	var currentrow = [];
	//Studiezaal.pasnummers().query(function(pasnummers){
	Studiezaal.query(function(pasnummers){		
		var passen = {
			rows: []
		};

		for (var i = 0; i < pasnummers.length;i++) {
			if (i % rowsize == 0) {
				if (currentrow) {
					passen.rows.push(currentrow);
					currentrow = [];
				}
			}
			currentrow.push(pasnummers[i]);
		}

		if (currentrow.length > 0) {
			passen.rows.push(currentrow);
		}

		$scope.passen = passen;
	});

	$scope.selectPas = function(event, pas) {

		if ($scope.currentpas) {
			$scope.currentpas.event.srcElement.style.cssText = 'font-weight:normal';
		}

		$scope.currentpas = {
							 "event": event,
							 pas: pas
							};

		if (pas.ingeschakeld == '1') {
			$scope.editstate = 'uitschakelen';
		} else {
			$scope.editstate = 'inschakelen';
		}					

		$scope.currentpas.event.srcElement.style.cssText = 'font-weight: bold';
	}

	$scope.togglePasState = function() {
		if ($scope.currentpas) {
			var pas = $scope.currentpas.pas;

			pas.ingeschakeld = (pas.ingeschakeld == '1' ? '0' : '1');
			pas.$save();



		}
	}


});



myApp.controller('StudiezaalCtrl',function($scope, Studiezaal){

	var pagesize = 32;
	var rowsize = 8;

	//Studiezaal.pasnummers().query(function(pasnummers){
	Studiezaal.query(function(pasnummers){


		var pasindex = 0;
		var allitems = {pages: []};
		var currentrow = {items: []};
		var currentpage = {rows:[]};
		var pageoffset = 0;

		for (var i = 0; i < pasnummers.length; i++) {
			if (pasnummers[i].ingeschakeld == '1') {

				var newpage = (((pasindex % pagesize) == 0) && (pasindex > 0));

				if (newpage) {
					pageoffset = pasindex;
				}

				var newrow = ((newpage || ((pasindex - pageoffset) % rowsize == 0)) && (pasindex > 0));

				if (newrow) {
					currentpage.rows.push(currentrow);
					currentrow = {items: []};
				}

				currentrow.items.push(pasnummers[i]);


				if (newpage) {
					allitems.pages.push(currentpage);
					currentpage = {rows:[]};
				}

				pasindex++;
			}

			if ((i==pasnummers.length - 1) && (currentrow.items.length > 0)){
				currentpage.rows.push(currentrow);
				allitems.pages.push(currentpage);
			}

		}

		$scope.passen = allitems;
	});

});

