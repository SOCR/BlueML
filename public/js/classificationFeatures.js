var app = angular.module('BlueML', []);

// app.controller('FeatureCtrl', function($scope){
//     $scope.features = {"QRS Interval": true, "S Amplitude": true, "PR Interval": true, "T Amplitude": true, "QT Interval": false,
//     "Q Amplitude": false, "T Interval": false, "P Amplitude": false, "P Interval": false, "R Amplitude": false};
// });

app.controller('FeatureCtrl', function($scope){
    $http.get('/features').then(function(data) {
       $scope.features = data;
    });
});