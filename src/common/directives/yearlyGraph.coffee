angular.module("directives.yearlyGraph", [])

.directive "yearlyGraph", ->

  height = 500
  width = '100%'

  {
    restrict: "E"
    scope:
      values: "="

    link: (scope, element, attrs) ->

      scope.$watch 'values', (data)->

        nv.addGraph ->
          chart = nv.models.stackedAreaChart()
            .x((d) -> d[0])
            .y((d) -> d[1])
            .clipEdge(true)

          chart.xAxis.tickFormat (d) ->
            console.log d
            d3.time.format("%Y") new Date(d, 0 )

          chart.yAxis.tickFormat d3.format("f")

          d3.select(element[0]).append('svg')
            .attr("width", width)
            .attr("height", height)
            .datum(data).transition().duration(500).call chart

          nv.utils.windowResize chart.update

  }

