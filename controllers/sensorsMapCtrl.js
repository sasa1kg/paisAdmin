angular.module('adminApp').controller("sensorsMapCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams",  
	function (scope, http, filter, ServerService, routeParams) {

	scope.client_id = routeParams.user_id;
	scope.order_id = routeParams.order_id;

	scope.map = "";
	var myLatlng = new google.maps.LatLng(44, 20.461414);


    scope.measurementLink = "MEASUREMENT";
    scope.notActive = "NOT ACTIVE";
       

	scope.getOrderDetails = function () {
		ServerService.clientOrderDetailed(scope.client_id, scope.order_id).then(function (data) {
                        if (data) {
                           scope.selectedDetailed = data;
                           	scope.getSensorTypes = ServerService.getSensorTypes().then(function (data) {
						                if (data) {
						                    scope.sensor_types = data;
                                            scope.placeOnMap(); 
						                } else {
						                    scope.generalError = true;
						                }
						    }, function(reason) {
						         scope.generalError = true;       
						    });
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	} 

	scope.getOrderDetails();




	scope.placeOnMap = function () {

        setTimeout(function(){ 
            var mapCanvasId = 'map-canvas-results',
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
            scope.map = new google.maps.Map(document.getElementById(mapCanvasId), myOptions);
            setMarkers(scope.map, scope.selectedDetailed.stations, scope.order_id);   
            }
        , 500); 

		
	};


	function setMarkers(map, stations, order_id) {
    for (var i = scope.sensorsOnMap.length - 1; i >= 0; i--) {
            scope.sensorsOnMap[i].setMap(null);
        };    
    var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < stations.length; i++) 
        {
            var station = stations[i];
            var title = "Sensor Station (Senz. stanica) " + station.station_id;
            var getType = function (type_id) {
                for (var i = scope.sensor_types.length - 1; i >= 0; i--) {
                    console.log(scope.sensor_types[i].name);
                    if (scope.sensor_types[i].id == type_id) {
                        return scope.sensor_types[i].name;
                    }
                };

            };

            var coords = new google.maps.LatLng(station.latitude, station.longitude);
            var configLink = "http://195.220.224.164/PEP/pais/operators/clients/" + scope.client_id + "/orders/" + scope.order_id + "/stations/" + station.station_id + "/configFile";
            var contentString = title + "<br/> <hr>" + station.station_description + " <br/>" +
            "<a href=" + configLink + "><b>DOWNLOAD CONFIG FILE</b></a><br/><hr>";

            for (var k = station.sensors.length - 1; k >= 0; k--) {
                var sensType = getType(station.sensors[k].type_id);
                contentString = contentString + sensType + " <br/> ";
                contentString = contentString + station.sensors[k].description + " <br/> ";
                if (station.sensors[k].active == 1) {
                    contentString = contentString +
                    "Active from: " + station.sensors[k].activate_at + "</br>" +
                    " <a href='#/sensorReadings/" + scope.client_id +"/" + scope.order_id + "/" + station.station_id + "/" + station.sensors[k].sensor_id + "/'> <b>MEASUREMENTS</b> </a><br/><hr>";
                } else {
                    contentString = contentString + "<b>NOT ACTIVE</b><br/><hr>";
                }

            };


            var infowindow = new google.maps.InfoWindow({content: contentString});
            


            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                icon: "img/waterfilter.png",
                title: title
            });
            google.maps.event.addListener(marker, 'click', 
                function (infowindow, marker) {
                    return function () {
                        infowindow.open(map, marker);
                    };
                }(infowindow, marker)
                );
            scope.sensorsOnMap.push(marker);
            bounds.extend(coords);
        }
        scope.map.fitBounds(bounds);
    }

    scope.sensorsOnMap = [];

    scope.getTypeName = function (id) {
        ServerService.getSensorType(id).then(function (data) {
                if (data) {
                   return data.sensor_type_name;
                } else {
                   return "N/A";
                }
        }, function(reason) {
            return "N/A";
        });
    }


    scope.openConfFile = function (id) {
      var userLS = ServerService.getUserInStorage();
        http.get('http://195.220.224.164/PEP/pais/operators/clients/' + scope.client_id + "/orders/" + scope.order_id + "/configFile", {
        responseType: 'arraybuffer',
        headers: {'X-Auth-Token': userLS.token}
      })
       .success(function (data) {
           var file = new Blob([data], {type: 'application/json'});
           var fileURL = URL.createObjectURL(file);
           window.open(fileURL);
    });
    }
		
}]);