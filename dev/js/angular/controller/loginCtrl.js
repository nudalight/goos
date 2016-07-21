angular.module('app') 
  .controller('loginCtrl',
    ['$scope', 'authService',
      function($scope, authService){

        $scope.errors = {};

        $scope.actions = {
          login: function(){
            var passwordCorrect = authService.login($scope.form.username, $scope.form.password);
            if (!passwordCorrect){
              $scope.errors.password = 'Username or password is incorrect';
            } else {
              $scope.errors.password = '';
            }
          }
        };

  }]);