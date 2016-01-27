angular.module('adminApp').controller("reportsCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams", "$modal",  
	function (scope, http, filter, ServerService, rootParams, modal) {


  scope.allTimeFilter = false;
  scope.type = -1;
  scope.totalTransactions = {};
  scope.availableCurrencies = [];
  scope.order = "";

  scope.setOrderBy = function (order_by) {
    console.log("ORDER " + order_by);
    scope.order = order_by;
  }

  scope.generateTitle = function (section, isAllTime, from, to, additionalFilter) {
    var addText = "";
    if (additionalFilter != undefined) {
      if (additionalFilter.all) {
        addText = " for ALL clients";
      } else {
        addText = " for client " + additionalFilter.client;
      }
    }
    if (isAllTime) {
      scope.reportName = section + " all-time" + addText;
    } else {
      scope.reportName = section + " from " + from + " to " + to + addText;
    }
  }


  scope.toggleFilter = function (filterNum) {
    if (filterNum == 0) {
      scope.allTimeFilter = false;
    } else {
      scope.allTimeFilter = true;
    }
  }

	scope.init = function () {
        scope.dateFrom = new Date();
        scope.dateTo = new Date();
        scope.dateFrom.setTime(scope.dateFrom.getTime() - 10 * 24 * 60 * 60 * 1000);
        scope.dateTo.setTime(scope.dateTo.getTime() + 1 * 24 * 60 * 60 * 1000);
    }
    scope.init();

    scope.localDate = new Date();


    scope.reportName = "";

   scope.refactorDate = function (date) {
	    var day = date.getDate();
	    if (day < 10) {
	        day = "0" + day;
	    }
	    var month = date.getMonth() + 1;
	    if (month < 10) {
	        month = "0" + month;
	    }
	    var year = date.getFullYear();
	    
	    return year + "-" + month + "-" + day;

  }


  scope.getTransactions = function (allClients, clientId, client_name) {
  	scope.loading = true;
    scope.type = 0;
    var date_fr = null;
    var date_to = null;
    var client_id = null;
    if (!scope.allTimeFilter) {
        date_fr = scope.refactorDate(scope.dateFrom);
        date_to = scope.refactorDate(scope.dateTo);
    }
    if (!allClients) {
      client_id = clientId;
    }
    ServerService.getTransactions({
    	"from" : date_fr,
    	"to" : date_to,
      "clientId" : client_id
    }).then(function (data) {
      if (data) {
        scope.generateTitle("Transactions report", scope.allTimeFilter, date_fr, date_to, {
          "type" : 0,
          "all" : allClients,
          "client" : client_name
        });
      	scope.generateTable(data, 0);
        scope.calculateTotalTransactions(data);
      }
    }, function(reason) {
        scope.generateTitle("Transactions report", scope.allTimeFilter, date_fr, date_to, {
          "type" : 0,
          "all" : allClients,
          "client" : client_name
        });
        scope.generalError = true;
        scope.emptyTable();
    });
  }


  scope.getAllSensorStatistics = function (allClients, clientId, client_name) {
  	scope.loading = true;
    scope.type = 1;
    var date_fr = null;
    var date_to = null;
    var client_id = null;
    if (!scope.allTimeFilter) {
        date_fr = scope.refactorDate(scope.dateFrom);
        date_to = scope.refactorDate(scope.dateTo);
    }
    if (!allClients) {
      client_id = clientId;
    }
  	ServerService.getAllSensorStatistics({
      "from" : date_fr,
      "to" : date_to,
      "clientId" : client_id
    }).then(function (data) {
      if (data) {
        scope.generateTitle("Sensor report", scope.allTimeFilter, date_fr, date_to, {
          "type" : 1,
          "all" : allClients,
          "client" : client_name
        });
        scope.generateTable(data, 1);
      }
    }, function(reason) {
        scope.generateTitle("Sensor report", scope.allTimeFilter, date_fr, date_to, {
          "type" : 1,
          "all" : allClients,
          "client" : client_name
        });
        scope.generalError = true;
        scope.emptyTable();
    });
  }


  scope.getAllPayedClients = function (allClients, clientId, client_name) {
    scope.loading = true;
    scope.type = 2;
    var date_fr = null;
    var date_to = null;
    var client_id = null;
    if (!scope.allTimeFilter) {
        date_fr = scope.refactorDate(scope.dateFrom);
        date_to = scope.refactorDate(scope.dateTo);
    }
    if (!allClients) {
      client_id = clientId;
    }
    ServerService.getAllPayedClients({
      "from" : date_fr,
      "to" : date_to,
      "clientId" : client_id
    }).then(function (data) {
      if (data) {
        scope.generateTitle("Clients payed orders report", scope.allTimeFilter, date_fr, date_to, {
          "type" : 2,
          "all" : allClients,
          "client" : client_name
        });
        scope.generateTable(data, 2);
      }
    }, function(reason) {
        scope.generateTitle("Clients payed orders report", scope.allTimeFilter, date_fr, date_to, {
          "type" : 2,
          "all" : allClients,
          "client" : client_name
        });
        scope.generalError = true;
        scope.emptyTable();
    });
  }

  scope.calculateTotalTransactions = function (data) {
    scope.totalTransactions = {};
    scope.availableCurrencies = [];
    if (data != undefined && data != null && data.length > 0) {
      for (var i = data.length - 1; i >= 0; i--) {
        var curr = data[i].currency_id;
        var val = data[i].order_value;
        var curSkip = false;
        for (var j = scope.availableCurrencies.length - 1; j >= 0; j--) {
          console.log("compare " + scope.availableCurrencies[j] + " with " + curr);
          if (scope.availableCurrencies[j].currency == curr) {
            curSkip = true;
          }
        };
        if (!curSkip) {
          console.log("PUSH " + curr);
          scope.availableCurrencies.push({
            "currency" : curr
          });
        }
        if (curr in scope.totalTransactions) {
          scope.totalTransactions[curr] = scope.totalTransactions[data[i].currency_id] + Number(val);
        } else {
          scope.totalTransactions[curr] = Number(val);
        }
      }
      console.log(angular.toJson(scope.totalTransactions));
    } else {
      scope.totalTransactions = {};
      scope.availableCurrencies = [];
    }
  }

    scope.roundNum = function (num) {
      return Math.round((num / 100) * 100) / 100;
    }

  scope.generateTable  = function (data, type) {
    scope.type = type;
    scope.rows = [];
    scope.cols = [];
    scope.key_links = [];
    if (data != undefined && data != null && data.length > 0) {
      if (type == 0) {
        scope.order = "order_payment_date";
        for (var i = data.length - 1; i >= 0; i--) {
          scope.rows.push({
            "Client" : {
                "type" : "text",
                "data" : data[i].client_first_name + " " + data[i].client_last_name
            },
            "Order" : {
                "type" : "text",
                "data" : data[i].name
            },
            "Order date" : {
                "type" : "text",
                "data" : data[i].created_at
            },
            "Operater" : {
                "type" : "text",
                "data" : data[i].operater_company_name
            },
            "Amount paid" : {
                "type" : "text",
                "data" : data[i].order_value + " " + data[i].currency_id
            },
            "Payment date" : {
                "type" : "text",
                "data" : data[i].order_payment_date
            },
            "Link" : {
                "type" : "link",
                "data" : "#/orderDetailed/" + data[i].order_id + "/" + data[i].client_id,
                "desc" : "Go to order"
            },
          });
          if (scope.key_links.length == 0) {
            scope.key_links.push({
              "Client" : {
                "id": "client_first_name"
              },
              "Order date" : {
                "id" : "created_at"
              },
              "Payment date" : {
                "id" : "order_payment_date"
              }
            });
          }
        };
        scope.cols = Object.keys(scope.rows[0]);
        console.log(angular.toJson(scope.cols));
      } else if (type == 1) {
        for (var i = data.length - 1; i >= 0; i--) {
          var statusField = false;
          var statusText = "NOT ACTIVE";
          var activeLbl = "";
          if (data[i].active == 1) {
            statusField = true;
            statusText = "ACTIVE";
            activeLbl = "Active from: " + data[i].sensor_activated_at;
          } else {
            statusField = false;
            statusText = "NOT ACTIVE";
          }
          scope.rows.push({
            "Username" : {
                "type" : "text",
                "data" : data[i].client_user_name
            },
            "Client" : {
                "type" : "text",
                "data" : data[i].client_first_name + " " + data[i].client_last_name
            },
            "Order ID" : {
                "type" : "text",
                "data" : data[i].order_id
            },
            "Sensor Station ID" : {
                "type" : "text",
                "data" : data[i].station_id
            },
            "Sensor Station Description" : {
                "type" : "text",
                "data" : data[i].description
            },
            "Position" : {
                "type" : "multiline",
                "data" : "Lat " + data[i].latitude,
                "data2" : "Long " + data[i].longitude
            },
            "Set at (Ordered)" : {
                "type" : "text",
                "data" : data[i].set_at
            },
            "Sensors" : {
                "type" : "multi",
                "num" : data[i].sensor_number,
                "active" : data[i].active_sensor_number,
                "id" : {
                  "order_id" : data[i].order_id,
                  "client_id" : data[i].client_id,
                  "station_id" : data[i].station_id,
                  "longitude" : data[i].longitude,
                  "latitude" : data[i].latitude
                }
            }
            /*"Sensor Status" : {
                "type" : "badge",
                "data_0" : statusField,
                "data_1" : statusText,
                "data_2" : activeLbl
            },
            "Average Value" : {
                "type" : "text",
                "data" : data[i].avg_value + " " + data[i].uom_symbol
            },
            "Minimum Value" : {
                "type" : "text",
                "data" : data[i].min_value + " " + data[i].uom_symbol
            },
            "Maximum Value" : {
                "type" : "text",
                "data" : data[i].max_value + " " + data[i].uom_symbol
            },
            "STD Value" : {
                "type" : "text",
                "data" : data[i].std_value
            },
            "Link" : {
                "type" : "link",
                "data" : "#/sensorReadings/" + data[i].client_id + "/"+ data[i].order_id +"/"+ data[i].sensor_id +"/",
                "desc" : "Go to sensor results"
            },*/
          });
        };
        scope.cols = Object.keys(scope.rows[0]);
      } else if (type == 2) {
         for (var i = data.length - 1; i >= 0; i--) {
          scope.rows.push({
            "Username" : {
                "type" : "text",
                "data" : data[i].user_name
            },
            "Client" : {
                "type" : "text",
                "data" : data[i].user_first_name
            },
            "Active sensors" : {
                "type" : "text",
                "data" : data[i].active_sensors_count
            },
            "No of teritorries" : {
                "type" : "text",
                "data" : data[i].polygons_count
            },
            "Total Surface [ha]" : {
                "type" : "text",
                "data" : scope.roundNum(data[i].polygons_area)
            },
            "No of orders" : {
                "type" : "text",
                "data" : data[i].orders_count
            },
            "Payment" : {
                "type" : "text",
                "data" : data[i].payment_ammount + " " + data[i].currency_id
            },
          });
        };
        scope.cols = Object.keys(scope.rows[0]);
      } else {
        scope.emptyTable();
      }
      scope.loading = false;
   } else {
    scope.emptyTable();
   }
  }

  scope.emptyTable = function () {
    scope.rows = [];
    scope.cols = [];
    scope.loading = false;
  }

  scope.sortingHelper = function (column_name) {
    console.log("Sorting find " + column_name);
    if (scope.key_links[0].column_name != undefined) {
      console.log("Found " + column_name);
      return scope.key_links.column_name;
    } else {
      return undefined;
    }
  }


  scope.additionalTransactions = function () {
    var additionalModal = modal.open({
                animation: true,
                templateUrl: 'additionalFilter.html',
                controller: 'additionalFilterCtrl',
                resolve: {
                  dateObj: function() {
                      return {};
                  }
              }
      });

      additionalModal.result.then(function (filter) {
              console.log(angular.toJson(filter));
              scope.getTransactions(filter.all, filter.client_id, filter.client_name);
      });
  }

  scope.additionalSensors = function () {
    var additionalModal = modal.open({
                animation: true,
                templateUrl: 'additionalFilter.html',
                controller: 'additionalFilterCtrl',
                resolve: {
                  dateObj: function() {
                      return {};
                  }
              }
      });

      additionalModal.result.then(function (filter) {
              console.log(angular.toJson(filter));
              scope.getAllSensorStatistics(filter.all, filter.client_id, filter.client_name);
      });
  }

    scope.additionalClientPayedOrders = function () {
    var additionalModal = modal.open({
                animation: true,
                templateUrl: 'additionalFilter.html',
                controller: 'additionalFilterCtrl',
                resolve: {
                  dateObj: function() {
                      return {};
                  }
              }
      });

      additionalModal.result.then(function (filter) {
              console.log(angular.toJson(filter));
              scope.getAllPayedClients(filter.all, filter.client_id, filter.client_name);
      });
  }

  scope.stationReport = function (id) {
    var locdateFrom = null;
    var locdateTo = null;
    if (!scope.allTimeFilter) {
        locdateFrom = scope.refactorDate(scope.dateFrom);
        locdateTo = scope.refactorDate(scope.dateTo);
    }
    var stationReport = modal.open({
        animation: true,
        templateUrl: 'stationStatsModal.html',
        controller: 'stationReportCtrl',
        size: 'lg',
        resolve: {
            id: function() {
                return id;
            },
            dateObj: function () {
                return {
                  allTime: scope.allTimeFilter,
                  dateFrom: locdateFrom,
                  dateTo: locdateTo
                }
            },
            rawDate: function () {
               return {
                  dateFrom: scope.dateFrom,
                  dateTo: scope.dateTo
               }
            }
        }
    });
  }

}]);



