angular.module('app')
  .controller('registerCtrl', function($scope){
    // validate fields

    $scope.state = {
      step: 2
    };

    $scope.errors = {
      form: undefined
    };

    $scope.actions = {};

    $scope.actions.stepUp = function(nodeForm){

      console.log($scope.formOne);

      console.log('step Two', nodeForm.$valid);

      if (nodeForm.$valid){

        $scope.state.step = 2;

      } else {

        // throw error

      }


    };


    // on BUTT.click wtite to LOCKER
    // swith to next page



  });