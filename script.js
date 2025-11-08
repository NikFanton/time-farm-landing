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

const STORE_URLS = {
  ios: 'https://apps.apple.com/app/id6738962950',
  android: 'https://play.google.com/store/apps/details?id=com.productivelab.timeFarm&hl=en',
};

/**
 * Identify whether the visitor is on iOS, Android, or an unknown platform.
 * @returns {'ios' | 'android' | 'unknown'}
 */
const detectPlatform = () => {
  const nav = window.navigator;
  const lowerUa = (nav.userAgent || nav.vendor || window.opera || '').toLowerCase();

  const uaDataPlatform = nav.userAgentData?.platform?.toLowerCase();
  if (uaDataPlatform) {
    if (uaDataPlatform.includes('android')) return 'android';
    if (uaDataPlatform.includes('ios')) return 'ios';
    if (uaDataPlatform.includes('mac') && 'ontouchend' in window) return 'ios';
  }

  if (lowerUa.includes('android')) return 'android';

  const looksLikeIOS =
    /iphone|ipad|ipod/.test(lowerUa) ||
    (lowerUa.includes('macintosh') && 'ontouchend' in document);
  if (looksLikeIOS) return 'ios';

  return 'unknown';
};

const configureDynamicStoreCtas = () => {
  const platform = detectPlatform();

  const heroGroup = document.querySelector('[data-store-group="hero"]');
  if (heroGroup) {
    heroGroup.querySelectorAll('[data-store]').forEach((btn) => {
      const store = /** @type {'ios' | 'android' | undefined} */ (btn.dataset.store);
      if (!store) return;
      if (platform === 'unknown' || store === platform) {
        btn.classList.remove('is-hidden');
      } else {
        btn.classList.add('is-hidden');
      }
    });
  }

  const headerBtn = document.getElementById('getAppButton');
  if (!headerBtn) return;

  if (platform === 'ios' || platform === 'android') {
    headerBtn.href = STORE_URLS[platform];
    headerBtn.target = '_blank';
    headerBtn.rel = 'noopener';
    headerBtn.dataset.platformTarget = platform;
  } else {
    headerBtn.href = '#download';
    headerBtn.removeAttribute('target');
    headerBtn.removeAttribute('rel');
    delete headerBtn.dataset.platformTarget;
  }
};

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

// Hero video: play iPhone1 then iPhone2 sequentially & configure CTAs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  configureDynamicStoreCtas();

  const heroVideo = /** @type {HTMLVideoElement|null} */ (document.querySelector('.hero-video'));
  if (!heroVideo) return;

  const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  heroVideo.poster = placeholder;

  const playlist = ['assets/video/iPhone1.mov', 'assets/video/iPhone2.mov'];
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
