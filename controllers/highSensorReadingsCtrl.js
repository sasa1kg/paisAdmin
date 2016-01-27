angular.module('adminApp').controller("highSensorReadingsCtrl", ["$scope", "$http", "$filter", "ServerService", "$routeParams", "$modal",  
	function (scope, http, filter, ServerService, rootParams, modal) {



	scope.orderId = rootParams.order_id;
	scope.clientId = rootParams.client_id;
	scope.sensorId = rootParams.sensor_id;
  scope.stationId = rootParams.station_id;

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
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes;

  }

    scope.roundDoubleTwo = function (num) {
            return Math.round(num * 100) / 100;
    }


	  scope.init = function () {
        scope.dateFrom = new Date();
        scope.dateTo = new Date();
        scope.dateFrom.setTime(scope.dateFrom.getTime() - 10 * 24 * 60 * 60 * 1000);
    }
    scope.init();

    scope.localDate = new Date();

    scope.selectedSensor = {
        "selectedSensor" : {
            "color" : "#162656"
        }
    };


    scope.data = {
    	"name" : "",
    	"data" : [],
    	"unit" : ""
    }

    

	scope.loading = true;

	 scope.getSensor = function () {
    scope.data.data = [];
    ServerService.clientOrderSensors(scope.clientId, scope.orderId, scope.stationId, scope.sensorId).then(function (data) {
                if (data) {
                  scope.sensor = data;
                  ServerService.getSensorType(data.type_id).then(function (data1) {
                    if (data1) {
                      scope.sensorType = data1;
                      scope.data.name = data1.sensor_type_name;
                      ServerService.getSensorResults(scope.clientId, scope.orderId, scope.stationId, scope.sensorId, {
                                "from" : scope.refactorDate(scope.dateFrom),
                                "to" : scope.refactorDate(scope.dateTo)
                      }).then(function (data2) {
                        if (data2) {
                          for (var i = data2.length - 1; i >= 0; i--) {
                                        
                                        var single_point = [];
                                        single_point.push(data2[i].time - scope.localDate.getTimezoneOffset() * 60 * 1000);
                                        single_point.push(parseFloat(data2[i].value));
                                        scope.data.data.push(single_point);
                                        
                          }

                           scope.getOUM();
                           
                        } else {
                            scope.generalError = true;
                        }
                      }, function(reason) {
                        if (reason == "NA") {
                          alert("Sensor is not active");
                        } else {
                    scope.generalError = true;
                  }
              });

                    //************
                    } else {
                        scope.generalError = true;
                    }
                  }, function(reason) {
              scope.generalError = true;
          });
                } else {
                   scope.generalError = true;
                }
    }, function(reason) {
          scope.generalError = true;
  });
  };


      scope.filter = function () {
        scope.data.data = [];
        scope.loading = true;
        ServerService.getSensorResults(scope.clientId, scope.orderId, scope.sensorId, scope.stationId, {
                                "from" : scope.refactorDate(scope.dateFrom),
                                "to" : scope.refactorDate(scope.dateTo)
                            }).then(function (data2) {
                                if (data2) {
                                    for (var i = data2.length - 1; i >= 0; i--) {
                                        
                                        var single_point = [];
                                        single_point.push(data2[i].time - scope.localDate.getTimezoneOffset() * 60 * 1000);
                                        single_point.push(parseFloat(data2[i].value));
                                        scope.data.data.push(single_point);
                                        
                                     }

                                     scope.getOUM();
                                    
                                     
                                } else {
                                    scope.generalError = true;
                                }
                            }, function(reason) {
                                if (reason == "NA") {
                                    alert("Sensor is not active");
                                } else {
                                    scope.generalError = true;
                                }
                            });
    }


	scope.getOUM = function () {
    ServerService.getSensorUOM(scope.sensor.uom_id).then(function (data) {
      if (data) {
        scope.getStatistics();
        scope.data.unit = data.name;
        scope.uom_symbol = data.symbol;
        scope.loading = false;
        scope.rawChart(scope.data, scope.sensorType, scope.uom_symbol);
      }
    }, function(reason) {
        scope.generalError = true;
    });

  }


	scope.getSensor();


	   scope.getStatistics = function () {
        ServerService.getSensorStatistics(scope.clientId, scope.orderId, scope.sensorId, scope.stationId, {
                                "from" : scope.refactorDate(scope.dateFrom),
                                "to" : scope.refactorDate(scope.dateTo)
        }).then(function (data) {
            if (data) {
                scope.statistics = data;
            }
        }, function(reason) {
            scope.generalError = true;
        });
    }


  scope.getStatistics();


  scope.rawChart = function (data, xAxisTitle, uom_symbol) {
     $('#containerhc').empty();
     scope.chart = $('#containerhc').highcharts({
        chart: {
            type: 'area',
            zoomType: 'x',
          plotBackgroundColor: 'rgba(255, 255, 255, .9)',
          plotShadow: true,
          plotBorderWidth: 1
        },
        exporting: {
            chartOptions: {
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                }
            },
            scale: 1,
            fallbackToExportServer: false
        },
        title: {
            text: 'Sensor Readings'
        },
        tooltip: {
            formatter: function() {
                return  '<b>' + this.series.name +'</b><br/>' +
                    Highcharts.dateFormat('%e.%b %Y, %H:%M:%S',
                                          this.x)
                + ' <br/><b> ' + this.y + " " + uom_symbol + "</b>";
            }
        },
        xAxis: {
          gridLineWidth: 1,
          lineColor: '#000',
          tickColor: '#000',
            type: 'datetime',
             dateTimeLabelFormats: {
               day: '%e. %b \'%y %H:%M:%S'
             }
        },
        yAxis: {
          minorTickInterval: 'auto',
          lineColor: '#000',
          lineWidth: 1,
          tickWidth: 1,
          tickColor: '#000',
            title: {
                text: data.unit
            },
            /*plotBands: [{
                    from: scope.minimum,
                    to: scope.maximum,
                    color: 'rgba(68, 170, 213, 0.2)',
                    label: {
                        text: 'Last quarter year\'s value range'
                    }
                }]*/
        },
        plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
        },
        series: [{
            name: data.name,
            data: data.data
        }]
    });
  }





  scope.allTimeStats = function () {

     ServerService.getSensorStatisticsAllTime(scope.clientId, scope.orderId, scope.stationId, scope.sensorId).then(function (data) {
            if (data) {
                scope.allTimeStatsObj = data;
                var sensorStatsInstance = modal.open({
                  animation: true,
                  templateUrl: 'sensorStats.html',
                  controller: 'statsCtrl',
                  resolve: {
                    stats: function() {
                      return {
                          "stats" : scope.allTimeStatsObj
                      };
                    },
                    uom : function () {
                      return {
                          "uom" : scope.uom_symbol
                      };
                    }
                  }
      
                });
            }
      }, function(reason) {
            scope.generalError = true;
     });
  }


}]);


  angular.module('adminApp').controller('statsCtrl', function ($scope, $modalInstance, $modal, $location, ServerService, stats, uom) {

    $scope.uom = uom.uom;
    $scope.stats = stats.stats;

    $scope.selectedSensor = {
        "selectedSensor" : {
            "color" : "#162656"
        }
    };

    $scope.roundDoubleTwo = function (num) {
            return Math.round(num * 100) / 100;
    }

    $scope.saveSelection = function () {
      $modalInstance.close(true);
    }
    
    $scope.dismissModal = function () {
      $modalInstance.dismiss('cancel');
    };
  });