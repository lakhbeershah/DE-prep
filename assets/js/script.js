// ===== INTERVIEW PREP PORTAL - INTERACTIVE ENGINE =====

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initCountdown();
  initProgress();
  initQA();
  initRevealButtons();
  initFlashcards();
  initCodeCopy();
  initScrollAnimations();
  initSmoothScroll();
});

// ===== THEME TOGGLE =====
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const toggle = document.getElementById('themeToggle');
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });

  // Active link on page load
  const pathname = window.location.pathname;
  navLinks.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (pathname.endsWith(href) || (pathname.endsWith('/') && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  // Set interview date to next Wednesday
  const now = new Date();
  let interviewDate = new Date(now);
  const dayOfWeek = now.getDay(); // 0=Sun, 3=Wed
  let daysUntilWed = (3 - dayOfWeek + 7) % 7;
  if (daysUntilWed === 0 && now.getHours() >= 10) daysUntilWed = 7;
  if (daysUntilWed === 0) daysUntilWed = 0; // Today is Wed, show 0
  interviewDate.setDate(now.getDate() + daysUntilWed);
  interviewDate.setHours(10, 0, 0, 0); // Assume 10 AM

  function update() {
    const cdDays = document.getElementById('cd-days');
    if (!cdDays) return; // Fail gracefully if not on dashboard page
    
    const diff = interviewDate - new Date();
    if (diff <= 0) {
      cdDays.textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-mins').textContent = '0';
      document.getElementById('cd-secs').textContent = '0';
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    cdDays.textContent = d;
    document.getElementById('cd-hours').textContent = h;
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ===== PROGRESS TRACKING =====
function initProgress() {
  const checkboxes = document.querySelectorAll('.progress-check input[type="checkbox"]');
  const saved = JSON.parse(localStorage.getItem('prepProgress') || '{}');

  checkboxes.forEach(cb => {
    if (saved[cb.id]) cb.checked = true;
    cb.addEventListener('change', () => {
      saved[cb.id] = cb.checked;
      localStorage.setItem('prepProgress', JSON.stringify(saved));
      updateProgressBadge();
    });
  });

  updateProgressBadge();
}

function updateProgressBadge() {
  const saved = JSON.parse(localStorage.getItem('prepProgress') || '{}');
  const TOTAL_CHECKBOXES = 19; // 6 AWS + 5 Domain + 3 SQL + 2 Airflow + 3 Tableau
  const checkedCount = Object.values(saved).filter(Boolean).length;
  const pct = Math.round((checkedCount / TOTAL_CHECKBOXES) * 100);

  const badge = document.getElementById('progressText');
  if (badge) badge.textContent = `${pct}% Mastered`;

  // Update SVG ring
  const ring = document.getElementById('progressRing');
  if (ring) {
    const circumference = 2 * Math.PI * 8;
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference - (Math.min(pct, 100) / 100) * circumference}`;
  }
}

// ===== Q&A ACCORDION =====
function initQA() {
  document.querySelectorAll('.qa-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.qa-item');
      const answer = item.querySelector('.qa-answer');
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        answer.style.maxHeight = '0';
        item.classList.remove('open');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('open');
      }
    });
  });
}

// ===== SQL REVEAL BUTTONS =====
function initRevealButtons() {
  document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const solution = btn.nextElementSibling;
      if (!solution) return;
      const isRevealed = btn.classList.contains('revealed');

      if (isRevealed) {
        solution.style.maxHeight = '0';
        btn.classList.remove('revealed');
        btn.innerHTML = '👁️ Reveal Solution';
      } else {
        solution.style.maxHeight = solution.scrollHeight + 'px';
        btn.classList.add('revealed');
        btn.innerHTML = '✅ Solution Revealed';
      }
    });
  });
}

// ===== FLASHCARDS =====
function initFlashcards() {
  document.querySelectorAll('.flashcard-front').forEach(front => {
    front.addEventListener('click', () => {
      const card = front.closest('.flashcard');
      const back = card.querySelector('.flashcard-back');
      const isOpen = card.classList.contains('open');

      if (isOpen) {
        back.style.maxHeight = '0';
        card.classList.remove('open');
        front.querySelector('.flashcard-toggle').textContent = 'Tap to reveal →';
      } else {
        back.style.maxHeight = back.scrollHeight + 'px';
        card.classList.add('open');
        front.querySelector('.flashcard-toggle').textContent = 'Tap to hide ←';
      }
    });
  });
}

// ===== CODE COPY =====
function initCodeCopy() {
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
