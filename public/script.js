// ============================================================
//  FPU TECHHUB — COMPLETE JAVASCRIPT
// ============================================================

// ============ ICONS ============
const iconMap = {
  'Chatbot': '🤖', 'Analytics': '📊',
  'Computer Vision': '👁️', 'Optimization': '⚙️',
  'IDS': '🛡️', 'AppSec': '🔍',
  'Anomaly Detection': '⚠️', 'IAM': '🔐'
};

// Inline SVG placeholder
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#004d40"/>
          <stop offset="1" stop-color="#0a1412"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#g)"/>
      <text x="50%" y="48%" text-anchor="middle" fill="#d4af37"
            font-family="system-ui" font-size="18" font-weight="700">FPU TechHub</text>
      <text x="50%" y="60%" text-anchor="middle" fill="#9ba8a5"
            font-family="system-ui" font-size="12">Image coming soon</text>
    </svg>
  `);

// ============================================================
//  SYSTEMS — listing cards
// ============================================================
function createCard(s) {
  const icon = iconMap[s.category] || '💠';
  const isBeta = s.status === 'Beta';
  const img = s.image || PLACEHOLDER;

  return `
    <a href="/system/${s.id}" class="card card-link" aria-label="View ${s.name}">
      <div class="card-image">
        <img src="${img}" alt="${s.name} — ${s.category}" loading="lazy"
             onerror="this.onerror=null;this.src='${PLACEHOLDER}'"/>
        <span class="card-image-badge">${icon} ${s.category}</span>
      </div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <p>${s.shortDesc || s.desc || ''}</p>
        <div class="card-status">
          <span class="status-dot ${isBeta ? 'beta' : ''}"></span>
          ${s.status || 'Operational'}
        </div>
      </div>
      <span class="card-arrow">→</span>
    </a>
  `;
}

async function loadSystems() {
  const domain = window.PAGE_DOMAIN;
  const grid = document.getElementById('systems-grid');
  if (!domain || !grid) return;

  try {
    const res = await fetch(`/api/systems/${domain}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const list = await res.json();
    grid.innerHTML = list.map(createCard).join('');
    attachTilt();
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p class="loading">Unable to load systems. Please try again later.</p>';
  }
}

// ============================================================
//  SYSTEM DETAIL PAGE
// ============================================================
function getSystemIdFromUrl() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[0] === 'system' && parts[1] ? parts[1] : null;
}

async function renderSystemDetail() {
  const wrap = document.getElementById('system-detail');
  if (!wrap) return;

  const id = getSystemIdFromUrl();
  if (!id) {
    wrap.innerHTML = `<div class="container"><p class="loading">System not found.</p></div>`;
    return;
  }

  try {
    const res = await fetch(`/api/system/${id}`);
    if (!res.ok) throw new Error('System not found');
    const s = await res.json();

    const isAI = s.domain === 'ai';
    const themeClass = isAI ? 'ai-theme' : 'cyber-theme';
    const domainLabel = isAI ? 'Artificial Intelligence' : 'Cybersecurity';
    const domainHref = isAI ? '/ai' : '/cyber';
    const icon = iconMap[s.category] || '💠';
    const img = s.image || PLACEHOLDER;
    const isBeta = s.status === 'Beta';

    document.title = `${s.name} — FPU TechHub`;

    wrap.innerHTML = `
      <header class="detail-hero ${themeClass}">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="${domainHref}">${domainLabel}</a>
            <span>/</span>
            <span class="current">${s.name}</span>
          </nav>

          <div class="detail-hero-grid">
            <div class="detail-hero-text">
              <span class="badge">${icon} ${s.category}</span>
              <h1>${s.name}</h1>
              <p>${s.shortDesc || ''}</p>

              <div class="detail-actions">
                <a href="${s.externalLink}" target="_blank" rel="noopener noreferrer"
                   class="btn ${isAI ? 'btn-ai' : 'btn-cyber'}">
                  🚀 Launch System
                </a>
                <a href="${domainHref}" class="btn btn-ghost">
                  ← Back to ${domainLabel}
                </a>
              </div>

              <div class="detail-status">
                <span class="status-dot ${isBeta ? 'beta' : ''}"></span>
                <span>Status: <strong>${s.status || 'Operational'}</strong></span>
              </div>
            </div>

            <div class="detail-hero-image">
              <img src="${img}" alt="${s.name}"
                   onerror="this.onerror=null;this.src='${PLACEHOLDER}'"/>
            </div>
          </div>
        </div>
      </header>

      <section class="detail-body ${themeClass}">
        <div class="container detail-grid">
          <div class="detail-main">
            <h2>Overview</h2>
            <p>${s.longDescription || s.shortDesc || ''}</p>

            <h2>Key Features</h2>
            <ul class="feature-list">
              ${(s.features || []).map(f => `<li>${f}</li>`).join('')}
            </ul>

            <h2>Direct Link</h2>
            <div class="link-box">
              <code>${s.externalLink}</code>
              <a href="${s.externalLink}" target="_blank" rel="noopener noreferrer"
                 class="btn ${isAI ? 'btn-ai' : 'btn-cyber'}">Open ↗</a>
            </div>
          </div>

          <aside class="detail-side">
            <div class="side-card">
              <h3>Technology Stack</h3>
              <div class="card-tags">
                ${(s.stack || []).map(t => `<span>${t}</span>`).join('')}
              </div>
            </div>

            <div class="side-card">
              <h3>Domain</h3>
              <p><a href="${domainHref}" class="side-link">${domainLabel} →</a></p>
            </div>

            <div class="side-card">
              <h3>Quick Launch</h3>
              <p>Access this system directly on its production server.</p>
              <a href="${s.externalLink}" target="_blank" rel="noopener noreferrer"
                 class="btn ${isAI ? 'btn-ai' : 'btn-cyber'} full-width">
                Go to System ↗
              </a>
            </div>
          </aside>
        </div>
      </section>
    `;
  } catch (err) {
    console.error(err);
    wrap.innerHTML = `
      <div class="container">
        <p class="loading">System not found. <a href="/" style="color:#d4af37;">Return home</a></p>
      </div>`;
  }
}

