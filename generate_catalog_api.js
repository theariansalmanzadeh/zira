const fs = require('fs');
const endpoints = JSON.parse(fs.readFileSync('catalog_endpoints.json', 'utf8'));

function cleanTypeName(name) {
    if (!name) return 'void';
    return name.replace('#/components/schemas/', '').replace(/[^a-zA-Z0-9_]/g, '');
}

function getFunctionName(ep) {
    const op = ep.operationId;
    return op.replace('domains_catalog_api_admin_', '').replace('_endpoint', '')
        .split('_').map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

// Build imports and function signatures
let out = `import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
`;

// Gather all types needed
const typeImports = new Set();
const paramTypeImports = [
    'ListCategoriesParams',
    'ListBrandsParams',
    'ListModelLinesParams',
    'ListAttributesParams',
    'ListSizesParams',
    'ListColorsParams',
    'ListMaterialsParams',
    'ListSeasonsParams',
    'ListLabelsParams',
    'ListSizeSetsParams',
    'ListColorSetsParams',
    'ListProductsParams',
    'ExportProductsParams',
    'ListProductDraftsParams',
    'ListItemsParams',
    'ExportItemsParams',
    'LookupItemParams',
    'ListBundlesParams',
    'SetItemImagesPayload',
];

paramTypeImports.forEach(t => typeImports.add(t));

endpoints.forEach(ep => {
    if (ep.requestBody?.$ref) {
        typeImports.add(cleanTypeName(ep.requestBody.$ref));
    } else if (ep.requestBody?.items?.$ref) {
        typeImports.add(cleanTypeName(ep.requestBody.items.$ref));
    }
    if (ep.response200?.$ref) {
        typeImports.add(cleanTypeName(ep.response200.$ref));
    } else if (ep.response200?.items?.$ref) {
        typeImports.add(cleanTypeName(ep.response200.items.$ref));
    }
    if (ep.response201?.$ref) {
        typeImports.add(cleanTypeName(ep.response201.$ref));
    } else if (ep.response201?.items?.$ref) {
        typeImports.add(cleanTypeName(ep.response201.items.$ref));
    }
});

Array.from(typeImports).sort().forEach(t => {
    out += `    ${t},\n`;
});

out += `} from '../types/admin/catalog'\n\n`;

out += `const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

const multipartConfig = (
    config?: AxiosRequestConfig
): AxiosRequestConfig => ({
    ...config,
    headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
    },
})
\n`;

// Generate functions
endpoints.forEach(ep => {
    const fnName = getFunctionName(ep);
    const method = ep.method;
    const path = ep.path.replace('/api/v1/admin', ''); // base url is admin api
    const pathParams = ep.parameters.filter(p => p.in === 'path');
    const queryParams = ep.parameters.filter(p => p.in === 'query');

    // Build params signature
    const sigParams = [];
    pathParams.forEach(p => {
        sigParams.push(`${p.name}: string`);
    });

    let bodyParamType = null;
    if (ep.requestBody) {
        if (fnName === 'setItemImages') {
            bodyParamType = 'SetItemImagesPayload';
            sigParams.push(`body: ${bodyParamType}`);
        } else if (ep.requestBody.$ref) {
            bodyParamType = cleanTypeName(ep.requestBody.$ref);
            sigParams.push(`body: ${bodyParamType}`);
        } else if (ep.requestBody.items?.$ref) {
            bodyParamType = `Array<${cleanTypeName(ep.requestBody.items.$ref)}>`;
            sigParams.push(`body: ${bodyParamType}`);
        } else {
            bodyParamType = 'unknown';
            sigParams.push(`body: ${bodyParamType}`);
        }
    }

    let queryParamType = null;
    if (queryParams.length > 0) {
        // match query type
        if (fnName === 'listCategories') queryParamType = 'ListCategoriesParams';
        else if (fnName === 'listBrands') queryParamType = 'ListBrandsParams';
        else if (fnName === 'listModelLines') queryParamType = 'ListModelLinesParams';
        else if (fnName === 'listAttributes') queryParamType = 'ListAttributesParams';
        else if (fnName === 'listSizes') queryParamType = 'ListSizesParams';
        else if (fnName === 'listColors') queryParamType = 'ListColorsParams';
        else if (fnName === 'listMaterials') queryParamType = 'ListMaterialsParams';
        else if (fnName === 'listSeasons') queryParamType = 'ListSeasonsParams';
        else if (fnName === 'listLabels') queryParamType = 'ListLabelsParams';
        else if (fnName === 'listSizeSets') queryParamType = 'ListSizeSetsParams';
        else if (fnName === 'listColorSets') queryParamType = 'ListColorSetsParams';
        else if (fnName === 'listProducts') queryParamType = 'ListProductsParams';
        else if (fnName === 'exportProducts') queryParamType = 'ExportProductsParams';
        else if (fnName === 'listDrafts') queryParamType = 'ListProductDraftsParams';
        else if (fnName === 'listItems') queryParamType = 'ListItemsParams';
        else if (fnName === 'exportItems') queryParamType = 'ExportItemsParams';
        else if (fnName === 'lookupItemByBarcode') queryParamType = 'LookupItemParams';
        else if (fnName === 'listBundles') queryParamType = 'ListBundlesParams';
        else queryParamType = 'Record<string, unknown>';

        sigParams.push(`params?: ${queryParamType}`);
    }

    sigParams.push(`config?: AxiosRequestConfig`);

    // Response type
    let resType = 'void';
    if (fnName === 'listCategories') {
        resType = 'Array<CategoryNodeOut>';
    } else if (fnName === 'exportProducts' || fnName === 'exportItems') {
        resType = 'Blob';
    } else if (ep.response200?.$ref) {
        resType = cleanTypeName(ep.response200.$ref);
    } else if (ep.response201?.$ref) {
        resType = cleanTypeName(ep.response201.$ref);
    }

    // URL interpolation
    let urlStr = '`' + path.replace(/\{(\w+)\}/g, '${$1}') + '`';

    out += `/**\n * ${ep.summary || fnName}\n */\n`;
    out += `export const ${fnName} = (\n    ${sigParams.join(',\n    ')}\n) =>\n`;

    if (method === 'GET') {
        if (resType === 'Blob') {
            out += `    staffAuthGetBlob(${urlStr}, {\n        ...config,\n        params: toParams(params),\n    })\n\n`;
        } else if (queryParamType) {
            out += `    staffAuthGet<${resType}>(${urlStr}, {\n        ...config,\n        params: toParams(params),\n    })\n\n`;
        } else {
            out += `    staffAuthGet<${resType}>(${urlStr}, config)\n\n`;
        }
    } else if (method === 'POST') {
        if (fnName === 'discardDraft') {
            out += `    staffAuthPost<${resType}>(${urlStr}, undefined, config)\n\n`;
        } else {
            out += `    staffAuthPost<${resType}, ${bodyParamType}>(${urlStr}, body, config)\n\n`;
        }
    } else if (method === 'PATCH') {
        if (bodyParamType) {
            out += `    staffAuthPatch<${resType}, ${bodyParamType}>(${urlStr}, body, config)\n\n`;
        } else {
            out += `    staffAuthPatch<${resType}>(${urlStr}, undefined, config)\n\n`;
        }
    } else if (method === 'PUT') {
        if (fnName === 'setItemImages') {
            out += `    {\n        const formData = new FormData()\n        formData.append('rows', body.rows)\n        if (body.files && body.files.length > 0) {\n            body.files.forEach((file) => formData.append('files', file))\n        }\n        return staffAuthPut<${resType}, FormData>(\n            ${urlStr},\n            formData,\n            multipartConfig(config)\n        )\n    }\n\n`;
        } else if (bodyParamType) {
            out += `    staffAuthPut<${resType}, ${bodyParamType}>(${urlStr}, body, config)\n\n`;
        } else {
            out += `    staffAuthPut<${resType}>(${urlStr}, undefined, config)\n\n`;
        }
    } else if (method === 'DELETE') {
        out += `    staffAuthDelete<${resType}>(${urlStr}, undefined, config)\n\n`;
    }
});

fs.writeFileSync('src/api/admin/catalog.ts', out);
console.log('Generated src/api/admin/catalog.ts!');
