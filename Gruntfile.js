javascript
module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'source',
        src: [ '**', '!**/*.styl', '!**/*.coffee' ],
        dest: 'build',
        expand: true
      },
      }
      clean: {
      build: {
      src: [ 'build' ]
      },
    stylus: {
      build: {
      options: {
      linenos: true,
      compress: false
    },
    files: [{
      expand: true,
      cwd: 'source',
      src: [ '**/*.styl' ],
      dest: 'build',
      ext: '.css'
    }]
    }
    },
    autoprefixer: {
      build: {
      expand: true,
      cwd: 'build',
      src: [ '**/*.css' ],
      dest: 'build'
    }
    },
    cssmin: {
      build: {
      files: {
      'build/application.css': [ 'build/**/*.css' ]
    }
    }
    },
    coffee: {
      build: {
      expand: true,
      cwd: 'source',
      src: [ '**/*.coffee' ],
      dest: 'build',
      ext: '.js'
    }
    },
    uglify: {
      build: {
      options: {
      mangle: false
    },
    files: {
      'build/application.js': [ 'build/**/*.js' ]
    }
    }
    },

    },

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  // define the tasks
  grunt.registerTask(
  'stylesheets', 
  'Compiles the stylesheets.', 
  [ 'stylus', 'autoprefixer', 'cssmin' ]
  );

  grunt.registerTask(
  'scripts', 
  'Compiles the JavaScript files.', 
  [ 'coffee' ]
  );

  grunt.registerTask(
  'build', 
  'Compiles all of the assets and copies the files to the build directory.', 
  [ 'clean', 'copy', 'stylesheets', 'scripts' ]
  );
};