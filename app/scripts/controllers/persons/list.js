'use strict';

/**
 * Controller of the persons list
 */
angular.module('bitprofiApp')
  .controller('PersonsListCtrl', function ($scope, Person) {
    Person.query(function(data) {
      $scope.persons = data;
    });
  });
