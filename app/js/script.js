myApp = angular.module('AttenderingApp',['ngResource','angular-flexslider']);

myApp.config(function($routeProvider){
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
})

myApp.factory('Studiezaal', function($resource){
	return  {

		passen: $resource('../api/studiezaal/pasnummer/:nummer', {nummer: '@pasnummer'}, {
						save: {
							method: 'PUT'
						}
    			}),
		mededeling: $resource('../api/studiezaal/mededeling')
	}
});



myApp.factory('Depot', function($resource){
	return $resource('../api/depot/pasnummer/:nummer', {nummer: '@pasnummer'});
});


myApp.filter('formatpasnummer', function(){
	return function(number) {
		var formattednumber = '';
		if (number) {
			var leadingzeros = '';
			for (var i = 0; i < (3 - number.length); i++) {
				leadingzeros += '0';
			}

			formattednumber = '' + leadingzeros + number;
		}
		return formattednumber;
	};

});


myApp.directive('depotpas', function() {
	return {
		restrict: "E",
		replace: true,
		template: '<a class="nr" href="#" blockdefault><span>{{item.pasnummer | formatpasnummer}}</span></a>',
		link: function(scope, element, attrs){

			var setEnabledClass = scope.$eval(attrs.setenabledclass);

			if (setEnabledClass) {
				element.addClass('enabled');
			} else {
				element.removeClass('enabled');
			}

			var setSelectedClass = scope.$eval(attrs.setselectedclass);

			if (setSelectedClass) {
				element.addClass('selected');
			} else {
				element.removeClass('selected');
			}

			element.bind('click', function(e) {
				angular.element(".selected").removeClass('selected');

				scope.$apply(attrs.itemselected);

				var setSelectedClass = scope.$eval(attrs.setselectedclass);

				if (setSelectedClass) {
					element.addClass('selected');
				} 

			});

		}
	}
});

myApp.directive('easteregg', function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.bind('click', function(){
				var eastereggOn = scope.$eval(attrs.easteregg);

				if (eastereggOn) {
					$('body').addClass('comic');
				}
			});
		}
	}
})


myApp.directive('refreshtimer', function($timeout) {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {

			setInterval(function() {
				scope.$apply(attrs.refreshfunction);
			}, parseInt(attrs.refreshtimer));

		}
	}

});

myApp.directive('blockdefault', function() {
    return { 
    	restrict: "A",
    	link: function(scope, element, attrs) {
        	$(element).click(function(event) {
           		 event.preventDefault();
        	});
    	}
	}
});

myApp.directive('fancybox', function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {

			$(element).click(function(event){
				
				if ((attrs.fancyboxinit) && (attrs.fancyboxinit.length > 0)) {
					scope.$apply(attrs.fancyboxinit);
				}

				$.fancybox.open();
				event.preventDefault();
			});

			$(element).fancybox();

			$(attrs.href + ' .submit').unbind('click');
			$(attrs.href + ' .submit').click(function(event) {

				if (scope.$apply(attrs.fancyboxok)) {
					$.fancybox.close();
				}

				event.preventDefault();
			})


		}
	}
})



myApp.controller('StudiezaalEditCtrl', function($scope, Studiezaal){


	$scope.getPassen = function() {
		var rowsize = 20;
		$scope.currentpas = $scope.currentpas || null;
		$scope.editstate = '';

		var currentrow = [];
		//Studiezaal.pasnummers().query(function(pasnummers){
		Studiezaal.passen.query(function(pasnummers){		
			var passen = {
				rows: []
			};

			for (var i = 0; i < pasnummers.length;i++) {
				if ((i % rowsize == 0) && (i > 0)) {
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

	};


	$scope.selectPas = function(pas) {

		if ($scope.currentpas != pas) {
			$scope.currentpas = pas;
		} else {
			$scope.currentpas = null;
		}

	}

	$scope.togglePasState = function() {
		if ($scope.currentpas) {
			var pas = $scope.currentpas;

			pas.ingeschakeld = (pas.ingeschakeld == '1' ? '0' : '1');
			pas.$save(function() {
				$scope.getPassen();
			});



		}
	}
	$scope.getPassen();

});

myApp.controller('DepotCtrl', function($scope, Depot){

	var maxpascount = 10;
	var numberofcols = 2;
	var colsize = Math.floor(maxpascount / numberofcols);

	$scope.getPassen = function() {

		var currentcol = [];
		Depot.query(function(pasnummers){
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
		})
	}

	$scope.getPassen();
});


myApp.controller('DepotEditCtrl', function($scope, Depot, Studiezaal, $filter){


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
		if (($scope.mededeling) && ($scope.mededeling.length <= 400)) { 
			var melding = new Studiezaal.mededeling({mededeling: $scope.mededeling});
			melding.$save();
			return true;
		} else {
			return false;
		}
	}

	$scope.getPassen();
});






myApp.controller('StudiezaalCtrl',function($scope, Studiezaal){



	$scope.getPassen = function() {
	var pagesize = 32;
	var rowsize = 8;

	Studiezaal.passen.query(function(pasnummers){


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

		Studiezaal.mededeling.query(function(mededeling) {
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


		})
		//$scope.melding ="Vandaag is de studiezaal open tot 16:00";


	});
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

