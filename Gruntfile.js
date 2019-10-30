module.exports = function (grunt)
{
    // Project configuration.
    grunt.initConfig({
        qunit: {
            files: ["./build/*.html"]
        }
    });
    // Load plugin
    grunt.loadNpmTasks("grunt-contrib-qunit");

    // Task to run tests
    grunt.registerTask("test", "qunit");
};