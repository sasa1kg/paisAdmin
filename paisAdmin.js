var adminApp = angular.module("adminApp", ['ngRoute', 'ngCookies', 'nvd3' , 
	'LocalStorageModule', 'ServerService', 'ngMagnify', 'ui.bootstrap', 'ngFileUpload', 'ui.bootstrap.datetimepicker']);


adminApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

adminApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);