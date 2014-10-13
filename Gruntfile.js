/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "js/site.min.js": ["_assets/js/vendor/*.js", "_assets/js/*.js"]
        }
      }
    },

    sass: {
      global: {
        options: {
          style: "compressed"
        },
        files: {
          "_assets/sass/unprefixed/global-unprefixed.css": "_assets/sass/global.sass"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "_assets/sass/unprefixed/global-unprefixed.css",
        dest: "css/global.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl="
      },
      jekyllBuild: {
        command: "jekyll build"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["index.html", "writing.html", "about.html", "_layouts/*.html", "_posts/*.md", "_projects/*.md", "_includes/*.html" , "_data/*.yml"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["_assets/js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["_assets/sass/*.scss", "_assets/sass/*/*.scss", "_assets/sass/*.sass", "_assets/sass/*/*.sass"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["_assets/svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["_assets/svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "autoprefixer", "uglify", "svgstore", "shell:jekyllBuild", "watch"]);

};