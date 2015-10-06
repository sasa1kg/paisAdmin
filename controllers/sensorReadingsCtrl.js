angular.module('adminApp').controller("sensorReadingsCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams",  
	function (scope, http, filter, ServerService, rootParams) {



	scope.param_order_id = rootParams.order_id;
	scope.param_user_id = rootParams.client_id;
	scope.param_sensor_id = rootParams.sensor_id;

	ServerService.getSensorResults(scope.param_user_id, scope.param_order_id, scope.param_sensor_id).then(function (data) {
         if (data) {
           scope.results = data;
         }
	}, function(reason) {
			    alert("Error occured.");
	});

	scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  	scope.series = ['Series A', 'Series B'];
  	scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  	];
  	scope.onClick = function (points, evt) {
    	console.log(points, evt);
  	};

}]);