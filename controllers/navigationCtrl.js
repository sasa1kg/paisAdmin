angular.module('adminApp').controller("navigationCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {

		scope.logout = function () {
			ServerService.logout();
		}
}]);