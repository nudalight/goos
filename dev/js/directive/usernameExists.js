angular
  .module('goos')
  .directive('usernameExists', usernameExists)
;

usernameExists
  .$inject = ['locker', '$cookies', '$log']
;


function usernameExists(locker, $cookies, $log) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {

      function myValidation(value) {

        var isValid = validateMe();
        ctrl.$setValidity('usernameexists', isValid);

        $log.warn('un isValid: ', isValid);

        function validateMe(){
          var
            U = locker.namespace('user=' + value),
            cond1 = U.has('username'),
            username = $cookies.get('username'),
            result = (username == value) || (username != value && !cond1)
          ;

          return result;
        }

        return value;
      }

      ctrl.$parsers.push(myValidation);
    }
  }
}