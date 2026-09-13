const fs = require('fs');
const html = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Zira Market Content Management Module.dc.html', 'utf8');
const scriptStart = html.indexOf('<script type="text/x-dc"');
const oe = html.indexOf('>', scriptStart);
const ce = html.indexOf('</script>', oe);
const logic = html.slice(oe + 1, ce);
fs.writeFileSync('d:/work/zir-market/public/public/src/sample files/output/_content-mgmt-logic.js', logic);
console.log('Wrote logic', logic.length);

// Extract body template (strip x-dc tags)
const bodyStart = html.indexOf('<x-dc>');
const body = html.slice(bodyStart + 6, scriptStart);
fs.writeFileSync('d:/work/zir-market/public/public/src/sample files/output/_content-mgmt-body.html', body);
console.log('Wrote body', body.length);

// Extract inline styles from helmet
const styleStart = html.indexOf('<helmet>');
const styleEnd = html.indexOf('</helmet>');
const helmet = html.slice(styleStart, styleEnd);
const styleMatch = helmet.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync('d:/work/zir-market/public/public/src/sample files/output/_content-mgmt-styles.css', styleMatch[1]);
  console.log('Wrote styles', styleMatch[1].length);
}
