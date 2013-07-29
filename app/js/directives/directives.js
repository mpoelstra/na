myApp = angular.module('AttenderingApp',['ngResource','angular-flexslider']);

myApp.directive('depotpas', function() {
	return {
		restrict: "E",
		replace: true,
		template: '<a class="nr" href="#" blockdefault><span>{{item.pasnummer | formatpasnummer}}</span></a>',
		link: function(scope, element, attrs){

/*
			if (scope.item.ingeschakeld == "1") {
				element.addClass('enabled');
			}

*/

			var setEnabledClass = scope.$eval(attrs.setenabledclass);
			if (setEnabledClass) {
				element.addClass('enabled');
			}

			var setSelectedClass = scope.$eval(attrs.setselectedclass);

			if (setSelectedClass) {
				element.addClass('selected');
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
