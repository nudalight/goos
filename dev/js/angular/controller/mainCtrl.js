angular.module('app')
  .controller('mainCtrl',
    ['$rootScope', '$scope', 'authService', '$cookies', 'urlWatchService',
      function($rootScope, $scope, authService, $cookies, urlWatchService){

        $rootScope.user = {
          username: $cookies.get('username'),
          token: $cookies.get('token')
        };

        $rootScope.actions = {
          logout: authService.logout
        };

        $rootScope.$on("$locationChangeStart", urlWatchService.handle);
      }
    ]);


