angular
  .module('goos')
  .controller('summaryController', summaryCtrl)
;

summaryCtrl
  .$inject = ['authService', '$scope', 'locker', 'md5', 'validateObj', '$log']
;


function summaryCtrl(authService, $scope, locker, md5, validateObj, $log){

  var U = locker.namespace('user=' + authService.user.username);
  var userData = U.all();

  $scope.form = userData;
  $scope.form.birthday = new Date(userData.birthday);

  $scope.actions = {
    saveForm: saveForm
  };

  function saveForm(nodeForm){
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


}