angular.module('SubmitCtrl', []).controller('SubmitController', function($scope, $http) {
	console.log('in submit controller');
	// console.log(Results);
	$scope.uploadOwnTestFile = function() {

        var trainFile = document.getElementById("test-input").files[0];
        // console.log(trainFile);
        if (trainFile == null){
            alert("Please specify training data path");
            return;
        }
        var formData = new FormData();
        formData.append('file', trainFile);
         console.log("in submit controller!!!!");

         console.log(trainFile);

		$http.post("http://localhost:8080/rest/testing/datasets/upload", formData).then(
		    function (data){
		        console.log("Upload successfully!");
		    },
		    function(data){
		        console.log("Upload failed!");
		    });
    };
});

