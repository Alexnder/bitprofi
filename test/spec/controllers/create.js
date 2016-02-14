'use strict';

describe('Controller: PersonsCreateCtrl', function () {
  var PersonsCreateCtrl;
  var scope;
  var mockPersonResource;
  var $httpBackend;

  beforeEach(angular.mock.module('bitprofiApp'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonsCreateCtrl = $controller('PersonsCreateCtrl', {
      $scope: scope
    });
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPersonResource = $injector.get('Person');
    });
  }));

  it('should create person', function () {
    var testData = {id: 1, firstName: "Admin", lastName: "Adminoff"};
    $httpBackend
      .whenPOST('http://localhost:1337/api/persons')
      .respond({data:testData});

    scope.person = testData;
    scope.submit();

    $httpBackend.flush();

    expect(scope.error).not.toBeDefined();
  });

  it('should not create person', function () {
    var testData = {error: "Not found"};
    $httpBackend
      .whenPOST('http://localhost:1337/api/persons')
      .respond(testData);

    scope.person = testData;
    scope.submit();

    $httpBackend.flush();

    expect(scope.error).toBe(testData.error);
  });
});
