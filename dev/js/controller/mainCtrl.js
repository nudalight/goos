angular
  .module('goos')
  .controller('mainCtrl', mainCtrl)
;

mainCtrl
  .$inject = ['$rootScope', '$scope', 'authService', '$cookies', 'urlWatchService']
;


function mainCtrl($rootScope, $scope, authService, $cookies, urlWatchService){

  $rootScope.user = {
    username: $cookies.get('username'),
    token: $cookies.get('token')
  };

  $rootScope.actions = {
    logout: authService.logout
  };
 
  $rootScope.$on('$locationChangeStart', urlWatchService.handle);
}


