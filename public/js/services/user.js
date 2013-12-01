angular.module('judge.system').factory("User", ['$http', function($http) {
    var api = {};

    /*
	 * Attempts to create new user account, returns promise
     */
    api.create = function(user) {
		console.log("POST user:",user);
		return $http.post("/users", user);
	};

	/*
	 * Attempts to authenticate user, returns promise
	 */
	api.login = function (loginData) {
		return $http.post("/users/session", loginData);
	};

    return api;
}]);