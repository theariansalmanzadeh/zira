/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

const SVGS_DIR = path.resolve(__dirname, "../svgs");
const ICON_PATHS_FILE = path.resolve(__dirname, "../generated/iconPaths.ts");
const ICON_TYPES_FILE = path.resolve(__dirname, "../../../types/icon.ts");

/**
 * Capitalizes the first character of a string.
 */
function capitalizeFirst(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * Converts an icon segment to camelCase.
 * e.g. "my_account" → "myAccount", "account" → "account"
 */
function toCamelCaseIconName(name) {
    const parts = name.split(/[-_]/).filter(Boolean);

    if (parts.length <= 1) {
        return name.charAt(0).toLowerCase() + name.slice(1);
    }

    return parts
        .map((part, index) => {
            const lower = part.toLowerCase();
            if (index === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("");
}

/**
 * Parses structured SVG names:
 * - "icon=account, weight=300, style=broken" → "account300Broken"
 * - "icon=my_account_weight=300_style=broken" → "myAccount300Broken"
 */
function parseStructuredSvgName(stem) {
    const commaMatch = stem.match(
        /^icon=(.+?),\s*weight=(.+?),\s*style=(.+)$/i,
    );
    if (commaMatch) {
        const icon = toCamelCaseIconName(commaMatch[1].trim());
        const weight = commaMatch[2].trim();
        const style = capitalizeFirst(commaMatch[3].trim());
        return `${icon}${weight}${style}`;
    }

    const weightMarker = "_weight=";
    const styleMarker = "_style=";
    const weightIdx = stem.toLowerCase().indexOf(weightMarker);
    const styleIdx = stem.toLowerCase().indexOf(styleMarker);

    if (
        stem.toLowerCase().startsWith("icon=") &&
        weightIdx !== -1 &&
        styleIdx !== -1 &&
        weightIdx < styleIdx
    ) {
        const iconPart = stem.slice("icon=".length, weightIdx);
        const weightPart = stem.slice(weightIdx + weightMarker.length, styleIdx);
        const stylePart = stem.slice(styleIdx + styleMarker.length);

        const icon = toCamelCaseIconName(iconPart);
        const weight = weightPart.trim();
        const style = capitalizeFirst(stylePart.trim());
        return `${icon}${weight}${style}`;
    }

    return null;
}

/**
 * Converts an SVG filename to an icon label.
 *
 * Structured names:
 *   icon=account, weight=300, style=broken.svg → account300Broken
 *   icon=my_account_weight=300_style=broken.svg → myAccount300Broken
 *
 * Simple names (fallback):
 *   list-alt-check.svg → listAltCheck
 *   storeFront.svg → storeFront
 */
function fileNameToIconLabel(fileName) {
    const stem = path.basename(fileName, ".svg");
    const structuredLabel = parseStructuredSvgName(stem);

    if (structuredLabel) {
        return structuredLabel;
    }

    const parts = stem.split(/[-_]/).filter(Boolean);

    if (parts.length <= 1) {
        return stem.charAt(0).toLowerCase() + stem.slice(1);
    }

    return parts
        .map((part, index) => {
            const lower = part.toLowerCase();
            if (index === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("");
}

/**
 * Extracts viewBox and path `d` attributes from SVG content.
 */
function circleToPath(cx, cy, r) {
    const cxN = Number(cx);
    const cyN = Number(cy);
    const rN = Number(r);
    return `M ${cxN - rN},${cyN} a ${rN},${rN} 0 1,0 ${rN * 2},0 a ${rN},${rN} 0 1,0 ${-rN * 2},0`;
}

function extractSvgPathData(svgContent) {
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
    const pathMatches = [...svgContent.matchAll(/<path[^>]*\sd=["']([^"']+)["']/gi)];
    const circlePaths = [...svgContent.matchAll(/<circle\b[^>]*>/gi)]
        .map((match) => {
            const tag = match[0];
            const cx = tag.match(/\scx=["']([^"']+)["']/i)?.[1];
            const cy = tag.match(/\scy=["']([^"']+)["']/i)?.[1];
            const r = tag.match(/\sr=["']([^"']+)["']/i)?.[1];
            if (cx == null || cy == null || r == null) return null;
            return circleToPath(cx, cy, r);
        })
        .filter(Boolean);

    return {
        viewBox: viewBoxMatch?.[1] ?? "0 0 24 24",
        paths: [...pathMatches.map((match) => match[1]), ...circlePaths],
    };
}

function formatIconPathsFile(iconEntries) {
    const entries = iconEntries
        .map(({ label, viewBox, paths }) => {
            const pathsLiteral = paths
                .map((p) => `      ${JSON.stringify(p)}`)
                .join(",\n");
            return `  ${label}: {
    viewBox: ${JSON.stringify(viewBox)},
    paths: [
${pathsLiteral}${pathsLiteral ? "," : ""}
    ],
  }`;
        })
        .join(",\n");

    return `// This file is auto-generated. Do not edit manually.
// Run: pnpm icons:paths

export type IconPathData = {
  viewBox: string;
  paths: string[];
};

export const ICON_PATHS = {
${entries},
} as const satisfies Record<string, IconPathData>;

export type IconPathKey = keyof typeof ICON_PATHS;
`;
}

function formatIconTypesFile(labels) {
    const uniqueLabels = [...new Set(labels)].sort();
    const union = uniqueLabels.map((label) => `  | "${label}"`).join("\n");

    return `export type IconLabel =
${union};
`;
}

function parseExistingIconLabels(fileContent) {
    const matches = [...fileContent.matchAll(/"([^"]+)"/g)];
    return matches.map((match) => match[1]);
}

/**
 * Parses existing ICON_PATHS entries so new SVGs can merge without wiping old icons.
 */
function parseExistingIconEntries(fileContent) {
    const entries = [];
    const blockRegex =
        /^\s{2}([A-Za-z0-9_]+):\s*\{\s*\n\s*viewBox:\s*"([^"]*)",\s*\n\s*paths:\s*\[([\s\S]*?)\],?\s*\n\s*\}/gm;

    for (const match of fileContent.matchAll(blockRegex)) {
        const paths = [...match[3].matchAll(/"((?:\\.|[^"\\])*)"/g)].map(
            (pathMatch) => JSON.parse(`"${pathMatch[1]}"`),
        );
        entries.push({
            label: match[1],
            viewBox: match[2],
            paths,
        });
    }

    return entries;
}

module.exports = {
    SVGS_DIR,
    ICON_PATHS_FILE,
    ICON_TYPES_FILE,
    fileNameToIconLabel,
    parseStructuredSvgName,
    toCamelCaseIconName,
    capitalizeFirst,
    extractSvgPathData,
    formatIconPathsFile,
    formatIconTypesFile,
    parseExistingIconLabels,
    parseExistingIconEntries,
};
