angular
  .module('goos')
  .directive('sameAs', sameAs)
;


function sameAs(){
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {

      var modelToMatch = attrs.sameAs;

      scope.$watch(attrs.sameAs, function() {
        ctrl.$validate();
      });

      ctrl.$validators.match = function(modelValue, viewValue) {
        var isValid = viewValue === scope.$eval(modelToMatch);

        ctrl.$setValidity('sameAs', isValid);
        return viewValue === scope.$eval(modelToMatch);
      };
    }
  };
}