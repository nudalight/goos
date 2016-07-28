angular
  .module('goos')
  .factory('helperFactory', helperFactory)
;


function helperFactory(){

  return {
    mergeObjects: mergeObjects
  };

  function mergeObjects(){
    var resultObj = {};

    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        resultObj[key] = arguments[i][key];
      }
    }

    return resultObj;
  }

}