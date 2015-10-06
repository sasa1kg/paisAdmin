angular.module('adminApp').controller("usersCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {

	console.log("operatorsCtrl!");
	scope.msg = "operatorsCtrl!";

	scope.adminName = "Pais admin";

	scope.save = false;
	scope.save_success = false;

	scope.select = function (id) {
		for (var i = scope.users.length - 1; i >= 0; i--) {
			if (scope.users[i].id == id) {
				scope.selected = scope.users[i];
				scope.getClientOrders(id);
				if (scope.selected.active==1) {
                     scope.selectedActive = true;
                } else {
                     scope.selectedActive = false;
                }
                scope.save_success = false;
                scope.save = false;
			}
		};
	}


	scope.isActive = function (id) {
    	return scope.selected.id === id;
  	}

  	scope.getClientOrders = function (clientId) {
  		scope.ordersLoaded = false;
  		ServerService.clientOrders(clientId).then(function (data) {
                        if (data) {
                           scope.selectedOrders = data;
                           scope.ordersLoaded = true;
                        } else {
                            alert("Error occured.");
                        }
	    }, function(reason) {
	        alert("Error occured.");
	    });
  	}

  	scope.getAccountTypes = ServerService.getAccountTypes().then(function (data) {
                        if (data) {
                           scope.accountTypes = data;
                        } else {
                            alert("Error occured.");
                        }
    }, function(reason) {
         alert("Error occured.");
    });

    scope.getCountries = ServerService.getCountries().then(function (data) {
                        if (data) {
                           scope.countries = data;
                        } else {
                            alert("Error occured.");
                        }
    }, function(reason) {
         alert("Error occured.");
    });

	scope.getClients = ServerService.getClients().then(function (data) {
                        if (data) {
                           scope.users = data;
                           scope.selected = data[0];
                           if (data[0].active==1) {
                           		scope.selectedActive = true;
                           } else {
                           		scope.selectedActive = false;
                           }
                           scope.getClientOrders(scope.selected.id);
                        } else {
                           alert("Error occured.");
                        }
    }, function(reason) {
        alert("Error occured.");
    });

	scope.activeChange = function () {
		scope.selected.active = !scope.selected.active;
	}


	scope.saveUser = function () {
     if (scope.selected.first_name.length < 1) {
        alert("Please enter users first name.");
        return;
      }
      if (scope.selected.last_name.length < 1) {
        alert("Please enter users last name.");
        return;
      }
      if (scope.selected.username.length < 1) {
        alert("Please enter users username.");
        return;
      }
      if (scope.selected.password.length < 1) {
        alert("Please enter users password.");
        return;
      }
      if (scope.selected.email.length < 1) {
        alert("Please enter users e-mail.");
        return;
      }
      if (scope.selected.phone.length < 1) {
        alert("Please enter users phone.");
        return;
      }
		scope.save = true;
		if (scope.selectedActive) {
			scope.selected.active = 1;
		} else {
			scope.selected.active = 0;
		}
		scope.selected.type_id = Number(scope.selected.type_id);
		ServerService.updateClient(scope.selected).then(function (data) {
                        if (data) {
                        	scope.save_success = true;
                        	scope.save = false;
                        } else {
                            alert("Error occured.");
                        }
	    }, function(reason) {
	         alert("Error occured.");
	    });
	}

}]);