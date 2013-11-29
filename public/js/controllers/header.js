angular.module('judge.system').controller('HeaderController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;
    
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