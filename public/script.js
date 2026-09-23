// ============================================================
//  FPU TECHHUB — JAVASCRIPT
// ============================================================

const iconMap = {
  'Chatbot': '🤖', 'Analytics': '📊',
  'Computer Vision': '👁️', 'Optimization': '⚙️',
  'IDS': '🛡️', 'AppSec': '🔍',
  'Anomaly Detection': '⚠️', 'IAM': '🔐'
};

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">' +
    '<rect width="400" height="240" fill="#0a1412"/>' +
    '<text x="50%" y="50%" text-anchor="middle" fill="#d4af37" font-family="sans-serif" font-size="18" font-weight="700">FPU TechHub</text>' +
    '</svg>'
  );

// ============ SYSTEMS LISTING ============
function createCard(s) {
  const icon = iconMap[s.category] || '💠';
  const isBeta = s.status === 'Beta';
  const img = s.image || PLACEHOLDER;

  return '<a href="/system/' + s.id + '" class="card card-link">' +
    '<div class="card-image">' +
      '<img src="' + img + '" alt="' + s.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"/>' +
      '<span class="card-image-badge">' + icon + ' ' + s.category + '</span>' +
    '</div>' +
    '<div class="card-body">' +
      '<h3>' + s.name + '</h3>' +
      '<p>' + (s.shortDesc || s.desc || '') + '</p>' +
      '<div class="card-status">' +
        '<span class="status-dot ' + (isBeta ? 'beta' : '') + '"></span>' +
        (s.status || 'Operational') +
      '</div>' +
    '</div>' +
    '<span class="card-arrow">→</span>' +
  '</a>';
}

async function loadSystems() {
  const domain = window.PAGE_DOMAIN;
  const grid = document.getElementById('systems-grid');
  if (!domain || !grid) return;

  try {
    const res = await fetch('/api/systems/' + domain);
    if (!res.ok) throw new Error('Failed to fetch');
    const list = await res.json();
    grid.innerHTML = list.map(createCard).join('');
    attachTilt();
  } catch (err) {
    console.error('loadSystems error:', err);
    grid.innerHTML = '<p class="loading">Unable to load models.</p>';
  }
}

// ============ SYSTEM DETAIL ============
function getSystemIdFromUrl() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[0] === 'system' && parts[1] ? parts[1] : null;
}

async function renderSystemDetail() {
  const wrap = document.getElementById('system-detail');
  if (!wrap) return;

  const id = getSystemIdFromUrl();
  if (!id) return;

  try {
    const res = await fetch('/api/system/' + id);
    if (!res.ok) throw new Error('System not found');
    const s = await res.json();

    const isAI = s.domain === 'ai';
    const themeClass = isAI ? 'ai-theme' : 'cyber-theme';
    const domainLabel = isAI ? 'Artificial Intelligence' : 'Cybersecurity';
    const domainHref = isAI ? '/ai' : '/cyber';
    const icon = iconMap[s.category] || '💠';
    const img = s.image || PLACEHOLDER;
    const isBeta = s.status === 'Beta';

    document.title = s.name + ' — FPU TechHub';

    wrap.innerHTML =
      '<header class="detail-hero ' + themeClass + '">' +
        '<div class="container">' +
          '<nav class="breadcrumb">' +
            '<a href="/">Home</a> <span>/</span> ' +
            '<a href="' + domainHref + '">' + domainLabel + '</a> <span>/</span> ' +
            '<span class="current">' + s.name + '</span>' +
          '</nav>' +
          '<div class="detail-hero-grid">' +
            '<div class="detail-hero-text">' +
              '<span class="badge">' + icon + ' ' + s.category + '</span>' +
              '<h1>' + s.name + '</h1>' +
              '<p>' + (s.shortDesc || '') + '</p>' +
              '<div class="detail-actions">' +
                '<a href="' + s.externalLink + '" target="_blank" rel="noopener" class="btn ' + (isAI ? 'btn-ai' : 'btn-cyber') + '">🚀 Launch Model</a>' +
                '<a href="' + domainHref + '" class="btn btn-ghost">← Back</a>' +
              '</div>' +
              '<div class="detail-status">' +
                '<span class="status-dot ' + (isBeta ? 'beta' : '') + '"></span>' +
                'Status: <strong>' + (s.status || 'Operational') + '</strong>' +
              '</div>' +
            '</div>' +
            '<div class="detail-hero-image"><img src="' + img + '" alt="' + s.name + '"/></div>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<section class="detail-body ' + themeClass + '">' +
        '<div class="container detail-grid">' +
          '<div class="detail-main">' +
            '<h2>Overview</h2><p>' + (s.longDescription || s.shortDesc || '') + '</p>' +
            '<h2>Key Features</h2>' +
            '<ul class="feature-list">' + (s.features || []).map(f => '<li>' + f + '</li>').join('') + '</ul>' +
            '<h2>Direct Link</h2>' +
            '<div class="link-box">' +
              '<code>' + s.externalLink + '</code>' +
              '<a href="' + s.externalLink + '" target="_blank" rel="noopener" class="btn ' + (isAI ? 'btn-ai' : 'btn-cyber') + '">Open ↗</a>' +
            '</div>' +
          '</div>' +
          '<aside class="detail-side">' +
            '<div class="side-card"><h3>Technology Stack</h3><div class="card-tags">' +
              (s.stack || []).map(t => '<span>' + t + '</span>').join('') +
            '</div></div>' +
          '</aside>' +
        '</div>' +
      '</section>';
  } catch (err) {
    console.error('renderSystemDetail error:', err);
    wrap.innerHTML = '<div class="container" style="padding:10rem 1.5rem;"><p>Model not found.</p></div>';
  }
}

// ============ TILT ============
function attachTilt() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / (r.height / 2)) * -4;
      const ry = ((x - r.width  / 2) / (r.width  / 2)) *  4;
      card.style.transform = 'translateY(-4px) perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ============ COUNTERS ============
function animateCounters() {
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    const dur = 1500, start = performance.now();
    (function update(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target).toLocaleString();
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    })(start);
  });
}

function initCounterObserver() {
  const row = document.querySelector('.stats-row');
  if (!row) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { animateCounters(); obs.disconnect(); }
    });
  }, { threshold: 0.4 });
  obs.observe(row);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', function () {
  loadSystems();
  renderSystemDetail();
  initCounterObserver();
});