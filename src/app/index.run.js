(function() {
  'use strict';

  angular
    .module('testAngular')
    .run(['GApi', 'GAuth', function(GApi, GAuth) {
    	var BASE = 'https://inasel-beta.appspot.com/_ah/api';
        GApi.load('inaselBackend','v2',BASE);
    }]);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
