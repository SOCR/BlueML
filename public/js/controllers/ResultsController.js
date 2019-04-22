angular.module('ResultsController', []).controller('ResultsController', function($scope) {

	$http.get("http://localhost:8080/rest/results").then(function (res) {
		console.log(res);
        $scope.res = res.data;
        $scope.disease = res.data.disease;
        
	    $scope.diagnosis = function () {
	        if ($scope.disease == "none") return false;
	        return true;
	    }
	}
});