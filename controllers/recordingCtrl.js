angular.module('adminApp').controller("recordingCtrl", ["$scope", "$http", "$filter", "$routeParams", "$sce", "ServerService",  
	function (scope, http, filter, rootParams, sce, ServerService) {

	console.log("Recording Image! " + rootParams.id);



    scope.client_id = rootParams.client_id;
    scope.order_id = rootParams.order_id;
    scope.polygon_id = rootParams.polygon_id;
	scope.recordingId = rootParams.id;



	scope.imageSrc = "";

	scope.loading = false;


	scope.doThis = function () {
		console.log("Finished loading");
		alert("done");
	};

	scope.trustSrc = function(src) {
    	return sce.trustAsResourceUrl(src);
  	}
  	scope.getImage = function () {
  		scope.loading = true;
		        ServerService.clientOrderImages(scope.client_id, scope.order_id).then(function (data) {
		                        if (data) {
		                           scope.orderImages = data;
		                           for (var i = data.length - 1; i >= 0; i--) {
			                           	if (data[i].image_id == scope.recordingId) {
			                           		scope.datatype = data[i].document_type;
			                           		scope.imageObj = data[i];
			                           	}
		                           };
		                           var userLS = ServerService.getUserInStorage();
		                            http.get('http://195.220.224.164/PaisImages/clients/'+ scope.client_id + '/orders/'+ scope.order_id + '/images/'+ scope.recordingId +'/imagefile', {
		                            	responseType: 'arraybuffer',
		                            	headers: {'X-Auth-Token': userLS.token}
		                            }).success(function (data) {
								           var file = new Blob([data], {type: scope.datatype});
								           var fileURL = URL.createObjectURL(file);
								           scope.imageSrc = fileURL;
								           scope.loading = false;
								    });
		                        } else {
		                           scope.generalError = true;
		      
		                        }
		                }, function(reason) {
		                        scope.generalError = true;
		                });
		    

    }

    scope.getImage();

    scope.newWindow = function () {
    	window.open(scope.imageSrc);
    }

}]);