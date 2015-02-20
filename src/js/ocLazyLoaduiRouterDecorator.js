define(
  [
  'angular', 
  'angular-ui-router',
  'ocLazyLoad'
  ],
  function(angular) {
  'use strict';

    angular.module('oc.lazyLoad.uiRouterDecorator', ['ui.router'])
    .config(['$stateProvider',function($stateProvider) {

    
     function lazyBundle(module, files, templateUrl) {
      var lazyDeferred;
      return {
        templateProvider: function lazyTemplateProvider() { return lazyDeferred.promise; },
        resolve: ['$templateCache','$http', '$ocLazyLoad', '$q', function lazyResolve($templateCache,$http, $ocLazyLoad, $q) {
          lazyDeferred = $q.defer();
          return $ocLazyLoad.load({
            name: module, 
            files: angular.isArray(files) ? files : [files]
          }).then(function() {
            $http.get(templateUrl).then(function(result){
              lazyDeferred.resolve(result.data);
            });
            
          });
        }]
      };
    }
    
  /**
     * Add the following properties to your $stateProvider.state definition (in a top-level, or view object):
     * url: "/dashboard",
     * lazyModule: 'todoApp.dashboard-controller',
     * lazyFiles: 'js/controller/dashboard-controller',
     * lazyTemplateUrl: 'template/dashboard.html',
     * controller: 'DashboardController'
     * 
     * Automatically adds to each state with lazyModule, lazyFiles, and lazyTemplateUrl properties:
     *  - a templateProvider which resolves with value $templateCache.get(lazyTemplateUrl) after all 
     *    of the lazyFiles are loaded (only if a lazyTemplateUrl property is defined)
     *  - a resolve function named $lazyLoader which resolves after all of the lazyFiles are loaded. 
     *    Before resolving, $ocLazyLoad({ name: lazyModule, files: lazyFiles }) will be called
     */

     $stateProvider.decorator('views', function ($state, parent) {
      var result = {},
      views = parent($state);
      
      angular.forEach(views, function (config, name) {
        if (config.lazyModule && config.lazyFiles && config.lazyTemplateUrl) {
         var bundle = lazyBundle(config.lazyModule, config.lazyFiles, config.lazyTemplateUrl);
          config.resolve.$lazyLoader = bundle.resolve;
          if (config.lazyTemplateUrl) config.templateProvider = bundle.templateProvider;
        }
        result[name] = config;
      });
      return views;
    });

   }]);
});