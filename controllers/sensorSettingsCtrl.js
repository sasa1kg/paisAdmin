angular.module('adminApp').controller("sensorSettingsCtrl", ["$scope", "$http", "$filter", "ServerService", "$modal",  
	function (scope, http, filter, ServerService, modal) {

	console.log("ordersCtrl!");
	scope.msg = "ordersCtrl!";

	scope.adminName = "Pais admin";
	scope.newType = {
		"name" : "",
		"description" : "",
		"uoms" : []
	};
	scope.newUOM = {
		"name" : "",
		"quantity" : "",
		"level" : "",
		"symbol" : "",
		"type_id" : "",
		"type_name": ""
	};

	scope.removeType = function (id) {
		ServerService.deleteSensorType(id).then(function (data) {
                        if (data) {
                          scope.getSensorTypesDetailed();
                          scope.getUOMS();
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	}

	scope.uomRem = function(id) {
		ServerService.deleteUOM(id).then(function (data) {
                        if (data) {
                          scope.getSensorTypesDetailedNoSelect();
                          scope.getUOMS();
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	}


	scope.addNewUOM = function () {
		for (var i = scope.sensorTypes.length - 1; i >= 0; i--) {
			if (scope.sensorTypes[i].id == scope.newUOM.type_id) {
				scope.newUOM.type_name = scope.sensorTypes[i].name;
			}
		};
		ServerService.addNewUOM(scope.newUOM).then(function (data) {
                        if (data) {
                          scope.getSensorTypesDetailed();
                          scope.getUOMS();
                          scope.toggleUOMPanel();
						    scope.newUOM = {
								"name" : "",
								"quantity" : "",
								"level" : "",
								"symbol" : "",
								"type_id" : "",
								"type_name": ""
							};
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	}


	scope.uomToAdd = {};

	scope.addPanelShow = false;
	scope.addUOMShow = false;

	scope.toggleAddPanel = function () {
		scope.addPanelShow = !scope.addPanelShow;
	}

	scope.toggleUOMPanel = function () {
		scope.addUOMShow = !scope.addUOMShow;
	}

	scope.select = function (id) {
		scope.loaded = false;;
		for (var i = scope.sensorTypes.length - 1; i >= 0; i--) {
			if (scope.sensorTypes[i].id == id) {

				scope.selected = scope.sensorTypes[i];
			}
		};
	}


	scope.isActive = function (id) {
    	return scope.selected.id === id;
  	}

	scope.getUOMS = function () {
		ServerService.getUOMs().then(function (data) {
	                        if (data) {
	                           scope.uoms = data;
	                           for (var i = data.length - 1; i >= 0; i--) {
	                           	 if (data[i].type_id == null) {
	                           	 	scope.availableUOMs.push();
	                           	 }
	                           };
	                        } else {
	                            alert("Error occured.");
	                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	}
	scope.getUOMS();


	scope.addNewType = function () {
			if (scope.newType.name.length < 3) {
				alert("Please enter sensor type name.");
			}
			ServerService.addSensorType(scope.newType).then(function (data) {
                        if (data) {
                           /*if (scope.newType.uoms.length > 0 ) {
                           		for (var i = scope.newType.uoms.length - 1; i >= 0; i--) {
                           			scope.newType.uoms[i]
                           		};
                           }*/
                           scope.getSensorTypesDetailed();
                           scope.getUOMS();
                           scope.toggleAddPanel();
                           	scope.newType = {
								"name" : "",
								"description" : "",
								"uoms" : []
							};
                        } else {
                            alert("Error occured.");
                        }
			}, function(reason) {
			   alert("Error occured.");
			});
	} 

	scope.addUOM = function () {
		for (var i = scope.availableUOMs.length - 1; i >= 0; i--) {
			if (scope.availableUOMs[i].id == scope.uomToAdd) {
				scope.newType.uoms.push(scope.availableUOMs[i]);
				scope.availableUOMs.splice(i, 1);
				if (scope.availableUOMs.length > 0)  {
					scope.uomToAdd = scope.availableUOMs[0].id;
				}
				break;
			}
		};
	}

	scope.removeUOM = function (id) {
		for (var i = scope.newType.uoms.length - 1; i >= 0; i--) {
			if (scope.newType.uoms[i].id == id) {
				scope.availableUOMs.push(scope.newType.uoms[i]);
				scope.newType.uoms.splice(i, 1);
			}
		};
	}

	scope.saveChangesType = function () {
		if (scope.selected.name.length < 3) {
			alert("Please enter sensor type name.");
			return;
		}
		if (scope.selected.description.length < 3) {
			alert("Please enter sensor type description.");
			return;
		}
		ServerService.updateSensorType(scope.selected).then(function (data) {
                        if (data) {
                           scope.getUOMS();
                           scope.getSensorTypesDetailedNoSelect();
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		   alert("Error occured.");
		});
	}

	scope.getSensorTypesDetailed = function() {
		ServerService.getSensorTypes().then(function (data) {
                        if (data) {
                           scope.sensorTypes = data;
                           scope.select(data[0].id);
                           scope.newUOM.type_id = data[0].id;
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		   alert("Error occured.");
		});
	}
	scope.getSensorTypesDetailed();

	scope.getSensorTypesDetailedNoSelect = function() {
		ServerService.getSensorTypes().then(function (data) {
                        if (data) {
                           scope.sensorTypes = data;
                           scope.select(scope.selected.id);
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		   alert("Error occured.");
		});
	}

	scope.showUOMModal = function (id) {
		var editUOMModal = modal.open({
                animation: true,
                templateUrl: 'editUOM.html',
                controller: 'editUOMCtrl',
                resolve: {
	                getUOM: function() {
	                    for (var i = scope.uoms.length - 1; i >= 0; i--) {
	                    	if (scope.uoms[i].id == id) {
	                    		return scope.uoms[i];
	                    	}
	                    };
	                },
	                sensorTypes: function() {
	                	return scope.sensorTypes;
	                }
            	}
    	});

    	editUOMModal.result.then(function (saved) {
            if(saved == true){
                ServerService.getUOMs().then(function (data) {
	                        if (data) {
	                           scope.uoms = data;
	                           ServerService.getSensorTypes().then(function (data) {
				                        if (data) {
				                           scope.sensorTypes = data;
				                           scope.select(scope.selected.id);
				                           scope.dismissModal();
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
        });
	}
	

}]);

angular.module('adminApp').controller('editUOMCtrl', function ($scope, $modalInstance, $location, $modal, ServerService, $rootScope, getUOM, sensorTypes) {
    	
  		$scope.uom = getUOM;
  		$scope.sensorTypes = sensorTypes;

    	$scope.dismissModal = function () {
        	$modalInstance.dismiss('cancel');
    	};

    	$scope.saveChanges = function () {
    		if ($scope.uom.name.length < 3) {
				alert("Please enter UOM name.");
				return;
			}
			if ($scope.uom.level.length < 1) {
				alert("Please enter UOM level.");
				return;
			}
			if ($scope.uom.quantity.length < 1) {
				alert("Please enter UOM quantity.");
				return;
			}
			if ($scope.uom.symbol.length < 1) {
				alert("Please enter UOM symbol.");
				return;
			}
    		ServerService.updateUOM($scope.uom).then(function (data) {
                        if (data) {
                           $modalInstance.close(true);
                        } else {
                            alert("Error occured.");
                        }
			}, function(reason) {
			   alert("Error occured.");
			});
   		};

   		$scope.removeUOM = function () {
    		ServerService.deleteUOM($scope.uom.id).then(function (data) {
                        if (data) {
                           $modalInstance.close(true);
                        } else {
                            alert("Error occured.");
                        }
			}, function(reason) {
			   alert("Error occured.");
			});
   		};
    
});