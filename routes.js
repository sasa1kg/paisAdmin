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
	.when("/transactions", {
		templateUrl: "partials/transactions.html",
		controller: "transactionsCtrl",
		resolve: {
		}
	})
	.otherwise({redirectTo: '/login'});

}]);