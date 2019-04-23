angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	console.log("in app_routes.js");
	$routeProvider

		// home page
		.when('http://localhost:8080/rest/testing/datasets/upload', {

			templateUrl: 'views/index.html',
			controller: 'SubmitController' 
		})


	$locationProvider.html5Mode(true);

}]);