angular.module('adminApp').controller("generalSettingsCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {

	console.log("ordersCtrl!");
	scope.msg = "ordersCtrl!";

	scope.adminName = "Pais admin";
	scope.newCountry = {
		"name" : "",
		"id" : "",
		"active" : 1
	}
	scope.newCity = {
		"name" : "",
		"country_id" : "",
		"country_name" : ""
	}


	scope.getCities = function () {
			ServerService.getCities().then(function (data) {
                        if (data) {
                        	scope.cities = data;
                        } else {
                        	 scope.generalError = true;
                        }
			}, function(reason) {
			   scope.generalError = true;
			});
	}
	scope.getCities();

	scope.deleteCity = function (id) {
		ServerService.deleteCity(id).then(function (data) {
                        if (data) {
                        	scope.getCities();
                        }
		}, function(reason) {
			   scope.generalError = true;
		});
	}

	scope.addNewCity = function () {
		if (scope.newCity.name.length < 1) {
			alert("Please enter country name.");
			return;
		}
		for (var i = scope.countries.length - 1; i >= 0; i--) {
			if (scope.countries[i].id == scope.newCity.country_id) {
				scope.newCity.country_name = scope.countries[i].name;
			}
		};
		ServerService.addNewCity(scope.newCity).then(function (data) {
                        if (data) {
                        	scope.getCities();
                        			scope.newCity = {
										"name" : "",
										"country_id" : scope.countries[0].id,
										"country_name" : ""
									}
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}


	scope.getCountries = function () {
			ServerService.getCountries().then(function (data) {
                        if (data) {
                        	scope.countries = data;
                        	scope.newCity.country_id = data[0].id;
                        } else {
                        	 scope.generalError = true;
                        }
			}, function(reason) {
			   scope.generalError = true;
			});
	} 
	scope.getCountries();


	scope.deleteCountry = function (id) {
		ServerService.deleteCountry(id).then(function (data) {
                        if (data) {
                        	scope.getCountries();
                        }
		}, function(reason) {
			   scope.generalError = true;
		});
	}

	scope.addNewCountry = function () {
		if (scope.newCountry.name.length < 1) {
			alert("Please enter country name.");
			return;
		}
		if (scope.newCountry.id.length != 3) {
			alert("Please enter 3-letter country code (i.e. SRB).");
			return;
		}
		ServerService.addNewCountry(scope.newCountry).then(function (data) {
                        if (data) {
                        	scope.getCountries();
                        		scope.newCountry = {
												"name" : "",
												"id" : "",
												"active" : 1
								}
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}

	scope.toggleStatus = function (id) {
		for (var i = scope.countries.length - 1; i >= 0; i--) {
			if (scope.countries[i].id == id) {
					if (scope.countries[i].active == 1) {
						scope.countries[i].active = 0;
					} else {
						scope.countries[i].active = 1;
					}
					
					ServerService.updateCountry(scope.countries[i]).then(function (data) {
			                        if (data) {
			                        	scope.getCountries();
			                        }
					}, function(reason) {
						    alert("Error occured.");
					});
		}
	}
	}
	

}]);