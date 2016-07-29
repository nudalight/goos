angular
  .module('goos')
  .service('authService', authService)
;

authService
  .$inject = ['locker', 'md5', '$cookies', '$log', '$location'];
;


function authService(locker, md5, $cookies, $log, $location){

  var vm = this;

  vm.auth = auth;
  vm.register = register;
  vm.login = login;
  vm.logout = logout;

  vm.user = {
    username: $cookies.get('username'),
    token: $cookies.get('token')
  };

  function auth(username){
    var
      expire = new Date(new Date().getTime() + 1000 * 3600 * 24 * 2),
      tokenStr = (new Date).toString(),
      token = md5.createHash(tokenStr)
    ;

    $cookies.put('username', username, { expires: expire });
    $cookies.put('token', token, { expires: expire });

    vm.user.username = username;
    vm.user.token = token;

    $location.path('/summary');

    return token;
  }


  function register(formObj){
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
  }


  function login(username, password){

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
  }


  function logout(){
    var U = locker.namespace('user=' + vm.user.username);
    U.forget('token');

    $cookies.remove('username');
    $cookies.remove('token');

    vm.user.username = null;
    vm.user.token = null;

    $location.path('/login');
  }


}


