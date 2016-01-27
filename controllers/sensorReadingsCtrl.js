angular.module('adminApp').controller("sensorReadingsCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams",  
	function (scope, http, filter, ServerService, rootParams) {



	scope.param_order_id = rootParams.order_id;
	scope.param_user_id = rootParams.client_id;
	scope.param_sensor_id = rootParams.sensor_id;
    scope.param_station_id = rootParams.station_id;

	scope.symbol = "";

	scope.results = [{
					values: [],
					key: '',
					color: '#2ca02c'
	}];

	
	scope.loading = true;

	scope.getSensor = function () {
		ServerService.clientOrderSensors(scope.param_user_id, scope.param_order_id, scope.param_station_id, scope.param_sensor_id).then(function (data) {
                if (data) {
                	scope.sensor = data;
                	ServerService.getSensorType(data.type_id).then(function (data1) {
                		if (data1) {
                			scope.sensorType = data1;
                			ServerService.getSensorResults(scope.param_order_id, scope.param_sensor_id, scope.param_user_id).then(function (data2) {
				                if (data2) {
				                	for (var i = data2.length - 1; i >= 0; i--) {
				                	 	scope.results[0].values.push({
							            	x: new Date(data2[i].time * 1000),
							            	y: Math.round(data2[i].value * 100) / 100
							            });
							            
							            
				                	 }; 
				                	scope.loading = false;
				 					scope.getOUM();
                				} else {
                					scope.loading = false;
		                   			scope.generalError = true;
		               			}
		               		}, function(reason) {
		               			if (reason == "NA") {
		               				scope.loading = false;
		               				alert("Sensor is not active");
		               			} else {
		               				scope.loading = false;
		  							scope.generalError = true;
		  						}
							});

                		//************
                		} else {
                   			scope.generalError = true;
               			}
               		}, function(reason) {
  						scope.generalError = true;
					});
                } else {
                   scope.generalError = true;
                }
    }, function(reason) {
  				scope.generalError = true;
	});
	};

	scope.getSensor();

	scope.getOUM = function () {
		ServerService.getSensorUOM(scope.sensor.uom_id).then(function (data) {
			if (data) {
				scope.results[0].key = data.name;
				scope.symbol = data.symbol;
			}
		}, function(reason) {
  			scope.generalError = true;
		});

	}


	scope.options = {
            chart: {
                type: 'lineChart',
                height: 600,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Time',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%d/%m/%y %H:%M')(new Date(d))
                    },
      				staggerLabels: true
                },
                yAxis: {
                    axisLabel: 'Value',
                    showMaxMin: true,
                    tickFormat: function (d){
                        return d3.format('.03f')(d);
                    },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
        };

      


}]);