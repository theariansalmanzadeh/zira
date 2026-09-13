const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, '../raw/Order Management.html');
const outPath = path.join(__dirname, '_factor-section.txt');
const raw = fs.readFileSync(rawPath, 'utf8');

function extractTemplate() {
  const marker = '<script type="__bundler/template">';
  const start = raw.indexOf(marker);
  if (start < 0) return raw;
  const openEnd = raw.indexOf('>', start);
  const close = raw.indexOf('</script>', openEnd);
  return JSON.parse(raw.slice(openEnd + 1, close));
}

const template = extractTemplate();
const markers = ['فاکتور', 'is_invoice', 'is_factor', 'invoice', 'factor'];

for (const m of markers) {
  let idx = 0;
  let count = 0;
  while ((idx = template.indexOf(m, idx)) !== -1 && count < 5) {
    console.log(`--- ${m} at ${idx} ---`);
    console.log(template.slice(Math.max(0, idx - 200), idx + 800));
    idx += m.length;
    count++;
  }
}

// find screen sections
const screens = [...template.matchAll(/data-screen-label=\"([^\"]+)\"/g)].map((m) => m[1]);
console.log('screens:', screens);

// save factor-related chunk
const factorIdx = template.indexOf('فاکتور');
if (factorIdx >= 0) {
  const chunkStart = template.lastIndexOf('<!--', factorIdx);
  const chunkEnd = template.indexOf('<!--', factorIdx + 100);
  fs.writeFileSync(outPath, template.slice(chunkStart, chunkEnd > chunkStart ? chunkEnd : factorIdx + 15000));
  console.log('wrote', outPath);
}
