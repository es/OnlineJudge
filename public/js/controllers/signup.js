angular.module('judge.system').controller('SignupController', ['$scope', 'Global', 'User', '$location', function ($scope, Global, User, $location) {
	$scope.global = Global;

	//$scope.user = Global.user;
	$scope.formValidator = function () {
		Utility.alert.info({
			message: 'Invalid Email',
			type: 'error'
		});
	};

	$scope.submitUser = function () {
		//check if input is valid
		console.log("submitted!");
		User.create($scope.user).
		success(function(data, status, headers, config){
			delete $scope.user.password;
			$location.path('/');
			Global.authenticated = true;
			Global.user = $scope.user;
		}).
		error(function(data, status, headers, config){
			
		});
	};
}]);