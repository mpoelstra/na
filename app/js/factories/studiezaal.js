angular.module('AttenderingApp.factories',[]).factory('Studiezaal', function($resource){
	return  {

		passen: $resource('../api/studiezaal/pasnummer/:nummer', {nummer: '@pasnummer'}, {
						save: {
							method: 'PUT'
						}
    			}),
		mededeling: $resource('../api/studiezaal/mededeling')
	}
});
