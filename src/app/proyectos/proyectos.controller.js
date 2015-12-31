(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ProyectosController', ProyectosController);

  /** @ngInject */
  function ProyectosController($scope, $log, GApi) {
    var vm = this;

    

    $scope.filteredCat = '.Cat1';

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).on( 'resize', SEMICOLON.documentOnResize.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

    // Get all the products from backend
    GApi.execute('inaselBackend','inaselbackend.listarProyectos').then( function(resp) {
        $scope.lista= resp.items;
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
