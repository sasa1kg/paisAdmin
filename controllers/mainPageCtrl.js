angular.module('adminApp').controller("mainPageCtrl", ["$scope", "$http", "$filter",  function (scope, http, filter) {

	console.log("mainPageCtrl!");
	scope.msg = "mainPageCtrl!";

	scope.adminName = "Pais admin";

}]);