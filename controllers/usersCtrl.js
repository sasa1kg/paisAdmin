angular.module('adminApp').controller("usersCtrl", ["$scope", "$http", "$filter",  function (scope, http, filter) {

	console.log("operatorsCtrl!");
	scope.msg = "operatorsCtrl!";

	scope.adminName = "Pais admin";

	scope.users = [
		{	
			"id" : 1,
			"dateReg" : "10/5/2015",
			"name" : "Mika",
			"lastname" : "Jovanovic",
			"userType" : "person",
			"orders" : 2
		},
		{
			"id" : 2,
			"dateReg" : "7/4/2015",
			"name" : "Pravno lice",
			"lastname" : "d.o.o",
			"userType" : "company",
			"orders" : 7
		},
		{
			"id" : 3,
			"dateReg" : "25/6/2015",
			"name" : "Dejan",
			"lastname" : "Dejanovic",
			"userType" : "person",
			"orders" : 4
		},
		{
			"id" : 4,
			"name" : "Firma2",
			"dateReg" : "1/3/2015",
			"lastname" : "a.d.",
			"userType" : "company",
			"orders" : 18
		},
		{
			"id" : 5,
			"name" : "Firma3",
			"dateReg" : "27/5/2015",
			"lastname" : "a.d.",
			"userType" : "company",
			"orders" : 16
		},
		{
			"id" : 6,
			"name" : "Firma4",
			"dateReg" : "30/6/2015",
			"lastname" : "a.d.",
			"userType" : "company",
			"orders" : 19
		}
	];

}]);