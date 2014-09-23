'use strict';

angular.module('yeoMeanApp')
  .controller('UmmCtrl', function ($scope, $http) {
    $scope.courseList = [];

    //Update courseList to have the same data that's in the database on the sever
    $http.get('/api/courses').success(function(courseList) {
        $scope.courseList = courseList;
    });

    $scope.addCourse = function() {
        if($scope.newTitle === ''  || $scope.newGrade === '' || $scope.newCredit === '') {
            return;
        }
        $http.post('/api/courses', { title: $scope.newTitle, grade: $scope.newGrade, credit: $scope.newCredit }).success(function(){
            //Update courseList to have the same data that's in the database on the sever
            $http.get('/api/courses').success(function(courseList) {
                $scope.courseList = courseList;
            });
            $scope.newTitle = '';
            $scope.newGrade = '';
            $scope.newCredit ='';
        });
    };

    $scope.deleteCourse = function(course) {
        $http.delete('/api/courses/' + course._id).success(function(){
            //Update courseList to have the same data that's in the database on the sever
            $http.get('/api/courses').success(function(courseList) {
                $scope.courseList = courseList;
            });
        });
    };
  });
