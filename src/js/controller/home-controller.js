define(
  [
    'angular',
    'js/directive/dropdown-directive'
  ],
  function(angular) {
    'use strict';
    angular
      .module('todoApp.home-controller', [
        'dropdown-directive'
      ])
      .controller('HomeController', [
        '$scope',
        function($scope) {
       
          
        }
         
      ]);
  }
);