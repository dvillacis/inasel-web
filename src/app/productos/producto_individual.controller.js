(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ProductoIndividualController', ProductoIndividualController);

  /** @ngInject */
  function ProductoIndividualController($scope, $log, $stateParams, GApi) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).on( 'resize', SEMICOLON.documentOnResize.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

    console.log($stateParams);

    // Get the product from backend
    GApi.execute('inaselBackend','inaselbackend.listarProductos',{id: $stateParams.id}).then( function(resp) {
        $scope.producto = resp.items[0];
        console.log(resp.items);
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