// ============================================================
//  TILT EFFECT
// ============================================================
function attachTilt() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / (r.height / 2)) * -4;
      const ry = ((x - r.width  / 2) / (r.width  / 2)) *  4;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ============================================================
//  COUNTERS
// ============================================================
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

// ============================================================
//  E-BOOK LIBRARY LOGIC
// ============================================================
const BOOKS_PER_PAGE = 20;
let allBooks = [];
let currentPage = 1;
let filteredBooks = [];

function formatBook(book) {
  return `
    <a href="/book/${book.id}" class="book-card">
      <div class="book-cover">
        <img src="${book.cover}" alt="${book.title}" loading="lazy"
             onerror="this.onerror=null;this.src='${PLACEHOLDER}'"/>
        <span class="book-level">${book.level}</span>
      </div>
      <div class="book-info">
        <h3>${book.title}</h3>
        <p class="book-author">${book.author} · ${book.year}</p>
        <span class="book-category">${book.category}</span>
      </div>
    </a>
  `;
}

async function loadLibrary() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  const domain = window.BOOKS_DOMAIN;
  const isAI = domain === 'ai';

  const titleEl = document.getElementById('library-title');
  const subtitleEl = document.getElementById('library-subtitle');
  const badgeEl = document.getElementById('library-badge');
  const hero = document.getElementById('library-hero');

  if (titleEl) titleEl.textContent = isAI ? 'AI E-Book Library' : 'Cybersecurity E-Book Library';
  if (subtitleEl) subtitleEl.textContent = isAI
    ? '100 free AI & Machine Learning books — read online or download as PDF.'
    : '100 free Cybersecurity books — read online or download as PDF.';
  if (badgeEl) badgeEl.innerHTML = isAI ? '📚 AI E-Book Library' : '🔒 Cybersecurity E-Book Library';
  if (hero) hero.classList.add(isAI ? 'ai-theme' : 'cyber-theme');

  try {
    const res = await fetch(`/api/books/${domain}`);
    if (!res.ok) throw new Error('Failed');
    allBooks = await res.json();
    filteredBooks = [...allBooks];
    renderBooks();
    attachBookToolbarListeners();
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p class="loading">Unable to load library. Please try again.</p>';
  }
}

