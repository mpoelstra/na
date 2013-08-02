angular.module('AttenderingApp.controllers', []).controller('StudiezaalCtrl',function($scope, Studiezaal){



	$scope.getPassen = function() {
	var pagesize = 32;
	var rowsize = 8;

	Studiezaal.passen.query({}, function(pasnummers){


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
					allitems.pages.push({pagetype: 'passen',
										 pagecontent: currentpage
										});
					currentpage = {rows:[]};
				}

				pasindex++;
			}

			if ((i==pasnummers.length - 1) && (currentrow.items.length > 0)){
				currentpage.rows.push(currentrow);
				allitems.pages.push({pagetype: 'passen',
									 pagecontent: currentpage
									});
			}

		}

		Studiezaal.mededeling.query({},function(mededeling) {
			if ((mededeling.length) && (mededeling.length > 0) && (mededeling[0].mededeling.length > 0)) {
				allitems.pages.push({
					pagetype: 'melding',
					pagecontent: mededeling[0].mededeling
				});
			}

			$scope.passen = allitems;

			if (allitems.pages.length <= 1) {
				setTimeout(function(){
					$scope.getPassen();
				}, 10000);
			}


		}, $scope.onLoadError)
		//$scope.melding ="Vandaag is de studiezaal open tot 16:00";


	}, $scope.onLoadError);
	}

	$scope.onLoadError = function() {
		setTimeout(function(){
			$scope.getPassen();
		}, 10000);
	}

	$scope.flexsliderBefore = function() {
		$scope.currentSlide++;

		$scope.currentSlideType = $scope.passen.pages[$scope.currentSlide].pagetype;
	}

	$scope.flexsliderEnd = function() {
		$scope.lastSlide = true;
	}

	$scope.progressEnd = function() {
		if ($scope.lastSlide) {
			$scope.lastSlide = false;
			$scope.getPassen();
		}
	}

	$scope.flexsliderStart = function() {
		$scope.lastSlide = false;
		$scope.currentSlide = 0;
		$scope.currentSlideType = $scope.passen.pages[$scope.currentSlide].pagetype;
	}

	$scope.flexsliderAfter = function() {
 	}



	$scope.getPassen();


});
