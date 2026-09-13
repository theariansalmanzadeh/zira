const fs = require('fs');
const raw = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Order Management.html', 'utf8');
let html = raw;
if (raw.startsWith('"')) {
  try { html = JSON.parse(raw); } catch { html = raw.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"'); }
}
const i = html.indexOf('فاکتور');
while (i >= 0) {
  let idx = html.indexOf('فاکتور', idx === undefined ? 0 : idx + 1);
}
// find nav items
const navIdx = html.indexOf('go_invoices');
console.log(html.slice(navIdx - 2000, navIdx + 500));
