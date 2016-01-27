angular.module("adminApp").config(['$routeProvider', function(routeProvider) {

	routeProvider.when("/mainPage", {
		templateUrl: "partials/mainPage.html",
		controller: "mainPageCtrl",
		resolve: {
		}
	})
	.when("/login", {
		templateUrl: "partials/login.html",
		controller: "loginCtrl",
		resolve: {
		}
	})
	.when("/operators", {
		templateUrl: "partials/operators.html",
		controller: "operatorsCtrl",
		resolve: {
		}
	})
	.when("/users", {
		templateUrl: "partials/users.html",
		controller: "usersCtrl",
		resolve: {
		}
	})
	.when("/newOrders", {
		templateUrl: "partials/mainPage.html",
		controller: "mainPageCtrl",
		resolve: {
		}
	})
	.when("/orders", {
		templateUrl: "partials/orders.html",
		controller: "ordersCtrl",
		resolve: {
		}
	})
	.when("/orders/:filter_id/", {
		templateUrl: "partials/orders.html",
		controller: "ordersCtrl",
		resolve: {
		}
	})
	.when("/orderDetailed/:id/:user_id/", {
		templateUrl: "partials/orderDetailed.html",
		controller: "orderDetailedCtrl",
		resolve: {
		}
	})
	.when("/sensorMap/:order_id/:user_id/", {
		templateUrl: "partials/sensorsMap.html",
		controller: "sensorsMapCtrl",
		resolve: {
		}
	})
	.when("/territoryMap/:order_id/:user_id/", {
		templateUrl: "partials/polygonsMap.html",
		controller: "polygonsMapCtrl",
		resolve: {
		}
	})
	.when("/recording/:client_id/:order_id/:id/:polygon_id/", {
		templateUrl: "partials/recording.html",
		controller: "recordingCtrl",
		resolve: {
		}
	})
	.when("/transactions", {
		templateUrl: "partials/transactions.html",
		controller: "transactionsCtrl",
		resolve: {
		}
	})
	.when("/newUser", {
		templateUrl: "partials/newUser.html",
		controller: "newUserCtrl",
		resolve: {
		}
	})
	.when("/sensorSettings", {
		templateUrl: "partials/sensorSettings.html",
		controller: "sensorSettingsCtrl",
		resolve: {
		}
	})
	.when("/imageSettings", {
		templateUrl: "partials/imageSettings.html",
		controller: "imageSettingsCtrl",
		resolve: {
		}
	})
	.when("/generalSettings", {
		templateUrl: "partials/generalSettings.html",
		controller: "generalSettingsCtrl",
		resolve: {
		}
	})
	.when("/operatorDetailed/:id/", {
		templateUrl: "partials/operatorDetailed.html",
		controller: "operatorDetailedCtrl",
		resolve: {
		}
	})
	.when("/allSettings", {
		templateUrl: "partials/allSettings.html",
		controller: "allSettingsCtrl",
		resolve: {
		}
	})
	.when("/allSettings", {
		templateUrl: "partials/allSettings.html",
		controller: "allSettingsCtrl",
		resolve: {
		}
	})
	.when("/sensorReadings/:client_id/:order_id/:station_id/:sensor_id/", {
		templateUrl: "partials/highSensorReadings.html",
		controller: "highSensorReadingsCtrl",
		resolve: {
		}
	})
	.when("/reports", {
		templateUrl: "partials/reports.html",
		controller: "reportsCtrl",
		resolve: {
		}
	})
	.when("/newSensor/:client_id/:order_id/:sensor_id/", {
		templateUrl: "partials/highSensorReadings.html",
		controller: "highSensorReadingsCtrl",
		resolve: {
		}
	})
	.when("/kml/:client_id/:order_id/:kml_id/", {
		templateUrl: "partials/kmlOnMap.html",
		controller: "kmlMapCtrl",
		resolve: {
		}
	})
	.when("/allImages/:client_id/:order_id/", {
		templateUrl: "partials/allImages.html",
		controller: "allImagesCtrl",
		resolve: {
		}
	})
	.when("/redirection", {
		templateUrl: "partials/redirection.html",
		controller: "redirectionCtrl",
		resolve: {
		}
	})
	.otherwise({redirectTo: '/login'});

}]);