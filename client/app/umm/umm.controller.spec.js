'use strict';

describe('Controller: UmmCtrl', function () {

  // load the controller's module
  beforeEach(module('yeoMeanApp'));

  var UmmCtrl, scope, httpBackend, courseList;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    UmmCtrl = $controller('UmmCtrl', {
      $scope: scope
    });
    courseList = [];
      //The following httpBackend things will determine what will happen when an http request is called during our tests
    httpBackend.when('POST', '/api/courses').respond(function(method, url, data, headers) {
        courseList.push(JSON.parse(data));
        return [200, {}, {}];
    });
    httpBackend.when('GET', '/api/courses').respond(courseList);
      //The 1 is for identifying the _id on the course in the "database"
    httpBackend.when('DELETE', '/api/courses/1').respond(function() {
        courseList.splice(courseList.indexOf({title:"CSCI", grade:"B", credit: 4}),1);
        return [200, {}, {}];
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  describe('testing add and delete from the database', function() {
      it('should add a new course "CSCI" with a grade "B" and credit as 4 and return it', function() {
          scope.newCourse = "CSCI";
          scope.newGrade = "B";
          scope.newCredit = 4;
          scope.addCourse();
          //all of the http requests are added into a queue and are all run when the flush() method is called
          httpBackend.flush();
          expect(courseList[0]).toEqual({title:"CSCI", grade: "B",credit:4});
      });

      it('should return empty object', function() {
          scope.newCourse = "CSCI";
          scope.newGrade = "B";
          scope.newCredit = 4;
          scope.addCourse();
          //The _id is used so the correct course is deleted from the "database"
          scope.deleteCourse({title:"CSCI", grade: "B", credit:4, _id:1});
          httpBackend.flush();
          expect(courseList.length).toEqual(0);
          expect(courseList[0]).toEqual(undefined);
      });
  });
});
