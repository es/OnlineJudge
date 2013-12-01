angular.module('judge.system').controller('HeaderController', ['$scope', 'Global', '$location', '$window', 'User', function ($scope, Global, $location, $window, User) {
    $scope.global = Global;
    console.log('Global:', Global);
    $scope.loginData = {
        email: '',
        password: '',
        failure: {
            email: false,
            password: false
        }
    };

    $scope.login = function () {
        if (!$scope.loginData.email || !$scope.loginData.password)
            alert ("Bad data :(");

        $scope.loginData.failure.password = false;
        $scope.loginData.failure.email = false;

        User.login($scope.loginData).
        success(function(data, status, headers, config){
            Global.authenticated = true;
            Global.user = data;
        }).
        error(function(data, status, headers, config){
            if (data.message === 'email')
                $scope.loginData.failure.email = true;
            if (data.message === 'password')
                $scope.loginData.failure.password = true;
            Global.authenticated = false;
            Global.user = null;
        });
    };

    $scope.logout = function () {
        $window.location.href = '/signout';
    };

    $scope.locationEqual = function (currURL, arr) {
		var currentPath = $location.path();
		if (currentPath === currURL)
			return true;
		for (var path in arr) {
			if (currentPath === currURL + "/" + arr[path])
				return true;
		}
		return false;
    };

    $scope.menu = [{
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Create New Article",
        "link": "articles/create"
    }];
    
    $scope.isCollapsed = false;
}]);