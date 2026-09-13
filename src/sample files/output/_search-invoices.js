const fs = require('fs');
const raw = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Order Management.html', 'utf8');

// File may be JSON-wrapped HTML string
let html = raw;
if (raw.startsWith('"')) {
  try {
    html = JSON.parse(raw);
  } catch {
    // unescape manually
    html = raw.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"');
  }
}

const markers = ['invFilters', '_invoices', 'is_invoices', 'فاکتورها', 'INV-'];
for (const m of markers) {
  const idx = html.indexOf(m);
  console.log(m, idx >= 0 ? idx : 'NOT FOUND');
  if (idx >= 0) {
    console.log('--- snippet ---');
    console.log(html.slice(Math.max(0, idx - 100), idx + 800));
    console.log('');
  }
}
