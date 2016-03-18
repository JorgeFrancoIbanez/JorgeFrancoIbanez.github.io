'use strict';
angular.module('yapp')
.controller('teacherCourseCtrl', ['$scope', '$location','$http','passDataService','$rootScope' ,function($scope, $location, $http, passDataService,$rootScope,sessionService) {



	if (('type') == 'teacher'){

		$http({
			url: "http://172.16.8.31:8082/teacher/"+sessionStorage.getItem('user')+"/courses",
			method: "GET",
			data: $.param( {username: sessionStorage.getItem('user'), token:sessionStorage.getItem('token')})
		}).success(function (response){
				console.log(response);
				$scope.json = response;
				$scope.courses = response.courses;
				$scope.id = $scope.json.id;
				$scope.names = $scope.json.names;
				$scope.lastnames = $scope.json.lastnames;
				$scope.resources_uri = $scope.json.resources_uri;
				$scope.coursename = $scope.json.courses.subjct_name;
				$scope.size = $scope.json.courses.length;
		});

		if(sessionStorage.getItem('user')==$scope.username){
			$location.path('/login');
		}
	}
	else{
		console.log("no es profe");
		$location.path('/error');
	}
}]);
	
