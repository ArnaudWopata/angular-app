angular.module("directives.hourlyGraph", [])

.directive "hourlyGraph", ->
  margin =
    top: 40
    right: 0
    bottom: 100
    left: 40
  width = 960 - margin.left - margin.right
  height = 430 - margin.top - margin.bottom
  gridSize = Math.floor(width / 24)
  legendElementWidth = gridSize * 2
  buckets = 9
  colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"] # alternatively colorbrewer.YlGnBu[9]
  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"]

  {
    restrict: "E"
    scope:
      values: "="

    link: (scope, element, attrs) ->

      svg = d3.select(element[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      scope.$watch 'values', (data)->

        # Clear the svg
        svg.selectAll('*').remove();

        return unless data

        # Build color scale
        colorScale = d3.scale.quantile().domain([0, buckets - 1, d3.max(data, (d) ->
          d.value
        )]).range(colors)

        # Day labels on the left side
        dayLabels = svg.selectAll(".dayLabel")
          .data(days).enter()
            .append("text")
              .text((d) -> d)
              .attr("x", 0).attr("y", (d, i) -> i * gridSize )
              .style("text-anchor", "end")
              .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
              .attr("class", (d, i) ->
                if i >= 0 and i <= 4
                  "dayLabel mono axis axis-workweek"
                else
                  "dayLabel mono axis"
              )

        # Time labels on top of the graph
        timeLabels = svg.selectAll(".timeLabel")
          .data(times).enter()
            .append("text")
            .text((d) -> d)
            .attr("x", (d, i) -> i * gridSize)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr "class", (d, i) ->
              if (i >= 7 and i <= 16)
                "timeLabel mono axis axis-worktime"
              else "timeLabel mono axis"

        heatMap = svg.append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .selectAll(".hour")
              .data(data).enter()
              .append("rect").attr("x", (d) -> (d.hour - 1) * gridSize )
              .attr("y", (d) -> (d.day - 1) * gridSize )
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0])

        heatMap
          .transition()
          .duration(1000).style "fill", (d) -> colorScale d.value

        heatMap
          .append("title")
          .text (d) -> d.value
  }

  # legend = svg.selectAll(".legend").data([0].concat(colorScale.quantiles()), (d) ->
  #   d
  # ).enter().append("g").attr("class", "legend")
  # legend.append("rect").attr("x", (d, i) ->
  #   legendElementWidth * i
  # ).attr("y", height).attr("width", legendElementWidth).attr("height", gridSize / 2).style "fill", (d, i) ->
  #   colors[i]

  # legend.append("text").attr("class", "mono").text((d) ->
  #   "≥ " + Math.round(d)
  # ).attr("x", (d, i) ->
  #   legendElementWidth * i
  # ).attr "y", height + gridSize

