/**
 * Abhinav Bajpai — Professional Portfolio Website
 * Vanilla JavaScript (ES6+) — No dependencies
 * Features: Mobile nav, Dark mode, Scroll progress, Reveal animations,
 *           Back-to-top, Cookie consent, Smooth scroll, Keyboard nav
 */

(function () {
  'use strict';

  /* ============================================================
     CONFIGURATION
     ============================================================ */
  const CONFIG = {
    scrollOffset: 80,
    revealThreshold: 0.12,
    backToTopThreshold: 400,
    cookieKey: 'ab-cookie-consent',
    themeKey: 'ab-theme-preference',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  /* ============================================================
     DOM REFERENCES
     ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const els = {
    progressBar: $('.progress-bar'),
    menuToggle: $('#menu-toggle'),
    mainNav: $('#main-nav'),
    mobileOverlay: $('#mobile-overlay'),
    themeToggle: $('#theme-toggle'),
    backToTop: $('#back-to-top'),
    cookieBanner: $('#cookie-banner'),
    cookieAccept: $('#cookie-accept'),
    cookieDecline: $('#cookie-decline'),
    reveals: $$('.reveal'),
    navLinks: $$('.nav-link'),
    statNumbers: $$('.stat-number[data-count]'),
  };

  /* ============================================================
     UTILITY FUNCTIONS
     ============================================================ */
  const throttle = (fn, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const debounce = (fn, wait) => {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  const updateProgress = () => {
    if (!els.progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    els.progressBar.style.width = progress + '%';
    els.progressBar.setAttribute('aria-valuenow', Math.round(progress));
  };

  /* ============================================================
     MOBILE NAVIGATION
     ============================================================ */
  const openMenu = () => {
    els.menuToggle?.setAttribute('aria-expanded', 'true');
    els.mainNav?.classList.add('is-open');
    els.mobileOverlay?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    // Focus first nav link for accessibility
    const firstLink = els.mainNav?.querySelector('.nav-link');
    firstLink?.focus();
  };

  const closeMenu = () => {
    els.menuToggle?.setAttribute('aria-expanded', 'false');
    els.mainNav?.classList.remove('is-open');
    els.mobileOverlay?.classList.remove('is-active');
    document.body.style.overflow = '';
    els.menuToggle?.focus();
  };

  const toggleMenu = () => {
    const isOpen = els.menuToggle?.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  };

  /* ============================================================
     DARK MODE
     ============================================================ */
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const getSavedTheme = () => {
    try {
      return localStorage.getItem(CONFIG.themeKey);
    } catch {
      return null;
    }
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  const saveTheme = (theme) => {
    try {
      if (theme) {
        localStorage.setItem(CONFIG.themeKey, theme);
      } else {
        localStorage.removeItem(CONFIG.themeKey);
      }
    } catch {
      // Storage not available
    }
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const system = getSystemTheme();
    let next;
    if (current === 'dark') {
      next = 'light';
    } else if (current === 'light') {
      next = system === 'dark' ? null : 'dark';
    } else {
      next = system === 'dark' ? 'light' : 'dark';
    }
    applyTheme(next);
    saveTheme(next);
  };

  const initTheme = () => {
    const saved = getSavedTheme();
    if (saved) {
      applyTheme(saved);
    }
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getSavedTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  const updateBackToTop = () => {
    if (!els.backToTop) return;
    const scrolled = window.scrollY > CONFIG.backToTopThreshold;
    els.backToTop.classList.toggle('is-visible', scrolled);
    els.backToTop.hidden = !scrolled;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: CONFIG.reducedMotion ? 'auto' : 'smooth',
    });
  };

  /* ============================================================
     COOKIE CONSENT
     ============================================================ */
  const getCookieConsent = () => {
    try {
      return localStorage.getItem(CONFIG.cookieKey);
    } catch {
      return null;
    }
  };

  const setCookieConsent = (value) => {
    try {
      localStorage.setItem(CONFIG.cookieKey, value);
    } catch {
      // Storage not available
    }
  };

  const hideCookieBanner = () => {
    els.cookieBanner?.classList.add('is-hidden');
    setTimeout(() => {
      if (els.cookieBanner) els.cookieBanner.hidden = true;
    }, 500);
  };

  const initCookieBanner = () => {
    const consent = getCookieConsent();
    if (consent === null) {
      if (els.cookieBanner) els.cookieBanner.hidden = false;
    } else {
      hideCookieBanner();
    }
  };

  const acceptCookies = () => {
    setCookieConsent('accepted');
    hideCookieBanner();
  };

  const declineCookies = () => {
    setCookieConsent('declined');
    hideCookieBanner();
  };

  /* ============================================================
     REVEAL ON SCROLL (Intersection Observer)
     ============================================================ */
  const initReveal = () => {
    if (CONFIG.reducedMotion) {
      els.reveals.forEach((el) => el.classList.add('show'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: CONFIG.revealThreshold, rootMargin: '0px 0px -40px 0px' }
    );
    els.reveals.forEach((el) => observer.observe(el));
  };

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  const initSmoothScroll = () => {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = $(targetId);
      if (!target) return;
      e.preventDefault();
      const headerOffset = CONFIG.scrollOffset;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: CONFIG.reducedMotion ? 'auto' : 'smooth',
      });
      // Close mobile menu if open
      if (els.mainNav?.classList.contains('is-open')) {
        closeMenu();
      }
      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  };

  /* ============================================================
     ACTIVE NAV LINK ON SCROLL
     ============================================================ */
  const updateActiveNav = () => {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + CONFIG.scrollOffset + 100;
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });
    els.navLinks.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === current) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  /* ============================================================
     STAT COUNTER ANIMATION
     ============================================================ */
  const animateCount = (el, target, duration = 2000) => {
    if (CONFIG.reducedMotion) {
      el.textContent = target;
      return;
    }
    const start = performance.now();
    const startValue = 0;
    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
      el.textContent = current + '+';
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const initStatCounters = () => {
    if (!els.statNumbers.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (!isNaN(target)) {
              animateCount(el, target);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.statNumbers.forEach((el) => observer.observe(el));
  };

  /* ============================================================
     KEYBOARD NAVIGATION (Escape to close menu)
     ============================================================ */
  const initKeyboardNav = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (els.mainNav?.classList.contains('is-open')) {
          closeMenu();
        }
      }
    });
  };

  /* ============================================================
     SCROLL EVENT HANDLER (throttled)
     ============================================================ */
  const onScroll = throttle(() => {
    updateProgress();
    updateBackToTop();
    updateActiveNav();
  }, 16); // ~60fps

  /* ============================================================
     RESIZE HANDLER (debounced)
     ============================================================ */
  const onResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && els.mainNav?.classList.contains('is-open')) {
      closeMenu();
    }
  }, 150);

  /* ============================================================
     EVENT LISTENERS
     ============================================================ */
  const initEvents = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    els.menuToggle?.addEventListener('click', toggleMenu);
    els.mobileOverlay?.addEventListener('click', closeMenu);
    els.themeToggle?.addEventListener('click', toggleTheme);
    els.backToTop?.addEventListener('click', scrollToTop);
    els.cookieAccept?.addEventListener('click', acceptCookies);
    els.cookieDecline?.addEventListener('click', declineCookies);
  };

  /* ============================================================
     INITIALIZATION
     ============================================================ */
  const init = () => {
    initTheme();
    initCookieBanner();
    initReveal();
    initSmoothScroll();
    initStatCounters();
    initKeyboardNav();
    initEvents();
    // Initial calls
    updateProgress();
    updateBackToTop();
    updateActiveNav();
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