angular.module('adminApp').controller('additionalFilterCtrl', function ($scope, $modalInstance, $location, $modal, ServerService, $rootScope, dateObj) {
      
      $scope.dateObj = dateObj;
      $scope.loadingClients = false;
      $scope.searchObject = {
        "all" : true,
        "client_id" : -1,
        "client_name" : ""
      }

      $scope.toogleAllClients = function (val) {
        if (val == $scope.searchObject.all) {
          return;
        }
        if (!$scope.searchObject.all) {
          $scope.loadingClients = false;
          $scope.searchObject.all = true;
        } else {
          $scope.searchObject.all = false;
          $scope.loadingClients = true;
            $scope.getClients = ServerService.getClients().then(function (data) {
                        if (data) {
                           $scope.users = data;
                           $scope.searchObject.client_id = data[0].id;
                           $scope.loadingClients = false;
                        } else {
                           alert("Error occured.");
                           $scope.users = [];
                           $scope.searchObject.client_id = -1;
                           $scope.loadingClients = false;
                        }
            }, function(reason) {
                alert("Error occured.");
                $scope.users = [];
                $scope.searchObject.client_id = -1;
                $scope.loadingClients = false;
            });
        }
      }

      $scope.dismissModal = function () {
          $modalInstance.dismiss('cancel');
      };

      $scope.filter = function () {
        if (!$scope.searchObject.all) {
          for (var i = $scope.users.length - 1; i >= 0; i--) {
            if ($scope.users[i].id == $scope.searchObject.client_id) {
              $scope.searchObject.client_name = $scope.users[i].user_name + " [" + $scope.users[i].first_name + " " + $scope.users[i].last_name + "]"
            }
          };
        }
        $modalInstance.close($scope.searchObject);
      }
    
});


