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
      build: ['Gruntfile.js', 'src/**/*.js']
    },
    copy: {
      main: {
        files: [
          { src: '<%= config.app %>/index.html', dest:'<%= config.dist %>/index.html' },
          { expand: true, flatten: true, src: ['<%= config.app %>/images/*'], dest: '<%= config.dist %>/images/', filter: 'isFile' }
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
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('minify', ['newer:cssmin:build']);
  grunt.registerTask('default', ['jshint', 'minify', 'copy']);
};
