// ============ ICONS PER CATEGORY ============
const iconMap = {
  'Chatbot': '🤖',
  'Analytics': '📊',
  'Computer Vision': '👁️',
  'Optimization': '⚙️',
  'IDS': '🛡️',
  'AppSec': '🔍',
  'Anomaly Detection': '⚠️',
  'IAM': '🔐'
};

// ============ RENDER CARD ============
function createCard(system) {
  const icon = iconMap[system.category] || '💠';
  return `
    <div class="card" data-id="${system.id}">
      <div class="card-icon">${icon}</div>
      <span class="category">${system.category}</span>
      <h3>${system.name}</h3>
      <p>${system.desc}</p>
      <div class="card-status">
        <span class="status-dot"></span> Operational
      </div>
    </div>
  `;
}

// ============ LOAD SYSTEMS ============
async function loadSystems() {
  try {
    const res = await fetch('/api/systems');
    if (!res.ok) throw new Error('Failed to fetch systems');
    const data = await res.json();

    const aiGrid = document.getElementById('ai-grid');
    const cyberGrid = document.getElementById('cyber-grid');

    aiGrid.innerHTML = data.ai.map(createCard).join('');
    cyberGrid.innerHTML = data.cyber.map(createCard).join('');

    // Apply tilt effect to freshly-rendered cards
    attachTilt();
  } catch (err) {
    console.error('Error loading systems:', err);
    // Fallback: show a message if API fails
    document.getElementById('ai-grid').innerHTML =
      '<p style="color:#9ca3af;">Unable to load AI systems. Please try again later.</p>';
    document.getElementById('cyber-grid').innerHTML =
      '<p style="color:#9ca3af;">Unable to load Cybersecurity systems. Please try again later.</p>';
  }
}

// ============ 3D TILT EFFECT ============
function attachTilt() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ============ ANIMATED COUNTERS ============
function animateCounters() {
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;

    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when the stats row enters the viewport
function initCounterObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) observer.observe(statsRow);
}

// ============ NAV ACTIVE HIGHLIGHT ============
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 150;
    let current = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= fromTop) current = sec.id;
    });

    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? '#ffffff' : '';
    });
  });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  loadSystems();
  initCounterObserver();
  initScrollSpy();
});