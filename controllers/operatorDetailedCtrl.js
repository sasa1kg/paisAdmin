angular.module('adminApp').controller("operatorDetailedCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams",  
	function (scope, http, filter, ServerService, rootParams) {

	console.log("operatorsCtrl!");
	scope.msg = "operatorsCtrl!";

	scope.adminName = "Pais admin";

	scope.save = false;
	scope.save_success = false;

	scope.newCompanyPanel = false;

	scope.param_operator_id = rootParams.id;

	scope.selectedActive = false;

	scope.getOperatorCompanies = function () {
		ServerService.getOperatorCompanies().then(function (data) {
                        if (data) {
                        	scope.companies = data;
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}
	scope.getOperatorCompanies();



	scope.addNewCompany = function () {
		ServerService.addOperatorCompany(scope.newCompany).then(function (data) {
                        if (data) {
                        	scope.getOperatorCompanies();
                        		scope.newCompany = {
								"name" : "",
								"city_id" : scope.cities[0].id
							}
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}

	scope.getOperator = function () {
		ServerService.getOperator(scope.param_operator_id).then(function (data) {
                        if (data) {
                        	scope.selected = data;
                        	if (scope.selected.active == "1") {
                        		scope.selectedActive = true;
                        	} else {
                        		scope.selectedActive = false;
                        	}
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}

	scope.getOperator();

	scope.saveOperator = function () {
		if (scope.selectedActive) {
                scope.selected.active == "1";
         } else {
               	scope.selected.active == "0";
         }
		ServerService.updateOperator(scope.selected).then(function (data) {
                        if (data) {
                        	scope.getOperator();
                        	alert("Changes to operator profile successfully saved.");
                        }
		}, function(reason) {
			    alert("Error occured.");
		});

	}



	

}]);