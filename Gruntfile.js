// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    // configure uglify to minify js files -------------------------------------
     

      jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },

// javascript minification ------------------------------------

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'asset/js/script.min.js': 'src/js/script.js'
        }
      }
    },

// configure less to  css files ------------------------------------

    less: {
      build: {
        files: {
          'css/style.min.css': 'css/style.less'
        },
          options: {
                    compress: true,
                    strictMath: true,
                     sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'style.css.map',
                    sourceMapFilename: 'asset/css/style.css.map'
                   
                }
      }
    },

  
     // configure cssmin to minify css files ------------------------------------
       cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'asset/css/style.min.css': 'asset/css/style.css'
        }
      }
    },



// configure watch less file ------------------------------------

    watch: {
  scripts: {
    files: ['**/*.less'],
    tasks: ['less'],
    options: {
      spawn: false,
    },
  },
}

 



      

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
   grunt.loadNpmTasks('grunt-contrib-jshint'); //js validate
  grunt.loadNpmTasks('grunt-contrib-uglify');  //to minify js
  grunt.loadNpmTasks('grunt-contrib-less');    //to covert less to css
 grunt.loadNpmTasks('grunt-contrib-cssmin');  //to minify css
  grunt.loadNpmTasks('grunt-contrib-watch');   //watch

  //set task as default

   grunt.registerTask('default', ['less','watch']); 

     // this task will only run the dev configuration 

  //grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);

  // only run production configuration 
  grunt.registerTask('production', ['jshint','uglify']);

};

