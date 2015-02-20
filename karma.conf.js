module.exports = function(config) {
  var testFiles = [
    'src/js/requirejs-config.js',
    'test/unit/js/test-main.js',
    { pattern: 'src/lib/**/*.js', included: false },
    { pattern: 'src/js/**/*.js', included: false }
  ];

  var options = JSON.parse(process.argv[2]);

  if (options.tests) {
    testFiles.push({ pattern: 'test/unit/' + options.test, included: false });
  } else {
    testFiles.push({ pattern: 'test/unit/**/*.js', included: false });
  }

  config.set({
    basePath: '',
    frameworks: ['requirejs','mocha', 'chai'],
    reporters: ['mocha', 'coverage'],
    preprocessors: {
      'src/js/**/*.js': ['coverage']
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'test',
      subdir: 'sonar_report'
    },
    files: testFiles,
    autoWatch: false,
    captureTimeout: 60000
  });
};
