'use strict';

describe('Controller: PersonsListCtrl', function () {
  var PersonsListCtrl;
  var scope;
  var mockPersonResource;
  var $httpBackend;

  beforeEach(angular.mock.module('bitprofiApp'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonsListCtrl = $controller('PersonsListCtrl', {
      $scope: scope,
      $routeParams: {id: 1}
    });
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPersonResource = $injector.get('Person');
    });
  }));

  it('should get list', function () {
    var testData = [{id: 1, firstName: "a", lastName: "b"}, {id:2}];
    $httpBackend
      .whenGET('http://localhost:1337/api/persons')
      .respond(testData);

    $httpBackend.flush();

    expect(scope.persons.length).toBe(testData.length);
  });

  it('should get empty list', function () {
    $httpBackend
      .whenGET('http://localhost:1337/api/persons')
      .respond([]);

    $httpBackend.flush();

    expect(scope.persons.length).toBe(0);
  });
});
