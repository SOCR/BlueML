var app = angular.module('BlueML', []);
app.controller("adCntrl", function($scope){
  $scope.dataset = ['Stanford','MIT', 'Physiobank','Berkley'];
  $scope.dsize = $scope.dataset.length;
  $scope.datasetSelected = [1];
  for(var i = 0; i < $scope.dsize; i++) {
    $scope.datasetSelected[i]=i;
  };
  
})
