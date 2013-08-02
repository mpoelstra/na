angular.module('AttenderingApp.directives',[]).directive('depotpas', function() {
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
})
.directive('easteregg', function() {
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
.directive('refreshtimer', function($timeout) {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {

			setInterval(function() {
				scope.$apply(attrs.refreshfunction);
			}, parseInt(attrs.refreshtimer));

		}
	}

})
.directive('blockdefault', function() {
    return { 
    	restrict: "A",
    	link: function(scope, element, attrs) {
        	$(element).click(function(event) {
           		 event.preventDefault();
        	});
    	}
	}
})
.directive('fancybox', function() {
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
});
