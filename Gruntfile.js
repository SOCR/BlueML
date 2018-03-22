module.exports = function(grunt) {

    // Project configuration.
    grunt.config.init({
        env: {
            test: {
                NODE_ENV: 'development'
            }
        },
        mochaTest: {
            //src: watchFiles.mochaTests,
            options: {
                reporter: 'spec',
                require: 'test/test_mocha.js'
            }
        },
        karma: {
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