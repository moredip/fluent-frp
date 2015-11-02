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
    }
    //webpack: {
      //app: {
        //entry: "./js/app.js",
        //output: {
            //path: "public",
            //filename: "app.js"
        //},
        //module: {
          //loaders: [
              //{ test: "./js/", loader: 'babel-loader' }
          //]
        //}
      //}
    //}
  });

  grunt.registerTask('default', ['clean','copy','sass']);
};
