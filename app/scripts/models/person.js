'use strict';

/**
 * Person factory
 */
angular.module('bitprofiApp')
  .factory('Person', function($resource) {
    return $resource('http://localhost:1337/api/persons/:id', null,
      {
          'update': { method:'PUT' }
      });
  });
