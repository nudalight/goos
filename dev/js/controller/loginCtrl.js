angular
  .module('goos')
  .controller('loginCtrl', loginCtrl)
;

loginCtrl
  .$inject = ['$scope', 'authService']
;


function loginCtrl($scope, authService) {

  $scope.errors = {};

  $scope.actions = {
    login: function () {
      var passwordCorrect = authService.login($scope.form.username, $scope.form.password);
      if (!passwordCorrect) {
        $scope.errors.password = 'Username or password is incorrect';
      } else {
        $scope.errors.password = '';
      }
    }
  }


}

