const fs = require('fs');
const html = fs.readFileSync('d:/work/zir-market/public/public/src/sample files/raw/Zira Market Content Management Module.dc.html', 'utf8');

const issues = [];
if (html.includes('./support.js')) issues.push('Missing external support.js dependency');
if (html.includes("color:#b08;color:#bba")) issues.push('Duplicate/invalid CSS color in blog upload hint');
if (!html.includes('lang=')) issues.push('Missing lang attribute on html');
if (!html.includes('dir=')) issues.push('Missing dir attribute');

// Check openFaqAdd referenced in template but defined in logic?
const logicStart = html.indexOf('class Component');
const logic = html.slice(logicStart);
if (html.includes('openFaqAdd') && !logic.includes('openFaqAdd')) issues.push('openFaqAdd used in template but not in logic');
if (html.includes('openFaqAdd') && logic.includes('openFaqAdd')) issues.push('openFaqAdd OK');

console.log('Issues found:', issues);
