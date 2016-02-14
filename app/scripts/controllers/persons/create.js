'use strict';

/**
 * Controller of edit a person
 */
angular.module('bitprofiApp')
  .controller('PersonsCreateCtrl', function ($scope, $routeParams, $window, Person) {

    $scope.person = {};

    $scope.submit = function() {
      Person.save($scope.person, function(result) {
        if (result.error) {
          $scope.error = result.error;
          return;
        }

        $window.location.href = '#/' + result.data.id;
      });
    };
  });