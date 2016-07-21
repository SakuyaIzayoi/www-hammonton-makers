module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/skeleton.css': 'src/css/skeleton.css',
          'dist/css/normalize.css': 'src/css/normalize.css'
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['Gruntfile.js', 'src/**/*.js']
    },
    copy: {
      main: {
        files: [
          { src: 'src/index.html', dest:'dist/index.html' },
          { expand: true, flatten: true, src: ['src/images/*'], dest: 'dist/images/', filter: 'isFile' }
        ],
      },
    },
    watch: {
      files: ['Gruntfile.js', 'src/css/*.css'],
      tasks: ['jshint', 'newer:cssmin:build'],
      scripts: {
        files: 'src/**/*.js', tasks: ['jshint']
      },
      pages: {
        files: 'src/*.html', tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('minify', ['newer:cssmin:build']);
  grunt.registerTask('default', ['jshint', 'minify', 'copy']);
};
