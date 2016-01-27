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
                        	scope.untouchedSelected = {
                        		"active" : data.active,
                        		"password" : data.password
                        	};
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
                scope.selected.active = 1;
         } else {
               	scope.selected.active = 0;
         }
         if (scope.selected.active != scope.untouchedSelected.active) {
	      if (scope.selectedActive) {
	          ServerService.activateAccountOperator(scope.selected.id).then(function (data) {
	                        if (data) {
	                            scope.untouchedSelected.active = scope.selected.active;
	                            alert("Successful activation of operator account");
	                        } else {
	                            alert("Error occured on activation.");
	                        }
	          }, function(reason) {
	               alert("Error occured on activation.");
	          });
	      } else {
	        ServerService.deactivateAccountOperator(scope.selected.id).then(function (data) {
	                        if (data) {
	                          scope.untouchedSelected.active = scope.selected.active;
	                          alert("Successful deactivation of operator account");
	                        } else {
	                            alert("Error occured on deactivation.");
	                        }
	          }, function(reason) {
	               alert("Error occured on deactivation.");
	          });
	      }
	    }
	    if (scope.selected.password != scope.untouchedSelected.password) {
	    	alert("Change password");
	          ServerService.changePasswordOperator(scope.selected.id, {
	            "oldPassword": scope.untouchedSelected.password,
	            "newPassword": scope.selected.password
	          }).then(function (data) {
	                            scope.untouchedSelected.password = scope.selected.password;
	                            alert("Password changed on operator account");
	          }, function(reason) {
	               alert("Error occured on change password.");
	          });
	    }

         var operatorToSave = {
         	    "id": scope.selected.id,
         	    "user_name" : scope.selected.user_name,
			    "company_id": scope.selected.company_id,
			    "email": scope.selected.email,
			    "first_name": scope.selected.first_name,
			    "last_name": scope.selected.last_name,
			    "phone": scope.selected.last_name,
			    "active": scope.selected.active
         };
		ServerService.updateOperator(operatorToSave).then(function (data) {
                        if (data) {
                        	scope.getOperator();
                        	alert("Changes to operator profile successfully saved.");
                        }
		}, function(reason) {
			    alert("Error occured.");
		});

	}



	

}]);