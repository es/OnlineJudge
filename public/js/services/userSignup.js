angular.module('judge.system').factory("userSignup", ['$http', function($http) {
    create = function(user) {
		console.log("POST user:",user);
		return $http.post("/users", user);
	};
    return create;
}]);