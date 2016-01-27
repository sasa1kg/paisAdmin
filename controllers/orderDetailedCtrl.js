angular.module('adminApp').controller("orderDetailedCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams", "Upload", "$timeout", "$modal", "$location",  
	function (scope, http, filter, ServerService, rootParams, Upload, $timeout, modal, location) {

	console.log("ordersCtrl!");
	scope.msg = "ordersCtrl!";

	scope.adminName = "Pais admin";
	scope.loaded = false;
  scope.sendingInvoice = false;
  scope.assigning = false;

  scope.totalImages = 0;


	scope.param_order_id = rootParams.id;
	scope.param_user_id = rootParams.user_id;

  scope.roundDoubleTwo = function (num) {
            return Math.round(num * 100) / 100;
  }


	scope.assignObject = {
	    "operator_company_id": "",
	    "currency_id": "",
	    "order_value": "",
	    "order_payment_date": new Date()
	}

	scope.getCurrencies = function () {
			ServerService.getCurrencies().then(function (data) {
                        if (data) {
                        	scope.currencies = data;
                        	if (data.length > 0) {
                        		scope.assignObject.currency_id = data[0].id;
                        	}
                        } else {
                        	 alert("Error in communication occured.");
                        }
			}, function(reason) {
			   alert("Error in communication occured.");
			});
	}
	scope.getCurrencies();

	scope.getOrderDetails = function () {
		ServerService.clientOrderDetailed(scope.param_user_id, scope.param_order_id).then(function (data) {
                        if (data) {
                           scope.selectedDetailed = data;
                           ServerService.getClient(data.client_id).then(function (data) {
	                        		if (data) {
	                        			scope.selectedDetailedUser = data;
                                if (scope.selectedDetailed.polygons.length > 0) {
                                   scope.getImages();
                                   scope.getKMLs();
                                }
                                if (scope.sendingInvoice) {
                                  scope.sendingInvoice = false;
                                }
                                if (scope.assigning) {
                                  scope.assigning = false;
                                }
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

  scope.getImages = function () {
      scope.loading = true;
      scope.selectedDetailedImageResults = [];
            ServerService.clientOrderImages(scope.param_user_id, scope.param_order_id).then(function (data) {
                            if (data) {
                               if (data.length > 0) {
                                  scope.totalImages = data.length;
                                 for (var i = data.length - 1; i >= 0; i--) {
                                   if (data[i].image_type != 3) {
                                    scope.selectedDetailedImageResults.push(data[i]);
                                   }
                                 };
                               } else {
                                scope.selectedDetailedImageResults =[];
                               } 
                            } else {
                                scope.selectedDetailedImageResults =[];
                            }
                    }, function(reason) {
                            scope.selectedDetailedImageResults =[];
                    });
        

    }

    scope.getKMLs = function () {
      scope.loadingKMLs = true;
            ServerService.getKMLs(scope.param_user_id, scope.param_order_id).then(function (data) {
                            scope.loadingKMLs = false;
                            if (data) {
                               scope.selectedKMLs = data;
                            } else {
                                scope.selectedKMLs =[];
                            }
                    }, function(reason) {
                            scope.loadingKMLs = false;
                            scope.selectedKMLs =[];
                    });
    }


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

    scope.getUOMSymbol = function (type_id, uom_id) {
        for (var i = scope.sensorTypes.length - 1; i >= 0; i--) {
            if (scope.sensorTypes[i].id == type_id) {
                for (var j = scope.sensorTypes[i].uoms.length - 1; j >= 0; j--) {
                    if (scope.sensorTypes[i].uoms[j].id == uom_id) {
                        return scope.sensorTypes[i].uoms[j].symbol;
                    }
                };
            }
        };
    }

	scope.getOperatorCompanies = function () {
		ServerService.getOperatorCompanies().then(function (data) {
                        if (data) {
                        	scope.operatorCompanies = data;
                        	if (data.length > 0) {
                        		scope.assignObject.operator_company_id = data[0].id;
                        	}
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
	}


	scope.getOperatorCompanies();

	scope.uploadFiles = function(files) {
        scope.sendingInvoice = true;
        var userLS = ServerService.getUserInStorage();
        scope.files = files;
        angular.forEach(files, function(file) {
            if (file && !file.$error) {
                scope.showTestInvoice(file);
                file.upload = Upload.upload({
                  url: 'http://195.220.224.164/PaisImages/clients/' + scope.param_user_id + '/orders/' + scope.param_order_id + '/sendInvoice',
                  headers: {'X-Auth-Token': userLS.token},
                  file: file,
                });
                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                    scope.getOrderDetails();
                  });
                }, function (response) {
                  if (response.status > 0)
                    scope.errorMsg = response.status + ': ' + response.data;
                    alert(scope.errorMsg);
                });

                file.upload.progress(function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 * 
                                           evt.loaded / evt.total));
                });
            }   
        });
    }

    scope.onTimePaymentSet = function (newDate, oldDate)  {
            var now = new Date();
            if (scope.assignObject.order_payment_date.getTime() > now.getTime()) {
                scope.assignObject.order_payment_date.setTime(now.getTime());
            } else {
                scope.order.start_date.setTime(newDate.getTime());
            }
    }

    scope.assignOrder = function () {
    	if (scope.assignObject.order_value.length < 1) {
    		alert("Payment amount is missing.");
    		return;
    	}
    	if (scope.assignObject.order_payment_date.length < 1) {
    		alert("Payment date is missing.");
    		return;
    	}
      scope.assigning = true;
      scope.assignObject.order_payment_date.setTime(scope.assignObject.order_payment_date.getTime() - 
          scope.assignObject.order_payment_date.getTimezoneOffset() * 60 * 1000);
    	ServerService.assignOrder(scope.param_user_id, scope.param_order_id, scope.assignObject).then(function (data) {
                        if (data) {
                        	scope.getOrderDetails();
                        }
		}, function(reason) {
			    alert("Error occured.");
		});
    }


    scope.cutLargeImageName = function (dg_name) {
      if (dg_name.indexOf("_dg") != -1) {
            var n = dg_name.indexOf("_dg");
            var res = dg_name.substring(0, n);
            return res;
      } else {
        return dg_name;
      }
    }

    scope.disableOrder = function (id) {
      var cancelOrderModal = modal.open({
                animation: true,
                templateUrl: 'cancelOrder.html',
                controller: 'cancelOrderCtrl',
                resolve: {
                  orderName: function() {
                          return scope.selectedDetailed.name;
                  }
              }
      });

      cancelOrderModal.result.then(function (finish) {
            if(finish == true){
                ServerService.cancelOrder(scope.selectedDetailed.client_id, scope.selectedDetailed.order_id).then(function (data) {
                            if (data) {
                               location.path("/orders");
                            } else {
                              alert("Could not cancel order!");   
                            }
                }, function(reason) {
                      alert("Could not cancel order!");
                });
            }
      });
    }

    scope.finishOrder = function (id) {
        var finishOrderModal = modal.open({
                animation: true,
                templateUrl: 'finishOrder.html',
                controller: 'finishOrderCtrl',
                resolve: {
                  orderName: function() {
                          return scope.selectedDetailed.name;
                  }
              }
      });

      finishOrderModal.result.then(function (finish) {
            if(finish == true){
                ServerService.finishOrder(scope.selectedDetailed.client_id, scope.selectedDetailed.order_id).then(function (data) {
                            if (data) {
                               location.path("/orders");
                            } else {
                              alert("Could not finish order!");   
                            }
                }, function(reason) {
                      alert("Could not finish order!");
                });
            }
      });
    }

    scope.showInvoice = function () {
      var userLS = ServerService.getUserInStorage();
    	http.get('http://195.220.224.164/PaisImages/clients/'+ scope.selectedDetailed.client_id + '/orders/'+ scope.selectedDetailed.order_id + '/getInvoice', {
        responseType: 'arraybuffer',
        headers: {'X-Auth-Token': userLS.token}
      })
       .success(function (data) {
           var file = new Blob([data], {type: 'application/pdf'});
           var fileURL = URL.createObjectURL(file);
           window.open(fileURL);
    });
    }

    scope.showTestInvoice = function (data) {
       var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);

    }

    scope.roundFileSize = function (num) {
      return Math.round((num / 1000000) * 100) / 100;
    }

    scope.testFile = function (data) {
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }

}]);


angular.module('adminApp').controller('cancelOrderCtrl', function ($scope, $modalInstance, $location, $modal, ServerService, $rootScope, orderName) {
      
      $scope.orderName = orderName

      $scope.dismissModal = function () {
          $modalInstance.dismiss('cancel');
      };

      $scope.cancelOrder = function () {
          $modalInstance.close(true);
      };
    
});


angular.module('adminApp').controller('finishOrderCtrl', function ($scope, $modalInstance, $location, $modal, ServerService, $rootScope, orderName) {
      
      $scope.orderName = orderName

      $scope.dismissModal = function () {
          $modalInstance.dismiss('cancel');
      };

      $scope.finishOrder = function () {
          $modalInstance.close(true);
      };
    
});