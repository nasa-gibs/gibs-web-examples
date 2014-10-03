/**
 * GIBS Web Examples
 *
 * Copyright 2013 - 2014 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 module.exports = function(grunt) {

    grunt.initConfig({
        "git-rev-parse": {
            build: {
                options: {
                    prop: 'git-revision',
                    number: 6
                }
            }
        },

        jshint: {
            console: [
                "**/js/*.js",
                "!node_modules/**/*.js"
            ],
            report: {
                options: {
                    reporter: "checkstyle",
                },
                files: {
                    src: [
                        "web/js/**/wv.*.js",
                        "test/**/*.js",
                    ]
                }
            }
        },

        csslint: {
            console: {
                options: {
                    ids: false,
                    "fallback-colors": false
                },
                src: [
                    "**/css/*.css",
                    "!node_modules/**/*.css"
                ]
            },
            report: {
                options: {
                    ids: false,
                    "fallback-colors": false,
                    formatters: [
                        { id: "checkstyle-xml", dest: "build/csslint-results.xml" }
                    ]
                },
                src: [
                    "**/css/*.css",
                    "!node_modules/**/*.css"
                ]
            }
        },

        clean: {
            all: ["build", "dist"]
        }

    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-git-rev-parse");

    grunt.task.run("git-rev-parse");

    grunt.registerTask("default", ["jshint:console", "csslint:console"]);
    grunt.registerTask("lint", ["default"]);

};
