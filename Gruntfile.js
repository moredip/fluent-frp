module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  var CONFIG = {
    buildDir: './public'
  };

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
      'slider-to-label': {
        entry: "./js/slider-to-label.js",
        output: {
          path: "public",
          filename: "slider-to-label.js"
        },
        devtool: 'source-map',
        module: {
          loaders: [
          { test: "./js/", loader: 'babel-loader' }
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
        files: ['./js/*.js'],
        tasks: ['webpack']
      },
      html: {
        files: ['./html/*.html'],
        tasks: ['copy']
      }
    }
  });

  grunt.registerTask('default', ['clean','copy','sass']);
};
