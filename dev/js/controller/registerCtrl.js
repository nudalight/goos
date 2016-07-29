angular
  .module('goos')
  .controller('registerCtrl', registerCtrl)
;

registerCtrl
  .$inject = ['$scope', 'authService', 'helperFactory']
;


function registerCtrl($scope, authService, helperFactory){

  var vm = $scope;

  vm.state = {
    step: 1
  };
 
  // костыль
  vm.formTwo = {
    birthday: new Date(0)
  };



  vm.actions = {
    stepUp: function (nodeForm) {

      if (nodeForm.$valid) {

        vm.state.step++;

        if (vm.state.step == 3) {
          var formsData = helperFactory.mergeObjects(vm.formOne, vm.formTwo);
          authService.register(formsData);
        }

      }

    }
  };




}