(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ProyectoIndividualController', ProyectoIndividualController);

  /** @ngInject */
  function ProyectoIndividualController($scope, $log, $stateParams, GApi) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).on( 'resize', SEMICOLON.documentOnResize.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

    // Get the product from backend
    GApi.execute('inaselBackend','inaselbackend.listarProyectos',{id: $stateParams.id}).then( function(resp) {
        $scope.proyecto = resp.items[0];
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
