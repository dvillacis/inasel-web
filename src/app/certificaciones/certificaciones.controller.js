(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('CertificacionesController', CertificacionesController);

  /** @ngInject */
  function CertificacionesController($timeout, $log) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

  }
})();
