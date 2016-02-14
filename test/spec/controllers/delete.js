'use strict';

describe('Controller: PersonsDeleteCtrl', function () {
  var PersonsDeleteCtrl;
  var scope;
  var mockPersonResource;
  var $httpBackend;

  beforeEach(angular.mock.module('bitprofiApp'));


  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonsDeleteCtrl = $controller('PersonsDeleteCtrl', {
      $scope: scope,
      $routeParams: {id: 1}
    });
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPersonResource = $injector.get('Person');
    });
  }));

  it('should get person', function () {
    var testData = {id: 1, firstName: "Admin", lastName: "Adminoff"};
    $httpBackend
      .whenGET('http://localhost:1337/api/persons/1')
      .respond(testData);

    mockPersonResource.get({id:1});

    $httpBackend.flush();

    expect(scope.person.id).toBe(testData.id);
    expect(scope.person.firstName).toBe(testData.firstName);
    expect(scope.person.lastName).toBe(testData.lastName);
    expect(scope.error).not.toBeDefined();
  });

  it('should not get person', function () {
    var testData = {error: "Not found"};
    $httpBackend
      .whenGET('http://localhost:1337/api/persons/1')
      .respond(testData);

    mockPersonResource.get({id:1});

    $httpBackend.flush();

    expect(scope.person).not.toBeDefined();
    expect(scope.error).toBe(testData.error);
  });

  it('should delete person', function () {
    var testData = {id: "1"};
    $httpBackend
      .whenGET('http://localhost:1337/api/persons/1')
      .respond(testData);

    $httpBackend
      .whenDELETE('http://localhost:1337/api/persons/1')
      .respond(testData);

    scope.submit();

    $httpBackend.flush();

    expect(scope.error).not.toBeDefined();
  });

  it('should not delete person', function () {
    var testData = {error: "You can't"};
    $httpBackend
      .whenGET('http://localhost:1337/api/persons/1')
      .respond({id: 1});
    $httpBackend
      .whenDELETE('http://localhost:1337/api/persons/1')
      .respond(testData);

    scope.submit();

    $httpBackend.flush();

    expect(scope.error).toBe(testData.error);
  });
});
