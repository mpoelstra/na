angular.module('AttenderingApp.filters',[]).filter('formatpasnummer', function(){
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
