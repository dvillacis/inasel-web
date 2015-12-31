(function() {
  'use strict';

  angular
    .module('testAngular')
    .directive('inaselFooter', inaselFooter);

  /** @ngInject */
  function inaselFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footer/footer.html',
      scope: {
          creationDate: '='
      },
      controller: FooterController,
      controllerAs: 'ifo',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController($log) {
      var ifo = this;
      $log.info("Initializing controller");
      // "vm.creation" is avaible by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();

