'use strict';

angular.module('yeoMeanApp')
  .controller('UmmCtrl', function ($scope, $http) {
    $scope.courseList = [];

    //Update courseList to have the same data that's in the database on the sever
    $http.get('/api/courses').success(function(courseList) {
        $scope.courseList = courseList;
    });

      //  function ClassCtrl($scope) {
            $scope.convertGradeToGPA = function(grade) {
                switch (grade) {
                    case "A","a":
                        return 4.0;
                        break;
                    case "A-","a-":
                        return 3.7;
                        break;
                    case "B+","b+":
                        return 3.33;
                        break;
                    case "B","b":
                        return 3.0;
                        break;
                    case "B-","b-":
                        return 2.7;
                        break;
                    case "C+","c+":
                        return 2.3;
                        break;
                    case "C","c":
                        return 2.0;
                        break;
                    case "C-","c-":
                        return 1.7;
                        break;
                    case "D+","d+":
                        return 1.3;
                        break;
                    case "D","d":
                        return 1.0;
                        break;
                    case "D-","d-":
                        return 0.7;
                        break;
                    case "F","f":
                        return 0;
                        break;
                    default:
                        return null;
                };
            };

            $scope.calculateGPA = function() {
                var gradePoints = 0;
                var credits = 0;
                for(var i = 0; i < $scope.courseList.length; i++){
                    gradePoints += $scope.convertGradeToGPA($scope.courseList[i].grade) * $scope.courseList[i].credit;
                    if($scope.convertGradeToGPA($scope.courseList[i].grade)==null){
                        credits += 0;
                    }else {
                        credits += $scope.courseList[i].credit;
                    }
                    console.log(gradePoints);
                }
                if(credits == 0){
                    return 0;
                }
                return gradePoints/credits;
            };


        $scope.addCourse = function() {
            if($scope.newTitle === ''  || $scope.newGrade === '' || $scope.newCredit === '') {
                return;
            }
            $http.post('/api/courses', { title: $scope.newTitle, grade: $scope.newGrade, credit: $scope.newCredit }).success(function(){
                //Update courseList to have the same data that's in the database on the server
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

        $scope.editCourse = function(course) {
            $http.findAndModify('/api/courses/' + course._id).success(function(){
                //Update courseList to have the same data that's in the database on the sever
                $http.get('/api/courses').success(function(courseList) {
                    $scope.courseList = courseList;
                });
            });
        }

    });
