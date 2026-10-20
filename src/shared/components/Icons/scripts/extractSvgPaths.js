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
    parseExistingIconEntries,
} = require("./utils");

function extractSvgPaths() {
    const existingByLabel = new Map();

    if (fs.existsSync(ICON_PATHS_FILE)) {
        const existingContent = fs.readFileSync(ICON_PATHS_FILE, "utf8");
        for (const entry of parseExistingIconEntries(existingContent)) {
            existingByLabel.set(entry.label, entry);
        }
    }

    const updatedLabels = new Set();

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

                existingByLabel.set(label, { label, viewBox, paths });
                updatedLabels.add(label);
                cb();
            }),
        )
        .on("end", () => {
            const iconEntries = [...existingByLabel.values()].sort((a, b) =>
                a.label.localeCompare(b.label),
            );

            const output = formatIconPathsFile(iconEntries);
            fs.mkdirSync(path.dirname(ICON_PATHS_FILE), { recursive: true });
            fs.writeFileSync(ICON_PATHS_FILE, output, "utf8");

            console.log(
                `Generated ${iconEntries.length} icons (${updatedLabels.size} from SVGs) → ${ICON_PATHS_FILE}`,
            );
        });
}

exports.default = extractSvgPaths;
