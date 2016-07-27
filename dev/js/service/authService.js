angular.module('goos')
  .service('authService',
  ['$rootScope', 'locker', 'md5', '$location', '$cookies', '$route', '$window',
    function($rootScope, locker, md5, $location, $cookies, $route, $window){

      this.auth = function(username){

        var expireTs = new Date(new Date().getTime() + 1000 * 3600 * 24 * 2);
        var tokenStr = (new Date).toString();
        var token = md5.createHash(tokenStr);

        $cookies.put('username', username, { expires: expireTs });
        $cookies.put('token', token, { expires: expireTs });

        $location.path('/summary');
        $window.location.reload();

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

        var L = locker.namespace('user=' + username);

        var condUserExist = L.has('username');
        var consTokenExist = L.has('token');
        var LPassword = L.get('password');
        var HPassword = md5.createHash(username + password);
        var condPasswordMatch =  LPassword == HPassword;

        console.log('pass compare: ', LPassword, HPassword);

        if (condUserExist){
          console.log('user exists');

          if (consTokenExist){
            console.log('token exists');
          } else {
            console.log('token NOT used');

            if (condPasswordMatch){
              this.auth(username);
            }
          }
        } else {
          console.log('user does not exist');
        }

        return condPasswordMatch; // only for wrong pass msg


      };


      this.logout = function(){

        var L = locker.namespace('user=' + $rootScope.user.username);
        L.forget('token');

        $cookies.remove('username');
        $cookies.remove('token');

        $location.path('/');
        $window.location.reload();

      };



    }
  ]);

