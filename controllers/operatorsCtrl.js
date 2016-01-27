angular.module('adminApp').controller("operatorsCtrl", ["$scope", "$http", "$filter", "ServerService", "Excel", "$timeout",
	function (scope, http, filter, ServerService, Excel, timeout) {

	console.log("operatorsCtrl!");
	scope.msg = "operatorsCtrl!";

	scope.exportToExcel = function (tableId) {
		scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
        timeout(function(){location.href=scope.exportHref;},100); 
	}

	scope.adminName = "Pais admin";

	scope.save = false;
	scope.save_success = false;

	scope.newCompanyPanel = false;

	scope.toggleNewCompany = function () {
		scope.newCompanyPanel = !scope.newCompanyPanel;
	}

	scope.newOperatorPanel = false;

	scope.toggleNewOperator = function () {
		scope.newOperatorPanel = !scope.newOperatorPanel;
	}

	scope.newCompany = {
		"name" : "",
		"city_id" : ""
	}

	scope.newOperator = {
		"company_id" : "",
        "company_name":"",
        "email":"",
        "password":"",
        "user_name" : "",
        "first_name":"",
        "last_name":"",
        "phone":"",
        "active": 1
	}




	scope.getOperatorsFromCompany = function (company_id) {
		ServerService.getOperatorsFromCompany(company_id).then(function (data) {
                        if (data) {
                        	scope.operators = data;
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}

	scope.getOperatorCompanies = function () {
		ServerService.getOperatorCompanies().then(function (data) {
                        if (data) {
                        	scope.companies = data;
                        	scope.newOperator.company_id = data[0].id;
                        	scope.select(data[0].id);
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}
	scope.getOperatorCompanies();

	scope.select = function (company_id) {
		scope.loaded = false;;
		for (var i = scope.companies.length - 1; i >= 0; i--) {
			if (scope.companies[i].id == company_id) {
				scope.selected = scope.companies[i];
				scope.getOperatorsFromCompany(scope.companies[i].id);
			}
		};
	}


	scope.isActive = function (company_id) {
    	return scope.selected.id === company_id;
  	}

	scope.getCities = function () {
		ServerService.getCities().then(function (data) {
                        if (data) {
                        	scope.cities = data;
                        	scope.newCompany.city_id = data[0].id;
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}
	scope.getCities();


	scope.removeCompany = function (id) {
		ServerService.deleteOperatorCompany(id).then(function (data) {
                        if (data) {
                        	scope.getOperatorCompanies();
                        }
		}, function(reason) {
			    alert("Error occured.");
		});

	}


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

	scope.getOperators = function () {
		ServerService.getOperators().then(function (data) {
                        if (data) {
                        	scope.operators = data;
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}


	scope.addNewOperator = function () {
		if (scope.newOperator.first_name.length < 1) {
        alert("Please enter operators first name.");
        return;
	      }
	      if (scope.newOperator.last_name.length < 1) {
	        alert("Please enter operators last name.");
	        return;
	      }
	      if (scope.newOperator.user_name.length < 1) {
	        alert("Please enter operators username.");
	        return;
	      }
	      if (scope.newOperator.password.length < 1) {
	        alert("Please enter operators password.");
	        return;
	      }
	      if (scope.newOperator.email.length < 1) {
	        alert("Please enter operators e-mail.");
	        return;
	      }
	      if (scope.newOperator.phone.length < 1) {
	        alert("Please enter operators phone.");
	        return;
	      }
		for (var i = scope.companies.length - 1; i >= 0; i--) {
			if (scope.companies[i].id == scope.newOperator.company_id) {
				scope.newOperator.company_name = scope.companies[i].name;
			}
		};
		ServerService.addOperator(scope.newOperator).then(function (data) {
                        if (data) {
                        	scope.getOperators();
                        		scope.newOperator = {
									"company_id" : scope.companies[0].id,
							        "company_name":"",
							        "username":"",
							        "email":"",
							        "password":"",
							        "first_name":"",
							        "last_name":"",
							        "phone":"",
							        "active":"1"
								};
								scope.toggleNewOperator();
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}

	scope.removeOperator = function (id) {
		ServerService.deleteOperator(id).then(function (data) {
                        if (data) {
                        	scope.getOperators();
                        }
		}, function(reason) {
			    alert("Error occured.");
		});

	}
	

}]);