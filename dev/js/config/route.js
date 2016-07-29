angular
  .module('goos')
  .config(route)
;

route
  .$inject = ['$routeProvider']
;


function route($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'html/login.html',
      controller: 'loginController'
    })
    .when('/register', {
      templateUrl: 'html/register.html',
      controller: 'registerController'
    })
    .when('/summary', {
      templateUrl: 'html/summary.html',
      controller: 'summaryController'
    })
    .otherwise({
      redirectTo: '/login'
    })
  ;
}
