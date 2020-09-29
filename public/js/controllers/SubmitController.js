angular.module('SubmitCtrl', []).controller('SubmitController', function($scope, $http) {
	console.log('in submit controller');
	$scope.uploadOwnTestFile = function() {

        const trainFile = document.getElementById("test-input").files[0];
        if (trainFile == null){
            alert("Please specify training data path");
            return;
        }

        let fd = new FormData();
        fd.set('file', trainFile, trainFile.name);
        const endPoint = '/rest/testing/datasets/upload';

        fetch(endPoint, {
            method: 'post',
            body: fd
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            console.log(text);
        });

         // console.log(formData);      
		// $http.post("/rest/testing/datasets/upload", formData, {headers: {'Content-Type':'multipart/form-data'}}).then(
		//     function (data){
		//         console.log("Upload successfully!");
		//     },
		//     function(data){
		//         console.log("Upload failed!");
		//     });
    };
});

