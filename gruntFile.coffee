module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-karma"
  grunt.loadNpmTasks "grunt-html2js"

  # Default task.
  grunt.registerTask "default", ["jshint", "build", "karma:unit"]
  grunt.registerTask "build", ["clean:pre", "html2js", "coffee", "sass:build", "concat", "copy", "clean:post"]
  grunt.registerTask "release", ["clean:pre", "html2js", "coffee", "sass:min", "uglify", "jshint", "karma:unit", "concat:css", "concat:index", "copy", "clean:post"]
  grunt.registerTask "test-watch", ["karma:watch"]

  # Print a timestamp (useful for when watching)
  grunt.registerTask "timestamp", ->
    grunt.log.subhead Date()

  karmaConfig = (configFile, customOptions) ->
    options =
      configFile: configFile
      keepalive: true

    travisOptions = process.env.TRAVIS and
      browsers: ["Firefox"]
      reporters: "dots"

    grunt.util._.extend options, customOptions, travisOptions


  # Project configuration.
  grunt.initConfig
    distdir: "dist"
    pkg: grunt.file.readJSON("package.json")
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + "<%= pkg.homepage ? \" * \" + pkg.homepage + \"\\n\" : \"\" %>" + " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author %>;\n" + " * Licensed <%= _.pluck(pkg.licenses, \"type\").join(\", \") %>\n */\n"
    src:
      js: ["src/**/*.js"]
      css: ["src/**/*.css", "vendor/**/*.css"]
      coffee: ["src/**/*.coffee"]
      coffeeDist: ["<%= distdir %>/coffee.js"]
      jsTpl: ["<%= distdir %>/templates/**/*.js"]
      specs: ["test/**/*.spec.js"]
      scenarios: ["test/**/*.scenario.js"]
      html: ["src/index.html"]
      tpl:
        app: ["src/app/**/*.tpl.html"]
        common: ["src/common/**/*.tpl.html"]
      sass: ["src/sass/stylesheet.sass"]
      sassDist: ["<%= distdir %>/sass"]
      sassWatch: ["src/sass/**/*.sass"]

    clean:
      pre: ["<%= distdir %>/*"]
      post: ["<%= src.coffeeDist %>", "<%= distdir %>/templates", "<%= src.sassDist %>.css"]

    copy:
      assets:
        files: [
          dest: "<%= distdir %>"
          src: "**"
          expand: true
          cwd: "src/assets/"
        ]
      stats:
        files: [
          dest: "<%= distdir %>/stats"
          src: "**"
          expand: true
          cwd: "src/stats/"
        ]

    karma:
      unit:
        options: karmaConfig("test/config/unit.js")

      watch:
        options: karmaConfig("test/config/unit.js",
          singleRun: false
          autoWatch: true
        )
    coffee:
      dist:
        files:
          "<%= distdir %>/coffee.js": "<%= src.coffee %>"
        options:
          bare: true

    html2js:
      app:
        options:
          base: "src/app"

        src: ["<%= src.tpl.app %>"]
        dest: "<%= distdir %>/templates/app.js"
        module: "templates.app"

      common:
        options:
          base: "src/common"

        src: ["<%= src.tpl.common %>"]
        dest: "<%= distdir %>/templates/common.js"
        module: "templates.common"

    concat:
      dist:
        options:
          banner: "<%= banner %>"

        src: ["<%= src.js %>", "<%= src.coffeeDist %>", "<%= src.jsTpl %>"]
        dest: "<%= distdir %>/<%= pkg.name %>.js"

      css:
        src: ["<%= src.css %>", "<%= src.sassDist %>.css"]
        dest: "<%= distdir %>/<%= pkg.name %>.css"

      index:
        src: ["src/index.html"]
        dest: "<%= distdir %>/index.html"
        options:
          process: true

      angular:
        src: ["vendor/angular/angular.js", "vendor/angular/angular-route.js", "vendor/angular/restangular.js"]
        dest: "<%= distdir %>/angular.js"

      jquery:
        src: ["vendor/jquery/*.js"]
        dest: "<%= distdir %>/jquery.js"

      d3:
        src: ["vendor/d3/*.js"]
        dest: "<%= distdir %>/d3.js"

      lodash:
        src: ["vendor/lodash/*.js"]
        dest: "<%= distdir %>/lodash.js"

    uglify:
      dist:
        options:
          banner: "<%= banner %>"

        src: ["<%= src.js %>", "<%= src.coffeeDist %>", "<%= src.jsTpl %>"]
        dest: "<%= distdir %>/<%= pkg.name %>.js"

      angular:
        src: ["<%= concat.angular.src %>"]
        dest: "<%= distdir %>/angular.js"

      jquery:
        src: ["vendor/jquery/*.js"]
        dest: "<%= distdir %>/jquery.js"

      d3:
        src: ["vendor/d3/*.js"]
        dest: "<%= distdir %>/d3.js"

      lodash:
        src: ["vendor/lodash/*.js"]
        dest: "<%= distdir %>/lodash.js"

    sass:
      build:
        files:
          "<%= src.sassDist %>.css": ["<%= src.sass %>"]
        options:
          style: 'expanded'

      min:
        files:
          "<%= distdir %>/<%= pkg.name %>.css": ["<%= src.sass %>"]

        options:
          style: 'compressed'

    watch:
      all:
        files: ["<%= src.js %>", "<%= src.specs %>", "<%= src.sassWatch %>", "<%= src.tpl.app %>", "<%= src.tpl.common %>", "<%= src.html %>", "<%= src.coffee %>"]
        tasks: ["default", "timestamp"]
        options:
          livereload: true

      build:
        files: ["<%= src.js %>", "<%= src.specs %>", "<%= src.sassWatch %>", "<%= src.tpl.app %>", "<%= src.tpl.common %>", "<%= src.html %>", "<%= src.coffee %>"]
        tasks: ["build", "timestamp"]
        options:
          livereload: true

    jshint:
      files: ["gruntFile.js", "<%= src.js %>", "<%= src.jsTpl %>", "<%= src.specs %>", "<%= src.scenarios %>"]
      options:
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        boss: true
        eqnull: true
        globals: {}
