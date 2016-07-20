angular.module('app')
  .directive('usernameExists', ['locker', '$cookies', function(locker, $cookies) {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {

        function myValidation(value) {



          var isValid = validateMe();
          ctrl.$setValidity('usernameexists', isValid);

          console.warn('un isValid: ', isValid);

          function validateMe(){
            var U = locker.namespace('user=' + value);
            var cond1 = U.has('username');
            var username = $cookies.get('username');

            var result = (username == value) || (username != value && !cond1)

            console.log('hasLoginCheck: ', result);

            return result;
          }


          return value;

        }

        ctrl.$parsers.push(myValidation);
      }
    }
  }]);