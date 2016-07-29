angular
  .module('goos')
  .controller('registerController', registerCtrl)
;

registerCtrl
  .$inject = ['$scope', 'authService', 'helperFactory']
;


function registerCtrl($scope, authService, helperFactory){

  $scope.state = {
    step: 1
  };
 
  $scope.actions = {
    stepUp: stepUp
  };


  function stepUp(nodeForm) {

    if (nodeForm.$valid) {

      $scope.state.step++;

      if ($scope.state.step == 3) {
        var formsData = helperFactory.mergeObjects($scope.formOne, $scope.formTwo);
        authService.register(formsData);
      }

    }

  }


}