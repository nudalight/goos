angular.module('app')
  .config(['lockerProvider', function config(lockerProvider) {
    lockerProvider.defaults({
      driver: 'local',
      namespace: 'app',
      separator: '.',
      eventsEnabled: true,
      extend: {}
    });
  }]);