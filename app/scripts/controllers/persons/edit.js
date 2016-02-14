'use strict';

/**
 * Controller of edit a person
 */
angular.module('bitprofiApp')
  .controller('PersonsEditCtrl', function ($scope, $routeParams, $window, Person) {

    Person.get({id:$routeParams.id}, function(data) {
      $scope.person = data;
    });

    $scope.submit = function() {
      Person.update({ id: $routeParams.id }, $scope.person, function(result) {
        if (result.error) {
          $scope.error = result.error;
          return;
        }

        $window.location.href = '#/' + $routeParams.id;
      });
    };
  });