/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: {
        src: [
          'src/**/*.js',
          'Gruntfile.js',
          '!src/**/jquery-*.js'
        ]
      },
    },
    compress: {
      main: {
        options: {
          archive: function() {
            var version = grunt.file.readJSON('manifest.json').version;
            return 'pkg/ng-inspect-watchers-' + version + '.zip';
          }
        },
        files: [
          {src: 'assets/icons/*.png'},
          {src: 'src/**'},
          {src: 'manifest.json'}, {src: 'README.md'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('package', ['jshint', 'compress']);
};
