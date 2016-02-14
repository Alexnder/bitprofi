'use strict';

describe('Controller: PersonsEditCtrl', function () {
  var PersonsEditCtrl;
  var scope;
  var mockPersonResource;
  var $httpBackend;

  beforeEach(angular.mock.module('bitprofiApp'));


  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonsEditCtrl = $controller('PersonsEditCtrl', {
      $scope: scope,
      $routeParams: {id: 1}
    });
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPersonResource = $injector.get('Person');
    });
  }));

  it('should get person and save it', function () {
    var testData = {id: "1"};
    $httpBackend
      .whenGET('http://localhost:1337/api/persons/1')
      .respond(testData);

    $httpBackend
      .whenPUT('http://localhost:1337/api/persons/1')
      .respond(testData);

    scope.submit();

    $httpBackend.flush();

    expect(scope.person.id).toBe(testData.id);
    expect(scope.person.firstName).toBe(testData.firstName);
    expect(scope.person.lastName).toBe(testData.lastName);
    expect(scope.error).not.toBeDefined();
  });

  it('should get person and not save it', function () {
    var testData = {id: "1"};
    $httpBackend
      .whenGET('http://localhost:1337/api/persons/1')
      .respond(testData);

    $httpBackend
      .whenPUT('http://localhost:1337/api/persons/1')
      .respond({error:"You can't"});

    scope.submit();

    $httpBackend.flush();

    expect(scope.person.id).toBe(testData.id);
    expect(scope.person.firstName).toBe(testData.firstName);
    expect(scope.person.lastName).toBe(testData.lastName);
    expect(scope.error).toBeDefined();
  });
});
