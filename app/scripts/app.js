'use strict';

/**
 * @ngdoc overview
 * @name bitprofiApp
 * @description
 * # bitprofiApp
 *
 * Main module of the application.
 */
angular
  .module('bitprofiApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/persons/list.html',
        controller: 'PersonsListCtrl'
      })
      .when('/:id', {
        templateUrl: 'views/persons/view.html',
        controller: 'PersonsViewCtrl'
      })
      .when('/:id/edit', {
        templateUrl: 'views/persons/edit.html',
        controller: 'PersonsEditCtrl'
      })
      .when('/:id/delete', {
        templateUrl: 'views/persons/delete.html',
        controller: 'PersonsDeleteCtrl'
      })
      .when('/create', {
        templateUrl: 'views/persons/create.html',
        controller: 'PersonsCreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
