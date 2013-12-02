angular.module('judge.system').controller('HeaderController', ['$scope', 'Global', '$location', '$window', 'User', 'Utility', function ($scope, Global, $location, $window, User, Utility) {
    $scope.global = Global;
    
    $scope.loginData = {
        email: '',
        password: '',
        failure: {
            email: false,
            password: false
        }
    };

    $scope.login = function () {
        if (!$scope.loginData.email) {
            $scope.loginData.failure.email = true;
            Utility.alert.info({
                message: 'You did not input an email',
                type: 'error'
            });
        }


        if (!$scope.loginData.password) {
            $scope.loginData.failure.password = true;
            Utility.alert.info({
                message: 'You didn\'t a password',
                type: 'error'
            });
        }

        $scope.loginData.failure.password = false;
        $scope.loginData.failure.email = false;

        User.login($scope.loginData).
        success(function(data, status, headers, config){
            Global.authenticated = true;
            Global.user = data;
        }).
        error(function(data, status, headers, config){
            if (data.message === 'email') {
                $scope.loginData.failure.email = true;
                Utility.alert.info({
                    message: 'Invalid Email',
                    type: 'error'
                });
            }
            if (data.message === 'password') {
                $scope.loginData.failure.password = true;
                Utility.alert.info({
                    message: 'Invalid Password',
                    type: 'error'
                });
            }
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