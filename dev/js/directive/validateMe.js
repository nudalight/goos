angular
  .module('goos')
  .directive('validateMe', validateMe)
;

validateMe.$inject = ['validateObj', '$log'];


function validateMe(validateObj, $log){ 
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {

      function myValidation(value) {

        var isValid = validateMe();
        mCtrl.$setValidity('validateMe', isValid);


        function validateMe(){
          var result = validateObj[attr.name].isValid(value);
          $log.log('result: ', result);
          return result;
        }

        return value;

      }

      mCtrl.$parsers.push(myValidation);
    }
  }
}