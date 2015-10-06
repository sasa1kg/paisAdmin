angular.module('adminApp').controller("allSettingsCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {



	scope.newCurrency = {
		"id" : "",
		"name" : "",
		"country_id" : "",
		"country_name" : ""
	};


	scope.getCurrencies = function () {
			ServerService.getCurrencies().then(function (data) {
                        if (data) {
                        	scope.currencies = data;
                        } else {
                        	 alert("Error in communication occured.");
                        }
			}, function(reason) {
			   alert("Error in communication occured.");
			});
	}
	scope.getCurrencies();


	scope.getAdmins = function () {
			ServerService.getAdministrators().then(function (data) {
                        if (data) {
                        	scope.administrators = data;
                        } else {
                        	 alert("Error in communication occured.");
                        }
			}, function(reason) {
			   alert("Error in communication occured.");
			});
	}
	scope.getAdmins();

	scope.getCountries = function () {
			ServerService.getCountries().then(function (data) {
                        if (data) {
                        	scope.countries = data;
                        	scope.newCurrency.country_id = data[0].id;
                        } else {
                        	 scope.generalError = true;
                        }
			}, function(reason) {
			   scope.generalError = true;
			});
	} 
	scope.getCountries();

	scope.addCurrency = function () {
			if (scope.newCurrency.id.length != 3) {
				alert("Currency must be 3-letter code (i.e. RSD).");
				return;
			}
			if (scope.newCurrency.name.length < 1) {
				alert("Please enter currency name.");
				return;
			}
			for (var i = scope.countries.length - 1; i >= 0; i--) {
				if (scope.countries[i].id == scope.newCurrency.country_id) {
					scope.newCurrency.country_name = scope.countries[i].name;
				}
			};
			ServerService.addNewCurrency(scope.newCurrency).then(function (data) {
                        if (data) {
                        	scope.getCurrencies();
                        		scope.newCurrency = {
									"id" : "",
									"name" : "",
									"country_id" : scope.countries[0].id,
									"country_name" : ""
								};
                        } else {
                        	 alert("Error in communication occured.");
                        }
			}, function(reason) {
			   alert("Error in communication occured.");
			});

	}

	scope.deleteCurrency = function (id) {
			ServerService.removeCurrency(id).then(function (data) {
                        if (data) {
                        	scope.getCurrencies();
                        } else {
                        	 alert("Error in communication occured.");
                        }
			}, function(reason) {
			   alert("Error in communication occured.");
			});

	}

	

}]);