angular.module("directives.hourlyGraph", [])

.directive "hourlyGraph", ->
  margin = 20
  width = 960
  height = 500 - .5 - margin
  color = d3.interpolateRgb("#f77", "#77f")
  restrict: "E"
  scope:
    val: "="

  link: (scope, element, attrs) ->
    vis = d3.select(element[0]).append("svg").attr("width", width).attr("height", height + margin + 100)
    scope.$watch()
