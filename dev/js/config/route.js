angular.module('goos')
  .config(route)
;

route
  .$inject = ['$routeProvider']
;


function route($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'html/login.html',
      controller: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: 'html/register.html',
      controller: 'registerCtrl'
    })
    .when('/summary', {
      templateUrl: 'html/summary.html',
      controller: 'summaryCtrl'
    })
    .when('/youtube', {
      templateUrl: 'html/youtube.html',
      controller: 'youtubeCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    })
  ;
}
