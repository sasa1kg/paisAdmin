var ServerService = angular.module('ServerService', [])
	.service('ServerService', ["$q", "$http", "$location", 'localStorageService',
    function (q, http, location, localStorageService) {

	var serverurl = 'http://195.220.224.164/';
  	var user = "";

  var putUserInStorage = function (user) {
    localStorageService.set("adminObject", user);
  }

  this.clearUserInStorage = function () {
        var keys = localStorageService.keys();
        for (var i = keys.length - 1; i >= 0; i--) {
              localStorageService.remove(keys[i]);
        };
  }

  var getUserInStorage = function () {
    var keys = localStorageService.keys();
    if (keys.length == 0) {
      return null;
    }
    for (var i = keys.length - 1; i >= 0; i--) {
      if (keys[i] == "adminObject") {
        var userObj = localStorageService.get(keys[i]);
        return userObj;
      }
    };
    return null;
  }

  this.getUserInStorage = function () {
    var keys = localStorageService.keys();
    if (keys.length == 0) {
      return null;
    }
    for (var i = keys.length - 1; i >= 0; i--) {
      if (keys[i] == "adminObject") {
        var userObj = localStorageService.get(keys[i]);
        return userObj;
      }
    };
    return null;
  }

    /*-------------------------- LOCAL STORAGE ----------------------------*/

    /*-------------------------- USER OPERATIONS----------------------------*/

  this.login = function (object) {
      var deffered = q.defer();
      http.post(serverurl + "pais/administrators/login", object).
              success(function(data, status) {
                if (status == 200) {

                      putUserInStorage(data);
                      deffered.resolve(true);
                    
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });

      return deffered.promise;
  }
  this.logout = function (object) {
      this.clearUserInStorage();
      location.path("/login");
  }

  this.updateClient = function (user) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
    var deffered = q.defer();
       http.put(serverurl + "pais/clients", user).
              success(function(data, status) {
                var result = JSON.stringify(data);
                var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }


	this.getClient = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
		 var deffered = q.defer();
    	 http.get(serverurl + "pais/clients/" + id).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    console.log(JSON.stringify(data));
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
    	 return deffered.promise;
	}

	this.getClients = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }   
		 var deffered = q.defer();
    	 http.get(serverurl + "pais/clients").
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
    	 return deffered.promise;
	}



	this.registerUser = function (user) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }    
 		var deffered = q.defer();
    	console.log("registerUser " + user);
    	 http.post(serverurl + "pais/clients", user).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK");
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                    console.log("Error");
                   deffered.reject("Error");
              });
    	return deffered.promise;
	}

  this.getAccountTypes = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/clientTypes").
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.getCities = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }    
      var deffered = q.defer();
      http.get(serverurl + "pais/cities").
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.addNewCity = function (city) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }    
      var deffered = q.defer();
      http.post(serverurl + "pais/cities", city).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }


  this.deleteCity = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/cities/" + id).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.getCountries = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/countries").
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.addNewCountry = function (country) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/countries", country).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

    this.deleteCountry = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/countries/" + id).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.updateCountry = function (country) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.put(serverurl + "pais/countries", country).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }



  /*-------------------------------------------------------------------------*/
  /*---------------------- SENSOR OPERATIONS --------------------------------*/

  this.getSensorTypes = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }    
      var deffered = q.defer();
      http.get(serverurl + "pais/sensorTypesDetailed").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.getSensorType = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/sensorTypes/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.addSensorType = function (sensor) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/sensorTypes", sensor).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.updateSensorType = function (sensor) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.put(serverurl + "pais/sensorTypes", sensor).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.deleteSensorType = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/sensorTypes/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.getSensorUOM = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/uoms/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.getUOMs = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/uoms").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.addNewUOM = function (uom) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/uoms", uom).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.updateUOM = function (uom) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.put(serverurl + "pais/uoms", uom).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.deleteUOM = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/uoms/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  

  this.getSensorTypeUOMs = function (sensorTypesId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/sensorTypes/" + sensorTypesId + "/uoms").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.getSensorResults = function (orderId, sensorId, clientId, resultObject) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/" + clientId + "/orders/"+ orderId +"/results/sensors/" + sensorId, resultObject).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  /*-------------------------------------------------------------------------*/
  /*---------------------- ORDER OPERATIONS --------------------------------*/

  this.clientOrder = function (clientId, orderId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var userLS = getUserInStorage();
      if (userLS == null) {
        location.path("/login");
      }
      var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + userLS.id + "/orders/" + orderId).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.clientOrders = function (clientId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + clientId + "/orders").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   deffered.reject("Error");
                }
              }).
              error(function(data, status) {
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.assignOrder = function (clientId, order_id, orderObject) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/"+ clientId +"/orders/"+ order_id +"/assingOperator", orderObject).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   deffered.reject("Error");
                }
              }).
              error(function(data, status) {
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  
 

  this.clientOrderDetailed = function (clientId, orderId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + clientId + "/orders/" + orderId + "/details").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

    this.getAllOrders = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/orders").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.getAllOrdersCount = function (filter) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/orders/count?status=" + filter).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }


  

  this.getAllOrdersByFilter = function (filter) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/orders?status=" + filter).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.getAllOrdersByStatus = function (status) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/orders?status=" + status).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }

  this.getAllOrdersCountByStatus = function (status) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/orders/count?status=" + status).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }



  this.clientOrderSensors = function (clientId, orderId, sensorId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var userLS = getUserInStorage();
      if (userLS == null) {
        location.path("/login");
      }
      var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + userLS.id + "/orders/" + orderId + "/sensors/" + sensorId).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  }


  this.evaluateOrder = function (clientId, order) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
    var userLS = getUserInStorage();
      if (userLS == null) {
        location.path("/login");
      }
    var deffered = q.defer();
      console.log("evaluateOrder " + clientId);
       http.post(serverurl + "pais/clients/" + userLS.id + "/evaluateOrder", order).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Status OK");
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK");
                   deffered.reject("Error");
                }
              }).
              error(function(data, status) {
                    console.log("Error");
                   deffered.reject("Error");
              });
      return deffered.promise;
  }

  this.placeOrder = function (clientId, order) {
    var userLS = getUserInStorage();
      if (userLS == null) {
        location.path("/login");
      }
    var deffered = q.defer();
      console.log("evaluateOrder " + user);
       http.post(serverurl + "pais/clients/" + userLS.id + "/orders", order).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Status OK");
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK");
                   deffered.reject("Error");
                }
              }).
              error(function(data, status) {
                    console.log("Error");
                   deffered.reject("Error");
              });
      return deffered.promise;
  }


  /*-------------------------------------------------------------------------*/
  /*---------------------- DRON OPERATIONS --------------------------------*/
  this.getFrequencies = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/frequencies").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.updateFrequency = function (freq) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.put(serverurl + "pais/frequencies", freq).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.deleteFrequency = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/frequencies/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


  this.addNewFreq = function (freq) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/frequencies", freq).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 



  

  this.getImageTypes = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/imageTypes").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.updateImageType = function (imageType) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.put(serverurl + "pais/imageTypes", imageType).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.addImageType = function (imageType) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/imageTypes", imageType).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

  this.deleteImageType = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/imageTypes/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

