

(function (app) {
  'use strict';

    app.controller('SimpleArrayCtrl', ['$scope', function SimpleArrayCtrl($scope) {

    $scope.featuresArray = ['QRS Interval', 'S Amplitude', 'PR Interval', 'T Amplitude','QT Interval','Q Amplitude','T Interval','P Amplitude','P Interval','R Amplitude'];

    // selected fruits
    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(featureName) {
      var idx = $scope.selection.indexOf(featureName);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selection.push(featureName);
      }
    };

  }]);
})(angular.module('app', []));
