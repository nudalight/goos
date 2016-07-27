angular
  .module('goos')
  .config(datepicker)
;

datepicker
  .$inject = ['$mdDateLocaleProvider']
;


function datepicker($mdDateLocaleProvider){

  $mdDateLocaleProvider.formatDate = function(date){
    return moment(date).format('L');
  }

}