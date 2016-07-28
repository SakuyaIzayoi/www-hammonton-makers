var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
};

var jsFiles = ['Gruntfile.js', 'src/**/*.js'];

module.exports = function(grunt) {
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: {
      install: {
        options: {
          targetDir: '<%= config.app %>/_lib'
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: [
          { expand: true, cwd: '<%= config.app %>/', src: 'css/*', dest: '<%= config.dist %>' },
          { expand: true, cwd: '<%= config.app %>/_lib/skeleton', src: 'css/*', dest: '<%= config.dist %>' }
        ]
      },
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: {
        src: jsFiles,
      }
    },
    copy: {
      main: {
        files: [
          { src: '<%= config.app %>/index.html', dest:'<%= config.dist %>/index.html' },
          { expand: true, flatten: true, src: ['<%= config.app %>/images/*'], dest: '<%= config.dist %>/images/', filter: 'isFile' },
          { src: '<%= config.app %>/_lib/fontawesome/css/font-awesome.min.css', dest: '<%= config.dist %>/css/font-awesome.min.css' },
          { expand: true, cwd: '<%= config.app %>/_lib/fontawesome', src: 'fonts/*', dest: '<%= config.dist %>' }

        ],
      },
    },
    watch: {
      style: {
        files: 'src/css/*.css',
        tasks: 'newer:cssmin:build'
      },
      scripts: {
        files: jsFiles,
        tasks: 'newer:jshint:all'
      },
      pages: {
        files: 'src/*.html',
        tasks: 'newer:copy:main'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('minify', ['newer:cssmin:build']);
  grunt.registerTask('default', ['newer:jshint:all', 'minify', 'newer:copy:main']);
  grunt.registerTask('all', ['jshint', 'cssmin:build', 'copy:main']);
};
