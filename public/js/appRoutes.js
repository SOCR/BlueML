angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	console.log("in app_routes.js");
	$routeProvider

		// home page
		.when('http://localhost:8080/rest/training/datasets/upload', {
			// console.log("inside app_routes.js");

			// templateUrl: 'views/index.html',
			// controller: 'ResultsController',
			controller: 'SubmitController' 
		})


	$locationProvider.html5Mode(true);

}]);