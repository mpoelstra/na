angular.module('AttenderingApp.controllers').controller('DepotCtrl', function($scope, Depot){

	var maxpascount = 10;
	var numberofcols = 2;
	var colsize = Math.floor(maxpascount / numberofcols);

	$scope.getPassen = function() {

		var currentcol = [];
		Depot.query({}, function(pasnummers){
			var passen = {cols:[]};
			var pascount = (pasnummers.length < maxpascount ? pasnummers.length : maxpascount);

			for (var i = 0; i < pascount;i++) {
				if ((i % colsize == 0) && (i > 0)) {
					if (currentcol) {
						passen.cols.push(currentcol);
						currentcol = [];
					}
				}
				pasnummers[i].volgnummer = i + 1;
				currentcol.push(pasnummers[i]);
			}

			if (currentcol.length > 0) {
				passen.cols.push(currentcol);
			}	


			$scope.passen = passen;
			$scope.pascount = pasnummers.length;
		}, function() {
			setTimeout(function() {
				$scope.getPassen();
			}, 10000)
		})
	}

	$scope.getPassen();
});
