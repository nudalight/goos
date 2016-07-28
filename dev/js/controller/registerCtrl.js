angular
  .module('goos')
  .controller('registerCtrl', registerCtrl)
;

registerCtrl
  .$inject = ['$scope', 'authService', 'helperFactory']
;


function registerCtrl($scope, authService, helperFactory){

  $scope.state = {
    step: 1
  };
 
  // костыль
  $scope.formTwo = {
    birthday: new Date(0)
  };



  $scope.actions = {
    stepUp: function (nodeForm) {

      if (nodeForm.$valid) {

        $scope.state.step++;

        if ($scope.state.step == 3) {
          var formsData = helperFactory.mergeObjects($scope.formOne, $scope.formTwo);
          authService.register(formsData);
        }

      }

    }
  };




}