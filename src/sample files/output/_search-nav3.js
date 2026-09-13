const fs = require('fs');
const raw = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Order Management.html', 'utf8');
let html = raw;
if (raw.startsWith('"')) {
  try { html = JSON.parse(raw); } catch { html = raw.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"'); }
}
const markers = ['navItems', 'sidebar', 'go_invoices', 'فاکتورها', 'لیست سفارش'];
for (const m of markers) {
  let pos = 0;
  let count = 0;
  while (count < 3) {
    const idx = html.indexOf(m, pos);
    if (idx < 0) break;
    console.log(`\n=== ${m} @ ${idx} ===`);
    console.log(html.slice(idx, idx + 250));
    pos = idx + 1;
    count++;
  }
}
