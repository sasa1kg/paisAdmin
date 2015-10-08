angular.module('adminApp').controller("mainPageCtrl", ["$scope", "$http", "$filter", "ServerService",  function (scope, http, filter, ServerService) {

	console.log("mainPageCtrl!");
	scope.msg = "mainPageCtrl!";

	scope.adminName = "Pais admin";

	scope.inactiveOrders = 0;


	scope.activity = "Admin logged in";
	scope.activityTime = "now";


	ServerService.getClients().then(function (data) {
                        if (data) {
                           scope.users = data.length;
                        } else {
                           scope.generalError = true;
                        }
	}, function(reason) {
			   scope.generalError = true;
	});

	ServerService.getAllOrdersCountByStatus(0).then(function (data) {
                        if (data) {
                           scope.inactiveOrders = data;
                        } else {
                           scope.generalError = true;
                        }
	}, function(reason) {
			   scope.generalError = true;
	});

	ServerService.getAllOrdersCountByStatus(1).then(function (data) {
                        if (data) {
                           scope.orders = data;
                        } else {
                           scope.generalError = true;
                        }
	}, function(reason) {
			   scope.generalError = true;
	});

	ServerService.getAllOrdersCountByStatus(2).then(function (data) {
                        if (data) {
                           scope.activeOrders = data;
                        } else {
                           scope.generalError = true;
                        }
	}, function(reason) {
			   scope.generalError = true;
	});

	ServerService.getOperators().then(function (data) {
                        if (data) {
                           scope.operators = data;
                        } else {
                           scope.generalError = true;
                        }
	}, function(reason) {
			   scope.generalError = true;
	});


	

	scope.operators = 0;


}]);