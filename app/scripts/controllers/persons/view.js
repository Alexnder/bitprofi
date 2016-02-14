'use strict';

/**
 * Controller of the persons list
 */
angular.module('bitprofiApp')
  .controller('PersonsViewCtrl', function ($scope, $routeParams, Person) {
    Person.get({id:$routeParams.id}, function(data) {
      if (data.error) {
        $scope.error = data.error;
        return;
      }
      $scope.person = data;
    });
  });