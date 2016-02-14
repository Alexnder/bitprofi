'use strict';

/**
 * Controller of delete a person
 */
angular.module('bitprofiApp')
  .controller('PersonsDeleteCtrl', function ($scope, $routeParams, $window, Person) {

    Person.get({id:$routeParams.id}, function(data) {
      if (data.error) {
        $scope.error = data.error;
        return;
      }

      $scope.person = data;
    });

    $scope.submit = function() {
      Person.delete({id:$routeParams.id}, function(result) {
        if (result.error) {
          $scope.error = result.error;
          return;
        }

        $window.location.href = '#/';
      });
    };
  });