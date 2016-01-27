angular.module('adminApp').controller("allImagesCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams", "Upload", "$timeout",  
	function (scope, http, filter, ServerService, rootParams, Upload, $timeout) {

	scope.order_id = rootParams.order_id;
	scope.client_id = rootParams.client_id;

	scope.getImages = function () {
      scope.loading = true;
      scope.selectedDetailedImageResults = [];
            ServerService.clientOrderImages(scope.client_id, scope.order_id).then(function (data) {
                            if (data) {
                               scope.selectedDetailedImageResults = data;
                            } else {
                                scope.selectedDetailedImageResults =[];
                            }
                    }, function(reason) {
                            scope.selectedDetailedImageResults =[];
                    });
        

    }

    scope.getImages();

    scope.roundFileSize = function (num) {
      return Math.round((num / 1000000) * 100) / 100;
    }

}]);