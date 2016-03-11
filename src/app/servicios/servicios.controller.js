(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ServiciosController', ServiciosController);

  /** @ngInject */
  function ServiciosController($scope, $log, GApi) {
    var vm = this;

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );
    angular.element(window).load( SEMICOLON.documentOnLoad.init() );


    angular.element('#collapse1-button').on('click', function(){
      angular.element('#collapse1').collapse('toggle');
    });
    angular.element('#collapse2-button').on('click', function(){
      angular.element('#collapse2').collapse('toggle');
    });
    angular.element('#collapse3-button').on('click', function(){
      angular.element('#collapse3').collapse('toggle');
    });
    angular.element('#collapse4-button').on('click', function(){
      angular.element('#collapse4').collapse('toggle');
    });
    angular.element('#collapse5-button').on('click', function(){
      angular.element('#collapse5').collapse('toggle');
    });
    angular.element('#collapse6-button').on('click', function(){
      angular.element('#collapse6').collapse('toggle');
    });
    angular.element('#collapse7-button').on('click', function(){
      angular.element('#collapse7').collapse('toggle');
    });
    angular.element('#collapse8-button').on('click', function(){
      angular.element('#collapse8').collapse('toggle');
    });
    angular.element('#collapse9-button').on('click', function(){
      angular.element('#collapse9').collapse('toggle');
    });
    angular.element('#collapse10-button').on('click', function(){
      angular.element('#collapse10').collapse('toggle');
    });

    // Get all the news from backend
    GApi.execute('inaselBackend','inaselbackend.listarNoticias',{count: 2}).then( function(resp) {
        $scope.noticias = resp.items;
    });

  }
})();
