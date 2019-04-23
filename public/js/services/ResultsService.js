angular.module('ResultsService', []).factory('Results', ['$http', function($http) {
	// return {
	// 	get : function() {
 //            return $http.get('/rest/results');
 //        },
	// }
	return $http.get("http://localhost:8080/rest/results");
}]);