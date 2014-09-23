'use strict';

describe('Controller: UmmCtrl', function () {

  // load the controller's module
  beforeEach(module('yeoMeanApp'));

  var UmmCtrl, scope, httpBackend, movieList;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    UmmCtrl = $controller('UmmCtrl', {
      $scope: scope
    });
    movieList = [];
      //The following httpBackend things will determine what will happen when an http request is called during our tests
    httpBackend.when('POST', '/api/courses').respond(function(method, url, data, headers) {
        courseList.push(JSON.parse(data));
        return [200, {}, {}];
    });
    httpBackend.when('GET', '/api/courses').respond(courseList);
      //The 1 is for identifying the _id on the movie in the "database"
    httpBackend.when('DELETE', '/api/courses/1').respond(function() {
        courseList.splice(courseList.indexOf({title:"CSCI", grade:"B", credit: 4}),1);
        return [200, {}, {}];
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  describe('testing add and delete from the database', function() {
      it('should add a new movie "Batman" with a rating of 9 and return it', function() {
          scope.newCourse = "CSCI";
          scope.newGrade = "B";
          scope.newCredit = 4;
          scope.addCourse();
          //all of the http requests are added into a queue and are all run when the flush() method is called
          httpBackend.flush();
          expect(movieList[0]).toEqual({name:"Batman", rating:9});
      });

      it('should return empty object', function() {
          scope.newMovie = "Batman";
          scope.newRating = 9;
          scope.addMovie();
          //The _id is used so the correct movie is deleted from the "database"
          scope.deleteMovie({name:"Batman", rating:9, _id:1});
          httpBackend.flush();
          expect(movieList.length).toEqual(0);
          expect(movieList[0]).toEqual(undefined);
      });
  });
});
