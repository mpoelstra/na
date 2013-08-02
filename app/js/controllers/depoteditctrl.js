angular.module('AttenderingApp.controllers').controller('DepotEditCtrl', function($scope, Depot, Studiezaal, $filter){


	$scope.getPassen = function() {
		var pagesize = 32;
		var rowsize = 8;

		$scope.nieuwepas = {
			pasnummer: null,
			mededeling: null
		}


		Depot.query(function(pasnummersunfiltered){
			var pasindex = 0;
			var allitems = {pages: []};
			var currentrow = {items: []};
			var currentpage = {rows:[]};
			var pageoffset = 0;

			var pasnummers = $filter('orderBy')(pasnummersunfiltered, function(pas) {
				return parseInt(pas.pasnummer);

			});

			for (var i = 0; i < pasnummers.length; i++) {
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
					allitems.pages.push({pagetype: 'passen',
										 pagecontent: currentpage
										});
					currentpage = {rows:[]};
				}

				pasindex++;

				if ((i==pasnummers.length - 1) && (currentrow.items.length > 0)){
					currentpage.rows.push(currentrow);
					allitems.pages.push({pagetype: 'passen',
										 pagecontent: currentpage
										});
				}

			}


			Studiezaal.mededeling.query(function(mededeling) {

				if ((mededeling.length) && (mededeling.length > 0)) {
					$scope.mededeling = mededeling[0].mededeling;
				} else {
					$scope.mededeling = '';
				}

				$scope.passen = allitems;
			})


		});
	}

	$scope.selectPas = function(pas) {
		if ($scope.currentpas != pas) {
			$scope.currentpas = pas;
		} else {
			$scope.currentpas = null;
		}
	}

	$scope.deletePas = function() {
		if ($scope.currentpas) {
			var pas = $scope.currentpas;

			pas.$delete(function() {
				$scope.currentpas = null;
				$scope.getPassen();
			});
		}

	}

	$scope.savePasChange = function() {
		if ((($scope.nieuwepas.pasnummer > 0) && ($scope.nieuwepas.pasnummer <= 200)) && 
			($scope.nieuwepas.mededeling ? $scope.nieuwepas.mededeling.length <= 50 : true)){
			var pas = new Depot($scope.nieuwepas);
			pas.$save(function() {
				$scope.currentpas = null;
				$scope.nieuwepas = null;
				$scope.getPassen();
			})
			return true;
		} else {
			return false;
		}

	}

	$scope.nieuwePas = function() {
		$scope.nieuwepas = {
			id: 0,
			pasnummer: null,
			mededeling: null
		}
	}

	$scope.wijzigPas = function() {
		$scope.nieuwepas = {
			id: $scope.currentpas.id,
			pasnummer: $scope.currentpas.pasnummer,
			mededeling: $scope.currentpas.mededeling
		}
	}

	$scope.saveMelding = function() {
		if ((!$scope.mededeling) || ($scope.mededeling.length <= 250)) { 
			var melding = new Studiezaal.mededeling({mededeling: $scope.mededeling});
			melding.$save();
			return true;
		} else {
			return false;
		}
	}

	$scope.getPassen();
});
