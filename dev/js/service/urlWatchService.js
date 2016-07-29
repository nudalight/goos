angular
  .module('goos')
  .service('urlWatchService', urlWatchService)
;

urlWatchService
  .$inject = ['authService', '$location', '$log']
;


function urlWatchService(authService, $location, $log){

  var that = this;

  this.urls = {
    authed: [
      'summary'
    ],
    notauthed: [
      'login',
      'register'
    ]
  };


  this.handle = function(event, next, current) {

    that.authed = authService.user.token;
    that.allowed = that.authed ? that.urls.authed : that.urls.notauthed;

    var isAllowed = that.isPathAllowed(next);

    if (!isAllowed) {
      $log.log('not allowed path: ', next);

      $location.path(that.allowed[0]);

    }

  };


  this.isPathAllowed = function(next){
    var
      cond1,
      isAllowed = false
    ;

    that.allowed.map(function(path){
      cond1 = next.indexOf(path) > -1;
      if (cond1){
        isAllowed = true;
      }
    });

    return isAllowed;

  };


}