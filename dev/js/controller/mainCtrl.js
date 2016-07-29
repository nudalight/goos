angular
  .module('goos')
  .controller('mainController', mainCtrl)
;

mainCtrl
  .$inject = ['$rootScope', '$scope', 'authService', '$cookies', 'urlWatchService']
;


function mainCtrl($rootScope, $scope, authService, $cookies, urlWatchService){

  console.log(authService, authService.user);

  $rootScope.user = authService.user;

  $rootScope.actions = {
    logout: authService.logout
  };
 
  $rootScope.$on('$locationChangeStart', urlWatchService.handle);
}


