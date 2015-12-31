(function() {
  'use strict';

  angular
    .module('testAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
      .state('proyectos', {
        url: '/proyectos',
        templateUrl: 'app/proyectos/proyectos.html',
        controller: 'ProyectosController',
        controllerAs: 'proyectos'
      })
      .state('proyectoDetail', {
        url: '/proyectos/:id',
        templateUrl: 'app/proyectos/proyecto.item.html',
        controller: 'ProyectoIndividualController'
      });

    $stateProvider
      .state('productos', {
        url: '/productos',
        templateUrl: 'app/productos/productos.html',
        controller: 'ProductosController',
        controllerAs: 'productos'
      })
      .state('productoDetail', {
        url: '/productos/:id',
        templateUrl: 'app/productos/producto.item.html',
        controller: 'ProductoIndividualController'
      });

    $stateProvider
      .state('servicios', {
        url: '/servicios',
        templateUrl: 'app/servicios/servicios.html',
        controller: 'ServiciosController',
        controllerAs: 'servicios'
      });

    $stateProvider
      .state('noticias', {
        url: '/noticias',
        templateUrl: 'app/noticias/noticias.html',
        controller: 'NoticiasController',
        controllerAs: 'noticias'
      });

    $stateProvider
      .state('contacto', {
        url: '/contacto',
        templateUrl: 'app/contacto/contacto.html',
        controller: 'ContactoController',
        controllerAs: 'contacto'
      });

    $stateProvider
      .state('nosotros', {
        url: '/nosotros',
        templateUrl: 'app/nosotros/nosotros.html',
        controller: 'NosotrosController',
        controllerAs: 'nosotros'
      });

    $stateProvider
      .state('certificaciones', {
        url: '/certificaciones',
        templateUrl: 'app/certificaciones/certificaciones.html',
        controller: 'CertificacionesController',
        controllerAs: 'certificaciones'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
