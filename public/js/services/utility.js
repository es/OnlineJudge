angular.module('judge.system').factory("Utility", ['$window', function($window) {
    var Utility = {};
    
    $window.Messenger.options = {
		extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
		theme: 'flat'
	};

    Utility.alert = {
		info: function (obj) {
			$window.Messenger().post(obj);
		}
    };


    return Utility;
}]);