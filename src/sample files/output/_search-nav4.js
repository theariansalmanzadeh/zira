const fs = require('fs');
const raw = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Order Management.html', 'utf8');
let html = raw;
if (raw.startsWith('"')) {
  try { html = JSON.parse(raw); } catch { html = raw.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"'); }
}
const idx = html.indexOf("label:'فاکتورها'");
console.log(html.slice(idx - 400, idx + 400));
