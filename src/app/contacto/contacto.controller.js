(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ContactoController', ContactoController);

  /** @ngInject */
  function ContactoController($timeout, $log, NgMap) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(document).ready( SEMICOLON.map.init(NgMap) );

    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

  }
})();
