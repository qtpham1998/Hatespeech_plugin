module.exports = function (grunt)
{
    // Project configuration.
    grunt.initConfig({
        qunit: {
            all: ["./test/html/*.html"]
        }
    });
    // Load plugin
    grunt.loadNpmTasks("grunt-contrib-qunit");

    // Task to run tests
    grunt.registerTask("test", "qunit");
};