const fs = require('fs');
const raw = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Order Management.html', 'utf8');
const s = raw.indexOf('<script type="text/x-dc"');
const oe = raw.indexOf('>', s);
const c = raw.indexOf('</script>', oe);
const logic = raw.slice(oe + 1, c);
const start = logic.indexOf('_invoices()');
console.log(logic.slice(start, start + 3500));
