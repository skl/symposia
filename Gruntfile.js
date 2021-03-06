module.exports = function(grunt) {
    /** load grunt tasks */
    require('load-grunt-tasks')(grunt);
    /** start grunt timer */
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            app: [
                '*.js',
                'src/*.js',
                'test/specs/*.js'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    name: 'symposia',
                    exclude: ['jquery','underscore'],
                    baseUrl: '.',
                    out: 'dist/symposia.js',
                    optimize: "uglify",
                    preserveLicenseComments: false,
                    paths: {
                        'underscore'    : 'vendor/lodash/lodash',
                        'jquery'        : 'vendor/jquery/jquery',
                        'postal'        : 'vendor/postaljs/lib/postal',
                        'crossroads'    : 'node_modules/crossroads/dist/crossroads.min',
                        'signals'       : 'node_modules/signals/dist/signals.min',
                        'hasher'        : 'node_modules/hasher/dist/js/hasher.min'
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8000,
                    base: '.',
                    keepalive: false
                }
            }
        },
        mocha: {
            all: {
                options: {
                    urls: ['http://localhost:<%= connect.server.options.port %>/test/index.html']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app: {
                src: '<%= meta.app %>'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            app: {
                files: '<%= meta.app %>',
                tasks: ['requirejs','connect', 'mocha']
            }
        }
    });

    grunt.registerTask('default', [
        'jshint'
    ]);

    grunt.registerTask('build', [
        'default',
        'requirejs'
    ]);

    grunt.registerTask('test', [
        'connect',
        'mocha'
    ]);

};