/*----------------------- OPERATORS -----------------------------*/
  

  this.getOperatorCompanies = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/operators/companies").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


    this.addOperatorCompany = function (company) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/operators/companies", company).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


    this.deleteOperatorCompany = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/operators/companies/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


  this.getOperators = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/operators").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.getOperatorsFromCompany = function (company_id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/operators?company_id=" + company_id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


    this.getOperator = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/operators/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


    this.addOperator = function (operator) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/operators", operator).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


  this.deleteOperator = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/operators/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


    this.updateOperator = function (operator) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.put(serverurl + "pais/operators", operator).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


  /*-------------------------------------------------------------------------*/


  this.getCurrencies = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/currencies").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.addNewCurrency = function (curr) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/currencies", curr).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 

    this.removeCurrency = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.delete(serverurl + "pais/currencies/" + id).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 


    this.getAdministrators = function () {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/administrators").
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else {
                   console.log("Status not OK " + status);
                   deffered.reject("Error");
                }
                
              }).
              error(function(data, status) {
                   console.log("Error " + status);
                   deffered.reject("Error");
              });
       return deffered.promise;
  } 




    this.hello = function () {
    	return "Hello from service";
    };

    this.testPromise = function (id) {
        var testDef = q.defer();
        var myTimeoutId = setTimeout( function(){
            testDef.resolve("hello");
        }, 2000);
        return testDef.promise;
    }

}]);