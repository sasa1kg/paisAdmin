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


	ServerService.getAllOrdersCountByStatus(4).then(function (data) {
                        if (data) {
                           scope.finishedOrders = data;
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

	  scope.getTransactions = function () {
	  	scope.loadingTrans = true;
	    ServerService.getTransactions({
	    	"from" : scope.refactorDate(scope.dateFrom),
	    	"to" : scope.refactorDate(scope.dateTo)
	    }).then(function (data) {
	      if (data) {
	        scope.transactions = data;
	        scope.loadingTrans = false;
	      } else {
	      	scope.transactions = [];
	        scope.loadingTrans = false;
	      }
	    }, function(reason) {
	        scope.transactions = [];
	        scope.loadingTrans = false;
	    });
	  }

    scope.init = function () {
        scope.dateFrom = new Date();
        scope.dateTo = new Date();
        scope.dateFrom.setTime(scope.dateFrom.getTime() - 7 * 24 * 60 * 60 * 1000);
        scope.dateTo.setTime(scope.dateTo.getTime() + 1 * 24 * 60 * 60 * 1000);
        scope.getTransactions();
    }

    scope.init();






}]);