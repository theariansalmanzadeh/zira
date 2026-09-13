#!/usr/bin/env node
/**
 * Regenerates content-management.html from extracted DC parts + order-management design tokens.
 * Usage: node build-content-management.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'content-management.html');
const ORDER_REF = path.join(__dirname, 'order-management.html');

const orderHtml = fs.readFileSync(ORDER_REF, 'utf8');
const styleMatch = orderHtml.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('Could not extract CSS from order-management.html');
let baseCss = styleMatch[1];

const extraCss = `
    textarea { resize: vertical; }
    @keyframes drawerIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pop { from { transform: scale(.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    .sidebar {
      width: 262px; flex: none;
      background: var(--color-surface-container-lowest);
      border-left: 1px solid var(--color-outline-variant);
      position: sticky; top: 0; height: 100vh;
      display: flex; flex-direction: column;
      transition: width .2s ease, opacity .2s ease, transform .24s ease;
    }
    .sidebar.collapsed { width: 0; min-width: 0; border: none; overflow: hidden; opacity: 0; pointer-events: none; }
    .sidebar-nav { flex: 1; overflow-y: auto; padding: 6px 12px 18px; }
    .nav-group-label { font-size: 11px; color: var(--color-muted); font-weight: 700; padding: 14px 8px 6px; }
    .nav-link {
      width: 100%; display: flex; align-items: center; gap: 10px;
      padding: 9px 10px; border-radius: 11px; font-size: 13.5px; font-weight: 600;
      transition: all .14s; text-align: right; color: #5a5a64;
    }
    .nav-link:hover { background: var(--color-surface-container-high); }
    .nav-link.active { background: var(--color-primary-container); color: var(--color-primary); }
    .nav-link .nav-badge { margin-right: auto; font-size: 11px; font-weight: 700; border-radius: 8px; padding: 2px 8px; }

    .rowh:hover { background: #fcf6f6 !important; }
    .blkcard:hover { border-color: color-mix(in srgb, var(--color-primary) 35%, white) !important; box-shadow: 0 6px 18px rgba(215,78,84,.09) !important; }
    .home-grid { display: grid; grid-template-columns: 1fr 290px; gap: 16px; align-items: start; }
    .two-col { display: grid; grid-template-columns: 1.3fr 1fr; gap: 16px; align-items: start; }
    .cert-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .blog-add-grid { display: grid; grid-template-columns: 1fr 320px; gap: 16px; align-items: start; }
    .faq-table-head, .faq-table-row { display: grid; grid-template-columns: 54px 1fr 170px 120px 96px; align-items: center; }
    .blog-table-head, .blog-table-row { display: grid; grid-template-columns: 110px 1.6fr 1fr 140px 100px 96px; align-items: center; }
    .tag { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; border-radius: 7px; padding: 4px 10px; white-space: nowrap; }
    .tag-dot { width: 6px; height: 6px; border-radius: 50%; }
    .overlay { position: fixed; inset: 0; z-index: 70; direction: rtl; }
    .overlay-backdrop { position: absolute; inset: 0; background: rgba(20,20,32,.45); animation: fadeIn .2s ease; }
    .drawer {
      position: absolute; top: 0; left: 0; height: 100%; width: min(480px, 100%);
      background: var(--color-surface-container-lowest); display: flex; flex-direction: column;
      box-shadow: 12px 0 40px rgba(0,0,0,.2); animation: drawerIn .26s ease;
    }
    .modal {
      width: min(540px, 100%); background: var(--color-surface-container-lowest);
      border-radius: 18px; overflow: hidden; box-shadow: 0 24px 70px rgba(0,0,0,.3); animation: pop .2s ease;
    }
    .modal-sm { width: min(400px, 100%); }
    .modal-center {
      position: fixed; inset: 0; z-index: 86; direction: rtl;
      background: rgba(20,20,32,.5); display: flex; align-items: center; justify-content: center; padding: 24px;
      animation: fadeIn .18s ease;
    }
    .field-label { font-size: 12px; color: var(--color-outline); font-weight: 600; display: block; margin-bottom: 7px; }
    .field-input {
      width: 100%; height: 42px; background: var(--color-surface-container-lowest);
      border: 1px solid #e6e6ea; border-radius: 10px; padding: 0 13px; font-size: 13px;
      color: var(--color-on-surface-variant); outline: none;
    }
    .field-input:focus { border-color: var(--color-primary); }
    .field-textarea {
      width: 100%; min-height: 100px; background: var(--color-surface-container-lowest);
      border: 1px solid #e6e6ea; border-radius: 11px; padding: 12px 14px; font-size: 13px;
      line-height: 2; color: var(--color-on-surface-variant); outline: none;
    }
    .field-textarea:focus { border-color: var(--color-primary); }
    .rt-toolbar { display: flex; align-items: center; gap: 2px; background: var(--color-surface-container-high); border-radius: 9px; padding: 4px; margin-bottom: 10px; width: fit-content; flex-wrap: wrap; }
    .rt-btn { width: 30px; height: 28px; border-radius: 6px; color: var(--color-outline); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; }
    .rt-btn:hover { background: var(--color-surface-container-lowest); color: var(--color-on-surface); }
    .filter-pill {
      display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600;
      padding: 8px 14px; border-radius: 10px; border: 1px solid #e6e6ea; white-space: nowrap;
    }
    .hidden { display: none !important; }

    @media (min-width: 1025px) {
      .sidebar.collapsed { width: 0 !important; min-width: 0; border: none; overflow: hidden; opacity: 0; pointer-events: none; }
      .crumb-root { display: inline; }
    }
    @media (max-width: 1024px) {
      .sidebar { position: fixed !important; top: 0 !important; right: 0 !important; z-index: 80; transform: translateX(106%); box-shadow: -12px 0 40px rgba(0,0,0,.18); background: var(--color-surface-container-lowest); }
      .sidebar.open { transform: translateX(0); }
      .sidebar-backdrop.show { display: block; }
      .page { padding: 18px 16px 40px !important; }
      .home-grid, .two-col { grid-template-columns: 1fr !important; }
      .crumb-root { display: none; }
    }
    @media (max-width: 760px) {
      .crumb-group { display: none; }
      .kpi-grid { grid-template-columns: 1fr 1fr !important; }
      .cert-grid { grid-template-columns: 1fr 1fr !important; }
      .blog-add-grid { grid-template-columns: 1fr !important; }
    }
`;

const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>مدیریت محتوا — زیرا مارکت</title>
  <style>${baseCss}${extraCss}
  </style>
</head>
<body>
  <div class="app">
    <div id="backdrop" class="sidebar-backdrop" onclick="closeNav()"></div>

    <main class="main">
      <header class="topbar">
        <div style="display:flex;align-items:center;gap:13px;min-width:0">
          <button class="icon-btn" onclick="toggleNav()" title="نمایش/پنهان‌سازی منو" aria-label="منو">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div class="crumbs">
            <span class="muted crumb-root">زیرا مارکت</span>
            <span class="sep crumb-root">/</span>
            <span class="muted crumb-group" id="crumbGroup">نمای کلی</span>
            <span class="sep crumb-group">/</span>
            <span class="current" id="crumbPage">داشبورد محتوا</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex:none">
          <button class="btn-secondary crumb-group" onclick="openPreview()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            پیش‌نمایش فروشگاه
          </button>
          <div class="notif-wrap">
            <button class="icon-btn" onclick="toggleNotif()" title="اعلان‌ها">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
              <span class="notif-dot">۴</span>
            </button>
          </div>
        </div>
      </header>

      <div id="screenRoot"></div>
    </main>

    <aside id="sidebar" class="sidebar"></aside>
  </div>

  <div id="overlayRoot"></div>

  <script>
${fs.readFileSync(path.join(__dirname, '_content-mgmt-app.js'), 'utf8')}
  </script>
</body>
</html>`;

fs.writeFileSync(OUT, html, 'utf8');
const lines = html.split('\n').length;
console.log('Wrote ' + OUT);
console.log('Line count: ' + lines);
