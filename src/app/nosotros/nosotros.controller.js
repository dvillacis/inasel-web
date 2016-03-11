(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('NosotrosController', NosotrosController);

  /** @ngInject */
  function NosotrosController($scope, $log, GApi) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );
    angular.element(window).on('resize', SEMICOLON.documentOnResize.init() );

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
