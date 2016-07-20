angular.module('app') 
  .controller('loginCtrl',
    ['$scope', 'authService',
      function($scope, authService){

    $scope.actions = {
      login: function(){
        authService.login($scope.form.username, $scope.form.password);
      }
    };

  }]);