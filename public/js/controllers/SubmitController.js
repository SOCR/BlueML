angular.module('SubmitCtrl', []).controller('SubmitController', function($scope, $http) {
	console.log('in submit controller');
	// console.log(Results);
	$scope.uploadOwnTestFile = function() {

        var trainFile = document.getElementById("test-input").files[0];
        console.log(trainFile);
        if (trainFile == null){
            alert("Please specify training data path");
            return;
        }
        var formData = new FormData();
        formData.append('file', trainFile);
		$http.post("http://localhost:8080/rest/training/datasets/upload", formData).then(
		    function (data){
		        console.log("Upload successfully!");
		    },
		    function(data){
		        console.log("Upload failed!");
		    });
    };
});



// $http.post("http://localhost:8080/rest/training/datasets/upload", formData)
// .then(
//     function (data){
//         console.log("Upload successfully!");
//     },
//     function(data){
//         console.log("Upload failed!");
//     });





// angular.module('ResultsCtrl', []).controller('ResultsController', function($scope, $http) {
//     console.log('in results controller');
//     // console.log(Results);
//     $scope.getResults = function() {
//         $http.get("http://localhost:8080/rest/results").then(function (res) {
//             console.log(res);
//             $scope.res = res.data;
//             $scope.disease = res.data.disease;

//             $scope.diagnosis = function () {
//                 if ($scope.disease == "none") return false;
//                 return true;
//             }

//         });
//     };
// });
