var myApp = angular.module('AttenderingApp',['ngResource','angular-flexslider']);

myApp.config(function($routeProvider){
	$routeProvider.when('/studiezaal/', {
		templateUrl: 'tpl/studiezaal.tpl',
		controller: 'StudiezaalCtrl'
	})
	.when('/studiezaal/edit', {
		templateUrl: 'tpl/studiezaaledit.tpl',
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



myApp.directive('depotpas', function() {
	return {
		restrict: "E",
		replace: true,
		template: "<a class='nr href='#'><span>{{item.pasnummer | formatpasnummer}}</span></a>",
		link: function(scope, element, attrs){

			if (scope.item.ingeschakeld == "1") {
				element.addClass('enabled');
			}

			element.bind('click', function(e) {
				angular.element(".selected").removeClass('selected');
				element.addClass('selected');
				scope.$apply(attrs.itemselected);
			});
		}
	}
});

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


myApp.controller('StudiezaalEditCtrl', function($scope, Studiezaal){


	$scope.getPassen = function() {
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

		//if ($scope.currentpas) {
		//	$scope.currentpas.event.srcElement.style.cssText.replace('font-weight: bold','');
		//	$scope.currentpas.event.srcElement.style.cssText += 'font-weight:normal';
		//}

		$scope.currentpas = pas;

		/*
		if (pas.ingeschakeld == '1') {
			$scope.editstate = 'uitschakelen';
		} else {
			$scope.editstate = 'inschakelen';
		}
		*/					

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



myApp.controller('StudiezaalCtrl',function($scope, Studiezaal){



	$scope.getPassen = function() {
	var pagesize = 32;
	var rowsize = 8;

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

		allitems.pages.push({
			pagetype: 'melding',
			pagecontent: "Dit is een melding"
		})

		$scope.passen = allitems;
		//$scope.melding ="Vandaag is de studiezaal open tot 16:00";


	});
	}

	$scope.flexsliderBefore = function(slider) {

	}

	$scope.flexsliderStart = function(slider) {
		                //alert(slider.count);
                slider.find('.meter').animate({
                    width: '100%'
                }, 9000, 'linear', function() {
                    // Animation complete.
                    //slider.find('.meter').css('width','0%');
                });
	}

	$scope.flexsliderAfter = function(slider) {
		   //alert(slider.count);
           slider.find('.meter').css('width','0%');
           slider.find('.meter').animate({
                    width: '100%'
                }, 9000, 'linear', function() {
                    // Animation complete.
                    // slider.find('.meter').css('width','0%');
                });
	}



	$scope.getPassen();


});

