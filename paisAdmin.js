var adminApp = angular.module("adminApp", ['ngRoute', 'ngCookies', , 'LocalStorageModule', 'ServerService', 'ui.bootstrap', 'ngFileUpload']);


adminApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);