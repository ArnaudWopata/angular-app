angular.module("directives.yearlyGraph", [])

.directive "yearlyGraph", ->

  height = 2000
  width = '100%'

  {
    restrict: "E"
    scope:
      values: "="

    link: (scope, element, attrs) ->

      scope.$watch 'values', (data)->

        # sort the data
        data.forEach (serie)->
          console.log serie.key, serie.values.length
          serie.values = serie.values.sort (a, b)->
            a.doy - b.doy


        nv.addGraph ->
          chart = nv.models.stackedAreaChart()
            .x((d) -> parseInt(d.doy))
            .y((d) -> parseInt(d.value))
            .clipEdge(true)

          chart.xAxis.tickFormat (d) -> d
          # d3.time.format("%Y") new Date(d, 0 )

          chart.yAxis.tickFormat d3.format("f")

          d3.select(element[0]).append('svg')
            .attr("width", width)
            .attr("height", height)
            .datum(data).transition().duration(500).call chart

          nv.utils.windowResize chart.update

  }

