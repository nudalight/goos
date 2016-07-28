angular
  .module('goos')
  .service('authService', authService)
;

authService
  .$inject = ['$rootScope', 'locker', 'md5', '$cookies', '$window', '$log']
;


function authService ($rootScope, locker, md5, $cookies, $window, $log){

  this.auth = function(username){

    var
      expire = new Date(new Date().getTime() + 1000 * 3600 * 24 * 2),
      tokenStr = (new Date).toString(),
      token = md5.createHash(tokenStr)
    ;

    $cookies.put('username', username, { expires: expire });
    $cookies.put('token', token, { expires: expire });

    $window.location.reload(); // otherwise the path would be not allowed by urlWatcherService

    return token;
  };


  this.register = function(formObj){
    var U = locker.namespace('user=' + formObj.username);

    for (var key in formObj){
      if (key == 'repassword'){
        continue;
      }

      if (key == 'password'){
        formObj[key] = md5.createHash(formObj.username + formObj.password);
      }

      U.put(key, formObj[key])
    }

    U.put('token', this.auth(formObj.username));
  };


  this.login = function(username, password){

    var
      U = locker.namespace('user=' + username),
      condUserExist = U.has('username'),
      consTokenExist = U.has('token'),
      LPassword = U.get('password'),
      HPassword = md5.createHash(username + password),
      condPasswordMatch =  LPassword == HPassword
    ;

    $log.log('pass compare: ', LPassword, HPassword);

    if (condUserExist){
      $log.log('user exists');

      if (consTokenExist){
        $log.log('token exists');
      } else { 
        $log.log('token NOT used');

        if (condPasswordMatch){
          this.auth(username);
        }
      }
    } else {
      $log.log('user does not exist');
    }

    return condPasswordMatch; // only for wrong pass msg


  };


  this.logout = function(){

    var U = locker.namespace('user=' + $rootScope.user.username);
    U.forget('token');

    $cookies.remove('username');
    $cookies.remove('token');

    $window.location.reload();  // otherwise the path would be not allowed by urlWatcherService

  };



}


