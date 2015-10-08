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
	.when("/orderDetailed/:id/:user_id/", {
		templateUrl: "partials/orderDetailed.html",
		controller: "orderDetailedCtrl",
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
	.when("/sensorReadings/:client_id/:order_id/:sensor_id/", {
		templateUrl: "partials/sensorReadings.html",
		controller: "sensorReadingsCtrl",
		resolve: {
		}
	})
	.when("/reports", {
		templateUrl: "partials/reports.html",
		controller: "reportsCtrl",
		resolve: {
		}
	})
	.otherwise({redirectTo: '/login'});

}]);