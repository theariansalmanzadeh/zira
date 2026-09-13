const fs = require('fs');
const html = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Zira Market Content Management Module.dc.html', 'utf8');

// Find all screen sections
const screens = [...html.matchAll(/data-screen-label="([^"]+)"/g)].map(m => m[1]);
console.log('Screens:', screens);

// Find sc-if route conditions
const routes = [...html.matchAll(/is_(\w+)/g)].map(m => m[1]);
console.log('Route flags:', [...new Set(routes)]);

// Extract script logic start
const scriptStart = html.indexOf('<script type="text/x-dc"');
console.log('Script at:', scriptStart);
if (scriptStart >= 0) {
  const oe = html.indexOf('>', scriptStart);
  const ce = html.indexOf('</script>', oe);
  const logic = html.slice(oe + 1, ce);
  console.log('Logic length:', logic.length);
  console.log('Logic start:', logic.slice(0, 800));
  
  // Find state routes
  const routeMatch = logic.match(/defaultRoute.*?options.*?\[(.*?)\]/s);
  if (routeMatch) console.log('Routes:', routeMatch[1]);
  
  // Find _nav or sidebar
  const navIdx = logic.indexOf('_nav');
  if (navIdx >= 0) console.log('Nav:', logic.slice(navIdx, navIdx + 1500));
}

// Check for broken refs
const issues = [];
if (html.includes('support.js')) issues.push('references external support.js');
if (!html.includes('fonts/')) issues.push('no fonts');
else issues.push('uses fonts/ path');
const fontRefs = [...html.matchAll(/url\(['"]?([^'")\s]+)['"]?\)/g)].map(m => m[1]);
console.log('Font refs sample:', fontRefs.slice(0, 10));
console.log('Issues:', issues);

// Extract main HTML body sections (between x-dc tags, before script)
const bodyStart = html.indexOf('<x-dc>');
const scriptIdx = html.indexOf('<script type="text/x-dc"');
const body = html.slice(bodyStart, scriptIdx);
console.log('Body length:', body.length);

// List section comments
const sections = [...body.matchAll(/<!--\s*=+\s*([^=]+)\s*=+\s*-->/g)].map(m => m[1].trim());
console.log('Sections:', sections);
