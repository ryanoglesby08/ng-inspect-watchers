/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({  
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    compress: {
      main: {
        options: {
          archive: function() {
            var version = grunt.file.readJSON('manifest.json').version;
            return 'ng-inspect-watchers-' + version + '.zip';
          }
        },
        files: [
          {src: 'icons/**'},
          {src: 'popup/**'},
          {src: 'ng_inspect_watchers.css'},
          {src: 'ng_inspect_watchers_off.js'}, {src: 'ng_inspect_watchers_on.js'}, {src: 'tab_communicator.js'},
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
