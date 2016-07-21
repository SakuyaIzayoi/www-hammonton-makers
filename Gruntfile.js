var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
};

module.exports = function(grunt) {
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    //pkg: grunt.file.readJSON('package.json'),

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
          { expand: true, cwd: '<%= config.app %>/_lib/skeleton', src: 'css/*', dest: 'src/'},
          { src: 'src/index.html', dest:'dist/index.html' },
          { expand: true, flatten: true, src: ['src/images/*'], dest: 'dist/images/', filter: 'isFile' }
        ],
      },
    },
    bower: grunt.file.readJSON('./.bowerrc'),
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
