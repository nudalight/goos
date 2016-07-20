angular.module('app') 
  .controller('summaryCtrl',
    ['$rootScope', '$scope', 'locker', 'md5', '$window',
      function($rootScope, $scope, locker, md5, $window){

        var U = locker.namespace('user=' + $rootScope.user.username);

        $scope.form = U.all();

        $scope.actions = {
          saveForm: function(){
            for (var key in $scope.form){
              if (key == 'repassword'){
                continue;
              }

              if (key == 'password'){
                $scope.form[key] = md5.createHash($scope.form.username + $scope.form.password);
              }

              U.put(key, $scope.form[key])
              $window.location.reload();
            }
            console.warn(U.all());
          }
        };

  }]);