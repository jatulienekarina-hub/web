// Load content from JSON and populate page
fetch('/content/home.json')
  .then(r => r.json())
  .then(c => {
    const set = (sel, val) => { const el = document.querySelector(sel); if (el && val) el.textContent = val; };

    // Hero
    set('.hero-title', c.hero_title);
    set('[data-hero-text]', c.hero_text);
    set('[data-hero-text2]', c.hero_text2);

    // About
    set('[data-about-title]', c.about_title);
    set('[data-about-p1]', c.about_p1);
    set('[data-about-p2]', c.about_p2);
    set('[data-about-p3]', c.about_p3);

    // Method
    set('.method > .container > h2', c.method_title);
    set('.method-intro', c.method_intro);
    set('[data-method-psyche]', c.method_psyche);
    set('[data-method-body]', c.method_body);
    set('[data-method-mind]', c.method_mind);
    set('[data-method-psy20]', c.method_psy20);

    // Services
    set('[data-s1]', c.s1);
    set('[data-s2]', c.s2);
    set('[data-s3]', c.s3);
    set('[data-s4]', c.s4);
    set('[data-s5]', c.s5);

    // Contact
    set('[data-contact-title]', c.contact_title);
    set('[data-contact-text]', c.contact_text);
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
