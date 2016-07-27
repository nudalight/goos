angular.module('goos')
  .controller('summaryCtrl', summaryCtrl)
;

summaryCtrl
  .$inject = ['$rootScope', '$scope', 'locker', 'md5', '$window']
;


function summaryCtrl($rootScope, $scope, locker, md5, $window){

  var U = locker.namespace('user=' + $rootScope.user.username);
  var userData = U.all();

  $scope.form = userData;
  $scope.form.birthday = new Date(userData.birthday);

  $scope.actions = {
    saveForm: function(){
      for (var key in $scope.form){

        if (key == 'password'){
          // this will not save hashed password
          if ($scope.form.password) continue;

          $scope.form[key] = md5.createHash($scope.form.username + $scope.form.password);
        }

        U.put(key, $scope.form[key]);
        // $window.location.reload();
      }
      console.warn(U.all());
    }
  };


}