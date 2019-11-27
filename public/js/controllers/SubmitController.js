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
        formData.set('file', trainFile, trainFile.name);
        // formData.append('id', 'test');
        for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
         console.log("in submit controller!!!!");

         // console.log(formData);  
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/rest/testing/datasets/upload");
        request.send(formData);    
		// $http.post("/rest/testing/datasets/upload", formData, {headers: {'Content-Type':'multipart/form-data'}}).then(
		//     function (data){
		//         console.log("Upload successfully!");
		//     },
		//     function(data){
		//         console.log("Upload failed!");
		//     });
    };
});

