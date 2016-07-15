angular.module('app') 
  .controller('loginCtrl',
    ['$scope', 'locker', 'md5', '$cookies', '$location',
      function($scope, locker, md5, $cookies, $location){

    $scope.errors = {};
    $scope.actions = {};

    $scope.user = {
      login: $cookies.get('login'),
      token: $cookies.get('token')
    };
      

    $scope.actions.auth = function(){
      $scope.errors.form = null;

      var
        isUserExist,
        isPasswordCorrect,
        errorMsg,
        login,
        password,
        passwordHash,
        token,
        U;


      U = locker.namespace('user=' + $scope.form.login);

      login = U.get('login');

      if (login){
        console.log('user exists. proceed.');
        password = U.get('password');
        passwordHash = md5.createHash($scope.form.login + $scope.form.password);

        if (password == passwordHash){
          console.log('password correct');
          console.log('pass: ', password, passwordHash);

          // AUTH!
          var str = (+new Date).toString();
          console.log('str: ', str);
          token = md5.createHash(str);

          $cookies.put('login', $scope.form.login);
          $cookies.put('token', token);
          U.put('token', token);

          $location.path('/summary');

        } else {
          console.log('password incorrect');
        }
      } else {
        console.log('user does not exist, sorry');
      }



      // isUserExist = ( login == $scope.form.login );
      // isPasswordCorrect = ( password == passwordHash );
      //
      //
      // if (isUserExist && isPasswordCorrect){
      //   // ! authentificate
      //
      //   // put user data to cookies
      //   $cookies.put('login', $scope.form.login);
      //   $cookies.put('token', md5.createHash(+new Date));
      //
      //   // navigate to Summary page
      //   // ??? HOW
      //
      //
      //
      // } else {
      //   // throw error
      //   errorMsg = 'Login or password is incorrect';
      //   $scope.errors.form = errorMsg;
      // }

    }


  }]);