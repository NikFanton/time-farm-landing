// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Simple waitlist form UX (local-only)
const form = document.getElementById('waitlist');
const msg = document.getElementById('formMessage');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email')).value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#cc2e2e';
      return;
    }
    // In production: send to your backend or provider (Formspree, ConvertKit, etc.)
    // For now, mimic success.
    await new Promise((r) => setTimeout(r, 500));
    msg.textContent = 'Thanks! You’re on the list.';
    msg.style.color = '#0b6b42';
    form.reset();
  });
}

// Footer: dynamic copyright year
const y = document.getElementById('copyrightYear');
if (y) y.textContent = String(new Date().getFullYear());
