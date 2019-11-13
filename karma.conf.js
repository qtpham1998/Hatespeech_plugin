module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'lib/**/*.js',
            'spec/*-test.js',
            'src/**/*.js',
            'spec/*Spec.js'
        ],
        exclude: [],
        preprocessors: {},
        plugins: [
            require('karma-jasmine'),
            require('karma-jasmine-jquery'),
            require('karma-chrome-launcher'),
            require('karma-spec-reporter'),
        ],

        client: {
            clearContext: false
        },

        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DISABLE,
        autoWatch: true,
        browsers: ['Chrome'],
        concurrency: Infinity,
    })
};