angular.module('adminApp').controller("redirectionCtrl", ["$scope", "$http", 
	"$filter", "$routeParams", "ServerService", "$rootScope", "$modal", "$location", 
	function (scope, http, filter, rootParams, ServerService, rootScope, modal, location) {


	scope.cloudSync = false;
	scope.retrievingUser = false;
	scope.redirectingUser = false;
	scope.error = false;

	scope.redirect = function () {
		 setTimeout(function(){ 
           	scope.redirectingUser = true;
           	location.search("id", null);
           	location.search("token", null);
           	location.search("role", null);
           	location.path("/mainPage");
           	scope.$apply();
         }, 1500); 
	}

	scope.initFiwareSession = function () {
		scope.cloudSync = true;
		scope.token = (location.search()).token;
		scope.id = (location.search()).id;
		scope.role = (location.search()).role;
		console.log("Token is " + scope.token);
		console.log("ID is " + scope.id);
		console.log("Role is " + scope.role);
		if (scope.token != undefined && scope.role == "admin") {
			scope.retrievingUser = true;
			ServerService.putUserInStorage({
				'token': scope.token,
				'id' : scope.id
			});
			scope.redirect();
		} else {
			scope.error = true;
			location.search("id", null);
           	location.search("token", null);
           	location.search("role", null);
           	location.path("/login");
		}
	}
	scope.initFiwareSession();

}]);
