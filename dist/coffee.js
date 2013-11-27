angular.module("directives.hourlyGraph", []).directive("hourlyGraph", function() {
  var color, height, margin, width;
  margin = 20;
  width = 960;
  height = 500 - .5 - margin;
  color = d3.interpolateRgb("#f77", "#77f");
  return {
    restrict: "E",
    scope: {
      val: "="
    },
    link: function(scope, element, attrs) {
      var vis;
      vis = d3.select(element[0]).append("svg").attr("width", width).attr("height", height + margin + 100);
      return scope.$watch();
    }
  };
});
