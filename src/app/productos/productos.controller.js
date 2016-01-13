(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ProductosController', ProductosController);

  /** @ngInject */
  function ProductosController($scope, $log, GApi) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

    // Mostrar la lista de precios
    

    // Get all the products from backend
    GApi.execute('inaselBackend','inaselbackend.listarProductos').then( function(resp) {
        $scope.lista = resp.items;
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
