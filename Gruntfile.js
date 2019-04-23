module.exports = function(grunt) {

    // Project configuration.
    grunt.config.init({
        env: {
            test: {
                NODE_ENV: 'development'
            }
        },
        mochaTest: {
            // Mocha is a Node.js testing frameworks
            //src: watchFiles.mochaTests
            options: {
                globals: ['expect'],
                reporter: 'spec',
            },
            all: ['test/test_mocha.js']
        },
        karma: {
            // Karma is a JavaScript test runner
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    // Test task(s).
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

};
