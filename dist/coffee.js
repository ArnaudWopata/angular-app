angular.module("directives.hourlyGraph", []).directive("hourlyGraph", function() {
  var buckets, colors, days, gridSize, height, legendElementWidth, margin, times, width;
  margin = {
    top: 40,
    right: 0,
    bottom: 100,
    left: 40
  };
  width = 960 - margin.left - margin.right;
  height = 430 - margin.top - margin.bottom;
  gridSize = Math.floor(width / 24);
  legendElementWidth = gridSize * 2;
  buckets = 9;
  colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];
  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
  return {
    restrict: "E",
    scope: {
      values: "="
    },
    link: function(scope, element, attrs) {
      var svg;
      svg = d3.select(element[0]).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      return scope.$watch('values', function(data) {
        var colorScale, dayLabels, heatMap, timeLabels;
        svg.selectAll('*').remove();
        if (!data) {
          return;
        }
        colorScale = d3.scale.quantile().domain([
          0, buckets - 1, d3.max(data, function(d) {
            return d.value;
          })
        ]).range(colors);
        dayLabels = svg.selectAll(".dayLabel").data(days).enter().append("text").text(function(d) {
          return d;
        }).attr("x", 0).attr("y", function(d, i) {
          return i * gridSize;
        }).style("text-anchor", "end").attr("transform", "translate(-6," + gridSize / 1.5 + ")").attr("class", function(d, i) {
          if (i >= 0 && i <= 4) {
            return "dayLabel mono axis axis-workweek";
          } else {
            return "dayLabel mono axis";
          }
        });
        timeLabels = svg.selectAll(".timeLabel").data(times).enter().append("text").text(function(d) {
          return d;
        }).attr("x", function(d, i) {
          return i * gridSize;
        }).attr("y", 0).style("text-anchor", "middle").attr("transform", "translate(" + gridSize / 2 + ", -6)").attr("class", function(d, i) {
          if (i >= 7 && i <= 16) {
            return "timeLabel mono axis axis-worktime";
          } else {
            return "timeLabel mono axis";
          }
        });
        heatMap = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")").selectAll(".hour").data(data).enter().append("rect").attr("x", function(d) {
          return (d.hour - 1) * gridSize;
        }).attr("y", function(d) {
          return (d.day - 1) * gridSize;
        }).attr("rx", 4).attr("ry", 4).attr("class", "hour bordered").attr("width", gridSize).attr("height", gridSize).style("fill", colors[0]);
        heatMap.transition().duration(1000).style("fill", function(d) {
          return colorScale(d.value);
        });
        return heatMap.append("title").text(function(d) {
          return d.value;
        });
      });
    }
  };
});
