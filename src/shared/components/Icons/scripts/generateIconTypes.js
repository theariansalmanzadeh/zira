/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const through = require("through2");
const {
    SVGS_DIR,
    ICON_TYPES_FILE,
    fileNameToIconLabel,
    formatIconTypesFile,
    parseExistingIconLabels,
} = require("./utils");

function generateIconTypes() {
    const svgLabels = [];

    return gulp
        .src(path.join(SVGS_DIR, "*.svg"))
        .pipe(
            through.obj(function (file, enc, cb) {
                svgLabels.push(fileNameToIconLabel(file.basename));
                cb();
            }),
        )
        .on("end", () => {
            let existingLabels = [];

            if (fs.existsSync(ICON_TYPES_FILE)) {
                const currentContent = fs.readFileSync(ICON_TYPES_FILE, "utf8");
                existingLabels = parseExistingIconLabels(currentContent);
            }

            const allLabels = [...new Set([...existingLabels, ...svgLabels])];
            const output = formatIconTypesFile(allLabels);

            fs.writeFileSync(ICON_TYPES_FILE, output, "utf8");

            const added = svgLabels.filter((label) => !existingLabels.includes(label));
            console.log(`Updated ${ICON_TYPES_FILE} with ${allLabels.length} icon labels`);
            if (added.length > 0) {
                console.log(`Added: ${added.join(", ")}`);
            }
        });
}

exports.default = generateIconTypes;
