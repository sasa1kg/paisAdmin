angular.module('adminApp').controller("imageSettingsCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {

	console.log("ordersCtrl!");
	scope.msg = "ordersCtrl!";

	scope.adminName = "Pais admin";
	
	scope.newType = {
		"name" : "",
		"description" : "",
		"status" : 1
	}

	scope.newFreq = {
		"name" : "",
		"description" : "",
		"status" : 1
	}

	scope.getImageTypes = function() {
		ServerService.getImageTypes().then(function (data) {
                        if (data) {
                           scope.imageTypes = data;
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	}
	scope.getImageTypes();


	scope.isActive = function (id) {
		for (var i = scope.imageTypes.length - 1; i >= 0; i--) {
			if (scope.imageTypes[i].id == id && scope.imageTypes[i].active == "1") {
				return true;
			} else {
				return false;
			}
		};
	}

	scope.toggleStatus = function (id) {
		for (var i = scope.imageTypes.length - 1; i >= 0; i--) {
			if (scope.imageTypes[i].id == id) {
				if (scope.imageTypes[i].active == "1") {
					scope.imageTypes[i].active = "0";
				} else {
					scope.imageTypes[i].active = "1";
				}
				ServerService.updateImageType(scope.imageTypes[i]).then(function (data) {
                        if (data) {
                           scope.getImageTypes();
                        } else {
                            alert("Error occured.");
                        }
				}, function(reason) {
				    alert("Error occured.");
				});
			} 
		};
	}


	scope.addNewType = function () {
		ServerService.addImageType(scope.newType).then(function (data) {
                        if (data) {
                           	
								scope.newType = {
									"name" : "",
									"description" : "",
									"status" : 1
								}

								scope.getImageTypes();

                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
			 alert("Error occured.");
		});
	}


	scope.deleteImageType = function (id) {
		ServerService.deleteImageType(id).then(function (data) {
                        if (data) {

								scope.getImageTypes();

                        } else {
                           alert("Error occured.");
                        }
		}, function(reason) {
			 alert("Error occured.");
		});
	}


	scope.getAllFrequencies = function () {
		ServerService.getFrequencies().then(function (data) {
                        if (data) {

							scope.frequencies = data;

                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
			 alert("Error occured.");
		});
	}

	scope.getAllFrequencies();


	scope.deleteFrequency = function (id) {
		ServerService.deleteFrequency(id).then(function (data) {
                        if (data) {

								scope.getAllFrequencies();

                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
			 alert("Error occured.");
		});
	}


	scope.addNewFreq = function () {
		ServerService.addNewFreq(scope.newFreq).then(function (data) {
                        if (data) {
                           	
								
								scope.newFreq = {
									"name" : "",
									"description" : "",
									"status" : 1
								}

								scope.getAllFrequencies();

                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
			 alert("Error occured.");
		});
	}

	scope.toggleFreqStatus = function (id) {
		for (var i = scope.frequencies.length - 1; i >= 0; i--) {
			if (scope.frequencies[i].id == id) {
				if (scope.frequencies[i].active == "1") {
					scope.frequencies[i].active = "0";
				} else {
					scope.frequencies[i].active = "1";
				}
				ServerService.updateFrequency(scope.frequencies[i]).then(function (data) {
                        if (data) {
                           scope.getAllFrequencies();
                        } else {
                           alert("Error occured.");
                        }
				}, function(reason) {
				    alert("Error occured.");
				});
			} 
		};
	}




}]);