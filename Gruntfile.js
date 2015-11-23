module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      build: ['dist']
    },
    copy: {
      build: {
        files: [
        	{src: ['bin/**', 'models/**', 'routes/**'], expand:true, dest:'dist/'},
        	{src: ['app.js', 'package.json'], expand:true, dest:'dist/'}
        ]
      }
    },
    mkdir: {
      build: {
        options: {
          create: ['dist/public']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('build', ['clean:build', 'copy:build', 'mkdir:build']);
}
