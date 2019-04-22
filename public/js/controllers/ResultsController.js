angular.module('ResultsController', []).controller('ResultsController', function($scope) {

	// $http.get("http://localhost:8080/rest/results").then(function (res) {
	// 	console.log(res);
 //        $scope.res = res.data;
 //        $scope.disease = res.data.disease;
        
	//     $scope.diagnosis = function () {
	//         if ($scope.disease == "none") return false;
	//         return true;
	//     }
	// });
	template = {
        filename: filename,
        disease: disease,
        model: "Neural Network Model",
        dataset: "Seizure Recognition Dataset",
        accuracy: "99%",
        symptoms: ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"],
        treatments: ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"]}
    $scope.res = template;
   	$scope.disease = template.disease;
        
    $scope.diagnosis = function () {
        if ($scope.disease == "none") return false;
        return true;
    }  
});