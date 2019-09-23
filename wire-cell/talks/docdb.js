function DocDBCtrl($scope, $http) {
  $scope.today = new Date();
  $http.get('files.json').
    success(function(data) {
      $scope.files = data;
      $scope.nFiles = $scope.files.length;
    }).
    error(function () {
      alert("DocDBCtrl: cannot find json file");
    });

}
