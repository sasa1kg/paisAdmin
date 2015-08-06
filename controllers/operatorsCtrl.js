angular.module('adminApp').controller("operatorsCtrl", ["$scope", "$http", "$filter",  function (scope, http, filter) {

	console.log("operatorsCtrl!");
	scope.msg = "operatorsCtrl!";

	scope.adminName = "Pais admin";

	scope.operaters = [
		{
			"id" : 1,
			"username" : "Operater1",
			"tasksAssigned" : 24,
			"tasksCompleted" : 16
		},
		{
			"id" : 2,
			"username" : "OrtofotoOperater",
			"tasksAssigned" : 42,
			"tasksCompleted" : 36
		},
		{
			"id" : 3,
			"username" : "SenzorOperater3",
			"tasksAssigned" : 18,
			"tasksCompleted" : 17
		},
		{
			"id" : 4,
			"username" : "SenzorOperater10",
			"tasksAssigned" : 18,
			"tasksCompleted" : 17
		}

	];

}]);