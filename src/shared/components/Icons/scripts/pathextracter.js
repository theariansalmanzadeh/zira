/* eslint-disable @typescript-eslint/no-require-imports */
const gulp = require("gulp");
const extractSvgPaths = require("./extractSvgPaths").default;
const generateIconTypes = require("./generateIconTypes").default;

gulp.task("extract-svg-paths", extractSvgPaths);
gulp.task("generate-icon-types", generateIconTypes);
gulp.task("icons", gulp.series("extract-svg-paths", "generate-icon-types"));
