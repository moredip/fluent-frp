var _ = require('underscore');
var path = require('path');

module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  var CONFIG = {
    buildDir: './public'
  };

  var jsFilesMap = _.object( _.map( grunt.file.expand("./js/*.js"), function(jsFile){
    return [ path.basename(jsFile), jsFile ];
  }));

  grunt.initConfig({
    CONFIG: CONFIG,
    copy: {
      html: {
        expand: true,
        cwd: './html',
        src: '*.html',
        dest: CONFIG.buildDir
      },
      js: {
        files: {
          '<%=CONFIG.buildDir%>/jquery.js': 'node_modules/jquery/dist/jquery.js',
        }
      }
    },
    clean: [CONFIG.buildDir],
    sass: {
      options: {
        includePaths: require('node-bourbon').includePaths.concat( require('node-neat').includePaths )
      },
      dist: {
        files: {
          '<%=CONFIG.buildDir%>/app.css': 'sass/app.scss'
        }
      }
    },
    webpack: {
      'all': {
        entry: jsFilesMap,
        output: {
          path: "public",
          filename: "[name]"
        },
        devtool: 'source-map',
        module: {
          loaders: [
          { test: /.js$/, loader: 'babel-loader' }
          ]
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      js: {
        files: ['./js/**/*.js'],
        tasks: ['webpack']
      }
    }
  });

  grunt.registerTask('default', ['clean','copy','sass','watch']);
};
