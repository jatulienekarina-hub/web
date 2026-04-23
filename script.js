// Load content from JSON and populate page
fetch('/_content/home.json')
  .then(r => r.json())
  .then(c => {
    const set = (sel, val) => { const el = document.querySelector(sel); if (el && val) el.textContent = val; };

    // Hero
    set('.hero-title', c.hero?.title);
    set('[data-hero-text]', c.hero?.text);
    set('[data-hero-text2]', c.hero?.text2);

    // About
    set('[data-about-title]', c.about?.title);
    set('[data-about-p1]', c.about?.p1);
    set('[data-about-p2]', c.about?.p2);
    set('[data-about-p3]', c.about?.p3);

    // Method
    set('.method > .container > h2', c.method?.title);
    set('.method-intro', c.method?.intro);
    set('[data-method-psyche]', c.method?.psyche);
    set('[data-method-body]', c.method?.body);
    set('[data-method-mind]', c.method?.mind);
    set('[data-method-psy20]', c.method?.psy20);

    // Services
    set('[data-s1]', c.services?.s1);
    set('[data-s2]', c.services?.s2);
    set('[data-s3]', c.services?.s3);
    set('[data-s4]', c.services?.s4);
    set('[data-s5]', c.services?.s5);

    // Contact
    set('[data-contact-title]', c.contact?.title);
    set('[data-contact-text]', c.contact?.text);
  })
  .catch(() => {}); // lokaliame faile fetch neveikia - tekstas lieka iš HTML

// Mobile menu toggle
const btn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('main-nav');
if (btn && nav) {
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.main-nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// Netlify Identity redirect
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', user => {
    if (!user) {
      window.netlifyIdentity.on('login', () => document.location.href = '/admin/');
    }
  });
}
