angular.module('goos')
  .service('urlWatchService',
    ['$rootScope', '$location', '$cookies',
      function($rootScope, $location, $cookies){

        var that = this;

        // this.urllist = {
        //   authed: [
        //     'summary',
        //     'books',
        //     'twitter'
        //   ],
        //   notauthed: [
        //     'login',
        //     'register'
        //   ]
        // };


        this.handle = function(event, next, current) {

          var authed = $rootScope.user.token;


          // var allowed = authed ? that.urllist.authed : that.urllist.notauthed;
          //
          // var x = that.isPathAllowed(allowed, next, current);
          //
          // console.warn('path', next, ' is: ', x);
          //
          // if (!x) {
          //   event.preventDefault();
          //   $location.path('/');
          // }



          

          // var cond1 = next.indexOf('summary') < 0;
          // var cond2 = current.indexOf('summary') < 0;
          //
          // if (authed && cond1){
          //   event.preventDefault();
          //   console.log('AUTHED navigation prevented', $rootScope.user);
          // }
          //
          // var cond3 = next.indexOf('summary') > -1;
          // var cond4 = current.indexOf('summary') > -1;
          //
          // if (!authed && cond3) {
          //   event.preventDefault();
          //   console.log('NOTATHED navigation prevented', $rootScope.user);
          // }
          //
          // // redirects
          // if (authed && cond2) {
          //   $location.path('/summary')
          // }
          //
          // if (!authed && cond4){
          //   $location.path('/');
          // }









        };

        // this.isPathAllowed = function(allowed, next, current){
        //   var isAllowed = false, cond1, cond2;
        //
        //   allowed.map(function(path){
        //
        //     cond1 = next.indexOf(path) > -1;
        //
        //     if (cond1){
        //       isAllowed = true;
        //     }
        //
        //   });
        //
        //   return isAllowed;
        //
        // };



  }]);