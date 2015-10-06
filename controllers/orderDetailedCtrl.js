angular.module('adminApp').controller("orderDetailedCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams", "Upload", "$timeout",  
	function (scope, http, filter, ServerService, rootParams, Upload, $timeout) {

	console.log("ordersCtrl!");
	scope.msg = "ordersCtrl!";

	scope.adminName = "Pais admin";
	scope.loaded = false;


	scope.param_order_id = rootParams.id;
	scope.param_user_id = rootParams.user_id;

	scope.getOrderDetails = function () {
		ServerService.clientOrderDetailed(scope.param_user_id, scope.param_order_id).then(function (data) {
                        if (data) {
                           scope.selectedDetailed = data;
                           ServerService.getClient(data.client_id).then(function (data) {
	                        		if (data) {
	                        			scope.selectedDetailedUser = data;
	                        			scope.loaded = true;
	                        		} else {
							                alert("Error occured.");
							        }
								}, function(reason) {
								    alert("Error occured.");
								});
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	} 

	scope.getOrderDetails();


	scope.getSensorTypesDetailed = ServerService.getSensorTypes().then(function (data) {
                        if (data) {
                           scope.sensorTypes = data;
                        } else {
                            alert("Error occured.");
                        }
	}, function(reason) {
	    alert("Error occured.");
	});

	scope.getUOMS = ServerService.getUOMs().then(function (data) {
                        if (data) {
                           scope.uoms = data;
                        } else {
                           alert("Error occured.");
                        }
	}, function(reason) {
	    alert("Error occured.");
	});

	scope.getSensorTypeName = function (type_id) {
		for (var i = scope.sensorTypes.length - 1; i >= 0; i--) {
			if (scope.sensorTypes[i].id == type_id) {
				return scope.sensorTypes[i].name;
			}
		};
	}

	scope.getUOMName = function (uom_id) {
		for (var i = scope.uoms.length - 1; i >= 0; i--) {
			if (scope.uoms[i].id == uom_id) {
				return scope.uoms[i].name;
			}
		};
	}


	scope.getOperators = function () {
		ServerService.getOperators().then(function (data) {
                        if (data) {
                        	scope.operators = data;
                        	scope.selectedOperator = data[0].id;
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}


	scope.getOperators();

	scope.uploadFiles = function(files) {
        scope.files = files;
        angular.forEach(files, function(file) {
            if (file && !file.$error) {
                file.upload = Upload.upload({
                  url: 'http://195.220.224.164/pais/clients/' + scope.param_user_id + '/orders/' + scope.param_order_id + '/sendInvoice',
                  file: file
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                    alert("Finished");
                  });
                }, function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 * 
                                           evt.loaded / evt.total));
                });
            }   
        });
    }

}]);