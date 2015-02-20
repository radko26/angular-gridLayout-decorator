(function(requirejs) {
  'use strict';
  requirejs.config(window.requirejsConfig);

  require([
    'angular',
    'js/app'
  ], function (angular) {
   
    
    angular.bootstrap(document, ['todoApp']);
  
    
  });
})(window.requirejs);