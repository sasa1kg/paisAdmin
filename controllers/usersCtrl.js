angular.module('adminApp').controller("usersCtrl", ["$scope", "$http", "$filter", "ServerService", "Excel", "$timeout", 
	function (scope, http, filter, ServerService, Excel, timeout) {

  scope.exportToExcel = function (tableId) {
    scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
        timeout(function(){location.href=scope.exportHref;},100); 
  }

  scope.exportToPdf = function (something) {
    $('#table3').tableExport({type:'pdf',escape:'false'});
  }

	scope.save = false;
	scope.save_success = false;

	scope.select = function (id) {
		for (var i = scope.users.length - 1; i >= 0; i--) {
			if (scope.users[i].id == id) {
				scope.selected = scope.users[i];
        scope.untouchedSelected = {
          "active" : Number(scope.users[i].active),
          "password" : scope.users[i].password
        };
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
    if (scope.selected.active != scope.untouchedSelected.active) {
      if (scope.selected.active) {
          ServerService.activateAccount(scope.selected.id).then(function (data) {
                        if (data) {
                            scope.untouchedSelected.active = scope.selected.active;
                            alert("Successful activation of account");
                        } else {
                            alert("Error occured on activation.");
                        }
          }, function(reason) {
               alert("Error occured on activation.");
          });
      } else {
        ServerService.deactivateAccount(scope.selected.id).then(function (data) {
                        if (data) {
                          scope.untouchedSelected.active = scope.selected.active;
                        } else {
                            alert("Error occured on deactivation.");
                        }
          }, function(reason) {
               alert("Error occured on deactivation.");
          });
      }
    }
    if (scope.selected.password != scope.untouchedSelected.password) {
          ServerService.changePassword(scope.selected.id, {
            "oldPassword": scope.untouchedSelected.password,
            "newPassword": scope.selected.password
          }).then(function (data) {
                        if (data) {
                            scope.untouchedSelected.password = scope.selected.password;
                        } else {
                            alert("Error occured on change password.");
                        }
          }, function(reason) {
               alert("Error occured on change password.");
          });
    }   
		scope.selected.type_id = Number(scope.selected.type_id);
    var userForPut = {
      "id" : scope.selected.id,
      "user_name" : scope.selected.user_name,
      "email" : scope.selected.email,
      "last_login" : scope.selected.last_login,
      "registration_date" : scope.selected.registration_date,
      "user_idm_id" : scope.selected.user_idm_id,
      "active" : scope.selected.active,
      "first_name": scope.selected.first_name,
      "last_name": scope.selected.last_name,
      "phone": scope.selected.phone,
      "type_id": scope.selected.type_id,
      "type_name": scope.selected.type_name,
      "country_code": scope.selected.country_code,
      "country_name": scope.selected.country_name
    };
		ServerService.updateClient(userForPut).then(function (data) {
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