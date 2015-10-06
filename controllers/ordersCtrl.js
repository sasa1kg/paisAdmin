angular.module('adminApp').controller("ordersCtrl", ["$scope", "$http", "$filter", "ServerService",  
	function (scope, http, filter, ServerService) {

	console.log("ordersCtrl!");
	scope.msg = "ordersCtrl!";

	scope.adminName = "Pais admin";
	scope.loaded = false;
	scope.orders = [];
	scope.noOrders = false;

	scope.filter = -1;
	scope.pages = 5;

	scope.setPage = function (page) {
		scope.currentPage = page;

	}


	scope.getCount = function () {
		ServerService.getAllOrdersCount(scope.filter).then(function (data) {
                        if (data) {
                           scope.ordersCount = data.count;
                           if (scope.ordersCount % 10) {
                           		scope.pages = scope.ordersCount / 10;
                           } else {
                           		scope.pages = scope.ordersCount / 10 + 1; 
                           }
                           scope.currentPage = 1;
                        } else {
                            alert("Error occured.");
                            alert(scope.pages);
                           scope.currentPage = 1;
                        }
			}, function(reason) {
			    alert("Error occured.");
			    alert(scope.pages);
			    scope.currentPage = 1;
			});
	}
	scope.getCount();

	scope.refreshList = function (filter_id) {
		if (scope.filter != filter_id) {
			scope.getOrders = ServerService.getAllOrders().then(function (data) {
                        if (data) {
                        	scope.filter = filter_id;
                           scope.orders = data;
                           scope.select(data[0].order_id, data[0].client_id);
                        } else {
                            alert("Error occured.");
                        }
			}, function(reason) {
			    alert("Error occured.");
			});
		}
	}


	scope.select = function (id, client_id) {
		scope.loaded = false;;
		for (var i = scope.orders.length - 1; i >= 0; i--) {
			if (scope.orders[i].order_id == id && scope.orders[i].client_id == client_id) {
				scope.selected = scope.orders[i];
				scope.getOrderDetails();
			}
		};
	}


	scope.isActive = function (id, client_id) {
    	return scope.selected.order_id === id && scope.selected.client_id === client_id;
  	}

	scope.getOrderDetails = function () {
		
		ServerService.clientOrderDetailed(scope.selected.client_id, scope.selected.order_id).then(function (data) {
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

	scope.getOrders = ServerService.getAllOrders().then(function (data) {
                        if (data) {
                           scope.orders = data;
                           if (data != undefined && data.length > 0) {
                           		scope.select(data[0].order_id, data[0].client_id);
                       		} else {
                       			scope.noOrders = true;
                       		}
                        } else {
                            alert("Error occured.");
                        }
	}, function(reason) {
	    alert("Error occured.");
	});

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

}]);