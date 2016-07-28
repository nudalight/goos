angular
  .module('goos')
  .config(locker)
;

locker
  .$inject = ['lockerProvider']
;


function locker(lockerProvider){
  lockerProvider.defaults({
    driver: 'local',
    namespace: 'app',
    separator: '.',
    eventsEnabled: true,
    extend: {}
  });
}