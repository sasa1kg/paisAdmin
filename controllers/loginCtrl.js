angular.module('adminApp').controller("loginCtrl", ["$scope", "$http", "$filter", "ServerService", "$location",  
	function (scope, http, filter, ServerService, location) {

	console.log("Login!");
	scope.msg = "Login!";


	scope.expired = false;
	
	scope.init = function () {
		scope.status = (location.search()).status;
		if (scope.status != undefined && scope.status == expired) {
			scope.expired = true;
		} 
	}	
	scope.init();

}]);