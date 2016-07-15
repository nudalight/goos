angular.module('app')
  .directive('validateMe', ['validateObj', function(validateObj) {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {

        function myValidation(value) {

          var isValid = validateMe();
          mCtrl.$setValidity('v', isValid);


          function validateMe(){


             var result = true, cond;

            result = validateObj[attr.name].isValid(value);


            console.log('result: ', result);

            if (!result){
              scope.errors[attr.name] = validateObj[attr.name].error;
            }

            // validateObj[attr.name].regex.forEach(function(v, i, list){
            //   cond = v.test(value);
            //   console.log(v, cond);
            //   if (!cond) {
            //     result = false;
            //   }
            // });

            return result;
          }


          return value;

        }

        mCtrl.$parsers.push(myValidation);
      }
    }
  }]);