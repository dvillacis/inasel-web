(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $log, GApi) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

    // Get all the products from backend
    GApi.execute('inaselBackend','inaselbackend.listarProductos',{count: 4}).then( function(resp) {
        $scope.listaProductos = resp.items;
    });

    // Get all the projects from backend
    GApi.execute('inaselBackend','inaselbackend.listarProyectos',{count: 4}).then( function(resp) {
        $scope.listaProyectos = resp.items;
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
