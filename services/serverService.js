var ServerService = angular.module('ServerService', [])
	.service('ServerService', ["$q", "$http", "$location", 'localStorageService',
    function (q, http, location, localStorageService) {

	var serverurl = 'http://195.220.224.164/PEP/';
  	var user = "";
  var logout_url = "http://www.agro-pais.com/logout.php";

  this.putUserInStorage = function (user) {
    localStorageService.set("adminObject", user);
  }

  this.clearUserInStorage = function () {
        var keys = localStorageService.keys();
        for (var i = keys.length - 1; i >= 0; i--) {
              localStorageService.remove(keys[i]);
        };
  }

   var clearUserInStorage = function () {
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
                    
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
        var userLS = getUserInStorage();
        if (userLS == null) {
            location.path("/login");
        }
       clearUserInStorage();
       location.path("/login");
      //   var deffered = q.defer();
      // http.get("http://195.220.224.164/auth/logout", {
      //   headers: {'X-Auth-Token': userLS.token}
      //  }).
      //         success(function(data, status) {
      //             clearUserInStorage();
      //             location.path(logout_url);
      //         }).
      //         error(function(data, status) {
      //              console.log("Error " + status);
      //              deffered.reject("Error");
      //             clearUserInStorage();
      //             location.path(logout_url);
                   
      //         });
      //  return deffered.promise;

  }

  this.updateClient = function (user) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
    var deffered = q.defer();
       http.put(serverurl + "pais/clients", user, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                var result = JSON.stringify(data);
                var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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

  this.activateAccount = function (client_id) {
    var userLS = getUserInStorage();
    var token = "";
     if (userLS != null) {
        token = userLS.token;
      }
    var deffered = q.defer();
       http.post(serverurl + "pais/clients/"  +  client_id + "/activate", {}, {
        headers: {'X-Auth-Token': token}
       }).success(function(data, status) {
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


  this.activateAccountOperator = function (client_id) {
    var userLS = getUserInStorage();
    var token = "";
     if (userLS != null) {
        token = userLS.token;
      }
    var deffered = q.defer();
       http.post(serverurl + "pais/operators/"  +  client_id + "/activate", {}, {
        headers: {'X-Auth-Token': token}
       }).success(function(data, status) {
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


  this.deactivateAccountOperator = function (client_id) {
    var userLS = getUserInStorage();
    var token = "";
     if (userLS != null) {
        token = userLS.token;
      }
    var deffered = q.defer();
       http.post(serverurl + "pais/operators/"  +  client_id + "/deactivate", {}, {
        headers: {'X-Auth-Token': token}
       }).success(function(data, status) {
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



  this.deactivateAccount = function (client_id) {
    var userLS = getUserInStorage();
    var token = "";
     if (userLS != null) {
        token = userLS.token;
      }
    var deffered = q.defer();
       http.post(serverurl + "pais/clients/"  +  client_id + "/deactivate", {}, {
        headers: {'X-Auth-Token': token}
       }).success(function(data, status) {
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

  this.changePassword = function (client_id, passwordObj) {
    var userLS = getUserInStorage();
    var token = "";
     if (userLS != null) {
        token = userLS.token;
      }
    var deffered = q.defer();
       http.put(serverurl + "pais/clients/"  +  client_id + "/changePassword", passwordObj, {
        headers: {'X-Auth-Token': token}
       }).success(function(data, status) {
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


  this.changePasswordOperator = function (client_id, passwordObj) {
    var userLS = getUserInStorage();
    var token = "";
     if (userLS != null) {
        token = userLS.token;
      }
    var deffered = q.defer();
       http.put(serverurl + "pais/operators/"  +  client_id + "/changePassword", passwordObj, {
        headers: {'X-Auth-Token': token}
       }).success(function(data, status) {
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


	this.getClient = function (id) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
		 var deffered = q.defer();
    	 http.get(serverurl + "pais/clients/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    console.log(JSON.stringify(data));
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
    	 http.get(serverurl + "pais/clients", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
    	 http.post(serverurl + "pais/clients", user, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
                } else {
                   console.log("Status not OK " + status);
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
      http.get(serverurl + "pais/clientTypes", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/cities", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/cities", city, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/cities/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/countries", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/countries", country, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/countries/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.put(serverurl + "pais/countries", country, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                //var result = JSON.stringify(data);
                //var dataJSON = JSON.parse(result);
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/sensorTypesDetailed", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/sensorTypes/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/sensorTypes", sensor, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.put(serverurl + "pais/sensorTypes", sensor, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/sensorTypes/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/uoms/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/uoms", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/uoms", uom, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.put(serverurl + "pais/uoms", uom, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/uoms/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/sensorTypes/" + sensorTypesId + "/uoms", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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

    this.getSensorResults = function (clientId, orderId, stationId, sensorId, resultObject) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/" + clientId + "/orders/"+ orderId + "/stations/" + stationId + "/resultsForInterval/sensors/" + sensorId, resultObject, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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


  this.getSensorStatistics = function (clientId, orderId, stationId, sensorId, resultObject) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/" + clientId + "/orders/"+ orderId + "/stations/" + stationId +"/resultsForInterval/sensors/" + sensorId + "/statistics", resultObject, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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

  this.getAllSensorStatistics = function (resultObject) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.post(serverurl + "pais/reports/stations/all/statistics", resultObject, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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


  this.getSensorStationStatics = function (resultObject) {
    var userLS = getUserInStorage();
    var deffered = q.defer();
    http.post(serverurl + "pais/reports/sensors/all/statistics", resultObject, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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

  this.getTransactions = function (transactionObject) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.post(serverurl + "pais/reports/transactions/all", transactionObject, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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



  this.getSensorStatisticsAllTime = function (clientId, orderId, stationId, sensorId) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/" + clientId + "/orders/"+ orderId + "/stations/" + stationId +  "/results/sensors/" + sensorId + "/statistics", {}, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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


  this.getKMLs = function (clientId, orderId) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + clientId + "/orders/"+ orderId +"/klms", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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


  this.getAllPayedClients = function (DateObj) {
      var userLS = getUserInStorage();
      var deffered = q.defer();
      http.post(serverurl + "pais/reports/clients/all/statistics", DateObj, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Received 200");
                    deffered.resolve(data);
                } else if (status == 404) {
                    console.log("Received 404");
                    deffered.reject("NA");
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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


  this.clientOrders = function (clientId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + clientId + "/orders", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
                } else {
                   console.log("Status not OK " + status);
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
      http.post(serverurl + "pais/clients/"+ clientId +"/orders/"+ order_id +"/assingOperator", orderObject, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
                } else {
                   console.log("Status not OK " + status);
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
      http.get(serverurl + "pais/clients/" + clientId + "/orders/" + orderId + "/details", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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


  this.cancelOrder = function (clientId, orderId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/" + clientId + "/orders/" + orderId + "/cancelOrder", {}, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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

  this.finishOrder = function (clientId, orderId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
      var deffered = q.defer();
      http.post(serverurl + "pais/clients/" + clientId + "/orders/" + orderId + "/finishOrder", {}, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/orders", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/orders/count?status=" + filter, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/orders?status=" + filter, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/orders?status=" + status, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/orders/count?status=" + status, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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



  this.clientOrderSensors = function (clientId, orderId, stationId, sensorId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
    var deffered = q.defer();
    http.get(serverurl + "pais/clients/" + clientId + "/orders/" + orderId + "/stations/" + stationId +"/sensors/" + sensorId, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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

  this.clientOrderImages = function (clientId, orderId) {
    var userLS = getUserInStorage();
    if (userLS == null) {
      location.path("/login");
    }
    var deffered = q.defer();
      http.get(serverurl + "pais/clients/" + clientId + "/orders/" + orderId + "/images", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
    var deffered = q.defer();
      console.log("evaluateOrder " + clientId);
       http.post(serverurl + "pais/clients/" + userLS.id + "/evaluateOrder", order, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Status OK");
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
                } else {
                   console.log("Status not OK " + status);
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
       http.post(serverurl + "pais/clients/" + userLS.id + "/orders", order, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    console.log("Status OK");
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
                } else {
                   console.log("Status not OK " + status);
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
      http.get(serverurl + "pais/frequencies", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                }  else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.put(serverurl + "pais/frequencies", freq, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/frequencies/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/frequencies", freq, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/imageTypes", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.put(serverurl + "pais/imageTypes", imageType, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/imageTypes", imageType, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/imageTypes/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/operators/companies", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/operators/companies", company, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/operators/companies/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/operators", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/operators?company_id=" + company_id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/operators/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/operators", operator, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/operators/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.put(serverurl + "pais/operators", operator, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/currencies", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.post(serverurl + "pais/currencies", curr, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.delete(serverurl + "pais/currencies/" + id, {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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
      http.get(serverurl + "pais/administrators", {
        headers: {'X-Auth-Token': userLS.token}
       }).
              success(function(data, status) {
                if (status == 200) {
                    deffered.resolve(data);
                } else if (status == 401) {
                   clearUserInStorage();
                   location.path('/login?status=expired');
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