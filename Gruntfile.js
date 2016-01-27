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
      vendor: {
        files: {
          '<%=CONFIG.buildDir%>/jquery.js': 'node_modules/jquery/dist/jquery.js',
          '<%=CONFIG.buildDir%>/marbelous.js': 'node_modules/marbelous/dist/marbelous.js',
          '<%=CONFIG.buildDir%>/marbelous.css': 'node_modules/marbelous/dist/marbelous.css'
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
      'js': {
        entry: {
          'slider-to-label': './js/slider-to-label.js',
          'summing-two-sliders': './js/summing-two-sliders.js'
        },
        output: {
          path: "public",
          filename: "[name].js"
        },
        devtool: 'source-map',
        module: {
          loaders: [
            { 
              test: "./js",
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
            }
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
