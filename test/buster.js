var config = module.exports;

config["symposia"] = {
    env: 'node',
    rootPath: "../",
    libs: [
        'test/lib/requirejs/require.js',
        'test/require.conf.js'
    ],
    resources: [
        '*',
        'src/*.js',
        'lib/**/*.js',
        'test/**/**/*.js'
    ],
    tests: ['test/specs/*.js'],
    extensions: [
        require("buster-amd")
    ],
    deps: ['test/lib/sinon/sinon-1.5.2.js'],
    "buster-amd": {
        pathMapper: function (path) {
            // prefix any path starting with a slash with ../
            return path.replace(/\.js$/, "").replace(/^\//, "../");
        }
    }
};