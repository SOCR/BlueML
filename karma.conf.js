// Karma configuration
// Generated on Wed Mar 21 2018 18:39:08 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',


      // frameworks to use: Jasmine, a testing framework
      // Manually running Jasmine tetss by freshing a browser tab in different browsers is tiresome, 
      // so we use Karma to let us spawn brosers and run Jasmine tests inside of them all from the 
      // CLI. The results of the tests are also shown on the CLI.
    
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],


      // list of files / patterns to load in the browser
      files: [
          'test/test.js'
      ],


      // list of files / patterns to exclude
      exclude: [],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
          //'**/lib/*.js': 'coverage'
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: [
          'progress'//,
          // 'coverage'
      ],

      //coverageReporter: {
       //   type : 'html',
        //  dir : 'coverage/'
      //},

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
      //'Firefox', 'PhantomJS', 'Safari'

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
