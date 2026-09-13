/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const through = require("through2");
const {
    SVGS_DIR,
    ICON_PATHS_FILE,
    fileNameToIconLabel,
    extractSvgPathData,
    formatIconPathsFile,
} = require("./utils");

function extractSvgPaths() {
    const iconEntries = [];

    return gulp
        .src(path.join(SVGS_DIR, "*.svg"))
        .pipe(
            through.obj(function (file, enc, cb) {
                const label = fileNameToIconLabel(file.basename);
                const svgContent = file.contents.toString();
                const { viewBox, paths } = extractSvgPathData(svgContent);

                if (paths.length === 0) {
                    console.warn(`No paths found in ${file.basename}`);
                }

                iconEntries.push({ label, viewBox, paths });
                cb();
            }),
        )
        .on("end", () => {
            iconEntries.sort((a, b) => a.label.localeCompare(b.label));

            const output = formatIconPathsFile(iconEntries);
            fs.mkdirSync(path.dirname(ICON_PATHS_FILE), { recursive: true });
            fs.writeFileSync(ICON_PATHS_FILE, output, "utf8");

            console.log(`Generated ${iconEntries.length} icons → ${ICON_PATHS_FILE}`);
        });
}

exports.default = extractSvgPaths;
