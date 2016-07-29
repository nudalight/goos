angular
  .module('goos')
  .controller('loginController', loginCtrl)
;

loginCtrl
  .$inject = ['$scope', 'authService', '$log']
;


function loginCtrl($scope, authService, $log) {

  $scope.errors = {};

  $scope.actions = {
    login: login
  };

  
  function login() {
    var passwordCorrect = authService.login($scope.form.username, $scope.form.password);
    if (!passwordCorrect) {
      $scope.errors.password = 'Username or password is incorrect';
    } else {
      $scope.errors.password = '';
    }
  }

}

