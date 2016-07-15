angular.module('app')
  .factory('validateObj', function(){
    var
      cond1, cond2, cond3, cond4, regex, result;


    return {

      username: {
        isValid: function(value){
          console.log('check validity');
          return /^(.{6,15})$/.test(value);
        }
      },

      password: {  
        isValid: function(value){
          result = true;
          regex = [
            /[0-9]{1,}/,
            /[A-Z]{1,}/,
            /^[^\W_]{6,}$/
          ];
          regex.map(function(r){
            if (!r.test(value)){
              result = false;
            }
          });

          return result;
        }
      },

      name: {
        isValid: function(value){
          return /^(.{2,15})$/.test(value);
        }
      },

      surname: {
        isValid: function(value){
          return /^(.){2,20}$/.test(value);
        }
      },

      birthday: {
        isValid: function(value){
          var
            jsYear = 1000 * 3600 * 24 * 365,
            provided = +new Date(value) / jsYear,
            current = +new Date() / jsYear,
            legalAge = 18;

          return legalAge < parseInt(current) - parseInt(provided);
        }
      },

      phone: {

      }

    };
  });