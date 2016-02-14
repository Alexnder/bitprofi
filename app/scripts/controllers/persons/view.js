'use strict';

/**
 * Controller of the persons list
 */
angular.module('bitprofiApp')
  .controller('PersonsViewCtrl', function ($scope, $routeParams, Person) {
    Person.get({id:$routeParams.id}, function(data) {
      $scope.person = data;
    });
  });