angular.module('adminApp').controller('stationReportCtrl', function ($scope, $modalInstance, $location, $modal, ServerService, $rootScope, id, dateObj, rawDate) {

      $scope.roundMem = function (num) {
        return Math.round(num * 10000) / 10000;
      }
      $scope.id = id;
      $scope.dateObj = dateObj;
      $scope.rawDate = rawDate;
      $scope.filterObject = {
        "clientId" : $scope.id.client_id,
        "orderId" : $scope.id.order_id,
        "stationId" : $scope.id.station_id
      }
      if (!$scope.dateObj.allTimeFilter) {
        $scope.filterObject.from = $scope.dateObj.dateFrom;
        $scope.filterObject.to = $scope.dateObj.dateTo;
        $scope.measurementHours = ($scope.rawDate.dateTo.getTime() - $scope.rawDate.dateFrom.getTime()) / 3600000;
      }

      $scope.loading = true;
      $scope.getStats = ServerService.getSensorStationStatics($scope.filterObject).then(function (data) {
              if (data) {
                $scope.stationStats = data;
                $scope.loading = false;
                $scope.placeOnMap({
                  "longitude" : $scope.id.longitude,
                  "latitude" : $scope.id.latitude
                });
              } else {
                alert("Error");
                $scope.loading = false;  
              }
      }, function(reason) {
          alert("Error");
          $scope.loading = false;
      });


      $scope.dismissModal = function () {
        $modalInstance.dismiss('cancel');
      }

    $scope.map = null;
    var myLatlng = new google.maps.LatLng(44, 20.461414);
    $scope.placeOnMap = function (station) {

        setTimeout(function(){ 
            var mapCanvasId = 'map-canvas-results-small',
             myOptions = {
            center: myLatlng,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            zoom: 8,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_CENTER
            }
            }
            $scope.map = new google.maps.Map(document.getElementById(mapCanvasId), myOptions);
            setMarkers($scope.map, station);   
            }
        , 500); 

    
  };


  function setMarkers(map, station) {
  
    var bounds = new google.maps.LatLngBounds();

            var title = "Sensor Station (Senz. stanica) ";


            var coords = new google.maps.LatLng(station.latitude, station.longitude);
           
            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                icon: "img/waterfilter.png",
                title: title
            });
            var contentString = title;
            var infowindow = new google.maps.InfoWindow({content: contentString});
            google.maps.event.addListener(marker, 'click', 
                function (infowindow, marker) {
                    return function () {
                        infowindow.open(map, marker);
                    };
                }(infowindow, marker)
                );
            $scope.sensorsOnMap.push(marker);
            bounds.extend(coords);
            $scope.map.fitBounds(bounds);
    }

    $scope.sensorsOnMap = [];

    
});