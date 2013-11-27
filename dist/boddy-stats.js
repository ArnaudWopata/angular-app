/*! boddy-stats - v0.0.1-SNAPSHOT - 2013-11-27
 * https://github.com/ArnaudRinquin/boddy-stats
 * Copyright (c) 2013 Arnaud Rinquin;
 * Licensed MIT
 */
angular.module('directives.gravatar', [])

// A simple directive to display a gravatar image given an email
.directive('gravatar', ['md5', function(md5) {

  return {
    restrict: 'E',
    template: '<img ng-src="http://www.gravatar.com/avatar/{{hash}}{{getParams}}"/>',
    replace: true,
    scope: {
      email: '=',
      size: '=',
      defaultImage: '=',
      forceDefault: '='
    },
    link: function(scope, element, attrs) {
      scope.options = {};
      scope.$watch('email', function(email) {
        if ( email ) {
          scope.hash = md5(email.trim().toLowerCase());
        }
      });
      scope.$watch('size', function(size) {
        scope.options.s = (angular.isNumber(size)) ? size : undefined;
        generateParams();
      });
      scope.$watch('forceDefault', function(forceDefault) {
        scope.options.f = forceDefault ? 'y' : undefined;
        generateParams();
      });
      scope.$watch('defaultImage', function(defaultImage) {
        scope.options.d = defaultImage ? defaultImage : undefined;
        generateParams();
      });
      function generateParams() {
        var options = [];
        scope.getParams = '';
        angular.forEach(scope.options, function(value, key) {
          if ( value ) {
            options.push(key + '=' + encodeURIComponent(value));
          }
        });
        if ( options.length > 0 ) {
          scope.getParams = '?' + options.join('&');
        }
      }
    }
  };
}])

.factory('md5', function() {
  function md5cycle(x, k) {
    var a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);

  }

  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function md51(s) {
    txt = '';
    var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878],
      i;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    }
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) {
        tail[i] = 0;
      }
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }

  /* there needs to be support for Unicode here,
   * unless we pretend that we can redefine the MD-5
   * algorithm for multi-byte characters (perhaps
   * by adding every four 16-bit characters and
   * shortening the sum to 32 bits). Otherwise
   * I suggest performing MD-5 as if every character
   * was two bytes--e.g., 0040 0025 = @%--but then
   * how will an ordinary MD-5 sum be matched?
   * There is no way to standardize text to something
   * like UTF-8 before transformation; speed cost is
   * utterly prohibitive. The JavaScript standard
   * itself needs to look at this: it should start
   * providing access to strings as preformed UTF-8
   * 8-bit unsigned value arrays.
   */

  function md5blk(s) { /* I figured global was faster.   */
    var md5blks = [],
      i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  var hex_chr = '0123456789abcdef'.split('');

  function rhex(n) {
    var s = '', j = 0;
    for (; j < 4; j++) {
      s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    }
    return s;
  }

  function hex(x) {
    for (var i = 0; i < x.length; i++) {
      x[i] = rhex(x[i]);
    }
    return x.join('');
  }

  function md5(s) {
    return hex(md51(s));
  }

  /* this function is much faster,
  so if possible we use it. Some IEs
  are the only ones I know of that
  need the idiotic second function,
  generated by an if clause.  */

  add32 = function(a, b) {
    return (a + b) & 0xFFFFFFFF;
  };

  if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    add32 = function (x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };
  }

  return md5;
});
angular.module('services.localizedMessages', []).factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

  var handleNotFound = function (msg, msgKey) {
    return msg || '?' + msgKey + '?';
  };

  return {
    get : function (msgKey, interpolateParams) {
      var msg =  i18nmessages[msgKey];
      if (msg) {
        return $interpolate(msg)(interpolateParams);
      } else {
        return handleNotFound(msg, msgKey);
      }
    }
  };
}]);
angular.module("app", ["ngRoute", "restangular", "dashboard", "hourly", "yearly", "directives.hourlyGraph", "templates.app", "templates.common"]);

angular.module("app").controller("AppCtrl", [
  "$scope", function($scope) {
    return $scope.$on("$routeChangeError", function(event, current, previous, rejection) {
      return console.log("errors.route.changeError", "error", {}, {
        rejection: rejection
      });
    });
  }
]);

angular.module("dashboard", []).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/", {
      templateUrl: "dashboard/dashboard.tpl.html",
      controller: "DashboardCtrl"
    });
  }
]).controller("DashboardCtrl", ["$scope", "$location", function($scope, $location) {}]);

angular.module('hourly', ['restangular']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/hourly', {
      templateUrl: 'hourly/hourly.tpl.html',
      controller: 'HourlyCtrl',
      resolve: {
        stats: [
          'Restangular', function(Restangular) {
            return Restangular.one('stats', 'hourly').get();
          }
        ]
      }
    });
  }
]).controller('HourlyCtrl', [
  '$scope', 'stats', function($scope, stats) {
    return $scope.stats = stats;
  }
]);

angular.module('yearly', ['restangular']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/yearly', {
      templateUrl: 'yearly/yearly.tpl.html',
      controller: 'YearlyCtrl',
      resolve: {
        stats: [
          'Restangular', function(Restangular) {
            return Restangular.one('stats', 'yearly').get();
          }
        ]
      }
    });
  }
]).controller('YearlyCtrl', [
  '$scope', 'stats', function($scope, stats) {
    return $scope.stats = stats;
  }
]);

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

angular.module('templates.app', ['dashboard/dashboard.tpl.html', 'hourly/hourly.tpl.html', 'yearly/yearly.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<h4>Dashboard</h4>\n" +
    "<a href=\"/#hourly\">Hourly asked questions</a>\n" +
    "<a href=\"/#yearly\">Yearly asked questions per service</a>\n" +
    "");
}]);

angular.module("hourly/hourly.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hourly/hourly.tpl.html",
    "<h4>Hourly asked questions</h4>\n" +
    "<hourly-graph values='stats'></hourly-graph>\n" +
    "");
}]);

angular.module("yearly/yearly.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("yearly/yearly.tpl.html",
    "<h4>Yearly asked questions per service</h4>\n" +
    "");
}]);

angular.module('templates.common', []);

