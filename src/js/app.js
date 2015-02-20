define(
  [
  'angular',
  'js/controller/home-controller',
  'angular-ui-router',
  ],
  function(angular) {
    'use strict';

    angular
    .module('todoApp', ['ui.router','todoApp.home-controller'])
    .config([
      '$locationProvider',
      '$stateProvider',

      function($locationProvider,$stateProvider) { // jshint ignore:line

      
        $stateProvider
        .state('home', {
          url:'',
          templateUrl: 'template/home.html' ,
          controller: 'HomeController'
        });


    }
    ]);
}
);