angular.module('adminApp').controller("newUserCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {



    scope.selected = {
      "first_name" : "",
      "last_name" : "",
      "password" : "",
      "phone" : "",
      "email" : "",
      "user_name" : ""
    };
    scope.selectedActive = false;

    scope.register = false;
    scope.reg_success = false;

	scope.getAccountTypes = ServerService.getAccountTypes().then(function (data) {
                        if (data) {
                           scope.accountTypes = data;
                           scope.selected.type_id = data[0].id;
                        } else {
                            alert("Error occured.");
                        }
    }, function(reason) {
         alert("Error occured.");
    });

    scope.getCountries = ServerService.getCountries().then(function (data) {
                        if (data) {
                           scope.countries = data;
                           scope.selected.country_code = data[0].id;
                        } else {
                            alert("Error occured.");
                        }
    }, function(reason) {
         alert("Error occured.");
    });

    scope.createAccount = function () {
      if (scope.selected.first_name.length < 1) {
        alert("Please enter users first name.");
        return;
      }
      if (scope.selected.user_name.length < 1) {
        alert("Please enter username.");
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
    	if (scope.selectedActive) {
    		scope.selected.active = 1;
    	} else {
    		scope.selected.active = 0;
    	}
    	scope.register = true;
    	ServerService.registerUser(scope.selected).then(function (data) {
                        if (data) {
                           scope.countries = data;
                           scope.register = false;
    					             scope.reg_success = true;
                        } else {
                           scope.generalError = true;
                        }
	    }, function(reason) {
	        scope.generalError = true;
	    });
    }

}]);