angular.module('ResultsCtrl', []).controller('ResultsController', function($scope, $http) {
    console.log('in results controller');
    // console.log(Results);
    $scope.getResults = function() {
        $http.get("/rest/results").then(function (res) {
            console.log(res);
            $scope.res = res.data;
            $scope.disease = res.data.disease;

            $scope.diagnosis = function () {
                if ($scope.disease == "none") return false;
                return true;
            }

        });
    };
});
