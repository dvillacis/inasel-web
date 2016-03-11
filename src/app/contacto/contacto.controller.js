(function() {
  'use strict';

  angular
    .module('testAngular')
    .controller('ContactoController', ContactoController);

  /** @ngInject */
  function ContactoController($scope, NgMap, GApi) {
    var vm = this;

    $scope.mensaje = {};

    // Initialize using utility functions
    angular.element(document).ready( SEMICOLON.documentOnReady.init() );


    angular.element(window).load( SEMICOLON.documentOnLoad.init() );

    $scope.submitForm = function( isValid ) {
      console.log(isValid);
      if (isValid) {
        //Sending emails
        console.log('enviando mail ' + $scope.mensaje.titulo)
        GApi.execute('inaselBackend', 'inaselbackend.enviarMensaje',
          {
            email: $scope.mensaje.email,
            mensaje: $scope.mensaje.msg,
            nombre: $scope.mensaje.nombre,
            telefono: $scope.mensaje.telefono,
            titulo: $scope.mensaje.titulo,
          }).then(function (resp) {
            console.log(resp)
            if (resp.resultado == 'Envio Correcto'){
              angular.element('#envioExitoso').removeClass('hidden');
              angular.element('#enviarBtn').addClass('hidden');
            } else {
              alert('Error enviando el mensaje.');
            }
        });
      } else {
        alert('Existen campos con errores.');
      }
    }

    angular.element(document).ready( SEMICOLON.map.init(NgMap) );

  }
})();
