const fs = require('fs');
const raw = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Order Management.html', 'utf8');
let html = raw;
if (raw.startsWith('"')) {
  try { html = JSON.parse(raw); } catch { html = raw.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"'); }
}
const i = html.indexOf("'invoices'");
console.log(html.slice(i - 300, i + 300));
