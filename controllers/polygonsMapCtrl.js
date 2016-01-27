angular.module('adminApp').controller("polygonsMapCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams",  
	function (scope, http, filter, ServerService, routeParams) {

	scope.client_id = routeParams.user_id;
	scope.order_id = routeParams.order_id;

	scope.map = "";
	var myLatlng = new google.maps.LatLng(44, 20.461414);


	scope.getOrderDetails = function () {
		ServerService.clientOrderDetailed(scope.client_id, scope.order_id).then(function (data) {
                        if (data) {
                           scope.getImages();
                           scope.selectedDetailed = data;
                        } else {
                            alert("Error occured.");
                        }
		}, function(reason) {
		    alert("Error occured.");
		});
	} 

    scope.getImages = function () {
            ServerService.clientOrderImages(scope.client_id, scope.order_id).then(function (data) {
                if (data) {
                    scope.orderImages = data;
                } else {
                    scope.orderImages = [];
                }
            }, function(reason) {
                scope.orderImages = [];
            });
    }

	scope.getOrderDetails();

    scope.getImagesOfPolygon = function (polygon_id) {
            var images = [];
            if (scope.orderImages.length > 0) {
                for (var i = scope.orderImages.length - 1; i >= 0; i--) {
                    if (scope.orderImages[i].polygon_id == polygon_id) {
                        images.push(scope.orderImages[i]);
                    }
                };
            }
            return images;
    } 




	$(document).ready(function () {

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
            setTerritories(scope.map, scope.selectedDetailed.polygons, scope.order_id);   
            }
        , 1000); 

		
	});


	function setTerritories(map, polygons, order_id) {
    for (var i = scope.polygonsOnMap.length - 1; i >= 0; i--) {
            scope.polygonsOnMap[i].setMap(null);
            scope.markersOnMap[i].setMap(null);
        };    
    var bounds = new google.maps.LatLngBounds();
    for (var x = 0; x < polygons.length; x++) 
        {
            var polygon = polygons[x];
            var territoryCoords = [];
            for (var i = polygon.coordinates.length - 1; i >= 0; i--) {
            	territoryCoords.push({
            		lat : polygon.coordinates[i].latitude,
            		lng: polygon.coordinates[i].longitude
            	});
                bounds.extend(new google.maps.LatLng(polygon.coordinates[i].latitude, polygon.coordinates[i].longitude));
            };

			var territory = new google.maps.Polygon({
			    paths: territoryCoords,
			    strokeColor: '#FF0000',
			    strokeOpacity: 0.8,
			    strokeWeight: 3,
			    fillColor: '#FF0000',
			    fillOpacity: 0.35
			 });

			var contentString = "Surface " + Math.round(polygon.surface * 100) / 100 + " ha <hr> Description: </br>" + polygon.description + "<hr>" ;
            var imagesOnPoly = scope.getImagesOfPolygon(polygon.polygon_id);

            if (imagesOnPoly.length > 0) {
                contentString = contentString + "IMAGES: </br>";
                for (var i = imagesOnPoly.length - 1; i >= 0; i--) {
                    contentString = contentString + " > <a href='#/recording/"+ scope.client_id +"/" + scope.order_id +"/" + imagesOnPoly[i].image_id + "/" + polygon.polygon_id + "/'>" + imagesOnPoly[i].document_name + "</a> | " + imagesOnPoly[i].document_created_at + "</br>";
                };
            }
            var infowindow = new google.maps.InfoWindow({content: contentString});
            

            var marker = new google.maps.Marker({
                position: territoryCoords[0],
                map: map,
                icon: "img/cropcircles.png",
                title: "Territory"
            });
            google.maps.event.addListener(marker, 'click', 
                function (infowindow, marker) {
                    return function () {
                        infowindow.open(map, marker);
                    };
                }(infowindow, marker)
            );



			territory.setMap(scope.map);
			marker.setMap(scope.map);
			scope.markersOnMap.push(marker);
            scope.polygonsOnMap.push(territory);
            

        }
        scope.map.fitBounds(bounds);
    }

    scope.polygonsOnMap = [];
    scope.markersOnMap = [];

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


    scope.openConfigFile = function (id) {
        var userLS = ServerService.getUserInStorage();
        http.get('http://195.220.224.164/PEP/pais/operators/clients/' + scope.client_id + "/orders/" + scope.order_id + "/polygons/" + id + "/missionPlan", {
        responseType: 'arraybuffer',
        headers: {'X-Auth-Token': userLS.token}
      })
       .success(function (data) {
           var file = new Blob([data], {type: 'text/plain'});
           var fileURL = URL.createObjectURL(file);
           window.open(fileURL);
    });
    } 

    scope.roundDoubleTwo = function (num) {
            return Math.round(num * 100) / 100;
    }
		
}]);