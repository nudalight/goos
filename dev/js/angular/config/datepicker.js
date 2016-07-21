angular.module('app')
  .config(['$mdDateLocaleProvider', function($mdDateLocaleProvider){
    $mdDateLocaleProvider.formatDate = function(date){
      return moment(date).format('DD-MM-YYYY');
    }
  }]);