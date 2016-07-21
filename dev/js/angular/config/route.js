angular.module('app')
  .config(['$routeProvider', function($routeProvider){
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
      .otherwise({
        redirectTo: '/login'
      })
    ;
  }]);