/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: {
        src: [
          'src/**/*.js',
          'Gruntfile.js'
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
    },
    exec: {
      startChromedriver: 'chromedriver --port=4444 --url-base=wd/hub &',
      stopChromedriver: 'killall chromedriver',
      functionalTests: 'node ./node_modules/intern/bin/intern-runner.js config=tests/intern'
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('package', ['jshint', 'compress']);
  grunt.registerTask('test',    ['exec:startChromedriver', 'exec:functionalTests', 'exec:stopChromedriver'])
};
