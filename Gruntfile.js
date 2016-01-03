var webpack = require('webpack');
var _ = require('underscore');
var path = require('path');
var webpackConfig = require("./webpack.config.js");

module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['dist'],
    sass: {
      dist: {
        files: {
          'dist/marbelous.css': 'sass/marbelous.scss'
        }
      }
    },
    webpack: {
      options: webpackConfig,
      build: {
        output: {
          filename: "marbelous.min.js"
        },
				plugins: webpackConfig.plugins.concat(
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			"build-dev": {
				devtool: "sourcemap",
				debug: true,
        output: {
          filename: "marbelous.js"
        }
			}
    },
    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      js: {
        files: ['./src/**/*.js'],
        tasks: ['webpack:build-dev']
      },
      sass: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.registerTask('default', ['clean','sass','watch']);
};
