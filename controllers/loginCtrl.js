angular.module('adminApp').controller("loginCtrl", ["$scope", "$http", "$filter",  function (scope, http, filter) {

	console.log("Login!");
	scope.msg = "Login!";

}]);