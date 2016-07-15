angular.module('app')
  .directive('registerAnimation', [function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {

        function myValidation(value) {

          var isValid = validateMe();
          mCtrl.$setValidity('v', isValid);


          function validateMe(){
            var result = true, cond;

            validateObj[attr.name].regex.forEach(function(v, i, list){
              cond = v.test(value);
              console.log(v, cond);
              if (!cond) {
                result = false;
              }
            });

            return result;
          }


          return value;

        }

        mCtrl.$parsers.push(myValidation);
      }
    }
  }]);