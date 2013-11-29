angular.module('judge.system').controller('SignupController', ['$scope', 'Global', 'userSignup', function ($scope, Global, userSignup) {
	$scope.global = Global;
	$scope.user = Global.user;
	$scope.confirm = 'hello!';

	$scope.submitUser = function () {
		//check if input is valid
		console.log("submitted!");
		userSignup($scope.user).
		success(function(data,status,headers,config){
			$location.url('/');
		}).
		error(function(data,status,headers,config){
			
		});;
	};
}]);