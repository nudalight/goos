angular.module('goos')
  .directive('validateMe', ['validateObj', function(validateObj) {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {

        function myValidation(value) {

          var isValid = validateMe();
          mCtrl.$setValidity('validmypants', isValid);


          function validateMe(){

            var result = true, cond;

            result = validateObj[attr.name].isValid(value);

            console.log('result: ', result);

            return result;
          }


          return value;

        }

        mCtrl.$parsers.push(myValidation);
      }
    }
  }]);