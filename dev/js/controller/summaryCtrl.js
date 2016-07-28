angular
  .module('goos')
  .controller('summaryCtrl', summaryCtrl)
;

summaryCtrl
  .$inject = ['$rootScope', '$scope', 'locker', 'md5', 'validateObj', '$log']
;


function summaryCtrl($rootScope, $scope, locker, md5, validateObj, $log){

  var U = locker.namespace('user=' + $rootScope.user.username);
  var userData = U.all();

  $scope.form = userData;
  $scope.form.birthday = new Date(userData.birthday);

  $scope.actions = {

    saveForm: function(nodeForm){
      nodeForm.$setPristine();

      for (var key in $scope.form){

        if (key == 'password'){
          var isNotHash = validateObj[key].isValid($scope.form[key]);
          if (isNotHash) {
            $scope.form[key] = md5.createHash($scope.form.username + $scope.form.password);
          }
        }

        U.put(key, $scope.form[key]);
      }

      $log.warn(U.all());
    }
  };


}