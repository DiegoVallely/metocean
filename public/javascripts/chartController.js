
(function(){
	'use strict';
	var app = angular.module('metOcean', []);

	app.controller('chartController', ['$scope', '$http', function ($scope,$http){


		$scope.chartData = [];

		$http.get('/datas').success(function(response){
			$scope.chartData = response.dados;
		});
		$scope.choose = ["tp","sst","hs"];
		$scope.selectioned = [];
		$scope.selectedValue = [];

		$scope.toggle = function(item, list){
			var idx = list.indexOf(item);
			if (idx > -1) {
				list.splice(idx,1);
			}
			else{
				list.push(item);
			}
			$scope.selectioned = item;
		};
		$scope.exists = function(item, list){
			return list.indexOf(item) > -1;
		};
	}])

	.directive('linearChart', function ($parse, $window){
	   return{
	   	  // require: '^^checkBox',
	   	  scope: { chartData: '=chartData',
	   			value: '=value'},
	      restrict:'AE',
	      template:"<svg width='850' height='200'></svg>",
	      
	       link: function(scope, elem, attrs){
	       		var pass_data = [];

	       		scope.$watch('chartData', function(items){
	       			if (items) {
		       			// console.log("Scope: ", scope);
		       			// console.log("chartData: ", scope.chartData);


			           var exp = $parse(attrs.chartData);
			           var chartDataToPlot=exp(scope);
			           var padding = 20;
			           var pathClass="path";
			           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

			           var d3 = $window.d3;
			           var rawSvg=elem.find('svg');
			           var svg = d3.select(rawSvg[0]);

			           var color = d3.scale.category10();

			           var dates = [];
			           var primerDatas = {
			           			date: [],
			           			sst: [],
			           			hs: [],
			           			tp: []
			           };
			           var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
			           $.each(chartDataToPlot, function(index, element){
			           		// element.Time = moment(element.Time).format("YYYY/MM/DD HH:mm:ss");
			           		element.Time = parseDate(element.Time);
			           		element.sst = parseFloat(element.sst);
			           		element.hs = parseFloat(element.hs);
			           		element.tp = parseFloat(element.tp);
			           		dates.push(element.Time);
			           		primerDatas.date.push(element.Time)
			           		primerDatas.sst.push(element.sst);
			           		primerDatas.hs.push(element.hs);
			           		primerDatas.tp.push(element.tp);
			           })
			          var repost = [];
			          var 	time = [];
			          var 	val = {
			          	"val": [],
			          	"Time": []
			          };
			       	scope.$watch('value', function(newVal){
		       				if (newVal == 'tp') {
		       					$.each(chartDataToPlot, function(index, element){
		       						val.val.push(element.tp);
		       						val.Time.push(element.Time);
		       					})
		       					
		       					redrawLineChart();
		       				}
		       				else if (newVal == 'sst') {
		       					$.each(chartDataToPlot, function(index, element){
		       						val.val.push(element.sst);
		       						val.Time.push(element.Time);
		       					})
		       					redrawLineChart();
		       				}else if (newVal == 'hs') {
		       					$.each(chartDataToPlot, function(index, element){
		       						val.val.push(element.hs);
		       						val.Time.push(element.Time);
		       					})
		       					redrawLineChart();
		       				}
				           
				           function setChartParameters(){
				           		console.log(val);
				               xScale = d3.scale.linear()
				                   .domain([chartDataToPlot[0].Time, chartDataToPlot[chartDataToPlot.length-1].Time])
				                   .range([padding + 5, rawSvg.attr("width") - padding]);

				               yScale = d3.scale.linear()
				                   .domain([0, d3.max(chartDataToPlot, function (d) {
				                       return d.hs;
				                   })])
				                   .range([rawSvg.attr("height") - padding, 0]);

				               xAxisGen = d3.svg.axis()
				                   .scale(xScale)
				                   .orient("bottom")
				                   .tickFormat(function(d) { return moment(d).format("Y-M-D"); });

				               yAxisGen = d3.svg.axis()
				                   .scale(yScale)
				                   .orient("left")
				                   .ticks(5);

				               lineFun = d3.svg.line()
				                   .x(function (d) {
				                       return xScale(d.Time);
				                   })
				                   .y(function (d) {
				                   		return yScale(d.hs);
				               		})
				                   .interpolate("basis");
				           }
				         
					        function drawLineChart() {

				               setChartParameters();

				               svg.append("svg:g")
				                   .attr("class", "x axis")
				                   .attr("transform", "translate(0,180)")
				                   .call(xAxisGen);

				               svg.append("svg:g")
				                   .attr("class", "y axis")
				                   .attr("transform", "translate(20,0)")
				                   .call(yAxisGen);

				               svg.append("svg:path")
				                   .attr({
				                       d: lineFun(chartDataToPlot),
				                       "stroke": "blue",
				                       "stroke-width": 2,
				                       "fill": "none",
				                       "class": pathClass
				                   });
					           }

					           function redrawLineChart() {

					               setChartParameters();

					               svg.selectAll("g.y.axis").call(yAxisGen);

					               svg.selectAll("g.x.axis").call(xAxisGen);

					               svg.selectAll("."+pathClass)
					                   .attr({
					                       d: lineFun(chartDataToPlot),
					                   });
					           }

					           drawLineChart();

			       			});
					};

	       		});
	       }
	   };
	});

}(window.angular));