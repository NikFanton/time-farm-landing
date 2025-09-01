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

// Hero video: play iPhone1 then iPhone2 sequentially
  document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = /** @type {HTMLVideoElement|null} */(document.querySelector('.hero-video'));
    if (!heroVideo) return;

    const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    heroVideo.poster = placeholder;

    const playlist = [
      'assets/video/iPhone1.mp4',
      'assets/video/iPhone2.mp4',
    ];
    let current = 0;

    // Ensure desired attributes
    heroVideo.loop = false;
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.autoplay = true;
    heroVideo.preload = 'auto';

    // Preload videos to keep playback seamless when switching
    const cache = playlist.map((src) => {
      const v = document.createElement('video');
      v.src = src;
      v.preload = 'auto';
      v.load();
      return v;
    });

    const playCurrent = () => {
      heroVideo.poster = placeholder;
      heroVideo.src = cache[current].src;
      heroVideo.load();
      // Attempt immediate play; ignore promise rejection (autoplay policies already satisfied due to muted)
      heroVideo.play().catch(() => {});
    };

  heroVideo.addEventListener('ended', () => {
    current = (current + 1) % playlist.length;
    playCurrent();
  });

  // If initial src differs or video fails to auto-start, enforce playback
  if (!heroVideo.src.endsWith(playlist[current])) {
    playCurrent();
  }
});
