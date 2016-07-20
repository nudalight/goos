angular.module('app')
  .controller('registerCtrl', 
    ['$scope', 'authService',
      function($scope, authService){

        $scope.state = {
          step: 1
        };

        $scope.actions = {
          stepUp: function (nodeForm) {

            if (nodeForm.$valid) {

              $scope.state.step++;

              if ($scope.state.step == 3) {
                var formsData = mergeObjects($scope.formOne, $scope.formTwo);
                authService.register(formsData);
              }

            }
            
          }
        };




      }
    ]
  );