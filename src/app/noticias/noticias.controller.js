(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('NoticiasController', NoticiasController);

  /** @ngInject */
  function NoticiasController($scope, $log, GApi, $sce) {
    var vm = this;

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src)
    };

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias').then( function(resp) {
        $scope.noticias = resp.items;
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticiasFooter = resp.items;
    });

  }
})();