function renderBooks() {
  const grid = document.getElementById('books-grid');
  const countEl = document.getElementById('results-count');

  const start = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = filteredBooks.slice(start, start + BOOKS_PER_PAGE);

  if (countEl) {
    countEl.textContent = `Showing ${start + 1}–${Math.min(start + BOOKS_PER_PAGE, filteredBooks.length)} of ${filteredBooks.length} books`;
  }

  if (pageBooks.length === 0) {
    grid.innerHTML = '<p class="loading">No books match your search.</p>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  grid.innerHTML = pageBooks.map(formatBook).join('');
  renderPagination();
}

function renderPagination() {
  const el = document.getElementById('pagination');
  if (!el) return;
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  let html = `<button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 3) {
      html += '<span class="page-dots">…</span>';
    }
  }

  html += `<button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>`;
  el.innerHTML = html;

  el.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.page;
      if (p === 'prev') currentPage = Math.max(1, currentPage - 1);
      else if (p === 'next') currentPage = Math.min(totalPages, currentPage + 1);
      else currentPage = parseInt(p, 10);
      renderBooks();
      window.scrollTo({ top: 400, behavior: 'smooth' });
    });
  });
}

function applyBookFilters() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  const level = document.getElementById('filter-level')?.value || '';
  const sort = document.getElementById('filter-sort')?.value || 'default';

  filteredBooks = allBooks.filter(b => {
    const matchesSearch = !search ||
      b.title.toLowerCase().includes(search) ||
      b.author.toLowerCase().includes(search) ||
      b.category.toLowerCase().includes(search);
    const matchesLevel = !level || b.level === level;
    return matchesSearch && matchesLevel;
  });

  if (sort === 'title') filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'year-desc') filteredBooks.sort((a, b) => b.year - a.year);
  else if (sort === 'year-asc') filteredBooks.sort((a, b) => a.year - b.year);

  currentPage = 1;
  renderBooks();
}

function attachBookToolbarListeners() {
  document.getElementById('search-input')?.addEventListener('input', applyBookFilters);
  document.getElementById('filter-level')?.addEventListener('change', applyBookFilters);
  document.getElementById('filter-sort')?.addEventListener('change', applyBookFilters);
}

// ============================================================
//  BOOK DETAIL PAGE
// ============================================================
async function renderBookDetail() {
  const wrap = document.getElementById('book-detail');
  if (!wrap) return;

  const parts = window.location.pathname.split('/').filter(Boolean);
  const id = parts[0] === 'book' && parts[1] ? parts[1] : null;

  if (!id) {
    wrap.innerHTML = '<div class="container" style="padding:10rem 1.5rem;"><p class="loading">Book not found.</p></div>';
    return;
  }

  try {
    const res = await fetch(`/api/book/${id}`);
    if (!res.ok) throw new Error('Book not found');
    const b = await res.json();

    const isAI = b.domain === 'ai';
    const themeClass = isAI ? 'ai-theme' : 'cyber-theme';
    const domainLabel = isAI ? 'AI Library' : 'Cybersecurity Library';
    const domainHref = isAI ? '/books/ai' : '/books/cyber';

    document.title = `${b.title} — FPU TechHub`;

    wrap.innerHTML = `
      <header class="detail-hero ${themeClass}">
        <div class="container">
          <nav class="breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="${domainHref}">${domainLabel}</a>
            <span>/</span>
            <span class="current">${b.title}</span>
          </nav>

          <div class="detail-hero-grid">
            <div class="detail-hero-text">
              <span class="badge">${b.level} · ${b.category}</span>
              <h1>${b.title}</h1>
              <p>${b.author} · ${b.year} · ${b.pages} pages · ${b.language}</p>

              <div class="detail-actions">
                <a href="${b.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn ${isAI ? 'btn-ai' : 'btn-cyber'}">
                  📖 Read Online
                </a>
                <a href="${b.pdfUrl}" download class="btn btn-ghost">
                  ⬇ Download PDF
                </a>
                <a href="${domainHref}" class="btn btn-ghost">
                  ← Back to ${domainLabel}
                </a>
              </div>
            </div>

            <div class="detail-hero-image">
              <img src="${b.cover}" alt="${b.title}"
                   onerror="this.onerror=null;this.src='${PLACEHOLDER}'"/>
            </div>
          </div>
        </div>
      </header>

      <section class="detail-body ${themeClass}">
        <div class="container detail-grid">
          <div class="detail-main">
            <h2>About This Book</h2>
            <p>${b.description}</p>

            <h2>Table of Contents</h2>
            <ul class="feature-list">
              ${(b.chapters || []).map(c => `<li>${c}</li>`).join('')}
            </ul>

            <h2>Direct PDF Link</h2>
            <div class="link-box">
              <code>${b.pdfUrl}</code>
              <a href="${b.pdfUrl}" target="_blank" rel="noopener noreferrer"
                 class="btn ${isAI ? 'btn-ai' : 'btn-cyber'}">Open ↗</a>
            </div>

            <h2>Preview</h2>
            <div class="pdf-embed">
              <iframe src="${b.pdfUrl}" title="${b.title}" loading="lazy"></iframe>
            </div>
          </div>

          <aside class="detail-side">
            <div class="side-card">
              <h3>Book Details</h3>
              <div class="book-meta">
                <div><span>Author:</span> ${b.author}</div>
                <div><span>Year:</span> ${b.year}</div>
                <div><span>Pages:</span> ${b.pages}</div>
                <div><span>Level:</span> ${b.level}</div>
                <div><span>Category:</span> ${b.category}</div>
                <div><span>Language:</span> ${b.language}</div>
              </div>
            </div>

            <div class="side-card">
              <h3>Quick Download</h3>
              <p>Save the full book to your device.</p>
              <a href="${b.pdfUrl}" download class="btn ${isAI ? 'btn-ai' : 'btn-cyber'} full-width">
                ⬇ Download PDF
              </a>
            </div>
          </aside>
        </div>
      </section>
    `;
  } catch (err) {
    console.error(err);
    wrap.innerHTML = '<div class="container" style="padding:10rem 1.5rem;"><p class="loading">Book not found. <a href="/" style="color:#d4af37;">Return home</a></p></div>';
  }
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  loadSystems();
  renderSystemDetail();
  loadLibrary();
  renderBookDetail();
  initCounterObserver();
});